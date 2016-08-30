var czrapp = czrapp || {};

/************************************************
* USER EXPERIENCE SUB CLASS
*************************************************/
(function($, czrapp) {
  var _methods =  {
        init : function() {
            this.timer = 0;
            this.increment = 1;//used to wait a little bit after the first user scroll actions to trigger the timer
        },//init


        //outline firefox fix, see https://github.com/presscustomizr/customizr/issues/538
        outline: function() {
          if ( czrapp.$_body.hasClass( 'mozilla' ) && 'function' == typeof( tcOutline ) )
          tcOutline();
        },

        //SMOOTH SCROLL
        smoothScroll: function() {
          if ( HUParams.SmoothScroll && HUParams.SmoothScroll.Enabled )
            smoothScroll( HUParams.SmoothScroll.Options );
        },





        /*  Toggle header search
        /* ------------------------------------ */
        toggleHeaderSearch : function() {
          $('.toggle-search').click(function(){
            $('.toggle-search').toggleClass('active');
            $('.search-expand').fadeToggle(250);
                    setTimeout(function(){
                        $('.search-expand input').focus();
                    }, 300);
          });
        },

        /*  Scroll to top
        /* ------------------------------------ */
        scrollToTop : function() {
          $('a#back-to-top').click(function() {
            $('html, body').animate({scrollTop:0},'slow');
            return false;
          });
        },


        /*  Tabs widget
        /* ------------------------------------ */
        widgetTabs : function() {
            var $tabsNav       = $('.alx-tabs-nav'),
              $tabsNavLis    = $tabsNav.children('li'),
              $tabsContainer = $('.alx-tabs-container');

            $tabsNav.each(function() {
              var $this = $(this);
              $this.next().children('.alx-tab').stop(true,true).hide()
              .siblings( $this.find('a').attr('href') ).show();
              $this.children('li').first().addClass('active').stop(true,true).show();
            });

            $tabsNavLis.on('click', function(e) {
              var $this = $(this);

              $this.siblings().removeClass('active').end()
              .addClass('active');

              $this.parent().next().children('.alx-tab').stop(true,true).hide()
              .siblings( $this.find('a').attr('href') ).fadeIn();
              e.preventDefault();
            }).children( window.location.hash ? 'a[href="' + window.location.hash + '"]' : 'a:first' ).trigger('click');
        },

        /*  Comments / pingbacks tabs
        /* ------------------------------------ */
        commentTabs : function() {
            $(".comment-tabs li").click(function() {
                $(".comment-tabs li").removeClass('active');
                $(this).addClass("active");
                $(".comment-tab").hide();
                var selected_tab = $(this).find("a").attr("href");
                $(selected_tab).fadeIn();
                return false;
            });
        },


        /*  Table odd row class
        /* ------------------------------------ */
        tableStyle : function() {
          $('table tr:odd').addClass('alt');
        },


        /*  Sidebar collapse
        /* ------------------------------------ */
        sidebarCollapse : function() {
          $('body').addClass('s1-collapse');
          $('body').addClass('s2-collapse');

          $('.s1 .sidebar-toggle').click(function(){
            $('body').toggleClass('s1-collapse').toggleClass('s1-expand');
            if ($('body').is('.s2-expand')) {
              $('body').toggleClass('s2-expand').toggleClass('s2-collapse');
            }
          });
          $('.s2 .sidebar-toggle').click(function(){
            $('body').toggleClass('s2-collapse').toggleClass('s2-expand');
            if ($('body').is('.s1-expand')) {
              $('body').toggleClass('s1-expand').toggleClass('s1-collapse');
            }
          });
        },



        /*  Dropdown menu animation
        /* ------------------------------------ */
        dropdownMenu : function() {
          $('.nav ul.sub-menu').hide();
          $('.nav li').hover(
            function() {
              $(this).children('ul.sub-menu').slideDown('fast');
            },
            function() {
              $(this).children('ul.sub-menu').hide();
            }
          );
        },


        /*  Mobile menu smooth toggle height
        /* ------------------------------------ */
        mobileMenu : function() {
          $('.nav-toggle').on('click', function() {
            slide($('.nav-wrap .nav', $(this).parent()));
          });

          function slide(content) {
            var wrapper = content.parent();
            var contentHeight = content.outerHeight(true);
            var wrapperHeight = wrapper.height();

            wrapper.toggleClass('expand');
            if (wrapper.hasClass('expand')) {
            setTimeout(function() {
              wrapper.addClass('transition').css('height', contentHeight);
            }, 10);
          }
          else {
            setTimeout(function() {
              wrapper.css('height', wrapperHeight);
              setTimeout(function() {
              wrapper.addClass('transition').css('height', 0);
              }, 10);
            }, 10);
          }

          wrapper.one('transitionEnd webkitTransitionEnd transitionend oTransitionEnd msTransitionEnd', function() {
            if(wrapper.hasClass('open')) {
              wrapper.removeClass('transition').css('height', 'auto');
            }
          });
          }
        },






















        //Helpers
        //Check if the passed element(s) contains an iframe
        //@return list of containers
        //@param $_elements = mixed
        _has_iframe : function ( $_elements ) {
          var that = this,
              to_return = [];
          _.map( $_elements, function( $_el, container ){
            if ( $_el.length > 0 && $_el.find('IFRAME').length > 0 )
              to_return.push(container);
          });
          return to_return;
        }

  };//_methods{}

  czrapp.methods.Czr_UserExperience = {};
  $.extend( czrapp.methods.Czr_UserExperience , _methods );

})(jQuery, czrapp);
