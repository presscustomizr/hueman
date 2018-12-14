<?php
namespace hu_czr_fmk;

if ( did_action('nimble_base_fmk_loaded') ) {
    if ( ( defined( 'CZR_DEV' ) && CZR_DEV ) || ( defined( 'NIMBLE_DEV' ) && NIMBLE_DEV ) ) {
        error_log( __FILE__ . '  => The czr_base_fmk has already been loaded' );
    }
    return;
}
global $czr_base_fmk_namespace;
$czr_base_fmk_namespace = __NAMESPACE__ . '\\';

do_action( 'nimble_base_fmk_loaded' );
if ( ! class_exists( 'CZR_Fmk_Base_Construct' ) ) :
    class CZR_Fmk_Base_Construct {
        static $instance;

        public $registered_modules = array();//stores the collection of dynamic modules registration candidates
        public $registered_settings = array();//stores the collection of dynamic settings registration candidates

        public $default_dynamic_setting_params = array();
        public $default_dynamic_module_params = array();

        public $czr_css_attr = array();

        public static function czr_fmk_get_instance( $params ) {
            if ( ! isset( self::$instance ) && ! ( self::$instance instanceof CZR_Fmk_Base ) ) {
              self::$instance = new CZR_Fmk_Base( $params );
            }
            return self::$instance;
        }
        function __construct( $params = array() ) {
            if ( ! is_array( $params ) || empty( $params ) ) {
                error_log( 'CZR_Fmk_Base => constructor => missing params');
                return;
            }
            if ( empty( $params['base_url'] ) ) {
                error_log( 'CZR_Fmk_Base => constructor => wrong params');
                return;
            }
            if ( ! defined( 'NIMBLE_FMK_BASE_URL' ) ) { define( 'NIMBLE_FMK_BASE_URL' , $params['base_url'] ); }
            if ( ! defined( 'NIMBLE_FMK_BASE_VERSION' ) ) { define( 'NIMBLE_FMK_BASE_VERSION' , isset( $params['version'] ) ? $params['version'] : '1.0.0' ); }
            $this -> czr_css_attr = $this -> czr_fmk_get_customizer_controls_css_attr();
            $this -> default_dynamic_setting_params = $this -> czr_fmk_get_default_dynamic_setting_params();
            $this -> default_dynamic_module_params = $this -> czr_fmk_get_default_dynamic_module_params();
            $this -> czr_enqueue_fmk_resources();
            $this -> czr_setup_ajax_tmpl();
            $this -> czr_setup_dynamic_settings_registration();
            $this -> czr_setup_dynamic_modules_registration();
            $this -> czr_setup_content_picker_ajax_actions();
        }//__construct
        private function czr_fmk_get_default_dynamic_setting_params() {
          return array(
                'setting_id' => '',
                'dynamic_registration' => true,
                'module_type' => '',
                'option_value' => array(),

                'setting' => array(
                    'type' => 'option',
                    'default'  => array(),
                    'transport' => 'refresh',
                    'setting_class' => '',//array( 'path' => '', 'name' => '' )
                    'sanitize_callback' => '',
                    'validate_callback' => '',
                ),

                'section' => array(
                    'id' => '',
                    'title' => '',
                    'panel' => '',
                    'priority' => 10
                ),

                'control' => array(
                    'label' => '',
                    'type'  => 'czr_module',
                    'priority' => 10,
                    'control_class' => ''//array( 'path' => '', 'name' => '' )
                )
            );
        }
        private function czr_fmk_get_default_dynamic_module_params() {
          return array(
                'dynamic_registration' => true,
                'module_type' => '',

                'sanitize_callback' => '', //<= used when dynamically registering a setting
                'validate_callback' => '', //<= used when dynamically registering a setting

                'customizer_assets' => array(
                    'control_js' => array(),
                    'localized_control_js' => array()
                ),
                'tmpl' => array()
            );
        }
        public function czr_fmk_get_customizer_controls_css_attr() {
          return apply_filters('czr_fmk_controls_css_attr',
            array(
              'multi_input_wrapper' => 'czr-multi-input-wrapper',
              'sub_set_wrapper'     => 'czr-sub-set',
              'sub_set_input'       => 'czr-input',
              'img_upload_container' => 'czr-imgup-container',

              'edit_modopt_icon'    => 'czr-toggle-modopt',
              'close_modopt_icon'   => 'czr-close-modopt',
              'mod_opt_wrapper'     => 'czr-mod-opt-wrapper',


              'items_wrapper'     => 'czr-items-wrapper',
              'single_item'        => 'czr-single-item',
              'item_content'      => 'czr-item-content',
              'item_header'       => 'czr-item-header',
              'item_title'        => 'czr-item-title',
              'item_btns'         => 'czr-item-btns',
              'item_sort_handle'   => 'czr-item-sort-handle',
              'display_alert_btn' => 'czr-display-alert',
              'remove_alert_wrapper'   => 'czr-remove-alert-wrapper',
              'cancel_alert_btn'  => 'czr-cancel-button',
              'remove_view_btn'        => 'czr-remove-button',

              'edit_view_btn'     => 'czr-edit-view',
              'open_pre_add_btn'      => 'czr-open-pre-add-new',
              'adding_new'        => 'czr-adding-new',
              'pre_add_wrapper'   => 'czr-pre-add-wrapper',
              'pre_add_item_content'   => 'czr-pre-add-view-content',
              'cancel_pre_add_btn'  => 'czr-cancel-add-new',
              'add_new_btn'       => 'czr-add-new',
              'pre_add_success'   => 'czr-add-success'
            )
          );
        }
}//class
endif;

