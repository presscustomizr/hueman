var CZRDynamicMethods = CZRDynamicMethods || {};

$.extend( CZRDynamicMethods, {
  //////////////////////////////////////////////////
  /// VIEWS
  //////////////////////////////////////////////////
  //renders the view html of a given model
  //returns the $ view object
  renderView : function( obj ) {
    //=> an array of objects
    var control = this,
        model = _.clone(obj.model);

    //do we have view template script?
    if ( 0 === $( '#tmpl-' + control.getTemplateEl( 'view', model ) ).length )
      return false;//break the action chain

    var view_template = wp.template( control.getTemplateEl( 'view', model ) );

    //do we have an html template and a control container?
    if ( ! view_template  || ! control.container )
      return false;//break the action chain

    //if the view has already been rendered, the view element exists, we simply need to remove its html content and append the new one
    //if not, then we need to render the view element and append the view html content to it
    var $_view_el = $('li[data-id="' + model.id + '"]').length ? $('li[data-id="' + model.id + '"]') : $('<li>', { class : control.css_attr.inner_view, 'data-id' : model.id,  id : model.id } ),
        _refreshed = $('li[data-id="' + model.id + '"]').length ? true : false;
        //_view_content_open = false;

    if ( ! $('li[data-id="' + model.id + '"]').length ) {
      $( '.' + control.css_attr.views_wrapper , control.container).append( $_view_el );
      //the view skeleton
      $( view_template( model ) ).appendTo( $_view_el );
    } else {
      //var $_view_el = $('li[data-id="' + model.id + '"]');
      //empty the html and append the updated content
      $_view_el.html( view_template( model ) );
    }
    return $_view_el;
  },



  //renders saved models views and attach event handlers
  //the saved model look like :
  //array[ { id : 'sidebar-one', title : 'A Title One' }, {id : 'sidebar-two', title : 'A Title Two' }]
  renderViewContent : function( obj ) {
    //=> an array of objects
    var control = this,
        model = _.clone(obj.model);

    //do we have view content template script?
    if ( 0 === $( '#tmpl-' + control.getTemplateEl( 'view-content', model ) ).length )
      return this;

    var  view_content_template = wp.template( control.getTemplateEl( 'view-content', model ) );

    //do we have an html template and a control container?
    if ( ! view_content_template || ! control.container )
      return this;

    //the view content
    $( view_content_template( model )).appendTo( $('.' + control.css_attr.view_content, obj.dom_el ) );

    control.doActions( 'viewContentRendered' , obj.dom_el, obj );

    return this;
  },



  //removes the view dom element
  _destroyView : function (model_id) {
    var $view = this.getViewEl(model_id);
    $view.fadeOut( {
      duration : 400,
      done : function() {
        $(this).remove();
      }
    });
  },


  //replace the default view title by a custom one
  //at this stage, the model passed in the obj is up to date
  writeViewTitle : function( obj ) {
    var control = this;
        _model = _.clone(obj.model);
        _title = this._capitalize( _model.title );
    _title = this._truncate(_title, 20);
    $( '.' + this.css_attr.view_title , '#' + obj.model.id ).text(_title );

    //add a hook here
    this.doActions('after_writeViewTitle', control.getViewEl(obj.model.id) , obj );
  },

  //helper
  //get the $ view DOM el from the model id
  getViewEl : function( model_id ) {
    var control = this;
    return $( '[data-id = "' + model_id + '"]', control.container );
  },




  //////////////////////////////////////////////////
  /// CALLBACKS
  //////////////////////////////////////////////////
  //creates the view value and update its expanded status
  setupViewApiListeners : function(obj) {
    var control = this,
        $viewContent = $( '.' + control.css_attr.view_content, control.getViewEl(obj.model.id) ),
        $view = control.getViewEl(obj.model.id);

    control.czr_View.create(obj.model.id);
    control.czr_View(obj.model.id).set('closed');

    //add a state listener on state change
    control.czr_View(obj.model.id).callbacks.add( function( to, from ) {
      //render and setup view content if needed
      if ( ! $.trim( $viewContent.html() ) ) {
        control.renderViewContent( obj ).setupDOMListeners(
          control.view_content_event_map,
          { model : obj.model, dom_el : $view }
        );
      }
      //expand
      control._toggleViewExpansion( obj.model.id, to );
    });
  },





















  //@param : obj = { event : {}, model : {}, view : ${} }
  //Fired on view_rendered:new when a new model has been added
  //Fired on click on edit_view_btn
  setViewVisibility : function(obj, is_added_by_user ) {
    var control = this;
    if ( is_added_by_user ) {
      control.czr_View(obj.model.id).set( 'expanded_noscroll' );
    } else {
      control.closeAllViews(obj.model.id);
      control.czr_preModel('view_status').set( 'closed');
      control.czr_View(obj.model.id).set( 'expanded' == control._getViewState(obj.model.id) ? 'closed' : 'expanded' );
    }
  },


  //fired on add_model
  //fired on views_sorted
  closeAllViews : function(model_id) {
    var control = this,
        _current_collection = _.clone( control.czr_Collection('models').get() ),
        _filtered_collection = _.filter( _current_collection , function( mod) { return mod.id != model_id; } );

    _.map( _filtered_collection, function(_model) {
      if ( control.czr_View.has(_model.id) && 'expanded' == control._getViewState(_model.id) )
        control.czr_View( _model.id).set( 'closed' ); // => will fire the cb _toggleViewExpansion
     } );
  },


  _getViewState : function(model_id) {
    return -1 == this.czr_View(model_id).get().indexOf('expanded') ? 'closed' : 'expanded';
  },

  //callback of czr_View() instance on change
  _toggleViewExpansion : function( model_id, status, duration ) {
    var control = this;
    //slide Toggle and toggle the 'open' class
    $( '.' + control.css_attr.view_content , control.getViewEl(model_id) ).slideToggle( {
        duration : duration || 200,
        done : function() {
          var _is_expanded = 'closed' != status;

          control.getViewEl(model_id).toggleClass('open' , _is_expanded );

          //close all alerts
          control.closeAllAlerts();

          //toggle the icon activate class depending on the status
          //switch icon
          var $_edit_icon = $(this).siblings().find('.' + control.css_attr.edit_view_btn);

          $_edit_icon.toggleClass('active' , _is_expanded );
          if ( _is_expanded )
            $_edit_icon.removeClass('fa-pencil').addClass('fa-minus-square').attr('title', serverControlParams.translatedStrings.close );
          else
            $_edit_icon.removeClass('fa-minus-square').addClass('fa-pencil').attr('title', serverControlParams.translatedStrings.edit );

          //scroll to the currently expanded view
          if ( 'expanded' == status )
            control._adjustScrollExpandedBlock( control.getViewEl(model_id) );
        }//done callback
      } );
  },

  //make sure a given jQuery block is fully visible
  //@param $(el)
  _adjustScrollExpandedBlock : function( $_block_el, adjust ) {
    if ( ! $_block_el.length )
      return;
    var control = this,
         $_controlSection = $( '.accordion-section-content', api.section( control.section() ).container ),
        _currentScrollTopVal = $_controlSection.scrollTop(),
        _scrollDownVal,
        _adjust = adjust || 90;

    setTimeout( function() {
        if ( ( $_block_el.offset().top + $_block_el.height() + _adjust ) > $(window.top).height() ) {
          _scrollDownVal = $_block_el.offset().top + $_block_el.height() + _adjust - $(window.top).height();
          if ( _scrollDownVal > 0 ) {
            $_controlSection.animate({
                scrollTop:  _currentScrollTopVal + _scrollDownVal
            }, 500);
          }
        }
    }, 50);
  },





  //fired
  _makeSortable : function(obj) {
    if ( wp.media.isTouchDevice || ! $.fn.sortable )
      return;
    var control = this;
    $( '.' + control.css_attr.views_wrapper, control.container ).sortable( {
        handle: '.' + control.css_attr.sortable_handle,
        update: function( event, ui ) {
          control.czr_Collection('models').set( control._getSortedDOMCollection() );
        }
      }
    );
  },





  //close alert wrapper
  //+ deactivate the icon
  closeAllAlerts : function() {
    var control = this;
    $('.' + control.css_attr.remove_alert_wrapper, control.container ).each( function() {
      if ( $(this).hasClass('open') ) {
        $(this).slideToggle( {
          duration : 100,
          done : function() {
            $(this).toggleClass('open' , false );
            //deactivate the icons
            $(this).siblings().find('.' + control.css_attr.display_alert_btn).toggleClass('active' , false );
          }
        } );
      }
    });
  },


  //toggles the visibility of the Remove View Block
  //@param : obj = { event : {}, model : {}, view : ${} }
  toggleRemoveAlertVisibility : function(obj) {
    var control = this,
        $_alert_el = $( '.' + control.css_attr.remove_alert_wrapper, obj.dom_el ),
        $_clicked = obj.dom_event;

    //first close all open views
    this.closeAllViews();
    control.czr_preModel('view_status').set( 'closed');

    //then close any other open remove alert in the control containuer
    $('.' + control.css_attr.remove_alert_wrapper, control.container ).not($_alert_el).each( function() {
      if ( $(this).hasClass('open') ) {
        $(this).slideToggle( {
          duration : 200,
          done : function() {
            $(this).toggleClass('open' , false );
            //deactivate the icons
            $(this).siblings().find('.' + control.css_attr.display_alert_btn).toggleClass('active' , false );
          }
        } );
      }
    });

    //print the html
    var alert_template = wp.template( control.viewAlertEl );
    //do we have an html template and a control container?
    if ( ! alert_template  || ! control.container )
      return this;

    $_alert_el.html( alert_template( obj.model ) );

    //toggle it
    $_alert_el.slideToggle( {
      duration : 200,
      done : function() {
        var _is_open = ! $(this).hasClass('open') && $(this).is(':visible');
        $(this).toggleClass('open' , _is_open );
        //set the active class of the clicked icon
        $( obj.dom_el ).find('.' + control.css_attr.display_alert_btn).toggleClass( 'active', _is_open );
        //adjust scrolling to display the entire dialog block
        if ( _is_open )
          control._adjustScrollExpandedBlock( control.getViewEl( obj.model.id ) );
      }
    } );
  },















  //////////////////////////////////////////////////
  /// PRE ADD MODEL DIALOG AND VIEW
  //////////////////////////////////////////////////
  renderPreModelView : function( obj ) {
    //=> an array of objects
    var control = this;

    //is this view already rendered ?
    if ( ! _.isEmpty( control.czr_preModel('view_content').get() ) )
      return;

    //do we have view template script?
    if ( ! _.has(control, 'viewPreAddEl') ||  0 === $( '#tmpl-' + control.viewPreAddEl ).length )
      return this;

    //print the html
    var pre_add_template = wp.template( control.viewPreAddEl );

    //do we have an html template and a control container?
    if ( ! pre_add_template  || ! control.container )
      return this;

    var $_pre_add_el = $('.' + control.css_attr.pre_add_view_content, control.container );

    $_pre_add_el.prepend( pre_add_template() );

    //store it
    control.czr_preModel('view_content').set( pre_add_template() );

    //say it to the control
    control.doActions( 'pre_add_view_rendered' , control.container, {model : {}, dom_el : $_pre_add_el});
  },

  //@return $ el of the premodel view
  _getPreModelView : function() {
    var control = this;
    return $('.' + control.css_attr.pre_add_view_content, control.container );
  },

  destroyPreModelView : function() {
    var control = this;
    $('.' + control.css_attr.pre_add_view_content, control.container ).find('.czr-sub-set').remove();
    control.czr_preModel('view_content').set('');
  },

   //toggles the visibility of the Remove View Block
  //@param : obj = { event : {}, model : {}, view : ${} }
  setPreModelViewVisibility : function(obj) {
    var control = this;

    control.closeAllViews();
    control.czr_preModel('view_status').set( 'expanded' == control.czr_preModel('view_status').get() ? 'closed' : 'expanded' );
  },


  //callback of czr_preModel('view') instance on change
  _togglePreModelViewExpansion : function( status) {
    var control = this,
      $_pre_add_el = $( '.' + control.css_attr.pre_add_view_content, control.container );

    //toggle it
    $_pre_add_el.slideToggle( {
      duration : 200,
      done : function() {
        var _is_expanded = 'closed' != status,
            $_btn = $( '.' + control.css_attr.open_pre_add_btn, control.container );

        $(this).toggleClass('open' , _is_expanded );
        //switch icons
        if ( _is_expanded )
          $_btn.find('.fa').removeClass('fa-plus-square').addClass('fa-minus-square');
        else
          $_btn.find('.fa').removeClass('fa-minus-square').addClass('fa-plus-square');

        //set the active class to the btn
        $_btn.toggleClass( 'active', _is_expanded );

        //set the adding_new class to the control container wrapper
        $( control.container ).toggleClass( control.css_attr.adding_new, _is_expanded );
        //make sure it's fully visible
        control._adjustScrollExpandedBlock( $(this), 120 );
      }
    } );
  },

  //Fired on "model_added_by_user"
  closeResetPreModel : function() {
    var control = this;
    control.toggleSuccessMessage('on');
    setTimeout( function() {
        control.czr_preModel('view_status').set( 'closed');
        control.czr_preModel('model').set(control.getDefaultModel());
        control.toggleSuccessMessage('off').destroyPreModelView();
      } , 3000);
  },

  toggleSuccessMessage : function(status) {
    var control = this,
        _message = control.modelAddedMessage,
        $_pre_add_wrapper = $('.' + control.css_attr.pre_add_wrapper, control.container );
        $_success_wrapper = $('.' + control.css_attr.pre_add_success, control.container );

    if ( 'on' == status ) {
      //write message
      $_success_wrapper.find('p').text(_message);

      //set various properties
      $_success_wrapper.css('z-index', 1000001 )
        .css('height', $_pre_add_wrapper.height() + 'px' )
        .css('line-height', $_pre_add_wrapper.height() + 'px');
    } else {
       $_success_wrapper.attr('style','');
    }
    control.container.toggleClass('czr-model-added', 'on' == status );
    return this;
  }
});//$.extend()