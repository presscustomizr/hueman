//MULTI CONTROL CLASS
//extends api.CZRBaseControl
//
//Setup the collection of items
//renders the element view
//Listen to items collection changes and update the element setting

var CZRDynElementMths = CZRDynElementMths || {};

$.extend( CZRDynElementMths, {
    //////////////////////////////////////////////////
  /// PRE ADD MODEL DIALOG AND VIEW
  //////////////////////////////////////////////////
  renderPreItemView : function( obj ) {
          //=> an array of objects
          var element = this;

          //is this view already rendered ?
          if ( ! _.isEmpty( element.czr_preItem('view_content').get() ) )
            return;

          //do we have view template script?
          if ( ! _.has(element, 'viewPreAddEl') ||  0 === $( '#tmpl-' + element.viewPreAddEl ).length )
            return this;

          //print the html
          var pre_add_template = wp.template( element.viewPreAddEl );

          //do we have an html template and a element container?
          if ( ! pre_add_template  || ! element.container )
            return this;

          var $_pre_add_el = $('.' + element.control.css_attr.pre_add_view_content, element.container );

          $_pre_add_el.prepend( pre_add_template() );

          //store it
          element.czr_preItem('view_content').set( pre_add_template() );

          //say it to the element
          element.trigger( 'pre_add_view_rendered' , {item : {}, dom_el : $_pre_add_el});
  },

  //@return $ el of the pre Item view
  _getPreItemView : function() {
          var element = this;
          return $('.' +  element.control.css_attr.pre_add_view_content, element.container );
  },

  destroyPreItemView : function() {
          var element = this;
          $('.' +  element.control.css_attr.pre_add_view_content, element.container ).find('.czr-sub-set').remove();
          element.czr_preItem('view_content').set('');
  },

   //toggles the visibility of the Remove View Block
  //@param : obj = { event : {}, item : {}, view : ${} }
  setPreItemViewVisibility : function(obj) {
          var element = this;

          element.closeAllViews();
          element.czr_preItem('view_status').set( 'expanded' == element.czr_preItem('view_status').get() ? 'closed' : 'expanded' );
  },


  //callback of czr_preItem('view') instance on change
  _togglePreItemViewExpansion : function( status) {
          var element = this,
            $_pre_add_el = $( '.' +  element.control.css_attr.pre_add_view_content, element.container );

          //toggle it
          $_pre_add_el.slideToggle( {
            duration : 200,
            done : function() {
                  var _is_expanded = 'closed' != status,
                      $_btn = $( '.' +  element.control.css_attr.open_pre_add_btn, element.container );

                  $(this).toggleClass('open' , _is_expanded );
                  //switch icons
                  if ( _is_expanded )
                    $_btn.find('.fa').removeClass('fa-plus-square').addClass('fa-minus-square');
                  else
                    $_btn.find('.fa').removeClass('fa-minus-square').addClass('fa-plus-square');

                  //set the active class to the btn
                  $_btn.toggleClass( 'active', _is_expanded );

                  //set the adding_new class to the element container wrapper
                  $( element.container ).toggleClass(  element.control.css_attr.adding_new, _is_expanded );
                  //make sure it's fully visible
                  element._adjustScrollExpandedBlock( $(this), 120 );
            }//done
          } );
  },

  //Fired in addItem()
  closeResetPreItem : function() {
          var element = this;
          element.toggleSuccessMessage('on');
          setTimeout( function() {
                element.czr_preItem('view_status').set( 'closed');
                element.czr_preItem('item').set(element.getDefaultModel());
                element.toggleSuccessMessage('off').destroyPreItemView();
          } , 3000);
  },

  toggleSuccessMessage : function(status) {
          var element = this,
              _message = element.itemAddedMessage,
              $_pre_add_wrapper = $('.' + element.control.css_attr.pre_add_wrapper, element.container );
              $_success_wrapper = $('.' + element.control.css_attr.pre_add_success, element.container );

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
          element.container.toggleClass('czr-model-added', 'on' == status );
          return this;
  }

});//$.extend//CZRBaseControlMths