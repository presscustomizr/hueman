<?php
add_action( 'customize_controls_print_footer_scripts', 'hu_print_skope_templates' );
//data example :
// id:"global"
// ctx:"_all_"
// dyn_type:"option"
// el:"czr-scope-global"
// is_default:true
// is_winner:false
// opt_name:"hu_theme_options"
function hu_print_skope_templates() {
  ?>

    <?php /* SINGLE SKOPE TMPL */ ?>
    <script type="text/html" id="tmpl-czr-skope">
      <div class="{{data.el}} czr-scope" data-scope-id="{{data.id}}" data-dyn-type="{{data.dyn_type}}">
        <div class="czr-scope-header">
          <span class="czr-scope-reset fa fa-refresh czr-pull-left" title="Reset"></span>
          <span class="czr-scope-switch fa fa-toggle-off czr-pull-right" title="Switch to / active ?"></span>
        </div>
        <div class="czr-scope-content"><h4>{{data.title}}</h4></div>
        <div class="czr-scope-footer">
          <span class="czr-scope-winner fa fa-check czr-pull-left info" title="Is applied on front end ?"></span>
          <span class="czr-scope-force fa fa-exclamation-circle czr-pull-right" title="Force priority"></span>
        </div>
      </div>
    </script>



    <?php /* RESET SKOPE PANEL TMPL */ ?>
    <script type="text/html" id="tmpl-czr-reset-skope">
      <div id="czr-reset-skope-pane" data-scope-id="{{data.id}}">
        <div class="czr-reset-content">
          <div class="czr-reset-warning">
              <h2>{{data.warning_message}}</h2>
              <p>This is irreversible</p>
              <span class="button czr-scope-do-reset">YES RESET NOW</span>&nbsp;
              <span class="button czr-scope-reset-cancel">CANCEL</span>
          </div>
          <div class="czr-resetting">
              <span class="czr-spinner"></span>
          </div>
          <div class="czr-reset-success">
              <h2>{{data.success_message}}</h2>
          </div>
          <div class="czr-reset-fail">
              <h2>There was a problem when trying to reset {{data.id}}.</h2>
          </div>
        </div>
      </div>
    </script>

    <?php /* RESET CONTROL TMPL */ ?>
    <script type="text/html" id="tmpl-czr-reset-control">
      <div class="czr-remove-alert-wrapper czr-ctrl-reset-warning">
        <p>{{data.warning_message}}</p>
        <span class="czr-control-do-reset button">Yes</span> <span class="czr-cancel-button button">No</span>
        <span class="czr-spinner"></span>
        <div class="czr-reset-success">
            <p>{{data.success_message}}</p>
        </div>
        <div class="czr-reset-fail">
            <p>There was a problem when trying to reset.</p>
        </div>
      </div>
    </script>
  <?php
}




