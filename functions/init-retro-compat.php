<?php
/* ------------------------------------------------------------------------- *
 *  SIDEBAR OPTION RETRO COMPATIBILITY
/* ------------------------------------------------------------------------- */
//backup the sidebar_widgets as they are before the migration
//if something wrong happens, we'll be able to restore them with wp_set_sidebars_widgets()
//and to remove the potential _orphaned generated
add_action( 'after_switch_theme',  'hu_backup_sidebars', 0 );

function hu_backup_sidebars() {
    $sidebars_widgets = get_theme_mod( 'sidebars_widgets' );
    $data = isset($sidebars_widgets['data']) ? $sidebars_widgets['data'] : array();
    if ( ! get_transient( '_hu_sidebar_backup' ) )
      set_transient( '_hu_sidebar_backup', $data, 24 * 3600 * 365 * 20 );
}


//get the previous locations and contexts and turn them into new options
add_filter('hu_implement_options_compat', 'hu_filter_add_new_sidebar_options');


//hook : hu_implement_options_compat
function hu_filter_add_new_sidebar_options( $__options ) {
    //generates the default widget zone options
    $_default_locations = hu_get_builtin_widget_zones_location();
    $builtin_zones = array();

    foreach ( hu_get_default_widget_zones() as $_zone_id => $_data ) {

      $_locs = hu_get_old_locations($_zone_id, $__options);
      if ( empty($_locs) && isset($_default_locations[$_zone_id]) ) {
        $_locs[] = key($_default_locations[$_zone_id]);
      }

      $_contexts = hu_get_old_contexts($_zone_id, $__options);
      if ( empty($_contexts) && isset($_default_locations[$_zone_id]) ) {
        $_contexts[] = ('_all_');
      }

      $builtin_zones[] = array(
        'id'          => $_data['id'],
        'title'       => $_data['name'],
        'contexts'    => $_contexts,
        'locations'   => $_locs,
        'is_builtin'  => true,
        'description' => $_data['description']
      );
    }


    //generates the custom widget zone options
    $_old_custom_zone_opt = isset( $__options['sidebar-areas'] ) ? $__options['sidebar-areas'] : array();
    $custom_zones = array();

    if ( ! empty($_old_custom_zone_opt) ) {
      //array( 'title' => string, 'id' => string )
      foreach ( $_old_custom_zone_opt as $_zone ) {
        if ( !isset($_zone['id']) )
          continue;

        $_zone_id   = $_zone['id'];
        //get the default location
        $_locs      = hu_get_old_locations($_zone_id, $__options);

        $_contexts  = hu_get_old_contexts($_zone_id, $__options);

        $custom_zones[] = array(
          'id'          => $_zone['id'],
          'title'       => $_zone['title'],
          'contexts'    => $_contexts,
          'locations'   => $_locs,
        );
      }//foreach
    }//if

    //make sure the previous "rules" for sidebars and respected
    $_new_sb_areas_opts = hu_clean_old_sidebar_options( array_merge( $builtin_zones, $custom_zones ), $__options );

    $__options['sidebar-areas'] = $_new_sb_areas_opts;
    return $__options;
}



//helper used to re-build the sidebar-areas option from defaults if the option is empty or has been deleted for some reasons
function hu_generate_new_sidebar_options() {
    //generates the default widget zone options
    $_default_locations = hu_get_builtin_widget_zones_location();
    $builtin_zones = array();

    foreach ( hu_get_default_widget_zones() as $_zone_id => $_data ) {

        $_locs = array();
        if ( isset($_default_locations[$_zone_id]) ) {
          $_locs[] = key($_default_locations[$_zone_id]);
        }

        $_contexts = array();
        if ( isset($_default_locations[$_zone_id]) ) {
          $_contexts[] = ('_all_');
        }

        $builtin_zones[] = array(
          'id'          => $_data['id'],
          'title'       => $_data['name'],
          'contexts'    => $_contexts,
          'locations'   => $_locs,
          'is_builtin'  => true,
          'description' => $_data['description']
        );
    }

    return $builtin_zones;
}




