=== Hueman ===
Contributors: nikeo, alxmedia, d4z_c0nf
Tags: one-column, two-columns, three-columns, right-sidebar, left-sidebar, custom-colors, custom-menu, featured-images, flexible-header, full-width-template, post-formats, sticky-post, theme-options, threaded-comments, translation-ready
Requires at least: 4.6
Tested up to: 5.2.2
Stable tag: 3.4.29
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

> Good looking, fast and mobile friendly theme. Perfect for blogs and magazines websites.

== Description ==
The Hueman theme helps you increase your traffic and engage your visitors. It loads fast and is 100% mobile-friendly according to Google. Best rated theme for blogs and magazines on WordPress.org. Powering 70K+ websites around the world.

== Upgrade Notice ==
= 3.4.29 =
Fixed shortcodes not processed in html widgets.

== Changelog ==
= 3.4.29 September 13th, 2019 =
* fixed : shortcodes not processed in html widgets

= 3.4.28 September 10th, 2019 =
* fixed : add do_shortcode filter cb to widget_text filter hook only if needed. fixes #823
* fixed : post format meta boxes for the block editor. fixes #821

= 3.4.27 August 27th, 2019 =
* fixed : admin notice style on mobile. fixes #816
* improved : better keyboard navigation to comply with new TRT requirements : https://make.wordpress.org/themes/2019/08/03/planning-for-keyboard-navigation/
* improved : option tree updated to v2.7.3

= 3.4.26 July 18th, 2019 =
* fixed : styling issue for comment form cookies consent not correctly displayed. fixes #809

= 3.4.25 June 30th, 2019 =
* fixed : get rid of the perspective property which causes issues in recent chrome versions. see #799
* improved : added image dimensions to the logo. fixes #797
* added : new option to control tags visiblity in single posts. fixes #801
* added : new options to control single author and date post meta visibility. fixes #776

= 3.4.24 June 4th, 2019 =
* improved : Hueman custom widgets can now be overriden from a child theme. fixes #798

= 3.4.23 May 29th, 2019 =
* fixed : possible fatal error in admin

= 3.4.22 May 29th, 2019 =
* fixed : add image dimensions into header image customization using the standard wp function get_header_image_tag. fixes #790 #300
* improved : add an option to control the singular page featured image visibility disabled by default. fixes #793

= 3.4.21 May 8th, 2019 =
* added : new wp_body_open theme Hook. fixes #784

= 3.4.20 April 24th, 2019 =
* fixed : smooth scroll throwing JS errors in latest chrome. fixes #787
* improved : sidebar => add an option to set an order on mobile devices. fixes #779

= 3.4.19 April 9th, 2019 =
* fixed : make sure a default option using 'nimblecheck' type is turned into a boolean.

= 3.4.18 April 5th, 2019 =
* fixed : display correctly taxonomy/post_type_archive titles. fixes #750
* improved : new style for checkboxes in customizer controls. 

= 3.4.17 March 20th, 2019 =
* fixed : possible fatal error in WooCommerce single products. fixes #780

= 3.4.16 March 2nd, 2019 =
* fixed : possible PHP error when upgrading server to PHP 7.0+. fixes #775

= 3.4.15 February 27th, 2019 =
* fixed : wp commentform cookies consent checkbox style. fixes #770
* fixed : search button in the topbar menu now displayed on tablet. fixes #653
* fixed : style blockquotes in comments. fixes #772
* improved : footer credits now uses parsable tags like {{year}}.

= 3.4.14 February 13th, 2019 =
* fixed : BBPress profile links displaying unwanted dots. fixes #765
* added : a new RGB+ alpha color control in the customizer, allowing transparency customization. fixes #767

= 3.4.13 February 11th, 2019 =
* fixed : Custom subheading option not reachable. fixes #760
* fixed : the blog category filter for pro infinite scroll. fixes #755
* fixed : social icon links like tel:*** or skype:**** or call:**** should be allowed
* fixed : the back to top icon font-size should be fixed and not in em. fixes #758
* fixed : removed title attribute "Permalink To" on thumbnails links in post lists. fixes #763
* fixed : white-space CSS rule problem with long tag. fixes #764
* improved : compatibility with Disqus comments system. fixes #754

= 3.4.12 January 16th, 2019 =
* improved : use default browser title tooltip for the social icons. fixes #731
* added : the option to filter the home/blog posts by category. fixes #659

= 3.4.11 December 19th, 2018 =
* improved : the new block editor style. Especially to enlarge the editor content width. fixes #732

= 3.4.10 December 15th, 2018 =
* fixed : admin style not compatible with WP5.0
* fixed : WooCommerce related product position in some cases. fixes #729
* improved : update FontAwesome to v5.5.0. fixes #727
* improved : compatibility with Nimble Builder v1.4.0
* improved : analytics params to external links

= 3.4.9 November 23rd 2018 =
* fixed : set only the featured posts thumbnail img width to 100%. fixes #703
* fixed : hu_is_customize_left_panel() => the check on $pagenow does not work on multisite install
* added : add sidebars background color option. fixes #718
* improved : add wp 5.0 compatibility patch. fixes #719
* improved : improve gutenberg alignment compatibility. fixes #702
* improved : Nimble Builder compatibility. Don't load css and javascript front assets when using the full Nimble template
* improved : replace select2 with our namespaced czrSelect2

= 3.4.7 October 24th 2018 =
fixed : The "cover image" block of the new WP editor has been renamed "cover". See https://github.com/WordPress/gutenberg/pull/10659, but posts created with the former cover-image block will still use the wp-block-cover-image css class. related to #702

