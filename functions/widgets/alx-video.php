<?php
/*
	AlxVideo Widget

	License: GNU General Public License v3.0
	License URI: http://www.gnu.org/licenses/gpl-3.0.html

	Copyright: (c) 2013-2015 Alexander "Alx" Agnarson, 2015 Nicolas GUILLAUME (nikeo)

		@package AlxVideo
		@version 1.0
*/

class AlxVideo extends WP_Widget {

/*  Constructor
/* ------------------------------------ */
	function __construct() {
		parent::__construct(
      'alxvideo',
      __('Hueman Videos', 'hueman'),
      array(
        'description' => __('Display a responsive video with a YouTube or Vimeo link.', 'hueman'),
        'classname' => 'widget_hu_video'
      )
    );
	}

  public function hu_get_defaults() {
    return array(
      'title'       => '',
    // Video
      'video_url'     => '',
    );
  }


/*  Widget
/* ------------------------------------ */
	public function widget($args, $instance) {
		extract( $args );
		$instance['title'] = isset( $instance['title'] ) ? $instance['title'] : '';
		$title = apply_filters('widget_title',$instance['title']);
		$output = $before_widget."\n";
		if($title)
			$output .= $before_title.$title.$after_title;
		ob_start();


		// The widget
		if ( !empty($instance['video_url']) ) {
			global $wp_embed;
			$video = $wp_embed->run_shortcode('[embed]'.$instance['video_url'].'[/embed]');
		}
		else {
			$video = '';
		}
		echo $video;


		$output .= ob_get_clean();
		$output .= $after_widget."\n";
		echo $output;
	}

/*  Widget update
/* ------------------------------------ */
	public function update($new,$old) {
		$instance = $old;
		$instance['title'] = esc_attr($new['title']);
	// Video
		$instance['video_url'] = esc_url($new['video_url']);
		return $instance;
	}

/*  Widget form
/* ------------------------------------ */
	public function form($instance) {
		// Default widget settings
		$defaults = $this -> hu_get_defaults();
		$instance = wp_parse_args( (array) $instance, $defaults );
?>

	<style>
	.widget .widget-inside .alx-options-video .postform { width: 100%; }
	.widget .widget-inside .alx-options-video p { margin: 3px 0; }
	.widget .widget-inside .alx-options-video hr { margin: 20px 0 10px; }
	.widget .widget-inside .alx-options-video h4 { margin-bottom: 10px; }
	</style>

	<div class="alx-options-video">
		<p>
			<label for="<?php echo esc_attr( $this->get_field_id('title') ); ?>">Title:</label>
			<input class="widefat" id="<?php echo esc_attr( $this->get_field_id('title') ); ?>" name="<?php echo esc_attr( $this->get_field_name('title') ); ?>" type="text" value="<?php echo esc_attr($instance["title"]); ?>" />
		</p>

		<h4>Responsive Video</h4>

		<p>
			<label for="<?php echo esc_attr( $this->get_field_id("video_url") ); ?>">Video URL</label>
			<input style="width:100%;" id="<?php echo esc_attr( $this->get_field_id("video_url") ); ?>" name="<?php echo esc_attr( $this->get_field_name("video_url") ); ?>" type="text" value="<?php echo esc_url( $instance["video_url"] ); ?>" />
		</p>
	</div>
<?php

}

}

/*  Register widget
/* ------------------------------------ */
if ( ! function_exists( 'hu_register_widget_video' ) ) {

	function hu_register_widget_video() {
		register_widget( 'AlxVideo' );
	}

}
add_action( 'widgets_init', 'hu_register_widget_video' );
