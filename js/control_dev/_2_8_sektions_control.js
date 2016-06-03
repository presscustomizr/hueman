//extends api.CZRMultiModelControl
//This controls populates the sektions setting.
//The each sektion is composed of blocks (=> columns on front end)
//Each blocks of elements ( => content element on front end like slider, text block, etc)

var CZRSektionsMths = CZRSektionsMths || {};

$.extend( CZRSektionsMths, {
  initialize: function( id, options ) {

    //run the parent initialize
    api.CZRMultiModelControl.prototype.initialize.call( this, id, options );
    var control = this;

    //declares a default model
    control.defaultItemModel = {
      id : '',
      'sektion-layout' : 1,
    };

    //EXAMPLE : control.czr_Item(obj.model.id).set(_new_model);
    //
    //overrides the default success message
    //this.modelAddedMessage = serverControlParams.translatedStrings.socialLinkAdded;
  },//initialize

  //renders saved models views and attach event handlers
  //the saved model look like :
  //array[ { id : 'sidebar-one', title : 'A Title One' }, {id : 'sidebar-two', title : 'A Title Two' }]
  renderViewContent : function( obj ) {
        //=> an array of objects
        var control = this,
            model = _.clone(obj.model);

        //do we have view content template script?
        if ( 0 === $( '#tmpl-' + control.getTemplateEl( 'view-content', model ) ).length )
          return this;

        var  view_content_template = wp.template( control.getTemplateEl( 'view-content', model ) );

        //do we have an html template and a control container?
        if ( ! view_content_template || ! control.container )
          return this;

        //the view content
        $( view_content_template( model )).appendTo( $('.' + control.css_attr.view_content, obj.dom_el ) );

        //Renders the blocks
        control.renderSektionBlocks(obj);

        control.doActions( 'viewContentRendered' , obj.dom_el, obj );

        return this;
  },


  renderSektionBlocks : function(obj) {
    var control   = this,
        model     = control.czr_Item(obj.model.id).get(),
        block_nb  = parseInt( model['sektion-layout'] || 1, 10 );

    for (var blk = 1; blk < block_nb + 1; blk++) {
      $view     = $( wp.template('customize-control-czr_sektions-block')( {'block-id' : blk}) );
      $view.appendTo( $('.' + control.css_attr.view_content, obj.dom_el ) );
      console.log('ALORS?', blk );
    }
  }


});