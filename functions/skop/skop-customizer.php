<?php
/*****************************************************
* CUSTOMIZER
*****************************************************/
$_czr_options = HU_THEME_OPTIONS;

//Which options are we targeting there?
// 1) the theme options
// 2) the WP built in options
$_built_in_options = hu_get_wp_builtin_settings();
$_built_in_options[] = HU_THEME_OPTIONS;

//loop on the targeted option to dynamically set the type on save
foreach ( $_built_in_options as $_opt_name ) {
  add_action( "customize_save_{$_opt_name}"  , 'hu_set_setting_type' );
}

add_action( 'customize_update_trans' , 'hu_customizer_set_trans', 10, 2 );
add_action( 'customize_update_post_meta' , 'hu_customizer_set_post_meta', 10, 2 );
add_action( 'customize_update_term_meta' , 'hu_customizer_set_term_meta', 10, 2 );
add_action( 'customize_update_user_meta' , 'hu_customizer_set_user_meta', 10, 2 );


//hook : customize_save_hu_theme_options
//at this point, the nonce has already been checked by the customizer manager
function hu_set_setting_type( $setting ) {
    $value = $setting->post_value();
    if ( ! $setting->check_capabilities() || ! isset( $value ) )
      return;
    $setting -> type = !isset($_POST['dyn_type']) ? 'option' : $_POST['dyn_type'];
}


//hook : customize_update_trans
//at this point, the nonce has already been checked by the customizer manager
//This callback is fired in WP_Customize_Setting::update()
//@param $value has been sanitized in WP_Customize_Setting::save() at this point, by WP_Customize_Manager::post_value()
function hu_customizer_set_trans($value, $setting) {

    if ( ! $_POST['opt_name'] || ! $setting->check_capabilities() || ! isset( $value ) )
      return;

    $set_name = hu_extract_setting_name( $setting -> id );
    $trans_val = get_transient( $_POST['opt_name'] );
    if ( ! $trans_val || ! is_array($trans_val) ) {
      $trans_val = array( $set_name => $value );
    } else {
      $trans_val[$set_name] = $value;
    }
    set_transient( $_POST['opt_name'], $trans_val, 60*24*365*100 );
}

//This callback is fired in WP_Customize_Setting::update()
//@param $value has been sanitized in WP_Customize_Setting::save() at this point, by WP_Customize_Manager::post_value()
function hu_customizer_set_post_meta($value, $setting) {
    if ( ! $_POST['opt_name'] || ! $_POST['obj_id'] || ! $setting->check_capabilities() || ! isset( $value ) )
      return;

    $set_name = hu_extract_setting_name( $setting -> id );
    $meta_val = get_post_meta( $_POST['obj_id'] , $_POST['opt_name'], true );

    if ( ! $meta_val || ! is_array($meta_val) ) {
      $meta_val = array( $set_name => $value );
    } else {
      $meta_val[$set_name] = $value;
    }
    update_post_meta( $_POST['obj_id'] , $_POST['opt_name'], $meta_val );
}

//This callback is fired in WP_Customize_Setting::update()
//@param $value has been sanitized in WP_Customize_Setting::save() at this point, by WP_Customize_Manager::post_value()
function hu_customizer_set_term_meta($value, $setting) {
    if ( ! $_POST['opt_name'] || ! $_POST['obj_id'] || ! $setting->check_capabilities() || ! isset( $value ) )
      return;

    $set_name = hu_extract_setting_name( $setting -> id );
    $meta_val = get_term_meta( $_POST['obj_id'] , $_POST['opt_name'], true );

    if ( ! $meta_val || ! is_array($meta_val) ) {
      $meta_val = array( $set_name => $value );
    } else {
      $meta_val[$set_name] = $value;
    }
    update_term_meta( $_POST['obj_id'] , $_POST['opt_name'], $meta_val );
}

//This callback is fired in WP_Customize_Setting::update()
//@param $value has been sanitized in WP_Customize_Setting::save() at this point, by WP_Customize_Manager::post_value()
function hu_customizer_set_user_meta($value, $setting) {
    if ( ! $_POST['opt_name'] || ! $_POST['obj_id'] || ! $setting->check_capabilities() || ! isset( $value ) )
      return;

    $set_name = hu_extract_setting_name( $setting -> id );
    $meta_val = get_user_meta( $_POST['obj_id'] , $_POST['opt_name'], true );

    if ( ! $meta_val || ! is_array($meta_val) ) {
      $meta_val = array( $set_name => $value );
    } else {
      $meta_val[$set_name] = $value;
    }
    update_user_meta( $_POST['obj_id'] , $_POST['opt_name'], $meta_val );
}

function hu_extract_setting_name( $setting_id ) {
    return str_replace(array('[', ']', HU_THEME_OPTIONS ), '', $setting_id);
}






/*****************************************************
* ADD LOCALIZED PARAMS
*****************************************************/

add_filter( 'hu_js_customizer_control_params', function( $_params ) {
    return array_merge(
      $_params,
      array(
          'isSkopOn'  => HU_SKOP_ON,
          'defaultSkopeModel' => hu_get_default_scope_model(),
          'skopeDynTypes' => hu_get_dyn_types(),//the list of possible dyn types : array( 'post_meta', 'term_meta', 'user_meta', 'trans' )
          'defaultOptionsValues' => HU_utils::$inst -> hu_get_default_options()
        )
      );
});














