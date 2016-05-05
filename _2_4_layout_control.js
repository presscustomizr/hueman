var HULayoutSelectMethods = HULayoutSelectMethods || {};

(function (api, $, _) {
  /* Multiple Picker */
  /**
   * @constructor
   * @augments wp.customize.Control
   * @augments wp.customize.Class
   */
  $.extend( HULayoutSelectMethods , {
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
          '<img src="' + _src +'" class="czr-layout-img" title="' + _title + '" /><span class="czr-layout-title">' + _title + '</span>'
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
      });
    },
  });//$.extend

})( wp.customize, jQuery, _);