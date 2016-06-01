//extends api.Value
//options:
  // model_id : model.id,
  // model_val : model,
  // defaultMonoModel : control.defaultMonoModel,
  // model_control : control,
  // is_added_by_user : is_added_by_user || false
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

        //setup listeners
        monoModel.callbacks.add( function() { return monoModel.setupMonoModelListeners.apply(monoModel, arguments ); } );

        //VIEW
        //czr_View stores the current expansion status of a given view => one value by created by model.id
        //czr_View can take 3 values : expanded, expanded_noscroll (=> used on view creation), closed
        monoModel.czr_View = new api.Value();
        monoModel.setupView();

        //INPUTS => Setup as soon as the view content is rendered
        //the model is a collection of inputs, each one has its own view element.
        monoModel.czr_Input = new api.Values();
        //this can be overriden by extended classes to add and overrides methods
        monoModel.inputConstructor = control.inputConstructor;

        //initialize to the provided value
        monoModel.set(options.model_val);


        //if a model is manually added : open it
        if ( monoModel.is_added_by_user ) {
          monoModel.setViewVisibility( {}, true );//empty obj because this method can be fired by the dom chain actions, always passing an object. true for added_by_user
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

          monoModel.container = monoModel.renderView( monoModel.model_val );
          if ( _.isUndefined(monoModel.container) || ! monoModel.container.length ) {
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
                monoModel.setupInputCollection();
                //expand
                monoModel._toggleViewExpansion( to );
          });


          api.CZR_Dom.setupDOMListeners( monoModel.view_event_map , { model:monoModel.model_val, dom_el:monoModel.container }, monoModel );//listeners for the view wrapper

          monoModel._makeSortable();

          //hook here
          control.doActions('after_viewSetup', monoModel.container, { model : monoModel.model_val , dom_el: monoModel.container} );
  },




  //creates the inputs based on the rendered items
  setupInputCollection : function() {
        var monoModel = this,
            control = monoModel.model_control;

        if ( _.isEmpty(monoModel.defaultMonoModel) || _.isUndefined(monoModel.defaultMonoModel) ) {
          throw new Error('No default model found in multi input control ' + monoModel.model_id + '. Aborting');
        }

        //prepare and sets the model value on api ready
        //=> triggers the control rendering + DOM LISTENERS
        var current_model = monoModel.get();

        if ( ! _.isObject(current_model) )
          current_model = monoModel.defaultMonoModel;
        else
          current_model = $.extend( monoModel.defaultMonoModel, current_model );

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

        // //listens and reacts to the models changes
        // monoModel.czr_Input.val.callbacks.add(function(to, from) {
        //       //api(control.id).set(to);
        //       //say it to the parent MonoModel
        //       monoModel.set(to);
        // });
  },



  setupMonoModelListeners : function( to, from ) {
        var monoModel = this,
            control = monoModel.model_control;

          control.updateCollection( {model : to });
          //Always update the view title
          monoModel.writeViewTitle(to);

          //send model to the preview. On update only, not on creation.
          if ( ! _.isEmpty(from) || ! _.isUndefined(from) ) {
            monoModel._sendModel(to, from);
          }
  }


});//$.extend