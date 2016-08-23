<?php
add_action( 'customize_controls_print_footer_scripts', 'hu_print_fp_pre_add_view_template' , 1 );
add_action( 'customize_controls_print_footer_scripts', 'hu_print_fp_item_content_template' , 1 );

function hu_print_fp_pre_add_view_template() {
  $css_attr = HU_customize::$instance -> css_attr;
  ?>

  <script type="text/html" id="tmpl-czr-module-fp-pre-add-view-content">
    <div class="<?php echo $css_attr['sub_set_wrapper']; ?>" data-input-type="content_picker">
      <div class="customize-control-title"><?php _e('Select a content to feature', 'hueman'); ?></div>
      <div class="czr-input">
        <span data-type="fp-post"></span>
      </div>
    </div>
  </script>
  <?php
}





function hu_print_fp_item_content_template() {
  $css_attr = HU_customize::$instance -> css_attr;
    //the following template is a "sub view"
    //it's rendered :
    //1) on customizer start, depending on what is fetched from the db
    //2) dynamically when designing from the customizer
    //data looks like : { id : 'sidebar-one', title : 'A Title One' }
  ?>

  <script type="text/html" id="tmpl-czr-module-fp-view-content">
    <div class="<?php echo $css_attr['sub_set_wrapper']; ?>" data-input-type="content_picker">
      <div class="customize-control-title"><?php _e('Select a content to feature', 'hueman'); ?></div>
      <div class="czr-input">
        <span data-type="fp-post"></span>
      </div>
    </div>
    <div class="<?php echo $css_attr['sub_set_wrapper']; ?>" data-input-type="text">
      <div class="customize-control-title"><?php _e('Featured Page Title', 'hueman'); ?></div>
      <div class="czr-input">
        <input data-type="fp-title" type="text" value="{{ data['fp-title'] }}" placeholder="<?php _e('Enter a title', 'hueman'); ?>"/>
      </div>
    </div>
    <div class="<?php echo $css_attr['sub_set_wrapper']; ?>" data-input-type="textarea">
      <div class="customize-control-title"><?php _e('Featured Page Text', 'hueman'); ?></div>
      <div class="czr-input">
        <input data-type="fp-text" type="textarea" value="{{ data['fp-text'] }}" placeholder="<?php _e('Enter a text', 'hueman'); ?>"/>
      </div>
    </div>
    <div class="<?php echo $css_attr['sub_set_wrapper']; ?>" data-input-type="upload">
      <div class="customize-control-title"><?php _e('Fetured Page Image', 'hueman'); ?></div>
        <div class="<?php echo $css_attr['sub_set_input']; ?>">
          <input data-type="fp-image" type="hidden" value="{{ data['fp-image'] }}"/>
        <div class="<?php echo $css_attr['img_upload_container']; ?>"></div>
      </div>
    </div>
  </script>
  <?php
}