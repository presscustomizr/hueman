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
            <h2>HA_SKOP_OPT() -> ha_get_sanitized_post_value( 'opt_name' ) </h2>
            <p>
               <pre>
                <?php print_r( HA_SKOP_OPT() -> ha_get_sanitized_post_value( 'opt_name' ) );  ?>
              </pre>
            </p>

            <h2>HA_SKOP_OPT() -> ha_get_sanitized_post_value( 'skope_id' ) </h2>
            <p>
               <pre>
                <?php print_r(HA_SKOP_OPT() -> ha_get_sanitized_post_value( 'skope_id' ) );  ?>
              </pre>
            </p>

            <h2>$wp_customize -> _skope_post_values </h2>
            <p>
               <pre>
                <?php print_r( HA_SKOP_OPT() ->_get_skope_post_values( HA_SKOP_OPT() -> ha_get_sanitized_post_value( 'skope_id' ) ) );  ?>
              </pre>
            </p>

            <h2>HA_SKOP_OPT() -> _get_skope_changeset_values( $skope_meta_key ) </h2>
            <p>
               <pre>
                <?php
                $skope_meta_key = HA_SKOP_OPT() -> ha_get_sanitized_post_value( 'opt_name') ;
                print_r( HA_SKOP_OPT() -> _get_skope_changeset_values( $skope_meta_key ) );  ?>
              </pre>
            </p>

            <h2> HA_SKOP_OPT() -> _get_skope_post_values( $skope_id ) </h2>
            <p>
               <pre>
                <?php print_r( HA_SKOP_OPT() -> _get_skope_post_values( HA_SKOP_OPT() -> ha_get_sanitized_post_value( 'skope_id' ) ) );  ?>
              </pre>
            </p>

            <h2>HA_SKOP_OPT() -> ha_get_current_customized_skope() </h2>
            <p>
               <pre>
                <?php print_r( HA_SKOP_OPT() -> ha_get_current_customized_skope() );  ?>
              </pre>
            </p>

            <h2>HA_SKOP_OPT() -> ha_get_unsanitized_customized_values() </h2>
            <p>
               <pre>
                <?php print_r( HA_SKOP_OPT() -> ha_get_unsanitized_customized_values() );  ?>
              </pre>
            </p>

            <h2>HA_SKOP_OPT() -> ha_get_customized_value( 'copyright' ) </h2>
            <p>
               <pre>
                <?php print_r( HA_SKOP_OPT() -> ha_get_customized_value( 'copyright' ) );  ?>
              </pre>
            </p>

            <h2>CHANGESET POST META HOME ? </h2>
            <p>
               <?php
                $_id = $wp_customize -> changeset_post_id();
                  ?>
                    <pre>
                      <?php print_r( get_post_meta( $_id , 'hueman_czr_home', true ) );  ?>
                    </pre>
                  <?php
               ?>
            </p>
            <h2>ALL CHANGESET POST METAS </h2>
            <p>
               <?php
                $_id = $wp_customize -> changeset_post_id();
                  ?>
                    <pre>
                      <?php print_r( get_post_meta( $_id ) );  ?>
                    </pre>
                  <?php
               ?>
            </p>
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