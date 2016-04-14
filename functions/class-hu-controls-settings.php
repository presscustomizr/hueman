<?php
/***************************************************
* AUGMENTS WP CUSTOMIZE SETTINGS
***************************************************/
if ( ! class_exists( 'HU_Customize_Setting') ) :
  class HU_Customize_Setting extends WP_Customize_Setting {
    /**
     * Fetch the value of the setting.
     *
     * @since 3.4.0
     *
     * @return mixed The value.
     */
    public function value() {
        // Get the callback that corresponds to the setting type.
        switch( $this->type ) {
          case 'theme_mod' :
            $function = 'get_theme_mod';
            break;
          case 'option' :
            $function = 'get_option';
            break;
          default :

            /**
             * Filter a Customize setting value not handled as a theme_mod or option.
             *
             * The dynamic portion of the hook name, `$this->id_date['base']`, refers to
             * the base slug of the setting name.
             *
             * For settings handled as theme_mods or options, see those corresponding
             * functions for available hooks.
             *
             * @since 3.4.0
             *
             * @param mixed $default The setting default value. Default empty.
             */
            return apply_filters( 'customize_value_' . $this->id_data[ 'base' ], $this->default );
        }

        // Handle non-array value
        if ( empty( $this->id_data[ 'keys' ] ) )
          return $function( $this->id_data[ 'base' ], $this->default );

        // Handle array-based value
        $values = $function( $this->id_data[ 'base' ] );

        //Ctx future backward compat
        $_maybe_array = $this->multidimensional_get( $values, $this->id_data[ 'keys' ], $this->default );
        if ( ! is_array( $_maybe_array ) )
          return $_maybe_array;
        if ( isset($_maybe_array['all_ctx']) )
          return $_maybe_array['all_ctx'];
        if ( isset($_maybe_array['all_ctx_over']) )
          return $_maybe_array['all_ctx_over'];

        return $_maybe_array;
        //$this->default;
      }
  }
endif;




















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
    add_action( 'customize_controls_print_footer_scripts', array( $this, 'hu_render_widget_zone_template' ), 1 );

  }


  /**
   * Render the section, and the controls that have been added to it.
   * hook : customize_controls_print_footer_scripts
   */
  public function hu_render_widget_zone_template() {
    ?>
    <script type="text/html" id="tmpl-customize-section-<?php echo $this->type; ?>">
      <li id="accordion-section-{{ data.id }}" class="hu-widget-zone-section accordion-section control-section control-section-{{ data.type }}">
      <h3 class="accordion-section-title" tabindex="0">
        {{ data.title }}
        <span class="screen-reader-text"><?php _e( 'Press return or enter to open this section', 'hueman' ); ?></span>
      </h3>
      <ul class="accordion-section-content">

      </ul>
    </li>
    </script>
    <?php
  }
}//class

endif;




















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
      'display_alert_btn' => 'hu-display-alert',
      'remove_alert_wrapper'   => 'hu-remove-alert-wrapper',
      'cancel_alert_btn'  => 'hu-cancel-button',
      'remove_view_btn'        => 'hu-remove-button',
      'edit_view_btn'     => 'hu-edit-view',
      'add_view_btn'      => 'hu-add-new'
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
        <div class="hu-sub-set">
          <div class="customize-control-title"><?php _e('Color', 'hueman'); ?></div>
          <div class="hu-input" data-input-type="color">
            <input data-type="background-color" type="text" value="{{ data['background-color'] }}"></input>
          </div>
        </div>

        <div class="hu-sub-set" data-input-type="select">
          <div class="customize-control-title"><?php _e('Repeat', 'hueman'); ?></div>
          <div class="hu-input">
            <select data-type="background-repeat"></select>
          </div>
        </div>

        <div class="hu-sub-set" data-input-type="select">
          <div class="customize-control-title"><?php _e('Background attachment', 'hueman'); ?></div>
          <div class="hu-input">
            <select data-type="background-attachment"></select>
          </div>
        </div>

        <div class="hu-sub-set" data-input-type="select">
          <div class="customize-control-title"><?php _e('Background position', 'hueman'); ?></div>
          <div class="hu-input">
            <select data-type="background-position"></select>
          </div>
        </div>

        <div class="hu-sub-set" data-input-type="text">
          <div class="customize-control-title"><?php _e('Background size', 'hueman'); ?></div>
          <div class="hu-input">
            <input data-type="background-size" type="text" value="{{ data['background-size'] }}"></input>
          </div>
        </div>

        <div class="hu-sub-set" data-input-type="upload">
          <div class="customize-control-title"><?php _e('Background Image', 'hueman'); ?></div>
          <div class="hu-input">
            <input data-type="background-image" type="hidden" value="{{ data['background-image'] }}"></input>
          </div>
        </div>

      </script>
      <?php
    }

  }
