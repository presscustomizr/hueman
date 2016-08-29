/***************************
* ADD BROWSER DETECT METHODS
****************************/
(function($, czrapp) {
  var _methods =  {
    init : function() {
      // Chrome is Webkit, but Webkit is also Safari. If browser = ie + strips out the .0 suffix
      if ( $.browser.chrome )
          czrapp.$_body.addClass("chrome");
      else if ( $.browser.webkit )
          czrapp.$_body.addClass("safari");
      if ( $.browser.mozilla )
          czrapp.$_body.addClass("mozilla");
      else if ( $.browser.msie || '8.0' === $.browser.version || '9.0' === $.browser.version || '10.0' === $.browser.version || '11.0' === $.browser.version )
          czrapp.$_body.addClass("ie").addClass("ie" + $.browser.version.replace(/[.0]/g, ''));

      //Adds version if browser = ie
      if ( czrapp.$_body.hasClass("ie") )
          czrapp.$_body.addClass($.browser.version);
    }
  };//_methods{}

  $.extend( czrapp.methods.BrowserDetect = {} , _methods );

})(jQuery, czrapp);
