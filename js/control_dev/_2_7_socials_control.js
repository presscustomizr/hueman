//extends api.CZRMultiModelControl

var CZRSocialMethods = CZRSocialMethods || {};

$.extend( CZRSocialMethods, {
  initialize: function( id, options ) {
          //run the parent initialize
          api.CZRMultiInputDynControl.prototype.initialize.call( this, id, options );
          var control = this;
          this.social_icons = [
            '500px','adn','amazon','android','angellist','apple','behance','behance-square','bitbucket','bitbucket-square','black-tie','btc','buysellads','chrome','codepen','codiepie','connectdevelop','contao','dashcube','delicious','delicious','deviantart','digg','dribbble','dropbox','drupal','edge','empire','expeditedssl','facebook','facebook','facebook-f (alias)','facebook-official','facebook-square','firefox','flickr','fonticons','fort-awesome','forumbee','foursquare','get-pocket','gg','gg-circle','git','github','github','github-alt','github-square','git-square','google','google','google-plus','google-plus-square','google-wallet','gratipay','hacker-news','houzz','instagram','internet-explorer','ioxhost','joomla','jsfiddle','lastfm','lastfm-square','leanpub','linkedin','linkedin','linkedin-square','linux','maxcdn','meanpath','medium','mixcloud','modx','odnoklassniki','odnoklassniki-square','opencart','openid','opera','optin-monster','pagelines','paypal','pied-piper','pied-piper-alt','pinterest','pinterest-p','pinterest-square','product-hunt','qq','rebel','reddit','reddit-alien','reddit-square','renren','rss','rss-square','safari','scribd','sellsy','share-alt','share-alt-square','shirtsinbulk','simplybuilt','skyatlas','skype','slack','slideshare','soundcloud','spotify','stack-exchange','stack-overflow','steam','steam-square','stumbleupon','stumbleupon','stumbleupon-circle','tencent-weibo','trello','tripadvisor','tumblr','tumblr-square','twitch','twitter','twitter','twitter-square','usb','viacoin','vimeo','vimeo-square','vine','vk','weibo','weixin','whatsapp','wikipedia-w','windows','wordpress','xing','xing-square','yahoo','yahoo','y-combinator','yelp','youtube','youtube-play','youtube-square'
          ];
          //EXTEND THE DEFAULT CONSTRUCTORS FOR INPUT
          control.inputConstructor = api.CZRInput.extend( control.CZRSocialsInputMethods || {} );
          //EXTEND THE DEFAULT CONSTRUCTORS FOR MONOMODEL
          control.modelConstructor = api.CZRMonoModel.extend( control.CZRSocialsMonoModel || {} );
          //declares a default model
          this.defaultMonoModel = {
            id : '',
            title : '' ,
            'social-icon' : '',
            'social-link' : '',
            'social-color' : serverControlParams.defaultSocialColor,
            'social-target' : 1
          };
          //overrides the default success message
          this.modelAddedMessage = serverControlParams.translatedStrings.socialLinkAdded;
  },//initialize



  CZRSocialsInputMethods : {
          ready : function() {
                  var input = this;

                  input.addActions(
                    'input_event_map',
                    {
                        trigger   : 'social-icon:changed',
                        actions   : [ 'updateModelInputs' ]
                    },
                    input
                  );

                  api.CZRInput.prototype.ready.call( input);
          },


          setupSelect : function() {
                var input      = this,
                    mono_model = input.mono_model,
                    control     = input.control,
                    socialList = control.social_icons,
                    _model = mono_model.get();

                //check if we are in the pre model case => if so, the id is empty
                //=> add the select text
                if ( _.isEmpty(_model.id) ) {
                  socialList = _.union( [serverControlParams.translatedStrings.selectSocialIcon], socialList );
                }

                //generates the options
                _.each( socialList , function( icon_name, k ) {
                      var _value = ( 0 === k ) ? '' : 'fa-' + icon_name.toLowerCase(),
                          _attributes = {
                            value : _value,
                            html: control._capitalize(icon_name)
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
                    mono_model = input.mono_model,
                    control     = input.control;

                $( 'input[data-type="social-color"]', input.container ).wpColorPicker( {
                  defaultColor : 'rgba(255,255,255,0.7)',
                  change : function( e, o ) {
                    //if the input val is not updated here, it's not detected right away.
                    //weird
                    //is there a "change complete" kind of event for iris ?
                    $(this).val(o.color.toString());
                    $(this).trigger('colorpickerchange');
                  }
                });
                //when the picker opens, it might be below the visible viewport.
                //No built-in event available to react on this in the wpColorPicker unfortunately
                $( 'input[data-type="social-color"]', input.container ).closest('div').on('click keydown', function() {
                  control._adjustScrollExpandedBlock( input.container );
                });
        },


        //ACTIONS ON ICON CHANGE
        //Fired on 'social-icon:changed' for existing models
        updateModelInputs : function() {
                var mono_model = this.mono_model,
                    control     = this.control,
                    _new_model  = _.clone( mono_model.get() ),
                    _new_title  = control._capitalize( _new_model['social-icon'].replace('fa-', '') ),
                    _new_color  = serverControlParams.defaultSocialColor;

                //add text follow us... to the title
                _new_title = [ serverControlParams.translatedStrings.followUs, _new_title].join(' ');

                //if current mono_model is not the premodel, update the
                if ( _.has(mono_model , 'container') ) {
                    $('input[data-type="title"]', mono_model.container ).val( _new_title );
                    $('input[data-type="social-link"]', mono_model.container ).val( '' );
                    $('input[data-type="social-color"]', mono_model.container ).wpColorPicker('color', _new_color );
                }

                //set the new val to the changed property
                _new_model.title = _new_title;
                _new_model['social-link'] = '';
                _new_model['social-color'] = _new_color;

                mono_model.set(_new_model);
        },

  },//CZRSocialsInputMethods




  CZRSocialsMonoModel : {
          _buildTitle : function( title, icon, color ) {
                  var mono_model = this,
                      control     = mono_model.model_control;

                  title = title || ( 'string' === typeof(icon) ? control._capitalize( icon.replace( 'fa-', '') ) : '' );
                  title = control._truncate(title, 20);
                  icon = icon || 'fa-' + control.social_icons[0];
                  color = color || serverControlParams.defaultSocialColor;

                  return '<div><span class="fa ' + icon + '" style="color:' + color + '"></span> ' + title + '</div>';
          },

          //overrides the default parent method by a custom one
          //at this stage, the model passed in the obj is up to date
          writeViewTitle : function( model ) {
                  var mono_model = this,
                      control     = mono_model.model_control;
                  var _title = control._capitalize( model['social-icon'].replace('fa-', '') );

                  $( '.' + control.css_attr.view_title , '#' + model.id ).html(
                    mono_model._buildTitle( _title, model['social-icon'], model['social-color'] )
                  );
          }

  },//CZRSocialsMonoModel

});