endif;










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
      $css_attr = $this -> css_attr
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
        <button class="<?php echo $css_attr['add_view_btn']; ?>">Add New</button>
        <ul class="<?php echo $css_attr['views_wrapper']; ?>"></ul>

      </script>

      <?php
    }


    public function hu_print_view_template() {
      $css_attr = $this -> css_attr
        //the following template is a "sub view"
        //it's rendered :
        //1) on customizer start, depending on what is fetched from the db
        //2) dynamically when designing from the customizer
        //data looks like : { id : 'sidebar-one', title : 'A Title One' }
      ?>

      <script type="text/html" id="tmpl-customize-control-<?php echo $this->type; ?>-view">

          <div class="<?php echo $css_attr['view_header']; ?> hu-custom-model">
            <div class="<?php echo $css_attr['view_title']; ?>"><h4>{{ data.title }}</h4></div>
            <div class="<?php echo $css_attr['view_buttons']; ?>"><a title="<?php _e('Edit', 'hueman'); ?>" href="javascript:void(0);" class="fa fa-pencil <?php echo $css_attr['edit_view_btn']; ?>"></a>&nbsp;<a title="<?php _e('Remove', 'hueman'); ?>" href="javascript:void(0);" class="fa fa-trash <?php echo $css_attr['display_alert_btn']; ?>"></a></div>
            <div class="<?php echo $css_attr['remove_alert_wrapper']; ?>"></div>
          </div>
          <div class="<?php echo $css_attr['view_content']; ?>"></div>

      </script>
      <?php
    }

    function hu_print_alert_template() {
      $css_attr = $this -> css_attr
      ?>
        <script type="text/html" id="tmpl-customize-control-<?php echo $this->type; ?>-alert">
          <p><?php _e('Are you sure you want to remove : <strong>{{ data.title }} ?</strong>', 'hueman'); ?></p>
                  <span class="<?php echo $css_attr['remove_view_btn']; ?> button"><?php _e('Yes', 'hueman'); ?></span> <span class="<?php echo $css_attr['cancel_alert_btn']; ?> button"><?php _e('No', 'hueman'); ?></span>
        </script>
      <?php
    }
  }//end class
endif;



















