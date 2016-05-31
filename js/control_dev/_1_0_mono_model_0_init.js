//extends api.Value
//options:
//model_id : model.id,
// model_val : model,
// model_control : control,
// is_added_by_user : is_added_by_user
var CZRMonoModelMethods = CZRMonoModelMethods || {};
$.extend( CZRMonoModelMethods , {
  initialize: function( id, options ) {
        if ( _.isUndefined(options.model_control) || _.isEmpty(options.model_control) ) {
          throw new Error('No control assigned to mono model ' + id + '. Aborting');
        }
        api.Value.prototype.initialize.call( this, null, options );

        var monoModel = this,
            control = monoModel.model_control;

        //input.options = options;
        //write the options as properties, name is included
        $.extend( monoModel, options || {} );

        //initialize to the provided value
        monoModel.set(options.model_val);
        monoModel.defaultModel = {};

        //VIEW
        //czr_View stores the current expansion status of a given view => one value by created by model.id
        //czr_View can take 3 values : expanded, expanded_noscroll (=> used on view creation), closed
        monoModel.czr_View = new api.Value();
        monoModel.setupView();

        //INPUTS
        //the model is a collection of inputs, each one has its own view element.
        monoModel.czr_Input = new api.Values();
        //this can be overriden by extended classes to add and overrides methods
        monoModel.inputConstructor = api.CZRInput;
        monoModel.setupInputCollection();


        //setup listeners
        monoModel.callbacks.add( function() { return self.setupMonoModelListeners.apply(self, arguments ); } );

        //if a model is manually added : open it
        if ( monoModel.is_added_by_user ) {
          monoModel.setViewVisibility( true );//true for add_by_user
        }

  },//initialize


  setupView : function() {
          var monoModel = this,
              control = this.model_control;

          monoModel.view_event_map = [
                  //toggles remove view alert
                  {
                    trigger   : 'click keydown',
                    selector  : [ '.' + control.css_attr.display_alert_btn, '.' + control.css_attr.cancel_alert_btn ].join(','),
                    name      : 'toggle_remove_alert',
                    actions   : ['toggleRemoveAlertVisibility']
                  },
                  //removes model and destroys its view
                  {
                    trigger   : 'click keydown',
                    selector  : '.' + control.css_attr.remove_view_btn,
                    name      : 'remove_model',
                    actions   : ['removeModel']
                  },
                  //edit view
                  {
                    trigger   : 'click keydown',
                    selector  : [ '.' + control.css_attr.edit_view_btn, '.' + control.css_attr.view_title ].join(','),
                    name      : 'edit_view',
                    actions   : ['setViewVisibility']
                  }
          ];

          monoModel.container = monoModel.renderView();
          if ( ! monoModel.container.length ) {
            throw new Error( 'In setupView the MonoModel view has not been rendered : ' + monoModel.model_id );
          }

          //setup
          monoModel.czr_View.set('closed');

          var $viewContent = $( '.' + control.css_attr.view_content, monoModel.container );
          //add a state listener on state change
          monoModel.czr_View.callbacks.add( function( to, from ) {
                //render and setup view content if needed
                if ( ! $.trim( $viewContent.html() ) ) {
                      monoModel.renderViewContent();
                }
                //expand
                monoModel._toggleViewExpansion(to );
          });


          monoModel.setupDOMListeners( monoModel.view_event_map , { model:monoModel.get(), dom_el:monoModel.container } );//listeners for the view wrapper
          monoModel._makeSortable();

          //hook here
          control.doActions('after_viewSetup', $view, { model : _to_render , dom_el: $view} );
  },




  //creates the inputs based on the rendered items
  setupInputCollection : function() {
        var monoModel = this,
            control = monoModel.model_control;

        if ( _.isEmpty(monoModel.defaultModel) || _.isUndefined(monoModel.defaultModel) ) {
          throw new Error('No default model found in multi input control ' + monoModel.model_id + '. Aborting');
        }

        //prepare and sets the model value on api ready
        //=> triggers the control rendering + DOM LISTENERS
        var current_model = monoModel.get();

        if ( ! _.isObject(current_model) )
          current_model = monoModel.defaultModel;
        else
          current_model = _.extend( monoModel.defaultModel, current_model );

        //creates the inputs based on the rendered items
        $( '.'+control.css_attr.sub_set_wrapper, monoModel.container).each( function(_index) {
              var _id = $(this).find('[data-type]').attr('data-type') || 'sub_set_' + _index,
                  _value = _.has( current_model, _id) ? current_model[_id] : '';

              monoModel.czr_Input.add( _id, new monoModel.inputConstructor( _id, {
                  id : _id,
                  type : $(this).attr('data-input-type'),
                  input_value : _value,
                  container : $(this),
                  mono_model : monoModel
              } ) );
        });//each

        //listens and reacts to the models changes
        monoModel.czr_Input.val.callbacks.add(function(to, from) {
              //api(control.id).set(to);
              //say it to the parent MonoModel
              monoModel.set(to);
        });
  },



  setupMonoModelListeners : function( to, from ) {
        var _current_collection = monoModel.control.czr_Model.czr_collection.get(),
            _new_collection = _.clone( _current_collection  );//initialize it to the current value

          //make sure the _collection is an object and is not empty
          _new_collection =  ( ! _.isArray(_new_collection) || _.isEmpty(_new_collection) ) ? [] : _new_collection;

          //WAS UPDATE COLLECTION...
          //set the new val to the changed property
          //the model already exist in the collection
          // if ( _.findWhere( _new_collection, { id : monoModel.id } ) ) {
          //   _.each( _current_collection , function( _model, _ind ) {
          //     if ( _model.id != model.id )
          //       return;

          //     //set the new val to the changed property
          //     _new_collection[_ind] = model;
          //   });
          // }
          // //the model has to be added
          // else {
          //   _new_collection.push(model);
          // }
          _new_collection[monoModel.model_id] = to;
          monoModel.control.czr_Model.czr_collection.set(_new_collection);

          monoModel.writeViewTitle(to);

          //send model to the preview. On update only, not on creation.
          if ( ! _.isEmpty(from) || ! _.isUndefined(from) ) {
            monoModel._sendModel(to, from);
          }
  }


});//$.extend