<?php

/*****************************************************
* CUSTOMIZER
*****************************************************/
$_czr_options = HU_THEME_OPTIONS;
add_action( "customize_save_{$_czr_options}"  , 'hu_set_setting_type' );
add_action( 'customize_update_trans' , 'hu_customizer_set_trans', 10, 2 );

//hook : customize_save_hu_theme_options
//at this point, the nonce has already been checked by the customizer manager
function hu_set_setting_type( $setting ) {
  $value = $setting->post_value();
  if ( ! $setting->check_capabilities() || ! isset( $value ) )
    return;
  if ( ! isset($_POST['dyn_type']) )
    $setting -> type = 'option';
  else
    $setting -> type = $_POST['dyn_type'];
}

//hook : customize_update_trans
//at this point, the nonce has already been checked by the customizer manager
function hu_customizer_set_trans($value, $setting) {
  if ( ! $_POST['opt_name'] || ! $setting->check_capabilities() || ! isset( $value ) )
    return;

  $opt_name = hu_extract_opt_name( $setting -> id );
  $trans_val = get_transient( $_POST['opt_name'] );
  if ( ! $trans_val || ! is_array($trans_val) ) {
    $trans_val = array( $opt_name => $value );
  } else {
    $trans_val[$opt_name] = $value;
  }
  set_transient( $_POST['opt_name'], $trans_val, 60*24*365*100 );
}



function hu_extract_opt_name( $setting_id ) {
  return str_replace(array('[', ']', HU_THEME_OPTIONS ), '', $setting_id);
}




















/*****************************************************
* GET OPTION
*****************************************************/
add_filter( 'hu_opt', 'hu_get_ctx_opt', 10, 4 );

//which option to get ?
//1) WHEN CUSTOMIZING
//- if dyn_type is 'option', then let wp do the job
//- if dyn_type is not option,
//      A) the requested option name is currently being customized
//        => if so, then get the customized value
//      B) the requested option is not being customized, then get the saved db option using dyn_type and opt_name from $_POST
//
//2) WHEN NOT CUSTOMIZING
// A) the current context can have a meta option : posts (post, page, cpt), tax, authors
//    => retrieve the meta and check if an entry exists for this option
// B) the current context can have specific global options like home, all_posts, all_pages, all_{custom_post_type}
//   all_tag, all_cat, all_{custom_tax}, all_authors, 404, search, date
//     => if so then check if the current option has an entry in this specific global and return it
// C) the current context has no specific global option, then fall back on the default value
function hu_get_ctx_opt( $_opt_val , $opt_name , $opt_group, $_default_val ) {
  $_new_val = $_opt_val;

  $_meta_opts = array();
  $_trans_opts = array();

  $meta_type = hu_get_ctx( 'meta_type', true );

  if ( hu_can_have_meta_opt( $meta_type ) )
    $_meta_opts = hu_get_meta_opt( $opt_name, $meta_type );
  elseif ( hu_can_have_trans_opt( $meta_type ) )
    $_trans_opts = hu_get_trans_opt( $opt_name, $meta_type );

  //priority
  if ( isset($_meta_opts[$opt_name]) )
    $_new_val = $_meta_opts[$opt_name];
  elseif ( isset($_trans_opts[$opt_name]) )
    $_new_val = $_trans_opts[$opt_name];

  return $_new_val;
}


//@return the option array
function hu_get_meta_opt( $opt_name, $meta_type ) {
  return array();
}

//@return the option array
function hu_get_trans_opt( $opt_name, $meta_type ) {
  $trans_name = hu_get_opt_name();
  $trans = get_transient( $trans_name );
  $trans = false != $trans ? $trans : array();

  if ( ! hu_is_customize_preview_frame() )
    return $trans;

  if ( hu_is_customized_opt( $opt_name ) && hu_is_customized_dyn_type( $meta_type ) ) {
    //get the customized value for this option
    $cust_val = hu_get_customized_val($opt_name);
    //update the trans
    $trans[$opt_name] = $cust_val;
  }
  return $trans;
}