/*
* @since 4.0
*/
if ( ! class_exists( 'HU_Customize_Widget_Areas_Control' ) ) :
  class HU_Customize_Widget_Areas_Control extends HU_Customize_Dynamic_Control {

    public $contexts;
    public $locations;
    public $default_zones;

    /**
    * Constructor.
    *
    */
    public function __construct($manager, $id, $args = array()) {
      //let the parent educate us
      parent::__construct($manager, $id, $args );

      $this -> contexts = hu_get_contexts_list();

      $_default_locations = hu_get_builtin_widget_zones_location();
      //generates the locations for json
      $locations = array();
      foreach ($_default_locations as $_id => $data ) {
        $_k = key($data);
        $locations[$_k] = $data[$_k];
      }

      $this -> locations = $locations;

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
      $this -> default_zones = $default_zones;

      //print template for built-in models like primary, secondary, footer-1, etc...
      add_action( 'customize_controls_print_footer_scripts', array( $this, 'hu_print_built_in_templates' ), 1 );
    }//construct


    public function to_json() {
      $this -> json['sidebar_contexts'] = $this -> contexts;
      $this -> json['sidebar_locations'] = $this -> locations;
      //$this -> json['default_zones'] = $this -> default_zones;
      parent::to_json();
    }

    //print template for built-in models like primary, secondary, footer-1, etc...
    function hu_print_built_in_templates() {
      $css_attr = $this -> css_attr
      //REDUCED VIEW TEMPLATE
      //no remove button
      //no remove alert wrapper
      ?>
        <script type="text/html" id="tmpl-customize-control-<?php echo $this->type; ?>-view-reduced">

            <div class="<?php echo $css_attr['view_header']; ?> hu-builtin-model">
              <div class="<?php echo $css_attr['view_title']; ?>"><h4>{{ data.title }}</h4></div>
              <div class="<?php echo $css_attr['view_buttons']; ?>"><a title="<?php _e('Edit', 'hueman'); ?>" href="javascript:void(0);" class="fa fa-pencil <?php echo $css_attr['edit_view_btn']; ?>"></a></div>
            </div>
            <div class="<?php echo $css_attr['view_content']; ?>"></div>

        </script>
      <?php



      //REDUCED VIEW CONTENT TEMPLATE
      //only the contexts and the locations can be set.
      ?>
        <script type="text/html" id="tmpl-customize-control-<?php echo $this->type; ?>-view-content-reduced">
          <div class="hu-sub-set">
            <div class="customize-control-title"><?php _e('Name', 'hueman'); ?></div>
            <div class="hu-input">
              <span>{{ data.title }}</span>
            </div>
          </div>
          <div class="hu-sub-set">
            <div class="customize-control-title"><?php _e('id', 'hueman'); ?></div>
            <div class="hu-input">
              <span><?php _e('unique id', 'hueman')?> : {{ data.id }}</span>
            </div>
          </div>
          <div class="hu-sub-set width-100">
            <div class="customize-control-title"><?php _e('Location(s)', 'hueman'); ?></div>
            <span class="hu-notice"><?php _e('Select the pre-defined location(s) in which you will embed this widget zone.', 'hueman'); ?></span>
            <div class="hu-input">
              <select data-type="locations" class="js-example-basic-multiple" multiple="multiple"></select>
            </div>
          </div>
          <div class="hu-sub-set width-100">
            <div class="customize-control-title"><?php _e('Context(s)', 'hueman'); ?></div>
            <span class="hu-notice"><?php _e('Pick the contexts where this widget area will be displayed.', 'hueman'); ?></span>
            <div class="hu-input">
              <select data-type="contexts" class="js-example-basic-multiple" multiple="multiple"></select>
            </div>
          </div>
        </script>
      <?php
    }



    //Fired by the parent class
    function hu_print_view_content_template() {
      $css_attr = $this -> css_attr
        //the following template is a "sub view"
        //it's rendered :
        //1) on customizer start, depending on what is fetched from the db
        //2) dynamically when designing from the customizer
        //data looks like : { id : 'sidebar-one', title : 'A Title One' }
      ?>

      <script type="text/html" id="tmpl-customize-control-<?php echo $this->type; ?>-view-content">
        <div class="hu-sub-set">
          <div class="customize-control-title"><?php _e('Name', 'hueman'); ?></div>
          <div class="hu-input">
            <input data-type="title" type="text" value="{{ data.title }}" placeholder="<?php _e('Enter a name', 'hueman'); ?>"></input>
          </div>
          <span class="hu-notice"><?php _e('Personalizing the name of the widget zone will help you identify it.', 'hueman'); ?></span>
        </div>
        <div class="hu-sub-set">
          <div class="customize-control-title"><?php _e('id', 'hueman'); ?></div>
          <div class="hu-input">
            <span><?php _e('unique id', 'hueman')?> : {{ data.id }}</span>
          </div>
        </div>
        <div class="hu-sub-set width-100">
          <div class="customize-control-title"><?php _e('Location(s)', 'hueman'); ?></div>
          <span class="hu-notice"><?php _e('Select the pre-defined location(s) in which you will embed this widget zone.', 'hueman'); ?></span>
          <div class="hu-input">
            <select data-type="locations" class="js-example-basic-multiple" multiple="multiple"></select>
          </div>
        </div>
        <div class="hu-sub-set width-100">
          <div class="customize-control-title"><?php _e('Context(s)', 'hueman'); ?></div>
          <span class="hu-notice"><?php _e('Pick the context(s) where this widget area will be displayed.', 'hueman'); ?></span>
          <div class="hu-input">
            <select data-type="contexts" class="js-example-basic-multiple" multiple="multiple"></select>
          </div>
        </div>
      </script>


      <?php
    }

  }
