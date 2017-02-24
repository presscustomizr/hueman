<?php
add_filter('hu_js_customizer_control_params', 'hu_add_social_module_data');
add_filter('hu_js_customizer_control_params', 'hu_add_widget_area_module_data');

function hu_add_social_module_data( $params ) {
  return array_merge(
    $params,
    array(
        'social_el_params' => array(
            //Social Module
            'defaultSocialColor' => 'rgba(255,255,255,0.7)',
            'defaultSocialSize' => 14,
        )
    )
  );
}

function hu_add_widget_area_module_data( $params ) {
  return array_merge(
    $params,
    array(
        'widget_area_el_params' => array(
            //Widget Area Module
            'dynWidgetSection' => CZR_DYN_WIDGETS_SECTION,
            'defaultWidgetSidebar' => 'primary',//the one that will be cloned. Specific to each themes
            'defaultWidgetLocation' => 's1',//Specific to each themes
            'sidebar_contexts' => hu_get_contexts_list(),
            'sidebar_locations' => hu_get_widget_el_locations()
            //'default_zones' => hu_get_widget_el_default_zones()
        )
    )
  );
}


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