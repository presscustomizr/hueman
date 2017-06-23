/* ===================================================
 * jqueryCenterImages.js v1.0.0
 * ===================================================
 * (c) 2015 Nicolas Guillaume, Nice, France
 * CenterImages plugin may be freely distributed under the terms of the GNU GPL v2.0 or later license.
 *
 * License URI: http://www.gnu.org/licenses/gpl-2.0.html
 *
 * Center images in a specified container
 *
 * =================================================== */
;(function ( $, window, document, undefined ) {
      //defaults
      var pluginName = 'centerImages',
          defaults = {
                enableCentering : true,
                onresize : true,
                oncustom : [],//list of event here
                imgSel : 'img',
                defaultCSSVal : { width : 'auto' , height : 'auto' },
                leftAdjust : 0,
                zeroLeftAdjust : 0,
                topAdjust : 0,
                zeroTopAdjust : -2,//<= top ajustement for h-centered
                enableGoldenRatio : false,
                goldenRatioLimitHeightTo : 350,
                goldenRatioVal : 1.618,
                skipGoldenRatioClasses : ['no-gold-ratio'],
                disableGRUnder : 767,//in pixels
                useImgAttr:false,//uses the img height and width attributes if not visible (typically used for the customizr slider hidden images)
                setOpacityWhenCentered : false,//this can be used to hide the image during the time it is centered
                opacity : 1
          };

      function Plugin( element, options ) {
            var self = this;
            this.container  = element;
            this.options    = $.extend( {}, defaults, options) ;
            this._defaults  = defaults;
            this._name      = pluginName;
            this._customEvt = $.isArray(self.options.oncustom) ? self.options.oncustom : self.options.oncustom.split(' ');
            this.init();
      }

      //can access this.element and this.option
      //@return void
      Plugin.prototype.init = function () {
            var self = this,
                _do = function() {
                    //applies golden ratio to all containers ( even if there are no images in container )
                    self._maybe_apply_golden_r();

                    //parses imgs ( if any ) in current container
                    var $_imgs = $( self.options.imgSel , self.container );

                    //WINDOW RESIZE EVENT ACTIONS
                    //GOLDEN RATIO (before image centering)
                    //creates a golden ratio fn on resize
                    if ( self.options.enableGoldenRatio ) {
                          $(window).bind(
                                'resize',
                                {},
                                _.debounce( function( evt ) { self._maybe_apply_golden_r( evt ); }, 200 )
                          );
                    }


                    //if no images or centering is not active, only handle the golden ratio on resize event
                    if ( 1 <= $_imgs.length && self.options.enableCentering ) {
                          self._parse_imgs($_imgs);
                    }
                };

            //fire
            _do();

            //bind the container element with custom events if any
            //( the images will also be bound )
            if ( $.isArray( self._customEvt ) ) {
                  self._customEvt.map( function( evt ) {
                        $( self.container ).bind( evt, {} , _do );
                  } );
            }
      };


      //@return void
      Plugin.prototype._maybe_apply_golden_r = function( evt ) {
            //check if options are valids
            if ( ! this.options.enableGoldenRatio || ! this.options.goldenRatioVal || 0 === this.options.goldenRatioVal )
              return;

            //make sure the container has not a forbidden class
            if ( ! this._is_selector_allowed() )
              return;
            //check if golden ratio can be applied under custom window width
            if ( ! this._is_window_width_allowed() ) {
                  //reset inline style for the container
                  $(this.container).attr('style' , '');
                  return;
            }

            var new_height = Math.round( $(this.container).width() / this.options.goldenRatioVal );
            //check if the new height does not exceed the goldenRatioLimitHeightTo option
            new_height = new_height > this.options.goldenRatioLimitHeightTo ? this.options.goldenRatioLimitHeightTo : new_height;
            $(this.container)
                  .css({
                        'line-height' : new_height + 'px',
                        height : new_height + 'px'
                  })
                  .trigger('golden-ratio-applied');
      };


      /*
      * @params string : ids or classes
      * @return boolean
      */
      Plugin.prototype._is_window_width_allowed = function() {
            return $(window).width() > this.options.disableGRUnder - 15;
      };


      //@return void
      Plugin.prototype._parse_imgs = function( $_imgs ) {
            var self = this;
            $_imgs.each(function ( ind, img ) {
                  var $_img = $(img);
                  self._pre_img_cent( $_img );

                  //IMG CENTERING FN ON RESIZE ?
                  if ( self.options.onresize ) {
                        $(window).resize( _.debounce( function() {
                              self._pre_img_cent( $_img );
                        }, 200 ) );
                  }
                  //CUSTOM EVENTS ACTIONS
                  //bind img
                  if ( $.isArray( self._customEvt ) ) {
                        self._customEvt.map( function( evt ) {
                              $_img.bind( evt, {} , function( evt ) {
                                    self._pre_img_cent( $_img );
                              } );
                        } );
                  }
            });//$_imgs.each()
      };



      //@return void
      Plugin.prototype._pre_img_cent = function( $_img ) {
            var _state = this._get_current_state( $_img ),
                self = this,
                _case  = _state.current,
                _p     = _state.prop[_case],
                _not_p = _state.prop[ 'h' == _case ? 'v' : 'h'],
                _not_p_dir_val = 'h' == _case ? ( this.options.zeroTopAdjust || 0 ) : ( this.options.zeroLeftAdjust || 0 );

            var _centerImg = function( $_img ) {
                  $_img
                      .css( _p.dim.name , _p.dim.val )
                      .css( _not_p.dim.name , self.options.defaultCSSVal[ _not_p.dim.name ] || 'auto' )
                      .addClass( _p._class ).removeClass( _not_p._class )
                      .css( _p.dir.name, _p.dir.val ).css( _not_p.dir.name, _not_p_dir_val );

                  return $_img;
            };
            if ( this.options.setOpacityWhenCentered ) {
                  $.when( _centerImg( $_img ) ).done( function( $_img ) {
                        $_img.css( 'opacity', self.options.opacity );
                  });
            } else {
                  _centerImg( $_img );
            }
      };




      /********
      * HELPERS
      *********/
      //@return object with initial conditions : { current : 'h' or 'v', prop : {} }
      Plugin.prototype._get_current_state = function( $_img ) {
            var c_x     = $_img.closest(this.container).outerWidth(),
                c_y     = $(this.container).outerHeight(),
                i_x     = this._get_img_dim( $_img , 'x'),
                i_y     = this._get_img_dim( $_img , 'y'),
                up_i_x  = i_y * c_y !== 0 ? Math.round( i_x / i_y * c_y ) : c_x,
                up_i_y  = i_x * c_x !== 0 ? Math.round( i_y / i_x * c_x ) : c_y,
                current = 'h';
            //avoid dividing by zero if c_x or i_x === 0
            if ( 0 !== c_x * i_x ) {
                  current = ( c_y / c_x ) >= ( i_y / i_x ) ? 'h' : 'v';
            }

            var prop    = {
                  h : {
                        dim : { name : 'height', val : c_y },
                        dir : { name : 'left', val : ( c_x - up_i_x ) / 2 + ( this.options.leftAdjust || 0 ) },
                        _class : 'h-centered'
                  },
                  v : {
                        dim : { name : 'width', val : c_x },
                        dir : { name : 'top', val : ( c_y - up_i_y ) / 2 + ( this.options.topAdjust || 0 ) },
                        _class : 'v-centered'
                  }
            };

            return { current : current , prop : prop };
      };

      //@return img height or width
      //uses the img height and width if not visible and set in options
      Plugin.prototype._get_img_dim = function( $_img, _dim ) {
            if ( ! this.options.useImgAttr )
              return 'x' == _dim ? $_img.outerWidth() : $_img.outerHeight();

            if ( $_img.is(":visible") ) {
                  return 'x' == _dim ? $_img.outerWidth() : $_img.outerHeight();
            } else {
                  if ( 'x' == _dim ){
                        var _width = $_img.originalWidth();
                        return typeof _width === undefined ? 0 : _width;
                  }
                  if ( 'y' == _dim ){
                        var _height = $_img.originalHeight();
                        return typeof _height === undefined ? 0 : _height;
                  }
            }
      };

      /*
      * @params string : ids or classes
      * @return boolean
      */
      Plugin.prototype._is_selector_allowed = function() {
            //has requested sel ?
            if ( ! $(this.container).attr( 'class' ) )
              return true;

            //check if option is well formed
            if ( ! this.options.skipGoldenRatioClasses || ! $.isArray( this.options.skipGoldenRatioClasses )  )
              return true;

            var _elSels       = $(this.container).attr( 'class' ).split(' '),
                _selsToSkip   = this.options.skipGoldenRatioClasses,
                _filtered     = _elSels.filter( function(classe) { return -1 != $.inArray( classe , _selsToSkip ) ;});

            //check if the filtered selectors array with the non authorized selectors is empty or not
            //if empty => all selectors are allowed
            //if not, at least one is not allowed
            return 0 === _filtered.length;
      };


      // prevents against multiple instantiations
      $.fn[pluginName] = function ( options ) {
            return this.each(function () {
                if (!$.data(this, 'plugin_' + pluginName)) {
                    $.data(this, 'plugin_' + pluginName,
                    new Plugin( this, options ));
                }
            });
      };

})( jQuery, window, document );