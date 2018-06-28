//extends api.CZRDynModule
//globals widgetModuleLocalized, themeServerControlParams
var WidgetAreaConstructor = WidgetAreaConstructor || {};
( function ( api, $, _ ) {
      $.extend( WidgetAreaConstructor, {

            /////////////////////////////////////////
            /// LISTEN TO SIDEBAR INSIGHTS FROM THE PREVIEW FRAME
            /// REACT TO THEM
            ////////////////////////////////////////
            listenToSidebarInsights : function() {
                  var module = this;

                  //VISIBILITY BASED ON THE SIDEBAR INSIGHTS
                  api.sidebar_insights('registered').callbacks.add( function( _registered_zones ) {
                          var _current_collection = _.clone( module.itemCollection() );
                          _.each( _current_collection, function( _model ) {
                                if ( ! module.getViewEl(_model.id).length )
                                  return;

                                module.getViewEl(_model.id).css('display' , _.contains( _registered_zones, _model.id ) ? 'block' : 'none' );
                          });
                  });

                  //OPACITY SIDEBAR INSIGHTS BASED
                  api.sidebar_insights('inactives').callbacks.add( function( _inactives_zones ) {
                          var _current_collection = _.clone( module.itemCollection() );
                          _.each( _current_collection, function( _model ) {
                                if ( ! module.getViewEl(_model.id).length )
                                  return;

                                if ( _.contains( _inactives_zones, _model.id ) ) {
                                      module.getViewEl( _model.id ).addClass('inactive');
                                      if ( ! module.getViewEl( _model.id ).find('.czr-inactive-alert').length ) {
                                            module.getViewEl( _model.id ).find('.czr-item-title').append(
                                              $('<span/>', {class : "czr-inactive-alert", html : " [ " + widgetModuleLocalized.i18n.inactiveWidgetZone + " ]" })
                                            );
                                      }
                                }
                                else {
                                      module.getViewEl( _model.id ).removeClass('inactive');
                                      if ( module.getViewEl( _model.id ).find('.czr-inactive-alert').length )
                                        module.getViewEl( _model.id ).find('.czr-inactive-alert').remove();
                                }
                          });
                  });

                  //WIDGET SIDEBAR CREATION BASED ON SIDEBAR INSIGHTS
                  //react to a new register candidate(s) on preview refresh
                  api.sidebar_insights('candidates').callbacks.add( function(_candidates) {
                        if ( ! _.isArray(_candidates) )
                          return;
                        _.each( _candidates, function( _sidebar ) {
                              if ( ! _.isObject(_sidebar) )
                                return;
                              //add this widget sidebar and the related setting and control.
                              //Only if not added already
                              if ( api.section.has("sidebar-widgets-" +_sidebar.id ) )
                                return;

                              //access the registration method statically
                              module.addWidgetSidebar( {}, _sidebar );
                              //activate it if so
                              if ( _.has( api.sidebar_insights('actives')(), _sidebar.id ) && api.section.has("sidebar-widgets-" +_sidebar.id ) )
                                api.section( "sidebar-widgets-" +_sidebar.id ).activate();
                        });
                  });
            }//listenToSidebarInsights()
      });//$.extend()
})( wp.customize , jQuery, _ );


