<?php
//do not remove this
load_template( get_template_directory() . '/functions/init-core.php' );

/**
* The best and safest way to extend the Humean WordPress theme with your own custom code is to create a child theme.
* You can add temporary code snippets and hacks to the current functions.php file, but unlike with a child theme, they will be lost on upgrade.
*
* If you don't know what a child theme is, you really want to spend 5 minutes learning how to use child themes in WordPress, you won't regret it :) !
* https://codex.wordpress.org/Child_Themes
*
*/

/* Testing purpose only */
//add_action('__before_content', 'hu_test_display_skope_options');
//add_action('__before_content', 'print_options');
//add_action('__before_content', 'print_labels');

function print_labels() {
   ?>
    <pre>
      <?php print_r( get_post_type_object( 'page' ) ); ?>
    </pre>
  <?php
}

function print_options() {
   ?>
    <pre>
      <?php print_r( HU_SKOP_OPT() -> hu_get_raw_theme_option() ); ?>
    </pre>
  <?php
}

function hu_test_display_skope_options() {
  /* if ( is_array(get_option(HU_THEME_OPTIONS) ) )
    array_walk_recursive(get_option(HU_THEME_OPTIONS, ) function(&$v) { $v = htmlspecialchars($v); }); */
/*  ?>
    <pre>
      <?php print_r(get_option(HU_THEME_OPTIONS) ); ?>
    </pre>
  <?php*/
  ?>
    <div class="container">
        <div class="post-customizer">
            <h2>$_POST</h2>
            <p>
              <pre>
                <?php print_r( $_POST ); ?>
              </pre>
            </p>
            <p>HU_SKOP_OPT() -> hu_has_customized_val('copyright') : <?php echo HU_SKOP_OPT() -> hu_has_customized_val('copyright') ?></p>
        </div>
         <hr>
        <div class="skope">
            <h2>get skope</h2>
            <p>skope : <?php echo hu_get_skope() ?></p>
            <?php
              /* if ( is_array(hu_get_query_skope() ) )
                array_walk_recursive(hu_get_query_skope() , function(&$v) { $v = htmlspecialchars($v); }); */
              ?>
                <pre>
                  <?php print_r(hu_get_query_skope() ); ?>
                </pre>
              <?php
            ?>
        </div>
        <hr>
        <div class="meta-type">
            <h2>DYN TYPE AND META TYPE</h2>
            <?php
              $skope = hu_get_skope();
              $meta_type = hu_get_skope( 'meta_type', true );
              $_dyn_type = ( hu_is_customize_preview_frame() && isset($_POST['dyn_type']) ) ? $_POST['dyn_type'] : '';
            ?>
            <p>DYN TYPE : <?php echo $_dyn_type ?></p>
            <p>hu_get_skope() : <?php echo hu_get_skope(); ?></p>
            <p>META TYPE : <?php echo $meta_type ?> Can have trans opt? <?php echo HU_SKOP_OPT() -> hu_can_have_trans_opt($skope) ? 'OUI' : 'NON' ?></p>
        </div>
        <hr>
        <div class="current-scope-opt-name">
            <h2>Current Scopes Opt Names</h2>
            <p> <strong>Local</strong> : <?php echo HU_SKOP_OPT() -> hu_get_skope_opt_name('local'); ?></p>
            <p> <strong>group</strong> : <?php echo HU_SKOP_OPT() -> hu_get_skope_opt_name( 'group' ); ?></p>
            <p> <strong>special_group</strong> : <?php echo HU_SKOP_OPT() -> hu_get_skope_opt_name( 'special_group' ); ?></p>
            <p> <strong>global</strong> : <?php echo HU_SKOP_OPT() -> hu_get_skope_opt_name( 'global' ); ?></p>
        </div>
        <hr>
        <div class="get-option">
            <h2>Value of hu_get_option</h2>
            <p><?php echo hu_get_option( 'copyright'); ?></p>
        </div>
        <hr>
        <div class="customized">
            <h2>Customized</h2>
            <p><?php echo HU_SKOP_OPT() -> hu_get_customized_val( 'copyright' ); ?></p>
        </div>
        <hr>
        <div class="raw-db-option">
            <h2>Unfiltered DB option value</h2>
            <p><?php echo HU_SKOP_OPT() -> hu_get_raw_theme_option( 'copyright' ); ?></p>
        </div>
        <hr>
        <div class="local-skope">
            <h2>DB Value for Local Skope</h2>
            <p><?php echo isset($_POST['opt_name']) ? '$_POST Option name : ' . $_POST['opt_name'] : '' ?></p>
            <p><?php echo 'Our Option name : ' . HU_SKOP_OPT() -> hu_get_skope_opt_name('local') ?></p>
            <p><?php echo isset($_POST['opt_name']) ? strlen($_POST['opt_name']) . ' | ' . strlen(HU_SKOP_OPT() -> hu_get_skope_opt_name('local')) : '' ?></p>
            <?php
              $_meta_type = hu_get_skope( 'meta_type', true );
              $db_opt_name = HU_SKOP_OPT() -> hu_get_skope_opt_name('local');
              $_option_array = HU_SKOP_OPT() -> hu_get_skope_opt('local' , $_meta_type, $db_opt_name );
            ?>
            <p>Meta type : <?php echo $_meta_type; ?></p>
            <p>Option dyn type to fetch : <?php echo hu_get_skope_dyn_type( $_meta_type ); ?></p>
            <p>Option value : <?php echo isset($_option_array['copyright']) ? $_option_array['copyright'] : 'NOT SET'; ?></p>
        </div>
        <hr>
        <div class="cached-options">
            <h2>Cached options</h2>
            <h3>local</h3>
            <p>
              <pre>
                <?php print_r( HU_SKOP_OPT() -> hu_get_cached_opt('local') ); ?>
              </pre>
            </p>
            <h3>group</h3>
            <p>
              <pre>
                <?php print_r( HU_SKOP_OPT() -> hu_get_cached_opt('group') ); ?>
              </pre>
            </p>
            <h3>special group</h3>
            <p>
              <pre>
                <?php print_r( HU_SKOP_OPT() -> hu_get_cached_opt('special_group') ); ?>
              </pre>
            </p>
            <h3>global</h3>
            <p>
              <pre>
                <?php print_r( count( HU_SKOP_OPT() -> hu_get_cached_opt('global') ) ); ?>
              </pre>
            </p>
        </div>
    </div>
  <?php
}



// load_template( get_template_directory() . '/functions/czr/fp-prototype/functions.php');
// load_template( get_template_directory() . '/functions/czr/slider-prototype/functions.php');

add_shortcode( 'dummy_shortcode', 'dummy_shortcode_cb' );
// [bartag foo="foo-value"]
function dummy_shortcode_cb( $atts ) {
  extract( shortcode_atts( array(
    'background' => 'red',
    'text' => 'No text',
  ), $atts ) );

  return sprintf( '<p style="background:%1$s">%2$s</p>',
    $background,
    $text
   );
}




// $options = get_option('hu_theme_options');
// $options['module-collection'] = array();
// $options['sektions'] = array();
// update_option( 'hu_theme_options', $options );




/*add_action('__after_header', function(){
  ?>
    <pre>
      <?php print_r($_POST); ?>
    </pre>
  <?php
  $options = get_option('hu_theme_options');
  ?>
    <pre>
      <?php print_r($options['module-collection']); ?>
    </pre>
  <?php
} );*/