(function (api, $, _) {
  //Add the DOM helpers (addAction, ...) to the Control Base Class + Input Base Class
  $.extend( CZRBaseControlMethods, api.CZR_Dom || {} );
  $.extend( CZRInputMethods, api.CZR_Dom || {} );

  //INPUTS
  api.CZRInput                 = api.Value.extend( CZRInputMethods || {} );

  //CONTROLS
  api.CZRBaseControl           = api.Control.extend( CZRBaseControlMethods || {} );
  api.CZRDynamicControl        = api.CZRBaseControl.extend( CZRDynamicMethods || {} );
  api.CZRStaticControl         = api.CZRBaseControl.extend( CZRStaticMethods || {} );

  api.CZRBackgroundControl     = api.CZRStaticControl.extend( CZRBackgroundMethods || {} );

  api.CZRWidgetAreasControl    = api.CZRDynamicControl.extend( CZRWidgetAreasMethods || {} );
  api.CZRSocialControl         = api.CZRDynamicControl.extend( CZRSocialMethods || {} );

  api.CZRUploadControl         = api.Control.extend( CZRUploadMethods || {} );
  api.CZRLayoutControl         = api.Control.extend( CZRLayoutSelectMethods || {} );
  api.CZRMultiplePickerControl = api.Control.extend( CZRMultiplePickerMethods || {} );

  $.extend( api.controlConstructor, {
    czr_upload     : api.CZRUploadControl,
    czr_sidebars   : api.CZRWidgetAreasControl,
    czr_socials    : api.CZRSocialControl,
    czr_multiple_picker : api.CZRMultiplePickerControl,
    czr_layouts    : api.CZRLayoutControl,
    czr_background : api.CZRBackgroundControl
  });

  if ( 'function' == typeof api.CroppedImageControl ) {
    api.CZRCroppedImageControl   = api.CroppedImageControl.extend( CZRCroppedImageMethods || {} );

    $.extend( api.controlConstructor, {
      czr_cropped_image : api.CZRCroppedImageControl
    });
  }

})( wp.customize, jQuery, _);