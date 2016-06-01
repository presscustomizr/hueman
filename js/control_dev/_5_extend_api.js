// (function (api, $, _) {
//   //Add the DOM helpers (addAction, ...) to the Control Base Class + Input Base Class
//   $.extend( CZRBaseControlMethods, api.CZR_Dom || {} );
//   $.extend( CZRInputMethods, api.CZR_Dom || {} );

//   //INPUTS => used as constructor when creating the collection of inputs
//   api.CZRInput                 = api.Value.extend( CZRInputMethods || {} );

//   //MODELS => used as constructor when creating the collection of models
//   //api.CZRMonoModel             = api.Value.extend( CZRMonoModelMethods || {} );

//   //CONTROLS
//   api.CZRBaseControl           = api.Control.extend( CZRBaseControlMethods || {} );
//   api.CZRMultiModelControl     = api.CZRBaseControl.extend( CZRMultiModelMethods || {} );
//   //api.CZRMonoModelControl      = api.CZRBaseControl.extend( CZRMonoModelMethods || {} );

//   //api.CZRBackgroundControl     = api.CZRMonoModelControl.extend( CZRBackgroundMethods || {} );

//   api.CZRWidgetAreasControl    = api.CZRMultiModelControl.extend( CZRWidgetAreasMethods || {} );
//   api.CZRSocialControl         = api.CZRMultiModelControl.extend( CZRSocialMethods || {} );

//   api.CZRUploadControl         = api.Control.extend( CZRUploadMethods || {} );
//   api.CZRLayoutControl         = api.Control.extend( CZRLayoutSelectMethods || {} );
//   api.CZRMultiplePickerControl = api.Control.extend( CZRMultiplePickerMethods || {} );

//   api.CZRSektionsControl       = api.CZRMultiModelControl.extend( CZRSektionsMethods || {} );

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
//     api.CZRCroppedImageControl   = api.CroppedImageControl.extend( CZRCroppedImageMethods || {} );

//     $.extend( api.controlConstructor, {
//       czr_cropped_image : api.CZRCroppedImageControl
//     });
//   }

// })( wp.customize, jQuery, _);


(function (api, $, _) {
  //Add the DOM helpers (addAction, ...) to the Control Base Class + Input Base Class
  $.extend( CZRBaseControlMethods, api.CZR_Dom || {} );
  $.extend( CZRInputMethods, api.CZR_Dom || {} );

  //INPUTS => used as constructor when creating the collection of inputs
  api.CZRInput                 = api.Value.extend( CZRInputMethods || {} );

  //MODELS => used as constructor when creating the collection of models
  api.CZRMonoModel             = api.Value.extend( CZRMonoModelMethods || {} );

  //CONTROLS
  api.CZRBaseControl           = api.Control.extend( CZRBaseControlMethods || {} );
  api.CZRMultiInputControl     = api.CZRBaseControl.extend( CZRMultiInputControlMethods || {} );
  api.CZRMultiInputDynControl  = api.CZRMultiInputControl.extend( CZRMultiInputDynMethods || {} );

  //api.CZRBackgroundControl     = api.CZRMonoModelControl.extend( CZRBackgroundMethods || {} );

  //api.CZRWidgetAreasControl    = api.CZRMultiInputDynControl.extend( CZRWidgetAreasMethods || {} );
  api.CZRSocialControl         = api.CZRMultiInputDynControl.extend( CZRSocialMethods || {} );

  api.CZRUploadControl         = api.Control.extend( CZRUploadMethods || {} );
  api.CZRLayoutControl         = api.Control.extend( CZRLayoutSelectMethods || {} );
  api.CZRMultiplePickerControl = api.Control.extend( CZRMultiplePickerMethods || {} );

  //api.CZRSektionsControl       = api.CZRMultiInputDynControl.extend( CZRSektionsMethods || {} );

  $.extend( api.controlConstructor, {
    czr_upload     : api.CZRUploadControl,
    //czr_sidebars   : api.CZRWidgetAreasControl,
    czr_socials    : api.CZRSocialControl,
    czr_multiple_picker : api.CZRMultiplePickerControl,
    czr_layouts    : api.CZRLayoutControl,
    //czr_background : api.CZRBackgroundControl,
    //czr_sektions   : api.CZRSektionsControl
  });

  if ( 'function' == typeof api.CroppedImageControl ) {
    api.CZRCroppedImageControl   = api.CroppedImageControl.extend( CZRCroppedImageMethods || {} );

    $.extend( api.controlConstructor, {
      czr_cropped_image : api.CZRCroppedImageControl
    });
  }

})( wp.customize, jQuery, _);