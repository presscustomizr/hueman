/* ===================================================
 * jqueryimgSmartLoad.js v1.0.0
 * ===================================================
 *
 * Replace all img src placeholder in the $element by the real src on scroll window event
 * Bind a 'smartload' event on each transformed img
 *
 * Note : the data-src (data-srcset) attr has to be pre-processed before the actual page load
 * Example of regex to pre-process img server side with php :
 * preg_replace_callback('#<img([^>]+?)src=[\'"]?([^\'"\s>]+)[\'"]?([^>]*)>#', 'regex_callback' , $_html)
 *
 * (c) 2016 Nicolas Guillaume, Nice, France
 *
 * Example of gif 1px x 1px placeholder :
 * 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
 *
 * inspired by the work of Luís Almeida
 * http://luis-almeida.github.com/unveil
 *
 * Requires requestAnimationFrame polyfill:
 * http://paulirish.com/2011/requestanimationframe-for-smart-animating/
 * =================================================== */
;(function ( $, window, document, undefined ) {
      //defaults
      var pluginName = 'imgSmartLoad',
          defaults = {
                load_all_images_on_first_scroll : false,
                attribute : [ 'data-src', 'data-srcset', 'data-sizes' ],
                excludeImg : [''],
                threshold : 200,
                fadeIn_options : { duration : 400 },
                delaySmartLoadEvent : 0,

          },
          //with intersecting cointainers:
          //- to avoid race conditions
          //- to avoid multi processing in general
          skipImgClass = 'tc-smart-load-skip';


      function Plugin( element, options ) {
            this.element = element;
            this.options = $.extend( {}, defaults, options) ;
            //add .tc-smart-load-skip to the excludeImg
            if ( _.isArray( this.options.excludeImg ) )
              this.options.excludeImg.push( '.'+skipImgClass );
            else
              this.options.excludeImg = [ '.'+skipImgClass ];

            this._defaults = defaults;
            this._name = pluginName;
            this.init();
      }


      //can access this.element and this.option
      Plugin.prototype.init = function () {
            var self        = this,
                $_imgs   = $( 'img[' + this.options.attribute[0] + ']:not('+ this.options.excludeImg.join() +')' , this.element );

            this.increment  = 1;//used to wait a little bit after the first user scroll actions to trigger the timer
            this.timer      = 0;


            $_imgs
                  //avoid intersecting cointainers to parse the same images
                  .addClass( skipImgClass )
                  //attach action to the load event
                  .bind( 'load_img', {}, function() { self._load_img(this); });

            //the scroll event gets throttled with the requestAnimationFrame
            $(window).scroll( function( _evt ) { self._better_scroll_event_handler( $_imgs, _evt ); } );
            //debounced resize event
            $(window).resize( _.debounce( function( _evt ) { self._maybe_trigger_load( $_imgs, _evt ); }, 100 ) );
            //on load
            this._maybe_trigger_load( $_imgs );
      };


      /*
      * @param : array of $img
      * @param : current event
      * @return : void
      * scroll event performance enhancer => avoid browser stack if too much scrolls
      */
      Plugin.prototype._better_scroll_event_handler = function( $_imgs , _evt ) {
            var self = this;
            if ( ! this.doingAnimation ) {
                  this.doingAnimation = true;
                  window.requestAnimationFrame(function() {
                        self._maybe_trigger_load( $_imgs , _evt );
                        self.doingAnimation = false;
                  });
            }
      };


      /*
      * @param : array of $img
      * @param : current event
      * @return : void
      */
      Plugin.prototype._maybe_trigger_load = function( $_imgs , _evt ) {
            var self = this;
                //get the visible images list
                _visible_list = $_imgs.filter( function( ind, _img ) { return self._is_visible( _img ,  _evt ); } );
            //trigger load_img event for visible images
            _visible_list.map( function( ind, _img ) { $(_img).trigger( 'load_img' );  } );
      };


      /*
      * @param single $img object
      * @param : current event
      * @return bool
      * helper to check if an image is the visible ( viewport + custom option threshold)
      */
      Plugin.prototype._is_visible = function( _img, _evt ) {
            var $_img       = $(_img),
                wt = $(window).scrollTop(),
                wb = wt + $(window).height(),
                it  = $_img.offset().top,
                ib  = it + $_img.height(),
                th = this.options.threshold;

            //force all images to visible if first scroll option enabled
            if ( _evt && 'scroll' == _evt.type && this.options.load_all_images_on_first_scroll )
              return true;

            return ib >= wt - th && it <= wb + th;
      };


      /*
      * @param single $img object
      * @return void
      * replace src place holder by data-src attr val which should include the real src
      */
      Plugin.prototype._load_img = function( _img ) {
            var $_img    = $(_img),
                _src     = $_img.attr( this.options.attribute[0] ),
                _src_set = $_img.attr( this.options.attribute[1] ),
                _sizes   = $_img.attr( this.options.attribute[2] ),
                self = this;

            $_img.parent().addClass('smart-loading');

            $_img.unbind('load_img')
                  .hide()
                  //https://api.jquery.com/removeAttr/
                  //An attribute to remove; as of version 1.7, it can be a space-separated list of attributes.
                  //minimum supported wp version (3.4+) embeds jQuery 1.7.2
                  .removeAttr( this.options.attribute.join(' ') )
                  .attr( 'sizes' , _sizes )
                  .attr( 'srcset' , _src_set )
                  .attr('src', _src )
                  .load( function () {
                        //prevent executing this twice on an already smartloaded img
                        if ( ! $_img.hasClass('tc-smart-loaded') ) {
                              $_img.fadeIn(self.options.fadeIn_options).addClass('tc-smart-loaded');
                        }

                        //Following would be executed twice if needed, as some browsers at the
                        //first execution of the load callback might still have not actually loaded the img

                        //jetpack's photon commpability (seems to be unneeded since jetpack 3.9.1)
                        //Honestly to me this makes no really sense but photon does it.
                        //Basically photon recalculates the image dimension and sets its
                        //width/height attribute once the image is smartloaded. Given the fact that those attributes are "needed" by the browser to assign the images a certain space so that when loaded the page doesn't "grow" it's height .. what's the point doing it so late?
                        if ( ( 'undefined' !== typeof $_img.attr('data-tcjp-recalc-dims')  ) && ( false !== $_img.attr('data-tcjp-recalc-dims') ) ) {
                              var _width  = $_img.originalWidth();
                                  _height = $_img.originalHeight();

                              if ( 2 != _.size( _.filter( [ _width, _height ], function(num){ return _.isNumber( parseInt(num, 10) ) && num > 1; } ) ) )
                                return;

                              //From photon.js: Modify given image's markup so that devicepx-jetpack.js will act on the image and it won't be reprocessed by this script.
                              $_img.removeAttr( 'data-tcjp-recalc-dims scale' );

                              $_img.attr( 'width', _width );
                              $_img.attr( 'height', _height );
                        }

                        $_img.trigger('smartload');
                  });//<= create a load() fn
            //http://stackoverflow.com/questions/1948672/how-to-tell-if-an-image-is-loaded-or-cached-in-jquery
            if ( $_img[0].complete ) {
                  $_img.load();
            }
            $_img.parent().removeClass('smart-loading');
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
