/*! addEventListener Polyfill ie9- http://stackoverflow.com/a/27790212*/
window.addEventListener=window.addEventListener||function(a,b){window.attachEvent("on"+a,b)},/*!  Datenow Polyfill ie9- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/now */
Date.now||(Date.now=function(){return(new Date).getTime()}),/*! Object.create monkey patch ie8 http://stackoverflow.com/a/18020326 */
Object.create||(Object.create=function(a,b){function c(){}if("undefined"!=typeof b)throw"The multiple-argument version of Object.create is not provided by this browser and cannot be shimmed.";return c.prototype=a,new c}),/*! https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter */
Array.prototype.filter||(Array.prototype.filter=function(a){"use strict";if(void 0===this||null===this)throw new TypeError;var b=Object(this),c=b.length>>>0;if("function"!=typeof a)throw new TypeError;for(var d=[],e=arguments.length>=2?arguments[1]:void 0,f=0;c>f;f++)if(f in b){var g=b[f];a.call(e,g,f,b)&&d.push(g)}return d}),/*! map was added to the ECMA-262 standard in the 5th edition */
Array.prototype.map||(Array.prototype.map=function(a,b){var c,d,e;if(null===this)throw new TypeError(" this is null or not defined");var f=Object(this),g=f.length>>>0;if("function"!=typeof a)throw new TypeError(a+" is not a function");for(arguments.length>1&&(c=b),d=new Array(g),e=0;g>e;){var h,i;e in f&&(h=f[e],i=a.call(c,h,e,f),d[e]=i),e++}return d});/*! iCheck v1.0.1 by Damir Sultanov, http://git.io/arlzeA, MIT Licensed */
if ( 'function' != typeof(jQuery.fn.iCheck) ) {
  !function(a){function b(a,b,e){var f=a[0],g=/er/.test(e)?p:/bl/.test(e)?n:l,h=e==q?{checked:f[l],disabled:f[n],indeterminate:"true"==a.attr(p)||"false"==a.attr(o)}:f[g];if(/^(ch|di|in)/.test(e)&&!h)c(a,g);else if(/^(un|en|de)/.test(e)&&h)d(a,g);else if(e==q)for(g in h)h[g]?c(a,g,!0):d(a,g,!0);else b&&"toggle"!=e||(b||a[u]("ifClicked"),h?f[r]!==k&&d(a,g):c(a,g))}function c(b,c,e){var q=b[0],u=b.parent(),v=c==l,x=c==p,y=c==n,z=x?o:v?m:"enabled",A=f(b,z+g(q[r])),B=f(b,c+g(q[r]));if(!0!==q[c]){if(!e&&c==l&&q[r]==k&&q.name){var C=b.closest("form"),D='input[name="'+q.name+'"]',D=C.length?C.find(D):a(D);D.each(function(){this!==q&&a(this).data(i)&&d(a(this),c)})}x?(q[c]=!0,q[l]&&d(b,l,"force")):(e||(q[c]=!0),v&&q[p]&&d(b,p,!1)),h(b,v,c,e)}q[n]&&f(b,w,!0)&&u.find("."+j).css(w,"default"),u[s](B||f(b,c)||""),y?u.attr("aria-disabled","true"):u.attr("aria-checked",x?"mixed":"true"),u[t](A||f(b,z)||"")}function d(a,b,c){var d=a[0],e=a.parent(),i=b==l,k=b==p,q=b==n,u=k?o:i?m:"enabled",v=f(a,u+g(d[r])),x=f(a,b+g(d[r]));!1!==d[b]&&((k||!c||"force"==c)&&(d[b]=!1),h(a,i,u,c)),!d[n]&&f(a,w,!0)&&e.find("."+j).css(w,"pointer"),e[t](x||f(a,b)||""),q?e.attr("aria-disabled","false"):e.attr("aria-checked","false"),e[s](v||f(a,u)||"")}function e(b,c){b.data(i)&&(b.parent().html(b.attr("style",b.data(i).s||"")),c&&b[u](c),b.off(".i").unwrap(),a(v+'[for="'+b[0].id+'"]').add(b.closest(v)).off(".i"))}function f(a,b,c){return a.data(i)?a.data(i).o[b+(c?"":"Class")]:void 0}function g(a){return a.charAt(0).toUpperCase()+a.slice(1)}function h(a,b,c,d){d||(b&&a[u]("ifToggled"),a[u]("ifChanged")[u]("if"+g(c)))}var i="iCheck",j=i+"-helper",k="radio",l="checked",m="un"+l,n="disabled",o="determinate",p="in"+o,q="update",r="type",s="addClass",t="removeClass",u="trigger",v="label",w="cursor",x=/ipad|iphone|ipod|android|blackberry|windows phone|opera mini|silk/i.test(navigator.userAgent);a.fn[i]=function(f,g){var h='input[type="checkbox"], input[type="'+k+'"]',m=a(),o=function(b){b.each(function(){var b=a(this);m=b.is(h)?m.add(b):m.add(b.find(h))})};if(/^(check|uncheck|toggle|indeterminate|determinate|disable|enable|update|destroy)$/i.test(f))return f=f.toLowerCase(),o(this),m.each(function(){var c=a(this);"destroy"==f?e(c,"ifDestroyed"):b(c,!0,f),a.isFunction(g)&&g()});if("object"!=typeof f&&f)return this;var w=a.extend({checkedClass:l,disabledClass:n,indeterminateClass:p,labelHover:!0,aria:!1},f),y=w.handle,z=w.hoverClass||"hover",A=w.focusClass||"focus",B=w.activeClass||"active",C=!!w.labelHover,D=w.labelHoverClass||"hover",E=0|(""+w.increaseArea).replace("%","");return("checkbox"==y||y==k)&&(h='input[type="'+y+'"]'),-50>E&&(E=-50),o(this),m.each(function(){var f=a(this);e(f);var g=this,h=g.id,m=-E+"%",o=100+2*E+"%",o={position:"absolute",top:m,left:m,display:"block",width:o,height:o,margin:0,padding:0,background:"#fff",border:0,opacity:0},m=x?{position:"absolute",visibility:"hidden"}:E?o:{position:"absolute",opacity:0},p="checkbox"==g[r]?w.checkboxClass||"icheckbox":w.radioClass||"i"+k,y=a(v+'[for="'+h+'"]').add(f.closest(v)),F=!!w.aria,G=i+"-"+Math.random().toString(36).substr(2,6),H='<div class="'+p+'" '+(F?'role="'+g[r]+'" ':"");F&&y.each(function(){H+='aria-labelledby="',this.id?H+=this.id:(this.id=G,H+=G),H+='"'}),H=f.wrap(H+"/>")[u]("ifCreated").parent().append(w.insert),o=a('<ins class="'+j+'"/>').css(o).appendTo(H),f.data(i,{o:w,s:f.attr("style")}).css(m),w.inheritClass&&H[s](g.className||""),w.inheritID&&h&&H.attr("id",i+"-"+h),"static"==H.css("position")&&H.css("position","relative"),b(f,!0,q),y.length&&y.on("click.i mouseover.i mouseout.i touchbegin.i touchend.i",function(c){var d=c[r],e=a(this);if(!g[n]){if("click"==d){if(a(c.target).is("a"))return;b(f,!1,!0)}else C&&(/ut|nd/.test(d)?(H[t](z),e[t](D)):(H[s](z),e[s](D)));if(!x)return!1;c.stopPropagation()}}),f.on("click.i focus.i blur.i keyup.i keydown.i keypress.i",function(a){var b=a[r];return a=a.keyCode,"click"==b?!1:"keydown"==b&&32==a?(g[r]==k&&g[l]||(g[l]?d(f,l):c(f,l)),!1):("keyup"==b&&g[r]==k?!g[l]&&c(f,l):/us|ur/.test(b)&&H["blur"==b?t:s](A),void 0)}),o.on("click mousedown mouseup mouseover mouseout touchbegin.i touchend.i",function(a){var c=a[r],d=/wn|up/.test(c)?B:z;if(!g[n]){if("click"==c?b(f,!1,!0):(/wn|er|in/.test(c)?H[s](d):H[t](d+" "+B),y.length&&C&&d==z&&y[/ut|nd/.test(c)?t:s](D)),!x)return!1;a.stopPropagation()}})})}}(window.jQuery||window.Zepto);
}
/* 
 * Selecter v3.0.9 - 2014-02-10 
 * A jQuery plugin for replacing default select elements. Part of the Formstone Library. 
 * http://formstone.it/selecter/ 
 * 
 * Copyright 2014 Ben Plum; MIT Licensed 
 */
