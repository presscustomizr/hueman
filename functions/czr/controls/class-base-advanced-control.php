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
      'multi_input_wrapper' => 'czr-multi-input-wrapper',
      'views_wrapper'     => 'czr-views-wrapper',
      'inner_view'        => 'czr-inner-view',
      'view_content'      => 'czr-view-content',
      'view_header'       => 'czr-view-header',
      'view_title'        => 'czr-view-title',
      'view_buttons'      => 'czr-view-buttons',
      'sortable_handle'   => 'czr-sortable-handle',

      //remove dialog
      'display_alert_btn' => 'czr-display-alert',
      'remove_alert_wrapper'   => 'czr-remove-alert-wrapper',
      'cancel_alert_btn'  => 'czr-cancel-button',
      'remove_view_btn'        => 'czr-remove-button',

      'edit_view_btn'     => 'czr-edit-view',
      //pre add dialog
      'open_pre_add_btn'      => 'czr-open-pre-add-new',
      'adding_new'        => 'czr-adding-new',
      'pre_add_wrapper'   => 'czr-pre-add-wrapper',
      'pre_add_view_content'   => 'czr-pre-add-view-content',
      'cancel_pre_add_btn'  => 'czr-cancel-add-new',
      'add_new_btn'       => 'czr-add-new',
      'pre_add_success'   => 'czr-add-success'
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