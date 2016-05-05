//extends api.CZRDynamicControl

var CZRSocialMethods = CZRSocialMethods || {};

(function (api, $, _) {
  $.extend( CZRSocialMethods, {
    initialize: function( id, options ) {

      //run the parent initialize
      api.CZRDynamicControl.prototype.initialize.call( this, id, options );

      var control = this;

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
        'bitbucket-square',
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
        'delicious',
        'deviantart',
        'digg',
        'dribbble',
        'dropbox',
        'drupal',
        'edge',
        'empire',
        'expeditedssl',
        'facebook',
        'facebook',
        'facebook-f (alias)',
        'facebook-official',
        'facebook-square',
        'firefox',
        'flickr',
        'fonticons',
        'fort-awesome',
        'forumbee',
        'foursquare',
        'get-pocket',
        'gg',
        'gg-circle',
        'git',
        'github',
        'github',
        'github-alt',
        'github-square',
        'git-square',
        'google',
        'google',
        'google-plus',
        'google-plus-square',
        'google-wallet',
        'gratipay',
        'hacker-news',
        'houzz',
        'instagram',
        'internet-explorer',
        'ioxhost',
        'joomla',
        'jsfiddle',
        'lastfm',
        'lastfm-square',
        'leanpub',
        'linkedin',
        'linkedin',
        'linkedin-square',
        'linux',
        'maxcdn',
        'meanpath',
        'medium',
        'mixcloud',
        'modx',
        'odnoklassniki',
        'odnoklassniki-square',
        'opencart',
        'openid',
        'opera',
        'optin-monster',
        'pagelines',
        'paypal',
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
        'soundcloud',
        'spotify',
        'stack-exchange',
        'stack-overflow',
        'steam',
        'steam-square',
        'stumbleupon',
        'stumbleupon',
        'stumbleupon-circle',
        'tencent-weibo',
        'trello',
        'tripadvisor',
        'tumblr',
        'tumblr-square',
        'twitch',
        'twitter',
        'twitter',
        'twitter-square',
        'usb',
        'viacoin',
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
        'yahoo',
        'y-combinator',
        'yelp',
        'youtube',
        'youtube-play',
        'youtube-square'
      ];


      //add the new property to the the parent
      //api.CZRDynamicControl.prototype.initialize.apply( this, arguments );

      //adds specific actions for this control
      this.addActions(
        'control_event_map',
        [
          //setup the select list for the pre add dialog box
          {
              trigger   : 'pre_add_view_rendered',
              actions   : [ 'setupSelect' ]
          },
          {
              trigger   : 'pre_model:social-icon:changed',
              actions   : [ 'updatePreModelTitle' ]
          }
        ]
      );

      this.addActions(
        'view_event_map',
        [
          {
              trigger   : 'viewContentRendered',
              actions   : [ 'setupSelect', 'setupColorPicker', 'setupIcheck' ]
          },
          {
              trigger   : 'social-icon:changed',
              actions   : [ 'updateModelInputs' ]
          }
        ]
      );

      //declares a default model
      this.model = {
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


    _buildTitle : function( title, icon, color ) {
      title = title || ( 'string' === typeof(icon) ? this._capitalize( icon.replace( 'fa-', '') ) : '' );
      title = this._truncate(title, 20);
      icon = icon || 'fa-' + this.social_icons[0];
      color = color || serverControlParams.defaultSocialColor;

      return '<div><span class="fa ' + icon + '" style="color:' + color + '"></span> ' + title + '</div>';
    },

    //overrides the default parent method by a custom one
    //at this stage, the model passed in the obj is up to date
    writeViewTitle : function( obj ) {
      var _title = this._capitalize( obj.model['social-icon'].replace('fa-', '') );

      $( '.' + this.css_attr.view_title , '#' + obj.model.id ).html(
        this._buildTitle( _title, obj.model['social-icon'], obj.model['social-color'] )
      );
    },

    //ACTIONS ON ICON CHANGE
    //Fired on 'social-icon:changed' for existing models
    updateModelInputs : function( obj ) {
      var control     = this,
          _new_model  = _.clone( obj.model ),
          _new_title  = control._capitalize( obj.model['social-icon'].replace('fa-', '') ),
          _new_color  = serverControlParams.defaultSocialColor;
      //add text follow us... to the title
      _new_title = [ serverControlParams.translatedStrings.followUs, _new_title].join(' ');

      $('input[data-type="title"]', obj.dom_el ).val( _new_title );
      $('input[data-type="social-link"]', obj.dom_el ).val( '' );
      $('input[data-type="social-color"]', obj.dom_el ).wpColorPicker('color', _new_color );

      //set the new val to the changed property
      _new_model.title = _new_title;
      _new_model['social-link'] = '';
      _new_model['social-color'] = _new_color;

      control.czr_Model(obj.model.id).set(_new_model);
    },


    //Fired on pre_model:social-icon:changed
    updatePreModelTitle : function(obj) {
      var control = this,
          _new_title  = control._capitalize( obj.model['social-icon'].replace('fa-', '') ),
          _new_model = control.czr_preModel('model').get();
      _new_model.title = [ serverControlParams.translatedStrings.followUs, _new_title].join(' ');
      control.czr_preModel('model').set(_new_model);
    },




    setupSelect : function( obj ) {
      var control = this,
          socialList = _.union( [serverControlParams.translatedStrings.selectSocialIcon], control.social_icons);

      //generates the options
      _.map( socialList , function( icon_name, k ) {
        var _value = ( 0 === k ) ? '' : 'fa-' + icon_name.toLowerCase(),
            _attributes = {
              value : _value,
              html: control._capitalize(icon_name)
            };
        if ( _value == obj.model['social-icon'] )
          $.extend( _attributes, { selected : "selected" } );

        $( 'select[data-type="social-icon"]', obj.dom_el ).append( $('<option>', _attributes) );
      });

      function addIcon( state ) {
        if (! state.id) { return state.text; }
        var $state = $(
          '<span class="fa ' + state.element.value.toLowerCase() + '">&nbsp;&nbsp;' + state.text + '</span>'
        );
        return $state;
      }

      //fire select2
      $( 'select[data-type="social-icon"]', obj.dom_el ).select2( {
          templateResult: addIcon,
          templateSelection: addIcon
      });
    },


    setupColorPicker : function( obj ) {
      var control = this;
      $( 'input[data-type="social-color"]', obj.dom_el ).wpColorPicker( {
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
      $( 'input[data-type="social-color"]', obj.dom_el ).closest('div').on('click keydown', function() {
        control._adjustScrollExpandedBlock( obj.dom_el );
      });
    },

    setupIcheck : function( obj ) {
      $( 'input[type=checkbox]', obj.dom_el ).each( function(e) {
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
    }

  });//$.extend()

})( wp.customize, jQuery, _);