//MULTI CONTROL CLASS
//extends api.CZRBaseControl
//
//Setup the collection of items
//renders the module view
//Listen to items collection changes and update the control setting
var CZRModuleMths = CZRModuleMths || {};
$.extend( CZRModuleMths, {

  //fired on module.isReady.done()
  //the module.container is set. Either as the control.container or the single module wrapper in a sektion
  renderModuleParts : function() {
          var module = this,
              $_moduleContentEl = module.isInSektion() ? $( module.container ).find('.czr-mod-content') : $( module.container );

          //Crud modules => then let's add the crud module part tmpl
          if ( module.isCrud() ) {
                //do we have view template script?
                if ( 0 === $( '#tmpl-' + module.crudModulePart ).length ) {
                  throw new Error('No crud Module Part template for module ' + module.id + '. The template script id should be : #tmpl-' + module.crudModulePart );
                }

                //append the module wrapper to the column
                $_moduleContentEl.append( $( wp.template( module.crudModulePart )( {} ) ) );
          }

          $_moduleContentEl.append(
                $( '<ul/>', { class : [ module.control.css_attr.views_wrapper, module.module_type ].join(' ') } )
          );
  },

  //called before rendering a view
  //can be overriden to set a specific view template depending on the model properties
  //@return string
  getTemplateEl : function( type, model ) {
          var module = this, _el;
          switch(type) {
                case 'view' :
                  _el = module.viewTemplateEl;
                  break;
                case 'view-content' :
                  _el = module.viewContentTemplateEl;
                  break;
          }
          if ( _.isEmpty(_el) ) {
               throw new Error('No valid template has been found in getTemplateEl() ' + module.id + '. Aborting');
          } else {
              return _el;
          }
  },

  //helper
  //get the $ view DOM el from the item id
  getViewEl : function( id ) {
          var module = this;
          return $( '[data-id = "' + id + '"]', module.container );
  },


  //fired on add_item
  //fired on views_sorted
  closeAllViews : function(id) {
          var module = this,
              _current_collection = _.clone( module.get() ),
              _filtered_collection = _.filter( _current_collection , function( mod) { return mod.id != id; } );

          _.each( _filtered_collection, function(_item) {
                if ( module.czr_Item.has(_item.id) && 'expanded' == module.czr_Item(_item.id)._getViewState(_item.id) )
                  module.czr_Item(_item.id).czr_ItemState.set( 'closed' ); // => will fire the cb toggleViewExpansion
           } );
  },


  //make sure a given jQuery block is fully visible
  //@param $(el)
  _adjustScrollExpandedBlock : function( $_block_el, adjust ) {
          if ( ! $_block_el.length || _.isUndefined( this.getModuleSection() ) )
            return;
          var module = this,
               $_moduleSection = $( '.accordion-section-content', module.section.container ),//was api.section( control.section() )
              _currentScrollTopVal = $_moduleSection.scrollTop(),
              _scrollDownVal,
              _adjust = adjust || 90;

          setTimeout( function() {
                if ( ( $_block_el.offset().top + $_block_el.height() + _adjust ) > $(window.top).height() ) {
                    _scrollDownVal = $_block_el.offset().top + $_block_el.height() + _adjust - $(window.top).height();
                    if ( _scrollDownVal > 0 ) {
                        $_moduleSection.animate({
                            scrollTop:  _currentScrollTopVal + _scrollDownVal
                        }, 500);
                    }
                }
          }, 50);
  },



  //close alert wrapper
  //+ deactivate the icon
  closeAllAlerts : function() {
          var module = this;
          $('.' + module.control.css_attr.remove_alert_wrapper, module.container ).each( function() {
                if ( $(this).hasClass('open') ) {
                      $(this).slideToggle( {
                            duration : 100,
                            done : function() {
                              $(this).toggleClass('open' , false );
                              //deactivate the icons
                              $(this).siblings().find('.' + module.control.css_attr.display_alert_btn).toggleClass('active' , false );
                            }
                      } );
                }
          });
  },


  //fired
  _makeItemsSortable : function(obj) {
          if ( wp.media.isTouchDevice || ! $.fn.sortable )
            return;
          var module = this;
          $( '.' + module.control.css_attr.views_wrapper, module.container ).sortable( {
                handle: '.' + module.control.css_attr.sortable_handle,
                update: function( event, ui ) {
                    module.set( module._getSortedDOMCollection() );
                }
              }
          );
  }
});//$.extend