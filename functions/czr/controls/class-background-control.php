<?php
/*
* @since 4.0
*/
if ( ! class_exists( 'HU_Body_Background_Control' ) ) :
  class HU_Body_Background_Control extends HU_Advanced_Control {

    public $button_labels = array();
    public $mime_type = 'image';

    public $bg_repeat_options = array();

    public $bg_attachment_options = array();

    public $bg_position_options = array();

    /**
    * Constructor.
    *
    */
    public function __construct( $manager, $id, $args = array() ) {
      //let the parent do what it has to
      parent::__construct($manager, $id, $args );

      //image related properties
      $this->button_labels = array(
          'select'       => __( 'Select Image', 'hueman' ),
          'change'       => __( 'Change Image', 'hueman' ),
          'remove'       => __( 'Remove', 'hueman' ),
          'default'      => __( 'Default', 'hueman'  ),
          'placeholder'  => __( 'No image selected', 'hueman' ),
          'frame_title'  => __( 'Select Image', 'hueman' ),
          'frame_button' => __( 'Choose Image', 'hueman' ),
      );

      //background repeat select options
      $this -> bg_repeat_options = array(
          'no-repeat'      => __( 'No Repeat', 'hueman' ),
          'repeat'         => __( 'Repeat All', 'hueman' ),
          'repeat-x'       => __( 'Repeat Horizontally', 'hueman' ),
          'repeat-y'       => __( 'Repeat Vertically', 'hueman' ),
          'inherit'        => __( 'Inherit', 'hueman' ),
      );

      //background attachment select options
      $this -> bg_attachment_options = array(
          'fixed'           => __( 'Fixed', 'hueman' ),
          'scroll'          => __( 'Scroll', 'hueman' ),
          'inherit'         => __( 'Inherit', 'hueman' ),
      );

      //background position select options
      $this -> bg_position_options = array(
          'left top'        => __( 'Left Top', 'hueman' ),
          'left center'     => __( 'Left Center', 'hueman' ),
          'left bottom'     => __( 'Left Bottom', 'hueman' ),
          'center top'      => __( 'Center Top', 'hueman' ),
          'center center'   => __( 'Center Center', 'hueman' ),
          'center bottom'   => __( 'Center Bottom', 'hueman' ),
          'right top'       => __( 'Right Top', 'hueman' ),
          'right center'    => __( 'Right Center', 'hueman' ),
          'right bottom'    => __( 'Right Bottom', 'hueman' ),
      );

      $this -> default_model = array(
        'background-color' => '#eaeaea',
        'background-image' => '',
        'background-repeat' => 'no-repeat',
        'background-attachment' => 'fixed',
        'background-position' => 'center center',
        'background-size' => 'cover'
      );

      //add specific js templates for this control
      //this is usually called in the manager for "registered" controls that need to be rendered with js
      //for this control, we'll do it another way because we need several js templates
      //=> that's why this control has not been "registered" and js templates are printed with the following action
      add_action( 'customize_controls_print_footer_scripts', array( $this, 'hu_print_control_templates' ), 1 );
      //print the view content
      //callback declared in the child classes
      add_action( 'customize_controls_print_footer_scripts', array( $this, 'hu_print_view_content_template' ), 1 );

      //print the image uploader template
      //used in multi input controls for example
      //defined in the parent class
      add_action( 'customize_controls_print_footer_scripts', array( $this, 'hu_print_view_image_uploader_template' ), 1 );
    }


  /**
   * Refresh the parameters passed to the JavaScript via JSON.
   *
   *
     * highly based on WP_Customize_Media_Control merged with WP_Customize_Upload_Control ::to_json()
   */
    public function to_json() {

        $this->json['mime_type']             = $this->mime_type;
        $this->json['button_labels']         = $this->button_labels;
        $this->json['bg_repeat_options']     = $this->bg_repeat_options;
        $this->json['bg_attachment_options'] = $this->bg_attachment_options;
        $this->json['bg_position_options']   = $this->bg_position_options;
        $this->json['canUpload']             = current_user_can( 'upload_files' );
        $this->json['default_model']         = $this->default_model;

        $value            = $this->value();
        if ( isset( $this -> setting ) && is_object( $this -> setting ) ) {
          $_defaults      = isset( $this->setting->default ) ? $this->setting->default : null;
          $default_bg_img = isset( $_defaults['background-image'] ) ? $_defaults['background-image'] : null;
        }
        $default_bg_im    = isset( $default_bg_img ) ? $default_bg_img : null;
        if ( $default_bg_img ) {
          // Fake an attachment model - needs all fields used by template.
         // Note that the default value must be a URL, NOT an attachment ID.
         $type = in_array( substr( $default_bg_img, -3 ), array( 'jpg', 'png', 'gif', 'bmp', 'svg' ) ) ? 'image' : 'document';
           $default_attachment = array(
               'id' => 1,
               'url' => $default_bg_img,
               'type' => $type,
               'icon' => wp_mime_type_icon( $type ),
               'title' => basename( $default_bg_img ),
           );
           $default_attachment['sizes'] = array(
                     'full' => array( 'url' => $default_bg_img ),
           );
           $this->json['defaultAttachment'] = $default_attachment;
        }
        $background_image = isset( $value['background-image'] ) ? $value['background-image'] : null;

        if ( $background_image && $default_bg_img && $background_image === $default_bg_img ) {
          // Set the default as the attachment.
          $this->json['attachment'] = $this->json['defaultAttachment'];
        } elseif ( $background_image ) {
          $attachment_id = attachment_url_to_postid( $background_image );
          if ( $attachment_id )
            $this->json['attachment'] = wp_prepare_attachment_for_js( $attachment_id );
          else //already an id
            $this->json['attachment'] = wp_prepare_attachment_for_js( $background_image );
        }

      parent::to_json();

    }


    /**
     * Don't render any content for this control from PHP.
     *
     *
     */
    public function render_content() {}


    //IMPORTANT : this js template is rendered by default if exists in customize-control.js, api.Control::renderContent()
    function hu_print_control_templates() {
      $css_attr = HU_customize::$instance -> css_attr;
      ?>
      <script type="text/html" id="tmpl-customize-control-<?php echo $this->type; ?>-content">
        <label for="{{ data.settings['default'] }}-button">

          <# if ( data.label ) { #>
            <span class="customize-control-title">{{ data.label }}</span>
          <# } #>
          <# if ( data.description ) { #>
            <span class="description customize-control-description">{{{ data.description }}}</span>
          <# } #>
        </label>
        <div class="<?php echo $css_attr['multi_input_wrapper']; ?>"></div>
      </script>

      <?php
    }


    //this template is used to render the content inside the multi_input_wrapper
    //it uses the data (model) fetch by WP from the db
    function hu_print_view_content_template() {
      $css_attr = HU_customize::$instance -> css_attr;
      ?>
      <script type="text/html" id="tmpl-customize-control-<?php echo $this->type; ?>-view-content">
          <# var defaultBgColor = '';
          if ( data.defaultBgColor ) {
            if ( '#' !== data.defaultBgColor.substring( 0, 1 ) ) {
              defaultBgColor = '#' + data.defaultBgColor;
            } else {
              defaultBgColor = data.defaultBgColor;
            }
            defaultBgColor = ' data-default-color=' + '#eaeaea'; // Quotes added automatically.
          } #>
          <div class="<?php echo $css_attr['sub_set_wrapper']; ?>" data-input-type="color">
            <div class="customize-control-title"><?php _e('Color', 'hueman'); ?></div>
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

  }//end class
endif;
