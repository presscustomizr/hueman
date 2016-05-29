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

add_action( 'customize_controls_print_footer_scripts', 'hu_print_scope_template' );
//hook : customize_save_hu_theme_options
//at this point, the nonce has already been checked by the customizer manager
function hu_set_setting_type( $setting ) {
  $value = $setting->post_value();
  if ( ! $setting->check_capabilities() || ! isset( $value ) )
    return;

  if ( ! isset($_POST['dyn_type']) ) {
    $setting -> type = 'option';
  }
  else {
    //$setting -> type = 'trans';
    $setting -> type = $_POST['dyn_type'];
  }
}



//hook : customize_update_trans
//at this point, the nonce has already been checked by the customizer manager
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


function hu_customizer_set_post_meta($value, $setting) {
  if ( ! $_POST['opt_name'] || ! $_POST['obj_id'] || ! $setting->check_capabilities() || ! isset( $value ) )
    return;

  $set_name = hu_extract_setting_name( $setting -> id );
  $meta_val = get_post_meta( $_id , $set_name, true );

  if ( ! $meta_val || ! is_array($meta_val) ) {
    $meta_val = array( $set_name => $value );
  } else {
    $meta_val[$set_name] = $value;
  }

  update_post_meta( $_POST['obj_id'] , $_POST['opt_name'], $meta_val );
}


function hu_extract_setting_name( $setting_id ) {
  return str_replace(array('[', ']', HU_THEME_OPTIONS ), '', $setting_id);
}













//data example :
// ctx:"_all_"
// dyn_type:"option"
// el:"czr-scope-global"
// is_default:true
// is_winner:false
// name:"global"
// opt_name:"hu_theme_options"
function hu_print_scope_template() {
  ?>
    <script type="text/html" id="tmpl-customize-scope">
      <div class="{{data.el}} czr-scope" data-scope-id="{{data.name}}" data-dyn-type="{{data.opt_name}}">
        <div class="czr-scope-header">
          <span class="czr-scope-reset fa fa-refresh czr-pull-left" title="Reset"></span>
          <span class="czr-scope-switch fa czr-pull-right" title="Switch to / active ?"></span>
        </div>
        <div class="czr-scope-content"><h4>{{data.level}}</h4></div>
        <div class="czr-scope-footer">
          <span class="czr-scope-winner fa fa-check czr-pull-left info" title="Is applied on front end ?"></span>
          <span class="czr-scope-dirty fa fa-circle czr-pull-left info" title="Is dirty ?"></span>
          <span class="czr-scope-force fa fa-exclamation-circle czr-pull-right" title="Force priority"></span>
        </div>
      </div>
    </script>
  <?php
}





/*****************************************************
* CUSTOMIZER STYLING
*****************************************************/
add_action('customize_controls_print_styles' , 'hu_print_skop_css');

function hu_print_skop_css() {
  ?>
  <style type="text/css" id="czr-skop-style">
    /* HEADER AND SCOPE SWITCHER */
    .wp-customizer .wp-full-overlay-sidebar .wp-full-overlay-header {
      height: 85px;
    }
    .wp-customizer .wp-full-overlay-sidebar .wp-full-overlay-sidebar-content {
      top: 85px;
    }
    .customize-controls-close {
      border-bottom: 1px solid #ddd;
    }




    .czr-scope-switcher {
      width: 100%;
      float: right;
      position: relative;
    }
    .czr-scope-switcher .button {
      float: left;
      width: 40%;
      text-align: center;
      margin: 0 2%;
      opacity: 0.7;
      -webkit-transition: opacity .3s ease-in-out;
      -moz-transition: opacity .3s ease-in-out;
      -ms-transition: opacity .3s ease-in-out;
      -o-transition: opacity .3s ease-in-out;
      transition: opacity .3s ease-in-out;
    }
    .czr-scope-switcher .button.active {
      font-weight: bold;
      opacity: 1;
    }
    .czr-scope-switcher .active {
      opacity: 1;
    }
    .czr-scope {
        float: left;
        width: 30%;
        margin-left: 2%;
        background: #fafafa;
        border: 1px solid #cccccc;
        -webkit-border-radius: 3px;
        border-radius: 3px;
        overflow: hidden;
        opacity: 0.6;
        -webkit-transition: opacity .3s ease-in-out;
        -moz-transition: opacity .3s ease-in-out;
        -ms-transition: opacity .3s ease-in-out;
        -o-transition: opacity .3s ease-in-out;
        transition: opacity .3s ease-in-out;
    }
    .czr-scope-header, .czr-scope-content, .czr-scope-footer {
        width: 100%;
        clear: both;
    }
    .czr-scope-content h4 {
        margin: 0;
        line-height: normal;
        text-align: center;
        font-size: 12px;
        line-height: 13px;
    }
    .czr-scope .fa {
        font-size: 10px;
        padding: 2%;
        color: #999;
        cursor: pointer;
        -webkit-transition: opacity .3s ease-in-out;
        -moz-transition: opacity .3s ease-in-out;
        -ms-transition: opacity .3s ease-in-out;
        -o-transition: opacity .3s ease-in-out;
        transition: opacity .3s ease-in-out;
    }
    .czr-scope .czr-scope-footer .info {
      cursor: inherit;
    }
    .czr-scope-header .czr-scope-switch {
        font-size: 15px;
        padding: 0 2px 0 0;
    }

    .czr-pull-left {
      float: left;
    }
    .czr-pull-right {
      float: right;
    }

    /* DIALOG BOX REACTIONS */
    .active .czr-scope-switch {
      color: #82b965;
      cursor:inherit;
    }
    .czr-scope .czr-scope-dirty {
      opacity: 0;
      color: #FFBD2E;
    }
    .dirty .czr-scope-dirty {
      opacity: 1;
    }

    .czr-scope .czr-scope-reset {
      opacity: 0;
      color: #82b965;
    }
    .has_db_val .czr-scope-reset {
      opacity: 1;
    }
  </style>
  <?php
}




















