var api = api || wp.customize, $ = $ || jQuery;
(function (api, $, _) {
  /*****************************************************************************
  * CAPTURE PREVIEW INFORMATIONS ON REFRESH + REACT TO THEM
  *****************************************************************************/
  /* WP CONDITIONAL TAGS => stores and observes the WP conditional tags sent by the preview */
  api.czr_wp_conditionals = new api.Value();

  /* SCOPE COLLECTION => stores and observes the collection sent by the preview */
  api.czr_scopeCollection = new api.Values();
  api.czr_scopeCollection.create('collection');//all available scope, including the current scope
  api.czr_scopeCollection.create('active');//the currently active scope

  /* SCOPES */
  // Create the collection
  api.czr_scope = new api.Values();

  /* SIDEBAR INSIGHTS => stores and observes the sidebars and widgets settings sent by the preview */
  api.sidebar_insights = new api.Values();
  api.sidebar_insights.create('candidates');//will store the sidebar candidates on preview refresh
  api.sidebar_insights.create('actives');//will record the refreshed active list of active sidebars sent from the preview
  api.sidebar_insights.create('inactives');
  api.sidebar_insights.create('registered');
  api.sidebar_insights.create('available_locations');

  //PARTIAL REFRESHS => stores and observes the partials sent by the preview
  api.czr_partials = new api.Value();

})( wp.customize , jQuery, _);