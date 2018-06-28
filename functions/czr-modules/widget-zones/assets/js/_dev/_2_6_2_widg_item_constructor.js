//extends api.CZRDynModule
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

})( wp.customize , jQuery, _ );