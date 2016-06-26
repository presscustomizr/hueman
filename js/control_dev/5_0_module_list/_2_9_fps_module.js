//extends api.CZRDynModule

var CZRFeaturedPageModuleMths = CZRFeaturedPageModuleMths || {};

$.extend( CZRFeaturedPageModuleMths, {
  initialize: function( id, options ) {
          var module = this;
          //run the parent initialize
          api.CZRDynModule.prototype.initialize.call( module, id, options );

          //extend the module with new template Selectors
          $.extend( module, {
                itemPreAddEl : 'czr-module-fp-pre-add-view-content',
                itemInputList : 'czr-module-fp-view-content'
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
            if ( 'resolved' == module.isReady.state() )
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

          //AJAX ACTIONS ON ADD ITEM
          //when a new featured page is added, update the model (text, featured image ) base on the selected post
          //The parent method is called on ajaxrequest.done()
          var done_callback =  function( _to_update ) {
                item.set( $.extend( item_model, _to_update) );
                api.CZRDynModule.prototype.addItem.call( module, obj );
          };

          var request = module.CZRFeaturedPagesItem.setContentAjaxInfo( _fp_post.id, {}, done_callback );

  },







  CZRFeaturedPagesInputMths : {
          ready : function() {
                  var input = this;
                  //update the item model on fp-post change
                  input.bind( 'fp-post:changed', function(){
                    input.updateItemModel();
                  });
                  //update the item title on fp-title change
                  input.bind( 'fp-title:changed', function(){
                    input.updateItemTitle();
                  });

                  api.CZRInput.prototype.ready.call( input );
          },
          //override czr img uploader input constructor
          //we need this otherwise we cannot add the buttons to the input container
          //when the input model is not, as the template will be rendered before the ready
          //method is called
          setupImageUploader:  function(){
                  var input = this;
                  //temporary
                  input.bind( 'fp-image:content_rendered', function(){
                    input.addResetDefaultButton();
                  });

                  //see add a reset to default image button
                  input.container.on('click keydown', '.default-fpimage-button', function(){
                    input.setThumbnailAjax();
                  });

                  api.CZRInput.prototype.setupImageUploader.call( input );
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

                        var done_callback =  function( _to_update ) {
                          _.each( _to_update, function( value, id ){
                              item.czr_Input( id ).set( value );
                          });
                        };
                        //pass the fp-title so it gets updated after the ajax callback
                        var request = item.setContentAjaxInfo( _fp_post.id, {'fp-title' : _new_title}, done_callback );
                  }
          },


          updateItemTitle : function( _new_val ) {
                  var input = this,
                      item = this.item,
                      is_preItemInput = _.has( input, 'is_preItemInput' ) && input.is_preItemInput;

                  if ( is_preItemInput )
                    return;
                  var _new_model  = _.clone( item.get() ),
                      _new_title  = "undefined" !== typeof _new_model['fp-title'] ? _new_model['fp-title'] : '';

                  $.extend( _new_model, { title : _new_title} );
                  item.set( _new_model );
          },


          setThumbnailAjax : function() {
                  var item     = this.item,
                      _fp_post = item.czr_Input('fp-post').get(),
                      _post_id;

                  if ( typeof _fp_post  == "undefined" )
                    return;

                  _fp_post = _fp_post[0];
                  _post_id = _fp_post.id;

                  $('.fpimage-reset-messages p').hide();

                  //AJAX STUFF
                  //retrieve some ajax info
                  request = wp.ajax.post( 'get-fp-post-tb', {
                          'wp_customize': 'on',
                          'id'          : _post_id,
                          'CZRFPNonce'  : serverControlParams.CZRFPNonce
                          //nonce needed USE 1 for everything?
                  });


                  request.done( function( data ){
                          var thumbnail = data,
                              input = item.czr_Input('fp-image');

                          if ( 0 !== thumbnail.length ) {
                            $('.fpimage-reset-messages .success', input.container ).show('fast').fadeOut();
                            input.set( thumbnail );
                          }else {
                            $('.fpimage-reset-messages .warning', input.container ).show('fast').delay(2000).fadeOut();
                          }
                  });

                  request.fail(function( data ) {
                          if ( typeof console !== 'undefined' && console.error ) {
                            console.error( data );
                          }
                  });
          },

          addResetDefaultButton : function( $_template_params ) {
                  var input        = this,
                      item         = input.item,
                      buttonLabel  = serverControlParams.translatedStrings.featuredPageImgReset,
                      successMess  = serverControlParams.translatedStrings.featuredPageResetSucc,
                      errMess      = serverControlParams.translatedStrings.featuredPageResetErr,
                      messages     = '<div class="fpimage-reset-messages" style="clear:both"><p class="success" style="display:none">'+successMess+'</p><p class="warning" style="display:none">'+errMess+'</p></div>';

                  $('.actions', input.container)
                    .append('<button type="button" class="button default-fpimage-button">'+ buttonLabel +'</button>');
                  $('.fpimage-reset-messages', input.container ).detach();
                  $(input.container).append( messages );
          }
  },//CZRFeaturedPagesInputMths








  CZRFeaturedPagesItem : {
          setContentAjaxInfo : function( _post_id, _additional_inputs, done_callback ) {
                  //called be called from the input and from the item
                  var _to_update         = _additional_inputs || {};

                  //AJAX STUFF
                  //retrieve some ajax info
                  request = wp.ajax.post( 'get-fp-post', {
                        'wp_customize': 'on',
                        'id'          : _post_id,
                        'CZRFPNonce'  : serverControlParams.CZRFPNonce
                        //nonce needed USE 1 for everything?
                  });

                  request.done( function( data ){
                        var _post_info = data.post_info;

                        if ( 0 !== _post_info.length ) {
                          $.extend( _to_update, { 'fp-image' : _post_info.thumbnail, 'fp-text' : _post_info.excerpt } );
                          if ( "function" === typeof done_callback )
                            done_callback( _to_update );
                        }
                  });

                  request.fail(function( data ) {
                        if ( typeof console !== 'undefined' && console.error ) {
                          console.error( data );
                        }
                  });

                  return request;
          },

          //overrides the default parent method by a custom one
          //at this stage, the model passed in the obj is up to date
          writeItemViewTitle : function( model ) {
                  var item = this,
                            module  = item.module,
                            _model = model || item.get(),
                            _title = _model.title ? _model.title : serverControlParams.translatedStrings.featuredPageTitle;

                  _title = api.CZR_Helpers.truncate(_title, 25);
                  $( '.' + module.control.css_attr.item_title , item.container ).html( _title );
                }
        }
});