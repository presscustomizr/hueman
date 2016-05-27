//extends api.CZRBaseControl
var CZRStaticMethods = CZRStaticMethods || {};

$.extend( CZRStaticMethods , {
  //////////////////////////////////////////////////
  /// VIEWS
  //////////////////////////////////////////////////
  //the view wrapper has been rendered by WP
  //the content ( the various inputs ) is rendered by the following methods
  //an event is triggered on the control.container when content is rendered
  renderView : function() {
        //=> an array of objects
        var control = this;

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
          $_view_el.append( control._getViewContent() );
        } else {
          //var $_view_el = $('li[data-id="' + model.id + '"]');
          //empty the html and append the updated content
          $_view_el.html( control._getViewContent() );
        }

        control.doActions( 'viewContentRendered' , control.container, {} );

        return this;
  },

  //renders saved model view
  //the saved model is an object (the db option is an array of "sub_settings" )
  _getViewContent : function() {
        //=> an array of objects
        var control = this;

        //do we have view content template script?
        if ( 0 === $( '#tmpl-' + control.viewContentTemplateEl ).length )
          return this;

        var  view_content_template = wp.template( control.viewContentTemplateEl );

        //do we have an html template and a control container?
        if ( ! view_content_template || ! control.container )
          return this;

        //the view content
        //we inject the model + additional params like default color in the template
        return $( view_content_template(
            _.extend(
              control.czr_Model.val.get(),
              { defaultBgColor : control.defaultModel['background-color'] || '#eaeaea' }
            )
          )
        );

  }

});//$.extend
