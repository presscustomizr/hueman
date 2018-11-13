//extends api.CZRDynModule
//globals widgetModuleLocalized, themeServerControlParams
var WidgetAreaConstructor = WidgetAreaConstructor || {};
( function ( api, $, _ ) {
      $.extend( WidgetAreaConstructor, {

            CZRWZonesInputMths : {
                  ready : function() {
                          var input = this;

                          input.bind('locations:changed', function(){
                              input.mayBeDisplayModelAlert();
                          });

                          api.CZRInput.prototype.ready.call( input);
                  },



                  //////////////////////////////////////////////////
                  ///SETUP SELECTS
                  //////////////////////////////////////////////////
                  //setup select on view_rendered|item_content_event_map
                  setupSelect : function() {
                          var input      = this;
                          if ( 'locations' == this.id )
                            this._setupLocationSelect();
                          if ( 'contexts' == this.id )
                            this._setupContextSelect();

                  },

                  //helper
                  _setupContextSelect : function() {
                          var input      = this,
                              input_contexts = input(),
                              item = input.input_parent,
                              module     = input.module;

                          //generates the contexts options
                          _.each( module.contexts, function( title, key ) {
                                var _attributes = {
                                      value : key,
                                      html: title
                                    };
                                if ( key == input_contexts || _.contains( input_contexts, key ) )
                                  $.extend( _attributes, { selected : "selected" } );

                                $( 'select[data-czrtype="contexts"]', input.container ).append( $('<option>', _attributes) );
                          });
                          //fire czrSelect2
                          $( 'select[data-czrtype="contexts"]', input.container ).czrSelect2();
                  },


                  //helper
                  //the refresh param is a bool
                  _setupLocationSelect : function(refresh ) {
                          var input      = this,
                              input_locations = input(),
                              item = input.input_parent,
                              module     = input.module,
                              available_locs = api.sidebar_insights('available_locations')();

                          //console.log('_setupLocationSelect', input(), module.locations );
                          //generates the locations options
                          //append them if not set yet
                          if ( ! $( 'select[data-czrtype="locations"]', input.container ).children().length ) {
                                _.each( module.locations, function( title, key ) {
                                      var _attributes = {
                                            value : key,
                                            html: title
                                          };

                                      if ( key == input_locations || _.contains( input_locations, key ) )
                                        $.extend( _attributes, { selected : "selected" } );

                                      $( 'select[data-czrtype="locations"]', input.container ).append( $('<option>', _attributes) );
                                });
                          }//if

                          function setAvailability( state ) {
                                if (! state.id) { return state.text; }
                                if (  _.contains(available_locs, state.element.value) ) { return state.text; }
                                var $state = $(
                                  '<span class="czr-unavailable-location fas fa-ban" title="' + widgetModuleLocalized.i18n.unavailableLocation + '">&nbsp;&nbsp;' + state.text + '</span>'
                                );
                                return $state;
                          }

                          if ( refresh ) {
                                $( 'select[data-czrtype="locations"]', input.container ).czrSelect2( 'destroy' );
                          }

                          //fire czrSelect2
                          $( 'select[data-czrtype="locations"]', input.container ).czrSelect2( {
                            templateResult: setAvailability,
                            templateSelection: setAvailability
                          });
                  },

                  //fired on view event map : 'locations:changed'
                  //@param obj { dom_el: $() , model : {} )
                  mayBeDisplayModelAlert : function() {
                          var input      = this,
                              item = input.input_parent,
                              module     = input.module;

                          //check if we are in the pre Item case => if so, the locations might be empty
                          if ( ! _.has( item(), 'locations') || _.isEmpty( item().locations ) )
                            return;

                          var _selected_locations = $('select[data-czrtype="locations"]', input.container ).val(),
                              available_locs = api.sidebar_insights('available_locations')(),
                              _unavailable = _.filter( _selected_locations, function( loc ) {
                                return ! _.contains(available_locs, loc);
                              });

                          //check if we are in the pre Item case => if so, the id is empty
                          if ( ! _.has( item(), 'id' ) || _.isEmpty( item().id ) ) {
                                module.preItem_location_alert_view_state.set( ! _.isEmpty( _unavailable ) ? 'expanded' : 'closed' );
                          } else {
                                item.czr_itemLocationAlert.set( ! _.isEmpty( _unavailable ) ? 'expanded' : 'closed' );
                          }
                  }
            },//CZRWZonesInputMths

      });//$.extend()

})( wp.customize , jQuery, _ );