var czrapp = czrapp || {};

/************************************************
* USER EXPERIENCE SUB CLASS
*************************************************/
(function($, czrapp) {
  var _methods =  {
        mayBePrintWelcomeNote : function() {
              if ( ! HUParams.isWelcomeNoteOn )
                return;
              var self = this;
              czrapp.welcomeNoteVisible = new czrapp.Value( false );
              //Listen to changes
              czrapp.welcomeNoteVisible.bind( function( visible ) {
                      return self._toggleWelcNote( visible );//returns a promise()
              }, { deferred : true } );

              czrapp.welcomeNoteVisible( true );
        },//mayBePrintWelcomeNote()


        _toggleWelcNote : function( visible ) {
              var self = this,
                  dfd = $.Deferred();

              var _hideAndDestroy = function() {
                    return $.Deferred( function() {
                          var _dfd_ = this,
                              $welcWrap = $('#bottom-welcome-note', '#footer');
                          if ( 1 == $welcWrap.length ) {
                                $welcWrap.css( { bottom : '-100%' } );
                                //remove and reset
                                _.delay( function() {
                                      $welcWrap.remove();
                                      _dfd_.resolve();
                                }, 450 );// consistent with css transition: all 0.45s ease-in-out;
                          } else {
                              _dfd_.resolve();
                          }
                    });
              };

              var _renderAndSetup = function() {
                    var _dfd_ = $.Deferred(),
                        $footer = $('#footer', '#wrapper');

                    //Render
                    $.Deferred( function() {
                          var dfd = this,
                              _html = HUParams.welcomeContent;
                          if ( 1 == $footer.length ) {
                                $footer.append( _html );
                                _.delay( function() {
                                      $('#bottom-welcome-note', '#footer').css( { bottom : 0 } );
                                      dfd.resolve();
                                }, 500 );
                          } else {
                                dfd.resolve();
                          }
                    }).done( function() {
                          //Listen to user actions
                          czrapp.setupDOMListeners(
                                [
                                      {
                                            trigger   : 'click keydown',
                                            selector  : '.close-note',
                                            actions   : function() {
                                                  czrapp.welcomeNoteVisible( false ).done( function() {
                                                        czrapp.doAjax( { action: "dismiss_welcome_front", withNonce : true } );
                                                  });
                                            }
                                      }
                                ],//actions to execute
                                { dom_el: $footer },//dom scope
                                self //instance where to look for the cb methods
                          );
                          _dfd_.resolve();
                    });
                    return _dfd_.promise();
              };//renderAndSetup

              if ( visible ) {
                    _.delay( function() {
                          _renderAndSetup().always( function() {
                                dfd.resolve();
                          });
                    }, 3000 );
              } else {
                    _hideAndDestroy().done( function() {
                          czrapp.welcomeNoteVisible( false );//should be already false
                          dfd.resolve();
                    });
              }

              //Always auto-collapse the infos block
              _.delay( function() {
                          czrapp.welcomeNoteVisible( false );
                    },
                    45000
              );
              return dfd.promise();
        }//_toggleWelcNote
  };//_methods{}

  czrapp.methods.UserXP = czrapp.methods.UserXP || {};
  $.extend( czrapp.methods.UserXP , _methods );

})(jQuery, czrapp);