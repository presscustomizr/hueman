var czrapp = czrapp || {};

/************************************************
* LET'S DANCE
*************************************************/
jQuery(function ($) {
      czrapp
            .cacheProp()
            .loadCzr( {
                  BrowserDetect : [],
                  Czr_Plugins : [
                        'imgSmartLoad',
                        'extLinks',
                        'parallax'
                  ],
                  Czr_UserExperience : [
                        'stickify',
                        'outline',
                        'smoothScroll',
                        'toggleHeaderSearch',
                        'scrollToTop',
                        'widgetTabs',
                        'commentTabs',
                        'tableStyle',
                        'sidebarCollapse',
                        'dropdownMenu',
                        'mobileMenu'
                  ]
            } );
});
