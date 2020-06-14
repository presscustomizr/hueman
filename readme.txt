=== Hueman ===
Contributors: nikeo, alxmedia, d4z_c0nf
Tags: one-column, two-columns, three-columns, right-sidebar, left-sidebar, custom-colors, custom-menu, featured-images, flexible-header, full-width-template, post-formats, sticky-post, theme-options, threaded-comments, translation-ready
Requires at least: 4.6
Tested up to: 5.4
Stable tag: 3.5.9
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

> Good looking, fast and mobile friendly theme. Perfect for blogs and magazines websites.

== Description ==
The Hueman theme loads fast and is 100% mobile-friendly according to Google. One of the best rated theme for blogs and magazines on WordPress.org. Powering 70K+ websites around the world.

== Changelog ==
https://github.com/presscustomizr/hueman/releases
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

= 3.5.8 May 16th, 2020 =
* fixed : [option tree] possible PHP error in admin. fixes #893
* improved : [TRT] added min PHP version required and WP version tested up to
* added : [social links] new options to control the visibility of the social links in sidebar and footer. fixes #892

= 3.5.7 May 4th, 2020 =
* fixed : [javascript] External link icon not displayed on pages. fixes #885
* fixed : [related posts] image dimensions are not consistent accross column layout. fixes #888
* improved : increased max size of singular featured images

= 3.5.6 April 27th, 2020 =
* fixed : [performance][srcset attribute] => limit browsers choice for srcset on high resolution device. fixes #866
* improved : [post grids] adapt grid max size for srcset according to user options for image and pro grid columns

= 3.5.5 April 19th, 2020 =
* fixed : [Flexslider][RTL] flexslider broken in RTL mode since updated to flexslider v2.7.2

= 3.5.4 April 18th, 2020 =
* fixed : [Header][banner image] add options to handle height and width of the image. fixes #877
* fixed : [header image][sticky header] header height might not be set to the correct value on page load. fixes #883
* fixed : [Lazy load] images are not lazy loaded when dynamic content is inserted in the DOM ( example with TablePress plugin ). fixes #880
* fixed : [Nimble Builder compatibility] on home, Nimble Builder sections inserted on hooks __before_featured and __after_featured are not rendered when featured posts are disabled
* improved : [performance][related posts] adapt image size of related posts depending on the current column layout.
* improved : [performance][Dynamic Tabs widget] reduce image size of Dynamic Tabs widget
