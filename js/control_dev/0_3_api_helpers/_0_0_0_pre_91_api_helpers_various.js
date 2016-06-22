(function (api, $, _) {
  api.CZR_Helpers = api.CZR_Helpers || {};
  //////////////////////////////////////////////////
  /// ACTIONS AND DOM LISTENERS
  //////////////////////////////////////////////////
  //adds action to an existing event map
  //@event map = [ {event1}, {event2}, ... ]
  //@new_event = {  trigger   : event name , actions   : [ 'cb1', 'cb2', ... ] }
  api.CZR_Helpers = $.extend( api.CZR_Helpers, {
        /*****************************************************************************
        * ADD SOME HELPERS AND PROPERTIES TO THE ALWAYS ACCESSIBLE API OBJECT.
        *****************************************************************************/
        getDocSearchLink : function( text ) {
                text = ! _.isString(text) ? '' : text;
                var _searchtext = text.replace( / /g, '+'),
                    _url = [ serverControlParams.docURL, 'search?query=', _searchtext ].join('');
                return [
                  '<a href="' + _url + '" title="' + serverControlParams.translatedStrings.readDocumentation + '" target="_blank">',
                  ' ',
                  '<span class="fa fa-question-circle-o"></span>'
                ].join('');
        },


        /*
        * @return string
        * simple helper to build the setting id name
        */
        build_setId : function ( name ) {
                //exclude the WP built-in settings like blogdescription, show_on_front, etc
                if ( _.contains( serverControlParams.wpBuiltinSettings, name ) )
                  return name;
                return -1 == name.indexOf( serverControlParams.themeOptions ) ? [ serverControlParams.themeOptions +'[' , name  , ']' ].join('') : name;
        },

        /*
        * @return string
        * simple helper to extract the option name from a setting id
        */
        getOptionName : function(name) {
              var self = this;
              return name.replace(/\[|\]/g, '').replace(serverControlParams.themeOptions, '');
        },

        //@return bool
        //@uses api.czr_partials
        has_part_refresh : function( setId ) {
                if ( ! _.has( api, 'czr_partials')  )
                  return;
                return  _.contains( _.map( api.czr_partials.get(), function( partial, key ) {
                  return _.contains( partial.settings, setId );
                }), true );
        },


        //////////////////////////////////////////////////
        /// STRINGS HELPERS
        //////////////////////////////////////////////////
        capitalize : function( string ) {
                if( ! _.isString(string) )
                  return string;
                return string.charAt(0).toUpperCase() + string.slice(1);
        },

        truncate : function( string, n, useWordBoundary ){
                if ( _.isUndefined(string) )
                  return '';
                var isTooLong = string.length > n,
                    s_ = isTooLong ? string.substr(0,n-1) : string;
                    s_ = (useWordBoundary && isTooLong) ? s_.substr(0,s_.lastIndexOf(' ')) : s_;
                return  isTooLong ? s_ + '...' : s_;
        }

  });//$.extend
  //react to a ctx change
  //api.czr_wp_conditionals.callbacks.add( function( e, o) {
    //console.log('the wp conditionals have been updated', e, o );
  //});

  // $( window ).on( 'message', function( e, o) {
  //   console.log('WHAT ARE WE LISTENING TO?', e, o );
  // });
})( wp.customize , jQuery, _);