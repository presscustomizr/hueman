var HUMultiInputMethods = HUMultiInputMethods || {};

(function (api, $, _) {

  $.extend( HUMultiInputMethods , {
    initialize: function( id, options ) {
      var control = this;
      api.HUBaseControl.prototype.initialize.call( control, id, options );
      control.model = api(control.id).get();
    },


    ready: function() {
      var control  = this;
      api.bind( 'ready', function() {
        control.renderView();
        control.setupColorPicker();
        //control.setupImageUploader();
      });
    },


    setupColorPicker : function() {
      var control  = this;

      $('.' + control.css_attr.multi_input_wrapper, control.container).find('[data-input-type="color"]').find('input').wpColorPicker( {
        change : function( e, o ) {
          //if the input val is not updated here, it's not detected right away.
          //weird
          //is there a "change complete" kind of event for iris ?
          $(this).val($(this).wpColorPicker('color'));
          $(this).trigger('colorpickerchange');
        }
      });
    },


    setupImageUploader : function() {
      var control  = this;
      console.log('IN SETUP IMAGE', $('.' + control.css_attr.multi_input_wrapper, control.container).find('[data-input-type="upload"]' ) );
      //do we have view template script?
      if ( 0 === $( '#tmpl-customize-control-media-content' ).length )
        return this;

      console.log('wp.template( control.viewContentTemplateEl )', wp.template( '#tmpl-customize-control-media-content' ) );
      var view_template = wp.template( 'customize-control-media-content' );

     //console.log(view_template());
      //do we have an html template and a control container?
      if ( ! view_template  || ! control.container )
        return this;

      //if the view has already been rendered, the view element exists, we simply need to remove its html content and append the new one
      //if not, then we need to render the view element and append the view html content to it
      var $_view_el = $('.' + control.css_attr.multi_input_wrapper, control.container).find('[data-input-type="upload"]' ).find('.czr-input');


      if ( ! $_view_el.length )
        return;
      $_view_el.append( view_template( {}) );
    },

    getDefaultModel : function() {

    },



    //////////////////////////////////////////////////
    /// VIEWS
    //////////////////////////////////////////////////
    renderView : function() {
      //=> an array of objects
      var control = this,
          model = control.model;

      //do we have view template script?
      if ( 0 === $( '#tmpl-' + control.viewContentTemplateEl ).length )
        return this;

      var view_template = wp.template( control.viewContentTemplateEl );

      //do we have an html template and a control container?
      if ( ! view_template  || ! control.container )
        return this;

      //if the view has already been rendered, the view element exists, we simply need to remove its html content and append the new one
      //if not, then we need to render the view element and append the view html content to it
      var $_view_el = $('.' + control.css_attr.multi_input_wrapper, control.container);

      if ( _.isEmpty($_view_el.html() ) ) {
        $_view_el.append( control.getViewContent() );
      } else {
        //var $_view_el = $('li[data-id="' + model.id + '"]');
        //empty the html and append the updated content
        $_view_el.html( control.getViewContent() );
      }
      return this;
    },



    //renders saved models views and attach event handlers
    //the saved model look like :
    //array[ { id : 'sidebar-one', title : 'A Title One' }, {id : 'sidebar-two', title : 'A Title Two' }]
    getViewContent : function() {
      //=> an array of objects
      var control = this,
          model = control.model;

      //do we have view content template script?
      if ( 0 === $( '#tmpl-' + control.viewContentTemplateEl ).length )
        return this;

      var  view_content_template = wp.template( control.viewContentTemplateEl );

      //do we have an html template and a control container?
      if ( ! view_content_template || ! control.container )
        return this;

      //the view content
      return $( view_content_template( model ));

    },



  });//$.extend

})( wp.customize, jQuery, _);