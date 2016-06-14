//extends api.CZRBaseControl
var CZRItemMths = CZRItemMths || {};

$.extend( CZRItemMths , {
  //////////////////////////////////////////////////
  /// VIEWS
  //////////////////////////////////////////////////
  //the view wrapper has been rendered by WP
  //the content ( the various inputs ) is rendered by the following methods
  //an event is triggered on the control.container when content is rendered
  renderView : function( item_model ) {
        //=> an array of objects
        var item = this,
            module = item.item_module;
            item_model = item_model || item.get();

        //do we have view template script?
        if ( 0 === $( '#tmpl-' + module.getTemplateEl( 'view', item_model ) ).length ) {
          throw new Error('No template for item ' + item.id + '. The template script id should be : #tmpl-' + module.getTemplateEl( 'view', item_model ) );
        }

        var view_template = wp.template( module.getTemplateEl( 'view', item_model ) );


        //do we have an html template and a module container?
        if ( ! view_template  || ! module.container )
          return;

        console.log('item.embedded.state()', item.embedded.state() );

        //has this item view already been rendered?
        if ( 'resolved' == item.embedded.state() )
          return item.container;

        $_view_el = $('<li>', { class : module.control.css_attr.inner_view, 'data-id' : item_model.id,  id : item_model.id } );

        //append the item view to the first module view wrapper
        //!!note : => there could be additional sub view wrapper inside !!
        $( '.' + module.control.css_attr.views_wrapper , module.container).first().append( $_view_el );

        //then, append the item view skeleton
        $( view_template( item_model ) ).appendTo( $_view_el );

        return $_view_el;
  },


  //renders saved items views and attach event handlers
  //the saved item look like :
  //array[ { id : 'sidebar-one', title : 'A Title One' }, {id : 'sidebar-two', title : 'A Title Two' }]
  renderViewContent : function( item_model ) {
          //=> an array of objects
          var item = this,
              module = this.item_module;

          //do we have view content template script?
          if ( 0 === $( '#tmpl-' + module.getTemplateEl( 'view-content', item_model ) ).length )
            return this;

          var  view_content_template = wp.template( module.getTemplateEl( 'view-content', item_model ) );

          //do we have an html template ?
          if ( ! view_content_template )
            return this;

          //the view content
          $( view_content_template( item_model )).appendTo( $('.' + module.control.css_attr.view_content, item.container ) );

          //say it
          //item.trigger( 'view_content_rendered' , {model : item_model } );

          return this;
  },





  //fired in setupItemListeners
  writeItemViewTitle : function( item_model ) {
        var item = this,
            module = item.item_module,
            _model = item_model || item.get(),
            _title = _.has( _model, 'title')? api.CZR_Helpers.capitalize( _model.title ) : _model.id;

        _title = api.CZR_Helpers.truncate(_title, 20);
        $( '.' + module.control.css_attr.view_title , item.container ).text(_title );
        //add a hook here
        api.CZR_Helpers.doActions('after_writeViewTitle', item.container , _model, item );
  },



  //@param : obj = { event : {}, model : {}, view : ${} }
  //Fired on view_rendered:new when a new model has been added
  //Fired on click on edit_view_btn
  setViewVisibility : function( obj, is_added_by_user ) {
          var item = this,
              module = this.item_module;
          if ( is_added_by_user ) {
            item.czr_View.set( 'expanded_noscroll' );
          } else {
            module.closeAllViews( item.id );
            if ( _.has(module, 'czr_preItem') ) {
              module.czr_preItem('view_status').set( 'closed');
            }
            item.czr_View.set( 'expanded' == item._getViewState() ? 'closed' : 'expanded' );
          }
  },


  _getViewState : function() {
          return -1 == this.czr_View.get().indexOf('expanded') ? 'closed' : 'expanded';
  },


  //callback of czr_View() instance on change
  _toggleViewExpansion : function( status, duration ) {
          var item = this,
              module = this.item_module;

          //slide Toggle and toggle the 'open' class
          $( '.' + module.control.css_attr.view_content , item.container ).first().slideToggle( {
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
              module = this.item_module,
              $_alert_el = $( '.' + module.control.css_attr.remove_alert_wrapper, item.container ),
              $_clicked = obj.dom_event;

          //first close all open views
          module.closeAllViews();
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
          var alert_template = wp.template( module.viewAlertEl );
          //do we have an html template and a control container?
          if ( ! alert_template  || ! item.container )
            return this;

          $_alert_el.html( alert_template( item.get() ) );

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
  _destroyView : function () {
          this.container.fadeOut( {
            duration : 400,
            done : function() {
              $(this).remove();
            }
          });
  },
});//$.extend
