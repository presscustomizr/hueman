<?php
/*
*/
if ( ! class_exists( 'HU_Customize_Color_Alpha_Control' ) ) :
  class HU_Customize_Color_Alpha_Control extends HU_controls {

    public $type = 'wp_color_alpha';
    public $title;
    public $notice;

    public $statuses;

    public $mode = 'full';

    /**
     * Constructor.
     *
     * @since 3.4.0
     * @uses WP_Customize_Control::__construct()
     *
     * @param WP_Customize_Manager $manager Customizer bootstrap instance.
     * @param string               $id      Control ID.
     * @param array                $args    Optional. Arguments to override class property defaults.
     */
    public function __construct( $manager, $id, $args = array() ) {
      $this->statuses = array( '' => __('Default', 'hueman') );
      parent::__construct( $manager, $id, $args );
    }


    /**
     * Refresh the parameters passed to the JavaScript via JSON.
     *
     * @see WP_Customize_Control::json()
     *
     * @return array Array of parameters passed to the JavaScript.
     */
    public function to_json() {
        parent::to_json();
        $this->json['statuses'] = $this->statuses;
        $this->json['defaultValue'] = $this->setting->default;
        $this->json['mode'] = $this->mode;
        $this->json['title']  = !empty( $this -> title )  ? esc_html( $this -> title ) : '';
        $this->json['notice'] = !empty( $this -> notice ) ?           $this -> notice  : '';
    }


    /**
    *
    */
    public function content_template() {
    ?>
      <# var defaultValue = '#RRGGBB', defaultValueAttr = '',
        isHueSlider = data.mode === 'hue';
      if ( data.defaultValue && _.isString( data.defaultValue ) && ! isHueSlider ) {
        if ( '#' !== data.defaultValue.substring( 0, 1 ) ) {
          defaultValue = '#' + data.defaultValue;
        } else {
          defaultValue = data.defaultValue;
        }
        defaultValueAttr = ' data-default-color=' + defaultValue; // Quotes added automatically.
      } #>
      <# if ( data.label ) { #>
        <span class="customize-control-title">{{{ data.label }}}</span>
      <# } #>
      <# if ( data.description ) { #>
        <span class="description customize-control-description">{{{ data.description }}}</span>
      <# } #>
      <div class="customize-control-content">
        <label><span class="screen-reader-text">{{{ data.label }}}</span>
        <# if ( isHueSlider ) { #>
          <input data-alpha="true" class="color-picker-hue" type="text" data-type="hue" />
        <# } else { #>
          <input data-alpha="true" class="color-picker-hex" type="text" maxlength="7" placeholder="{{ defaultValue }}" {{ defaultValueAttr }} />
        <# } #>
        </label>
      </div>
      <?php
    }
  }//end class
endif;
?>