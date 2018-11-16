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

})( wp.customize , jQuery, _ );//extends api.CZRDynModule
//globals widgetModuleLocalized, themeServerControlParams
var WidgetAreaConstructor = WidgetAreaConstructor || {};
( function ( api, $, _ ) {
      $.extend( WidgetAreaConstructor, {

            CZRWZonesInputMths : {
                  ready : function() {
                          var input = this;

                          input.bind('locations:changed', function(){
                              input.mayBeDisplayModelAlert();
                          });

                          api.CZRInput.prototype.ready.call( input);
                  },



                  //////////////////////////////////////////////////
                  ///SETUP SELECTS
                  //////////////////////////////////////////////////
                  //setup select on view_rendered|item_content_event_map
                  setupSelect : function() {
                          var input      = this;
                          if ( 'locations' == this.id )
                            this._setupLocationSelect();
                          if ( 'contexts' == this.id )
                            this._setupContextSelect();

                  },

                  //helper
                  _setupContextSelect : function() {
                          var input      = this,
                              input_contexts = input(),
                              item = input.input_parent,
                              module     = input.module;

                          //generates the contexts options
                          _.each( module.contexts, function( title, key ) {
                                var _attributes = {
                                      value : key,
                                      html: title
                                    };
                                if ( key == input_contexts || _.contains( input_contexts, key ) )
                                  $.extend( _attributes, { selected : "selected" } );

                                $( 'select[data-czrtype="contexts"]', input.container ).append( $('<option>', _attributes) );
                          });
                          //fire czrSelect2
                          $( 'select[data-czrtype="contexts"]', input.container ).czrSelect2();
                  },


                  //helper
                  //the refresh param is a bool
                  _setupLocationSelect : function(refresh ) {
                          var input      = this,
                              input_locations = input(),
                              item = input.input_parent,
                              module     = input.module,
                              available_locs = api.sidebar_insights('available_locations')();

                          //console.log('_setupLocationSelect', input(), module.locations );
                          //generates the locations options
                          //append them if not set yet
                          if ( ! $( 'select[data-czrtype="locations"]', input.container ).children().length ) {
                                _.each( module.locations, function( title, key ) {
                                      var _attributes = {
                                            value : key,
                                            html: title
                                          };

                                      if ( key == input_locations || _.contains( input_locations, key ) )
                                        $.extend( _attributes, { selected : "selected" } );

                                      $( 'select[data-czrtype="locations"]', input.container ).append( $('<option>', _attributes) );
                                });
                          }//if

                          function setAvailability( state ) {
                                if (! state.id) { return state.text; }
                                if (  _.contains(available_locs, state.element.value) ) { return state.text; }
                                var $state = $(
                                  '<span class="czr-unavailable-location fas fa-ban" title="' + widgetModuleLocalized.i18n.unavailableLocation + '">&nbsp;&nbsp;' + state.text + '</span>'
                                );
                                return $state;
                          }

                          if ( refresh ) {
                                $( 'select[data-czrtype="locations"]', input.container ).czrSelect2( 'destroy' );
                          }

                          //fire czrSelect2
                          $( 'select[data-czrtype="locations"]', input.container ).czrSelect2( {
                            templateResult: setAvailability,
                            templateSelection: setAvailability
                          });
                  },

                  //fired on view event map : 'locations:changed'
                  //@param obj { dom_el: $() , model : {} )
                  mayBeDisplayModelAlert : function() {
                          var input      = this,
                              item = input.input_parent,
                              module     = input.module;

                          //check if we are in the pre Item case => if so, the locations might be empty
                          if ( ! _.has( item(), 'locations') || _.isEmpty( item().locations ) )
                            return;

                          var _selected_locations = $('select[data-czrtype="locations"]', input.container ).val(),
                              available_locs = api.sidebar_insights('available_locations')(),
                              _unavailable = _.filter( _selected_locations, function( loc ) {
                                return ! _.contains(available_locs, loc);
                              });

                          //check if we are in the pre Item case => if so, the id is empty
                          if ( ! _.has( item(), 'id' ) || _.isEmpty( item().id ) ) {
                                module.preItem_location_alert_view_state.set( ! _.isEmpty( _unavailable ) ? 'expanded' : 'closed' );
                          } else {
                                item.czr_itemLocationAlert.set( ! _.isEmpty( _unavailable ) ? 'expanded' : 'closed' );
                          }
                  }
            },//CZRWZonesInputMths

      });//$.extend()

})( wp.customize , jQuery, _ );//extends api.CZRDynModule
//globals widgetModuleLocalized, themeServerControlParams
var WidgetAreaConstructor = WidgetAreaConstructor || {};
( function ( api, $, _ ) {
      $.extend( WidgetAreaConstructor, {
            CZRWZonesItemConstructor : {
                  initialize : function( id, options ) {
                          var item = this,
                              module = item.module;

                          //Add some observable values for this item
                          item.czr_itemLocationAlert = new api.Value();

                          api.CZRItem.prototype.initialize.call( item, null, options );

                          // filter the params of the ajax query used to get the item wrapper template
                          // because we need a ru ( not a read update delete ) template for builtins widget zones
                          // requestParams = {
                          //       tmpl : 'rud-item-part',
                          //       module_type: 'all_modules',
                          //       nonce: api.settings.nonce.save//<= do we need to set a specific nonce to fetch the tmpls ?
                          // };
                          // this has been introduced in March 2018, after the introduction of the tmpl ajax fetching
                          // it does the same job that the overriden getTemplateEl() was doing.
                          // This filter is declared in item::renderItemWrapper()
                          item.bind( 'item-wrapper-tmpl-params-before-fetching', function( requestParams ) {
                                //force view-content type to ru-item-part if the model is a built-in (primary, secondary, footer-1, ...)
                                //=> user can't delete a built-in model.
                                requestParams.tmpl = ( _.has( item(), 'is_builtin' ) && item().is_builtin ) ? 'ruItemPart' : requestParams.tmpl;
                                return requestParams;
                          });
                  },



                  //extend parent setupview
                  itemWrapperViewSetup : function() {
                          var item = this,
                              module = item.module;

                          api.CZRItem.prototype.itemWrapperViewSetup.call(item);

                          /// ALERT FOR NOT AVAILABLE LOCATION
                          item.czr_itemLocationAlert.set('closed');

                          //add a state listener on expansion change
                          item.czr_itemLocationAlert.callbacks.add( function( to, from ) {
                                module._toggleLocationAlertExpansion( item.container , to );
                          });

                          //update item title
                          item.writeSubtitleInfos(item());

                          //this is fired just after the itemWrapperViewSetupApiListeners
                          //=> add a callback to refresh the availability status of the locations in the select location picker
                          //add a state listener on expansion change
                          item.viewState.callbacks.add( function( to, from ) {
                                if ( -1 == to.indexOf('expanded') )//can take the expanded_noscroll value !
                                  return;
                                //don't try to invoke the input instances before the content is actually rendered
                                //=> there might be cases when the content rendering is debounced...
                                item.bind('contentRendered', function() {
                                      //refresh the location list
                                      item.czr_Input('locations')._setupLocationSelect( true );//true for refresh
                                      //refresh the location alert message
                                      item.czr_Input('locations').mayBeDisplayModelAlert();
                                });

                          });
                  },


                  //extend parent listener
                  itemReact : function(to, from) {
                          var item = this;
                          api.CZRItem.prototype.itemReact.call(item, to, from);

                          item.writeSubtitleInfos(to);
                          item.updateSectionTitle(to).setModelUpdateTimer();
                  },



                  //Fired in setupItemListeners. Reacts to model change.
                  //Write html informations under the title : location(s) and context(s)
                  writeSubtitleInfos : function(model) {
                          var item = this,
                              module = item.module,
                              _model = _.clone( model || item() ),
                              _locations = [],
                              _contexts = [],
                              _html = '';

                          if ( ! item.container.length )
                            return this;

                          //generate the locations and the contexts text from the json data if exists
                          _model.locations =_.isString(_model.locations) ? [_model.locations] : _model.locations;
                          _.each( _model.locations, function( loc ) {
                                if ( _.has( module.locations , loc ) )
                                  _locations.push(module.locations[loc]);
                                else
                                  _locations.push(loc);
                            }
                          );

                          //build the context list
                          _model.contexts =_.isString(_model.contexts) ? [_model.contexts] : _model.contexts;

                          //all contexts cases ?
                          if ( item._hasModelAllContexts( model ) ) {
                            _contexts.push(module.contexts._all_);
                          } else {
                            _.each( _model.contexts, function( con ) {
                                    if ( _.has( module.contexts , con ) )
                                      _contexts.push(module.contexts[con]);
                                    else
                                      _contexts.push(con);
                                  }
                            );
                          }

                          //Translated strings
                          var _locationText = widgetModuleLocalized.i18n.locations,
                              _contextText = widgetModuleLocalized.i18n.contexts,
                              _notsetText = widgetModuleLocalized.i18n.notset;

                          _locations = _.isEmpty( _locations ) ? '<span style="font-weight: bold;">' + _notsetText + '</span>' : _locations.join(', ');
                          _contexts = _.isEmpty( _contexts ) ? '<span style="font-weight: bold;">' + _notsetText + '</span>' : _contexts.join(', ');

                          //write the description if builtin
                          //else, write the dynamic location
                          // if ( _.has(_model, 'description') && _.has(_model, 'is_builtin') )
                          //   _html =  _model.description + ' <strong>|</strong> <u>Contexts</u> : ' + _contexts;
                          // else

                          _html = '<u>' + _locationText + '</u> : ' + _locations + ' <strong>|</strong> <u>' + _contextText + '</u> : ' + _contexts;

                          if ( ! $('.czr-zone-infos', item.container ).length ) {
                                var $_zone_infos = $('<div/>', {
                                  class : [ 'czr-zone-infos' , module.control.css_attr.item_sort_handle ].join(' '),
                                  html : _html
                                });
                                $( '.' + module.control.css_attr.item_btns, item.container ).after($_zone_infos);
                          } else {
                                $('.czr-zone-infos', item.container ).html(_html);
                          }

                          return this;
                  },//writeSubtitleInfos



                  ////Fired in setupItemListeners
                  updateSectionTitle : function(model) {
                          var _sidebar_id = 'sidebar-widgets-' + model.id,
                              _new_title  = model.title;
                          //does this section exists ?
                          if ( ! api.section.has(_sidebar_id) )
                            return this;

                          //update the section title
                          $('.accordion-section-title', api.section(_sidebar_id).container ).text(_new_title);

                          //update the top title ( visible when inside the expanded section )
                          $('.customize-section-title h3', api.section(_sidebar_id).container ).html(
                            '<span class="customize-action">' + api.section(_sidebar_id).params.customizeAction + '</span>' + _new_title
                          );
                          // $('.customize-section-title h3', api.section(_sidebar_id).container )
                          //   .append('<span>', {
                          //       class: 'customize-section-back',
                          //       html: api.section(_sidebar_id).params.customizeAction
                          //     } )
                          //   .append(_new_title);

                          //remove and re-instanciate
                          //=> works for the section but the controls are not activated anymore.
                          //Should be easy to fix but useless to go further here. Jquery does the job.
                          // var _params = _.clone( api.section(_sidebar_id).params );
                          // _params.title = _new_title;
                          // api.section(_sidebar_id).container.remove();
                          // api.section.remove(_sidebar_id);
                          // api.section.add( _sidebar_id, new api.sectionConstructor[_params.type]( _params.id ,{ params : _params } ) );
                          return this;
                  },


                  //fired on model_update
                  //Don't hammer the preview with too many refreshs
                  //2 seconds delay
                  setModelUpdateTimer : function() {
                          var item = this,
                              module = item.module;

                          clearTimeout( $.data(this, 'modelUpdateTimer') );
                          $.data(
                              this,
                              'modelUpdateTimer',
                              _.delay( function() {
                                  //refresh preview
                                  api.previewer.refresh();
                              } , 1000)
                          );//$.data
                  },


                  //@return bool
                  //takes the model unique id
                  _hasModelAllContexts : function( model ) {
                          var item = this,
                              module = item.module,
                              moduleContexts = _.keys(module.contexts);

                          model = model || this();

                          if ( ! _.has(model, 'contexts') )
                            return;

                          if ( _.contains( model.contexts, '_all_') )
                            return true;

                          //case when model does not have _all_ but all the others
                          return _.isEmpty( _.difference( _.without(moduleContexts, '_all_') , model.contexts ) );
                  },

                  //@param contexts = array of contexts
                  //api.czr_wpQueryInfos is refreshed on each preview refresh
                  _getMatchingContexts : function( defaults ) {
                          var module = this,
                              _current = api.czr_wpQueryInfos().conditional_tags || {},
                              _matched = _.filter( module.context_match_map, function( hu, wp ) { return true === _current[wp]; } );

                          return _.isEmpty( _matched ) ? defaults : _matched;
                  }
            },//CZRWZonesItemConstructor

      });//$.extend()

})( wp.customize , jQuery, _ );//extends api.CZRDynModule
//globals widgetModuleLocalized, themeServerControlParams
var WidgetAreaConstructor = WidgetAreaConstructor || {};
( function ( api, $, _ ) {
      $.extend( WidgetAreaConstructor, {
            /////////////////////////////////////////
            /// ADD / REMOVE WIDGET ZONES
            ////////////////////////////////////////
            //fired on model_added_by_user
            //
            //can also be called statically when a dynamic sidebar is added in the preview
            //in this case the parameter are the sidebar data with id and name
            addWidgetSidebar : function( model, sidebar_data ) {
                  if ( ! _.isObject(model) && _.isEmpty(sidebar_data) ) {
                        throw new Error('No valid input were provided to add a new Widget Zone.');
                  }


                  //ADD the new sidebar to the existing collection
                  //Clone the serverControlParams.defaultWidgetSidebar sidebar
                  var module = this,
                      _model        = ! _.isEmpty(model) ? _.clone(model) : sidebar_data,
                      _new_sidebar  = _.isEmpty(model) ? sidebar_data : $.extend(
                            _.clone( _.findWhere( api.Widgets.data.registeredSidebars, { id: module.serverParams.defaultWidgetSidebar } ) ),
                            {
                                  name : _model.title,
                                  id : _model.id
                            }
                      );

                  //Add it to the backbone collection
                  api.Widgets.registeredSidebars.add( _new_sidebar );

                  //test if added:
                  //api.Widgets.registeredSidebars('czr_sidebars_8');


                  //ADD the sidebar section
                  var _params = $.extend(
                          _.clone( api.section( "sidebar-widgets-" + module.serverParams.defaultWidgetSidebar ).params ),
                          {
                                id : "sidebar-widgets-" + _model.id,
                                instanceNumber: _.max(api.settings.sections, function(sec){ return sec.instanceNumber; }).instanceNumber + 1,
                                sidebarId: _new_sidebar.id,
                                title: _new_sidebar.name,
                                description : 'undefined' != typeof(sidebar_data) ? sidebar_data.description : api.section( "sidebar-widgets-" + module.serverParams.defaultWidgetSidebar ).params.description,
                                //always set the new priority to the maximum + 1 ( module.serverParams.dynWidgetSection is excluded from this calculation because it must always be at the bottom )
                                priority: _.max( _.omit( api.settings.sections, module.serverParams.dynWidgetSection), function(sec){ return sec.instanceNumber; }).priority + 1,
                          }
                  );

                  api.section.add( _params.id, new api.sectionConstructor[ _params.type ]( _params.id ,{ params : _params } ) );

                  //add it to the static collection of settings
                  api.settings.sections[ _params.id ] = _params.id;

                  //ADD A SETTING
                  //Clone the module.serverParams.defaultWidgetSidebar sidebar widget area setting
                  var _new_set_id = 'sidebars_widgets['+_model.id+']',
                      _new_set    = $.extend(
                            _.clone( api.settings.settings['sidebars_widgets[' + module.serverParams.defaultWidgetSidebar + ']'] ),
                            {
                                  value:[]
                            }
                      );

                  //add it to the static collection of settings
                  api.settings.settings[ _new_set_id ] = _new_set;

                  //instanciate it
                  api.create( _new_set_id, _new_set_id, _new_set.value, {
                          transport: _new_set.transport,
                          previewer: api.previewer,
                          dirty: false
                  } );



                  //ADD A CONTROL
                  var _cloned_control = $.extend(
                            _.clone( api.settings.controls['sidebars_widgets[' + module.serverParams.defaultWidgetSidebar + ']'] ),
                            {
                              settings : { default : _new_set_id }
                        }),
                      _new_control = {};


                  //replace  serverControlParams.defaultWidgetSidebar  by the new sidebar id
                  _.each( _cloned_control, function( param, key ) {
                          if ( 'string' == typeof(param) ) {
                            param = param.replace( module.serverParams.defaultWidgetSidebar , _model.id );
                          }
                          _new_control[key] = param;
                  });

                  //set the instance number (no sure if needed)
                  _new_control.instanceNumber = _.max(api.settings.controls, function(con){ return con.instanceNumber; }).instanceNumber + 1;

                  //add it to the static collection of controls
                  api.settings.controls[_new_set_id] = _new_control;

                  //instanciate it
                  api.control.add( _new_set_id, new api.controlConstructor[ _new_control.type ]( _new_set_id, {
                          params: _new_control,
                          previewer: api.previewer
                  } ) );


                  //say it to the control container
                  //only if we are in an instanciated object => because this method can be accessed statically
                  if ( _.has(this, 'container') )
                    this.container.trigger( 'widget_zone_created', { model : _model, section_id : "sidebar-widgets-" + _model.id , setting_id : _new_set_id });
            },//addWidgetSidebar


            //fired on "after_modelRemoved"
            removeWidgetSidebar : function( model ) {
                  var module = this;
                  if ( ! _.isObject(model) || _.isEmpty(model) ) {
                        throw new Error('No valid data were provided to remove a Widget Zone.');
                  }

                  //Remove this sidebar from the backbone collection
                  api.Widgets.registeredSidebars.remove( model.id );

                  //remove the section from the api values and the DOM if exists
                  if ( api.section.has("sidebar-widgets-" + model.id) ) {
                          //Remove the section container from the DOM
                          api.section("sidebar-widgets-" + model.id).container.remove();
                          //Remove the sidebar section from the api
                          api.section.remove( "sidebar-widgets-" + model.id );
                          //Remove this section from the static collection
                          delete api.settings.sections[ "sidebar-widgets-" + model.id ];
                  }

                  //remove the setting from the api if exists
                  if ( api.has('sidebars_widgets['+model.id+']') ) {
                          //Remove this setting from the api
                          api.remove( 'sidebars_widgets['+model.id+']' );
                          //Remove this setting from the static collection
                          delete api.settings.settings['sidebars_widgets['+model.id+']'];
                  }

                  //remove the widget control of this sidebar from the api and the DOM if exists
                  if ( api.control.has('sidebars_widgets['+model.id+']') ) {
                          //Remove the control container from the DOM
                          api.control( 'sidebars_widgets['+model.id+']' ).container.remove();
                          //Remove this control from the api
                          api.control.remove( 'sidebars_widgets['+model.id+']' );
                          //Remove it to the static collection of controls
                          delete api.settings.controls['sidebars_widgets['+model.id+']'];
                  }

                  //refresh
                  var _refresh = function() {
                    api.previewer.refresh();
                  };
                  _refresh = _.debounce( _refresh, 500 );
                  $.when( _refresh() ).done( function() {
                        //say it
                        module.trigger( 'widget_zone_removed',
                              {
                                    model : model,
                                    section_id : "sidebar-widgets-" + model.id ,
                                    setting_id : 'sidebars_widgets['+model.id+']'
                              }
                        );
                  });
            },

      });//$.extend()

})( wp.customize , jQuery, _ );
//extends api.CZRDynModule
//globals widgetModuleLocalized, themeServerControlParams
var WidgetAreaConstructor = WidgetAreaConstructor || {};
( function ( api, $, _ ) {
      $.extend( WidgetAreaConstructor, {

            /////////////////////////////////////////
            /// SET EXPANSION CALLBACKS FOR WIDGET PANEL AND WIDGET ZONE CREATION SECTION
            ////////////////////////////////////////
            //cb of : api.panel('widgets').expanded.callbacks.add
            widgetPanelReact : function() {
                  var module = this;
                  //will be used for adjustments
                  var _top_margin = api.panel('widgets').container.find( '.control-panel-content' ).css('margin-top');

                  api.section(module.serverParams.dynWidgetSection).fixTopMargin('value').set( _top_margin );

                  var _section_content = api.section(module.serverParams.dynWidgetSection).container.find( '.accordion-section-content' ),
                    _panel_content = api.panel('widgets').container.find( '.control-panel-content' ),
                    _set_margins = function() {
                          _section_content.css( 'margin-top', '' );
                          _panel_content.css('margin-top', api.section(module.serverParams.dynWidgetSection).fixTopMargin('value')() );
                    };

                  // Fix the top margin after reflow.
                  api.bind( 'pane-contents-reflowed', _.debounce( function() {
                        _set_margins();
                  }, 150 ) );

                  //Close all views on widget panel expansion/clos
                  module.closeAllItems().closeRemoveDialogs();
                  //Close preItem dialog box if exists
                  if ( _.has( module, 'preItemExpanded' ) )
                    module.preItemExpanded.set(false);
            },//widgetPanelReact()


            //cb of api.section(module.serverParams.dynWidgetSection).expanded.callbacks
            widgetSectionReact : function( to, from ) {
                  var module = this,
                      section =  api.section(module.serverParams.dynWidgetSection),
                      container = section.container.closest( '.wp-full-overlay-sidebar-content' ),
                      content = section.container.find( '.accordion-section-content' ),
                      overlay = section.container.closest( '.wp-full-overlay' ),
                      backBtn = section.container.find( '.customize-section-back' ),
                      sectionTitle = section.container.find( '.accordion-section-title' ).first(),
                      headerActionsHeight = $( '#customize-header-actions' ).height(),
                      resizeContentHeight, expand, position, scroll;

                  if ( to ) {
                        overlay.removeClass( 'section-open' );
                        content.css( 'height', 'auto' );
                        //section.container.removeClass( 'open' );
                        sectionTitle.attr( 'tabindex', '0' );
                        content.css( 'margin-top', '' );
                        container.scrollTop( 0 );
                  }

                  module.closeAllItems().closeRemoveDialogs();

                  content.slideToggle();
            }
      });//$.extend()
})( wp.customize , jQuery, _ );


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


