<?php
/***************************************************
* AUGMENTS WP CUSTOMIZE CONTROLS
***************************************************/
//A basis object to construct advanced controls
//inherits everything from WP_Customize_Control
if ( ! class_exists( 'HU_Advanced_Control' ) ) :
  class HU_Advanced_Control extends WP_Customize_Control {
    //this property defines the view css classes and attributes
    //it is passed to the controls with the json() method
    //=> the idea is to declare them in one place, instead of rewriting them into the js template and dom handlers
    public $css_attr = array(
      'multi_input_wrapper' => 'hu-multi-input-wrapper',
      'views_wrapper'     => 'hu-views-wrapper',
      'inner_view'        => 'hu-inner-view',
      'view_content'      => 'hu-view-content',
      'view_header'       => 'hu-view-header',
      'view_title'        => 'hu-view-title',
      'view_buttons'      => 'hu-view-buttons',
      'sortable_handle'   => 'hu-sortable-handle',

      //remove dialog
      'display_alert_btn' => 'hu-display-alert',
      'remove_alert_wrapper'   => 'hu-remove-alert-wrapper',
      'cancel_alert_btn'  => 'hu-cancel-button',
      'remove_view_btn'        => 'hu-remove-button',

      'edit_view_btn'     => 'hu-edit-view',
      //pre add dialog
      'open_pre_add_btn'      => 'hu-open-pre-add-new',
      'adding_new'        => 'hu-adding-new',
      'pre_add_wrapper'   => 'hu-pre-add-wrapper',
      'pre_add_view_content'   => 'hu-pre-add-view-content',
      'cancel_pre_add_btn'  => 'hu-cancel-add-new',
      'add_new_btn'       => 'hu-add-new',
      'pre_add_success'   => 'hu-add-success'
    );


    public function __construct( $manager, $id, $args = array() ) {
      parent::__construct($manager, $id, $args );
    }

    /**
    * Refresh the control parameters passed to the JavaScript via JSON.
    *
    *
    * @Override
    * @see WP_Customize_Control::to_json()
    */
    public function to_json() {
      $this->json['css_attr'] = $this -> css_attr;
      parent::to_json();
    }
  }//class
endif;