//extends api.Value
var CZRSektionMths = CZRSektionMths || {};

$.extend( CZRSektionMths, {

    toggleSekSettingsPanel : function( obj ) {
          var module = this;
          if ( 'pending' == api.czrSekSettingsPanelEmbedded.state() ) {
              $.when( module.renderSekSettingsPanel() ).done( function(){
                  api.czrSekSettingsPanelEmbedded.resolve();
              });
          }
          //close the module panel if needed
          api.czrModulePanelState.set( false );

          api.czrSekSettingsPanelState.set( ! api.czrSekSettingsPanelState() );

          //close all sektions but the one from which the button has been clicked
          module.closeAllOtherSektions( $(obj.dom_event.currentTarget, obj.dom_el ) );
    },

    //cb of api.czrSekSettingsPanelState.callbacks
    reactToSekSettingPanelState : function( expanded ) {
         $('body').toggleClass('czr-editing-sektion', expanded );
    },

    //fired once, on first expansion
    renderSekSettingsPanel : function() {
          var module = this,
              _tmpl = '';
          //do we have template script?
          if ( 0 === $( '#tmpl-czr-sektion-settings-panel' ).length ) {
            throw new Error('No template found to render the sektion setting panel' );
          }
          try {
            _tmpl = wp.template( 'czr-sektion-settings-panel' )();
          }
          catch(e) {
            throw new Error('Error when parsing the template of the sektion setting panel' + e );
          }
          $('#widgets-left').after( $( _tmpl ) );

          // _.each( api.czrModuleMap, function( _data, _mod_type ) {
          //         var $_mod_candidate = $('<li/>', {
          //               class : 'czr-module-candidate',
          //               'data-module-type' : _mod_type,
          //               html : '<h3><span class="czr-mod-drag-handler fa fa-arrows-alt"></span>' + _data.name + '</h3>'
          //         });
          //         $('#czr-available-modules-list').append(  $_mod_candidate );
          // });
    }
});//$.extend