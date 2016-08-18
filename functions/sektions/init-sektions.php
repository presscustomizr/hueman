<?php
//load_template( get_template_directory() . '/functions/skop/skop-options.php' );
if ( hu_is_customizing() ) {
  load_template( get_template_directory() . '/functions/sektions/sektions-customizer.php' );
  load_template( get_template_directory() . '/functions/sektions/tmpl/multi-module-tmpl.php');
  load_template( get_template_directory() . '/functions/sektions/tmpl/sektion-module-tmpl.php' );
  load_template( get_template_directory() . '/functions/sektions/tmpl/text-module-tmpl.php' );

  //module list
  load_template( get_template_directory() . '/functions/sektions/tmpl/available-modules-list-tmpl.php' );

  //sektion settings
  load_template( get_template_directory() . '/functions/sektions/tmpl/sektion-settings-tmpl.php' );
}

//add this option in the list of possible array options
add_filter('hu_get_skope_excluded_options', 'hu_allow_sektion_array_option');
function hu_allow_sektion_array_option( $allowed ) {
  return array_merge($allowed, array('sektions', 'module-collection'));
}

add_filter( 'hu_add_section_map', 'hu_add_sek_section' );
function hu_add_sek_section( $_current_sections ) {
  $_new_sections = array(
    'content_sektions_sec'         => array(
          'title'    => __( 'Dynamic Sections', 'hueman' ),
          'priority' => 100,
          'panel'   => 'hu-content-panel'
    )
  );
  return array_merge( $_current_sections, $_new_sections );
}

add_filter( 'hu_add_setting_control_map' , 'hu_add_sek_settings' );
function hu_add_sek_settings($_map) {
    $_sek_set = array(
          'sektions' => array(
                'default'   => array(),//empty array by default
                'control'   => 'HU_Customize_Modules',
                'label'     => __('Build your page live', 'hueman'),
                'section'   => 'content_sektions_sec',
                'type'      => 'czr_module',
                'module_type' => 'czr_sektion_module',
                'transport' => 'postMessage',
                'priority'  => 10,
                'syncCollection' => 'module-collection'
          ),
          'module-collection' => array(
                'default'   => array(),//empty array by default
                'control'   => 'HU_Customize_Modules',
                //'label'     => __('Build your page live', 'hueman'),
                'section'   => 'content_sektions_sec',
                'type'      => 'czr_multi_module',
                //'module_type' => 'czr_module_list',
                'transport' => 'postMessage',
                'priority'  => 10
          )
    );

    return array_merge( $_map, $_sek_set );
}














add_action( '__before_main', function() {
  ?>
    <div id="sektions-before-content">
      <?php do_action('__print_sektions_before_content'); ?>
    </div>
  <?php
});



function hu_print_modified_sektions() {
    hu_print_sektions();
}
function hu_print_modified_modules() {
    hu_print_sektions();
}



add_action('__print_sektions_before_content', 'hu_print_sektions');
function hu_print_sektions() {
  //get current customizer ajax request data
  /* if ( is_array($_POST) )
    array_walk_recursive($_POST, function(&$v) { $v = htmlspecialchars($v); }); */
  /*?>
    <pre>
      <?php print_r(hu_get_czr_post_values()); ?>
    </pre>
  <?php*/
  $sektions = hu_get_option('sektions');
  if ( ! $sektions || empty($sektions) || ! is_array($sektions) )
    return;

  $_layouts       = array(
    1 =>  'one-full',
    2 =>  'one-half',
    3 =>  'one-third',
    4 =>  'one-fourth'
  );
  foreach ( $sektions as $_k => $_sek ) {
    $_col_nb        = count($_sek['columns']);
    $_layout_class  = array_key_exists( $_col_nb, $_layouts) ? $_layouts[$_col_nb] : 'one-full';
    $i = 1;
    ?>
      <section class="content czr-sektion" id="sek-<?php echo $_sek['id'] ?>" data-sek-id="<?php echo $_sek['id'] ?>">

        <h2>Section : <?php echo $_sek['id']; ?></h2>

        <?php foreach ( $_sek['columns'] as $key => $_col ) : ?>
              <?php $_last = ( $i == $_col_nb ) ? 'last' : ''; ?>

              <div class="grid <?php echo $_layout_class ?> <?php echo $_last ?>">
                  <?php if ( empty($_col['modules']) ) : ?>
                        <div class="hu-placeholder-widget">
                            <h3>Add a module to column :<br><span class="zone-name"><?php echo $_col['id']; ?></span></h3>
                        </div>
                  <?php else : ?>
                         <?php hu_print_modules( $_col['modules'] ); ?>
                  <?php endif; ?>
              </div>

              <?php $i++; ?>
        <?php endforeach; ?>
      </section>
    <?php
  }//foreach
}