= 3.4.6 October 24th 2018 =
* added : support for new WordPress editor, block cover image alignwide/alignfull
* improved : readme.txt file, according to the latest TRT requirements https://make.wordpress.org/themes/2015/04/29/a-revised-readme/

= 3.4.5 October 13th 2018 =
* fixed : prefixed TGMPA class with HU_ to fix potential collision with other plugins using the same class. see issue https://github.com/presscustomizr/customizr/issues/1603

= 3.4.4 October 12th 2018 =
* improved : display only one admin notification ( if any ) at a time
* improved : various minor plugin compatibility improvements

= 3.4.3 October 8th 2018 =
* added : a new option for collapsible submenus in mobiles

= 3.4.2 October 7th 2018 =
* Fix: Gutenberg reponsive video embed compatiblity issue. fixes #698
* Imp : better Nimble section builder integration

= 3.4.1 August 1st 2018 =
* imp : adapt the post format metaboxes to the Gutenberg editor plugin
* fix: make the color of the external link icon the same as the user defined primary color. fixes #686
* fixed : url validation broken in the social links module
* added : new option to force the global column layout, even in contexts where it has been customized
* added : new option to disable the icon + text before the archive titles
* added : new option to use the original featured image size in grids.fixes #691
* added : Strava social network in the list of icons. fixes #162

= 3.4.0 June 27th 2018 =
* Improvements : Performance and UX enhancements made to the live customizer. Compatibility with the contextualizer feature introduced in Hueman Addons v2.1.0.

= 3.3.28 June 22nd 2018 =
* Improvements : various fixes and improvement to stay compliant with the WordPress.org themes requirements : removed previewer dummy content and image, removed welcome note, removed help icon link in the admin bar

= 3.3.27 February 11th 2018 =
* Fix : update notice not always dismissable in admin

= 3.3.26 February 6th 2018 =
* Fix : in admin make sure the stylesheet to fix the wp-footer position is printed in the relevant context
* Imp : add translation catalogue (pot file)
* Imp : add the latest WordPress.org langpacks (for pro)
* Imp : update font awesome resources to the latest version (5)
* Imp : make function hu_is_authorized_tmpl pluggable so it can be redefined to include custom templates. fixes #564 #610

= 3.3.25 November 20th 2017 =
* Fix : WP 4.9 Code Editor issue could impact the custom css customizer option when checking errors in the code

= 3.3.24 November 16th 2017 =
* Fix : custom css compatibility issue with WP4.9. Fixes #596

= 3.3.23 November 13th 2017 =
* Fix : Contact Form 7 recaptcha CSS style issue. Fixes #566
* Fix : incorrect css rules for .screen-reader-text. Fixes #586
* Improved : the featured image of a page should be displayed in search results. Fixes #585
* Improved : compatibility with WP4.9, target release date November 14th 2017

= 3.3.22 October 14th 2017 =
* improved : various improvements in the welcome / about admin page
* improved : added a filter for the footer credits
* improved : performances => style.css doesn't have to be loaded if no child theme used.
* improved : a child theme css is now loaded after the css rules generated by the user options. fixes #577
* improved : user option generated css is now printed using wp_add_inline_style()

= 3.3.21 October 3rd 2017 =
* fix : bottom portion of sidebar gets cut off in tablet view when content is short. Fixes #476.
* fix : archive and page titles font-size. Fixes #535.
* fix : potential loss of customizations when wp_cache_get() returns false. Fixes #571.
* fix : social links not refreshing in the footer on initial customization ( when nothing printed yet )
* fix : headings hidden on mobile when no header image displayed. Fixes #527.
* added : new option js-mobile-detect for optional javascript Mobile device detection. Loads the mobile-detect script ( 35 kb ) when checked
* added : mobile-detect.js library conditionally enqueued
* improved : replaced the ajax call by a javascript library to check if the device is mobile. Fixes #567.
* improved : admin page wording and style
* improved : Footer credits made smaller. Now use the WordPress icon. Default link to the Hueman theme page instead of presscustomizr.com.
* updated : customize control js

= 3.3.20 August 2nd 2017 =
* improved : added support for pagination in pages using <!--nextpage-->. Compatible with the WP-PageNavi plugin. fixes #550

= 3.3.19 July 26th 2017 =
* fixed : fix wp.com sites managing compatiblity. fixes #541
* fixed : position of the header widget on mobile viewports fixes #543
* improvement : site title and logo options are mutually exclusive. Fixes #518

= 3.3.18 July 6th 2017 =
* fixed : more specificity for sidebars selectors in mobile viewports. Fixes #531.

= 3.3.17 July 3rd 2017 =
* fixed : correctly include front js parts

= 3.3.16 July 3rd 2017 =
* fixed : more css specificity added to the sidebars when building the dynamic style

= 3.3.15 July 3rd 2017 =
* fixed : more css specificity added to the sticky sidebars. Fixes #529
* fixed : the images of the featured post could be too high in some scenario. Two new image sizes have been added and a max-height depending on the culumn layout has been set in the css rules. fixes #525.

= 3.3.14 June 29th 2017 =
* fixed : huajax used to set the browser agent when the sticky sidebar is on might be too slow. Restrict the ajax query only when user has checked the sticky sidebars for either mobile devices or desktops, or both. Fixes #523.
* fixed : related posts should not inherit the main post-title fittext font-size
* added : new option in Adanced options > Mobile Devices > Make font sizes flexible. , responsive font-size is unchecked by default. Fixes #522

