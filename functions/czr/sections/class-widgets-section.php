<?php
/***************************************************
* AUGMENTS WP CUSTOMIZE SECTIONS
***************************************************/
if ( ! class_exists( 'HU_Customize_Manage_Widgets_Section' ) ) :
  class HU_Customize_Manage_Widgets_Section extends WP_Customize_Section {

 /**
   * type of this section.
   *
   * @since 4.3.0
   * @access public
   * @var string
   */
  public $type = 'widget_zones_management';


  public function __construct( $manager, $id, $args = array() ) {
    //let the parent say what he needs to. We need to hear that sometimes.
    parent::__construct($manager, $id, $args );
    //add_action( 'customize_controls_print_footer_scripts', array( $this, 'hu_render_widget_zone_template' ), 1 );

  }


  /**
   * Render the section, and the controls that have been added to it.
   * hook : customize_controls_print_footer_scripts
   */
  public function hu_render_widget_zone_template() {
    ?>
    <script type="text/html" id="tmpl-customize-section-<?php echo $this->type; ?>">
      <li id="accordion-section-{{ data.id }}" class="czr-widget-zone-section accordion-section control-section control-section-{{ data.type }}">
      <h3 class="accordion-section-title" tabindex="0">
        {{ data.title }}
        <span class="screen-reader-text"><?php _e( 'Press return or enter to open this section', 'hueman' ); ?></span>
      </h3>
      <ul class="accordion-section-content"></ul>
    </li>
    </script>
    <?php
  }
}//class

endif;