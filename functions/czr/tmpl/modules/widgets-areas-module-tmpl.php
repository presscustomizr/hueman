<?php
//print the pre add view content
add_action( 'customize_controls_print_footer_scripts', 'hu_print_widget_areas_pre_add_view_template' , 1 );
//print template for built-in models like primary, secondary, footer-1, etc...
add_action( 'customize_controls_print_footer_scripts', 'hu_print_widget_areas_built_in_templates' , 1 );

add_action( 'customize_controls_print_footer_scripts', 'hu_print_widget_areas_item_content_template' , 1 );


function hu_print_widget_areas_pre_add_view_template() {
  $css_attr = HU_customize::$instance -> css_attr;
  ?>
  <script type="text/html" id="tmpl-czr-module-widgets-pre-add-view-content">
    <div class="<?php echo $css_attr['sub_set_wrapper']; ?>" data-input-type="text">
      <div class="customize-control-title"><?php _e('Name', 'hueman'); ?></div>
      <div class="czr-input">
        <input data-type="title" type="text" value="" placeholder="<?php _e('Give it a name', 'hueman'); ?>"></input>
      </div>
      <span class="czr-notice"><?php _e('Personalizing the name of the widget zone will help you identify it.', 'hueman'); ?></span>
    </div>
    <div class="<?php echo $css_attr['sub_set_wrapper']; ?> width-100" data-input-type="select">
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
function hu_print_widget_areas_built_in_templates() {
  $css_attr = HU_customize::$instance -> css_attr;
  //REDUCED VIEW TEMPLATE
  //no remove button
  //no remove alert wrapper
  ?>
    <script type="text/html" id="tmpl-czr-module-widgets-ru-item-part">
        <div class="<?php echo $css_attr['item_header']; ?> czr-builtin-model">
          <div class="<?php echo $css_attr['item_title']; ?> <?php echo $css_attr['item_sort_handle']; ?>"><h4>{{ data.title }}</h4></div>
          <div class="<?php echo $css_attr['item_btns']; ?>"><a title="<?php _e('Edit', 'hueman'); ?>" href="javascript:void(0);" class="fas fa-pencil-alt <?php echo $css_attr['edit_view_btn']; ?>"></a></div>
        </div>
    </script>
  <?php



  //REDUCED VIEW CONTENT TEMPLATE
  //only the contexts and the locations can be set.
  ?>
    <script type="text/html" id="tmpl-czr-module-widgets-item-input-list-reduced">
      <div class="<?php echo $css_attr['sub_set_wrapper']; ?>">
        <div class="customize-control-title"><?php _e('id', 'hueman'); ?></div>
        <div class="czr-input">
          <span><?php _e('unique id', 'hueman')?> : {{ data.id }}</span>
        </div>
      </div>
      <div class="<?php echo $css_attr['sub_set_wrapper']; ?>">
        <div class="customize-control-title"><?php _e('Name', 'hueman'); ?></div>
        <div class="czr-input">
          <span>{{ data.title }}</span>
        </div>
      </div>
      <div class="<?php echo $css_attr['sub_set_wrapper']; ?> width-100" data-input-type="select">
        <div class="customize-control-title"><?php _e('Location(s)', 'hueman'); ?></div>
        <span class="czr-notice"><?php _e('Select the pre-defined location(s) in which you will embed this widget zone.', 'hueman'); ?></span>
        <div class="czr-input">
          <select data-type="locations" class="js-example-basic-multiple" multiple="multiple"></select>
        </div>
      </div>
      <div class="<?php echo $css_attr['sub_set_wrapper']; ?> width-100" data-input-type="select">
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
function hu_print_widget_areas_item_content_template() {
  $css_attr = HU_customize::$instance -> css_attr;
    //the following template is a "sub view"
    //it's rendered :
    //1) on customizer start, depending on what is fetched from the db
    //2) dynamically when designing from the customizer
    //data looks like : { id : 'sidebar-one', title : 'A Title One' }
  ?>

  <script type="text/html" id="tmpl-czr-module-widgets-item-input-list">
    <div class="<?php echo $css_attr['sub_set_wrapper']; ?>">
      <div class="customize-control-title"><?php _e('id', 'hueman'); ?></div>
      <div class="czr-input">
        <span><?php _e('unique id', 'hueman')?> : {{ data.id }}</span>
      </div>
    </div>
    <div class="<?php echo $css_attr['sub_set_wrapper']; ?>" data-input-type="text">
      <div class="customize-control-title"><?php _e('Name', 'hueman'); ?></div>
      <div class="czr-input">
        <input data-type="title" type="text" value="{{ data.title }}" placeholder="<?php _e('Enter a name', 'hueman'); ?>"></input>
      </div>
      <span class="czr-notice"><?php _e('Personalizing the name of the widget zone will help you identify it.', 'hueman'); ?></span>
    </div>
    <div class="<?php echo $css_attr['sub_set_wrapper']; ?> width-100" data-input-type="select">
      <div class="customize-control-title"><?php _e('Location(s)', 'hueman'); ?></div>
      <span class="czr-notice"><?php _e('Select the pre-defined location(s) in which you will embed this widget zone.', 'hueman'); ?></span>
      <div class="czr-input">
        <select data-type="locations" class="js-example-basic-multiple" multiple="multiple"></select>
      </div>
    </div>
    <div class="<?php echo $css_attr['sub_set_wrapper']; ?> width-100" data-input-type="select">
      <div class="customize-control-title"><?php _e('Context(s)', 'hueman'); ?></div>
      <span class="czr-notice"><?php _e('Pick the context(s) where this widget area will be displayed.', 'hueman'); ?></span>
      <div class="czr-input">
        <select data-type="contexts" class="js-example-basic-multiple" multiple="multiple"></select>
      </div>
    </div>
  </script>


  <?php
}