
//extends api.CZRBaseModuleControl
var CZRMultiModuleControlMths = CZRMultiModuleControlMths || {};
$.extend( CZRMultiModuleControlMths, {
  //adapt modules for them to be used in a multimodule control, synchronized with a sektions control.
  //@todo. => create equivalent extender when they are used in controls.
  getMultiModuleExtender : function( parentConstructor ) {
        var control = this;
        $.extend( control.CZRModuleExtended, {
              initialize: function( id, constructorOptions ) {
                    var module = this;
                    //run the parent initialize
                    parentConstructor.prototype.initialize.call( module, id, constructorOptions );

                    console.log('MODULE INSTANTIATED : ', module.id );

                    //extend the module with new template Selectors
                    $.extend( module, {
                          singleModuleWrapper : 'czr-single-module-wrapper',
                          sektionModuleTitle : 'czr-module-sektion-title-part',
                          ruModuleEl : 'czr-ru-module-sektion-content'
                    } );

                    //ADD A MODULE STATE OBSERVER
                    //czr_ModuleState stores the current expansion status of a given module
                    //can take 2 values : expanded, closed
                    module.czr_ModuleState = new api.Value();

                    //SETUP MODULE VIEW WHEN MODULE READY
                    module.isReady.done( function() {
                          module.setupModuleView();
                    });

                    //ADD A MODULE TITLE ELEMENT EMBEDDED STATE
                    module.moduleTitleEmbedded = $.Deferred();

                    //ADD A MODULE COLUMN STATE OBSERVER
                    module.modColumn = new api.Value();
                    module.modColumn.set( constructorOptions.column_id );

                    //React to a module column change. Typically fired when moving a module from one column to another.
                    module.modColumn.bind( function( to, from ) {
                          console.log('MODULE ' + module.id + ' HAS BEEN MOVED TO COLUMN', to, module() );
                          var _current_model = module(),
                              _new_model = $.extend( true, {}, _current_model );

                          _new_model.column_id = to;

                          //When the module value changes, here's what happens :
                          //IN THE MODULE COLLECTION CONTROL / SETTING
                          //1) the module reacts and inform the control.czr_moduleCollection()
                          //2) the control.czr_moduleCollection() reacts and inform the 'module-collection' setting
                          //3) the module-collection setting react and inform the relevant column.columnModuleCollection() instance with the syncColumn() method
                          //
                          //IN THE SEKTIONS CONTROL / SETTING
                          //4) the column.columnModuleCollection() instance reacts and inform the column() instance
                          //5) the column() instance reacts and inform the sektion module.czr_columnCollection() instance
                          //6) the module.czr_columnCollection() instance reacts and inform the relevant sektion() instance
                          //7) the sektion() instance reacts and inform the itemCollection() (=> a sektion() is actually an item )
                          //8) the itemCollection() reacts and inform its module() instance
                          //9) the module() instance reacts and inform the moduleCollection() instance
                          //10) the control.czr_moduleCollection() instance reacts and inform the 'sektions' setting
                          module.set( _new_model, { target_column : to, source_column : from } );
                          //var updatedModuleCollection = $.extend( true, [], module.control.czr_moduleCollection() );
                          //api(module.control.id).set( module.control.filterModuleCollectionBeforeAjax( updatedModuleCollection ) );
                    } );
              },

              //////////////////////////////////
              ///READY
              //////////////////////////////////
              //when a module is embedded in a sektion, we need to render it before ready is done
              //=> this allows us to override the container element declared in the parent initialize
              //when ready done => the module items are embedded (without their content)
              ready : function( is_added_by_user ) {
                      var module = this;
                       console.log('MODULE READY IN EXTENDED MODULE CLASS : ', module.id );
                      $.when( module.renderModuleWrapper( is_added_by_user ) ).done( function( $_module_container ) {
                            if ( _.isUndefined($_module_container) || false === $_module_container.length ) {
                                throw new Error( 'Module container has not been embedded for module :' + module.id );
                            }
                            module.container = $_module_container;
                            module.embedded.resolve();
                      } );
                      //run the parent initialize
                      parentConstructor.prototype.ready.call( module );
                      //module.isReady.resolve();
              }

        });
        return control.CZRModuleExtended;
  },


  //this object holds the various methods allowing a module to be rendered in a multimodule control
  CZRModuleExtended  : {
        //fired in ready.
        //=> before isReady.done().
        renderModuleWrapper : function( is_added_by_user ) {
                //=> an array of objects
                var module = this;

                //has this module view already been rendered?
                if ( 'resolved' == module.embedded.state() )
                  return module.container;

                //do we have view template script?
                if ( 0 === $( '#tmpl-' + module.singleModuleWrapper ).length ) {
                  throw new Error('No template for module ' + module.id + '. The template script id should be : #tmpl-' + module.singleModuleWrapper );
                }

                var module_wrapper_tmpl = wp.template( module.singleModuleWrapper ),
                    tmpl_data = {
                        id : module.id,
                        type : module.module_type
                    },
                    $_module_el = $(  module_wrapper_tmpl( tmpl_data ) );

                //append the module wrapper to the column
                //if added by user, search for the module candidate element, render after and delete the element
                if ( is_added_by_user ) {
                    $.when( $( '.czr-module-collection-wrapper' , module._getColumn().container ).find( '.czr-module-candidate').after( $_module_el ) ).
                      done( function() {
                        $( '.czr-module-collection-wrapper' , module._getColumn().container ).find( '.czr-module-candidate').remove();
                      });
                } else {
                    $( '.czr-module-collection-wrapper' , module._getColumn().container).append( $_module_el );
                }


                // //then append the ru module template
                // var mod_content_wrapper_tmpl = wp.template( module.ruModuleEl ),
                //     $_mod_content_wrapper = $(  mod_content_wrapper_tmpl( tmpl_data ) );

                // $( '.czr-mod-content', $_module_el).append( $_mod_content_wrapper );

                return $_module_el;
        },





        setupModuleView : function() {
                var module = this;

                module.view_event_map = [
                        //toggles remove view alert
                        {
                          trigger   : 'click keydown',
                          selector  : [ '.czr-remove-mod', '.' + module.control.css_attr.cancel_alert_btn ].join(','),
                          name      : 'toggle_remove_alert',
                          actions   : ['toggleModuleRemoveAlert']
                        },
                        //removes module and destroys its view
                        {
                          trigger   : 'click keydown',
                          selector  : '.' + module.control.css_attr.remove_view_btn,
                          name      : 'remove_module',
                          actions   : ['removeModule']
                        },
                        //edit view
                        {
                          trigger   : 'click keydown',
                          selector  : '.czr-edit-mod',
                          name      : 'edit_module',
                          actions   : ['setModuleViewVisibility', 'sendEditModule']
                        },
                        {
                          trigger   : 'click keydown',
                          selector  : '.czr-module-back',
                          name      : 'back_to_column',
                          actions   : ['setModuleViewVisibility']
                        },
                        {
                          trigger   : 'mouseenter',
                          selector  : '.czr-mod-header',
                          name      : 'hovering_module',
                          actions   : function( obj ) {
                              module.control.previewer.send( 'start_hovering_module', {
                                    id : module.id
                              });
                          }
                        },
                        {
                          trigger   : 'mouseleave',
                          selector  : '.czr-mod-header',
                          name      : 'hovering_module',
                          actions   : function( obj ) {
                              module.control.previewer.send( 'stop_hovering_module', {
                                    id : module.id
                              });
                          }
                        }
                ];

                //set initial state
                module.czr_ModuleState.set('closed');

                //defer actions on module view embedded
                module.embedded.done( function() {
                      //add a listener on view state change
                      module.czr_ModuleState.callbacks.add( function() { return module.setupModuleViewStateListeners.apply(module, arguments ); } );

                      //setup DOM listener
                      api.CZR_Helpers.setupDOMListeners(
                            module.view_event_map,//actions to execute
                            { module : { id : module.id } , dom_el:module.container },//model + dom scope
                            module //instance where to look for the cb methods
                      );//listeners for the view wrapper
                });
        },

        //fired on click
        setModuleViewVisibility : function( obj, is_added_by_user ) {
              var module = this,
                  current_state = module.czr_ModuleState.get();

              module.czr_ModuleState.set( 'expanded' == current_state ? 'closed' : 'expanded' );

              //always close the module panel
              api.czrModulePanelState.set(false);

              //close all sektions but the one from which the button has been clicked
              module.control.syncSektionModule().closeAllOtherSektions( $(obj.dom_event.currentTarget, obj.dom_el ) );

              // if ( is_added_by_user ) {
              //   item.czr_ItemState.set( 'expanded_noscroll' );
              // } else {
              //   module.closeAllItems( item.id );
              //   if ( _.has(module, 'czr_preItem') ) {
              //     module.czr_preItem('view_status').set( 'closed');
              //   }
              //   }
              //   item.czr_ItemState.set( 'expanded' == item._getViewState() ? 'closed' : 'expanded' );
              // }
        },

        //fired on click
        sendEditModule : function( obj ) {
              var module = this;
              module.control.previewer.send( 'edit_module', {
                    id : module.id
              });
        },

        //cb of module.czr_ModuleState.callbacks
        //On first module expansion, render the module item(s) content
        setupModuleViewStateListeners : function( to, from ) {
              var module = this;

              //expand / collapse
              $.when( module.toggleModuleViewExpansion( to ) ).done( function() {
                    if ( 'expanded' == to ) {
                          //render the module title
                          module.renderModuleTitle();

                          //populates the saved items collection
                          module.populateSavedItemCollection();

                          //render the item(s)
                          //on first rendering, use the regular method.
                          //for further re-rendering, when the embedded state is resolved()
                          // => 1) re-render each item
                          // => 2) re-instantiate each input
                          // module.czr_Item.each ( function( item ) {
                          //       if ( ! item.module.isMultiItem() )
                          //           item.czr_ItemState.set('expanded');
                          //       if ( 'resolved' == item.embedded.state() ) {
                          //           $.when( item.renderItemWrapper() ).done( function( $_item_container ) {
                          //               item.container = $_item_container;

                          //               $.when( item.renderItemContent() ).done( function() {
                          //                   item.setupInputCollectionFromDOM();
                          //               });

                          //               if ( ! item.module.isMultiItem() )
                          //                   item.czr_ItemState.set('expanded');
                          //           });

                          //       }
                          //       else {
                          //           item.mayBeRenderItemWrapper();
                          //       }
                          // } );
                    }
                    else {
                          module.czr_Item.each ( function( item ) {
                                item.czr_ItemState.set('closed');
                                item._destroyView( 0 );
                                //item.removeInputCollection();
                                module.czr_Item.remove( item.id );
                          } );
                    }
              });
        },


        renderModuleTitle : function() {
              var module = this;
              if( 'resolved' == module.moduleTitleEmbedded.state() )
                return;

              //render the module title
              //do we have view template script?
              if ( 0 === $( '#tmpl-' + module.sektionModuleTitle ).length ) {
                throw new Error('No sektion title Module Part template for module ' + module.id + '. The template script id should be : #tmpl-' + module.sektionModuleTitle );
              }
              //append the title when in a sektion and resolve the embedded state
              $.when( $( module.container ).find('.czr-mod-content').prepend(
                    $( wp.template( module.sektionModuleTitle )( { id : module.id } ) )
              ) ).done( function() {
                    module.moduleTitleEmbedded.resolve();
              });
        },


        //callback of czr_ItemState() instance on change
        toggleModuleViewExpansion : function( status, duration ) {
              var module = this;

              //slide Toggle and toggle the 'open' class
              $( '.czr-mod-content' , module.container ).slideToggle( {
                  duration : duration || 200,
                  done : function() {
                        var _is_expanded = 'closed' != status,
                            $_overlay = module.container.closest( '.wp-full-overlay' ),
                            $_backBtn = module.container.find( '.czr-module-back' ),
                            $_modTitle = module.container.find('.czr-module-title');

                        module.container.toggleClass('open' , _is_expanded );
                        $_overlay.toggleClass('czr-module-open', _is_expanded );
                        $_modTitle.attr( 'tabindex', _is_expanded ? '-1' : '0' );
                        $_backBtn.attr( 'tabindex', _is_expanded ? '0' : '-1' );

                        if( _is_expanded ) {
                            $_backBtn.focus();
                        } else {
                            $_modTitle.focus();
                        }

                        //close all alerts
                        //module.closeAllAlerts();

                        //toggle the icon activate class depending on the status
                        //switch icon
                        //var $_edit_icon = $(this).siblings().find('.' + module.control.css_attr.edit_view_btn );

                        // $_edit_icon.toggleClass('active' , _is_expanded );
                        // if ( _is_expanded )
                        //   $_edit_icon.removeClass('fa-pencil').addClass('fa-minus-square').attr('title', serverControlParams.translatedStrings.close );
                        // else
                        //   $_edit_icon.removeClass('fa-minus-square').addClass('fa-pencil').attr('title', serverControlParams.translatedStrings.edit );

                        //scroll to the currently expanded view
                        if ( 'expanded' == status )
                          module._adjustScrollExpandedBlock( module.container );
                  }//done callback
                } );
        },









        toggleModuleRemoveAlert : function( obj ) {
                var module = this,
                    control = this.control,
                    $_alert_el = $( '.' + module.control.css_attr.remove_alert_wrapper, module.container ).first(),
                    $_clicked = obj.dom_event,
                    $_column_container = control.syncSektionModule().czr_Column( module.column_id ).container;

                //first close all open  views
                //module.closeAllItems();

                //close the main sektion pre_item view
                if ( _.has(module, 'czr_preItem') ) {
                    control.syncSektionModule().czr_preItem('view_status').set( 'closed');
                }

                //then close any other open remove alert in the column containuer
                $('.' + module.control.css_attr.remove_alert_wrapper, $_column_container ).not($_alert_el).each( function() {
                      if ( $(this).hasClass('open') ) {
                            $(this).slideToggle( {
                                  duration : 200,
                                  done : function() {
                                        $(this).toggleClass('open' , false );
                                        //deactivate the icons
                                        $(this).siblings().find('.' + module.control.css_attr.display_alert_btn).toggleClass('active' , false );
                                  }
                            } );
                      }
                });

                //print the html
                //do we have an html template and a control container?
                if ( ! wp.template( module.AlertPart )  || ! module.container ) {
                    throw new Error( 'No removal alert template available for module :' + module.id );
                }

                $_alert_el.html( wp.template( module.AlertPart )( { title : ( module().title || module.id ) } ) );

                //toggle it
                $_alert_el.slideToggle( {
                      duration : 200,
                      done : function() {
                            var _is_open = ! $(this).hasClass('open') && $(this).is(':visible');
                            $(this).toggleClass('open' , _is_open );
                            //set the active class of the clicked icon
                            $( obj.dom_el ).find('.' + module.control.css_attr.display_alert_btn).toggleClass( 'active', _is_open );
                            //adjust scrolling to display the entire dialog block
                            if ( _is_open )
                              module._adjustScrollExpandedBlock( module.container );
                      }
                } );
        },




        //@param module = obj => the module model
        //Fired on click
        removeModule : function( obj ) {
              this.control.removeModule( obj.module );
        },














        _getColumn : function() {
                var module = this;
                return module.control.syncSektionModule().czr_Column( module.modColumn() );
        },

        _getSektion : function() {

        }

  }

});//$.extend//CZRBaseControlMths