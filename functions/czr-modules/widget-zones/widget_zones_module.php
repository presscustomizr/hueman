<?php
function hu_register_widget_zones_module( $args ) {
    $defaults = array(
        'setting_id' => '',

        'base_url_path' => '',//PC_AC_BASE_URL/inc/czr-modules/social-links/
        'version' => '',

        'option_value' => array(), //<= will be used for the dynamic registration

        'setting' => array(),
        'control' => array(),
        'section' => array(), //array( 'id' => '', 'label' => '' ),

        'sanitize_callback' => '',
        'validate_callback' => ''
    );
    $args = wp_parse_args( $args, $defaults );

    if ( ! isset( $GLOBALS['czr_base_fmk_namespace'] ) ) {
        error_log( __FUNCTION__ . ' => global czr_base_fmk not set' );
        return;
    }

    $czrnamespace = $GLOBALS['czr_base_fmk_namespace'];
    //czr_fn\czr_register_dynamic_module
    $CZR_Fmk_Base_fn = $czrnamespace . 'CZR_Fmk_Base';
    if ( ! function_exists( $CZR_Fmk_Base_fn) ) {
        error_log( __FUNCTION__ . ' => Namespace problem => ' . $CZR_Fmk_Base_fn );
        return;
    }


    $CZR_Fmk_Base_fn() -> czr_pre_register_dynamic_setting( array(
        'setting_id' => $args['setting_id'],
        'module_type' => 'czr_widget_areas_module',
        'option_value' => ! is_array( $args['option_value'] ) ? array() : $args['option_value'],

        'setting' => $args['setting'],

        'section' => $args['section'],

        'control' => $args['control']
    ));

    // czr_fn\czr_register_dynamic_module()
    $CZR_Fmk_Base_fn() -> czr_pre_register_dynamic_module( array(
        'dynamic_registration' => true,
        'module_type' => 'czr_widget_areas_module',

        // 'sanitize_callback' => 'hu_sanitize_callback__czr_social_module',
        // 'validate_callback' => 'hu_validate_callback__czr_social_module',

        'customizer_assets' => array(
            'control_js' => array(
                // handle + params for wp_enqueue_script()
                // @see https://developer.wordpress.org/reference/functions/wp_enqueue_script/
                'czr-widget-areas-module' => array(
                    'src' => sprintf(
                        '%1$s/assets/js/%2$s',
                        $args['base_url_path'],
                        '_2_6_widget_areas_module.js'
                    ),
                    'deps' => array('customize-controls' , 'jquery', 'underscore'),
                    'ver' => ( defined('WP_DEBUG') && true === WP_DEBUG ) ? time() : $args['version'],
                    'in_footer' => true
                )
            ),
            'localized_control_js' => array(
                'deps' => 'czr-customizer-fmk',
                'global_var_name' => 'widgetModuleLocalized',
                'params' => array(
                    //Widget Area Module
                    'dynWidgetSection' => HU_DYN_WIDGETS_SECTION,
                    'defaultWidgetSidebar' => 'primary',//the one that will be cloned. Specific to each themes
                    'defaultWidgetLocation' => 's1',//Specific to each themes
                    'sidebar_contexts' => hu_get_contexts_list(),
                    'sidebar_locations' => hu_get_widget_el_locations(),

                    'i18n' => array(
                        'widgetZone' => __('Widget Zone', 'hueman'),
                        'widgetZoneAdded' => __('New Widget Zone created ! Scroll down to edit it.', 'hueman'),
                        'inactiveWidgetZone' => __('Inactive in current context/location', 'hueman'),
                        'unavailableLocation' => __('Unavailable location. Some settings must be changed.', 'hueman'),
                        'locationWarning' => __('A selected location is not available with the current settings.', 'hueman'),
                        'locations' => __('Location(s)', 'hueman'),
                        'contexts' => __('Context(s)', 'hueman'),
                        'notset' => __('Not set', 'hueman'),
                    )
                    //'default_zones' => hu_get_widget_el_default_zones()
                )
            )
        ),

        'tmpl' => array()//tmpl
    ));
}//hu_register_widget_zones_module()


/* ------------------------------------------------------------------------- *
 *  Various Helpers
/* ------------------------------------------------------------------------- */
function hu_get_widget_el_locations() {
  $_default_locations = hu_get_builtin_widget_zones_location();
  //generates the locations for json
  $locations = array();
  foreach ($_default_locations as $_id => $data ) {
    $_k = key($data);
    $locations[$_k] = $data[$_k];
  }
  return $locations;
}

function hu_get_widget_el_default_zones() {
  //generates the default widget zone for json
  $default_zones = array();
  foreach ( hu_get_default_widget_zones() as $_zone_id => $_data ) {
    //get the default location
    $_loc = isset($_default_locations[$_zone_id]) ? key($_default_locations[$_zone_id]) : '';

    $default_zones[] = array(
      'id'          => $_data['id'],
      'title'       => $_data['name'],
      'contexts'    => array('_all_'),
      'locations'   => array($_loc),
      'is_builtin'  => true,
      'description' => $_data['description']
    );
  }
  return $default_zones;
}










/*****************************************************************************
* PREVIEW SCRIPT
*****************************************************************************/
//exports some wp_query informations. Updated on each preview refresh.
add_action( 'customize_preview_init' , 'hu_schedule_preview_script_printing', 20 );
function hu_schedule_preview_script_printing() {
    add_action( 'wp_footer', 'hu_print_widget_module_script', 1000 );
}

