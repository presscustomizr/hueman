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
	
/*  Posts
/* ------------------------------------ */	
	function alx_posts_shortcode($atts){

	extract( shortcode_atts( array(
		'category' => '',
		'count' => '10',
	), $atts ) );

	$my_query = new WP_Query(array('post_type' => 'post',
	                               'category_name' => $category,
	                               'posts_per_page' => $count,
	                               ));

		if ( $my_query->have_posts() ) :
			$out .= '<div class="post-list group">';
				$i = 1; $out .= '<div class="post-row">'; while ( $my_query->have_posts() ): $my_query->the_post();
				$out .= '<article id="post-' . get_the_ID() . '" class="' . implode(" ", get_post_class('group')) . '">';
					$out .= '<div class="post-inner post-hover">';
						$out .= '<div class="post-thumbnail">';
							$out .= '<a href="' . get_permalink() . '" title="' . get_the_title() . '">';
							if ( has_post_thumbnail() ):
								$out .= get_the_post_thumbnail(get_the_ID(), 'thumb-medium');
							else:
								$out .= '<img src="' . get_template_directory_uri() . '/img/thumb-medium.png" alt="' . get_the_title() . '" />';
							endif;
							if ( has_post_format('video') && !is_sticky() ){ $out .= '<span class="thumb-icon"><i class="fa fa-play"></i></span>';}
							if ( has_post_format('audio') && !is_sticky() ){ $out .= '<span class="thumb-icon"><i class="fa fa-volume-up"></i></span>';}
							if ( is_sticky() ){ $out .= '<span class="thumb-icon"><i class="fa fa-star"></i></span>';}
							$out .= '</a>';
							if ( !ot_get_option( 'comment-count' ) ):
								$out .= '<a class="post-comments" href="' . get_comments_link() . '"><span><i class="fa fa-comments-o"></i>' . get_comments_number( '0', '1', '%' ) . '</span></a>';
							endif;
						$out .= '</div><!--/.post-thumbnail-->';
						
						$out .= '<div class="post-meta group">';
							$out .= '<p class="post-date">' . get_the_time('j M, Y') . '</p>';
						$out .= '</div><!--/.post-meta-->';
						
						$out .= '<h2 class="post-title">';
							$out .= '<a href="' . get_permalink() . '" rel="bookmark" title="' . get_the_title() . '">' . get_the_title() . '</a>';
						$out .= '</h2><!--/.post-title-->';

					if (ot_get_option('excerpt-length') != '0'):
						$out .= '<div class="entry excerpt">';
							$out .= get_the_excerpt();
						$out .= '</div><!--/.entry-->';
					endif;
				$out .= '</div><!--/.post-inner-->';
				$out .= '</article><!--/.post-->';
								
				if($i % 2 == 0) { $out .= '</div><div class="post-row">'; } $i++; endwhile; $out .= '</div>'; 
			$out .= '</div><!--/.post-list-->';

	endif;
	wp_reset_postdata();

	return $out;

}

add_shortcode( 'posts', 'alx_posts_shortcode' );
