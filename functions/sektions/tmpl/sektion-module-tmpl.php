<?php
add_action( 'customize_controls_print_footer_scripts', 'hu_print_sektion_pre_add_view_template' , 1 );
function hu_print_sektion_pre_add_view_template() {
  $css_attr = HU_customize::$instance -> css_attr;
  ?>

  <script type="text/html" id="tmpl-czr-module-sektion-pre-add-view-content">
    <div class="czr-sub-set">
      <div class="customize-control-title"><?php _e('Select a layout', 'hueman'); ?></div>
      <div class="czr-input">
        <select data-type="sektion-layout">
          <option value="1"><?php _e('1 column', 'hueman'); ?></option>
          <option value="2"><?php _e('2 columns', 'hueman'); ?></option>
          <option value="3"><?php _e('3 columns', 'hueman'); ?></option>
          <option value="4"><?php _e('4 columns', 'hueman'); ?></option>
        </select>
      </div>
    </div>
  </script>
  <?php
}



add_action( 'customize_controls_print_footer_scripts', 'hu_print_sek_item_view_template' , 1 );
function hu_print_sek_item_view_template() {
    $css_attr = HU_customize::$instance -> css_attr;
    ?>

    <script type="text/html" id="tmpl-czr-module-sektion-rud-item-part">
        <div class="<?php echo $css_attr['item_header']; ?> czr-custom-model">
          <div class="<?php echo $css_attr['item_title']; ?> <?php echo $css_attr['item_sort_handle']; ?>"><h4>{{ data.title }}</h4></div>
          <div class="<?php echo $css_attr['item_btns']; ?>"><a title="<?php _e('Edit', 'hueman'); ?>" href="javascript:void(0);" class="fa fa-pencil <?php echo $css_attr['edit_view_btn']; ?>"></a>&nbsp;<a title="<?php _e('Remove', 'hueman'); ?>" href="javascript:void(0);" class="fa fa-trash <?php echo $css_attr['display_alert_btn']; ?>"></a></div>
          <div class="<?php echo $css_attr['remove_alert_wrapper']; ?>"></div>
        </div>
        <!-- <div class="czr-dragula-fake-container"> - Move the module here - </div> -->
    </script>
    <?php
}



add_action( 'customize_controls_print_footer_scripts', 'hu_print_sektion_item_content_template' , 1 );
function hu_print_sektion_item_content_template() {
  $css_attr = HU_customize::$instance -> css_attr;
  ?>

  <script type="text/html" id="tmpl-czr-module-sektion-view-content">
    <div class="<?php echo $css_attr['sub_set_wrapper']; ?>" data-input-type="text">
      <div class="customize-control-title"><?php _e('Section Block', 'hueman'); ?></div>
      <div class="czr-sektion-buttons">
        <a title="<?php _e('Edit Settings', 'hueman'); ?>" href="javascript:void(0);" class="fa fa-cog czr-edit-sek-settings"></a>
      </div>
      <!-- <div class="czr-input">
        <input data-type="sektion-block" type="text" value="{{ data['sektion-block'] }}"></input>
      </div> -->
    </div>
    <div class="czr-column-wrapper"></div>
  </script>
  <?php
}


//Renders a basic column html structure
//=> modules will be appended in the ul tag
add_action( 'customize_controls_print_footer_scripts', 'hu_print_sektion_column_template' , 1 );
function hu_print_sektion_column_template() {
  $css_attr = HU_customize::$instance -> css_attr;
  ?>

  <script type="text/html" id="tmpl-czr-sektion-column">
    <div class="czr-column" data-id="{{ data.id }}">
        <div class="czr-column-header">
          <span class="czr-col-drag-handler fa fa-arrows-alt"></span>
          <h4>Column : {{ data.id }}</h4>
        </div>

        <ul class="czr-module-collection-wrapper <# if ( data.module_type ) {#> {{ data.module_type }} <# } #>"></ul>
        <button type="button" class="button-secondary add-new-module" aria-expanded="true" aria-controls="czr-available-modules-list">Add Content Module</button>
    </div>
  </script>
  <?php
}