?><?php
if ( ! class_exists( 'CZR_Fmk_Base_Load_Resources' ) ) :
    class CZR_Fmk_Base_Load_Resources extends CZR_Fmk_Base_Construct {
        function czr_enqueue_fmk_resources() {
            add_action ( 'customize_controls_enqueue_scripts' , array( $this, 'ac_load_additional_controls_js' ) );
            add_action ( 'customize_controls_enqueue_scripts' , array( $this, 'ac_load_additional_controls_css' ) );
            add_action ( 'customize_preview_init' , array( $this, 'ac_customize_load_preview_js' ) );
            add_action( 'customize_controls_print_footer_scripts', array( $this, 'ac_print_module_control_templates' ) , 1 );
        }
        function ac_load_additional_controls_js() {
            wp_enqueue_script( 'wp-color-picker' );
            wp_enqueue_style( 'wp-color-picker' );
            wp_enqueue_script(
                'czr-customizer-fmk',
                sprintf(
                    '%1$s/assets/js/%2$s',
                    NIMBLE_FMK_BASE_URL,
                    defined('CZR_DEV') && true === CZR_DEV ? '_0_ccat_czr-base-fmk.js' : '_0_ccat_czr-base-fmk.min.js'
                ),
                array('customize-controls' , 'jquery', 'underscore'),
                ( defined('WP_DEBUG') && true === WP_DEBUG ) ? time() : NIMBLE_FMK_BASE_VERSION,
                $in_footer = true
            );
            if ( false !== strpos( czr_get_parent_theme_slug(), 'customizr' ) || false !== strpos( czr_get_parent_theme_slug(), 'hueman' ) ) {
                wp_enqueue_script(
                    'czr-theme-customizer-fmk',
                    sprintf(
                        '%1$s/assets/js/%2$s',
                        NIMBLE_FMK_BASE_URL,
                        defined('CZR_DEV') && true === CZR_DEV ? '_1_ccat_czr-theme-fmk.js' : '_1_ccat_czr-theme-fmk.min.js'
                    ),
                    array( 'czr-customizer-fmk' ),
                    ( defined('WP_DEBUG') && true === WP_DEBUG ) ? time() : NIMBLE_FMK_BASE_VERSION,
                    $in_footer = true
                );
            }
            wp_localize_script(
                'czr-customizer-fmk',
                'serverControlParams',
                apply_filters( 'czr_js_customizer_control_params' ,
                  array(
                      'css_attr' => $this -> czr_css_attr,
                      'isDevMode' => ( defined('WP_DEBUG') && true === WP_DEBUG ) || ( defined('CZR_DEV') && true === CZR_DEV ),
                      'docURL'          => esc_url('docs.presscustomizr.com/'),
                      'i18n' => array(
                            'edit' => __('Edit', 'hueman'),
                            'close' => __('Close', 'hueman'),
                            'notset' => __('Not set', 'hueman'),
                            'successMessage' => __('Done !', 'hueman'),

                            'readDocumentation' => __('Learn more about this in the documentation', 'hueman'),
                            'Settings' => __('Settings', 'hueman'),
                            'Options for' => __('Options for', 'hueman'),
                            'select_image'        => __( 'Select Image', 'hueman' ),
                            'change_image'        => __( 'Change Image', 'hueman' ),
                            'remove_image'        => __( 'Remove', 'hueman' ),
                            'default_image'       => __( 'Default', 'hueman'  ),
                            'placeholder_image'   => __( 'No image selected', 'hueman' ),
                            'frame_title_image'   => __( 'Select Image', 'hueman' ),
                            'frame_button_image'  => __( 'Choose Image', 'hueman' ),

                            'Customizing' => __('Customizing', 'hueman'),
                      ),
                      'paramsForDynamicRegistration' => apply_filters( 'czr_fmk_dynamic_setting_js_params', array() )
                  )
                )
            );
        }
        function ac_load_additional_controls_css() {
            wp_enqueue_style(
                'czr-fmk-controls-style',
                sprintf('%1$s/assets/css/czr-ccat-control-base%2$s.css', NIMBLE_FMK_BASE_URL, ( defined('WP_DEBUG') && true === WP_DEBUG ) ? '' : '.min'),
                array( 'customize-controls' ),
                ( defined('WP_DEBUG') && true === WP_DEBUG ) ? time() : NIMBLE_FMK_BASE_VERSION,
                $media = 'all'
            );
            wp_enqueue_style(
                'czr-select2-css',
                 sprintf('%1$s/assets/css/lib/czrSelect2.min.css', NIMBLE_FMK_BASE_URL, ( defined('WP_DEBUG') && true === WP_DEBUG ) ? '' : '.min'),
                array( 'customize-controls' ),
                ( defined('WP_DEBUG') && true === WP_DEBUG ) ? time() : NIMBLE_FMK_BASE_VERSION,
                $media = 'all'
            );

            wp_enqueue_style(
                'czr-font-awesome',
                sprintf('%1$s/assets/fonts/css/fontawesome-all.min.css', NIMBLE_FMK_BASE_URL, ( defined('WP_DEBUG') && true === WP_DEBUG ) ? '' : '.min'),
                array(),
                ( defined('WP_DEBUG') && true === WP_DEBUG ) ? time() : NIMBLE_FMK_BASE_VERSION,
                $media = 'all'
            );
        }
        function ac_customize_load_preview_js() {
            global $wp_version;

            wp_enqueue_script(
                'czr-customizer-preview' ,
                  sprintf(
                      '%1$s/assets/js/%2$s',
                      NIMBLE_FMK_BASE_URL,
                      defined('CZR_DEV') && true === CZR_DEV ? 'czr-preview-base.js' : 'czr-preview-base.min.js'
                  ),
                  array( 'customize-preview', 'underscore'),
                  ( defined('WP_DEBUG') && true === WP_DEBUG ) ? time() : NIMBLE_FMK_BASE_VERSION,
                  true
            );
            wp_localize_script(
                  'czr-customizer-preview',
                  'serverPreviewParams',
                  apply_filters('czr_base_fmk_customizer_preview_params' ,
                      array(
                          'themeFolder'     => get_template_directory_uri(),
                          'preview_ready_event_exists'   => version_compare( $wp_version, '4.1' , '>=' ),
                          'blogname' => get_bloginfo('name'),
                          'isRTL'    => is_rtl()
                      )
                  )
            );
        }
        function ac_print_module_control_templates() {
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
    }//class
endif;

?><?php
if ( ! class_exists( 'CZR_Fmk_Base_Ajax_Filter' ) ) :
    class CZR_Fmk_Base_Ajax_Filter extends CZR_Fmk_Base_Load_Resources {
        function czr_setup_ajax_tmpl() {
            add_filter( "ac_set_ajax_czr_tmpl___all_modules", array( $this, 'ac_get_all_modules_tmpl' ), 10, 3 );
            add_action( 'wp_ajax_ac_get_template', array( $this, 'ac_set_ajax_czr_tmpl' ) );
        }
        function ac_set_ajax_czr_tmpl() {
            if ( ! is_user_logged_in() ) {
                wp_send_json_error( 'ac_set_ajax_czr_tmpl => unauthenticated' );
            }
            if ( ! current_user_can( 'edit_theme_options' ) ) {
              wp_send_json_error('ac_set_ajax_czr_tmpl => user_cant_edit_theme_options');
            }
            if ( ! current_user_can( 'customize' ) ) {
                status_header( 403 );
                wp_send_json_error( 'ac_set_ajax_czr_tmpl => customize_not_allowed' );
            } else if ( ! isset( $_SERVER['REQUEST_METHOD'] ) || 'POST' !== $_SERVER['REQUEST_METHOD'] ) {
                status_header( 405 );
                wp_send_json_error( 'ac_set_ajax_czr_tmpl => bad_method' );
            }
            $action = 'save-customize_' . get_stylesheet();
            if ( ! check_ajax_referer( $action, 'nonce', false ) ) {
                 wp_send_json_error( array(
                  'code' => 'invalid_nonce',
                  'message' => __( 'ac_set_ajax_czr_tmpl => Security check failed.', 'hueman' ),
                ) );
            }

            if ( ! isset( $_POST['module_type'] ) || empty( $_POST['module_type'] ) ) {
                wp_send_json_error( 'ac_set_ajax_czr_tmpl => missing module_type property in posted data' );
            }
            if ( ! isset( $_POST['tmpl'] ) || empty( $_POST['tmpl'] ) ) {
                wp_send_json_error( 'ac_set_ajax_czr_tmpl => missing tmpl property in posted data' );
            }
            $tmpl = $_POST['tmpl'];
            $module_type = $_POST['module_type'];
            $html = apply_filters( "ac_set_ajax_czr_tmpl___{$module_type}", '', $tmpl, $_POST );

            if ( empty( $html ) ) {
                wp_send_json_error( 'ac_set_ajax_czr_tmpl => module ' . $module_type . ' => template empty for requested tmpl : ' . $tmpl );
            } else {
                wp_send_json_success( apply_filters( 'tmpl_results', $html, $tmpl ) );
            }
        }
        function ac_get_all_modules_tmpl( $html, $requested_tmpl = '', $posted_params = array() ) {
            $css_attr = $this -> czr_css_attr;
            if ( empty( $requested_tmpl ) ) {
                wp_send_json_error( 'ac_get_all_modules_tmpl => the requested tmpl is empty' );
            }

            ob_start();
            switch ( $requested_tmpl ) {
                case 'crud-module-part' :
                    ?>
                      <button class="<?php echo $css_attr['open_pre_add_btn']; ?>"><?php _e('Add New', 'hueman'); ?> <span class="fas fa-plus-square"></span></button>
                      <div class="<?php echo $css_attr['pre_add_wrapper']; ?>">
                        <div class="<?php echo $css_attr['pre_add_success']; ?>"><p></p></div>
                        <div class="<?php echo $css_attr['pre_add_item_content']; ?>">

                          <span class="<?php echo $css_attr['cancel_pre_add_btn']; ?> button"><?php _e('Cancel', 'hueman'); ?></span> <span class="<?php echo $css_attr['add_new_btn']; ?> button"><?php _e('Add it', 'hueman'); ?></span>
                        </div>
                      </div>
                    <?php
                break;
                case 'rud-item-part' :
                    ?>
                      <div class="<?php echo $css_attr['item_header']; ?> czr-custom-model">
                        <# if ( ( true === data.is_sortable ) ) { #>
                          <div class="<?php echo $css_attr['item_title']; ?> <?php echo $css_attr['item_sort_handle']; ?>"><h4>{{ data.title }}</h4></div>
                        <# } else { #>
                          <div class="<?php echo $css_attr['item_title']; ?>"><h4>{{ data.title }}</h4></div>
                        <# } #>
                        <div class="<?php echo $css_attr['item_btns']; ?>"><a title="<?php _e('Edit', 'hueman'); ?>" href="javascript:void(0);" class="fas fa-pencil-alt <?php echo $css_attr['edit_view_btn']; ?>"></a>&nbsp;<a title="<?php _e('Remove', 'hueman'); ?>" href="javascript:void(0);" class="fas fa-trash <?php echo $css_attr['display_alert_btn']; ?>"></a></div>
                        <div class="<?php echo $css_attr['remove_alert_wrapper']; ?>"></div>
                      </div>
                    <?php
                break;

                case 'rud-item-alert-part' :
                    ?>
                      <p class="czr-item-removal-title"><?php _e('Are you sure you want to remove : <strong>{{ data.title }} ?</strong>', 'hueman'); ?></p>
                      <span class="<?php echo $css_attr['remove_view_btn']; ?> button"><?php _e('Yes', 'hueman'); ?></span> <span class="<?php echo $css_attr['cancel_alert_btn']; ?> button"><?php _e('No', 'hueman'); ?></span>
                    <?php
                break;
                case 'img-uploader' :
                    ?>
                      <?php // case when a regular attachement object is provided, fetched from an id with wp.media.attachment( id ) ?>
                      <# if ( ( data.attachment && data.attachment.id ) ) { #>
                        <div class="attachment-media-view attachment-media-view-{{ data.attachment.type }} {{ data.attachment.orientation }}">
                          <div class="thumbnail thumbnail-{{ data.attachment.type }}">
                            <# if ( 'image' === data.attachment.type && data.attachment.sizes && data.attachment.sizes.medium ) { #>
                              <img class="attachment-thumb" src="{{ data.attachment.sizes.medium.url }}" draggable="false" alt="" />
                            <# } else if ( 'image' === data.attachment.type && data.attachment.sizes && data.attachment.sizes.full ) { #>
                              <img class="attachment-thumb" src="{{ data.attachment.sizes.full.url }}" draggable="false" alt="" />
                            <# } #>
                          </div>
                          <div class="actions">
                            <# if ( data.canUpload ) { #>
                            <button type="button" class="button remove-button">{{ data.button_labels.remove }}</button>
                            <button type="button" class="button upload-button control-focus" id="{{ data.settings['default'] }}-button">{{ data.button_labels.change }}</button>
                            <div style="clear:both"></div>
                            <# } #>
                          </div>
                        </div>
                      <?php // case when an url is provided ?>
                      <# } else if ( ! _.isEmpty( data.fromUrl ) ) { #>
                        <div class="attachment-media-view">
                          <div class="thumbnail thumbnail-thumb">
                              <img class="attachment-thumb" src="{{ data.fromUrl }}" draggable="false" alt="" />
                          </div>
                          <div class="actions">
                            <# if ( data.canUpload ) { #>
                            <button type="button" class="button remove-button">{{ data.button_labels.remove }}</button>
                            <button type="button" class="button upload-button control-focus" id="{{ data.settings['default'] }}-button">{{ data.button_labels.change }}</button>
                            <div style="clear:both"></div>
                            <# } #>
                          </div>
                        </div>
                      <?php // case when neither attachement or url are provided => placeholder ?>
                      <# } else { #>
                        <div class="attachment-media-view">
                          <div class="placeholder">
                            {{ data.button_labels.placeholder }}
                          </div>
                          <div class="actions">
                            <# if ( data.canUpload ) { #>
                            <button type="button" class="button upload-button" id="{{ data.settings['default'] }}-button">{{ data.button_labels.select }}</button>
                            <# } #>
                            <div style="clear:both"></div>
                          </div>
                        </div>
                      <# } #>
                    <?php
                break;
            }//switch

            $html = ob_get_clean();
            if ( empty( $html ) ) {
                wp_send_json_error( 'ac_get_all_modules_tmpl => no template was found for tmpl => ' . $requested_tmpl );
            }

            return $html;//will be sent by wp_send_json_success() in ::ac_set_ajax_czr_tmpl()
        }
    }//class
endif;

?><?php
if ( ! class_exists( 'CZR_Fmk_Base_Tmpl_Builder' ) ) :
    class CZR_Fmk_Base_Tmpl_Builder extends CZR_Fmk_Base_Ajax_Filter {
        /*********************************************************
        ** TMPL BUILDER
        *********************************************************/
        function ac_generate_czr_tmpl_from_map( $tmpl_map ) {
            $html = '';
            $default_input_entries = array(
                'input_type'  => 'text',
                'title'        => '',
                'default'  => '',

                'notice_before_title' => '',
                'notice_before' => '',
                'notice_after' => '',
                'placeholder' => '',
                'step' => '',
                'min' => '',
                'max' => '',
                'orientation' => '',//vertical / horizontal
                'unit' => '',//% or px for example

                'transport' => '',//<= can be set as a data property of the input wrapper, and used when instanciating the input

                'input_template' => '',//<= a static html template can be provided to render the input, in this case it will be used in priority
                'tmpl_callback' => '',//<= a callback function to be used to print the entire input template, including the wrapper

                'width-100' => false,//<= to force a width of 100%
                'title_width' => '',//width-80
                'input_width' => '',//width-20

                'code_type'   => '',//<= used for to specify the language type of the codemirror editor (if not specified full a html editor will be instantiated)

                'refresh_markup' => null,
                'refresh_stylesheet' => null,
                'refresh_fonts' => null,
                'refresh_preview' => null,

                'sanitize_cb' => '',
                'validate_cb' => '',

                'css_selectors' => array(), //<= used to specify css selectors on which we will apply the dynamically generated css for a given input id @see \Nimble\sek_add_css_rules_for_generic_css_input_types'
                'css_identifier' => '',//<= the identifier allowing us to map a css generation rule. @see \Nimble\sek_add_css_rules_for_css_sniffed_input_id
                'important_input_list' => array(),//<= the list of input_id that an important input can flag !important @see \Nimble\sek_add_css_rules_for_css_sniffed_input_id

                'choices' => array(), // <= used to declare the option list of a select input

                'has_device_switcher' => false, // <= indicates if the input value shall be saved by device or not

                'scope' => 'local'// <= used when resetting the sections
            );
            foreach( $tmpl_map as $input_id => $input_data ) {
                if ( ! is_string( $input_id ) || empty( $input_id ) ) {
                    wp_send_json_error( __FUNCTION__ . ' => wrong input id' );
                    break;
                }
                if ( ! is_array( $input_data ) ) {
                    wp_send_json_error( __FUNCTION__ . ' => wrong var type for the input_data of input id : ' . $input_id );
                    break;
                }
                $maybe_diff = array_diff_key( $input_data, $default_input_entries );
                if ( ! empty( $maybe_diff ) ) {
                    error_log('<' . __FUNCTION__ . '>');
                    error_log( '=> at least one unknown param in the registered input params for input id : ' . $input_id );
                    error_log( print_r( $maybe_diff, true ) );
                    error_log('</' . __FUNCTION__ . '>');
                    break;
                }
                $input_data = wp_parse_args( $input_data, $default_input_entries );
                if ( ! empty( $input_data[ 'tmpl_callback' ] ) && function_exists( $input_data[ 'tmpl_callback' ] ) ) {
                    $html .= call_user_func_array( $input_data[ 'tmpl_callback' ], array( $input_data ) );
                } else {
                    $html .= $this -> ac_get_default_input_tmpl( $input_id, $input_data );
                }

            }
            return $html;////will be sent by wp_send_json_success() in ::ac_set_ajax_czr_tmpl()
        }
        function ac_get_default_input_tmpl( $input_id, $input_data ) {
            if ( ! array_key_exists( 'input_type', $input_data ) || empty( $input_data[ 'input_type' ] ) ) {
                 wp_send_json_error( 'ac_get_input_tmpl => missing input type for input id : ' . $input_id );
            }
            $input_type = $input_data[ 'input_type' ];
            $is_width_100 = true === $input_data[ 'width-100' ];
            if ( in_array( $input_type, array( 'color', 'radio', 'textarea' ) ) ) {
                $is_width_100 = true;
            }

            $css_attr = $this -> czr_css_attr;

            ob_start();
            printf( '<div class="%1$s %2$s %3$s" data-input-type="%4$s" %5$s>',
                $css_attr['sub_set_wrapper'],
                $is_width_100 ? 'width-100' : '',
                'hidden' === $input_type ? 'hidden' : '',
                $input_type,
                ! empty( $input_data['transport'] ) ? 'data-transport="'. $input_data['transport'] .'"' : ''
            );
            ?>
            <?php if ( ! empty( $input_data['notice_before_title'] ) ) : ?>
                <span class="czr-notice"><?php echo $input_data['notice_before_title']; ?></span><br/>
            <?php endif; ?>

            <?php
            if ( $input_type !== 'hidden' ) {
                printf( '<div class="customize-control-title %1$s">%2$s</div>', ! empty( $input_data['title_width'] ) ? $input_data['title_width'] : '', $input_data['title'] );
            }
            ?>
            <?php if ( ! empty( $input_data['notice_before'] ) ) : ?>
                <span class="czr-notice"><?php echo $input_data['notice_before']; ?></span>
            <?php endif; ?>

            <?php printf( '<div class="czr-input %1$s">', ! empty( $input_data['input_width'] ) ? $input_data['input_width'] : '' ); ?>

            <?php
            if ( ! empty( $input_data['input_template'] ) && is_string( $input_data['input_template'] ) ) {
                echo $input_data['input_template'];
            } else {
                $this -> ac_set_input_tmpl_content( $input_type, $input_id, $input_data );
            }
            ?>
              </div><?php // class="czr-input" ?>
              <?php if ( ! empty( $input_data['notice_after'] ) ) : ?>
                  <span class="czr-notice"><?php echo $input_data['notice_after']; ?></span>
              <?php endif; ?>
            </div> <?php //class="$css_attr['sub_set_wrapper']" ?>
            <?php

            $tmpl_html = apply_filters( "czr_set_input_tmpl___{$input_type}", ob_get_clean(), $input_id, $input_data );
            if ( empty( $tmpl_html ) ) {
                wp_send_json_error( 'ac_get_input_tmpl => no html returned for input ' . $input_id );
            }
            return $tmpl_html;
        }//ac_get_input_tmpl()
        private function ac_set_input_tmpl_content( $input_type, $input_id, $input_data ) {
            $css_attr = $this -> czr_css_attr;
            $input_tmpl_content = null;
            ob_start();
              do_action( 'czr_set_input_tmpl_content', $input_type, $input_id, $input_data );
            $input_tmpl_content = ob_get_clean();

            if ( ! empty( $input_tmpl_content ) ) {
                echo $input_tmpl_content;
            } else {
                switch ( $input_type ) {
                    /* ------------------------------------------------------------------------- *
                     *  HIDDEN
                    /* ------------------------------------------------------------------------- */
                    case 'hidden':
                      ?>
                        <input data-czrtype="<?php echo $input_id; ?>" type="hidden" value=""></input>
                      <?php
                    break;

                    /* ------------------------------------------------------------------------- *
                     *  SELECT
                    /* ------------------------------------------------------------------------- */
                    case 'czr_layouts'://<= specific to the hueman theme
                    case 'select':
                      ?>
                        <select data-czrtype="<?php echo $input_id; ?>"></select>
                      <?php
                    break;

                    /* ------------------------------------------------------------------------- *
                     *  TEXT
                    /* ------------------------------------------------------------------------- */
                    case 'text' :
                      ?>
                        <input data-czrtype="<?php echo $input_id; ?>" type="text" value="" placeholder="<?php echo $input_data['placeholder']; ?>"></input>
                      <?php
                    break;

                    /* ------------------------------------------------------------------------- *
                     *  NUMBER
                    /* ------------------------------------------------------------------------- */
                    case 'number' :
                      ?>
                        <?php
                        printf( '<input data-czrtype="%4$s" type="number" %1$s %2$s %3$s value="{{ data[\'%4$s\'] }}" />',
                          ! empty( $input_data['step'] ) ? 'step="'. $input_data['step'] .'"' : '',
                          ! empty( $input_data['min'] ) ? 'min="'. $input_data['min'] .'"' : '',
                          ! empty( $input_data['max'] ) ? 'max="'. $input_data['max'] .'"' : '',
                          $input_id
                        );
                        ?>
                      <?php
                    break;

                    /* ------------------------------------------------------------------------- *
                     *  COLOR
                    /* ------------------------------------------------------------------------- */
                    case 'wp_color_alpha' :
                      ?>
                        <input data-czrtype="<?php echo $input_id; ?>" class="width-100"  data-alpha="true" type="text" value="{{ data['<?php echo $input_id; ?>'] }}"></input>
                      <?php
                    break;
                    case 'color' :
                      ?>
                        <input data-czrtype="<?php echo $input_id; ?>" type="text" value="{{ data['<?php echo $input_id; ?>'] }}"></input>
                      <?php
                    break;

                    /* ------------------------------------------------------------------------- *
                     *  CHECK
                    /* ------------------------------------------------------------------------- */
                    case 'checkbox' :
                    case 'check' :
                      ?>
                        <#
                          var _checked = ( false != data['<?php echo $input_id; ?>'] ) ? "checked=checked" : '';
                        #>
                        <input data-czrtype="<?php echo $input_id; ?>" type="checkbox" {{ _checked }}></input>
                      <?php
                    break;

                    case 'gutencheck' :
                        ?>
                          <#
                            var _checked = ( false != data['<?php echo $input_id; ?>'] ) ? "checked=checked" : '';
                          #>
                          <span class="czr-toggle-check"><input class="czr-toggle-check__input" data-czrtype="<?php echo $input_id; ?>" type="checkbox" {{ _checked }}><span class="czr-toggle-check__track"></span><span class="czr-toggle-check__thumb"></span></span>
                        <?php
                    break;

                    /* ------------------------------------------------------------------------- *
                     *  TEXTAREA
                    /* ------------------------------------------------------------------------- */
                    case 'textarea' :
                      ?>
                        <textarea data-czrtype="<?php echo $input_id; ?>" class="width-100" name="textarea" rows="10" cols="">{{ data.value }}</textarea>
                      <?php
                    break;

                    /* ------------------------------------------------------------------------- *
                     *  IMG UPLOAD AND UPLOAD URL
                    /* ------------------------------------------------------------------------- */
                    case 'upload' :
                    case 'upload_url' :
                      ?>
                        <input data-czrtype="<?php echo $input_id; ?>" type="hidden"/>
                        <div class="<?php echo $css_attr['img_upload_container']; ?>"></div>
                      <?php
                    break;

                    /* ------------------------------------------------------------------------- *
                     *  TINY MCE EDITOR
                    /* ------------------------------------------------------------------------- */
                    case 'tiny_mce_editor' :
                        ?>
                          <# //console.log( 'IN php::ac_get_default_input_tmpl() => data sent to the tmpl => ', data ); #>
                          <button type="button" class="button text_editor-button" data-czr-control-id="{{ data.control_id }}" data-czr-input-id="<?php echo $input_id; ?>" data-czr-action="open-tinymce-editor"><?php _e('Edit', 'hueman' ); ?></button>&nbsp;
                          <button type="button" class="button text_editor-button" data-czr-control-id="{{ data.control_id }}" data-czr-input-id="<?php echo $input_id; ?>" data-czr-action="close-tinymce-editor"><?php _e('Hide editor', 'hueman' ); ?></button>
                          <input data-czrtype="<?php echo $input_id; ?>" type="hidden" value="{{ data.value }}"/>
                        <?php
                    break;

                    /* ------------------------------------------------------------------------- *
                     *  RANGE
                    /* ------------------------------------------------------------------------- */
                    case 'range_slider' :
                    case 'range' :
                      ?>
                        <# //console.log( 'IN php::ac_get_default_input_tmpl() => data range_slide => ', data ); #>
                        <?php
                        printf( '<input data-czrtype="%5$s" type="range" %1$s %2$s %3$s %4$s value="{{ data[\'%5$s\'] }}" />',
                          ! empty( $input_data['orientation'] ) ? 'data-orientation="'. $input_data['orientation'] .'"' : '',
                          ! empty( $input_data['unit'] ) ? 'data-unit="'. $input_data['unit'] .'"' : '',
                          ! empty( $input_data['min'] ) ? 'min="'. $input_data['min'] .'"' : '',
                          ! empty( $input_data['max'] ) ? 'max="'. $input_data['max'] .'"' : '',
                          $input_id
                        );
                        ?>
                      <?php
                    break;

                    /* ------------------------------------------------------------------------- *
                     *  CONTENT PICKER
                    /* ------------------------------------------------------------------------- */
                    case 'content_picker' :
                      ?>
                        <?php
                        printf( '<span data-czrtype="%1$s"></span>', $input_id );
                        ?>
                      <?php
                    break;

                    /* ------------------------------------------------------------------------- *
                     *  PROBLEM : if we reach this case, it means that
                     *  - the input template has not been populated by the first do_action('czr_set_input_tmpl_content')
                     *  - no default input template is defined for the requested input type
                    /* ------------------------------------------------------------------------- */
                    default :
                        wp_send_json_error( 'ERROR => ' . __CLASS__ . '::' . __FUNCTION__ . ' this input type has no template : ' . $input_type );
                    break;
                }//switch ( $input_type ) {
            }//if ( empty( $input_tmpl_content ) )()
        }//function()

    }//class
endif;

?><?php
if ( ! class_exists( 'CZR_Fmk_Dyn_Setting_Registration' ) ) :
    class CZR_Fmk_Dyn_Setting_Registration extends CZR_Fmk_Base_Tmpl_Builder {
        function czr_setup_dynamic_settings_registration() {
            add_action( 'customize_register', array( $this, 'czr_setup_dynamic_setting_registration' ), 10 );
            add_filter( 'czr_fmk_dynamic_setting_js_params', array( $this, 'czr_setup_localized_params_for_dynamic_js_registration' ), 20 );
        }
        function czr_pre_register_dynamic_setting( $setting_params ) {
            if ( ! is_array( $setting_params ) || empty( $setting_params ) ) {
                error_log( 'czr_pre_register_dynamic_setting => empty $setting_params submitted' );
                return;
            }
            if ( ! array_key_exists( 'setting_id', $setting_params ) || empty( $setting_params['setting_id'] ) ) {
                error_log( 'czr_pre_register_dynamic_setting => missing setting id' );
                return;
            }
            $setting_params = wp_parse_args( $setting_params, $this -> default_dynamic_setting_params );

            $registered = $this->registered_settings;
            $setting_id_candidate = $setting_params['setting_id'];
            if ( array_key_exists( $setting_id_candidate, $registered ) ) {
                error_log( 'czr_pre_register_dynamic_setting => setting id already registered => ' . $setting_id_candidate );
                return;
            }
            $registered[ $setting_id_candidate ] = $setting_params;
            $this->registered_settings = $registered;
        }
        function czr_setup_dynamic_setting_registration( $wp_customize ) {
            add_filter( 'customize_dynamic_setting_args', array( $this, 'czr_setup_customizer_dynamic_setting_args' ), 10, 2  );
            add_filter( 'customize_dynamic_setting_class', array( $this, 'czr_setup_customizer_dynamic_setting_class' ), 10, 3 );
        }
        function czr_setup_customizer_dynamic_setting_args( $setting_args, $setting_id ) {

            if ( ! is_array( $this->registered_settings ) || empty( $this->registered_settings ) )
              return $setting_args;
            $registered_setting_args = $setting_args;
            foreach ( $this->registered_settings as $registerered_setting_id => $params ) {

                if ( array_key_exists('dynamic_registration', $params) && true !== $params['dynamic_registration'] ) {
                  continue;
                }

                $params = wp_parse_args( $params, $this -> default_dynamic_setting_params );

                if ( $registerered_setting_id != $setting_id || empty( $registerered_setting_id ) )
                  continue;

                $setting_args = is_array( $params['setting'] ) ? $params['setting'] : array();
                $setting_args = wp_parse_args( $setting_args, array(
                    'type'                 => 'option',
                    'default'              => array(),
                    'transport'            => 'refresh',
                    'sanitize_callback'    => '',
                    'validate_callback'    => ''
                ) );
                $registered_setting_args = array(
                    'type'                 => empty( $setting_args[ 'type' ] ) ? 'option' : $setting_args[ 'type' ],
                    'default'              => array(),
                    'transport'            => $setting_args[ 'transport' ],
                    'sanitize_callback'    => ( ! empty( $setting_args[ 'sanitize_callback' ] ) && function_exists( $setting_args[ 'sanitize_callback' ] ) ) ? $setting_args[ 'sanitize_callback' ] : '',
                    'validate_callback'    => ( ! empty( $setting_args[ 'validate_callback' ] ) && function_exists( $setting_args[ 'validate_callback' ] ) ) ? $setting_args[ 'validate_callback' ] : ''
                );
                $module_params = $this -> czr_get_registered_dynamic_module( $params[ 'module_type' ] );
                if ( false !== $module_params  && is_array( $module_params ) ) {
                    if ( array_key_exists( 'validate_callback', $module_params ) && function_exists( $module_params[ 'validate_callback' ] ) ) {
                        $registered_setting_args[ 'validate_callback' ] = $module_params[ 'validate_callback' ];
                    }
                    if ( array_key_exists( 'sanitize_callback', $module_params ) && function_exists( $module_params[ 'sanitize_callback' ] ) ) {
                        $registered_setting_args[ 'sanitize_callback' ] = $module_params[ 'sanitize_callback' ];
                    }
                }
            }
            return $registered_setting_args;
        }
        function czr_setup_customizer_dynamic_setting_class( $class, $setting_id, $args ) {
            if ( ! is_array( $this->registered_settings ) || empty( $this->registered_settings ) )
              return $class;
            $registered_setting_class = $class;//'WP_Customize_Setting' by default
            foreach ( $this->registered_settings as $registerered_setting_id => $params ) {
                $params = wp_parse_args( $params, $this -> default_dynamic_setting_params );
                if ( true !== $params['dynamic_registration'] ) {
                  continue;
                }
                if ( $registerered_setting_id != $setting_id || empty( $registerered_setting_id ) )
                  continue;

                $setting_args = $params['setting'];

                if ( is_array( $setting_args ) && array_key_exists( 'setting_class', $setting_args ) ) {
                    if ( is_array( $setting_args[ 'setting_class' ] ) && array_key_exists( 'name', $setting_args[ 'setting_class' ] ) && array_key_exists( 'path', $setting_args[ 'setting_class' ] ) ) {
                        if ( ! class_exists( $setting_args[ 'setting_class' ][ 'name' ] ) && file_exists( $setting_args[ 'setting_class' ]['path'] ) ) {
                            require_once(  $setting_args[ 'setting_class' ]['path'] );
                        }
                        if ( class_exists( $setting_args[ 'setting_class' ][ 'name' ] ) ) {
                            $registered_setting_class = $setting_args[ 'setting_class' ][ 'name' ];
                        }
                    }
                }
            }

            return $registered_setting_class;
        }
        function czr_setup_localized_params_for_dynamic_js_registration( $js_params ) {
            if ( ! is_array( $this->registered_settings ) || empty( $this->registered_settings ) )
              return $js_params;
            $js_params = ! is_array( $js_params ) ? array() : $js_params;
            foreach ( $this->registered_settings as $registerered_setting_id => $params ) {
                $params = wp_parse_args( $params, $this -> default_dynamic_setting_params );
                if ( ! array_key_exists( 'option_value', $params ) || ! is_array( $params['option_value'] ) )
                  continue;
                if ( array_key_exists( $registerered_setting_id, $params ) ) {
                    error_log( 'czr_setup_localized_params_for_dynamic_js_registration => js_params already setup for setting : ' . $registerered_setting_id );
                }

                $js_params[ $registerered_setting_id ] = array(
                    'setting_id' => $registerered_setting_id,
                    'module_type' => $params[ 'module_type' ],
                    'module_registration_params' => $this -> czr_get_registered_dynamic_module( $params[ 'module_type' ] ),
                    'option_value'  => $params['option_value'],
                    'setting' => array_key_exists( 'setting', $params ) ? $params[ 'setting' ] : array(),
                    'section' => array_key_exists( 'section', $params ) ? $params[ 'section' ] : array(),
                    'control' => array_key_exists( 'control', $params ) ? $params[ 'control' ] : array(),
                );
            }
            return $js_params;
        }
        function czr_register_not_dynamic_settings( $wp_customize ) {

            if ( ! is_array( $this->registered_settings ) || empty( $this->registered_settings ) )
              return;
            foreach ( $this->registered_settings as $setting_id => $params ) {
                $params = wp_parse_args( $params, $this -> default_dynamic_setting_params );
                if ( true === $params['dynamic_registration'] )
                  continue;
                $setting_args = $params['setting'];
                $registered_setting_class = 'WP_Customize_Setting';
                if ( is_array( $setting_args ) && array_key_exists( 'setting_class', $setting_args ) ) {
                    if ( is_array( $setting_args[ 'setting_class' ] ) && array_key_exists( 'name', $setting_args[ 'setting_class' ] ) && array_key_exists( 'path', $setting_args[ 'setting_class' ] ) ) {
                        if ( ! class_exists( $setting_args[ 'setting_class' ][ 'name' ] ) && file_exists( $setting_args[ 'setting_class' ]['path'] ) ) {
                            require_once(  $setting_args[ 'setting_class' ]['path'] );
                        }
                        if ( class_exists( $setting_args[ 'setting_class' ][ 'name' ] ) ) {
                            $registered_setting_class = $setting_args[ 'setting_class' ][ 'name' ];
                        }
                    }
                }

                $wp_customize->add_setting( new $registered_setting_class( $wp_customize, $setting_id,  array(
                    'default'  => $setting_args[ 'default' ],
                    'type'  => $setting_args[ 'type' ],
                    'sanitize_callback' => isset( $settings_args[ 'sanitize_callback' ] ) ? $settings_args[ 'sanitize_callback' ] : ''
                ) ) );
                $control_args = $params['control'];
                $registered_control_class = 'WP_Customize_Control';
                if ( is_array( $control_args ) && array_key_exists( 'control_class', $control_args ) ) {
                    if ( is_array( $control_args[ 'control_class' ] ) && array_key_exists( 'name', $control_args[ 'control_class' ] ) && array_key_exists( 'path', $control_args[ 'control_class' ] ) ) {
                        if ( ! class_exists( $control_args[ 'control_class' ][ 'name' ] ) && file_exists( $control_args[ 'control_class' ]['path'] ) ) {
                            require_once(  $control_args[ 'control_class' ]['path'] );
                        }
                        if ( class_exists( $control_args[ 'control_class' ][ 'name' ] ) ) {
                            $registered_control_class = $control_args[ 'control_class' ][ 'name' ];
                        }
                    }
                }

                $wp_customize -> add_control( new $registered_control_class( $wp_customize, $setting_id, array(
                    'type'      => $control_args[ 'type' ],
                    'label'     => $control_args[ 'label' ],
                    'section'   => $params[ 'section' ]['id'],
                    'module_type' => $params[ 'module_type' ]
                ) ) );

            }//foreach
        }//czr_register_not_dynamic_settings

    }//class
endif;

?><?php
if ( ! class_exists( 'CZR_Fmk_Dyn_Module_Registration' ) ) :
    class CZR_Fmk_Dyn_Module_Registration extends CZR_Fmk_Dyn_Setting_Registration {
        function czr_setup_dynamic_modules_registration() {
            add_action( 'init', array( $this, 'czr_schedule_ajax_tmpl' ) );
            add_action( 'customize_controls_enqueue_scripts' , array( $this, 'czr_register_dynamic_modules_customizer_control_assets' ) );
        }
        function czr_pre_register_dynamic_module( $module_params ) {

            if ( ! is_array( $module_params ) || empty( $module_params ) ) {
                error_log( 'czr_pre_register_dynamic_module => empty $module_params submitted' );
                return;
            }
            if ( ! array_key_exists( 'module_type', $module_params ) || empty( $module_params['module_type'] ) ) {
                error_log( 'czr_pre_register_dynamic_module => missing module_type' );
                return;
            }
            $module_params = wp_parse_args( $module_params, $this -> default_dynamic_module_params );

            $registered = $this->registered_modules;
            $module_type_candidate = $module_params['module_type'];
            if ( array_key_exists( $module_type_candidate, $registered ) ) {
                error_log( 'czr_pre_register_dynamic_module => module type already registered => ' . $module_type_candidate );
                return;
            }
            $registered[ $module_type_candidate ] = $module_params;
            $this->registered_modules = $registered;
        }
        function czr_get_registered_dynamic_module( $module_type = '' ) {
            $registered = $this->registered_modules;
            if ( empty( $module_type ) || ! is_array( $registered ) || empty( $registered ) )
              return;
            return array_key_exists( $module_type , $registered ) ? $registered[ $module_type ] : false;
        }
        function czr_register_dynamic_modules_customizer_control_assets() {
            if ( ! is_array( $this->registered_modules ) || empty( $this->registered_modules ) )
              return;

            $wp_scripts = wp_scripts();
            foreach ( $this->registered_modules as $module_type => $params ) {
                $params = wp_parse_args( $params, $this -> default_dynamic_module_params );
                $control_js_params = $params[ 'customizer_assets' ][ 'control_js' ];
                if ( ! empty( $control_js_params ) ) {
                    foreach ( $control_js_params as $handle => $script_args ) {
                        if ( ! isset( $wp_scripts->registered[$handle] ) ) {
                            wp_enqueue_script(
                                $handle,
                                array_key_exists( 'src', $script_args ) ? $script_args['src'] : null,
                                array_key_exists( 'deps', $script_args ) ? $script_args['deps'] : null,
                                array_key_exists( 'ver', $script_args ) ? $script_args['ver'] : null,
                                array_key_exists( 'in_footer', $script_args ) ? $script_args['in_footer'] : false
                            );
                        } else {
                            error_log( __CLASS__ . '::' . __FUNCTION__ . " => handle already registered : " . $handle . " , this asset won't be enqueued => " . $script_args['src'] );
                        }
                    }

                }
                if ( array_key_exists( 'localized_control_js', $params[ 'customizer_assets' ] ) ) {
                    $localized_control_js_params = is_array( $params[ 'customizer_assets' ][ 'localized_control_js' ] ) ? $params[ 'customizer_assets' ][ 'localized_control_js' ] : array();

                    if ( is_array( $localized_control_js_params ) && ! empty( $localized_control_js_params ) ) {
                        wp_localize_script(
                            array_key_exists( 'deps', $localized_control_js_params ) ? $localized_control_js_params['deps'] : '',
                            array_key_exists( 'global_var_name', $localized_control_js_params ) ? $localized_control_js_params['global_var_name'] : '',
                            array_key_exists( 'params', $localized_control_js_params ) ? $localized_control_js_params['params'] : array()
                        );
                    }
                }
            }//foreach
        }
        function czr_schedule_ajax_tmpl() {
            if ( ! is_array( $this->registered_modules ) || empty( $this->registered_modules ) )
              return;

            foreach ( $this->registered_modules as $module_type => $params ) {
                $params = wp_parse_args( $params, $this -> default_dynamic_module_params );
                if ( ! empty( $params['tmpl'] ) ) {
                    $module_type = $params['module_type'];
                    add_filter( "ac_set_ajax_czr_tmpl___{$module_type}", array( $this, 'ac_get_ajax_module_tmpl'), 10, 3 );
                }
            }//foreach
        }
        function ac_get_ajax_module_tmpl( $html, $requested_tmpl = '', $posted_params = array() ) {
            if ( ! is_array( $posted_params ) || empty( $posted_params ) ) {
                wp_send_json_error( 'ac_get_ajax_module_tmpl => empty posted_params' );
            }
            if ( ! array_key_exists( 'module_type', $posted_params  ) || empty( $posted_params['module_type'] ) ) {
                wp_send_json_error( 'ac_get_ajax_module_tmpl => missing module_type' );
            }
            $registered_modules = $this->registered_modules;
            $module_type = $posted_params['module_type'];
            if ( ! array_key_exists( $module_type, $registered_modules  ) || empty( $registered_modules[ $module_type ] ) ) {
                return;
            }

            $module_params = $registered_modules[ $module_type ];
            $tmpl_params = $module_params[ 'tmpl' ];
            if ( empty( $tmpl_params ) ) {
                return;
            }
            $tmpl_map = array_key_exists( $requested_tmpl, $tmpl_params ) ? $tmpl_params[ $requested_tmpl ] : array();
            if ( empty( $tmpl_map ) ) {
                return;
            }
            if ( array_key_exists( 'tabs', $tmpl_map ) ) {
                ob_start();
                ?>
                <div class="tabs tabs-style-topline">
                  <nav>
                    <ul>
                      <?php
                        foreach ( $tmpl_map['tabs'] as $_key => $tab ) {
                          printf( '<li data-tab-id="section-topline-%1$s" %2$s><a href="#"><span>%3$s</span></a></li>',
                              $_key + 1,
                              array_key_exists('attributes', $tab) ? $tab['attributes'] : '',
                              $tab['title']
                          );
                        }//foreach
                      ?>
                    </ul>
                  </nav>
                  <div class="content-wrap">
                    <?php
                      foreach ( $tmpl_map['tabs'] as $_key => $tab ) {
                        printf( '<section id="section-topline-%1$s">%2$s</section>',
                            $_key + 1,
                            $this -> ac_generate_czr_tmpl_from_map( $tab['inputs'] )
                        );
                      }//foreach
                    ?>
                  </div><?php //.content-wrap ?>
                </div><?php //.tabs ?>
                <?php
                return ob_get_clean();
            } else {
                return $this -> ac_generate_czr_tmpl_from_map( $tmpl_map );
            }
        }

    }//class
endif;

?><?php

/**
* Customizer ajax content picker actions
*
*/
if ( ! class_exists( 'CZR_Fmk_Base' ) ) :
    class CZR_Fmk_Base extends CZR_Fmk_Dyn_Module_Registration {
      public function czr_setup_content_picker_ajax_actions() {
          if ( current_user_can( 'edit_theme_options' ) ) {
              add_action( 'wp_ajax_load-available-content-items-customizer'   , array( $this, 'ajax_load_available_items' ) );
              add_action( 'wp_ajax_search-available-content-items-customizer' , array( $this, 'ajax_search_available_items' ) );
          }
      }
      function czr_add_custom_item_to_ajax_results( $items, $page, $context ) {
          if ( is_numeric( $page ) && $page < 1 ) {
              return array_merge(
                  array(
                      array(
                         'title'      => sprintf( '<span style="font-weight:bold">%1$s</span>', __('Set a custom url', 'hueman') ),
                         'type'       => '',
                         'type_label' => '',
                         'object'     => '',
                         'id'         => '_custom_',
                         'url'        => ''
                      )
                  ),
                  $items
              );
          } else {
              return $items;
          }
      }
      function dont_use_fancy_permalinks() {
        return '';
      }


      /* ------------------------------------------------------------------------- *
       *  LOAD
      /* ------------------------------------------------------------------------- */
      /**
       * Ajax handler for loading available content items.
       * hook : wp_ajax_load-available-content-items-customizer
       */
      public function ajax_load_available_items() {
            $action = 'save-customize_' . get_stylesheet();
            if ( ! check_ajax_referer( $action, 'nonce', false ) ) {
                 wp_send_json_error( array(
                  'code' => 'invalid_nonce',
                  'message' => __( 'ajax_load_available_items => Security check failed.', 'hueman' ),
                ) );
            }

            if ( ! current_user_can( 'edit_theme_options' ) ) {
                wp_send_json_error('ajax_load_available_items => user_cant_edit_theme_options');
            }
            if ( ! isset( $_POST['wp_object_types'] ) || empty( $_POST['wp_object_types'] ) ) {
                wp_send_json_error( 'czr_ajax_content_picker_missing_type_or_object_parameter' );
            }

            if ( ! isset( $_POST['page'] ) ) {
                wp_send_json_error( 'czr_ajax_content_picker_missing_pagination_param' );
            }

            $wp_object_types = json_decode( wp_unslash( $_POST['wp_object_types'] ), true );
            if ( ! is_array( $wp_object_types ) || empty( $wp_object_types ) ) {
              wp_send_json_error( 'czr_ajax_content_picker_missing_object_types' );
            }
            $page = empty( $_POST['page'] ) ? 0 : absint( $_POST['page'] );

            $items = array();

            add_filter( 'pre_post_link', array( $this, 'dont_use_fancy_permalinks' ), 999 );
            foreach ( $wp_object_types as $_type => $_obj_types ) {
                if ( '_none_' == $_obj_types )
                  continue;
                $item_candidates = $this -> load_available_items_query(
                    array(
                        'type'          => $_type, //<= post or taxonomy
                        'object_types'  => $_obj_types,//<= '' or array( type1, type2, ... )
                        'page'          => $page
                    )
                );
                if ( is_array( $item_candidates ) ) {
                    $items = array_merge(
                        $items,
                        $item_candidates
                    );
                }
            }
            remove_filter( 'pre_post_link', array( $this, 'dont_use_fancy_permalinks' ), 999 );

            if ( is_wp_error( $items ) ) {
                wp_send_json_error( $items->get_error_code() );
            } else {
                wp_send_json_success( array(
                    'items' => apply_filters( 'content_picker_ajax_items', $items, $page, 'ajax_load_available_items' )
                ) );
            }
      }


      /**
       * Performs the post_type and taxonomy queries for loading available items.
       *
       * @since
       * @access public
       *
       * @param string $type   Optional. Accepts any custom object type and has built-in support for
       *                         'post_type' and 'taxonomy'. Default is 'post_type'.
       * @param string $object Optional. Accepts any registered taxonomy or post type name. Default is 'page'.
       * @param int    $page   Optional. The page number used to generate the query offset. Default is '0'.
       * @return WP_Error|array Returns either a WP_Error object or an array of menu items.
       */
      public function load_available_items_query( $args ) {
            $args = wp_parse_args( $args, array(
                  'type'          => 'post',
                  'object_types'  => '_all_',//could be page, post, or any CPT
                  'page'          => 0
            ) );

            $type         = $args['type'];
            $object_types = $args['object_types'];
            $page         = $args['page'];

            $items = array();
            if ( 'post' === $type ) {
                  if ( '_all_' == $object_types || ! is_array( $object_types ) || ( is_array( $object_types ) && empty( $object_types ) ) ) {
                      $post_types = get_post_types( array( 'public' => true ) );
                  } else {
                      $post_types = $object_types;
                  }
                  if ( ! $post_types || ! is_array( $post_types ) || empty( $post_types ) ) {
                      return new \WP_Error( 'czr_contents_invalid_post_type' );
                  }

                  $posts = get_posts( array(
                      'numberposts' => 5,
                      'offset'      => 5 * $page,
                      'orderby'     => 'date',
                      'order'       => 'DESC',
                      'post_type'   => $post_types,
                  ) );

                  foreach ( $posts as $post ) {
                        $post_title = $post->post_title;
                        if ( '' === $post_title ) {
                          $post_title = sprintf( __( '#%d (no title)', 'hueman' ), $post->ID );
                        }
                        $items[] = array(
                            'title'      => html_entity_decode( $post_title, ENT_QUOTES, get_bloginfo( 'charset' ) ),
                            'type'       => 'post',
                            'type_label' => get_post_type_object( $post->post_type )->labels->singular_name,
                            'object'     => $post->post_type,
                            'id'         => intval( $post->ID ),
                            'url'        => get_permalink( intval( $post->ID ) ),
                        );
                  }

            } elseif ( 'taxonomy' === $type ) {
                  if ( '_all_' == $object_types || ! is_array( $object_types ) || ( is_array( $object_types ) && empty( $object_types ) ) ) {
                      $taxonomies = get_taxonomies( array( 'show_in_nav_menus' => true ), 'names' );
                  } else {
                      $taxonomies = $object_types;
                  }
                  if ( ! $taxonomies || ! is_array( $taxonomies ) || empty( $taxonomies ) ) {
                      return new \WP_Error( 'czr_contents_invalid_post_type' );
                  }
                  $terms = get_terms( $taxonomies, array(
                      'child_of'     => 0,
                      'exclude'      => '',
                      'hide_empty'   => false,
                      'hierarchical' => 1,
                      'include'      => '',
                      'number'       => 5,
                      'offset'       => 5 * $page,
                      'order'        => 'DESC',
                      'orderby'      => 'count',
                      'pad_counts'   => false,
                  ) );
                  if ( is_wp_error( $terms ) ) {
                    return $terms;
                  }

                  foreach ( $terms as $term ) {
                        $items[] = array(
                            'title'      => html_entity_decode( $term->name, ENT_QUOTES, get_bloginfo( 'charset' ) ),
                            'type'       => 'taxonomy',
                            'type_label' => get_taxonomy( $term->taxonomy )->labels->singular_name,
                            'object'     => $term->taxonomy,
                            'id'         => intval( $term->term_id ),
                            'url'        => get_term_link( intval( $term->term_id ), $term->taxonomy ),
                        );
                  }
            }

            /**
             * Filters the available items.
             *
             * @since
             *
             * @param array  $items  The array of menu items.
             * @param string $type   The object type.
             * @param string $object The object name.
             * @param int    $page   The current page number.
             */
            $items = apply_filters( 'czr_customize_content_picker_available_items', $items, $type, $object_types, $page );
            return $items;
      }




      /* ------------------------------------------------------------------------- *
       *  SEARCH
      /* ------------------------------------------------------------------------- */
      /**
       * Ajax handler for searching available menu items.
       * hook : wp_ajax_search-available-content-items-customizer
       */
      public function ajax_search_available_items() {
            $action = 'save-customize_' . get_stylesheet();
            if ( ! check_ajax_referer( $action, 'nonce', false ) ) {
                wp_send_json_error( array(
                    'code' => 'invalid_nonce',
                    'message' => __( 'ajax_load_available_items => Security check failed.', 'hueman' ),
                ) );
            }

            if ( ! current_user_can( 'edit_theme_options' ) ) {
                wp_send_json_error('ajax_load_available_items => user_cant_edit_theme_options');
            }
            if ( ! isset( $_POST['wp_object_types'] ) || empty( $_POST['wp_object_types'] ) ) {
                wp_send_json_error( 'czr_ajax_content_picker_missing_type_or_object_parameter' );
            }
            if ( empty( $_POST['search'] ) ) {
                wp_send_json_error( 'czr_contents_missing_search_parameter' );
            }

            $p = isset( $_POST['page'] ) ? absint( $_POST['page'] ) : 0;
            if ( $p < 1 ) {
              $p = 1;
            }
            $s = sanitize_text_field( wp_unslash( $_POST['search'] ) );

            $wp_object_types = json_decode( wp_unslash( $_POST['wp_object_types'] ), true );
            if ( ! is_array( $wp_object_types ) || empty( $wp_object_types ) ) {
              wp_send_json_error( 'czr_ajax_content_picker_missing_object_types' );
            }

            $items = array();

            add_filter( 'pre_post_link', array( $this, 'dont_use_fancy_permalinks' ), 999 );

            foreach ( $wp_object_types as $_type => $_obj_types ) {
                if ( '_none_' == $_obj_types )
                  continue;
                $item_candidates = $this -> search_available_items_query(
                    array(
                        'type'          => $_type, //<= post or taxonomy
                        'object_types'  => $_obj_types,//<= '' or array( type1, type2, ... )
                        'pagenum'       => $p,
                        's'             => $s
                    )
                );
                if ( is_array( $item_candidates ) ) {
                    $items = array_merge(
                        $items,
                        $item_candidates
                    );
                }
            }
            remove_filter( 'pre_post_link', array( $this, 'dont_use_fancy_permalinks' ), 999 );

            if ( empty( $items ) ) {
                wp_send_json_success( array( 'message' => __( 'No results found.', 'hueman') ) );
            } else {
                wp_send_json_success( array(
                    'items' => apply_filters( 'content_picker_ajax_items', $items, $p, 'ajax_search_available_items' )
                ) );
            }
      }


      /**
       * Performs post queries for available-item searching.
       *
       * Based on WP_Editor::wp_link_query().
       *
       * @since 4.3.0
       * @access public
       *
       * @param array $args Optional. Accepts 'pagenum' and 's' (search) arguments.
       * @return array Menu items.
       */
      public function search_available_items_query( $args = array() ) {
            $args = wp_parse_args( $args, array(
                  'pagenum'       => 1,
                  's'             => '',
                  'type'          => 'post',
                  'object_types'  => '_all_'//could be page, post, or any CPT
            ) );
            $object_types = $args['object_types'];
            $items = array();
            if ( 'post' === $args['type'] ) {
                  if ( '_all_' == $object_types || ! is_array( $object_types ) || ( is_array( $object_types ) && empty( $object_types ) ) ) {
                      $post_types = get_post_types( array( 'public' => true ) );
                  } else {
                      $post_types = $object_types;
                  }
                  if ( ! $post_types || empty( $post_types ) ) {
                      return new \WP_Error( 'czr_contents_invalid_post_type' );
                  }

                  $query = array(
                      'suppress_filters'       => true,
                      'update_post_term_cache' => false,
                      'update_post_meta_cache' => false,
                      'post_status'            => 'publish',
                      'posts_per_page'         => 10,
                  );
                  $args['pagenum']    = isset( $args['pagenum'] ) ? absint( $args['pagenum'] ) : 1;
                  $query['offset']    = $args['pagenum'] > 1 ? $query['posts_per_page'] * ( $args['pagenum'] - 1 ) : 0;
                  $query['post_type'] = $post_types;

                  if ( isset( $args['s'] ) ) {
                      $query['s'] = $args['s'];
                  }
                  $get_posts = new \WP_Query( $query );
                  if ( $get_posts->post_count ) {
                      foreach ( $get_posts->posts as $post ) {
                            $post_title = $post->post_title;
                            if ( '' === $post_title ) {
                              /* translators: %d: ID of a post */
                              $post_title = sprintf( __( '#%d (no title)', 'hueman' ), $post->ID );
                            }
                            $items[] = array(
                                'title'      => html_entity_decode( $post_title, ENT_QUOTES, get_bloginfo( 'charset' ) ),
                                'type'       => 'post',
                                'type_label' => get_post_type_object( $post->post_type )->labels->singular_name,
                                'object'     => $post->post_type,
                                'id'         => intval( $post->ID ),
                                'url'        => get_permalink( intval( $post->ID ) ),
                            );
                      }
                  }
            } elseif ( 'taxonomy' === $args['type'] ) {
                  if ( '_all_' == $object_types || ! is_array( $object_types ) || ( is_array( $object_types ) && empty( $object_types ) ) ) {
                      $taxonomies = get_taxonomies( array( 'show_in_nav_menus' => true ), 'names' );
                  } else {
                      $taxonomies = $object_types;
                  }
                  if ( ! $taxonomies || ! is_array( $taxonomies ) || empty( $taxonomies ) ) {
                      return new \WP_Error( 'czr_contents_invalid_post_type' );
                  }
                  $terms = get_terms( $taxonomies, array(
                      'name__like' => $args['s'],
                      'number'     => 10,
                      'offset'     => 10 * ( $args['pagenum'] - 1 )
                  ) );
                  if ( ! empty( $terms ) ) {
                        foreach ( $terms as $term ) {
                              $items[] = array(
                                  'title'      => html_entity_decode( $term->name, ENT_QUOTES, get_bloginfo( 'charset' ) ),
                                  'type'       => 'taxonomy',
                                  'type_label' => get_taxonomy( $term->taxonomy )->labels->singular_name,
                                  'object'     => $term->taxonomy,
                                  'id'         => intval( $term->term_id ),
                                  'url'        => get_term_link( intval( $term->term_id ), $term->taxonomy ),
                              );
                        }
                  }
                  /**
                  * Filters the available menu items during a search request.
                   *
                   * @since 4.5.0
                   *
                   * @param array $items The array of menu items.
                   * @param array $args  Includes 'pagenum' and 's' (search) arguments.
                   */
                  $items = apply_filters( 'czr_customize_content_picker_searched_items', $items, $args );
            }
            return $items;
      }
}
endif;

?><?php
/**
* @uses  wp_get_theme() the optional stylesheet parameter value takes into account the possible preview of a theme different than the one activated
*/
function czr_get_parent_theme_slug() {
    $theme_slug = get_option( 'stylesheet' );
    $theme_slug = isset($_REQUEST['theme']) ? $_REQUEST['theme'] : $theme_slug; //old wp versions
    $theme_slug = isset($_REQUEST['customize_theme']) ? $_REQUEST['customize_theme'] : $theme_slug;
    $theme_data = wp_get_theme( $theme_slug );
    if ( $theme_data -> parent() ) {
        $theme_slug = $theme_data -> parent() -> Name;
    }

    return sanitize_file_name( strtolower( $theme_slug ) );
}
function czr_is_multi_item_module( $module_type ) {
    $is_multi_item = false;
    $module_params = CZR_Fmk_Base() -> czr_get_registered_dynamic_module( $module_type );
    if ( is_array( $module_params ) ) {
        if ( array_key_exists( 'is_crud', $module_params ) ) {
            $is_multi_item = (bool)$module_params['is_crud'];
        }
        if ( array_key_exists( 'is_multi_item', $module_params ) ) {
            $is_multi_item = (bool)$module_params['is_multi_item'];
        }
    }
    return $is_multi_item;
}
function CZR_Fmk_Base( $params = array() ) {
    return CZR_Fmk_Base::czr_fmk_get_instance( $params );
}

?>