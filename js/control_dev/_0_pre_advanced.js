(function (api, $, _) {
  //LAB

  api.Setting.prototype.silent_set =function( to ) {
    var from = this._value;

    to = this._setter.apply( this, arguments );
    to = this.validate( to );

    // Bail if the sanitized value is null or unchanged.
    if ( null === to || _.isEqual( from, to ) ) {
      return this;
    }

    this._value = to;
    this._dirty = true;

    //this.callbacks.fireWith( this, [ to, from ] );

    return this;
  };

  api.bind('ready', function() {
        /**
        * Build the query to send along with the Preview request.
        *
        * @return {object}
        */
        api.previewer.query =  function() {
          var dirtyCustomized = {};
          api.each( function ( value, key ) {
            if ( value._dirty ) {
              dirtyCustomized[ key ] = value();
            }
          } );

          return {
            wp_customize: 'on',
            type: 'nicotyp',
            theme:      _wpCustomizeSettings.theme.stylesheet,
            customized: JSON.stringify( dirtyCustomized ),
            nonce:      this.nonce.preview
          };
        },



        //TO REMOVE : FOR TESTS ONLY
        api.previewer.save = function() {
          var self = this,
            processing = api.state( 'processing' ),
            submitWhenDoneProcessing,
            submit;

          $( document.body ).addClass( 'saving' );

          submit = function () {
            var request, query;
            query = $.extend( self.query(), {
              nonce:  self.nonce.save
            } );
            request = wp.ajax.post( 'customize_save', query );

            api.trigger( 'save', request );

            request.always( function () {
              $( document.body ).removeClass( 'saving' );
            } );

            request.fail( function ( response ) {
              console.log('ALORS FAIL ?', response );
              if ( '0' === response ) {
                response = 'not_logged_in';
              } else if ( '-1' === response ) {
                // Back-compat in case any other check_ajax_referer() call is dying
                response = 'invalid_nonce';
              }

              if ( 'invalid_nonce' === response ) {
                self.cheatin();
              } else if ( 'not_logged_in' === response ) {
                self.preview.iframe.hide();
                self.login().done( function() {
                  self.save();
                  self.preview.iframe.show();
                } );
              }
              api.trigger( 'error', response );
            } );

            request.done( function( response ) {
              console.log('ALORS DONE ?', response );
              // Clear setting dirty states
              api.each( function ( value ) {
                value._dirty = false;
              } );

              api.previewer.send( 'saved', response );

              api.trigger( 'saved', response );
            } );
          };

          if ( 0 === processing() ) {
            submit();
          } else {
            submitWhenDoneProcessing = function () {
              if ( 0 === processing() ) {
                api.state.unbind( 'change', submitWhenDoneProcessing );
                submit();
              }
            };
            api.state.bind( 'change', submitWhenDoneProcessing );
          }

        };
  });










  /*****************************************************************************
  * CAPTURE PREVIEW INFORMATIONS ON REFRESH + REACT TO THEM
  *****************************************************************************/
  /* CONTEXT */
  var ctx = new api.Values();
  ctx.create('wp');
  ctx.create('czr');
  api.czr_ctx = ctx;

  /* SIDEBAR INSIGHTS */
  var sidebar_insights = new api.Values();
  sidebar_insights.create('candidates');//will store the sidebar candidates on preview refresh
  sidebar_insights.create('actives');//will record the refreshed active list of active sidebars sent from the preview
  sidebar_insights.create('inactives');
  sidebar_insights.create('registered');
  sidebar_insights.create('available_locations');

  api.sidebar_insights = sidebar_insights;

  //PARTIAL REFRESHS
  var partial_refreshs = new api.Values();
  partial_refreshs.create('settings');
  api.czr_partials = partial_refreshs;

  //backup the original intialize
  var _old_initialize = api.PreviewFrame.prototype.initialize;

  //captures some values on preview refresh
  //@todo there must be a simpler way...
  //=> using api.previewer.deferred.active.done() works on the first load but not after. The instance is not the same ?
  api.PreviewFrame.prototype.initialize = function( params, options ) {
    _old_initialize.call( this, params, options );

    //observe widget settings changes
    this.bind('houston-widget-settings', function(data) {
        //get the difference
        var _candidates = _.filter( data.registeredSidebars, function( sb ) {
          return ! _.findWhere( _wpCustomizeWidgetsSettings.registeredSidebars, { id: sb.id } );
        });

        var _inactives = _.filter( data.registeredSidebars, function( sb ) {
          return ! _.has( data.renderedSidebars, sb.id );
        });

        _inactives = _.map( _inactives, function(obj) {
          return obj.id;
        });

        var _registered = _.map( data.registeredSidebars, function(obj) {
          return obj.id;
        });

        api.sidebar_insights('actives').set( data.renderedSidebars );
        api.sidebar_insights('inactives').set( _inactives );
        api.sidebar_insights('registered').set( _registered );
        api.sidebar_insights('candidates').set( _candidates );
        api.sidebar_insights('available_locations').set( data.availableWidgetLocations );//built server side
    });


    this.bind( 'wp-ctx-ready', function(data ) {
      api.czr_ctx('wp').set( data );
    });

    this.bind( 'czr-partial-refresh', function(data) {
      api.czr_partials('settings').set(data);
    });

    this.bind( 'czr-ctx-ready', function(data) {
      console.log('ALORS CTX?', data );
      api.czr_ctx('czr').set( data );
    });
  };//initialize

})( wp.customize , jQuery, _);