/* Fix caching, select2 default one seems to not correctly work, or it doesn't what I think it should */
var CZRInputMths = CZRInputMths || {};
$.extend( CZRInputMths , {
  setupContentPicker: function() {
    var input  = this;

    input.pages = [];

    /* Dummy for the prototype purpose */
    input.object = ['cat']; //this.control.params.object_types  - array('page', 'post')
    input.type   = 'taxonomy'; //this.control.params.type  - post_type

    //binding             
    _.bindAll( input, 'submit');

    //setup selectedData
    input.selectedData = [];//input.setupSelectedContents();
    
    /* Methodize this */
    input.container.find('.czr-input').append('<select data-type="content-picker-select" class="js-example-basic-single"></select>');
    
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
            object: input.object
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
              id   : item.id,
              text : item.title,
              type : item.type_label
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
   //input.setupSelectedContents();
  },
  czrFormatItem: function (item) {
      if ( item.loading ) return item.text;
      var markup = "<div class='content-picker-item clearfix'>" +
        "<div class='content-item-bar'>" +
          "<span class='item-title'>" + item.text + "</span>";

      if ( item.type ) {
        markup += "<span class='item-type'>" + item.type + "</span>";
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
  }
});//$.extend
