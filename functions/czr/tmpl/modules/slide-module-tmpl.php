<?php
add_action( 'customize_controls_print_footer_scripts', 'hu_print_slide_pre_add_view_template' , 1 );
add_action( 'customize_controls_print_footer_scripts', 'hu_print_slide_item_content_template' , 1 );

function hu_print_slide_pre_add_view_template() {
  $css_attr = HU_customize::$instance -> css_attr;
  ?>
  <script type="text/html" id="tmpl-czr-module-slide-pre-item-input-list">
    <div class="<?php echo $css_attr['sub_set_wrapper']; ?>" data-input-type="upload">
      <div class="customize-control-title"><?php _e('Slide Background', 'hueman'); ?></div>
        <div class="<?php echo $css_attr['sub_set_input']; ?>">
          <input data-type="slide-background" type="hidden"/>
        <div class="<?php echo $css_attr['img_upload_container']; ?>"></div>
      </div>
    </div>
    <div class="<?php echo $css_attr['sub_set_wrapper']; ?>" data-input-type="text">
      <div class="customize-control-title"><?php _e('Slide Title', 'hueman'); ?></div>
      <div class="czr-input">
        <input data-type="slide-title" type="text" value="" placeholder="<?php _e('Enter a title', 'hueman'); ?>"/>
      </div>
    </div>
    <div class="<?php echo $css_attr['sub_set_wrapper']; ?>" data-input-type="textarea">
      <div class="customize-control-title"><?php _e('Slide subtitle', 'hueman'); ?></div>
      <div class="czr-input">
        <input data-type="slide-subtitle" type="textarea" value="" placeholder="<?php _e('Enter a subtitle', 'hueman'); ?>"/>
      </div>
    </div>
  </script>
  <?php
}





function hu_print_slide_item_content_template() {
  $css_attr = HU_customize::$instance -> css_attr;
    //the following template is a "sub view"
    //it's rendered :
    //1) on customizer start, depending on what is fetched from the db
    //2) dynamically when designing from the customizer
    //data looks like : { id : 'sidebar-one', title : 'A Title One' }
  ?>

  <script type="text/html" id="tmpl-czr-module-slide-item-input-list">
    <div class="<?php echo $css_attr['sub_set_wrapper']; ?>" data-input-type="upload">
      <div class="customize-control-title"><?php _e('Slide Background', 'hueman'); ?></div>
        <div class="<?php echo $css_attr['sub_set_input']; ?>">
          <input data-type="slide-background" type="hidden" value="{{ data['slide-background'] }}"/>
        <div class="<?php echo $css_attr['img_upload_container']; ?>"></div>
      </div>
    </div>
    <div class="<?php echo $css_attr['sub_set_wrapper']; ?>" data-input-type="text">
      <div class="customize-control-title"><?php _e('Slide Title', 'hueman'); ?></div>
      <div class="czr-input">
        <input data-type="slide-title" type="text" value="{{ data['slide-title'] }}" placeholder="<?php _e('Enter a title', 'hueman'); ?>"/>
      </div>
    </div>
    <div class="<?php echo $css_attr['sub_set_wrapper']; ?>" data-input-type="textarea">
      <div class="customize-control-title"><?php _e('Slide subtitle', 'hueman'); ?></div>
      <div class="czr-input">
        <input data-type="slide-subtitle" type="textarea" value="{{ data['slide-subtitle'] }}" placeholder="<?php _e('Enter a subtitle', 'hueman'); ?>"/>
      </div>
    </div>
  </script>
  <?php
}