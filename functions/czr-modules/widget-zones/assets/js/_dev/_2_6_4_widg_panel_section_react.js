//extends api.CZRDynModule
//globals widgetModuleLocalized, themeServerControlParams
var WidgetAreaConstructor = WidgetAreaConstructor || {};
( function ( api, $, _ ) {
      $.extend( WidgetAreaConstructor, {

            /////////////////////////////////////////
            /// SET EXPANSION CALLBACKS FOR WIDGET PANEL AND WIDGET ZONE CREATION SECTION
            ////////////////////////////////////////
            //cb of : api.panel('widgets').expanded.callbacks.add
            widgetPanelReact : function() {
                  var module = this;
                  //will be used for adjustments
                  var _top_margin = api.panel('widgets').container.find( '.control-panel-content' ).css('margin-top');

                  api.section(module.serverParams.dynWidgetSection).fixTopMargin('value').set( _top_margin );

                  var _section_content = api.section(module.serverParams.dynWidgetSection).container.find( '.accordion-section-content' ),
                    _panel_content = api.panel('widgets').container.find( '.control-panel-content' ),
                    _set_margins = function() {
                          _section_content.css( 'margin-top', '' );
                          _panel_content.css('margin-top', api.section(module.serverParams.dynWidgetSection).fixTopMargin('value')() );
                    };

                  // Fix the top margin after reflow.
                  api.bind( 'pane-contents-reflowed', _.debounce( function() {
                        _set_margins();
                  }, 150 ) );

                  //Close all views on widget panel expansion/clos
                  module.closeAllItems().closeRemoveDialogs();
                  //Close preItem dialog box if exists
                  if ( _.has( module, 'preItemExpanded' ) )
                    module.preItemExpanded.set(false);
            },//widgetPanelReact()


            //cb of api.section(module.serverParams.dynWidgetSection).expanded.callbacks
            widgetSectionReact : function( to, from ) {
                  var module = this,
                      section =  api.section(module.serverParams.dynWidgetSection),
                      container = section.container.closest( '.wp-full-overlay-sidebar-content' ),
                      content = section.container.find( '.accordion-section-content' ),
                      overlay = section.container.closest( '.wp-full-overlay' ),
                      backBtn = section.container.find( '.customize-section-back' ),
                      sectionTitle = section.container.find( '.accordion-section-title' ).first(),
                      headerActionsHeight = $( '#customize-header-actions' ).height(),
                      resizeContentHeight, expand, position, scroll;

                  if ( to ) {
                        overlay.removeClass( 'section-open' );
                        content.css( 'height', 'auto' );
                        //section.container.removeClass( 'open' );
                        sectionTitle.attr( 'tabindex', '0' );
                        content.css( 'margin-top', '' );
                        container.scrollTop( 0 );
                  }

                  module.closeAllItems().closeRemoveDialogs();

                  content.slideToggle();
            }
      });//$.extend()
})( wp.customize , jQuery, _ );


