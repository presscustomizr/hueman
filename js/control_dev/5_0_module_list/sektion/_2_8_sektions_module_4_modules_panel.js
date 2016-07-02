//extends api.Value
var CZRSektionMths = CZRSektionMths || {};

$.extend( CZRSektionMths, {

    toggleModuleListPanel : function( obj ) {
          var module = this;
          if ( 'pending' == api.czrModulePanelEmbedded.state() ) {
              $.when( module.renderModulePanel() ).done( function(){
                  module.modsDragInstance.containers.push( $('#czr-available-modules-list')[0]);
                  api.czrModulePanelEmbedded.resolve();
              });
          }

          api.czrModulePanelState.set( ! api.czrModulePanelState() );

          //close all sektions but the one from which the button has been clicked
          if ( ! api.czrModulePanelState() ) {
              module.closeAllOtherSektions( $(obj.dom_event.currentTarget, obj.dom_el ) );
          } else {
              module.czr_Item.each( function( _sektion ){
                  _sektion.czr_ItemState.set( 'expanded' != _sektion.czr_ItemState() ? 'expanded_noscroll' : 'expanded' );
              });
          }
    },

    //cb of api.czrModulePanelState.callbacks
    reactToModulePanelState : function( expanded ) {
         $('body').toggleClass('czr-adding-module', expanded );
    },

    //fired once, on first expansion
    renderModulePanel : function() {
          var module = this;
          //do we have template script?
          if ( 0 === $( '#tmpl-czr-available-modules' ).length ) {
            throw new Error('No template found to render the module panel list' );
          }

          //append the module wrapper to the column
          $('#widgets-left').after( $( wp.template( 'czr-available-modules' )() ) );

          _.each( api.czrModuleMap, function( _data, _mod_type ) {
                  var $_mod_candidate = $('<li/>', {
                        class : 'czr-module-candidate',
                        'data-module-type' : _mod_type,
                        html : '<h3><span class="czr-mod-drag-handler fa fa-arrows-alt"></span>' + _data.name + '</h3>'
                  });
                  $('#czr-available-modules-list').append(  $_mod_candidate );
          });
    }
});//$.extend