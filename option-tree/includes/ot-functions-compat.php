<?php
/**
 * OptionTree Compatibility Functions.
 *
 * @package OptionTree
 */

if ( ! defined( 'OT_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}

// Run the actions & filters.
add_filter( 'ot_option_types_array', 'compat_ot_option_types_array', 10, 1 );
add_filter( 'ot_recognized_font_styles', 'compat_ot_recognized_font_styles', 10, 2 );
add_filter( 'ot_recognized_font_weights', 'compat_ot_recognized_font_weights', 10, 2 );
add_filter( 'ot_recognized_font_variants', 'compat_ot_recognized_font_variants', 10, 2 );
add_filter( 'ot_recognized_font_families', 'compat_ot_recognized_font_families', 10, 2 );
add_filter( 'ot_recognized_background_repeat', 'compat_ot_recognized_background_repeat', 10, 2 );
add_filter( 'ot_recognized_background_position', 'compat_ot_recognized_background_position', 10, 2 );
add_filter( 'ot_measurement_unit_types', 'compat_ot_measurement_unit_types', 10, 2 );


if ( ! function_exists( 'compat_ot_option_types_array' ) ) {

	/**
	 * Filters the option types array.
	 *
	 * Allows the old 'option_tree_option_types' filter to
	 * change the new 'ot_option_types_array' return value.
	 *
	 * @param  array $array The option types in key:value format.
	 * @return array
	 *
	 * @access public
	 * @since  2.0
	 */
	function compat_ot_option_types_array( $array ) {

		return apply_filters( 'option_tree_option_types', $array );

	}
}

if ( ! function_exists( 'compat_ot_recognized_font_styles' ) ) {

	/**
	 * Filters the recognized font styles array.
	 *
	 * Allows the old 'recognized_font_styles' filter to
	 * change the new 'ot_recognized_font_styles' return value.
	 *
	 * @param  array  $array The option types in key:value format.
	 * @param  string $id    The field ID.
	 * @return array
	 *
	 * @access public
	 * @since  2.0
	 */
	function compat_ot_recognized_font_styles( $array, $id ) {

		return apply_filters( 'recognized_font_styles', $array, $id );

	}
}

if ( ! function_exists( 'compat_ot_recognized_font_weights' ) ) {

	/**
	 * Filters the recognized font weights array.
	 *
	 * Allows the old 'recognized_font_weights' filter to
	 * change the new 'ot_recognized_font_weights' return value.
	 *
	 * @param  array  $array The option types in key:value format.
	 * @param  string $id    The field ID.
	 * @return array
	 *
	 * @access public
	 * @since  2.0
	 */
	function compat_ot_recognized_font_weights( $array, $id ) {

		return apply_filters( 'recognized_font_weights', $array, $id );

	}
}

if ( ! function_exists( 'compat_ot_recognized_font_variants' ) ) {

	/**
	 * Filters the recognized font variants array.
	 *
	 * Allows the old 'recognized_font_variants' filter to
	 * change the new 'ot_recognized_font_variants' return value.
	 *
	 * @param  array  $array The option types in key:value format.
	 * @param  string $id    The field ID.
	 * @return array
	 *
	 * @access public
	 * @since  2.0
	 */
	function compat_ot_recognized_font_variants( $array, $id ) {

		return apply_filters( 'recognized_font_variants', $array, $id );

	}
}

if ( ! function_exists( 'compat_ot_recognized_font_families' ) ) {

	/**
	 * Filters the recognized font families array.
	 *
	 * Allows the old 'recognized_font_families' filter to
	 * change the new 'ot_recognized_font_families' return value.
	 *
	 * @param  array  $array The option types in key:value format.
	 * @param  string $id    The field ID.
	 * @return array
	 *
	 * @access public
	 * @since  2.0
	 */
	function compat_ot_recognized_font_families( $array, $id ) {

		return apply_filters( 'recognized_font_families', $array, $id );

	}
}

if ( ! function_exists( 'compat_ot_recognized_background_repeat' ) ) {

	/**
	 * Filters the recognized background repeat array.
	 *
	 * Allows the old 'recognized_background_repeat' filter to
	 * change the new 'ot_recognized_background_repeat' return value.
	 *
	 * @param  array  $array The option types in key:value format.
	 * @param  string $id    The field ID.
	 * @return array
	 *
	 * @access public
	 * @since  2.0
	 */
	function compat_ot_recognized_background_repeat( $array, $id ) {

		return apply_filters( 'recognized_background_repeat', $array, $id );

	}
}

if ( ! function_exists( 'compat_ot_recognized_background_position' ) ) {

	/**
	 * Filters the recognized background position array.
	 *
	 * Allows the old 'recognized_background_position' filter to
	 * change the new 'ot_recognized_background_position' return value.
	 *
	 * @param  array  $array The option types in key:value format.
	 * @param  string $id    The field ID.
	 * @return array
	 *
	 * @access public
	 * @since  2.0
	 */
	function compat_ot_recognized_background_position( $array, $id ) {

		return apply_filters( 'recognized_background_position', $array, $id );

	}
}

if ( ! function_exists( 'compat_ot_measurement_unit_types' ) ) {

	/**
	 * Filters the measurement unit types array.
	 *
	 * Allows the old 'measurement_unit_types' filter to
	 * change the new 'ot_measurement_unit_types' return value.
	 *
	 * @param  array  $array The option types in key:value format.
	 * @param  string $id    The field ID.
	 * @return array
	 *
	 * @access public
	 * @since  2.0
	 */
	function compat_ot_measurement_unit_types( $array, $id ) {

		return apply_filters( 'measurement_unit_types', $array, $id );

	}
}
