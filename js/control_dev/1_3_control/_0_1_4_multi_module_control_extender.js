
//extends api.CZRBaseModuleControl
var CZRMultiModuleControlMths = CZRMultiModuleControlMths || {};
$.extend( CZRMultiModuleControlMths, {
  //OVERRIDES BASE MODULE CONTROL
  //default way to get a module constructor
  getModuleConstructor : function( module ) {
          var control = this,
              parentConstructor = {},
              constructor = {};

          if ( ! _.has( module, 'module_type' ) ) {
            throw new Error('CZRModule::getModuleConstructor : no module type found for module ' + module.id );
          }

          //in the case of multi_module control, we need to extend the module constructors
          parentConstructor = control.moduleConstructors[ module.module_type ];
          constructor = parentConstructor.extend( control.getMultiModuleExtender( parentConstructor ) );

          if ( _.isUndefined(constructor) || _.isEmpty(constructor) || ! constructor ) {
              throw new Error('CZRModule::getModuleConstructor : no constructor found for module type : ' + module.module_type +'.' );
          }
          return constructor;
  },


  //adapt modules for them to be used in a multimodule control, synchronized with a sektions control.
  //@todo. => create equivalent extender when they are used in controls.
  getMultiModuleExtender : function( parentConstructor ) {
        var control = this;
        $.extend( control.CZRModuleExtended, {
              initialize: function( id, options ) {
                    var module = this;
                    //run the parent initialize
                    parentConstructor.prototype.initialize.call( module, id, options );

                    //extend the module with new template Selectors
                    $.extend( module, {
                          singleModuleWrapper : 'czr-single-module-wrapper',
                          ruModuleEl : 'czr-ru-module-sektion-content',
                          viewTemplateEl : 'czr-ru-module-item-view',
                          viewContentTemplateEl : 'czr-module-text-view-content',
                    } );


                    //fire ready when the module column is embedded
                    var main_sektion_module_instance = module.control.syncSektionModule.get(),
                        column = main_sektion_module_instance.czr_Column( options.column_id );
                    if ( 'resolved' == column.embedded.state() ) {
                          module.ready();
                    } else {
                          column.embedded.done( function() {
                              module.ready();
                          });
                    }


                    //ADD A MODULE STATE OBSERVER
                    //czr_ModuleState stores the current expansion status of a given module
                    //can take 2 values : expanded, closed
                    module.czr_ModuleState = new api.Value();

                    //SETUP MODULE VIEW WHEN MODULE READY
                    module.isReady.done( function() {
                          module.setupModuleView();
                    });
              }
        });
        return control.CZRModuleExtended;
  },

  //this object holds the various methods allowing a module to be rendered in a multimodule control
  CZRModuleExtended  : {
        renderModuleWrapper : function() {
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
                $( '.czr-module-collection-wrapper' , module._getColumn().container).append( $_module_el );

                //then append the ru module template
                var mod_content_wrapper_tmpl = wp.template( module.ruModuleEl ),
                    $_mod_content_wrapper = $(  mod_content_wrapper_tmpl( tmpl_data ) );

                $( '.czr-mod-content', $_module_el).append( $_mod_content_wrapper );

                return $_module_el;
        },





        setupModuleView : function() {
                var module = this;

                module.view_event_map = [
                        //toggles remove view alert
                        // {
                        //   trigger   : 'click keydown',
                        //   selector  : [ '.' + module.control.css_attr.display_alert_btn, '.' + module.control.css_attr.cancel_alert_btn ].join(','),
                        //   name      : 'toggle_remove_alert',
                        //   actions   : ['toggleRemoveAlertVisibility']
                        // },
                        //removes module and destroys its view
                        {
                          trigger   : 'click keydown',
                          selector  : '.czr-remove-mod',
                          name      : 'remove_module',
                          actions   : ['removeModule']
                        },
                        //edit view
                        {
                          trigger   : 'click keydown',
                          selector  : '.czr-edit-mod',
                          name      : 'edit_module',
                          actions   : ['setModuleViewVisibility']
                        }
                ];

                //set initial state
                module.czr_ModuleState.set('closed');


                module.container = module.renderModuleWrapper();
                if ( _.isUndefined(module.container) || ! module.container.length ) {
                    throw new Error( 'The Module view has not been rendered : ' + module.id );
                } else {
                    //say it
                    module.embedded.resolve();
                }

                //defer actions on module view embedded
                module.embedded.done( function() {
                      //add a listener on view state change
                      module.czr_ModuleState.callbacks.add( function() { return module.setupModuleViewStateListeners.apply(module, arguments ); } );
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
              // if ( is_added_by_user ) {
              //   item.czr_ItemState.set( 'expanded_noscroll' );
              // } else {
              //   module.closeAllViews( item.id );
              //   if ( _.has(module, 'czr_preItem') ) {
              //     module.czr_preItem('view_status').set( 'closed');
              //   }
              //   item.czr_ItemState.set( 'expanded' == item._getViewState() ? 'closed' : 'expanded' );
              // }
        },

        //cb of module.czr_ModuleState.callbacks
        setupModuleViewStateListeners : function( to, from ) {
          console.log('MODULE VIEW STATE HAS CHANGED', to, from );
              // var item = this,
              //     item_model = item.get() || item.initial_item_model,//could not be set yet
              //     module = this.module;

              // console.log('item.contentRendered.state()', item.contentRendered.state());
              // //render and setup view content if needed
              // if ( 'pending' == item.contentRendered.state() ) {
              //     var $item_content = item.renderViewContent( item_model );
              //     if ( ! _.isUndefined($item_content) && false !== $item_content ) {
              //       //say it
              //       item.contentRendered.resolve();
              //     }
              // }

              // //expand
              // module.toggleModuleViewExpansion( to );
        },


        //callback of czr_ItemState() instance on change
        // toggleModuleViewExpansion : function( status, duration ) {
        //         var item = this,
        //             module = this.module;

        //         //slide Toggle and toggle the 'open' class
        //         $( '.' + module.control.css_attr.view_content , item.container ).first().slideToggle( {
        //             duration : duration || 200,
        //             done : function() {
        //               var _is_expanded = 'closed' != status;

        //               item.container.toggleClass('open' , _is_expanded );

        //               //close all alerts
        //               module.closeAllAlerts();

        //               //toggle the icon activate class depending on the status
        //               //switch icon
        //               var $_edit_icon = $(this).siblings().find('.' + module.control.css_attr.edit_view_btn );

        //               $_edit_icon.toggleClass('active' , _is_expanded );
        //               if ( _is_expanded )
        //                 $_edit_icon.removeClass('fa-pencil').addClass('fa-minus-square').attr('title', serverControlParams.translatedStrings.close );
        //               else
        //                 $_edit_icon.removeClass('fa-minus-square').addClass('fa-pencil').attr('title', serverControlParams.translatedStrings.edit );

        //               //scroll to the currently expanded view
        //               if ( 'expanded' == status )
        //                 module._adjustScrollExpandedBlock( item.container );
        //             }//done callback
        //           } );
        // },








        //@param module = obj => the module model
        //Fired on click
        removeModule : function( obj ) {
              this.control.removeModule( obj.module );
        },











        _getColumn : function() {
                var module = this,
                    main_sektion_module_instance = module.control.syncSektionModule.get();

                return main_sektion_module_instance.czr_Column( module.column_id );
        },

        _getSektion : function() {

        }

  }

});//$.extend//CZRBaseControlMths