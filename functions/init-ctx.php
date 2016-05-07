<?php
/*****************************************************
* FRONT END CONTEXT
*****************************************************/

//hook : customize_preview_init
add_action( 'wp_footer', 'hu_print_ctx', 30 );
function hu_print_ctx() {
  if ( ! hu_is_customize_preview_frame() )
    return;

  global $wp_query, $wp_customize;
  $_ctx = hu_get_ctx();
  ?>
    <script type="text/javascript" id="czr-print-ctx">
      (function ( _export ){
        _export.ctx   = <?php echo wp_json_encode( $_contexts ) ?>;
      })( _wpCustomizeSettings );
    </script>
  <?php
}


/**
* Return the current contx. Front / Back agnostic.
* @param $_requesting_wot is a string with the follwing possible values : 'meta_type' (like post) , 'type' (like page), 'id' (like page id)
* @param $_return_string string param stating if the return value should be a string or an array
* @return a string of all concatenated contx parts (default) 0R an array of the contx parts
*/
function hu_get_ctx( $_requesting_wot = null, $_return_string = true ) {
  //Contx builder from the wp $query
  $parts    = $this -> hu_get_query_ctx();

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
    //generate the contx string from the associative array of ctx_parts
    if ( ! is_array( $_ctx_parts ) )
      return $_ctx_parts;
    $_concat = "";
    foreach ( $_ctx_parts as $_key => $_part ) {
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
* @return  array of contx parts
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

  if ( is_404() )
    $meta_type  = '404';
  if ( is_search() )
    $meta_type  = 'search';
  if ( is_date() )
    $meta_type  = 'date';

  return apply_filters( 'hu_get_query_ctx' , array( $meta_type , $type , $obj_id ) , $current_obj );
}




/**
* Used when localizing the customizer js params
* Can be a post ( post, pages, CPT) , tax(tag, cats, custom taxs), author, date, search page, 404.
* @return string title of the current contx if exists. If not => false.
*/
function hu_get_ctx_title() {
  //Get the contx in parts
  $_ctx_parts = $this -> tc_get_ctx( null, false );

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
function tc_get_admin_ctx() {
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
  return apply_filters( 'tc_get_admin_ctx' , array( $meta_type , $type , $obj_id ) );
}