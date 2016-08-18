<?php
/*
* @since 4.0
*/
if ( ! class_exists( 'HU_Customize_Modules' ) ) :
  class HU_Customize_Modules extends HU_controls {
    public $module_type;
    public $syncCollection;
    public $syncSektion;

    /**
    * Constructor.
    *
    */
    public function __construct($manager, $id, $args = array()) {
      //let the parent do what it has to
      parent::__construct($manager, $id, $args );
    }

    public function render_content(){}

    public function to_json() {
      parent::to_json();
      $this->json['syncCollection'] = $this->syncCollection;
      $this->json['syncSektion'] = $this->syncSektion;
      $this->json['module_type'] = $this->module_type;
    }

  }
endif;