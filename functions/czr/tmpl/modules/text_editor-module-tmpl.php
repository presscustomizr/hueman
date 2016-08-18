<?php
add_action( 'customize_controls_print_footer_scripts', 'hu_print_text_editor_item_content_template' , 1 );

function hu_print_text_editor_item_content_template() {
  $css_attr = HU_customize::$instance -> css_attr;
    //the following template is a "sub view"
    //it's rendered :
    //1) on customizer start, depending on what is fetched from the db
    //2) dynamically when designing from the customizer
    //data looks like : { id : 'sidebar-one', title : 'A Title One' }
  ?>
  <script type="text/html" id="tmpl-czr-module-text_editor-item-content">
    <div class="<?php echo $css_attr['sub_set_wrapper']; ?>" data-input-type="text_editor">
      <div class="customize-control-title"><?php _e('Text', 'hueman'); ?></div>
        <div class="<?php echo $css_attr['sub_set_input']; ?>">
          <input data-type="text" type="hidden" value="{{ data['text'] }}"/>
      </div>
    </div>
  </script>
  <?php
}