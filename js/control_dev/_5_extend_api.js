// (function (api, $, _) {
//   //Add the DOM helpers (addAction, ...) to the Control Base Class + Input Base Class
//   $.extend( CZRBaseControlMths, api.CZR_Dom || {} );
//   $.extend( CZRInputMths, api.CZR_Dom || {} );

//   //INPUTS => used as constructor when creating the collection of inputs
//   api.CZRInput                 = api.Value.extend( CZRInputMths || {} );

//   //MODELS => used as constructor when creating the collection of models
//   //api.CZRItem             = api.Value.extend( CZRItemMths || {} );

//   //CONTROLS
//   api.CZRBaseControl           = api.Control.extend( CZRBaseControlMths || {} );
//   api.CZRMultiModelControl     = api.CZRBaseControl.extend( CZRMultiModelMths || {} );
//   //api.CZRItemControl      = api.CZRBaseControl.extend( CZRItemMths || {} );

//   //api.CZRBackgroundControl     = api.CZRItemControl.extend( CZRBackgroundMths || {} );

//   api.CZRWidgetAreasControl    = api.CZRMultiModelControl.extend( CZRWidgetAreasMths || {} );
//   api.CZRSocialControl         = api.CZRMultiModelControl.extend( CZRSocialMths || {} );

//   api.CZRUploadControl         = api.Control.extend( CZRUploadMths || {} );
//   api.CZRLayoutControl         = api.Control.extend( CZRLayoutSelectMths || {} );
//   api.CZRMultiplePickerControl = api.Control.extend( CZRMultiplePickerMths || {} );

//   api.CZRSektionsControl       = api.CZRMultiModelControl.extend( CZRSektionsMths || {} );

//   $.extend( api.controlConstructor, {
//     czr_upload     : api.CZRUploadControl,
//     czr_sidebars   : api.CZRWidgetAreasControl,
//     czr_socials    : api.CZRSocialControl,
//     czr_multiple_picker : api.CZRMultiplePickerControl,
//     czr_layouts    : api.CZRLayoutControl,
//     //czr_background : api.CZRBackgroundControl,
//     czr_sektions   : api.CZRSektionsControl
//   });

//   if ( 'function' == typeof api.CroppedImageControl ) {
//     api.CZRCroppedImageControl   = api.CroppedImageControl.extend( CZRCroppedImageMths || {} );

//     $.extend( api.controlConstructor, {
//       czr_cropped_image : api.CZRCroppedImageControl
//     });
//   }

// })( wp.customize, jQuery, _);


(function (api, $, _) {
  //Extends with the events manager
  $.extend( CZRBaseControlMths, api.Events || {} );
  //Add the DOM helpers (addAction, ...) to the Control Base Class + Input Base Class
  $.extend( CZRBaseControlMths, api.CZR_Dom || {} );
  $.extend( CZRInputMths, api.CZR_Dom || {} );

  //INPUTS => used as constructor when creating the collection of inputs
  api.CZRInput                 = api.Value.extend( CZRInputMths || {} );

  //MODELS => used as constructor when creating the collection of models
  api.CZRItem                  = api.Value.extend( CZRItemMths || {} );

  //CONTROLS
  api.CZRBaseControl           = api.Control.extend( CZRBaseControlMths || {} );
  api.CZRElement               = api.CZRBaseControl.extend( CZRElementMths || {} );
  api.CZRDynElement            = api.CZRElement.extend( CZRDynElementMths || {} );

  //api.CZRBackgroundControl     = api.CZRItemControl.extend( CZRBackgroundMths || {} );

  api.CZRWidgetAreasControl    = api.CZRDynElement.extend( CZRWidgetAreasMths || {} );
  api.CZRSocialControl         = api.CZRDynElement.extend( CZRSocialMths || {} );

  api.CZRUploadControl         = api.Control.extend( CZRUploadMths || {} );
  api.CZRLayoutControl         = api.Control.extend( CZRLayoutSelectMths || {} );
  api.CZRMultiplePickerControl = api.Control.extend( CZRMultiplePickerMths || {} );

  //api.CZRSektionsControl       = api.CZRDynElement.extend( CZRSektionsMths || {} );

  $.extend( api.controlConstructor, {
        czr_upload     : api.CZRUploadControl,
        czr_sidebars   : api.CZRWidgetAreasControl,
        czr_socials    : api.CZRSocialControl,
        czr_multiple_picker : api.CZRMultiplePickerControl,
        czr_layouts    : api.CZRLayoutControl,
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