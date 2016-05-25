/*****************************************************************************
* BASE CONTROL CLASS
* extends api.Control
*****************************************************************************/
//define a set of methods, mostly helpers, to extend the base WP control class
//this will become our base constructor for main complex controls
//EARLY SETUP

var CZRBaseControlMethods = CZRBaseControlMethods || {};

(function (api, $, _) {
  $.extend( CZRBaseControlMethods, {

    initialize: function( id, options ) {
            var control = this;
            api.Control.prototype.initialize.call( control, id, options );

            //add a shortcut to the css properties declared in the php controls
            control.css_attr = _.has( serverControlParams , 'css_attr') ? serverControlParams.css_attr : {};

            //extend the control with new template Selectors
            $.extend( control, {
              viewTemplateEl : 'customize-control-' + options.params.type + '-view',
              viewContentTemplateEl : 'customize-control-' + options.params.type + '-view-content',
            } );
    },



    //////////////////////////////////////////////////
    /// ACTIONS AND DOM LISTENERS
    //////////////////////////////////////////////////
    //adds action to an existing event map
    //@event map = [ {event1}, {event2}, ... ]
    //@new_event = {  trigger   : event name , actions   : [ 'cb1', 'cb2', ... ] }
    addActions : function( event_map, new_events ) {
            var control = this;
            control[event_map] = control[event_map] || [];
            new_event_map = _.clone( control[event_map] );
            control[event_map] = _.union( new_event_map, ! _.isArray(new_events) ? [new_events] : new_events );
    },

    doActions : function( action, $dom_el, obj ) {
            $dom_el.trigger( action, obj );
    },


    //@obj = {model : model, dom_el : $_view_el, refreshed : _refreshed }
    setupDOMListeners : function( event_map , obj ) {
            var control = this;
            //loop on the event map and map the relevant callbacks by event name
            _.map( event_map , function( _event ) {
              //LISTEN TO THE DOM
              obj.dom_el.on( _event.trigger , _event.selector, function( e, event_params ) {
                //particular treatment
                if ( api.utils.isKeydownButNotEnterEvent( e ) ) {
                  return;
                }
                e.preventDefault(); // Keep this AFTER the key filter above

                //! use a new cloned object
                var _obj = _.clone(obj);
                //always get the latest model from the collection
                if ( _.has(_obj, 'model') && _.has( _obj.model, 'id') ) {
                  _obj.model = control.getModel( _obj.model.id );
                }

                //always add the event obj to the passed obj
                //+ the dom event
                $.extend( _obj, { event : _event, dom_event : e } );

                //add the event param => useful for triggered event
                $.extend( _obj, event_params );



                //SETUP THE EMITTERS
                //inform the container that something has happened
                //pass the model and the current dom_el
                control.executeEventActionChain( _obj );
              });//.on()

            });//_.map()
    },



    //GENERIC METHOD TO SETUP EVENT LISTENER
    //NOTE : the obj.event must alway be defined
    executeEventActionChain : function( obj ) {
            var control = this;
            //the model is always passed as parameter
            if ( ! _.has( obj, 'event' ) || ! _.has( obj.event, 'actions' ) ) {
              throw new Error('executeEventActionChain : No obj.event or no obj.event.actions properties found');
            }

            //if the actions param is a anonymous function, fire it and stop there
            if ( 'function' === typeof(obj.event.actions) )
              return obj.event.actions(obj);

            //execute the various actions required
            //first normalizes the provided actions into an array of callback methods
            //then loop on the array and fire each cb if exists
            if ( ! _.isArray(obj.event.actions) )
              obj.event.actions = [ obj.event.actions ];

            //if one of the callbacks returns false, then we break the loop
            //=> allows us to stop a chain of callbacks if a condition is not met
            var _break = false;
            _.map( obj.event.actions, function( _cb ) {

              if ( _break )
                return;

              if ( 'function' != typeof( control[_cb] ) ) {
                throw new Error( 'executeEventActionChain : the action : ' + _cb + ' has not been found when firing event : ' + obj.event.selector );
              }

              //allow other actions to be bound before
              //=> we don't want the event in the object here => we use the one in the event map if set
              //=> otherwise will loop infinitely because triggering always the same cb from obj.event.actions[_cb]
              //=> the dom element shall be get from the passed obj and fall back to the controler container.
              var $_dom_el = ( _.has(obj, 'dom_el') && -1 != obj.dom_el.length ) ? obj.dom_el : control.container;

              $_dom_el.trigger('before_' + _cb, _.omit( obj, 'event') );

                //executes the _cb and stores the result in a local var
                var _cb_return = control[_cb](obj);
                //shall we stop the action chain here ?
                if ( false === _cb_return )
                  _break = true;

              //allow other actions to be bound after
              //=> we don't want the event in the object here => we use the one in the event map if set
              $_dom_el.trigger('after_' + _cb, _.omit( obj, 'event') );

            });//_.map
    },




    //////////////////////////////////////////////////
    /// HELPERS
    //////////////////////////////////////////////////
    _capitalize : function( string ) {
            if( ! _.isString(string) )
              return string;
            return string.charAt(0).toUpperCase() + string.slice(1);
    },

    _truncate : function( string, n, useWordBoundary ){
            var isTooLong = string.length > n,
                s_ = isTooLong ? string.substr(0,n-1) : string;
                s_ = (useWordBoundary && isTooLong) ? s_.substr(0,s_.lastIndexOf(' ')) : s_;
            return  isTooLong ? s_ + '...' : s_;
    },

    //called before rendering a view
    //can be overriden to set a specific view template depending on the model properties
    //@return string
    getTemplateEl : function( type, model ) {
            var control = this, _el;
            switch(type) {
              case 'view' :
                _el = control.viewTemplateEl;
                break;
              case 'view-content' :
                _el = control.viewContentTemplateEl;
                break;
            }
            if ( _.isEmpty(_el) ) {
              console.log('No valid template has been found in getTemplateEl()');
            } else {
              return _el;
            }
    },



    //@return void()
    refreshPreview : function( obj ) {
            this.previewer.refresh();
    }



  });//$.extend//CZRBaseControlMethods
})( wp.customize , jQuery, _);