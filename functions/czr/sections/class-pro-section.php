<?php
/**
 * Pro customizer section.
 * highly based on
 * https://github.com/justintadlock/trt-customizer-pro/blob/master/example-1/section-pro.php
 */
class HU_Customize_Section_Pro extends WP_Customize_Section {

    /**
     * The type of customize section being rendered.
     *
     * @var    string
     */
    public $type ='czr-customize-section-pro';

    /**
     * Custom button text to output.
     *
     * @var    string
     */

    public $pro_text = '';
    /**
     *
     * @var    string
     */
    public $pro_url = '';


    /**
     * Add custom parameters to pass to the JS via JSON.
     *
     * @return void
     * @override
     */
    public function json() {
      $json = parent::json();
      $json['pro_text'] = $this->pro_text;
      $json['pro_url']  = esc_url( $this->pro_url );
      return $json;
    }

    //overrides the default template
    protected function render_template() { ?>
      <li id="accordion-section-{{ data.id }}" class="accordion-section control-section control-section-{{ data.type }} cannot-expand">
          <h3 class="accordion-section-title">
            {{ data.title }}
            <# if ( data.pro_text && data.pro_url ) { #>
              <a href="{{ data.pro_url }}" title="{{ data.title }}" class="button button-secondary alignright" target="_blank">{{ data.pro_text }}</a>
            <# } #>
          </h3>
        </li>
    <?php }
}
?>