function hu_print_modules( $modules = array() ) {
    foreach ( $modules as $key => $mod ) {
        $mod = hu_get_module_from_collection( $mod['id'] );
        if ( ! function_exists( $mod['module_type'] . '_render' ) )
          continue;
        ?>
        <div class="hu-module-wrapper" data-module-id="<?php echo $mod['id']; ?>">
            <?php if ( ! $mod['dirty'] ) : ?>
              <?php hu_print_mod_placeholder( $mod['module_type'] ); ?>
            <?php else : ?>
              <?php call_user_func_array( $mod['module_type'] . '_render', array( $mod )); ?>
            <?php endif; ?>
        </div>
        <?php

    }
}


function hu_get_module_from_collection( $mod_id ) {
    $module_collection = hu_get_option('module-collection');
    foreach ($module_collection as $key => $mod) {
        if ( $mod['id'] != $mod_id )
          continue;
        return $mod;
    }
}



function hu_print_mod_placeholder( $module_type ) {
  $_icon_map = array(
      'czr_text_module' => 'short_text',
      'czr_text_editor_module' => 'subject',
      'czr_slide_module' => 'slideshow'
  );
  $_icon = ! isset( $_icon_map[$module_type] ) ? 'not_interested' : $_icon_map[$module_type];
  ?>
    <div class="czr-module-placeholder">
      <i class="material-icons"><?php echo $_icon; ?></i>
    </div>
  <?php
}










function czr_text_module_render( $mod ) {
    //this is a single item static module.
    //=> the module attributes are stored in the first items
    $default_text = 'No text set. Add text in this module.';
    $att = isset( $mod['items'][0] ) ? $mod['items'][0] : array();
    $att = wp_parse_args(
      $att,
      array('text' => '<span style="color:orange">' . $default_text . '</span>')
    );

    ?>
      <p><?php echo empty( $att['text'] ) ? $default_text : $att['text'] ?></p>
    <?php
}

function czr_text_editor_module_render( $mod ) {
    //this is a single item static module.
    //=> the module attributes are stored in the first items
    $att = isset( $mod['items'][0] ) ? $mod['items'][0] : array();
    $att = wp_parse_args(
      $att,
      array('text' => '<span style="color:orange">No text set. Add text in this module.</span>')
    );

    echo apply_filters('the_content', $att['text'] );
}