function hu_is_customized_opt( $opt_name ) {
  $_cust_opt_name = '[' . HU_THEME_OPTIONS . '['. $opt_name . ']]';
  $_customized = hu_get_czr_post_values('customized');
  return array_key_exists( $_cust_opt_name, $_customized );
}

function hu_is_customized_dyn_type( $meta_type ) {
  if ( ! isset($_POST['dyn_type']) )
    return '';
  return $meta_type == $_POST['dyn_type'];
}


function hu_get_customized_val( $opt_name ) {
  $_cust_opt_name = '[' . HU_THEME_OPTIONS . '['. $opt_name . ']]';
  $_customized = hu_get_czr_post_values('customized');
  return array_key_exists( $_cust_opt_name, $_customized ) ? $_customized[$_cust_opt_name] : false;
}


function hu_can_have_meta_opt( $meta_type ) {
  return in_array(
    $meta_type,
    array('_post', '_tax', '_author')
  );
}


function hu_can_have_trans_opt($meta_type) {
  return in_array(
    $meta_type,
    array('_home', '_search', '_404', '_date')
  );
}



function hu_get_czr_post_values() {
  if ( ! isset( $_POST['customized'] ) )
    return array();

  return json_decode( wp_unslash( $_POST['customized'] ), true );
}




















/*****************************************************
* FRONT END CONTEXT
*****************************************************/
//hook : customize_preview_init
add_action( 'wp_footer', 'hu_print_ctx', 30 );
function hu_print_ctx() {
  if ( ! hu_is_customize_preview_frame() )
    return;
  global $wp_query, $wp_customize;
  $_meta_type = hu_get_ctx( 'meta_type', true );

  $_czr_ctx = array(
    'local' => array(
      'ctx'     => hu_get_ctx(),
      'db_type' => hu_get_db_type( $_meta_type ),
      'opt_name'=> hu_get_opt_name()
    ),
    'global' => array(
      'ctx'     => '_all_',
      'db_type' => 'option',
      'opt_name'=> ''
    )
  );
  ?>
    <script type="text/javascript" id="czr-print-ctx">
      (function ( _export ){
        _export.czr_ctx   = <?php echo wp_json_encode( $_czr_ctx ) ?>;
      })( _wpCustomizeSettings );
    </script>
  <?php
}


//map ctx and db opt type
function hu_get_db_type( $meta_type ) {
  $_map = array(
    '_post'    => 'post_meta',
    '_tax'     => 'term_meta',
    '_author'  => 'user_meta',
  );
  return isset( $_map[$meta_type] ) ? $_map[$meta_type] : 'trans';
}



function hu_get_opt_name() {
  return strtolower( THEMENAME . '_czr' . hu_get_ctx() );
}


/**
* Return the current ctx. Front / Back agnostic.
* @param $_requesting_wot is a string with the follwing possible values : 'meta_type' (like post) , 'type' (like page), 'id' (like page id)
* @param $_return_string string param stating if the return value should be a string or an array
* @return a string of all concatenated ctx parts (default) 0R an array of the ctx parts
*/
function hu_get_ctx( $_requesting_wot = null, $_return_string = true ) {
  //Contx builder from the wp $query
  $parts    = hu_get_query_ctx();

  $_return  = array();
  if ( is_array( $parts) && ! empty( $parts ) )
      list( $meta_type , $type , $obj_id ) =  $parts;

  switch ( $_requesting_wot ) {
    case 'meta_type':
      if ( false != $meta_type )
        $_return = array( "meta_type" => "{$meta_type}" );
    break;

    case 'type':
      if ( false != $type )
        $_return = array( "type" => "{$type}" );
    break;

    case 'id':
      if ( false != $obj_id )
        $_return = array( "id" => "{$obj_id}" );
    break;

    default:
      if  ( false != $meta_type && false != $obj_id )
        $_return = array( "meta_type" => "{$meta_type}" , "type" => "{$type}", "id" => "{$obj_id}" );
      else if ( false != $meta_type && ! $obj_id )
        $_return = array( "meta_type" => "{$meta_type}", "type" => "{$type}" );
    break;
  }

  if ( $_return_string ) {
    //generate the ctx string from the associative array of ctx_parts
    if ( ! is_array( $_return ) )
      return $_return;
    $_concat = "";
    foreach ( $_return as $_key => $_part ) {
     $_concat .= '_'. $_part;
    }
    return $_concat;
  }
  return $_return;
}




