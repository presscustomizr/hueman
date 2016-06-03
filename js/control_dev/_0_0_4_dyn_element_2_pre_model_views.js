//MULTI CONTROL CLASS
//extends api.CZRBaseControl
//
//Setup the collection of items
//renders the control view
//Listen to items collection changes and update the control setting

var CZRDynElementMths = CZRDynElementMths || {};

$.extend( CZRDynElementMths, {
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
            }//done
          } );
  },

  //Fired in addModel()
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

});//$.extend//CZRBaseControlMths