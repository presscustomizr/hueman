<?php
/* ------------------------------------------------------------------------- *
 *  Basic Shortcodes
/* ------------------------------------------------------------------------- */

/*  Columns / Grid
/* ------------------------------------ */
	function alx_column_shortcode($atts,$content=NULL) {
		extract( shortcode_atts( array(
			'size'	=> 'one-third',
			'last'	=> false
		), $atts) );

		$lastclass=$last?' last':'';
		$output='<div class="grid '.strip_tags($size).$lastclass.'">'.do_shortcode($content).'</div>';
		if($last)
			$output.='<div class="clear"></div>';
		return $output;
	}
	add_shortcode('column','alx_column_shortcode');

/*  Hr
/* ------------------------------------ */
	function alx_hr_shortcode($atts,$content=NULL) {
		$output = '<div class="hr"></div>';
		return $output;
	}
	add_shortcode('hr','alx_hr_shortcode');	

/*  Highlight
/* ------------------------------------ */
	function alx_highlight_shortcode($atts,$content=NULL) {
		$output = '<span class="highlight">'.strip_tags($content).'</span>';
		return $output;
	}
	add_shortcode('highlight','alx_highlight_shortcode');
	
/*  Dropcap
/* ------------------------------------ */
	function alx_dropcap_shortcode($atts,$content=NULL) {
		$output = '<span class="dropcap">'.strip_tags($content).'</span>';
		return $output;
	}
	add_shortcode('dropcap','alx_dropcap_shortcode');

/*  Pullquote Left
/* ------------------------------------ */
	function alx_pullquote_left_shortcode($atts,$content=NULL) {
		$output = '<span class="pullquote-left">'.strip_tags($content).'</span>';
		return $output;
	}
	add_shortcode('pullquote-left','alx_pullquote_left_shortcode');
	
/*  Pullquote Right
/* ------------------------------------ */
	function alx_pullquote_right_shortcode($atts,$content=NULL) {
		$output = '<span class="pullquote-right">'.strip_tags($content).'</span>';
		return $output;
	}
	add_shortcode('pullquote-right','alx_pullquote_right_shortcode');