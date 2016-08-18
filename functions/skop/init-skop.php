<?php
load_template( get_template_directory() . '/functions/skop/skop-options.php' );
/**
 * @since 3.5.0
 * @return object CZR Instance
 */
function HU_SKOP_OPT() {
  return HU_Skop_Option::hu_skop_opt_instance();
}
HU_SKOP_OPT();

if ( hu_is_customizing() ) {
  load_template( get_template_directory() . '/functions/skop/skop-customizer.php' );
  load_template( get_template_directory() . '/functions/skop/tmpl/skope-tmpls.php' );
  load_template( get_template_directory() . '/functions/skop/skop-ajax.php' );
}


//HELPERS
function hu_get_wp_builtin_settings() {
  return array(
    'page_for_posts',
    'show_on_front',
    'blogname',
    'blogdescription',
    'background_color',
    'site_icon',
    'custom_logo'
  );
}



//map ctx and db opt type
//@return string
function hu_get_skope_dyn_type( $meta_type ) {
  $_map = array(
    'post'    => 'post_meta',
    'tax'     => 'term_meta',
    'user'    => 'user_meta',
  );
  return isset( $_map[$meta_type] ) ? $_map[$meta_type] : 'trans';
}


function hu_get_dyn_types() {
  return apply_filters( 'hu_dyn_types',
    array( 'option', 'post_meta', 'term_meta', 'user_meta', 'trans' )
  );
}



/**
* Return the current ctx. Front / Back agnostic.
* @param $_requesting_wot is a string with the follwing possible values : 'meta_type' (like post) , 'type' (like page), 'id' (like page id)
* @param $_return_string string param stating if the return value should be a string or an array
* @return a string of all concatenated ctx parts (default) 0R an array of the ctx parts
*/
function hu_get_skope( $_requesting_wot = null, $_return_string = true ) {
  //Contx builder from the wp $query
  //=> returns :
  //    the meta_type : post, tax, user
  //    the type : post_type, taxonomy name, author
  //    the id : post id, term id, user id
  $parts    = hu_get_query_skope();
  $_return  = array();
  $meta_type = $type = $obj_id = '';

  if ( is_array( $parts) && ! empty( $parts ) ) {
    $meta_type  = isset( $parts['meta_type'] ) ? $parts['meta_type'] : false;
    $type       = isset( $parts['type'] ) ? $parts['type'] : false;
    $obj_id     = isset( $parts['obj_id'] ) ? $parts['obj_id'] : false;
  }

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
      if  ( false != $meta_type && false != $obj_id && false != $obj_id )
        $_return = array( "meta_type" => "{$meta_type}" , "type" => "{$type}", "id" => "{$obj_id}" );
      else if ( false != $meta_type && ! $obj_id )
        $_return = array( "meta_type" => "{$meta_type}", "type" => "{$type}" );
      else if ( false != $obj_id )
        $_return = array( "id" => "{$obj_id}" );
    break;
  }

  //return the parts array if not a string requested
  if ( ! $_return_string ) {
    return $_return;
  }

  //don't go further if not an array or empty
  if ( ! is_array( $_return ) || ( is_array( $_return ) && empty( $_return ) ) )
    return '';

  //if a specific part of the ctx is requested, don't concatenate
  //return the part if exists
  if ( ! is_null($_requesting_wot) )
    return isset($_return[$_requesting_wot]) ? $_return[$_requesting_wot] : '';

  //generate the ctx string from the array of ctx_parts
  $_concat = "";
  foreach ( $_return as $_key => $_part ) {
    if ( empty( $_concat) )
      $_concat .= $_part;
    else
      $_concat .= '_'. $_part;
  }
  return $_concat;
}




/**
* Contx builder from the wp $query
* !! has to be fired after 'template_redirect'
* Used on front ( not customizing preview ? => @todo make sure of this )
* @return  array of ctx parts
*/
function hu_get_query_skope() {
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
  }

  //author archive page
  if ( is_author() ) {
      $meta_type  = 'user';
      $type       = 'author';
      $obj_id     = get_query_var('author');
  }

  if ( is_404() )
    $obj_id  = '404';
  if ( is_search() )
    $obj_id  = 'search';
  if ( is_date() )
    $obj_id  = 'date';
  if ( hu_is_home() )
    $obj_id  = 'home';

  return apply_filters( 'hu_get_query_skope' , array( 'meta_type' => $meta_type , 'type' => $type , 'obj_id' => $obj_id ) , $current_obj );
}




/**
* Used when localizing the customizer js params
* Can be a post ( post, pages, CPT) , tax(tag, cats, custom taxs), author, date, search page, 404.
* @return string title of the current ctx if exists. If not => false.
*/
function hu_get_skope_title( $level, $meta_type = null, $long = false ) {
  $_dyn_type = ( hu_is_customize_preview_frame() && isset($_POST['dyn_type']) ) ? $_POST['dyn_type'] : '';
  $type = hu_get_skope('type');
  $skope = hu_get_skope();
  $title = '';

  if( 'local' == $level ) {
      $type = hu_get_skope('type');
      if ( HU_SKOP_OPT() -> hu_can_have_meta_opt( $meta_type ) ) {
          $_id = hu_get_skope('id');

          switch ($meta_type) {
              case 'post':
                $type_obj = get_post_type_object( $type );
                $title = sprintf( '%1$s (%2$s), "%3$s"', $type_obj -> labels -> singular_name, $_id, get_the_title( $_id ) );
                break;

              case 'tax':
                $type_obj = get_taxonomy( $type );
                $term = get_term( $_id, $type );
                $title = sprintf( '%1$s (%2$s), "%3$s"', $type_obj -> labels -> singular_name, $_id, $term -> name );
                break;

              case 'user':
                $author = get_userdata( $_id );
                $title = sprintf( '%1$s (%2$s), "%3$s"', __('User', 'hueman'), $_id, $author -> user_login );
                break;
          }

      } else if ( ( 'trans' == $_dyn_type || HU_SKOP_OPT() -> hu_can_have_trans_opt( $skope ) ) ) {
          $title = ucfirst( hu_get_skope() );
      }
  }
  if ( 'group' == $level || 'special_group' == $level ) {
      $title =  __('All', 'hueman');
      switch( $meta_type ) {
          case 'post' :
              $type_obj = get_post_type_object( $type );
              $title .= ' ' . $type_obj -> labels -> name;
          break;

          case 'tax' :
              $type_obj = get_taxonomy( $type );
              $title .= ' ' . $type_obj -> labels -> name;
          break;

          case 'user' :
              $title .= ' ' . __('Users', 'hueman');
          break;
      }
  }
  if ( 'global' == $level ) {
    $title = 'Global Options';
  }
  return hu_trim_text( $title, $long ? 45 : 25, '..."');
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


function hu_trim_text( $text, $text_length, $more ) {
    if ( ! $text )
      return '';

    $text       = trim( strip_tags( $text ) );

    if ( ! $text_length )
      return $text;

    $end_substr = $_text_length = strlen( $text );

    if ( $_text_length > $text_length ){
      $end_substr = strpos( $text, ' ' , $text_length);
      $end_substr = ( $end_substr !== FALSE ) ? $end_substr : $text_length;
      $text = substr( $text , 0 , $end_substr );
    }
    return ( ( $end_substr < $text_length ) && $more ) ? $text : $text . ' ' .$more ;
  }