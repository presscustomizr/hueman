var HUBackgroundMethods = HUBackgroundMethods || {};

//@augments HUBaseControl
(function (api, $, _) {
  /* Multiple Picker */
  /**
   * @constructor
   * @augments wp.customize.Control
   * @augments wp.customize.Class
   */
  $.extend( HUBackgroundMethods , {
    initialize: function( id, options ) {
      var control = this;
      api.HUBaseControl.prototype.initialize.call( control, id, options );
    },

    ready: function() {
      this.setupSelect();
    },


    setupSelect : function( obj ) {
      var control = this;
          $_select  = this.container.find('select');

      function addImg( state ) {
        if (! state.id) { return state.text; }
        if ( ! _.has( control.params.layouts, state.element.value ) )
          return;

        var _layout_data = control.params.layouts[state.element.value],
            _src = _layout_data.src,
            _title = _layout_data.label,
            $state = $(
          '<img src="' + _src +'" class="hu-layout-img" title="' + _title + '" /><span class="hu-layout-title">' + _title + '</span>'
        );
        return $state;
      }

      //destroy selected if set
      //$_select.selecter("destroy");

      //fire select2
      $_select.select2( {
          templateResult: addImg,
          templateSelection: addImg,
          minimumResultsForSearch: Infinity
          //dropdownParent : $('#customize-control-hu_theme_options-social-links')
      });
    },
  });//$.extend

})( wp.customize, jQuery, _);