function hu_get_old_locations( $_zone_id, $__options) {
  $locations = array();
  $_old_sd_options = array(
    's1-home',
    's2-home',
    's1-single',
    's2-single',
    's1-archive',
    's2-archive',
    's1-archive-category',
    's2-archive-category',
    's1-search',
    's2-search',
    's1-404',
    's2-404',
    's1-page',
    's2-page'
  );

  //the following zones are assigned to fixed locations
  //primary, secondary, footer-*, header-ads, footer-ads could be assigned to s1 and s2 previously but they were always assigned in any cases to their respective default location
  //user will be able to change this with the new options
  //edge case : a user who had assigned the footer-1 to the s1 location on home will loose this setting
  //=> the fix is to create a new zone, and select the home context + assign it to the s1 (right sidebar) location
  $_fixed_locations = array(
    's1'          => 'primary',
    's2'          => 'secondary',
    'header-ads'  => 'header-ads',
    'footer-ads'  => 'footer-ads',
    'footer-1'    => 'footer-1',
    'footer-2'    => 'footer-2',
    'footer-3'    => 'footer-3',
    'footer-4'    => 'footer-4'
  );

  if ( in_array($_zone_id, $_fixed_locations) ) {
    $locations[] = array_search($_zone_id, $_fixed_locations);
    return $locations;
  }


  foreach ($_old_sd_options as $opt_name) {
    //does the option exists ?
    if( ! array_key_exists($opt_name, $__options) )
      continue;

    //if exists, grab its value
    $value = $__options[$opt_name];

    if ( $value != $_zone_id )
      continue;

    //we have a match, extract the location if not already there
    $loc = substr($opt_name, 0, 2);
    if ( ! in_array($loc, $locations) )
      $locations[] = $loc;
  }

  return $locations;
}


function hu_get_old_contexts( $_zone_id, $__options) {
  $contexts = array();
  $_old_sd_options = array(
    's1-home',
    's2-home',
    's1-single',
    's2-single',
    's1-archive',
    's2-archive',
    's1-archive-category',
    's2-archive-category',
    's1-search',
    's2-search',
    's1-404',
    's2-404',
    's1-page',
    's2-page'
  );

  $_default_contexts = array();
  //populates the map with the contexts
  foreach ( hu_get_contexts_list() as $c => $title ) {
    if ( '_all_' == $c )
      continue;

    $_default_contexts[] = $c;
  }

  //the following zones are assigned to fixed contexts
  //user will be able to change this with the new options
  //edge case : a user who had assigned the footer-1 to the s1 location on home will loose this setting
  //=> the fix is to create a new zone, and select the home context + assign it to the s1 (right sidebar) location
  $_fixed_contexts = array(
    'primary',
    'secondary',
    'header-ads',
    'footer-ads',
    'footer-1',
    'footer-2',
    'footer-3',
    'footer-4'
  );

  if ( in_array($_zone_id, $_fixed_contexts) ) {
    $contexts = $_default_contexts;
    return $contexts;
  }

  foreach ($_old_sd_options as $opt_name) {
    //does the option exists ?
    if( ! array_key_exists($opt_name, $__options) )
      continue;
    //if exists, grab its value
    $value = $__options[$opt_name];

    if ( $value != $_zone_id )
      continue;

    //we have a match, extract the context if not already there
    $con = substr($opt_name, 3);
    if ( ! in_array($con, $contexts) )
      $contexts[] = $con;
  }

  return $contexts;
}



//SIDEBAR RULES FOR THE MIGRATIONS
//
//Locations s1 and s2, for a given context :
//  1) can only have one widget zone assigned
//  2) fallback on primary (for s1) and secondary (for s2) if no widget zone is assigned.
//
//Zones footer-*, header-ads, footer-ads, primary, secondary :
//  1) could be assigned to s1 and s2 in specific contexts
//  2) are now always assigned to their default locations in all contexts
function hu_clean_old_sidebar_options( $_new_sb_opts, $__options ) {
  //for s1 and s2, create an array of context => array( 's1' => [ widget_zones ], 's2' => [widget_zones] );
  //and for each one, determine who is the winner
  $_old_sd_options = array(
    's1-home',
    's2-home',
    's1-single',
    's2-single',
    's1-archive',
    's2-archive',
    's1-archive-category',
    's2-archive-category',
    's1-search',
    's2-search',
    's1-404',
    's2-404',
    's1-page',
    's2-page'
  );

  $_default_zone_for_sidebars = array(
    's1' => 'primary',
    's2' => 'secondary'
  );

  $_forbidden_zones_for_sidebars = array(
    'header-ads',
    'footer-ads',
    'footer-1',
    'footer-2',
    'footer-3',
    'footer-4'
  );

  //make sure that s1 and s2 have only one widget zone for a given context
  foreach ($_old_sd_options as $opt_name) {

    //is the option defined ?
    if( ! array_key_exists($opt_name, $__options) )
      continue;

    //get previous settings
    $_loc     = substr($opt_name, 0, 2);//is always s1 or s2
    $_con     = substr($opt_name, 3 );
    $_user_zone_id = $__options[$opt_name];

    //if no zone was assigned to this location-context, then continue
    if ( empty($_user_zone_id ) || ! $_user_zone_id )
      continue;

    //is the zone different than the default one?
    //if not, continue
    if ( $_user_zone_id == $_default_zone_for_sidebars[$_loc] )
      continue;

    //if the zone belongs to the forbidden zones, then continue because this is not supported for the migration
    //for example, the migration won't support a footer-1 assigned to s1
    if ( in_array($_user_zone_id, $_forbidden_zones_for_sidebars) )
      continue;

    //loop on the new options and fix
    //if a zone different than the default (primary or secondary) was assigned to s1 or s2 on a given context, then remove this context from its context list
    $_zone_to_modify = $_default_zone_for_sidebars[$_loc];

    foreach ($_new_sb_opts as $key => $data) {

      //don't take any risk...
      if ( !is_array($data) || !array_key_exists('id', $data) || !array_key_exists('locations', $data) || !array_key_exists('contexts', $data) )
        continue;

      if ( $_zone_to_modify != $data['id'] )
        continue;

      //remove the context from the list
      $_key_to_remove = array_search($_con, $data['contexts']);
      unset($_new_sb_opts[$key]['contexts'][$_key_to_remove]);
    }//foreach

  }//foreach

  return $_new_sb_opts;
}

