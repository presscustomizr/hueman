(function (api, $, _) {
  /*****************************************************************************
  * ADD SOME HELPERS AND PROPERTIES TO THE ALWAYS ACCESSIBLE API OBJECT.
  *****************************************************************************/
  api.czr_getDocSearchLink = function( text ) {
    text = ! _.isString(text) ? '' : text;
    var _searchtext = text.replace( / /g, '+'),
        _url = [ serverControlParams.docURL, 'search?query=', _searchtext ].join('');
    return [
      '<a href="' + _url + '" title="' + serverControlParams.translatedStrings.readDocumentation + '" target="_blank">',
      ' ',
      '<span class="fa fa-question-circle-o"></span>'
    ].join('');
  };


  api.czr_wp_builtin_settings = [
    'page_for_posts',
    'show_on_front',
    'blogname',
    'blogdescription'
  ];

  /*
  * @return string
  * simple helper to build the setting id name
  */
  api.czr_build_setId = function ( name ) {
    if ( _.has( api.czr_wp_builtin_settings, name ) )
      return name;
    return -1 == name.indexOf( serverControlParams.themeOptions ) ? [ serverControlParams.themeOptions +'[' , name  , ']' ].join('') : name;
  };

  //@return bool
  //@uses api.czr_partials
  api.czr_has_part_refresh = function( setId ) {
    if ( ! _.has( api, 'czr_partials')  )
      return;
    return  _.contains( _.map( api.czr_partials.get(), function( partial, key ) {
      return _.contains( partial.settings, setId );
    }), true );
  };

  //react to a ctx change
  //api.czr_wp_conditionals.callbacks.add( function( e, o) {
    //console.log('the wp conditionals have been updated', e, o );
  //});

  // $( window ).on( 'message', function( e, o) {
  //   console.log('WHAT ARE WE LISTENING TO?', e, o );
  // });
})( wp.customize , jQuery, _);