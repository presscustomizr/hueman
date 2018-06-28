//extends api.CZRDynModule
//globals widgetModuleLocalized, themeServerControlParams
var WidgetAreaConstructor = WidgetAreaConstructor || {};
( function ( api, $, _ ) {
      $.extend( WidgetAreaConstructor, {
            /////////////////////////////////////////
            /// OVERRIDEN METHODS
            ////////////////////////////////////////
            //fired in toggleItemExpansion()
            //has to be overridden for the widget zones control because this control is embedded directly in a panel and not in a section
            //therefore the module to animate the scrollTop is not the section container but $('.wp-full-overlay-sidebar-content')
            _adjustScrollExpandedBlock : function( $_block_el, adjust ) {
                  if ( ! $_block_el.length )
                    return;
                  var module = this,
                      _currentScrollTopVal = $('.wp-full-overlay-sidebar-content').scrollTop(),
                      _scrollDownVal,
                      _adjust = adjust || 90;
                  setTimeout( function() {
                        if ( ( $_block_el.offset().top + $_block_el.height() + _adjust ) > $(window.top).height() ) {
                          _scrollDownVal = $_block_el.offset().top + $_block_el.height() + _adjust - $(window.top).height();
                          $('.wp-full-overlay-sidebar-content').animate({
                              scrollTop:  _currentScrollTopVal + _scrollDownVal
                          }, 600);
                        }
                  }, 50);
            },



            //overrides the parent class default model getter
            //=> add a dynamic title
            getDefaultItemModel : function( id ) {
                    var module = this,
                        _current_collection = module.itemCollection(),
                        _default = _.clone( module.defaultItemModel ),
                        _default_contexts = _default.contexts;
                    return $.extend( _default, {
                        title : 'Widget Zone ' +  ( _.size(_current_collection)*1 + 1 )
                        //contexts : module._getMatchingContexts( _default_contexts )
                      });
            },


            _toggleLocationAlertExpansion : function( $view, to ) {
                    var $_alert_el = $view.find('.czr-location-alert');
                    if ( ! $_alert_el.length ) {
                          var _html = [
                            '<span>' + widgetModuleLocalized.i18n.locationWarning + '</span>',
                            api.CZR_Helpers.getDocSearchLink( widgetModuleLocalized.i18n.locationWarning ),
                          ].join('');

                          $_alert_el = $('<div/>', {
                                class:'czr-location-alert',
                                html:_html,
                                style:"display:none"
                          });

                          $('select[data-czrtype="locations"]', $view ).closest('div').after($_alert_el);
                    }
                    $_alert_el.toggle( 'expanded' == to);
            }
      });//$.extend()
})( wp.customize , jQuery, _ );


