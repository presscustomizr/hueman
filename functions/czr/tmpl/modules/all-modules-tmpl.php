<?php
/////////////////////////////////////////////////////
/// ALL MODULES TMPL  //////////////////////
/////////////////////////////////////////////////////
add_action( 'customize_controls_print_footer_scripts', 'hu_print_module_templates' , 1 );
function hu_print_module_templates() {
  $css_attr = HU_customize::$instance -> css_attr;
  ?>

    <script type="text/html" id="tmpl-czr-crud-module-part">
      <button class="<?php echo $css_attr['open_pre_add_btn']; ?>"><?php _e('Add New', 'hueman'); ?> <span class="fas fa-plus-square"></span></button>
      <div class="<?php echo $css_attr['pre_add_wrapper']; ?>">
        <div class="<?php echo $css_attr['pre_add_success']; ?>"><p></p></div>
        <div class="<?php echo $css_attr['pre_add_item_content']; ?>">

          <span class="<?php echo $css_attr['cancel_pre_add_btn']; ?> button"><?php _e('Cancel', 'hueman'); ?></span> <span class="<?php echo $css_attr['add_new_btn']; ?> button"><?php _e('Add it', 'hueman'); ?></span>
        </div>
      </div>
    </script>


    <script type="text/html" id="tmpl-czr-rud-item-alert-part">
      <p class="czr-item-removal-title"><?php _e('Are you sure you want to remove : <strong>{{ data.title }} ?</strong>', 'hueman'); ?></p>
              <span class="<?php echo $css_attr['remove_view_btn']; ?> button"><?php _e('Yes', 'hueman'); ?></span> <span class="<?php echo $css_attr['cancel_alert_btn']; ?> button"><?php _e('No', 'hueman'); ?></span>
    </script>



    <script type="text/html" id="tmpl-czr-rud-item-part">
        <div class="<?php echo $css_attr['item_header']; ?> czr-custom-model">
          <div class="<?php echo $css_attr['item_title']; ?> <?php echo $css_attr['item_sort_handle']; ?>"><h4>{{ data.title }}</h4></div>
          <div class="<?php echo $css_attr['item_btns']; ?>"><a title="<?php _e('Edit', 'hueman'); ?>" href="javascript:void(0);" class="fas fa-pencil-alt <?php echo $css_attr['edit_view_btn']; ?>"></a>&nbsp;<a title="<?php _e('Remove', 'hueman'); ?>" href="javascript:void(0);" class="fas fa-trash <?php echo $css_attr['display_alert_btn']; ?>"></a></div>
          <div class="<?php echo $css_attr['remove_alert_wrapper']; ?>"></div>
        </div>
    </script>

    <?php
    //Read + Update Item Part (ru), no Delete
    //no remove button
    //no remove alert wrapper
    ?>
    <script type="text/html" id="tmpl-czr-ru-item-part">
        <div class="<?php echo $css_attr['item_header']; ?> czr-custom-model">
          <div class="<?php echo $css_attr['item_title']; ?> <?php echo $css_attr['item_sort_handle']; ?>"><h4>{{ data.title }}</h4></div>
            <div class="<?php echo $css_attr['item_btns']; ?>"><a title="<?php _e('Edit', 'hueman'); ?>" href="javascript:void(0);" class="fas fa-pencil-alt <?php echo $css_attr['edit_view_btn']; ?>"></a></div>
          </div>
        </div>
    </script>

  <?php
}




/////////////////////////////////////////////////////
/// WHEN EMBEDDED IN A CONTROL //////////////////////
/////////////////////////////////////////////////////
//add specific js templates for this control
//this is usually called in the manager for "registered" controls that need to be rendered with js
//for this control, we'll do it another way because we need several js templates
//=> that's why this control has not been "registered" and js templates are printed with the following action
add_action( 'customize_controls_print_footer_scripts', 'hu_print_module_control_templates' , 1 );
function hu_print_module_control_templates() {
    $css_attr = HU_customize::$instance -> css_attr;
    //Render the control wrapper for the CRUD types modules
    ?>
      <?php //Render the control wrapper for the CRUD types modules ?>
      <script type="text/html" id="tmpl-customize-control-czr_module-content">
        <label for="{{ data.settings['default'] }}-button">

          <# if ( data.label ) { #>
            <span class="customize-control-title">{{ data.label }}</span>
          <# } #>
          <# if ( data.description ) { #>
            <span class="description customize-control-description">{{{ data.description }}}</span>
          <# } #>
        </label>
      </script>
    <?php
}




/////////////////////////////////////////////////////
/// WHEN EMBEDDED IN A SEKTION //////////////////////
/////////////////////////////////////////////////////
//this is a the wrapper for a single module
add_action( 'customize_controls_print_footer_scripts', 'hu_print_sektion_module_templates' , 1 );
function hu_print_sektion_module_templates() {
  $css_attr = HU_customize::$instance -> css_attr;
  ?>

    <script type="text/html" id="tmpl-czr-single-module-wrapper">
      <li class="czr-single-module" data-module-id="{{ data.id }}">
          <div class="czr-mod-header">
              <div class="czr-mod-title">
                <span class="czr-mod-drag-handler fas fa-arrows-alt"></span>
                <h4>{{ data.id }}</h4>
                <div class="czr-mod-buttons">

                  <a title="<?php _e('Edit', 'hueman'); ?>" href="javascript:void(0);" class="fas fa-pencil-alt czr-edit-mod"></a>&nbsp;<a title="<?php _e('Remove', 'hueman'); ?>" href="javascript:void(0);" class="fas fa-trash czr-remove-mod"></a>
                </div>
              </div>
              <div class="<?php echo $css_attr['remove_alert_wrapper']; ?>"></div>
          </div>
          <div class="czr-mod-content"></div>
      </li>
    </script>


    <script type="text/html" id="tmpl-czr-module-sektion-title-part">
        <div class="czr-module-description-container">
          <div class="czr-module-title">
            <button class="czr-module-back" tabindex="0">
              <span class="screen-reader-text">Back</span>
            </button>
            <h3>
              <span class="customize-action">
                Customizing Module
              </span>
              {{ data.id }}
            </h3>
          </div>
        </div>
    </script>

  <?php
}