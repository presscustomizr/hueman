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
            },







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
                                              $('<span/>', {class : "czr-inactive-alert", html : " [ " + serverControlParams.i18n.inactiveWidgetZone + " ]" })
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
            },//listenToSidebarInsights()







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



            //overrides parent
            //called before rendering a view. Fired in module::renderItemWrapper()
            //can be overridden to set a specific view template depending on the model properties
            //@return string
            //@type can be
            //Read Update Delete (rud...)
            //Read Update (ru)
            //...
            //@item_model is an object describing the current item model
            getTemplateEl : function( type, item_model ) {
                    console.log('IN GET TEMPLATE EL ?', type, item_model );
                    var module = this, _el;
                    //force view-content type to ru-item-part if the model is a built-in (primary, secondary, footer-1, ...)
                    //=> user can't delete a built-in model.
                    if ( 'rudItemPart' == type ) {
                        type = ( _.has(item_model, 'is_builtin') && item_model.is_builtin ) ? 'ruItemPart' : type;
                    } else if ( 'itemInputList' == type ) {
                        type = ( _.has(item_model, 'is_builtin') && item_model.is_builtin ) ? 'itemInputListReduced' : type;
                    }

                    switch(type) {
                          case 'rudItemPart' :
                            _el = module.rudItemPart;
                              break;
                          case 'ruItemPart' :
                            _el = module.ruItemPart;
                            break;
                          case 'itemInputList' :
                            _el = module.itemInputList;
                            break;
                          case 'itemInputListReduced' :
                            _el = module.itemInputListReduced;
                            break;
                    }

                    if ( _.isEmpty(_el) ) {
                      throw new Error( 'No valid template has been found in getTemplateEl()' );
                    } else {
                      return _el;
                    }
            },


            _toggleLocationAlertExpansion : function( $view, to ) {
                    var $_alert_el = $view.find('.czr-location-alert');
                    if ( ! $_alert_el.length ) {
                          var _html = [
                            '<span>' + serverControlParams.i18n.locationWarning + '</span>',
                            api.CZR_Helpers.getDocSearchLink( serverControlParams.i18n.locationWarning ),
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