//extends api.CZRMultiModelControl

var CZRWidgetAreasMths = CZRWidgetAreasMths || {};

$.extend( CZRWidgetAreasMths, {
  initialize: function( id, options ) {
          //run the parent initialize
          api.CZRDynElement.prototype.initialize.call( this, id, options );

          var control = this;

          //EXTEND THE DEFAULT CONSTRUCTORS FOR INPUT
          control.inputConstructor = api.CZRInput.extend( control.CZRWZonesInputMths || {} );
          //EXTEND THE DEFAULT CONSTRUCTORS FOR MONOMODEL
          control.modelConstructor = api.CZRItem.extend( control.CZRWZonesItem || {} );


          //add a shortcut to the server side json properties
          control.contexts = _.has( options.params , 'sidebar_contexts') ? options.params.sidebar_contexts : {};

          //context match map
          control.context_match_map = {
                  is_404 : '404',
                  is_category : 'archive-category',
                  is_home : 'home',
                  is_page : 'page',
                  is_search : 'search',
                  is_single : 'single'
          };

          //extend the saved model property
          //adds the default widget zones
          control.savedModels = _.union(
                  _.has(control.params, 'default_zones') ? control.params.default_zones : [],
                  control.savedModels
          );

          control.locations = _.has( options.params , 'sidebar_locations') ? options.params.sidebar_locations : {};

          //declares a default model
          control.defaultItemModel = {
                  id : '',
                  title : serverControlParams.translatedStrings.widgetZone,
                  contexts : _.without( _.keys(control.contexts), '_all_' ),//the server list of contexts is an object, we only need the keys, whitout _all_
                  locations : [ serverControlParams.defaultWidgetLocation ],
                  description : ''
          };

          //overrides the default success message
          this.modelAddedMessage = serverControlParams.translatedStrings.widgetZoneAdded;

          //bind actions on widget panel expansion and widget zone section expansion
          this.setExpansionsCallbacks();

          //observe and react to sidebar insights from the preview frame
          this.listenToSidebarInsights();

          //AVAILABLE LOCATIONS FOR THE PRE MODEL
          //1) add an observable value to control.czr_preModel to handle the alert visibility
          control.czr_preModel.create('location_alert_view_state');
          control.czr_preModel('location_alert_view_state').set('closed');
          //2) add state listeners
          control.czr_preModel('location_alert_view_state').callbacks.add( function( to, from ) {
                    var $view = control._getPreModelView();
                    control._toggleLocationAlertExpansion( $view, to );
          });

          //REACT ON ADD / REMOVE ITEMS
          control.bind( 'item_added', function( model ) {
                  console.log('arguments of model added', model, arguments);
                  control.addWidgetSidebar( model );
                  control.czr_preModel('location_alert_view_state').set('closed');
          });


          control.bind( 'item_removed' , function(model) {

          });
  },//initialize






  //@todo : add the control.czr_preModel('view_content').callbacks.add(function( to, from ) {}
  //=> to replace pre_add_view_rendered action
  ready : function() {
          var control = this;
          api.CZRDynElement.prototype.ready.call( control );
          api.bind( 'ready', function() {
                //add state listener on pre model view
                control.czr_preModel('view_status').callbacks.add( function( to, from ) {
                      if ( 'expanded' != to )
                        return;
                      //refresh the location list
                      control.czr_preModelInput('locations')._setupLocationSelect( true );//true for refresh
                      //refresh the location alert message
                      control.czr_preModelInput('locations').mayBeDisplayModelAlert();
                });
          });
  },












  CZRWZonesInputMths : {
          ready : function() {
                  var input = this;

                  input.addActions(
                    'input_event_map',
                    {
                        trigger   : 'locations:changed',
                        actions   : [ 'mayBeDisplayModelAlert' ]
                    },
                    input
                  );

                  api.CZRInput.prototype.ready.call( input);
          },

          //////////////////////////////////////////////////
          ///SETUP SELECTS
          //////////////////////////////////////////////////
          //setup select on view_rendered|view_content_event_map
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
                      input_contexts = input.get(),
                      item = input.item,
                      control     = input.control;

                  //generates the contexts options
                  _.each( control.contexts, function( title, key ) {
                        var _attributes = {
                              value : key,
                              html: title
                            };
                        if ( key == input_contexts || _.contains( input_contexts, key ) )
                          $.extend( _attributes, { selected : "selected" } );

                        $( 'select[data-type="contexts"]', input.container ).append( $('<option>', _attributes) );
                  });
                  //fire select2
                  $( 'select[data-type="contexts"]', input.container ).select2();
          },


          //helper
          //the refresh param is a bool
          _setupLocationSelect : function(refresh ) {
                  var input      = this,
                      input_locations = input.get(),
                      item = input.item,
                      control     = input.control,
                      available_locs = api.sidebar_insights('available_locations').get();

                  //generates the locations options
                  //append them if not set yet
                  if ( ! $( 'select[data-type="locations"]', input.container ).children().length ) {
                    _.map( control.locations, function( title, key ) {
                      var _attributes = {
                            value : key,
                            html: title
                          };

                      if ( key == input_locations || _.contains( input_locations, key ) )
                        $.extend( _attributes, { selected : "selected" } );

                      $( 'select[data-type="locations"]', input.container ).append( $('<option>', _attributes) );
                    });
                  }//if

                  function setAvailability( state ) {
                    if (! state.id) { return state.text; }
                    if (  _.contains(available_locs, state.element.value) ) { return state.text; }
                    var $state = $(
                      '<span class="czr-unavailable-location fa fa-ban" title="' + serverControlParams.translatedStrings.unavailableLocation + '">&nbsp;&nbsp;' + state.text + '</span>'
                    );
                    return $state;
                  }

                  if ( refresh ) {
                    $( 'select[data-type="locations"]', input.container ).select2( 'destroy' );
                  }

                  //fire select2
                  $( 'select[data-type="locations"]', input.container ).select2( {
                    templateResult: setAvailability,
                    templateSelection: setAvailability
                  });
          },


          //fired on view event map : 'locations:changed'
          //@param obj { dom_el: $() , model : {} )
          mayBeDisplayModelAlert : function() {
                  var input      = this,
                      item = input.item,
                      control     = input.control,
                      _selected_locations = $('select[data-type="locations"]', input.container ).val(),
                      available_locs = api.sidebar_insights('available_locations').get(),
                      _unavailable = _.filter( _selected_locations, function( loc ) {
                        return ! _.contains(available_locs, loc);
                      });

                  //check if we are in the pre model case => if so, the id is empty
                  if ( ! _.has( input.get(), 'id' ) || _.isEmpty( input.get().id ) ) {
                    control.czr_preModel('location_alert_view_state').set( ! _.isEmpty( _unavailable ) ? 'expanded' : 'closed' );
                  } else {
                    item.czr_viewLocationAlert( item.model_id ).set( ! _.isEmpty( _unavailable ) ? 'expanded' : 'closed' );
                  }
          }
  },//CZRWZonesInputMths















  CZRWZonesItem : {
          initialize : function( id, options ) {
                  var item = this,
                      control = item.item_control;

                  //Add some observable values for this item
                  item.czr_viewLocationAlert = new api.Values();

                  api.CZRItem.prototype.initialize.call( item, null, options );
          },



          //extend parent setupview
          setupView : function() {
                  var item = this,
                      control = item.item_control;
                  api.CZRItem.prototype.setupView.call(item);

                  /// ALERT FOR NOT AVAILABLE LOCATION
                  item.czr_viewLocationAlert.create( item.model_id );
                  item.czr_viewLocationAlert( item.model_id ).set('closed');

                  //add a state listener on expansion change
                  item.czr_viewLocationAlert( item.model_id ).callbacks.add( function( to, from ) {
                    control._toggleLocationAlertExpansion( item.container , to );
                  });

                  //this is fired just after the setupViewApiListeners
                  //=> add a callback to refresh the availability status of the locations in the select location picker
                  //add a state listener on expansion change
                  item.czr_View.callbacks.add( function( to, from ) {
                        if ( -1 == to.indexOf('expanded') )//can take the expanded_noscroll value !
                          return;
                        //refresh the location list
                        item.czr_Input('locations')._setupLocationSelect( true );//true for refresh
                        //refresh the location alert message
                        item.czr_Input('locations').mayBeDisplayModelAlert();
                  });
          },


          //extend parent listener
          setupItemListeners : function(to, from) {
                  var item = this;
                  api.CZRItem.prototype.setupItemListeners.call(item, to, from);

                  item.writeSubtitleInfos(to);
                  item.updateSectionTitle(to).setModelUpdateTimer();
          },



          //Fired in setupItemListeners. Reacts to model change.
          //Write html informations under the title : location(s) and context(s)
          writeSubtitleInfos : function(model) {
                  var item = this,
                      control = item.item_control,
                      _model = _.clone( model || item.get() ),
                      _locations = [],
                      _contexts = [],
                      _html = '';

                  if ( ! item.container.length )
                    return;

                  //generate the locations and the contexts text from the json data if exists
                  _model.locations =_.isString(_model.locations) ? [_model.locations] : _model.locations;
                  _.each( _model.locations, function( loc ) {
                      if ( _.has( control.locations , loc ) )
                        _locations.push(control.locations[loc]);
                      else
                        _locations.push(loc);
                    }
                  );

                  //build the context list
                  _model.contexts =_.isString(_model.contexts) ? [_model.contexts] : _model.contexts;

                  //all contexts cases ?
                  if ( item._hasModelAllContexts( model ) ) {
                    _contexts.push(control.contexts._all_);
                  } else {
                    _.each( _model.contexts, function( con ) {
                        if ( _.has( control.contexts , con ) )
                          _contexts.push(control.contexts[con]);
                        else
                          _contexts.push(con);
                      }
                    );
                  }

                  //Translated strings
                  var _locationText = serverControlParams.translatedStrings.locations,
                      _contextText = serverControlParams.translatedStrings.contexts,
                      _notsetText = serverControlParams.translatedStrings.notset;

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
                      class : [ 'czr-zone-infos' , control.css_attr.sortable_handle ].join(' '),
                      html : _html
                    });
                    $( '.' + control.css_attr.view_buttons, item.container ).after($_zone_infos);
                  } else {
                    $('.czr-zone-infos', item.container ).html(_html);
                  }
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
                      control = item.item_control;

                  clearTimeout( $.data(this, 'modelUpdateTimer') );
                  $.data(
                    this,
                    'modelUpdateTimer',
                    setTimeout( function() {
                      //refresh preview
                      control.refreshPreview();
                    } , 1000)
                  );//$.data
          },


          //@return bool
          //takes the model unique id
          _hasModelAllContexts : function( model ) {
                  var item = this,
                      control = item.item_control,
                      controlContexts = _.keys(control.contexts);

                  model = model || this.get();

                  if ( ! _.has(model, 'contexts') )
                    return;

                  if ( _.contains( model.contexts, '_all_') )
                    return true;

                  //case when model does not have _all_ but all the others
                  return _.isEmpty( _.difference( _.without(controlContexts, '_all_') , model.contexts ) );
          },

          //@param contexts = array of contexts
          _getMatchingContexts : function( defaults ) {
                  var control = this,
                      _current = api.czr_wp_conditionals.get() || {},
                      _matched = _.filter(control.context_match_map, function( hu, wp ) { return true === _current[wp]; });

                  return _.isEmpty( _matched ) ? defaults : _matched;

          }
  },//CZRWZonesItem














  //called before rendering a view
  //overrides the default method to set a specific default view template if the model is a default setting
  //@return string
  getTemplateEl : function( type, model ) {
          var control = this, _el;
          //force view-content type to view-reduced if the model is a built-in (primary, secondary, footer-1, ...)
          if ( 'view' == type ) {
            type = ( _.has(model, 'is_builtin') && model.is_builtin ) ? 'view-reduced' : type;
          } else if ( 'view-content' == type ) {
            type = ( _.has(model, 'is_builtin') && model.is_builtin ) ? 'view-content-reduced' : type;
          }

          switch(type) {
            case 'view' :
              _el = control.viewTemplateEl;
              break;
            case 'view-content' :
              _el = control.viewContentTemplateEl;
              break;
            case 'view-reduced' :
              _el = 'customize-control-' + control.params.type + '-view-reduced';
              break;
            case 'view-content-reduced' :
              _el = 'customize-control-' + control.params.type + '-view-content-reduced';
              break;

          }
          if ( _.isEmpty(_el) ) {
            throw new Error( 'No valid template has been found in getTemplateEl()' );
          } else {
            return _el;
          }
  },






  _toggleLocationAlertExpansion : function($view, to) {
          var $_alert_el = $view.find('.czr-location-alert');

          if ( ! $_alert_el.length ) {
            var _html = [
              '<span>' + serverControlParams.translatedStrings.locationWarning + '</span>',
              api.CZR_Helpers.getDocSearchLink( serverControlParams.translatedStrings.locationWarning ),
            ].join('');

            $_alert_el = $('<div/>', {
              class:'czr-location-alert',
              html:_html,
              style:"display:none"
            });

            $('select[data-type="locations"]', $view ).closest('div').after($_alert_el);
          }
          $_alert_el.slideToggle( {
            duration : 400
          });
  },









  //DEPRECATED : THE CONTROLS TO SYNCHRONIZE HAVE BEEN REMOVED

  //fired on model_added_by_user and from the timer method
  //1) model_added, before renderView action
  //    when a new model is manually added ( isTrigger is undefined )
  //    => refresh the select options of the other controls using this collection
  //2) model_updated, before updateCollection
  // addControlOptions : function(obj) {
  //   var _controls = _.where( api.settings.controls, {section:"sidebars_select_sec"});
  //   _.map( _controls, function( _control ) {
  //       var $_select = api.control( _control.settings.default ).container.find('select');

  //       //if this option has already been added, simply updates its attributes
  //       if ( 1 === $_select.find('option[value="' + obj.model.id + '"]').length ) {
  //         $_select.find('option[value="' + obj.model.id + '"]').html(obj.model.title);
  //         $_select.selecter("destroy").selecter();
  //       } else {
  //         $_select.append( $('<option>', {value: obj.model.id, html:obj.model.title } ) ).selecter("destroy").selecter();
  //       }
  //   });//map
  // },

  //fired on model_removed
  // removeControlOptions : function(obj) {
  //   var _controls = _.where( api.settings.controls, {section:"sidebars_select_sec"});

  //   _.map( _controls, function( _control ) {
  //       var $_select = api.control( _control.settings.default ).container.find('select');

  //       if ( ! $_select.find('option[value="' + obj.model.id + '"]').length )
  //         return;

  //       $( 'option[value="' + obj.model.id +'"]', $_select).remove();
  //       $_select.selecter("destroy").selecter();
  //   });//map
  // },



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
          var _model        = ! _.isEmpty(model) ? _.clone(model) : sidebar_data;
              _new_sidebar  = _.isEmpty(model) ? sidebar_data : $.extend(
                _.clone( _.findWhere( api.Widgets.data.registeredSidebars, { id: serverControlParams.defaultWidgetSidebar } ) ),
                {
                  name : _model.title,
                  id : _model.id
                }
              );

          //Add it to the backbone collection
          api.Widgets.registeredSidebars.add( _new_sidebar );

          //test if added:
          //api.Widgets.registeredSidebars.get('czr_sidebars_8');


          //ADD the sidebar section
          var _params = $.extend(
                  _.clone( api.section( "sidebar-widgets-" + serverControlParams.defaultWidgetSidebar ).params ),
                  {
                    id : "sidebar-widgets-" + _model.id,
                    instanceNumber: _.max(api.settings.sections, function(sec){ return sec.instanceNumber; }).instanceNumber + 1,
                    sidebarId: _new_sidebar.id,
                    title: _new_sidebar.name,
                    description : 'undefined' != typeof(sidebar_data) ? sidebar_data.description : api.section( "sidebar-widgets-" + serverControlParams.defaultWidgetSidebar ).params.description,
                    //always set the new priority to the maximum + 1 ( serverControlParams.dynWidgetSection is excluded from this calculation because it must always be at the bottom )
                    priority: _.max( _.omit( api.settings.sections, serverControlParams.dynWidgetSection), function(sec){ return sec.instanceNumber; }).priority + 1,
                  }
          );

          api.section.add( _params.id, new api.sectionConstructor[ _params.type ]( _params.id ,{ params : _params } ) );

          //add it to the static collection of settings
          api.settings.sections[ _params.id ] = _params.id;

          //ADD A SETTING
          //Clone the serverControlParams.defaultWidgetSidebar sidebar widget area setting
          var _new_set_id = 'sidebars_widgets['+_model.id+']',
              _new_set    = $.extend(
                _.clone( api.settings.settings['sidebars_widgets[' + serverControlParams.defaultWidgetSidebar + ']'] ),
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
                _.clone( api.settings.controls['sidebars_widgets[' + serverControlParams.defaultWidgetSidebar + ']'] ),
                {
                  settings : { default : _new_set_id }
                }),
              _new_control = {};


          //replace  serverControlParams.defaultWidgetSidebar  by the new sidebar id
          _.map( _cloned_control, function( param, key ) {
                  if ( 'string' == typeof(param) ) {
                    param = param.replace( serverControlParams.defaultWidgetSidebar , _model.id );
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

          //say it
          this.container.trigger('widget_zone_removed', { model : obj.model, section_id : "sidebar-widgets-" + model.id , setting_id : 'sidebars_widgets['+model.id+']' });
  },





  /////////////////////////////////////////
  /// SET EXPANSION CALLBACKS FOR WIDGET PANEL AND WIDGET ZONE CREATION SECTION
  ////////////////////////////////////////
  setExpansionsCallbacks : function() {
          var control = this;
          //records the top margin value of the widgets panel on each expansion
          var fixTopMargin = new api.Values();
          fixTopMargin.create('fixed_for_current_session');
          fixTopMargin.create('value');

          api.section(serverControlParams.dynWidgetSection).fixTopMargin = fixTopMargin;
          api.section(serverControlParams.dynWidgetSection).fixTopMargin('fixed_for_current_session').set(false);

          //will be used for adjustments
          api.panel('widgets').expanded.callbacks.add( function(expanded) {
                  var _top_margin = api.panel('widgets').container.find( '.control-panel-content' ).css('margin-top');
                  api.section(serverControlParams.dynWidgetSection).fixTopMargin('value').set( _top_margin );

                  var _section_content = api.section(serverControlParams.dynWidgetSection).container.find( '.accordion-section-content' ),
                    _panel_content = api.panel('widgets').container.find( '.control-panel-content' ),
                    _set_margins = function() {
                      _section_content.css( 'margin-top', '' );
                      _panel_content.css('margin-top', api.section(serverControlParams.dynWidgetSection).fixTopMargin('value').get() );
                    };

                  // Fix the top margin after reflow.
                  api.bind( 'pane-contents-reflowed', _.debounce( function() {
                          _set_margins();
                  }, 150 ) );

          } );


          //Close all views on widget panl expansion/clos
          api.panel('widgets').expanded.callbacks.add( function(expanded) {
                  control.closeAllViews();
                  control.czr_preModel('view_status').set('closed');
          } );


          //change the expanded behaviour for the widget zone section
          api.section(serverControlParams.dynWidgetSection).expanded.callbacks.add( function(expanded) {
                  var section =  api.section(serverControlParams.dynWidgetSection),
                      container = section.container.closest( '.wp-full-overlay-sidebar-content' ),
                      content = section.container.find( '.accordion-section-content' ),
                      overlay = section.container.closest( '.wp-full-overlay' ),
                      backBtn = section.container.find( '.customize-section-back' ),
                      sectionTitle = section.container.find( '.accordion-section-title' ).first(),
                      headerActionsHeight = $( '#customize-header-actions' ).height(),
                      resizeContentHeight, expand, position, scroll;
                  if ( expanded ) {
                    overlay.removeClass( 'section-open' );
                    content.css( 'height', 'auto' );
                    //section.container.removeClass( 'open' );
                    sectionTitle.attr( 'tabindex', '0' );
                    content.css( 'margin-top', '' );
                    container.scrollTop( 0 );
                  }

                  control.closeAllViews();

                  content.slideToggle();
          });
  },//setExpansionsCallbacks()






  /////////////////////////////////////////
  /// LISTEN TO SIDEBAR INSIGHTS FROM THE PREVIEW FRAME
  /// REACT TO THEM
  ////////////////////////////////////////
  listenToSidebarInsights : function() {
          var control = this;

          //VISIBILITY BASED ON THE SIDEBAR INSIGHTS
          api.sidebar_insights('registered').callbacks.add( function( _registered_zones ) {
                  var _current_collection = _.clone( control.czr_Model.czr_collection.get() );
                  _.map(_current_collection, function( _model ) {
                    if ( ! control.getViewEl(_model.id).length )
                      return;

                    control.getViewEl(_model.id).css('display' , _.contains( _registered_zones, _model.id ) ? 'block' : 'none' );
                  });
          });

          //OPACITY SIDEBAR INSIGHTS BASED
          api.sidebar_insights('inactives').callbacks.add( function( _inactives_zones ) {
                  var _current_collection = _.clone( control.czr_Model.czr_collection.get() );
                  _.map(_current_collection, function( _model ) {
                    if ( ! control.getViewEl(_model.id).length )
                      return;

                    if ( _.contains( _inactives_zones, _model.id ) ) {
                      control.getViewEl( _model.id ).addClass('inactive');
                      if ( ! control.getViewEl( _model.id ).find('.czr-inactive-alert').length )
                        control.getViewEl( _model.id ).find('.czr-view-title').append(
                          $('<span/>', {class : "czr-inactive-alert", html : " [ " + serverControlParams.translatedStrings.inactiveWidgetZone + " ]" })
                        );
                    }
                    else {
                      control.getViewEl( _model.id ).removeClass('inactive');
                      if ( control.getViewEl( _model.id ).find('.czr-inactive-alert').length )
                        control.getViewEl( _model.id ).find('.czr-inactive-alert').remove();
                    }
                  });
          });

          //WIDGET SIDEBAR CREATION BASED ON SIDEBAR INSIGHTS
          //react to a new register candidate(s) on preview refresh
          api.sidebar_insights('candidates').callbacks.add( function(_candidates) {
                  if ( ! _.isArray(_candidates) )
                    return;
                  _.map( _candidates, function( _sidebar ) {
                    if ( ! _.isObject(_sidebar) )
                      return;
                    //add this widget sidebar and the related setting and control.
                    //Only if not added already
                    if ( api.section.has("sidebar-widgets-" +_sidebar.id ) )
                      return;

                    //access the registration method statically
                    api.CZRWidgetAreasControl.prototype.addWidgetSidebar( {}, _sidebar );
                    //activate it if so
                    if ( _.has( api.sidebar_insights('actives').get(), _sidebar.id ) && api.section.has("sidebar-widgets-" +_sidebar.id ) )
                      api.section( "sidebar-widgets-" +_sidebar.id ).activate();
                  });
          });
  },//listenToSidebarInsights()







  /////////////////////////////////////////
  /// OVERRIDEN METHODS
  ////////////////////////////////////////
  //fired in _toggleViewExpansion()
  //has to be overriden for the widget zones control because this control is embedded directly in a panel and not in a section
  //therefore the element to animate the scrollTop is not the section container but $('.wp-full-overlay-sidebar-content')
  _adjustScrollExpandedBlock : function( $_block_el, adjust ) {
          if ( ! $_block_el.length )
            return;
          var control = this,
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
  getDefaultModel : function(id) {
          var control = this,
              _current_collection = control.czr_Model.czr_collection.get(),
              _default = _.clone( control.defaultItemModel ),
              _default_contexts = _default.contexts;
          return $.extend( _default, {
              title : 'Widget Zone ' +  ( _.size(_current_collection)*1 + 1 )
              //contexts : control._getMatchingContexts( _default_contexts )
            });
  }

});//$.extend()