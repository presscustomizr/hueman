var CZRMultiplePickerMethods = CZRMultiplePickerMethods || {};

(function (api, $, _) {
  /* Multiple Picker */
  /**
   * @constructor
   * @augments wp.customize.Control
   * @augments wp.customize.Class
   */
  $.extend( CZRMultiplePickerMethods , {
    ready: function() {
      var control  = this,
          _select  = this.container.find('select');

      //handle case when all choices become unselected
      _select.on('change', function(e){
        if ( 0 === $(this).find("option:selected").length )
          control.setting.set([]);
      });
    }
  });//$.extend

})( wp.customize, jQuery, _);