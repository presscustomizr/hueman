
( function ( api, $, _ ) {
      /*****************************************************************************
      * OBSERVE UBIQUE CONTROL'S SECTIONS EXPANSION
      *****************************************************************************/
      if ( 'function' === typeof api.Section ) {
            //move controls back and forth in declared ubique sections
            //=> implemented in the customizr theme for the social links boolean visibility controls ( socials in header, sidebar, footer )
            api.control.bind( 'add', function( _ctrl ) {
                  if ( _ctrl.params.ubq_section && _ctrl.params.ubq_section.section ) {
                        //save original state
                        _ctrl.params.original_priority = _ctrl.params.priority;
                        _ctrl.params.original_section  = _ctrl.params.section;

                        api.section.when( _ctrl.params.ubq_section.section, function( _section_instance ) {
                                _section_instance.expanded.bind( function( expanded ) {
                                      if ( expanded ) {
                                            if ( _ctrl.params.ubq_section.priority ) {
                                                  _ctrl.priority( _ctrl.params.ubq_section.priority );
                                            }
                                            _ctrl.section( _ctrl.params.ubq_section.section );
                                      }
                                      else {
                                            _ctrl.priority( _ctrl.params.original_priority );
                                            _ctrl.section( _ctrl.params.original_section );
                                      }
                                });

                        } );
                  }
            });
      }


      /*****************************************************************************
      * OBSERVE UBIQUE CONTROL'S PANELS EXPANSION
      *****************************************************************************/
      if ( 'function' === typeof api.Panel ) {
            //move section back and forth in declared ubique panels
            api.section.bind( 'add', function( _sec ) {
                  if ( _sec.params.ubq_panel && _sec.params.ubq_panel.panel ) {
                        //save original state
                        _sec.params.original_priority = _sec.params.priority;
                        _sec.params.original_panel  = _sec.params.panel;

                        api.panel.when( _sec.params.ubq_panel.panel, function( _panel_instance ) {
                                _panel_instance.expanded.bind( function( expanded ) {
                                      if ( expanded ) {
                                            if ( _sec.params.ubq_panel.priority ) {
                                                  _sec.priority( _sec.params.ubq_panel.priority );
                                            }
                                            _sec.panel( _sec.params.ubq_panel.panel );
                                      }
                                      else {
                                            _sec.priority( _sec.params.original_priority );
                                            _sec.panel( _sec.params.original_panel );
                                      }
                                });

                        } );
                  }
            });
      }


      /*****************************************************************************
      * CLOSE THE MOD OPTION PANEL ( if exists ) ON : section change, panel change, skope switch
      *****************************************************************************/
      //@return void()
      var _closeModOpt = function() {
            if ( ! _.has( api, 'czr_ModOptVisible') )
              return;
            api.czr_ModOptVisible(false);
      };
      api.bind('ready', function() {
            api.czr_activeSectionId.bind( _closeModOpt );
            api.czr_activePanelId.bind( _closeModOpt );
      });
})( wp.customize , jQuery, _);
( function ( api, $, _ ) {

      api.bind( 'ready', function() {
            /*****************************************************************************
            * ADD PRO BEFORE SPECIFIC SECTIONS AND PANELS
            *****************************************************************************/
            if ( window.themeServerControlParams && themeServerControlParams.isPro ) {
                  _.each( [
                        //WFC
                        'tc_font_customizer_settings',

                        //hueman pro
                        'contx_header_bg',
                        'content_blog_sec',
                        'static_front_page',
                        'content_single_sec',

                        //customizr-pro
                        'tc_fpu',
                        'nav',
                        'post_lists_sec',
                        'galleries_sec',
                        'footer_customizer_sec',
                        'custom_scripts_sec',
                        'contact_info_sec'

                  ], function( _secId ) {
                        _.delay( function() {
                            api.section.when( _secId, function( _sec_ ) {
                                  if ( 1 >= _sec_.headContainer.length ) {
                                      _sec_.headContainer.find('.accordion-section-title').prepend( '<span class="pro-title-block">Pro</span>' );
                                  }
                            });
                        }, 1000 );
                  });
                  _.each( [
                        //hueman pro
                        //'hu-header-panel',
                        //'hu-content-panel',

                        //customizr-pro
                        //'tc-header-panel',
                        //'tc-content-panel',
                        //'tc-footer-panel',
                        //'tc-advanced-panel'
                  ], function( _secId ) {
                        api.panel.when( _secId, function( _sec_ ) {
                              if ( 1 >= _sec_.headContainer.length ) {
                                  _sec_.headContainer.find('.accordion-section-title').prepend( '<span class="pro-title-block">Pro</span>' );
                              }
                        });
                  });
            }


            /*****************************************************************************
            * PRO SECTION OVERRIDE
            *****************************************************************************/
            if ( ! themeServerControlParams.isPro && _.isFunction( api.Section ) ) {
                  proSectionInstance = api.section('go_pro_sec');
                  if ( ! _.isObject( proSectionInstance ) )
                    return;

                  // No events for this type of section.
                  proSectionInstance.attachEvents = function () {};
                  // Always make the section active.
                  proSectionInstance.isContextuallyActive = function () {
                    return this.active();
                  };
                  proSectionInstance._toggleActive = function(){ return true; };

                  proSectionInstance.active( true );
            }
      });

})( wp.customize , jQuery, _);
//named czr_multiple_picker in the php setting map
var CZRMultiplePickerMths = CZRMultiplePickerMths || {};
/* Multiple Picker */
/**
 * @constructor
 * @augments wp.customize.Control
 * @augments wp.customize.Class
 */
