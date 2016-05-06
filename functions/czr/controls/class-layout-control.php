<?php
/**************************************************************************************************
* LAYOUT SELECT
***************************************************************************************************/
if ( ! class_exists( 'HU_Customize_Layout_Control' ) ) :
  /**
  * Customize Multi-picker Control Class
  *
  * @package WordPress
  * @subpackage Customize
  * @since 3.4.10
  */
  class HU_Customize_Layout_Control extends HU_controls {

    public function render_content() {
      if ( empty( $this->choices ) )
        return;

      ?>
      <?php if (!empty( $this->title)) : ?>
        <h3 class="czr-customizr-title"><?php echo esc_html( $this->title); ?></h3>
      <?php endif; ?>
      <label>
        <span class="customize-control-title"><?php echo $this->label; ?></span>
        <?php $this -> hu_print_select_control( 'no-selecter-js' ); //no-selecter-js : we don't want the default selecter $ plugin fired for this control ?>
        <?php if(!empty( $this -> notice)) : ?>
          <span class="czr-notice"><?php echo $this -> notice ?></span>
        <?php endif; ?>
      </label>
      <?php
    }


    private function hu_print_select_control($class) {
      printf('<select %1$s class="%2$s">%3$s</select>',
        call_user_func( array( $this, 'get'.'_'.'link' ) ),
        $class,
        $this -> hu_get_select_options()
      );
    }


    private function hu_get_select_options() {
      $_options_html = '';
      switch ( $this -> id ) {
        default:
          foreach ( $this->choices as $value => $data ) {
            $_options_html .= sprintf('<option value="%1$s" %2$s>%3$s</option>',
              esc_attr( $value ),
              selected( $this->value(), $value, false ),
              $data['label']
            );
          }
        break;
      }//end switch
      return $_options_html;
    }//end of fn

    //the layouts are turned into a js object
    //{ 'col-1c' : { src: ..., label : ... }, ...  }
    public function to_json() {
      parent::to_json();
      $this->json['layouts'] = $this->choices;
    }
  }//end class
endif;