if ( 'function' != typeof(jQuery.fn.selecter) ) {
  !function(a,b){"use strict";function c(b){b=a.extend({},x,b||{}),null===w&&(w=a("body"));for(var c=a(this),e=0,f=c.length;f>e;e++)d(c.eq(e),b);return c}function d(b,c){if(!b.hasClass("selecter-element")){c=a.extend({},c,b.data("selecter-options")),c.external&&(c.links=!0);var d=b.find("option, optgroup"),g=d.filter("option"),h=g.filter(":selected"),n=""!==c.label?-1:g.index(h),p=c.links?"nav":"div";c.tabIndex=b[0].tabIndex,b[0].tabIndex=-1,c.multiple=b.prop("multiple"),c.disabled=b.is(":disabled");var q="<"+p+' class="selecter '+c.customClass;v?q+=" mobile":c.cover&&(q+=" cover"),q+=c.multiple?" multiple":" closed",c.disabled&&(q+=" disabled"),q+='" tabindex="'+c.tabIndex+'">',c.multiple||(q+='<span class="selecter-selected'+(""!==c.label?" placeholder":"")+'">',q+=a("<span></span").text(r(""!==c.label?c.label:h.text(),c.trim)).html(),q+="</span>"),q+='<div class="selecter-options">',q+="</div>",q+="</"+p+">",b.addClass("selecter-element").after(q);var s=b.next(".selecter"),u=a.extend({$select:b,$allOptions:d,$options:g,$selecter:s,$selected:s.find(".selecter-selected"),$itemsWrapper:s.find(".selecter-options"),index:-1,guid:t++},c);e(u),o(n,u),void 0!==a.fn.scroller&&u.$itemsWrapper.scroller(),u.$selecter.on("touchstart.selecter click.selecter",".selecter-selected",u,f).on("click.selecter",".selecter-item",u,j).on("close.selecter",u,i).data("selecter",u),u.$select.on("change.selecter",u,k),v||(u.$selecter.on("focus.selecter",u,l).on("blur.selecter",u,m),u.$select.on("focus.selecter",u,function(a){a.data.$selecter.trigger("focus")}))}}function e(b){for(var c="",d=b.links?"a":"span",e=0,f=0,g=b.$allOptions.length;g>f;f++){var h=b.$allOptions.eq(f);if("OPTGROUP"===h[0].tagName)c+='<span class="selecter-group',h.is(":disabled")&&(c+=" disabled"),c+='">'+h.attr("label")+"</span>";else{var i=h.val();h.attr("value")||h.attr("value",i),c+="<"+d+' class="selecter-item',h.is(":selected")&&""===b.label&&(c+=" selected"),h.is(":disabled")&&(c+=" disabled"),c+='" ',c+=b.links?'href="'+i+'"':'data-value="'+i+'"',c+=">"+a("<span></span>").text(r(h.text(),b.trim)).html()+"</"+d+">",e++}}b.$itemsWrapper.html(c),b.$items=b.$selecter.find(".selecter-item")}function f(c){c.preventDefault(),c.stopPropagation();var d=c.data;if(!d.$select.is(":disabled"))if(a(".selecter").not(d.$selecter).trigger("close.selecter",[d]),v){var e=d.$select[0];if(b.document.createEvent){var f=b.document.createEvent("MouseEvents");f.initMouseEvent("mousedown",!1,!0,b,0,0,0,0,0,!1,!1,!1,!1,0,null),e.dispatchEvent(f)}else e.fireEvent&&e.fireEvent("onmousedown")}else d.$selecter.hasClass("closed")?g(c):d.$selecter.hasClass("open")&&i(c)}function g(b){b.preventDefault(),b.stopPropagation();var c=b.data;if(!c.$selecter.hasClass("open")){var d=c.$selecter.offset(),e=w.outerHeight(),f=c.$itemsWrapper.outerHeight(!0),g=c.index>=0?c.$items.eq(c.index).position():{left:0,top:0};d.top+f>e&&c.$selecter.addClass("bottom"),c.$itemsWrapper.show(),c.$selecter.removeClass("closed").addClass("open"),w.on("click.selecter-"+c.guid,":not(.selecter-options)",c,h),void 0!==a.fn.scroller?c.$itemsWrapper.scroller("scroll",c.$itemsWrapper.find(".scroller-content").scrollTop()+g.top,0).scroller("reset"):c.$itemsWrapper.scrollTop(c.$itemsWrapper.scrollTop()+g.top)}}function h(b){b.preventDefault(),b.stopPropagation(),0===a(b.currentTarget).parents(".selecter").length&&i(b)}function i(a){a.preventDefault(),a.stopPropagation();var b=a.data;b.$selecter.hasClass("open")&&(b.$itemsWrapper.hide(),b.$selecter.removeClass("open bottom").addClass("closed"),w.off(".selecter-"+b.guid))}function j(b){b.preventDefault(),b.stopPropagation();var c=a(this),d=b.data;if(!d.$select.is(":disabled")){if(d.$itemsWrapper.is(":visible")){var e=d.$items.index(c);o(e,d),p(d)}d.multiple||i(b)}}function k(b,c){var d=a(this),e=b.data;if(!c&&!e.multiple){var f=e.$options.index(e.$options.filter("[value='"+s(d.val())+"']"));o(f,e),p(e)}}function l(b){b.preventDefault(),b.stopPropagation();var c=b.data;c.$select.is(":disabled")||c.multiple||(c.$selecter.addClass("focus").on("keydown.selecter"+c.guid,c,n),a(".selecter").not(c.$selecter).trigger("close.selecter",[c]))}function m(b){b.preventDefault(),b.stopPropagation();var c=b.data;c.$selecter.removeClass("focus").off("keydown.selecter"+c.guid+" keyup.selecter"+c.guid),a(".selecter").not(c.$selecter).trigger("close.selecter",[c])}function n(b){var c=b.data;if(13===b.keyCode)c.$selecter.hasClass("open")&&(i(b),o(c.index,c)),p(c);else if(!(9===b.keyCode||b.metaKey||b.altKey||b.ctrlKey||b.shiftKey)){b.preventDefault(),b.stopPropagation();var d=c.$items.length-1,e=c.index<0?0:c.index;if(a.inArray(b.keyCode,u?[38,40,37,39]:[38,40])>-1)e+=38===b.keyCode||u&&37===b.keyCode?-1:1,0>e&&(e=0),e>d&&(e=d);else{var f,g,h=String.fromCharCode(b.keyCode).toUpperCase();for(g=c.index+1;d>=g;g++)if(f=c.$options.eq(g).text().charAt(0).toUpperCase(),f===h){e=g;break}if(0>e)for(g=0;d>=g;g++)if(f=c.$options.eq(g).text().charAt(0).toUpperCase(),f===h){e=g;break}}e>=0&&o(e,c)}}function o(a,b){var c=b.$items.eq(a),d=c.hasClass("selected"),e=c.hasClass("disabled");if(!e){if(-1===a&&""!==b.label)b.$selected.html(b.label);else if(d)b.multiple&&(b.$options.eq(a).prop("selected",null),c.removeClass("selected"));else{{var f=c.html();c.data("value")}b.multiple?b.$options.eq(a).prop("selected",!0):(b.$selected.html(f).removeClass("placeholder"),b.$items.filter(".selected").removeClass("selected"),b.$select[0].selectedIndex=a),c.addClass("selected")}(!d||b.multiple)&&(b.index=a)}}function p(a){a.links?q(a):(a.callback.call(a.$selecter,a.$select.val(),a.index),a.$select.trigger("change",[!0]))}function q(a){var c=a.$select.val();a.external?b.open(c):b.location.href=c}function r(a,b){return 0===b?a:a.length>b?a.substring(0,b)+"...":a}function s(a){return a.replace(/([;&,\.\+\*\~':"\!\^#$%@\[\]\(\)=>\|])/g,"\\$1")}var t=0,u=b.navigator.userAgent.toLowerCase().indexOf("firefox")>-1,v=/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(b.navigator.userAgent||b.navigator.vendor||b.opera),w=null,x={callback:a.noop,cover:!1,customClass:"",label:"",external:!1,links:!1,trim:0},y={defaults:function(b){return x=a.extend(x,b||{}),a(this)},disable:function(b){return a(this).each(function(c,d){var e=a(d).next(".selecter").data("selecter");if(e)if("undefined"!=typeof b){var f=e.$items.index(e.$items.filter("[data-value="+b+"]"));e.$items.eq(f).addClass("disabled"),e.$options.eq(f).prop("disabled",!0)}else e.$selecter.hasClass("open")&&e.$selecter.find(".selecter-selected").trigger("click.selecter"),e.$selecter.addClass("disabled"),e.$select.prop("disabled",!0)})},enable:function(b){return a(this).each(function(c,d){var e=a(d).next(".selecter").data("selecter");if(e)if("undefined"!=typeof b){var f=e.$items.index(e.$items.filter("[data-value="+b+"]"));e.$items.eq(f).removeClass("disabled"),e.$options.eq(f).prop("disabled",!1)}else e.$selecter.removeClass("disabled"),e.$select.prop("disabled",!1)})},destroy:function(){return a(this).each(function(b,c){var d=a(c).next(".selecter").data("selecter");d&&(d.$selecter.hasClass("open")&&d.$selecter.find(".selecter-selected").trigger("click.selecter"),void 0!==a.fn.scroller&&d.$selecter.find(".selecter-options").scroller("destroy"),d.$select[0].tabIndex=d.tabIndex,d.$select.off(".selecter").removeClass("selecter-element").show(),d.$selecter.off(".selecter").remove())})},refresh:function(){return a(this).each(function(b,c){var d=a(c).next(".selecter").data("selecter");if(d){var f=d.index;d.$allOptions=d.$select.find("option, optgroup"),d.$options=d.$allOptions.filter("option"),d.index=-1,f=d.$options.index(d.$options.filter(":selected")),e(d),o(f,d)}})}};a.fn.selecter=function(a){return y[a]?y[a].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof a&&a?this:c.apply(this,arguments)},a.selecter=function(a){"defaults"===a&&y.defaults.apply(this,Array.prototype.slice.call(arguments,1))}}(jQuery,window);
}
/* 
 * Stepper v3.0.5 - 2014-02-06 
 * A jQuery plugin for cross browser number inputs. Part of the Formstone Library. 
 * http://formstone.it/stepper/ 
 * 
 * Copyright 2014 Ben Plum; MIT Licensed 
 */
if ( 'function' != typeof(jQuery.fn.stepper) ) {
  !function(a){"use strict";function b(b){b=a.extend({},k,b||{});for(var d=a(this),e=0,f=d.length;f>e;e++)c(d.eq(e),b);return d}function c(b,c){if(!b.hasClass("stepper-input")){c=a.extend({},c,b.data("stepper-options"));var e=parseFloat(b.attr("min")),f=parseFloat(b.attr("max")),g=parseFloat(b.attr("step"))||1;b.addClass("stepper-input").wrap('<div class="stepper '+c.customClass+'" />').after('<span class="stepper-arrow up">'+c.labels.up+'</span><span class="stepper-arrow down">'+c.labels.down+"</span>");var h=b.parent(".stepper"),j=a.extend({$stepper:h,$input:b,$arrow:h.find(".stepper-arrow"),min:void 0===typeof e||isNaN(e)?!1:e,max:void 0===typeof f||isNaN(f)?!1:f,step:void 0===typeof g||isNaN(g)?1:g,timer:null},c);j.digits=i(j.step),b.is(":disabled")&&h.addClass("disabled"),h.on("touchstart.stepper mousedown.stepper",".stepper-arrow",j,d).data("stepper",j)}}function d(b){b.preventDefault(),b.stopPropagation(),e(b);var c=b.data;if(!c.$input.is(":disabled")&&!c.$stepper.hasClass("disabled")){var d=a(b.target).hasClass("up")?c.step:-c.step;c.timer=g(c.timer,125,function(){f(c,d,!1)}),f(c,d),a("body").on("touchend.stepper mouseup.stepper",c,e)}}function e(b){b.preventDefault(),b.stopPropagation();var c=b.data;h(c.timer),a("body").off(".stepper")}function f(a,b){var c=parseFloat(a.$input.val()),d=b;void 0===typeof c||isNaN(c)?d=a.min!==!1?a.min:0:a.min!==!1&&c<a.min?d=a.min:d+=c;var e=(d-a.min)%a.step;0!==e&&(d-=e),a.min!==!1&&d<a.min&&(d=a.min),a.max!==!1&&d>a.max&&(d-=a.step),d!==c&&(d=j(d,a.digits),a.$input.val(d).trigger("change"))}function g(a,b,c){return h(a),setInterval(c,b)}function h(a){a&&(clearInterval(a),a=null)}function i(a){var b=String(a);return b.indexOf(".")>-1?b.length-b.indexOf(".")-1:0}function j(a,b){var c=Math.pow(10,b);return Math.round(a*c)/c}var k={customClass:"",labels:{up:"Up",down:"Down"}},l={defaults:function(b){return k=a.extend(k,b||{}),a(this)},destroy:function(){return a(this).each(function(){var b=a(this).data("stepper");b&&(b.$stepper.off(".stepper").find(".stepper-arrow").remove(),b.$input.unwrap().removeClass("stepper-input"))})},disable:function(){return a(this).each(function(){var b=a(this).data("stepper");b&&(b.$input.attr("disabled","disabled"),b.$stepper.addClass("disabled"))})},enable:function(){return a(this).each(function(){var b=a(this).data("stepper");b&&(b.$input.attr("disabled",null),b.$stepper.removeClass("disabled"))})}};a.fn.stepper=function(a){return l[a]?l[a].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof a&&a?this:b.apply(this,arguments)},a.stepper=function(a){"defaults"===a&&l.defaults.apply(this,Array.prototype.slice.call(arguments,1))}}(jQuery,this);
}/*! Select2 4.0.1 | https://github.com/select2/select2/blob/master/LICENSE.md */!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a("object"==typeof exports?require("jquery"):jQuery)}(function(a){var b=function(){if(a&&a.fn&&a.fn.select2&&a.fn.select2.amd)var b=a.fn.select2.amd;var b;return function(){if(!b||!b.requirejs){b?c=b:b={};var a,c,d;!function(b){function e(a,b){return u.call(a,b)}function f(a,b){var c,d,e,f,g,h,i,j,k,l,m,n=b&&b.split("/"),o=s.map,p=o&&o["*"]||{};if(a&&"."===a.charAt(0))if(b){for(a=a.split("/"),g=a.length-1,s.nodeIdCompat&&w.test(a[g])&&(a[g]=a[g].replace(w,"")),a=n.slice(0,n.length-1).concat(a),k=0;k<a.length;k+=1)if(m=a[k],"."===m)a.splice(k,1),k-=1;else if(".."===m){if(1===k&&(".."===a[2]||".."===a[0]))break;k>0&&(a.splice(k-1,2),k-=2)}a=a.join("/")}else 0===a.indexOf("./")&&(a=a.substring(2));if((n||p)&&o){for(c=a.split("/"),k=c.length;k>0;k-=1){if(d=c.slice(0,k).join("/"),n)for(l=n.length;l>0;l-=1)if(e=o[n.slice(0,l).join("/")],e&&(e=e[d])){f=e,h=k;break}if(f)break;!i&&p&&p[d]&&(i=p[d],j=k)}!f&&i&&(f=i,h=j),f&&(c.splice(0,h,f),a=c.join("/"))}return a}function g(a,c){return function(){var d=v.call(arguments,0);return"string"!=typeof d[0]&&1===d.length&&d.push(null),n.apply(b,d.concat([a,c]))}}function h(a){return function(b){return f(b,a)}}function i(a){return function(b){q[a]=b}}function j(a){if(e(r,a)){var c=r[a];delete r[a],t[a]=!0,m.apply(b,c)}if(!e(q,a)&&!e(t,a))throw new Error("No "+a);return q[a]}function k(a){var b,c=a?a.indexOf("!"):-1;return c>-1&&(b=a.substring(0,c),a=a.substring(c+1,a.length)),[b,a]}function l(a){return function(){return s&&s.config&&s.config[a]||{}}}var m,n,o,p,q={},r={},s={},t={},u=Object.prototype.hasOwnProperty,v=[].slice,w=/\.js$/;o=function(a,b){var c,d=k(a),e=d[0];return a=d[1],e&&(e=f(e,b),c=j(e)),e?a=c&&c.normalize?c.normalize(a,h(b)):f(a,b):(a=f(a,b),d=k(a),e=d[0],a=d[1],e&&(c=j(e))),{f:e?e+"!"+a:a,n:a,pr:e,p:c}},p={require:function(a){return g(a)},exports:function(a){var b=q[a];return"undefined"!=typeof b?b:q[a]={}},module:function(a){return{id:a,uri:"",exports:q[a],config:l(a)}}},m=function(a,c,d,f){var h,k,l,m,n,s,u=[],v=typeof d;if(f=f||a,"undefined"===v||"function"===v){for(c=!c.length&&d.length?["require","exports","module"]:c,n=0;n<c.length;n+=1)if(m=o(c[n],f),k=m.f,"require"===k)u[n]=p.require(a);else if("exports"===k)u[n]=p.exports(a),s=!0;else if("module"===k)h=u[n]=p.module(a);else if(e(q,k)||e(r,k)||e(t,k))u[n]=j(k);else{if(!m.p)throw new Error(a+" missing "+k);m.p.load(m.n,g(f,!0),i(k),{}),u[n]=q[k]}l=d?d.apply(q[a],u):void 0,a&&(h&&h.exports!==b&&h.exports!==q[a]?q[a]=h.exports:l===b&&s||(q[a]=l))}else a&&(q[a]=d)},a=c=n=function(a,c,d,e,f){if("string"==typeof a)return p[a]?p[a](c):j(o(a,c).f);if(!a.splice){if(s=a,s.deps&&n(s.deps,s.callback),!c)return;c.splice?(a=c,c=d,d=null):a=b}return c=c||function(){},"function"==typeof d&&(d=e,e=f),e?m(b,a,c,d):setTimeout(function(){m(b,a,c,d)},4),n},n.config=function(a){return n(a)},a._defined=q,d=function(a,b,c){if("string"!=typeof a)throw new Error("See almond README: incorrect module build, no module name");b.splice||(c=b,b=[]),e(q,a)||e(r,a)||(r[a]=[a,b,c])},d.amd={jQuery:!0}}(),b.requirejs=a,b.require=c,b.define=d}}(),b.define("almond",function(){}),b.define("jquery",[],function(){var b=a||$;return null==b&&console&&console.error&&console.error("Select2: An instance of jQuery or a jQuery-compatible library was not found. Make sure that you are including jQuery before Select2 on your web page."),b}),b.define("select2/utils",["jquery"],function(a){function b(a){var b=a.prototype,c=[];for(var d in b){var e=b[d];"function"==typeof e&&"constructor"!==d&&c.push(d)}return c}var c={};c.Extend=function(a,b){function c(){this.constructor=a}var d={}.hasOwnProperty;for(var e in b)d.call(b,e)&&(a[e]=b[e]);return c.prototype=b.prototype,a.prototype=new c,a.__super__=b.prototype,a},c.Decorate=function(a,c){function d(){var b=Array.prototype.unshift,d=c.prototype.constructor.length,e=a.prototype.constructor;d>0&&(b.call(arguments,a.prototype.constructor),e=c.prototype.constructor),e.apply(this,arguments)}function e(){this.constructor=d}var f=b(c),g=b(a);c.displayName=a.displayName,d.prototype=new e;for(var h=0;h<g.length;h++){var i=g[h];d.prototype[i]=a.prototype[i]}for(var j=(function(a){var b=function(){};a in d.prototype&&(b=d.prototype[a]);var e=c.prototype[a];return function(){var a=Array.prototype.unshift;return a.call(arguments,b),e.apply(this,arguments)}}),k=0;k<f.length;k++){var l=f[k];d.prototype[l]=j(l)}return d};var d=function(){this.listeners={}};return d.prototype.on=function(a,b){this.listeners=this.listeners||{},a in this.listeners?this.listeners[a].push(b):this.listeners[a]=[b]},d.prototype.trigger=function(a){var b=Array.prototype.slice;this.listeners=this.listeners||{},a in this.listeners&&this.invoke(this.listeners[a],b.call(arguments,1)),"*"in this.listeners&&this.invoke(this.listeners["*"],arguments)},d.prototype.invoke=function(a,b){for(var c=0,d=a.length;d>c;c++)a[c].apply(this,b)},c.Observable=d,c.generateChars=function(a){for(var b="",c=0;a>c;c++){var d=Math.floor(36*Math.random());b+=d.toString(36)}return b},c.bind=function(a,b){return function(){a.apply(b,arguments)}},c._convertData=function(a){for(var b in a){var c=b.split("-"),d=a;if(1!==c.length){for(var e=0;e<c.length;e++){var f=c[e];f=f.substring(0,1).toLowerCase()+f.substring(1),f in d||(d[f]={}),e==c.length-1&&(d[f]=a[b]),d=d[f]}delete a[b]}}return a},c.hasScroll=function(b,c){var d=a(c),e=c.style.overflowX,f=c.style.overflowY;return e!==f||"hidden"!==f&&"visible"!==f?"scroll"===e||"scroll"===f?!0:d.innerHeight()<c.scrollHeight||d.innerWidth()<c.scrollWidth:!1},c.escapeMarkup=function(a){var b={"\\":"&#92;","&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#47;"};return"string"!=typeof a?a:String(a).replace(/[&<>"'\/\\]/g,function(a){return b[a]})},c.appendMany=function(b,c){if("1.7"===a.fn.jquery.substr(0,3)){var d=a();a.map(c,function(a){d=d.add(a)}),c=d}b.append(c)},c}),b.define("select2/results",["jquery","./utils"],function(a,b){function c(a,b,d){this.$element=a,this.data=d,this.options=b,c.__super__.constructor.call(this)}return b.Extend(c,b.Observable),c.prototype.render=function(){var b=a('<ul class="select2-results__options" role="tree"></ul>');return this.options.get("multiple")&&b.attr("aria-multiselectable","true"),this.$results=b,b},c.prototype.clear=function(){this.$results.empty()},c.prototype.displayMessage=function(b){var c=this.options.get("escapeMarkup");this.clear(),this.hideLoading();var d=a('<li role="treeitem" aria-live="assertive" class="select2-results__option"></li>'),e=this.options.get("translations").get(b.message);d.append(c(e(b.args))),d[0].className+=" select2-results__message",this.$results.append(d)},c.prototype.hideMessages=function(){this.$results.find(".select2-results__message").remove()},c.prototype.append=function(a){this.hideLoading();var b=[];if(null==a.results||0===a.results.length)return void(0===this.$results.children().length&&this.trigger("results:message",{message:"noResults"}));a.results=this.sort(a.results);for(var c=0;c<a.results.length;c++){var d=a.results[c],e=this.option(d);b.push(e)}this.$results.append(b)},c.prototype.position=function(a,b){var c=b.find(".select2-results");c.append(a)},c.prototype.sort=function(a){var b=this.options.get("sorter");return b(a)},c.prototype.setClasses=function(){var b=this;this.data.current(function(c){var d=a.map(c,function(a){return a.id.toString()}),e=b.$results.find(".select2-results__option[aria-selected]");e.each(function(){var b=a(this),c=a.data(this,"data"),e=""+c.id;null!=c.element&&c.element.selected||null==c.element&&a.inArray(e,d)>-1?b.attr("aria-selected","true"):b.attr("aria-selected","false")});var f=e.filter("[aria-selected=true]");f.length>0?f.first().trigger("mouseenter"):e.first().trigger("mouseenter")})},c.prototype.showLoading=function(a){this.hideLoading();var b=this.options.get("translations").get("searching"),c={disabled:!0,loading:!0,text:b(a)},d=this.option(c);d.className+=" loading-results",this.$results.prepend(d)},c.prototype.hideLoading=function(){this.$results.find(".loading-results").remove()},c.prototype.option=function(b){var c=document.createElement("li");c.className="select2-results__option";var d={role:"treeitem","aria-selected":"false"};b.disabled&&(delete d["aria-selected"],d["aria-disabled"]="true"),null==b.id&&delete d["aria-selected"],null!=b._resultId&&(c.id=b._resultId),b.title&&(c.title=b.title),b.children&&(d.role="group",d["aria-label"]=b.text,delete d["aria-selected"]);for(var e in d){var f=d[e];c.setAttribute(e,f)}if(b.children){var g=a(c),h=document.createElement("strong");h.className="select2-results__group";a(h);this.template(b,h);for(var i=[],j=0;j<b.children.length;j++){var k=b.children[j],l=this.option(k);i.push(l)}var m=a("<ul></ul>",{"class":"select2-results__options select2-results__options--nested"});m.append(i),g.append(h),g.append(m)}else this.template(b,c);return a.data(c,"data",b),c},c.prototype.bind=function(b,c){var d=this,e=b.id+"-results";this.$results.attr("id",e),b.on("results:all",function(a){d.clear(),d.append(a.data),b.isOpen()&&d.setClasses()}),b.on("results:append",function(a){d.append(a.data),b.isOpen()&&d.setClasses()}),b.on("query",function(a){d.hideMessages(),d.showLoading(a)}),b.on("select",function(){b.isOpen()&&d.setClasses()}),b.on("unselect",function(){b.isOpen()&&d.setClasses()}),b.on("open",function(){d.$results.attr("aria-expanded","true"),d.$results.attr("aria-hidden","false"),d.setClasses(),d.ensureHighlightVisible()}),b.on("close",function(){d.$results.attr("aria-expanded","false"),d.$results.attr("aria-hidden","true"),d.$results.removeAttr("aria-activedescendant")}),b.on("results:toggle",function(){var a=d.getHighlightedResults();0!==a.length&&a.trigger("mouseup")}),b.on("results:select",function(){var a=d.getHighlightedResults();if(0!==a.length){var b=a.data("data");"true"==a.attr("aria-selected")?d.trigger("close",{}):d.trigger("select",{data:b})}}),b.on("results:previous",function(){var a=d.getHighlightedResults(),b=d.$results.find("[aria-selected]"),c=b.index(a);if(0!==c){var e=c-1;0===a.length&&(e=0);var f=b.eq(e);f.trigger("mouseenter");var g=d.$results.offset().top,h=f.offset().top,i=d.$results.scrollTop()+(h-g);0===e?d.$results.scrollTop(0):0>h-g&&d.$results.scrollTop(i)}}),b.on("results:next",function(){var a=d.getHighlightedResults(),b=d.$results.find("[aria-selected]"),c=b.index(a),e=c+1;if(!(e>=b.length)){var f=b.eq(e);f.trigger("mouseenter");var g=d.$results.offset().top+d.$results.outerHeight(!1),h=f.offset().top+f.outerHeight(!1),i=d.$results.scrollTop()+h-g;0===e?d.$results.scrollTop(0):h>g&&d.$results.scrollTop(i)}}),b.on("results:focus",function(a){a.element.addClass("select2-results__option--highlighted")}),b.on("results:message",function(a){d.displayMessage(a)}),a.fn.mousewheel&&this.$results.on("mousewheel",function(a){var b=d.$results.scrollTop(),c=d.$results.get(0).scrollHeight-d.$results.scrollTop()+a.deltaY,e=a.deltaY>0&&b-a.deltaY<=0,f=a.deltaY<0&&c<=d.$results.height();e?(d.$results.scrollTop(0),a.preventDefault(),a.stopPropagation()):f&&(d.$results.scrollTop(d.$results.get(0).scrollHeight-d.$results.height()),a.preventDefault(),a.stopPropagation())}),this.$results.on("mouseup",".select2-results__option[aria-selected]",function(b){var c=a(this),e=c.data("data");return"true"===c.attr("aria-selected")?void(d.options.get("multiple")?d.trigger("unselect",{originalEvent:b,data:e}):d.trigger("close",{})):void d.trigger("select",{originalEvent:b,data:e})}),this.$results.on("mouseenter",".select2-results__option[aria-selected]",function(b){var c=a(this).data("data");d.getHighlightedResults().removeClass("select2-results__option--highlighted"),d.trigger("results:focus",{data:c,element:a(this)})})},c.prototype.getHighlightedResults=function(){var a=this.$results.find(".select2-results__option--highlighted");return a},c.prototype.destroy=function(){this.$results.remove()},c.prototype.ensureHighlightVisible=function(){var a=this.getHighlightedResults();if(0!==a.length){var b=this.$results.find("[aria-selected]"),c=b.index(a),d=this.$results.offset().top,e=a.offset().top,f=this.$results.scrollTop()+(e-d),g=e-d;f-=2*a.outerHeight(!1),2>=c?this.$results.scrollTop(0):(g>this.$results.outerHeight()||0>g)&&this.$results.scrollTop(f)}},c.prototype.template=function(b,c){var d=this.options.get("templateResult"),e=this.options.get("escapeMarkup"),f=d(b,c);null==f?c.style.display="none":"string"==typeof f?c.innerHTML=e(f):a(c).append(f)},c}),b.define("select2/keys",[],function(){var a={BACKSPACE:8,TAB:9,ENTER:13,SHIFT:16,CTRL:17,ALT:18,ESC:27,SPACE:32,PAGE_UP:33,PAGE_DOWN:34,END:35,HOME:36,LEFT:37,UP:38,RIGHT:39,DOWN:40,DELETE:46};return a}),b.define("select2/selection/base",["jquery","../utils","../keys"],function(a,b,c){function d(a,b){this.$element=a,this.options=b,d.__super__.constructor.call(this)}return b.Extend(d,b.Observable),d.prototype.render=function(){var b=a('<span class="select2-selection" role="combobox"  aria-haspopup="true" aria-expanded="false"></span>');return this._tabindex=0,null!=this.$element.data("old-tabindex")?this._tabindex=this.$element.data("old-tabindex"):null!=this.$element.attr("tabindex")&&(this._tabindex=this.$element.attr("tabindex")),b.attr("title",this.$element.attr("title")),b.attr("tabindex",this._tabindex),this.$selection=b,b},d.prototype.bind=function(a,b){var d=this,e=(a.id+"-container",a.id+"-results");this.container=a,this.$selection.on("focus",function(a){d.trigger("focus",a)}),this.$selection.on("blur",function(a){d._handleBlur(a)}),this.$selection.on("keydown",function(a){d.trigger("keypress",a),a.which===c.SPACE&&a.preventDefault()}),a.on("results:focus",function(a){d.$selection.attr("aria-activedescendant",a.data._resultId)}),a.on("selection:update",function(a){d.update(a.data)}),a.on("open",function(){d.$selection.attr("aria-expanded","true"),d.$selection.attr("aria-owns",e),d._attachCloseHandler(a)}),a.on("close",function(){d.$selection.attr("aria-expanded","false"),d.$selection.removeAttr("aria-activedescendant"),d.$selection.removeAttr("aria-owns"),d.$selection.focus(),d._detachCloseHandler(a)}),a.on("enable",function(){d.$selection.attr("tabindex",d._tabindex)}),a.on("disable",function(){d.$selection.attr("tabindex","-1")})},d.prototype._handleBlur=function(b){var c=this;window.setTimeout(function(){document.activeElement==c.$selection[0]||a.contains(c.$selection[0],document.activeElement)||c.trigger("blur",b)},1)},d.prototype._attachCloseHandler=function(b){a(document.body).on("mousedown.select2."+b.id,function(b){var c=a(b.target),d=c.closest(".select2"),e=a(".select2.select2-container--open");e.each(function(){var b=a(this);if(this!=d[0]){var c=b.data("element");c.select2("close")}})})},d.prototype._detachCloseHandler=function(b){a(document.body).off("mousedown.select2."+b.id)},d.prototype.position=function(a,b){var c=b.find(".selection");c.append(a)},d.prototype.destroy=function(){this._detachCloseHandler(this.container)},d.prototype.update=function(a){throw new Error("The `update` method must be defined in child classes.")},d}),b.define("select2/selection/single",["jquery","./base","../utils","../keys"],function(a,b,c,d){function e(){e.__super__.constructor.apply(this,arguments)}return c.Extend(e,b),e.prototype.render=function(){var a=e.__super__.render.call(this);return a.addClass("select2-selection--single"),a.html('<span class="select2-selection__rendered"></span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span>'),a},e.prototype.bind=function(a,b){var c=this;e.__super__.bind.apply(this,arguments);var d=a.id+"-container";this.$selection.find(".select2-selection__rendered").attr("id",d),this.$selection.attr("aria-labelledby",d),this.$selection.on("mousedown",function(a){1===a.which&&c.trigger("toggle",{originalEvent:a})}),this.$selection.on("focus",function(a){}),this.$selection.on("blur",function(a){}),a.on("selection:update",function(a){c.update(a.data)})},e.prototype.clear=function(){this.$selection.find(".select2-selection__rendered").empty()},e.prototype.display=function(a,b){var c=this.options.get("templateSelection"),d=this.options.get("escapeMarkup");return d(c(a,b))},e.prototype.selectionContainer=function(){return a("<span></span>")},e.prototype.update=function(a){if(0===a.length)return void this.clear();var b=a[0],c=this.$selection.find(".select2-selection__rendered"),d=this.display(b,c);c.empty().append(d),c.prop("title",b.title||b.text)},e}),b.define("select2/selection/multiple",["jquery","./base","../utils"],function(a,b,c){function d(a,b){d.__super__.constructor.apply(this,arguments)}return c.Extend(d,b),d.prototype.render=function(){var a=d.__super__.render.call(this);return a.addClass("select2-selection--multiple"),a.html('<ul class="select2-selection__rendered"></ul>'),a},d.prototype.bind=function(b,c){var e=this;d.__super__.bind.apply(this,arguments),this.$selection.on("click",function(a){e.trigger("toggle",{originalEvent:a})}),this.$selection.on("click",".select2-selection__choice__remove",function(b){if(!e.options.get("disabled")){var c=a(this),d=c.parent(),f=d.data("data");e.trigger("unselect",{originalEvent:b,data:f})}})},d.prototype.clear=function(){this.$selection.find(".select2-selection__rendered").empty()},d.prototype.display=function(a,b){var c=this.options.get("templateSelection"),d=this.options.get("escapeMarkup");return d(c(a,b))},d.prototype.selectionContainer=function(){var b=a('<li class="select2-selection__choice"><span class="select2-selection__choice__remove" role="presentation">&times;</span></li>');return b},d.prototype.update=function(a){if(this.clear(),0!==a.length){for(var b=[],d=0;d<a.length;d++){var e=a[d],f=this.selectionContainer(),g=this.display(e,f);f.append(g),f.prop("title",e.title||e.text),f.data("data",e),b.push(f)}var h=this.$selection.find(".select2-selection__rendered");c.appendMany(h,b)}},d}),b.define("select2/selection/placeholder",["../utils"],function(a){function b(a,b,c){this.placeholder=this.normalizePlaceholder(c.get("placeholder")),a.call(this,b,c)}return b.prototype.normalizePlaceholder=function(a,b){return"string"==typeof b&&(b={id:"",text:b}),b},b.prototype.createPlaceholder=function(a,b){var c=this.selectionContainer();return c.html(this.display(b)),c.addClass("select2-selection__placeholder").removeClass("select2-selection__choice"),c},b.prototype.update=function(a,b){var c=1==b.length&&b[0].id!=this.placeholder.id,d=b.length>1;if(d||c)return a.call(this,b);this.clear();var e=this.createPlaceholder(this.placeholder);this.$selection.find(".select2-selection__rendered").append(e)},b}),b.define("select2/selection/allowClear",["jquery","../keys"],function(a,b){function c(){}return c.prototype.bind=function(a,b,c){var d=this;a.call(this,b,c),null==this.placeholder&&this.options.get("debug")&&window.console&&console.error&&console.error("Select2: The `allowClear` option should be used in combination with the `placeholder` option."),this.$selection.on("mousedown",".select2-selection__clear",function(a){d._handleClear(a)}),b.on("keypress",function(a){d._handleKeyboardClear(a,b)})},c.prototype._handleClear=function(a,b){if(!this.options.get("disabled")){var c=this.$selection.find(".select2-selection__clear");if(0!==c.length){b.stopPropagation();for(var d=c.data("data"),e=0;e<d.length;e++){var f={data:d[e]};if(this.trigger("unselect",f),f.prevented)return}this.$element.val(this.placeholder.id).trigger("change"),this.trigger("toggle",{})}}},c.prototype._handleKeyboardClear=function(a,c,d){d.isOpen()||(c.which==b.DELETE||c.which==b.BACKSPACE)&&this._handleClear(c)},c.prototype.update=function(b,c){if(b.call(this,c),!(this.$selection.find(".select2-selection__placeholder").length>0||0===c.length)){var d=a('<span class="select2-selection__clear">&times;</span>');d.data("data",c),this.$selection.find(".select2-selection__rendered").prepend(d)}},c}),b.define("select2/selection/search",["jquery","../utils","../keys"],function(a,b,c){function d(a,b,c){a.call(this,b,c)}return d.prototype.render=function(b){var c=a('<li class="select2-search select2-search--inline"><input class="select2-search__field" type="search" tabindex="-1" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" role="textbox" aria-autocomplete="list" /></li>');this.$searchContainer=c,this.$search=c.find("input");var d=b.call(this);return this._transferTabIndex(),d},d.prototype.bind=function(a,b,d){var e=this;a.call(this,b,d),b.on("open",function(){e.$search.trigger("focus")}),b.on("close",function(){e.$search.val(""),e.$search.removeAttr("aria-activedescendant"),e.$search.trigger("focus")}),b.on("enable",function(){e.$search.prop("disabled",!1),e._transferTabIndex()}),b.on("disable",function(){e.$search.prop("disabled",!0)}),b.on("focus",function(a){e.$search.trigger("focus")}),b.on("results:focus",function(a){e.$search.attr("aria-activedescendant",a.id)}),this.$selection.on("focusin",".select2-search--inline",function(a){e.trigger("focus",a)}),this.$selection.on("focusout",".select2-search--inline",function(a){e._handleBlur(a)}),this.$selection.on("keydown",".select2-search--inline",function(a){a.stopPropagation(),e.trigger("keypress",a),e._keyUpPrevented=a.isDefaultPrevented();var b=a.which;if(b===c.BACKSPACE&&""===e.$search.val()){var d=e.$searchContainer.prev(".select2-selection__choice");if(d.length>0){var f=d.data("data");e.searchRemoveChoice(f),a.preventDefault()}}});var f=document.documentMode,g=f&&11>=f;this.$selection.on("input.searchcheck",".select2-search--inline",function(a){return g?void e.$selection.off("input.search input.searchcheck"):void e.$selection.off("keyup.search")}),this.$selection.on("keyup.search input.search",".select2-search--inline",function(a){if(g&&"input"===a.type)return void e.$selection.off("input.search input.searchcheck");var b=a.which;b!=c.SHIFT&&b!=c.CTRL&&b!=c.ALT&&b!=c.TAB&&e.handleSearch(a)})},d.prototype._transferTabIndex=function(a){this.$search.attr("tabindex",this.$selection.attr("tabindex")),this.$selection.attr("tabindex","-1")},d.prototype.createPlaceholder=function(a,b){this.$search.attr("placeholder",b.text)},d.prototype.update=function(a,b){var c=this.$search[0]==document.activeElement;this.$search.attr("placeholder",""),a.call(this,b),this.$selection.find(".select2-selection__rendered").append(this.$searchContainer),this.resizeSearch(),c&&this.$search.focus()},d.prototype.handleSearch=function(){if(this.resizeSearch(),!this._keyUpPrevented){var a=this.$search.val();this.trigger("query",{term:a})}this._keyUpPrevented=!1},d.prototype.searchRemoveChoice=function(a,b){this.trigger("unselect",{data:b}),this.$search.val(b.text),this.handleSearch()},d.prototype.resizeSearch=function(){this.$search.css("width","25px");var a="";if(""!==this.$search.attr("placeholder"))a=this.$selection.find(".select2-selection__rendered").innerWidth();else{var b=this.$search.val().length+1;a=.75*b+"em"}this.$search.css("width",a)},d}),b.define("select2/selection/eventRelay",["jquery"],function(a){function b(){}return b.prototype.bind=function(b,c,d){var e=this,f=["open","opening","close","closing","select","selecting","unselect","unselecting"],g=["opening","closing","selecting","unselecting"];b.call(this,c,d),c.on("*",function(b,c){if(-1!==a.inArray(b,f)){c=c||{};var d=a.Event("select2:"+b,{params:c});e.$element.trigger(d),-1!==a.inArray(b,g)&&(c.prevented=d.isDefaultPrevented())}})},b}),b.define("select2/translation",["jquery","require"],function(a,b){function c(a){this.dict=a||{}}return c.prototype.all=function(){return this.dict},c.prototype.get=function(a){return this.dict[a]},c.prototype.extend=function(b){this.dict=a.extend({},b.all(),this.dict)},c._cache={},c.loadPath=function(a){if(!(a in c._cache)){var d=b(a);c._cache[a]=d}return new c(c._cache[a])},c}),b.define("select2/diacritics",[],function(){var a={"Ⓐ":"A","Ａ":"A","À":"A","Á":"A","Â":"A","Ầ":"A","Ấ":"A","Ẫ":"A","Ẩ":"A","Ã":"A","Ā":"A","Ă":"A","Ằ":"A","Ắ":"A","Ẵ":"A","Ẳ":"A","Ȧ":"A","Ǡ":"A","Ä":"A","Ǟ":"A","Ả":"A","Å":"A","Ǻ":"A","Ǎ":"A","Ȁ":"A","Ȃ":"A","Ạ":"A","Ậ":"A","Ặ":"A","Ḁ":"A","Ą":"A","Ⱥ":"A","Ɐ":"A","Ꜳ":"AA","Æ":"AE","Ǽ":"AE","Ǣ":"AE","Ꜵ":"AO","Ꜷ":"AU","Ꜹ":"AV","Ꜻ":"AV","Ꜽ":"AY","Ⓑ":"B","Ｂ":"B","Ḃ":"B","Ḅ":"B","Ḇ":"B","Ƀ":"B","Ƃ":"B","Ɓ":"B","Ⓒ":"C","Ｃ":"C","Ć":"C","Ĉ":"C","Ċ":"C","Č":"C","Ç":"C","Ḉ":"C","Ƈ":"C","Ȼ":"C","Ꜿ":"C","Ⓓ":"D","Ｄ":"D","Ḋ":"D","Ď":"D","Ḍ":"D","Ḑ":"D","Ḓ":"D","Ḏ":"D","Đ":"D","Ƌ":"D","Ɗ":"D","Ɖ":"D","Ꝺ":"D","Ǳ":"DZ","Ǆ":"DZ","ǲ":"Dz","ǅ":"Dz","Ⓔ":"E","Ｅ":"E","È":"E","É":"E","Ê":"E","Ề":"E","Ế":"E","Ễ":"E","Ể":"E","Ẽ":"E","Ē":"E","Ḕ":"E","Ḗ":"E","Ĕ":"E","Ė":"E","Ë":"E","Ẻ":"E","Ě":"E","Ȅ":"E","Ȇ":"E","Ẹ":"E","Ệ":"E","Ȩ":"E","Ḝ":"E","Ę":"E","Ḙ":"E","Ḛ":"E","Ɛ":"E","Ǝ":"E","Ⓕ":"F","Ｆ":"F","Ḟ":"F","Ƒ":"F","Ꝼ":"F","Ⓖ":"G","Ｇ":"G","Ǵ":"G","Ĝ":"G","Ḡ":"G","Ğ":"G","Ġ":"G","Ǧ":"G","Ģ":"G","Ǥ":"G","Ɠ":"G","Ꞡ":"G","Ᵹ":"G","Ꝿ":"G","Ⓗ":"H","Ｈ":"H","Ĥ":"H","Ḣ":"H","Ḧ":"H","Ȟ":"H","Ḥ":"H","Ḩ":"H","Ḫ":"H","Ħ":"H","Ⱨ":"H","Ⱶ":"H","Ɥ":"H","Ⓘ":"I","Ｉ":"I","Ì":"I","Í":"I","Î":"I","Ĩ":"I","Ī":"I","Ĭ":"I","İ":"I","Ï":"I","Ḯ":"I","Ỉ":"I","Ǐ":"I","Ȉ":"I","Ȋ":"I","Ị":"I","Į":"I","Ḭ":"I","Ɨ":"I","Ⓙ":"J","Ｊ":"J","Ĵ":"J","Ɉ":"J","Ⓚ":"K","Ｋ":"K","Ḱ":"K","Ǩ":"K","Ḳ":"K","Ķ":"K","Ḵ":"K","Ƙ":"K","Ⱪ":"K","Ꝁ":"K","Ꝃ":"K","Ꝅ":"K","Ꞣ":"K","Ⓛ":"L","Ｌ":"L","Ŀ":"L","Ĺ":"L","Ľ":"L","Ḷ":"L","Ḹ":"L","Ļ":"L","Ḽ":"L","Ḻ":"L","Ł":"L","Ƚ":"L","Ɫ":"L","Ⱡ":"L","Ꝉ":"L","Ꝇ":"L","Ꞁ":"L","Ǉ":"LJ","ǈ":"Lj","Ⓜ":"M","Ｍ":"M","Ḿ":"M","Ṁ":"M","Ṃ":"M","Ɱ":"M","Ɯ":"M","Ⓝ":"N","Ｎ":"N","Ǹ":"N","Ń":"N","Ñ":"N","Ṅ":"N","Ň":"N","Ṇ":"N","Ņ":"N","Ṋ":"N","Ṉ":"N","Ƞ":"N","Ɲ":"N","Ꞑ":"N","Ꞥ":"N","Ǌ":"NJ","ǋ":"Nj","Ⓞ":"O","Ｏ":"O","Ò":"O","Ó":"O","Ô":"O","Ồ":"O","Ố":"O","Ỗ":"O","Ổ":"O","Õ":"O","Ṍ":"O","Ȭ":"O","Ṏ":"O","Ō":"O","Ṑ":"O","Ṓ":"O","Ŏ":"O","Ȯ":"O","Ȱ":"O","Ö":"O","Ȫ":"O","Ỏ":"O","Ő":"O","Ǒ":"O","Ȍ":"O","Ȏ":"O","Ơ":"O","Ờ":"O","Ớ":"O","Ỡ":"O","Ở":"O","Ợ":"O","Ọ":"O","Ộ":"O","Ǫ":"O","Ǭ":"O","Ø":"O","Ǿ":"O","Ɔ":"O","Ɵ":"O","Ꝋ":"O","Ꝍ":"O","Ƣ":"OI","Ꝏ":"OO","Ȣ":"OU","Ⓟ":"P","Ｐ":"P","Ṕ":"P","Ṗ":"P","Ƥ":"P","Ᵽ":"P","Ꝑ":"P","Ꝓ":"P","Ꝕ":"P","Ⓠ":"Q","Ｑ":"Q","Ꝗ":"Q","Ꝙ":"Q","Ɋ":"Q","Ⓡ":"R","Ｒ":"R","Ŕ":"R","Ṙ":"R","Ř":"R","Ȑ":"R","Ȓ":"R","Ṛ":"R","Ṝ":"R","Ŗ":"R","Ṟ":"R","Ɍ":"R","Ɽ":"R","Ꝛ":"R","Ꞧ":"R","Ꞃ":"R","Ⓢ":"S","Ｓ":"S","ẞ":"S","Ś":"S","Ṥ":"S","Ŝ":"S","Ṡ":"S","Š":"S","Ṧ":"S","Ṣ":"S","Ṩ":"S","Ș":"S","Ş":"S","Ȿ":"S","Ꞩ":"S","Ꞅ":"S","Ⓣ":"T","Ｔ":"T","Ṫ":"T","Ť":"T","Ṭ":"T","Ț":"T","Ţ":"T","Ṱ":"T","Ṯ":"T","Ŧ":"T","Ƭ":"T","Ʈ":"T","Ⱦ":"T","Ꞇ":"T","Ꜩ":"TZ","Ⓤ":"U","Ｕ":"U","Ù":"U","Ú":"U","Û":"U","Ũ":"U","Ṹ":"U","Ū":"U","Ṻ":"U","Ŭ":"U","Ü":"U","Ǜ":"U","Ǘ":"U","Ǖ":"U","Ǚ":"U","Ủ":"U","Ů":"U","Ű":"U","Ǔ":"U","Ȕ":"U","Ȗ":"U","Ư":"U","Ừ":"U","Ứ":"U","Ữ":"U","Ử":"U","Ự":"U","Ụ":"U","Ṳ":"U","Ų":"U","Ṷ":"U","Ṵ":"U","Ʉ":"U","Ⓥ":"V","Ｖ":"V","Ṽ":"V","Ṿ":"V","Ʋ":"V","Ꝟ":"V","Ʌ":"V","Ꝡ":"VY","Ⓦ":"W","Ｗ":"W","Ẁ":"W","Ẃ":"W","Ŵ":"W","Ẇ":"W","Ẅ":"W","Ẉ":"W","Ⱳ":"W","Ⓧ":"X","Ｘ":"X","Ẋ":"X","Ẍ":"X","Ⓨ":"Y","Ｙ":"Y","Ỳ":"Y","Ý":"Y","Ŷ":"Y","Ỹ":"Y","Ȳ":"Y","Ẏ":"Y","Ÿ":"Y","Ỷ":"Y","Ỵ":"Y","Ƴ":"Y","Ɏ":"Y","Ỿ":"Y","Ⓩ":"Z","Ｚ":"Z","Ź":"Z","Ẑ":"Z","Ż":"Z","Ž":"Z","Ẓ":"Z","Ẕ":"Z","Ƶ":"Z","Ȥ":"Z","Ɀ":"Z","Ⱬ":"Z","Ꝣ":"Z","ⓐ":"a","ａ":"a","ẚ":"a","à":"a","á":"a","â":"a","ầ":"a","ấ":"a","ẫ":"a","ẩ":"a","ã":"a","ā":"a","ă":"a","ằ":"a","ắ":"a","ẵ":"a","ẳ":"a","ȧ":"a","ǡ":"a","ä":"a","ǟ":"a","ả":"a","å":"a","ǻ":"a","ǎ":"a","ȁ":"a","ȃ":"a","ạ":"a","ậ":"a","ặ":"a","ḁ":"a","ą":"a","ⱥ":"a","ɐ":"a","ꜳ":"aa","æ":"ae","ǽ":"ae","ǣ":"ae","ꜵ":"ao","ꜷ":"au","ꜹ":"av","ꜻ":"av","ꜽ":"ay","ⓑ":"b","ｂ":"b","ḃ":"b","ḅ":"b","ḇ":"b","ƀ":"b","ƃ":"b","ɓ":"b","ⓒ":"c","ｃ":"c","ć":"c","ĉ":"c","ċ":"c","č":"c","ç":"c","ḉ":"c","ƈ":"c","ȼ":"c","ꜿ":"c","ↄ":"c","ⓓ":"d","ｄ":"d","ḋ":"d","ď":"d","ḍ":"d","ḑ":"d","ḓ":"d","ḏ":"d","đ":"d","ƌ":"d","ɖ":"d","ɗ":"d","ꝺ":"d","ǳ":"dz","ǆ":"dz","ⓔ":"e","ｅ":"e","è":"e","é":"e","ê":"e","ề":"e","ế":"e","ễ":"e","ể":"e","ẽ":"e","ē":"e","ḕ":"e","ḗ":"e","ĕ":"e","ė":"e","ë":"e","ẻ":"e","ě":"e","ȅ":"e","ȇ":"e","ẹ":"e","ệ":"e","ȩ":"e","ḝ":"e","ę":"e","ḙ":"e","ḛ":"e","ɇ":"e","ɛ":"e","ǝ":"e","ⓕ":"f","ｆ":"f","ḟ":"f","ƒ":"f","ꝼ":"f","ⓖ":"g","ｇ":"g","ǵ":"g","ĝ":"g","ḡ":"g","ğ":"g","ġ":"g","ǧ":"g","ģ":"g","ǥ":"g","ɠ":"g","ꞡ":"g","ᵹ":"g","ꝿ":"g","ⓗ":"h","ｈ":"h","ĥ":"h","ḣ":"h","ḧ":"h","ȟ":"h","ḥ":"h","ḩ":"h","ḫ":"h","ẖ":"h","ħ":"h","ⱨ":"h","ⱶ":"h","ɥ":"h","ƕ":"hv","ⓘ":"i","ｉ":"i","ì":"i","í":"i","î":"i","ĩ":"i","ī":"i","ĭ":"i","ï":"i","ḯ":"i","ỉ":"i","ǐ":"i","ȉ":"i","ȋ":"i","ị":"i","į":"i","ḭ":"i","ɨ":"i","ı":"i","ⓙ":"j","ｊ":"j","ĵ":"j","ǰ":"j","ɉ":"j","ⓚ":"k","ｋ":"k","ḱ":"k","ǩ":"k","ḳ":"k","ķ":"k","ḵ":"k","ƙ":"k","ⱪ":"k","ꝁ":"k","ꝃ":"k","ꝅ":"k","ꞣ":"k","ⓛ":"l","ｌ":"l","ŀ":"l","ĺ":"l","ľ":"l","ḷ":"l","ḹ":"l","ļ":"l","ḽ":"l","ḻ":"l","ſ":"l","ł":"l","ƚ":"l","ɫ":"l","ⱡ":"l","ꝉ":"l","ꞁ":"l","ꝇ":"l","ǉ":"lj","ⓜ":"m","ｍ":"m","ḿ":"m","ṁ":"m","ṃ":"m","ɱ":"m","ɯ":"m","ⓝ":"n","ｎ":"n","ǹ":"n","ń":"n","ñ":"n","ṅ":"n","ň":"n","ṇ":"n","ņ":"n","ṋ":"n","ṉ":"n","ƞ":"n","ɲ":"n","ŉ":"n","ꞑ":"n","ꞥ":"n","ǌ":"nj","ⓞ":"o","ｏ":"o","ò":"o","ó":"o","ô":"o","ồ":"o","ố":"o","ỗ":"o","ổ":"o","õ":"o","ṍ":"o","ȭ":"o","ṏ":"o","ō":"o","ṑ":"o","ṓ":"o","ŏ":"o","ȯ":"o","ȱ":"o","ö":"o","ȫ":"o","ỏ":"o","ő":"o","ǒ":"o","ȍ":"o","ȏ":"o","ơ":"o","ờ":"o","ớ":"o","ỡ":"o","ở":"o","ợ":"o","ọ":"o","ộ":"o","ǫ":"o","ǭ":"o","ø":"o","ǿ":"o","ɔ":"o","ꝋ":"o","ꝍ":"o","ɵ":"o","ƣ":"oi","ȣ":"ou","ꝏ":"oo","ⓟ":"p","ｐ":"p","ṕ":"p","ṗ":"p","ƥ":"p","ᵽ":"p","ꝑ":"p","ꝓ":"p","ꝕ":"p","ⓠ":"q","ｑ":"q","ɋ":"q","ꝗ":"q","ꝙ":"q","ⓡ":"r","ｒ":"r","ŕ":"r","ṙ":"r","ř":"r","ȑ":"r","ȓ":"r","ṛ":"r","ṝ":"r","ŗ":"r","ṟ":"r","ɍ":"r","ɽ":"r","ꝛ":"r","ꞧ":"r","ꞃ":"r","ⓢ":"s","ｓ":"s","ß":"s","ś":"s","ṥ":"s","ŝ":"s","ṡ":"s","š":"s","ṧ":"s","ṣ":"s","ṩ":"s","ș":"s","ş":"s","ȿ":"s","ꞩ":"s","ꞅ":"s","ẛ":"s","ⓣ":"t","ｔ":"t","ṫ":"t","ẗ":"t","ť":"t","ṭ":"t","ț":"t","ţ":"t","ṱ":"t","ṯ":"t","ŧ":"t","ƭ":"t","ʈ":"t","ⱦ":"t","ꞇ":"t","ꜩ":"tz","ⓤ":"u","ｕ":"u","ù":"u","ú":"u","û":"u","ũ":"u","ṹ":"u","ū":"u","ṻ":"u","ŭ":"u","ü":"u","ǜ":"u","ǘ":"u","ǖ":"u","ǚ":"u","ủ":"u","ů":"u","ű":"u","ǔ":"u","ȕ":"u","ȗ":"u","ư":"u","ừ":"u","ứ":"u","ữ":"u","ử":"u","ự":"u","ụ":"u","ṳ":"u","ų":"u","ṷ":"u","ṵ":"u","ʉ":"u","ⓥ":"v","ｖ":"v","ṽ":"v","ṿ":"v","ʋ":"v","ꝟ":"v","ʌ":"v","ꝡ":"vy","ⓦ":"w","ｗ":"w","ẁ":"w","ẃ":"w","ŵ":"w","ẇ":"w","ẅ":"w","ẘ":"w","ẉ":"w","ⱳ":"w","ⓧ":"x","ｘ":"x","ẋ":"x","ẍ":"x","ⓨ":"y","ｙ":"y","ỳ":"y","ý":"y","ŷ":"y","ỹ":"y","ȳ":"y","ẏ":"y","ÿ":"y","ỷ":"y","ẙ":"y","ỵ":"y","ƴ":"y","ɏ":"y","ỿ":"y","ⓩ":"z","ｚ":"z","ź":"z","ẑ":"z","ż":"z","ž":"z","ẓ":"z","ẕ":"z","ƶ":"z","ȥ":"z","ɀ":"z","ⱬ":"z","ꝣ":"z","Ά":"Α","Έ":"Ε","Ή":"Η","Ί":"Ι","Ϊ":"Ι","Ό":"Ο","Ύ":"Υ","Ϋ":"Υ","Ώ":"Ω","ά":"α","έ":"ε","ή":"η","ί":"ι","ϊ":"ι","ΐ":"ι","ό":"ο","ύ":"υ","ϋ":"υ","ΰ":"υ","ω":"ω","ς":"σ"};return a}),b.define("select2/data/base",["../utils"],function(a){function b(a,c){b.__super__.constructor.call(this)}return a.Extend(b,a.Observable),b.prototype.current=function(a){throw new Error("The `current` method must be defined in child classes.")},b.prototype.query=function(a,b){throw new Error("The `query` method must be defined in child classes.")},b.prototype.bind=function(a,b){},b.prototype.destroy=function(){},b.prototype.generateResultId=function(b,c){var d=b.id+"-result-";return d+=a.generateChars(4),d+=null!=c.id?"-"+c.id.toString():"-"+a.generateChars(4)},b}),b.define("select2/data/select",["./base","../utils","jquery"],function(a,b,c){function d(a,b){this.$element=a,this.options=b,d.__super__.constructor.call(this)}return b.Extend(d,a),d.prototype.current=function(a){var b=[],d=this;this.$element.find(":selected").each(function(){var a=c(this),e=d.item(a);b.push(e)}),a(b)},d.prototype.select=function(a){var b=this;if(a.selected=!0,c(a.element).is("option"))return a.element.selected=!0,void this.$element.trigger("change");if(this.$element.prop("multiple"))this.current(function(d){var e=[];a=[a],a.push.apply(a,d);for(var f=0;f<a.length;f++){var g=a[f].id;-1===c.inArray(g,e)&&e.push(g)}b.$element.val(e),b.$element.trigger("change")});else{var d=a.id;this.$element.val(d),this.$element.trigger("change")}},d.prototype.unselect=function(a){
var b=this;if(this.$element.prop("multiple"))return a.selected=!1,c(a.element).is("option")?(a.element.selected=!1,void this.$element.trigger("change")):void this.current(function(d){for(var e=[],f=0;f<d.length;f++){var g=d[f].id;g!==a.id&&-1===c.inArray(g,e)&&e.push(g)}b.$element.val(e),b.$element.trigger("change")})},d.prototype.bind=function(a,b){var c=this;this.container=a,a.on("select",function(a){c.select(a.data)}),a.on("unselect",function(a){c.unselect(a.data)})},d.prototype.destroy=function(){this.$element.find("*").each(function(){c.removeData(this,"data")})},d.prototype.query=function(a,b){var d=[],e=this,f=this.$element.children();f.each(function(){var b=c(this);if(b.is("option")||b.is("optgroup")){var f=e.item(b),g=e.matches(a,f);null!==g&&d.push(g)}}),b({results:d})},d.prototype.addOptions=function(a){b.appendMany(this.$element,a)},d.prototype.option=function(a){var b;a.children?(b=document.createElement("optgroup"),b.label=a.text):(b=document.createElement("option"),void 0!==b.textContent?b.textContent=a.text:b.innerText=a.text),a.id&&(b.value=a.id),a.disabled&&(b.disabled=!0),a.selected&&(b.selected=!0),a.title&&(b.title=a.title);var d=c(b),e=this._normalizeItem(a);return e.element=b,c.data(b,"data",e),d},d.prototype.item=function(a){var b={};if(b=c.data(a[0],"data"),null!=b)return b;if(a.is("option"))b={id:a.val(),text:a.text(),disabled:a.prop("disabled"),selected:a.prop("selected"),title:a.prop("title")};else if(a.is("optgroup")){b={text:a.prop("label"),children:[],title:a.prop("title")};for(var d=a.children("option"),e=[],f=0;f<d.length;f++){var g=c(d[f]),h=this.item(g);e.push(h)}b.children=e}return b=this._normalizeItem(b),b.element=a[0],c.data(a[0],"data",b),b},d.prototype._normalizeItem=function(a){c.isPlainObject(a)||(a={id:a,text:a}),a=c.extend({},{text:""},a);var b={selected:!1,disabled:!1};return null!=a.id&&(a.id=a.id.toString()),null!=a.text&&(a.text=a.text.toString()),null==a._resultId&&a.id&&null!=this.container&&(a._resultId=this.generateResultId(this.container,a)),c.extend({},b,a)},d.prototype.matches=function(a,b){var c=this.options.get("matcher");return c(a,b)},d}),b.define("select2/data/array",["./select","../utils","jquery"],function(a,b,c){function d(a,b){var c=b.get("data")||[];d.__super__.constructor.call(this,a,b),this.addOptions(this.convertToOptions(c))}return b.Extend(d,a),d.prototype.select=function(a){var b=this.$element.find("option").filter(function(b,c){return c.value==a.id.toString()});0===b.length&&(b=this.option(a),this.addOptions(b)),d.__super__.select.call(this,a)},d.prototype.convertToOptions=function(a){function d(a){return function(){return c(this).val()==a.id}}for(var e=this,f=this.$element.find("option"),g=f.map(function(){return e.item(c(this)).id}).get(),h=[],i=0;i<a.length;i++){var j=this._normalizeItem(a[i]);if(c.inArray(j.id,g)>=0){var k=f.filter(d(j)),l=this.item(k),m=c.extend(!0,{},l,j),n=this.option(m);k.replaceWith(n)}else{var o=this.option(j);if(j.children){var p=this.convertToOptions(j.children);b.appendMany(o,p)}h.push(o)}}return h},d}),b.define("select2/data/ajax",["./array","../utils","jquery"],function(a,b,c){function d(a,b){this.ajaxOptions=this._applyDefaults(b.get("ajax")),null!=this.ajaxOptions.processResults&&(this.processResults=this.ajaxOptions.processResults),d.__super__.constructor.call(this,a,b)}return b.Extend(d,a),d.prototype._applyDefaults=function(a){var b={data:function(a){return c.extend({},a,{q:a.term})},transport:function(a,b,d){var e=c.ajax(a);return e.then(b),e.fail(d),e}};return c.extend({},b,a,!0)},d.prototype.processResults=function(a){return a},d.prototype.query=function(a,b){function d(){var d=f.transport(f,function(d){var f=e.processResults(d,a);e.options.get("debug")&&window.console&&console.error&&(f&&f.results&&c.isArray(f.results)||console.error("Select2: The AJAX results did not return an array in the `results` key of the response.")),b(f)},function(){});e._request=d}var e=this;null!=this._request&&(c.isFunction(this._request.abort)&&this._request.abort(),this._request=null);var f=c.extend({type:"GET"},this.ajaxOptions);"function"==typeof f.url&&(f.url=f.url.call(this.$element,a)),"function"==typeof f.data&&(f.data=f.data.call(this.$element,a)),this.ajaxOptions.delay&&""!==a.term?(this._queryTimeout&&window.clearTimeout(this._queryTimeout),this._queryTimeout=window.setTimeout(d,this.ajaxOptions.delay)):d()},d}),b.define("select2/data/tags",["jquery"],function(a){function b(b,c,d){var e=d.get("tags"),f=d.get("createTag");if(void 0!==f&&(this.createTag=f),b.call(this,c,d),a.isArray(e))for(var g=0;g<e.length;g++){var h=e[g],i=this._normalizeItem(h),j=this.option(i);this.$element.append(j)}}return b.prototype.query=function(a,b,c){function d(a,f){for(var g=a.results,h=0;h<g.length;h++){var i=g[h],j=null!=i.children&&!d({results:i.children},!0),k=i.text===b.term;if(k||j)return f?!1:(a.data=g,void c(a))}if(f)return!0;var l=e.createTag(b);if(null!=l){var m=e.option(l);m.attr("data-select2-tag",!0),e.addOptions([m]),e.insertTag(g,l)}a.results=g,c(a)}var e=this;return this._removeOldTags(),null==b.term||null!=b.page?void a.call(this,b,c):void a.call(this,b,d)},b.prototype.createTag=function(b,c){var d=a.trim(c.term);return""===d?null:{id:d,text:d}},b.prototype.insertTag=function(a,b,c){b.unshift(c)},b.prototype._removeOldTags=function(b){var c=(this._lastTag,this.$element.find("option[data-select2-tag]"));c.each(function(){this.selected||a(this).remove()})},b}),b.define("select2/data/tokenizer",["jquery"],function(a){function b(a,b,c){var d=c.get("tokenizer");void 0!==d&&(this.tokenizer=d),a.call(this,b,c)}return b.prototype.bind=function(a,b,c){a.call(this,b,c),this.$search=b.dropdown.$search||b.selection.$search||c.find(".select2-search__field")},b.prototype.query=function(a,b,c){function d(a){e.trigger("select",{data:a})}var e=this;b.term=b.term||"";var f=this.tokenizer(b,this.options,d);f.term!==b.term&&(this.$search.length&&(this.$search.val(f.term),this.$search.focus()),b.term=f.term),a.call(this,b,c)},b.prototype.tokenizer=function(b,c,d,e){for(var f=d.get("tokenSeparators")||[],g=c.term,h=0,i=this.createTag||function(a){return{id:a.term,text:a.term}};h<g.length;){var j=g[h];if(-1!==a.inArray(j,f)){var k=g.substr(0,h),l=a.extend({},c,{term:k}),m=i(l);null!=m?(e(m),g=g.substr(h+1)||"",h=0):h++}else h++}return{term:g}},b}),b.define("select2/data/minimumInputLength",[],function(){function a(a,b,c){this.minimumInputLength=c.get("minimumInputLength"),a.call(this,b,c)}return a.prototype.query=function(a,b,c){return b.term=b.term||"",b.term.length<this.minimumInputLength?void this.trigger("results:message",{message:"inputTooShort",args:{minimum:this.minimumInputLength,input:b.term,params:b}}):void a.call(this,b,c)},a}),b.define("select2/data/maximumInputLength",[],function(){function a(a,b,c){this.maximumInputLength=c.get("maximumInputLength"),a.call(this,b,c)}return a.prototype.query=function(a,b,c){return b.term=b.term||"",this.maximumInputLength>0&&b.term.length>this.maximumInputLength?void this.trigger("results:message",{message:"inputTooLong",args:{maximum:this.maximumInputLength,input:b.term,params:b}}):void a.call(this,b,c)},a}),b.define("select2/data/maximumSelectionLength",[],function(){function a(a,b,c){this.maximumSelectionLength=c.get("maximumSelectionLength"),a.call(this,b,c)}return a.prototype.query=function(a,b,c){var d=this;this.current(function(e){var f=null!=e?e.length:0;return d.maximumSelectionLength>0&&f>=d.maximumSelectionLength?void d.trigger("results:message",{message:"maximumSelected",args:{maximum:d.maximumSelectionLength}}):void a.call(d,b,c)})},a}),b.define("select2/dropdown",["jquery","./utils"],function(a,b){function c(a,b){this.$element=a,this.options=b,c.__super__.constructor.call(this)}return b.Extend(c,b.Observable),c.prototype.render=function(){var b=a('<span class="select2-dropdown"><span class="select2-results"></span></span>');return b.attr("dir",this.options.get("dir")),this.$dropdown=b,b},c.prototype.bind=function(){},c.prototype.position=function(a,b){},c.prototype.destroy=function(){this.$dropdown.remove()},c}),b.define("select2/dropdown/search",["jquery","../utils"],function(a,b){function c(){}return c.prototype.render=function(b){var c=b.call(this),d=a('<span class="select2-search select2-search--dropdown"><input class="select2-search__field" type="search" tabindex="-1" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" role="textbox" /></span>');return this.$searchContainer=d,this.$search=d.find("input"),c.prepend(d),c},c.prototype.bind=function(b,c,d){var e=this;b.call(this,c,d),this.$search.on("keydown",function(a){e.trigger("keypress",a),e._keyUpPrevented=a.isDefaultPrevented()}),this.$search.on("input",function(b){a(this).off("keyup")}),this.$search.on("keyup input",function(a){e.handleSearch(a)}),c.on("open",function(){e.$search.attr("tabindex",0),e.$search.focus(),window.setTimeout(function(){e.$search.focus()},0)}),c.on("close",function(){e.$search.attr("tabindex",-1),e.$search.val("")}),c.on("results:all",function(a){if(null==a.query.term||""===a.query.term){var b=e.showSearch(a);b?e.$searchContainer.removeClass("select2-search--hide"):e.$searchContainer.addClass("select2-search--hide")}})},c.prototype.handleSearch=function(a){if(!this._keyUpPrevented){var b=this.$search.val();this.trigger("query",{term:b})}this._keyUpPrevented=!1},c.prototype.showSearch=function(a,b){return!0},c}),b.define("select2/dropdown/hidePlaceholder",[],function(){function a(a,b,c,d){this.placeholder=this.normalizePlaceholder(c.get("placeholder")),a.call(this,b,c,d)}return a.prototype.append=function(a,b){b.results=this.removePlaceholder(b.results),a.call(this,b)},a.prototype.normalizePlaceholder=function(a,b){return"string"==typeof b&&(b={id:"",text:b}),b},a.prototype.removePlaceholder=function(a,b){for(var c=b.slice(0),d=b.length-1;d>=0;d--){var e=b[d];this.placeholder.id===e.id&&c.splice(d,1)}return c},a}),b.define("select2/dropdown/infiniteScroll",["jquery"],function(a){function b(a,b,c,d){this.lastParams={},a.call(this,b,c,d),this.$loadingMore=this.createLoadingMore(),this.loading=!1}return b.prototype.append=function(a,b){this.$loadingMore.remove(),this.loading=!1,a.call(this,b),this.showLoadingMore(b)&&this.$results.append(this.$loadingMore)},b.prototype.bind=function(b,c,d){var e=this;b.call(this,c,d),c.on("query",function(a){e.lastParams=a,e.loading=!0}),c.on("query:append",function(a){e.lastParams=a,e.loading=!0}),this.$results.on("scroll",function(){var b=a.contains(document.documentElement,e.$loadingMore[0]);if(!e.loading&&b){var c=e.$results.offset().top+e.$results.outerHeight(!1),d=e.$loadingMore.offset().top+e.$loadingMore.outerHeight(!1);c+50>=d&&e.loadMore()}})},b.prototype.loadMore=function(){this.loading=!0;var b=a.extend({},{page:1},this.lastParams);b.page++,this.trigger("query:append",b)},b.prototype.showLoadingMore=function(a,b){return b.pagination&&b.pagination.more},b.prototype.createLoadingMore=function(){var b=a('<li class="select2-results__option select2-results__option--load-more"role="treeitem" aria-disabled="true"></li>'),c=this.options.get("translations").get("loadingMore");return b.html(c(this.lastParams)),b},b}),b.define("select2/dropdown/attachBody",["jquery","../utils"],function(a,b){function c(b,c,d){this.$dropdownParent=d.get("dropdownParent")||a(document.body),b.call(this,c,d)}return c.prototype.bind=function(a,b,c){var d=this,e=!1;a.call(this,b,c),b.on("open",function(){d._showDropdown(),d._attachPositioningHandler(b),e||(e=!0,b.on("results:all",function(){d._positionDropdown(),d._resizeDropdown()}),b.on("results:append",function(){d._positionDropdown(),d._resizeDropdown()}))}),b.on("close",function(){d._hideDropdown(),d._detachPositioningHandler(b)}),this.$dropdownContainer.on("mousedown",function(a){a.stopPropagation()})},c.prototype.destroy=function(a){a.call(this),this.$dropdownContainer.remove()},c.prototype.position=function(a,b,c){b.attr("class",c.attr("class")),b.removeClass("select2"),b.addClass("select2-container--open"),b.css({position:"absolute",top:-999999}),this.$container=c},c.prototype.render=function(b){var c=a("<span></span>"),d=b.call(this);return c.append(d),this.$dropdownContainer=c,c},c.prototype._hideDropdown=function(a){this.$dropdownContainer.detach()},c.prototype._attachPositioningHandler=function(c,d){var e=this,f="scroll.select2."+d.id,g="resize.select2."+d.id,h="orientationchange.select2."+d.id,i=this.$container.parents().filter(b.hasScroll);i.each(function(){a(this).data("select2-scroll-position",{x:a(this).scrollLeft(),y:a(this).scrollTop()})}),i.on(f,function(b){var c=a(this).data("select2-scroll-position");a(this).scrollTop(c.y)}),a(window).on(f+" "+g+" "+h,function(a){e._positionDropdown(),e._resizeDropdown()})},c.prototype._detachPositioningHandler=function(c,d){var e="scroll.select2."+d.id,f="resize.select2."+d.id,g="orientationchange.select2."+d.id,h=this.$container.parents().filter(b.hasScroll);h.off(e),a(window).off(e+" "+f+" "+g)},c.prototype._positionDropdown=function(){var b=a(window),c=this.$dropdown.hasClass("select2-dropdown--above"),d=this.$dropdown.hasClass("select2-dropdown--below"),e=null,f=(this.$container.position(),this.$container.offset());f.bottom=f.top+this.$container.outerHeight(!1);var g={height:this.$container.outerHeight(!1)};g.top=f.top,g.bottom=f.top+g.height;var h={height:this.$dropdown.outerHeight(!1)},i={top:b.scrollTop(),bottom:b.scrollTop()+b.height()},j=i.top<f.top-h.height,k=i.bottom>f.bottom+h.height,l={left:f.left,top:g.bottom};if("static"!==this.$dropdownParent[0].style.position){var m=this.$dropdownParent.offset();l.top-=m.top,l.left-=m.left}c||d||(e="below"),k||!j||c?!j&&k&&c&&(e="below"):e="above",("above"==e||c&&"below"!==e)&&(l.top=g.top-h.height),null!=e&&(this.$dropdown.removeClass("select2-dropdown--below select2-dropdown--above").addClass("select2-dropdown--"+e),this.$container.removeClass("select2-container--below select2-container--above").addClass("select2-container--"+e)),this.$dropdownContainer.css(l)},c.prototype._resizeDropdown=function(){var a={width:this.$container.outerWidth(!1)+"px"};this.options.get("dropdownAutoWidth")&&(a.minWidth=a.width,a.width="auto"),this.$dropdown.css(a)},c.prototype._showDropdown=function(a){this.$dropdownContainer.appendTo(this.$dropdownParent),this._positionDropdown(),this._resizeDropdown()},c}),b.define("select2/dropdown/minimumResultsForSearch",[],function(){function a(b){for(var c=0,d=0;d<b.length;d++){var e=b[d];e.children?c+=a(e.children):c++}return c}function b(a,b,c,d){this.minimumResultsForSearch=c.get("minimumResultsForSearch"),this.minimumResultsForSearch<0&&(this.minimumResultsForSearch=1/0),a.call(this,b,c,d)}return b.prototype.showSearch=function(b,c){return a(c.data.results)<this.minimumResultsForSearch?!1:b.call(this,c)},b}),b.define("select2/dropdown/selectOnClose",[],function(){function a(){}return a.prototype.bind=function(a,b,c){var d=this;a.call(this,b,c),b.on("close",function(){d._handleSelectOnClose()})},a.prototype._handleSelectOnClose=function(){var a=this.getHighlightedResults();if(!(a.length<1)){var b=a.data("data");null!=b.element&&b.element.selected||null==b.element&&b.selected||this.trigger("select",{data:b})}},a}),b.define("select2/dropdown/closeOnSelect",[],function(){function a(){}return a.prototype.bind=function(a,b,c){var d=this;a.call(this,b,c),b.on("select",function(a){d._selectTriggered(a)}),b.on("unselect",function(a){d._selectTriggered(a)})},a.prototype._selectTriggered=function(a,b){var c=b.originalEvent;c&&c.ctrlKey||this.trigger("close",{})},a}),b.define("select2/i18n/en",[],function(){return{errorLoading:function(){return"The results could not be loaded."},inputTooLong:function(a){var b=a.input.length-a.maximum,c="Please delete "+b+" character";return 1!=b&&(c+="s"),c},inputTooShort:function(a){var b=a.minimum-a.input.length,c="Please enter "+b+" or more characters";return c},loadingMore:function(){return"Loading more results…"},maximumSelected:function(a){var b="You can only select "+a.maximum+" item";return 1!=a.maximum&&(b+="s"),b},noResults:function(){return"No results found"},searching:function(){return"Searching…"}}}),b.define("select2/defaults",["jquery","require","./results","./selection/single","./selection/multiple","./selection/placeholder","./selection/allowClear","./selection/search","./selection/eventRelay","./utils","./translation","./diacritics","./data/select","./data/array","./data/ajax","./data/tags","./data/tokenizer","./data/minimumInputLength","./data/maximumInputLength","./data/maximumSelectionLength","./dropdown","./dropdown/search","./dropdown/hidePlaceholder","./dropdown/infiniteScroll","./dropdown/attachBody","./dropdown/minimumResultsForSearch","./dropdown/selectOnClose","./dropdown/closeOnSelect","./i18n/en"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C){function D(){this.reset()}D.prototype.apply=function(l){if(l=a.extend({},this.defaults,l),null==l.dataAdapter){if(null!=l.ajax?l.dataAdapter=o:null!=l.data?l.dataAdapter=n:l.dataAdapter=m,l.minimumInputLength>0&&(l.dataAdapter=j.Decorate(l.dataAdapter,r)),l.maximumInputLength>0&&(l.dataAdapter=j.Decorate(l.dataAdapter,s)),l.maximumSelectionLength>0&&(l.dataAdapter=j.Decorate(l.dataAdapter,t)),l.tags&&(l.dataAdapter=j.Decorate(l.dataAdapter,p)),(null!=l.tokenSeparators||null!=l.tokenizer)&&(l.dataAdapter=j.Decorate(l.dataAdapter,q)),null!=l.query){var C=b(l.amdBase+"compat/query");l.dataAdapter=j.Decorate(l.dataAdapter,C)}if(null!=l.initSelection){var D=b(l.amdBase+"compat/initSelection");l.dataAdapter=j.Decorate(l.dataAdapter,D)}}if(null==l.resultsAdapter&&(l.resultsAdapter=c,null!=l.ajax&&(l.resultsAdapter=j.Decorate(l.resultsAdapter,x)),null!=l.placeholder&&(l.resultsAdapter=j.Decorate(l.resultsAdapter,w)),l.selectOnClose&&(l.resultsAdapter=j.Decorate(l.resultsAdapter,A))),null==l.dropdownAdapter){if(l.multiple)l.dropdownAdapter=u;else{var E=j.Decorate(u,v);l.dropdownAdapter=E}if(0!==l.minimumResultsForSearch&&(l.dropdownAdapter=j.Decorate(l.dropdownAdapter,z)),l.closeOnSelect&&(l.dropdownAdapter=j.Decorate(l.dropdownAdapter,B)),null!=l.dropdownCssClass||null!=l.dropdownCss||null!=l.adaptDropdownCssClass){var F=b(l.amdBase+"compat/dropdownCss");l.dropdownAdapter=j.Decorate(l.dropdownAdapter,F)}l.dropdownAdapter=j.Decorate(l.dropdownAdapter,y)}if(null==l.selectionAdapter){if(l.multiple?l.selectionAdapter=e:l.selectionAdapter=d,null!=l.placeholder&&(l.selectionAdapter=j.Decorate(l.selectionAdapter,f)),l.allowClear&&(l.selectionAdapter=j.Decorate(l.selectionAdapter,g)),l.multiple&&(l.selectionAdapter=j.Decorate(l.selectionAdapter,h)),null!=l.containerCssClass||null!=l.containerCss||null!=l.adaptContainerCssClass){var G=b(l.amdBase+"compat/containerCss");l.selectionAdapter=j.Decorate(l.selectionAdapter,G)}l.selectionAdapter=j.Decorate(l.selectionAdapter,i)}if("string"==typeof l.language)if(l.language.indexOf("-")>0){var H=l.language.split("-"),I=H[0];l.language=[l.language,I]}else l.language=[l.language];if(a.isArray(l.language)){var J=new k;l.language.push("en");for(var K=l.language,L=0;L<K.length;L++){var M=K[L],N={};try{N=k.loadPath(M)}catch(O){try{M=this.defaults.amdLanguageBase+M,N=k.loadPath(M)}catch(P){l.debug&&window.console&&console.warn&&console.warn('Select2: The language file for "'+M+'" could not be automatically loaded. A fallback will be used instead.');continue}}J.extend(N)}l.translations=J}else{var Q=k.loadPath(this.defaults.amdLanguageBase+"en"),R=new k(l.language);R.extend(Q),l.translations=R}return l},D.prototype.reset=function(){function b(a){function b(a){return l[a]||a}return a.replace(/[^\u0000-\u007E]/g,b)}function c(d,e){if(""===a.trim(d.term))return e;if(e.children&&e.children.length>0){for(var f=a.extend(!0,{},e),g=e.children.length-1;g>=0;g--){var h=e.children[g],i=c(d,h);null==i&&f.children.splice(g,1)}return f.children.length>0?f:c(d,f)}var j=b(e.text).toUpperCase(),k=b(d.term).toUpperCase();return j.indexOf(k)>-1?e:null}this.defaults={amdBase:"./",amdLanguageBase:"./i18n/",closeOnSelect:!0,debug:!1,dropdownAutoWidth:!1,escapeMarkup:j.escapeMarkup,language:C,matcher:c,minimumInputLength:0,maximumInputLength:0,maximumSelectionLength:0,minimumResultsForSearch:0,selectOnClose:!1,sorter:function(a){return a},templateResult:function(a){return a.text},templateSelection:function(a){return a.text},theme:"default",width:"resolve"}},D.prototype.set=function(b,c){var d=a.camelCase(b),e={};e[d]=c;var f=j._convertData(e);a.extend(this.defaults,f)};var E=new D;return E}),b.define("select2/options",["require","jquery","./defaults","./utils"],function(a,b,c,d){function e(b,e){if(this.options=b,null!=e&&this.fromElement(e),this.options=c.apply(this.options),e&&e.is("input")){var f=a(this.get("amdBase")+"compat/inputData");this.options.dataAdapter=d.Decorate(this.options.dataAdapter,f)}}return e.prototype.fromElement=function(a){var c=["select2"];null==this.options.multiple&&(this.options.multiple=a.prop("multiple")),null==this.options.disabled&&(this.options.disabled=a.prop("disabled")),null==this.options.language&&(a.prop("lang")?this.options.language=a.prop("lang").toLowerCase():a.closest("[lang]").prop("lang")&&(this.options.language=a.closest("[lang]").prop("lang"))),null==this.options.dir&&(a.prop("dir")?this.options.dir=a.prop("dir"):a.closest("[dir]").prop("dir")?this.options.dir=a.closest("[dir]").prop("dir"):this.options.dir="ltr"),a.prop("disabled",this.options.disabled),a.prop("multiple",this.options.multiple),a.data("select2Tags")&&(this.options.debug&&window.console&&console.warn&&console.warn('Select2: The `data-select2-tags` attribute has been changed to use the `data-data` and `data-tags="true"` attributes and will be removed in future versions of Select2.'),a.data("data",a.data("select2Tags")),a.data("tags",!0)),a.data("ajaxUrl")&&(this.options.debug&&window.console&&console.warn&&console.warn("Select2: The `data-ajax-url` attribute has been changed to `data-ajax--url` and support for the old attribute will be removed in future versions of Select2."),a.attr("ajax--url",a.data("ajaxUrl")),a.data("ajax--url",a.data("ajaxUrl")));var e={};e=b.fn.jquery&&"1."==b.fn.jquery.substr(0,2)&&a[0].dataset?b.extend(!0,{},a[0].dataset,a.data()):a.data();var f=b.extend(!0,{},e);f=d._convertData(f);for(var g in f)b.inArray(g,c)>-1||(b.isPlainObject(this.options[g])?b.extend(this.options[g],f[g]):this.options[g]=f[g]);return this},e.prototype.get=function(a){return this.options[a]},e.prototype.set=function(a,b){this.options[a]=b},e}),b.define("select2/core",["jquery","./options","./utils","./keys"],function(a,b,c,d){var e=function(a,c){null!=a.data("select2")&&a.data("select2").destroy(),this.$element=a,this.id=this._generateId(a),c=c||{},this.options=new b(c,a),e.__super__.constructor.call(this);var d=a.attr("tabindex")||0;a.data("old-tabindex",d),a.attr("tabindex","-1");var f=this.options.get("dataAdapter");this.dataAdapter=new f(a,this.options);var g=this.render();this._placeContainer(g);var h=this.options.get("selectionAdapter");this.selection=new h(a,this.options),this.$selection=this.selection.render(),this.selection.position(this.$selection,g);var i=this.options.get("dropdownAdapter");this.dropdown=new i(a,this.options),this.$dropdown=this.dropdown.render(),this.dropdown.position(this.$dropdown,g);var j=this.options.get("resultsAdapter");this.results=new j(a,this.options,this.dataAdapter),this.$results=this.results.render(),this.results.position(this.$results,this.$dropdown);var k=this;this._bindAdapters(),this._registerDomEvents(),this._registerDataEvents(),this._registerSelectionEvents(),this._registerDropdownEvents(),this._registerResultsEvents(),this._registerEvents(),this.dataAdapter.current(function(a){k.trigger("selection:update",{data:a})}),a.addClass("select2-hidden-accessible"),a.attr("aria-hidden","true"),this._syncAttributes(),a.data("select2",this)};return c.Extend(e,c.Observable),e.prototype._generateId=function(a){var b="";return b=null!=a.attr("id")?a.attr("id"):null!=a.attr("name")?a.attr("name")+"-"+c.generateChars(2):c.generateChars(4),b="select2-"+b},e.prototype._placeContainer=function(a){a.insertAfter(this.$element);var b=this._resolveWidth(this.$element,this.options.get("width"));null!=b&&a.css("width",b)},e.prototype._resolveWidth=function(a,b){var c=/^width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i;if("resolve"==b){var d=this._resolveWidth(a,"style");return null!=d?d:this._resolveWidth(a,"element")}if("element"==b){var e=a.outerWidth(!1);return 0>=e?"auto":e+"px"}if("style"==b){var f=a.attr("style");if("string"!=typeof f)return null;for(var g=f.split(";"),h=0,i=g.length;i>h;h+=1){var j=g[h].replace(/\s/g,""),k=j.match(c);if(null!==k&&k.length>=1)return k[1]}return null}return b},e.prototype._bindAdapters=function(){this.dataAdapter.bind(this,this.$container),this.selection.bind(this,this.$container),this.dropdown.bind(this,this.$container),this.results.bind(this,this.$container)},e.prototype._registerDomEvents=function(){var b=this;this.$element.on("change.select2",function(){b.dataAdapter.current(function(a){b.trigger("selection:update",{data:a})})}),this._sync=c.bind(this._syncAttributes,this),this.$element[0].attachEvent&&this.$element[0].attachEvent("onpropertychange",this._sync);var d=window.MutationObserver||window.WebKitMutationObserver||window.MozMutationObserver;null!=d?(this._observer=new d(function(c){a.each(c,b._sync)}),this._observer.observe(this.$element[0],{attributes:!0,subtree:!1})):this.$element[0].addEventListener&&this.$element[0].addEventListener("DOMAttrModified",b._sync,!1)},e.prototype._registerDataEvents=function(){var a=this;this.dataAdapter.on("*",function(b,c){a.trigger(b,c)})},e.prototype._registerSelectionEvents=function(){var b=this,c=["toggle","focus"];this.selection.on("toggle",function(){b.toggleDropdown()}),this.selection.on("focus",function(a){b.focus(a)}),this.selection.on("*",function(d,e){-1===a.inArray(d,c)&&b.trigger(d,e)})},e.prototype._registerDropdownEvents=function(){var a=this;this.dropdown.on("*",function(b,c){a.trigger(b,c)})},e.prototype._registerResultsEvents=function(){var a=this;this.results.on("*",function(b,c){a.trigger(b,c)})},e.prototype._registerEvents=function(){var a=this;this.on("open",function(){a.$container.addClass("select2-container--open")}),this.on("close",function(){a.$container.removeClass("select2-container--open")}),this.on("enable",function(){a.$container.removeClass("select2-container--disabled")}),this.on("disable",function(){a.$container.addClass("select2-container--disabled")}),this.on("blur",function(){a.$container.removeClass("select2-container--focus")}),this.on("query",function(b){a.isOpen()||a.trigger("open",{}),this.dataAdapter.query(b,function(c){a.trigger("results:all",{data:c,query:b})})}),this.on("query:append",function(b){this.dataAdapter.query(b,function(c){a.trigger("results:append",{data:c,query:b})})}),this.on("keypress",function(b){var c=b.which;a.isOpen()?c===d.ESC||c===d.TAB||c===d.UP&&b.altKey?(a.close(),b.preventDefault()):c===d.ENTER?(a.trigger("results:select",{}),b.preventDefault()):c===d.SPACE&&b.ctrlKey?(a.trigger("results:toggle",{}),b.preventDefault()):c===d.UP?(a.trigger("results:previous",{}),b.preventDefault()):c===d.DOWN&&(a.trigger("results:next",{}),b.preventDefault()):(c===d.ENTER||c===d.SPACE||c===d.DOWN&&b.altKey)&&(a.open(),b.preventDefault())})},e.prototype._syncAttributes=function(){this.options.set("disabled",this.$element.prop("disabled")),this.options.get("disabled")?(this.isOpen()&&this.close(),this.trigger("disable",{})):this.trigger("enable",{})},e.prototype.trigger=function(a,b){var c=e.__super__.trigger,d={open:"opening",close:"closing",select:"selecting",unselect:"unselecting"};if(void 0===b&&(b={}),a in d){var f=d[a],g={prevented:!1,name:a,args:b};if(c.call(this,f,g),g.prevented)return void(b.prevented=!0)}c.call(this,a,b)},e.prototype.toggleDropdown=function(){this.options.get("disabled")||(this.isOpen()?this.close():this.open())},e.prototype.open=function(){this.isOpen()||this.trigger("query",{})},e.prototype.close=function(){this.isOpen()&&this.trigger("close",{})},e.prototype.isOpen=function(){return this.$container.hasClass("select2-container--open")},e.prototype.hasFocus=function(){return this.$container.hasClass("select2-container--focus")},e.prototype.focus=function(a){this.hasFocus()||(this.$container.addClass("select2-container--focus"),this.trigger("focus",{}))},e.prototype.enable=function(a){this.options.get("debug")&&window.console&&console.warn&&console.warn('Select2: The `select2("enable")` method has been deprecated and will be removed in later Select2 versions. Use $element.prop("disabled") instead.'),(null==a||0===a.length)&&(a=[!0]);var b=!a[0];this.$element.prop("disabled",b)},e.prototype.data=function(){this.options.get("debug")&&arguments.length>0&&window.console&&console.warn&&console.warn('Select2: Data can no longer be set using `select2("data")`. You should consider setting the value instead using `$element.val()`.');var a=[];return this.dataAdapter.current(function(b){a=b}),a},e.prototype.val=function(b){if(this.options.get("debug")&&window.console&&console.warn&&console.warn('Select2: The `select2("val")` method has been deprecated and will be removed in later Select2 versions. Use $element.val() instead.'),null==b||0===b.length)return this.$element.val();var c=b[0];a.isArray(c)&&(c=a.map(c,function(a){return a.toString()})),this.$element.val(c).trigger("change")},e.prototype.destroy=function(){this.$container.remove(),this.$element[0].detachEvent&&this.$element[0].detachEvent("onpropertychange",this._sync),null!=this._observer?(this._observer.disconnect(),this._observer=null):this.$element[0].removeEventListener&&this.$element[0].removeEventListener("DOMAttrModified",this._sync,!1),this._sync=null,this.$element.off(".select2"),this.$element.attr("tabindex",this.$element.data("old-tabindex")),this.$element.removeClass("select2-hidden-accessible"),this.$element.attr("aria-hidden","false"),this.$element.removeData("select2"),this.dataAdapter.destroy(),this.selection.destroy(),this.dropdown.destroy(),this.results.destroy(),this.dataAdapter=null,this.selection=null,this.dropdown=null,this.results=null},e.prototype.render=function(){var b=a('<span class="select2 select2-container"><span class="selection"></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>');return b.attr("dir",this.options.get("dir")),this.$container=b,this.$container.addClass("select2-container--"+this.options.get("theme")),b.data("element",this.$element),b},e}),b.define("jquery-mousewheel",["jquery"],function(a){return a}),b.define("jquery.select2",["jquery","jquery-mousewheel","./select2/core","./select2/defaults"],function(a,b,c,d){if(null==a.fn.select2){var e=["open","close","destroy"];a.fn.select2=function(b){if(b=b||{},"object"==typeof b)return this.each(function(){var d=a.extend(!0,{},b);new c(a(this),d)}),this;if("string"==typeof b){var d;return this.each(function(){var c=a(this).data("select2");null==c&&window.console&&console.error&&console.error("The select2('"+b+"') method was called on an element that is not using Select2.");var e=Array.prototype.slice.call(arguments,1);d=c[b].apply(c,e)}),a.inArray(b,e)>-1?this:d}throw new Error("Invalid arguments for Select2: "+b)}}return null==a.fn.select2.defaults&&(a.fn.select2.defaults=d),c}),{define:b.define,require:b.require}}(),c=b.require("jquery.select2");return a.fn.select2.amd=b,c});var api = api || wp.customize, $ = $ || jQuery;
(function (api, $, _) {
  /*****************************************************************************
  * CAPTURE PREVIEW INFORMATIONS ON REFRESH + REACT TO THEM
  *****************************************************************************/
  /* WP CONDITIONAL TAGS => stores and observes the WP conditional tags sent by the preview */
  api.czr_wp_conditionals = new api.Value();

  /* SCOPE COLLECTION => stores and observes the collection sent by the preview */
  api.czr_scopeCollection = new api.Values();
  api.czr_scopeCollection.create('collection');//all available scope, including the current scope
  api.czr_scopeCollection.create('active');//the currently active scope

  /* SCOPES */
  // Create the collection
  api.czr_scope = new api.Values();

  /* SIDEBAR INSIGHTS => stores and observes the sidebars and widgets settings sent by the preview */
  api.sidebar_insights = new api.Values();
  api.sidebar_insights.create('candidates');//will store the sidebar candidates on preview refresh
  api.sidebar_insights.create('actives');//will record the refreshed active list of active sidebars sent from the preview
  api.sidebar_insights.create('inactives');
  api.sidebar_insights.create('registered');
  api.sidebar_insights.create('available_locations');

  //PARTIAL REFRESHS => stores and observes the partials sent by the preview
  api.czr_partials = new api.Value();

})( wp.customize , jQuery, _);(function (api, $, _) {
  //WHAT IS A SCOPE ?
  //A scope is an object describing a set of options for a given customization scope
  //It is constructed by the czr_scopeModel constructor
  //it has a model with the following properties
  // - a name : 'global', 'all_posts'
  // - a corresponding database option name
  // - a database option type (dyn_type)
  // - a customization status : active, inactive. Are we currently customizing this scope ?
  // - a priority status that can be forced
  // - an applied status => is this scope the one that will be applied on front end in the current context?
  //  => this status depends on :
  //      1) a default priority local (post id ) > global specific (all posts) > global (default options)
  //      2) a user decision : a priority can be forced. For example who is the winner when two categories have been customized ?
  // - a dirtyness status : has this scope been customized ?
  // - a set of values, each one having a dirtyness state => the  : { optname#2 : { value : ..., _dirty : bool }, optname#2 : {...}, ...  }
  //
  // It is rendered with a view which includes DOM listeners.
  // Users can :
  //  - customize each scope separately,
  //  - force a priority
  //  - reset a scope set of option
  //  - copy the values of one scope to another
  //
  //  What is the default scope ?
  //  - 'global' when accessing the customizer from appearance > customize
  //  - 'local' when customizing from the front end, or an edit screen : post (post, cpt, page, attachment), tax term, user
  //
  //  What are the options eligibile for the scope customization ?
  //  - the scope customization can be applied to all theme settings 'hu_theme_options'. The option not eligible have been flagged 'no-scope' when registered server side.
  //  - the WP built-in settings like blogname, site-icon,... are also eligible
  //  - all other settings like menu, widgets, sidebars are excluded for the moment.
  //
  //  On init, the default scope is set as active.
  //  if the default scope is not 'global', then the switch to the relevant scope is triggered and the eligible settings values are updated "silently"
  //  the dirties are stored in each scope models when the user customize
  //
  //
  //  On scope switch,
  //  1) the values of the dirty values of the current scope are stored in the model
  //  2) the values of the new scope are fetched from the db if they have not been yet.
  //  3) all eligible settings are updated with the new values.
  //  4) if the new scope has no dirty value yet, the saved state is reset.
  //
  //
  //
  //
  //
  // WHAT IS THE SCOPE PRIORITY CONCEPT ?
  // Since a given option can be customized at different scope levels, a priority must be defined.
  //
  // The scope priority defines which option value will be used if this option has been customized in several scopes.
  //
  // There are 3 main levels of scopes :
  // 1) GLOBAL : the options applied to the entire website. Those are saved in the regular (the old) theme options
  // 2) SPECIAL GROUP : those groups are dynamically set, depending on how a user creates a post or a page
  //      all posts from a specific author,
  //      all posts tagged with a specific tag,
  //      all posts tagged with a specific category,
  //      all pages using a specific template
  // 3) GROUP : the options applied to a group of contexts. Those are saved as long life transients
  //      all pages,
  //      all posts,
  //      all tags,
  //      all categories,
  //      all authors,
  // 4) LOCAL : the options applied to a specific context :
  //      a page,
  //      a post (or a CPT),
  //      an attachment,
  //      a tag archive page,
  //      a category archive page,
  //      an author archive page,
  //      the home page,
  //      the 404 page,
  //      the search results page,
  // Note: except for home, 404 and search which are saved as transients, the other local scopes are saved as metas : post metas, term metas, user metas
  //
  // Priorities without the special group (tag, cat, author):
  //    - For a post, page or term : LOCAL (this post id) > GROUP (all posts)  > GLOBAL (entire website options)
  //    - For home, 404, search : LOCAL > GLOBAL. There's no GROUP in this case.
  //    - for a term archive (tag, cat, custom tax) : LOCAL (the term id) > GROUP ( all terms of this type ) > GLOBAL
  //
  // Priorities with the special groups : this is relevant for post and pages only.
  // Let's take a post example.
  // A user can decide to define a set of option (a scope) for all posts tagged with a specific tag.
  // In this case the priority is : LOCAL > SPECIAL GROUP (the "post tagged with {tag}") > GROUP > GLOBAL
  // CONFLICT CASE : If a given post has several terms, and if more than one term have a customized scope.
  //  => since no priority can be defined between two terms, the priority is back to the default : LOCAL > GROUP > GLOBAL
  // How to fix a conflict case ?
  // It is possible to force a "winner" within the special groups. When editing a scope, the user can check an option (! => force this scope when relevant )
  // => if there's a forced winner the priority becomes : LOCAL > FORCED SPECIAL GROUP > GROUP > GLOBAL
  // In the customizer, only one special group winner can be set at a time.
  // If different winners have been set in separate customization sessions, and that the user add several winners term in the post edit screen, it might happen that
  // a the customizer ends up to have several special group winners. In this case, a conflict notice is displayed in the scope dialog box, explaining how to resolve this
  // winner conflict. As long as the winner conflict is unresolved, the priority falls back to : LOCAL > GROUP > GLOBAL.
  //
  //
  //
  //
  //
  //
  // WHAT IS THE SCOPE INHERITANCE CONCEPT ?
  // In the customizer, all scopes are partially customized => For example, a page can only have specific layout options set
  // The question to adress is then : What about all the un-customized options of this scope? Which value should be applied ?
  //
  // The scope inheritance is the complement of the scope priority.
  // It addresses the problem of which values should be used for un-customized options in a given scope.
  //
  // Taking the same page example, if the "skin" option has not been set locally, then it checks the lower scope priority level.
  // In this case, the previous level is "All Pages".
  // If nothing has been set in the "All Pages", we'll go to the previous one : "Global."
  //
  // In the customizer, this scope inheritance has to be reflected so that user can immediately understand which option is applied to which scope.
  // For a given scope, all un-customized settings will inherit their value from the lower priority levels, down to GLOBAL.
  //
  //
  //
  // HOW DOES THIS WORK ?
  // CZR_scopeBase listens to scope collection changes
  // 1) instantiate new models (CZR_scopeModel), remove old ones and their view
  // 2) sets each scope models active scope state changes


  // CZR_scopeModel
  // 1) instantiate, the scope view (CZR_scopeView)
  // 2) listens to the active state
  //   => store dirtyness on switch
  //   => fetch the db values, build the full set of values ( db + dirties + default) and update the settings

  // CZR_scopeView
  // 1) renders the view
  // 2) listens to model active state
  //   => change the view display elements
  // 3) listen to DOM interactions and set scope values : state, priority

  // @todo in the view, return the $() element to store the view.container





  /*****************************************************************************
  * THE SCOPE BASE OBJECT
  *****************************************************************************/
  api.bind( 'ready' , function() {
    if ( serverControlParams.isCtxEnabled ) {
      api.czr_scopeBase = new api.CZR_scopeBase();
    }
  } );

  api.CZR_scopeBase = api.Class.extend( {
    globalSettingVal : {},//will store the global setting val. Populated on init.

    initialize: function() {
          var self = this;

          //Embed the scopes wrapper if needed
          if ( ! $('#customize-header-actions').find('.czr-scope-switcher').length ) {
            $('#customize-header-actions').append( $('<div/>', {class:'czr-scope-switcher'}) );
          }

          //store the initial state of the global option
          this.initialGlobalSettingVal = this.getGlobalSettingVal();

          //SCOPE COLLECTION LISTENER
          //The scope collection is set on 'czr-scopes-ready' triggered by the preview
          //setup the callbacks of the scope collection update
          //on init and on preview change : the collection of scopes is populated with new scopes
          //=> instanciate the relevant scope object + render them
          api.czr_scopeCollection('collection').callbacks.add( function() { return self.initScopeModels.apply(self, arguments ); } );

          //REACT TO ACTIVE SCOPE UPDATE
          api.czr_scopeCollection('active').callbacks.add( function() { return self.setScopeStates.apply(self, arguments ); } );
    },



    //setup the czr_scopeCollection('collection') callbacks
    //fired in initialize
    initScopeModels : function(to, from) {
          console.log('SCOPES SENT BY THE PREVIEW, FROM AND TO : ', from, to);
          var self = this,
              _new_collection = _.clone(to) || {},
              _old_collection = _.clone(from) || {};

          //destroy the previous scopes views and models
          //Instantiate the scopes collection
          _.map( _old_collection, function( data , name ) {
            //remove the view DOM el
            api.czr_scope(name).view.container.remove();
            //remove the model from the collection
            api.czr_scope.remove(name);
          });


          //Instantiate the scopes collection
          _.map( _new_collection, function( data , name ) {
            var params = _.clone(data);//IMPORTANT => otherwise the data object is actually a copy and share the same reference as the model and view params
            api.czr_scope.add( name, new api.CZR_scopeModel( name, $.extend( params, {name : name} ) ) );
            //fire this right after instantiation for the views (we need the model instances in the views)
            api.czr_scope(name).ready();
          });

          //set the defaut scope as active as global
          api.czr_scopeCollection('active').set( self.getActiveScopeOnInit(_new_collection) );

          //LISTEN TO API SETTING CHANGES => POPULATE THE DIRTYNESS OF THE ACTIVE SCOPE
          this.addAPISettingsListener();
    },//listenToScopeCollection()


    //fired in initialize
    setScopeStates : function(to, from) {
          var self = this;
          //set the to and from scope state on init and switch
          if ( ! _.isUndefined(from) && api.czr_scope.has(from) )
            api.czr_scope(from).active.set(false);
          else if ( ! _.isUndefined(from) )
            throw new Error('listenToActiveScope : previous scope does not exist in the collection');

          if ( ! _.isUndefined(to) && api.czr_scope.has(to) )
            api.czr_scope(to).active.set(true);
          else
            throw new Error('listenToActiveScope : requested scope ' + to + ' does not exist in the collection');
    },





    /*****************************************************************************
    * WORDPRESS API ACTIONS ON INIT
    *****************************************************************************/
    getGlobalSettingVal : function() {
          var self = this, _vals = {};
          //parse the current eligible scope settings and write an setting val object
          api.each( function ( value, key ) {
            //only the current theme options are eligible
            if ( ! self.isSettingEligible(key) )
              return;
            var _k = self._extractOptName(key);
            _vals[_k] = { value : value(), dirty : value._dirty };
          });
          return _vals;
    },


    addAPISettingsListener : function() {
          var self = this;
          console.log('BEFORE SETTING UP DIRTY VALUE LISTENER');
          //parse the current eligible scope settings and write an setting val object
          api.each( function ( value, key ) {

                //only the current theme options + some WP built in settings are eligible
                if ( ! self.isSettingEligible(key) )
                  return;

                api(key).callbacks.add( function(to, from) {
                      var current_scope = api.czr_scope( api.czr_scopeCollection('active').get() );//the active scope instance

                      if ( _.isUndefined(current_scope) ) {
                        throw new Error('Scope base class : the active scope is not defined.');
                      }

                      var current_dirties = _.clone( current_scope.dirtyValues.get() ),
                          _dirtyCustomized = {},
                          _k = self._extractOptName(key);

                      _dirtyCustomized[ _k ] = { value : to, dirty : true };
                      current_scope.dirtyValues.set( $.extend( current_dirties , _dirtyCustomized ) );
                });

          });
    },




    /*****************************************************************************
    * HELPERS
    *****************************************************************************/
    //@return the
    getActiveScopeOnInit : function(collection) {
          _def = _.findWhere(collection, {is_default : true }).name;
          return ! _.isUndefined(_def) ? _def : 'global';
    },

    isSettingEligible : function( setId ) {
      return -1 != setId.indexOf(serverControlParams.themeOptions) || _.contains( serverControlParams.wpBuiltinSettings, setId );
    },

    _extractOptName : function( setId ) {
      return setId.replace(serverControlParams.themeOptions, '').replace(/\[|\]/gi, '' );
    }

  });//api.Class.extend()


})( wp.customize , jQuery, _);(function (api, $, _) {
  /*****************************************************************************
  * THE SCOPE MODEL
  *****************************************************************************/
  // 'level'         => '_all_',
  // 'dyn_type'    => 'option',
  // 'opt_name'    => HU_THEME_OPTIONS,
  // 'is_default'  => true,
  // 'is_winner'   => false
  api.CZR_scopeModel = api.Class.extend( {
    initialize: function( name, options ) {
          var scope = this;
          scope.options = options;
          //write the options as properties, name is included
          $.extend( scope, options || {} );

          //Make it alive with various Values
          scope.winner      = new api.Value(); //is this scope the one that will be applied on front end in the current context?
          scope.priority    = new api.Value(); //shall this scope always win or respect the default scopes priority
          scope.active      = new api.Value(); //active, inactive. Are we currently customizing this scope ?
          scope.dirtyness   = new api.Value(); //true or false : has this scope been customized ?

          //setting values are stored in :
          scope.dbValues    = new api.Value();
          scope.dirtyValues = new api.Value();//stores the current customized value.
    },


    //this scope model is instantiated at this point.
    ready : function() {
          var scope = this;
          //INSTANTIATE THE SCOPE VIEW : EMBED AND SET DOM ALIVE
          scope.view = new api.CZR_scopeView( name, scope.options );

          //LISTEN TO ACTIVE
          scope.active.callbacks.add(function() { return scope.activeStateModelCallbacks.apply(scope, arguments ); } );

          //LISTEN TO DIRTYNESS
          scope.dirtyValues.callbacks.add( function(to){
            //set the model dirtyness boolean state value
            scope.dirtyness.set( ! _.isEmpty(to) );
          });

          //init the values
          scope.dirtyValues.set({});
          scope.dbValues.set( _.isEmpty(scope.db) ? {} : scope.db );
          scope.active.set( scope.is_default );
          scope.dirtyness.set( false );
          scope.winner.set( scope.is_winner );
    },


    /*****************************************************************************
    * VALUES CALLBACKS
    *****************************************************************************/
    activeStateModelCallbacks : function(to){
          var scope = this;

          //when becoming inactive
          //store the dirtyValues
          // if ( ! to ) {
          //   scope.storeDirtyness();
          //   return;
          // }

          //When becoming active :
            //1) fetch the option if needed
            //2) update the setting values

          //What are the setting values ?
          //when switching to a new scope, we need to re-build a complete set of values from :
            //1) values saved in the database (only some)
            //2) values already made dirty in the customizer(only some)
            //3) default values(all)

          //=> fetch the values from the db. on done(), build the full set and update all eligible settings values
          //How to build the full set ?
            //If not global, local for ex. :
            //1) check if scope.dbValues() is _dirty (has not been set yet), and if so, attempt to fetch the values from the db and populate it
            //2) then check the dirtyness state of this scope. If it's dirty (has been customized), then incomplete_set = $.extend( dbValues, dirtyValues );
            //3) then $.extend( initialglobalvalues, incomplete_set ) to get the full set of option.
            //IMPORTANT : if dbValues have to be fetched, always wait for the done() ajax, because asynchronous.

            //if the current scope is 'global'
            //=> build the full set with $.extend( initialglobalvalues, dirtyValues )


    },


    storeDirtyness : function() {
          var scope = this;
          scope.dirtyValues.set( scope.getDirties() );
    },


    getDirties : function() {
          var scope = this,
              _dirtyCustomized = {};
          //populate with the current scope settings dirtyValues
          api.each( function ( value, key ) {
            if ( value._dirty ) {
              var _k = key.replace(serverControlParams.themeOptions, '').replace(/[|]/gi, '' );
              _dirtyCustomized[ _k ] = { value : value(), dirty : value._dirty };
            }
          } );
          return _dirtyCustomized;
    },



    setSettingsValue : function() {
          //TEST UPDATE DYNAMIC STYLE CHECKBOX ON SWITCH
          if ( 'trans' == to.dyn_type ) {
            api('hu_theme_options[dynamic-styles]').set(true);
            //api('hu_theme_options[dynamic-styles]').set(23);
            $('input[type=checkbox]', api.control('hu_theme_options[dynamic-styles]').container ).iCheck('update');
          }

          //TEST UPDATE FONT SELECT ON SWITCH
          if ( 'trans' == to.dyn_type ) {
            api('hu_theme_options[font]').set('raleway');
            //api('hu_theme_options[dynamic-styles]').set(23);
            $('select[data-customize-setting-link]', api.control('hu_theme_options[font]').container ).selecter('destroy').selecter();
          }

          var _img_id = 'trans' == to.dyn_type ? 23 : 25;
          //TEST UPDATE LOGO ON SWITCH
          api.control('hu_theme_options[custom-logo]').container.remove();

          api.control.remove('hu_theme_options[custom-logo]');

          var _constructor = api.controlConstructor['czr_cropped_image'];
          var _data = api.settings.controls['hu_theme_options[custom-logo]'];
          api('hu_theme_options[custom-logo]').set(_img_id);

          //add the control when the new image has been fetched asynchronously.
          wp.media.attachment( _img_id ).fetch().done( function() {
            _data.attachment = this.attributes;
            api.control.add(
            'hu_theme_options[custom-logo]',
              new _constructor('hu_theme_options[custom-logo]', { params : _data, previewer :api.previewer })
            );
          } );

    },





    /////////////////////////
    //AJAX STUFFS
    ////////////////////////
    //if the current scope is global, then get it from the settings
          // if ( serverControlParams.themeOptions == scope.opt_name ) {
          //   return api.czr_scopeBase.getGlobalSettingVal();
          // }

          // //@uses wp.ajax. See wp.ajax.send() in `wp-includes/js/wp-util.js`.
          // var _options = '',
          //     _query = {
          //       data : {
          //         action : serverControlParams.optionAjaxAction,//theme dependant
          //         opt_name: scope.opt_name,
          //         dyn_type: scope.dyn_type,
          //         stylesheet : api.settings.theme.stylesheet
          //       }
          //     };

          // console.log('before ajax send request : ', scope.name, scope, to , serverControlParams.themeOptions, scope.opt_name );

          // wp.ajax.send( _query ).done( function( resp ){
          //   _options = resp;
          //   console.log('AJAX RESPONSE IN DONE() : ', resp);
          // });
    getDBOptions : function( opt_name, dyn_type ) {
          //if the requested opt set is global, then get it from the settings
          if ( serverControlParams.themeOptions == opt_name ) {
            return api.czr_scopeBase.getGlobalSettingVal();
          }

          //@uses wp.ajax. See wp.ajax.send() in `wp-includes/js/wp-util.js`.
          var _options = '',
              _query = {
                data : {
                  action : serverControlParams.optionAjaxAction,//theme dependant
                  opt_name: opt_name,
                  dyn_type: dyn_type,
                  stylesheet : api.settings.theme.stylesheet
                }
              };

          wp.ajax.send( _query ).done( function( resp ){
            _options = resp;
          });
          return _options;
    },
  });//api.Class.extend()


})( wp.customize , jQuery, _);(function (api, $, _) {
  /*****************************************************************************
  * THE SCOPE VIEW
  *****************************************************************************/
  //instantiated on scope model ready
  api.CZR_scopeView = api.Class.extend( {
    initialize: function( name, options ) {
          var view = this;
          //write the options as properties, name is included
          $.extend( view, options || {} );
          view.params = options;

          view.el = 'czr-scope-' + view.name;//@todo replace with a css selector based on the scope name

          //EMBED IN THE DOM AND STORES THE $
          view.container = view.embedScopeDialogBox();

          //LISTEN TO DOM EVENTS
          view.listenToScopeSwitch();

          //LISTEN TO MODEL EVENTS
          //How does the view react to model changes ?
          //When active :
          //1) add a green point to the view box
          //2) disable the switch-to icon
          api.czr_scope(view.name).active.callbacks.add(function() { return view.activeStateViewCallbacks.apply(view, arguments ); } );
          api.czr_scope(view.name).dirtyness.callbacks.add(function() { return view.dirtynessViewCallbacks.apply(view, arguments ); } );
          api.czr_scope(view.name).dbValues.callbacks.add(function() { return view.dbValuesViewCallbacks.apply(view, arguments ); } );
          api.czr_scope(view.name).winner.callbacks.add(function() { return view.winnerViewCallbacks.apply(view, arguments ); } );
    },

    activeStateViewCallbacks : function(to, from){
      var view = this;
      view.container.toggleClass('active', to);
      //console.log('in the view : listen for scope state change', this.name, to, from );
      $('.czr-scope-switch',view.container).toggleClass('fa-toggle-on', to).toggleClass('fa-toggle-off', !to);
    },

    dirtynessViewCallbacks : function(to, from) {
      var view = this;
      this.container.toggleClass('dirty', to);
    },

    dbValuesViewCallbacks : function(to, from) {
      this.container.toggleClass('has_db_val', ! _.isEmpty(to) );
    },

    winnerViewCallbacks : function(to, from) {
      this.container.toggleClass('is_winner', ! _.isEmpty(to) );
    },


    /*****************************************************************************
    * DOM : RENDERING AND EVENT LISTENERS
    *****************************************************************************/
    embedScopeDialogBox : function() {
          var view = this;
          //@todo will need to be refreshed on scopes change in the future
          if ( ! $('#customize-header-actions').find('.czr-scope-switcher').length ) {
            throw new Error('The scope switcher wrapper is not printed, the scope view can not be embedded.');
          }
          var $view = $( wp.template('customize-scope')( _.extend(view.params, {el : view.el}) ) );
          $('.czr-scope-switcher', '#customize-header-actions').append($view);
          return $view;
    },

    listenToScopeSwitch : function() {
          var view = this;
          $('.czr-scope-switch', view.container ).on('click keydown', function( e, event_params ) {
              //particular treatment
              if ( api.utils.isKeydownButNotEnterEvent( e ) ) {
                return;
              }
              e.preventDefault(); // Keep this AFTER the key filter above)

              var _new_scope = $(this).closest('.czr-scope').attr('data-scope-id');
              if ( api.czr_scope.has( _new_scope ) ) {
                api.czr_scopeCollection('active').set( _new_scope );
              }
              // var _dyn_type   = $( e.currentTarget).attr('data-dyn-type'),
              //     _new_scope  = _.findWhere( api.czr_scopeCollection('collection').get() , { dyn_type : _dyn_type });

              //api.czr_scopeCollection('active').set( _new_scope );

          });//.on()
    },

    setScopeSwitcherButtonActive : function( dyn_type ) {
          $('.button', '.czr-scope-switcher').each( function( ind ) {
            $(this).toggleClass( 'active', dyn_type == $(this).attr('data-dyn-type') );
          });
    },

    /*****************************************************************************
    * HELPERS
    *****************************************************************************/
    getEl : function() {
          var view = this;
          return $( view.el, '#customize-header-actions');
    }
  });//api.Class.extend()


})( wp.customize , jQuery, _);(function (api, $, _) {
  /*****************************************************************************
  * CAPTURE PREVIEW INFORMATIONS ON REFRESH + REACT TO THEM
  *****************************************************************************/
  //backup the original intialize
  var _old_initialize = api.PreviewFrame.prototype.initialize;

  //Amend the PreviewFrame prototype so that we can captures some values on preview refresh
  //@todo there must be a simpler way...
  //=> using api.previewer.deferred.active.done() works on the first load but not after. The instance is not the same ?
  api.PreviewFrame.prototype.initialize = function( params, options ) {
        _old_initialize.call( this, params, options );

        //observe widget settings changes
        this.bind('houston-widget-settings', function(data) {
            //get the difference
            var _candidates = _.filter( data.registeredSidebars, function( sb ) {
              return ! _.findWhere( _wpCustomizeWidgetsSettings.registeredSidebars, { id: sb.id } );
            });

            var _inactives = _.filter( data.registeredSidebars, function( sb ) {
              return ! _.has( data.renderedSidebars, sb.id );
            });

            _inactives = _.map( _inactives, function(obj) {
              return obj.id;
            });

            var _registered = _.map( data.registeredSidebars, function(obj) {
              return obj.id;
            });

            api.sidebar_insights('actives').set( data.renderedSidebars );
            api.sidebar_insights('inactives').set( _inactives );
            api.sidebar_insights('registered').set( _registered );
            api.sidebar_insights('candidates').set( _candidates );
            api.sidebar_insights('available_locations').set( data.availableWidgetLocations );//built server side
        });


        this.bind( 'czr-wp-conditional-ready', function(data ) {
          api.czr_wp_conditionals.set( data );
        });

        this.bind( 'czr-partial-refresh', function(data) {
          api.czr_partials.set(data);
        });

        this.bind( 'czr-scopes-ready', function(data) {
          api.czr_scopeCollection('collection').set( data );
        });
  };//api.PreviewFrame.prototype.initialize




  /*****************************************************************************
  * A SILENT SET METHOD
  *****************************************************************************/
  api.Setting.prototype.silent_set =function( to ) {
        var from = this._value;

        to = this._setter.apply( this, arguments );
        to = this.validate( to );

        // Bail if the sanitized value is null or unchanged.
        if ( null === to || _.isEqual( from, to ) ) {
          return this;
        }

        this._value = to;
        this._dirty = true;

        //this.callbacks.fireWith( this, [ to, from ] );

        return this;
  };




  /*****************************************************************************
  * A SCOPE AWARE PREVIEWER
  *****************************************************************************/
  //PREPARE THE SCOPE AWARE PREVIEWER
  if ( serverControlParams.isCtxEnabled ) {
    api.czr_isPreviewerScopeAware = new api.Value();
    api.czr_isPreviewerScopeAware.set(false);
    var _old_preview = api.Setting.prototype.preview;
    api.Setting.prototype.preview = function() {
      if ( ! api.czr_isPreviewerScopeAware.get() )
        return this.previewer.refresh();
      //as soon as the previewer is setup, let's behave as usual
      _old_preview.call(this);
    };
  }


  api.bind('ready', function() {
        if ( ! serverControlParams.isCtxEnabled )
          return;

        /**
        * Build the query to send along with the Preview request.
        *
        * @return {object}
        */
        api.previewer.query =  function() {
          var dirtyCustomized = {};
          api.each( function ( value, key ) {
            if ( value._dirty ) {
              dirtyCustomized[ key ] = value();
            }
          } );

          //the previewer is now scope aware :
          api.czr_isPreviewerScopeAware.set(true);

          return {
            wp_customize: 'on',
            dyn_type:     api.czr_scope( api.czr_scopeCollection('active').get() ).dyn_type,//post_meta, term_meta, user_meta, trans, option
            opt_name:     api.czr_scope( api.czr_scopeCollection('active').get() ).opt_name,
            obj_id:       api.czr_scope( api.czr_scopeCollection('active').get() ).obj_id,
            theme:        _wpCustomizeSettings.theme.stylesheet,
            customized:   JSON.stringify( dirtyCustomized ),
            nonce:        this.nonce.preview
          };
        };



        //TO REMOVE : FOR TESTS ONLY
        api.previewer.save = function() {
          var self = this,
            processing = api.state( 'processing' ),
            submitWhenDoneProcessing,
            submit;

          $( document.body ).addClass( 'saving' );

          submit = function () {
            var request, query;
            query = $.extend( self.query(), {
              nonce:  self.nonce.save
            } );

            console.log('in submit : ', query);
            request = wp.ajax.post( 'customize_save', query );
            api.trigger( 'save', request );

            request.always( function () {
              $( document.body ).removeClass( 'saving' );
            } );

            request.fail( function ( response ) {
              console.log('ALORS FAIL ?', response );
              if ( '0' === response ) {
                response = 'not_logged_in';
              } else if ( '-1' === response ) {
                // Back-compat in case any other check_ajax_referer() call is dying
                response = 'invalid_nonce';
              }

              if ( 'invalid_nonce' === response ) {
                self.cheatin();
              } else if ( 'not_logged_in' === response ) {
                self.preview.iframe.hide();
                self.login().done( function() {
                  self.save();
                  self.preview.iframe.show();
                } );
              }
              api.trigger( 'error', response );
            } );

            request.done( function( response ) {
              console.log('ALORS DONE ?', response );
              // Clear setting dirty states
              api.each( function ( value ) {
                value._dirty = false;
              } );

              api.previewer.send( 'saved', response );

              api.trigger( 'saved', response );
            } );
          };

          if ( 0 === processing() ) {
            submit();
          } else {
            submitWhenDoneProcessing = function () {
              if ( 0 === processing() ) {
                api.state.unbind( 'change', submitWhenDoneProcessing );
                submit();
              }
            };
            api.state.bind( 'change', submitWhenDoneProcessing );
          }
        };
  });//api.bind('ready')

  //FIX FOR CONTROL VISIBILITY LOST ON PREVIEW REFRESH #1
  //This solves the problem of control visiblity settings being lost on preview refresh since WP 4.3
  //this overrides the wp method only for the control instances
  //it check if there's been a customizations
  //=> args.unchanged is true for all cases, for example when api.previewer.loading and the preview send 'ready'created during the frame synchronisation
  api.Control.prototype.onChangeActive = function ( active, args ) {
        if ( args.unchanged )
          return;
        if ( this.container[0] && ! $.contains( document, this.container[0] ) ) {
          // jQuery.fn.slideUp is not hiding an element if it is not in the DOM
          this.container.toggle( active );
          if ( args.completeCallback ) {
            args.completeCallback();
          }
        } else if ( active ) {
          this.container.slideDown( args.duration, args.completeCallback );
        } else {
          this.container.slideUp( args.duration, args.completeCallback );
        }
  };


   /* monkey patch for the content height set */
  //wp.customize.Section is not available before wp 4.1
  if ( 'function' == typeof api.Section ) {
    // backup the original function
    var _original_section_initialize = api.Section.prototype.initialize;
    api.Section.prototype.initialize = function( id, options ) {
          //call the original constructor
          _original_section_initialize.apply( this, [id, options] );
          var section = this;

          this.expanded.callbacks.add( function( _expanded ) {
            if ( ! _expanded )
              return;

          var container = section.container.closest( '.wp-full-overlay-sidebar-content' ),
                content = section.container.find( '.accordion-section-content' );
            //content resizing to the container height
            _resizeContentHeight = function() {
              content.css( 'height', container.innerHeight() );
          };
            _resizeContentHeight();
            //this is set to off in the original expand callback if 'expanded' is false
            $( window ).on( 'resize.customizer-section', _.debounce( _resizeContentHeight, 110 ) );
          });
        };
  }
  /* end monkey patch */

})( wp.customize , jQuery, _);(function (api, $, _) {
  /*****************************************************************************
  * ADD SOME HELPERS AND PROPERTIES TO THE ALWAYS ACCESSIBLE API OBJECT.
  *****************************************************************************/
  api.czr_getDocSearchLink = function( text ) {
    text = ! _.isString(text) ? '' : text;
    var _searchtext = text.replace( / /g, '+'),
        _url = [ serverControlParams.docURL, 'search?query=', _searchtext ].join('');
    return [
      '<a href="' + _url + '" title="' + serverControlParams.translatedStrings.readDocumentation + '" target="_blank">',
      ' ',
      '<span class="fa fa-question-circle-o"></span>'
    ].join('');
  };


  /*
  * @return string
  * simple helper to build the setting id name
  */
  api.czr_build_setId = function ( name ) {
    //exclude the WP built-in settings like blogdescription, show_on_front, etc
    if ( _.contains( serverControlParams.wpBuiltinSettings, name ) )
      return name;
    return -1 == name.indexOf( serverControlParams.themeOptions ) ? [ serverControlParams.themeOptions +'[' , name  , ']' ].join('') : name;
  };

  //@return bool
  //@uses api.czr_partials
  api.czr_has_part_refresh = function( setId ) {
    if ( ! _.has( api, 'czr_partials')  )
      return;
    return  _.contains( _.map( api.czr_partials.get(), function( partial, key ) {
      return _.contains( partial.settings, setId );
    }), true );
  };

  //react to a ctx change
  //api.czr_wp_conditionals.callbacks.add( function( e, o) {
    //console.log('the wp conditionals have been updated', e, o );
  //});

  // $( window ).on( 'message', function( e, o) {
  //   console.log('WHAT ARE WE LISTENING TO?', e, o );
  // });
})( wp.customize , jQuery, _);(function (api, $, _) {
    //////////////////////////////////////////////////
  /// ACTIONS AND DOM LISTENERS
  //////////////////////////////////////////////////
  //adds action to an existing event map
  //@event map = [ {event1}, {event2}, ... ]
  //@new_event = {  trigger   : event name , actions   : [ 'cb1', 'cb2', ... ] }
  api.CZR_Dom = {
        addActions : function( event_map, new_events, instance ) {
                var control = this;
                instance = instance || control;
                instance[event_map] = instance[event_map] || [];
                new_event_map = _.clone( instance[event_map] );
                instance[event_map] = _.union( new_event_map, ! _.isArray(new_events) ? [new_events] : new_events );
        },

        doActions : function( action, $dom_el, obj ) {
                $dom_el.trigger( action, obj );
        },


        //@obj = {model : model, dom_el : $_view_el, refreshed : _refreshed }
        setupDOMListeners : function( event_map , obj, instance ) {
                var control = this;
                instance = instance || control;
                //loop on the event map and map the relevant callbacks by event name
                _.map( event_map , function( _event ) {
                  //LISTEN TO THE DOM
                  obj.dom_el.on( _event.trigger , _event.selector, function( e, event_params ) {
                    //particular treatment
                    if ( api.utils.isKeydownButNotEnterEvent( e ) ) {
                      return;
                    }
                    e.preventDefault(); // Keep this AFTER the key filter above

                    //! use a new cloned object
                    var _obj = _.clone(obj);

                    //always get the latest model from the collection
                    if ( _.has(_obj, 'model') && _.has( _obj.model, 'id') ) {
                      if ( _.has(instance, 'get') )
                        _obj.model = instance.get();
                      else
                        _obj.model = instance.getModel( _obj.model.id );
                    }

                    //always add the event obj to the passed obj
                    //+ the dom event
                    $.extend( _obj, { event : _event, dom_event : e } );

                    //add the event param => useful for triggered event
                    $.extend( _obj, event_params );



                    //SETUP THE EMITTERS
                    //inform the container that something has happened
                    //pass the model and the current dom_el
                    control.executeEventActionChain( _obj, instance );
                  });//.on()

                });//_.map()
        },



        //GENERIC METHOD TO SETUP EVENT LISTENER
        //NOTE : the obj.event must alway be defined
        executeEventActionChain : function( obj, instance ) {
                var control = this;
                //the model is always passed as parameter
                if ( ! _.has( obj, 'event' ) || ! _.has( obj.event, 'actions' ) ) {
                  throw new Error('executeEventActionChain : No obj.event or no obj.event.actions properties found');
                }

                //if the actions param is a anonymous function, fire it and stop there
                if ( 'function' === typeof(obj.event.actions) )
                  return obj.event.actions(obj);

                //execute the various actions required
                //first normalizes the provided actions into an array of callback methods
                //then loop on the array and fire each cb if exists
                if ( ! _.isArray(obj.event.actions) )
                  obj.event.actions = [ obj.event.actions ];

                //if one of the callbacks returns false, then we break the loop
                //=> allows us to stop a chain of callbacks if a condition is not met
                var _break = false;
                _.map( obj.event.actions, function( _cb ) {

                  if ( _break )
                    return;

                  if ( 'function' != typeof( instance[_cb] ) ) {
                    throw new Error( 'executeEventActionChain : the action : ' + _cb + ' has not been found when firing event : ' + obj.event.selector );
                  }

                  //allow other actions to be bound before
                  //=> we don't want the event in the object here => we use the one in the event map if set
                  //=> otherwise will loop infinitely because triggering always the same cb from obj.event.actions[_cb]
                  //=> the dom element shall be get from the passed obj and fall back to the controler container.
                  var $_dom_el = ( _.has(obj, 'dom_el') && -1 != obj.dom_el.length ) ? obj.dom_el : control.container;

                  $_dom_el.trigger('before_' + _cb, _.omit( obj, 'event') );

                    //executes the _cb and stores the result in a local var
                    var _cb_return = instance[_cb](obj);
                    //shall we stop the action chain here ?
                    if ( false === _cb_return )
                      _break = true;

                  //allow other actions to be bound after
                  //=> we don't want the event in the object here => we use the one in the event map if set
                  $_dom_el.trigger('after_' + _cb, _.omit( obj, 'event') );

                });//_.map
        }
  };
})( wp.customize , jQuery, _);var CZRInputMethods = CZRInputMethods || {};

//extends api.Value
//an input is instanciated with the typical set of options :
//id : _id,
// type : $(this).attr('data-input-type'),
// value : $(this).find('[data-type]').val(),
// container : $(this),
// mono_model : monoModel (Value instance, has a parent control)
$.extend( CZRInputMethods , {
    initialize: function( name, options ) {
        if ( _.isUndefined(options.mono_model ) || _.isEmpty(options.mono_model) ) {
          throw new Error('No mono_model assigned to input ' + id + '. Aborting');
        }
        api.Value.prototype.initialize.call( this, null, options );
        var input = this;
        //input.options = options;
        //write the options as properties, name is included
        $.extend( input, options || {} );

        //initialize to the provided value
        input.set(options.input_value);

        //setup the appropriate input based on the type
        input.type_map = {
              text : '',
              check : 'setupIcheck',
              select : 'setupSelect',
              upload : 'setupImageUploader',
              color : 'setupColorPicker',
        };
        if ( _.has( input.type_map, input.type ) ) {
          var _meth = input.type_map[input.type];
          if ( _.isFunction(input[_meth]) )
            input[_meth]();
        }

        //Input Event Map
        input.input_event_map = [
          //set input value
          {
            trigger   : 'propertychange change click keyup input colorpickerchange',//colorpickerchange is a custom colorpicker event @see method setupColorPicker => otherwise we don't
            selector  : 'input[data-type], select[data-type]',
            name      : 'set_input_value',
            actions   : 'updateInput'
          }
        ];

        input.ready();
    },


    ready : function() {
        var input = this;
        input.setupDOMListeners( input.input_event_map , { dom_el : input.container }, input );

        //sets the input value to the one

        //callbacks
        input.callbacks.add(function( to, from) {
              var _current_mono_model = input.mono_model.get(),
                  _new_model        = _.clone( _current_mono_model );//initialize it to the current value
              //make sure the _new_model is an object and is not empty
              _new_model =  ( ! _.isObject(_new_model) || _.isEmpty(_new_model) ) ? {} : _new_model;
              //set the new val to the changed property
              _new_model[input.id] = to;
              input.mono_model.set(_new_model);
        });
    },


    updateInput : function( obj ) {
        //get the changed property and val
        //=> all html input have data-type attribute corresponding to the ones stored in the model
        var input           = this,
            $_changed_input   = $(obj.dom_event.currentTarget, obj.dom_el ),
            _new_val          = $( $_changed_input, obj.dom_el ).val();

        input.set(_new_val);

        //say it to the dom
        input.doActions(
            input.id + ':changed',
            input.container,
            {}
        );
    }
});//$.extendvar CZRInputMethods = CZRInputMethods || {};
$.extend( CZRInputMethods , {
    setupImageUploader : function() {
         var input  = this;

         //do we have an html template and a input container?
         if ( ! input.container )
           return this;

         if ( ! input.renderImageUploaderTemplate() )
           return;

         //Bind events
         // Shortcut so that we don't have to use _.bind every time we add a callback.
         _.bindAll( input, 'czrImgUploadRestoreDefault', 'czrImgUploadRemoveFile', 'czrImgUploadOpenFrame', 'czrImgUploadSelect');

         // Bind events, with delegation to facilitate re-rendering.
         input.container.on( 'click keydown', '.upload-button', input.czrImgUploadOpenFrame );
         input.container.on( 'click keydown', '.thumbnail-image img', input.czrImgUploadOpenFrame );
         input.container.on( 'click keydown', '.remove-button', input.czrImgUploadRemoveFile );
         input.container.on( 'click keydown', '.default-button', input.czrImgUploadRestoreDefault );

         input.bind( function( to, from ){
            input.renderImageUploaderTemplate();
         });

         // control.setting.bind( function( value, old_val, something ) {
         //   //TODO, scope to the actual background image input as at the moment it reacts to watever value changes in the setting

         //   //Is the following needed?
         //   // Send attachment information to the preview for possible use in `postMessage` transport.
         //   wp.media.attachment( value ).fetch().done( function() {
         //     wp.customize.previewer.send( control.setting.id + '-attachment-data', this.attributes );
         //   } );

         //   //re-render the template
         //   control.renderImageUploaderTemplate();
         // });
  },

  /**
  * Open the media modal.
  */
  czrImgUploadOpenFrame: function( event ) {
        if ( api.utils.isKeydownButNotEnterEvent( event ) ) {
          return;
        }

        event.preventDefault();

        if ( ! this.frame ) {
          this.czrImgUploadInitFrame();
        }

        this.frame.open();
  },

  /**
  * Create a media modal select frame, and store it so the instance can be reused when needed.
  */
  czrImgUploadInitFrame: function() {
      var input = this,
          control = input.control;

       input.frame = wp.media({
         button: {
             text: control.params.button_labels.frame_button
         },
         states: [
             new wp.media.controller.Library({
               title:     control.params.button_labels.frame_title,
               library:   wp.media.query({ type: control.params.mime_type }),
               multiple:  false,
               date:      false
             })
         ]
       });
       // When a file is selected, run a callback.
       input.frame.on( 'select', input.czrImgUploadSelect );
  },

  /**
  * Reset the setting to the default value.
  */
  czrImgUploadRestoreDefault: function( event ) {
        var input = this,
          control = input.control;

        if ( api.utils.isKeydownButNotEnterEvent( event ) ) {
          return;
        }
        event.preventDefault();

        control.params.attachment = control.params.defaultAttachment;

        // Set the input; the callback takes care of rendering.
        input.container.find('input').val( control.params.defaultAttachment.url ).trigger('change');

  },

  /**
  * Called when the "Remove" link is clicked. Empties the setting.
  *
  * @param {object} event jQuery Event object
  */
  czrImgUploadRemoveFile: function( event ) {
        var input = this,
          control = input.control;

        if ( api.utils.isKeydownButNotEnterEvent( event ) ) {
          return;
        }
        event.preventDefault();

        control.params.attachment = {};

        input.container.find('input').val( '' ).trigger('change');
  },


  /**
  * Callback handler for when an attachment is selected in the media modal.
  * Gets the selected image information, and sets it within the input.
  */
  czrImgUploadSelect: function() {
        var node,
            input = this,
            control = input.control,
            attachment   = input.frame.state().get( 'selection' ).first().toJSON(),  // Get the attachment from the modal frame.
            mejsSettings = window._wpmejsSettings || {};

        control.params.attachment = attachment;

        input.container.find('input').val( attachment.id ).trigger('change');
  },




  //////////////////////////////////////////////////
  /// HELPERS
  //////////////////////////////////////////////////
  renderImageUploaderTemplate: function() {
       var input  = this;

        //do we have view template script?
       if ( 0 === $( '#tmpl-czr-img-uploader-view-content' ).length )
         return;

       var view_template = wp.template('czr-img-uploader-view-content');

       //  //do we have an html template and a control container?
       if ( ! view_template  || ! input.container )
        return;

       var $_view_el    = input.container.find('.' + input.control.css_attr.img_upload_container );

       if ( ! $_view_el.length )
         return;

       $_view_el.html( view_template( input.control.params ) );

       return true;
  }
});//$.extendvar CZRInputMethods = CZRInputMethods || {};
$.extend( CZRInputMethods , {
    setupColorPicker : function() {
        var input  = this;

        input.container.find('input').wpColorPicker( {
          change : function( e, o ) {
            //if the input val is not updated here, it's not detected right away.
            //weird
            //is there a "change complete" kind of event for iris ?
            $(this).val($(this).wpColorPicker('color'));
            $(this).trigger('colorpickerchange');
          }
        });
    }
});//$.extendvar CZRInputMethods = CZRInputMethods || {};
$.extend( CZRInputMethods , {
    setupSelect : function() {
        var input = this;
        $('select', input.container ).not('.no-selecter-js')
          .each( function() {
            $(this).selecter({
            //triggers a change event on the view, passing the newly selected value + index as parameters.
            // callback : function(value, index) {
            //   self.triggerSettingChange( window.event || {} , value, index); // first param is a null event.
            // }
            });
        });
    }
});//$.extend//extends api.Value
//options:
  // model_id : model.id,
  // model_val : model,
  // defaultMonoModel : control.defaultMonoModel,
  // model_control : control,
  // is_added_by_user : is_added_by_user || false
var CZRMonoModelMethods = CZRMonoModelMethods || {};
$.extend( CZRMonoModelMethods , {
  initialize: function( id, options ) {
        if ( _.isUndefined(options.model_control) || _.isEmpty(options.model_control) ) {
          throw new Error('No control assigned to mono model ' + id + '. Aborting');
        }
        api.Value.prototype.initialize.call( this, null, options );

        var monoModel = this,
            control = monoModel.model_control;

        //input.options = options;
        //write the options as properties, name is included
        $.extend( monoModel, options || {} );

        //setup listeners
        monoModel.callbacks.add( function() { return monoModel.setupMonoModelListeners.apply(monoModel, arguments ); } );

        //VIEW
        //czr_View stores the current expansion status of a given view => one value by created by model.id
        //czr_View can take 3 values : expanded, expanded_noscroll (=> used on view creation), closed
        monoModel.czr_View = new api.Value();
        monoModel.setupView();

        //INPUTS => Setup as soon as the view content is rendered
        //the model is a collection of inputs, each one has its own view element.
        monoModel.czr_Input = new api.Values();
        //this can be overriden by extended classes to add and overrides methods
        monoModel.inputConstructor = control.inputConstructor;

        //initialize to the provided value
        monoModel.set(options.model_val);


        //if a model is manually added : open it
        if ( monoModel.is_added_by_user ) {
          monoModel.setViewVisibility( {}, true );//empty obj because this method can be fired by the dom chain actions, always passing an object. true for added_by_user
        }

  },//initialize


  setupView : function() {
          var monoModel = this,
              control = this.model_control;

          monoModel.view_event_map = [
                  //toggles remove view alert
                  {
                    trigger   : 'click keydown',
                    selector  : [ '.' + control.css_attr.display_alert_btn, '.' + control.css_attr.cancel_alert_btn ].join(','),
                    name      : 'toggle_remove_alert',
                    actions   : ['toggleRemoveAlertVisibility']
                  },
                  //removes model and destroys its view
                  {
                    trigger   : 'click keydown',
                    selector  : '.' + control.css_attr.remove_view_btn,
                    name      : 'remove_model',
                    actions   : ['removeModel']
                  },
                  //edit view
                  {
                    trigger   : 'click keydown',
                    selector  : [ '.' + control.css_attr.edit_view_btn, '.' + control.css_attr.view_title ].join(','),
                    name      : 'edit_view',
                    actions   : ['setViewVisibility']
                  }
          ];

          monoModel.container = monoModel.renderView( monoModel.model_val );
          if ( _.isUndefined(monoModel.container) || ! monoModel.container.length ) {
            throw new Error( 'In setupView the MonoModel view has not been rendered : ' + monoModel.model_id );
          }

          //setup
          monoModel.czr_View.set('closed');

          var $viewContent = $( '.' + control.css_attr.view_content, monoModel.container );

          //add a state listener on state change
          monoModel.czr_View.callbacks.add( function( to, from ) {
                //render and setup view content if needed
                if ( ! $.trim( $viewContent.html() ) ) {
                      monoModel.renderViewContent();
                }
                monoModel.setupInputCollection();
                //expand
                monoModel._toggleViewExpansion( to );
          });


          api.CZR_Dom.setupDOMListeners( monoModel.view_event_map , { model:monoModel.model_val, dom_el:monoModel.container }, monoModel );//listeners for the view wrapper

          monoModel._makeSortable();

          //hook here
          control.doActions('after_viewSetup', monoModel.container, { model : monoModel.model_val , dom_el: monoModel.container} );
  },




  //creates the inputs based on the rendered items
  setupInputCollection : function() {
        var monoModel = this,
            control = monoModel.model_control;

        if ( _.isEmpty(monoModel.defaultMonoModel) || _.isUndefined(monoModel.defaultMonoModel) ) {
          throw new Error('No default model found in multi input control ' + monoModel.model_id + '. Aborting');
        }

        //prepare and sets the model value on api ready
        //=> triggers the control rendering + DOM LISTENERS
        var current_model = monoModel.get();

        if ( ! _.isObject(current_model) )
          current_model = monoModel.defaultMonoModel;
        else
          current_model = $.extend( monoModel.defaultMonoModel, current_model );

        //creates the inputs based on the rendered items
        $( '.'+control.css_attr.sub_set_wrapper, monoModel.container).each( function(_index) {

              var _id = $(this).find('[data-type]').attr('data-type') || 'sub_set_' + _index,
                  _value = _.has( current_model, _id) ? current_model[_id] : '';

              monoModel.czr_Input.add( _id, new monoModel.inputConstructor( _id, {
                  id : _id,
                  type : $(this).attr('data-input-type'),
                  input_value : _value,
                  container : $(this),
                  mono_model : monoModel
              } ) );
        });//each

        // //listens and reacts to the models changes
        // monoModel.czr_Input.val.callbacks.add(function(to, from) {
        //       //api(control.id).set(to);
        //       //say it to the parent MonoModel
        //       monoModel.set(to);
        // });
  },



  setupMonoModelListeners : function( to, from ) {
        var monoModel = this,
            control = monoModel.model_control;

          control.updateCollection( {model : to });
          //Always update the view title
          monoModel.writeViewTitle(to);

          //send model to the preview. On update only, not on creation.
          if ( ! _.isEmpty(from) || ! _.isUndefined(from) ) {
            monoModel._sendModel(to, from);
          }
  }


});//$.extend//extends api.CZRBaseControl
var CZRMonoModelMethods = CZRMonoModelMethods || {};

  $.extend( CZRMonoModelMethods , {
    //The idea is to send only the currently modified model instead of the entire collection
    //the entire collection is sent anyway on api(setId).set( value ), and accessible in the preview via api(setId).bind( fn( to) )
    _sendModel : function( to, from ) {
          var monoModel = this,
              control = monoModel.model_control,
              _changed_props = [];

          //which property(ies) has(ve) changed ?
          _.each( from, function( _val, _key ) {
                if ( _val != to[_key] )
                  _changed_props.push(_key);
          });

          _.each( _changed_props, function( _prop ) {
                control.previewer.send( 'sub_setting', {
                      set_id : control.id,
                      model_id : to.id,
                      changed_prop : _prop,
                      value : to[_prop]
                });

                //add a hook here
                api.CZR_Dom.doActions('after_sendModel',  monoModel.container, { model : to , dom_el: monoModel.container, changed_prop : _prop }, monoModel );
          });
    },

    //fired on click dom event
    //for dynamic multi input controls
    removeModel : function() {
            var monoModel = this,
                control = this.model_control,
                _new_collection = _.clone( control.czr_Model.czr_collection.get() );

            //destroy the Mono model DOM el
            monoModel._destroyView();

            //new collection
            //say it
            _new_collection = _.without( _new_collection, _.findWhere( _new_collection, {id: monoModel.model_id }) );
            control.czr_Model.czr_collection.set( _new_collection );
            //hook here
            control.doActions('before_modelRemoved', control.container, { model : monoModel.get() } );
            //remove the mono model from the collection
            control.czr_Model.remove(monoModel.model_id);
    },

    //@return the model {...} from the collection
    //takes a model unique id as param
    getModel : function(id) {
            var monoModel = this;
            return monoModel.get();
    }

  });//$.extend

//extends api.CZRBaseControl
var CZRMonoModelMethods = CZRMonoModelMethods || {};

$.extend( CZRMonoModelMethods , {
  //////////////////////////////////////////////////
  /// VIEWS
  //////////////////////////////////////////////////
  //the view wrapper has been rendered by WP
  //the content ( the various inputs ) is rendered by the following methods
  //an event is triggered on the control.container when content is rendered
  renderView : function( model ) {
        //=> an array of objects
        var monoModel = this,
            control = monoModel.model_control;
        model = model || monoModel.get();

        //do we have view template script?
        if ( 0 === $( '#tmpl-' + control.getTemplateEl( 'view', model ) ).length )
          return false;//break the action chain

        var view_template = wp.template( control.getTemplateEl( 'view', model ) );

        //do we have an html template and a control container?
        if ( ! view_template  || ! control.container )
          return;

        //has this model view already been rendered?
        if ( _.has(monoModel, 'container') && false !== monoModel.container.length )
          return;

        $_view_el = $('<li>', { class : control.css_attr.inner_view, 'data-id' : model.id,  id : model.id } );
        $( '.' + control.css_attr.views_wrapper , control.container).append( $_view_el );
        //the view skeleton
        $( view_template( model ) ).appendTo( $_view_el );


        // if ( _.isEmpty($_view_el.html() ) ) {
        //   $_view_el.append( monoModel._getViewContent() );
        // } else {
        //   //var $_view_el = $('li[data-id="' + model.id + '"]');
        //   //empty the html and append the updated content
        //   $_view_el.html( monoModel._getViewContent() );
        // }

        // monoModel.doActions( 'viewContentRendered' , control.container, {} );

        return $_view_el;
  },


  //renders saved models views and attach event handlers
  //the saved model look like :
  //array[ { id : 'sidebar-one', title : 'A Title One' }, {id : 'sidebar-two', title : 'A Title Two' }]
  renderViewContent : function() {
          //=> an array of objects
          var monoModel = this,
              control = this.model_control,
              model = _.clone( monoModel.get() );

          //do we have view content template script?
          if ( 0 === $( '#tmpl-' + control.getTemplateEl( 'view-content', model ) ).length )
            return this;

          var  view_content_template = wp.template( control.getTemplateEl( 'view-content', model ) );

          //do we have an html template and a control container?
          if ( ! view_content_template || ! control.container )
            return this;

          //the view content
          $( view_content_template( model )).appendTo( $('.' + control.css_attr.view_content, monoModel.container ) );

          api.CZR_Dom.doActions( 'viewContentRendered' , monoModel.container, {model : model }, monoModel );

          return this;
  },





  //at this stage, the model passed in the obj is up to date
  writeViewTitle : function( model ) {
        var monoModel = this,
            control = monoModel.model_control,
            _model = _.clone( model || monoModel.get() ),
            _title = _.has( _model, 'title')? control._capitalize( _model.title ) : _model.id;

        _title = control._truncate(_title, 20);
        $( '.' + control.css_attr.view_title , '#' + _model.id ).text(_title );

        //add a hook here
        api.CZR_Dom.doActions('after_writeViewTitle', monoModel.container , _model, monoModel );
  },



  //@param : obj = { event : {}, model : {}, view : ${} }
  //Fired on view_rendered:new when a new model has been added
  //Fired on click on edit_view_btn
  setViewVisibility : function( obj, is_added_by_user ) {
          var monoModel = this,
              control = this.model_control,
              model_id = monoModel.model_id;
          if ( is_added_by_user ) {
            monoModel.czr_View.set( 'expanded_noscroll' );
          } else {
            control.closeAllViews(model_id);
            if ( _.has(control, 'czr_preModel') ) {
              control.czr_preModel('view_status').set( 'closed');
            }
            monoModel.czr_View.set( 'expanded' == monoModel._getViewState(model_id) ? 'closed' : 'expanded' );
          }
  },


  _getViewState : function(model_id) {
          return -1 == this.czr_View.get().indexOf('expanded') ? 'closed' : 'expanded';
  },


  //callback of czr_View() instance on change
  _toggleViewExpansion : function( status, duration ) {
          var monoModel = this,
              control = this.model_control,
              model_id = monoModel.model_id;

          //slide Toggle and toggle the 'open' class
          $( '.' + control.css_attr.view_content , monoModel.container ).slideToggle( {
              duration : duration || 200,
              done : function() {
                var _is_expanded = 'closed' != status;

                monoModel.container.toggleClass('open' , _is_expanded );

                //close all alerts
                control.closeAllAlerts();

                //toggle the icon activate class depending on the status
                //switch icon
                var $_edit_icon = $(this).siblings().find('.' + control.css_attr.edit_view_btn );

                $_edit_icon.toggleClass('active' , _is_expanded );
                if ( _is_expanded )
                  $_edit_icon.removeClass('fa-pencil').addClass('fa-minus-square').attr('title', serverControlParams.translatedStrings.close );
                else
                  $_edit_icon.removeClass('fa-minus-square').addClass('fa-pencil').attr('title', serverControlParams.translatedStrings.edit );

                //scroll to the currently expanded view
                if ( 'expanded' == status )
                  control._adjustScrollExpandedBlock( monoModel.container );
              }//done callback
            } );
  },


  //toggles the visibility of the Remove View Block
  //@param : obj = { event : {}, model : {}, view : ${} }
  toggleRemoveAlertVisibility : function(obj) {
          var monoModel = this,
              control = this.model_control,
              $_alert_el = $( '.' + control.css_attr.remove_alert_wrapper, monoModel.container ),
              $_clicked = obj.dom_event;

          //first close all open views
          control.closeAllViews();
          if ( _.has(control, 'czr_preModel') ) {
            control.czr_preModel('view_status').set( 'closed');
          }

          //then close any other open remove alert in the control containuer
          $('.' + control.css_attr.remove_alert_wrapper, monoModel.container ).not($_alert_el).each( function() {
            if ( $(this).hasClass('open') ) {
              $(this).slideToggle( {
                duration : 200,
                done : function() {
                  $(this).toggleClass('open' , false );
                  //deactivate the icons
                  $(this).siblings().find('.' + control.css_attr.display_alert_btn).toggleClass('active' , false );
                }
              } );
            }
          });

          //print the html
          var alert_template = wp.template( control.viewAlertEl );
          //do we have an html template and a control container?
          if ( ! alert_template  || ! monoModel.container )
            return this;

          $_alert_el.html( alert_template( monoModel.get() ) );

          //toggle it
          $_alert_el.slideToggle( {
            duration : 200,
            done : function() {
              var _is_open = ! $(this).hasClass('open') && $(this).is(':visible');
              $(this).toggleClass('open' , _is_open );
              //set the active class of the clicked icon
              $( obj.dom_el ).find('.' + control.css_attr.display_alert_btn).toggleClass( 'active', _is_open );
              //adjust scrolling to display the entire dialog block
              if ( _is_open )
                control._adjustScrollExpandedBlock( monoModel.container );
            }
          } );
  },

    //fired
  _makeSortable : function(obj) {
    if ( wp.media.isTouchDevice || ! $.fn.sortable )
      return;
    var monoModel = this,
        control = this.model_control;

    $( '.' + control.css_attr.views_wrapper, monoModel.container ).sortable( {
        handle: '.' + control.css_attr.sortable_handle,
        update: function( event, ui ) {
          control.czr_Model.czr_collection.set( control._getSortedDOMCollection() );
        }
      }
    );
  },

  //removes the view dom element
  _destroyView : function (model_id) {
          monoModel.container.fadeOut( {
            duration : 400,
            done : function() {
              $(this).remove();
            }
          });
  },
});//$.extend
//BASE CONTROL CLASS
//extends api.Control
//define a set of methods, mostly helpers, to extend the base WP control class
//this will become our base constructor for main complex controls
//EARLY SETUP

var CZRBaseControlMethods = CZRBaseControlMethods || {};

$.extend( CZRBaseControlMethods, {

  initialize: function( id, options ) {
          var control = this;
          api.Control.prototype.initialize.call( control, id, options );

          //add a shortcut to the css properties declared in the php controls
          control.css_attr = _.has( serverControlParams , 'css_attr') ? serverControlParams.css_attr : {};

          //extend the control with new template Selectors
          $.extend( control, {
            viewTemplateEl : 'customize-control-' + options.params.type + '-view',
            viewContentTemplateEl : 'customize-control-' + options.params.type + '-view-content',
          } );
  },

  //////////////////////////////////////////////////
  /// HELPERS
  //////////////////////////////////////////////////
  _capitalize : function( string ) {
          if( ! _.isString(string) )
            return string;
          return string.charAt(0).toUpperCase() + string.slice(1);
  },

  _truncate : function( string, n, useWordBoundary ){
          if ( _.isUndefined(string) )
            return '';
          var isTooLong = string.length > n,
              s_ = isTooLong ? string.substr(0,n-1) : string;
              s_ = (useWordBoundary && isTooLong) ? s_.substr(0,s_.lastIndexOf(' ')) : s_;
          return  isTooLong ? s_ + '...' : s_;
  },

  //called before rendering a view
  //can be overriden to set a specific view template depending on the model properties
  //@return string
  getTemplateEl : function( type, model ) {
          var control = this, _el;
          switch(type) {
            case 'view' :
              _el = control.viewTemplateEl;
              break;
            case 'view-content' :
              _el = control.viewContentTemplateEl;
              break;
          }
          if ( _.isEmpty(_el) ) {
            console.log('No valid template has been found in getTemplateEl()');
          } else {
            return _el;
          }
  },

  //@return void()
  refreshPreview : function( obj ) {
          this.previewer.refresh();
  }

});//$.extend//CZRBaseControlMethods//MULTI CONTROL CLASS
//extends api.CZRBaseControl
//
//Setup the collection of mono models
//renders the control view
//Listen to mono models collection changes and update the control setting

var CZRMultiInputControlMethods = CZRMultiInputControlMethods || {};

$.extend( CZRMultiInputControlMethods, {

  initialize: function( id, options ) {
          var control = this;
          api.CZRBaseControl.prototype.initialize.call( control, id, options );

          //store the saved models => can be extended to add default models in children classes
          control.savedModels = api(control.id).get();

          //declares a default model
          control.model = { id : '', title : '' };

          //define a default Constructors
          control.modelConstructor = api.CZRMonoModel;
          control.inputConstructor = api.CZRInput;

          //extend the control with new template Selectors
          $.extend( control, {
              viewAlertEl : 'customize-control-' + options.params.type + '-alert',
              viewPreAddEl : 'customize-control-' + options.params.type + '-pre-add-view-content',
          } );

          //czr_model stores the each model value => one value by created by model.id
          control.czr_Model = new api.Values();

          //czr_collection stores the model collection
          control.czr_Model.czr_collection = new api.Value();
          control.czr_Model.czr_collection.set([]);
  },



  //////////////////////////////////
  ///READY = CONTROL ELEMENT EMBEDDED ON THE PAGE
  ///FIRED BEFORE API READY
  //////////////////////////////////
  ready : function() {
          var control = this;
          //Important note : this event refreshes the customizer setting value
          //It's not listened to before the api is ready
          //=> the collection update on startup is done when the control is embedded and BEFORE the api is ready
          //=> won't trigger and change setting
          api.bind( 'ready', function() {
                //on init : populate the collection and setup the listener of the collection value
                //control.czr_Model.czr_collection.callbacks.add( function() { return control.setupCollectionListeners.apply(control, arguments ); } );
                control.populateCollection();

                //LISTEN TO MONO MODELS COLLECTION
                //1) update the control setting value
                //2) fire dom actions
                control.czr_Model.czr_collection.callbacks.add( function() { return control.apiCb.apply(control, arguments ); } );
          });

          //this control is ready
          control.container.trigger('ready');
  },//ready()



  apiCb : function( to, from) {
          var control = this;
          //say it to the api
          api(control.id).set( control.filterCollectionBeforeAjax(to) );

          //refreshes the preview frame  :
          //1) only needed if transport is postMessage, because is triggered by wp otherwise
          //2) only needed when : add, remove, sort model(s).
          var is_model_update = ( _.size(from) == _.size(to) ) && ! _.isEmpty( _.difference(from, to) );

          if ( 'postMessage' == api(control.id).transport && ! is_model_update && ! api.czr_has_part_refresh( control.id ) ) {
            control.previewer.refresh();
          }
  }



});//$.extend//CZRBaseControlMethods//MULTI CONTROL CLASS
//extends api.CZRBaseControl
//
//Setup the collection of mono models
//renders the control view
//Listen to mono models collection changes and update the control setting

var CZRMultiInputControlMethods = CZRMultiInputControlMethods || {};

$.extend( CZRMultiInputControlMethods, {

  //@fired in control ready on api('ready')
  populateCollection : function() {
          var control = this;

          //inits the collection with the saved models
          //populates the collection with the saved model
          _.each( control.savedModels, function( model, key ) {
                //normalizes the model
                model = control._normalizeModel(model, _.has( model, 'id' ) ? model.id : key );
                if ( false === model ) {
                  throw new Error('fetchSavedCollection : a model could not be added in : ' + control.id );
                }
                //adds it to the collection
                control.instantiateModel( model);
          });

          return this;
  },


  instantiateModel : function( model,is_added_by_user ) {
          console.log('MODEL BEFORE INSTANTIATION', model, _.has( model,'id'), is_added_by_user );
          if ( ! _.has( model,'id') ) {
            throw new Error('CZRMultiInputControl::instantiateModel() : a model has no id and could not be added in the collection of : ' + this.id +'. Aborted.' );
          }
          var control = this;

          //Maybe prepare the model, make sure its id is set and unique
          model =  ( _.has( model, 'id') && control._isModelIdPossible( model.id) ) ? model : control._initNewModel( model || {} );

          //instanciate the model with the default constructor
          control.czr_Model.add( model.id, new control.modelConstructor( model.id, {
                model_id : model.id,
                model_val : model,
                defaultMonoModel : control.defaultMonoModel,
                model_control : control,
                is_added_by_user : is_added_by_user || false
          } ) );
  },


  //@fired in control ready on api('ready')
  //setup the collection listener
  //Has to be fired after the initial fetch of the server saved collection
  //=> otherwise an unwanted collection update will be triggered when adding the saved models
  setupCollectionListeners : function(to, from) {
    console.log(to, from, 'caca');
          var control = this,
              _to_render = ( _.size(from) < _.size(to) ) ? _.difference(to,from)[0] : {},
              _to_remove = ( _.size(from) > _.size(to) ) ? _.difference(from, to)[0] : {},
              _model_updated = ( ( _.size(from) == _.size(to) ) && !_.isEmpty( _.difference(from, to) ) ) ? _.difference(from, to)[0] : {},
              _collection_sorted = _.isEmpty(_to_render) && _.isEmpty(_to_remove)  && _.isEmpty(_model_updated);

          //RENDERS AND SETUP VIEW
          // if ( ! _.isEmpty(_to_render) && ! control.getViewEl(_to_render.id).length ) {
          //       //Render model's view
          //       var $view = control.renderView( {model:_to_render} );
          //       //setup
          //       control.setupViewApiListeners( {model:_to_render, dom_el : $view} );//listener of the czr_View value for expansion state
          //       control.setupDOMListeners( control.view_event_map , {model:_to_render, dom_el:$view} );//listeners for the view wrapper
          //       control._makeSortable();

          //       //hook here
          //       control.doActions('after_viewSetup', $view, { model : _to_render , dom_el: $view} );
          // }//if

          //REMOVES
          // if ( ! _.isEmpty(_to_remove) ) {
          //       //destroy the DOM el
          //       control._destroyView(_to_remove.id);
          //       //remove the values
          //       control.czr_Model.remove(_to_remove.id);
          //       control.czr_View.remove(_to_remove.id);

          //       //hook here
          //       control.doActions('after_modelRemoved', control.container, { model : _to_remove } );
          // }//if

          //SORTED COLLECTION
          if ( _collection_sorted ) {
                if ( _.has(control, 'czr_preModel') ) {
                  control.czr_preModel('view_status').set('closed');
                }
                control.closeAllViews();
                control.closeAllAlerts();
          }//if

          return this;
  },


  //an overridable method to act on the collection just before it is ajaxed
  //@return the collection array
  filterCollectionBeforeAjax : function(candidate_for_db) {
          return candidate_for_db;
  },


  //@param model an object
  //@parama key is an integer OPTIONAL
  updateCollection : function( obj ) {
          var control = this,
              _current_collection = control.czr_Model.czr_collection.get();
              _new_collection = _.clone(_current_collection);

          //if a collection is provided in the passed obj then simply refresh the collection
          //=> typically used when reordering the collection item with sortable or when a model is removed
          if ( _.has( obj, 'collection' ) ) {
            //reset the collection
            control.czr_Model.czr_collection.set(obj.collection);
            return;
          }

          if ( ! _.has(obj, 'model') ) {
            throw new Error('updateCollection, no model provided ' + control.id + '. Aborting');
          }
          var model = _.clone(obj.model);

          //the model already exist in the collection
          if ( _.findWhere( _new_collection, { id : model.id } ) ) {
            _.map( _current_collection , function( _model, _ind ) {
              if ( _model.id != model.id )
                return;

              //set the new val to the changed property
              _new_collection[_ind] = model;
            });
          }
          //the model has to be added
          else {
            _new_collection.push(model);
          }

          //updates the collection value
          control.czr_Model.czr_collection.set(_new_collection);
  },

});//$.extend//CZRBaseControlMethods//MULTI CONTROL CLASS
//extends api.CZRBaseControl
//
//Setup the collection of mono models
//renders the control view
//Listen to mono models collection changes and update the control setting

var CZRMultiInputControlMethods = CZRMultiInputControlMethods || {};

$.extend( CZRMultiInputControlMethods, {


  //Returns the default model defined in initialize
  //Each chid class can override the default model and the following method
  getDefaultModel : function( id ) {
          var control = this;
          return $.extend( _.clone(control.model), { id : id || '' } );
  },



  //////////////////////////////////
  ///MODEL HELPERS
  //////////////////////////////////
  //make sure the model and it's properties are ready to be added to the collection
  //a model should :
  //1) be an object
  //2) have a unique id
  //3) have all the default properties set (default model is defined in each child class initialize() method)
  _normalizeModel : function( model, key ) {
          if ( ! _.isObject(model) )
            return;
          //id unicity
          model = this._initNewModel(model, key);
          return model;
  },

  //helper
  //@return bool
  _isModelIdPossible : function( _id ) {
          var control = this;
          return ! _.isEmpty(_id) && ! _.findWhere( control.czr_Model.czr_collection.get(), { id : _id });
  },

  //the job of this function is to return a new model ready to be added to the collection
  //the new model shall have a unique id
  //!!recursive
  _initNewModel : function( _model , _next_key ) {
          var control = this,
              _new_model = { id : '' },
              _id;

          //get the next available key of the collection
          _next_key = 'undefined' != typeof(_next_key) ? _next_key : _.size( control.czr_Model.czr_collection.get() );

          if ( _.isNumber(_next_key) ) {
            _id = control.params.type + '_' + _next_key;
          }
          else {
            _id = _next_key;
            //reset next key to 0 in case a recursive loop is needed later
            _next_key = 0;
          }

          if ( _model && ! _.isEmpty( _model) )
            _new_model = $.extend( _model, { id : _id } );
          else
            _new_model = this.getDefaultModel( _id );

          //check the id existence, and its unicity
          if ( _.has(_new_model, 'id') && control._isModelIdPossible(_id) ) {
            //make sure that the provided model has all the default properties set
            _.map( control.getDefaultModel() , function( value, property ){
              if ( ! _.has(_new_model, property) )
                _new_model[property] = value;
            });

            return _new_model;
          }

          //if id already exists, then test a new one
          return control._initNewModel( _new_model, _next_key + 1);
  }

});//$.extend//MULTI CONTROL CLASS
//extends api.CZRBaseControl
//
//Setup the collection of mono models
//renders the control view
//Listen to mono models collection changes and update the control setting
var CZRMultiInputControlMethods = CZRMultiInputControlMethods || {};
$.extend( CZRMultiInputControlMethods, {
  //helper
  //get the $ view DOM el from the model id
  getViewEl : function( model_id ) {
          var control = this;
          return $( '[data-id = "' + model_id + '"]', control.container );
  },


  //fired on add_model
  //fired on views_sorted
  closeAllViews : function(model_id) {
          var control = this,
              _current_collection = _.clone( control.czr_Model.czr_collection.get() ),
              _filtered_collection = _.filter( _current_collection , function( mod) { return mod.id != model_id; } );

          _.map( _filtered_collection, function(_model) {

            if ( control.czr_Model.has(_model.id) && 'expanded' == control.czr_Model(_model.id)._getViewState(_model.id) )
              control.czr_Model(_model.id).czr_View.set( 'closed' ); // => will fire the cb _toggleViewExpansion
           } );
  },


  //make sure a given jQuery block is fully visible
  //@param $(el)
  _adjustScrollExpandedBlock : function( $_block_el, adjust ) {
          if ( ! $_block_el.length )
            return;
          var control = this,
               $_controlSection = $( '.accordion-section-content', api.section( control.section() ).container ),
              _currentScrollTopVal = $_controlSection.scrollTop(),
              _scrollDownVal,
              _adjust = adjust || 90;

          setTimeout( function() {
              if ( ( $_block_el.offset().top + $_block_el.height() + _adjust ) > $(window.top).height() ) {
                _scrollDownVal = $_block_el.offset().top + $_block_el.height() + _adjust - $(window.top).height();
                if ( _scrollDownVal > 0 ) {
                  $_controlSection.animate({
                      scrollTop:  _currentScrollTopVal + _scrollDownVal
                  }, 500);
                }
              }
          }, 50);
  },


  //close alert wrapper
  //+ deactivate the icon
  closeAllAlerts : function() {
          var control = this;
          $('.' + control.css_attr.remove_alert_wrapper, control.container ).each( function() {
            if ( $(this).hasClass('open') ) {
              $(this).slideToggle( {
                duration : 100,
                done : function() {
                  $(this).toggleClass('open' , false );
                  //deactivate the icons
                  $(this).siblings().find('.' + control.css_attr.display_alert_btn).toggleClass('active' , false );
                }
              } );
            }
          });
  },

});//$.extend//MULTI CONTROL CLASS
//extends api.CZRMultiInputControl
//
//Setup the collection of mono models
//renders the control view
//Listen to mono models collection changes and update the control setting

var CZRMultiInputDynMethods = CZRMultiInputDynMethods || {};

$.extend( CZRMultiInputDynMethods, {
  initialize: function( id, options ) {
          var control = this;
          api.CZRMultiInputControl.prototype.initialize.call( control, id, options );


          //EXTENDS THE DEFAULT MONO MODEL CONSTRUCTOR WITH NEW METHODS
          //=> like remove model
          //control.modelConstructor = api.CZRMonoModel.extend( control.CZRMonoModelDynamicMethods || {} );


          //PRE MODEL
          //czr_preModel stores the expansion state and the value of the preModel
          control.czr_preModel = new api.Values();
           //create observable pre-model values
          control.czr_preModel.create('model');
          control.czr_preModel.create('view_content');
          control.czr_preModel.create('view_status');
          control.czr_preModel('view_status').set('closed');

          //default success message when model added
          control.modelAddedMessage = serverControlParams.translatedStrings.successMessage;

          ////////////////////////////////////////////////////
          /// CONTROL EVENT MAP
          ////////////////////////////////////////////////////
          control.control_event_map = [
                //pre add new model : open the dialog box
                {
                  trigger   : 'click keydown',
                  selector  : [ '.' + control.css_attr.open_pre_add_btn, '.' + control.css_attr.cancel_pre_add_btn ].join(','),
                  name      : 'pre_add_model',
                  actions   : ['renderPreModelView','setPreModelViewVisibility'],
                },
                //update_pre_model
                {
                  trigger   : 'propertychange change click keyup input colorpickerchange',//colorpickerchange is a custom colorpicker event @see method setupColorPicker => otherwise we don't
                  selector  : [ '.' + control.css_attr.pre_add_view_content + ' input[data-type]', '.' + control.css_attr.pre_add_view_content + ' select[data-type]'].join(','),
                  name      : 'update_pre_model',
                  actions   : ['updatePreModel' ]
                },
                //add new model
                {
                  trigger   : 'click keydown',
                  selector  : '.' + control.css_attr.add_new_btn, //'.czr-add-new',
                  name      : 'add_model',
                  actions   : ['closeAllViews', 'addModel'],
                }
          ];//control.control_event_map

  },


  ready : function() {
          var control = this;
          api.bind( 'ready', function() {
                //Setup the control event listeners
                control.setupDOMListeners( control.control_event_map , { dom_el : control.container } );

                //PRE ADD MODEL SETUP
                control.czr_preModel('model').set(control.getDefaultModel());
                //add state listeners
                control.czr_preModel('view_status').callbacks.add( function( to, from ) {
                  control._togglePreModelViewExpansion( to );
                });
          });

          api.CZRMultiInputControl.prototype.ready.call( control );
  },//ready()



  //the model is manually added.
  //We should have a pre model
  addModel : function(obj) {
          var control = this,
              model = control.czr_preModel('model').get();

          if ( _.isEmpty(model) || ! _.isObject(model) ) {
            throw new Error('addModel : a model should be an object and not empty. In : ' + control.id +'. Aborted.' );
          }

          control.instantiateModel(model, true); //true == Added by user

          control.closeResetPreModel();
          control.doActions( 'model_added_by_user' , control.container, { model : model , dom_event : obj.dom_event } );

          //refresh the preview frame (only needed if transport is postMessage )
          //must be a dom event not triggered
          //otherwise we are in the init collection case where the model are fetched and added from the setting in initialize
          if ( 'postMessage' == api(this.id).transport && _.has( obj, 'dom_event') && ! _.has( obj.dom_event, 'isTrigger' ) && ! api.czr_has_part_refresh( control.id ) ) {
            control.previewer.refresh();
          }
  }

});//$.extend//MULTI CONTROL CLASS
//extends api.CZRBaseControl
//
//Setup the collection of mono models
//renders the control view
//Listen to mono models collection changes and update the control setting

var CZRMultiInputDynMethods = CZRMultiInputDynMethods || {};

$.extend( CZRMultiInputDynMethods, {
  updatePreModel : function(obj) {
        //get the changed property and val
        //=> all html input have data-type attribute corresponding to the ones stored in the model
        var control           = this,
            $_changed_input   = $(obj.dom_event.currentTarget, obj.dom_el ),
            _changed_prop     = $_changed_input.attr('data-type'),
            _new_val          = $( $_changed_input, obj.dom_el ).val(),
            _new_model        = _.clone(control.czr_preModel('model').get());//initialize it to the current value

        //make sure the title has not been emptied. If so, replace it with the default title.
        if ( 'title' == _changed_prop && _.isEmpty(_new_val) ) {
          _defaultModel = control.getDefaultModel();
          _new_val = _defaultModel.title;
        }

        _new_model[_changed_prop] = _new_val;

        //set the new val to preModel Value()
        control.czr_preModel('model').set(_new_model);

        control.doActions(
          'pre_model:' + _changed_prop + ':changed',
          control.container,
          { model : _new_model, dom_el : $('.' + control.css_attr.pre_add_view_content, control.container ) }
        );
  }

});//$.extend//CZRBaseControlMethods//MULTI CONTROL CLASS
//extends api.CZRBaseControl
//
//Setup the collection of mono models
//renders the control view
//Listen to mono models collection changes and update the control setting

var CZRMultiInputDynMethods = CZRMultiInputDynMethods || {};

$.extend( CZRMultiInputDynMethods, {
    //////////////////////////////////////////////////
  /// PRE ADD MODEL DIALOG AND VIEW
  //////////////////////////////////////////////////
  renderPreModelView : function( obj ) {
          //=> an array of objects
          var control = this;

          //is this view already rendered ?
          if ( ! _.isEmpty( control.czr_preModel('view_content').get() ) )
            return;

          //do we have view template script?
          if ( ! _.has(control, 'viewPreAddEl') ||  0 === $( '#tmpl-' + control.viewPreAddEl ).length )
            return this;

          //print the html
          var pre_add_template = wp.template( control.viewPreAddEl );

          //do we have an html template and a control container?
          if ( ! pre_add_template  || ! control.container )
            return this;

          var $_pre_add_el = $('.' + control.css_attr.pre_add_view_content, control.container );

          $_pre_add_el.prepend( pre_add_template() );

          //store it
          control.czr_preModel('view_content').set( pre_add_template() );

          //say it to the control
          control.doActions( 'pre_add_view_rendered' , control.container, {model : {}, dom_el : $_pre_add_el});
  },

  //@return $ el of the premodel view
  _getPreModelView : function() {
          var control = this;
          return $('.' + control.css_attr.pre_add_view_content, control.container );
  },

  destroyPreModelView : function() {
          var control = this;
          $('.' + control.css_attr.pre_add_view_content, control.container ).find('.czr-sub-set').remove();
          control.czr_preModel('view_content').set('');
  },

   //toggles the visibility of the Remove View Block
  //@param : obj = { event : {}, model : {}, view : ${} }
  setPreModelViewVisibility : function(obj) {
          var control = this;

          control.closeAllViews();
          control.czr_preModel('view_status').set( 'expanded' == control.czr_preModel('view_status').get() ? 'closed' : 'expanded' );
  },


  //callback of czr_preModel('view') instance on change
  _togglePreModelViewExpansion : function( status) {
          var control = this,
            $_pre_add_el = $( '.' + control.css_attr.pre_add_view_content, control.container );

          //toggle it
          $_pre_add_el.slideToggle( {
            duration : 200,
            done : function() {
                  var _is_expanded = 'closed' != status,
                      $_btn = $( '.' + control.css_attr.open_pre_add_btn, control.container );

                  $(this).toggleClass('open' , _is_expanded );
                  //switch icons
                  if ( _is_expanded )
                    $_btn.find('.fa').removeClass('fa-plus-square').addClass('fa-minus-square');
                  else
                    $_btn.find('.fa').removeClass('fa-minus-square').addClass('fa-plus-square');

                  //set the active class to the btn
                  $_btn.toggleClass( 'active', _is_expanded );

                  //set the adding_new class to the control container wrapper
                  $( control.container ).toggleClass( control.css_attr.adding_new, _is_expanded );
                  //make sure it's fully visible
                  control._adjustScrollExpandedBlock( $(this), 120 );
            }//done
          } );
  },

  //Fired on "model_added_by_user"
  closeResetPreModel : function() {
          var control = this;
          control.toggleSuccessMessage('on');
          setTimeout( function() {
                control.czr_preModel('view_status').set( 'closed');
                control.czr_preModel('model').set(control.getDefaultModel());
                control.toggleSuccessMessage('off').destroyPreModelView();
          } , 3000);
  },

  toggleSuccessMessage : function(status) {
          var control = this,
              _message = control.modelAddedMessage,
              $_pre_add_wrapper = $('.' + control.css_attr.pre_add_wrapper, control.container );
              $_success_wrapper = $('.' + control.css_attr.pre_add_success, control.container );

          if ( 'on' == status ) {
              //write message
              $_success_wrapper.find('p').text(_message);

              //set various properties
              $_success_wrapper.css('z-index', 1000001 )
                .css('height', $_pre_add_wrapper.height() + 'px' )
                .css('line-height', $_pre_add_wrapper.height() + 'px');
          } else {
              $_success_wrapper.attr('style','');
          }
          control.container.toggleClass('czr-model-added', 'on' == status );
          return this;
  }

});//$.extend//CZRBaseControlMethods
var CZRMultiModelMethods = CZRMultiModelMethods || {};
/* Dynamic Controls */
//@augments CZRBaseControl
/* //=> all html input have data-type attribute corresponding to the ones stored in the model
/**
 * @constructor
 * @augments wp.customize.Control
 * @augments wp.customize.Class
 * @todo  : some controls must listen to the sidebar changes => home Left sidebar for example and fall back on a default value.
 * @todo : when adding a model => collection update => check if key exist to either update or push a new model
 * @todo : the views shall be refreshed each time the collection is updated
 * @todo : always have only one view content opened at a time
 * @todo : make sure that the model has changed before refreshing the view !! or don't refresh the view is already rendered ?
 */

$.extend( CZRMultiModelMethods, {

  //EARLY SETUP
  initialize: function( id, options ) {
    //console.log('the setting id', id , options );

    var control = this;

    //run the parent initialize
    api.CZRBaseControl.prototype.initialize.call( control, id, options );



    ////////////////////////////////////////////////////
    /// CONTROL EVENT MAP
    ////////////////////////////////////////////////////
    control.control_event_map = [
      //pre add new model : open the dialog box
      {
        trigger   : 'click keydown',
        selector  : [ '.' + control.css_attr.open_pre_add_btn, '.' + control.css_attr.cancel_pre_add_btn ].join(','),
        name      : 'pre_add_model',
        actions   : ['renderPreModelView','setPreModelViewVisibility'],
      },
      //update_pre_model
      {
        trigger   : 'propertychange change click keyup input colorpickerchange',//colorpickerchange is a custom colorpicker event @see method setupColorPicker => otherwise we don't
        selector  : [ '.' + control.css_attr.pre_add_view_content + ' input[data-type]', '.' + control.css_attr.pre_add_view_content + ' select[data-type]'].join(','),
        name      : 'update_pre_model',
        actions   : ['updatePreModel' ]
      },
      //add new model
      {
        trigger   : 'click keydown',
        selector  : '.' + control.css_attr.add_new_btn, //'.czr-add-new',
        name      : 'add_model',
        actions   : ['closeAllViews', 'addModel'],
      }
    ];



    ////////////////////////////////////////////////////
    /// SINGLE VIEW EVENT MAP
    ////////////////////////////////////////////////////
    //add the event map properties to the parent class
    control.view_event_map = [
      //toggles remove view alert
      {
        trigger   : 'click keydown',
        selector  : [ '.' + control.css_attr.display_alert_btn, '.' + control.css_attr.cancel_alert_btn ].join(','),
        name      : 'toggle_remove_alert',
        actions   : ['toggleRemoveAlertVisibility']
      },
      //removes model and destroys its view
      {
        trigger   : 'click keydown',
        selector  : '.' + control.css_attr.remove_view_btn,
        name      : 'remove_model',
        actions   : ['removeModel']
      },
      //edit view
      {
        trigger   : 'click keydown',
        selector  : [ '.' + control.css_attr.edit_view_btn, '.' + control.css_attr.view_title ].join(','),
        name      : 'edit_view',
        actions   : ['setViewVisibility']
      }
    ];



    ////////////////////////////////////////////////////
    /// SINGLE VIEW CONTENT EVENT MAP
    ////////////////////////////////////////////////////
    control.view_content_event_map = [
      //set input value
      {
        trigger   : 'propertychange change click keyup input colorpickerchange',//colorpickerchange is a custom colorpicker event @see method setupColorPicker => otherwise we don't
        selector  : 'input[data-type], select[data-type]',
        name      : 'set_input_value',
        actions   : 'updateModel'
      }
    ];



    //store the saved models => can be extended to add default models in children classes
    control.savedModels = api(control.id).get();

    //declares a default model
    control.defaultMonoModel = { id : '', title : '' };

    //default success message when model added
    control.modelAddedMessage = serverControlParams.translatedStrings.successMessage;

    //extend the control with new template Selectors
    $.extend( control, {
      viewAlertEl : 'customize-control-' + options.params.type + '-alert',
      viewPreAddEl : 'customize-control-' + options.params.type + '-pre-add-view-content',
    } );

    // $( window ).on( 'message', function( e, o) {
    //   console.log('WHAT ARE WE LISTENING TO?', e, o, api.previewer.receive.guid );
    // });

    //Declares some observable values.
    control._setupApiValues();

  },//initialize

  //Declare some observable values.
  _setupApiValues : function() {
    var control = this;
    //PRE MODEL
    //czr_preModel stores the expansion state and the value of the preModel
    control.czr_preModel = new api.Values();
     //create observable pre-model values
    control.czr_preModel.create('model');
    control.czr_preModel.create('view_content');
    control.czr_preModel.create('view_status');
    control.czr_preModel('view_status').set('closed');

    //czr_model stores the each model value => one value by created by model.id
    control.czr_Model = new api.Values();

    //czr_collection stores the model collection
    control.czr_Model.czr_collection = new api.Value();
    control.czr_Model.czr_collection.set([]);

    //czr_View stores the current expansion status of a given view => one value by created by model.id
    //czr_View can take 3 values : expanded, expanded_noscroll (=> used on view creation), closed
    control.czr_View = new api.Values();


  },


  //////////////////////////////////
  ///READY = CONTROL ELEMENT EMBEDDED ON THE PAGE
  ///FIRED BEFORE API READY
  //////////////////////////////////
  ready : function() {
    var control = this;

    //Important note : this event refreshes the customizer setting value
    //It's not listened to before the api is ready
    //=> the collection update on startup is done when the control is embedded and BEFORE the api is ready
    //=> won't trigger and change setting
    api.bind( 'ready', function() {
      //Setup the control event listeners
      control.setupDOMListeners( control.control_event_map , { dom_el : control.container } );
      //on init : populate the collection and setup the listener of the collection value
      control.setupCollectionListeners().fetchSavedCollection();
      //Now set the setting value (the saved collection has been rendered at this point)
      control.czr_Model.czr_collection.callbacks.add( function( to, from ) {
          //say it to the api
          api(control.id).set( control.filterCollectionBeforeAjax(to) );

          //refreshes the preview frame  :
          //1) only needed if transport is postMessage, because is triggered by wp otherwise
          //2) only needed when : add, remove, sort model(s).
          var is_model_update = ( _.size(from) == _.size(to) ) && ! _.isEmpty( _.difference(from, to) );

          if ( 'postMessage' == api(control.id).transport && ! is_model_update && ! api.czr_has_part_refresh( control.id ) ) {
            control.previewer.refresh();
          }
      });

      //PRE ADD MODEL SETUP
      control.czr_preModel('model').set(control.getDefaultModel());
      //add state listeners
      control.czr_preModel('view_status').callbacks.add( function( to, from ) {
        control._togglePreModelViewExpansion( to );
      });
    });

    //this control is ready
    control.container.trigger('ready');
  },//ready()

});//$.extend()var CZRMultiModelMethods = CZRMultiModelMethods || {};


$.extend( CZRMultiModelMethods, {

  updatePreModel : function(obj) {
    //get the changed property and val
    //=> all html input have data-type attribute corresponding to the ones stored in the model
    var control           = this,
        $_changed_input   = $(obj.dom_event.currentTarget, obj.dom_el ),
        _changed_prop     = $_changed_input.attr('data-type'),
        _new_val          = $( $_changed_input, obj.dom_el ).val(),
        _new_model        = _.clone(control.czr_preModel('model').get());//initialize it to the current value

    //make sure the title has not been emptied. If so, replace it with the default title.
    if ( 'title' == _changed_prop && _.isEmpty(_new_val) ) {
      _defaultModel = control.getDefaultModel();
      _new_val = _defaultModel.title;
    }

    _new_model[_changed_prop] = _new_val;

    //set the new val to preModel Value()
    control.czr_preModel('model').set(_new_model);

    control.doActions(
      'pre_model:' + _changed_prop + ':changed',
      control.container,
      { model : _new_model, dom_el : $('.' + control.css_attr.pre_add_view_content, control.container ) }
    );
  },







  //@param : obj = { model : {} }
  //on init when first populating the collection the saved key is provided
  addModel : function( obj, key ) {
    var control = this,
        model = {},
        is_added_by_user = _.has(obj, 'dom_event') && ! _.has(obj.dom_event, 'isTrigger');

    //Are we in a pre model case ?
    if ( ! _.has( obj, 'model') && _.has(control, 'czr_preModel') ) {
      model = control.czr_preModel('model').get();
    } else {
      //else do we have a model?
      model = _.has( obj, 'model') ? obj.model : model;
    }
    if ( _.isEmpty(model) )
      return;

    //Maybe prepare the model, make sure its id is set and unique
    model =  ( _.has( model, 'id') && control._isModelIdPossible( model.id) ) ? model : this._initNewModel( model || {} );
    key   = 'undefined' == typeof(key) ? key : false;

    //create an observable value for this model id
    //set the callbacks
    //create the Value of this model
    control.czr_Model.create(model.id);

    console.log( 'in add model', obj, model );

    // control.czr_Model.add( model.id, new control.modelConstructor( model.id, {
    //   model_id : model.id,
    //   model_val : model,
    //   model_control : control
    // } ) );



    //add a listener on change
    control.czr_Model(model.id).callbacks.add( function( to, from ) {
        //push the new model to the collection
        control.updateCollection( { model : to }, key );
        //Always update the view title
        control.writeViewTitle( {model:to});
        //send model to the preview. On update only, not on creation.
        if ( ! _.isEmpty(from) || ! _.isUndefined(from) ) {
          control._sendModel(from, to );
        }
    });

    //set the value
    control.czr_Model(model.id).set(model);


    //if a model is manually added : open it and trigger a specific event
    if ( is_added_by_user ) {
      control.setViewVisibility( {model:model}, is_added_by_user );
      control.closeResetPreModel();
      control.doActions( 'model_added_by_user' , obj.dom_el, { model : model , dom_event : obj.dom_event } );
    }

    //refresh the preview frame (only needed if transport is postMessage )
    //must be a dom event not triggered
    //otherwise we are in the init collection case where the model are fetched and added from the setting in initialize
    if ( 'postMessage' == api(this.id).transport && _.has( obj, 'dom_event') && ! _.has( obj.dom_event, 'isTrigger' ) && ! api.czr_has_part_refresh( control.id ) ) {
      control.previewer.refresh();
    }
  },










  //fired after a input change is detected
  updateModel : function( obj ) {
        //get the changed property and val
        //=> all html input have data-type attribute corresponding to the ones stored in the model
        var control           = this,
            $_changed_input   = $(obj.dom_event.currentTarget, obj.dom_el ),
            _changed_prop     = $_changed_input.attr('data-type'),
            _new_val          = $( $_changed_input, obj.dom_el ).val(),
            _current_model    = control.czr_Model(obj.model.id).get(),
            _new_model        = _.clone( _current_model );//initialize it to the current value

        //make sure the title has not been emptied. If so, replace it with the default title.
        if ( 'title' == _changed_prop && _.isEmpty(_new_val) ) {
          _defaultModel = control.getDefaultModel();
          _new_val = _defaultModel.title;
        }

        //set the new val to the changed property
        _new_model[_changed_prop] = _new_val;

        control.czr_Model(obj.model.id).set(_new_model);

        //say it to the current view
        control.doActions(
          _changed_prop + ':changed',
          obj.dom_el,
          { model : _new_model }
        );
  },





  //fired on click dom event
  removeModel : function( obj ) {
        var control = this,
            _new_collection = _.clone( control.czr_Model.czr_collection.get() );

        _new_collection = _.without( _new_collection, _.findWhere( _new_collection, {id: obj.model.id }) );

        //say it
        control.czr_Model.czr_collection.set( _new_collection );
  },





  //Returns the default model defined in initialize
  //Each chid class can override the default model and the following method
  getDefaultModel : function( id ) {
        var control = this;
        return $.extend( _.clone(control.defaultMonoModel), { id : id || '' } );
  },






  //////////////////////////////////
  ///MODEL HELPERS
  //////////////////////////////////
  //make sure the model and it's properties are ready to be added to the collection
  //a model should :
  //1) be an object
  //2) have a unique id
  //3) have all the default properties set (default model is defined in each child class initialize() method)
  _normalizeModel : function( model, key ) {
        if ( ! _.isObject(model) )
          return;

        //id unicity
        model = this._initNewModel(model, key);

        return model;
  },

  //helper
  //@return bool
  _isModelIdPossible : function( _id ) {
        var control = this;
        return ! _.isEmpty(_id) && ! _.findWhere( control.czr_Model.czr_collection.get(), { id : _id });
  },

  //the job of this function is to return a new model ready to be added to the collection
  //the new model shall have a unique id
  //recursive
  _initNewModel : function( _model , _next_key ) {
          var control = this,
              _new_model = { id : '' },
              _id;

          //get the next available key of the collection
          _next_key = 'undefined' != typeof(_next_key) ? _next_key : _.size( control.czr_Model.czr_collection.get() );

          if ( _.isNumber(_next_key) ) {
            _id = control.params.type + '_' + _next_key;
          }
          else {
            _id = _next_key;
            //reset next key to 0 in case a recursive loop is needed later
            _next_key = 0;
          }

          if ( _model && ! _.isEmpty( _model) )
            _new_model = $.extend( _model, { id : _id } );
          else
            _new_model = this.getDefaultModel( _id );

          //check the id existence, and its unicity
          if ( _.has(_new_model, 'id') && control._isModelIdPossible(_id) ) {
            //make sure that the provided model has all the default properties set
            _.map( control.getDefaultModel() , function( value, property ){
              if ( ! _.has(_new_model, property) )
                _new_model[property] = value;
            });

            return _new_model;
          }

          //if id already exists, then test a new one
          return control._initNewModel( _new_model, _next_key + 1);
  },

  //The idea is to send only the currently modified model instead of the entire collection
  //the entire collection is sent anyway on api(setId).set( value ), and accessible in the preview via api(setId).bind( fn( to) )
  _sendModel : function( from, to ) {
          var control = this,
            _changed_props = [],
            $view = control.getViewEl(to.id);

          //which property(ies) has(ve) changed ?
          _.map( from, function( _val, _key ) {
            if ( _val != to[_key] )
              _changed_props.push(_key);
          });

          _.map( _changed_props, function( _prop) {
            control.previewer.send( 'sub_setting', {
              set_id : control.id,
              model_id : to.id,
              changed_prop : _prop,
              value : to[_prop]
            });

            //add a hook here
            control.doActions('after_sendModel', $view, { model : to , dom_el: $view, changed_prop : _prop } );

          });
  },
});//$.extend()var CZRMultiModelMethods = CZRMultiModelMethods || {};

$.extend( CZRMultiModelMethods, {
  //////////////////////////////////
  ///COLLECTION//
  //////////////////////////////////

  //@fired in control ready on api('ready')
  fetchSavedCollection : function() {
    var control = this;

    //inits the collection with the saved models
    //populates the collection with the saved model
    _.map( control.savedModels, function( model, key ) {
      //normalizes the model
      model = control._normalizeModel(model, _.has( model, 'id' ) ? model.id : key );
      if ( false === model ) {
        throw new Error('fetchSavedCollection : a model could not be added in : ' + control.id );
      }
      //adds it to the collection
      control.addModel( { model : model }, key);
    });
    return this;
  },



  //@fired in control ready on api('ready')
  //setup the collection listener
  //Has to be fired after the initial fetch of the server saved collection
  //=> otherwise an unwanted collection update will be triggered when adding the saved models
  setupCollectionListeners : function() {
    var control = this;
    //add a listener on change
    control.czr_Model.czr_collection.callbacks.add( function( to, from ) {
          var _to_render = ( _.size(from) < _.size(to) ) ? _.difference(to,from)[0] : {},
              _to_remove = ( _.size(from) > _.size(to) ) ? _.difference(from, to)[0] : {},
              _model_updated = ( ( _.size(from) == _.size(to) ) && !_.isEmpty( _.difference(from, to) ) ) ? _.difference(from, to)[0] : {},
              _collection_sorted = _.isEmpty(_to_render) && _.isEmpty(_to_remove)  && _.isEmpty(_model_updated);

          //RENDERS AND SETUP VIEW
          if ( ! _.isEmpty(_to_render) && ! control.getViewEl(_to_render.id).length ) {
            //Render model's view
            var $view = control.renderView( {model:_to_render} );
            //setup
            control.setupViewApiListeners( {model:_to_render, dom_el : $view} );//listener of the czr_View value for expansion state
            control.setupDOMListeners( control.view_event_map , {model:_to_render, dom_el:$view} );//listeners for the view wrapper
            control._makeSortable();

            //hook here
            control.doActions('after_viewSetup', $view, { model : _to_render , dom_el: $view} );
          }//if

          //REMOVES
          if ( ! _.isEmpty(_to_remove) ) {
            //destroy the DOM el
            control._destroyView(_to_remove.id);
            //remove the values
            control.czr_Model.remove(_to_remove.id);
            control.czr_View.remove(_to_remove.id);

            //hook here
            control.doActions('before_modelRemoved', control.container, { model : _to_remove } );
          }//if

          //SORTED COLLECTION
          if ( _collection_sorted ) {
            control.czr_preModel('view_status').set('closed');
            control.closeAllViews();
            control.closeAllAlerts();
          }//if
    });//czr_collection.callbacks
    return this;
  },


  //an overridable method to act on the collection just before it is ajaxed
  //@return the collection array
  filterCollectionBeforeAjax : function(candidate_for_db) {
    return candidate_for_db;
  },


  //@param model an object
  //@parama key is an integer OPTIONAL
  updateCollection : function( obj, key ) {
    var control = this,
        _current_collection = control.czr_Model.czr_collection.get();
        _new_collection = _.clone(_current_collection);

    //if a collection is provided in the passed obj then simply refresh the collection
    //=> typically used when reordering the collection item with sortable or when a model is removed
    if ( _.has( obj, 'collection' ) ) {
      //reset the collection
      control.czr_Model.czr_collection.set(obj.collection);
      return;
    }

    //else, add or update the provided model
    var _key = ( 'undefined' == typeof(key) ) ? false : key,
        model = _.clone(obj.model);


    //if a key is provided (typically on initialization) :
    //2 cases :
    //  1) the key exists : then we just override the existing value in the collection
    //  2) the key does not exists : we push a new model
    //
    //if not then 2 cases
    //  1) the provided model already exists in the collection and if yes update it by looping in the collection to find the right model, then update the collection
    //  2) this is a new model to push in the collection
    //
    if ( false !== _key ) {
      if ( _.isObject( _new_collection[key] ) )
        _new_collection[key] = model;
      else {
        _new_collection.push(model);
      }
    }
    else {
      //the model already exist in the collection
      if ( _.findWhere( _new_collection, { id : model.id } ) ) {
        _.map( _current_collection , function( _model, _ind ) {
          if ( _model.id != model.id )
            return;

          //set the new val to the changed property
          _new_collection[_ind] = model;
        });
      }
      //the model has to be added
      else {
        _new_collection.push(model);
      }
    }//else

    //updates the collection value
    control.czr_Model.czr_collection.set(_new_collection);
  },


  //fire on sortable() update callback
  //@returns a sorted collection as an array of model objects
  _getSortedDOMCollection : function( obj ) {
    var control = this,
        _old_collection = _.clone( control.czr_Model.czr_collection.get() ),
        _new_collection = [],
        _index = 0;

    //re-build the collection from the DOM
    $( '.' + control.css_attr.inner_view, control.container ).each( function() {
      var _model = _.findWhere( _old_collection, {id: $(this).attr('data-id') });
      //do we have a match in the existing collection ?
      if ( ! _model )
        return;

      _new_collection[_index] = _model;

      _index ++;
    });

    //make sure the new collection is not empty...
    if ( 0 === _new_collection.length )
      return _old_collection;

    //make sure we have the exact same models as before in the sorted collection
    if ( ! _.isEmpty( _.difference( _old_collection, _new_collection ) ) )
      return _old_collection;

    return _new_collection;
  },


  //@return the model {...} from the collection
  //takes a model unique id as param
  getModel : function(id) {
    var control = this;
    return _.findWhere( control.czr_Model.czr_collection.get(), {id:id} ) || {};
  }
});//$.extend()var CZRMultiModelMethods = CZRMultiModelMethods || {};

$.extend( CZRMultiModelMethods, {
  //////////////////////////////////////////////////
  /// VIEWS
  //////////////////////////////////////////////////
  //renders the view html of a given model
  //returns the $ view object
  renderView : function( obj ) {
    //=> an array of objects
    var control = this,
        model = _.clone(obj.model);

    //do we have view template script?
    if ( 0 === $( '#tmpl-' + control.getTemplateEl( 'view', model ) ).length )
      return false;//break the action chain

    var view_template = wp.template( control.getTemplateEl( 'view', model ) );

    //do we have an html template and a control container?
    if ( ! view_template  || ! control.container )
      return false;//break the action chain

    //if the view has already been rendered, the view element exists, we simply need to remove its html content and append the new one
    //if not, then we need to render the view element and append the view html content to it
    var $_view_el = $('li[data-id="' + model.id + '"]').length ? $('li[data-id="' + model.id + '"]') : $('<li>', { class : control.css_attr.inner_view, 'data-id' : model.id,  id : model.id } ),
        _refreshed = $('li[data-id="' + model.id + '"]').length ? true : false;
        //_view_content_open = false;

    if ( ! $('li[data-id="' + model.id + '"]').length ) {
      $( '.' + control.css_attr.views_wrapper , control.container).append( $_view_el );
      //the view skeleton
      $( view_template( model ) ).appendTo( $_view_el );
    } else {
      //var $_view_el = $('li[data-id="' + model.id + '"]');
      //empty the html and append the updated content
      $_view_el.html( view_template( model ) );
    }
    return $_view_el;
  },



  //renders saved models views and attach event handlers
  //the saved model look like :
  //array[ { id : 'sidebar-one', title : 'A Title One' }, {id : 'sidebar-two', title : 'A Title Two' }]
  renderViewContent : function( obj ) {
    //=> an array of objects
    var control = this,
        model = _.clone(obj.model);

    //do we have view content template script?
    if ( 0 === $( '#tmpl-' + control.getTemplateEl( 'view-content', model ) ).length )
      return this;

    var  view_content_template = wp.template( control.getTemplateEl( 'view-content', model ) );

    //do we have an html template and a control container?
    if ( ! view_content_template || ! control.container )
      return this;

    //the view content
    $( view_content_template( model )).appendTo( $('.' + control.css_attr.view_content, obj.dom_el ) );

    control.doActions( 'viewContentRendered' , obj.dom_el, obj );

    return this;
  },



  //removes the view dom element
  _destroyView : function (model_id) {
    var $view = this.getViewEl(model_id);
    $view.fadeOut( {
      duration : 400,
      done : function() {
        $(this).remove();
      }
    });
  },


  //replace the default view title by a custom one
  //at this stage, the model passed in the obj is up to date
  writeViewTitle : function( obj ) {
    var control = this;
        _model = _.clone(obj.model);
        _title = _.has(_model, 'title')? this._capitalize( _model.title ) : _model.id;
    _title = this._truncate(_title, 20);
    $( '.' + this.css_attr.view_title , '#' + obj.model.id ).text(_title );

    //add a hook here
    this.doActions('after_writeViewTitle', control.getViewEl(obj.model.id) , obj );
  },

  //helper
  //get the $ view DOM el from the model id
  getViewEl : function( model_id ) {
    var control = this;
    return $( '[data-id = "' + model_id + '"]', control.container );
  },




  //////////////////////////////////////////////////
  /// CALLBACKS
  //////////////////////////////////////////////////
  //creates the view value and update its expanded status
  setupViewApiListeners : function(obj) {
    var control = this,
        $viewContent = $( '.' + control.css_attr.view_content, control.getViewEl(obj.model.id) ),
        $view = control.getViewEl(obj.model.id);

    control.czr_View.create(obj.model.id);
    control.czr_View(obj.model.id).set('closed');

    //add a state listener on state change
    control.czr_View(obj.model.id).callbacks.add( function( to, from ) {
      //render and setup view content if needed
      if ( ! $.trim( $viewContent.html() ) ) {
        control.renderViewContent( obj ).setupDOMListeners(
          control.view_content_event_map,
          { model : obj.model, dom_el : $view }
        );
      }
      //expand
      control._toggleViewExpansion( obj.model.id, to );
    });
  },





















  //@param : obj = { event : {}, model : {}, view : ${} }
  //Fired on view_rendered:new when a new model has been added
  //Fired on click on edit_view_btn
  setViewVisibility : function(obj, is_added_by_user ) {
    var control = this;
    if ( is_added_by_user ) {
      control.czr_View(obj.model.id).set( 'expanded_noscroll' );
    } else {
      control.closeAllViews(obj.model.id);
      control.czr_preModel('view_status').set( 'closed');
      control.czr_View(obj.model.id).set( 'expanded' == control._getViewState(obj.model.id) ? 'closed' : 'expanded' );
    }
  },


  //fired on add_model
  //fired on views_sorted
  closeAllViews : function(model_id) {
    var control = this,
        _current_collection = _.clone( control.czr_Model.czr_collection.get() ),
        _filtered_collection = _.filter( _current_collection , function( mod) { return mod.id != model_id; } );

    _.map( _filtered_collection, function(_model) {
      if ( control.czr_View.has(_model.id) && 'expanded' == control._getViewState(_model.id) )
        control.czr_View( _model.id).set( 'closed' ); // => will fire the cb _toggleViewExpansion
     } );
  },


  _getViewState : function(model_id) {
    return -1 == this.czr_View(model_id).get().indexOf('expanded') ? 'closed' : 'expanded';
  },

  //callback of czr_View() instance on change
  _toggleViewExpansion : function( model_id, status, duration ) {
    var control = this;
    //slide Toggle and toggle the 'open' class
    $( '.' + control.css_attr.view_content , control.getViewEl(model_id) ).slideToggle( {
        duration : duration || 200,
        done : function() {
          var _is_expanded = 'closed' != status;

          control.getViewEl(model_id).toggleClass('open' , _is_expanded );

          //close all alerts
          control.closeAllAlerts();

          //toggle the icon activate class depending on the status
          //switch icon
          var $_edit_icon = $(this).siblings().find('.' + control.css_attr.edit_view_btn);

          $_edit_icon.toggleClass('active' , _is_expanded );
          if ( _is_expanded )
            $_edit_icon.removeClass('fa-pencil').addClass('fa-minus-square').attr('title', serverControlParams.translatedStrings.close );
          else
            $_edit_icon.removeClass('fa-minus-square').addClass('fa-pencil').attr('title', serverControlParams.translatedStrings.edit );

          //scroll to the currently expanded view
          if ( 'expanded' == status )
            control._adjustScrollExpandedBlock( control.getViewEl(model_id) );
        }//done callback
      } );
  },

  //make sure a given jQuery block is fully visible
  //@param $(el)
  _adjustScrollExpandedBlock : function( $_block_el, adjust ) {
    if ( ! $_block_el.length )
      return;
    var control = this,
         $_controlSection = $( '.accordion-section-content', api.section( control.section() ).container ),
        _currentScrollTopVal = $_controlSection.scrollTop(),
        _scrollDownVal,
        _adjust = adjust || 90;

    setTimeout( function() {
        if ( ( $_block_el.offset().top + $_block_el.height() + _adjust ) > $(window.top).height() ) {
          _scrollDownVal = $_block_el.offset().top + $_block_el.height() + _adjust - $(window.top).height();
          if ( _scrollDownVal > 0 ) {
            $_controlSection.animate({
                scrollTop:  _currentScrollTopVal + _scrollDownVal
            }, 500);
          }
        }
    }, 50);
  },





  //fired
  _makeSortable : function(obj) {
    if ( wp.media.isTouchDevice || ! $.fn.sortable )
      return;
    var control = this;
    $( '.' + control.css_attr.views_wrapper, control.container ).sortable( {
        handle: '.' + control.css_attr.sortable_handle,
        update: function( event, ui ) {
          control.czr_Model.czr_collection.set( control._getSortedDOMCollection() );
        }
      }
    );
  },





  //close alert wrapper
  //+ deactivate the icon
  closeAllAlerts : function() {
    var control = this;
    $('.' + control.css_attr.remove_alert_wrapper, control.container ).each( function() {
      if ( $(this).hasClass('open') ) {
        $(this).slideToggle( {
          duration : 100,
          done : function() {
            $(this).toggleClass('open' , false );
            //deactivate the icons
            $(this).siblings().find('.' + control.css_attr.display_alert_btn).toggleClass('active' , false );
          }
        } );
      }
    });
  },


  //toggles the visibility of the Remove View Block
  //@param : obj = { event : {}, model : {}, view : ${} }
  toggleRemoveAlertVisibility : function(obj) {
    var control = this,
        $_alert_el = $( '.' + control.css_attr.remove_alert_wrapper, obj.dom_el ),
        $_clicked = obj.dom_event;

    //first close all open views
    this.closeAllViews();
    control.czr_preModel('view_status').set( 'closed');

    //then close any other open remove alert in the control containuer
    $('.' + control.css_attr.remove_alert_wrapper, control.container ).not($_alert_el).each( function() {
      if ( $(this).hasClass('open') ) {
        $(this).slideToggle( {
          duration : 200,
          done : function() {
            $(this).toggleClass('open' , false );
            //deactivate the icons
            $(this).siblings().find('.' + control.css_attr.display_alert_btn).toggleClass('active' , false );
          }
        } );
      }
    });

    //print the html
    var alert_template = wp.template( control.viewAlertEl );
    //do we have an html template and a control container?
    if ( ! alert_template  || ! control.container )
      return this;

    $_alert_el.html( alert_template( obj.model ) );

    //toggle it
    $_alert_el.slideToggle( {
      duration : 200,
      done : function() {
        var _is_open = ! $(this).hasClass('open') && $(this).is(':visible');
        $(this).toggleClass('open' , _is_open );
        //set the active class of the clicked icon
        $( obj.dom_el ).find('.' + control.css_attr.display_alert_btn).toggleClass( 'active', _is_open );
        //adjust scrolling to display the entire dialog block
        if ( _is_open )
          control._adjustScrollExpandedBlock( control.getViewEl( obj.model.id ) );
      }
    } );
  },















  //////////////////////////////////////////////////
  /// PRE ADD MODEL DIALOG AND VIEW
  //////////////////////////////////////////////////
  renderPreModelView : function( obj ) {
    //=> an array of objects
    var control = this;

    //is this view already rendered ?
    if ( ! _.isEmpty( control.czr_preModel('view_content').get() ) )
      return;

    //do we have view template script?
    if ( ! _.has(control, 'viewPreAddEl') ||  0 === $( '#tmpl-' + control.viewPreAddEl ).length )
      return this;

    //print the html
    var pre_add_template = wp.template( control.viewPreAddEl );

    //do we have an html template and a control container?
    if ( ! pre_add_template  || ! control.container )
      return this;

    var $_pre_add_el = $('.' + control.css_attr.pre_add_view_content, control.container );

    $_pre_add_el.prepend( pre_add_template() );

    //store it
    control.czr_preModel('view_content').set( pre_add_template() );

    //say it to the control
    control.doActions( 'pre_add_view_rendered' , control.container, {model : {}, dom_el : $_pre_add_el});
  },

  //@return $ el of the premodel view
  _getPreModelView : function() {
    var control = this;
    return $('.' + control.css_attr.pre_add_view_content, control.container );
  },

  destroyPreModelView : function() {
    var control = this;
    $('.' + control.css_attr.pre_add_view_content, control.container ).find('.czr-sub-set').remove();
    control.czr_preModel('view_content').set('');
  },

   //toggles the visibility of the Remove View Block
  //@param : obj = { event : {}, model : {}, view : ${} }
  setPreModelViewVisibility : function(obj) {
    var control = this;

    control.closeAllViews();
    control.czr_preModel('view_status').set( 'expanded' == control.czr_preModel('view_status').get() ? 'closed' : 'expanded' );
  },


  //callback of czr_preModel('view') instance on change
  _togglePreModelViewExpansion : function( status) {
    var control = this,
      $_pre_add_el = $( '.' + control.css_attr.pre_add_view_content, control.container );

    //toggle it
    $_pre_add_el.slideToggle( {
      duration : 200,
      done : function() {
        var _is_expanded = 'closed' != status,
            $_btn = $( '.' + control.css_attr.open_pre_add_btn, control.container );

        $(this).toggleClass('open' , _is_expanded );
        //switch icons
        if ( _is_expanded )
          $_btn.find('.fa').removeClass('fa-plus-square').addClass('fa-minus-square');
        else
          $_btn.find('.fa').removeClass('fa-minus-square').addClass('fa-plus-square');

        //set the active class to the btn
        $_btn.toggleClass( 'active', _is_expanded );

        //set the adding_new class to the control container wrapper
        $( control.container ).toggleClass( control.css_attr.adding_new, _is_expanded );
        //make sure it's fully visible
        control._adjustScrollExpandedBlock( $(this), 120 );
      }
    } );
  },

  //Fired on "model_added_by_user"
  closeResetPreModel : function() {
    var control = this;
    control.toggleSuccessMessage('on');
    setTimeout( function() {
        control.czr_preModel('view_status').set( 'closed');
        control.czr_preModel('model').set(control.getDefaultModel());
        control.toggleSuccessMessage('off').destroyPreModelView();
      } , 3000);
  },

  toggleSuccessMessage : function(status) {
    var control = this,
        _message = control.modelAddedMessage,
        $_pre_add_wrapper = $('.' + control.css_attr.pre_add_wrapper, control.container );
        $_success_wrapper = $('.' + control.css_attr.pre_add_success, control.container );

    if ( 'on' == status ) {
      //write message
      $_success_wrapper.find('p').text(_message);

      //set various properties
      $_success_wrapper.css('z-index', 1000001 )
        .css('height', $_pre_add_wrapper.height() + 'px' )
        .css('line-height', $_pre_add_wrapper.height() + 'px');
    } else {
       $_success_wrapper.attr('style','');
    }
    control.container.toggleClass('czr-model-added', 'on' == status );
    return this;
  }
});//$.extend()
var CZRMultiplePickerMethods = CZRMultiplePickerMethods || {};
/* Multiple Picker */
/**
 * @constructor
 * @augments wp.customize.Control
 * @augments wp.customize.Class
 */
$.extend( CZRMultiplePickerMethods , {
  ready: function() {
    var control  = this,
        _select  = this.container.find('select');

    //handle case when all choices become unselected
    _select.on('change', function(e){
      if ( 0 === $(this).find("option:selected").length )
        control.setting.set([]);
    });
  }
});//$.extend
var CZRCroppedImageMethods = CZRCroppedImageMethods || {};

(function (api, $, _) {
  /* IMAGE UPLOADER CONTROL IN THE CUSTOMIZER */
  //CroppedImageControl is not available before wp 4.3
  if ( 'function' != typeof wp.media.controller.Cropper  || 'function' != typeof api.CroppedImageControl  )
    return;


    /* CZRCustomizeImage Cropper */
    /**
    * Custom version of:
    * wp.media.controller.CustomizeImageCropper (wp-includes/js/media-views.js)
    *
    * In order to use image destination sizes different than the suggested ones
    *
    * A state for cropping an image.
    *
    * @class
    * @augments wp.media.controller.Cropper
    * @augments wp.media.controller.State
    * @augments Backbone.Model
    */
    wp.media.controller.CZRCustomizeImageCropper = wp.media.controller.Cropper.extend({
      doCrop: function( attachment ) {
        var cropDetails = attachment.get( 'cropDetails' ),
            control = this.get( 'control' );

        cropDetails.dst_width  = control.params.dst_width;
        cropDetails.dst_height = control.params.dst_height;

        return wp.ajax.post( 'crop-image', {
            wp_customize: 'on',
            nonce: attachment.get( 'nonces' ).edit,
            id: attachment.get( 'id' ),
            context: control.id,
            cropDetails: cropDetails
        } );
      }
    });



    /* CZRCroppedImageControl */
    $.extend( CZRCroppedImageMethods , {
      /**
      * Create a media modal select frame, and store it so the instance can be reused when needed.
      * CZR: We don't want to crop svg (cropping fails), gif (animated gifs become static )
      * @Override
      * We need to override this in order to use our ImageCropper custom extension of wp.media.controller.Cropper
      *
      * See api.CroppedImageControl:initFrame() ( wp-admin/js/customize-controls.js )
      */
      initFrame: function() {

        var l10n = _wpMediaViewsL10n;

        this.frame = wp.media({
            button: {
                text: l10n.select,
                close: false
            },
            states: [
                new wp.media.controller.Library({
                    title: this.params.button_labels.frame_title,
                    library: wp.media.query({ type: 'image' }),
                    multiple: false,
                    date: false,
                    priority: 20,
                    suggestedWidth: this.params.width,
                    suggestedHeight: this.params.height
                }),
                new wp.media.controller.CZRCustomizeImageCropper({
                    imgSelectOptions: this.calculateImageSelectOptions,
                    control: this
                })
            ]
        });

        this.frame.on( 'select', this.onSelect, this );
        this.frame.on( 'cropped', this.onCropped, this );
        this.frame.on( 'skippedcrop', this.onSkippedCrop, this );
      },

      /**
      * After an image is selected in the media modal, switch to the cropper
      * state if the image isn't the right size.
      *
      * CZR: We don't want to crop svg (cropping fails), gif (animated gifs become static )
      * @Override
      * See api.CroppedImageControl:onSelect() ( wp-admin/js/customize-controls.js )
      */
      onSelect: function() {
        var attachment = this.frame.state().get( 'selection' ).first().toJSON();
        if ( ! ( attachment.mime && attachment.mime.indexOf("image") > -1 ) ){
          //Todo: better error handling, show some message?
          this.frame.trigger( 'content:error' );
          return;
        }
        if ( ( _.contains( ['image/svg+xml', 'image/gif'], attachment.mime ) ) || //do not crop gifs or svgs
                this.params.width === attachment.width && this.params.height === attachment.height && ! this.params.flex_width && ! this.params.flex_height ) {
            this.setImageFromAttachment( attachment );
            this.frame.close();
        } else {
            this.frame.setState( 'cropper' );
        }
      },
    });//Method definition

})( wp.customize, jQuery, _);
var CZRUploadMethods = CZRUploadMethods || {};

/**
 * @constructor
 * @augments wp.customize.Control
 * @augments wp.customize.Class
 */
$.extend( CZRUploadMethods, {
  ready: function() {
    var control = this;

    this.params.removed = this.params.removed || '';

    this.success = $.proxy( this.success, this );

    this.uploader = $.extend({
      container: this.container,
      browser:   this.container.find('.czr-upload'),
      //dropzone:  this.container.find('.upload-dropzone'),
      success:   this.success,
      plupload:  {},
      params:    {}
    }, this.uploader || {} );

    if ( control.params.extensions ) {
      control.uploader.plupload.filters = [{
        title:      api.l10n.allowedFiles,
        extensions: control.params.extensions
      }];
    }

    if ( control.params.context )
      control.uploader.params['post_data[context]'] = this.params.context;

    if ( api.settings.theme.stylesheet )
      control.uploader.params['post_data[theme]'] = api.settings.theme.stylesheet;

    this.uploader = new wp.Uploader( this.uploader );

    this.remover = this.container.find('.remove');
    this.remover.on( 'click keydown', function( event ) {
      if ( event.type === 'keydown' &&  13 !== event.which ) // enter
        return;
      control.setting.set( control.params.removed );
      event.preventDefault();
    });

    this.removerVisibility = $.proxy( this.removerVisibility, this );
    this.setting.bind( this.removerVisibility );
    this.removerVisibility( this.setting.get() );
  },
  success: function( attachment ) {
    this.setting.set( attachment.get('id') );
  },
  removerVisibility: function( to ) {
    this.remover.toggle( to != this.params.removed );
  }
});//method definition
var CZRLayoutSelectMethods = CZRLayoutSelectMethods || {};

$.extend( CZRLayoutSelectMethods , {
  ready: function() {
    this.setupSelect();
  },


  setupSelect : function( obj ) {
    var control = this;
        $_select  = this.container.find('select');

    function addImg( state ) {
      if (! state.id) { return state.text; }
      if ( ! _.has( control.params.layouts, state.element.value ) )
        return;

      var _layout_data = control.params.layouts[state.element.value],
          _src = _layout_data.src,
          _title = _layout_data.label,
          $state = $(
        '<img src="' + _src +'" class="czr-layout-img" title="' + _title + '" /><span class="czr-layout-title">' + _title + '</span>'
      );
      return $state;
    }

    //destroy selected if set
    //$_select.selecter("destroy");

    //fire select2
    $_select.select2( {
        templateResult: addImg,
        templateSelection: addImg,
        minimumResultsForSearch: Infinity
    });
  },
});//$.extend//wp.customize, jQuery, _
var CZRBackgroundMethods = CZRBackgroundMethods || {};

//@extends CZRMonoModelMethods
$.extend( CZRBackgroundMethods , {
  initialize: function( id, options ) {
          var control = this;
          api.CZRMonoModelControl.prototype.initialize.call( control, id, options );

          control.defaultModel = control.params.default_model;

          //EXTEND THE DEFAULT CONSTRUCTORS FOR INPUT AND MONOMODEL
          control.inputConstructor = api.CZRInput.extend( control.CZRBackgroundInputMethods || {} );
          control.modelConstructor = api.CZRMonoModel.extend( control.CZRBackgroundModelMethods || {} );

          //the map describing how to populate each particular select inputs
          control.select_map = {
              'background-repeat'     : $.extend( {'': serverControlParams.translatedStrings.selectBgRepeat}, control.params.bg_repeat_options ),
              'background-attachment' : $.extend( {'': serverControlParams.translatedStrings.selectBgAttachment}, control.params.bg_attachment_options ),
              'background-position'   : $.extend( {'': serverControlParams.translatedStrings.selectBgPosition}, control.params.bg_position_options ),
          };
  },//initialize

  //
  //to add :
  //handles the retrocompat with previous setting (only color, not array)
  //var current_setval = _.isString( api(control.id).get() ) ? { 'background-color': api(control.id).get() } : api(control.id).get();
  ready : function() {
          var control = this;
          api.CZRMonoModelControl.prototype.ready.call( control );

          api.bind('ready', function() {
                var _img_on_init = control.czr_Model('background-image').get();

                control.setBgDependantsVisibilities( ! _.isUndefined(_img_on_init) && ! _.isEmpty(_img_on_init) );

                control.czr_Model('background-image').bind(function(to, from) {
                  control.setBgDependantsVisibilities( ! _.isUndefined(to) && ! _.isEmpty(to) );
                });

              });

  },


  //fired on 'background-image:changed' DOM EVENT
  //@param : bool
  setBgDependantsVisibilities : function( has_img ) {
          var control = this;
          _.each( ['background-repeat', 'background-attachment', 'background-position', 'background-size'], function( dep ) {
            control.czr_Model(dep).container.toggle( has_img );
          });
  },


  //this set of methods extends and overrides the prototype of api.CZRInput
  CZRBackgroundInputMethods : {

          ready : function() {
            var input = this;

            input.addActions(
              'input_event_map',
              {
                  trigger   : 'background-image:changed',
                  actions   : [ 'setBgDependantsVisibilities' ]
              },
              input
            );

            api.CZRInput.prototype.ready.call( input);
          },

          setupSelect : function( obj ) {
            var input      = this,
                control     = input.control;

            //generates the options
            if ( _.has(control.select_map, input.id ) )
              input._buildSelect( control.select_map[input.id] );

            $('select', input.container ).not('.no-selecter-js')
              .each( function() {
                $(this).selecter({
                //triggers a change event on the view, passing the newly selected value + index as parameters.
                // callback : function(value, index) {
                //   self.triggerSettingChange( window.event || {} , value, index); // first param is a null event.
                // }
                });
            });
          },

          _buildSelect: function ( select_options ) {
            var input       = this,
                control     = input.control;

            _.each( select_options, function( _label, _value ) {
                var _attributes = {
                    value : _value,
                    html  : _label
                  };
                if ( _value == input.get() )
                  $.extend( _attributes, { selected : "selected" } );

                $( 'select[data-type="'+ input.id +'"]', input.container ).append( $('<option>', _attributes) );
            });
          }
  },


  CZRBackgroundModelMethods : {
          //OVERRIDES THE PARENT METHOD TO ADD THE BG DEFAULT COLOR
          renderViewContent : function() {
                  //=> an array of objects
                  var monoModel = this,
                      control = this.model_control,
                      model = _.clone( monoModel.get() );

                  //do we have view content template script?
                  if ( 0 === $( '#tmpl-' + control.getTemplateEl( 'view-content', model ) ).length )
                    return this;

                  var  view_content_template = wp.template( control.getTemplateEl( 'view-content', model ) );

                  //do we have an html template and a control container?
                  if ( ! view_content_template || ! control.container )
                    return this;

                  //the view content
                  var extended_model = $.extend(
                      model,
                      { defaultBgColor : control.defaultModel['background-color'] || '#eaeaea' }
                    );

                  $( view_content_template( extended_model )).appendTo( $('.' + control.css_attr.view_content, obj.dom_el ) );

                  control.doActions( 'viewContentRendered' , obj.dom_el, obj );

                  return this;
          }
  }

});//$.extend//extends api.CZRMultiModelControl

var CZRWidgetAreasMethods = CZRWidgetAreasMethods || {};

$.extend( CZRWidgetAreasMethods, {
  initialize: function( id, options ) {
    //run the parent initialize
    api.CZRMultiModelControl.prototype.initialize.call( this, id, options );

    var control = this;
    //adds control specific actions
    control.addActions(
      'control_event_map',
      [
        //add a callback to pre model view => refresh the locations based on the preview insights
        {
            trigger   : 'pre_add_view_rendered',
            actions   : [ 'listenToPreModelViewExpand' ]
        },
        //display an alert for unavailable locations
        {
            trigger   : 'pre_model:locations:changed',
            actions   : ['mayBeDisplayPreModelAlert' ]
        },
         //setup the select list for the pre add dialog box
        {
            trigger   : 'pre_add_view_rendered',
            name      : 'pre_add_view_rendered',
            actions   : [ 'setupSelect' ]
        },
        {
            trigger   : 'after_writeViewTitle',
            actions   : [ 'writeSubtitleInfos' ]
        },
        //this action will refresh the preview with a delay
        {
            trigger   : 'after_sendModel',
            actions   : ['updateSectionTitle','setModelUpdateTimer']
        },
        //=> update the related control choice list with the new widget area
        //=> creates section, setting and control for the newly added widget area
        {
            trigger   : 'model_added_by_user',
            actions   : ['addWidgetSidebar', 'closePreModelAlert']
        },
        {
            trigger   : 'before_modelRemoved',
            actions   : ['removeWidgetSidebar']
        }
      ]
    );

    //extend each view event map
    control.addActions(
      'view_event_map', [
        {
            trigger   : 'locations:changed',
            actions   : [ 'mayBeDisplayModelAlert' ]
        },
        //setup the location alert for each model views
        {
            trigger   : 'after_viewSetup',
            actions   : [ 'setupLocationsApiListeners' ]
        },
        //add a callback to view => refresh the locations based on the preview insights
        {
            trigger   : 'after_viewSetup',
            actions   : [ 'listenToViewExpand' ]
        },
        {
            trigger   : 'viewContentRendered',
            actions   : [ 'setupSelect' ]
        }
      ]
    );

    //add a shortcut to the server side json properties
    control.contexts = _.has( options.params , 'sidebar_contexts') ? options.params.sidebar_contexts : {};

    //context match map
    control.context_match_map = {
      is_404 : '404',
      is_category : 'archive-category',
      is_home : 'home',
      is_page : 'page',
      is_search : 'search',
      is_single : 'single'
    };

    //extend the saved model property
    //adds the default widget zones
    control.savedModels = _.union(
      _.has(control.params, 'default_zones') ? control.params.default_zones : [],
      control.savedModels
    );

    control.locations = _.has( options.params , 'sidebar_locations') ? options.params.sidebar_locations : {};

    //declares a default model
    control.defaultMonoModel = {
      id : '',
      title : serverControlParams.translatedStrings.widgetZone,
      contexts : _.without( _.keys(control.contexts), '_all_' ),//the server list of contexts is an object, we only need the keys, whitout _all_
      locations : [ serverControlParams.defaultWidgetLocation ],
      description : ''
    };

    //overrides the default success message
    this.modelAddedMessage = serverControlParams.translatedStrings.widgetZoneAdded;

    //bind actions on widget panel expansion and widget zone section expansion
    this.setExpansionsCallbacks();

    //observe and react to sidebar insights from the preview frame
    this.listenToSidebarInsights();

    //AVAILABLE LOCATIONS FOR THE PRE MODEL
    //1) add an observable value to control.czr_preModel to handle the alert visibility
    control.czr_preModel.create('location_alert_view_state');
    control.czr_preModel('location_alert_view_state').set('closed');
    //2) add state listeners
    control.czr_preModel('location_alert_view_state').callbacks.add( function( to, from ) {
      var $view = control._getPreModelView();
      control._toggleLocationAlertExpansion( $view, to );
    });

    //AVAILABLE VALUES FOR THE MODELS
    control.czr_viewLocationAlert = new api.Values();
  },//initialize










  //called before rendering a view
  //overrides the default method to set a specific default view template if the model is a default setting
  //@return string
  getTemplateEl : function( type, model ) {
    var control = this, _el;
    //force view-content type to view-reduced if the model is a built-in (primary, secondary, footer-1, ...)
    if ( 'view' == type ) {
      type = ( _.has(model, 'is_builtin') && model.is_builtin ) ? 'view-reduced' : type;
    } else if ( 'view-content' == type ) {
      type = ( _.has(model, 'is_builtin') && model.is_builtin ) ? 'view-content-reduced' : type;
    }

    switch(type) {
      case 'view' :
        _el = control.viewTemplateEl;
        break;
      case 'view-content' :
        _el = control.viewContentTemplateEl;
        break;
      case 'view-reduced' :
        _el = 'customize-control-' + control.params.type + '-view-reduced';
        break;
      case 'view-content-reduced' :
        _el = 'customize-control-' + control.params.type + '-view-content-reduced';
        break;

    }
    if ( _.isEmpty(_el) ) {
      throw new Error( 'No valid template has been found in getTemplateEl()' );
    } else {
      return _el;
    }
  },


  //fired after writeViewTitle
  //Write html informations under the title : location(s) and context(s)
  writeSubtitleInfos : function(obj) {
    var control = this,
        _model = _.clone(obj.model),
        $_view = this.getViewEl(_model.id),
        _locations = [],
        _contexts = [],
        _html = '';

    if ( ! $_view.length )
      return;

    //generate the locations and the contexts text from the json data if exists
    _model.locations =_.isString(_model.locations) ? [_model.locations] : _model.locations;
    _.map( _model.locations, function( loc ) {
        if ( _.has( control.locations , loc ) )
          _locations.push(control.locations[loc]);
        else
          _locations.push(loc);
      }
    );

    //build the context list
    _model.contexts =_.isString(_model.contexts) ? [_model.contexts] : _model.contexts;

    //all contexts cases ?
    if ( control._hasModelAllContexts(_model.id) ) {
      _contexts.push(control.contexts._all_);
    } else {
      _.map( _model.contexts, function( con ) {
          if ( _.has( control.contexts , con ) )
            _contexts.push(control.contexts[con]);
          else
            _contexts.push(con);
        }
      );
    }

    //Translated strings
    var _locationText = serverControlParams.translatedStrings.locations,
        _contextText = serverControlParams.translatedStrings.contexts,
        _notsetText = serverControlParams.translatedStrings.notset;

    _locations = _.isEmpty( _locations ) ? '<span style="font-weight: bold;">' + _notsetText + '</span>' : _locations.join(', ');
    _contexts = _.isEmpty( _contexts ) ? '<span style="font-weight: bold;">' + _notsetText + '</span>' : _contexts.join(', ');

    //write the description if builtin
    //else, write the dynamic location
    // if ( _.has(_model, 'description') && _.has(_model, 'is_builtin') )
    //   _html =  _model.description + ' <strong>|</strong> <u>Contexts</u> : ' + _contexts;
    // else

    _html = '<u>' + _locationText + '</u> : ' + _locations + ' <strong>|</strong> <u>' + _contextText + '</u> : ' + _contexts;

    if ( ! $('.czr-zone-infos', $_view ).length ) {
      var $_zone_infos = $('<div/>', {
        class : [ 'czr-zone-infos' , control.css_attr.sortable_handle ].join(' '),
        html : _html
      });
      $( '.' + control.css_attr.view_buttons, $_view ).after($_zone_infos);
    } else {
      $('.czr-zone-infos', $_view ).html(_html);
    }
  },//writeSubtitleInfos


  //@return bool
  //takes the model unique id
  _hasModelAllContexts : function( id ) {
    var control = this,
        model = control.getModel(id),
        controlContexts = _.keys(control.contexts);

    if ( ! _.has(model, 'contexts') )
      return;

    if ( _.contains( model.contexts, '_all_') )
      return true;

    //case when model does not have _all_ but all the others
    return _.isEmpty( _.difference( _.without(controlContexts, '_all_') , model.contexts ) );
  },

  //@param contexts = array of contexts
  _getMatchingContexts : function( defaults ) {
    var control = this,
        _current = api.czr_wp_conditionals.get() || {},
        _matched = _.filter(control.context_match_map, function( hu, wp ) { return true === _current[wp]; });

    return _.isEmpty( _matched ) ? defaults : _matched;

  },










  //////////////////////////////////////////////////
  ///LOCATION LIST REFRESH AND WARNINGS
  //////////////////////////////////////////////////
  //this is fired just after the setupViewApiListeners
  //=> add a callback to refresh the availability status of the locations in the select location picker
  listenToViewExpand : function(obj) {
    var control = this;
    //add a state listener on expansion change
    control.czr_View(obj.model.id).callbacks.add( function( to, from ) {
      if ( -1 == to.indexOf('expanded') )//can take the expanded_noscroll value !
        return;

      var $view = control.getViewEl( obj.model.id );
      //refresh the location list
      control._setupLocationSelect( obj.model.id, $view, true );//true for refresh
      //refresh the location alert message
      control.mayBeDisplayModelAlert( obj );
    });
  },

  //fired on : pre_add_view_rendered
  listenToPreModelViewExpand : function(obj) {
    var control = this;
    //add state listener on pre model view
    control.czr_preModel('view_status').callbacks.add( function( to, from ) {
      if ( 'expanded' != to )
        return;
      //refresh the location list
      control._setupLocationSelect( obj.model.id, obj.dom_el , true );//true for refresh
      //refresh the location alert message
      control.mayBeDisplayPreModelAlert( obj );
    });
  },

  //////////////////////////////////////////////////
  /// ALERT FOR NOT AVAILABLE LOCATION
  //////////////////////////////////////////////////
  //fired on 'after_setupViewApiListeners'
  setupLocationsApiListeners : function(obj) {
    var control = this;
    control.czr_viewLocationAlert.create(obj.model.id);
    control.czr_viewLocationAlert(obj.model.id).set('closed');

    //add a state listener on expansion change
    control.czr_viewLocationAlert(obj.model.id).callbacks.add( function( to, from ) {
      var $view = control.getViewEl(obj.model.id);
      control._toggleLocationAlertExpansion( $view , to );
    });
  },

  //fired 'pre_model:locations:changed'
  //@param obj { dom_el: $() , model : {} )
  mayBeDisplayPreModelAlert : function(obj) {
    var control = this,
        _selected_locations = $('select[data-type="locations"]', obj.dom_el ).val(),
        available_locs = api.sidebar_insights('available_locations').get(),
        _unavailable = _.filter( _selected_locations, function( loc ) {
          return ! _.contains(available_locs, loc);
        });
    //if one of the selected location is not included in the available_locs, display an alert
    //Are we in a pre model case? let's check on what has triggered this action to know it
    control.czr_preModel('location_alert_view_state').set( ! _.isEmpty( _unavailable ) ? 'expanded' : 'closed' );

  },

  //fired on on view event map : 'locations:changed'
  //@param obj { dom_el: $() , model : {} )
  mayBeDisplayModelAlert : function(obj) {
    var control = this,
        _selected_locations = $('select[data-type="locations"]', obj.dom_el ).val(),
        available_locs = api.sidebar_insights('available_locations').get(),
        _unavailable = _.filter( _selected_locations, function( loc ) {
          return ! _.contains(available_locs, loc);
        });
    control.czr_viewLocationAlert(obj.model.id).set( ! _.isEmpty( _unavailable ) ? 'expanded' : 'closed' );
  },

  _toggleLocationAlertExpansion : function($view, to) {
    var $_alert_el = $view.find('.czr-location-alert');

    if ( ! $_alert_el.length ) {
      var _html = [
        '<span>' + serverControlParams.translatedStrings.locationWarning + '</span>',
        api.czr_getDocSearchLink( serverControlParams.translatedStrings.locationWarning ),
      ].join('');

      $_alert_el = $('<div/>', {
        class:'czr-location-alert',
        html:_html,
        style:"display:none"
      });

      $('select[data-type="locations"]', $view ).closest('div').after($_alert_el);
    }
    $_alert_el.slideToggle( {
      duration : 400
    });
  },

  //always fired on 'model_added_by_user'
  closePreModelAlert : function() {
    this.czr_preModel('location_alert_view_state').set('closed');
  },





  //////////////////////////////////////////////////
  ///SETUP SELECTS
  //////////////////////////////////////////////////
  //setup select on view_rendered|view_content_event_map
  setupSelect : function( obj ) {
    this._setupContextSelect( obj.model, obj.dom_el );
    this._setupLocationSelect( obj.model, obj.dom_el );
  },

  //helper
  _setupContextSelect : function( model, $view ) {
    var control = this;
    //generates the contexts options
    _.map( control.contexts, function( title, key ) {
      var _attributes = {
            value : key,
            html: title
          };
      if ( key == model.contexts || _.contains( model.contexts, key ) )
        $.extend( _attributes, { selected : "selected" } );

      $( 'select[data-type="contexts"]', $view ).append( $('<option>', _attributes) );
    });
    //fire select2
    $( 'select[data-type="contexts"]', $view ).select2();
  },


  //helper
  //the refresh param is a bool
  _setupLocationSelect : function( model, $view, refresh ) {
    var control = this;
        available_locs = api.sidebar_insights('available_locations').get();
    //generates the locations options
    //append them if not set yet
    if ( ! $( 'select[data-type="locations"]', $view ).children().length ) {
      _.map( control.locations, function( title, key ) {
        var _attributes = {
              value : key,
              html: title
            };

        if ( key == model.locations || _.contains( model.locations, key ) )
          $.extend( _attributes, { selected : "selected" } );

        $( 'select[data-type="locations"]', $view ).append( $('<option>', _attributes) );
      });
    }//if

    function setAvailability( state ) {
      if (! state.id) { return state.text; }
      if (  _.contains(available_locs, state.element.value) ) { return state.text; }
      var $state = $(
        '<span class="czr-unavailable-location fa fa-ban" title="' + serverControlParams.translatedStrings.unavailableLocation + '">&nbsp;&nbsp;' + state.text + '</span>'
      );
      return $state;
    }

    if ( refresh ) {
      $( 'select[data-type="locations"]', $view ).select2( "destroy" );
    }

    //fire select2
    $( 'select[data-type="locations"]', $view ).select2( {
      templateResult: setAvailability,
      templateSelection: setAvailability
    });
  },



  //fired on model_update
  //Don't hammer the preview with too many refreshs
  //2 seconds delay
  setModelUpdateTimer : function(obj) {
    var control = this;
    clearTimeout( $.data(this, 'modelUpdateTimer') );
    $.data(
      this,
      'modelUpdateTimer',
      setTimeout( function() {
        //refresh preview
        control.refreshPreview();
      } , 1000)
    );//$.data
  },


  //fired on 'after_sendModel'
  updateSectionTitle : function(obj) {
    var _sidebar_id = 'sidebar-widgets-' + obj.model.id,
        _new_title  = obj.model.title;
    //does this section exists ?
    if ( ! api.section.has(_sidebar_id) )
      return;

    //update the section title
    $('.accordion-section-title', api.section(_sidebar_id).container ).text(_new_title);

    //update the top title ( visible when inside the expanded section )
    $('.customize-section-title h3', api.section(_sidebar_id).container ).html(
      '<span class="customize-action">' + api.section(_sidebar_id).params.customizeAction + '</span>' + _new_title
    );
    // $('.customize-section-title h3', api.section(_sidebar_id).container )
    //   .append('<span>', {
    //       class: 'customize-section-back',
    //       html: api.section(_sidebar_id).params.customizeAction
    //     } )
    //   .append(_new_title);

    //remove and re-instanciate
    //=> works for the section but the controls are not activated anymore.
    //Should be easy to fix but useless to go further here. Jquery does the job.
    // var _params = _.clone( api.section(_sidebar_id).params );
    // _params.title = _new_title;
    // api.section(_sidebar_id).container.remove();
    // api.section.remove(_sidebar_id);
    // api.section.add( _sidebar_id, new api.sectionConstructor[_params.type]( _params.id ,{ params : _params } ) );

  },







  //DEPRECATED : THE CONTROLS TO SYNCHRONIZE HAVE BEEN REMOVED

  //fired on model_added_by_user and from the timer method
  //1) model_added, before renderView action
  //    when a new model is manually added ( isTrigger is undefined )
  //    => refresh the select options of the other controls using this collection
  //2) model_updated, before updateCollection
  // addControlOptions : function(obj) {
  //   var _controls = _.where( api.settings.controls, {section:"sidebars_select_sec"});
  //   _.map( _controls, function( _control ) {
  //       var $_select = api.control( _control.settings.default ).container.find('select');

  //       //if this option has already been added, simply updates its attributes
  //       if ( 1 === $_select.find('option[value="' + obj.model.id + '"]').length ) {
  //         $_select.find('option[value="' + obj.model.id + '"]').html(obj.model.title);
  //         $_select.selecter("destroy").selecter();
  //       } else {
  //         $_select.append( $('<option>', {value: obj.model.id, html:obj.model.title } ) ).selecter("destroy").selecter();
  //       }
  //   });//map
  // },

  //fired on model_removed
  // removeControlOptions : function(obj) {
  //   var _controls = _.where( api.settings.controls, {section:"sidebars_select_sec"});

  //   _.map( _controls, function( _control ) {
  //       var $_select = api.control( _control.settings.default ).container.find('select');

  //       if ( ! $_select.find('option[value="' + obj.model.id + '"]').length )
  //         return;

  //       $( 'option[value="' + obj.model.id +'"]', $_select).remove();
  //       $_select.selecter("destroy").selecter();
  //   });//map
  // },



  //fired on model_added_by_user
  //
  //can also be called statically when a dynamic sidebar is added in the preview
  //in this case the parameter are the sidebar data with id and name
  addWidgetSidebar : function( obj, sidebar_data ) {
    if ( ! _.isObject(obj) && isEmpty(sidebar_data) ) {
      throw new Error('No valid input were provided to add a new Widget Zone.');
    }


    //ADD the new sidebar to the existing collection
    //Clone the serverControlParams.defaultWidgetSidebar sidebar
    var _model        = ! _.isEmpty(obj) ? _.clone(obj.model) : sidebar_data;
        _new_sidebar  = _.isEmpty(obj) ? sidebar_data : $.extend(
          _.clone( _.findWhere( api.Widgets.data.registeredSidebars, { id: serverControlParams.defaultWidgetSidebar } ) ),
          {
            name : _model.title,
            id : _model.id
          }
        );

    //Add it to the backbone collection
    api.Widgets.registeredSidebars.add( _new_sidebar );

    //test if added:
    //api.Widgets.registeredSidebars.get('czr_sidebars_8');


    //ADD the sidebar section
    var _params = $.extend(
      _.clone( api.section( "sidebar-widgets-" + serverControlParams.defaultWidgetSidebar ).params ),
      {
        id : "sidebar-widgets-" + _model.id,
        instanceNumber: _.max(api.settings.sections, function(sec){ return sec.instanceNumber; }).instanceNumber + 1,
        sidebarId: _new_sidebar.id,
        title: _new_sidebar.name,
        description : 'undefined' != typeof(sidebar_data) ? sidebar_data.description : api.section( "sidebar-widgets-" + serverControlParams.defaultWidgetSidebar ).params.description,
        //always set the new priority to the maximum + 1 ( serverControlParams.dynWidgetSection is excluded from this calculation because it must always be at the bottom )
        priority: _.max( _.omit( api.settings.sections, serverControlParams.dynWidgetSection), function(sec){ return sec.instanceNumber; }).priority + 1,
      }
    );

    api.section.add( _params.id, new api.sectionConstructor[ _params.type ]( _params.id ,{ params : _params } ) );

    //add it to the static collection of settings
    api.settings.sections[ _params.id ] = _params.id;

    //ADD A SETTING
    //Clone the serverControlParams.defaultWidgetSidebar sidebar widget area setting
    var _new_set_id = 'sidebars_widgets['+_model.id+']',
        _new_set    = $.extend(
          _.clone( api.settings.settings['sidebars_widgets[' + serverControlParams.defaultWidgetSidebar + ']'] ),
          {
            value:[]
          }
        );

    //add it to the static collection of settings
    api.settings.settings[ _new_set_id ] = _new_set;

    //instanciate it
    api.create( _new_set_id, _new_set_id, _new_set.value, {
      transport: _new_set.transport,
      previewer: api.previewer,
      dirty: false
    } );



    //ADD A CONTROL
    var _cloned_control = $.extend(
          _.clone( api.settings.controls['sidebars_widgets[' + serverControlParams.defaultWidgetSidebar + ']'] ),
          {
            settings : { default : _new_set_id }
          }),
        _new_control = {};


    //replace  serverControlParams.defaultWidgetSidebar  by the new sidebar id
    _.map( _cloned_control, function( param, key ) {
      if ( 'string' == typeof(param) ) {
        param = param.replace( serverControlParams.defaultWidgetSidebar , _model.id );
      }
      _new_control[key] = param;
    });

    //set the instance number (no sure if needed)
    _new_control.instanceNumber = _.max(api.settings.controls, function(con){ return con.instanceNumber; }).instanceNumber + 1;

    //add it to the static collection of controls
    api.settings.controls[_new_set_id] = _new_control;

    //instanciate it
    api.control.add( _new_set_id, new api.controlConstructor[ _new_control.type ]( _new_set_id, {
      params: _new_control,
      previewer: api.previewer
    } ) );


    //say it to the control container
    //only if we are in an instanciated object => because this method can be accessed statically
    if ( _.has(this, 'container') )
      this.container.trigger( 'widget_zone_created', { model : _model, section_id : "sidebar-widgets-" + _model.id , setting_id : _new_set_id });

  },//addWidgetSidebar


  //fired on "after_modelRemoved"
  removeWidgetSidebar : function(obj) {
    var model = obj.model;

    //Remove this sidebar from the backbone collection
    api.Widgets.registeredSidebars.remove( model.id );

    //remove the section from the api values and the DOM if exists
    if ( api.section.has("sidebar-widgets-" + model.id) ) {
      //Remove the section container from the DOM
      api.section("sidebar-widgets-" + model.id).container.remove();
      //Remove the sidebar section from the api
      api.section.remove( "sidebar-widgets-" + model.id );
      //Remove this section from the static collection
      delete api.settings.sections[ "sidebar-widgets-" + model.id ];
    }

    //remove the setting from the api if exists
    if ( api.has('sidebars_widgets['+model.id+']') ) {
      //Remove this setting from the api
      api.remove( 'sidebars_widgets['+model.id+']' );
      //Remove this setting from the static collection
      delete api.settings.settings['sidebars_widgets['+model.id+']'];
    }

    //remove the widget control of this sidebar from the api and the DOM if exists
    if ( api.control.has('sidebars_widgets['+model.id+']') ) {
      //Remove the control container from the DOM
      api.control( 'sidebars_widgets['+model.id+']' ).container.remove();
      //Remove this control from the api
      api.control.remove( 'sidebars_widgets['+model.id+']' );
      //Remove it to the static collection of controls
      delete api.settings.controls['sidebars_widgets['+model.id+']'];
    }

    //say it
    this.container.trigger('widget_zone_removed', { model : obj.model, section_id : "sidebar-widgets-" + model.id , setting_id : 'sidebars_widgets['+model.id+']' });
  },





  /////////////////////////////////////////
  /// SET EXPANSION CALLBACKS FOR WIDGET PANEL AND WIDGET ZONE CREATION SECTION
  ////////////////////////////////////////
  setExpansionsCallbacks : function() {
    var control = this;
    //records the top margin value of the widgets panel on each expansion
    var fixTopMargin = new api.Values();
    fixTopMargin.create('fixed_for_current_session');
    fixTopMargin.create('value');

    api.section(serverControlParams.dynWidgetSection).fixTopMargin = fixTopMargin;
    api.section(serverControlParams.dynWidgetSection).fixTopMargin('fixed_for_current_session').set(false);

    //will be used for adjustments
    api.panel('widgets').expanded.callbacks.add( function(expanded) {
      var _top_margin = api.panel('widgets').container.find( '.control-panel-content' ).css('margin-top');
      api.section(serverControlParams.dynWidgetSection).fixTopMargin('value').set( _top_margin );

      var _section_content = api.section(serverControlParams.dynWidgetSection).container.find( '.accordion-section-content' ),
        _panel_content = api.panel('widgets').container.find( '.control-panel-content' ),
        _set_margins = function() {
          _section_content.css( 'margin-top', '' );
          _panel_content.css('margin-top', api.section(serverControlParams.dynWidgetSection).fixTopMargin('value').get() );
        };

      // Fix the top margin after reflow.
      api.bind( 'pane-contents-reflowed', _.debounce( function() {
        _set_margins();
      }, 150 ) );

    } );


    //Close all views on widget panl expansion/clos
    api.panel('widgets').expanded.callbacks.add( function(expanded) {
      control.closeAllViews();
      control.czr_preModel('view_status').set('closed');
    } );


    //change the expanded behaviour for the widget zone section
    api.section(serverControlParams.dynWidgetSection).expanded.callbacks.add( function(expanded) {
      var section =  api.section(serverControlParams.dynWidgetSection),
          container = section.container.closest( '.wp-full-overlay-sidebar-content' ),
          content = section.container.find( '.accordion-section-content' ),
          overlay = section.container.closest( '.wp-full-overlay' ),
          backBtn = section.container.find( '.customize-section-back' ),
          sectionTitle = section.container.find( '.accordion-section-title' ).first(),
          headerActionsHeight = $( '#customize-header-actions' ).height(),
          resizeContentHeight, expand, position, scroll;
      if ( expanded ) {
        overlay.removeClass( 'section-open' );
        content.css( 'height', 'auto' );
        //section.container.removeClass( 'open' );
        sectionTitle.attr( 'tabindex', '0' );
        content.css( 'margin-top', '' );
        container.scrollTop( 0 );
      }

      control.closeAllViews();

      content.slideToggle();
    });
  },//setExpansionsCallbacks()






  /////////////////////////////////////////
  /// LISTEN TO SIDEBAR INSIGHTS FROM THE PREVIEW FRAME
  /// REACT TO THEM
  ////////////////////////////////////////
  listenToSidebarInsights : function() {
    var control = this;

    //VISIBILITY BASED ON THE SIDEBAR INSIGHTS
    api.sidebar_insights('registered').callbacks.add( function( _registered_zones ) {
      var _current_collection = _.clone( control.czr_Model.czr_collection.get() );
      _.map(_current_collection, function( _model ) {
        if ( ! control.getViewEl(_model.id).length )
          return;

        control.getViewEl(_model.id).css('display' , _.contains( _registered_zones, _model.id ) ? 'block' : 'none' );
      });
    });

    //OPACITY SIDEBAR INSIGHTS BASED
    api.sidebar_insights('inactives').callbacks.add( function( _inactives_zones ) {
      var _current_collection = _.clone( control.czr_Model.czr_collection.get() );
      _.map(_current_collection, function( _model ) {
        if ( ! control.getViewEl(_model.id).length )
          return;

        if ( _.contains( _inactives_zones, _model.id ) ) {
          control.getViewEl( _model.id ).addClass('inactive');
          if ( ! control.getViewEl( _model.id ).find('.czr-inactive-alert').length )
            control.getViewEl( _model.id ).find('.czr-view-title').append(
              $('<span/>', {class : "czr-inactive-alert", html : " [ " + serverControlParams.translatedStrings.inactiveWidgetZone + " ]" })
            );
        }
        else {
          control.getViewEl( _model.id ).removeClass('inactive');
          if ( control.getViewEl( _model.id ).find('.czr-inactive-alert').length )
            control.getViewEl( _model.id ).find('.czr-inactive-alert').remove();
        }
      });
    });

    //WIDGET SIDEBAR CREATION BASED ON SIDEBAR INSIGHTS
    //react to a new register candidate(s) on preview refresh
    api.sidebar_insights('candidates').callbacks.add( function(_candidates) {
      if ( ! _.isArray(_candidates) )
        return;
      _.map( _candidates, function( _sidebar ) {
        if ( ! _.isObject(_sidebar) )
          return;
        //add this widget sidebar and the related setting and control.
        //Only if not added already
        if ( api.section.has("sidebar-widgets-" +_sidebar.id ) )
          return;

        //access the registration method statically
        api.CZRWidgetAreasControl.prototype.addWidgetSidebar( {}, _sidebar );
        //activate it if so
        if ( _.has( api.sidebar_insights('actives').get(), _sidebar.id ) && api.section.has("sidebar-widgets-" +_sidebar.id ) )
          api.section( "sidebar-widgets-" +_sidebar.id ).activate();
      });
    });
  },//listenToSidebarInsights()







  /////////////////////////////////////////
  /// OVERRIDEN METHODS
  ////////////////////////////////////////
  //fired in _toggleViewExpansion()
  //has to be overriden for the widget zones control because this control is embedded directly in a panel and not in a section
  //therefore the element to animate the scrollTop is not the section container but $('.wp-full-overlay-sidebar-content')
  _adjustScrollExpandedBlock : function( $_block_el, adjust ) {
    if ( ! $_block_el.length )
      return;
    var control = this,
        _currentScrollTopVal = $('.wp-full-overlay-sidebar-content').scrollTop(),
        _scrollDownVal,
        _adjust = adjust || 90;
    setTimeout( function() {
        if ( ( $_block_el.offset().top + $_block_el.height() + _adjust ) > $(window.top).height() ) {
          _scrollDownVal = $_block_el.offset().top + $_block_el.height() + _adjust - $(window.top).height();
          $('.wp-full-overlay-sidebar-content').animate({
              scrollTop:  _currentScrollTopVal + _scrollDownVal
          }, 600);
        }
    }, 50);
  },



  //overrides the parent class default model getter
  //=> add a dynamic title
  getDefaultModel : function(id) {
    var control = this,
        _current_collection = control.czr_Model.czr_collection.get(),
        _default = _.clone( control.defaultMonoModel ),
        _default_contexts = _default.contexts;
    return $.extend( _default, {
        title : 'Widget Zone ' +  ( _.size(_current_collection)*1 + 1 )
        //contexts : control._getMatchingContexts( _default_contexts )
      });
  },

});//$.extend()//extends api.CZRMultiModelControl

var CZRSocialMethods = CZRSocialMethods || {};

$.extend( CZRSocialMethods, {
  initialize: function( id, options ) {
          //run the parent initialize
          api.CZRMultiInputDynControl.prototype.initialize.call( this, id, options );

          var control = this;

          this.social_icons = [
            '500px',
            'adn',
            'amazon',
            'android',
            'angellist',
            'apple',
            'behance',
            'behance-square',
            'bitbucket',
            'bitbucket-square',
            'black-tie',
            'btc',
            'buysellads',
            'chrome',
            'codepen',
            'codiepie',
            'connectdevelop',
            'contao',
            'dashcube',
            'delicious',
            'delicious',
            'deviantart',
            'digg',
            'dribbble',
            'dropbox',
            'drupal',
            'edge',
            'empire',
            'expeditedssl',
            'facebook',
            'facebook',
            'facebook-f (alias)',
            'facebook-official',
            'facebook-square',
            'firefox',
            'flickr',
            'fonticons',
            'fort-awesome',
            'forumbee',
            'foursquare',
            'get-pocket',
            'gg',
            'gg-circle',
            'git',
            'github',
            'github',
            'github-alt',
            'github-square',
            'git-square',
            'google',
            'google',
            'google-plus',
            'google-plus-square',
            'google-wallet',
            'gratipay',
            'hacker-news',
            'houzz',
            'instagram',
            'internet-explorer',
            'ioxhost',
            'joomla',
            'jsfiddle',
            'lastfm',
            'lastfm-square',
            'leanpub',
            'linkedin',
            'linkedin',
            'linkedin-square',
            'linux',
            'maxcdn',
            'meanpath',
            'medium',
            'mixcloud',
            'modx',
            'odnoklassniki',
            'odnoklassniki-square',
            'opencart',
            'openid',
            'opera',
            'optin-monster',
            'pagelines',
            'paypal',
            'pied-piper',
            'pied-piper-alt',
            'pinterest',
            'pinterest-p',
            'pinterest-square',
            'product-hunt',
            'qq',
            'rebel',
            'reddit',
            'reddit-alien',
            'reddit-square',
            'renren',
            'rss',
            'rss-square',
            'safari',
            'scribd',
            'sellsy',
            'share-alt',
            'share-alt-square',
            'shirtsinbulk',
            'simplybuilt',
            'skyatlas',
            'skype',
            'slack',
            'slideshare',
            'soundcloud',
            'spotify',
            'stack-exchange',
            'stack-overflow',
            'steam',
            'steam-square',
            'stumbleupon',
            'stumbleupon',
            'stumbleupon-circle',
            'tencent-weibo',
            'trello',
            'tripadvisor',
            'tumblr',
            'tumblr-square',
            'twitch',
            'twitter',
            'twitter',
            'twitter-square',
            'usb',
            'viacoin',
            'vimeo',
            'vimeo-square',
            'vine',
            'vk',
            'weibo',
            'weixin',
            'whatsapp',
            'wikipedia-w',
            'windows',
            'wordpress',
            'xing',
            'xing-square',
            'yahoo',
            'yahoo',
            'y-combinator',
            'yelp',
            'youtube',
            'youtube-play',
            'youtube-square'
          ];


          //add the new property to the the parent
          //api.CZRMultiModelControl.prototype.initialize.apply( this, arguments );

          //adds specific actions for this control
          this.addActions(
            'control_event_map',
            [
              //setup the select list for the pre add dialog box
              {
                  trigger   : 'pre_add_view_rendered',
                  actions   : [ 'setupSelect' ]
              },
              {
                  trigger   : 'pre_model:social-icon:changed',
                  actions   : [ 'updatePreModelTitle' ]
              }
            ]
          );



          // this.addActions(
          //   'view_event_map',
          //   [
          //     {
          //         trigger   : 'viewContentRendered',
          //         actions   : [ 'setupSelect', 'setupColorPicker', 'setupIcheck' ]
          //     },
          //     {
          //         trigger   : 'social-icon:changed',
          //         actions   : [ 'updateModelInputs' ]
          //     }
          //   ]
          // );

          //EXTEND THE DEFAULT CONSTRUCTORS FOR INPUT
          control.inputConstructor = api.CZRInput.extend( control.CZRSocialsInputMethods || {} );

          //EXTEND THE DEFAULT CONSTRUCTORS FOR MONOMODEL
          control.modelConstructor = api.CZRMonoModel.extend( control.CZRSocialsMonoModel || {} );

          //declares a default model
          this.defaultMonoModel = {
            id : '',
            title : '' ,
            'social-icon' : '',
            'social-link' : '',
            'social-color' : serverControlParams.defaultSocialColor,
            'social-target' : 1
          };

          //overrides the default success message
          this.modelAddedMessage = serverControlParams.translatedStrings.socialLinkAdded;
  },//initialize






  CZRSocialsInputMethods : {
          ready : function() {
                  var input = this;

                  input.addActions(
                    'input_event_map',
                    {
                        trigger   : 'social-icon:changed',
                        actions   : [ 'updateModelInputs' ]
                    },
                    input
                  );

                  api.CZRInput.prototype.ready.call( input);
          },

          setupSelect : function() {
                var input      = this,
                    mono_model = input.mono_model,
                    control     = mono_model.model_control,
                    socialList = _.union( [serverControlParams.translatedStrings.selectSocialIcon], control.social_icons),
                    _model = mono_model.get();

                //generates the options
                _.each( socialList , function( icon_name, k ) {
                      var _value = ( 0 === k ) ? '' : 'fa-' + icon_name.toLowerCase(),
                          _attributes = {
                            value : _value,
                            html: control._capitalize(icon_name)
                          };
                      if ( _value == _model['social-icon'] )
                        $.extend( _attributes, { selected : "selected" } );

                      $( 'select[data-type="social-icon"]', input.container ).append( $('<option>', _attributes) );
                });

                function addIcon( state ) {
                  if (! state.id) { return state.text; }
                  var $state = $(
                    '<span class="fa ' + state.element.value.toLowerCase() + '">&nbsp;&nbsp;' + state.text + '</span>'
                  );
                  return $state;
                }

                //fire select2
                $( 'select[data-type="social-icon"]', input.container ).select2( {
                    templateResult: addIcon,
                    templateSelection: addIcon
                });
        },

        setupIcheck : function( obj ) {
                var input      = this;

                $( 'input[type=checkbox]', input.container ).each( function(e) {
                  if ( 0 !== $(this).closest('div[class^="icheckbox"]').length )
                    return;

                  $(this).iCheck({
                    checkboxClass: 'icheckbox_flat-grey',
                    checkedClass: 'checked',
                    radioClass: 'iradio_flat-grey',
                  })
                  .on( 'ifChanged', function(e){
                    $(this).val( false === $(this).is(':checked') ? 0 : 1 );
                    $(e.currentTarget).trigger('change');
                  });
                });
        },

        setupColorPicker : function( obj ) {
                var input      = this,
                    mono_model = input.mono_model,
                    control     = mono_model.model_control;

                $( 'input[data-type="social-color"]', input.container ).wpColorPicker( {
                  defaultColor : 'rgba(255,255,255,0.7)',
                  change : function( e, o ) {
                    //if the input val is not updated here, it's not detected right away.
                    //weird
                    //is there a "change complete" kind of event for iris ?
                    $(this).val(o.color.toString());
                    $(this).trigger('colorpickerchange');
                  }
                });
                //when the picker opens, it might be below the visible viewport.
                //No built-in event available to react on this in the wpColorPicker unfortunately
                $( 'input[data-type="social-color"]', input.container ).closest('div').on('click keydown', function() {
                  control._adjustScrollExpandedBlock( input.container );
                });
        },


        //ACTIONS ON ICON CHANGE
        //Fired on 'social-icon:changed' for existing models
        updateModelInputs : function() {
                var mono_model = this.mono_model,
                    control     = mono_model.model_control,
                    _new_model  = _.clone( mono_model.get() ),
                    _new_title  = control._capitalize( _new_model['social-icon'].replace('fa-', '') ),
                    _new_color  = serverControlParams.defaultSocialColor;

                //add text follow us... to the title
                _new_title = [ serverControlParams.translatedStrings.followUs, _new_title].join(' ');

                $('input[data-type="title"]', mono_model.container ).val( _new_title );
                $('input[data-type="social-link"]', mono_model.container ).val( '' );
                $('input[data-type="social-color"]', mono_model.container ).wpColorPicker('color', _new_color );

                //set the new val to the changed property
                _new_model.title = _new_title;
                _new_model['social-link'] = '';
                _new_model['social-color'] = _new_color;

                mono_model.set(_new_model);
        },

  },//CZRSocialsInputMethods






  CZRSocialsMonoModel : {
          _buildTitle : function( title, icon, color ) {
                  var mono_model = this,
                      control     = mono_model.model_control;

                  title = title || ( 'string' === typeof(icon) ? control._capitalize( icon.replace( 'fa-', '') ) : '' );
                  title = control._truncate(title, 20);
                  icon = icon || 'fa-' + control.social_icons[0];
                  color = color || serverControlParams.defaultSocialColor;

                  return '<div><span class="fa ' + icon + '" style="color:' + color + '"></span> ' + title + '</div>';
          },

          //overrides the default parent method by a custom one
          //at this stage, the model passed in the obj is up to date
          writeViewTitle : function( model ) {
                  var mono_model = this,
                      control     = mono_model.model_control;
                  var _title = control._capitalize( model['social-icon'].replace('fa-', '') );

                  $( '.' + control.css_attr.view_title , '#' + model.id ).html(
                    mono_model._buildTitle( _title, model['social-icon'], model['social-color'] )
                  );
          }

  },//CZRSocialsMonoModel




  _buildTitle : function( title, icon, color ) {
          title = title || ( 'string' === typeof(icon) ? this._capitalize( icon.replace( 'fa-', '') ) : '' );
          title = this._truncate(title, 20);
          icon = icon || 'fa-' + this.social_icons[0];
          color = color || serverControlParams.defaultSocialColor;

          return '<div><span class="fa ' + icon + '" style="color:' + color + '"></span> ' + title + '</div>';
  },

  //overrides the default parent method by a custom one
  //at this stage, the model passed in the obj is up to date
  writeViewTitle : function( obj ) {
    var _title = this._capitalize( obj.model['social-icon'].replace('fa-', '') );

    $( '.' + this.css_attr.view_title , '#' + obj.model.id ).html(
      this._buildTitle( _title, obj.model['social-icon'], obj.model['social-color'] )
    );
  },

  //ACTIONS ON ICON CHANGE
  //Fired on 'social-icon:changed' for existing models
  updateModelInputs : function( obj ) {
    var control     = this,
        _new_model  = _.clone( obj.model ),
        _new_title  = control._capitalize( obj.model['social-icon'].replace('fa-', '') ),
        _new_color  = serverControlParams.defaultSocialColor;
    //add text follow us... to the title
    _new_title = [ serverControlParams.translatedStrings.followUs, _new_title].join(' ');

    $('input[data-type="title"]', obj.dom_el ).val( _new_title );
    $('input[data-type="social-link"]', obj.dom_el ).val( '' );
    $('input[data-type="social-color"]', obj.dom_el ).wpColorPicker('color', _new_color );

    //set the new val to the changed property
    _new_model.title = _new_title;
    _new_model['social-link'] = '';
    _new_model['social-color'] = _new_color;

    control.czr_Model(obj.model.id).set(_new_model);
  },


  //Fired on pre_model:social-icon:changed
  updatePreModelTitle : function(obj) {
    var control = this,
        _new_title  = control._capitalize( obj.model['social-icon'].replace('fa-', '') ),
        _new_model = control.czr_preModel('model').get();
    _new_model.title = [ serverControlParams.translatedStrings.followUs, _new_title].join(' ');
    control.czr_preModel('model').set(_new_model);
  },




  setupSelect : function( obj ) {
          var control = this,
              socialList = _.union( [serverControlParams.translatedStrings.selectSocialIcon], control.social_icons);

          //generates the options
          _.map( socialList , function( icon_name, k ) {
            var _value = ( 0 === k ) ? '' : 'fa-' + icon_name.toLowerCase(),
                _attributes = {
                  value : _value,
                  html: control._capitalize(icon_name)
                };
            if ( _value == obj.model['social-icon'] )
              $.extend( _attributes, { selected : "selected" } );

            $( 'select[data-type="social-icon"]', obj.dom_el ).append( $('<option>', _attributes) );
          });

          function addIcon( state ) {
            if (! state.id) { return state.text; }
            var $state = $(
              '<span class="fa ' + state.element.value.toLowerCase() + '">&nbsp;&nbsp;' + state.text + '</span>'
            );
            return $state;
          }

          //fire select2
          $( 'select[data-type="social-icon"]', obj.dom_el ).select2( {
              templateResult: addIcon,
              templateSelection: addIcon
          });
  },


  setupColorPicker : function( obj ) {
    var control = this;
    $( 'input[data-type="social-color"]', obj.dom_el ).wpColorPicker( {
      defaultColor : 'rgba(255,255,255,0.7)',
      change : function( e, o ) {
        //if the input val is not updated here, it's not detected right away.
        //weird
        //is there a "change complete" kind of event for iris ?
        $(this).val(o.color.toString());
        $(this).trigger('colorpickerchange');
      }
    });
    //when the picker opens, it might be below the visible viewport.
    //No built-in event available to react on this in the wpColorPicker unfortunately
    $( 'input[data-type="social-color"]', obj.dom_el ).closest('div').on('click keydown', function() {
      control._adjustScrollExpandedBlock( obj.dom_el );
    });
  },

  setupIcheck : function( obj ) {
    $( 'input[type=checkbox]', obj.dom_el ).each( function(e) {
      if ( 0 !== $(this).closest('div[class^="icheckbox"]').length )
        return;

      $(this).iCheck({
        checkboxClass: 'icheckbox_flat-grey',
        checkedClass: 'checked',
        radioClass: 'iradio_flat-grey',
      })
      .on( 'ifChanged', function(e){
        $(this).val( false === $(this).is(':checked') ? 0 : 1 );
        $(e.currentTarget).trigger('change');
      });
    });
  }

});//extends api.CZRMultiModelControl

var CZRSektionsMethods = CZRSektionsMethods || {};

$.extend( CZRSektionsMethods, {
  initialize: function( id, options ) {

    //run the parent initialize
    api.CZRMultiModelControl.prototype.initialize.call( this, id, options );
    var control = this;

    //declares a default model
    control.defaultMonoModel = {
      id : '',
      'sektion-layout' : 1,
    };
    //adds specific actions for this control
    // this.addActions(
    //   'control_event_map',
    //   [
    //     //setup the select list for the pre add dialog box
    //     {
    //         trigger   : 'pre_add_view_rendered',
    //         actions   : [ 'setupSelect' ]
    //     }
    //   ]
    // );

    // this.addActions(
    //   'view_event_map',
    //   [
    //     {
    //         trigger   : 'viewContentRendered',
    //         actions   : [ 'setupSelect', 'setupColorPicker', 'setupIcheck' ]
    //     },
    //     {
    //         trigger   : 'social-icon:changed',
    //         actions   : [ 'updateModelInputs' ]
    //     }
    //   ]
    // );



    //EXAMPLE : control.czr_Model(obj.model.id).set(_new_model);
    //
    //overrides the default success message
    //this.modelAddedMessage = serverControlParams.translatedStrings.socialLinkAdded;
  },//initialize

  //renders saved models views and attach event handlers
  //the saved model look like :
  //array[ { id : 'sidebar-one', title : 'A Title One' }, {id : 'sidebar-two', title : 'A Title Two' }]
  renderViewContent : function( obj ) {
        //=> an array of objects
        var control = this,
            model = _.clone(obj.model);

        //do we have view content template script?
        if ( 0 === $( '#tmpl-' + control.getTemplateEl( 'view-content', model ) ).length )
          return this;

        var  view_content_template = wp.template( control.getTemplateEl( 'view-content', model ) );

        //do we have an html template and a control container?
        if ( ! view_content_template || ! control.container )
          return this;

        //the view content
        $( view_content_template( model )).appendTo( $('.' + control.css_attr.view_content, obj.dom_el ) );

        //Renders the blocks
        control.renderSektionBlocks(obj);

        control.doActions( 'viewContentRendered' , obj.dom_el, obj );

        return this;
  },


  renderSektionBlocks : function(obj) {
    var control   = this,
        model     = control.czr_Model(obj.model.id).get(),
        block_nb  = parseInt( model['sektion-layout'] || 1, 10 );

    for (var blk = 1; blk < block_nb + 1; blk++) {
      $view     = $( wp.template('customize-control-czr_sektions-block')( {'block-id' : blk}) );
      $view.appendTo( $('.' + control.css_attr.view_content, obj.dom_el ) );
      console.log('ALORS?', blk );
    }
  }


});// (function (api, $, _) {
//   //Add the DOM helpers (addAction, ...) to the Control Base Class + Input Base Class
//   $.extend( CZRBaseControlMethods, api.CZR_Dom || {} );
//   $.extend( CZRInputMethods, api.CZR_Dom || {} );

//   //INPUTS => used as constructor when creating the collection of inputs
//   api.CZRInput                 = api.Value.extend( CZRInputMethods || {} );

//   //MODELS => used as constructor when creating the collection of models
//   //api.CZRMonoModel             = api.Value.extend( CZRMonoModelMethods || {} );

//   //CONTROLS
//   api.CZRBaseControl           = api.Control.extend( CZRBaseControlMethods || {} );
//   api.CZRMultiModelControl     = api.CZRBaseControl.extend( CZRMultiModelMethods || {} );
//   //api.CZRMonoModelControl      = api.CZRBaseControl.extend( CZRMonoModelMethods || {} );

//   //api.CZRBackgroundControl     = api.CZRMonoModelControl.extend( CZRBackgroundMethods || {} );

//   api.CZRWidgetAreasControl    = api.CZRMultiModelControl.extend( CZRWidgetAreasMethods || {} );
//   api.CZRSocialControl         = api.CZRMultiModelControl.extend( CZRSocialMethods || {} );

//   api.CZRUploadControl         = api.Control.extend( CZRUploadMethods || {} );
//   api.CZRLayoutControl         = api.Control.extend( CZRLayoutSelectMethods || {} );
//   api.CZRMultiplePickerControl = api.Control.extend( CZRMultiplePickerMethods || {} );

//   api.CZRSektionsControl       = api.CZRMultiModelControl.extend( CZRSektionsMethods || {} );

//   $.extend( api.controlConstructor, {
//     czr_upload     : api.CZRUploadControl,
//     czr_sidebars   : api.CZRWidgetAreasControl,
//     czr_socials    : api.CZRSocialControl,
//     czr_multiple_picker : api.CZRMultiplePickerControl,
//     czr_layouts    : api.CZRLayoutControl,
//     //czr_background : api.CZRBackgroundControl,
//     czr_sektions   : api.CZRSektionsControl
//   });

//   if ( 'function' == typeof api.CroppedImageControl ) {
//     api.CZRCroppedImageControl   = api.CroppedImageControl.extend( CZRCroppedImageMethods || {} );

//     $.extend( api.controlConstructor, {
//       czr_cropped_image : api.CZRCroppedImageControl
//     });
//   }

// })( wp.customize, jQuery, _);


(function (api, $, _) {
  //Add the DOM helpers (addAction, ...) to the Control Base Class + Input Base Class
  $.extend( CZRBaseControlMethods, api.CZR_Dom || {} );
  $.extend( CZRInputMethods, api.CZR_Dom || {} );

  //INPUTS => used as constructor when creating the collection of inputs
  api.CZRInput                 = api.Value.extend( CZRInputMethods || {} );

  //MODELS => used as constructor when creating the collection of models
  api.CZRMonoModel             = api.Value.extend( CZRMonoModelMethods || {} );

  //CONTROLS
  api.CZRBaseControl           = api.Control.extend( CZRBaseControlMethods || {} );
  api.CZRMultiInputControl     = api.CZRBaseControl.extend( CZRMultiInputControlMethods || {} );
  api.CZRMultiInputDynControl  = api.CZRMultiInputControl.extend( CZRMultiInputDynMethods || {} );

  //api.CZRBackgroundControl     = api.CZRMonoModelControl.extend( CZRBackgroundMethods || {} );

  //api.CZRWidgetAreasControl    = api.CZRMultiInputDynControl.extend( CZRWidgetAreasMethods || {} );
  api.CZRSocialControl         = api.CZRMultiInputDynControl.extend( CZRSocialMethods || {} );

  api.CZRUploadControl         = api.Control.extend( CZRUploadMethods || {} );
  api.CZRLayoutControl         = api.Control.extend( CZRLayoutSelectMethods || {} );
  api.CZRMultiplePickerControl = api.Control.extend( CZRMultiplePickerMethods || {} );

  //api.CZRSektionsControl       = api.CZRMultiInputDynControl.extend( CZRSektionsMethods || {} );

  $.extend( api.controlConstructor, {
    czr_upload     : api.CZRUploadControl,
    //czr_sidebars   : api.CZRWidgetAreasControl,
    czr_socials    : api.CZRSocialControl,
    czr_multiple_picker : api.CZRMultiplePickerControl,
    czr_layouts    : api.CZRLayoutControl,
    //czr_background : api.CZRBackgroundControl,
    //czr_sektions   : api.CZRSektionsControl
  });

  if ( 'function' == typeof api.CroppedImageControl ) {
    api.CZRCroppedImageControl   = api.CroppedImageControl.extend( CZRCroppedImageMethods || {} );

    $.extend( api.controlConstructor, {
      czr_cropped_image : api.CZRCroppedImageControl
    });
  }

})( wp.customize, jQuery, _);
(function (api, $, _) {
  var $_nav_section_container,
      translatedStrings = serverControlParams.translatedStrings || {};

  api.bind( 'ready' , function() {
    api.czr_visibilities = new api.CZR_visibilities();
  } );

  api.CZR_visibilities = api.Class.extend( {
          controlDeps : {},
          initialize: function() {
                var self = this;
                //store the default control dependencies
                this.controlDeps = _.extend( this.controlDeps, this._getControlDeps() );
                this._setControlVisibilities();
                //favicon note on load and on change(since wp 4.3)
                this._handleFaviconNote();

          },

          //bind all actions to wp.customize ready event
          //map each setting with its dependencies
          _setControlVisibilities : function() {
                var self = this;
                _.map( self.controlDeps , function( opts , setId ) {
                  self._prepare_visibilities( setId, opts );
                });
          },

          /*
          * Main control dependencies object
          */
          _getControlDeps : function() {
            return {};
          },

          /*****************************************************************************
          * HELPERS
          *****************************************************************************/
          /*
          * find the setId key in the _controlDependencies object
          * get the controls, merge show and hide if needed
          * return an []
          */
          _get_dependants : function( setId ) {
                if ( ! this.controlDeps[setId] )
                  return [];
                var _dependants = this.controlDeps[setId];

                if ( _dependants.show && _dependants.hide )
                  return _.union(_dependants.show.controls , _dependants.hide.controls);
                if ( _dependants.show && ! _dependants.hide )
                  return _dependants.show.controls;
                if ( ! _dependants.show && _dependants.hide )
                  return _dependants.hide.controls;

                return _dependants.controls;
          },

          /*
          * @return string hide or show. default is hide
          */
          _get_visibility_action : function ( setId , depSetId ) {
                if ( ! this.controlDeps[setId] )
                  return 'both';
                var _dependants = this.controlDeps[setId];
                if ( _dependants.show && -1 != _.indexOf( _dependants.show.controls, depSetId ) )
                  return 'show';
                if ( _dependants.hide && -1 != _.indexOf( _dependants.hide.controls, depSetId ) )
                  return 'hide';
                return 'both';
          },


          _get_visibility_cb : function( setId , _action ) {
                if ( ! this.controlDeps[setId] )
                  return;
                var _dependants = this.controlDeps[setId];
                if ( ! _dependants[_action] )
                  return _dependants.callback;
                return (_dependants[_action]).callback;
          },


          _check_cross_dependant : function( setId, depSetId ) {
                if ( ! this.controlDeps[setId] )
                  return true;
                var _dependants = this.controlDeps[setId];
                if ( ! _dependants.cross || ! _dependants.cross[depSetId] )
                  return true;
                var _cross  = _dependants.cross[depSetId],
                    _id     = _cross.master,
                    _cb     = _cross.callback;

                _id = api.czr_build_setId(_id);
                //if _cb returns true => show
                return _cb( api.instance(_id).get() );
              },

          /*
          * @return void
          * show or hide setting according to the dependency + callback pair
          */
          _prepare_visibilities : function( setId, o ) {
                var self = this;
                api( api.czr_build_setId(setId) , function (setting) {
                  var _params = {
                    setting   : setting,
                    setId : setId,
                    controls  : self._get_dependants(setId),
                  };
                  _.map( _params.controls , function( depSetId ) {
                    self._set_single_dependant_control_visibility( depSetId , _params);
                  } );
                });
          },



          _set_single_dependant_control_visibility : function( depSetId , _params ) {
                var self = this;
                api.control( api.czr_build_setId(depSetId) , function (control) {
                  var _visibility = function (to) {
                    var _action   = self._get_visibility_action( _params.setId , depSetId ),
                        _callback = self._get_visibility_cb( _params.setId , _action ),
                        _bool     = false;

                    if ( 'show' == _action && _callback(to, depSetId, _params.setId ) )
                      _bool = true;
                    if ( 'hide' == _action && _callback(to, depSetId, _params.setId ) )
                      _bool = false;
                    if ( 'both' == _action )
                      _bool = _callback(to, depSetId, _params.setId );

                    //check if there are any cross dependencies to look at
                    //_check_cross_dependant return true if there are no cross dependencies.
                    //if cross dependency :
                    //1) return true if we must show, false if not.
                    _bool = self._check_cross_dependant( _params.setId, depSetId ) && _bool;
                    control.container.toggle( _bool );
                  };//_visibility()



                  _visibility( _params.setting.get() );
                  _params.setting.bind( _visibility );
                });
          },

          /**
          * Fired on api ready
          * May change the site_icon description on load
          * May add a callback to site_icon
          * @return void()
          */
          _handleFaviconNote : function() {
                var self = this;
                //do nothing if (||)
                //1) WP version < 4.3 where site icon has been introduced
                //2) User had not defined a favicon
                //3) User has already set WP site icon
                if ( ! api.has('site_icon') || ! api.control('site_icon') || ( api.has(api.czr_build_setId(serverControlParams.faviconOptionName)) && 0 === + api( api.czr_build_setId(serverControlParams.faviconOptionName) ).get() ) || + api('site_icon').get() > 0 )
                  return;

                var _oldDes     = api.control('site_icon').params.description;
                    _newDes     = ['<strong>' , translatedStrings.faviconNote || '' , '</strong><br/><br/>' ].join('') + _oldDes;

                //on api ready
                self._printFaviconNote(_newDes );

                //on site icon change
                api('site_icon').callbacks.add( function(to) {
                  if ( +to > 0 ) {
                    //reset the description to default
                    api.control('site_icon').container.find('.description').text(_oldDes);
                    //reset the previous favicon setting
                    if ( api.has( api.czr_build_setId(serverControlParams.faviconOptionName) ) )
                      api( api.czr_build_setId(serverControlParams.faviconOptionName) ).set("");
                  }
                  else {
                    self._printFaviconNote(_newDes );
                  }
                });
          },

          //Add a note to the WP control description if user has already defined a favicon
          _printFaviconNote : function( _newDes ) {
                api.control('site_icon').container.find('.description').html(_newDes);
          }
    }
  );//api.Class.extend() //api.CZR_visibilities

})( wp.customize, jQuery, _);//DOM READY :
//1) FIRE SPECIFIC INPUT PLUGINS
//2) ADD SOME COOL STUFFS
//3) SPECIFIC CONTROLS ACTIONS
(function (wp, $) {
  $( function($) {
    var api = wp.customize || api;

    //WHAT IS HAPPENING IN THE MESSENGER
    // $(window.parent).on( 'message', function(e, o) {
    //   console.log('SENT STUFFS', JSON.parse( e.originalEvent.data), e );
    // });
    // $( window ).on( 'message', function(e, o) {
    //   console.log('INCOMING MESSAGE', JSON.parse( e.originalEvent.data), e );
    // });
    // $(window.document).bind("ajaxSend", function(e, o){
    //    console.log('AJAX SEND', e, arguments );
    // }).bind("ajaxComplete", function(e, o){
    //    console.log('AJAX COMPLETE', e, o);
    // });


    /* RECENTER CURRENT SECTIONS */
    $('.accordion-section').not('.control-panel').click( function () {
      _recenter_current_section($(this));
    });

    function _recenter_current_section( section ) {
      var $siblings               = section.siblings( '.open' );
      //check if clicked element is above or below sibling with offset.top
      if ( 0 !== $siblings.length &&  $siblings.offset().top < 0 ) {
        $('.wp-full-overlay-sidebar-content').animate({
              scrollTop:  - $('#customize-theme-controls').offset().top - $siblings.height() + section.offset().top + $('.wp-full-overlay-sidebar-content').offset().top
        }, 700);
      }
    }//end of fn


    /* CHECKBOXES */
    api.czrSetupCheckbox = function( controlId, refresh ) {
      $('input[type=checkbox]', api.control(controlId).container ).each( function() {
        //first fix the checked / unchecked status
        if ( 0 === $(this).val() || '0' == $(this).val() || 'off' == $(this).val() || _.isEmpty($(this).val() ) ) {
          $(this).prop('checked', false);
        } else {
          $(this).prop('checked', true);
        }

        //then render icheck if not done already
        if ( 0 !== $(this).closest('div[class^="icheckbox"]').length )
          return;

        $(this).iCheck({
          checkboxClass: 'icheckbox_flat-grey',
          //checkedClass: 'checked',
          radioClass: 'iradio_flat-grey',
        })
        .on( 'ifChanged', function(e){
          $(this).val( false === $(this).is(':checked') ? 0 : 1 );
          $(e.currentTarget).trigger('change');
        });
      });
    };//api.czrSetupCheckbox()

    /* SELECT INPUT */
    api.czrSetupSelect = function(controlId, refresh) {
      //Exclude no-selecter-js
      $('select[data-customize-setting-link]', api.control(controlId).container ).not('.no-selecter-js')
        .each( function() {
          $(this).selecter({
          //triggers a change event on the view, passing the newly selected value + index as parameters.
          // callback : function(value, index) {
          //   self.triggerSettingChange( window.event || {} , value, index); // first param is a null event.
          // }
          });
      });
    };//api.czrSetupSelect()


    /* NUMBER INPUT */
    api.czrSetupStepper = function(controlId, refresh) {
      //Exclude no-selecter-js
      $('input[type="number"]', api.control(controlId).container ).each( function() {
          $(this).stepper();
      });
    };//api.czrSetupStepper()

    api.control.each(function(control){
      if ( ! _.has(control,'id') )
        return;
      //exclude widget controls for checkboxes
      if ('widget' != control.id.substring(0, 6) ) {
        api.czrSetupCheckbox(control.id);
      }
      api.czrSetupSelect(control.id);
      api.czrSetupStepper(control.id);
    });


    /* WIDGET PANEL ICON */
    if ( $('.control-panel-widgets').find('.accordion-section-title').first().length ) {
      $('.control-panel-widgets').find('.accordion-section-title').first().prepend(
        $('<span/>', {class:'fa fa-magic'} )
      );
    }
  });//end of $( function($) ) dom ready

})( wp, jQuery);