( function ( api, $, _ ) {
$.extend( CZRMultiplePickerMths , {
      ready: function() {
            var control  = this,
                _select  = this.container.find('select');


            _select.czrSelect2({
                  closeOnSelect: false,
                  templateSelection: czrEscapeMarkup
            });

            function czrEscapeMarkup(obj) {
                  //trim dashes
                  return obj.text.replace(/\u2013|\u2014/g, "");
            }

            //handle case when all choices become unselected
            _select.on('change', function(e){
                  if ( 0 === $(this).find("option:selected").length )
                    control.setting.set([]);
            });
      }
});//$.extend
})( wp.customize , jQuery, _ );
//named czr_cropped_image in the php setting map
var CZRCroppedImageMths = CZRCroppedImageMths || {};

(function (api, $, _) {
      /* IMAGE UPLOADER CONTROL IN THE CUSTOMIZER */
      //CroppedImageControl is not available before wp 4.3
      if ( 'function' != typeof wp.media.controller.Cropper  || 'function' != typeof api.CroppedImageControl  )
        return;


      /* CZRCustomizeImage Cropper */
      /**
      * Custom version of:
      * wp.media.controller.CustomizeImageCropper (wp-includes/js/media-views.js)
      *
      * In order to use image destination sizes different than the suggested ones
      *
      * A state for cropping an image.
      *
      * @class
      * @augments wp.media.controller.Cropper
      * @augments wp.media.controller.State
      * @augments Backbone.Model
      */
      wp.media.controller.CZRCustomizeImageCropper = wp.media.controller.Cropper.extend({
            doCrop: function( attachment ) {
                  var cropDetails = attachment.get( 'cropDetails' ),
                      control = this.get( 'control' );

                  cropDetails.dst_width  = control.params.dst_width;
                  cropDetails.dst_height = control.params.dst_height;

                  return wp.ajax.post( 'crop-image', {
                        wp_customize: 'on',
                        nonce: attachment.get( 'nonces' ).edit,
                        id: attachment.get( 'id' ),
                        context: control.id,
                        cropDetails: cropDetails
                  } );
            }
      });



      /* CZRCroppedImageControl */
      $.extend( CZRCroppedImageMths , {
            /**
            * Create a media modal select frame, and store it so the instance can be reused when needed.
            * CZR: We don't want to crop svg (cropping fails), gif (animated gifs become static )
            * @Override
            * We need to override this in order to use our ImageCropper custom extension of wp.media.controller.Cropper
            *
            * See api.CroppedImageControl:initFrame() ( wp-admin/js/customize-controls.js )
            */
            initFrame: function() {

                  var l10n = _wpMediaViewsL10n;

                  this.frame = wp.media({
                        button: {
                            text: l10n.select,
                            close: false
                        },
                        states: [
                            new wp.media.controller.Library({
                                title: this.params.button_labels.frame_title,
                                library: wp.media.query({ type: 'image' }),
                                multiple: false,
                                date: false,
                                priority: 20,
                                suggestedWidth: this.params.width,
                                suggestedHeight: this.params.height
                            }),
                            new wp.media.controller.CZRCustomizeImageCropper({
                                imgSelectOptions: this.calculateImageSelectOptions,
                                control: this
                            })
                        ]
                  });

                  this.frame.on( 'select', this.onSelect, this );
                  this.frame.on( 'cropped', this.onCropped, this );
                  this.frame.on( 'skippedcrop', this.onSkippedCrop, this );
            },

            /**
            * After an image is selected in the media modal, switch to the cropper
            * state if the image isn't the right size.
            *
            * CZR: We don't want to crop svg (cropping fails), gif (animated gifs become static )
            * @Override
            * See api.CroppedImageControl:onSelect() ( wp-admin/js/customize-controls.js )
            */
            onSelect: function() {
                  var attachment = this.frame.state().get( 'selection' ).first().toJSON();
                  if ( ! ( attachment.mime && attachment.mime.indexOf("image") > -1 ) ){
                        //Todo: better error handling, show some message?
                        this.frame.trigger( 'content:error' );
                        return;
                  }
                  if ( ( _.contains( ['image/svg+xml', 'image/gif'], attachment.mime ) ) || //do not crop gifs or svgs
                          this.params.width === attachment.width && this.params.height === attachment.height && ! this.params.flex_width && ! this.params.flex_height ) {
                        this.setImageFromAttachment( attachment );
                        this.frame.close();
                  } else {
                        this.frame.setState( 'cropper' );
                  }
            },
      });//extend
})( wp.customize, jQuery, _);

