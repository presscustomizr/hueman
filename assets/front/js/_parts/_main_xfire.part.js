var czrapp = czrapp || {};

/************************************************
* LET'S DANCE
*************************************************/
jQuery(function ($) {
  var toLoad = {
    BrowserDetect : [],
    Czr_Plugins : [
        'imgSmartLoad',
        'extLinks',
        'parallax'
    ],
    Czr_UserExperience : [
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
    ],
  };
  czrapp.cacheProp().emitCustomEvents().loadCzr(toLoad);
});
