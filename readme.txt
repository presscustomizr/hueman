=== Hueman ===
Contributors: nikeo, alxmedia, d4z_c0nf
Tags: one-column, two-columns, three-columns, right-sidebar, left-sidebar, custom-colors, custom-menu, featured-images, flexible-header, full-width-template, post-formats, sticky-post, theme-options, threaded-comments, translation-ready
Requires at least: 4.6
Tested up to: 5.4
Stable tag: 3.5.8
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

> Good looking, fast and mobile friendly theme. Perfect for blogs and magazines websites.

== Description ==
The Hueman theme loads fast and is 100% mobile-friendly according to Google. One of the best rated theme for blogs and magazines on WordPress.org. Powering 70K+ websites around the world.

== Changelog ==
https://github.com/presscustomizr/hueman/releases
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

= 3.5.3 March 27th, 2020 =
* fixed : [mobile menu] clicking on an anchor link that has child submenu should unfold the submenu. fixes #857
* improved : [Header] banner image => make it easier to adjust width automatically. fixes #852
* improved : [performance] load flexslider.js with defer. fixes #869
* improved : [performance] removed smoothscroll option and script
* updated : [javascript] flexslider.js to v2.7.2
* updated : [javascript] mobile-detect.js to v2.8.34

= 3.5.2 March 19th, 2020 =
* fixed : [standard grid] left padding broken on mobile devices. fixes #871
* improved : [performance] lazyloading threshold set to 0 instead of 200px by default

= 3.5.1 March 16th, 2020 =
* fixed : Use the child-theme version when enqueueing its style. fixes #868
* fixed : remaining .pad classes to be turned into .hu-pad

= 3.5.0 March 15th, 2020 =
* fixed : [performance] flexslider.js can be loaded on blog page even when featured posts are disabled. fixes #856
* fixed : [CSS] prefix .pad class more specifically to avoid potential conflict with plugins. fixes #862
* fixed : Use the child-theme version when enqueueing its style. fixes #860
* improved : [asset] update fontawesome to latest version ( current is 5.5.0 ). fixes #853
* added : [post lists] introduce a new option to allow full post content to be displayed when using "standard" grid. fixes #859
* added : [post lists] introduce a new option to allow hide the post thumbnails in post lists
* added : [performance] new option to load main script with defer mode. for #863
* added : [performance] new option to defer loading of FontAwesome to avoid blocking rendering issues. for #863

== Resources ==
* Font Awesome Font : http://fontawesome.io, licensed SIL OFL 1.1, MIT License
* Titillium Font : Licensed SIL OFL 1.1
* Theme screenshot images : CC0-licensed (GPL-compatible) images from http://pixabay.com/ and http://unsplash.com/
* Other resources licenses : see headers of assets files for further details.
