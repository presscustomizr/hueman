# Hueman v3.1.6
![Hueman - Free Wordpress Theme](/screenshot.png)

> Hueman is a mobile friendly WordPress theme for blogs, magazines and business websites. It's been designed to beautifully display pictures and text content, and engineered to be easy to use and fast. The Hueman theme helps you attract and retain more visitors, that's why it's already used by 70K+ active websites in the world and has received hundreds of five stars ratings.

View more themes from this author: http://presscustomizr.com

## Demo and Documentation
* DEMO : http://demo-hueman.presscustomizr.com/
* DOCUMENTATION : http://hueman.presscustomizr.com/


## Theme License
The **Hueman WordPress theme** theme itself is nothing but 100% GPLv3. See headers of files for further details.[GNU GPL v3.0 or later](http://www.gnu.org/licenses/gpl-3.0.en.html)


## Font Awesome License
Font License - http://fontawesome.io
License: SIL OFL 1.1
License URI: http://scripts.sil.org/OFL
Copyright: Dave Gandy, http://fontawesome.io

Code License - http://fontawesome.io
License: MIT License
License URI: http://opensource.org/licenses/mit-license.html
Copyright: Dave Gandy, http://fontawesome.io

Brand Icons
All brand icons are trademarks of their respective owners.
The use of these trademarks does not indicate endorsement of the trademark holder by Font Awesome, nor vice versa.


## Titillium License
Titillium Font - http://www.campivisivi.net/titillium/
License: SIL OFL 1.1
License URI: http://scripts.sil.org/OFL
Copyright: Accademia di Belle Arti di Urbino, http://campivisivi.net


## Theme screenshot images
CC0-licensed (GPL-compatible) images from http://pixabay.com/ and http://unsplash.com/

Left sidebar, top to bottom:

1. unsplash - http://bit.ly/18NNxqe
2. pixabay ID 210801
3. pixabay ID 164985
4. pixabay ID 181744
5. pixabay ID 205220
6. pixabay ID 74570
7. pixabay ID 122694
8. pixabay ID 97433

Content, top to bottom, left to right:

1. pixabay ID 74570
2. unsplash - http://bit.ly/18NNxqe
3. pixabay ID 166705
4. pixabay ID 68827
5. pixabay ID 171732

Right sidebar, top to bottom:

1. pixabay ID 9950
2. pixabay ID 181744
3. pixabay ID 122705
4. pixabay ID 195684
5. pixabay ID 83810
6. pixabay ID 18279


## Other Licenses
See headers of files for further details.

# Changelog
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
