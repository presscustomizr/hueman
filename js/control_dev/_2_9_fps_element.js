//extends api.CZRDynElement

var CZRFeaturedPageElementMths = CZRFeaturedPageElementMths || {};

$.extend( CZRFeaturedPageElementMths, {
  initialize: function( id, options ) {
    var element = this;
    //run the parent initialize
    api.CZRDynElement.prototype.initialize.call( element, id, options );

    //extend the element with new template Selectors
    $.extend( element, {
          viewPreAddEl : 'czr-element-fp-pre-add-view-content',
          viewTemplateEl : 'czr-element-item-view',
          viewContentTemplateEl : 'czr-element-fp-view-content',
    } );

    //EXTEND THE DEFAULT CONSTRUCTORS FOR INPUT
    element.inputConstructor = api.CZRInput.extend( element.CZRFeaturedPagesInputMths || {} );
    //EXTEND THE DEFAULT CONSTRUCTORS FOR MONOMODEL
    element.itemConstructor = api.CZRItem.extend( element.CZRFeaturedPagesItem || {} );

    //declares a default model
    this.defaultItemModel = {
        id : '',
        title : '' ,
        'fp-post'  : '',
        'fp-title' : '',
        'fp-text'  : ''
    };

    //overrides the default success message
    this.itemAddedMessage = serverControlParams.translatedStrings.socialLinkAdded;
    api.section( element.control.section() ).expanded.bind(function(to) {
      if ( ! to || ! _.isEmpty( element.get() ) )
        return;
      element.ready();
    });
  },//initialize



  CZRFeaturedPagesInputMths : {/*
    ready : function() {
      var input = this;
      //update the item model on social-icon change
      input.bind('social-icon:changed', function(){
        input.updateItemModel();
      });
      api.CZRInput.prototype.ready.call( input);
    },*/
  },//CZRFeaturedPagesInputMths

  CZRFeaturedPagesItem : {
  }
});