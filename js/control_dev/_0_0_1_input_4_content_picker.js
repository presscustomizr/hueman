/* Fix caching, select2 default one seems to not correctly work, or it doesn't what I think it should */
var CZRInputMths = CZRInputMths || {};
$.extend( CZRInputMths , {
  setupContentPicker: function() {
    var input  = this;

    input.pages = [];

    /* Dummy for the prototype purpose */
    input.object = ['cat']; //this.control.params.object_types  - array('page', 'post')
    input.type   = 'post_type'; //this.control.params.type  - post_type

    //setup selectedData
    input.selectedData = [];//input.setupSelectedContents();
    
    /* Methodize this or use a template */
    input.container.find('.czr-input').append('<select data-type="content-picker-select" class="js-example-basic-simple"></select>');
    
    input.container.find('select').select2({
      placeholder: {
        id: '-1', // the value of the option
        text: 'Select'
      },
      data : input.selectedData,
      allowClear: true,
      ajax: {
        url: serverControlParams.AjaxUrl,
        type: 'POST',
        cache: true,
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
        transport: function (params, success, failure) {
          var $request = $.ajax(params);

          $request.then(success);
          $request.fail(failure);

          return $request;
        },
        processResults: function (data, params) {
          if ( ! data.success )
            return { results: [] };

          var items   = data.data.items,
              _results = [];

          _.each( items, function( item ) {
            _results.push({
              id         : item.id,
              text       : item.title,
              type_label : item.type_label,
              type       : item.type
            });
          });
          return {
            results: _results,
            pagination: { more: data.data.items.length == 10 }
          };
        },  
      },
      templateSelection: input.czrFormatItem,
      templateResult: input.czrFormatItem,
      escapeMarkup: function (markup) { return markup; },
   });
   //.on('select2:select', input.submit )
   //.on('select2:unselect', input.submit );  
   //input.setupSelectedContents();
  },
  czrFormatItem: function (item) {
      if ( item.loading ) return item.text;
      var markup = "<div class='content-picker-item clearfix'>" +
        "<div class='content-item-bar'>" +
          "<span class='item-title'>" + item.text + "</span>";

      if ( item.type_label ) {
        markup += "<span class='item-type'>" + item.type_label + "</span>";
      }

      markup += "</div></div>";

      return markup;
  },
  setupSelectedContents : function() {
    /* TODO */
    var input = this,
    _attributes = {
      value : '2',
      title: 'Sample page',
      //selected: 'selected'
    };
    return [_attributes];
  },
 /*
  * override to "nothing" as we have to set the model value to 
  * an object and not to the "val" of the select (which is just the ID)
  * Though, since we already split the pickers for type (taxonomy||post_type)
  * and before adding all the data of the selected content (for type == post_type)
  * we want to retrieve them via ajax the ID should be enough, we then will retrieve
  * title, excerpt, featured page ecc. ecc. via ajax, hence no real needs to save the
  * whole object as model.
  * But still we have a problem when we want to store a val which is an object,
  * or we have to json stringify it, and reverse stringify when using it
  *
  * Also for a situation like:
  * <input data-type ..>
  * <select data-type ..>
  *
  * updateInput + setupSynchronizer both in place => infinite loop
  *
  * An array of ID should be allowed as <input> val, will be treated as a comma separeted
  * values, so it will be just a matter of how to treat it.
  *
  * Even better .. wouldn't be possible to use even not an <input> or anyway not the value
  * attibute but something like data-value? We could fill it with whatever we want.
  *
  * We can event think that the czr input will not call "val()" but a "value"(get/set) callback,
  * which in the base class is "val" but can be extended with.. "data('val')
  * 
  * 
  */
  //override
  setupSynchronizer: function( obj ){
  },
  //override
  updateInput: function( obj ){
    var input = this,
        $_changed_input   = $(obj.dom_event.currentTarget, obj.dom_el ),
        _new_val          = $( $_changed_input, obj.dom_el ).select2('data');

    //purge useless select2 fields
    if ( _new_val.length ) {
      _new_val = _.map( _new_val, function( _item ){ 
        return {
          'id'         :  _item.id,
          'type_label' :  _item.type_label,
          'title'      :  _item.text,
          'type'       :  _item.type
        };
      });
    }

    input.set(_new_val);
    //say it to the dom
    //@todo use the api Events instead
    input.trigger( input.id + ':changed', _new_val );
  }
});//$.extend