endif;




















/*
* @since 4.0
*/
if ( ! class_exists( 'HU_Customize_Socials' ) ) :
  class HU_Customize_Socials extends HU_Customize_Dynamic_Control {
    /**
    * Constructor.
    *
    */
    public function __construct($manager, $id, $args = array()) {
      //let the parent do what it has to
      parent::__construct($manager, $id, $args );
    }


    public function hu_print_view_content_template() {
      $css_attr = $this -> css_attr
        //the following template is a "sub view"
        //it's rendered :
        //1) on customizer start, depending on what is fetched from the db
        //2) dynamically when designing from the customizer
        //data looks like : { id : 'sidebar-one', title : 'A Title One' }
      ?>

      <script type="text/html" id="tmpl-customize-control-<?php echo $this->type; ?>-view-content">
        <!-- <div class="hu-sub-set">
          <div class="customize-control-title"><?php _e('Id', 'hueman'); ?></div>
          <div class="hu-input">
            <span data-type="id">{{ data.id }}</span>
          </div>
        </div> -->
        <div class="hu-sub-set">
          <div class="customize-control-title"><?php _e('Social icon', 'hueman'); ?></div>
          <div class="hu-input">
            <select data-type="social-icon"></select>
            <!-- <input type="text" value="{{ data['social-icon'] }}"></input> -->
          </div>
        </div>
        <div class="hu-sub-set">
          <div class="customize-control-title"><?php _e('Social link', 'hueman'); ?></div>
          <div class="hu-input">
            <input data-type="social-link" type="text" value="{{ data['social-link'] }}" placeholder="<?php _e('http://...', 'hueman'); ?>"></input>
          </div>
          <span class="hu-notice"><?php _e('Enter the full url of your social profile (must start with "http://").', 'hueman'); ?></span>
        </div>
        <div class="hu-sub-set">
          <div class="customize-control-title"><?php _e('Title', 'hueman'); ?></div>
          <div class="hu-input">
            <input data-type="title" type="text" value="{{ data.title }}"></input>
          </div>
          <span class="hu-notice"><?php _e('This is the text displayed on mouse over.', 'hueman'); ?></span>
        </div>

        <div class="hu-sub-set width-100">
          <div class="customize-control-title"><?php _e('Icon color', 'hueman'); ?></div>
          <div class="hu-input">
            <input data-type="social-color" type="text" value="{{ data['social-color'] }}"></input>
          </div>
          <span class="hu-notice"><?php _e('Set a unique color for your icon.', 'hueman'); ?></span>
        </div>
        <div class="hu-sub-set">
          <# //the previous hueman option system was storing this option in an array
            data['social-target'] = _.isArray( data['social-target'] ) ? data['social-target'][0] : data['social-target'];
            var _checked = ( false != data['social-target'] ) ? "checked=checked" : '';
          #>
          <div class="customize-control-title"><?php _e('Link target', 'hueman'); ?></div>
          <div class="hu-input">
            <input data-type="social-target" type="checkbox" {{ _checked }}></input>
          </div>
          <span class="hu-notice"><?php _e('Check this option to open the link in a another tab of the browser.', 'hueman'); ?></span>
        </div>

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
        sprintf('%1$s/assets/global/fonts/font-awesome.min.css', get_template_directory_uri() ),
        array(),
        HUEMAN_VER,
        $media = 'all'
      );

      //select2 stylesheet
      //overriden by some specific style in theme-customzer-control.css
      wp_enqueue_style(
        'select2-css',
        sprintf('%1$s/assets/back/css/lib/select2.min.css', get_template_directory_uri() ),
        array( 'customize-controls' ),
        HUEMAN_VER,
        $media = 'all'
      );

    }


  }
endif;





