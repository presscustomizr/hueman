<?php
/**
* Customizer ajax content picker actions
*
*
* @package      Hueman
* @since        3.0+
* @author       Nicolas GUILLAUME <nicolas@presscustomizr.com>,. Rocco ALIBERTI <rocco@presscustomizr.com>
* @copyright    Copyright (c) 2016, Nicolas GUILLAUME, Rocco ALIBERTI
* @link         http://presscustomizr.com/hueman
* @license      http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
*/
if ( ! class_exists( 'HU_customize_ajax_content_picker_actions' ) ) :
  class HU_customize_ajax_content_picker_actions {
        static $instance;
      /**
       * Constructor.
       *
       * @access public
       *
       */
      public function __construct(  ) {
            if ( ! current_user_can( 'edit_theme_options' ) ) {
              return;
            }

            self::$instance =& $this;

            add_action( 'wp_ajax_load-available-content-items-customizer', array( $this, 'ajax_load_available_items' ) );
            add_action( 'wp_ajax_search-available-content-items-customizer', array( $this, 'ajax_search_available_items' ) );
      }


      /**
       * Ajax handler for loading available content items.
       */
      public function ajax_load_available_items() {
            check_ajax_referer( 'czr-content-picker-nonce', 'CZRCpNonce' );

            if ( ! current_user_can( 'edit_theme_options' ) ) {
              wp_die( -1 );
            }
            if ( empty( $_POST['type'] ) || empty( $_POST['object'] ) ) {
              wp_send_json_error( 'czr_contents_missing_type_or_object_parameter' );
            }
            $type = sanitize_key( $_POST['type'] );
            $object = /*sanitize_key(*/ $_POST['object'] /*)*/;
            $page = empty( $_POST['page'] ) ? 0 : absint( $_POST['page'] );
            $items = $this->load_available_items_query( $type, $object, $page );
            if ( is_wp_error( $items ) ) {
              wp_send_json_error( $items->get_error_code() );
            } else {
              wp_send_json_success( array( 'items' => $items ) );
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
      public function load_available_items_query( $type = 'post_type', $object = 'page', $page = 0 ) {
            $items = array();
            if ( 'post_type' === $type ) {
                  $post_type = get_post_types( array( 'public' => true ) );
                  if ( ! $post_type ) {
                    return new WP_Error( 'czr_contents_invalid_post_type' );
                  }
                  $posts = get_posts( array(
                    'numberposts' => 10,
                    'offset'      => 10 * $page,
                    'orderby'     => 'date',
                    'order'       => 'DESC',
                    'post_type'   => $post_type,
                  ) );
                  foreach ( $posts as $post ) {
                        $post_title = $post->post_title;
                        if ( '' === $post_title ) {
                          /* translators: %d: ID of a post */
                          $post_title = sprintf( __( '#%d (no title)' ), $post->ID );
                        }
                        $items[] = array(
                          'title'      => html_entity_decode( $post_title, ENT_QUOTES, get_bloginfo( 'charset' ) ),
                          'type'       => 'post_type',
                          'type_label' => get_post_type_object( $post->post_type )->labels->singular_name,
                          'object'     => $post->post_type,
                          'id'         => intval( $post->ID ),
                          'url'        => get_permalink( intval( $post->ID ) ),
                        );
                  }
            } elseif ( 'taxonomy' === $type ) {
                  $taxonomies = get_taxonomies( array( 'show_in_nav_menus' => true ), 'names' );
                  $terms = get_terms( $taxonomies, array(
                    'child_of'     => 0,
                    'exclude'      => '',
                    'hide_empty'   => false,
                    'hierarchical' => 1,
                    'include'      => '',
                    'number'       => 10,
                    'offset'       => 10 * $page,
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
            $items = apply_filters( 'czr_customize_content_picker_available_items', $items, $type, $object, $page );
            return $items;
      }


      /**
       * Ajax handler for searching available menu items.
       *
       * @since 4.3.0
       * @access public
       */
      public function ajax_search_available_items() {
            check_ajax_referer( 'czr-content-picker-nonce', 'CZRCpNonce' );
            if ( ! current_user_can( 'edit_theme_options' ) ) {
              wp_die( -1 );
            }
            if ( empty( $_POST['search'] ) ) {
              wp_send_json_error( 'czr_contents_missing_search_parameter' );
            }
            $p = isset( $_POST['page'] ) ? absint( $_POST['page'] ) : 0;
            if ( $p < 1 ) {
              $p = 1;
            }
            $s = sanitize_text_field( wp_unslash( $_POST['search'] ) );
            $type = sanitize_key( $_POST['type'] );
            $object = /*sanitize_key(*/ $_POST['object'] /*)*/;
            $items = $this->search_available_items_query( array( 'pagenum' => $p, 's' => $s, 'object' => $object, 'type' => $type ) );
            if ( empty( $items ) ) {
              wp_send_json_error( array( 'message' => __( 'No results found.' ) ) );
            } else {
              wp_send_json_success( array( 'items' => $items ) );
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
            //TODO: need a search only on the allowed types
            $items = array();
            if ( 'post_type' === $args['type'] ) {
                  $query = array(
                  'suppress_filters'       => true,
                  'update_post_term_cache' => false,
                  'update_post_meta_cache' => false,
                  'post_status'            => 'publish',
                  'posts_per_page'         => 10,
                  );
                  $args['pagenum'] = isset( $args['pagenum'] ) ? absint( $args['pagenum'] ) : 1;
                  $query['offset'] = $args['pagenum'] > 1 ? $query['posts_per_page'] * ( $args['pagenum'] - 1 ) : 0;
                  $query['post_type'] = get_post_types( array( 'public' => true ) );
                  if ( isset( $args['s'] ) ) {
                  $query['s'] = $args['s'];
                      }

                  // Query posts.
                  $get_posts = new WP_Query( $query );
                  // Check if any posts were found.
                  if ( $get_posts->post_count ) {
                      foreach ( $get_posts->posts as $post ) {
                            $post_title = $post->post_title;
                            if ( '' === $post_title ) {
                              /* translators: %d: ID of a post */
                              $post_title = sprintf( __( '#%d (no title)' ), $post->ID );
                            }
                            $items[] = array(
                              'title'      => html_entity_decode( $post_title, ENT_QUOTES, get_bloginfo( 'charset' ) ),
                              'type'       => 'post_type',
                              'type_label' => get_post_type_object( $post->post_type )->labels->singular_name,
                              'object'     => $post->post_type,
                              'id'         => intval( $post->ID ),
                              'url'        => get_permalink( intval( $post->ID ) ),
                            );
                      }
                  }
            } elseif ( 'taxonomy' === $args['type'] ) {
                  // Query taxonomy terms.
                  $taxonomies = get_taxonomies( array( 'show_in_nav_menus' => true ), 'names' );
                  $terms = get_terms( $taxonomies, array(
                  'name__like' => $args['s'],
                  'number'     => 10,
                  'offset'     => 10 * ($args['pagenum'] - 1),
                  ) );

                  // Check if any taxonomies were found.
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
