//extends api.CZRDynModule

var CZRFeaturedPageModuleMths = CZRFeaturedPageModuleMths || {};

$.extend( CZRFeaturedPageModuleMths, {
  initialize: function( id, options ) {
    var module = this;
    //run the parent initialize
    api.CZRDynModule.prototype.initialize.call( module, id, options );

    //extend the module with new template Selectors
    $.extend( module, {
          viewPreAddEl : 'czr-module-fp-pre-add-view-content',
          viewTemplateEl : 'czr-module-item-view',
          viewContentTemplateEl : 'czr-module-fp-view-content',
    } );

    //EXTEND THE DEFAULT CONSTRUCTORS FOR INPUT
    module.inputConstructor = api.CZRInput.extend( module.CZRFeaturedPagesInputMths || {} );
    //EXTEND THE DEFAULT CONSTRUCTORS FOR MONOMODEL
    module.itemConstructor = api.CZRItem.extend( module.CZRFeaturedPagesItem || {} );

    //declares a default model
    this.defaultItemModel = {
        id : '',
        title : '' ,
        'fp-post'  : '',
        'fp-title' : '',
        'fp-text'  : '',
        'fp-image' : '',
    };

    //overrides the default success message
    this.itemAddedMessage = serverControlParams.translatedStrings.featuredPageAdded;
    api.section( module.control.section() ).expanded.bind(function(to) {
      if ( ! to || ! _.isEmpty( module.get() ) )
        return;
      module.ready();
    });

  },//initialize
  
  //@override
  // wait for the ajax result!
  //the item is manually added.
  //We should have a pre Item
  addItem : function(obj) {
    
    var module     = this,
        item       = module.czr_preItem('item'),
        item_model = item.get();

    if ( _.isEmpty(item_model) || ! _.isObject(item_model) ) {
        throw new Error('addItem : an item should be an object and not empty. In : ' + module.id +'. Aborted.' );
    }

    var _fp_post        = item_model['fp-post'];
    if ( typeof _fp_post  == "undefined" )
      return;

    _fp_post = _fp_post[0];
    var request = module.CZRFeaturedPagesItem.setContentAjaxInfo( _fp_post.id );
    
    //extend ajax request always cb
    /* TODO: WITH EVENTS */
    request.add_always_callback( function( _to_update ) { 
      item.set( $.extend( item_model, _to_update) );
      api.CZRDynModule.prototype.addItem.call( module, obj );
    });
  },


  CZRFeaturedPagesInputMths : {
    ready : function() {
      var input = this;
      //update the item model on fp-post change
      input.bind('fp-post:changed', function(){
        input.updateItemModel();
      });
      //update the item title on fp-title change
      input.bind('fp-title:changed', function(){
        input.updateItemTitle();
      });
      api.CZRInput.prototype.ready.call( input );
    },

    //ACTIONS ON fp-title change
    //Fired on 'fp-title:changed'
    //Don't fire in pre item case
    updateItemModel : function( _new_val ) {

      var input = this,
          item = this.item,
          is_preItemInput = _.has( input, 'is_preItemInput' ) && input.is_preItemInput;

      //check if we are in the pre Item case => if so, the fp-post might be empty
      if ( ! _.has( item.get(), 'fp-post') || _.isEmpty( item.get()['fp-post'] ) )
        return;

      var _new_model      = _.clone( item.get() ),
          _fp_post        = _new_model['fp-post'][0],
          _new_title      = _fp_post.title,
          inputCollection = is_preItemInput ? input.module.czr_preItemInput : item.czr_Input;

      if ( is_preItemInput ) {
        $.extend( _new_model, { title : _new_title, 'fp-title' : _new_title } );
        item.set( _new_model );
      } else {
        //extend ajax request always cb
        /* TODO: WITH EVENTS */
        var request = item.setContentAjaxInfo( _fp_post.id, {'fp-title' : _new_title} );
        request.add_always_callback( function( _to_update ) { 
          _.each( _to_update, function( value, id ){
            item.czr_Input( id ).set( value );
          });
        });
      }
    },

    updateItemTitle : function( _new_val ) {
      var input = this,
          item = this.item,
          is_preItemInput = _.has( input, 'is_preItemInput' ) && input.is_preItemInput;

      if ( is_preItemInput )
        return;
      var _new_model  = _.clone( item.get() ),
          _new_title  = _new_model['fp-title'];

      $.extend( _new_model, { title : _new_title} );
      item.set( _new_model );
    },
  },//CZRFeaturedPagesInputMths
  CZRFeaturedPagesItem : {
    setContentAjaxInfo : function( _post_id, _additional_inputs ) {
      //called be called from the input and from the item
      var _to_update         = _additional_inputs || {},
          request            = {};

      request.always_callbacks = [];
      request.add_always_callback = function(cb) {
        request.always_callbacks.push( cb );
      };

      //AJAX STUFF
      //retrieve some ajax info
      $.extend( request, wp.ajax.post( 'get-fp-post', {
          'wp_customize': 'on',
          'id'          : _post_id
          //nonce needed USE 1 for everything?
      }) );


      request.done( function( data ){
        var _post_info = data.post_info;

        if ( 0 !== _post_info.length ) {
          $.extend( _to_update, { 'fp-image' : _post_info.thumbnail, 'fp-text' : _post_info.excerpt } );
        }
      });

      request.fail(function( data ) {
        if ( typeof console !== 'undefined' && console.error ) {
          console.error( data );
        }
      });

      request.always(function() {
        _.each( request.always_callbacks, function( cb ){
          cb(_to_update);    
        });
      });

      return request;
    }    
  }
});