/**
* Contx builder from the wp $query
* !! has to be fired after 'template_redirect'
* Used on front ( not customizing preview ? => @todo make sure of this )
* @return  array of ctx parts
*/
function hu_get_query_ctx() {
  //don't call get_queried_object if the $query is not defined yet
  global $wp_query;
  if ( ! isset($wp_query) || empty($wp_query) )
    return array();

  $current_obj  = get_queried_object();
  $meta_type    = false;
  $type         = false;
  $obj_id       = false;

  if ( is_object($current_obj) ) {
      //post, custom post types, page
      if ( isset($current_obj -> post_type) ) {
          $meta_type  = 'post';
          $type       = $current_obj -> post_type;
          $obj_id     = $current_obj -> ID;
      }

      //taxinomies : tags, categories, custom tax type
      if ( isset($current_obj -> taxonomy) && isset($current_obj -> term_id) ) {
          $meta_type  = 'tax';
          $type       = $current_obj -> taxonomy;
          $obj_id     = $current_obj -> term_id;
      }

      //author page
      if ( isset($current_obj -> data -> user_login ) && isset($current_obj -> ID) ) {
          $meta_type  = 'author';
          $type       = 'user';
          $obj_id     = $current_obj -> ID;
      }
  }

  if ( is_404() )
    $meta_type  = '404';
  if ( is_search() )
    $meta_type  = 'search';
  if ( is_date() )
    $meta_type  = 'date';
  if ( hu_is_home() )
    $meta_type  = 'home';

  return apply_filters( 'hu_get_query_ctx' , array( $meta_type , $type , $obj_id ) , $current_obj );
}




/**
* Used when localizing the customizer js params
* Can be a post ( post, pages, CPT) , tax(tag, cats, custom taxs), author, date, search page, 404.
* @return string title of the current ctx if exists. If not => false.
*/
function hu_get_ctx_title() {
  //Get the ctx in parts
  $_ctx_parts = hu_get_ctx( null, false );

  if ( ! is_array( $_ctx_parts ) || empty( $_ctx_parts ) )
    return;
  //Import $_ctx_parts variables into the current symbol table
  extract( $_ctx_parts );

  switch ( $meta_type ) {
    case 'post':
      return get_the_title( $id );
    break;

    case 'tax':
      $term = get_term( $id, $type );
      return $term -> name;
    break;

    case 'author':
      $author = get_userdata( $id );
      return $author -> user_login;
    break;
  }
  return;
}





/*****************************************************
* ADMIN CONTEXT
*****************************************************/
//@todo author case not handled
function hu_get_admin_ctx() {
  if ( ! is_admin() )
    return array();

  global $tag;
  $current_screen = get_current_screen();
  $post           = get_post();
  $meta_type      = false;
  $type           = false;
  $obj_id         = false;

  //post case : page, post CPT
  if ( 'post' == $current_screen->base
    && 'add' != $current_screen->action
    && ( $post_type_object = get_post_type_object( $post->post_type ) )
    && current_user_can( 'read_post', $post->ID )
    && ( $post_type_object->public )
    && ( $post_type_object->show_in_admin_bar )
    && ( 'draft' != $post->post_status ) )
  {
    $meta_type  = 'post';
    $type       = $post -> post_type;
    $obj_id     = $post -> ID;
  }
  //tax case : tags, cats, custom tax
  elseif ( 'edit-tags' == $current_screen->base
    && isset( $tag ) && is_object( $tag )
    && ( $tax = get_taxonomy( $tag->taxonomy ) )
    && $tax->public )
  {
    $meta_type  = 'tax';
    $type       = $tag -> taxonomy ;
    $obj_id     = $tag -> term_id;
  }
  return apply_filters( 'hu_get_admin_ctx' , array( $meta_type , $type , $obj_id ) );
}