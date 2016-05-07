<?php
/*
*/
if ( class_exists('WP_Customize_Cropped_Image_Control') && ! class_exists( 'HU_Customize_Cropped_Image_Control' ) ) :
  class HU_Customize_Cropped_Image_Control extends WP_Customize_Cropped_Image_Control {
    public $type = 'czr_cropped_image';
    public $title;
    public $notice;
    public $dst_width;
    public $dst_height;


    /**
    * Refresh the parameters passed to the JavaScript via JSON.
    *
    *
    * @Override
    * @see WP_Customize_Control::to_json()
    */
    public function to_json() {
        parent::to_json();
        $this->json['title']  = !empty( $this -> title )  ? esc_html( $this -> title ) : '';
        $this->json['notice'] = !empty( $this -> notice ) ?           $this -> notice  : '';

        $this->json['dst_width']  = isset( $this -> dst_width )  ?  $this -> dst_width  : $this -> width;
        $this->json['dst_height'] = isset( $this -> dst_height ) ?  $this -> dst_height : $this -> height;
        //overload WP_Customize_Upload_Control
        //we need to re-build the absolute url of the logo src set in old Customizr
        $value = $this->value();
        if ( $value ) {
          //re-build the absolute url if the value isn't an attachment id before retrieving the id
          if ( (int) esc_attr( $value ) < 1 ) {
            $upload_dir = wp_upload_dir();
            $value  = false !== strpos( $value , '/wp-content/' ) ? $value : $upload_dir['baseurl'] . $value;
          }
          // Get the attachment model for the existing file.
          $attachment_id = attachment_url_to_postid( $value );
          if ( $attachment_id ) {
              $this->json['attachment'] = wp_prepare_attachment_for_js( $attachment_id );
      }
      }//end overload
    }

    /**
  * Render a JS template for the content of the media control.
  *
  * @since 3.4.19
    * @package      Customizr
    *
    * @Override
  * @see WP_Customize_Control::content_template()
  */
    public function content_template() {
    ?>
    <# if ( data.title ) { #>
        <h3 class="czr-customizr-title">{{{ data.title }}}</h3>
      <# } #>
        <?php parent::content_template(); ?>
      <# if ( data.notice ) { #>
        <span class="czr-notice">{{{ data.notice }}}</span>
      <# } #>
    <?php
    }
  }//end class
endif;