//extends api.CZRDynModule

var CZRSlideModuleMths = CZRSlideModuleMths || {};

$.extend( CZRSlideModuleMths, {
  initialize: function( id, options ) {
          var module = this;
          //run the parent initialize
          api.CZRDynModule.prototype.initialize.call( module, id, options );

          //extend the module with new template Selectors
          $.extend( module, {
                viewPreAddEl : 'czr-module-slide-pre-add-view-content',
                viewTemplateEl : 'czr-module-item-view',
                viewContentTemplateEl : 'czr-module-slide-view-content',
          } );

          //EXTEND THE DEFAULT CONSTRUCTORS FOR INPUT
          module.inputConstructor = api.CZRInput.extend( module.CZRSliderInputMths || {} );
          //EXTEND THE DEFAULT CONSTRUCTORS FOR MONOMODEL
          module.itemConstructor = api.CZRItem.extend( module.CZRSliderItem || {} );

          //declares a default model
          this.defaultItemModel = {
              id : '',
              title : '',
              'slide-background' : '',
              'slide-title'      : '',
              'slide-subtitle'   : '',
          };

          //overrides the default success message
          this.itemAddedMessage = serverControlParams.translatedStrings.slideAdded;
          api.section( module.control.section() ).expanded.bind(function(to) {
            if ( ! to || ! _.isEmpty( module.get() ) )
              return;
            module.ready();
          });
  },//initialize


  CZRSliderInputMths : {
          ready : function() {
                var input = this;
                //update the item title on slide-title change
                input.bind('slide-title:changed', function(){
                  input.updateItemTitle();
                });
                api.CZRInput.prototype.ready.call( input);
          },

          //ACTIONS ON slide-title change
          //Fired on 'slide-title:changed'
          //Don't fire in pre item case
          updateItemTitle : function( _new_val ) {
                var input = this,
                    item = this.item,
                    is_preItemInput = _.has( input, 'is_preItemInput' ) && input.is_preItemInput;

                var _new_model  = _.clone( item.get() ),
                    _new_title  = _new_model['slide-title'];

                $.extend( _new_model, { title : _new_title} );
                item.set( _new_model );
          },
  },//CZRSlidersInputMths
  CZRSliderItem : {
          //overrides the default parent method by a custom one
          //at this stage, the model passed in the obj is up to date
          writeItemViewTitle : function( model ) {
                var item = this,
                          module  = item.module,
                          _model = model || item.get(),
                          _title = _model.title ? _model.title : serverControlParams.translatedStrings.slideTitle;

                _title = api.CZR_Helpers.truncate(_title, 25);
                $( '.' + module.control.css_attr.view_title , item.container ).html( _title );
          }
  }
});