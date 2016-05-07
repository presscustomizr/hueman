
(function (api, $, _) {

  /**
   * @constructor
   * @augments wp.customize.Control
   * @augments wp.customize.Class
   */
  api.CZRBaseControl           = api.Control.extend( CZRBaseControlMethods || {} );
  api.CZRDynamicControl        = api.CZRBaseControl.extend( CZRDynamicMethods || {} );
  api.CZRMultiInputControl     = api.CZRBaseControl.extend( CZRMultiInputMethods || {} );

  //api.CZRBackgroundControl     = api.CZRMultiInputControl.extend( CZRBackgroundMethods || {} );

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
    czr_multi_input : api.CZRMultiInputControl
  });

  if ( 'function' == typeof api.CroppedImageControl ) {
    api.CZRCroppedImageControl   = api.CroppedImageControl.extend( CZRCroppedImageMethods || {} );

    $.extend( api.controlConstructor, {
      czr_cropped_image : api.CZRCroppedImageControl
    });
  }

})( wp.customize, jQuery, _);