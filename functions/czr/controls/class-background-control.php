<?php
/*
* @since 4.0
*/
if ( ! class_exists( 'HU_Body_Background_Control' ) ) :
  class HU_Body_Background_Control extends HU_Advanced_Control {

    /**
    * Constructor.
    *
    */
    public function __construct( $manager, $id, $args = array() ) {
      //let the parent do what it has to
      parent::__construct($manager, $id, $args );

      //add specific js templates for this control
      //this is usually called in the manager for "registered" controls that need to be rendered with js
      //for this control, we'll do it another way because we need several js templates
      //=> that's why this control has not been "registered" and js templates are printed with the following action
      add_action( 'customize_controls_print_footer_scripts', array( $this, 'hu_print_control_templates' ), 1 );
      //print the view content
      //callback declared in the child classes
      add_action( 'customize_controls_print_footer_scripts', array( $this, 'hu_print_view_content_template' ), 1 );
    }


    /**
     * Don't render any content for this control from PHP.
     *
     *
     */
    public function render_content() {}

    //this js template is rendered by default if exists in customize-control.js
    function hu_print_control_templates() {
      $css_attr = $this -> css_attr
        //the following template is a "sub view"
        //it's rendered :
        //1) on customizer start, depending on what is fetched from the db
        //2) dynamically when designing from the customizer
        //data looks like : { id : 'sidebar-one', title : 'A Title One' }
      ?>
      <script type="text/html" id="tmpl-customize-control-<?php echo $this->type; ?>-content">
        <label for="{{ data.settings['default'] }}-button">

          <# if ( data.label ) { #>
            <span class="customize-control-title">{{ data.label }}</span>
          <# } #>
          <# if ( data.description ) { #>
            <span class="description customize-control-description">{{{ data.description }}}</span>
          <# } #>
        </label>
        <div class="<?php echo $css_attr['multi_input_wrapper']; ?>"></div>

      </script>
      <?php
    }


    function hu_print_view_content_template() {
      ?>
      <script type="text/html" id="tmpl-customize-control-<?php echo $this->type; ?>-view-content">
        <div class="czr-sub-set">
          <div class="customize-control-title"><?php _e('Color', 'hueman'); ?></div>
          <div class="czr-input" data-input-type="color">
            <input data-type="background-color" type="text" value="{{ data['background-color'] }}"></input>
          </div>
        </div>

        <div class="czr-sub-set" data-input-type="select">
          <div class="customize-control-title"><?php _e('Repeat', 'hueman'); ?></div>
          <div class="czr-input">
            <select data-type="background-repeat"></select>
          </div>
        </div>

        <div class="czr-sub-set" data-input-type="select">
          <div class="customize-control-title"><?php _e('Background attachment', 'hueman'); ?></div>
          <div class="czr-input">
            <select data-type="background-attachment"></select>
          </div>
        </div>

        <div class="czr-sub-set" data-input-type="select">
          <div class="customize-control-title"><?php _e('Background position', 'hueman'); ?></div>
          <div class="czr-input">
            <select data-type="background-position"></select>
          </div>
        </div>

        <div class="czr-sub-set" data-input-type="text">
          <div class="customize-control-title"><?php _e('Background size', 'hueman'); ?></div>
          <div class="czr-input">
            <input data-type="background-size" type="text" value="{{ data['background-size'] }}"></input>
          </div>
        </div>

        <div class="czr-sub-set" data-input-type="upload">
          <div class="customize-control-title"><?php _e('Background Image', 'hueman'); ?></div>
          <div class="czr-input">
            <input data-type="background-image" type="hidden" value="{{ data['background-image'] }}"></input>
          </div>
        </div>

      </script>
      <?php
    }

  }
endif;