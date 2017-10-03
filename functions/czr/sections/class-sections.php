<?php
/**
 * Base customizer section.
 */
class HU_Customize_Sections extends WP_Customize_Section {

    /**
     * The type of customize section being rendered.
     *
     * @var    string
     */
    public $type = 'czr-customize-sections';

    public $ubq_panel;


    /**
     * Add custom parameters to pass to the JS via JSON.
     *
     * @return void
     * @override
     */
    public function json() {
      $json = parent::json();
      if ( is_array( $this->ubq_panel ) && array_key_exists( 'panel', $this->ubq_panel ) ) {
        $json['ubq_panel'] = $this->ubq_panel;
      }
      return $json;
    }
}
?>