/*****************************************************
* FRONT END CONTEXT
*****************************************************/
//hook : customize_preview_init
add_action( 'wp_footer', 'hu_print_server_skope_data', 30 );
function hu_print_server_skope_data() {
    if ( ! hu_is_customize_preview_frame() )
      return;
    global $wp_query, $wp_customize;
    $_meta_type = hu_get_skope( 'meta_type', true );

    // $_czr_scopes = array(
    //   'local' => array(
    //     'level'         => hu_get_skope(),
    //     'dyn_type'    => hu_get_skope_dyn_type( $_meta_type ),
    //     'opt_name'    => HU_SKOP_OPT() -> hu_get_skope_opt_name(),
    //     'is_default'  => false,
    //     'is_winner'   => true
    //   ),
    //   'global' => array(
    //     'ctx'         => '_all_',
    //     'dyn_type'    => 'option',
    //     'opt_name'    => HU_THEME_OPTIONS,
    //     'is_default'  => true,
    //     'is_winner'   => false
    //   )
    // );
    $_czr_skopes = hu_get_current_skopes();
    $_skope_global_db_opts = HU_SKOP_OPT() -> hu_get_saved_opt_name( 'global' );
    ?>
      <script type="text/javascript" id="czr-print-skop">
        (function ( _export ){
          _export.czr_skopes   = <?php echo wp_json_encode( $_czr_skopes ); ?>;
          //for the 'global' skope, we only send the option name instead of sending the heavy and performance expensive entire set of option
          _export.skopeGlobalDBOpt = <?php echo wp_json_encode( $_skope_global_db_opts ); ?>
        })( _wpCustomizeSettings );
      </script>
    <?php
}

//generates the array of available scopes for a given context
//ex for a single post tagged #tag1 and #tag2 and categroized #cat1 :
//global
//all posts
//local
//posts tagged #tag1
//posts tagged #tag2
//posts categorized #cat1
//@return array()
function hu_get_current_skopes() {
    $skopes = array();
    $_meta_type = hu_get_skope( 'meta_type', true );

    //default properties of the scope object
    $defaults = hu_get_default_scope_model();

    //global and local and always sent
    $skopes[] = wp_parse_args(
      array(
        'title'       => hu_get_skope_title( 'global' ),
        'long_title'  =>  hu_get_skope_title( 'global', null, true ),
        'skope'       => 'global',
        'level'       => '_all_',
        'dyn_type'    => 'option',
        'opt_name'    => HU_THEME_OPTIONS,
        'is_default'  => true,
        'is_winner'   => false,
        'is_primary'  => true,
        'has_db_val'  => ! empty( HU_SKOP_OPT() -> hu_get_saved_opt_name( 'global' ) )
        //for the 'global' skope, we only send the option name instead of sending the heavy and performance expensive entire set of option
        //@see hu_print_server_skope_data
        //'db'          => HU_SKOP_OPT() -> hu_get_raw_theme_option()
      ),
      $defaults
    );


    //SPECIAL GROUPS
    //@todo


    //GROUP
    //Do we have a group ? => if yes, then there must be a meta type
    if ( hu_get_skope('meta_type') ) {
      $group_opt_name = HU_SKOP_OPT() -> hu_get_skope_opt_name( 'group' );
      $skopes[] = wp_parse_args(
        array(
          'title'       => hu_get_skope_title( 'group', $_meta_type ),
          'long_title'  => hu_get_skope_title( 'group', $_meta_type, true),
          'skope'       => 'group',
          'level'       => 'all_' . hu_get_skope('type'),
          'dyn_type'    => 'trans',//a group is always saved as trans
          'opt_name'    => $group_opt_name,
          'db'          => HU_SKOP_OPT() -> hu_get_skope_opt( 'group', $_meta_type, $group_opt_name ),
          'has_db_val'  => ! empty( HU_SKOP_OPT() -> hu_get_skope_opt( 'group', $_meta_type, $group_opt_name ) )
        ),
        $defaults
      );
  }


  //LOCAL
  $loc_opt_name   = HU_SKOP_OPT() -> hu_get_skope_opt_name( 'local');
  $skopes[] = wp_parse_args(
    array(
        'title'       => hu_get_skope_title( 'local', $_meta_type ),
        'long_title'  => hu_get_skope_title( 'local', $_meta_type, true),
        'skope'       => 'local',
        'level'       => hu_get_skope(),
        'dyn_type'    => hu_get_skope_dyn_type( $_meta_type ),
        'opt_name'    => $loc_opt_name,
        'obj_id'      => hu_get_skope('id'),
        'db'          => HU_SKOP_OPT() -> hu_get_skope_opt( 'local', $_meta_type, $loc_opt_name ),
        'is_winner'   => true,
        'has_db_val'  => ! empty( HU_SKOP_OPT() -> hu_get_skope_opt( 'local', $_meta_type, $loc_opt_name ) )
    ),
    $defaults
  );
  return $skopes;
}




//normalizes the skope model server and clien side (json sent to customizer)
function hu_get_default_scope_model() {
    return array(
        'title'       => '',
        'long_title'  => '',
        'id'          => '',
        'skope'       => '',
        'level'       => '',
        'dyn_type'    => '',
        'opt_name'    => '',
        'obj_id'      => '',
        'is_default'  => false,
        'is_winner'   => false,
        'is_forced'  => false,//will this scope be visible on load ? is_primary true = yes
        'db'    => array(),
        'has_db_val'  => false
    );
}