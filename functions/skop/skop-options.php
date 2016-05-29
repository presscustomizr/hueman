<?php

function hu_get_scope_opt_name( $level = 'local', $special = '' ) {
  $name = '';
  switch ($level) {
    case 'local':
      $name = strtolower( THEMENAME . '_czr_' . hu_get_ctx() );
      break;
    case 'group' :
      if ( ! empty(hu_get_ctx('type') ) )
        $name = strtolower( THEMENAME . '_czr_all_' . hu_get_ctx('type') );
      break;
    case 'special_group' :
      $name = strtolower( THEMENAME . '_czr_all_' . hu_get_ctx('type') . $special );
      break;
    case 'global':
      $name = HU_THEME_OPTIONS;
      break;
  }
  return $name;
}

/*****************************************************
* GET OPTION
*****************************************************/
//add_filter( 'hu_opt', 'hu_get_ctx_opt', 10, 4 );

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

  //WHEN NOT CUSTOMIZING
  $meta_type = hu_get_ctx( 'meta_type', true );
  //WHEN CUSTOMIZING, ALWAYS GET THE DYNAMIC META TYPE
  if ( hu_is_customize_preview_frame() && isset($_POST['dyn_type']) )
    $meta_type = $_POST['dyn_type'];

  //CUSTOMIZING
  if ( hu_is_customize_preview_frame() ) {
    if ( 'option' == $meta_type ) {
      return $_opt_val;
    } elseif( hu_has_customized_val( $opt_name ) ) {
      return hu_get_customized_val( $opt_name );
    } else {
      return $_opt_val;//always fallback to the global option val (or default if global is not set)
    }
  }
  else {// NOT CUSTOMIZING
      if ( hu_can_have_meta_opt( $meta_type ) )
        $_meta_opts = hu_get_meta_opt( $opt_name, $meta_type );
      elseif ( hu_can_have_trans_opt( $meta_type ) )
        $_trans_opts = hu_get_trans_opt( $opt_name, $meta_type );

      //priority
      if ( isset($_meta_opts[$opt_name]) )
        $_new_val = $_meta_opts[$opt_name];
      elseif ( isset($_trans_opts[$opt_name]) )
        $_new_val = $_trans_opts[$opt_name];
  }

  return $_new_val;
}


//@return the option array
function hu_get_meta_opt( $opt_name, $meta_type ) {
  return array();
}

//@return the option array
function hu_get_trans_opt( $opt_name, $meta_type ) {
  $trans_name = hu_get_scope_opt_name();
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

//@return bool
function hu_has_customized_val( $opt_name ) {
  $_cust_opt_name = '[' . HU_THEME_OPTIONS . '['. $opt_name . ']]';
  $_customized = hu_get_czr_post_values('customized');
  return array_key_exists( $_cust_opt_name, $_customized );
}

//@return option val : can be any type of variable.
function hu_get_customized_val( $opt_name ) {
  $_cust_opt_name = '[' . HU_THEME_OPTIONS . '['. $opt_name . ']]';
  $_customized = hu_get_czr_post_values('customized');
  return array_key_exists( $_cust_opt_name, $_customized ) ? $_customized[$_cust_opt_name] : false;
}


function hu_can_have_meta_opt( $meta_type ) {
  return in_array(
    $meta_type,
    array('post', 'tax', 'user')
  );
}


function hu_can_have_trans_opt( $id ) {
  return in_array(
    $meta_type,
    array('home', 'search', '404', 'date')
  );
}



function hu_get_czr_post_values() {
  if ( ! isset( $_POST['customized'] ) )
    return array();

  return json_decode( wp_unslash( $_POST['customized'] ), true );
}