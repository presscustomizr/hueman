//extends api.CZRBaseControl
var CZRItemMths = CZRItemMths || {};

$.extend( CZRItemMths , {
  //fired on initialize for items in module embedded in a regular control
  //fired when user edit module for items in modules embedded in a sektion
  mayBeRenderItemWrapper : function() {
        var item = this;

        if ( 'pending' == item.embedded.state() )
            item.container = item.renderItemWrapper();
        if ( _.isUndefined(item.container) || ! item.container.length ) {
            throw new Error( 'In itemWrapperViewSetup the Item view has not been rendered : ' + item.id );
        } else {
            //say it
            item.embedded.resolve();
        }
  },


  //define the item view DOM event map
  //bind actions when the item is embedded
  itemWrapperViewSetup : function( item_model ) {
          var item = this,
              module = this.module;

          item_model = item.get() || item.initial_item_model;//could not be set yet

          //czr_ItemState stores the current expansion status of a given view => one value by created by item.id
          //czr_ItemState can take 3 values : expanded, expanded_noscroll (=> used on view creation), closed
          item.czr_ItemState = new api.Value();
          //set initial state
          item.czr_ItemState.set('closed');

          //always write the title
          item.writeItemViewTitle();

          //react to the item state changes
          item.czr_ItemState.callbacks.add( function( to, from ) {
              //toggle on view state change
              item.toggleItemExpansion.apply(item, arguments );
          });


          //When do we render the item content ?
          //If this is a multi-item module, let's render each item content when they are expanded.
          //In the case of a single item module, we can render the item content now.
          var _updateItemContentDeferred = function( $_content) {
                //update the $.Deferred state
                if ( ! _.isUndefined( $_content ) && false !== $_content.length )
                    item.contentRendered.resolve();
                else {
                    throw new Error( 'Module : ' + item.module.id + ', the item content has not been rendered for ' + item.id );
                }
          };

          if ( item.module.isMultiItem() ) {
                item.czr_ItemState.callbacks.add( function( to, from ) {
                      //renderview content if needed on first expansion
                      if ( 'resolved' == item.contentRendered.state() )
                        return;

                      $.when( item.renderItemContent( item_model ) ).done( function( $_item_content ) {
                            _updateItemContentDeferred( $_item_content );
                      });
                });
          } else {
                //renderview content now for a single item module
                $.when( item.renderItemContent( item_model ) ).done( function( $_item_content ) {
                      _updateItemContentDeferred( $_item_content );
                      item.czr_ItemState.set('expanded');
                });
          }

          //DOM listeners for the user action in item view wrapper
          api.CZR_Helpers.setupDOMListeners(
                item.userEventMap(),//actions to execute
                { model:item_model, dom_el:item.container },//model + dom scope
                item //instance where to look for the cb methods
          );
  },


  //the view wrapper has been rendered by WP
  //the content ( the various inputs ) is rendered by the following methods
  //an event is triggered on the control.container when content is rendered
  renderItemWrapper : function( item_model ) {
        //=> an array of objects
        var item = this,
            module = item.module;

        item_model = item_model || item.get();

        //render the item wrapper
        $_view_el = $('<li>', { class : module.control.css_attr.single_item, 'data-id' : item_model.id,  id : item_model.id } );

        //append the item view to the first module view wrapper
        //!!note : => there could be additional sub view wrapper inside !!
        //$( '.' + module.control.css_attr.items_wrapper , module.container).first().append( $_view_el );
        module.itemsWrapper.append( $_view_el );

        //if module is multi item, then render the item crud header part
        if ( module.isMultiItem() ) {
              //do we have view template script?
              if ( 0 === $( '#tmpl-' + module.getTemplateEl( 'rudItemPart', item_model ) ).length ) {
                  throw new Error('Missing template for item ' + item.id + '. The provided template script has no been found : #tmpl-' + module.getTemplateEl( 'rudItemPart', item_model ) );
              }
              $_view_el.append( $( wp.template( module.rudItemPart )( item_model ) ) );
        }


        //then, append the item content wrapper
        $_view_el.append( $( '<div/>', { class: module.control.css_attr.item_content } ) );

        return $_view_el;
  },


  //renders saved items views and attach event handlers
  //the saved item look like :
  //array[ { id : 'sidebar-one', title : 'A Title One' }, {id : 'sidebar-two', title : 'A Title Two' }]
  renderItemContent : function( item_model ) {
          //=> an array of objects
          var item = this,
              module = this.module;

          item_model = item_model || item.get();

          //do we have view content template script?
          if ( 0 === $( '#tmpl-' + module.getTemplateEl( 'itemInputList', item_model ) ).length ) {
              throw new Error('No item content template defined for module ' + module.id + '. The template script id should be : #tmpl-' + module.getTemplateEl( 'itemInputList', item_model ) );
          }

          var  item_content_template = wp.template( module.getTemplateEl( 'itemInputList', item_model ) );

          //do we have an html template ?
          if ( ! item_content_template )
            return this;

          //the view content
          $( item_content_template( item_model )).appendTo( $('.' + module.control.css_attr.item_content, item.container ) );

          return $( $( item_content_template( item_model )), item.container );
  },





  //fired in setupItemListeners
  writeItemViewTitle : function( item_model ) {
        var item = this,
            module = item.module,
            _model = item_model || item.get(),
            _title = _.has( _model, 'title')? api.CZR_Helpers.capitalize( _model.title ) : _model.id;

        _title = api.CZR_Helpers.truncate(_title, 20);
        $( '.' + module.control.css_attr.item_title , item.container ).text(_title );
        //add a hook here
        api.CZR_Helpers.doActions('after_writeViewTitle', item.container , _model, item );
  },



  //@param : obj = { event : {}, model : {}, view : ${} }
  //Fired on view_rendered:new when a new model has been added
  //Fired on click on edit_view_btn
  setViewVisibility : function( obj, is_added_by_user ) {
          var item = this,
              module = this.module;
          if ( is_added_by_user ) {
                item.czr_ItemState.set( 'expanded_noscroll' );
          } else {
                module.closeAllItems( item.id );
                if ( _.has(module, 'czr_preItem') ) {
                  module.czr_preItem('view_status').set( 'closed');
                }
                item.czr_ItemState.set( 'expanded' == item._getViewState() ? 'closed' : 'expanded' );
          }
  },


  _getViewState : function() {
          return -1 == this.czr_ItemState().indexOf('expanded') ? 'closed' : 'expanded';
  },


  //callback of item.czr_ItemState.callbacks
  toggleItemExpansion : function( status, from, duration ) {
          var item = this,
              module = this.module;

          //slide Toggle and toggle the 'open' class
          $( '.' + module.control.css_attr.item_content , item.container ).first().slideToggle( {
                duration : duration || 200,
                done : function() {
                      var _is_expanded = 'closed' != status;
                      item.container.toggleClass('open' , _is_expanded );

                      //close all alerts
                      module.closeAllAlerts();

                      //toggle the icon activate class depending on the status
                      //switch icon
                      var $_edit_icon = $(this).siblings().find('.' + module.control.css_attr.edit_view_btn );

                      $_edit_icon.toggleClass('active' , _is_expanded );
                      if ( _is_expanded )
                        $_edit_icon.removeClass('fa-pencil').addClass('fa-minus-square').attr('title', serverControlParams.translatedStrings.close );
                      else
                        $_edit_icon.removeClass('fa-minus-square').addClass('fa-pencil').attr('title', serverControlParams.translatedStrings.edit );

                      //scroll to the currently expanded view
                      if ( 'expanded' == status )
                        module._adjustScrollExpandedBlock( item.container );
                }//done callback
          } );
  },


  //toggles the visibility of the Remove View Block
  //@param : obj = { event : {}, model : {}, view : ${} }
  toggleRemoveAlertVisibility : function(obj) {
          var item = this,
              module = this.module,
              $_alert_el = $( '.' + module.control.css_attr.remove_alert_wrapper, item.container ).first(),
              $_clicked = obj.dom_event;

          //first close all open items views
          module.closeAllItems();

          if ( _.has(module, 'czr_preItem') ) {
              module.czr_preItem('view_status').set( 'closed');
          }

          //then close any other open remove alert in the module containuer
          $('.' + module.control.css_attr.remove_alert_wrapper, item.container ).not($_alert_el).each( function() {
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
          if ( ! wp.template( module.AlertPart )  || ! item.container ) {
              throw new Error( 'No removal alert template available for items in module :' + module.id );
          }

          $_alert_el.html( wp.template( module.AlertPart )( { title : ( item().title || item.id ) } ) );

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
                        module._adjustScrollExpandedBlock( item.container );
                }
          } );
  },


  //removes the view dom module
  _destroyView : function ( duration ) {
          this.container.fadeOut( {
              duration : duration ||400,
              done : function() {
                $(this).remove();
              }
          });
  },
});//$.extend