function czr_slide_module_render( $mod ) {
    //this is a multi item crud module.
    $slider_items = $mod['items'];
    $slider_id = $mod['id'];
    ?>
      <script type="text/javascript">
        // Check if first slider image is loaded, and load flexslider on document ready
        jQuery(function($){
              var $_slider_wrapper = $('#<?php echo $slider_id ?>'),
                  $_firstImage = $_slider_wrapper.find('img').filter(':first');

              if ( ! $_firstImage.length ) return;

              var checkforloaded = setInterval(function() {
                    var image = $_firstImage.get(0);

                    if (image && image.complete || image.readyState == 'complete' || image.readyState == 4) {
                          clearInterval(checkforloaded);

                          $_slider_wrapper.flexslider({
                            animation: "slide",
                            useCSS: false, // Fix iPad flickering issue
                            directionNav: true,
                            controlNav: true,
                            pauseOnHover: true,
                            animationSpeed: 400,
                            smoothHeight: true,
                            touch: <?php echo apply_filters('hu_flexslider_touch_support' , true); ?>,
                            slideshow: 'true',
                            slideshowSpeed: 5000
                          });
                    }
              }, 20);
        });
      </script>
      <div class="container" style="margin-bottom:100px;clear:both;">
        <div class="container-inner">
          <div class="slider-prototype flexslider " id="<?php echo $slider_id ?>" >
            <ul class="slides">
              <?php foreach ( $slider_items as $slide_att ): ?>
              <?php
                  $slide_att = wp_parse_args(
                    $slide_att,
                    array(
                      'title' => '',
                      'slide-background' => '',
                      'slide-title' => '',
                      'slide-subtitle' => ''
                    )
                  );
              ?>
              <li>
                <?php echo isset( $slide_att['slide-background'] ) ? wp_get_attachment_image( $slide_att['slide-background'], 'full') : '<img/>' ?>
                <p class="flex-caption">
                  <?php echo isset( $slide_att['slide-title'] ) ? '<h2 class="title">'. $slide_att['slide-title'] .'</h2>' : ''; ?>
                  <?php echo isset( $slide_att['slide-subtitle'] ) ? '<span class="subt-title" style="clear:both">'. $slide_att['slide-subtitle'] .'</span>' : ''; ?>
                </p>
              </li>
              <?php endforeach; ?>
            </ul>
          </div>
        </div>
      </div>
    <?php
}















//ADD SOME BASIC STYLING + SCRIPTS
add_action('wp_head', function() {
  ?>
  <style type="text/css" id="czr-sektions-style">
    .main { clear : both; }
    #sektions-before-content {
        background: #fff;
        clear: both;
        width: 100%;
        float: left;
        position: relative;
    }
    .czr-sektion {
        float:left;
        z-index: 10;
        margin: 0 0 3%;
        padding: 1% 0;
        border: 2px solid #eee;
    }
    .hu-module-wrapper {
      padding: 1% 0;
      text-align: center;
      border: 2px dotted #aaa;
      overflow: hidden;
      position:relative
    }
    .czr-module-placeholder .material-icons {
        font-size: inherit;
        color: #aaa;
    }
    .czr-hover-placeholder .material-icons {
      font-size: inherit;
      color: rgba(255, 255, 255, 0.55);
    }
    /* USED WHEN CUSTOMIZING */
    .czr-hover-placeholder {
      opacity: 0;
      -webkit-transition: opacity .18s;
      transition: opacity .18s;
      position:absolute;
      top:0;
      left:0;
      background:rgba(0, 0, 0, 0.5);
      text-align: center;
    }
  </style>
  <script type="text/javascript" id="czr-placeholder-fittext">
      jQuery( function($){
          var doFitText = function() {
            $(".czr-module-placeholder").each( function() {
                $(this).fitText( 0.3, { minFontSize: '50px', maxFontSize: '300px' } );
            });
          };
          doFitText();
          if ( 'function' == typeof(_) && ! _.isUndefined( wp.customize ) ) {
              wp.customize.selectiveRefresh.bind('partial-content-rendered' , function() {
                  doFitText();
              });
          }
      });
  </script>
  <?php
});
add_action('wp_enqueue_scripts', function() {
  wp_enqueue_style( 'google-material-icons', '//fonts.googleapis.com/icon?family=Material+Icons', array(), null, 'all' );
  wp_enqueue_script(
    'czr-fittext',
    get_template_directory_uri() .'/functions/sektions/assets/js/fittext.js',
    array(),
    HUEMAN_VER,
    true
  );
});






/* HELPERS */
if ( ! function_exists( 'hu_get_czr_post_values' ) ) {
  function hu_get_czr_post_values() {
    if ( ! isset( $_POST['customized'] ) )
      return array();

    return json_decode( wp_unslash( $_POST['customized'] ), true );
  }
}