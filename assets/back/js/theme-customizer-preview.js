/**
 * Theme Customizer enhancements for a better user experience.
 *
 * Contains handlers to make Theme Customizer preview reload changes asynchronously.
 * Things like site title, description, and background color changes
 */
( function( $, _ ) {

  //HOW DOES THE PREVIEW POST MESSAGE REFRESH WORKS ?
  //the control panel sends message with the postMessage jQuery method
  //@see the send method of the Messenger Class
  //this.previewer.send( 'setting', [ this.id, this() ] );

  //the previewer listens to message send to the preview window
  //@see receive method in the Messenger Class in customize-base
  //$( window ).on( 'message', function(e, o) { console.log(e, o) })
  //$( window ).on( 'message', this.receive );
  //On reception an event is triggered with the setting.id as name and the message.data as args
  //That's why it's possible to use api.bind( setting.id, callback(data) );

  //TEST
  // $( window ).on( 'message', function(e, o) {
  //   console.log('ON MESSAGE', e, o);
  // });

  //TEST => access any setting change with the setting event
  // wp.customize.bind( 'preview-ready', function() {
  //   wp.customize.preview.bind('setting', function(e, o) {
  //     console.log('ON SETTING', e, o);
  //   });
  // });




  var api       = wp.customize,
      $_body    = $( 'body' ),
      _wp_sets  = ['blogname', 'blogdescription', 'background_color'],
      _setting_cbs = {},
      _subsetting_cbs = {};//for nested sub settings



  //Patch for wp versions before 4.1 => preview-ready signal isn't triggered
  if ( HUPreviewParams && ! HUPreviewParams.preview_ready_event_exists )
    $(document).ready(fireCzrPrev);
  else
    api.bind( 'preview-ready', function(){

        //send the current context and widgets settings
        api.preview.send( 'context-ready', api.settings.contx );
        api.preview.send( 'houston-widget-settings', _wpWidgetCustomizerPreviewSettings );

        //TEST
        // console.log('_wpCustomizeSettings', _wpCustomizeSettings, _wpCustomizeSettings.activeSections );
        // console.log('_wpWidgetCustomizerPreviewSettings', _wpWidgetCustomizerPreviewSettings);


        //settings cb
        _.map( _setting_cbs, function( _cb, _setId ) {
          if ( ! api.has( _build_setId(_setId) ) )
            return;
          api( _build_setId(_setId) ).bind( _setting_cbs[_setId] );
        } );

        //obj is : {
        // set_id : this.id,
        // model_id : obj.model.id,
        // changed_prop : _changed,
        // value : obj.model[_changed]
        // }
        api.preview.bind( 'sub_setting', function(obj) {
          //first get the "nude" option name
          var _opt_name = _get_option_name( obj.set_id );

          //do we have custom callbacks for this subsetting ?
          if ( ! _.has(_subsetting_cbs, _opt_name) )
            return;

          //do we have a custom callback for this model id ?
          if ( ! _.has( _subsetting_cbs[_opt_name], obj.changed_prop ) )
            return;

          //execute the cb
          _subsetting_cbs[_opt_name][obj.changed_prop]( obj );
        });

      }
    );//api.bind('preview-ready')

  /******************************************
  * GLOBAL SETTINGS
  ******************************************/
  $.extend( _setting_cbs, {
    blogname : function(to) {
      $( '.site-title a' ).text( to );
    },
    blogdescription : function(to) {
      $( '.site-description' ).text( to );
    },
    background_color : function( to ) {
      if ( '#ffffff' == to || '#fff' == to )
        $_body.addClass( 'custom-background-white' );
      else if ( '' === to )
        $_body.addClass( 'custom-background-empty' );
      else
        $_body.removeClass( 'custom-background-empty custom-background-white' );
    },
    copyright : function(to) {
      to = ( _.isEmpty(to) && _.has(HUPreviewParams, 'copyright' ) ) ? HUPreviewParams.copyright : to;
      $( '#footer-bottom #copyright p' ).text( to );
    },
    credit : function(to) {
      $( '#footer-bottom #credit' ).slideToggle();
    },
  });

  /******************************************
  * SUB SETTINGS
  ******************************************/
  $.extend( _subsetting_cbs, {
    'social-links' : {
        'title' : function( obj ) {
          $( '#'+ obj.model_id, '.social-links' ).attr('title', obj.value );
        },
        'social-color' : function( obj ) {
          $( '#'+ obj.model_id, '.social-links' ).find('i').css('color', obj.value );
        },
        'social-icon' : function( obj ) {
          var $_el = $( '#'+ obj.model_id, '.social-links' ).find('i'),
              _classes = $_el.attr('class').split(' '),
              _prev = '';

          //find the previous class
          _.filter(_classes, function(_c){
            if ( -1 != _c.indexOf('fa-') )
              _prev = _c;
          });

          $( '#'+ obj.model_id, '.social-links' ).find('i').removeClass(_prev).addClass( obj.value );
        },
        'social-link' : function( obj ) {
          if ( ! _isValidURL(obj.value) )
            return;

          $( '#'+ obj.model_id, '.social-links' ).attr('href', obj.value );
        },
        'social-target' : function( obj ) {
          if ( 0 !== ( obj.value * 1 ) )
            $( '#'+ obj.model_id, '.social-links' ).attr('target', "_blank");
          else
            $( '#'+ obj.model_id, '.social-links' ).removeAttr('target');

        },
    }
  });



  /******************************************
  * HELPERS
  ******************************************/
  /*
  * @return string
  * simple helper to build the setting id name if not a builtin wp setting id
  */
  var _build_setId = function ( name ) {
    //is wp built in ?
    if ( _.contains(_wp_sets, name ) )
      return name;
    //else
    return -1 == name.indexOf( 'hu_theme_options') ? [ 'hu_theme_options[' , name  , ']' ].join('') : name;
  };

  var _get_option_name = function(name) {
    return name.replace(/\[|\]|hu_theme_options/g, '');
  };

  //EXT LINKS HELPERS
  var _url_comp     = (location.host).split('.'),
      _nakedDomain  = new RegExp( _url_comp[1] + "." + _url_comp[2] );

  /*
  * @return boolean
  */
  var _is_external = function( _href  ) {
    //gets main domain and extension, no matter if it is a n level sub domain
    //works also with localhost or numeric urls
    var _thisHref = $.trim( _href ),
        _main_domain = (location.host).split('.').slice(-2).join('.'),
        _reg = new RegExp( _main_domain );

    if ( _thisHref !== '' && _thisHref != '#' && _isValidURL( _thisHref ) )
      return ! _reg.test( _thisHref );
    return;
  };

  /*
  * @return boolean
  */
  var _isValidURL = function(_url){
    var _pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    return _pattern.test( _url );
  };

} )( jQuery, _ );
