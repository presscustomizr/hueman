<?php
/**
*
*
* @package      Hueman
* @since        3.0+
* @author       Nicolas GUILLAUME <nicolas@presscustomizr.com>,. Rocco ALIBERTI <rocco@presscustomizr.com>
* @copyright    Copyright (c) 2016, Nicolas GUILLAUME, Rocco ALIBERTI
* @link         http://presscustomizr.com/hueman
* @license      http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
*/
if ( ! class_exists( 'HU_customize_ajax_fp_actions' ) ) :
  class HU_customize_ajax_fp_actions {
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

            add_action( 'wp_ajax_get-fp-post'    , array( $this, 'ajax_get_fp_post' ) );
            add_action( 'wp_ajax_get-fp-post-tb' , array( $this, 'ajax_get_fp_post_tb' ) );

      }


      /**
       * Ajax handler for loading available content items.
       */
      public function ajax_get_fp_post() {
            check_ajax_referer( 'czr-featured-pages-nonce', 'CZRFPNonce' );

            if ( ! current_user_can( 'edit_theme_options' ) ) {
              wp_die( -1 );
            }
            if ( empty( $_POST['id'] ) ) {
              wp_send_json_error( 'czr_fp_missing_id_parameter' );
            }
            $id = sanitize_key( $_POST['id'] );


            $_post_info = $this-> get_fp_post( $id );

            if ( is_wp_error( $_post_info ) ) {
              wp_send_json_error( $_post_info ->get_error_code() );
            } else {
              wp_send_json_success( array( 'post_info' => $_post_info ) );
            }
      }

      /**
       * Ajax handler for loading available content items.
       */
      public function ajax_get_fp_post_tb() {
            check_ajax_referer( 'czr-featured-pages-nonce', 'CZRFPNonce' );

            if ( ! current_user_can( 'edit_theme_options' ) ) {
              wp_die( -1 );
            }
            if ( empty( $_POST['id'] ) ) {
              wp_send_json_error( 'czr_fp_missing_id_parameter' );
            }
            $id = sanitize_key( $_POST['id'] );

            $_post_tb = $this-> get_fp_post_tb( $id );

            if ( is_wp_error( $_post_tb ) ) {
              wp_send_json_error( $_post_tb ->get_error_code() );
            } else {
              wp_send_json_success( $_post_tb );
            }
      }

      public function get_fp_post( $id ) {
            $_post = get_post( $id );

            if ( empty( $_post ) )
              return array();

            //parse post
            //we need 1) thumbnail_id 2) excerpt
            //1) thumbnail_id
            $_post_info['thumbnail'] = get_post_thumbnail_id( $id );

            //2) excerpt
            $_post_info['excerpt']   = wp_trim_words( apply_filters('the_excerpt',  $_post -> post_content ) );;
            return $_post_info;
      }

      public function get_fp_post_tb( $id ) {
            return get_post_thumbnail_id( $id );
      }
  }
endif;