//extends api.CZRDynModule
//globals widgetModuleLocalized, themeServerControlParams
var WidgetAreaConstructor = WidgetAreaConstructor || {};
( function ( api, $, _ ) {
      $.extend( WidgetAreaConstructor, {
            /////////////////////////////////////////
            /// OVERRIDEN METHODS
            ////////////////////////////////////////
            //fired in toggleItemExpansion()
            //has to be overridden for the widget zones control because this control is embedded directly in a panel and not in a section
            //therefore the module to animate the scrollTop is not the section container but $('.wp-full-overlay-sidebar-content')
            _adjustScrollExpandedBlock : function( $_block_el, adjust ) {
                  if ( ! $_block_el.length )
                    return;
                  var module = this,
                      _currentScrollTopVal = $('.wp-full-overlay-sidebar-content').scrollTop(),
                      _scrollDownVal,
                      _adjust = adjust || 90;
                  setTimeout( function() {
                        if ( ( $_block_el.offset().top + $_block_el.height() + _adjust ) > $(window.top).height() ) {
                          _scrollDownVal = $_block_el.offset().top + $_block_el.height() + _adjust - $(window.top).height();
                          $('.wp-full-overlay-sidebar-content').animate({
                              scrollTop:  _currentScrollTopVal + _scrollDownVal
                          }, 600);
                        }
                  }, 50);
            },



            //overrides the parent class default model getter
            //=> add a dynamic title
            getDefaultItemModel : function( id ) {
                    var module = this,
                        _current_collection = module.itemCollection(),
                        _default = _.clone( module.defaultItemModel ),
                        _default_contexts = _default.contexts;
                    return $.extend( _default, {
                        title : 'Widget Zone ' +  ( _.size(_current_collection)*1 + 1 )
                        //contexts : module._getMatchingContexts( _default_contexts )
                      });
            },


            _toggleLocationAlertExpansion : function( $view, to ) {
                    var $_alert_el = $view.find('.czr-location-alert');
                    if ( ! $_alert_el.length ) {
                          var _html = [
                            '<span>' + widgetModuleLocalized.i18n.locationWarning + '</span>',
                            api.CZR_Helpers.getDocSearchLink( widgetModuleLocalized.i18n.locationWarning ),
                          ].join('');

                          $_alert_el = $('<div/>', {
                                class:'czr-location-alert',
                                html:_html,
                                style:"display:none"
                          });

                          $('select[data-czrtype="locations"]', $view ).closest('div').after($_alert_el);
                    }
                    $_alert_el.toggle( 'expanded' == to);
            }
      });//$.extend()
})( wp.customize , jQuery, _ );



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
})( wp.customize , jQuery, _ );//extends api.CZRDynModule
//globals widgetModuleLocalized, themeServerControlParams
var WidgetAreaConstructor = WidgetAreaConstructor || {};
( function ( api, $, _ ) {
      //provides a description of each module
      //=> will determine :
      //1) how to initialize the module model. If not crud, then the initial item(s) model shall be provided
      //2) which js template(s) to use : if crud, the module template shall include the add new and pre-item elements.
      //   , if crud, the item shall be removable
      //3) how to render : if multi item, the item content is rendered when user click on edit button.
      //    If not multi item, the single item content is rendered as soon as the item wrapper is rendered.
      //4) some DOM behaviour. For example, a multi item shall be sortable.
      api.czrModuleMap = api.czrModuleMap || {};
      $.extend( api.czrModuleMap, {
            czr_widget_areas_module : {
                  mthds : WidgetAreaConstructor,
                  crud : true,
                  multi_item : false,
                  name : 'Widget Areas',
                  has_mod_opt : false,
                  ready_on_section_expanded : true,
                  //defaultItemModel : {}
            }
      });
})( wp.customize , jQuery, _ );
