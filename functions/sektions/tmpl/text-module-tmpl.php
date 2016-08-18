<?php
add_action( 'customize_controls_print_footer_scripts', 'hu_print_text_item_content_template' , 1 );
function hu_print_text_item_content_template() {
  $css_attr = HU_customize::$instance -> css_attr;
  ?>

  <script type="text/html" id="tmpl-czr-module-text-view-content">
    <div class="<?php echo $css_attr['sub_set_wrapper']; ?> width-100" data-input-type="textarea">
      <div class="customize-control-title"><h4><?php _e('Text Module', 'hueman'); ?> {{{ data.id }}}</h4></div>
        <div class="czr-input">
          <textarea data-type="text" name="textarea" rows="10" cols="50">{{{ data.text }}}</textarea>
        </div>
    </div>
  </script>
  <?php
}