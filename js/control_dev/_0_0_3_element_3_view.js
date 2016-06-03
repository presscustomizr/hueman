//MULTI CONTROL CLASS
//extends api.CZRBaseControl
//
//Setup the collection of items
//renders the control view
//Listen to items collection changes and update the control setting
var CZRElementMths = CZRElementMths || {};
$.extend( CZRElementMths, {
  //helper
  //get the $ view DOM el from the model id
  getViewEl : function( model_id ) {
          var control = this;
          return $( '[data-id = "' + model_id + '"]', control.container );
  },


  //fired on add_model
  //fired on views_sorted
  closeAllViews : function(model_id) {
          var control = this,
              _current_collection = _.clone( control.czr_Model.czr_collection.get() ),
              _filtered_collection = _.filter( _current_collection , function( mod) { return mod.id != model_id; } );

          _.map( _filtered_collection, function(_model) {

            if ( control.czr_Model.has(_model.id) && 'expanded' == control.czr_Model(_model.id)._getViewState(_model.id) )
              control.czr_Model(_model.id).czr_View.set( 'closed' ); // => will fire the cb _toggleViewExpansion
           } );
  },


  //make sure a given jQuery block is fully visible
  //@param $(el)
  _adjustScrollExpandedBlock : function( $_block_el, adjust ) {
          if ( ! $_block_el.length )
            return;
          var control = this,
               $_controlSection = $( '.accordion-section-content', api.section( control.section() ).container ),
              _currentScrollTopVal = $_controlSection.scrollTop(),
              _scrollDownVal,
              _adjust = adjust || 90;

          setTimeout( function() {
              if ( ( $_block_el.offset().top + $_block_el.height() + _adjust ) > $(window.top).height() ) {
                _scrollDownVal = $_block_el.offset().top + $_block_el.height() + _adjust - $(window.top).height();
                if ( _scrollDownVal > 0 ) {
                  $_controlSection.animate({
                      scrollTop:  _currentScrollTopVal + _scrollDownVal
                  }, 500);
                }
              }
          }, 50);
  },


  //close alert wrapper
  //+ deactivate the icon
  closeAllAlerts : function() {
          var control = this;
          $('.' + control.css_attr.remove_alert_wrapper, control.container ).each( function() {
            if ( $(this).hasClass('open') ) {
              $(this).slideToggle( {
                duration : 100,
                done : function() {
                  $(this).toggleClass('open' , false );
                  //deactivate the icons
                  $(this).siblings().find('.' + control.css_attr.display_alert_btn).toggleClass('active' , false );
                }
              } );
            }
          });
  },


  //fired
  _makeSortable : function(obj) {
          if ( wp.media.isTouchDevice || ! $.fn.sortable )
            return;
          var control = this;
          $( '.' + control.css_attr.views_wrapper, control.container ).sortable( {
              handle: '.' + control.css_attr.sortable_handle,
              update: function( event, ui ) {
                control.czr_Model.czr_collection.set( control._getSortedDOMCollection() );
              }
            }
          );
  }
});//$.extend