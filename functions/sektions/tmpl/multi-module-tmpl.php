<?php
//add specific js templates for this control
//this is usually called in the manager for "registered" controls that need to be rendered with js
//for this control, we'll do it another way because we need several js templates
//=> that's why this control has not been "registered" and js templates are printed with the following action
add_action( 'customize_controls_print_footer_scripts', 'hu_print_multi_modules_control_templates' , 1 );
function hu_print_multi_modules_control_templates() {
    $css_attr = HU_customize::$instance -> css_attr;
    //Render the control wrapper
    ?>
      <script type="text/html" id="tmpl-customize-control-czr_multi_module-content"></script>
    <?php
}