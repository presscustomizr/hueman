var czrapp = czrapp || {};
/***************************
* ADD JQUERY PLUGINS METHODS
****************************/
(function($, czrapp) {
  var _methods = {
    //IMG SMART LOAD
    //.article-container covers all post / page content : single and list
    //__before_main_wrapper covers the single post thumbnail case
    //.widget-front handles the featured pages
    imgSmartLoad : function() {
      var smartLoadEnabled = 1 == HUParams.imgSmartLoadEnabled,
          //Default selectors for where are : $( '.article-container, .__before_main_wrapper, .widget-front' ).find('img');
          _where           = HUParams.imgSmartLoadOpts.parentSelectors.join();

      //Smart-Load images
      //imgSmartLoad plugin will trigger the smartload event when the img will be loaded
      //the centerImages plugin will react to this event centering them
      if (  smartLoadEnabled )
        $( _where ).imgSmartLoad(
          _.size( HUParams.imgSmartLoadOpts.opts ) > 0 ? HUParams.imgSmartLoadOpts.opts : {}
        );

      //If the centerAllImg is on we have to ensure imgs will be centered when simple loaded,
      //for this purpose we have to trigger the simple-load on:
      //1) imgs which have been excluded from the smartloading if enabled
      //2) all the images in the default 'where' if the smartloading isn't enaled
      //simple-load event on holders needs to be triggered with a certain delay otherwise holders will be misplaced (centering)
      if ( 1 == HUParams.centerAllImg ) {
        var self                   = this,
            $_to_center            = smartLoadEnabled ?
               $( _.filter( $( _where ).find('img'), function( img ) {
                  return $(img).is(HUParams.imgSmartLoadOpts.opts.excludeImg.join());
                }) ): //filter
                $( _where ).find('img');
            $_to_center_with_delay = $( _.filter( $_to_center, function( img ) {
                return $(img).hasClass('tc-holder-img');
            }) );

        //imgs to center with delay
        setTimeout( function(){
          self.triggerSimpleLoad( $_to_center_with_delay );
        }, 300 );
        //all other imgs to center
        self.triggerSimpleLoad( $_to_center );
      }
    },


    //FIRE EXT LINKS PLUGIN
    //May be add (check if activated by user) external class + target="_blank" to relevant links
    //images are excluded by default
    //links inside post/page content
    extLinks : function() {
      if ( ! HUParams.extLinksStyle && ! HUParams.extLinksTargetExt )
        return;
      $('a' , '.post-inner .entry').extLinks({
          addIcon : HUParams.extLinksStyle,
          iconClassName : 'hu-external',
          newTab : HUParams.extLinksTargetExt,
          skipSelectors : _.isObject(HUParams.extLinksSkipSelectors) ? HUParams.extLinksSkipSelectors : {}
      });
    },

    parallax : function() {
      $( '.parallax-item' ).czrParallax();
    },
  };//_methods{}

  $.extend( czrapp.methods.Czr_Plugins = {} , _methods );

})(jQuery, czrapp);
