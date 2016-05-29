<?php
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

      //print the pre add view content
      add_action( 'customize_controls_print_footer_scripts', array( $this, 'hu_print_pre_add_view_template' ), 1 );

      //print template for built-in models like primary, secondary, footer-1, etc...
      add_action( 'customize_controls_print_footer_scripts', array( $this, 'hu_print_built_in_templates' ), 1 );
    }//construct


    public function to_json() {
      $this -> json['sidebar_contexts'] = $this -> contexts;
      $this -> json['sidebar_locations'] = $this -> locations;
      //$this -> json['default_zones'] = $this -> default_zones;
      parent::to_json();
    }


    public function hu_print_pre_add_view_template() {
      $css_attr = HU_customize::$instance -> css_attr;
      ?>
      <script type="text/html" id="tmpl-customize-control-<?php echo $this->type; ?>-pre-add-view-content">
        <div class="czr-sub-set">
          <div class="customize-control-title"><?php _e('Name', 'hueman'); ?></div>
          <div class="czr-input">
            <input data-type="title" type="text" value="" placeholder="<?php _e('Give it a name', 'hueman'); ?>"></input>
          </div>
          <span class="czr-notice"><?php _e('Personalizing the name of the widget zone will help you identify it.', 'hueman'); ?></span>
        </div>
        <div class="czr-sub-set width-100">
          <div class="customize-control-title"><?php _e('Location(s)', 'hueman'); ?></div>
          <span class="czr-notice"><?php _e('Select the pre-defined location(s) in which you will embed this widget zone.', 'hueman'); ?></span>
          <div class="czr-input">
            <select data-type="locations" class="js-example-basic-multiple" multiple="multiple"></select>
          </div>
        </div>
      </script>
      <?php
    }



    //print template for built-in models like primary, secondary, footer-1, etc...
    function hu_print_built_in_templates() {
      $css_attr = HU_customize::$instance -> css_attr;
      //REDUCED VIEW TEMPLATE
      //no remove button
      //no remove alert wrapper
      ?>
        <script type="text/html" id="tmpl-customize-control-<?php echo $this->type; ?>-view-reduced">

            <div class="<?php echo $css_attr['view_header']; ?> czr-builtin-model">
              <div class="<?php echo $css_attr['view_title']; ?> <?php echo $css_attr['sortable_handle']; ?>"><h4>{{ data.title }}</h4></div>
              <div class="<?php echo $css_attr['view_buttons']; ?>"><a title="<?php _e('Edit', 'hueman'); ?>" href="javascript:void(0);" class="fa fa-pencil <?php echo $css_attr['edit_view_btn']; ?>"></a></div>
            </div>
            <div class="<?php echo $css_attr['view_content']; ?>"></div>

        </script>
      <?php



      //REDUCED VIEW CONTENT TEMPLATE
      //only the contexts and the locations can be set.
      ?>
        <script type="text/html" id="tmpl-customize-control-<?php echo $this->type; ?>-view-content-reduced">
          <div class="czr-sub-set">
            <div class="customize-control-title"><?php _e('id', 'hueman'); ?></div>
            <div class="czr-input">
              <span><?php _e('unique id', 'hueman')?> : {{ data.id }}</span>
            </div>
          </div>
          <div class="czr-sub-set">
            <div class="customize-control-title"><?php _e('Name', 'hueman'); ?></div>
            <div class="czr-input">
              <span>{{ data.title }}</span>
            </div>
          </div>
          <div class="czr-sub-set width-100">
            <div class="customize-control-title"><?php _e('Location(s)', 'hueman'); ?></div>
            <span class="czr-notice"><?php _e('Select the pre-defined location(s) in which you will embed this widget zone.', 'hueman'); ?></span>
            <div class="czr-input">
              <select data-type="locations" class="js-example-basic-multiple" multiple="multiple"></select>
            </div>
          </div>
          <div class="czr-sub-set width-100">
            <div class="customize-control-title"><?php _e('Context(s)', 'hueman'); ?></div>
            <span class="czr-notice"><?php _e('Pick the contexts where this widget area will be displayed.', 'hueman'); ?></span>
            <div class="czr-input">
              <select data-type="contexts" class="js-example-basic-multiple" multiple="multiple"></select>
            </div>
          </div>
        </script>
      <?php
    }



    //Fired by the parent class
    function hu_print_view_content_template() {
      $css_attr = HU_customize::$instance -> css_attr;
        //the following template is a "sub view"
        //it's rendered :
        //1) on customizer start, depending on what is fetched from the db
        //2) dynamically when designing from the customizer
        //data looks like : { id : 'sidebar-one', title : 'A Title One' }
      ?>

      <script type="text/html" id="tmpl-customize-control-<?php echo $this->type; ?>-view-content">
        <div class="czr-sub-set">
          <div class="customize-control-title"><?php _e('id', 'hueman'); ?></div>
          <div class="czr-input">
            <span><?php _e('unique id', 'hueman')?> : {{ data.id }}</span>
          </div>
        </div>
        <div class="czr-sub-set">
          <div class="customize-control-title"><?php _e('Name', 'hueman'); ?></div>
          <div class="czr-input">
            <input data-type="title" type="text" value="{{ data.title }}" placeholder="<?php _e('Enter a name', 'hueman'); ?>"></input>
          </div>
          <span class="czr-notice"><?php _e('Personalizing the name of the widget zone will help you identify it.', 'hueman'); ?></span>
        </div>
        <div class="czr-sub-set width-100">
          <div class="customize-control-title"><?php _e('Location(s)', 'hueman'); ?></div>
          <span class="czr-notice"><?php _e('Select the pre-defined location(s) in which you will embed this widget zone.', 'hueman'); ?></span>
          <div class="czr-input">
            <select data-type="locations" class="js-example-basic-multiple" multiple="multiple"></select>
          </div>
        </div>
        <div class="czr-sub-set width-100">
          <div class="customize-control-title"><?php _e('Context(s)', 'hueman'); ?></div>
          <span class="czr-notice"><?php _e('Pick the context(s) where this widget area will be displayed.', 'hueman'); ?></span>
          <div class="czr-input">
            <select data-type="contexts" class="js-example-basic-multiple" multiple="multiple"></select>
          </div>
        </div>
      </script>


      <?php
    }

  }
endif;