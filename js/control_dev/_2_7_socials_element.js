//extends api.CZRDynElement

var CZRSocialElementMths = CZRSocialElementMths || {};

$.extend( CZRSocialElementMths, {
  initialize: function( id, options ) {
          var element = this;
          //run the parent initialize
          api.CZRDynElement.prototype.initialize.call( element, id, options );

          //extend the element with new template Selectors
          $.extend( element, {
                viewPreAddEl : 'czr-element-social-pre-add-view-content',
                viewTemplateEl : 'czr-element-item-view',
                viewContentTemplateEl : 'czr-element-social-view-content',
          } );


          this.social_icons = [
            '500px','adn','amazon','android','angellist','apple','behance','behance-square','bitbucket','bitbucket-square','black-tie','btc','buysellads','chrome','codepen','codiepie','connectdevelop','contao','dashcube','delicious','delicious','deviantart','digg','dribbble','dropbox','drupal','edge','empire','expeditedssl','facebook','facebook','facebook-f (alias)','facebook-official','facebook-square','firefox','flickr','fonticons','fort-awesome','forumbee','foursquare','get-pocket','gg','gg-circle','git','github','github','github-alt','github-square','git-square','google','google','google-plus','google-plus-square','google-wallet','gratipay','hacker-news','houzz','instagram','internet-explorer','ioxhost','joomla','jsfiddle','lastfm','lastfm-square','leanpub','linkedin','linkedin','linkedin-square','linux','maxcdn','meanpath','medium','mixcloud','modx','odnoklassniki','odnoklassniki-square','opencart','openid','opera','optin-monster','pagelines','paypal','pied-piper','pied-piper-alt','pinterest','pinterest-p','pinterest-square','product-hunt','qq','rebel','reddit','reddit-alien','reddit-square','renren','rss','rss-square','safari','scribd','sellsy','share-alt','share-alt-square','shirtsinbulk','simplybuilt','skyatlas','skype','slack','slideshare','soundcloud','spotify','stack-exchange','stack-overflow','steam','steam-square','stumbleupon','stumbleupon','stumbleupon-circle','tencent-weibo','trello','tripadvisor','tumblr','tumblr-square','twitch','twitter','twitter','twitter-square','usb','viacoin','vimeo','vimeo-square','vine','vk','weibo','weixin','whatsapp','wikipedia-w','windows','wordpress','xing','xing-square','yahoo','yahoo','y-combinator','yelp','youtube','youtube-play','youtube-square'
          ];
          //EXTEND THE DEFAULT CONSTRUCTORS FOR INPUT
          element.inputConstructor = api.CZRInput.extend( element.CZRSocialsInputMths || {} );
          //EXTEND THE DEFAULT CONSTRUCTORS FOR MONOMODEL
          element.itemConstructor = api.CZRItem.extend( element.CZRSocialsItem || {} );

          //declares a default model
          this.defaultItemModel = {
                id : '',
                title : '' ,
                'social-icon' : '',
                'social-link' : '',
                'social-color' : serverControlParams.social_el_params.defaultSocialColor,
                'social-target' : 1
          };

          //overrides the default success message
          this.itemAddedMessage = serverControlParams.translatedStrings.socialLinkAdded;
          api.section( element.control.section() ).expanded.bind(function(to) {
                if ( ! to || ! _.isEmpty( element.get() ) )
                  return;
                element.ready();
          });
  },//initialize



  CZRSocialsInputMths : {
          ready : function() {
                  var input = this;
                  //update the item model on social-icon change
                  input.bind('social-icon:changed', function(){
                      input.updateItemModel();
                  });
                  api.CZRInput.prototype.ready.call( input);
          },


          setupSelect : function() {
                var input      = this,
                    item = input.item,
                    element     = input.element,
                    socialList = element.social_icons,
                    _model = item.get();

                //check if we are in the pre Item case => if so, the id is empty
                //=> add the select text
                if ( _.isEmpty(_model.id) ) {
                  socialList = _.union( [serverControlParams.translatedStrings.selectSocialIcon], socialList );
                }

                //generates the options
                _.each( socialList , function( icon_name, k ) {
                      var _value = ( 0 === k ) ? '' : 'fa-' + icon_name.toLowerCase(),
                          _attributes = {
                            value : _value,
                            html: api.CZR_Helpers.capitalize(icon_name)
                          };
                      if ( _value == _model['social-icon'] )
                        $.extend( _attributes, { selected : "selected" } );

                      $( 'select[data-type="social-icon"]', input.container ).append( $('<option>', _attributes) );
                });

                function addIcon( state ) {
                      if (! state.id) { return state.text; }
                      var $state = $(
                        '<span class="fa ' + state.element.value.toLowerCase() + '">&nbsp;&nbsp;' + state.text + '</span>'
                      );
                      return $state;
                }

                //fire select2
                $( 'select[data-type="social-icon"]', input.container ).select2( {
                        templateResult: addIcon,
                        templateSelection: addIcon
                });
        },

        setupIcheck : function( obj ) {
                var input      = this;

                $( 'input[type=checkbox]', input.container ).each( function(e) {
                      if ( 0 !== $(this).closest('div[class^="icheckbox"]').length )
                        return;

                      $(this).iCheck({
                            checkboxClass: 'icheckbox_flat-grey',
                            checkedClass: 'checked',
                            radioClass: 'iradio_flat-grey',
                      })
                      .on( 'ifChanged', function(e){
                            $(this).val( false === $(this).is(':checked') ? 0 : 1 );
                            $(e.currentTarget).trigger('change');
                      });
                });
        },

        setupColorPicker : function( obj ) {
                var input      = this,
                    item = input.item,
                    element     = input.element;

                $( 'input[data-type="social-color"]', input.container ).wpColorPicker( {
                          defaultColor : 'rgba(255,255,255,0.7)',
                          change : function( e, o ) {
                                //if the input val is not updated here, it's not detected right away.
                                //weird
                                //is there a "change complete" kind of event for iris ?
                                //hack to reset the color to default...@todo => use another color picker.
                                if ( _.has(o, 'color') && 16777215 == o.color._color )
                                  $(this).val( 'rgba(255,255,255,0.7)' );
                                else
                                  $(this).val( o.color.toString() );

                                $(this).trigger('colorpickerchange');
                          }
                });

                //when the picker opens, it might be below the visible viewport.
                //No built-in event available to react on this in the wpColorPicker unfortunately
                $( 'input[data-type="social-color"]', input.container ).closest('div').on('click keydown', function() {
                      element._adjustScrollExpandedBlock( input.container );
                });
        },


        //ACTIONS ON ICON CHANGE
        //Fired on 'social-icon:changed'
        //Don't fire in pre item case
        updateItemModel : function( _new_val ) {
                var input = this,
                    item = this.item,
                    is_preItemInput = _.has( input, 'is_preItemInput' ) && input.is_preItemInput;

                //check if we are in the pre Item case => if so, the social-icon might be empty
                if ( ! _.has( item.get(), 'social-icon') || _.isEmpty( item.get()['social-icon'] ) )
                  return;

                var _new_model  = _.clone( item.get() ),
                    _new_title  = api.CZR_Helpers.capitalize( _new_model['social-icon'].replace('fa-', '') ),
                    _new_color  = serverControlParams.social_el_params.defaultSocialColor,
                    inputCollection = is_preItemInput ? input.element.czr_preItemInput : item.czr_Input;

                //add text follow us... to the title
                _new_title = [ serverControlParams.translatedStrings.followUs, _new_title].join(' ');

                if ( is_preItemInput ) {
                  _new_model = $.extend( _new_model, { title : _new_title, 'social-color' : _new_color } );
                  item.set( _new_model );
                } else {
                  item.czr_Input('title').set( _new_title );
                  item.czr_Input('social-link').set( '' );
                  item.czr_Input('social-color').set( _new_color );
                }

        },

  },//CZRSocialsInputMths




  CZRSocialsItem : {
          _buildTitle : function( title, icon, color ) {
                  var item = this,
                      element     = item.item_element;

                  title = title || ( 'string' === typeof(icon) ? api.CZR_Helpers.capitalize( icon.replace( 'fa-', '') ) : '' );
                  title = api.CZR_Helpers.truncate(title, 20);
                  icon = icon || 'fa-' + element.social_icons[0];
                  color = color || serverControlParams.social_el_params.defaultSocialColor;

                  return '<div><span class="fa ' + icon + '" style="color:' + color + '"></span> ' + title + '</div>';
          },

          //overrides the default parent method by a custom one
          //at this stage, the model passed in the obj is up to date
          writeItemViewTitle : function( model ) {
                  var item = this,
                      element     = item.item_element,
                      _model = model || item.get(),
                      _title = api.CZR_Helpers.capitalize( _model['social-icon'].replace('fa-', '') );

                  $( '.' + element.control.css_attr.view_title , item.container ).html(
                    item._buildTitle( _title, _model['social-icon'], _model['social-color'] )
                  );
          }

  },//CZRSocialsItem

});