function hu_print_widget_module_script() {
    ?>
    <script type="text/javascript" id="hu-widget-zones-module">
        //global _wpWidgetCustomizerPreviewSettings
        ( function( api, $, _ ) {
              api.bind( 'preview-ready', function() {
                  api.preview.bind( 'active', function() {
                        api.preview.send( 'houston-widget-settings',
                              _.extend( _wpWidgetCustomizerPreviewSettings,
                                    {
                                          availableWidgetLocations : _.values( api.settings.availableWidgetLocations )
                                    }
                              )
                        );//send()
                  });
              });
        })( wp.customize, jQuery, _ );
    </script>
    <?php
}








/*****************************************************************************
* PRINT TEMPLATES
*****************************************************************************/
//print the pre add view content
add_action( 'customize_controls_print_footer_scripts', 'hu_print_widget_areas_templates' , 1 );



function hu_print_widget_areas_templates() {
  if ( ! isset( $GLOBALS['czr_base_fmk_namespace'] ) ) {
      error_log( __FUNCTION__ . ' => global czr_base_fmk not set' );
      return;
  }

  $czrnamespace = $GLOBALS['czr_base_fmk_namespace'];
  //czr_fn\czr_register_dynamic_module
  $CZR_Fmk_Base_fn = $czrnamespace . 'CZR_Fmk_Base';
  if ( ! function_exists( $CZR_Fmk_Base_fn) ) {
      error_log( __FUNCTION__ . ' => Namespace problem => ' . $CZR_Fmk_Base_fn );
      return;
  }
  $css_attr = $CZR_Fmk_Base_fn()->czr_css_attr;
  ?>
  <script type="text/html" id="tmpl-czr-module-widgets-pre-add-view-content">
    <div class="<?php echo $css_attr['sub_set_wrapper']; ?>" data-input-type="text">
      <div class="customize-control-title"><?php _e('Name', 'hueman'); ?></div>
      <div class="czr-input">
        <input data-czrtype="title" type="text" value="" placeholder="<?php _e('Give it a name', 'hueman'); ?>"></input>
      </div>
      <span class="czr-notice"><?php _e('Personalizing the name of the widget zone will help you identify it.', 'hueman'); ?></span>
    </div>
    <div class="<?php echo $css_attr['sub_set_wrapper']; ?> width-100" data-input-type="select">
      <div class="customize-control-title"><?php _e('Location(s)', 'hueman'); ?></div>
      <span class="czr-notice"><?php _e('Select the pre-defined location(s) in which you will embed this widget zone.', 'hueman'); ?></span>
      <div class="czr-input">
        <select data-czrtype="locations" class="js-example-basic-multiple" multiple="multiple"></select>
      </div>
    </div>
  </script>
  <?php
  //print template for built-in models like primary, secondary, footer-1, etc...
  //REDUCED VIEW TEMPLATE
  //no remove button
  //no remove alert wrapper
  ?>
    <script type="text/html" id="tmpl-czr-module-widgets-ru-item-part">
        <div class="<?php echo $css_attr['item_header']; ?> czr-builtin-model">
          <div class="<?php echo $css_attr['item_title']; ?> <?php echo $css_attr['item_sort_handle']; ?>"><h4>{{ data.title }}</h4></div>
          <div class="<?php echo $css_attr['item_btns']; ?>"><a title="<?php _e('Edit', 'hueman'); ?>" href="javascript:void(0);" class="fas fa-pencil-alt <?php echo $css_attr['edit_view_btn']; ?>"></a></div>
        </div>
    </script>
  <?php
    //the following template is a "sub view"
    //it's rendered :
    //1) on customizer start, depending on what is fetched from the db
    //2) dynamically when designing from the customizer
    //data looks like : { id : 'sidebar-one', title : 'A Title One' }
  ?>

  <script type="text/html" id="tmpl-czr-module-widgets-item-input-list">
    <div class="<?php echo $css_attr['sub_set_wrapper']; ?>" data-input-type="text">
      <div class="customize-control-title"><?php _e('id', 'hueman'); ?></div>
        <input data-czrtype="id" type="hidden"></input>
        <span><?php _e('unique id', 'hueman')?> : {{ data.id }}</span>
    </div>
    <div class="<?php echo $css_attr['sub_set_wrapper']; ?>" data-input-type="text">
      <div class="customize-control-title"><?php _e('Name', 'hueman'); ?></div>
      <div class="czr-input">
        <input data-czrtype="title" type="text" value="{{ data.title }}" placeholder="<?php _e('Enter a name', 'hueman'); ?>"></input>
      </div>
      <span class="czr-notice"><?php _e('Personalizing the name of the widget zone will help you identify it.', 'hueman'); ?></span>
    </div>
    <div class="<?php echo $css_attr['sub_set_wrapper']; ?> width-100" data-input-type="select">
      <div class="customize-control-title"><?php _e('Location(s)', 'hueman'); ?></div>
      <span class="czr-notice"><?php _e('Select the pre-defined location(s) in which you will embed this widget zone.', 'hueman'); ?></span>
      <div class="czr-input">
        <select data-czrtype="locations" class="js-example-basic-multiple" multiple="multiple"></select>
      </div>
    </div>
    <div class="<?php echo $css_attr['sub_set_wrapper']; ?> width-100" data-input-type="select">
      <div class="customize-control-title"><?php _e('Context(s)', 'hueman'); ?></div>
      <span class="czr-notice"><?php _e('Pick the context(s) where this widget area will be displayed.', 'hueman'); ?></span>
      <div class="czr-input">
        <select data-czrtype="contexts" class="js-example-basic-multiple" multiple="multiple"></select>
      </div>
    </div>
  </script>


  <?php
}