<?php
/*********************************************************************************
* Old upload control used until v3.4.18, still used if current version of WP is < 4.3
**********************************************************************************/
if ( ! class_exists( 'HU_Customize_Upload_Control' ) ) :
  /**
   * Customize Upload Control Class
   *
   * @package WordPress
   * @subpackage Customize
   * @since 3.4.0
   */
  class HU_Customize_Upload_Control extends WP_Customize_Control {
    public $type    = 'czr_upload';
    public $removed = '';
    public $context;
    public $extensions = array();
    public $title;
    public $notice;

    /**
     * Enqueue control related scripts/styles.
     *
     * @since 3.4.0
     */
    public function enqueue() {
      wp_enqueue_script( 'wp-plupload' );
    }

    /**
     * Refresh the parameters passed to the JavaScript via JSON.
     *
     * @since 3.4.0
     * @uses WP_Customize_Control::to_json()
     */
    public function to_json() {
      parent::to_json();

      $this->json['removed'] = $this->removed;

      if ( $this->context )
        $this->json['context'] = $this->context;

      if ( $this->extensions )
        $this->json['extensions'] = implode( ',', $this->extensions );
    }

    /**
     * Render the control's content.
     *
     * @since 3.4.0
     */
  public function render_content() {
      do_action( '__before_setting_control' , $this -> id );
      ?>
      <?php if ( isset( $this->title) ) : ?>
        <h3 class="czr-customizr-title"><?php echo esc_html( $this->title); ?></h3>
      <?php endif; ?>
      <label>
        <?php if ( ! empty( $this->label ) ) : ?>
          <span class="customize-control-title"><?php echo $this->label; ?></span>
        <?php endif;
        if ( ! empty( $this->description ) ) : ?>
          <span class="description customize-control-description"><?php echo $this->description; ?></span>
        <?php endif; ?>
        <div>
          <a href="#" class="button-secondary czr-upload"><?php _e( 'Upload' , 'hueman'  ); ?></a>
          <a href="#" class="remove"><?php _e( 'Remove' , 'hueman'  ); ?></a>
        </div>
        <?php if(!empty( $this -> notice)) : ?>
          <span class="czr-notice"><?php echo $this -> notice; ?></span>
        <?php endif; ?>
      </label>
      <?php
      do_action( '__after_setting_control' , $this -> id );
    }
  }
endif;