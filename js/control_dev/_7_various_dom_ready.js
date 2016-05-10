//DOM READY :
//1) FIRE SPECIFIC INPUT PLUGINS
//2) ADD SOME COOL STUFFS
//3) SPECIFIC CONTROLS ACTIONS
(function (wp, $) {
  $( function($) {
    var api = wp.customize || api;

    //WHAT IS HAPPENING IN THE MESSENGER
    // $(window.parent).on( 'message', function(e, o) {
    //   console.log('SENT STUFFS', JSON.parse( e.originalEvent.data), e );
    // });
    // $( window ).on( 'message', function(e, o) {
    //   console.log('INCOMING MESSAGE', JSON.parse( e.originalEvent.data), e );
    // });
    // $(window.document).bind("ajaxSend", function(e, o){
    //    console.log('AJAX SEND', e, arguments );
    // }).bind("ajaxComplete", function(e, o){
    //    console.log('AJAX COMPLETE', e, o);
    // });


    /* RECENTER CURRENT SECTIONS */
    $('.accordion-section').not('.control-panel').click( function () {
      _recenter_current_section($(this));
    });

    function _recenter_current_section( section ) {
      var $siblings               = section.siblings( '.open' );
      //check if clicked element is above or below sibling with offset.top
      if ( 0 !== $siblings.length &&  $siblings.offset().top < 0 ) {
        $('.wp-full-overlay-sidebar-content').animate({
              scrollTop:  - $('#customize-theme-controls').offset().top - $siblings.height() + section.offset().top + $('.wp-full-overlay-sidebar-content').offset().top
        }, 700);
      }
    }//end of fn


    /* CHECKBOXES */
    api.czrSetupCheckbox = function( controlId, refresh ) {
      $('input[type=checkbox]', api.control(controlId).container ).each( function() {
        //first fix the checked / unchecked status
        if ( 0 === $(this).val() || '0' == $(this).val() || 'off' == $(this).val() || _.isEmpty($(this).val() ) ) {
          $(this).prop('checked', false);
        } else {
          $(this).prop('checked', true);
        }

        //then render icheck if not done already
        if ( 0 !== $(this).closest('div[class^="icheckbox"]').length )
          return;

        $(this).iCheck({
          checkboxClass: 'icheckbox_flat-grey',
          //checkedClass: 'checked',
          radioClass: 'iradio_flat-grey',
        })
        .on( 'ifChanged', function(e){
          $(this).val( false === $(this).is(':checked') ? 0 : 1 );
          $(e.currentTarget).trigger('change');
        });
      });
    };//api.czrSetupCheckbox()

    /* SELECT INPUT */
    api.czrSetupSelect = function(controlId, refresh) {
      //Exclude no-selecter-js
      $('select[data-customize-setting-link]', api.control(controlId).container ).not('.no-selecter-js')
        .each( function() {
          $(this).selecter({
          //triggers a change event on the view, passing the newly selected value + index as parameters.
          // callback : function(value, index) {
          //   self.triggerSettingChange( window.event || {} , value, index); // first param is a null event.
          // }
          });
      });
    };//api.czrSetupSelect()


    /* NUMBER INPUT */
    api.czrSetupStepper = function(controlId, refresh) {
      //Exclude no-selecter-js
      $('input[type="number"]', api.control(controlId).container ).each( function() {
          $(this).stepper();
      });
    };//api.czrSetupStepper()

    api.control.each(function(control){
      if ( ! _.has(control,'id') )
        return;
      //exclude widget controls for checkboxes
      if ('widget' != control.id.substring(0, 6) ) {
        api.czrSetupCheckbox(control.id);
      }
      api.czrSetupSelect(control.id);
      api.czrSetupStepper(control.id);
    });


    /* WIDGET PANEL ICON */
    if ( $('.control-panel-widgets').find('.accordion-section-title').first().length ) {
      $('.control-panel-widgets').find('.accordion-section-title').first().prepend(
        $('<span/>', {class:'fa fa-magic'} )
      );
    }
  });//end of $( function($) ) dom ready

})( wp, jQuery);