/*****************************************************
* FRONT END CONTEXT
*****************************************************/
//hook : customize_preview_init
add_action( 'wp_footer', 'hu_print_scopes', 30 );
function hu_print_scopes() {
  if ( ! hu_is_customize_preview_frame() )
    return;
  global $wp_query, $wp_customize;
  $_meta_type = hu_get_ctx( 'meta_type', true );

  // $_czr_scopes = array(
  //   'local' => array(
  //     'level'         => hu_get_ctx(),
  //     'dyn_type'    => hu_get_ctx_dyn_type( $_meta_type ),
  //     'opt_name'    => hu_get_scope_opt_name(),
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
  $_czr_scopes = hu_get_scopes();
  ?>
    <script type="text/javascript" id="czr-print-skop">
      (function ( _export ){
        _export.czr_scopes   = <?php echo wp_json_encode( $_czr_scopes ) ?>;
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
function hu_get_scopes() {
  $skopes = array();
  $_meta_type = hu_get_ctx( 'meta_type', true );

  //default properties of the scope object
  $defaults = array(
    'level'         => '',
    'dyn_type'    => '',
    'opt_name'    => '',
    'obj_id'      => '',
    'is_default'  => false,
    'is_winner'   => false,
    'is_primary'  => false,//will this scope be visible on load ? is_primary true = yes
    'db'    => array()
  );

  //global and local and always sent
  $skopes['global'] = wp_parse_args(
    array(
      'level'         => '_all_',
      'dyn_type'    => 'option',
      'opt_name'    => HU_THEME_OPTIONS,
      'is_default'  => true,
      'is_winner'   => false,
      'is_primary'  => true,
    ),
    $defaults
  );


  //SPECIAL GROUPS
  //@todo


  //GROUP
  //Do we have a group ? => if yes, then there must be a meta type
  if ( hu_get_ctx('meta_type') ) {
    $group_opt_name = hu_get_scope_opt_name( 'group');
    $skopes['group'] = wp_parse_args(
      array(
        'level'         => 'all_' . hu_get_ctx('type'),
        'dyn_type'    => 'trans',//a group is always saved as trans
        'opt_name'    => $group_opt_name,
        'db'          => hu_get_scope_opt( 'group', $_meta_type, $group_opt_name )
      ),
      $defaults
    );
  }


  //LOCAL
  $loc_opt_name   = hu_get_scope_opt_name( 'local');
  $skopes['local'] = wp_parse_args(
    array(
      'level'         => hu_get_ctx(),
      'dyn_type'    => hu_get_ctx_dyn_type( $_meta_type ),
      'opt_name'    => $loc_opt_name,
      'obj_id'      => hu_get_ctx('id'),
      'db'    => hu_get_scope_opt( 'local', $_meta_type, $loc_opt_name ),
      'is_winner'   => true,
    ),
    $defaults
  );
  return $skopes;
}


//@param level : local, group, special_group
//@param type : post
function hu_get_scope_opt( $level, $meta_type, $opt_name ) {
    $_opt = array();

    if( 'local' == $level ) {
      if ( hu_can_have_meta_opt( $meta_type ) ) {
        $_id = hu_get_ctx('id');
        switch ($meta_type) {
          case 'post':
            $_opt = get_post_meta( $_id , $opt_name, true );
            break;

          case 'tax':
            $_opt = get_term_meta( $_id , $opt_name, true );
            break;

          case 'user':
            $_opt = get_user_meta( $_id , $opt_name, true );
            break;
        }
      } else if ( false !== get_transient( $opt_name ) ) {
        $_opt = get_transient( $opt_name );
      }
    }
    if ( 'group' == $level ) {
      if ( false !== get_transient( $opt_name ) ) {
        $_opt = get_transient( $opt_name );
      }
    }


    return $_opt;
}