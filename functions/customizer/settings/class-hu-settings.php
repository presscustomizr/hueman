<?php
/***************************************************
* AUGMENTS WP CUSTOMIZE SETTINGS
***************************************************/
if ( ! class_exists( 'HU_Customize_Setting') ) :
  class HU_Customize_Setting extends WP_Customize_Setting {
    /**
     * Fetch the value of the setting.
     *
     * @since 3.4.0
     *
     * @return mixed The value.
     */
    public function value() {
        // Get the callback that corresponds to the setting type.
        switch( $this->type ) {
          case 'theme_mod' :
            $function = 'get_theme_mod';
            break;
          case 'option' :
            $function = 'get_option';
            break;
          default :

            /**
             * Filter a Customize setting value not handled as a theme_mod or option.
             *
             * The dynamic portion of the hook name, `$this->id_date['base']`, refers to
             * the base slug of the setting name.
             *
             * For settings handled as theme_mods or options, see those corresponding
             * functions for available hooks.
             *
             * @since 3.4.0
             *
             * @param mixed $default The setting default value. Default empty.
             */
            return apply_filters( 'customize_value_' . $this->id_data[ 'base' ], $this->default );
        }

        // Handle non-array value
        if ( empty( $this->id_data[ 'keys' ] ) )
          return $function( $this->id_data[ 'base' ], $this->default );

        // Handle array-based value
        $values = $function( $this->id_data[ 'base' ] );

        //Ctx future backward compat
        $_maybe_array = $this->multidimensional_get( $values, $this->id_data[ 'keys' ], $this->default );
        if ( ! is_array( $_maybe_array ) )
          return $_maybe_array;
        if ( isset($_maybe_array['all_ctx']) )
          return $_maybe_array['all_ctx'];
        if ( isset($_maybe_array['all_ctx_over']) )
          return $_maybe_array['all_ctx_over'];

        return $_maybe_array;
        //$this->default;
      }
  }
endif;