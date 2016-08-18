<?php
/////////////////////////////////////////////////////
/// ALL MODULES TMPL  //////////////////////
/////////////////////////////////////////////////////
add_action( 'customize_controls_print_footer_scripts', 'hu_print_available_module_list_tmpl' , 1 );
function hu_print_available_module_list_tmpl() {
  $css_attr = HU_customize::$instance -> css_attr;
  ?>

    <script type="text/html" id="tmpl-czr-available-modules">
        <div id="czr-module-list-panel">
          <div id="czr-available-modules-filter">
            <label class="screen-reader-text" for="czr-modules-search"><?php _e( 'Search Modules' ); ?></label>
            <input type="search" id="modules-search" placeholder="<?php esc_attr_e( 'Search modules&hellip;' ) ?>" />
          </div>
          <ul id="czr-available-modules-list"></ul>
        </div>
    </script>

  <?php
}
?>