/**
* Add controls to customizer
*
*/
if ( ! class_exists( 'HU_controls' ) ) :
  class HU_controls extends WP_Customize_Control  {
      public $type;
      public $link;
      public $title;
      public $label;
      public $buttontext;
      public $settings;
      public $hr_after;
      public $notice;
      //number vars
      public $step;
      public $min;
      public $icon;

      public function render_content()  {
        do_action( '__before_setting_control' , $this -> id );

        switch ( $this -> type) {
            case 'hr':
              echo '<hr class="hu-customizer-separator" />';
            break;


            case 'title' :
              ?>
              <?php if (isset( $this->title)) : ?>
              <h3 class="hu-customizr-title"><?php echo esc_html( $this->title); ?></h3>
              <?php endif; ?>
              <?php if (isset( $this->notice)) : ?>
              <i class="hu-notice"><?php echo $this -> notice ?></i>
             <?php endif; ?>

            <?php
            break;

            case 'select':
              if ( empty( $this->choices ) )
                return;
              ?>
              <?php if (!empty( $this->title)) : ?>
                <h3 class="hu-customizr-title"><?php echo esc_html( $this->title); ?></h3>
              <?php endif; ?>
              <label>
                <span class="customize-control-title"><?php echo $this->label; ?></span>
                <?php $this -> hu_print_select_control( '' ) ?>
                <?php if(!empty( $this -> notice)) : ?>
                  <span class="hu-notice"><?php echo $this -> notice ?></span>
                <?php endif; ?>
              </label>
              <?php

            break;


            case 'number':
              ?>
              <?php if (isset( $this->title)) : ?>
                <h3 class="hu-customizr-title"><?php echo esc_html( $this->title); ?></h3>
              <?php endif; ?>
              <label>
                <span class="hu-number-label customize-control-title"><?php echo $this->label ?></span>
                <input <?php $this->link() ?> type="number" step="<?php echo $this-> step ?>" min="<?php echo $this-> min ?>" id="posts_per_page" value="<?php echo $this->value() ?>" class="hu-number-input small-text">
                <?php if(!empty( $this -> notice)) : ?>
                  <span class="hu-notice"><?php echo $this-> notice ?></span>
                <?php endif; ?>
              </label>
              <?php
              break;

            case 'checkbox':
              ?>
              <?php if (isset( $this->title)) : ?>
                <h3 class="hu-customizr-title"><?php echo esc_html( $this->title); ?></h3>
              <?php endif; ?>
              <?php
                    printf('<div class="hu-check-label"><label><span class="customize-control-title">%1$s</span></label></div>',
                    $this->label
                  );
              ?>
              <input <?php $this->link(); ?> type="checkbox" value="<?php echo esc_attr( $this->value() ); ?>"  <?php hu_checked( $this->value() ); ?> />

              <?php if(!empty( $this -> notice)) : ?>
               <span class="hu-notice"><?php echo $this-> notice ?></span>
              <?php endif; ?>
              <?php
            break;

            case 'textarea':
              ?>
              <?php if (isset( $this->title)) : ?>
                <h3 class="hu-customizr-title"><?php echo esc_html( $this->title); ?></h3>
              <?php endif; ?>
              <label>
                <span class="customize-control-title"><?php echo $this->label; ?></span>
                <?php if(!empty( $this -> notice)) : ?>
                  <span class="hu-notice"><?php echo $this-> notice; ?></span>
                <?php endif; ?>
                <textarea class="widefat" rows="3" cols="10" <?php $this->link(); ?>><?php echo esc_html( $this->value() ); ?></textarea>
              </label>
              <?php
              break;

            case 'url':
            case 'email':
              ?>
              <?php if (isset( $this->title)) : ?>
              <h3 class="hu-customizr-title"><?php echo esc_html( $this->title); ?></h3>
              <?php endif; ?>
              <?php
              printf('<label><span class="customize-control-title %1$s">%2$s</span><input type="text" value="%3$s" %4$s /></label>',
                ! empty( $this -> icon) ? $this -> icon : '',
                $this->label,
                call_user_func( array( HU_utils_settings_map::$instance, 'hu_sanitize_' . $this -> type), $this->value() ),
                call_user_func( array( $this, 'get'.'_'.'link' ) )
              );
              break;


            default:
              global $wp_version;
              ?>
              <?php if (isset( $this->title)) : ?>
                <h3 class="hu-customizr-title"><?php echo esc_html( $this->title); ?></h3>
              <?php endif; ?>
              <label>
                <?php if ( ! empty( $this->label ) ) : ?>
                  <span class="customize-control-title"><?php echo $this->label; ?></span>
                <?php endif; ?>
                <?php if ( ! empty( $this->description ) ) : ?>
                  <span class="description customize-control-description"><?php echo $this->description; ?></span>;;;
                <?php endif; ?>
                <?php if ( ! version_compare( $wp_version, '4.0', '>=' ) ) : ?>
                  <input type="<?php echo esc_attr( $this->type ); ?>" value="<?php echo esc_attr( $this->value() ); ?>" <?php $this->link(); ?> />
                <?php else : ?>
                  <input type="<?php echo esc_attr( $this->type ); ?>" <?php $this->input_attrs(); ?> value="<?php echo esc_attr( $this->value() ); ?>" <?php $this->link(); ?> />
                <?php endif; ?>
                <?php if(!empty( $this -> notice)) : ?>
                  <span class="hu-notice"><?php echo $this-> notice; ?></span>
                <?php endif; ?>
              </label>
              <?php
            break;
          }//end switch
          do_action( '__after_setting_control' , $this -> id );
     }//end function




    private function hu_print_select_control($class) {
      printf('<select %1$s class="%2$s">%3$s</select>',
        call_user_func( array( $this, 'get'.'_'.'link' ) ),
        $class,
        $this -> hu_get_select_options()
      );
    }


    private function hu_get_select_options() {
      $_options_html = '';
      switch ( $this -> id ) {
        default:
          foreach ( $this->choices as $value => $label ) {
            $_options_html .= sprintf('<option value="%1$s" %2$s>%3$s</option>',
              esc_attr( $value ),
              selected( $this->value(), $value, false ),
              $label
            );
          }
        break;
      }//end switch
      return $_options_html;
    }//end of fn

  }//end of class