= 3.3.13 June 26th 2017 =
* fixed : when doing an ajax request on front, always make sure that the response is a well formed object, and fallback on the localized param if not
* updated : flexslider.min.js. Fixes : #511
* fixed : removed check_ajax_referer( 'hu-front-nonce', 'HuFrontNonce' ); when doing a front end ajax request. Should fix #512
* fixed : boxed - avoid header elements to horizontally overflow the viewport.fixes #508 3. and 4.fixes https://github.com/presscustomizr/hueman-pro-addons/issues/48
* fixed : when the layout is boxed + sticky header on on dekstop, the width of the header should be inherited from the used width (or default one ), and not rely on %.
* fixed : comment reply font size too small when viewed in mobile. fixes #504
* fixed : wp contact form 7 style. fixes #491
* fixed : on the blog page, the ( optional ) featured posts thumbnail size was not large enough when using a 1 or 2 columns layout. 'thumb-large' size is now only used for 3 columns layout. Fixes #350
* fixed: fix use of the add_editor_style wp function : needs relative paths + add rtl class to the inline font style in the wp editor see https://github.com/presscustomizr/customizr/issues/926
* added : a custom event "header-image-loaded" : partially fixes https://github.com/presscustomizr/hueman/issues/508
* replaced : hu_sanitize_hex_color() by core WP maybe_hash_hex_color doing the same job since WP 3.4
* improved : change page title tag from h2 to h1 to be consistent with single posts
* improved : increased .page-title font-size from 1em to 1.3em
* improved : .single .post-title from 2.375em to 2.62em => to make them taller than h2 title inside the content. Fix #515
* improved : 'header-mobile-sticky' classes shall not be added to the body element when 2 menus ( 'both_menus') are displayed on mobiles
* added : new localized params for a fittext implementation on front
* improved : slightly increased the max font-size of comments from 0.875rem to 0.93rem
* added : the headings ( Hx ) font size is now better resized for all type of devices with a dynamic resizing. Use fittext.js => based on the heading's parent container width, instead of relying on the css @media queries, not covering all device dimensions.
* added : include Custom Post Types in post lists ( archives and search results ). In archives, it handles the case where a CPT has been registered and associated with an existing built-in taxonomy like category or post_tag. Fixes #513
* added : new filters for hueman posts widget to alter the query args and the date format. Fixes #343
* added : '__before_logo_or_site_title' and '__after_logo_or_site_title' in hu_print_logo_or_title()

= 3.3.12 June 6th 2017 =
* fixed : when topbar is sticky and header has an header image, wait for the image to be fully loaded before setting the header's height. Fix #486
* fixed Issue in hu_get_raw_option, php warning. wp_cache_get( 'alloptions', 'options' ) should always be cast to an array(). It might happen that it returns a boolean. fixes #492
* fixed : fix inaccurate smartload img regex pattern => file extensions were not correctly taken in account
* changed : hu_get_placeholder_thumb() to hu_print_placeholder_thumb(). Retrocompatibility handled.
* added : js matchMedia utility. fallsback on old browsers compatibility
* improved : in hu_set_option remove redundant retrieving of theme options

