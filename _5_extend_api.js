
(function (api, $, _) {

  /**
   * @constructor
   * @augments wp.customize.Control
   * @augments wp.customize.Class
   */
  api.HUBaseControl           = api.Control.extend( HUBaseControlMethods || {} );
  api.HUDynamicControl        = api.HUBaseControl.extend( HUDynamicMethods || {} );
  api.HUMultiInputControl     = api.HUBaseControl.extend( HUMultiInputMethods || {} );

  //api.HUBackgroundControl     = api.HUMultiInputControl.extend( HUBackgroundMethods || {} );

  api.HUWidgetAreasControl    = api.HUDynamicControl.extend( HUWidgetAreasMethods || {} );
  api.HUSocialControl         = api.HUDynamicControl.extend( HUSocialMethods || {} );

  api.TCUploadControl         = api.Control.extend( TCUploadMethods || {} );
  api.HULayoutControl         = api.Control.extend( HULayoutSelectMethods || {} );
  api.TCMultiplePickerControl = api.Control.extend( TCMultiplePickerMethods || {} );

  $.extend( api.controlConstructor, {
    hu_upload     : api.TCUploadControl,
    hu_sidebars   : api.HUWidgetAreasControl,
    hu_socials    : api.HUSocialControl,
    tc_multiple_picker : api.TCMultiplePickerControl,
    hu_layouts    : api.HULayoutControl,
    hu_multi_input : api.HUMultiInputControl
  });

  if ( 'function' == typeof api.CroppedImageControl ) {
    api.TCCroppedImageControl   = api.CroppedImageControl.extend( TCCroppedImageMethods || {} );

    $.extend( api.controlConstructor, {
      hu_cropped_image : api.TCCroppedImageControl
    });
  }

})( wp.customize, jQuery, _);