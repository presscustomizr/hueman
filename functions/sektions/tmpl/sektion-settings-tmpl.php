<?php
/////////////////////////////////////////////////////
/// ALL MODULES TMPL  //////////////////////
/////////////////////////////////////////////////////
add_action( 'customize_controls_print_footer_scripts', 'hu_print_sektion_settings_tmpl' , 1 );
function hu_print_sektion_settings_tmpl() {
  $css_attr = HU_customize::$instance -> css_attr;
  ?>

    <script type="text/html" id="tmpl-czr-sektion-settings-panel">
        <div id="czr-sektion-settings-panel">
            <h3>Sektion Settings Panel</h3>
            <div class="czr-sek-set-panel-header">
              <ul class="czr-sek-set-panel-tabs">
                <li class="czr-sek-set-tab czr-tab-active" data-tab-index="1">
                  <span class="czr-sek-tab-link">Tab 1</span>
                </li>
                <li class="czr-sek-set-tab" data-tab-index="2">
                  <span class="czr-sek-tab-link">Tab 2</span>
                </li>
                <li class="czr-sek-set-tab" data-tab-index="3">
                  <span class="czr-sek-tab-link">Tab 3</span>
                </li>
              </ul>
            </div>
            <div class="czr-sek-set-panel-content">
              <div class="czr-tab-1 czr-tab-active">
                  <p>Content of Tab 1</p>
              </div>
              <div class="czr-tab-2">
                  <p>Content of Tab 2</p>
              </div>
              <div class="czr-tab-3">
                  <p>Content of Tab 3</p>
              </div>
            </div>
        </div>
    </script>

  <?php
}
?>


