<?php
add_action( 'customize_controls_print_footer_scripts', 'hu_print_body_bg_item_content_template' , 1 );
add_filter( 'hu_js_customizer_control_params', 'hu_add_body_bg_select_options');

function hu_add_body_bg_select_options( $params ) {
    $body_bg_select = array(
        'body_bg_module_params' => array(
              //background repeat select options
              'bg_repeat_options' => array(
                  'no-repeat'      => __( 'No Repeat', 'hueman' ),
                  'repeat'         => __( 'Repeat All', 'hueman' ),
                  'repeat-x'       => __( 'Repeat Horizontally', 'hueman' ),
                  'repeat-y'       => __( 'Repeat Vertically', 'hueman' ),
                  'inherit'        => __( 'Inherit', 'hueman' ),
              ),

              //background attachment select options
              'bg_attachment_options' => array(
                  'fixed'           => __( 'Fixed', 'hueman' ),
                  'scroll'          => __( 'Scroll', 'hueman' ),
                  'inherit'         => __( 'Inherit', 'hueman' ),
              ),

              //background position select options
              'bg_position_options' => array(
                  'left top'        => __( 'Left Top', 'hueman' ),
                  'left center'     => __( 'Left Center', 'hueman' ),
                  'left bottom'     => __( 'Left Bottom', 'hueman' ),
                  'center top'      => __( 'Center Top', 'hueman' ),
                  'center center'   => __( 'Center Center', 'hueman' ),
                  'center bottom'   => __( 'Center Bottom', 'hueman' ),
                  'right top'       => __( 'Right Top', 'hueman' ),
                  'right center'    => __( 'Right Center', 'hueman' ),
                  'right bottom'    => __( 'Right Bottom', 'hueman' ),
              )
        )
    );
    return array_merge( $params, $body_bg_select );
}


function hu_print_body_bg_item_content_template() {
  $css_attr = HU_customize::$instance -> css_attr;
  ?>

  <script type="text/html" id="tmpl-czr-module-bodybg-item-content">
      <# var defaultBgColor = '';
      if ( data.defaultBgColor ) {
        if ( '#' !== data.defaultBgColor.substring( 0, 1 ) ) {
          defaultBgColor = '#' + data.defaultBgColor;
        } else {
          defaultBgColor = data.defaultBgColor;
        }
        defaultBgColor = ' data-default-color=' + '#eaeaea'; // Quotes added automatically.
      } #>

      <div class="<?php echo $css_attr['sub_set_wrapper']; ?> width-100" data-input-type="color">
        <div class="customize-control-title width-100"><?php _e('Color', 'hueman'); ?>  ( <?php _e('default', 'hueman' ); ?> : #eaeaea )</div>
        <div class="<?php echo $css_attr['sub_set_input']; ?>">
          <input data-type="background-color" type="text" maxlength="7" placeholder="<?php esc_attr_e( 'Hex Value', 'hueman' ); ?>" value="{{ data['background-color'] }}" {{ defaultBgColor }} />
        </div>
      </div>

      <div class="<?php echo $css_attr['sub_set_wrapper']; ?>" data-input-type="upload">
        <div class="customize-control-title"><?php _e('Background Image', 'hueman'); ?></div>
        <div class="<?php echo $css_attr['sub_set_input']; ?>">
          <input data-type="background-image" type="hidden" value="{{ data['background-image'] }}"/>
          <div class="<?php echo $css_attr['img_upload_container']; ?>"></div>
        </div>
      </div>

      <div class="<?php echo $css_attr['sub_set_wrapper']; ?>" data-input-type="select">
        <div class="customize-control-title"><?php _e('Repeat', 'hueman'); ?></div>
        <div class="<?php echo $css_attr['sub_set_input']; ?>">
          <select data-type="background-repeat"></select>
        </div>
      </div>

      <div class="<?php echo $css_attr['sub_set_wrapper']; ?>" data-input-type="select">
        <div class="customize-control-title"><?php _e('Background attachment', 'hueman'); ?></div>
        <div class="<?php echo $css_attr['sub_set_input']; ?>">
          <select data-type="background-attachment"></select>
        </div>
      </div>

      <div class="<?php echo $css_attr['sub_set_wrapper']; ?>" data-input-type="select">
        <div class="customize-control-title"><?php _e('Background position', 'hueman'); ?></div>
        <div class="<?php echo $css_attr['sub_set_input']; ?>">
          <select data-type="background-position"></select>
        </div>
      </div>

      <div class="<?php echo $css_attr['sub_set_wrapper']; ?>" data-input-type="text">
        <div class="customize-control-title"><?php _e('Background size', 'hueman'); ?></div>
        <div class="<?php echo $css_attr['sub_set_input']; ?>">
          <input data-type="background-size" type="text" value="{{ data['background-size'] }}"/>
        </div>
         <span class="czr-notice">
            <?php _e('The background-size CSS property specifies the size of the background images. The size of the image can be fully constrained or only partially in order to preserve its intrinsic ratio.', 'hueman');
              printf(' %1$s %2$s.',
                __('Learn more', 'hueman'),
                sprintf('<a href="%1$s" target="_blank">%2$s</a>', esc_url('developer.mozilla.org/en-US/docs/Web/CSS/background-size'), __('here', 'hueman') )
              );
            ?>
         </span>
      </div>

  </script>
  <?php
}