endif;



/*
*/
if ( class_exists('WP_Customize_Cropped_Image_Control') && ! class_exists( 'HU_Customize_Cropped_Image_Control' ) ) :
  class HU_Customize_Cropped_Image_Control extends WP_Customize_Cropped_Image_Control {
    public $type = 'hu_cropped_image';
    public $title;
    public $notice;
    public $dst_width;
    public $dst_height;


    /**
    * Refresh the parameters passed to the JavaScript via JSON.
    *
    *
    * @Override
    * @see WP_Customize_Control::to_json()
    */
    public function to_json() {
        parent::to_json();
        $this->json['title']  = !empty( $this -> title )  ? esc_html( $this -> title ) : '';
        $this->json['notice'] = !empty( $this -> notice ) ?           $this -> notice  : '';

        $this->json['dst_width']  = isset( $this -> dst_width )  ?  $this -> dst_width  : $this -> width;
        $this->json['dst_height'] = isset( $this -> dst_height ) ?  $this -> dst_height : $this -> height;
        //overload WP_Customize_Upload_Control
        //we need to re-build the absolute url of the logo src set in old Customizr
        $value = $this->value();
        if ( $value ) {
          //re-build the absolute url if the value isn't an attachment id before retrieving the id
          if ( (int) esc_attr( $value ) < 1 ) {
            $upload_dir = wp_upload_dir();
            $value  = false !== strpos( $value , '/wp-content/' ) ? $value : $upload_dir['baseurl'] . $value;
          }
          // Get the attachment model for the existing file.
          $attachment_id = attachment_url_to_postid( $value );
          if ( $attachment_id ) {
              $this->json['attachment'] = wp_prepare_attachment_for_js( $attachment_id );
      }
      }//end overload
    }

    /**
  * Render a JS template for the content of the media control.
  *
  * @since 3.4.19
    * @package      Customizr
    *
    * @Override
  * @see WP_Customize_Control::content_template()
  */
    public function content_template() {
    ?>
    <# if ( data.title ) { #>
        <h3 class="hu-customizr-title">{{{ data.title }}}</h3>
      <# } #>
        <?php parent::content_template(); ?>
      <# if ( data.notice ) { #>
        <span class="hu-notice">{{{ data.notice }}}</span>
      <# } #>
    <?php
    }
  }//end class
