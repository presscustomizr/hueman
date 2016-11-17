<?php
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
if ( class_exists( 'HA_skop_dev_logs') ) {
  new HA_skop_dev_logs(
    array(
        'hook' => '__header_after_container_inner',
        'display_header' => false,
        'tested_option' => 'copyright'
      )

  );
}

//delete_post_meta( ha_get_skope_post_id(), 'hueman_czr_all_page' );
// foreach ( get_post_meta( ha_get_skope_post_id() )  as $key => $value) {
//   delete_post_meta( ha_get_skope_post_id(), $key );
// }