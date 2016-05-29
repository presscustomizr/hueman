<?php
/*
* @since 4.0
*/
if ( ! class_exists( 'HU_Customize_Dynamic_Control' ) ) :
  class HU_Customize_Dynamic_Control extends HU_Advanced_Control {

    /**
    * Constructor.
    *
    */
    public function __construct($manager, $id, $args = array()) {

      //let the parent do what it has to
      parent::__construct($manager, $id, $args );

      //add specific js templates for this control
      //this is usually called in the manager for "registered" controls that need to be rendered with js
      //for this control, we'll do it another way because we need several js templates
      //=> that's why this control has not been "registered" and js templates are printed with the following action
      add_action( 'customize_controls_print_footer_scripts', array( $this, 'hu_print_control_templates' ), 1 );

      //print the view
      add_action( 'customize_controls_print_footer_scripts', array( $this, 'hu_print_view_template' ), 1 );

      //print the view content
      //callback declared in the child classes
      add_action( 'customize_controls_print_footer_scripts', array( $this, 'hu_print_view_content_template' ), 1 );

      //print the alert template
      add_action( 'customize_controls_print_footer_scripts', array( $this, 'hu_print_alert_template' ), 1 );
    }


    /**
     * Don't render any content for this control from PHP.
     *
     *
     */
    public function render_content() {}



    public function hu_print_control_templates() {
      $css_attr = HU_customize::$instance -> css_attr;
      //Render the control wrapper
      //we'll inject subviews in it
      //this template is rendered by default in customize-control.js by the api.Control.renderContent() method
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
        <button class="<?php echo $css_attr['open_pre_add_btn']; ?>"><?php _e('Add New', 'hueman'); ?> <span class="fa fa-plus-square"></span></button>
        <div class="<?php echo $css_attr['pre_add_wrapper']; ?>">
          <div class="<?php echo $css_attr['pre_add_success']; ?>"><p></p></div>
          <div class="<?php echo $css_attr['pre_add_view_content']; ?>">

            <span class="<?php echo $css_attr['cancel_pre_add_btn']; ?> button"><?php _e('Cancel', 'hueman'); ?></span> <span class="<?php echo $css_attr['add_new_btn']; ?> button"><?php _e('Add it', 'hueman'); ?></span>
          </div>
        </div>

        <ul class="<?php echo $css_attr['views_wrapper']; ?>"></ul>

      </script>

      <?php
    }


    public function hu_print_view_template() {
      $css_attr = HU_customize::$instance -> css_attr;
        //the following template is a "sub view"
        //it's rendered :
        //1) on customizer start, depending on what is fetched from the db
        //2) dynamically when designing from the customizer
        //data looks like : { id : 'sidebar-one', title : 'A Title One' }
      ?>

      <script type="text/html" id="tmpl-customize-control-<?php echo $this->type; ?>-view">

          <div class="<?php echo $css_attr['view_header']; ?> czr-custom-model">
            <div class="<?php echo $css_attr['view_title']; ?> <?php echo $css_attr['sortable_handle']; ?>"><h4>{{ data.title }}</h4></div>
            <div class="<?php echo $css_attr['view_buttons']; ?>"><a title="<?php _e('Edit', 'hueman'); ?>" href="javascript:void(0);" class="fa fa-pencil <?php echo $css_attr['edit_view_btn']; ?>"></a>&nbsp;<a title="<?php _e('Remove', 'hueman'); ?>" href="javascript:void(0);" class="fa fa-trash <?php echo $css_attr['display_alert_btn']; ?>"></a></div>
            <div class="<?php echo $css_attr['remove_alert_wrapper']; ?>"></div>
          </div>
          <div class="<?php echo $css_attr['view_content']; ?>"></div>

      </script>
      <?php
    }

    function hu_print_alert_template() {
      $css_attr = HU_customize::$instance -> css_attr;
      ?>
        <script type="text/html" id="tmpl-customize-control-<?php echo $this->type; ?>-alert">
          <p><?php _e('Are you sure you want to remove : <strong>{{ data.title }} ?</strong>', 'hueman'); ?></p>
                  <span class="<?php echo $css_attr['remove_view_btn']; ?> button"><?php _e('Yes', 'hueman'); ?></span> <span class="<?php echo $css_attr['cancel_alert_btn']; ?> button"><?php _e('No', 'hueman'); ?></span>
        </script>
      <?php
    }

    /**
   * Enqueue scripts/styles
   * fired by the parent Control class constructor
   *
   */
    public function enqueue() {
      wp_enqueue_script( 'wp-color-picker' );
      wp_enqueue_style( 'wp-color-picker' );

      wp_enqueue_style(
        'font-awesome',
        sprintf('%1$s/assets/front/css/font-awesome.min.css', get_template_directory_uri() ),
        array(),
        HUEMAN_VER,
        $media = 'all'
      );

      //select2 stylesheet
      //overriden by some specific style in theme-customzer-control.css
      wp_enqueue_style(
        'select2-css',
        sprintf('%1$s/assets/czr/css/lib/select2.min.css', get_template_directory_uri() ),
        array( 'customize-controls' ),
        HUEMAN_VER,
        $media = 'all'
      );

    }
  }//end class
endif;