= 3.3.11 May 16th 2017 =
* fixed : Compatibility issue with the Event Calendar plugin on date picker ( fixes #454 )
* fixed : wrong variable name in HU_utils::hu_cache_dp_options()
* fixed : search field background color in main header not inheriting the correct color
* fixed : desktop tobpar down arrow not showing up because fired too early
* fixed : sticky sidebars not properly disabled on tablets when option set
* fixed : php notice for undefined HUEMAN_VERSION constant in admin
* fixed : replaced OT_VERSION by time() for ot-admin-css as version param
* added a new option : in Header Design, "Apply a semi-transparent filter to the topbar on scroll." Enabled by default. ( fixes #469 )
* updated : Hueman Addons thumbnail
* updated : hu_related_posts by hu_get_related_posts. Retro compatibiliy handled in functions/init-retro-compat.php
* improved : esc_url gmpg.org/xfn/11 to better support https protocol
* improved : remove ot datepicker and timepicker - hueman doesn't use them fixes #454
* improved : customizer control visibility dependencies
* improved : get wp_is_mobile() on front with an ajax request. Fixed #470
* improved : utility hu_booleanize_checkbox_val()
* improved : Mobile menu, if the selected menu location has no menu assigned, the theme will try to assign another menu in this order : topbar, mobile, header.
* improved : mobile children menu items style
* improved : mobile menu search field centering and width. Use of css calc()
* improved : the header ads widget can now be displayed on top of the header image
* improved : tmpl parts/related-posts now loaded with hu_get_template_part() to easily override it
* added : mobile menu, specific for mobile devices
* added : mobile menu notice for admin user if not mobile menu assigned
* added : new option to set a specific logo for mobile devices
* added : new option to print the logo / title and tagline on top of the header image
* added : new option Display the site title in the header. Enabled by default
* added : include attachments in search results
* added : fitText jQuery plugin ( < 1kb )
* added : js ajax utility
* added : utility hu_user_can_see_customize_notices_on_front()
* added : filter 'hu_is_related_posts_enabled' as condition to display the related_posts tmpl
* added : new option to include attachment images in search results. In the customizer, Advanced Options > Search Results.
* added : a dismissable welcome note on front for new users

= 3.3.10 April 28th 2017 =
* fixed : blog description rendering and blogdescription partial refresh fixes #450
* fixed : hu_get_search_title printing icons fixes #456
* fixed : fix IE11 js compatibility fixes #435
* fixed : Sticky sidebar, disabling on mobile should be consistent with wp_is_mobile()
* fixed : header title or logo is not anymore wrapped in a h1 tag
* added : desktop menus search field options. Users can now add the search field in top menu or in the header menu. Implemented for desktop and mobile devices.
* added : hu_get_id() utility
* added : HU_IS_PRO_ADDONS constant
* added : implemented pro link
* added : implemented a better sticky menu options. Users can now choose between : don't show on scroll, always visible, reveal on scroll up. Implemented for desktop and mobile devices.
* improved : front end javascript framework performances
* improved : sidebars are not sticky by default
* improved : style.css comments
* improved : WooCommerce compatibility

= 3.3.9 April 6th 2017 =
* fixed : update flexslider to the latest version #427
* fixed : topbar width when global layout is boxed
* fixed : the topbar menu should be the page menu if not set in preview demo mode
* added : a new section header menus in the customizer
* added : 2 new options to enable sticky menu on desktop and on mobile
* added : 2 utility boolean functions hu_is_topbar_displayed() and hu_is_header_nav_displayed()
* added : 2 new options to control the visibility of the header widget zone
* added : a search bar in the mobile menu
* Imp: avoid woocommerce3.0 warnings on use of deprecated functions

= 3.3.8 April 5th 2017 =
* fixed : home layout not applied if static home page choosen
* fixed : prevdem mode should be turned off when user starts customizing
* fixed : user defined WP core settings like show_on_front should be preserved if customizing in prevdem mode
* fixed : don't wrap logo in h1 tag
* added match Media polyfill
* updated the parallax jquery plugin => added a matchMedia option set to 'only screen and (max-width: 768px)' by default
* added tmpl parts/header-nav-main.php
* added new hamburger menu markup, css + js
* improved : mobile menu slide up down using jQuery built-in methods
* improved : display a default page menu for topbar in prevdem mode
* improved : use the real template path in function hu_get_content()
* improved : only dispay the social link notice if user is_super_admin()
* added : utility hu_print_mobile_btn() used to render the mobile buttons in the header
* added : animated mobile menu button
* added : mobile menu style customizer option
* removed : dynamic style option. Dynamic style is now applied for each option as soon as the user change the option to a value different than default.

= 3.3.7 March 8th 2017 =
* fixed : drag resize image inserted into visual editor #415

= 3.3.6 March 1st 2017 =
* fixed : bug on threaded comments font-size getting too small since latest update

= 3.3.5 February 25th 2017 =
* Fixed : array to string error with hu_is_checked()
* Fixed : selective refresh disabled when link widget enabled. cf WP core ticket #39451
* Fixed : correctly handle sizes attribute when smartloading resp imgs ( fixes #316 )
* Improved : img to smartload must have an src which matches an allowed ext. Fixes issues with Ultimate Membership Pro
* Improved : add hueman specific widgets panel icon as inline customizer js
* Improved : front end jQuery plugins, rightly handle sizes/data-sizes attribute replacement in php
* Improved: customizer social links module user interface
* Improved : introduced hu_get_content( $tmpl ) which takes care of all content rendering inside section > .pad accross the theme
* Improved : post messaging for the social links customization
* Improved : customizer font option set to postMessage
* Improved : body font size set to 1rem == 16px in all browsers
* Improved : font sizes set in relative em instead of px unit
* Improved : the font list is now defined in one place in init-core.php
* Added : utility hu_is_real_home() => handles the case when the user want to display a page on home but did not pick a page yet
* Added : Gitlab icon to social links
* Added : wp_add_inline_style() on front allowing to add user option based css
* Added : a new template for the WordPress loop named post-list-articles.php for index.php, search.php and archive.php
* Added : 6 content templates in tmpl/ use to render the various contextual content : single, page, archive, search, 404, index
* Added : website font-size option in the customizer
* Added : icon size option for the social links
* Added : better support for WooCommerce
* Added : user font family to the wordpress editor
* Removed ru_RU translation files because it is not completed online

= 3.3.4 January 4th 2017 =
* fixed : customizer not loading when deprecated link widget is enabled

= 3.3.3 December 28th 2016 =
* fixed : customizer freezing on Safari 10.0.2, when Hueman Addons enabled with WP 4.7+ (#375)
* fixed : some widget area could not be controllable for specific pages (#374)
* improved : code : better syntax for boolean utility hu_is_customizing()

= 3.3.2 December 21st 2016 =
* fixed : quotes not being properly escaped in the customizer, leading to issues with some languages

= 3.3.1 December 19th 2016 =
* fixed : customizer frozen in an infinite load in some specific cases
* improved : featured-posts-include is displayed in the customizer only when is_home() context
* removed : Japanese translation translated 100% on wp.org

= 3.3.0 December 17th 2016 =
* fixed : php version older than 5.2 compatibility problem (#361)
* fixed : case when background-attachment is inherit (#363)
* fixed : set option use-header-image default to false
* fixed : default page menu in footer not taken in account (#368)
* added : support for customize selective refresh for header image
* added : support for customize selective refresh for site title
* changed : disable the default header page menu
* changed : in parts/header-main.php, echo hu_site_title() has been replaced by hu_print_logo_or_title(). The function hu_site_title() has been kept in the theme to ensure back compatibility for child theme users
* removed : Spanish, Persian and Czech translation files (es_ES, fa_IR, cz_CZ),now more than 95% translated on wp.org
* improved : avoid img smartload php parsing in ajax requests
* improved : customizer UI
* improved : compatibility with the scope feature of Hueman Addons
* improved : de_DE language file now translated at 97%, .po files removed from the theme. thanks @jaylinski
* improved : theme's option performances

= 3.2.12 December 6th 2016 =
* added : support for customize selective refresh for widgets
* improved : UI for custom css in the customizer

= 3.2.11 December 5th 2016 =
* updated : customizer made compatible with WP 4.7
* updated to Font Awesome 4.7.0 (#352)
* added : a home icon in the customizer
* fix : always check the existence of controls and settings instances before altering them ( #340 )

= 3.2.10 November 4th 2016 =
* fixed : php7 compatibility issues (#335)
* fixed : check if custom_logo is registered first for backward compatibility => custom_logo was introduced in WP 4.5. (#338)
* fixed : search results and archive pages must be included in the post list context check (#331)
* fixed : page=welcome.php. Changelog not properly displayed (#328)
* improved : Moved has_post_thumbnail() check inside the utility hu_the_post_thumbnail()
* improved : moved all preview demo actions and filter into a separate php file
* improved : core files reorganization. functions/init-core.php loads the various core files in a clearer sequence.
* improved : replace post loop counter with core variable (#274), in index.php, archive.php, search.php. No impact for child theme users.
* improved : in the customizer, the section 'Blog Design and Content' has been renamed 'Post Lists Design and Content : Blog, Archives, Search Results'
* improved : included all .po translation files in the theme between 30 and 95% translated (#325)
* improved : disabled the default page menu by default for multisite installs (#326)
* improved : added a note in the "Menus" customizer panel, explaining where to disable the default header page menu. (#329)
* improved : don't display widget placeholder when previewing the theme
* removed : useless old functions/theme-options.php file, related to the previous option system.

= 3.2.9 October 11th 2016 =
* fixed : WP embed not displayed correctly #298
* fixed : the saved item of mono item module has to be cast to array #323
* fixed : <code> blocks not formatted in comments fix #322
* fixed : WP embed not displayed correctly #298
* added : better demo placeholder thumbnail
* improved : replaced hu_is_child() by WP core function
* improved : placeholder thumb style
* improved : customizer js code updates
* removed :  custom.css File From Theme. A  better option is for the user to install a child theme or use a plugin. #319

= 3.2.8 September 29th 2016 =
* improved : remove unused code
* improved : set avatar size to 48px by default, like the stylesheet.apply_filters('hu_avatar_size', 48 )

= 3.2.7 September 29th 2016 =
* fixed : use WordPress core method the_widget() to render the optional default widgets

= 3.2.6 September 27th 2016 =
* fixed : footer page menu is disabled by default
* improved : default widgets in sidebars are now using their own instances

= 3.2.5 September 26th 2016 =
* fixed : don't use iCheck() js library for nav_menu* controls
* Imp: add requestAnimationFrame js polyfill. This improves the scroll event performance for all browsers.
* fixed : blinking images when the smart load is enabled
* fixed : 'blog-standard' boolean option was not handled with hu_is_checked() in the index template
* improved : hu_get_customizer_map(). Now can return a partial map. For example only the settings.
* added : support for WP custom logo. Backward compatibility : uses the existing logo image if already set. Still support the logo features for WP versions < 4.5
* added : a grid-item class to the post list article
* added : a grid-wrapper id to the post-list wrapper div element
* added : customizer : active_callback param for some sections and controls => better contextualisation of the customization
* added : customizer : Front Page Content section in the Content panel. Includes the reading WP default settings : static front page, blog page, ...
* added : option, the front page can be empty
* added : hu_is_home_empty() utility
* added : hu_is_post_list() utility. Typically used to contextualize the customization.
* added : in customizer > Content > Front Page, a link to blog design when relevant in the front page content section
* added : a consoleLog utility for the front js code
* added : svg animation plugins, dependencies : _, Vivus and HUParams
* added : 3 options in customizer to control default widgets. Enabled by default.
* added : default widgets are printed in the primary and secondary sidebars if no widgets have been added and if the options to display default widgets are enabled.
* added : default page menu in the header and footer if no menu assigned to those locations
* added : options in customizer to deactivate the default page menus

= 3.2.4 September 20th 2016 =
* improved : implement add_theme_support( 'custom-header') with the header_image theme_mod, in place of the previous header-image hueman option. Ensure retrocompatibility with the previous option.

= 3.2.3 September 12th 2016 =
* fixed : Plugin recommendation code was not up to date. Updated to TGMPA v2.6.1

= 3.2.2 September 11th 2016 =
* fixed : dismiss link not showing up in the Hueman Addons plugin recommendation admin notice
* added : title utility functions like hu_get_search_title()
* added : new template parts/single-heading.php, called in the template single.php
* improved : hu_get_template_part : added a boolean wp filter using the template name as param
* improved : In templates : 404, archive, page, search, child menu, index. Replace get_template_part() by hu_get_template_part()
* improved : template parts/page-title.php

= 3.2.1 September 7th 2016 =
* fixed : social networks javascript error in the customizer when upgrading from old versions (below 3+) to v3.2.0 (issue #296 )
* fixed : add back the comment section in the customizer, accidentally removed in the latest version (issue #292 )
* fixed : include dev-font-awesome.css in the build (fix issue #295 )
* added : TGMPA plugin recommendation class for Hueman Addons
* added : waypoint js lib (+9ko in script)
* imp : improve the events calendar compat with the img smartload feature
* imp : wrapper the_post_thumbnail into hu_the_post_thumbnail => fixes smart load img conflicts with plugins, we now only filter our own filter and not WP one.
* imp : header.php is now calling a sub-template, parts/header-main.php
* imp : top nav is rendered with a sub-template, parts/header-nav-topbar.php

= 3.2.0 September 2nd 2016 =
* added : new option to enable a smoother scrolling. In Global Settings > Smooth Scroll
* added : new option to automatically add an icon next to external links inside the post content. In Global Settings > General Design Options
* added : new option to improve the page load performances : smart image load. In Global Settings > Performances and SEO
* improved : (php) better format for the 'title' tag with wp_title filter
* added : (php) plugin compatibility for image smartload for buddypress, jetpack and ultimate resp. image slider
* improved : (js) better front end framework
* fixed : Enqueue Font Awesome instead of using hard coded @font-face rule in the stylesheet (issue #273)
* updated : Font Awesome icons to version 4.6.3. SnapChat added to the socials.

= 3.1.7 August 23rd 2016 =
* fixed : rss-feed option breaking plugins compatibility. https://wordpress.org/support/topic/bug-reportrequest-please-dont-break-rss-feeds?replies=1#post-8743789 ( fixes github issue #256 )

= 3.1.6 May 31th 2016 =
* fixed : publication date not showing up on single post
* fixed : Parse error in the customizer when PHP version < 5.3
* removed : completed translations on wp.org : French and Italian

= 3.1.5 May 30th 2016 =
* updated : screenshot to 1200x900

= 3.1.4 May 30th 2016 =
* fixed : Use get_option date_format for all dates
* added : background image option
* added : social links partial refresh in the customizer

= 3.1.3 May 4th 2016 =
* fixed : the author link in posts
* fixed : duplicated id html attributes for social links and tabs widget

= 3.1.2 May 3rd 2016 =
* fixed : Language Label in Translation Files
* fixed : the author name links to the post itself
* fixed : Featured post slider controls (arrows) overflow content container when blog heading is disabled
* fixed : Header image alt attribute is empty.
* fixed : Change Default Widget Names and CSS id properties. Could be in collision with some plugins
* added : Featured posts : new option to display the full content (instead of the excerpt) of the featured posts. Modified template : content-featured.php.
* added : Featured posts : swipe gesture supported on mobile devices like tablets and smartphones
* added : Customizer : Pre setup step when adding a new widget zone or social icons.
* improved : Customizer user interface have been improved for the social links and the widget zones. It's now easier to drag, edit and remove items.
* improved : Introduced a pluggable function ( hu_print_placeholder_thumb() )to print the placeholder thumbnail. Modified templates : content-featured.php, content.php, parts/related-posts.php
* updated : jQuery FlexSider to v2.6.0 (latest). Support swipe touch navigation
* changed : Header widget and full width footer widget are now enabled by default
* changed : The footer-ads option has been moved in the Footer Design section. The title and description of this setting have been clarified.

= 3.1.1 April 18th 2016 =
* fixed : the option "featured-posts-include" depending on "featured-posts-enabled" was still altering the query even if "featured-posts-enabled" was unchecked in the customizer
* fixed : Allow child themes to load translation files : By changing the call of the path on load_theme_textdomain from get_template_directory to get_stylesheet_directory we allow the translation of the theme through child themes. Without this, a child theme won’t load their own language files even by hooking a function on after_setup_theme action callng load_theme_textdomain and/or load_child_theme_textdomain.
* added : New option in customizer > Global Settings > Performances and SEO > Use Structured Data Markup. Implements Google Micro-formats compatibility for author, dates, title, entry content.
* added : new option in the customizer to control the visibility of the help button and the "About Hueman" admin page
* updated : single.php for a better compatibility with wp_pagenavi for multi-part posts
* fixed : better titles for the sidebar metaboxes for the single post and page
* fixed : primary and secondary widget zone descriptions
* updated : German translation de_DE
* updated : Italian translation it_IT
* updated : Russian translation ru_RU
* updated : French translation fr_FR
* added : Turkish translation tr_TR
* added : Persian translation fa_IR


= 3.1.0 April 16th 2016 =
* fixed : wrong path to the default font Titillium in main stylesheet
* fixed : child theme stylesheet : style.css is loaded again as a dependency of the parent Hueman theme style, to make it easier to override the main stylesheet rules
* fixed : php notice undefined var _faq_url in /wp-content/themes/hueman/functions/class-admin-page.php

= 3.0.12 April 15th 2016  =
* fixed : social icon default color is back to rgba(255,255,255,0.7)
* fixed : added back the feedburner rss feed option in customizer > Global Settings > Site Identity
* fixed : added back the color-footer option in customizer > Global Settings > General Design Options
* added : performance option to load the not minified front-end stylesheet
* improved : performance, don't load js/css files that are not needed in a given context, like flexslider and jqueryplayer
* improved : moved style.css rules in assets/front/css/dev-common.css
* improved : performance, group front-end stylesheets style.css, responsive.css and font-awesome.css in one single file to reduce the number of http requests
* improved : some customizer color settings are now changing without refreshing the page
* updated : Font Awesome updated to the latest version 4.6.1

= 3.0.11 April 14th 2016  =
* added translated strings for the customizer
* added rss social icons, made it the default one
* fixed hover color for social links not working
* fixed in customizer, the featured-category visibility when feature posts uncheck
* improved : safely allow html for the blog heading, subheading and footer copyright
* changed : customizer style back to wp default for some elements

= 3.0.10 April 13th 2016  =
* Moved options from the previous admin option ( Appearance > Theme Options ) to the customizer panel. Users settings from a previous version are being preserved an re-used in the customizer.
* New settings organization. In the customizer, the settings have been reorganized in 5 panels : Global settings, Header, Content, Footer, Dynamic Sidebars and Widgets.
* Added a new way to create dynamic content with widgets for a given context (home, page, archive ...) and in a specific location of the page ( right sidebar, footer left, ...)
* Added backward compatibility for the renamed functions used in the templates, like alx_social_links() now is hu_social_links()
* Fixed backward compatibility issue with already declared old functions in child theme
* Added back the featured-category option
* Fixed undefined function ot_register_meta_box()
* Fixed blog page sidebars not showing up
* Fixed alx_layout_class() function undefined in child themes

= 1.5.7 November 24 2015 =
* Updated to OptionTree 2.5.5
* Updated to Font Awesome 4.5.0
* Updated to TGM Plugin Activation 2.5.2

= April 23 2015 - 1.5.6 =
* Updated to TGM Plugin Activation 2.4.1

= April 22 2015 - 1.5.5 =
* Updated to OptionTree 2.5.4
* XSS security fixes
* Added additional Google fonts

= February 26 2015 - 1.5.4 =
* CSS cleanup

= February 24 2015 - 1.5.3 =
* Removed post format meta boxes markup as required

= February 24 2015 - 1.5.2 =
* Removed post format meta boxes as required

= February 15 2015 - 1.5.1 =
* Updated to OptionTree 2.5.1
* Added Responsive Lightbox as recommended plugin
* Added missing wp_reset_postdata to recent and featured posts - @Marco Almeida

= February 6 2015 - 1.5.0 =
* Added missing wp_reset_postdata to tabs and posts widgets - @Marco Almeida
* Optimized search results - @Marco Almeida
* Updated language files

= February 6 2015 - 1.4.9 =
* Fixed dropdown menus for iPhone
* Fixed toggle sidebars for iPhone and iPad
* Fixed typos in functions.php - @jaylinski (via GitHub)
* Updated to jPlayer 2.9.2

= January 29 2015 - 1.4.8 =
* Fixed double title tag

= January 22 2014 - 1.4.7 =
* Added text domain to stylesheet

= January 19 2014 - 1.4.6 =
* Added WP 4.1 title tag support
* Added standard blog list option
* Added header and footer widget ads areas
* Moved disable sidebar top option to sidebars section
* Updated to OptionTree 2.4.6

= October 10 2014 - 1.4.5 =
* Disabled all post formats with additional meta fields, as required
* Updated documentation
* Added option to turn off sidebar top boxes
* Fixed gallery format post slider, downgraded to flexslider 2.1 instead of 2.2
* Re-fixed responsive Jetpack embeds

= September 18 2014 - 1.4.4 =
* Added option to turn recommended plugins off
* Fixed protocol-relative URLs for Google Fonts  @chkorn (via GitHub)
* Fixed Twitter embeds - @ShinichiNishikawa (via GitHub)
* Fixed capability with WP-UserAgent - @JayXon (via GitHub)

= September 3 2014 - 1.4.3 =
* Updated to Font Awesome 4.2.0
* Minor css fixes

= August 20 2014 - 1.4.2 =
* Updated to OptionTree 2.4.2
* Removed bundled light plugin from package

= May 17 2014 - 1.4.1 =

* Updated to OptionTree 2.4.0
* Updated to Font Awesome 4.1.0
* Improved hu_wp_title function - @Gummibeer (via GitHub)

= April 16 2014 - 1.4.0 =
* Fixed IE8 blank page issue, downgraded to stable selectivizr.js 1.0.2 instead of 1.0.3b

= Mars 31 2014 - 1.3.9 =
* WP-PageNavi optimizations - @devinsays (via GitHub)
* Fixed admin comment accent color styling option
* Restructured comment/pingback counts for no plural translation
* Optimzed and removed unnecessary css

= Mars 24 2014 - 1.3.8 =
* Updated to OptionTree 2.3.4

= February 10 2014 - 1.3.7 =
* Updated to OptionTree 2.3.0
* Changed checkbox options to the new on-off toggle
* Added additional Google fonts
* Added styling option to recolor the header menu area
* Added option to disable featured image placeholders - @fran-kee (via GitHub)
* Updated help dropdown information and included theme documentation with the theme

= January 29 2014 - 1.3.6 =
* Fixed comment counts to be hidden when disabled
* Removed inline css from comments template

= January 29 2014 - 1.3.5 =
* Updated to OptionTree 2.2.2

= January 23 2014 - 1.3.4 =
* Updated to OptionTree 2.2.1

= December 27 2013 - 1.3.3 =
* Removed incorrect fix for bbpress page titles/images

= December 27 2013 - 1.3.2 =
* Added missing "says:" language string for tabs widget
* Added direct links and search IDs to CC0 images used in screenshot.png to readme.txt

= December 24 2013 - 1.3.1 =
* Added new content-featured.php

= December 22 2013 - 1.3.0 =
* Updated screenshot.png to larger size for WP 3.8 - all images are now CC0 (GPL-compatible)
* Added nofollow to footer credit links
* Fixed footer widget boxes to only show in admin if enabled
* Optimized font css

= December 19 2013 - 1.2.9 =
* Updated to the new fluid-layout and fixed-layout WordPress css tags

= December 18 2013 - 1.2.8 =
* Moved load_theme_textdomain from hu_setup to hu_load function
* Added nofollow to social links
* Fixed blockquote icon position
* Fixed standard gallery captions being slightly visible even if not hovered over
* Fixed text caption boxes top padding
* Added icon for Twitter embeds
* WordPress 3.8 fixes:
* Fixed topbar spacing with admin bar enabled from 28px to 32px
* Improved admin styling for all custom widgets
* Fixed OptionTree admin panel styling issues

= December 9 2013 - 1.2.7 =
* Added better compatibility for plugins modifying site title
* Fixed minor css bugs

= December 9 2013 - 1.2.6 =
* Updated screenshot.png, added links to all images used to readme.txt

= December 8 2013 - 1.2.5 =
* Removed unused css
* Fixed typo on 404 pages
* Changed footer credit text
* Updated language files

= December 7 2013 - 1.2.4 =
* Simplified some admin panel descriptions

= December 7 2013 - 1.2.3 =
* Optimized and rewrote layout class and sidebar code
* Updated language files

= December 7 2013 - 1.2.2 =
* Removed social icon title from being added as class in markup
* Added forced lowercase letters on custom sidebar IDs

= December 7 2013 - 1.2.1 =
* Markup polish

= December 6 2013 - 1.2.0 =
* Made all additional function files pluggable for child themes
* Moved layout class to body_class
* Moved main and main-inner divs from templates to header and footer
* Added auto disable for custom wp_title if SEO by Yoast plugin is installed
* Added basic WooCommerce support
* Added option to disable category and/or date for AlxTabs and AlxPosts widgets
* Updated language files

= December 4 2013 - 1.1.9 =
* Fixed bug with hidden sidebar-2 when specific page or post layout is set to 2 sidebars, when global is 1 or 0

= December 4 2013 - 1.1.8 =
* Added sample child theme download to help dropdown
* (wordpress.org release) Removed custom.css file, as required
* (wordpress.org release) Removed non-standard header image option, as required
* (wordpress.org release) Removed non-standard background image option, as required

= December 3 2013 - 1.1.6 & 1.1.7 =
* Moved add_action and add_filter outside of function_exists
* Added function_exists to functions registering custom widgets

= December 2 2013 - 1.1.5 =
* Added empty title/id/icon checks for social links and widget areas
* Added star indication for admin comments

= November 30 2013 - 1.1.4 =
* Improved child theme support
* Updated help dropdown
* Added option for boxed layout for better background image support
* Added font selection option (also latin-ext, cyrillic)
* Rebuilt dynamic styling options:
* Fixed for theme updates
* Fixed for network and subdirectory installations
* Fixed so that no file permission/chmod is required
* Fixed css for each styling option to only be added if set
* Added option to disable styling options css
* Removed dynamic.css

= November 22 2013 - 1.1.3 =
* Improved IE8 support
* Added option for header image
* Fixed nav dropdowns expanding behind second nav row when too many menu links are used
* Removed custom css field in styling options, replaced with custom.css file option
* Fixed thumbnail comment count position with Disqus plugin enabled
* Fixed related posts heading appearing even if there are no related posts
* Changed page background area to full body background in styling options
* Changed theme license to GPLv3

= November 18 2013 - 1.1.2 =
* Fixed broken comments pagination when there are pingbacks as well
* Polished and made post author comment icons slightly smaller

= November 18 2013 - 1.1.1 =
* Fixed tabs widget tab-button css for better mobile browser compatibility
* Fixed lists spacing

= November 15 2013 - 1.1.0 =
* Added styling option to change sidebar padding / width

= November 15 2013 - 1.0.9 =
* Added option to hide one or both sidebars for low-res mobile
* Moved to a single css grid percent-width system
- Centered footer bottom content on mobile
* Fixed sidebar padding for low-res mobile

= November 12 2013 - 1.0.8 =
* Fixed and polished styling for widgets
* Fixed primary color styling missing for slider controls

= November 11 2013 - 1.0.7 =
* Added sidebar layout option for category archives
* Added fade-in and auto focus of header search field

= November 9 2013 - 1.0.6 =
* Fixed double sidebar left layout, for expanded sidebar secondary
* Fixed hidden dropdowns behind toggle-expanded sidebars

= November 9 2013 - 1.0.5 =
* Added additional license information
* Moved no-js/js class javascript to functions.php

= November 8 2013 - 1.0.4 =
* Restructured functions.php according to wordpress best practices
* Loading IE-specific js via functions.php instead of template
* Moved & added new browser body classes to functions.php
* Fixed responsive embeds with Jetpack
* Fixed featured slider flickering issue on iPad

= November 7 2013 - 1.0.3 =
* Updated to Flexslider 2.2.0
* Updated to Sharrre 1.3.5
* Updated to Font Awesome 4.0.3
* Removed reply button for pingbacks & trackbacks
* Fixed double site title in RSS feed

= November 2 2013 - 1.0.2 =
* Fixed margin issue with topbar menu disabled
* Fixed responsive columns

= November 1 2013 - 1.0.1 =
* Theme screenshot updated
* Detailed theme description added
* New default color combination

= October 31 2013 - 1.0.0 =
* Theme released


== Resources ==
* Font Awesome Font : http://fontawesome.io, licensed SIL OFL 1.1, MIT License
* Titillium Font : Licensed SIL OFL 1.1
* Theme screenshot images : CC0-licensed (GPL-compatible) images from http://pixabay.com/ and http://unsplash.com/
* Other resources licenses : see headers of assets files for further details.
