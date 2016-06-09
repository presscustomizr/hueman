
(function (api, $, _) {
  //Extends all constructores with the events manager
  $.extend( CZRBaseControlMths, api.Events || {} );
  $.extend( CZRModuleMths, api.Events || {} );
  $.extend( CZRItemMths, api.Events || {} );
  $.extend( CZRInputMths, api.Events || {} );

  //Add the DOM helpers (addAction, ...) to the Control Base Class + Input Base Class
  $.extend( CZRBaseControlMths, api.CZR_Helpers || {} );
  $.extend( CZRInputMths, api.CZR_Helpers || {} );
  $.extend( CZRModuleMths, api.CZR_Helpers || {} );

  //INPUTS => used as constructor when creating the collection of inputs
  api.CZRInput                 = api.Value.extend( CZRInputMths || {} );

  //ITEMS => used as constructor when creating the collection of models
  api.CZRItem                  = api.Value.extend( CZRItemMths || {} );

  //ELEMENTS => used as constructor when creating the collection of modules
  api.CZRModule               = api.Value.extend( CZRModuleMths || {} );
  api.CZRDynModule            = api.CZRModule.extend( CZRDynModuleMths || {} );

  //COLUMNS => used as constructor
  api.CZRColumn                = api.Value.extend( CZRColumnMths || {} );

  //ELEMENT COLLECTION
  api.CZRSocialModule         = api.CZRDynModule.extend( CZRSocialModuleMths || {} );
  api.CZRWidgetAreaModule     = api.CZRDynModule.extend( CZRWidgetAreaModuleMths || {} );
  api.CZRSektionModule        = api.CZRDynModule.extend( CZRSektionMths || {} );
  api.CZRFeaturedPageModule   = api.CZRDynModule.extend( CZRFeaturedPageModuleMths || {} );

  //CONTROLS
  api.CZRBaseControl           = api.Control.extend( CZRBaseControlMths || {} );
  api.CZRModulesControl       = api.CZRBaseControl.extend( CZRModuleControlMths || {} );

  //api.CZRBackgroundControl     = api.CZRItemControl.extend( CZRBackgroundMths || {} );

  //api.CZRWidgetAreasControl    = api.CZRDynModule.extend( CZRWidgetAreasMths || {} );


  api.CZRUploadControl         = api.Control.extend( CZRUploadMths || {} );
  api.CZRLayoutControl         = api.Control.extend( CZRLayoutSelectMths || {} );
  api.CZRMultiplePickerControl = api.Control.extend( CZRMultiplePickerMths || {} );



  $.extend( api.controlConstructor, {
        czr_upload     : api.CZRUploadControl,

        //czr_sidebars   : api.CZRWidgetAreasControl,
        //czr_socials    : api.CZRSocialControl,

        czr_modules : api.CZRModulesControl,

        czr_multiple_picker : api.CZRMultiplePickerControl,
        czr_layouts    : api.CZRLayoutControl

        //czr_background : api.CZRBackgroundControl,
        //czr_sektions   : api.CZRSektionsControl
  });





  if ( 'function' == typeof api.CroppedImageControl ) {
    api.CZRCroppedImageControl   = api.CroppedImageControl.extend( CZRCroppedImageMths || {} );

    $.extend( api.controlConstructor, {
      czr_cropped_image : api.CZRCroppedImageControl
    });
  }

})( wp.customize, jQuery, _);
