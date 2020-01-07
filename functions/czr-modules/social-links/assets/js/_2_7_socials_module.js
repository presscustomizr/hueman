//extends api.CZRDynModule
var CZRSocialModuleMths = CZRSocialModuleMths || {};
( function ( api, $, _ ) {
$.extend( CZRSocialModuleMths, {
      initialize: function( id, options ) {
              if ( _.isUndefined( window.socialModuleLocalized ) ) {
                    api.errorLog( 'social module => Missing localized js params socialModuleLocalized');
              }

              var module = this;
              //run the parent initialize
              api.CZRDynModule.prototype.initialize.call( module, id, options );

              //extend the module with new template Selectors
              $.extend( module, {
                    itemPreAddEl : '',/// 'czr-module-social-pre-add-view-content',
                    itemInputList : '',// 'czr-module-social-item-content',
                    modOptInputList : ''//czr-module-social-mod-opt'
              } );

              this.social_icons = [
                '500px',
                'adn',
                'amazon',
                'android',
                'angellist',
                'apple',
                'behance',
                'behance-square',
                'bitbucket',
                //'bitbucket-square', //<-  removed in fa5
                'black-tie',
                'btc',
                'buysellads',
                'chrome',
                'codepen',
                'codiepie',
                'connectdevelop',
                'contao',
                'dashcube',
                'delicious',
                'deviantart',
                'digg',
                'discord',
                'dribbble',
                'dropbox',
                'drupal',
                'edge',
                'empire',
                'envelope',
                'envelope-o', //<- go with far envelope
                'envelope-square',
                'expeditedssl',
                'facebook',
                'facebook-f (alias)',
                //'facebook-official', //<-  removed in fa5
                'facebook-square',
                'firefox',
                'flickr',
                'flipboard',
                'fonticons',
                'fort-awesome',
                'forumbee',
                'foursquare',
                'get-pocket',
                'gg',
                'gg-circle',
                'git',
                'github',
                'github-alt',
                'github-square',
                'gitlab',
                'git-square',
                'google',
                'google-plus',
                //'google-plus-circle', //<- removed in fa5
                //'google-plus-official', //<- removed in fa5
                'google-plus-g', //<- added in fa5
                'google-plus-square',
                'google-wallet',
                'gratipay',
                'hacker-news',
                'houzz',
                'imdb',
                'instagram',
                'internet-explorer',
                'ioxhost',
                'joomla',
                'jsfiddle',
                'lastfm',
                'lastfm-square',
                'leanpub',
                'line',
                'linkedin',
                //'linkedin-square', //<-  removed in fa5
                'linkedin-in', //<- added in fa5
                'linux',
                'maxcdn',
                //'meanpath', <- removed in fa5
                'meetup',
                'medium',
                'mixcloud',
                'map-marker',
                'mobile',
                'mobile-alt',//<- added in fa5
                'modx',
                'odnoklassniki',
                'odnoklassniki-square',
                'opencart',
                'openid',
                'opera',
                'optin-monster',
                'pagelines',
                'patreon',
                'paypal',
                'phone',
                'phone-square',
                'pied-piper',
                'pied-piper-alt',
                'pinterest',
                'pinterest-p',
                'pinterest-square',
                'product-hunt',
                'qq',
                'rebel',
                'reddit',
                'reddit-alien',
                'reddit-square',
                'renren',
                'rss',
                'rss-square',
                'safari',
                'scribd',
                'sellsy',
                'share-alt',
                'share-alt-square',
                'shirtsinbulk',
                'simplybuilt',
                'skyatlas',
                'skype',
                'slack',
                'slideshare',
                'snapchat',
                'soundcloud',
                'spotify',
                'stack-exchange',
                'stack-overflow',
                'steam',
                'steam-square',
                'stumbleupon',
                'stumbleupon-circle',
                'strava',
                'telegram',
                'tencent-weibo',
                'trello',
                'tripadvisor',
                'tumblr',
                'tumblr-square',
                'twitch',
                'twitter',
                'twitter-square',
                'usb',
                'viacoin',
                'viber',
                'vimeo',
                'vimeo-square',
                'vine',
                'vk',
                'weibo',
                'weixin',
                'whatsapp',
                'wikipedia-w',
                'windows',
                'wordpress',
                'xing',
                'xing-square',
                'yahoo',
                'y-combinator',
                'yelp',
                'youtube',
                //'youtube-play', //<- removed in fa5
                'youtube-square'
              ];

              //FA5 backward compatibility with FA4
              //see https://github.com/presscustomizr/customizr/issues/1364
              this.fa_solid_icons = [
                'fa-envelope',
                'fa-envelope-square',
                'fa-mobile',
                'fa-mobile-alt',
                'fa-phone',
                'fa-phone-square',
                'fa-rss',
                'fa-rss-square',
                'fa-share-alt',
                'fa-share-alt-square'
              ];

              this.fa_icons_replacement = {
                'fa-bitbucket-square'     : 'fa-bitbucket',
                'fa-facebook-official'    : 'fa-facebook-f',
                'fa-google-plus-circle'   : 'fa-google-plus',
                'fa-google-plus-official' : 'fa-google-plus',
                'fa-linkedin-square'      : 'fa-linkedin',
                'fa-youtube-play'         : 'fa-youtube'
              };

              this.defaultSocialColor = socialModuleLocalized.defaultSocialColor ? socialModuleLocalized.defaultSocialColor : 'rgb(90,90,90)';
              this.defaultSocialSize = socialModuleLocalized.defaultSocialSize ? socialModuleLocalized.defaultSocialSize : 14;

              //EXTEND THE DEFAULT CONSTRUCTORS FOR INPUT
              module.inputConstructor = api.CZRInput.extend( module.CZRSocialsInputMths || {} );
              //EXTEND THE DEFAULT CONSTRUCTORS FOR MONOMODEL
              module.itemConstructor = api.CZRItem.extend( module.CZRSocialsItem || {} );

              //declares a default ModOpt model
              this.defaultModOptModel = {
                  is_mod_opt : true,
                  module_id : module.id,
                  'social-size' : module.defaultSocialSize
              };

              //declares a default model
              this.defaultItemModel = {
                    id : '',
                    title : '' ,
                    'social-icon' : '',
                    'social-link' : '',
                    'social-color' : module.defaultSocialColor,
                    'social-target' : 1
              };

              //overrides the default success message
              this.itemAddedMessage = socialModuleLocalized.i18n['New Social Link created ! Scroll down to edit it.'];

              //fired ready :
              //1) on section expansion
              //2) or in the case of a module embedded in a regular control, if the module section is already opened => typically when skope is enabled
              if ( _.has( api, 'czr_activeSectionId' ) && module.control.section() == api.czr_activeSectionId() && 'resolved' != module.isReady.state() ) {
                    module.ready();
              }

              api.section( module.control.section() ).expanded.bind(function(to) {
                    //set module ready on section expansion
                    if ( 'resolved' != module.isReady.state() ) {
                          module.ready();
                    }
              });

              module.isReady.then( function() {
                    if ( _.isUndefined( module.preItem ) )
                      return;
                    //specific update for the item preModel on social-icon change
                    module.preItem.bind( function( to, from ) {
                          if ( ! _.has(to, 'social-icon') )
                            return;
                          if ( _.isEqual( to['social-icon'], from['social-icon'] ) )
                            return;
                          module.updateItemModel( module.preItem, true );
                    });
              });
      },//initialize


      //ACTIONS ON ICON CHANGE
      //Fired on 'social-icon:changed'
      //Don't fire in pre item case
      //@item_instance an be the preItem or an already created item
      updateItemModel : function( item_instance, is_preItem ) {
              var item = item_instance,
                  module = this;

              is_preItem = is_preItem || false;

              //check if we are in the pre Item case => if so, the social-icon might be empty
              if ( ! _.has( item(), 'social-icon') || _.isEmpty( item()['social-icon'] ) )
                return;

              var _new_model, _new_title, _new_color;

              _new_model  = $.extend( true, {}, item() );//always safer to deep clone ( alternative to _.clone() ) => we don't know how nested this object might be in the future
              _new_title  = this.getTitleFromIcon( _new_model['social-icon'] );
              _new_color  = module.defaultSocialColor;
              if ( ! is_preItem && item.czr_Input.has( 'social-color' ) )
                _new_color = item.czr_Input('social-color')();

              //add text follow us... to the title
              _new_title = [ socialModuleLocalized.i18n['Follow us on'], _new_title].join(' ');

              if ( is_preItem ) {
                    _new_model = $.extend( _new_model, { title : _new_title, 'social-color' : _new_color } );
                    item.set( _new_model );
              } else {
                    item.czr_Input('title').set( _new_title );
                    //item.czr_Input('social-link').set( '' );
                    if ( item.czr_Input('social-color') ) { //optional
                      item.czr_Input('social-color').set( _new_color );
                    }
              }
      },

      /* Helpers */
      getTitleFromIcon : function( icon ) {
              return api.CZR_Helpers.capitalize( icon.replace('fa-', '').replace('envelope', 'email') );
      },

      getIconFromTitle : function( title ) {
              return  'fa-' . title.toLowerCase().replace('envelope', 'email');
      },

      //from : https://stackoverflow.com/a/34560648
      _strReplace : function( $f, $r, $s ) {
              return $s.replace(new RegExp("(" + (typeof($f) == "string" ? $f.replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&") : $f.map(function(i){return i.replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&")}).join("|")) + ")", "g"), typeof($r) == "string" ? $r : typeof($f) == "string" ? $r[0] : function(i){ return $r[$f.indexOf(i)]});
      },

      buildFaIcon : function( value ) {
              //FA5 backward compatibility with FA4
              //see https://github.com/presscustomizr/customizr/issues/1364
              //by default they're brands
              var _fa_group       = 'fab', //<- brand group by default
                  _icon_class     = value.toLowerCase(),
                solidIcons        = this.fa_solid_icons,
                iconsReplacement  = this.fa_icons_replacement;

              _icon_class = this._strReplace( _.keys( iconsReplacement ),  _.values( iconsReplacement ),_icon_class);

              //former -o icons => now part of the far (Regular) group
              if ( _icon_class.match(/-o$/) ) {
                    _fa_group  = 'far';
                    _icon_class = _icon_class.replace(/-o$/,'');
              }
              //solid icons
              else if ( _.contains( solidIcons, _icon_class ) ) {
                    _fa_group = 'fas';
              }

              return _fa_group + ' ' +_icon_class;

      },



      CZRSocialsInputMths : {
              setupSelect : function() {
                    var input              = this,
                        item               = input.input_parent,
                        module             = input.module,
                        socialList         = module.social_icons,
                        solidIcons         = module.fa_solid_icons,
                        iconsReplacement   = module.fa_icons_eplacement,
                        _model             = item(),
                        //check if we are in the pre Item case => if so, the id is empty
                        is_preItem         = _.isEmpty( _model.id );

                    //=> add the select text in the pre Item case
                    if ( is_preItem ) {
                          socialList = _.union( [ socialModuleLocalized.i18n['Select a social icon'] || 'Select a social icon' ], socialList );
                    }
                    //generates the options
                    _.each( socialList , function( icon_name, k ) {
                          icon_name = _.isEmpty( icon_name ) ? '' : icon_name;
                          // in the pre Item case the first select element is the notice "Select a social icon"
                          // doesn't need the fa-* class
                          var _value    = ( is_preItem && 0 === k ) ? '' : 'fa-' + icon_name.toLowerCase(),
                              _attributes = {
                                    value : _value,
                                    html: module.getTitleFromIcon( icon_name )
                              };
                          if ( _value == _model['social-icon'] )
                            $.extend( _attributes, { selected : "selected" } );

                          $( 'select[data-czrtype="social-icon"]', input.container ).append( $('<option>', _attributes) );
                    });

                    function addIcon( state ) {
                          if (! state.id) { return state.text; }

                          //two spans here because we cannot wrap the social text into the social icon span as the solid FA5 font-weight is bold
                          var  $state = $(
                            '<span class="' + module.buildFaIcon( state.element.value.toLowerCase() ) + '"></span><span class="social-name">&nbsp;&nbsp;' + state.text + '</span>'
                          );
                          return $state;
                    }

                    //fire select2
                    $( 'select[data-czrtype="social-icon"]', input.container ).czrSelect2( {
                            templateResult: addIcon,
                            templateSelection: addIcon
                    });
            },

            setupColorPicker : function( obj ) {
                    var input      = this,
                        item       = input.input_parent,
                        module     = input.module,
                        $el        = $( 'input[data-czrtype="social-color"]', input.container );

                    $el.iris( {
                              palettes: true,
                              hide:false,
                              defaultColor : module.defaultSocialColor || 'rgba(255,255,255,0.7)',
                              change : function( e, o ) {
                                    //if the input val is not updated here, it's not detected right away.
                                    //weird
                                    //is there a "change complete" kind of event for iris ?
                                    //hack to reset the color to default...@todo => use another color picker.
                                    if ( _.has( o, 'color') && 16777215 == o.color._color )
                                      $(this).val( module.defaultSocialColor || 'rgba(255,255,255,0.7)' );
                                    else
                                      $(this).val( o.color.toString() );

                                    $(this).trigger('colorpickerchange').trigger('change');
                              }
                    });

                    //when the picker opens, it might be below the visible viewport.
                    //No built-in event available to react on this in the wpColorPicker unfortunately
                    $el.closest('div').on('click keydown', function() {
                          module._adjustScrollExpandedBlock( input.container );
                    });
            }

      },//CZRSocialsInputMths









      CZRSocialsItem : {
              //Fired if the item has been instantiated
              //The item.callbacks are declared.
              ready : function() {
                    var item = this;
                    api.CZRItem.prototype.ready.call( item );

                    //update the item model on social-icon change
                    item.bind('social-icon:changed', function(){
                          item.module.updateItemModel( item );
                    });
              },


              _buildTitle : function( title, icon, color ) {
                      var item = this,
                          module     = item.module;

                      title = title || ( 'string' === typeof(icon) ? api.CZR_Helpers.capitalize( icon.replace( 'fa-', '') ) : '' );
                      title = api.CZR_Helpers.truncate(title, 20);
                      icon = icon || 'fa-' + module.social_icons[0];
                      color = color || module.defaultSocialColor;

                      return '<div><span class="' + module.buildFaIcon( icon ) + '" style="color:' + color + '"></span> ' + title + '</div>';
              },

              //overrides the default parent method by a custom one
              //at this stage, the model passed in the obj is up to date
              writeItemViewTitle : function( model ) {
                      var item = this,
                          module     = item.module,
                          _model = model || item(),
                          _title = module.getTitleFromIcon( _model['social-icon'] );

                      $( '.' + module.control.css_attr.item_title , item.container ).html(
                        item._buildTitle( _title, _model['social-icon'], _model['social-color'] )
                      );
              }
      },//CZRSocialsItem
});//$.extend
})( wp.customize , jQuery, _ );

(function ( api, $ ) {
      //provides a description of each module
      //=> will determine :
      //1) how to initialize the module model. If not crud, then the initial item(s) model shall be provided
      //2) which js template(s) to use : if crud, the module template shall include the add new and pre-item elements.
      //   , if crud, the item shall be removable
      //3) how to render : if multi item, the item content is rendered when user click on edit button.
      //    If not multi item, the single item content is rendered as soon as the item wrapper is rendered.
      //4) some DOM behaviour. For example, a multi item shall be sortable.
      api.czrModuleMap = api.czrModuleMap || {};
      $.extend( api.czrModuleMap, {
            czr_social_module : {
                  mthds : CZRSocialModuleMths,
                  crud : true,
                  name : 'Social Icons',
                  has_mod_opt : true
            },
      });
})( wp.customize, jQuery );