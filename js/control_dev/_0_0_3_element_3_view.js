//MULTI CONTROL CLASS
//extends api.CZRBaseControl
//
//Setup the collection of items
//renders the element view
//Listen to items collection changes and update the control setting
var CZRElementMths = CZRElementMths || {};
$.extend( CZRElementMths, {
  //called before rendering a view
  //can be overriden to set a specific view template depending on the model properties
  //@return string
  getTemplateEl : function( type, model ) {
          var element = this, _el;
          switch(type) {
                case 'view' :
                  _el = element.viewTemplateEl;
                  break;
                case 'view-content' :
                  _el = element.viewContentTemplateEl;
                  break;
          }
          if ( _.isEmpty(_el) ) {
               throw new Error('No valid template has been found in getTemplateEl() ' + element.id + '. Aborting');
          } else {
              return _el;
          }
  },

  //helper
  //get the $ view DOM el from the item id
  getViewEl : function( item_id ) {
          var element = this;
          return $( '[data-id = "' + item_id + '"]', element.container );
  },


  //fired on add_item
  //fired on views_sorted
  closeAllViews : function(item_id) {
          var element = this,
              _current_collection = _.clone( element.get() ),
              _filtered_collection = _.filter( _current_collection , function( mod) { return mod.id != item_id; } );

          _.each( _filtered_collection, function(_item) {
                if ( element.czr_Item.has(_item.id) && 'expanded' == element.czr_Item(_item.id)._getViewState(_item.id) )
                  element.czr_Item(_item.id).czr_View.set( 'closed' ); // => will fire the cb _toggleViewExpansion
           } );
  },


  //make sure a given jQuery block is fully visible
  //@param $(el)
  _adjustScrollExpandedBlock : function( $_block_el, adjust ) {
          if ( ! $_block_el.length )
            return;
          var element = this,
               $_elementSection = $( '.accordion-section-content', element.section.container ),//was api.section( control.section() )
              _currentScrollTopVal = $_elementSection.scrollTop(),
              _scrollDownVal,
              _adjust = adjust || 90;

          setTimeout( function() {
                if ( ( $_block_el.offset().top + $_block_el.height() + _adjust ) > $(window.top).height() ) {
                    _scrollDownVal = $_block_el.offset().top + $_block_el.height() + _adjust - $(window.top).height();
                    if ( _scrollDownVal > 0 ) {
                        $_elementSection.animate({
                            scrollTop:  _currentScrollTopVal + _scrollDownVal
                        }, 500);
                    }
                }
          }, 50);
  },


  //close alert wrapper
  //+ deactivate the icon
  closeAllAlerts : function() {
          var element = this;
          $('.' + element.control.css_attr.remove_alert_wrapper, element.container ).each( function() {
                if ( $(this).hasClass('open') ) {
                      $(this).slideToggle( {
                            duration : 100,
                            done : function() {
                              $(this).toggleClass('open' , false );
                              //deactivate the icons
                              $(this).siblings().find('.' + element.control.css_attr.display_alert_btn).toggleClass('active' , false );
                            }
                      } );
                }
          });
  },


  //fired
  _makeItemsSortable : function(obj) {
          if ( wp.media.isTouchDevice || ! $.fn.sortable )
            return;
          var element = this;
          $( '.' + element.control.css_attr.views_wrapper, element.container ).sortable( {
                handle: '.' + element.control.css_attr.sortable_handle,
                update: function( event, ui ) {
                    element.set( element._getSortedDOMCollection() );
                }
              }
          );
  }
});//$.extend