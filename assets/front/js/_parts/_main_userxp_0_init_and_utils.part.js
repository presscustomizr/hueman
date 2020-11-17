var czrapp = czrapp || {};

/************************************************
* USER EXPERIENCE SUB CLASS
*************************************************/
(function($, czrapp) {
  var _methods =  {
      setupUIListeners : function() {
            var self = this;
            //declare and store the main user xp properties and obervable values
            this.windowWidth            = new czrapp.Value( czrapp.$_window.width() );
            this.isScrolling            = new czrapp.Value( false );
            this.isResizing             = new czrapp.Value( false );
            this.scrollPosition         = new czrapp.Value( czrapp.$_window.scrollTop() );
            this.scrollDirection        = new czrapp.Value('down');
            self.previewDevice          = new czrapp.Value( 'desktop' );

            //PREVIEWED DEVICE ?
            //Listen to the customizer previewed device
            if ( self._isCustomizing() ) {
                  var _setPreviewedDevice = function() {
                        wp.customize.preview.bind( 'previewed-device', function( device ) {
                              self.previewDevice( device );
                        });
                  };
                  if ( wp.customize.preview ) {
                      _setPreviewedDevice();
                  } else {
                        wp.customize.bind( 'preview-ready', function() {
                              _setPreviewedDevice();
                        });
                  }
            }

            //ABSTRACTION LAYER
            //listen to windowWidth
            self.windowWidth.bind( function( to, from ) {
                  //Always bail if is not "real" resize.
                  //=> Resize events can be triggered when scrolling on mobile devices, whitout actually resizing the screen
                  self.isResizing( self._isMobileScreenSize ? Math.abs( from - to ) > 2 : Math.abs( from - to ) > 0 );
                  clearTimeout( $.data( this, 'resizeTimer') );
                  $.data( this, 'resizeTimer', setTimeout(function() {
                        self.isResizing( false );
                  }, 50 ) );
            });

            //"real" horizontal resize reaction : refreshed every 50 ms
            self.isResizing.bind( function( is_resizing ) {
                  czrapp.$_body.toggleClass( 'is-resizing', is_resizing );
            });

            //react when scrolling status change
            //=> auto set it self to false after a while
            this.isScrolling.bind( function( to, from ) {
                  //self.scrollPosition( czrapp.$_window.scrollTop() );
                  czrapp.$_body.toggleClass( 'is-scrolling', to );
                  if ( ! to ) {
                        czrapp.trigger( 'scrolling-finished' );
                  }
            });


            //scroll position is set when scrolling
            this.scrollPosition.bind( function( to, from ) {
                  //handle scrolling classes
                  czrapp.$_body.toggleClass( 'is-scrolled', to > 100 );
                  if ( to <= 50 ) {
                        czrapp.trigger( 'page-scrolled-top', {} );
                  }
                  self.scrollDirection( to >= from ? 'down' : 'up' );
            });


            //BROWSER LAYER : RESIZE AND SCROLL
            //listen to user DOM actions
            czrapp.$_window.on('resize', _.throttle( function( ev ) { self.windowWidth( czrapp.$_window.width() ); }, 10 ) );
            czrapp.$_window.on('scroll', _.throttle( function() {
                  self.isScrolling( true );
                  //self.previousScrollPosition = self.scrollPosition() || czrapp.$_window.scrollTop();
                  self.scrollPosition( czrapp.$_window.scrollTop() );
                  clearTimeout( $.data( this, 'scrollTimer') );
                  $.data( this, 'scrollTimer', setTimeout(function() {
                        self.isScrolling( false );
                  }, 100 ) );
            }, 10 ) );

      },
      //useful function which resets relevant inline CSS rules of an element
      //which has been slided UP/Down (http://api.jquery.com/slidedown/, http://api.jquery.com/slideup/)
      //This function can be called as complete callback to:
      //1) reset the display property => e.g. we want to proper handle the visibility of the element, after the animation ends, within our stylesheet
      //2) reset height/padding/margin => it might happen (due to the stop() function call while animating, e.g. when fast clicking/submenu hovering) that the slided element
      //retains these rules as inline style. This can have a very bad impact on elements which display differently in different viewports, e.g. the footer menu.
      //
      //While we have a different html element for the header menu in mobile devices, we use the same html element for the footer menu.
      //Following some examples of the issues the use of this code prevents:
      //- case 1:
      //     a) we shrink the window till reaching the mobile viewport
      //     b) we open the footer mobile menu
      //     c) we close it
      //     d) we re-enlarge the window
      //   => without the 1) the display:none (produced by the slideUp) rule would have been added (step c) ) to the menu making it not visible in step d)
      //   similar thing can happen with the height property (due to the stop() aforementioned), if we don't reset it with 2)
      //- case 2:
      //     a) in desktop viewport we rapidly hover over different menu items with submenus, this, as said above, can produce some spurious inline style
      //     b) we shrink the window
      //     c) we open the footer mobile menu
      //   => without the 2) because of the retained inline style we can have submenu ul with a fixed height set, so potentially we can have adjacent menu items
      //   overlapping
      onSlidingCompleteResetCSS : function( $_el ) {
            $_el   = $_el ? $_el : $(this);
            $_el.css({
                  'display'    : '',
                  'paddingTop' : '',
                  'marginTop' : '',
                  'paddingBottom' : '',
                  'marginBottom' : '',
                  'height' : ''
            });
      },
  };//_methods{}

  czrapp.methods.UserXP = czrapp.methods.UserXP || {};
  $.extend( czrapp.methods.UserXP , _methods );

})(jQuery, czrapp);