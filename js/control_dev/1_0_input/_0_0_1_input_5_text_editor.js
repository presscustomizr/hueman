var CZRInputMths = CZRInputMths || {};
$.extend( CZRInputMths , {
    setupTextEditor : function() {
          var input        = this,
              _model       = input.get();

          //do we have an html template and a input container?
          if ( ! input.container )
            return this;

          if ( ! input.czrRenderInputTextEditorTemplate() )
            return;

          input.editor      = tinyMCE.get( 'czr-customize-content_editor' );
          input.textarea    = $( '#czr-customize-content_editor' );
          input.textpreview = input.container.find('textarea');

          //initial filling of the textpreview
          input.czrUpdateTextPreview();

          input.czrTextEditorBinding();
  },

  czrTextEditorBinding : function() {
          var input = this,
              editor = input.editor,
              textarea = input.textarea;

          input.bind( input.id + ':changed', input.czrUpdateTextPreview );

          /* collapse editor on item collapsed by firing the click on .text_editor-button so 
          * so to unbind this input
          */
          _.bindAll( input, 'czrOnVisualEditorChange', 'czrOnTextEditorChange' );
          

          input.container.on( 'click', '.text_editor-button', function() {
            $(document.body).toggleClass('czr-customize-content_editor-pane-open');
            var expanded = $( document.body ).hasClass('czr-customize-content_editor-pane-open');
   
            if ( expanded ) {
              editor.setContent( wp.editor.autop( input.get() ) );
              editor.on( 'input change keyup', input.czrOnVisualEditorChange );
              textarea.on( 'input', input.czrOnTextEditorChange );

           //   control.resizeEditor( window.innerHeight - editorPane.height() );
            } else {
              editor.off( 'input change keyup', input.czrOnVisualEditorChange );
              textarea.off( 'input', input.czrOnTextEditorChange );
              // Cancel link and force a click event to exit fullscreen & kitchen sink mode.
              //editor.execCommand( 'wp_link_cancel' );
            }
          } );

  },

  czrOnVisualEditorChange : function() {
          var input = this,
              editor = input.editor,
              value;

          value = wp.editor.removep( editor.getContent() );    
          input.set(value);
  },

  czrOnTextEditorChange : function() {
          var input = this,
              textarea = input.textarea,
              value;

          value = textarea.val();
          input.set(value);
  },
  czrUpdateTextPreview: function() {
      var input   = this,
          input_model = input.get(),
          value;

      //TODO: better stripping
      value = input_model.replace(/(<([^>]+)>)/ig,"");
      //max 30 chars
      if ( value.length > 30 )
        value = value.substring(0, 34) + '...';

      input.textpreview.val( value );
  },
  //////////////////////////////////////////////////
  /// HELPERS
  //////////////////////////////////////////////////
  czrRenderInputTextEditorTemplate: function() {
          var input  = this;

          //do we have view template script?
          if ( 0 === $( '#tmpl-czr-input-text_editor-view-content' ).length )
            return;

          var view_template = wp.template('czr-input-text_editor-view-content'),
                  $_view_el = input.container.find('input');

          //  //do we have an html template and a module container?
          if ( ! view_template  || ! input.container )
            return;

          $_view_el.after( view_template( this.get() ) );

          return true;
  },

});//$.extend