<?php
load_template( get_template_directory() . '/functions/skop/skop-options.php' );
if ( hu_is_customizing() ) {
  load_template( get_template_directory() . '/functions/skop/skop-customizer.php' );
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
function hu_get_ctx_dyn_type( $meta_type ) {
  $_map = array(
    'post'    => 'post_meta',
    'tax'     => 'term_meta',
    'user'    => 'user_meta',
  );
  return isset( $_map[$meta_type] ) ? $_map[$meta_type] : 'trans';
}




/**
* Return the current ctx. Front / Back agnostic.
* @param $_requesting_wot is a string with the follwing possible values : 'meta_type' (like post) , 'type' (like page), 'id' (like page id)
* @param $_return_string string param stating if the return value should be a string or an array
* @return a string of all concatenated ctx parts (default) 0R an array of the ctx parts
*/
function hu_get_ctx( $_requesting_wot = null, $_return_string = true ) {
  //Contx builder from the wp $query
  //=> returns :
  //    the meta_type : post, tax, user
  //    the type : post_type, taxonomy name, author
  //    the id : post id, term id, user id
  $parts    = hu_get_query_ctx();
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

  return apply_filters( 'hu_get_query_ctx' , array( 'meta_type' => $meta_type , 'type' => $type , 'obj_id' => $obj_id ) , $current_obj );
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

    case 'user':
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