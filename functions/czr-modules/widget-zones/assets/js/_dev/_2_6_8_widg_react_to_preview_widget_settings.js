
//globals widgetModuleLocalized, themeServerControlParams
/*****************************************************************************
* CAPTURE PREVIEW INFORMATIONS ON REFRESH + REACT TO THEM
*****************************************************************************/
(function (api, $, _) {
      //Data are sent by the preview frame when the panel has sent the 'sync' or even better 'active' event
      api.bind( 'ready', function() {
            //observe widget settings changes
            api.previewer.bind('houston-widget-settings', function(data) {
                  //console.log('control panel => ALORS ON HOUSTON- SETTINGS ? => ', data );
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

                  //stores and update the widget zone settings
                  api.czr_widgetZoneSettings = api.czr_widgetZoneSettings || new api.Value();//will store all widget zones data sent by preview as an observable object
                  api.czr_widgetZoneSettings.set( {
                        actives :  data.renderedSidebars,
                        inactives :  _inactives,
                        registered :  _registered,
                        candidates :  _candidates,
                        available_locations :  data.availableWidgetLocations//built server side
                  } );

            });
      });//api.bind('ready')
})( wp.customize , jQuery, _ );