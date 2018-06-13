//extends api.CZRDynModule
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