//fired early
//@param $_options = get_option( HU_THEME_OPTIONS )
//handles the transfer from option tree to customizer
//=> as of v3.0.10, options have been moved from option tree to customizer to be compliant with the wp.org theme guidelines
function hu_maybe_transfer_option_tree_to_customizer( $_options ) {
  $copy_option_tree = isset( $_GET['copy_option_tree'] );

  //have the option already been copied ?
  if ( isset($_options['has_been_copied']) && true === $_options['has_been_copied'] && ! $copy_option_tree )
    return;

  $_old_options = get_option( 'option_tree' );

  $_old_options = ( false == $_old_options || empty($_old_options) ) ? array() : $_old_options;

  //if not then grab the options from option tree and copy them into the new option raw
  //Ensure compatibility for some options like sidebar-areas + s1*, s2*options
  $_opt_to_copy = apply_filters('hu_implement_options_compat', $_old_options );

  update_option(
    HU_THEME_OPTIONS,
    array_merge( $_opt_to_copy, array('has_been_copied' => true) )
  );

}

//fired early
//@return void()
//@param $_options = get_option( HU_THEME_OPTIONS )
//handles the transition to the WP custom_logo support introduced in wp 4.5.
//Several cases :
//1) user had defined a custom logo with the previous Hueman option
//=> the option has to be copied to WP custom_logo theme mod
//=> display-header-logo set to true
//2) user had not defined a custom logo in Hueman
//=> display-header-logo set to false
function hu_maybe_copy_logo_to_theme_mod( $_options ) {
    //keep using the old logo if WP version < 4.5
    if ( ! function_exists( 'the_custom_logo' ) )
      return;

    $_old_custom_logo_exists = isset($_options['custom-logo']) && false != $_options['custom-logo'] && ! empty($_options['custom-logo']);
    if ( $_old_custom_logo_exists ) {
        set_theme_mod( 'custom_logo', $_options['custom-logo'] );
        $_options['display-header-logo'] = 1;
        unset($_options['custom-logo']);
        update_option( HU_THEME_OPTIONS, $_options );
    }
}

//hook : hu_init_options_done
//=> this hook is invoked in Utils::hu_init_properties(), when started_using_hueman transient has been set
function hu_update_option_backward_compat() {
    //copy old options from option tree framework into new option raw 'hu_theme_options'
    //copy logo from previous to custom_logo introduced in wp 4.5
    //only if user is logged in
    if ( is_user_logged_in() && current_user_can( 'edit_theme_options' ) ) {
      $_options = get_option( HU_THEME_OPTIONS );
      hu_maybe_transfer_option_tree_to_customizer( $_options );
      hu_maybe_copy_logo_to_theme_mod( $_options );
    }
}

add_action( 'hu_init_options_done', 'hu_update_option_backward_compat' );





/* Backward compatibility. Typically useful for users of child themes using old function names. */
if ( ! function_exists('alx_layout_class') ) {
  function alx_layout_class() {
    return hu_get_layout_class();
  }
}

if ( ! function_exists('alx_social_links') ) {
  function alx_social_links() {
    return hu_print_social_links();
  }
}

if ( ! function_exists('alx_site_title') ) {
  function alx_site_title() {
    return hu_site_title();
  }
}

if ( ! function_exists('alx_blog_title') ) {
  function alx_blog_title() {
    return hu_blog_title();
  }
}

if ( ! function_exists('alx_page_title') ) {
  function alx_page_title() {
    return hu_get_page_title();
  }
}

if ( ! function_exists('alx_post_images') ) {
  function alx_post_images() {
    return hu_post_images();
  }
}

if ( ! function_exists('alx_related_posts') ) {
  function alx_related_posts() {
    return hu_related_posts();
  }
}

if ( ! function_exists('alx_sidebar_secondary') ) {
  function alx_sidebar_secondary() {
    return 'secondary';
  }
}

if ( ! function_exists('alx_sidebar_primary') ) {
  function alx_sidebar_primary() {
    return 'primary';
  }
}