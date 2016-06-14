/* Fix caching, select2 default one seems to not correctly work, or it doesn't what I think it should */
var CZRInputMths = CZRInputMths || {};
$.extend( CZRInputMths , {
  setupContentPicker: function() {
    var input  = this,
    _event_map = [];

    /* Dummy for the prototype purpose */
    input.object = ['post']; //this.control.params.object_types  - array('page', 'post')
    input.type   = 'post_type'; //this.control.params.type  - post_type

    /* Methodize this or use a template */
    input.container.find('.czr-input').append('<select data-select-type="content-picker-select" class="js-example-basic-simple"></select>');

 
    //binding
    _event_map = [
        //set input value
        {
          trigger   : 'change',
          selector  : 'select[data-select-type]',
          name      : 'set_input_value',
          actions   : 'updateContentPickerModel'
        }
    ];

    input.setupDOMListeners( _event_map , { dom_el : input.container }, input );    
    input.setupContentSelecter();
  },

  setupContentSelecter : function() {
    var input = this;

    input.container.find('select').select2({
      placeholder: {
        id: '-1', // the value of the option
        title: 'Select'
      },
      data : input.setupSelectedContents(),
//      allowClear: true,
      ajax: {
        url: serverControlParams.AjaxUrl,
        type: 'POST',
        dataType: 'json',
        delay: 250,
        debug: true,
        data: function ( params ) {
          //for some reason I'm not getting at the moment the params.page returned when searching is different
          var page = params.page ? params.page - 1 : 0;
          page = params.term ? params.page : page;
          return {
            action: params.term ? "search-available-content-items-customizer" : "load-available-content-items-customizer",
            search: params.term, 
            wp_customize: 'on',
            page: page,
            type: input.type,
            object: input.object,
            CZRCpNonce: serverControlParams.CZRCpNonce
          };
        },
       /* transport: function (params, success, failure) {
          var $request = $.ajax(params);

          $request.then(success);
          $request.fail(failure);

          return $request;
        },*/
        processResults: function (data, params) {
          if ( ! data.success )
            return { results: [] };

          var items   = data.data.items,
              _results = [];

          _.each( items, function( item ) {
            _results.push({
              id          : item.id,
              title       : item.title,
              type_label  : item.type_label,
              object_type : item.object
            });
          });
          return {
            results: _results,
            pagination: { more: data.data.items.length == 10 }
          };
        },  
      },
      templateSelection: input.czrFormatContentSelected,
      templateResult: input.czrFormatContentSelected,
      escapeMarkup: function (markup) { return markup; },
   });
  },


  czrFormatContentSelected: function (item) {
      if ( item.loading ) return item.text;
      var markup = "<div class='content-picker-item clearfix'>" +
        "<div class='content-item-bar'>" +
          "<span class='item-title'>" + item.title + "</span>";

      if ( item.type_label ) {
        markup += "<span class='item-type'>" + item.type_label + "</span>";
      }

      markup += "</div></div>";

      return markup;
  },

  setupSelectedContents : function() {
    var input = this,
       _model = input.get();
       
    return _model;
  },
   
  updateContentPickerModel: function( obj ){
    var input = this,
        $_changed_input   = $(obj.dom_event.currentTarget, obj.dom_el ),
        _new_val          = $( $_changed_input, obj.dom_el ).select2('data');

    //purge useless select2 fields
    if ( _new_val.length ) {
      _new_val = _.map( _new_val, function( _item ){ 
        return {
          'id'          :  _item.id,
          'type_label'  :  _item.type_label,
          'title'       :  _item.title,
          'object_type' :  _item.object_type
        };
      });
    }

    input.set(_new_val);
    return;

  }
});//$.extend
