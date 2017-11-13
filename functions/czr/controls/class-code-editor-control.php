<?php
/*
*/
if ( class_exists('WP_Customize_Code_Editor_Control') && ! class_exists( 'HU_Customize_Code_Editor_Control' ) ) :
  class HU_Customize_Code_Editor_Control extends WP_Customize_Code_Editor_Control {

    public $type = 'czr_code_editor';
    public $title;
    public $notice;

    /**
     * Refresh the parameters passed to the JavaScript via JSON.
     *
     * @see WP_Customize_Control::json()
     *
     * @return array Array of parameters passed to the JavaScript.
     */
    public function json() {
        $json = parent::json();
        if ( is_array( $json ) ) {
            $json['title']  = !empty( $this -> title )  ? esc_html( $this -> title ) : '';
            $json['notice'] = !empty( $this -> notice ) ?           $this -> notice  : '';
        }

        return $json;
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
?>