<?php
add_filter('ha_is_skop_on', '__return_false' );


//Do not remove this
load_template( get_template_directory() . '/functions/init-core.php' );

/**
* The best and safest way to extend the Humean WordPress theme with your own custom code is to create a child theme.
* You can add temporary code snippets and hacks to the current functions.php file, but unlike with a child theme, they will be lost on upgrade.
*
* If you don't know what a child theme is, you really want to spend 5 minutes learning how to use child themes in WordPress, you won't regret it :) !
* https://codex.wordpress.org/Child_Themes
*
*/

add_action('__before_content', function() {
  if ( ! is_customize_preview() )
    return;
    global $wp_customize;
    ?>
      <pre>
        <?php print_r( 'CUSTOMIZED POSTED VALUES ?' ); ?>
      </pre>
    <?php
    ?>
      <pre>
        <?php print_r($_POST); ?>
      </pre>
    <?php
    ?>
      <pre>
        <?php if( function_exists('HU_AD') ) { print_r('IS CHANGESET ENABLED ? ' . HU_AD() -> ha_is_changeset_enabled() ); } ?>
      </pre>
    <?php
      if ( $wp_customize -> changeset_post_id() ) {
        $changeset_post = get_post( $wp_customize -> changeset_post_id() );
        $changeset_data = json_decode( $changeset_post->post_content, true );
      }

    ?>
      <pre>
        <?php print_r('CHANGEET POST ID :' . $wp_customize -> changeset_post_id() ); ?>
      </pre>

      <div class="container">
          <div class="raw-option">
            <h2>CHANGESET POST DATA </h2>
            <p>
              <pre>
                <?php if ( isset( $changeset_data ) ) print_r( $changeset_data ); ?>
              </pre>
            </p>
            <h2>RAW OPTION COPYRIGHT </h2>
            <p>
              <pre>
                <?php print_r( hu_get_raw_option( 'copyright' ) ); ?>
              </pre>
            </p>
            <h2>RAW OPTION </h2>
            <p>
              <pre>
                <?php //print_r( get_option('hu_theme_options') ); ?>
              </pre>
            </p>
          </div>
      </div>
    <?php
});