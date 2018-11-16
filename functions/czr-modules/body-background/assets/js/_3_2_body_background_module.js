
//extends api.CZRModule
var BodyBGConstructor = BodyBGConstructor || {};
( function ( api, $, _ ) {
      $.extend( BodyBGConstructor, {
            initialize: function( id, options ) {
                  var module = this;
                  //extend the module with new template Selectors
                  // $.extend( module, {
                  //       itemInputList : 'czr-module-bodybg-item-content'
                  // } );

                  //EXTEND THE DEFAULT CONSTRUCTORS FOR INPUT
                  module.inputConstructor = api.CZRInput.extend( module.CZRBodyBgInputMths || {} );
                  //EXTEND THE DEFAULT CONSTRUCTORS FOR MONOMODEL
                  module.itemConstructor = api.CZRItem.extend( module.CZBodyBgItemMths || {} );

                  //run the parent initialize
                  api.CZRModule.prototype.initialize.call( module, id, options );
            },//initialize



            CZRBodyBgInputMths : {
                  //////////////////////////////////////////////////
                  ///SETUP SELECTS
                  //////////////////////////////////////////////////
                  //setup select on view_rendered|item_content_event_map
                  setupSelect : function() {
                        var input         = this,
                            _id_param_map = {
                              'background-repeat' : 'bg_repeat_options',
                              'background-attachment' : 'bg_attachment_options',
                              'background-position' : 'bg_position_options'
                            },
                            item          = input.input_parent,
                            serverParams  = bodyBGModuleLocalized,
                            options       = {},
                            module        = input.module;

                        if ( ! _.has( _id_param_map, input.id ) )
                          return;

                        if ( _.isUndefined( serverParams ) || _.isUndefined( serverParams[ _id_param_map[input.id] ] ) )
                          return;
                        options = serverParams[ _id_param_map[input.id] ];
                        if ( _.isEmpty(options) )
                          return;
                        //generates the options
                        _.each( options, function( title, key ) {
                              var _attributes = {
                                    value : key,
                                    html: title
                                  };
                              if ( key == input() || _.contains( input(), key ) )
                                $.extend( _attributes, { selected : "selected" } );

                              $( 'select[data-czrtype]', input.container ).append( $('<option>', _attributes) );
                        });
                        //fire czrSelect2
                        $( 'select[data-czrtype]', input.container ).czrSelect2();
                  }
            },


            CZBodyBgItemMths : {
                  //Fired if the item has been instantiated
                  //The item.callbacks are declared.
                  ready : function() {
                        var item = this;

                        item.inputCollection.bind( function( _col_ ) {
                              if ( ! _.isEmpty( _col_ ) && item.czr_Input && item.czr_Input.has( 'background-image' ) ) {
                                    item.czr_Input('background-image').isReady.done( function( input_instance ) {
                                          var set_visibilities = function( bg_val  ) {
                                                var is_bg_img_set = ! _.isEmpty( bg_val ) ||_.isNumber( bg_val);
                                                _.each( ['background-repeat', 'background-attachment', 'background-position', 'background-size'], function( dep ) {
                                                      item.czr_Input(dep).container.toggle( is_bg_img_set || false );
                                                });
                                          };
                                          set_visibilities( input_instance() );
                                          //update the item model on 'background-image' change
                                          item.bind('background-image:changed', function(){
                                                set_visibilities( item.czr_Input('background-image')() );
                                          });
                                    });
                              }
                        });
                        api.CZRItem.prototype.ready.call( item );
                  },

            }
      });//$.extend


      //provides a description of each module
      //=> will determine :
      //1) how to initialize the module model. If not crud, then the initial item(s) model shall be provided
      //2) which js template(s) to use : if crud, the module template shall include the add new and pre-item elements.
      //   , if crud, the item shall be removable
      //3) how to render : if multi item, the item content is rendered when user click on edit button.
      //    If not multi item, the single item content is rendered as soon as the item wrapper is rendered.
      //4) some DOM behaviour. For example, a multi item shall be sortable.
      api.czrModuleMap = api.czrModuleMap || {};
      $.extend( api.czrModuleMap, {
            czr_background : {
                  mthds : BodyBGConstructor,
                  crud : false,
                  multi_item : false,
                  name : 'Body Background',
                  has_mod_opt : false,
                  ready_on_section_expanded : true,
                  defaultItemModel : {
                        'background-color' : '#eaeaea',
                        'background-image' : '',
                        'background-repeat' : 'no-repeat',
                        'background-attachment' : 'fixed',
                        'background-position' : 'center center',
                        'background-size' : 'cover'
                  }
            }
      });
})( wp.customize , jQuery, _ );
