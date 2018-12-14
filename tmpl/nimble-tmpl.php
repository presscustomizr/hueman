<?php
if ( ! defined( 'ABSPATH' ) ) {
  exit;
}
get_header();//<= when the Hueman header is not used Nimble hooks on '__after_header' to fire hu_do_render_nimble_sections(),
// When using both Nimble header-footer and the Nimble template, '__after_header' is fired but ob_cleaned(), so the sections are rendered with
if ( function_exists( 'Nimble\sek_page_uses_nimble_header_footer' ) && \Nimble\sek_page_uses_nimble_header_footer() ) {
    hu_do_render_nimble_sections();
}

get_footer();