endif;




/**************************************************************************************************
* LAYOUT SELECT
***************************************************************************************************/
if ( ! class_exists( 'HU_Customize_Layout_Control' ) ) :
  /**
  * Customize Multi-picker Control Class
  *
  * @package WordPress
  * @subpackage Customize
  * @since 3.4.10
  */
  class HU_Customize_Layout_Control extends HU_controls {

    public function render_content() {
      if ( empty( $this->choices ) )
        return;

      ?>
      <?php if (!empty( $this->title)) : ?>
        <h3 class="hu-customizr-title"><?php echo esc_html( $this->title); ?></h3>
      <?php endif; ?>
      <label>
        <span class="customize-control-title"><?php echo $this->label; ?></span>
        <?php $this -> hu_print_select_control( 'no-selecter-js' ); //no-selecter-js : we don't want the default selecter $ plugin fired for this control ?>
        <?php if(!empty( $this -> notice)) : ?>
          <span class="hu-notice"><?php echo $this -> notice ?></span>
        <?php endif; ?>
      </label>
      <?php
    }


    private function hu_print_select_control($class) {
      printf('<select %1$s class="%2$s">%3$s</select>',
        call_user_func( array( $this, 'get'.'_'.'link' ) ),
        $class,
        $this -> hu_get_select_options()
      );
    }


    private function hu_get_select_options() {
      $_options_html = '';
      switch ( $this -> id ) {
        default:
          foreach ( $this->choices as $value => $data ) {
            $_options_html .= sprintf('<option value="%1$s" %2$s>%3$s</option>',
              esc_attr( $value ),
              selected( $this->value(), $value, false ),
              $data['label']
            );
          }
        break;
      }//end switch
      return $_options_html;
    }//end of fn


    public function to_json() {
      parent::to_json();
      $this->json['layouts'] = $this->choices;
    }
  }//end class
endif;




/**************************************************************************************************
* MULTIPICKER CLASSES
***************************************************************************************************/
if ( ! class_exists( 'HU_Customize_Multipicker_Control' ) ) :
  /**
  * Customize Multi-picker Control Class
  *
  * @package WordPress
  * @subpackage Customize
  * @since 3.4.10
  */
  abstract class HU_Customize_Multipicker_Control extends HU_controls {

    public function render_content() {

      if ( ! $this -> type ) return;
      do_action( '__before_setting_control' , $this -> id );

      $dropdown = $this -> hu_get_dropdown_multipicker();

      if ( empty( $dropdown ) ) return;

      $dropdown = str_replace( '<select', '<select multiple="multiple"' . $this->get_link(), $dropdown );
      //start rendering
      if (!empty( $this->title)) :
    ?>
        <h3 class="hu-customizr-title"><?php echo esc_html( $this->title); ?></h3>
      <?php endif; ?>

      <label>
        <span class="customize-control-title"><?php echo $this->label; ?></span>
        <?php echo $dropdown; ?>
        <?php if(!empty( $this -> notice)) : ?>
          <span class="hu-notice"><?php echo $this -> notice ?></span>
         <?php endif; ?>
      </label>
    <?php
      do_action( '__after_setting_control' , $this -> id );
    }

    //to define in the extended classes
    abstract public function hu_get_dropdown_multipicker();
  }//end class
endif;

if ( ! class_exists( 'HU_Customize_Multipicker_Categories_Control' ) ) :
  class HU_Customize_Multipicker_Categories_Control extends HU_Customize_Multipicker_Control {

    public function hu_get_dropdown_multipicker() {
      $cats_dropdown = wp_dropdown_categories(
          array(
              'name'               => '_customize-'.$this->type,
              'id'                 => $this -> id,
              //hide empty, set it to false to avoid complains
              'hide_empty'         => 0 ,
              'echo'               => 0 ,
              'walker'             => new HU_Walker_CategoryDropdown_Multipicker(),
              'hierarchical'       => 1,
              'class'              => 'select2 '.$this->type,
              'selected'           => implode(',', $this->value() )
          )
      );

      return $cats_dropdown;
    }
  }
