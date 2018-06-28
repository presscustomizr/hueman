//extends api.CZRDynModule
//globals widgetModuleLocalized, themeServerControlParams
var WidgetAreaConstructor = WidgetAreaConstructor || {};
( function ( api, $, _ ) {
      $.extend( WidgetAreaConstructor, {
            initialize: function( id, constructorOptions ) {
                    var module = this;

                    api.CZRDynModule.prototype.initialize.call( this, id, constructorOptions );

                    //extend the module with new template Selectors
                    $.extend( module, {
                          itemPreAddEl : 'czr-module-widgets-pre-add-view-content',
                          itemInputList : 'czr-module-widgets-item-input-list',
                          ruItemPart : 'czr-module-widgets-ru-item-part'
                    } );

                    //EXTEND THE DEFAULT CONSTRUCTORS FOR INPUT
                    module.inputConstructor = api.CZRInput.extend( module.CZRWZonesInputMths || {} );
                    //EXTEND THE DEFAULT CONSTRUCTORS FOR MONOMODEL
                    module.itemConstructor = api.CZRItem.extend( module.CZRWZonesItemConstructor || {} );

                    module.serverParams = widgetModuleLocalized || {};

                    //add a shortcut to the server side json properties
                    module.contexts = _.has( module.serverParams , 'sidebar_contexts') ? module.serverParams.sidebar_contexts : {};

                    //context match map
                    module.context_match_map = {
                            is_404 : '404',
                            is_category : 'archive-category',
                            is_home : 'home',
                            is_page : 'page',
                            is_search : 'search',
                            is_single : 'single'
                    };


                    module.locations = _.has( module.serverParams , 'sidebar_locations') ? module.serverParams.sidebar_locations : {};

                    //declares a default model
                    module.defaultItemModel = {
                            id : '',
                            title : widgetModuleLocalized.i18n.widgetZone,
                            contexts : _.without( _.keys(module.contexts), '_all_' ),//the server list of contexts is an object, we only need the keys, whitout _all_
                            locations : [ module.serverParams.defaultWidgetLocation ],
                            description : ''
                    };

                    //overrides the default success message
                    this.itemAddedMessage = widgetModuleLocalized.i18n.widgetZoneAdded;

                    //Observe and react to sidebar insights from the preview frame
                    // SIDEBAR INSIGHTS => stores and observes the sidebars and widgets settings sent by the preview */
                    if ( ! _.has( api, 'sidebar_insights' ) ) {
                          api.sidebar_insights = new api.Values();
                          api.sidebar_insights.create('candidates');//will store the sidebar candidates on preview refresh
                          api.sidebar_insights.create('actives');//will record the refreshed active list of active sidebars sent from the preview
                          api.sidebar_insights.create('inactives');
                          api.sidebar_insights.create('registered');
                          api.sidebar_insights.create('available_locations');
                    }


                    this.listenToSidebarInsights();

                    //React on 'houston-widget-settings'
                    //actives :  data.renderedSidebars,
                    // inactives :  _inactives,
                    // registered :  _registered,
                    // candidates :  _candidates,
                    // available_locations :  data.availableWidgetLocations//built server side
                    api.czr_widgetZoneSettings = api.czr_widgetZoneSettings || new api.Value();
                    api.czr_widgetZoneSettings.bind( function( updated_data_sent_from_preview , from ) {
                            //console.log('REACT ON czr_widgetZoneSettings', updated_data_sent_from_preview , from );
                            module.isReady.then( function() {
                                  _.each( updated_data_sent_from_preview, function( _data, _key ) {
                                        api.sidebar_insights( _key ).set( _data );
                                  });
                            });
                    });




                    //AVAILABLE LOCATIONS FOR THE PRE MODEL
                    //1) add an observable value to module.preItem to handle the alert visibility
                    module.preItem_location_alert_view_state = new api.Value( 'closed');
                    //2) add state listeners
                    module.preItem_location_alert_view_state.callbacks.add( function( to, from ) {
                              module._toggleLocationAlertExpansion( module.container, to );
                    });


                    //REACT ON ADD / REMOVE ITEMS
                    module.bind( 'item-added', function( model ) {
                            module.addWidgetSidebar( model );
                    });

                    module.bind( 'pre_item_api_remove' , function(model) {
                            module.removeWidgetSidebar( model );
                    });


                    //records the top margin value of the widgets panel on each expansion
                    var fixTopMargin = new api.Values();
                    fixTopMargin.create('fixed_for_current_session');
                    fixTopMargin.create('value');

                    api.section(module.serverParams.dynWidgetSection).fixTopMargin = fixTopMargin;
                    api.section(module.serverParams.dynWidgetSection).fixTopMargin('fixed_for_current_session').set(false);


                    //setup reactions on widget section expansion
                    //change the expanded behaviour for the widget zone section
                    //api.section(module.serverParams.dynWidgetSection).expanded.callbacks.add( function() { return module.widgetSectionReact.apply(module, arguments ); } );

                    //bind actions on widget panel expansion and widget zone section expansion
                    //Fire the module
                    api.panel('widgets').expanded.callbacks.add( function(to, from) {
                          module.widgetPanelReact();//setup some visual adjustments, must be ran each time panel is closed or expanded

                          //Fire the module if not done already
                          if ( 'resolved' == module.isReady.state() )
                            return;
                          module.ready();
                    });
            },//initialize




            //When the control is embedded on the page, this method is fired in api.CZRBaseModuleControl:ready()
            //=> right after the module is instantiated.
            //VERIFIED
            ready : function() {
                    var module = this;
                    api.CZRDynModule.prototype.ready.call( module );

                    //add state listener on pre Item view
                    module.preItemExpanded.callbacks.add( function( to, from ) {
                          if ( ! to )
                            return;
                          //refresh the location list
                          module.preItem.czr_Input( 'locations' )._setupLocationSelect( true );//true for refresh
                          //refresh the location alert message
                          module.preItem.czr_Input( 'locations' ).mayBeDisplayModelAlert();
                    });
            },



            //overrides parent method
            //adds the default widget zones in the items
            //VERIFIED
            initializeModuleModel : function( constructorOptions ) {
                        var module = this, dfd = $.Deferred();
                        constructorOptions.items = _.union( _.has( module.serverParams, 'default_zones' ) ? module.serverParams.default_zones : [], constructorOptions.items );
                        return dfd.resolve( constructorOptions ).promise();
            },


      });//$.extend()

})( wp.customize , jQuery, _ );