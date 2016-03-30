<?php
//FOR TESTS
// => using copy_options in the url will copy the option tree options to the new option raw
// => using use_option_tree in the url will force the use of option tree instead of the new option raw
//
// @todo : check if customizing to add the default text for empty sidebars
// @todo : add the rating fix in the customizer for wp v4.5
//
// @todo : check the jquery player for audio post formats @fromfull
//
// @todo : previously set images : are they going to be displayed in the customizer ?
// @todo : body background setting
// @todo : for multi input, which sanitize_callback and sanitize_js_callback ?


//Fire Hueman
load_template( get_template_directory() . '/functions/init-core.php' );

/**
* THE BEST AND SAFEST WAY TO EXTEND THE HUEMAN THEME WITH YOUR OWN CUSTOM CODE IS TO CREATE A CHILD THEME.
* You can add code here but it will be lost on upgrade. If you use a child theme, you are safe!
*
* Don't know what a child theme is ? Then you really want to spend 5 minutes learning how to use child themes in WordPress, you won't regret it :) !
* https://codex.wordpress.org/Child_Themes
*
*/

/*add_action('wp', function() {
  global $wp_customize;
   if ( is_array($wp_customize) )
    array_walk_recursive($wp_customize, function(&$v) { $v = htmlspecialchars($v); });
  ?>
    <pre>
      <?php print_r($wp_customize); ?>
    </pre>
  <?php
});
*/

//TESTS
add_action('__after_header', function() {
  /* if ( is_array(get_option('hu_theme_options') )
    array_walk_recursive(get_option('hu_theme_options', function(&$v) { $v = htmlspecialchars($v); }); */
  /*?>
    <pre>
      <?php print_r(get_option('hu_theme_options')); ?>
    </pre>
  <?php*/
  // if ( hu_is_customizing() )
  //   return;
  /* if ( is_array(get_option('option_tree') ) )
    array_walk_recursive(get_option('option_tree', ) function(&$v) { $v = htmlspecialchars($v); }); */
  /* if ( is_array(get_option('option_tree')) )
    array_walk_recursive(get_option('option_tree'), function(&$v) { $v = htmlspecialchars($v); }); */
  ?>
    <pre>
      <?php
      $_opt_tree = get_option('option_tree');
      // echo '<br/><br/><br/><br/><br/><br/>';

      //   if ( isset($_opt_tree['sidebar-areas']) )
      //     print_r($_opt_tree['sidebar-areas']);

      //   if ( isset($_opt_tree['s1-home']) )
      //     print_r($_opt_tree['s1-home']);

       //print_r(hu_get_option('sidebar-areas'));
      //   echo '<br/><br/>';
      //   print_r(hu_get_option('sidebar-areas'));
      // echo '<br/><br/><br/><br/><br/><br/>';
      ?>
    </pre>
  <?php
  /* if ( is_array(get_the_c) )
    array_walk_recursive(get_the_c, function(&$v) { $v = htmlspecialchars($v); }); */
  /*?>
    <pre>
      <?php print_r(get_categories()); ?>
    </pre>
  <?php*/

 /*?>
    <pre>
      <?php print_r(hu_get_option('social-links', array() ) ); ?>
    </pre>
  <?php*/
  /* if ( is_array() )
    array_walk_recursive(, function(&$v) { $v = htmlspecialchars($v); }); */
  /*?>
    <pre>
      <?php print_r($_POST); ?>
    </pre>
  <?php*/
 /*?>
    <pre>
      <?php print_r(hu_get_option('sidebar-areas', array() ) ); ?>
    </pre>
  <?php*/

  /*
   if ( is_array($wp_registered_sidebars) )
    array_walk_recursive($wp_registered_sidebars, function(&$v) { $v = htmlspecialchars($v); });
  global $wp_registered_sidebars;
  ?>
        <pre>
          <?php print_r(get_option('sidebars_widgets')); ?>
        </pre>
      <?php
  ?>
    <pre>
      <?php print_r($wp_registered_sidebars); ?>
    </pre>
  <?php*/

});