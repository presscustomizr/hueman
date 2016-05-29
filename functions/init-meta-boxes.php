<?php
/*  Initialize the meta boxes.
/* ------------------------------------ */
add_action( 'admin_init', 'hu_custom_meta_boxes' );

function hu_custom_meta_boxes() {

/*  Custom meta boxes
/* ------------------------------------ */
$page_options = array(
	'id'          => 'page-options',
	'title'       => 'Page Options',
	'desc'        => '',
	'pages'       => array( 'page' ),
	'context'     => 'normal',
	'priority'    => 'high',
	'fields'      => array(
		array(
			'label'		=> 'Heading',
			'id'		=> '_heading',
			'type'		=> 'text'
		),
		array(
			'label'		=> 'Subheading',
			'id'		=> '_subheading',
			'type'		=> 'text'
		),
		array(
			'label'		=> sprintf('%1$s</br><i style="font-size:12px">%2$s</i>', __('Select a widget zone for the primary sidebar.', 'hueman'), __('Notes : 1)This will override any default settings of the customizer options panel. 2) The primary sidebar is placed on the left in a 3 columns layout. It can be on the right in a 2 columns layout, when the content is on the left.', 'hueman') ),
			'id'		=> '_sidebar_primary',
			'type'		=> 'sidebar-select',
			'desc'		=> ''
		),
		array(
			'label'		=> sprintf('%1$s</br><i style="font-size:12px">%2$s</i>', __('Select a widget zone for the secondary sidebar.', 'hueman'), __('Notes : 1)This will override any default settings of the customizer options panel. 2) The secondary sidebar is placed on the right in a 3 columns layout.', 'hueman') ),
			'id'		=> '_sidebar_secondary',
			'type'		=> 'sidebar-select',
			'desc'		=> ''
		),
		array(
			'label'		=> sprintf('%1$s</br><i style="font-size:12px">%2$s</i>', __('Select a layout for this page.', 'hueman'), __('This will override any default settings of the customizer options panel.', 'hueman') ),
			'id'		=> '_layout',
			'type'		=> 'radio-image',
			'desc'		=> '',
			'std'		=> 'inherit',
			'choices'	=> array(
				array(
					'value'		=> 'inherit',
					'label'		=> 'Inherit Layout',
					'src'		=> get_template_directory_uri() . '/assets/admin/img/layout-off.png'
				),
				array(
					'value'		=> 'col-1c',
					'label'		=> '1 Column',
					'src'		=> get_template_directory_uri() . '/assets/admin/img/col-1c.png'
				),
				array(
					'value'		=> 'col-2cl',
					'label'		=> '2 Column Left',
					'src'		=> get_template_directory_uri() . '/assets/admin/img/col-2cl.png'
				),
				array(
					'value'		=> 'col-2cr',
					'label'		=> '2 Column Right',
					'src'		=> get_template_directory_uri() . '/assets/admin/img/col-2cr.png'
				),
				array(
					'value'		=> 'col-3cm',
					'label'		=> '3 Column Middle',
					'src'		=> get_template_directory_uri() . '/assets/admin/img/col-3cm.png'
				),
				array(
					'value'		=> 'col-3cl',
					'label'		=> '3 Column Left',
					'src'		=> get_template_directory_uri() . '/assets/admin/img/col-3cl.png'
				),
				array(
					'value'		=> 'col-3cr',
					'label'		=> '3 Column Right',
					'src'		=> get_template_directory_uri() . '/assets/admin/img/col-3cr.png'
				)
			)
		)
	)
);

$post_options = array(
	'id'          => 'post-options',
	'title'       => 'Post Options',
	'desc'        => '',
	'pages'       => array( 'post' ),
	'context'     => 'normal',
	'priority'    => 'high',
	'fields'      => array(
		array(
			'label'    => sprintf('%1$s</br><i style="font-size:12px">%2$s</i>', __('Select a widget zone for the left sidebar.', 'hueman'), __('This will override any default settings of the customizer options panel.', 'hueman') ),
      'id'    => '_sidebar_primary',
      'type'    => 'sidebar-select',
      'desc'    => ''
		),
		array(
			'label'    => sprintf('%1$s</br><i style="font-size:12px">%2$s</i>', __('Select a widget zone for the right sidebar.', 'hueman'), __('This will override any default settings of the customizer options panel.', 'hueman') ),
      'id'    => '_sidebar_secondary',
      'type'    => 'sidebar-select',
      'desc'    => ''
		),
		array(
			'label'		=> 'Layout',
			'id'		=> '_layout',
			'type'		=> 'radio-image',
			'desc'		=> 'Overrides the default layout option',
			'std'		=> 'inherit',
			'choices'	=> array(
				array(
					'value'		=> 'inherit',
					'label'		=> 'Inherit Layout',
					'src'		=> get_template_directory_uri() . '/assets/admin/img/layout-off.png'
				),
				array(
					'value'		=> 'col-1c',
					'label'		=> '1 Column',
					'src'		=> get_template_directory_uri() . '/assets/admin/img/col-1c.png'
				),
				array(
					'value'		=> 'col-2cl',
					'label'		=> '2 Column Left',
					'src'		=> get_template_directory_uri() . '/assets/admin/img/col-2cl.png'
				),
				array(
					'value'		=> 'col-2cr',
					'label'		=> '2 Column Right',
					'src'		=> get_template_directory_uri() . '/assets/admin/img/col-2cr.png'
				),
				array(
					'value'		=> 'col-3cm',
					'label'		=> '3 Column Middle',
					'src'		=> get_template_directory_uri() . '/assets/admin/img/col-3cm.png'
				),
				array(
					'value'		=> 'col-3cl',
					'label'		=> '3 Column Left',
					'src'		=> get_template_directory_uri() . '/assets/admin/img/col-3cl.png'
				),
				array(
					'value'		=> 'col-3cr',
					'label'		=> '3 Column Right',
					'src'		=> get_template_directory_uri() . '/assets/admin/img/col-3cr.png'
				)
			)
		)
	)
);


//post format are @fromfull => keep it in hueman on wp.org
$post_format_audio = array(
  'id'          => 'format-audio',
  'title'       => 'Format: Audio',
  'desc'        => 'These settings enable you to embed audio into your posts. You must provide both .mp3 and .ogg/.oga file formats in order for self hosted audio to function accross all browsers.',
  'pages'       => array( 'post' ),
  'context'     => 'normal',
  'priority'    => 'high',
  'fields'      => array(
    array(
      'label'   => 'MP3 File URL',
      'id'    => '_audio_mp3_url',
      'type'    => 'upload',
      'desc'    => 'The URL to the .mp3 or .m4a audio file'
    ),
    array(
      'label'   => 'OGA File URL',
      'id'    => '_audio_ogg_url',
      'type'    => 'upload',
      'desc'    => 'The URL to the .oga, .ogg audio file'
    )
  )
);
$post_format_gallery = array(
  'id'          => 'format-gallery',
  'title'       => 'Format: Gallery',
  'desc'        => '<a title="Add Media" data-editor="content" class="button insert-media add_media" id="insert-media-button" href="#">Add Media</a> <br /><br />
            To create a gallery, upload your images and then select "<strong>Uploaded to this post</strong>" from the dropdown (in the media popup) to see images attached to this post. You can drag to re-order or delete them there. <br /><br /><i>Note: Do not click the "Insert into post" button. Only use the "Insert Media" section of the upload popup, not "Create Gallery" which is for standard post galleries.</i>',
  'pages'       => array( 'post' ),
  'context'     => 'normal',
  'priority'    => 'high',
  'fields'      => array()
);
$post_format_chat = array(
  'id'          => 'format-chat',
  'title'       => 'Format: Chat',
  'desc'        => 'Input chat dialogue.',
  'pages'       => array( 'post' ),
  'context'     => 'normal',
  'priority'    => 'high',
  'fields'      => array(
    array(
      'label'   => 'Chat Text',
      'id'    => '_chat',
      'type'    => 'textarea',
      'rows'    => '2'
    )
  )
);
$post_format_link = array(
  'id'          => 'format-link',
  'title'       => 'Format: Link',
  'desc'        => 'Input your link.',
  'pages'       => array( 'post' ),
  'context'     => 'normal',
  'priority'    => 'high',
  'fields'      => array(
    array(
      'label'   => 'Link Title',
      'id'    => '_link_title',
      'type'    => 'text'
    ),
    array(
      'label'   => 'Link URL',
      'id'    => '_link_url',
      'type'    => 'text'
    )
  )
);
$post_format_quote = array(
  'id'          => 'format-quote',
  'title'       => 'Format: Quote',
  'desc'        => 'Input your quote.',
  'pages'       => array( 'post' ),
  'context'     => 'normal',
  'priority'    => 'high',
  'fields'      => array(
    array(
      'label'   => 'Quote',
      'id'    => '_quote',
      'type'    => 'textarea',
      'rows'    => '2'
    ),
    array(
      'label'   => 'Quote Author',
      'id'    => '_quote_author',
      'type'    => 'text'
    )
  )
);
$post_format_video = array(
  'id'          => 'format-video',
  'title'       => 'Format: Video',
  'desc'        => 'These settings enable you to embed videos into your posts.',
  'pages'       => array( 'post' ),
  'context'     => 'normal',
  'priority'    => 'high',
  'fields'      => array(
    array(
      'label'   => 'Video URL',
      'id'    => '_video_url',
      'type'    => 'text',
      'desc'    => ''
    )
  )
);

/*  Register meta boxes
/* ------------------------------------ */
  ot_register_meta_box( $page_options );
  ot_register_meta_box( $post_format_audio );
  ot_register_meta_box( $post_format_chat );
  ot_register_meta_box( $post_format_gallery );
  ot_register_meta_box( $post_format_link );
  ot_register_meta_box( $post_format_quote );
  ot_register_meta_box( $post_format_video );
  ot_register_meta_box( $post_options );
}