endif;


/**
 * @ dropdown multi-select walker
 * Create HTML dropdown list of Categories.
 *
 * @package WordPress
 * @since 2.1.0
 * @uses Walker
 *
 * we need to allow more than one "selected" attribute
 */

if ( ! class_exists( 'HU_Walker_CategoryDropdown_Multipicker' ) ) :
  class HU_Walker_CategoryDropdown_Multipicker extends Walker_CategoryDropdown {
    /**
     * Start the element output.
     *
     * @Override
     *
     * @see Walker::start_el()
     *
     * @param string $output   Passed by reference. Used to append additional content.
     * @param object $category Category data object.
     * @param int    $depth    Depth of category. Used for padding.
     * @param array  $args     Uses 'selected', 'show_count', and 'value_field' keys, if they exist.
     *                         See {@see wp_dropdown_categories()}.
     */
    public function start_el( &$output, $category, $depth = 0, $args = array(), $id = 0 ) {
      $pad = str_repeat('&mdash;', $depth );
      /** This filter is documented in wp-includes/category-template.php */
      $cat_name = apply_filters( 'list_cats', $category->name, $category );

      $value_field = 'term_id';

      $output .= "\t<option class=\"level-$depth\" value=\"" . esc_attr( $category->{$value_field} ) . "\"";
      //Treat selected arg as array
      if ( in_array( (string) $category->{$value_field}, explode( ',', $args['selected'] ) ) )
        $output .= ' selected="selected"';

      $output .= '>';
      $output .= $pad.$cat_name;
      if ( $args['show_count'] )
        $output .= '&nbsp;&nbsp;('. number_format_i18n( $category->count ) .')';
      $output .= "</option>\n";
    }
  }
endif;
/**************************************************************************************************
* END OF MULTIPICKER CLASSES
***************************************************************************************************/












/*********************************************************************************
* Old upload control used until v3.4.18, still used if current version of WP is < 4.3
**********************************************************************************/

if ( ! class_exists( 'HU_Customize_Upload_Control' ) ) :
  /**
   * Customize Upload Control Class
   *
   * @package WordPress
   * @subpackage Customize
   * @since 3.4.0
   */
  class HU_Customize_Upload_Control extends WP_Customize_Control {
    public $type    = 'hu_upload';
    public $removed = '';
    public $context;
    public $extensions = array();
    public $title;
    public $notice;

    /**
     * Enqueue control related scripts/styles.
     *
     * @since 3.4.0
     */
    public function enqueue() {
      wp_enqueue_script( 'wp-plupload' );
    }

    /**
     * Refresh the parameters passed to the JavaScript via JSON.
     *
     * @since 3.4.0
     * @uses WP_Customize_Control::to_json()
     */
    public function to_json() {
      parent::to_json();

      $this->json['removed'] = $this->removed;

      if ( $this->context )
        $this->json['context'] = $this->context;

      if ( $this->extensions )
        $this->json['extensions'] = implode( ',', $this->extensions );
    }

    /**
     * Render the control's content.
     *
     * @since 3.4.0
     */
  public function render_content() {
      do_action( '__before_setting_control' , $this -> id );
      ?>
      <?php if ( isset( $this->title) ) : ?>
        <h3 class="hu-customizr-title"><?php echo esc_html( $this->title); ?></h3>
      <?php endif; ?>
      <label>
        <?php if ( ! empty( $this->label ) ) : ?>
          <span class="customize-control-title"><?php echo $this->label; ?></span>
        <?php endif;
        if ( ! empty( $this->description ) ) : ?>
          <span class="description customize-control-description"><?php echo $this->description; ?></span>
        <?php endif; ?>
        <div>
          <a href="#" class="button-secondary hu-upload"><?php _e( 'Upload' , 'hueman'  ); ?></a>
          <a href="#" class="remove"><?php _e( 'Remove' , 'hueman'  ); ?></a>
        </div>
        <?php if(!empty( $this -> notice)) : ?>
          <span class="hu-notice"><?php echo $this -> notice; ?></span>
        <?php endif; ?>
      </label>
      <?php
      do_action( '__after_setting_control' , $this -> id );
    }
  }
endif;