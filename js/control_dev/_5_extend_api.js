
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

  //MODULES => used as constructor when creating the collection of modules
  api.CZRModule               = api.Value.extend( CZRModuleMths || {} );
  api.CZRDynModule            = api.CZRModule.extend( CZRDynModuleMths || {} );

  //COLUMNS => used as constructor
  api.CZRColumn                = api.Value.extend( CZRColumnMths || {} );


  //CONTROLS
  api.CZRBaseControl           = api.Control.extend( CZRBaseControlMths || {} );
  api.CZRBaseModuleControl    = api.CZRBaseControl.extend( CZRBaseModuleControlMths || {} );
  api.CZRMultiModuleControl        = api.CZRBaseModuleControl.extend( CZRMultiModuleControlMths || {} );

  //api.CZRBackgroundControl     = api.CZRItemControl.extend( CZRBackgroundMths || {} );

  //api.CZRWidgetAreasControl    = api.CZRDynModule.extend( CZRWidgetAreasMths || {} );


  api.CZRUploadControl         = api.Control.extend( CZRUploadMths || {} );
  api.CZRLayoutControl         = api.Control.extend( CZRLayoutSelectMths || {} );
  api.CZRMultiplePickerControl = api.Control.extend( CZRMultiplePickerMths || {} );



  $.extend( api.controlConstructor, {
        czr_upload     : api.CZRUploadControl,

        //czr_sidebars   : api.CZRWidgetAreasControl,
        //czr_socials    : api.CZRSocialControl,

        czr_module : api.CZRBaseModuleControl,
        czr_multi_module : api.CZRMultiModuleControl,

        czr_multiple_picker : api.CZRMultiplePickerControl,
        czr_layouts    : api.CZRLayoutControl

        //czr_background : api.CZRBackgroundControl,
        //czr_sektions   : api.CZRSektionsControl
  });


  //provides a meta description of each module
  //=> will determine :
  //1) how to initialize the module model. If not crud, then the initial item(s) model shall be provided
  //2) which js template(s) to use : if crud, the module template shall include the add new and pre-item elements.
  //   , if crud, the item shall be removable
  //3) how to render : if multi item, the item content is rendered when user click on edit button.
  //    If not multi item, the single item content is rendered as soon as the item wrapper is rendered.
  //4) some DOM behaviour. For example, a multi item shall be sortable.
  api.czrModuleMap = api.czrModuleMap || {};
  $.extend( api.czrModuleMap, {
        czr_widget_areas_module : {
            mthds : CZRWidgetAreaModuleMths,
            crud : true,
            sektion_allowed : false,
            name : 'Widget Areas'
        },
        czr_social_module : {
            mthds : CZRSocialModuleMths,
            crud : true,
            name : 'Social Icons'
        },
        czr_sektion_module : {
            mthds : CZRSektionMths,
            crud : true,
            name : 'Sektions'
        },
        czr_fp_module : {
            mthds : CZRFeaturedPageModuleMths,
            crud : true,
            name : 'Featured Pages'
        },
        czr_slide_module : {
            mthds : CZRSlideModuleMths,
            crud : true,
            name : 'Slider'
        },
        czr_text_module : {
            mthds : CZRTextModuleMths,
            crud : false,
            multi_item : false,
            name : 'Simple Text'
        },
        czr_text_editor_module : {
            mthds : CZRTextEditorModuleMths,
            crud : false,
            multi_item : false,
            name : 'WP Text Editor'
        }
  });


  if ( 'function' == typeof api.CroppedImageControl ) {
    api.CZRCroppedImageControl   = api.CroppedImageControl.extend( CZRCroppedImageMths || {} );

    $.extend( api.controlConstructor, {
      czr_cropped_image : api.CZRCroppedImageControl
    });
  }

})( wp.customize, jQuery, _);
