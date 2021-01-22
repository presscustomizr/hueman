=== Hueman ===
Contributors: nikeo, alxmedia, d4z_c0nf
Tags: one-column, two-columns, three-columns, right-sidebar, left-sidebar, custom-colors, custom-menu, featured-images, flexible-header, full-width-template, post-formats, sticky-post, theme-options, threaded-comments, translation-ready
Requires at least: 4.6
Tested up to: 5.6
Stable tag: 3.7.3
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

> Good looking, fast and mobile friendly theme. Perfect for blogs and magazines websites.

== Description ==
The Hueman theme loads fast and is 100% mobile-friendly according to Google. One of the best rated theme for blogs and magazines on WordPress.org. Powering 70K+ websites around the world.

== Changelog ==
https://github.com/presscustomizr/hueman/releases
= 3.7.3 January 22nd, 2021 =
* fixed : [font color] excerpt font color not accessible => too low constrast ratio. fixes #948

= 3.7.2 January 18th, 2021 =
* fixed : [admin] removed unused option-tree code
* fixed : [audio post format] Audio player does not work in audio article format. fixes #946
* added : [social icons] mastodon icon
* improved : [SEO] allow site title to be wrapped in a H1 tag when home is a static page

= 3.7.1 January 6th, 2021 =
* fixed : [WP nav menu widget] menu items icon not displayed if menu encapsulated in custom wrapper. fixes #944
* fixed : [SEO] For best SEO results, ensure that home page includes only one H1 tag. fixes #943

= 3.7.0 December 14th, 2020 =
* fixed : [PHP 8] Fix deprecation notices for optional function parameters declared before required parameter

= 3.6.10 November 30th, 2020 =
* fixed : [WP5.7][jquery-migrate] fixed wrong usage $.fn.css() method

= 3.6.9 November 19th, 2020 =
* added : [CSS][links] added a new option to opt-out underline on links. Option located in customizer > web page design > General design options

= 3.6.8 November 17th 2020 =
* fixed : [TRT requirement][accessibility] Links within content must be underlined. fixes #936
* improved :  [WP 5.6][jQuery] adapt to WP jQuery updated version. Prepare removal of jQuery Migrate in future WP 5.7
* fixed : [Nimble Builder compatibility] lazy loading broken for post thumbnails in post lists when using NB header

= 3.6.7 November 3rd 2020 =
* tested : [WordPress] Hueman v3.6.7 is 100% compatible with WP 5.5.3
* fixed : [Header banner] Added a new option to disable header image linking to home when no site title/description. fixes #931

= 3.6.6 October 9th, 2020 =
* improved : [performance] implement preload for Font Awesome icons
* improved : [performance] preload Titillium self hosted font when used
* improved : [performance] set Titillium self hosted font as default font

= 3.6.5 October 7th, 2020 =
* fixed : [CSS][plugin compatibility] Code Syntax Block style broken. fixes #926
* added : [CSS] add current theme version as CSS class to body tag. fixes #930

= 3.6.4 September 18, 2020 =
* fixed : [admin] potential security issue

= 3.6.3 September 8, 2020 =
* fixed : [admin] update notification not dismissed. Introduced in v3.6.2.
Reported https://wordpress.org/support/topic/bug-update-notification-on-dashboard-not-dismissible/
* added : [admin] PHP constant HU_SHOW_UPDATE_NOTIFICATION set to true by default. Allowing user to disable update notifications. 

= 3.6.2 September 7, 2020 =
* improved : Successfully tested with WP 5.5.1. Maintenance release, minor code cleaning. 

= 3.6.1 August 12, 2020 =
* fixed : [featured posts slider][CSS] featured post slider broken on some browsers due to wrong CSS rule.
* Hueman has been successfully tested with WordPress 5.5

= 3.6.0 July 21st, 2020 =
* Hueman has been successfully tested with WordPress 5.5
* fixed : [forms] padding in select input breaks text readability. fixes #908
* fixed :  [Gutenberg] CSS rules for table alignment not specific enough. fixes #910
* fixed : [compatibility with WP5.5] adapt customizer color-picker script with latest version of WP 5.5

= 3.5.11 June 18th, 2020 =
* fixed : [performance] Defer loading Font Awesome icons is disabled by default to prevent issues ( with broken javascript and/or third party plugins )

= 3.5.10 June 17th, 2020 =
* fixed : [Font Awesome] icons could not be printed in cases when a third party plugin loads FA. fixes #907
* fixed : [SEO] prevent printing mutliple H1 for site-title. fixes #906

= 3.5.9 June 14th, 2020 =
* fixed : [CPT] single CPT page missed a title. Reported for Sensei LMS plugin
* fixed : [Font awesome][performance] consider enabling defer_font_awesome by default. fixes #898
* fixed : [external links icons] icones should be inside the a tag to be clickable. fixes #895
* fixed : [featured image][single page] option to control featured image in single page is broken when using page-templates/child-menu.php. fixes #894
* fixed : [SVG upload] removed support for svg upload as per new TRT rules. for #904
* fixed : [favicon] removed retro compatibility for old favicon as per new TRT rules. for #904
* fixed : [admin] removed loading of remote cloudfare CDN js script as per new TRT rules. + removed unused js scripts for #904    
* improved : [performance] better defer loading of Font Awesome. fixes #905
* added : [metas][post grids] add an option to display authors in post grids. fixes #897