//named czr_upload in the php setting map
var CZRUploadMths = CZRUploadMths || {};
( function ( api, $, _ ) {
/**
 * @constructor
 * @augments wp.customize.Control
 * @augments wp.customize.Class
 */
$.extend( CZRUploadMths, {
      ready: function() {
            var control = this;

            this.params.removed = this.params.removed || '';

            this.success = $.proxy( this.success, this );

            this.uploader = $.extend({
                  container: this.container,
                  browser:   this.container.find('.czr-upload'),
                  //dropzone:  this.container.find('.upload-dropzone'),
                  success:   this.success,
                  plupload:  {},
                  params:    {}
            }, this.uploader || {} );

            if ( control.params.extensions ) {
                  control.uploader.plupload.filters = [{
                    title:      api.l10n.allowedFiles,
                    extensions: control.params.extensions
                  }];
            }

            if ( control.params.context )
              control.uploader.params['post_data[context]'] = this.params.context;

            if ( api.settings.theme.stylesheet )
              control.uploader.params['post_data[theme]'] = api.settings.theme.stylesheet;

            this.uploader = new wp.Uploader( this.uploader );

            this.remover = this.container.find('.remove');
            this.remover.on( 'click keydown', function( event ) {
                  if ( event.type === 'keydown' &&  13 !== event.which ) // enter
                    return;
                  control.setting.set( control.params.removed );
                  event.preventDefault();
            });

            this.removerVisibility = $.proxy( this.removerVisibility, this );
            this.setting.bind( this.removerVisibility );
            this.removerVisibility( this.setting() );
      },


      success: function( attachment ) {
            this.setting.set( attachment.get('id') );
      },
      removerVisibility: function( to ) {
            this.remover.toggle( to != this.params.removed );
      }
});//extend
})( wp.customize , jQuery, _ );
//named czr_layouts in the php setting map
var CZRLayoutSelectMths = CZRLayoutSelectMths || {};
( function ( api, $, _ ) {
$.extend( CZRLayoutSelectMths , {
      ready: function() {
            this.setupSelect();
      },

      setupSelect : function( obj ) {
            var control = this;
                $_select  = this.container.find('select');

            function addImg( state ) {
                  if (! state.id) { return state.text; }
                  if ( ! _.has( control.params.layouts, state.element.value ) )
                    return;

                  var _layout_data = control.params.layouts[state.element.value],
                      _src = _layout_data.src,
                      _title = _layout_data.label,
                      $state = $(
                    '<img src="' + _src +'" class="czr-layout-img" title="' + _title + '" /><span class="czr-layout-title">' + _title + '</span>'
                  );
                  return $state;
            }

            //destroy selected if set
            //$_select.selecter("destroy");

            //fire czrSelect2
            $_select.czrSelect2( {
                  templateResult: addImg,
                  templateSelection: addImg,
                  minimumResultsForSearch: Infinity
            });
      },
});//$.extend
})( wp.customize , jQuery, _ );
( function ( api, $, _ ) {
      //THEME CONTROLS
      //api.CZRBackgroundControl     = api.CZRItemControl.extend( CZRBackgroundMths );

      //api.CZRWidgetAreasControl    = api.CZRDynModule.extend( CZRWidgetAreasMths );

      api.CZRUploadControl          = api.Control.extend( CZRUploadMths );
      api.CZRLayoutControl          = api.Control.extend( CZRLayoutSelectMths );
      api.CZRMultiplePickerControl  = api.Control.extend( CZRMultiplePickerMths );
      api.CZRColorAlpha = api.Control.extend({ready: api.ColorControl.prototype.ready});//api.CZRColorAlpha

      $.extend( api.controlConstructor, {
            czr_upload     : api.CZRUploadControl,
            //czr_sidebars   : api.CZRWidgetAreasControl,
            //czr_socials    : api.CZRSocialControl,
            czr_multiple_picker : api.CZRMultiplePickerControl,
            czr_layouts    : api.CZRLayoutControl,
            wp_color_alpha : api.CZRColorAlpha,
            //czr_background : api.CZRBackgroundControl
      });

      if ( 'function' == typeof api.CroppedImageControl ) {
            api.CZRCroppedImageControl   = api.CroppedImageControl.extend( CZRCroppedImageMths );

            $.extend( api.controlConstructor, {
                  czr_cropped_image : api.CZRCroppedImageControl
            });
      }

      if ( 'function' == typeof api.CodeEditorControl ) {
            $.extend( api.controlConstructor, {
                  czr_code_editor : api.CodeEditorControl
            });
      }

})( wp.customize, jQuery, _ );
( function (api, $, _) {
      var $_nav_section_container,
          i18n = serverControlParams.i18n || {};

      api.czr_CrtlDependenciesReady = $.Deferred();

      api.bind( 'ready' , function() {
            if ( _.has( api, 'czr_ctrlDependencies') )
              return;

            api.czr_ctrlDependencies = new api.CZR_ctrlDependencies();
            api.czr_CrtlDependenciesReady.resolve();
      } );


      api.CZR_ctrlDependencies = api.Class.extend( {
              dominiDeps : [],
              initialize: function() {
                    var self = this;

                    this.defaultDominusParams = {
                          dominus : '',
                          servi : [],
                          visibility : null,
                          actions : null,
                          onSectionExpand : true
                    };

                    //store the default control dependencies
                    this.dominiDeps = _.extend( this.dominiDeps, this._getControlDeps() );
                    if ( ! _.isArray( self.dominiDeps ) ) {
                        throw new Error('Visibilities : the dominos dependency array is not an array.');
                    }
                    api.czr_activeSectionId.bind( function( section_id ) {
                          if ( ! _.isEmpty( section_id ) && api.section.has( section_id ) ) {
                                try {
                                      self.setServiDependencies( section_id );
                                } catch( er ) {
                                      api.errorLog( 'In api.CZR_ctrlDependencies : ' + er );
                                }
                          }
                    });


                    //@param target_source is an object :
                    // {
                    //    target : section_id to awake
                    //    source : section_id from which the request for awaking has been done
                    // }
                    api.bind( 'awaken-section', function( target_source ) {
                          try {
                                self.setServiDependencies( target_source.target, target_source.source );
                          } catch( er ) {
                                api.errorLog( 'On awaken-section, ctrl deps : ' + er );
                          }
                    });

                    //FAVICON SPECIFICS
                    //@todo => move to the theme ?
                    //favicon note on load and on change(since wp 4.3)
                    this._handleFaviconNote();
              },


              //Process the visibility callbacks for the controls of a target targetSectionId
              //@param targetSectionId : string
              //@param sourceSectionId : string, the section from which the request has been done
              setServiDependencies : function( targetSectionId, sourceSectionId, refresh ) {
                    var self = this, params, dfd = $.Deferred();

                    refresh = refresh || false;

                    if ( _.isUndefined( targetSectionId ) || ! api.section.has( targetSectionId ) ) {
                          throw new Error( 'Control Dependencies : the targetSectionId is missing or not registered : ' + targetSectionId );
                    }

                    //Assign a visibility state deferred to the target section
                    api.section( targetSectionId ).czr_ctrlDependenciesReady = api.section( targetSectionId ).czr_ctrlDependenciesReady || $.Deferred();

                    //Bail here if this section has already been setup for ctrl dependencies
                    if ( ! refresh && 'resolved' == api.section( targetSectionId ).czr_ctrlDependenciesReady.state() )
                      return dfd.resolve().promise();

                    //FIND DOMINI IN THE TARGET SECTION
                    //=> setup their callbacks
                    _.each( self.dominiDeps , function( params ) {
                          if ( ! _.has( params, 'dominus' ) || ! _.isString( params.dominus ) || _.isEmpty( params.dominus ) ) {
                                throw new Error( 'Control Dependencies : a dominus control id must be a not empty string.');
                          }

                          var wpDominusId = api.CZR_Helpers.build_setId( params.dominus );
                          if ( ! api.control.has( wpDominusId ) )
                            return;

                          if ( api.control( wpDominusId ).section() != targetSectionId )
                            return;

                          //Attempt to normalize the params
                          params = self._prepareDominusParams( params );
                          if ( _.isEmpty(params) )
                            return;

                          self._processDominusCallbacks( params.dominus, params, refresh )
                                .fail( function() {
                                      api.consoleLog( 'self._processDominusCallbacks fail for section ' + targetSectionId );
                                      dfd.reject();
                                })
                                .done( function() {
                                      dfd.resolve();
                                });
                    });


                    //EXTERNAL DOMINI : AWAKE THE SECTIONS
                    //check if any control of the current section is the servus of a dominus located in another section
                    var _secCtrls = api.CZR_Helpers.getSectionControlIds( targetSectionId ),
                        _getServusDomini = function( shortServudId ) {
                              var _dominiIds = [];
                              _.each( self.dominiDeps , function( params ) {
                                    if ( ! _.has( params, 'servi' ) || ! _.isArray( params.servi ) || ! _.has( params, 'dominus' ) || _.isEmpty( params.dominus ) ) {
                                          api.errorLog( 'Control Dependencies : wrong params in _getServusDomini.');
                                          return;
                                    }

                                    if ( _.contains( params.servi , shortServudId ) && ! _.contains( _dominiIds , params.dominus ) ) {
                                          //Attempt to normalize the params
                                          params = self._prepareDominusParams( params );
                                          if ( _.isEmpty(params) )
                                            return;
                                          else
                                            _dominiIds.push( params.dominus );
                                    }
                              });
                              return ! _.isArray( _dominiIds ) ? [] : _dominiIds;
                        },
                        _servusDominiIds = [];

                    //Build the domini array
                    _.each( _secCtrls, function( servusCandidateId ) {
                          if ( _.isEmpty( _getServusDomini( servusCandidateId ) ) )
                            return;

                          _servusDominiIds = _.union( _servusDominiIds, _getServusDomini( servusCandidateId ) );
                    });

                    //let's loop on the domini ids and check if we need to "awake" an external section
                    _.each( _servusDominiIds, function( shortDominusId ){

                          var wpDominusId = api.CZR_Helpers.build_setId( shortDominusId );
                          //This dominus must be located in another section
                          if ( api.control( wpDominusId ).section() == targetSectionId )
                              return;
                          //The dominus section can't be the current source if set. => otherwise potential infinite loop scenario.
                          if ( sourceSectionId == api.control( wpDominusId ).section() )
                              return;
                          //inform the api that a section has to be awaken
                          //=> first silently update the section controls if skope on
                          //=> then fire the visibilities
                          api.trigger( 'awaken-section', {
                                target : api.control( wpDominusId ).section(),
                                source : targetSectionId
                          } );
                    } );

                    //This section has been setup for ctrl dependencies
                    dfd.always( function() {
                          api.section( targetSectionId ).czr_ctrlDependenciesReady.resolve();
                    });
                    return dfd.promise();
              },


              //This method fires a callback when a control is registered in the api.
              //If the control is registered, then it fires the callback when it is embedded
              //If the control is embedeed, it fires the callback
              //=> typical use case : a control can be both removed from the API and the DOM, and then added back on skope switch
              //
              //@param wpCtrlId : string name of the control as registered in the WP API
              //@param callback : fn callback to fire
              //@param args : [] or callback arguments
              _deferCallbackForControl : function( wpCrtlId, callback, args ) {
                    var dfd = $.Deferred();
                    if ( _.isEmpty(wpCrtlId) || ! _.isString(wpCrtlId) ) {
                        throw new Error( '_deferCallbackForControl : the control id is missing.' );
                    }
                    if ( ! _.isFunction( callback ) ) {
                        throw new Error( '_deferCallbackForControl : callback must be a funtion.' );
                    }
                    args = ( _.isUndefined(args) || ! _.isArray( args ) ) ? [] : args;

                    if ( api.control.has( wpCrtlId ) ) {
                          if ( 'resolved' == api.control(wpCrtlId ).deferred.embedded.state() ) {
                                $.when( callback.apply( null, args ) )
                                      .fail( function() { dfd.reject(); })
                                      .done( function() { dfd.resolve(); });
                          } else {
                                api.control( wpCrtlId ).deferred.embedded.then( function() {
                                      $.when( callback.apply( null, args ) )
                                            .fail( function() { dfd.reject(); })
                                            .done( function() { dfd.resolve(); });
                                });
                          }
                    } else {
                          api.control.when( wpCrtlId, function() {
                                api.control( wpCrtlId ).deferred.embedded.then( function() {
                                      $.when( callback.apply( null, args ) )
                                            .fail( function() { dfd.reject(); })
                                            .done( function() { dfd.resolve(); });
                                });
                          });
                    }
                    return dfd.promise();
              },


              /*
              * @return void
              * show or hide setting according to the dependency + callback pair
              * @params setId = the short setting id, whitout the theme option prefix OR the WP built-in setting
              * @params o = { controls [], callback fn, onSectionExpand bool }
              */
              _processDominusCallbacks : function( shortDominusId, dominusParams, refresh ) {
                    var self = this,
                        wpDominusId = api.CZR_Helpers.build_setId( shortDominusId ),
                        dominusSetInst = api( wpDominusId ),
                        dfd = $.Deferred(),
                        hasProcessed = false;

                    //loop on the dominus servi and apply + bind the visibility cb
                    _.each( dominusParams.servi , function( servusShortSetId ) {
                            if ( ! api.control.has( api.CZR_Helpers.build_setId( servusShortSetId ) ) ) {
                                return;
                            }
                            //set visibility when control is embedded
                            //or when control is added to the api
                            //=> solves the problem of visibility callbacks lost when control are re-rendered
                            var _fireDominusCallbacks = function( dominusSetVal, servusShortSetId, dominusParams, refresh ) {
                                      var _toFire = [],
                                          _args = arguments;
                                      _.each( dominusParams, function( _item, _key ) {
                                            switch( _key ) {
                                                case 'visibility' :
                                                    self._setVisibility.apply( null, _args );
                                                break;
                                                case 'actions' :
                                                    if ( _.isFunction( _item ) )
                                                        _item.apply( null, _args );
                                                break;
                                            }
                                      });
                                },
                                _deferCallbacks = function( dominusSetVal ) {
                                      dominusSetVal = dominusSetVal  || dominusSetInst();
                                      var wpServusSetId = api.CZR_Helpers.build_setId( servusShortSetId );
                                      self._deferCallbackForControl(
                                                  wpServusSetId,
                                                  _fireDominusCallbacks,
                                                  [ dominusSetVal, servusShortSetId, dominusParams ]
                                            )
                                            .always( function() { hasProcessed = true; })
                                            .fail( function() { dfd.reject(); })
                                            .done( function() { dfd.resolve(); });
                                };


                            //APPLY THE DEPENDENCIES
                            _deferCallbacks();

                            //BIND THE DOMINUS SETTING INSTANCE
                            //store the visibility bound state
                            if ( ! _.has( dominusSetInst, 'czr_visibilityServi' ) )
                                dominusSetInst.czr_visibilityServi = new api.Value( [] );

                            //Maybe bind to react on setting _dirty change
                            var _currentDependantBound = dominusSetInst.czr_visibilityServi();
                            //Make sure a dependant visibility action is bound only once for a setting id to another setting control id
                            if ( ! _.contains( _currentDependantBound, servusShortSetId ) ) {
                                  dominusSetInst.bind( function( dominusSetVal ) {
                                      _deferCallbacks( dominusSetVal );
                                  });
                                  dominusSetInst.czr_visibilityServi( _.union( _currentDependantBound, [ servusShortSetId ] ) );
                            }
                    } );//_.each
                    if ( ! hasProcessed )
                      return dfd.resolve().promise();
                    return dfd.promise();
              },



              //@return void()
              _setVisibility : function ( dominusSetVal, servusShortSetId, dominusParams, refresh ) {
                    var wpServusSetId = api.CZR_Helpers.build_setId( servusShortSetId ),
                        visibility = dominusParams.visibility( dominusSetVal, servusShortSetId, dominusParams.dominus );

                    refresh = refresh || false;
                    //Allows us to filter between visibility callbacks and other actions
                    //a non visibility callback shall return null
                    if ( ! _.isBoolean( visibility ) || ( 'unchanged' == visibility && ! refresh ) )
                      return;

                    //when skope is enabled, we might be doing a silent update
                    //=> this method should be bailed if so
                    var _doVisibilitiesWhenPossible = function() {
                            if ( api.state.has( 'silent-update-processing' ) && api.state( 'silent-update-processing' )() )
                              return;
                            api.control( wpServusSetId, function( _controlInst ) {
                                  var _args = {
                                        duration : 'fast',
                                        completeCallback : function() {},
                                        unchanged : false
                                  };

                                  if ( _.has( _controlInst, 'active' ) )
                                    visibility = visibility && _controlInst.active();

                                  if ( _.has( _controlInst, 'defaultActiveArguments' ) )
                                    _args = control.defaultActiveArguments;

                                  _controlInst.onChangeActive( visibility , _controlInst.defaultActiveArguments );
                            });
                            if ( api.state.has( 'silent-update-processing' ) ) {
                                  api.state( 'silent-update-processing' ).unbind( _doVisibilitiesWhenPossible );
                            }
                    };

                    if ( api.state.has( 'silent-update-processing' ) && api.state( 'silent-update-processing' )() ) {
                          api.state( 'silent-update-processing' ).bind( _doVisibilitiesWhenPossible );
                    } else {
                          _doVisibilitiesWhenPossible();
                    }

              },










              /*****************************************************************************
              * HELPERS
              *****************************************************************************/
              /*
              * Abstract
              * Will be provided by the theme
              * @return main control dependencies object
              */
              _getControlDeps : function() {
                return {};
              },


              //@return a visibility ready object of param describing the dependencies between a dominus and its servi.
              //this.defaultDominusParams = {
              //       dominus : '',
              //       servi : [],
              //       visibility : fn() {},
              //       actions : fn() {},
              //       onSectionExpand : true
              // };
              _prepareDominusParams : function( params_candidate ) {
                    var self = this,
                        _ready_params = {};

                    //Check mandatory conditions
                    if ( ! _.isObject( params_candidate ) ) {
                          api.errorLog( 'Visibilities : a dominus param definition must be an object.');
                          return _ready_params;
                    }
                    if ( ! _.has( params_candidate, 'visibility' ) && ! _.has( params_candidate, 'actions' ) ) {
                          api.errorLog( 'Visibilities : a dominus definition must include a visibility or an actions callback.');
                          return _ready_params;
                    }
                    if ( ! _.has( params_candidate, 'dominus' ) || ! _.isString( params_candidate.dominus ) || _.isEmpty( params_candidate.dominus ) ) {
                          api.errorLog( 'Visibilities : a dominus control id must be a not empty string.');
                          return _ready_params;
                    }
                    var wpDominusId = api.CZR_Helpers.build_setId( params_candidate.dominus );
                    if ( ! api.control.has( wpDominusId ) ) {
                          api.errorLog( 'Visibilities : a dominus control id is not registered : ' + wpDominusId );
                          return _ready_params;
                    }
                    if ( ! _.has( params_candidate, 'servi' ) || _.isUndefined( params_candidate.servi ) || ! _.isArray( params_candidate.servi ) || _.isEmpty( params_candidate.servi ) ) {
                          api.errorLog( 'Visibilities : servi must be set as an array not empty.');
                          return _ready_params;
                    }

                    _.each( self.defaultDominusParams , function( _value, _key ) {
                        var _candidate_val = params_candidate[ _key ];

                        switch( _key ) {
                              case 'visibility' :
                                  if ( ! _.isUndefined( _candidate_val ) && ! _.isEmpty( _candidate_val ) && ! _.isFunction( _candidate_val ) ) {
                                        throw new Error( 'Visibilities : a dominus visibility callback must be a function : ' + params_candidate.dominus );
                                  }
                              break;
                              case 'actions' :
                                  if ( ! _.isUndefined( _candidate_val ) && ! _.isEmpty( _candidate_val ) && ! _.isFunction( _candidate_val ) ) {
                                        throw new Error( 'Visibilities : a dominus actions callback must be a function : ' + params_candidate.dominus );
                                  }
                              break;
                              case 'onSectionExpand' :
                                  if ( ! _.isUndefined( _candidate_val ) && ! _.isEmpty( _candidate_val ) && ! _.isBoolean( _candidate_val ) ) {
                                        throw new Error( 'Visibilities : a dominus onSectionExpand param must be a boolean : ' + params_candidate.dominus );
                                  }
                              break;
                        }
                        _ready_params[_key] = _candidate_val;
                    });

                    return _ready_params;
              },



              /*****************************************************************************
              * FAVICON SPECIFICS
              *****************************************************************************/
              /**
              * Fired on api ready
              * May change the site_icon description on load
              * May add a callback to site_icon
              * @return void()
              */
              _handleFaviconNote : function() {
                    var self = this,
                        _fav_setId = api.CZR_Helpers.build_setId( serverControlParams.faviconOptionName );
                    //do nothing if (||)
                    //1) WP version < 4.3 where site icon has been introduced
                    //2) User had not defined a favicon
                    //3) User has already set WP site icon
                    if ( ! api.has('site_icon') || ! api.control('site_icon') || ( api.has( _fav_setId ) && 0 === + api( _fav_setId )() ) || + api('site_icon')() > 0 )
                      return;

                    var _oldDes     = api.control('site_icon').params.description;
                        _newDes     = ['<strong>' , i18n.faviconNote || '' , '</strong><br/><br/>' ].join('') + _oldDes;

                    //on api ready
                    self._printFaviconNote(_newDes );

                    //on site icon change
                    api('site_icon').callbacks.add( function(to) {
                      if ( +to > 0 ) {
                        //reset the description to default
                        api.control('site_icon').container.find('.description').text(_oldDes);
                        //reset the previous favicon setting
                        if ( api.has( _fav_setId ) )
                          api( _fav_setId ).set("");
                      }
                      else {
                        self._printFaviconNote(_newDes );
                      }
                    });
              },

              //Add a note to the WP control description if user has already defined a favicon
              _printFaviconNote : function( _newDes ) {
                    api.control('site_icon').container.find('.description').html(_newDes);
              }
        }
      );//api.Class.extend() //api.CZR_ctrlDependencies
})( wp.customize, jQuery, _);
//DOM READY :
//1) FIRE SPECIFIC INPUT PLUGINS
//2) ADD SOME COOL STUFFS
//3) SPECIFIC CONTROLS ACTIONS
( function ( wp, $ ) {
      $( function($) {
            var api = wp.customize || api;

            //WHAT IS HAPPENING IN THE MESSENGER
            // $(window.parent).on( 'message', function(e, o) {
            //   api.consoleLog('SENT STUFFS', JSON.parse( e.originalEvent.data), e );
            // });
            // $( window ).on( 'message', function(e, o) {
            //   api.consoleLog('INCOMING MESSAGE', JSON.parse( e.originalEvent.data), e );
            // });
            // $(window.document).bind("ajaxSend", function(e, o){
            //    api.consoleLog('AJAX SEND', e, arguments );
            // }).bind("ajaxComplete", function(e, o){
            //    api.consoleLog('AJAX COMPLETE', e, o);
            // });

            /* RECENTER CURRENT SECTIONS */
            $('.accordion-section').not('.control-panel').click( function () {
                  _recenter_current_section($(this));
            });

            function _recenter_current_section( section ) {
                  var $siblings               = section.siblings( '.open' );
                  //check if clicked element is above or below sibling with offset.top
                  if ( 0 !== $siblings.length &&  $siblings.offset().top < 0 ) {
                        $('.wp-full-overlay-sidebar-content').animate({
                              scrollTop:  - $('#customize-theme-controls').offset().top - $siblings.height() + section.offset().top + $('.wp-full-overlay-sidebar-content').offset().top
                        }, 700);
                  }
            }//end of fn


            /* CHECKBOXES */
            api.czrSetupCheckbox = function( controlId, refresh ) {
                  var _ctrl = api.control( controlId );
                  $('input[type=checkbox]:not(.nimblecheck-input)', _ctrl.container ).each( function() {
                        //Exclude font customizer
                        if ( 'tc_font_customizer_settings' == _ctrl.params.section )
                          return;
                        //first fix the checked / unchecked status
                        if ( 0 === $(this).val() || '0' == $(this).val() || 'off' == $(this).val() || _.isEmpty($(this).val() ) ) {
                              $(this).prop('checked', false);
                        } else {
                              $(this).prop('checked', true);
                        }

                        //then render icheck if not done already
                        if ( 0 !== $(this).closest('div[class^="icheckbox"]').length )
                          return;

                        $(this).iCheck({
                              checkboxClass: 'icheckbox_flat-grey',
                              //checkedClass: 'checked',
                              radioClass: 'iradio_flat-grey',
                        })
                        .on( 'ifChanged', function(e){
                              $(this).val( false === $(this).is(':checked') ? 0 : 1 );
                              $(e.currentTarget).trigger('change');
                        });
                  });
            };//api.czrSetupCheckbox()

            /* SELECT INPUT */
            api.czrSetupSelect = function(controlId, refresh) {
                  //Exclude no-selecter-js
                  $('select[data-customize-setting-link]', api.control(controlId).container )
                        .not('.no-selecter-js')
                        .each( function() {
                              $(this).selecter({
                              //triggers a change event on the view, passing the newly selected value + index as parameters.
                              // callback : function(value, index) {
                              //   self.triggerSettingChange( window.event || {} , value, index); // first param is a null event.
                              // }
                              });
                        });
            };//api.czrSetupSelect()


            /* NUMBER INPUT */
            api.czrSetupStepper = function( controlId, refresh ) {
                  var _ctrl = api.control( controlId );
                  $('input[type="number"]', _ctrl.container ).each( function() { $(this).stepper(); });
            };//api.czrSetupStepper()

            // LOOP ON EACH CONTROL REGISTERED AND INSTANTIATE THE PLUGINS
            // @todo => react on control added
            api.control.each( function( control ){
                  if ( ! _.has( control, 'id' ) )
                    return;
                  //exclude widget controls and menu controls for checkboxes
                  if ( 'widget_' != control.id.substring(0, 'widget_'.length ) && 'nav_menu' != control.id.substring( 0, 'nav_menu'.length ) ) {
                        api.czrSetupCheckbox(control.id);
                  }
                  if ( 'nav_menu_locations' != control.id.substring( 0, 'nav_menu_locations'.length ) ) {
                        api.czrSetupSelect(control.id);
                  }

                  // Stepper : exclude controls from specific sections
                  var _exclude = [
                       'publish_settings', //<= the outer section introduced in v4.9 to publish / saved draft / schedule
                       'tc_font_customizer_settings' //the font customizer plugin has its own way to instantiate the stepper, with custom attributes previously set to the input like step, min, etc...
                  ];

                  if ( 0 < control.container.find( 'input[type="number"]' ).length && control.params && control.params.section && ! _.contains( _exclude,  control.params.section ) ) {
                        api.czrSetupStepper(control.id);
                  }
            });
      });//end of $( function($) ) dom ready
})( wp, jQuery );