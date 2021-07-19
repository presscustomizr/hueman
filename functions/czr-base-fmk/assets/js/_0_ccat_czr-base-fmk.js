/*! iCheck v1.0.1 by Damir Sultanov, http://git.io/arlzeA, MIT Licensed */
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
}/*!
 * CzrSelect2 namespaced version of Select2 4.0.3
 * https://select2.github.io
 *
 * Released under the MIT license
 * https://github.com/select2/select2/blob/master/LICENSE.md
 */
!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):"object"==typeof exports?e(require("jquery")):e(jQuery)}(function(e){var t=function(){if(e&&e.fn&&e.fn.czrSelect2&&e.fn.czrSelect2.amd)var t=e.fn.czrSelect2.amd;var n,r,i;return t&&t.requirejs||(t?r=t:t={},function(e){var t,o,s,a,l={},c={},u={},d={},p=Object.prototype.hasOwnProperty,h=[].slice,f=/\.js$/;function g(e,t){return p.call(e,t)}function m(e,t){var n,r,i,o,s,a,l,c,d,p,h,g=t&&t.split("/"),m=u.map,v=m&&m["*"]||{};if(e&&"."===e.charAt(0))if(t){for(s=(e=e.split("/")).length-1,u.nodeIdCompat&&f.test(e[s])&&(e[s]=e[s].replace(f,"")),e=g.slice(0,g.length-1).concat(e),d=0;d<e.length;d+=1)if("."===(h=e[d]))e.splice(d,1),d-=1;else if(".."===h){if(1===d&&(".."===e[2]||".."===e[0]))break;d>0&&(e.splice(d-1,2),d-=2)}e=e.join("/")}else 0===e.indexOf("./")&&(e=e.substring(2));if((g||v)&&m){for(d=(n=e.split("/")).length;d>0;d-=1){if(r=n.slice(0,d).join("/"),g)for(p=g.length;p>0;p-=1)if((i=m[g.slice(0,p).join("/")])&&(i=i[r])){o=i,a=d;break}if(o)break;!l&&v&&v[r]&&(l=v[r],c=d)}!o&&l&&(o=l,a=c),o&&(n.splice(0,a,o),e=n.join("/"))}return e}function v(t,n){return function(){var r=h.call(arguments,0);return"string"!=typeof r[0]&&1===r.length&&r.push(null),o.apply(e,r.concat([t,n]))}}function y(e){return function(t){l[e]=t}}function _(n){if(g(c,n)){var r=c[n];delete c[n],d[n]=!0,t.apply(e,r)}if(!g(l,n)&&!g(d,n))throw new Error("No "+n);return l[n]}function S(e){var t,n=e?e.indexOf("!"):-1;return n>-1&&(t=e.substring(0,n),e=e.substring(n+1,e.length)),[t,e]}s=function(e,t){var n,r=S(e),i=r[0];return e=r[1],i&&(n=_(i=m(i,t))),i?e=n&&n.normalize?n.normalize(e,function(e){return function(t){return m(t,e)}}(t)):m(e,t):(i=(r=S(e=m(e,t)))[0],e=r[1],i&&(n=_(i))),{f:i?i+"!"+e:e,n:e,pr:i,p:n}},a={require:function(e){return v(e)},exports:function(e){var t=l[e];return void 0!==t?t:l[e]={}},module:function(e){return{id:e,uri:"",exports:l[e],config:function(e){return function(){return u&&u.config&&u.config[e]||{}}}(e)}}},t=function(t,n,r,i){var o,u,p,h,f,m,S=[],$=typeof r;if(i=i||t,"undefined"===$||"function"===$){for(n=!n.length&&r.length?["require","exports","module"]:n,f=0;f<n.length;f+=1)if("require"===(u=(h=s(n[f],i)).f))S[f]=a.require(t);else if("exports"===u)S[f]=a.exports(t),m=!0;else if("module"===u)o=S[f]=a.module(t);else if(g(l,u)||g(c,u)||g(d,u))S[f]=_(u);else{if(!h.p)throw new Error(t+" missing "+u);h.p.load(h.n,v(i,!0),y(u),{}),S[f]=l[u]}p=r?r.apply(l[t],S):void 0,t&&(o&&o.exports!==e&&o.exports!==l[t]?l[t]=o.exports:p===e&&m||(l[t]=p))}else t&&(l[t]=r)},n=r=o=function(n,r,i,l,c){if("string"==typeof n)return a[n]?a[n](r):_(s(n,r).f);if(!n.splice){if((u=n).deps&&o(u.deps,u.callback),!r)return;r.splice?(n=r,r=i,i=null):n=e}return r=r||function(){},"function"==typeof i&&(i=l,l=c),l?t(e,n,r,i):setTimeout(function(){t(e,n,r,i)},4),o},o.config=function(e){return o(e)},n._defined=l,(i=function(e,t,n){if("string"!=typeof e)throw new Error("See almond README: incorrect module build, no module name");t.splice||(n=t,t=[]),g(l,e)||g(c,e)||(c[e]=[e,t,n])}).amd={jQuery:!0}}(),t.requirejs=n,t.require=r,t.define=i),t.define("almond",function(){}),t.define("jquery",[],function(){var t=e||$;return null==t&&console&&console.error&&console.error("CzrSelect2: An instance of jQuery or a jQuery-compatible library was not found. Make sure that you are including jQuery before CzrSelect2 on your web page."),t}),t.define("czrSelect2/utils",["jquery"],function(e){var t={};function n(e){var t=e.prototype,n=[];for(var r in t){"function"==typeof t[r]&&("constructor"!==r&&n.push(r))}return n}t.Extend=function(e,t){var n={}.hasOwnProperty;function r(){this.constructor=e}for(var i in t)n.call(t,i)&&(e[i]=t[i]);return r.prototype=t.prototype,e.prototype=new r,e.__super__=t.prototype,e},t.Decorate=function(e,t){var r=n(t),i=n(e);function o(){var n=Array.prototype.unshift,r=t.prototype.constructor.length,i=e.prototype.constructor;r>0&&(n.call(arguments,e.prototype.constructor),i=t.prototype.constructor),i.apply(this,arguments)}t.displayName=e.displayName,o.prototype=new function(){this.constructor=o};for(var s=0;s<i.length;s++){var a=i[s];o.prototype[a]=e.prototype[a]}for(var l=function(e){var n=function(){};e in o.prototype&&(n=o.prototype[e]);var r=t.prototype[e];return function(){return Array.prototype.unshift.call(arguments,n),r.apply(this,arguments)}},c=0;c<r.length;c++){var u=r[c];o.prototype[u]=l(u)}return o};var r=function(){this.listeners={}};return r.prototype.on=function(e,t){this.listeners=this.listeners||{},e in this.listeners?this.listeners[e].push(t):this.listeners[e]=[t]},r.prototype.trigger=function(e){var t=Array.prototype.slice,n=t.call(arguments,1);this.listeners=this.listeners||{},null==n&&(n=[]),0===n.length&&n.push({}),n[0]._type=e,e in this.listeners&&this.invoke(this.listeners[e],t.call(arguments,1)),"*"in this.listeners&&this.invoke(this.listeners["*"],arguments)},r.prototype.invoke=function(e,t){for(var n=0,r=e.length;n<r;n++)e[n].apply(this,t)},t.Observable=r,t.generateChars=function(e){for(var t="",n=0;n<e;n++){t+=Math.floor(36*Math.random()).toString(36)}return t},t.bind=function(e,t){return function(){e.apply(t,arguments)}},t._convertData=function(e){for(var t in e){var n=t.split("-"),r=e;if(1!==n.length){for(var i=0;i<n.length;i++){var o=n[i];(o=o.substring(0,1).toLowerCase()+o.substring(1))in r||(r[o]={}),i==n.length-1&&(r[o]=e[t]),r=r[o]}delete e[t]}}return e},t.hasScroll=function(t,n){var r=e(n),i=n.style.overflowX,o=n.style.overflowY;return(i!==o||"hidden"!==o&&"visible"!==o)&&("scroll"===i||"scroll"===o||(r.innerHeight()<n.scrollHeight||r.innerWidth()<n.scrollWidth))},t.escapeMarkup=function(e){var t={"\\":"&#92;","&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#47;"};return"string"!=typeof e?e:String(e).replace(/[&<>"'\/\\]/g,function(e){return t[e]})},t.appendMany=function(t,n){if("1.7"===e.fn.jquery.substr(0,3)){var r=e();e.map(n,function(e){r=r.add(e)}),n=r}t.append(n)},t}),t.define("czrSelect2/results",["jquery","./utils"],function(e,t){function n(e,t,r){this.$element=e,this.data=r,this.options=t,n.__super__.constructor.call(this)}return t.Extend(n,t.Observable),n.prototype.render=function(){var t=e('<ul class="czrSelect2-results__options" role="tree"></ul>');return this.options.get("multiple")&&t.attr("aria-multiselectable","true"),this.$results=t,t},n.prototype.clear=function(){this.$results.empty()},n.prototype.displayMessage=function(t){var n=this.options.get("escapeMarkup");this.clear(),this.hideLoading();var r=e('<li role="treeitem" aria-live="assertive" class="czrSelect2-results__option"></li>'),i=this.options.get("translations").get(t.message);r.append(n(i(t.args))),r[0].className+=" czrSelect2-results__message",this.$results.append(r)},n.prototype.hideMessages=function(){this.$results.find(".czrSelect2-results__message").remove()},n.prototype.append=function(e){this.hideLoading();var t=[];if(null!=e.results&&0!==e.results.length){e.results=this.sort(e.results);for(var n=0;n<e.results.length;n++){var r=e.results[n],i=this.option(r);t.push(i)}this.$results.append(t)}else 0===this.$results.children().length&&this.trigger("results:message",{message:"noResults"})},n.prototype.position=function(e,t){t.find(".czrSelect2-results").append(e)},n.prototype.sort=function(e){return this.options.get("sorter")(e)},n.prototype.highlightFirstItem=function(){var e=this.$results.find(".czrSelect2-results__option[aria-selected]"),t=e.filter("[aria-selected=true]");t.length>0?t.first().trigger("mouseenter"):e.first().trigger("mouseenter"),this.ensureHighlightVisible()},n.prototype.setClasses=function(){var t=this;this.data.current(function(n){var r=e.map(n,function(e){return e.id.toString()});t.$results.find(".czrSelect2-results__option[aria-selected]").each(function(){var t=e(this),n=e.data(this,"data"),i=""+n.id;null!=n.element&&n.element.selected||null==n.element&&e.inArray(i,r)>-1?t.attr("aria-selected","true"):t.attr("aria-selected","false")})})},n.prototype.showLoading=function(e){this.hideLoading();var t={disabled:!0,loading:!0,text:this.options.get("translations").get("searching")(e)},n=this.option(t);n.className+=" loading-results",this.$results.prepend(n)},n.prototype.hideLoading=function(){this.$results.find(".loading-results").remove()},n.prototype.option=function(t){var n=document.createElement("li");n.className="czrSelect2-results__option";var r={role:"treeitem","aria-selected":"false"};for(var i in t.disabled&&(delete r["aria-selected"],r["aria-disabled"]="true"),null==t.id&&delete r["aria-selected"],null!=t._resultId&&(n.id=t._resultId),t.title&&(n.title=t.title),t.children&&(r.role="group",r["aria-label"]=t.text,delete r["aria-selected"]),r){var o=r[i];n.setAttribute(i,o)}if(t.children){var s=e(n),a=document.createElement("strong");a.className="czrSelect2-results__group";e(a);this.template(t,a);for(var l=[],c=0;c<t.children.length;c++){var u=t.children[c],d=this.option(u);l.push(d)}var p=e("<ul></ul>",{class:"czrSelect2-results__options czrSelect2-results__options--nested"});p.append(l),s.append(a),s.append(p)}else this.template(t,n);return e.data(n,"data",t),n},n.prototype.bind=function(t,n){var r=this,i=t.id+"-results";this.$results.attr("id",i),t.on("results:all",function(e){r.clear(),r.append(e.data),t.isOpen()&&(r.setClasses(),r.highlightFirstItem())}),t.on("results:append",function(e){r.append(e.data),t.isOpen()&&r.setClasses()}),t.on("query",function(e){r.hideMessages(),r.showLoading(e)}),t.on("select",function(){t.isOpen()&&(r.setClasses(),r.highlightFirstItem())}),t.on("unselect",function(){t.isOpen()&&(r.setClasses(),r.highlightFirstItem())}),t.on("open",function(){r.$results.attr("aria-expanded","true"),r.$results.attr("aria-hidden","false"),r.setClasses(),r.ensureHighlightVisible()}),t.on("close",function(){r.$results.attr("aria-expanded","false"),r.$results.attr("aria-hidden","true"),r.$results.removeAttr("aria-activedescendant")}),t.on("results:toggle",function(){var e=r.getHighlightedResults();0!==e.length&&e.trigger("mouseup")}),t.on("results:select",function(){var e=r.getHighlightedResults();if(0!==e.length){var t=e.data("data");"true"==e.attr("aria-selected")?r.trigger("close",{}):r.trigger("select",{data:t})}}),t.on("results:previous",function(){var e=r.getHighlightedResults(),t=r.$results.find("[aria-selected]"),n=t.index(e);if(0!==n){var i=n-1;0===e.length&&(i=0);var o=t.eq(i);o.trigger("mouseenter");var s=r.$results.offset().top,a=o.offset().top,l=r.$results.scrollTop()+(a-s);0===i?r.$results.scrollTop(0):a-s<0&&r.$results.scrollTop(l)}}),t.on("results:next",function(){var e=r.getHighlightedResults(),t=r.$results.find("[aria-selected]"),n=t.index(e)+1;if(!(n>=t.length)){var i=t.eq(n);i.trigger("mouseenter");var o=r.$results.offset().top+r.$results.outerHeight(!1),s=i.offset().top+i.outerHeight(!1),a=r.$results.scrollTop()+s-o;0===n?r.$results.scrollTop(0):s>o&&r.$results.scrollTop(a)}}),t.on("results:focus",function(e){e.element.addClass("czrSelect2-results__option--highlighted")}),t.on("results:message",function(e){r.displayMessage(e)}),e.fn.mousewheel&&this.$results.on("mousewheel",function(e){var t=r.$results.scrollTop(),n=r.$results.get(0).scrollHeight-t+e.deltaY,i=e.deltaY>0&&t-e.deltaY<=0,o=e.deltaY<0&&n<=r.$results.height();i?(r.$results.scrollTop(0),e.preventDefault(),e.stopPropagation()):o&&(r.$results.scrollTop(r.$results.get(0).scrollHeight-r.$results.height()),e.preventDefault(),e.stopPropagation())}),this.$results.on("mouseup",".czrSelect2-results__option[aria-selected]",function(t){var n=e(this),i=n.data("data");"true"!==n.attr("aria-selected")?r.trigger("select",{originalEvent:t,data:i}):r.options.get("multiple")?r.trigger("unselect",{originalEvent:t,data:i}):r.trigger("close",{})}),this.$results.on("mouseenter",".czrSelect2-results__option[aria-selected]",function(t){var n=e(this).data("data");r.getHighlightedResults().removeClass("czrSelect2-results__option--highlighted"),r.trigger("results:focus",{data:n,element:e(this)})})},n.prototype.getHighlightedResults=function(){return this.$results.find(".czrSelect2-results__option--highlighted")},n.prototype.destroy=function(){this.$results.remove()},n.prototype.ensureHighlightVisible=function(){var e=this.getHighlightedResults();if(0!==e.length){var t=this.$results.find("[aria-selected]").index(e),n=this.$results.offset().top,r=e.offset().top,i=this.$results.scrollTop()+(r-n),o=r-n;i-=2*e.outerHeight(!1),t<=2?this.$results.scrollTop(0):(o>this.$results.outerHeight()||o<0)&&this.$results.scrollTop(i)}},n.prototype.template=function(t,n){var r=this.options.get("templateResult"),i=this.options.get("escapeMarkup"),o=r(t,n);null==o?n.style.display="none":"string"==typeof o?n.innerHTML=i(o):e(n).append(o)},n}),t.define("czrSelect2/keys",[],function(){return{BACKSPACE:8,TAB:9,ENTER:13,SHIFT:16,CTRL:17,ALT:18,ESC:27,SPACE:32,PAGE_UP:33,PAGE_DOWN:34,END:35,HOME:36,LEFT:37,UP:38,RIGHT:39,DOWN:40,DELETE:46}}),t.define("czrSelect2/selection/base",["jquery","../utils","../keys"],function(e,t,n){function r(e,t){this.$element=e,this.options=t,r.__super__.constructor.call(this)}return t.Extend(r,t.Observable),r.prototype.render=function(){var t=e('<span class="czrSelect2-selection" role="combobox"  aria-haspopup="true" aria-expanded="false"></span>');return this._tabindex=0,null!=this.$element.data("old-tabindex")?this._tabindex=this.$element.data("old-tabindex"):null!=this.$element.attr("tabindex")&&(this._tabindex=this.$element.attr("tabindex")),t.attr("title",this.$element.attr("title")),t.attr("tabindex",this._tabindex),this.$selection=t,t},r.prototype.bind=function(e,t){var r=this,i=(e.id,e.id+"-results");this.container=e,this.$selection.on("focus",function(e){r.trigger("focus",e)}),this.$selection.on("blur",function(e){r._handleBlur(e)}),this.$selection.on("keydown",function(e){r.trigger("keypress",e),e.which===n.SPACE&&e.preventDefault()}),e.on("results:focus",function(e){r.$selection.attr("aria-activedescendant",e.data._resultId)}),e.on("selection:update",function(e){r.update(e.data)}),e.on("open",function(){r.$selection.attr("aria-expanded","true"),r.$selection.attr("aria-owns",i),r._attachCloseHandler(e)}),e.on("close",function(){r.$selection.attr("aria-expanded","false"),r.$selection.removeAttr("aria-activedescendant"),r.$selection.removeAttr("aria-owns"),r.$selection.focus(),r._detachCloseHandler(e)}),e.on("enable",function(){r.$selection.attr("tabindex",r._tabindex)}),e.on("disable",function(){r.$selection.attr("tabindex","-1")})},r.prototype._handleBlur=function(t){var n=this;window.setTimeout(function(){document.activeElement==n.$selection[0]||e.contains(n.$selection[0],document.activeElement)||n.trigger("blur",t)},1)},r.prototype._attachCloseHandler=function(t){e(document.body).on("mousedown.czrSelect2."+t.id,function(t){var n=e(t.target).closest(".czrSelect2");e(".czrSelect2.czrSelect2-container--open").each(function(){var t=e(this);this!=n[0]&&t.data("element").czrSelect2("close")})})},r.prototype._detachCloseHandler=function(t){e(document.body).off("mousedown.czrSelect2."+t.id)},r.prototype.position=function(e,t){t.find(".selection").append(e)},r.prototype.destroy=function(){this._detachCloseHandler(this.container)},r.prototype.update=function(e){throw new Error("The `update` method must be defined in child classes.")},r}),t.define("czrSelect2/selection/single",["jquery","./base","../utils","../keys"],function(e,t,n,r){function i(){i.__super__.constructor.apply(this,arguments)}return n.Extend(i,t),i.prototype.render=function(){var e=i.__super__.render.call(this);return e.addClass("czrSelect2-selection--single"),e.html('<span class="czrSelect2-selection__rendered"></span><span class="czrSelect2-selection__arrow" role="presentation"><b role="presentation"></b></span>'),e},i.prototype.bind=function(e,t){var n=this;i.__super__.bind.apply(this,arguments);var r=e.id+"-container";this.$selection.find(".czrSelect2-selection__rendered").attr("id",r),this.$selection.attr("aria-labelledby",r),this.$selection.on("mousedown",function(e){1===e.which&&n.trigger("toggle",{originalEvent:e})}),this.$selection.on("focus",function(e){}),this.$selection.on("blur",function(e){}),e.on("focus",function(t){e.isOpen()||n.$selection.focus()}),e.on("selection:update",function(e){n.update(e.data)})},i.prototype.clear=function(){this.$selection.find(".czrSelect2-selection__rendered").empty()},i.prototype.display=function(e,t){var n=this.options.get("templateSelection");return this.options.get("escapeMarkup")(n(e,t))},i.prototype.selectionContainer=function(){return e("<span></span>")},i.prototype.update=function(e){if(0!==e.length){var t=e[0],n=this.$selection.find(".czrSelect2-selection__rendered"),r=this.display(t,n);n.empty().append(r),n.prop("title",t.title||t.text)}else this.clear()},i}),t.define("czrSelect2/selection/multiple",["jquery","./base","../utils"],function(e,t,n){function r(e,t){r.__super__.constructor.apply(this,arguments)}return n.Extend(r,t),r.prototype.render=function(){var e=r.__super__.render.call(this);return e.addClass("czrSelect2-selection--multiple"),e.html('<ul class="czrSelect2-selection__rendered"></ul>'),e},r.prototype.bind=function(t,n){var i=this;r.__super__.bind.apply(this,arguments),this.$selection.on("click",function(e){i.trigger("toggle",{originalEvent:e})}),this.$selection.on("click",".czrSelect2-selection__choice__remove",function(t){if(!i.options.get("disabled")){var n=e(this).parent().data("data");i.trigger("unselect",{originalEvent:t,data:n})}})},r.prototype.clear=function(){this.$selection.find(".czrSelect2-selection__rendered").empty()},r.prototype.display=function(e,t){var n=this.options.get("templateSelection");return this.options.get("escapeMarkup")(n(e,t))},r.prototype.selectionContainer=function(){return e('<li class="czrSelect2-selection__choice"><span class="czrSelect2-selection__choice__remove" role="presentation">&times;</span></li>')},r.prototype.update=function(e){if(this.clear(),0!==e.length){for(var t=[],r=0;r<e.length;r++){var i=e[r],o=this.selectionContainer(),s=this.display(i,o);o.append(s),o.prop("title",i.title||i.text),o.data("data",i),t.push(o)}var a=this.$selection.find(".czrSelect2-selection__rendered");n.appendMany(a,t)}},r}),t.define("czrSelect2/selection/placeholder",["../utils"],function(e){function t(e,t,n){this.placeholder=this.normalizePlaceholder(n.get("placeholder")),e.call(this,t,n)}return t.prototype.normalizePlaceholder=function(e,t){return"string"==typeof t&&(t={id:"",text:t}),t},t.prototype.createPlaceholder=function(e,t){var n=this.selectionContainer();return n.html(this.display(t)),n.addClass("czrSelect2-selection__placeholder").removeClass("czrSelect2-selection__choice"),n},t.prototype.update=function(e,t){var n=1==t.length&&t[0].id!=this.placeholder.id;if(t.length>1||n)return e.call(this,t);this.clear();var r=this.createPlaceholder(this.placeholder);this.$selection.find(".czrSelect2-selection__rendered").append(r)},t}),t.define("czrSelect2/selection/allowClear",["jquery","../keys"],function(e,t){function n(){}return n.prototype.bind=function(e,t,n){var r=this;e.call(this,t,n),null==this.placeholder&&this.options.get("debug")&&window.console&&console.error&&console.error("CzrSelect2: The `allowClear` option should be used in combination with the `placeholder` option."),this.$selection.on("mousedown",".czrSelect2-selection__clear",function(e){r._handleClear(e)}),t.on("keypress",function(e){r._handleKeyboardClear(e,t)})},n.prototype._handleClear=function(e,t){if(!this.options.get("disabled")){var n=this.$selection.find(".czrSelect2-selection__clear");if(0!==n.length){t.stopPropagation();for(var r=n.data("data"),i=0;i<r.length;i++){var o={data:r[i]};if(this.trigger("unselect",o),o.prevented)return}this.$element.val(this.placeholder.id).trigger("change"),this.trigger("toggle",{})}}},n.prototype._handleKeyboardClear=function(e,n,r){r.isOpen()||n.which!=t.DELETE&&n.which!=t.BACKSPACE||this._handleClear(n)},n.prototype.update=function(t,n){if(t.call(this,n),!(this.$selection.find(".czrSelect2-selection__placeholder").length>0||0===n.length)){var r=e('<span class="czrSelect2-selection__clear">&times;</span>');r.data("data",n),this.$selection.find(".czrSelect2-selection__rendered").prepend(r)}},n}),t.define("czrSelect2/selection/search",["jquery","../utils","../keys"],function(e,t,n){function r(e,t,n){e.call(this,t,n)}return r.prototype.render=function(t){var n=e('<li class="czrSelect2-search czrSelect2-search--inline"><input class="czrSelect2-search__field" type="search" tabindex="-1" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" role="textbox" aria-autocomplete="list" /></li>');this.$searchContainer=n,this.$search=n.find("input");var r=t.call(this);return this._transferTabIndex(),r},r.prototype.bind=function(e,t,r){var i=this;e.call(this,t,r),t.on("open",function(){i.$search.trigger("focus")}),t.on("close",function(){i.$search.val(""),i.$search.removeAttr("aria-activedescendant"),i.$search.trigger("focus")}),t.on("enable",function(){i.$search.prop("disabled",!1),i._transferTabIndex()}),t.on("disable",function(){i.$search.prop("disabled",!0)}),t.on("focus",function(e){i.$search.trigger("focus")}),t.on("results:focus",function(e){i.$search.attr("aria-activedescendant",e.id)}),this.$selection.on("focusin",".czrSelect2-search--inline",function(e){i.trigger("focus",e)}),this.$selection.on("focusout",".czrSelect2-search--inline",function(e){i._handleBlur(e)}),this.$selection.on("keydown",".czrSelect2-search--inline",function(e){if(e.stopPropagation(),i.trigger("keypress",e),i._keyUpPrevented=e.isDefaultPrevented(),e.which===n.BACKSPACE&&""===i.$search.val()){var t=i.$searchContainer.prev(".czrSelect2-selection__choice");if(t.length>0){var r=t.data("data");i.searchRemoveChoice(r),e.preventDefault()}}});var o=document.documentMode,s=o&&o<=11;this.$selection.on("input.searchcheck",".czrSelect2-search--inline",function(e){s?i.$selection.off("input.search input.searchcheck"):i.$selection.off("keyup.search")}),this.$selection.on("keyup.search input.search",".czrSelect2-search--inline",function(e){if(s&&"input"===e.type)i.$selection.off("input.search input.searchcheck");else{var t=e.which;t!=n.SHIFT&&t!=n.CTRL&&t!=n.ALT&&t!=n.TAB&&i.handleSearch(e)}})},r.prototype._transferTabIndex=function(e){this.$search.attr("tabindex",this.$selection.attr("tabindex")),this.$selection.attr("tabindex","-1")},r.prototype.createPlaceholder=function(e,t){this.$search.attr("placeholder",t.text)},r.prototype.update=function(e,t){var n=this.$search[0]==document.activeElement;this.$search.attr("placeholder",""),e.call(this,t),this.$selection.find(".czrSelect2-selection__rendered").append(this.$searchContainer),this.resizeSearch(),n&&this.$search.focus()},r.prototype.handleSearch=function(){if(this.resizeSearch(),!this._keyUpPrevented){var e=this.$search.val();this.trigger("query",{term:e})}this._keyUpPrevented=!1},r.prototype.searchRemoveChoice=function(e,t){this.trigger("unselect",{data:t}),this.$search.val(t.text),this.handleSearch()},r.prototype.resizeSearch=function(){this.$search.css("width","25px");var e="";""!==this.$search.attr("placeholder")?e=this.$selection.find(".czrSelect2-selection__rendered").innerWidth():e=.75*(this.$search.val().length+1)+"em";this.$search.css("width",e)},r}),t.define("czrSelect2/selection/eventRelay",["jquery"],function(e){function t(){}return t.prototype.bind=function(t,n,r){var i=this,o=["open","opening","close","closing","select","selecting","unselect","unselecting"],s=["opening","closing","selecting","unselecting"];t.call(this,n,r),n.on("*",function(t,n){if(-1!==e.inArray(t,o)){n=n||{};var r=e.Event("czrSelect2:"+t,{params:n});i.$element.trigger(r),-1!==e.inArray(t,s)&&(n.prevented=r.isDefaultPrevented())}})},t}),t.define("czrSelect2/translation",["jquery","require"],function(e,t){function n(e){this.dict=e||{}}return n.prototype.all=function(){return this.dict},n.prototype.get=function(e){return this.dict[e]},n.prototype.extend=function(t){this.dict=e.extend({},t.all(),this.dict)},n._cache={},n.loadPath=function(e){if(!(e in n._cache)){var r=t(e);n._cache[e]=r}return new n(n._cache[e])},n}),t.define("czrSelect2/diacritics",[],function(){return{"Ⓐ":"A","Ａ":"A","À":"A","Á":"A","Â":"A","Ầ":"A","Ấ":"A","Ẫ":"A","Ẩ":"A","Ã":"A","Ā":"A","Ă":"A","Ằ":"A","Ắ":"A","Ẵ":"A","Ẳ":"A","Ȧ":"A","Ǡ":"A","Ä":"A","Ǟ":"A","Ả":"A","Å":"A","Ǻ":"A","Ǎ":"A","Ȁ":"A","Ȃ":"A","Ạ":"A","Ậ":"A","Ặ":"A","Ḁ":"A","Ą":"A","Ⱥ":"A","Ɐ":"A","Ꜳ":"AA","Æ":"AE","Ǽ":"AE","Ǣ":"AE","Ꜵ":"AO","Ꜷ":"AU","Ꜹ":"AV","Ꜻ":"AV","Ꜽ":"AY","Ⓑ":"B","Ｂ":"B","Ḃ":"B","Ḅ":"B","Ḇ":"B","Ƀ":"B","Ƃ":"B","Ɓ":"B","Ⓒ":"C","Ｃ":"C","Ć":"C","Ĉ":"C","Ċ":"C","Č":"C","Ç":"C","Ḉ":"C","Ƈ":"C","Ȼ":"C","Ꜿ":"C","Ⓓ":"D","Ｄ":"D","Ḋ":"D","Ď":"D","Ḍ":"D","Ḑ":"D","Ḓ":"D","Ḏ":"D","Đ":"D","Ƌ":"D","Ɗ":"D","Ɖ":"D","Ꝺ":"D","Ǳ":"DZ","Ǆ":"DZ","ǲ":"Dz","ǅ":"Dz","Ⓔ":"E","Ｅ":"E","È":"E","É":"E","Ê":"E","Ề":"E","Ế":"E","Ễ":"E","Ể":"E","Ẽ":"E","Ē":"E","Ḕ":"E","Ḗ":"E","Ĕ":"E","Ė":"E","Ë":"E","Ẻ":"E","Ě":"E","Ȅ":"E","Ȇ":"E","Ẹ":"E","Ệ":"E","Ȩ":"E","Ḝ":"E","Ę":"E","Ḙ":"E","Ḛ":"E","Ɛ":"E","Ǝ":"E","Ⓕ":"F","Ｆ":"F","Ḟ":"F","Ƒ":"F","Ꝼ":"F","Ⓖ":"G","Ｇ":"G","Ǵ":"G","Ĝ":"G","Ḡ":"G","Ğ":"G","Ġ":"G","Ǧ":"G","Ģ":"G","Ǥ":"G","Ɠ":"G","Ꞡ":"G","Ᵹ":"G","Ꝿ":"G","Ⓗ":"H","Ｈ":"H","Ĥ":"H","Ḣ":"H","Ḧ":"H","Ȟ":"H","Ḥ":"H","Ḩ":"H","Ḫ":"H","Ħ":"H","Ⱨ":"H","Ⱶ":"H","Ɥ":"H","Ⓘ":"I","Ｉ":"I","Ì":"I","Í":"I","Î":"I","Ĩ":"I","Ī":"I","Ĭ":"I","İ":"I","Ï":"I","Ḯ":"I","Ỉ":"I","Ǐ":"I","Ȉ":"I","Ȋ":"I","Ị":"I","Į":"I","Ḭ":"I","Ɨ":"I","Ⓙ":"J","Ｊ":"J","Ĵ":"J","Ɉ":"J","Ⓚ":"K","Ｋ":"K","Ḱ":"K","Ǩ":"K","Ḳ":"K","Ķ":"K","Ḵ":"K","Ƙ":"K","Ⱪ":"K","Ꝁ":"K","Ꝃ":"K","Ꝅ":"K","Ꞣ":"K","Ⓛ":"L","Ｌ":"L","Ŀ":"L","Ĺ":"L","Ľ":"L","Ḷ":"L","Ḹ":"L","Ļ":"L","Ḽ":"L","Ḻ":"L","Ł":"L","Ƚ":"L","Ɫ":"L","Ⱡ":"L","Ꝉ":"L","Ꝇ":"L","Ꞁ":"L","Ǉ":"LJ","ǈ":"Lj","Ⓜ":"M","Ｍ":"M","Ḿ":"M","Ṁ":"M","Ṃ":"M","Ɱ":"M","Ɯ":"M","Ⓝ":"N","Ｎ":"N","Ǹ":"N","Ń":"N","Ñ":"N","Ṅ":"N","Ň":"N","Ṇ":"N","Ņ":"N","Ṋ":"N","Ṉ":"N","Ƞ":"N","Ɲ":"N","Ꞑ":"N","Ꞥ":"N","Ǌ":"NJ","ǋ":"Nj","Ⓞ":"O","Ｏ":"O","Ò":"O","Ó":"O","Ô":"O","Ồ":"O","Ố":"O","Ỗ":"O","Ổ":"O","Õ":"O","Ṍ":"O","Ȭ":"O","Ṏ":"O","Ō":"O","Ṑ":"O","Ṓ":"O","Ŏ":"O","Ȯ":"O","Ȱ":"O","Ö":"O","Ȫ":"O","Ỏ":"O","Ő":"O","Ǒ":"O","Ȍ":"O","Ȏ":"O","Ơ":"O","Ờ":"O","Ớ":"O","Ỡ":"O","Ở":"O","Ợ":"O","Ọ":"O","Ộ":"O","Ǫ":"O","Ǭ":"O","Ø":"O","Ǿ":"O","Ɔ":"O","Ɵ":"O","Ꝋ":"O","Ꝍ":"O","Ƣ":"OI","Ꝏ":"OO","Ȣ":"OU","Ⓟ":"P","Ｐ":"P","Ṕ":"P","Ṗ":"P","Ƥ":"P","Ᵽ":"P","Ꝑ":"P","Ꝓ":"P","Ꝕ":"P","Ⓠ":"Q","Ｑ":"Q","Ꝗ":"Q","Ꝙ":"Q","Ɋ":"Q","Ⓡ":"R","Ｒ":"R","Ŕ":"R","Ṙ":"R","Ř":"R","Ȑ":"R","Ȓ":"R","Ṛ":"R","Ṝ":"R","Ŗ":"R","Ṟ":"R","Ɍ":"R","Ɽ":"R","Ꝛ":"R","Ꞧ":"R","Ꞃ":"R","Ⓢ":"S","Ｓ":"S","ẞ":"S","Ś":"S","Ṥ":"S","Ŝ":"S","Ṡ":"S","Š":"S","Ṧ":"S","Ṣ":"S","Ṩ":"S","Ș":"S","Ş":"S","Ȿ":"S","Ꞩ":"S","Ꞅ":"S","Ⓣ":"T","Ｔ":"T","Ṫ":"T","Ť":"T","Ṭ":"T","Ț":"T","Ţ":"T","Ṱ":"T","Ṯ":"T","Ŧ":"T","Ƭ":"T","Ʈ":"T","Ⱦ":"T","Ꞇ":"T","Ꜩ":"TZ","Ⓤ":"U","Ｕ":"U","Ù":"U","Ú":"U","Û":"U","Ũ":"U","Ṹ":"U","Ū":"U","Ṻ":"U","Ŭ":"U","Ü":"U","Ǜ":"U","Ǘ":"U","Ǖ":"U","Ǚ":"U","Ủ":"U","Ů":"U","Ű":"U","Ǔ":"U","Ȕ":"U","Ȗ":"U","Ư":"U","Ừ":"U","Ứ":"U","Ữ":"U","Ử":"U","Ự":"U","Ụ":"U","Ṳ":"U","Ų":"U","Ṷ":"U","Ṵ":"U","Ʉ":"U","Ⓥ":"V","Ｖ":"V","Ṽ":"V","Ṿ":"V","Ʋ":"V","Ꝟ":"V","Ʌ":"V","Ꝡ":"VY","Ⓦ":"W","Ｗ":"W","Ẁ":"W","Ẃ":"W","Ŵ":"W","Ẇ":"W","Ẅ":"W","Ẉ":"W","Ⱳ":"W","Ⓧ":"X","Ｘ":"X","Ẋ":"X","Ẍ":"X","Ⓨ":"Y","Ｙ":"Y","Ỳ":"Y","Ý":"Y","Ŷ":"Y","Ỹ":"Y","Ȳ":"Y","Ẏ":"Y","Ÿ":"Y","Ỷ":"Y","Ỵ":"Y","Ƴ":"Y","Ɏ":"Y","Ỿ":"Y","Ⓩ":"Z","Ｚ":"Z","Ź":"Z","Ẑ":"Z","Ż":"Z","Ž":"Z","Ẓ":"Z","Ẕ":"Z","Ƶ":"Z","Ȥ":"Z","Ɀ":"Z","Ⱬ":"Z","Ꝣ":"Z","ⓐ":"a","ａ":"a","ẚ":"a","à":"a","á":"a","â":"a","ầ":"a","ấ":"a","ẫ":"a","ẩ":"a","ã":"a","ā":"a","ă":"a","ằ":"a","ắ":"a","ẵ":"a","ẳ":"a","ȧ":"a","ǡ":"a","ä":"a","ǟ":"a","ả":"a","å":"a","ǻ":"a","ǎ":"a","ȁ":"a","ȃ":"a","ạ":"a","ậ":"a","ặ":"a","ḁ":"a","ą":"a","ⱥ":"a","ɐ":"a","ꜳ":"aa","æ":"ae","ǽ":"ae","ǣ":"ae","ꜵ":"ao","ꜷ":"au","ꜹ":"av","ꜻ":"av","ꜽ":"ay","ⓑ":"b","ｂ":"b","ḃ":"b","ḅ":"b","ḇ":"b","ƀ":"b","ƃ":"b","ɓ":"b","ⓒ":"c","ｃ":"c","ć":"c","ĉ":"c","ċ":"c","č":"c","ç":"c","ḉ":"c","ƈ":"c","ȼ":"c","ꜿ":"c","ↄ":"c","ⓓ":"d","ｄ":"d","ḋ":"d","ď":"d","ḍ":"d","ḑ":"d","ḓ":"d","ḏ":"d","đ":"d","ƌ":"d","ɖ":"d","ɗ":"d","ꝺ":"d","ǳ":"dz","ǆ":"dz","ⓔ":"e","ｅ":"e","è":"e","é":"e","ê":"e","ề":"e","ế":"e","ễ":"e","ể":"e","ẽ":"e","ē":"e","ḕ":"e","ḗ":"e","ĕ":"e","ė":"e","ë":"e","ẻ":"e","ě":"e","ȅ":"e","ȇ":"e","ẹ":"e","ệ":"e","ȩ":"e","ḝ":"e","ę":"e","ḙ":"e","ḛ":"e","ɇ":"e","ɛ":"e","ǝ":"e","ⓕ":"f","ｆ":"f","ḟ":"f","ƒ":"f","ꝼ":"f","ⓖ":"g","ｇ":"g","ǵ":"g","ĝ":"g","ḡ":"g","ğ":"g","ġ":"g","ǧ":"g","ģ":"g","ǥ":"g","ɠ":"g","ꞡ":"g","ᵹ":"g","ꝿ":"g","ⓗ":"h","ｈ":"h","ĥ":"h","ḣ":"h","ḧ":"h","ȟ":"h","ḥ":"h","ḩ":"h","ḫ":"h","ẖ":"h","ħ":"h","ⱨ":"h","ⱶ":"h","ɥ":"h","ƕ":"hv","ⓘ":"i","ｉ":"i","ì":"i","í":"i","î":"i","ĩ":"i","ī":"i","ĭ":"i","ï":"i","ḯ":"i","ỉ":"i","ǐ":"i","ȉ":"i","ȋ":"i","ị":"i","į":"i","ḭ":"i","ɨ":"i","ı":"i","ⓙ":"j","ｊ":"j","ĵ":"j","ǰ":"j","ɉ":"j","ⓚ":"k","ｋ":"k","ḱ":"k","ǩ":"k","ḳ":"k","ķ":"k","ḵ":"k","ƙ":"k","ⱪ":"k","ꝁ":"k","ꝃ":"k","ꝅ":"k","ꞣ":"k","ⓛ":"l","ｌ":"l","ŀ":"l","ĺ":"l","ľ":"l","ḷ":"l","ḹ":"l","ļ":"l","ḽ":"l","ḻ":"l","ſ":"l","ł":"l","ƚ":"l","ɫ":"l","ⱡ":"l","ꝉ":"l","ꞁ":"l","ꝇ":"l","ǉ":"lj","ⓜ":"m","ｍ":"m","ḿ":"m","ṁ":"m","ṃ":"m","ɱ":"m","ɯ":"m","ⓝ":"n","ｎ":"n","ǹ":"n","ń":"n","ñ":"n","ṅ":"n","ň":"n","ṇ":"n","ņ":"n","ṋ":"n","ṉ":"n","ƞ":"n","ɲ":"n","ŉ":"n","ꞑ":"n","ꞥ":"n","ǌ":"nj","ⓞ":"o","ｏ":"o","ò":"o","ó":"o","ô":"o","ồ":"o","ố":"o","ỗ":"o","ổ":"o","õ":"o","ṍ":"o","ȭ":"o","ṏ":"o","ō":"o","ṑ":"o","ṓ":"o","ŏ":"o","ȯ":"o","ȱ":"o","ö":"o","ȫ":"o","ỏ":"o","ő":"o","ǒ":"o","ȍ":"o","ȏ":"o","ơ":"o","ờ":"o","ớ":"o","ỡ":"o","ở":"o","ợ":"o","ọ":"o","ộ":"o","ǫ":"o","ǭ":"o","ø":"o","ǿ":"o","ɔ":"o","ꝋ":"o","ꝍ":"o","ɵ":"o","ƣ":"oi","ȣ":"ou","ꝏ":"oo","ⓟ":"p","ｐ":"p","ṕ":"p","ṗ":"p","ƥ":"p","ᵽ":"p","ꝑ":"p","ꝓ":"p","ꝕ":"p","ⓠ":"q","ｑ":"q","ɋ":"q","ꝗ":"q","ꝙ":"q","ⓡ":"r","ｒ":"r","ŕ":"r","ṙ":"r","ř":"r","ȑ":"r","ȓ":"r","ṛ":"r","ṝ":"r","ŗ":"r","ṟ":"r","ɍ":"r","ɽ":"r","ꝛ":"r","ꞧ":"r","ꞃ":"r","ⓢ":"s","ｓ":"s","ß":"s","ś":"s","ṥ":"s","ŝ":"s","ṡ":"s","š":"s","ṧ":"s","ṣ":"s","ṩ":"s","ș":"s","ş":"s","ȿ":"s","ꞩ":"s","ꞅ":"s","ẛ":"s","ⓣ":"t","ｔ":"t","ṫ":"t","ẗ":"t","ť":"t","ṭ":"t","ț":"t","ţ":"t","ṱ":"t","ṯ":"t","ŧ":"t","ƭ":"t","ʈ":"t","ⱦ":"t","ꞇ":"t","ꜩ":"tz","ⓤ":"u","ｕ":"u","ù":"u","ú":"u","û":"u","ũ":"u","ṹ":"u","ū":"u","ṻ":"u","ŭ":"u","ü":"u","ǜ":"u","ǘ":"u","ǖ":"u","ǚ":"u","ủ":"u","ů":"u","ű":"u","ǔ":"u","ȕ":"u","ȗ":"u","ư":"u","ừ":"u","ứ":"u","ữ":"u","ử":"u","ự":"u","ụ":"u","ṳ":"u","ų":"u","ṷ":"u","ṵ":"u","ʉ":"u","ⓥ":"v","ｖ":"v","ṽ":"v","ṿ":"v","ʋ":"v","ꝟ":"v","ʌ":"v","ꝡ":"vy","ⓦ":"w","ｗ":"w","ẁ":"w","ẃ":"w","ŵ":"w","ẇ":"w","ẅ":"w","ẘ":"w","ẉ":"w","ⱳ":"w","ⓧ":"x","ｘ":"x","ẋ":"x","ẍ":"x","ⓨ":"y","ｙ":"y","ỳ":"y","ý":"y","ŷ":"y","ỹ":"y","ȳ":"y","ẏ":"y","ÿ":"y","ỷ":"y","ẙ":"y","ỵ":"y","ƴ":"y","ɏ":"y","ỿ":"y","ⓩ":"z","ｚ":"z","ź":"z","ẑ":"z","ż":"z","ž":"z","ẓ":"z","ẕ":"z","ƶ":"z","ȥ":"z","ɀ":"z","ⱬ":"z","ꝣ":"z","Ά":"Α","Έ":"Ε","Ή":"Η","Ί":"Ι","Ϊ":"Ι","Ό":"Ο","Ύ":"Υ","Ϋ":"Υ","Ώ":"Ω","ά":"α","έ":"ε","ή":"η","ί":"ι","ϊ":"ι","ΐ":"ι","ό":"ο","ύ":"υ","ϋ":"υ","ΰ":"υ","ω":"ω","ς":"σ"}}),t.define("czrSelect2/data/base",["../utils"],function(e){function t(e,n){t.__super__.constructor.call(this)}return e.Extend(t,e.Observable),t.prototype.current=function(e){throw new Error("The `current` method must be defined in child classes.")},t.prototype.query=function(e,t){throw new Error("The `query` method must be defined in child classes.")},t.prototype.bind=function(e,t){},t.prototype.destroy=function(){},t.prototype.generateResultId=function(t,n){var r=t.id+"-result-";return r+=e.generateChars(4),null!=n.id?r+="-"+n.id.toString():r+="-"+e.generateChars(4),r},t}),t.define("czrSelect2/data/select",["./base","../utils","jquery"],function(e,t,n){function r(e,t){this.$element=e,this.options=t,r.__super__.constructor.call(this)}return t.Extend(r,e),r.prototype.current=function(e){var t=[],r=this;this.$element.find(":selected").each(function(){var e=n(this),i=r.item(e);t.push(i)}),e(t)},r.prototype.select=function(e){var t=this;if(e.selected=!0,n(e.element).is("option"))return e.element.selected=!0,void this.$element.trigger("change");if(this.$element.prop("multiple"))this.current(function(r){var i=[];(e=[e]).push.apply(e,r);for(var o=0;o<e.length;o++){var s=e[o].id;-1===n.inArray(s,i)&&i.push(s)}t.$element.val(i),t.$element.trigger("change")});else{var r=e.id;this.$element.val(r),this.$element.trigger("change")}},r.prototype.unselect=function(e){var t=this;if(this.$element.prop("multiple")){if(e.selected=!1,n(e.element).is("option"))return e.element.selected=!1,void this.$element.trigger("change");this.current(function(r){for(var i=[],o=0;o<r.length;o++){var s=r[o].id;s!==e.id&&-1===n.inArray(s,i)&&i.push(s)}t.$element.val(i),t.$element.trigger("change")})}},r.prototype.bind=function(e,t){var n=this;this.container=e,e.on("select",function(e){n.select(e.data)}),e.on("unselect",function(e){n.unselect(e.data)})},r.prototype.destroy=function(){this.$element.find("*").each(function(){n.removeData(this,"data")})},r.prototype.query=function(e,t){var r=[],i=this;this.$element.children().each(function(){var t=n(this);if(t.is("option")||t.is("optgroup")){var o=i.item(t),s=i.matches(e,o);null!==s&&r.push(s)}}),t({results:r})},r.prototype.addOptions=function(e){t.appendMany(this.$element,e)},r.prototype.option=function(e){var t;e.children?(t=document.createElement("optgroup")).label=e.text:void 0!==(t=document.createElement("option")).textContent?t.textContent=e.text:t.innerText=e.text,e.id&&(t.value=e.id),e.disabled&&(t.disabled=!0),e.selected&&(t.selected=!0),e.title&&(t.title=e.title);var r=n(t),i=this._normalizeItem(e);return i.element=t,n.data(t,"data",i),r},r.prototype.item=function(e){var t={};if(null!=(t=n.data(e[0],"data")))return t;if(e.is("option"))t={id:e.val(),text:e.text(),disabled:e.prop("disabled"),selected:e.prop("selected"),title:e.prop("title")};else if(e.is("optgroup")){t={text:e.prop("label"),children:[],title:e.prop("title")};for(var r=e.children("option"),i=[],o=0;o<r.length;o++){var s=n(r[o]),a=this.item(s);i.push(a)}t.children=i}return(t=this._normalizeItem(t)).element=e[0],n.data(e[0],"data",t),t},r.prototype._normalizeItem=function(e){n.isPlainObject(e)||(e={id:e,text:e});return null!=(e=n.extend({},{text:""},e)).id&&(e.id=e.id.toString()),null!=e.text&&(e.text=e.text.toString()),null==e._resultId&&e.id&&null!=this.container&&(e._resultId=this.generateResultId(this.container,e)),n.extend({},{selected:!1,disabled:!1},e)},r.prototype.matches=function(e,t){return this.options.get("matcher")(e,t)},r}),t.define("czrSelect2/data/array",["./select","../utils","jquery"],function(e,t,n){function r(e,t){var n=t.get("data")||[];r.__super__.constructor.call(this,e,t),this.addOptions(this.convertToOptions(n))}return t.Extend(r,e),r.prototype.select=function(e){var t=this.$element.find("option").filter(function(t,n){return n.value==e.id.toString()});0===t.length&&(t=this.option(e),this.addOptions(t)),r.__super__.select.call(this,e)},r.prototype.convertToOptions=function(e){var r=this,i=this.$element.find("option"),o=i.map(function(){return r.item(n(this)).id}).get(),s=[];function a(e){return function(){return n(this).val()==e.id}}for(var l=0;l<e.length;l++){var c=this._normalizeItem(e[l]);if(n.inArray(c.id,o)>=0){var u=i.filter(a(c)),d=this.item(u),p=n.extend(!0,{},c,d),h=this.option(p);u.replaceWith(h)}else{var f=this.option(c);if(c.children){var g=this.convertToOptions(c.children);t.appendMany(f,g)}s.push(f)}}return s},r}),t.define("czrSelect2/data/ajax",["./array","../utils","jquery"],function(e,t,n){function r(e,t){this.ajaxOptions=this._applyDefaults(t.get("ajax")),null!=this.ajaxOptions.processResults&&(this.processResults=this.ajaxOptions.processResults),r.__super__.constructor.call(this,e,t)}return t.Extend(r,e),r.prototype._applyDefaults=function(e){var t={data:function(e){return n.extend({},e,{q:e.term})},transport:function(e,t,r){var i=n.ajax(e);return i.then(t),i.fail(r),i}};return n.extend({},t,e,!0)},r.prototype.processResults=function(e){return e},r.prototype.query=function(e,t){var r=this;null!=this._request&&("function"==typeof this._request.abort&&this._request.abort(),this._request=null);var i=n.extend({type:"GET"},this.ajaxOptions);function o(){var o=i.transport(i,function(i){var o=r.processResults(i,e);r.options.get("debug")&&window.console&&console.error&&(o&&o.results&&n.isArray(o.results)||console.error("CzrSelect2: The AJAX results did not return an array in the `results` key of the response.")),t(o)},function(){o.status&&"0"===o.status||r.trigger("results:message",{message:"errorLoading"})});r._request=o}"function"==typeof i.url&&(i.url=i.url.call(this.$element,e)),"function"==typeof i.data&&(i.data=i.data.call(this.$element,e)),this.ajaxOptions.delay&&null!=e.term?(this._queryTimeout&&window.clearTimeout(this._queryTimeout),this._queryTimeout=window.setTimeout(o,this.ajaxOptions.delay)):o()},r}),t.define("czrSelect2/data/tags",["jquery"],function(e){function t(t,n,r){var i=r.get("tags"),o=r.get("createTag");void 0!==o&&(this.createTag=o);var s=r.get("insertTag");if(void 0!==s&&(this.insertTag=s),t.call(this,n,r),e.isArray(i))for(var a=0;a<i.length;a++){var l=i[a],c=this._normalizeItem(l),u=this.option(c);this.$element.append(u)}}return t.prototype.query=function(e,t,n){var r=this;this._removeOldTags(),null!=t.term&&null==t.page?e.call(this,t,function e(i,o){for(var s=i.results,a=0;a<s.length;a++){var l=s[a],c=null!=l.children&&!e({results:l.children},!0);if(l.text===t.term||c)return!o&&(i.data=s,void n(i))}if(o)return!0;var u=r.createTag(t);if(null!=u){var d=r.option(u);d.attr("data-czrSelect2-tag",!0),r.addOptions([d]),r.insertTag(s,u)}i.results=s,n(i)}):e.call(this,t,n)},t.prototype.createTag=function(e,t){var n="string"==typeof t.term?t.term.trim():"";return""===n?null:{id:n,text:n}},t.prototype.insertTag=function(e,t,n){t.unshift(n)},t.prototype._removeOldTags=function(t){this._lastTag;this.$element.find("option[data-czrSelect2-tag]").each(function(){this.selected||e(this).remove()})},t}),t.define("czrSelect2/data/tokenizer",["jquery"],function(e){function t(e,t,n){var r=n.get("tokenizer");void 0!==r&&(this.tokenizer=r),e.call(this,t,n)}return t.prototype.bind=function(e,t,n){e.call(this,t,n),this.$search=t.dropdown.$search||t.selection.$search||n.find(".czrSelect2-search__field")},t.prototype.query=function(t,n,r){var i=this;n.term=n.term||"";var o=this.tokenizer(n,this.options,function(t){var n=i._normalizeItem(t);if(!i.$element.find("option").filter(function(){return e(this).val()===n.id}).length){var r=i.option(n);r.attr("data-czrSelect2-tag",!0),i._removeOldTags(),i.addOptions([r])}!function(e){i.trigger("select",{data:e})}(n)});o.term!==n.term&&(this.$search.length&&(this.$search.val(o.term),this.$search.focus()),n.term=o.term),t.call(this,n,r)},t.prototype.tokenizer=function(t,n,r,i){for(var o=r.get("tokenSeparators")||[],s=n.term,a=0,l=this.createTag||function(e){return{id:e.term,text:e.term}};a<s.length;){var c=s[a];if(-1!==e.inArray(c,o)){var u=s.substr(0,a),d=l(e.extend({},n,{term:u}));null!=d?(i(d),s=s.substr(a+1)||"",a=0):a++}else a++}return{term:s}},t}),t.define("czrSelect2/data/minimumInputLength",[],function(){function e(e,t,n){this.minimumInputLength=n.get("minimumInputLength"),e.call(this,t,n)}return e.prototype.query=function(e,t,n){t.term=t.term||"",t.term.length<this.minimumInputLength?this.trigger("results:message",{message:"inputTooShort",args:{minimum:this.minimumInputLength,input:t.term,params:t}}):e.call(this,t,n)},e}),t.define("czrSelect2/data/maximumInputLength",[],function(){function e(e,t,n){this.maximumInputLength=n.get("maximumInputLength"),e.call(this,t,n)}return e.prototype.query=function(e,t,n){t.term=t.term||"",this.maximumInputLength>0&&t.term.length>this.maximumInputLength?this.trigger("results:message",{message:"inputTooLong",args:{maximum:this.maximumInputLength,input:t.term,params:t}}):e.call(this,t,n)},e}),t.define("czrSelect2/data/maximumSelectionLength",[],function(){function e(e,t,n){this.maximumSelectionLength=n.get("maximumSelectionLength"),e.call(this,t,n)}return e.prototype.query=function(e,t,n){var r=this;this.current(function(i){var o=null!=i?i.length:0;r.maximumSelectionLength>0&&o>=r.maximumSelectionLength?r.trigger("results:message",{message:"maximumSelected",args:{maximum:r.maximumSelectionLength}}):e.call(r,t,n)})},e}),t.define("czrSelect2/dropdown",["jquery","./utils"],function(e,t){function n(e,t){this.$element=e,this.options=t,n.__super__.constructor.call(this)}return t.Extend(n,t.Observable),n.prototype.render=function(){var t=e('<span class="czrSelect2-dropdown"><span class="czrSelect2-results"></span></span>');return t.attr("dir",this.options.get("dir")),this.$dropdown=t,t},n.prototype.bind=function(){},n.prototype.position=function(e,t){},n.prototype.destroy=function(){this.$dropdown.remove()},n}),t.define("czrSelect2/dropdown/search",["jquery","../utils"],function(e,t){function n(){}return n.prototype.render=function(t){var n=t.call(this),r=e('<span class="czrSelect2-search czrSelect2-search--dropdown"><input class="czrSelect2-search__field" type="search" tabindex="-1" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" role="textbox" /></span>');return this.$searchContainer=r,this.$search=r.find("input"),n.prepend(r),n},n.prototype.bind=function(t,n,r){var i=this;t.call(this,n,r),this.$search.on("keydown",function(e){i.trigger("keypress",e),i._keyUpPrevented=e.isDefaultPrevented()}),this.$search.on("input",function(t){e(this).off("keyup")}),this.$search.on("keyup input",function(e){i.handleSearch(e)}),n.on("open",function(){i.$search.attr("tabindex",0),i.$search.focus(),window.setTimeout(function(){i.$search.focus()},0)}),n.on("close",function(){i.$search.attr("tabindex",-1),i.$search.val("")}),n.on("focus",function(){n.isOpen()&&i.$search.focus()}),n.on("results:all",function(e){null!=e.query.term&&""!==e.query.term||(i.showSearch(e)?i.$searchContainer.removeClass("czrSelect2-search--hide"):i.$searchContainer.addClass("czrSelect2-search--hide"))})},n.prototype.handleSearch=function(e){if(!this._keyUpPrevented){var t=this.$search.val();this.trigger("query",{term:t})}this._keyUpPrevented=!1},n.prototype.showSearch=function(e,t){return!0},n}),t.define("czrSelect2/dropdown/hidePlaceholder",[],function(){function e(e,t,n,r){this.placeholder=this.normalizePlaceholder(n.get("placeholder")),e.call(this,t,n,r)}return e.prototype.append=function(e,t){t.results=this.removePlaceholder(t.results),e.call(this,t)},e.prototype.normalizePlaceholder=function(e,t){return"string"==typeof t&&(t={id:"",text:t}),t},e.prototype.removePlaceholder=function(e,t){for(var n=t.slice(0),r=t.length-1;r>=0;r--){var i=t[r];this.placeholder.id===i.id&&n.splice(r,1)}return n},e}),t.define("czrSelect2/dropdown/infiniteScroll",["jquery"],function(e){function t(e,t,n,r){this.lastParams={},e.call(this,t,n,r),this.$loadingMore=this.createLoadingMore(),this.loading=!1}return t.prototype.append=function(e,t){this.$loadingMore.remove(),this.loading=!1,e.call(this,t),this.showLoadingMore(t)&&this.$results.append(this.$loadingMore)},t.prototype.bind=function(t,n,r){var i=this;t.call(this,n,r),n.on("query",function(e){i.lastParams=e,i.loading=!0}),n.on("query:append",function(e){i.lastParams=e,i.loading=!0}),this.$results.on("scroll",function(){var t=e.contains(document.documentElement,i.$loadingMore[0]);!i.loading&&t&&(i.$results.offset().top+i.$results.outerHeight(!1)+50>=i.$loadingMore.offset().top+i.$loadingMore.outerHeight(!1)&&i.loadMore())})},t.prototype.loadMore=function(){this.loading=!0;var t=e.extend({},{page:1},this.lastParams);t.page++,this.trigger("query:append",t)},t.prototype.showLoadingMore=function(e,t){return t.pagination&&t.pagination.more},t.prototype.createLoadingMore=function(){var t=e('<li class="czrSelect2-results__option czrSelect2-results__option--load-more"role="treeitem" aria-disabled="true"></li>'),n=this.options.get("translations").get("loadingMore");return t.html(n(this.lastParams)),t},t}),t.define("czrSelect2/dropdown/attachBody",["jquery","../utils"],function(e,t){function n(t,n,r){this.$dropdownParent=r.get("dropdownParent")||e(document.body),t.call(this,n,r)}return n.prototype.bind=function(e,t,n){var r=this,i=!1;e.call(this,t,n),t.on("open",function(){r._showDropdown(),r._attachPositioningHandler(t),i||(i=!0,t.on("results:all",function(){r._positionDropdown(),r._resizeDropdown()}),t.on("results:append",function(){r._positionDropdown(),r._resizeDropdown()}))}),t.on("close",function(){r._hideDropdown(),r._detachPositioningHandler(t)}),this.$dropdownContainer.on("mousedown",function(e){e.stopPropagation()})},n.prototype.destroy=function(e){e.call(this),this.$dropdownContainer.remove()},n.prototype.position=function(e,t,n){t.attr("class",n.attr("class")),t.removeClass("czrSelect2"),t.addClass("czrSelect2-container--open"),t.css({position:"absolute",top:-999999}),this.$container=n},n.prototype.render=function(t){var n=e("<span></span>"),r=t.call(this);return n.append(r),this.$dropdownContainer=n,n},n.prototype._hideDropdown=function(e){this.$dropdownContainer.detach()},n.prototype._attachPositioningHandler=function(n,r){var i=this,o="scroll.czrSelect2."+r.id,s="resize.czrSelect2."+r.id,a="orientationchange.czrSelect2."+r.id,l=this.$container.parents().filter(t.hasScroll);l.each(function(){e(this).data("czrSelect2-scroll-position",{x:e(this).scrollLeft(),y:e(this).scrollTop()})}),l.on(o,function(t){var n=e(this).data("czrSelect2-scroll-position");e(this).scrollTop(n.y)}),e(window).on(o+" "+s+" "+a,function(e){i._positionDropdown(),i._resizeDropdown()})},n.prototype._detachPositioningHandler=function(n,r){var i="scroll.czrSelect2."+r.id,o="resize.czrSelect2."+r.id,s="orientationchange.czrSelect2."+r.id;this.$container.parents().filter(t.hasScroll).off(i),e(window).off(i+" "+o+" "+s)},n.prototype._positionDropdown=function(){var t=e(window),n=this.$dropdown.hasClass("czrSelect2-dropdown--above"),r=this.$dropdown.hasClass("czrSelect2-dropdown--below"),i=null,o=this.$container.offset();o.bottom=o.top+this.$container.outerHeight(!1);var s={height:this.$container.outerHeight(!1)};s.top=o.top,s.bottom=o.top+s.height;var a=this.$dropdown.outerHeight(!1),l=t.scrollTop(),c=t.scrollTop()+t.height(),u=l<o.top-a,d=c>o.bottom+a,p={left:o.left,top:s.bottom},h=this.$dropdownParent;"static"===h.css("position")&&(h=h.offsetParent());var f=h.offset();p.top-=f.top,p.left-=f.left,n||r||(i="below"),d||!u||n?!u&&d&&n&&(i="below"):i="above",("above"==i||n&&"below"!==i)&&(p.top=s.top-f.top-a),null!=i&&(this.$dropdown.removeClass("czrSelect2-dropdown--below czrSelect2-dropdown--above").addClass("czrSelect2-dropdown--"+i),this.$container.removeClass("czrSelect2-container--below czrSelect2-container--above").addClass("czrSelect2-container--"+i)),this.$dropdownContainer.css(p)},n.prototype._resizeDropdown=function(){var e={width:this.$container.outerWidth(!1)+"px"};this.options.get("dropdownAutoWidth")&&(e.minWidth=e.width,e.position="relative",e.width="auto"),this.$dropdown.css(e)},n.prototype._showDropdown=function(e){this.$dropdownContainer.appendTo(this.$dropdownParent),this._positionDropdown(),this._resizeDropdown()},n}),t.define("czrSelect2/dropdown/minimumResultsForSearch",[],function(){function e(e,t,n,r){this.minimumResultsForSearch=n.get("minimumResultsForSearch"),this.minimumResultsForSearch<0&&(this.minimumResultsForSearch=1/0),e.call(this,t,n,r)}return e.prototype.showSearch=function(e,t){return!(function e(t){for(var n=0,r=0;r<t.length;r++){var i=t[r];i.children?n+=e(i.children):n++}return n}(t.data.results)<this.minimumResultsForSearch)&&e.call(this,t)},e}),t.define("czrSelect2/dropdown/selectOnClose",[],function(){function e(){}return e.prototype.bind=function(e,t,n){var r=this;e.call(this,t,n),t.on("close",function(e){r._handleSelectOnClose(e)})},e.prototype._handleSelectOnClose=function(e,t){if(t&&null!=t.originalCzrSelect2Event){var n=t.originalCzrSelect2Event;if("select"===n._type||"unselect"===n._type)return}var r=this.getHighlightedResults();if(!(r.length<1)){var i=r.data("data");null!=i.element&&i.element.selected||null==i.element&&i.selected||this.trigger("select",{data:i})}},e}),t.define("czrSelect2/dropdown/closeOnSelect",[],function(){function e(){}return e.prototype.bind=function(e,t,n){var r=this;e.call(this,t,n),t.on("select",function(e){r._selectTriggered(e)}),t.on("unselect",function(e){r._selectTriggered(e)})},e.prototype._selectTriggered=function(e,t){var n=t.originalEvent;n&&n.ctrlKey||this.trigger("close",{originalEvent:n,originalCzrSelect2Event:t})},e}),t.define("czrSelect2/i18n/en",[],function(){return{errorLoading:function(){return"The results could not be loaded."},inputTooLong:function(e){var t=e.input.length-e.maximum,n="Please delete "+t+" character";return 1!=t&&(n+="s"),n},inputTooShort:function(e){return"Please enter "+(e.minimum-e.input.length)+" or more characters"},loadingMore:function(){return"Loading more results…"},maximumSelected:function(e){var t="You can only select "+e.maximum+" item";return 1!=e.maximum&&(t+="s"),t},noResults:function(){return"No results found"},searching:function(){return"Searching…"}}}),t.define("czrSelect2/defaults",["jquery","require","./results","./selection/single","./selection/multiple","./selection/placeholder","./selection/allowClear","./selection/search","./selection/eventRelay","./utils","./translation","./diacritics","./data/select","./data/array","./data/ajax","./data/tags","./data/tokenizer","./data/minimumInputLength","./data/maximumInputLength","./data/maximumSelectionLength","./dropdown","./dropdown/search","./dropdown/hidePlaceholder","./dropdown/infiniteScroll","./dropdown/attachBody","./dropdown/minimumResultsForSearch","./dropdown/selectOnClose","./dropdown/closeOnSelect","./i18n/en"],function(e,t,n,r,i,o,s,a,l,c,u,d,p,h,f,g,m,v,y,_,S,$,w,b,z,A,x,C,E){function O(){this.reset()}return O.prototype.apply=function(d){if(null==(d=e.extend(!0,{},this.defaults,d)).dataAdapter){if(null!=d.ajax?d.dataAdapter=f:null!=d.data?d.dataAdapter=h:d.dataAdapter=p,d.minimumInputLength>0&&(d.dataAdapter=c.Decorate(d.dataAdapter,v)),d.maximumInputLength>0&&(d.dataAdapter=c.Decorate(d.dataAdapter,y)),d.maximumSelectionLength>0&&(d.dataAdapter=c.Decorate(d.dataAdapter,_)),d.tags&&(d.dataAdapter=c.Decorate(d.dataAdapter,g)),null==d.tokenSeparators&&null==d.tokenizer||(d.dataAdapter=c.Decorate(d.dataAdapter,m)),null!=d.query){var E=t(d.amdBase+"compat/query");d.dataAdapter=c.Decorate(d.dataAdapter,E)}if(null!=d.initSelection){var O=t(d.amdBase+"compat/initSelection");d.dataAdapter=c.Decorate(d.dataAdapter,O)}}if(null==d.resultsAdapter&&(d.resultsAdapter=n,null!=d.ajax&&(d.resultsAdapter=c.Decorate(d.resultsAdapter,b)),null!=d.placeholder&&(d.resultsAdapter=c.Decorate(d.resultsAdapter,w)),d.selectOnClose&&(d.resultsAdapter=c.Decorate(d.resultsAdapter,x))),null==d.dropdownAdapter){if(d.multiple)d.dropdownAdapter=S;else{var T=c.Decorate(S,$);d.dropdownAdapter=T}if(0!==d.minimumResultsForSearch&&(d.dropdownAdapter=c.Decorate(d.dropdownAdapter,A)),d.closeOnSelect&&(d.dropdownAdapter=c.Decorate(d.dropdownAdapter,C)),null!=d.dropdownCssClass||null!=d.dropdownCss||null!=d.adaptDropdownCssClass){var D=t(d.amdBase+"compat/dropdownCss");d.dropdownAdapter=c.Decorate(d.dropdownAdapter,D)}d.dropdownAdapter=c.Decorate(d.dropdownAdapter,z)}if(null==d.selectionAdapter){if(d.multiple?d.selectionAdapter=i:d.selectionAdapter=r,null!=d.placeholder&&(d.selectionAdapter=c.Decorate(d.selectionAdapter,o)),d.allowClear&&(d.selectionAdapter=c.Decorate(d.selectionAdapter,s)),d.multiple&&(d.selectionAdapter=c.Decorate(d.selectionAdapter,a)),null!=d.containerCssClass||null!=d.containerCss||null!=d.adaptContainerCssClass){var q=t(d.amdBase+"compat/containerCss");d.selectionAdapter=c.Decorate(d.selectionAdapter,q)}d.selectionAdapter=c.Decorate(d.selectionAdapter,l)}if("string"==typeof d.language)if(d.language.indexOf("-")>0){var L=d.language.split("-")[0];d.language=[d.language,L]}else d.language=[d.language];if(e.isArray(d.language)){var j=new u;d.language.push("en");for(var P=d.language,k=0;k<P.length;k++){var I=P[k],R={};try{R=u.loadPath(I)}catch(e){try{I=this.defaults.amdLanguageBase+I,R=u.loadPath(I)}catch(e){d.debug&&window.console&&console.warn&&console.warn('CzrSelect2: The language file for "'+I+'" could not be automatically loaded. A fallback will be used instead.');continue}}j.extend(R)}d.translations=j}else{var M=u.loadPath(this.defaults.amdLanguageBase+"en"),U=new u(d.language);U.extend(M),d.translations=U}return d},O.prototype.reset=function(){function t(e){return e.replace(/[^\u0000-\u007E]/g,function(e){return d[e]||e})}this.defaults={amdBase:"./",amdLanguageBase:"./i18n/",closeOnSelect:!0,debug:!1,dropdownAutoWidth:!1,escapeMarkup:c.escapeMarkup,language:E,matcher:function n(r,i){if("string"!=typeof r.term||""===r.term.trim())return i;if(i.children&&i.children.length>0){for(var o=e.extend(!0,{},i),s=i.children.length-1;s>=0;s--)null==n(r,i.children[s])&&o.children.splice(s,1);return o.children.length>0?o:n(r,o)}var a=t(i.text).toUpperCase(),l=t(r.term).toUpperCase();return a.indexOf(l)>-1?i:null},minimumInputLength:0,maximumInputLength:0,maximumSelectionLength:0,minimumResultsForSearch:0,selectOnClose:!1,sorter:function(e){return e},templateResult:function(e){return e.text},templateSelection:function(e){return e.text},theme:"default",width:"resolve"}},O.prototype.set=function(t,n){var r={};r[e.camelCase(t)]=n;var i=c._convertData(r);e.extend(this.defaults,i)},new O}),t.define("czrSelect2/options",["require","jquery","./defaults","./utils"],function(e,t,n,r){function i(t,i){if(this.options=t,null!=i&&this.fromElement(i),this.options=n.apply(this.options),i&&i.is("input")){var o=e(this.get("amdBase")+"compat/inputData");this.options.dataAdapter=r.Decorate(this.options.dataAdapter,o)}}return i.prototype.fromElement=function(e){var n=["czrSelect2"];null==this.options.multiple&&(this.options.multiple=e.prop("multiple")),null==this.options.disabled&&(this.options.disabled=e.prop("disabled")),null==this.options.language&&(e.prop("lang")?this.options.language=e.prop("lang").toLowerCase():e.closest("[lang]").prop("lang")&&(this.options.language=e.closest("[lang]").prop("lang"))),null==this.options.dir&&(e.prop("dir")?this.options.dir=e.prop("dir"):e.closest("[dir]").prop("dir")?this.options.dir=e.closest("[dir]").prop("dir"):this.options.dir="ltr"),e.prop("disabled",this.options.disabled),e.prop("multiple",this.options.multiple),e.data("czrSelect2Tags")&&(this.options.debug&&window.console&&console.warn&&console.warn('CzrSelect2: The `data-czrSelect2-tags` attribute has been changed to use the `data-data` and `data-tags="true"` attributes and will be removed in future versions of CzrSelect2.'),e.data("data",e.data("czrSelect2Tags")),e.data("tags",!0)),e.data("ajaxUrl")&&(this.options.debug&&window.console&&console.warn&&console.warn("CzrSelect2: The `data-ajax-url` attribute has been changed to `data-ajax--url` and support for the old attribute will be removed in future versions of CzrSelect2."),e.attr("ajax--url",e.data("ajaxUrl")),e.data("ajax--url",e.data("ajaxUrl")));var i={};i=t.fn.jquery&&"1."==t.fn.jquery.substr(0,2)&&e[0].dataset?t.extend(!0,{},e[0].dataset,e.data()):e.data();var o=t.extend(!0,{},i);for(var s in o=r._convertData(o))t.inArray(s,n)>-1||(t.isPlainObject(this.options[s])?t.extend(this.options[s],o[s]):this.options[s]=o[s]);return this},i.prototype.get=function(e){return this.options[e]},i.prototype.set=function(e,t){this.options[e]=t},i}),t.define("czrSelect2/core",["jquery","./options","./utils","./keys"],function(e,t,n,r){var i=function(e,n){null!=e.data("czrSelect2")&&e.data("czrSelect2").destroy(),this.$element=e,this.id=this._generateId(e),n=n||{},this.options=new t(n,e),i.__super__.constructor.call(this);var r=e.attr("tabindex")||0;e.data("old-tabindex",r),e.attr("tabindex","-1");var o=this.options.get("dataAdapter");this.dataAdapter=new o(e,this.options);var s=this.render();this._placeContainer(s);var a=this.options.get("selectionAdapter");this.selection=new a(e,this.options),this.$selection=this.selection.render(),this.selection.position(this.$selection,s);var l=this.options.get("dropdownAdapter");this.dropdown=new l(e,this.options),this.$dropdown=this.dropdown.render(),this.dropdown.position(this.$dropdown,s);var c=this.options.get("resultsAdapter");this.results=new c(e,this.options,this.dataAdapter),this.$results=this.results.render(),this.results.position(this.$results,this.$dropdown);var u=this;this._bindAdapters(),this._registerDomEvents(),this._registerDataEvents(),this._registerSelectionEvents(),this._registerDropdownEvents(),this._registerResultsEvents(),this._registerEvents(),this.dataAdapter.current(function(e){u.trigger("selection:update",{data:e})}),e.addClass("czrSelect2-hidden-accessible"),e.attr("aria-hidden","true"),this._syncAttributes(),e.data("czrSelect2",this)};return n.Extend(i,n.Observable),i.prototype._generateId=function(e){return"czrSelect2-"+(null!=e.attr("id")?e.attr("id"):null!=e.attr("name")?e.attr("name")+"-"+n.generateChars(2):n.generateChars(4)).replace(/(:|\.|\[|\]|,)/g,"")},i.prototype._placeContainer=function(e){e.insertAfter(this.$element);var t=this._resolveWidth(this.$element,this.options.get("width"));null!=t&&e.css("width",t)},i.prototype._resolveWidth=function(e,t){var n=/^width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i;if("resolve"==t){var r=this._resolveWidth(e,"style");return null!=r?r:this._resolveWidth(e,"element")}if("element"==t){var i=e.outerWidth(!1);return i<=0?"auto":i+"px"}if("style"==t){var o=e.attr("style");if("string"!=typeof o)return null;for(var s=o.split(";"),a=0,l=s.length;a<l;a+=1){var c=s[a].replace(/\s/g,"").match(n);if(null!==c&&c.length>=1)return c[1]}return null}return t},i.prototype._bindAdapters=function(){this.dataAdapter.bind(this,this.$container),this.selection.bind(this,this.$container),this.dropdown.bind(this,this.$container),this.results.bind(this,this.$container)},i.prototype._registerDomEvents=function(){var t=this;this.$element.on("change.czrSelect2",function(){t.dataAdapter.current(function(e){t.trigger("selection:update",{data:e})})}),this.$element.on("focus.czrSelect2",function(e){t.trigger("focus",e)}),this._syncA=n.bind(this._syncAttributes,this),this._syncS=n.bind(this._syncSubtree,this),this.$element[0].attachEvent&&this.$element[0].attachEvent("onpropertychange",this._syncA);var r=window.MutationObserver||window.WebKitMutationObserver||window.MozMutationObserver;null!=r?(this._observer=new r(function(n){e.each(n,t._syncA),e.each(n,t._syncS)}),this._observer.observe(this.$element[0],{attributes:!0,childList:!0,subtree:!1})):this.$element[0].addEventListener&&(this.$element[0].addEventListener("DOMAttrModified",t._syncA,!1),this.$element[0].addEventListener("DOMNodeInserted",t._syncS,!1),this.$element[0].addEventListener("DOMNodeRemoved",t._syncS,!1))},i.prototype._registerDataEvents=function(){var e=this;this.dataAdapter.on("*",function(t,n){e.trigger(t,n)})},i.prototype._registerSelectionEvents=function(){var t=this,n=["toggle","focus"];this.selection.on("toggle",function(){t.toggleDropdown()}),this.selection.on("focus",function(e){t.focus(e)}),this.selection.on("*",function(r,i){-1===e.inArray(r,n)&&t.trigger(r,i)})},i.prototype._registerDropdownEvents=function(){var e=this;this.dropdown.on("*",function(t,n){e.trigger(t,n)})},i.prototype._registerResultsEvents=function(){var e=this;this.results.on("*",function(t,n){e.trigger(t,n)})},i.prototype._registerEvents=function(){var e=this;this.on("open",function(){e.$container.addClass("czrSelect2-container--open")}),this.on("close",function(){e.$container.removeClass("czrSelect2-container--open")}),this.on("enable",function(){e.$container.removeClass("czrSelect2-container--disabled")}),this.on("disable",function(){e.$container.addClass("czrSelect2-container--disabled")}),this.on("blur",function(){e.$container.removeClass("czrSelect2-container--focus")}),this.on("query",function(t){e.isOpen()||e.trigger("open",{}),this.dataAdapter.query(t,function(n){e.trigger("results:all",{data:n,query:t})})}),this.on("query:append",function(t){this.dataAdapter.query(t,function(n){e.trigger("results:append",{data:n,query:t})})}),this.on("keypress",function(t){var n=t.which;e.isOpen()?n===r.ESC||n===r.TAB||n===r.UP&&t.altKey?(e.close(),t.preventDefault()):n===r.ENTER?(e.trigger("results:select",{}),t.preventDefault()):n===r.SPACE&&t.ctrlKey?(e.trigger("results:toggle",{}),t.preventDefault()):n===r.UP?(e.trigger("results:previous",{}),t.preventDefault()):n===r.DOWN&&(e.trigger("results:next",{}),t.preventDefault()):(n===r.ENTER||n===r.SPACE||n===r.DOWN&&t.altKey)&&(e.open(),t.preventDefault())})},i.prototype._syncAttributes=function(){this.options.set("disabled",this.$element.prop("disabled")),this.options.get("disabled")?(this.isOpen()&&this.close(),this.trigger("disable",{})):this.trigger("enable",{})},i.prototype._syncSubtree=function(e,t){var n=!1,r=this;if(!e||!e.target||"OPTION"===e.target.nodeName||"OPTGROUP"===e.target.nodeName){if(t)if(t.addedNodes&&t.addedNodes.length>0)for(var i=0;i<t.addedNodes.length;i++){t.addedNodes[i].selected&&(n=!0)}else t.removedNodes&&t.removedNodes.length>0&&(n=!0);else n=!0;n&&this.dataAdapter.current(function(e){r.trigger("selection:update",{data:e})})}},i.prototype.trigger=function(e,t){var n=i.__super__.trigger,r={open:"opening",close:"closing",select:"selecting",unselect:"unselecting"};if(void 0===t&&(t={}),e in r){var o=r[e],s={prevented:!1,name:e,args:t};if(n.call(this,o,s),s.prevented)return void(t.prevented=!0)}n.call(this,e,t)},i.prototype.toggleDropdown=function(){this.options.get("disabled")||(this.isOpen()?this.close():this.open())},i.prototype.open=function(){this.isOpen()||this.trigger("query",{})},i.prototype.close=function(){this.isOpen()&&this.trigger("close",{})},i.prototype.isOpen=function(){return this.$container.hasClass("czrSelect2-container--open")},i.prototype.hasFocus=function(){return this.$container.hasClass("czrSelect2-container--focus")},i.prototype.focus=function(e){this.hasFocus()||(this.$container.addClass("czrSelect2-container--focus"),this.trigger("focus",{}))},i.prototype.enable=function(e){this.options.get("debug")&&window.console&&console.warn&&console.warn('CzrSelect2: The `czrSelect2("enable")` method has been deprecated and will be removed in later CzrSelect2 versions. Use $element.prop("disabled") instead.'),null!=e&&0!==e.length||(e=[!0]);var t=!e[0];this.$element.prop("disabled",t)},i.prototype.data=function(){this.options.get("debug")&&arguments.length>0&&window.console&&console.warn&&console.warn('CzrSelect2: Data can no longer be set using `czrSelect2("data")`. You should consider setting the value instead using `$element.val()`.');var e=[];return this.dataAdapter.current(function(t){e=t}),e},i.prototype.val=function(t){if(this.options.get("debug")&&window.console&&console.warn&&console.warn('CzrSelect2: The `czrSelect2("val")` method has been deprecated and will be removed in later CzrSelect2 versions. Use $element.val() instead.'),null==t||0===t.length)return this.$element.val();var n=t[0];e.isArray(n)&&(n=e.map(n,function(e){return e.toString()})),this.$element.val(n).trigger("change")},i.prototype.destroy=function(){this.$container.remove(),this.$element[0].detachEvent&&this.$element[0].detachEvent("onpropertychange",this._syncA),null!=this._observer?(this._observer.disconnect(),this._observer=null):this.$element[0].removeEventListener&&(this.$element[0].removeEventListener("DOMAttrModified",this._syncA,!1),this.$element[0].removeEventListener("DOMNodeInserted",this._syncS,!1),this.$element[0].removeEventListener("DOMNodeRemoved",this._syncS,!1)),this._syncA=null,this._syncS=null,this.$element.off(".czrSelect2"),this.$element.attr("tabindex",this.$element.data("old-tabindex")),this.$element.removeClass("czrSelect2-hidden-accessible"),this.$element.attr("aria-hidden","false"),this.$element.removeData("czrSelect2"),this.dataAdapter.destroy(),this.selection.destroy(),this.dropdown.destroy(),this.results.destroy(),this.dataAdapter=null,this.selection=null,this.dropdown=null,this.results=null},i.prototype.render=function(){var t=e('<span class="czrSelect2 czrSelect2-container"><span class="selection"></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>');return t.attr("dir",this.options.get("dir")),this.$container=t,this.$container.addClass("czrSelect2-container--"+this.options.get("theme")),t.data("element",this.$element),t},i}),t.define("jquery-mousewheel",["jquery"],function(e){return e}),t.define("jquery.czrSelect2",["jquery","jquery-mousewheel","./czrSelect2/core","./czrSelect2/defaults"],function(e,t,n,r){if(null==e.fn.czrSelect2){var i=["open","close","destroy"];e.fn.czrSelect2=function(t){if("object"==typeof(t=t||{}))return this.each(function(){var r=e.extend(!0,{},t);new n(e(this),r)}),this;if("string"==typeof t){var r,o=Array.prototype.slice.call(arguments,1);return this.each(function(){var n=e(this).data("czrSelect2");null==n&&window.console&&console.error&&console.error("The czrSelect2('"+t+"') method was called on an element that is not using CzrSelect2."),r=n[t].apply(n,o)}),e.inArray(t,i)>-1?this:r}throw new Error("Invalid arguments for CzrSelect2: "+t)}}return null==e.fn.czrSelect2.defaults&&(e.fn.czrSelect2.defaults=r),n}),{define:t.define,require:t.require}}(),n=t.require("jquery.czrSelect2");return e.fn.czrSelect2.amd=t,n});/*! rangeslider.js - v2.3.2 | (c) 2018 @andreruffert | MIT license | https://github.com/andreruffert/rangeslider.js */
!function(a){"use strict";"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?module.exports=a(require("jquery")):a(jQuery)}(function(a){"use strict";function b(){var a=document.createElement("input");return a.setAttribute("type","range"),"text"!==a.type}function c(a,b){var c=Array.prototype.slice.call(arguments,2);return setTimeout(function(){return a.apply(null,c)},b)}function d(a,b){return b=b||100,function(){if(!a.debouncing){var c=Array.prototype.slice.apply(arguments);a.lastReturnVal=a.apply(window,c),a.debouncing=!0}return clearTimeout(a.debounceTimeout),a.debounceTimeout=setTimeout(function(){a.debouncing=!1},b),a.lastReturnVal}}function e(a){return a&&(0===a.offsetWidth||0===a.offsetHeight||!1===a.open)}function f(a){for(var b=[],c=a.parentNode;e(c);)b.push(c),c=c.parentNode;return b}function g(a,b){function c(a){void 0!==a.open&&(a.open=!a.open)}var d=f(a),e=d.length,g=[],h=a[b];if(e){for(var i=0;i<e;i++)g[i]=d[i].style.cssText,d[i].style.setProperty?d[i].style.setProperty("display","block","important"):d[i].style.cssText+=";display: block !important",d[i].style.height="0",d[i].style.overflow="hidden",d[i].style.visibility="hidden",c(d[i]);h=a[b];for(var j=0;j<e;j++)d[j].style.cssText=g[j],c(d[j])}return h}function h(a,b){var c=parseFloat(a);return Number.isNaN(c)?b:c}function i(a){return a.charAt(0).toUpperCase()+a.substr(1)}function j(b,e){if(this.$window=a(window),this.$document=a(document),this.$element=a(b),this.options=a.extend({},n,e),this.polyfill=this.options.polyfill,this.orientation=this.$element[0].getAttribute("data-orientation")||this.options.orientation,this.onInit=this.options.onInit,this.onSlide=this.options.onSlide,this.onSlideEnd=this.options.onSlideEnd,this.DIMENSION=o.orientation[this.orientation].dimension,this.DIRECTION=o.orientation[this.orientation].direction,this.DIRECTION_STYLE=o.orientation[this.orientation].directionStyle,this.COORDINATE=o.orientation[this.orientation].coordinate,this.polyfill&&m)return!1;this.identifier="js-"+k+"-"+l++,this.startEvent=this.options.startEvent.join("."+this.identifier+" ")+"."+this.identifier,this.moveEvent=this.options.moveEvent.join("."+this.identifier+" ")+"."+this.identifier,this.endEvent=this.options.endEvent.join("."+this.identifier+" ")+"."+this.identifier,this.toFixed=(this.step+"").replace(".","").length-1,this.$fill=a('<div class="'+this.options.fillClass+'" />'),this.$handle=a('<div class="'+this.options.handleClass+'" />'),this.$range=a('<div class="'+this.options.rangeClass+" "+this.options[this.orientation+"Class"]+'" id="'+this.identifier+'" />').insertAfter(this.$element).prepend(this.$fill,this.$handle),this.$element.css({position:"absolute",width:"1px",height:"1px",overflow:"hidden",opacity:"0"}),this.handleDown=a.proxy(this.handleDown,this),this.handleMove=a.proxy(this.handleMove,this),this.handleEnd=a.proxy(this.handleEnd,this),this.init();var f=this;this.$window.on("resize."+this.identifier,d(function(){c(function(){f.update(!1,!1)},300)},20)),this.$document.on(this.startEvent,"#"+this.identifier+":not(."+this.options.disabledClass+")",this.handleDown),this.$element.on("change."+this.identifier,function(a,b){if(!b||b.origin!==f.identifier){var c=a.target.value,d=f.getPositionFromValue(c);f.setPosition(d)}})}Number.isNaN=Number.isNaN||function(a){return"number"==typeof a&&a!==a};var k="rangeslider",l=0,m=b(),n={polyfill:!0,orientation:"horizontal",rangeClass:"rangeslider",disabledClass:"rangeslider--disabled",activeClass:"rangeslider--active",horizontalClass:"rangeslider--horizontal",verticalClass:"rangeslider--vertical",fillClass:"rangeslider__fill",handleClass:"rangeslider__handle",startEvent:["mousedown","touchstart","pointerdown"],moveEvent:["mousemove","touchmove","pointermove"],endEvent:["mouseup","touchend","pointerup"]},o={orientation:{horizontal:{dimension:"width",direction:"left",directionStyle:"left",coordinate:"x"},vertical:{dimension:"height",direction:"top",directionStyle:"bottom",coordinate:"y"}}};return j.prototype.init=function(){this.update(!0,!1),this.onInit&&"function"==typeof this.onInit&&this.onInit()},j.prototype.update=function(a,b){a=a||!1,a&&(this.min=h(this.$element[0].getAttribute("min"),0),this.max=h(this.$element[0].getAttribute("max"),100),this.value=h(this.$element[0].value,Math.round(this.min+(this.max-this.min)/2)),this.step=h(this.$element[0].getAttribute("step"),1)),this.handleDimension=g(this.$handle[0],"offset"+i(this.DIMENSION)),this.rangeDimension=g(this.$range[0],"offset"+i(this.DIMENSION)),this.maxHandlePos=this.rangeDimension-this.handleDimension,this.grabPos=this.handleDimension/2,this.position=this.getPositionFromValue(this.value),this.$element[0].disabled?this.$range.addClass(this.options.disabledClass):this.$range.removeClass(this.options.disabledClass),this.setPosition(this.position,b)},j.prototype.handleDown=function(a){if(a.preventDefault(),!(a.button&&0!==a.button||(this.$document.on(this.moveEvent,this.handleMove),this.$document.on(this.endEvent,this.handleEnd),this.$range.addClass(this.options.activeClass),(" "+a.target.className+" ").replace(/[\n\t]/g," ").indexOf(this.options.handleClass)>-1))){var b=this.getRelativePosition(a),c=this.$range[0].getBoundingClientRect()[this.DIRECTION],d=this.getPositionFromNode(this.$handle[0])-c,e="vertical"===this.orientation?this.maxHandlePos-(b-this.grabPos):b-this.grabPos;this.setPosition(e),b>=d&&b<d+this.handleDimension&&(this.grabPos=b-d)}},j.prototype.handleMove=function(a){a.preventDefault();var b=this.getRelativePosition(a),c="vertical"===this.orientation?this.maxHandlePos-(b-this.grabPos):b-this.grabPos;this.setPosition(c)},j.prototype.handleEnd=function(a){a.preventDefault(),this.$document.off(this.moveEvent,this.handleMove),this.$document.off(this.endEvent,this.handleEnd),this.$range.removeClass(this.options.activeClass),this.$element.trigger("change",{origin:this.identifier}),this.onSlideEnd&&"function"==typeof this.onSlideEnd&&this.onSlideEnd(this.position,this.value)},j.prototype.cap=function(a,b,c){return a<b?b:a>c?c:a},j.prototype.setPosition=function(a,b){var c,d;void 0===b&&(b=!0),c=this.getValueFromPosition(this.cap(a,0,this.maxHandlePos)),d=this.getPositionFromValue(c),this.$fill[0].style[this.DIMENSION]=d+this.grabPos+"px",this.$handle[0].style[this.DIRECTION_STYLE]=d+"px",this.setValue(c),this.position=d,this.value=c,b&&this.onSlide&&"function"==typeof this.onSlide&&this.onSlide(d,c)},j.prototype.getPositionFromNode=function(a){for(var b=0;null!==a;)b+=a.offsetLeft,a=a.offsetParent;return b},j.prototype.getRelativePosition=function(a){var b=i(this.COORDINATE),c=this.$range[0].getBoundingClientRect()[this.DIRECTION],d=0;return void 0!==a.originalEvent["client"+b]?d=a.originalEvent["client"+b]:a.originalEvent.touches&&a.originalEvent.touches[0]&&void 0!==a.originalEvent.touches[0]["client"+b]?d=a.originalEvent.touches[0]["client"+b]:a.currentPoint&&void 0!==a.currentPoint[this.COORDINATE]&&(d=a.currentPoint[this.COORDINATE]),d-c},j.prototype.getPositionFromValue=function(a){var b;return b=(a-this.min)/(this.max-this.min),Number.isNaN(b)?0:b*this.maxHandlePos},j.prototype.getValueFromPosition=function(a){var b,c;return b=a/(this.maxHandlePos||1),c=this.step*Math.round(b*(this.max-this.min)/this.step)+this.min,Number(c.toFixed(this.toFixed))},j.prototype.setValue=function(a){a===this.value&&""!==this.$element[0].value||this.$element.val(a).trigger("input",{origin:this.identifier})},j.prototype.destroy=function(){this.$document.off("."+this.identifier),this.$window.off("."+this.identifier),this.$element.off("."+this.identifier).removeAttr("style").removeData("plugin_"+k),this.$range&&this.$range.length&&this.$range[0].parentNode.removeChild(this.$range[0])},a.fn[k]=function(b){var c=Array.prototype.slice.call(arguments,1);return this.each(function(){var d=a(this),e=d.data("plugin_"+k);e||d.data("plugin_"+k,e=new j(this,b)),"string"==typeof b&&e[b].apply(e,c)})},"rangeslider.js is available in jQuery context e.g $(selector).rangeslider(options);"});/*!
 * wp-color-picker-alpha
 *
 * Overwrite Automattic Iris for enabled Alpha Channel in wpColorPicker
 * activated when data-alpha is true
 *
 * Version: v2.1.4
 * https://github.com/kallookoo/wp-color-picker-alpha
 * Licensed under the GPLv2 license.
 */
/*! wp-color-picker-alpha v2.1.4, https://github.com/kallookoo/wp-color-picker-alpha, GPLv2 Licensed */
!function(t){if(!t.wp.wpColorPicker.prototype._hasAlpha){var e,o="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAAHnlligAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAHJJREFUeNpi+P///4EDBxiAGMgCCCAGFB5AADGCRBgYDh48CCRZIJS9vT2QBAggFBkmBiSAogxFBiCAoHogAKIKAlBUYTELAiAmEtABEECk20G6BOmuIl0CIMBQ/IEMkO0myiSSraaaBhZcbkUOs0HuBwDplz5uFJ3Z4gAAAABJRU5ErkJggg==",r='<div class="wp-picker-holder" />',i='<div class="wp-picker-container" />',a='<input type="button" class="button button-small" />',n=void 0!==nb_wpColorPickerL10n.current;if(n)e='<a tabindex="0" class="wp-color-result" />';else{e='<button type="button" class="button wp-color-result" aria-expanded="false"><span class="wp-color-result-text"></span></button>';var l="<label></label>",s='<span class="screen-reader-text"></span>'}Color.fn.toString=function(){if(this._alpha<1)return this.toCSS("rgba",this._alpha).replace(/\s+/g,"");var t=parseInt(this._color,10).toString(16);return this.error?"":(t.length<6&&(t=("00000"+t).substr(-6)),"#"+t)},t.widget("wp.wpColorPicker",t.wp.wpColorPicker,{_hasAlpha:!0,_create:function(){if(t.support.iris){var p=this,c=p.element;if(t.extend(p.options,c.data()),"hue"===p.options.type)return p._createHueOnly();p.close=t.proxy(p.close,p),p.initialValue=c.val(),c.addClass("wp-color-picker"),n?(c.hide().wrap(i),p.wrap=c.parent(),p.toggler=t(e).insertBefore(c).css({backgroundColor:p.initialValue}).attr("title",nb_wpColorPickerL10n.pick).attr("data-current",nb_wpColorPickerL10n.current),p.pickerContainer=t(r).insertAfter(c),p.button=t(a).addClass("hidden")):(c.parent("label").length||(c.wrap(l),p.wrappingLabelText=t(s).insertBefore(c).text(nb_wpColorPickerL10n.defaultLabel)),p.wrappingLabel=c.parent(),p.wrappingLabel.wrap(i),p.wrap=p.wrappingLabel.parent(),p.toggler=t(e).insertBefore(p.wrappingLabel).css({backgroundColor:p.initialValue}),p.toggler.find(".wp-color-result-text").text(nb_wpColorPickerL10n.pick),p.pickerContainer=t(r).insertAfter(p.wrappingLabel),p.button=t(a)),p.options.defaultColor?(p.button.addClass("wp-picker-default").val(nb_wpColorPickerL10n.defaultString),n||p.button.attr("aria-label",nb_wpColorPickerL10n.defaultAriaLabel)):(p.button.addClass("wp-picker-clear").val(nb_wpColorPickerL10n.clear),n||p.button.attr("aria-label",nb_wpColorPickerL10n.clearAriaLabel)),n?c.wrap('<span class="wp-picker-input-wrap" />').after(p.button):(p.wrappingLabel.wrap('<span class="wp-picker-input-wrap hidden" />').after(p.button),p.inputWrapper=c.closest(".wp-picker-input-wrap")),c.iris({target:p.pickerContainer,hide:p.options.hide,width:p.options.width,mode:p.options.mode,palettes:p.options.palettes,change:function(t,e){p.options.alpha?(p.toggler.css({"background-image":"url("+o+")"}),n?p.toggler.html('<span class="color-alpha" />'):(p.toggler.css({position:"relative"}),0==p.toggler.find("span.color-alpha").length&&p.toggler.append('<span class="color-alpha" />')),p.toggler.find("span.color-alpha").css({width:"30px",height:"100%",position:"absolute",top:0,left:0,"border-top-left-radius":"2px","border-bottom-left-radius":"2px",background:e.color.toString()})):p.toggler.css({backgroundColor:e.color.toString()}),"function"==typeof p.options.change&&p.options.change.call(this,t,e)}}),c.val(p.initialValue),p._addListeners(),p.options.hide||p.toggler.trigger("click"),c.on("czr-colorpicker-close",function(){p.toggler.hasClass("wp-picker-open")&&p.close()})}},_addListeners:function(){var e=this;e.wrap.on("click.wpcolorpicker",function(t){t.stopPropagation()}),e.toggler.on("click",function(){e.toggler.hasClass("wp-picker-open")?e.close():e.open()}),e.element.on("change",function(o){(""===t(this).val()||e.element.hasClass("iris-error"))&&(e.options.alpha?(n&&e.toggler.removeAttr("style"),e.toggler.find("span.color-alpha").css("backgroundColor","")):e.toggler.css("backgroundColor",""),"function"==typeof e.options.clear&&e.options.clear.call(this,o))}),e.button.on("click",function(o){t(this).hasClass("wp-picker-clear")?(e.element.val(""),e.options.alpha?(n&&e.toggler.removeAttr("style"),e.toggler.find("span.color-alpha").css("backgroundColor","")):e.toggler.css("backgroundColor",""),"function"==typeof e.options.clear&&e.options.clear.call(this,o)):t(this).hasClass("wp-picker-default")&&e.element.val(e.options.defaultColor).trigger("change")})},open:function(){t("body").find(".wp-color-picker").not(this.element).each(function(){t(this).trigger("czr-colorpicker-close")}),this.element.iris("toggle"),this.inputWrapper.removeClass("hidden"),this.wrap.addClass("wp-picker-active"),this.toggler.addClass("wp-picker-open").attr("aria-expanded","true")},close:function(){try{this.element.iris("toggle")}catch(t){console.log("color-picker => error on ::close()",t)}this.inputWrapper.addClass("hidden"),this.wrap.removeClass("wp-picker-active"),this.toggler.removeClass("wp-picker-open").attr("aria-expanded","false")}}),t.widget("a8c.iris",t.a8c.iris,{_create:function(){if(this._super(),this.options.alpha=this.element.data("alpha")||!1,this.element.is(":input")||(this.options.alpha=!1),void 0!==this.options.alpha&&this.options.alpha){var e=this,o=e.element,r=t('<div class="iris-strip iris-slider iris-alpha-slider"><div class="iris-slider-offset iris-slider-offset-alpha"></div></div>').appendTo(e.picker.find(".iris-picker-inner")),i={aContainer:r,aSlider:r.find(".iris-slider-offset-alpha")};void 0!==o.data("custom-width")?e.options.customWidth=parseInt(o.data("custom-width"))||0:e.options.customWidth=100,e.options.defaultWidth=o.width(),(e._color._alpha<1||-1!=e._color.toString().indexOf("rgb"))&&o.width(parseInt(e.options.defaultWidth+e.options.customWidth)),t.each(i,function(t,o){e.controls[t]=o}),e.controls.square.css({"margin-right":"0"});var a=e.picker.width()-e.controls.square.width()-20,n=a/6,l=a/2-n;t.each(["aContainer","strip"],function(t,o){e.controls[o].width(l).css({"margin-left":n+"px"})}),e._initControls(),e._change()}},_initControls:function(){if(this._super(),this.options.alpha){var t=this;t.controls.aSlider.slider({orientation:"vertical",min:0,max:100,step:1,value:parseInt(100*t._color._alpha),slide:function(e,o){t._color._alpha=parseFloat(o.value/100),t._change.apply(t,arguments)}})}},_change:function(){this._super();var t=this,e=t.element;if(this.options.alpha){var r=t.controls,i=parseInt(100*t._color._alpha),a=t._color.toRgb(),n=["rgb("+a.r+","+a.g+","+a.b+") 0%","rgba("+a.r+","+a.g+","+a.b+", 0) 100%"],l=t.options.defaultWidth,s=t.options.customWidth,p=t.picker.closest(".wp-picker-container").find(".wp-color-result");r.aContainer.css({background:"linear-gradient(to bottom, "+n.join(", ")+"), url("+o+")"}),p.hasClass("wp-picker-open")&&(r.aSlider.slider("value",i),t._color._alpha<1?(r.strip.attr("style",r.strip.attr("style").replace(/rgba\(([0-9]+,)(\s+)?([0-9]+,)(\s+)?([0-9]+)(,(\s+)?[0-9\.]+)\)/g,"rgb($1$3$5)")),e.width(parseInt(l+s))):e.width(l))}(e.data("reset-alpha")||!1)&&t.picker.find(".iris-palette-container").on("click.palette",".iris-palette",function(){t._color._alpha=1,t.active="external",t._change()})},_addInputListeners:function(t){var e=this,o=function(o){var r=new Color(t.val()),i=t.val();t.removeClass("iris-error"),r.error?""!==i&&t.addClass("iris-error"):r.toString()!==e._color.toString()&&("keyup"===o.type&&i.match(/^[0-9a-fA-F]{3}$/)||e._setOption("color",r.toString()))};t.on("change",o).on("keyup",e._debounce(o,100)),e.options.hide&&t.on("focus",function(){e.show()})}})}}(jQuery);
( function ( api, $, _ ) {
      /*****************************************************************************
      * REACT TO PREVIEW DEVICE SWITCH => send device to preview
      *****************************************************************************/
      api.bind( 'ready' , function() {
          if ( api.previewedDevice ) {
                api.previewedDevice.bind( function( device ) {
                      api.previewer.send( 'previewed-device', device );
                });
          }
      });
})( wp.customize , jQuery, _);//NOT USED YET
// var czr_debug = {
//       log: function(o) {debug.queue.push(['log', arguments, debug.stack.slice(0)]); if (window.console && typeof window.console.log == 'function') {window.console.log(o);}},
//       error: function(o) {debug.queue.push(['error', arguments, debug.stack.slice(0)]); if (window.console && typeof window.console.error == 'function') {window.console.error(o);}},
//       queue: [],
//       stack: []
// };
//var api = api || wp.customize, $ = $ || jQuery;
( function ( api, $, _ ) {
      //@return [] for console method
      //@bgCol @textCol are hex colors
      //@arguments : the original console arguments
      var _prettyPrintLog = function( args ) {
            var _defaults = {
                  bgCol : '#5ed1f5',
                  textCol : '#000',
                  consoleArguments : []
            };
            args = _.extend( _defaults, args );

            var _toArr = Array.from( args.consoleArguments ),
                _truncate = function( string ){
                      if ( ! _.isString( string ) )
                        return '';
                      return string.length > 300 ? string.substr( 0, 299 ) + '...' : string;
                };

            //if the array to print is not composed exclusively of strings, then let's stringify it
            //else join(' ')
            if ( ! _.isEmpty( _.filter( _toArr, function( it ) { return ! _.isString( it ); } ) ) ) {
                  _toArr =  JSON.stringify( _toArr.join(' ') );
            } else {
                  _toArr = _toArr.join(' ');
            }
            return [
                  '%c ' + _truncate( _toArr ),
                  [ 'background:' + args.bgCol, 'color:' + args.textCol, 'display: block;' ].join(';')
            ];
      };

      var _wrapLogInsideTags = function( title, msg, bgColor ) {
            //fix for IE, because console is only defined when in F12 debugging mode in IE
            if ( ( _.isUndefined( console ) && typeof window.console.log != 'function' ) )
              return;
            if ( serverControlParams.isDevMode ) {
                  if ( _.isUndefined( msg ) ) {
                        console.log.apply( console, _prettyPrintLog( { bgCol : bgColor, textCol : '#000', consoleArguments : [ '<' + title + '>' ] } ) );
                  } else {
                        console.log.apply( console, _prettyPrintLog( { bgCol : bgColor, textCol : '#000', consoleArguments : [ '<' + title + '>' ] } ) );
                        console.log( msg );
                        console.log.apply( console, _prettyPrintLog( { bgCol : bgColor, textCol : '#000', consoleArguments : [ '</' + title + '>' ] } ) );
                  }
            } else {
                  console.log.apply( console, _prettyPrintLog( { bgCol : bgColor, textCol : '#000', consoleArguments : [ title ] } ) );
            }
      };
      //Dev mode aware and IE compatible api.consoleLog()
      api.consoleLog = function() {
            if ( ! serverControlParams.isDevMode )
              return;
            //fix for IE, because console is only defined when in F12 debugging mode in IE
            if ( ( _.isUndefined( console ) && typeof window.console.log != 'function' ) )
              return;
            console.log.apply( console, _prettyPrintLog( { consoleArguments : arguments } ) );
            console.log( 'Unstyled console message : ', arguments );
      };

      api.errorLog = function() {
            //fix for IE, because console is only defined when in F12 debugging mode in IE
            if ( ( _.isUndefined( console ) && typeof window.console.log != 'function' ) )
              return;

            console.log.apply( console, _prettyPrintLog( { bgCol : '#ffd5a0', textCol : '#000', consoleArguments : arguments } ) );
            // if ( serverControlParams.isDevMode ) {
            //       console.log( 'Unstyled error message : ', arguments );
            // }
      };

      api.errare = function( title, msg ) { _wrapLogInsideTags( title, msg, '#ffd5a0' ); };
      api.infoLog = function( title, msg ) { _wrapLogInsideTags( title, msg, '#5ed1f5' ); };

      api.czr_isChangeSetOn = function() {
            return serverControlParams.isChangeSetOn && true === true;//&& true === true is just there to hackily cast the returned value as boolean.
      };
})( wp.customize , jQuery, _);
( function ( api, $, _ ) {
      //SET THE ACTIVE STATE OF THE THEMES SECTION BASED ON WHAT THE SERVER SENT
      api.bind('ready', function() {
            var _do = function() {
                  // the themeServerControlParams global is printed only with Customizr and Hueman
                  if ( _.isUndefined( window.themeServerControlParams ) || _.isUndefined( themeServerControlParams.isThemeSwitchOn ) )
                    return;

                  if ( ! themeServerControlParams.isThemeSwitchOn ) {
                      //reset the callbacks
                      api.panel('themes').active.callbacks = $.Callbacks();
                      api.panel('themes').active( themeServerControlParams.isThemeSwitchOn );
                  }
            };
            if ( api.panel.has( 'themes') ) {
                  _do();
            } else {
                  api.panel.when( 'themes', function( _s ) {
                        _do();
                  });
            }
      });
})( wp.customize , jQuery, _);
( function ( api, $, _ ) {
      /*****************************************************************************
      * OBSERVE SECTIONS AND PANEL EXPANSION
      * /store the current expanded section and panel
      *****************************************************************************/
      api.czr_activeSectionId = api.czr_activeSectionId || new api.Value('');
      api.czr_activePanelId = api.czr_activePanelId || new api.Value('');

      api.bind('ready', function() {
            if ( 'function' != typeof api.Section ) {
              throw new Error( 'Your current version of WordPress does not support the customizer sections needed for this theme. Please upgrade WordPress to the latest version.' );
            }

            //STORE THE CURRENTLY ACTIVE SECTION AND PANELS IN AN OBSERVABLE VALUE
            //BIND EXISTING AND FUTURE SECTIONS AND PANELS


            var _storeCurrentSection = function( expanded, section_id ) {
                  api.czr_activeSectionId( expanded ? section_id : '' );
            };
            api.section.each( function( _sec ) {
                  //<@4.9compat>
                  // Bail if is 'publish_setting' section
                  if ( 'publish_settings' == _sec.id )
                    return;
                  //</@4.9compat>
                  _sec.expanded.bind( function( expanded ) { _storeCurrentSection( expanded, _sec.id ); } );
            });
            api.section.bind( 'add', function( section_instance ) {
                  //<@4.9compat>
                  // Bail if is 'publish_setting' section
                  if ( 'publish_settings' == section_instance.id )
                    return;
                  //</@4.9compat>
                  // api.trigger('czr-paint', { active_panel_id : section_instance.panel() } ); <= Deprecated, was used in old skope
                  section_instance.expanded.bind( function( expanded ) { _storeCurrentSection( expanded, section_instance.id ); } );
            });

            var _storeCurrentPanel = function( expanded, panel_id ) {
                  api.czr_activePanelId( expanded ? panel_id : '' );
                  //if the expanded panel id becomes empty (typically when switching back to the root panel), make sure that no section is set as currently active
                  //=> fixes the problem of add_menu section staying expanded when switching back to another panel
                  if ( _.isEmpty( api.czr_activePanelId() ) ) {
                        api.czr_activeSectionId( '' );
                  }
            };
            api.panel.each( function( _panel ) {
                  _panel.expanded.bind( function( expanded ) { _storeCurrentPanel( expanded, _panel.id ); } );
            });
            api.panel.bind( 'add', function( panel_instance ) {
                  panel_instance.expanded.bind( function( expanded ) { _storeCurrentPanel( expanded, panel_instance.id ); } );
            });
      });
})( wp.customize , jQuery, _);
( function ( api, $, _ ) {
      /*****************************************************************************
      *
      *****************************************************************************/
      api.bind('ready', function() {
          // do we have dynamic registration candidates
          var dynRegistrationCandidates = serverControlParams.paramsForDynamicRegistration || [];
          if ( ! _.isObject( serverControlParams.paramsForDynamicRegistration ) ) {
                api.errorLog( 'serverControlParams.paramsForDynamicRegistration should be an array');
          }

          _.each( serverControlParams.paramsForDynamicRegistration, function( dynParams, setId ) {
                // The dynamic registration should be explicitely set
                if ( dynParams.module_registration_params && true === dynParams.module_registration_params.dynamic_registration ) {
                      if ( serverControlParams.isDevMode ) {
                            registerDynamicModuleSettingControl( dynParams );
                      } else {
                            try { registerDynamicModuleSettingControl( dynParams ); } catch( er ) {
                                  api.errorLog( er );
                            }
                      }
                }
          });

      });//api.bind('ready', function()


      // Register the relevant setting and control based on the current skope ids
      // @return the setting id
      var registerDynamicModuleSettingControl = function( args ) {
            args = _.extend( {
                  'setting_id' : '',
                  'module_type' : '',
                  'option_value'  : [],
                  // 'setting' => array(
                  //     'type' => 'option',
                  //     'default'  => array(),
                  //     'transport' => 'refresh',
                  //     'setting_class' => '',//array( 'path' => '', 'name' => '' )
                  //     'sanitize_callback' => '',
                  //     'validate_callback' => '',
                  // ),
                  'setting' : {},
                  'section' : { id : '', title : '' },
                  'control' : {},
                  //'setting_type' : 'option'

            }, args );

            // we must have not empty setting_id, module_type
            if ( _.isEmpty( args.setting_id ) || _.isEmpty( args.module_type ) ) {
                  api.errare( 'registerDynamicModuleSettingControl => args', args );
                  throw new Error( 'registerDynamicModuleSettingControl => missing params when registrating a setting');
            }

            // the option value must be an array
            if ( ! _.isArray( args.option_value ) && ! _.isObject( args.option_value ) ) {
                  throw new Error( 'registerDynamicModuleSettingControl => the module values must be an array or an object');
            }

            var settingId =  args.setting_id,
                settingArgs = args.setting;

            api.CZR_Helpers.register( {
                  what : 'setting',
                  id : settingId,
                  dirty : ! _.isEmpty( args.option_value ),
                  value : args.option_value,
                  transport : settingArgs.transport || 'refresh',
                  type : settingArgs.type || 'option',
                  track : false// <= don't add it in any registered collection @see Nimble or Contextualizer
            });

            // MAYBE REGISTER THE SECTION
            var sectionArgs = args.section;
            if ( ! _.isEmpty( sectionArgs ) ) {
                  // Check if we have a correct section
                  if ( ! _.has( sectionArgs, 'id' ) ){
                        throw new Error( 'registerDynamicModuleSettingControl => missing section id for the section of setting : ' + settingId );
                  }

                  api.CZR_Helpers.register({
                        what : 'section',
                        id : sectionArgs.id,
                        title: sectionArgs.title || sectionArgs.id,
                        panel : _.isEmpty( sectionArgs.panel ) ? '' : sectionArgs.panel,
                        priority : sectionArgs.priority || 10,
                        track : false// <= don't add it in any registered collection @see Nimble or Contextualizer => this will prevent this container to be removed when cleaning the registered
                  });
            }

            // REGISTER THE CONTROL
            var controlId = settingId,
                controlArgs = args.control,
                ctrlSectionId;

            // Do we have a section ?
            if ( ! _.isEmpty( args.section ) ) {
                  ctrlSectionId = args.section.id;
            } else {
                  ctrlSectionId = controlArgs.section;
            }

            if ( _.isEmpty( ctrlSectionId ) ) {
                  api.errare( 'registerDynamicModuleSettingControl => missing section id for the control', args );
                  throw new Error( 'registerDynamicModuleSettingControl => missing section id for the section of setting : ' + settingId );
            }
            api.CZR_Helpers.register({
                  what : 'control',
                  id : controlId,
                  label : controlArgs.label || controlId,
                  type : 'czr_module',
                  module_type : args.module_type,//'czr_background',
                  section : ctrlSectionId,//'contx_body_bg',
                  priority : controlArgs.priority || 10,
                  settings : { default : settingId },
                  track : false// <= don't add it in any registered collection @see Nimble or Contextualizer => this will prevent this container to be removed when cleaning the registered
            });

            // if the currently expanded section is the one of the dynamic control
            // Awake the module => fire ready
            if ( api.section.has( ctrlSectionId ) && api.section( ctrlSectionId ).expanded() ) {
                  api.control( controlId ).trigger( 'set-module-ready' );
            }

            return settingId;
      };//registerDynamicModuleSettingControl
})( wp.customize , jQuery, _);
( function ( api, $, _ ) {
      /*****************************************************************************
      * A "CONTEXT AWARE" SET METHD
      *****************************************************************************/
      /**
      * OVERRIDES BASE api.Value set method
      * => adds the o {} param, allowing to pass additional contextual informations.
      *
      * Set the value and trigger all bound callbacks.
      *
      * @param {object} to New value.
      */

      // set: function( to ) {
      //   var from = this._value;

      //   to = this._setter.apply( this, arguments );
      //   to = this.validate( to );

      //   // Bail if the sanitized value is null or unchanged.
      //   if ( null === to || _.isEqual( from, to ) ) {
      //     return this;
      //   }

      //   this._value = to;
      //   this._dirty = true;

      //   this.callbacks.fireWith( this, [ to, from ] );

      //   return this;
      // },
      api.Value.prototype.set = function( to, o ) {
            var from = this._value, dfd = $.Deferred(), self = this, _promises = [];

            to = this._setter.apply( this, arguments );
            to = this.validate( to );
            args = _.extend( { silent : false }, _.isObject( o ) ? o : {} );

            // Bail if the sanitized value is null or unchanged.
            if ( null === to || _.isEqual( from, to ) ) {
                  return dfd.resolveWith( self, [ to, from, o ] ).promise();
            }

            this._value = to;
            this._dirty = true;
            if ( true === args.silent ) {
                  return dfd.resolveWith( self, [ to, from, o ] ).promise();
            }

            if ( this._deferreds ) {
                  _.each( self._deferreds, function( _prom ) {
                        _promises.push( _prom.apply( null, [ to, from, o ] ) );
                  });

                  $.when.apply( null, _promises )
                        .fail( function() { api.errorLog( 'A deferred callback failed in api.Value::set()'); })
                        .then( function() {
                              self.callbacks.fireWith( self, [ to, from, o ] );
                              dfd.resolveWith( self, [ to, from, o ] );
                        });
            } else {
                  this.callbacks.fireWith( this, [ to, from, o ] );
                  return dfd.resolveWith( self, [ to, from, o ] ).promise( self );
            }
            return dfd.promise( self );
      };

      //allows us to specify a list of callbacks + a { deferred : true } param
      //if deferred is found and true, then the callback(s) are added in a list of deferred
      //@see how this deferred list is used in api.Value.prototype.set()
      api.Value.prototype.bind = function() {
          //find an object in the argument
          var self = this,
              _isDeferred = false,
              _cbs = [];

          $.each( arguments, function( _key, _arg ) {
                if ( ! _isDeferred )
                  _isDeferred = _.isObject( _arg  ) && _arg.deferred;
                if ( _.isFunction( _arg ) )
                  _cbs.push( _arg );
          });

          if ( _isDeferred ) {
                self._deferreds = self._deferreds || [];
                _.each( _cbs, function( _cb ) {
                      if ( ! _.contains( _cb, self._deferreds ) )
                        self._deferreds.push( _cb );
                });
          } else {
                //original method
                self.callbacks.add.apply( self.callbacks, arguments );
          }
          return this;
      };

      /*****************************************************************************
      * A SILENT SET METHOD :
      * => keep the dirtyness param unchanged
      * => stores the api state before callback calls, and reset it after
      * => add an object param to the callback to inform that this is a silent process
      * , this is typically used in the overridden api.Setting.preview method
      *****************************************************************************/
      //@param to : the new value to set
      //@param dirtyness : the current dirtyness status of this setting
      //
      api.Setting.prototype.silent_set =function( to, dirtyness ) {
            var from = this._value,
                _save_state = api.state('saved')();

            to = this._setter.apply( this, arguments );
            to = this.validate( to );

            // Bail if the sanitized value is null or unchanged.
            if ( null === to || _.isEqual( from, to ) ) {
              return this;
            }

            this._value = to;
            this._dirty = ( _.isUndefined( dirtyness ) || ! _.isBoolean( dirtyness ) ) ? this._dirty : dirtyness;

            this.callbacks.fireWith( this, [ to, from, { silent : true } ] );
            //reset the api state to its value before the callback call
            api.state('saved')( _save_state );
            return this;
      };
})( wp.customize , jQuery, _ );
( function ( api, $, _ ) {
      //PREPARE THE SKOPE AWARE PREVIEWER

      //@return void()
      //Changed the core to specify that the setting preview is actually a deferred callback
      //=> allows us to use syntax like :
      //api( setId ).set( new_value ).done( function() { execute actions when all the setting callbacks have been done })
      // api.Setting.prototype.initialize = function( id, value, options ) {
      //       var setting = this;
      //       api.Value.prototype.initialize.call( setting, value, options );

      //       setting.id = id;
      //       setting.transport = setting.transport || 'refresh';
      //       setting._dirty = options.dirty || false;
      //       setting.notifications = new api.Values({ defaultConstructor: api.Notification });

      //       // Whenever the setting's value changes, refresh the preview.
      //       setting.bind( setting.preview );

      //       // the deferred can be used in moduleCollectionReact to execute actions after the module has been set.
      //       // setting.bind( function( to, from , data ) {
      //       //       return setting.preview( to, from , data );
      //       // }, { deferred : true } );
      // };


      //var _old_preview = api.Setting.prototype.preview;
      //@return a deferred promise
      api.Setting.prototype.preview = function( to, from , data ) {
            var setting = this, transport, dfd = $.Deferred();

            transport = setting.transport;

            //as soon as the previewer is setup, let's behave as usual
            //=> but don't refresh when silently updating

            //Each input instantiated in an item or a modOpt can have a specific transport set.
            //the input transport is hard coded in the module js template, with the attribute : data-transport="postMessage" or "refresh"
            //=> this is optional, if not set, then the transport will be inherited from the the module, which inherits from the control.
            //
            //If the input transport is specifically set to postMessage, then we don't want to send the 'setting' event to the preview
            //=> this will prevent any partial refresh to be triggered if the input control parent is defined has a partial refresh one.
            //=> the input will be sent to preview with api.previewer.send( 'czr_input', {...} )
            //
            //One exception : if the input transport is set to postMessage but the setting has not been set yet in the api (from is undefined, null, or empty) , we usually need to make an initial refresh
            //=> typically, the initial refresh can be needed to set the relevant module css id selector that will be used afterwards for the postMessage input preview

            //If we are in an input postMessage situation, the not_preview_sent param has been set in the czr_Input.inputReact method
            //=> 1) We bail here
            //=> 2) and we will send a custom event to the preview looking like :
            //api.previewer.send( 'czr_input', {
            //       set_id        : module.control.id,
            //       module        : { items : $.extend( true, {}, module().items) , modOpt : module.hasModOpt() ?  $.extend( true, {}, module().modOpt ): {} },
            //       module_id     : module.id,//<= will allow us to target the right dom element on front end
            //       input_id      : input.id,
            //       input_parent_id : input.input_parent.id,//<= can be the mod opt or the item
            //       value         : to
            // });

            //=> if no from (setting not set yet => fall back on defaut transport)
            if ( ! _.isUndefined( from ) && ! _.isEmpty( from ) && ! _.isNull( from ) ) {
                  if ( _.isObject( data ) && true === data.not_preview_sent ) {
                        return dfd.resolve( arguments ).promise();
                  }
            }

            //Don't do anything id we are silent
            if ( _.has( data, 'silent' ) && false !== data.silent )
              return dfd.resolve( arguments ).promise();


            //CORE PREVIEW AS OF WP 4.7+
            if ( 'postMessage' === transport && ! api.state( 'previewerAlive' ).get() ) {
                  transport = 'refresh';
            }

            if ( 'postMessage' === transport ) {
                  //Pre setting event with a richer object passed
                  //=> can be used in a partial refresh scenario to execute actions prior to the actual selective refresh which is triggered on 'setting', just after
                  setting.previewer.send( 'pre_setting', {
                        set_id : setting.id,
                        data   : data,//<= { module_id : 'string', module : {} } which typically includes the module_id and the module model ( items, mod options )
                        value  : to
                  });

                  //WP Default
                  //=> the 'setting' event is used for normal and partial refresh post message actions
                  //=> the partial refresh is fired on the preview if a partial has been registered for this setting in the php customize API
                  //=> When a partial has been registered, the "normal" ( => the not partial refresh ones ) postMessage callbacks will be fired before the ajax ones

                  // Nimble Builder => the 'setting' event triggers a refresh of the previewer dirty values
                  // The dirties are then used to populate $_POST['customized'] params via $.ajaxPrefilter()
                  // @see core customize-preview.js
                  // This is how NB can :
                  // - dynamically register settings server side in PHP customize manager while doing ajax actions
                  // - get the customized sektion collection. @see sek_get_skoped_seks() and Nimble_Collection_Setting::filter_previewed_sek_get_skoped_seks
                  setting.previewer.send( 'setting', [ setting.id, setting() ] );

                  dfd.resolve( arguments );

            } else if ( 'refresh' === transport ) {
                  setting.previewer.refresh();
                  dfd.resolve( arguments );
            }

            return dfd.promise();
      };//api.Setting.prototype.preview
})( wp.customize , jQuery, _ );
( function ( api, $, _ ) {
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
})( wp.customize , jQuery, _ );
(function (api, $, _) {
api.CZR_Helpers = api.CZR_Helpers || {};
//////////////////////////////////////////////////
/// ACTIONS AND DOM LISTENERS
//////////////////////////////////////////////////
//adds action to an existing event map
//@event map = [ {event1}, {event2}, ... ]
//@new_event = {  trigger   : event name , actions   : [ 'cb1', 'cb2', ... ] }
api.CZR_Helpers = $.extend( api.CZR_Helpers, {
      //This method is now statically accessed by item and modopt instances because it does the same job for both.
      //=> It instantiates the inputs based on what it finds in the DOM ( item or mod opt js templates )
      //
      //Fired on 'contentRendered' for items and on user click for module options (mod opt)
      //creates the inputs based on the rendered parent item or mod option
      //inputParentInst can be an item instance or a module option instance
      setupInputCollectionFromDOM : function() {
            var inputParentInst = this;//<= because fired with .call( inputParentInst )
            if ( ! _.isFunction( inputParentInst ) ) {
                  throw new Error( 'setupInputCollectionFromDOM => inputParentInst is not valid.' );
            }
            var module = inputParentInst.module,
                is_mod_opt = _.has( inputParentInst() , 'is_mod_opt' );

            //bail if already done
            //_.has( inputParentInst, 'czr_Input')
            if ( ! _.isEmpty( inputParentInst.inputCollection() ) )
              return;

            //INPUTS => Setup as soon as the view content is rendered
            //the inputParentInst is a collection of inputs, each one has its own view module.
            inputParentInst.czr_Input = inputParentInst.czr_Input || new api.Values();

            //IS THE PARENT AN ITEM OR A MODULE OPTION ?
            //those default constructors (declared in the module init ) can be overridden by extended item or mod opt constructors inside the modules
            inputParentInst.inputConstructor = is_mod_opt ? module.inputModOptConstructor : module.inputConstructor;

            var _defaultInputParentModel = is_mod_opt ? inputParentInst.defaultModOptModel : inputParentInst.defaultItemModel;

            if ( _.isEmpty( _defaultInputParentModel ) || _.isUndefined( _defaultInputParentModel ) ) {
                  throw new Error( 'setupInputCollectionFromDOM => No default model found in item or mod opt ' + inputParentInst.id + '.' );
            }

            //prepare and sets the inputParentInst value on api ready
            //=> triggers the module rendering + DOM LISTENERS
            var inputParentInst_model = $.extend( true, {}, inputParentInst() );

            if ( ! _.isObject( inputParentInst_model ) ) {
                  inputParentInst_model = _defaultInputParentModel;
            } else {
                  inputParentInst_model = $.extend( _defaultInputParentModel, inputParentInst_model );
            }

            var dom_inputParentInst_model = {};

            if ( $( '.' + module.control.css_attr.sub_set_wrapper, inputParentInst.container).length < 1 ) {
                  api.errare( 'setupInputCollectionFromDOM => no input elements found in the DOM' );
            }

            //creates the inputs based on the rendered item or mod opt
            $( '.' + module.control.css_attr.sub_set_wrapper, inputParentInst.container).each( function( _index ) {
                  var _id = $(this).find('[data-czrtype]').attr( 'data-czrtype' ),
                      _value = _.has( inputParentInst_model, _id ) ? inputParentInst_model[ _id ] : '';

                  //console.log('/// ID /// => ', _id );
                  //skip if no valid input data-czrtype is found in this node
                  if ( _.isUndefined( _id ) || _.isEmpty( _id ) ) {
                        api.errare( 'setupInputCollectionFromDOM => missing data-czrtype id for input type ' + $(this).data( 'input-type' ) + ' in module ' + module.id + '. Check that the server input template is properly declared.' );
                        return;
                  }
                  //check if this property exists in the current inputParentInst model
                  if ( ! _.has( inputParentInst_model, _id ) ) {
                        throw new Error('setupInputCollectionFromDOM => The item or mod opt property : ' + _id + ' has been found in the DOM but not in the item or mod opt model : '+ inputParentInst.id + '. The input can not be instantiated.');
                  }

                  //Do we have a specific set of options defined in the parent module for this inputConstructor ?
                  var _inputType      = $(this).data( 'input-type' ),
                      _inputTransport = $(this).data( 'transport' ) || 'inherit',//<= if no specific transport ( refresh or postMessage ) has been defined in the template, inherits the control transport
                      _inputOptions   = _.has( module.inputOptions, _inputType ) ? module.inputOptions[ _inputType ] : {},
                      _inputArgs = {
                            id            : _id,
                            type          : _inputType,
                            transport     : _inputTransport,
                            input_value   : _value,
                            input_options : _inputOptions,//<= a module can define a specific set of option
                            container     : $(this),
                            input_parent  : inputParentInst,
                            is_mod_opt    : is_mod_opt,
                            module        : module
                      };

                  // ALLOW PLUGINS TO FILTER THE INPUT ARGS BEFORE INSTANTIATION
                  api.trigger( 'input-args-before-instantiation', _inputArgs );

                  // INSTANTIATE THE INPUT
                  inputParentInst.czr_Input.add( _id, new inputParentInst.inputConstructor( _id, _inputArgs ) );

                  // FIRE THE INPUT
                  // fires ready once the input Value() instance is initialized
                  inputParentInst.czr_Input( _id ).ready();

                  // POPULATES THE PARENT INPUT COLLECTION
                  dom_inputParentInst_model[ _id ] = _value;
                  // shall we trigger a specific event when the input collection from DOM has been populated ?
            });//each

            //stores the collection
            inputParentInst.inputCollection( dom_inputParentInst_model );

            //chain
            return inputParentInst;
      }
});//$.extend
  // $( window ).on( 'message', function( e, o) {
  //   api.consoleLog('WHAT ARE WE LISTENING TO?', e, o );
  // });
})( wp.customize , jQuery, _);
(function (api, $, _) {
api.CZR_Helpers = api.CZR_Helpers || {};
//////////////////////////////////////////////////
/// ACTIONS AND DOM LISTENERS
//////////////////////////////////////////////////
//adds action to an existing event map
//@event map = [ {event1}, {event2}, ... ]
//@new_event = {  trigger   : event name , actions   : [ 'cb1', 'cb2', ... ] }
api.CZR_Helpers = $.extend( api.CZR_Helpers, {

      // Fetches a module tmpl from the server if not yet cached
      // {
      //   tmpl : 'item-inputs',
      //   module_type: module.module_type || 'all_modules',
      //   module_id : ''
      //   ... <= other custom args can be added dynamically here. Like the item_model when fetching the item content template
      // }
      // @return a promise()
      getModuleTmpl : function( args ) {
            var dfd = $.Deferred();
            args = _.extend( {
                  tmpl : '',
                  module_type: '',
                  module_id : '',
                  cache : true,//<= shall we cache the tmpl or not. Should be true in almost all cases.
                  nonce: api.settings.nonce.save//<= do we need to set a specific nonce to fetch the tmpls ?
            }, args );

            // are we good to go ?
            if ( _.isEmpty( args.tmpl ) || _.isEmpty( args.module_type ) ) {
                  dfd.reject( 'api.CZR_Helpers.getModuleTmpl => missing tmpl or module_type param' );
            }

            // This will be used to store the previously fetched template
            // 1) the generic templates used for all_modules
            // 2) each module templates : pre-item inputs, item inputs and mod options
            api.CZR_Helpers.czr_cachedTmpl = api.CZR_Helpers.czr_cachedTmpl || {};
            api.CZR_Helpers.czr_cachedTmpl[ args.module_type ] = api.CZR_Helpers.czr_cachedTmpl[ args.module_type ] || {};

            // when cache is on, use the cached template
            // Example of cache set to off => the skoped items templates are all different because based on the control type => we can't cache them
            if ( true === args.cache && ! _.isEmpty( api.CZR_Helpers.czr_cachedTmpl[ args.module_type ][ args.tmpl ] ) && _.isString( api.CZR_Helpers.czr_cachedTmpl[ args.module_type ][ args.tmpl ] ) ) {
                  //console.log('Cached => ', args.tmpl );
                  dfd.resolve( api.CZR_Helpers.czr_cachedTmpl[ args.module_type ][ args.tmpl ] );
            } else {
                  // if the tmpl is currently being fetched, return the temporary promise()
                  // this can occurs when rendering a multi-item module for the first time
                  // assigning the tmpl ajax request to the future cache entry allows us to fetch only once
                  if ( _.isObject( api.CZR_Helpers.czr_cachedTmpl[ args.module_type ][ args.tmpl ] ) && 'pending' == api.CZR_Helpers.czr_cachedTmpl[ args.module_type ][ args.tmpl ].state() ) {
                        return api.CZR_Helpers.czr_cachedTmpl[ args.module_type ][ args.tmpl ];//<= this is a $.promise()
                  } else {
                        //console.log('Needs to be fetched => ', args.tmpl );
                        // First time fetch
                        api.CZR_Helpers.czr_cachedTmpl[ args.module_type ][ args.tmpl ] = wp.ajax.post( 'ac_get_template', args )
                              .done( function( _serverTmpl_ ) {
                                    // resolve and cache
                                    dfd.resolve( _serverTmpl_ );
                                    api.CZR_Helpers.czr_cachedTmpl[ args.module_type ][ args.tmpl ] = _serverTmpl_;
                              }).fail( function( _r_ ) {
                                    //console.log( 'api.CZR_Helpers.getModuleTmpl => ', _r_ );
                                    api.errare( 'api.CZR_Helpers.getModuleTmpl => Problem when fetching the ' + args.tmpl + ' tmpl from server for module : ' + args.module_id + ' ' + args.module_type, _r_);
                                    dfd.reject( _r_ );
                                    // Nimble => display an error notification when
                                    // - session has expired
                                    // - when statusText is "Bad Request"
                                    if ( _.isObject( _r_ ) ) {
                                          if ( 'invalid_nonce' === _r_.code || 'Bad Request' === _r_.statusText ) {
                                                if ( window.sektionsLocalizedData && sektionsLocalizedData.i18n ) {
                                                      api.previewer.trigger( 'sek-notify', { type : 'error', duration : 30000, message : sektionsLocalizedData.i18n['Something went wrong, please refresh this page.'] });
                                                }
                                          }
                                    }
                              });
                  }
            }
            return dfd.promise();
      }

});//$.extend
  // $( window ).on( 'message', function( e, o) {
  //   api.consoleLog('WHAT ARE WE LISTENING TO?', e, o );
  // });
})( wp.customize , jQuery, _);
(function (api, $, _) {
      api.CZR_Helpers = api.CZR_Helpers || {};
      api.CZR_Helpers = $.extend( api.CZR_Helpers, {
            // @params {}. Example :
            // origin : 'nimble',
            // what : 'section',
            // id : params.id,
            // title: sektionsLocalizedData.i18n['Content for'] + ' ' + moduleName,
            // panel : sektionsLocalizedData.sektionsPanelId,
            // priority : 1000,
            // track : false//don't register in the self.registered()
            // constructWith : MainSectionConstructor,
            register : function( params ) {
                  if ( ! _.has( params, 'id' ) ) {
                        api.errare( 'register => missing id ', params );
                        return;
                  }
                  // For the UI elements that we want to track, a level property is needed
                  // if ( false !== params.track && ! _.has( params, 'level' ) ){
                  //       api.errare( 'register => missing trackable level ', params );
                  //       return;
                  // }

                  var __element__ = {}, defaults;

                  switch ( params.what ) {
                        // Register only if not registered already
                        // For example, when saved as draft in a changeset, the setting is already dynamically registered server side
                        // => in this case, we only need to register the associated control
                        // @params args { id : , value : , transport : , type :  }
                        case 'setting' :
                              if ( api.has( params.id ) ) {
                                    //api.consoleLog( 'registerSetting => setting Id already registered : ' + params.id );
                                    break;
                              }
                              defaults = $.extend( true, {}, api.Setting.prototype.defaults );
                              var settingArgs = _.extend(
                                  defaults ,
                                    {
                                          dirty : ! _.isUndefined( params.dirty ) ? params.dirty : false,
                                          value : _.isUndefined( params.value ) ? null : params.value,
                                          transport : params.transport || 'refresh',
                                          type : params.type || 'option'
                                    }
                              );
                              // assign the value sent from the server

                              var SettingConstructor = api.settingConstructor[ settingArgs.type ] || api.Setting;

                              // extend with specific additional options provided on registration
                              if ( _.isObject( params.options ) ) {
                                    settingArgs  = _.extend( settingArgs , params.options );
                              }

                              try { api.add( new SettingConstructor( params.id, settingArgs.value, settingArgs ) ); } catch ( er ) {
                                    api.errare( 'api.CZR_Helpers::register => problem when adding a setting to the api', er );
                              }
                        break;


                        case 'panel' :
                              // Check if we have a correct section
                              if ( ! _.has( params, 'id' ) ){
                                    throw new Error( 'registerPanel => missing panel id ');
                              }

                              if ( api.panel.has( params.id ) ) {
                                    //api.errare( 'registerPanel => ' + params.id + ' is already registered');
                                    break;
                              }

                              defaults = $.extend( true, {}, api.Panel.prototype.defaults );
                              var panelParams = _.extend(
                                  defaults , {
                                        id: params.id,
                                        title: params.title || params.id,
                                        priority: _.has( params, 'priority' ) ? params.priority : 0
                                  }
                              );

                              var PanelConstructor = _.isObject( params.constructWith ) ? params.constructWith : api.Panel;

                              // extend with specific additional options provided on registration
                              if ( _.isObject( params.options ) ) {
                                    panelParams  = _.extend( panelParams , params.options );
                              }
                              panelParams = _.extend( { params: panelParams }, panelParams ); // Inclusion of params alias is for back-compat for custom panels that expect to augment this property.

                              try { __element__ = api.panel.add( new PanelConstructor( params.id, panelParams ) ); } catch ( er ) {
                                    api.errare( 'api.CZR_Helpers::register => problem when adding a panel to the api', er );
                              }
                        break;


                        case 'section' :
                              // MAYBE REGISTER THE SECTION
                              // Check if we have a correct section
                              if ( ! _.has( params, 'id' ) ){
                                    throw new Error( 'registerSection => missing section id ');
                              }

                              if ( api.section.has( params.id ) ) {
                                    //api.infoLog( 'registerSection => ' + params.id + ' is already registered');
                                    break;
                              }

                              defaults = $.extend( true, {}, api.Section.prototype.defaults );
                              var sectionParams = _.extend(
                                  defaults, {
                                        content : '',
                                        id: params.id,
                                        title: params.title,
                                        panel: params.panel,
                                        priority: params.priority,
                                        description_hidden : false,
                                        customizeAction: serverControlParams.i18n['Customizing']
                                  }
                              );

                              var SectionConstructor = api.Section;
                              if ( ! _.isUndefined( params.constructWith ) ) {
                                    SectionConstructor = params.constructWith;
                              } else if ( ! _.isEmpty( params.type ) && api.sectionConstructor[ params.type ] ) {
                                    SectionConstructor = api.sectionConstructor[ params.type ];
                              }

                              // extend with specific additional options provided on registration
                              if ( _.isObject( params.options ) ) {
                                    sectionParams  = _.extend( sectionParams , params.options );
                              }

                              sectionParams = _.extend( { params: sectionParams }, sectionParams ); // Inclusion of params alias is for back-compat for custom panels that expect to augment this property.
                              try { __element__ = api.section.add( new SectionConstructor( params.id, sectionParams ) ); } catch ( er ) {
                                    api.errare( 'api.CZR_Helpers::register => problem when adding a section to the api', er );
                              }
                        break;


                        case 'control' :
                              if ( api.control.has( params.id ) ) {
                                    //api.errorLog( 'registerControl => ' + params.id + ' is already registered');
                                    break;
                              }

                              //@see api.settings.controls,
                              defaults = $.extend( true, {}, api.Control.prototype.defaults );
                              var controlArgs = _.extend(
                                        defaults,
                                        {
                                              content : '',
                                              label : params.label || params.id,
                                              priority : params.priority,
                                              section : params.section,
                                              settings: params.settings,
                                              type : params.type, //'czr_module',
                                              module_type : params.module_type,
                                              input_attrs : params.input_attrs,//<= can be used with the builtin "button" type control
                                              sek_registration_params : params// <= used when refreshing a level for example
                                        }
                                  ),
                                  ControlConstructor = api.controlConstructor[ controlArgs.type ] || api.Control,
                                  options;

                              // extend with specific additional options provided on registration
                              if ( _.isObject( params.options ) ) {
                                    controlArgs = _.extend( controlArgs, params.options );
                              }

                              options = _.extend( { params: controlArgs }, controlArgs ); // Inclusion of params alias is for back-compat for custom controls that expect to augment this property.

                              try { __element__ = api.control.add( new ControlConstructor( params.id, options ) ); } catch ( er ) {
                                    api.errare( 'api.CZR_Helpers::register => problem when adding a control to the api', er );
                              }
                        break;
                        default :
                              api.errorLog('invalid "what" when invoking the register() method');
                        break;

                  }//switch
                  __element__ = ! _.isEmpty( __element__ ) ?  __element__ : { deferred : { embedded : $.Deferred( function() { this.resolve(); }) } };

                  // this is where we populate the registered collection
                  // if the registered element is "tracked", we inform the api about its registration
                  // @see Nimble or Contextualizer for tracking usage => ui re-rendering, etc...
                  if ( false !== params.track ) {
                        api.trigger( 'czr-new-registered', params );
                  }

                  return 'setting' == params.what ? params : __element__.deferred.embedded;
            }
      });//$.extend
  // $( window ).on( 'message', function( e, o) {
  //   api.consoleLog('WHAT ARE WE LISTENING TO?', e, o );
  // });
})( wp.customize , jQuery, _);
(function (api, $, _) {
api.CZR_Helpers = api.CZR_Helpers || {};
//////////////////////////////////////////////////
/// ACTIONS AND DOM LISTENERS
//////////////////////////////////////////////////
//adds action to an existing event map
//@event map = [ {event1}, {event2}, ... ]
//@new_event = {  trigger   : event name , actions   : [ 'cb1', 'cb2', ... ] }
api.CZR_Helpers = $.extend( api.CZR_Helpers, {
      css_loader_html : '<div class="czr-css-loader czr-mr-loader" style="display:none"><div></div><div></div><div></div></div>',

      //While a control should always have a default setting,
      //It can have additional setting assigned
      //This method returns the default setting or the specified type if requested
      //Example : header_image has default and data
      getControlSettingId : function( control_id, setting_type ) {
            setting_type = 'default' || setting_type;
            if ( ! api.control.has( control_id ) ) {
                 // api.consoleLog( 'getControlSettingId : The requested control_id is not registered in the api yet : ' + control_id );
                  return control_id;
            }
            if ( ! _.has( api.control( control_id ), 'settings' ) || _.isEmpty( api.control( control_id ).settings ) )
              return control_id;

            if ( ! _.has( api.control( control_id ).settings, setting_type ) ) {
                  api.consoleLog( 'getControlSettingId : The requested control_id does not have the requested setting type : ' + control_id + ' , ' + setting_type );
                  return control_id;
            }
            if ( _.isUndefined( api.control( control_id ).settings[setting_type].id ) ) {
                  api.consoleLog( 'getControlSettingId : The requested control_id has no setting id assigned : ' + control_id );
                  return control_id;
            }
            return api.control( control_id ).settings[setting_type].id;
      },



      getDocSearchLink : function( text ) {
            text = ! _.isString(text) ? '' : text;
            var _searchtext = text.replace( / /g, '+'),
                _url = [ serverControlParams.docURL, 'search?query=', _searchtext ].join('');
            return [
              '<a href="' + _url + '" title="' + serverControlParams.i18n.readDocumentation + '" target="_blank">',
              ' ',
              '<span class="far fa-question-circle-o"></span>'
            ].join('');
      },


       /*
      * @return string
      * simple helper to build the setting wp api ready id
      */
      build_setId : function ( setId ) {
            if ( _.isUndefined( window.themeServerControlParams ) || ! _.isArray( themeServerControlParams.wpBuiltinSettings ) ) {
                //api.errorLog( 'build_setId => missing themeServerControlParams !');
                return setId;
            }
            //exclude the WP built-in settings like blogdescription, show_on_front, etc
            if (  _.contains( themeServerControlParams.wpBuiltinSettings, setId ) )
              return setId;

            // //extract the setting id for theme mods
            // var _pattern;

            //exclude the WP built-in settings like sidebars_widgets*, nav_menu_*, widget_*, custom_css
            // var _patterns = [ 'widget_', 'nav_menu', 'sidebars_', 'custom_css' ],
            //     _isExcld = false;
            // _.each( _patterns, function( _ptrn ) {
            //       if ( _isExcld )
            //         return;
            //       _isExcld = _ptrn == setId.substring( 0, _ptrn.length );
            // });
            // if ( _isExcld )
            // return setId;
            if ( ! _.contains( themeServerControlParams.themeSettingList, setId ) )
              return setId;

            return -1 == setId.indexOf( themeServerControlParams.themeOptions ) ? [ themeServerControlParams.themeOptions +'[' , setId  , ']' ].join('') : setId;
    },

      /*
      * @return string
      * simple helper to extract the option name from a setting id
      */
      getOptionName : function( name ) {
            if ( _.isEmpty( window.themeServerControlParams ) || _.isEmpty( themeServerControlParams.themeOptions ) ) {
                //api.errorLog( 'getOptionName => missing themeServerControlParams !');
                return name;
            }
            var self = this;
            //targets only the options of the theme
            if ( -1 == name.indexOf( themeServerControlParams.themeOptions) )
              return name;
            return name.replace(/\[|\]/g, '').replace( themeServerControlParams.themeOptions, '');
      },



      //@return bool
      //@uses api.czr_partials
      hasPartRefresh : function( setId ) {
            if ( ! _.has( api, 'czr_partials')  )
              return;
            return  _.contains( _.map( api.czr_partials(), function( partial, key ) {
                  return _.contains( partial.settings, setId );
            }), true );
      },

      //@return the array of controls in a given section_id
      getSectionControlIds : function( section_id ) {
            section_id = section_id || api.czr_activeSectionId();
            return ! api.section.has( section_id ) ?
                  [] :
                  _.map( api.section( section_id ).controls(), function( _ctrl ) {
                        return _ctrl.id;
                  });
      },


      //1) get the control of a given section
      //2) for each control get the associated setting(s)
      //=> important, a control might have several associated settings. Typical example : header_image.
      //@return [] of setting ids for a given czr section
      getSectionSettingIds : function( section_id ) {
            section_id = section_id || api.czr_activeSectionId();
            if ( ! api.section.has( section_id) )
              return;
            var self = this,
                _sec_settings = [],
                _sec_controls = self.getSectionControlIds( section_id );

            _.each( _sec_controls, function( ctrlId ) {
                  _.each( api.control(ctrlId).settings, function( _instance, _k ) {
                        _sec_settings.push( _instance.id );
                  });
            });
            return _sec_settings;
      },


      //////////////////////////////////////////////////
      /// STRINGS HELPERS
      //////////////////////////////////////////////////
      capitalize : function( string ) {
            if( ! _.isString(string) )
              return string;
            return string.charAt(0).toUpperCase() + string.slice(1);
      },

      truncate : function( string, n, useWordBoundary ){
            if ( ! _.isString( string ) )
              return '';
            n = n || 20;
            var isTooLong = string.length > n,
                s_ = isTooLong ? string.substr(0,n-1) : string;
                s_ = (useWordBoundary && isTooLong) ? s_.substr(0,s_.lastIndexOf(' ')) : s_;
            return  isTooLong ? s_ + '...' : s_;
      },


      //////////////////////////////////////////////////
      /// STRINGS HELPERS
      //////////////////////////////////////////////////
      //is a module multi item ?
      //@return bool
      isMultiItemModule : function( module_type, moduleInst ) {
            if ( _.isUndefined( module_type ) && ! _.isObject( moduleInst ) )
              return;
            if ( _.isObject( moduleInst ) && _.has( moduleInst, 'module_type' ) )
              module_type = moduleInst.module_type;
            else if ( _.isUndefined( module_type ) || _.isNull( module_type ) )
              return;
            if ( ! _.has( api.czrModuleMap, module_type ) )
              return;

            return api.czrModuleMap[module_type].crud || api.czrModuleMap[module_type].multi_item || false;
      },

      //is a module crud ?
      //@return bool
      isCrudModule : function( module_type, moduleInst ) {
            if ( _.isUndefined( module_type ) && ! _.isObject( moduleInst ) )
              return;
            if ( _.isObject( moduleInst ) && _.has( moduleInst, 'module_type' ) )
              module_type = moduleInst.module_type;
            else if ( _.isUndefined( module_type ) || _.isNull( module_type ) )
              return;
            if ( ! _.has( api.czrModuleMap, module_type ) )
              return;

            return api.czrModuleMap[module_type].crud || false;
      },

      //is a module crud ?
      //@return bool
      hasModuleModOpt : function( module_type, moduleInst ) {
            if ( _.isUndefined( module_type ) && ! _.isObject( moduleInst ) )
              return;
            if ( _.isObject( moduleInst ) && _.has( moduleInst, 'module_type' ) )
              module_type = moduleInst.module_type;
            else if ( _.isUndefined( module_type ) || _.isNull( module_type ) )
              return;
            if ( ! _.has( api.czrModuleMap, module_type ) )
              return;

            return api.czrModuleMap[module_type].has_mod_opt || false;
      },



      //@self explanatory: removes a collection of input from a parent item or modOpt instance
      //Triggered by : user actions usually when an item is collapsed or when the modOpt panel is closed
      removeInputCollection : function() {
            var inputParentInst = this;//<= because fired with .call( inputParentInst )
            if ( ! _.isFunction( inputParentInst ) ) {
                  throw new Error( 'removeInputCollection : inputParentInst is not valid.' );
            }
            if ( ! _.has( inputParentInst, 'czr_Input') )
              return;
            //remove each input api.Value() instance
            inputParentInst.czr_Input.each( function( _input ) {
                  inputParentInst.czr_Input.remove( _input.id );
            });
            //reset the input collection property
            inputParentInst.inputCollection({});
      },

      //Re-instantiate a module control based on its id
      //@param wpSetId : the api id of the control to refresh
      refreshModuleControl : function( wpSetId ) {
            var _constructor = api.controlConstructor.czr_module,
                _control_type = api.control( wpSetId ).params.type,
                _control_data = api.settings.controls[wpSetId];

            //remove the container and its control
            $.when( api.control( wpSetId ).container.remove() ).done( function() {
                  //remove the control from the api control collection
                  api.control.remove( wpSetId );

                  //re-instantiate the control with the updated _control_data
                  api.control.add( wpSetId,  new _constructor( wpSetId, { params : _control_data, previewer : api.previewer }) );
            });

      },


      // BOOLEAN CHECK
      // @return bool
      isChecked : function( v ) {
            if ( _.isBoolean( v ) ) {
                  return v;
            } else if ( _.isNumber( v ) ) {
                  return v > 0;
            } else if ( _.isString( v ) ) {
                return '0' !== v && '' !== v && 'off' !== v;
            }
            return false;
      },


      // COLORS
      hexToRgb : function( hex ) {
            // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
            var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
            try {
                  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
                      return r + r + g + g + b + b;
                  });
            } catch( er ) {
                  api.errorLog( 'Error in Helpers::hexToRgb : ' + er );
                  return hex;
            }

            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec( hex );
            result = result ? [
                  parseInt(result[1], 16),//r
                  parseInt(result[2], 16),//g
                  parseInt(result[3], 16)//b
            ] : [];
            return 'rgb(' + result.join(',') + ')';
      },

      rgbToHex : function ( r, g, b ) {
            var componentToHex = function(c) {
                  var hex = c.toString(16);
                  return hex.length == 1 ? "0" + hex : hex;
            };
            return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
      },



      // inspired from wp.template in wp-includes/js/wp-util.js
      parseTemplate : _.memoize(function ( html ) {
            var compiled,
              /*
               * Underscore's default ERB-style templates are incompatible with PHP
               * when asp_tags is enabled, so WordPress uses Mustache-inspired templating syntax.
               *
               * @see trac ticket #22344.
               */
              options = {
                    evaluate:    /<#([\s\S]+?)#>/g,
                    interpolate: /\{\{\{([\s\S]+?)\}\}\}/g,
                    escape:      /\{\{([^\}]+?)\}\}(?!\})/g,
                    variable:    'data'
              };

            return function ( data ) {
                  compiled = compiled || _.template( html,  options );
                  return compiled( data );
            };
      })
});//$.extend
  // $( window ).on( 'message', function( e, o) {
  //   api.consoleLog('WHAT ARE WE LISTENING TO?', e, o );
  // });
})( wp.customize , jQuery, _);
(function (api, $, _) {
api.CZR_Helpers = api.CZR_Helpers || {};
//////////////////////////////////////////////////
/// ACTIONS AND DOM LISTENERS
//////////////////////////////////////////////////
//adds action to an existing event map
//@event map = [ {event1}, {event2}, ... ]
//@new_event = {  trigger   : event name , actions   : [ 'cb1', 'cb2', ... ] }
api.CZR_Helpers = $.extend( api.CZR_Helpers, {
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


      //@args = {model : model, dom_el : $_view_el, refreshed : _refreshed }
      setupDOMListeners : function( event_map , args, instance ) {
              var control = this,
                  _defaultArgs = {
                        model : {},
                        dom_el : {}
                  };

              instance = instance || control;
              //event_map : are we good ?
              if ( ! _.isArray( event_map ) ) {
                    api.errare( 'setupDomListeners : event_map should be an array', args );
                    return;
              }

              //args : are we good ?
              if ( ! _.isObject( args ) ) {
                    api.errare( 'setupDomListeners : args should be an object', event_map );
                    return;
              }

              args = _.extend( _defaultArgs, args );

              // => we need a dom_el as an existing jQuery object
              if ( ! ( args.dom_el instanceof jQuery ) || 1 > args.dom_el.length ) {
                    api.errare( 'setupDomListeners : dom element should be an existing dom element', args );
                    return;
              }

              //loop on the event map and map the relevant callbacks by event name
              // @param _event :
              //{
              //       trigger : '',
              //       selector : '',
              //       name : '',
              //       actions : ''
              // },
              _.map( event_map , function( _event ) {
                    if ( ! _.isString( _event.selector ) || _.isEmpty( _event.selector ) ) {
                          api.errare( 'setupDOMListeners : selector must be a string not empty. Aborting setup of action(s) : ' + _event.actions.join(',') );
                          return;
                    }

                    //Are we good ?
                    if ( ! _.isString( _event.selector ) || _.isEmpty( _event.selector ) ) {
                          api.errare( 'setupDOMListeners : selector must be a string not empty. Aborting setup of action(s) : ' + _event.actions.join(',') );
                          return;
                    }

                    // if ( ! _event.name && ! _.isEmpty( _event.name ) ) {
                    //     api.errare('in setupDOMListeners : missing name', _event );
                    // }

                    // DON'T CREATE THE SAME LISTENERS MULTIPLE TIMES
                    //Make sure that we add this listener only once to a particular dom element
                    //A listener id is a combination of event name + selector
                    //if not set, the name is a concatenation of trigger + selector
                    var _name = ( _event.name && ! _.isEmpty( _event.name ) ) ? _event.name : [ _event.trigger, _event.selector ].join('');

                    var _currentListenerCollection = args.dom_el.data( 'czr-listener-collection' );
                    if ( ! _currentListenerCollection || ! _.isArray( _currentListenerCollection ) ) {
                          _currentListenerCollection = [ _name ];
                    } else {
                          _currentListenerCollection = _.isArray( _currentListenerCollection ) ? _currentListenerCollection : [];
                          if ( ! _.contains( _currentListenerCollection, _name ) ) {
                                _currentListenerCollection.push( _name );
                          } else {
                                api.errare('setupDOMListeners : aborting because listener already created for event : ' + _name );
                                return;
                          }

                    }
                    // add this listener to the collection
                    args.dom_el.data( 'czr-listener-collection' , _currentListenerCollection );

                    //LISTEN TO THE DOM => USES EVENT DELEGATION
                    args.dom_el.on( _event.trigger , _event.selector, function( e, event_params ) {
                          //stop propagation to ancestors modules, typically a sektion
                          e.stopPropagation();
                          //particular treatment
                          if ( api.utils.isKeydownButNotEnterEvent( e ) ) {
                            return;
                          }
                          e.preventDefault(); // Keep this AFTER the key filter above

                          //It is important to deconnect the original object from its source
                          //=> because we will extend it when used as params for the action chain execution
                          var actionsParams = $.extend( true, {}, args );

                          //always get the latest model from the collection
                          if ( _.has( actionsParams, 'model') && _.has( actionsParams.model, 'id') ) {
                                if ( _.has( instance, 'get' ) )
                                  actionsParams.model = instance();
                                else
                                  actionsParams.model = instance.getModel( actionsParams.model.id );
                          }

                          //always add the event obj to the passed args
                          //+ the dom event
                          $.extend( actionsParams, { event : _event, dom_event : e } );

                          //add the event param => useful for triggered event
                          $.extend( actionsParams, event_params );

                          //SETUP THE EMITTERS
                          //inform the container that something has happened
                          //pass the model and the current dom_el
                          //the model is always passed as parameter
                          if ( ! _.has( actionsParams, 'event' ) || ! _.has( actionsParams.event, 'actions' ) ) {
                                api.errare( 'executeEventActionChain : missing obj.event or obj.event.actions' );
                                return;
                          }
                          if ( serverControlParams.isDevMode ) {
                              control.executeEventActionChain( actionsParams, instance );
                          } else {
                              try { control.executeEventActionChain( actionsParams, instance ); } catch( er ) {
                                    api.errare( 'In setupDOMListeners : problem when trying to fire actions : ' + actionsParams.event.actions , er );
                              }
                        }
                    });//.on()
              });//_.map()
      },//setupDomListeners



      //GENERIC METHOD TO SETUP EVENT LISTENER
      //NOTE : the args.event must alway be defined
      //Example of args :
      //  {
      //       trigger   : 'click keydown',
      //       selector  : [ '.' + module.control.css_attr.open_pre_add_btn, '.' + module.control.css_attr.cancel_pre_add_btn ].join(','),
      //       name      : 'pre_add_item',
      //       actions   : [
      //             'closeAllItems',
      //             'closeRemoveDialogs',
      //             function(obj) {
      //                   var module = this;
      //                   module.preItemExpanded.set( ! module.preItemExpanded() );
      //             },
      //       ],
      // },
      executeEventActionChain : function( args, instance ) {
              var control = this;

              //if the actions param is not an array but is an anonymous function, fire it and stop there
              if ( 'function' === typeof( args.event.actions ) )
                return args.event.actions.call( instance, args );

              //execute the various actions required
              //first normalizes the provided actions into an array of callback methods
              //then loop on the array and fire each cb if exists
              if ( ! _.isArray( args.event.actions ) )
                args.event.actions = [ args.event.actions ];

              //if one of the callbacks returns false, then we break the loop
              //=> allows us to stop a chain of callbacks if a condition is not met
              var _break = false;
              _.map( args.event.actions, function( _cb ) {
                    if ( _break )
                      return;

                    var _cbCandidate = function() {};

                    // is the _cb an anonymous function ?
                    // if not, we expect the method to exist in the provided object instance
                    if ( 'function' === typeof( _cb ) ) {
                          _cbCandidate = _cb;
                    } else {
                          if ( 'function' != typeof( instance[ _cb ] ) ) {
                                throw new Error( 'executeEventActionChain : the action : ' + _cb + ' has not been found when firing event : ' + args.event.selector );
                          } else {
                                _cbCandidate = instance[ _cb ];
                          }
                    }

                    // Allow other actions to be bound before action and after
                    //
                    // => we don't want the event in the object here => we use the one in the event map if set
                    // => otherwise will loop infinitely because triggering always the same cb from args.event.actions[_cb]
                    // => the dom element shall be get from the passed args and fall back to the controler container.
                    var $_dom_el = ( _.has(args, 'dom_el') && -1 != args.dom_el.length ) ? args.dom_el : control.container;

                    if ( 'string' === typeof( _cb ) ) {
                          $_dom_el.trigger( 'before_' + _cb, _.omit( args, 'event' ) );
                    }

                    //executes the _cb and stores the result in a local var
                    var _cb_return = _cbCandidate.call( instance, args );
                    //shall we stop the action chain here ?
                    if ( false === _cb_return )
                      _break = true;

                    if ( 'string' === typeof( _cb ) ) {
                          //allow other actions to be bound after
                          $_dom_el.trigger( 'after_' + _cb, _.omit( args, 'event' ) );
                    }
              });//_.map
      }
});//$.extend
})( wp.customize , jQuery, _);
(function (api, $, _) {
  /*****************************************************************************
  * CAPTURE PREVIEW INFORMATIONS ON REFRESH + REACT TO THEM
  *****************************************************************************/
  //This promise will let us know when we have the first set of preview query ready to use
  //This is needed for modules contextually dependant
  //For example, the slider module will initialize the module model based on the contextual informations, if no items have been set yet.
  api.czr_wpQueryDataReady = api.czr_wpQueryDataReady || $.Deferred();
  api.czr_wpQueryInfos = api.czr_wpQueryInfos || new api.Value();

  //Data are sent by the preview frame when the panel has sent the 'sync' or even better 'active' event
  api.bind( 'ready', function() {
        /* WP CONDITIONAL TAGS => stores and observes the WP conditional tags sent by the preview */
        api.previewer.bind( 'czr-query-data-ready', function( data ) {

              api.czr_wpQueryInfos( data );

              if ( 'pending' == api.czr_wpQueryDataReady.state() ) {
                    api.czr_wpQueryDataReady.resolve( data );
              }
        });

        //PARTIAL REFRESHS => stores and observes the partials data sent by the preview
        //=> this is used in api.CZR_Helpers.hasPartRefresh( control_id )
        //=> as of WP4.7.5, there's no way to get the list of control with partial refresh in the customize-control api
        api.previewer.bind( 'czr-partial-refresh-data', function( data ) {
              api.czr_partials = api.czr_partials || new api.Value();
              api.czr_partials.set( data );
        });

        //PARTIAL REFRESHS : React on partial refresh done
        // @data : { set_id : api setting id }
        api.previewer.bind( 'czr-partial-refresh-done', function( data ) {
              if ( ! _.has( data, 'set_id' ) )
                return;
              var setId = api.CZR_Helpers.build_setId( data.set_id );
              if ( ! api.has( setId ) )
                return;
              //inform the control
              var ctrlId = api.CZR_Helpers.getControlSettingId( setId );
              if ( ! api.control.has( ctrlId ) )
                return;
              api.control( ctrlId ).trigger( 'czr-partial-refresh-done' );
        });
  });//api.bind('ready')
})( wp.customize , jQuery, _ );var CZRInputMths = CZRInputMths || {};

//extends api.Value
//an input is instanciated with the typical set of options :
// container : $(this),
// id : _id,
// input_options : {} <= a set of options that are used when setting up the input type
// input_parent : {} can be an item instance or a modOpt instance (Value instance, has a parent module)
// input_value : $(this).find('[data-czrtype]').val(),
// module : module,
// transport : inherit or specified in the template with data-transport="postMessage" or "refresh".
// type : $(this).attr('data-input-type'),
// is_mod_opt : bool,
// is_preItemInput : bool
( function ( api, $, _ ) {
$.extend( CZRInputMths , {
    initialize: function( name, options ) {
          if ( _.isUndefined( options.input_parent ) || _.isEmpty(options.input_parent) ) {
            throw new Error('No input_parent assigned to input ' + options.id + '. Aborting');
          }
          if ( _.isUndefined(options.module ) ) {
            throw new Error('No module assigned to input ' + options.id + '. Aborting');
          }

          api.Value.prototype.initialize.call( this, null, options );

          var input = this;
          //input.options = options;
          //write the options as properties, name is included
          $.extend( input, options || {} );

          // store the constructor options
          input.constructorOptions = $.extend( true, {}, options );

          //DEFERRED STATES
          //store the state of ready.
          input.isReady = $.Deferred();

          //initialize to the provided value if any
          if ( ! _.isUndefined( options.input_value ) ) {
                input.set( options.input_value );
          }


          // Setup a default user event map
          // can be overriden when setting up the input
          var trigger_map = {
                text : 'keyup',
                textarea : 'keyup',
                password : 'keyup',
                color : 'colorpickerchange',
                range : 'input propertychange'
          };

          // Default Input Event Map
          input.input_event_map = [
                  //set input value
                  {
                    trigger   : ['change', trigger_map[input.type] || '' ].join(' ').trim(),//was 'propertychange change click keyup input',//colorpickerchange is a custom colorpicker event @see method setupColorPicker => otherwise we don't
                    selector  : 'input[data-czrtype], select[data-czrtype], textarea[data-czrtype]',
                    name      : 'set_input_value',
                    actions   : function( obj ) {
                        if ( ! _.has( input.input_parent, 'syncElements') || ! _.has( input.input_parent.syncElements, input.id ) ) {
                              throw new Error('WARNING : THE INPUT ' + input.id + ' HAS NO SYNCED ELEMENT.');
                        }
                    }//was 'updateInput'
                  }
          ];

          // 1) Check the input instance to see if the default callback has been overriden in an extended Constructor
          // ( @see column width module in Nimble Builder to see how the overrides works )
          // 2) if not, try to find a match with the provided constructor type
          // => fire the relevant callback with the provided input_options
          // input.type_map is declared in extend_api_base
          if ( input[input.type] && _.isFunction( input[input.type]) ) {
                try { input[input.type]( options.input_options || null ); } catch( er ) {
                      api.errare( 'Error in overriden callback method in input init => for input id :' + input.id + ' in module type : ' + input.module.module_type, er );
                }
          } else if ( api.czrInputMap && _.has( api.czrInputMap, input.type ) ) {
                var _meth = api.czrInputMap[ input.type ];
                if ( _.isFunction( input[_meth]) ) {
                      try { input[_meth]( options.input_options || null ); } catch( er ) {
                            api.errare( 'Error in input init => for input id :' + input.id + ' in module type : ' + input.module.module_type, er );
                      }
                } else if ( _.isFunction( api.czrInputMap[ input.type ] ) ) {
                      try { api.czrInputMap[ input.type ].apply( input, [ options.input_options || null ] ); } catch( er ) {
                            api.errare( 'Error in input init => for input id :' + input.id + ' in module type : ' + input.module.module_type, er );
                      }
                }
          } else {
                api.errare('Warning the input : ' + input.id + ' with type ' + input.type + ' has no corresponding method defined in api.czrInputMap.');
          }


          // Visibility => typically used when implementing the input dependencies
          // true by default
          input.visible = new api.Value( true );
          input.isReady.done( function() {
                input.visible.bind( function( visible ) {
                      if ( visible ) {
                            input.container.stop( true, true ).slideDown( 200 );
                      } else {
                            input.container.stop( true, true ).slideUp( 200 );
                      }
                });
          });

          // Enabled status => control the toggling of a "disabled" css class => blur + decrease opacity
          // used for the hueman pro slide module
          input.enabled = new api.Value( true );
          input.isReady.done( function() {
                input.enabled.bind( function( enabled ) {
                      input.container.toggleClass( 'disabled', ! enabled );
                });
          });
    },


    // this method is not fired automatically
    // It has to be invoked once the input has been instantiated
    // input instantiation is performed from what is found in the DOM
    // @see api.CZR_Helpers.setupInputCollectionFromDOM
    ready : function() {
            var input = this;
            input.setupDOMListeners( input.input_event_map , { dom_el : input.container }, input );
            //Setup individual input listener
            input.callbacks.add( function() { return input.inputReact.apply( input, arguments ); } );
            //synchronizer setup
            //the input instance must be initialized. => initialize method has been done.
            $.when( input.setupSynchronizer() ).done( function() {
                  input.isReady.resolve( input );
            } );

    },


    //fired when input is intanciated and ready.
    //=> we must have an input instance to synchronize,
    //invoking this method in the initialize() method is too early, instance not ready
    setupSynchronizer: function() {
          var input       = this,
              input_parent        = input.input_parent,
              $_input_el  = input.container.find('[data-czrtype]'),
              is_textarea = input.container.find('[data-czrtype]').is('textarea');

          //@hack => todo
          //for text area inputs, the synchronizer is buggy
          // if ( is_textarea ) {
          //       api.errorLog('TO DO : THE TEXTAREA INPUT ARE NOT IMPLEMENTED YET IN THE SYNCHRONIZER!');
          // }

          var syncElement = new api.Element( $_input_el );
          input_parent.syncElements = input_parent.syncElements || {};
          input_parent.syncElements[input.id] = syncElement;//adds the input syncElement to the collection
          syncElement.sync( input );//sync with the input instance
          syncElement.set( input() );
    },



    //@return void()
    //react to a single input change
    //update the collection of input
    //cb of input.callbacks.add
    inputReact : function( to, from, data ) {
          var input = this,
              _current_input_parent = input.input_parent(),
              _new_model        = _.clone( _current_input_parent ),//initialize it to the current value
              _isPreItemInput = input.is_preItemInput;

          //is this input currently enabled ?
          if ( ! input.enabled() )
            return;

          // September 2020 => introduced an "inactive" input type in order to display pro info for Nimble
          // this input should be "hidden" type, and should not trigger an API change.
          if ( 'inactive' === input.type )
            return;

          //make sure the _new_model is an object and is not empty
          _new_model =  ( ! _.isObject(_new_model) || _.isEmpty(_new_model) ) ? {} : _new_model;
          //set the new val to the changed property
          _new_model[ input.id ] = to;

          //inform the input_parent : item or modOpt
          input.input_parent.set( _new_model, {
                input_changed     : input.id,
                input_value       : input(),
                input_transport   : input.transport,
                not_preview_sent  : 'postMessage' === input.transport,//<= this parameter set to true will prevent the setting to be sent to the preview ( @see api.Setting.prototype.preview override ). This is useful to decide if a specific input should refresh or not the preview.
                inputRegistrationParams : input.constructorOptions
          } );

          //Trigger and send specific events when changing a published input item
          if ( ! _isPreItemInput ) {
                //inform the input_parent that an input has changed
                //=> useful to handle dependant reactions between different inputs
                input.input_parent.trigger( input.id + ':changed', to );

                //Each input instantiated in an item or a modOpt can have a specific transport set.
                //the input transport is hard coded in the module js template, with the attribute : data-transport="postMessage" or "refresh"
                //=> this is optional, if not set, then the transport will be inherited from the one of the module, which is inherited from the control.
                //send input to the preview. On update only, not on creation.
                if ( ! _.isEmpty( from ) || ! _.isUndefined( from ) && 'postMessage' === input.transport ) {
                      input.module.sendInputToPreview( {
                            input_id        : input.id,
                            input_parent_id : input.input_parent.id,
                            to              : to,
                            from            : from
                      } );
                }
          }
    },


    /*-----------------------------------------
    SOME DEFAULT CALLBACKS
    ------------------------------------------*/
    setupColorPicker : function() {
        var input  = this;

        input.container.find('input').iris( {
            palettes: true,
            hide:false,
            change : function( e, o ) {
                  //if the input val is not updated here, it's not detected right away.
                  //weird
                  //is there a "change complete" kind of event for iris ?
                  //$(this).val($(this).wpColorPicker('color'));
                  //input.container.find('[data-czrtype]').trigger('colorpickerchange');

                  //synchronizes with the original input
                  //OLD => $(this).val( $(this).wpColorPicker('color') ).trigger('colorpickerchange').trigger('change');
                  $(this).val( o.color.toString() ).trigger('colorpickerchange').trigger('change');
            }
        });
    },

    setupColorPickerAlpha : function() {
        var input  = this;

        input.container.find('input').wpColorPicker({
            palettes: true,
            //hide:false,
            width: window.innerWidth >= 1440 ? 271 : 251,
            change : function( e, o ) {
                  //if the input val is not updated here, it's not detected right away.
                  //weird
                  //is there a "change complete" kind of event for iris ?
                  //$(this).val($(this).wpColorPicker('color'));
                  //input.container.find('[data-czrtype]').trigger('colorpickerchange');

                  //synchronizes with the original input
                  //OLD => $(this).val( $(this).wpColorPicker('color') ).trigger('colorpickerchange').trigger('change');
                  $(this).val( o.color.toString() ).trigger('colorpickerchange').trigger('change');
            },
            clear : function( e, o ) {
                  //$(this).val('').trigger('colorpickerchange').trigger('change');
                  input('');
            }
        });
    },

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

    // DEPRECATED since april 2nd 2019
    // setupGutenCheck : function( params ) {
    //       var input      = this;
    //       var $input = input.container.find('input[type=checkbox]'),
    //           $checkWrapper = $( '.czr-toggle-check', input.container );
    //       var _do_ = function() {
    //             $input.closest('.czr-toggle-check').toggleClass( 'is-checked', $input.is(':checked') );
    //             $checkWrapper.find('svg').remove();
    //             $checkWrapper.append(
    //                   ! $input.is(':checked') ? '<svg class="czr-toggle-check__off" width="6" height="6" aria-hidden="true" role="img" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 6 6"><path d="M3 1.5c.8 0 1.5.7 1.5 1.5S3.8 4.5 3 4.5 1.5 3.8 1.5 3 2.2 1.5 3 1.5M3 0C1.3 0 0 1.3 0 3s1.3 3 3 3 3-1.3 3-3-1.3-3-3-3z"></path></svg>' : '<svg class="czr-toggle-check__on" width="2" height="6" aria-hidden="true" role="img" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2 6"><path d="M0 0h2v6H0z"></path></svg>'
    //             );
    //       };
    //       $input.on( 'change', _do_ );
    //       _do_();
    // },

    // when input and label are tied by an id - for relationship
    // clicking on any of them changes the input
    // => We need a unique ID here so that input and label are tied by a unique link
    // The unique ID is generated server side as a GUID
    // @see https://www.w3.org/TR/html401/interact/forms.html#h-17.9.1
    // @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Input/checkbox
    setupNimbleCheck : function( params ) {
          var input      = this;
          var $input = input.container.find('input[type=checkbox]'),
              $checkWrapper = $( '.czr-toggle-check', input.container );
          var _do_ = function() {};
          // $input.on( 'change', _do_ );
          // _do_();
    },

    setupRadio : function( obj ) {
            var input      = this;
            $( 'input[type=radio]', input.container ).each( function(e) {
                  if ( 0 !== $(this).closest('div[class^="icheckbox"]').length )
                    return;

                  $(this).iCheck({
                        checkboxClass: 'icheckbox_flat-grey',
                        checkedClass: 'checked',
                        radioClass: 'iradio_flat-grey',
                  })
                  .on( 'ifChanged', function(e){
                        $(e.currentTarget).trigger('change');
                  });
            });
    },

    setupStepper : function( obj ) {
          var input      = this;
          $('input[type="number"]',input.container ).each( function( e ) {
                $(this).stepper();
          });
    },

    // Empty for the moment, to be overriden
    setupSimpleRange : function() {},

    //@use rangeslider https://github.com/andreruffert/rangeslider.js
    setupRangeSlider : function( options ) {
          var input = this,
              $handle,
              _updateHandle = function(el, val) {
                    var _unit = input.container.find('input').data( 'unit' );
                    el.textContent = val + ( _.isEmpty( input.container.find('input').data( 'unit' ) ) ? '' : _unit );
              };

          $( input.container ).find('input').rangeslider( {
                // Feature detection the default is `true`.
                // Set this to `false` if you want to use
                // the polyfill also in Browsers which support
                // the native <input type="range"> element.
                polyfill: false,

                // Default CSS classes
                rangeClass: 'rangeslider',
                disabledClass: 'rangeslider--disabled',
                horizontalClass: 'rangeslider--horizontal',
                verticalClass: 'rangeslider--vertical',
                fillClass: 'rangeslider__fill',
                handleClass: 'rangeslider__handle',

                // Callback function
                onInit: function() {
                      $handle = $('.rangeslider__handle', this.$range);
                      $('.rangeslider__handle', this.$range);
                      _updateHandle( $handle[0], this.value );
                },
                // Callback function
                onSlide: function(position, value) {
                      _updateHandle( $handle[0], value );
                },
                // Callback function
                //onSlideEnd: function(position, value) {}
          } );
          // .on('input', function() {
          //       _updateHandle( $handle[0], this.value );
          // });
    },

    // for h_alignment and h_text_alignment types
    setupHAlignement : function( input_options ) {
        var input = this,
            $wrapper = $('.sek-h-align-wrapper', input.container );
        // on init
        $wrapper.find( 'div[data-sek-align="' + input() +'"]' ).addClass('selected');

        // on click
        $wrapper.on( 'click', '[data-sek-align]', function(evt) {
              evt.preventDefault();
              $wrapper.find('.selected').removeClass('selected');
              $.when( $(this).addClass('selected') ).done( function() {
                    input( $(this).data('sek-align') );
              });
        });
    }
});//$.extend
})( wp.customize , jQuery, _ );var CZRInputMths = CZRInputMths || {};
( function ( api, $, _ ) {
$.extend( CZRInputMths , {
    // callback for data-input-type="upload"
    setupImageUploaderSaveAsId : function() {
          this.setupImageUploader();
    },

    // callback for data-input-type="upload_url"
    setupImageUploaderSaveAsUrl : function() {
          this.setupImageUploader( { save_as_url : true } );
    },

    //@param args { save_as_url : false }
    setupImageUploader : function( args ) {
          var input        = this,
              _model       = input();

          args = _.extend( { save_as_url : false }, args || {} );
          input.save_as_url = args.save_as_url;

          //an instance field where we'll store the current attachment
          input.attachment   = {};

          //do we have an html template and a input container?
          if ( ! input.container )
            return this;

          input.tmplRendered = $.Deferred();
          input.setupContentRendering( _model, {} );

          //valid just in the init
          input.tmplRendered
                .done( function(){
                      input.czrImgUploaderBinding();
                })
                .fail( function() {
                      api.errorLog( 'setupImageUploader => failed to fetch the template.');
                });
  },

  setupContentRendering : function( to, from ) {
        var input = this, _attachment;
        //retrieve new image if 'to' is different from the saved one
        //NEED A BETTER WAY?
        if ( ( input.attachment.id != to ) && from !== to ) {
              if ( _.isEmpty( to ) ) {
                    input.attachment = {};
                    input.renderImageUploaderTemplate();
              // handles the case when a url is provided
              // Occurs for example when contextualizing the header_image with skope
              } else if ( ! _.isNumber( to ) ) {
                    input.renderImageUploaderTemplate( { fromUrl : true, url : to });
              }
              //Has this image already been fetched ?
              _attachment = wp.media.attachment( to );
              if ( _.isObject( _attachment ) && _.has( _attachment, 'attributes' ) && _.has( _attachment.attributes, 'sizes' ) ) {
                    input.attachment       = _attachment.attributes;
                    input.renderImageUploaderTemplate();
              }
              // If not, try to fetch it but only if the candidate "to" is a number
              else {
                    if ( _.isNumber( to ) ) {
                          wp.media.attachment( to ).fetch().done( function() {
                                input.attachment       = this.attributes;
                                input.renderImageUploaderTemplate();
                          }).fail( function() {
                                api.errorLog('renderImageUploaderTemplate => failed attempt to fetch an img with id : ' + to );
                                // input.attachment = {};
                                // input.renderImageUploaderTemplate();
                          });
                     }
              }
        }//Standard reaction, the image has been updated by the user or init
        else if (  ! input.attachment.id || input.attachment.id === to ) {
              input.renderImageUploaderTemplate();
        }
  },

  czrImgUploaderBinding : function() {
        var input = this;
        //Bind events
        // Shortcut so that we don't have to use _.bind every time we add a callback.
        _.bindAll( input, 'czrImgUploadRemoveFile', 'czrImgUploadOpenFrame', 'czrImgUploadSelect');

        // Bind events, with delegation to facilitate re-rendering.
        input.container.on( 'click keydown', '.upload-button', input.czrImgUploadOpenFrame );
        input.container.on( 'click keydown', '.thumbnail-image img', input.czrImgUploadOpenFrame );
        input.container.on( 'click keydown', '.remove-button', input.czrImgUploadRemoveFile );

        input.bind( input.id + ':changed', function( to, from ){
              input.tmplRendered = $.Deferred();
              input.setupContentRendering( to, from );
        });
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
            button_labels = this.getUploaderLabels();

        input.frame = wp.media({
                button: {
                      text: button_labels.frame_button
                },
                states: [
                       new wp.media.controller.Library({
                              title:     button_labels.frame_title,
                              library:   wp.media.query({ type: 'image' }),
                              multiple:  false,
                              date:      false
                       })
                ]
        });
        // When a file is selected, run a callback.
        input.frame.on( 'select', input.czrImgUploadSelect );
  },

  /**
  * Called when the "Remove" link is clicked. Empties the setting.
  *
  * @param {object} event jQuery Event object
  */
  czrImgUploadRemoveFile: function( event ) {
        var input = this;

        if ( api.utils.isKeydownButNotEnterEvent( event ) ) {
          return;
        }
        event.preventDefault();
        //reset the attachment class field
        input.attachment = {};
        //set the model
        input.set('');
  },


  /**
  * Callback handler for when an attachment is selected in the media modal.
  * Gets the selected image information, and sets it within the input.
  */
  czrImgUploadSelect: function() {
        var node,
            input = this,
            attachment   = input.frame.state().get( 'selection' ).first().toJSON(),  // Get the attachment from the modal frame.
            mejsSettings = window._wpmejsSettings || {};
        //save the attachment in a class field
        input.attachment = attachment;
        //set the model
        input.set( input.save_as_url ? attachment.url : attachment.id );
  },




  //////////////////////////////////////////////////
  /// HELPERS
  //////////////////////////////////////////////////
  // @param args = { fromUrl : true, url : to } || null
  renderImageUploaderTemplate: function( args ) {
        var input  = this;
        args = _.extend( { fromUrl : false, url : '' }, args || {} );

        // //do we have view template script?
        // if ( 0 === $( '#tmpl-czr-input-img-uploader-view-content' ).length ) {
        //       throw new Error('renderImageUploaderTemplate => Missing template for input ' + input.id );
        // }


        // var view_template = wp.template('czr-input-img-uploader-view-content');

        // //  do we have an html template and a module container?
        // if ( ! view_template  || ! input.container )
        //  return;

        var $_view_el    = input.container.find('.' + input.module.control.css_attr.img_upload_container );

        if ( ! $_view_el.length || 1 > input.container.length )
          return;

        var _template_params = {
              button_labels : input.getUploaderLabels(),
              settings      : input.id,
              attachment    : input.attachment,
              fromUrl       : args.url,
              canUpload     : true
        };

        if ( $('#tmpl-czr-img-uploader').length > 0 ) {
              $_view_el.html( wp.template( 'czr-img-uploader' )( _template_params ) );
              input.tmplRendered.resolve();
              input.container.trigger( input.id + ':content_rendered' );
        } else {
              api.CZR_Helpers.getModuleTmpl( {
                    tmpl : 'img-uploader',
                    module_type: 'all_modules',
                    module_id : input.module.id
              } ).done( function( _serverTmpl_ ) {
                    //console.log( 'renderModuleParts => success response =>', input.module.id, _serverTmpl_);
                    $_view_el.html( api.CZR_Helpers.parseTemplate( _serverTmpl_ )( _template_params ) );
                    input.tmplRendered.resolve();
                    input.container.trigger( input.id + ':content_rendered' );
              }).fail( function( _r_ ) {
                    //console.log( 'renderModuleParts => fail response =>', _r_);
                    input.tmplRendered.reject( 'renderImageUploaderTemplate => Problem when fetching the tmpl from server for module : '+ input.module.id );
              });
        }


        return true;
  },

  getUploaderLabels : function() {
        var _ts = serverControlParams.i18n,
            input = this,
            _map = {
            'select'      : _ts.select_image,
            'change'      : _ts.change_image,
            'remove'      : _ts.remove_image,
            'default'     : _ts.default_image,
            'placeholder' : _ts.placeholder_image,
            'frame_title' : _ts.frame_title_image,
            'frame_button': _ts.frame_button_image
        };

        //are we fine ?
        var _fallbackmap = {};
        _.each( _map, function( ts_string, key ) {
              if ( _.isEmpty( ts_string ) ) {
                    api.errorLog( 'A translated string is missing ( ' + key + ' ) for the image uploader input in module : ' + input.module.id );
                    _fallbackmap[ key ] = key;
                    return;
              } else {
                _fallbackmap[ key ] = ts_string;
              }
        });

        return _fallbackmap;
  }
});//$.extend
})( wp.customize , jQuery, _ );/* Fix caching, czrSelect2 default one seems to not correctly work, or it doesn't what I think it should */
// the content_picker options are set in the module with :
// $.extend( module.inputOptions, {
//       'content_picker' : {
//             post : '',//<= all post types
//             taxonomy : ''//<= all taxonomy types
//       }
// });
// To narrow down the post or taxonomy types, the option can be set this way :
// $.extend( module.inputOptions, {
//       'content_picker' : {
//             post : [ 'page', 'cpt1', ...]
//             taxonomy : [ 'category', 'tag', 'Custom_Tax_1', ... ]
//       }
// });
// To disable all posts or taxonomy, use '_none_'
// $.extend( module.inputOptions, {
//       'content_picker' : {
//             post : [ 'page', 'cpt1', ...]
//             taxonomy : '_none_' //<= won't load or search in taxonomies when requesting wp in ajax
//       }
// });
//
// input is an object structured this way
// {
//  id:"2838"
//  object_type:"post"
//  title:"The Importance of Water and Drinking Lots Of It"
//  type_label:"Post"
//  url:"http://customizr-dev.dev/?p=2838"
// }
var CZRInputMths = CZRInputMths || {};
( function ( api, $, _ ) {
$.extend( CZRInputMths , {
      // fired in the input::initialize()
      setupContentPicker: function( wpObjectTypes ) {
              var input  = this,
              _event_map = [];

              /* Dummy for the prototype purpose */
              //input.object = ['post']; //this.control.params.object_types  - array('page', 'post')
              $.extend( _.isObject( wpObjectTypes ) ? wpObjectTypes : {}, {
                    post : '',
                    taxonomy : ''
              } );

              input.wpObjectTypes = wpObjectTypes;

              /* Methodize this or use a template */
              input.container.find('.czr-input').append('<select data-select-type="content-picker-select" class="js-example-basic-simple"></select>');

              // Overrides the default input_event_map declared in ::initialize()
              input.input_event_map = [
                    //set input value
                    {
                          trigger   : 'change',
                          selector  : 'select[data-select-type]',
                          name      : 'set_input_value',
                          actions   : function( obj ){
                                var $_changed_input   = $( obj.dom_event.currentTarget, obj.dom_el ),
                                    _raw_val          = $( $_changed_input, obj.dom_el ).czrSelect2( 'data' ),
                                    _val_candidate    = {},
                                    _default          = {
                                          id          : '',
                                          type_label  : '',
                                          title       : '',
                                          object_type : '',
                                          url         : ''
                                    };

                                _raw_val = _.isArray( _raw_val ) ? _raw_val[0] : _raw_val;
                                if ( ! _.isObject( _raw_val ) || _.isEmpty( _raw_val ) ) {
                                    api.errare( 'Content Picker Input : the picked value should be an object not empty.');
                                    return;
                                }

                                //normalize and purge useless czrSelect2 fields
                                //=> skip a possible _custom_ id, used for example in the slider module to set a custom url
                                _.each( _default, function( val, k ){
                                      if ( '_custom_' !== _raw_val.id ) {
                                            if ( ! _.has( _raw_val, k ) || _.isEmpty( _raw_val[ k ] ) ) {
                                                  api.errare( 'content_picker : missing input param : ' + k );
                                                  return;
                                            }
                                      }
                                      _val_candidate[ k ] = _raw_val[ k ];
                                } );
                                //set the value now
                                input.set( _val_candidate );
                          }
                    }
              ];

              //input.setupDOMListeners( _event_map , { dom_el : input.container }, input );
              //setup when ready.
              input.isReady.done( function() {
                    input.setupContentSelecter();
              });

      },


      // input is an object structured this way
      // {
      //  id:"2838"
      //  object_type:"post"
      //  title:"The Importance of Water and Drinking Lots Of It"
      //  type_label:"Post"
      //  url:"http://customizr-dev.dev/?p=2838"
      // }
      setupContentSelecter : function() {
              var input = this;
              //set the previously selected value
              if ( ! _.isEmpty( input() ) ) {
                    var _attributes = {
                          value : input().id || '',
                          title : input().title || '',
                          selected : "selected"
                    };
                    //input.container.find('select')
                    input.container.find('select').append( $( '<option>', _attributes ) );
              }

              // Stores the current ajax action
              input.currentAjaxAction = input.currentAjaxAction || new api.Value();

              // When the ajax action changes, reset the rendering status of the defaultContentPickerOption
              // fixes "Set Custom Url" being printed multiple times, @see https://github.com/presscustomizr/nimble-builder/issues/207
              input.currentAjaxAction.bind( function( ajaxAction ) {
                    input.defaultValueHasBeenPushed = false;
              });

              // reset the rendering status of the defaultContentPickerOption
              // fixes "Set Custom Url" being printed multiple times, @see https://github.com/presscustomizr/nimble-builder/issues/207
              input.container.find( 'select' ).on('czrSelect2:select czrSelect2:unselect czrSelect2:close czrSelect2:open', function (e) {
                    input.defaultValueHasBeenPushed = false;
              });

              input.container.find( 'select' ).czrSelect2( {
                    placeholder: {
                          id: '-1', // the value of the option
                          title: 'Select'
                    },
                    data : input.setupSelectedContents(),
                    //  allowClear: true,
                    ajax: {
                          url: wp.ajax.settings.url,// was serverControlParams.AjaxUrl,
                          type: 'POST',
                          dataType: 'json',
                          delay: 250,
                          debug: true,
                          data: function ( params ) {
                                //for some reason I'm not getting at the moment the params.page returned when searching is different
                                var page = params.page ? params.page : 0;
                                page = params.term ? params.page : page;

                                // Set the current ajax action now
                                input.currentAjaxAction( params.term ? "search-available-content-items-customizer" : "load-available-content-items-customizer" );

                                return {
                                      action          : input.currentAjaxAction(),
                                      search          : params.term,
                                      wp_customize    : 'on',
                                      page            : page,
                                      wp_object_types : JSON.stringify( input.wpObjectTypes ),
                                      nonce : api.settings.nonce.save
                                };
                          },
                          //  transport: function (params, success, failure) {
                          //   console.log('params', params );
                          //   console.log('success', success );
                          //   console.log('failure', failure );
                          //   var $request = $.ajax(params);

                          //   $request.then(success);
                          //   $request.fail(failure);

                          //   return $request;
                          // },
                          processResults: function ( data, params ) {
                                //allows us to remotely set a default option like custom link when initializing the content picker input.
                                var defaultContentPickerOption = { defaultOption : {
                                            id          : '',
                                            title       : '',
                                            type_label  : '',
                                            object_type : '',
                                            url         : ''
                                      }
                                };
                                if ( input.input_parent && input.input_parent.module ) {
                                      input.input_parent.module.trigger( 'set_default_content_picker_options', { defaultContentPickerOption : defaultContentPickerOption } );
                                } else {
                                      api.infoLog(' content_picker input => ::processResults => event "set_default_content_picker_option" not triggered when in pre-item');
                                }

                                if ( ! data.success ) {
                                      api.errare('request failure in setupContentPicker => processResults', data );
                                      return { results: defaultContentPickerOption.defaultOption };
                                }

                                var items   = data.data.items,
                                    _results = [];

                                // cast items to an array
                                items = !_.isArray( items ) ? [] : items;

                                input.defaultValueHasBeenPushed = input.defaultValueHasBeenPushed || false;

                                if ( 'load-available-content-items-customizer' === input.currentAjaxAction() && ! _.isEmpty( defaultContentPickerOption.defaultOption ) ) {
                                      if ( defaultContentPickerOption.defaultOption.id && ! input.defaultValueHasBeenPushed ) {
                                            _results.push( defaultContentPickerOption.defaultOption );
                                            input.defaultValueHasBeenPushed = true;
                                      }
                                }

                                _.each( items, function( item ) {
                                      _results.push({
                                            id          : item.id,
                                            title       : item.title,
                                            type_label  : item.type_label,
                                            object_type : item.object,
                                            url         : item.url
                                      });
                                });

                                return {
                                      results: _results,
                                      //The pagination param will trigger the infinite load
                                      //@to be improved
                                      pagination:  { more: items.length >= 1 }//<= the pagination boolean param can be tricky => here set to >= 10 because we query 10 + add a custom link item on the first query
                                };
                          },
                    },//ajax
                    templateSelection: input.czrFormatContentSelected,
                    templateResult: input.czrFormatContentSelected,
                    escapeMarkup: function ( markup ) { return markup; },
             });//czrSelect2 setup
      },

      // item is structured this way :
      // {
      // id          : item.id,
      // title       : item.title,
      // type_label  : item.type_label,
      // object_type : item.object,
      // url         : item.url
      // }
      czrFormatContentSelected: function ( item ) {
              if ( item.loading ) return item.text;
              var markup = "<div class='content-picker-item'>" +
                "<div class='content-item-bar'>" +
                  "<span class='czr-picker-item-title'>" + item.title + "</span>";

              if ( item.type_label ) {
                markup += "<span class='czr-picker-item-type'>" + item.type_label + "</span>";
              }

              markup += "</div></div>";

              return markup;
      },

      setupSelectedContents : function() {
            var input = this,
               _model = input();

            return _model;
      }
});//$.extend
})( wp.customize , jQuery, _ );//extends api.Value
//options:
  // id : item.id,
  // initial_item_model : item,
  // defaultItemModel : module.defaultItemModel,
  // module : module,
  // is_added_by_user : is_added_by_user || false

var CZRItemMths = CZRItemMths || {};
( function ( api, $, _ ) {
$.extend( CZRItemMths , {
      initialize: function( id, options ) {
            if ( _.isUndefined(options.module) || _.isEmpty(options.module) ) {
              throw new Error('No module assigned to item ' + id + '. Aborting');
            }

            var item = this;
            api.Value.prototype.initialize.call( item, null, options );

            //DEFERRED STATES
            //store the state of ready.
            //=> we don't want the ready method to be fired several times
            item.isReady = $.Deferred();
            //will store the embedded and content rendered state
            item.embedded = $.Deferred();
            item.container = null;//will store the item $ dom element
            item.contentContainer = null;//will store the item content $ dom element

            // this collection will be populated based on the DOM rendered input candidates
            // will allows us to set and get any individual input : item.czr_Input('font-family')()
            // declaring the collection Values here allows us to schedule actions for not yet registered inputs
            // like for example :
            // => when the font-family input is registered, then listen to it
            // item.czr_Input.when( 'font-family', function( _input_ ) {
            //       _input_.bind( function( to, from ) {
            //             console.log('font-family input changed ', to ,from );
            //       });
            // });
            item.czr_Input = new api.Values();

            // the item.inputCollection stores all instantiated input from DOM at the end of api.CZR_Helpers.setupInputCollectionFromDOM.call( item );
            // the collection of each individual input object is stored in item.czr_Input()
            // this inputCollection is designed to be listened to, in order to fire action when the collection has been populated.
            item.inputCollection = new api.Value({});

            //VIEW STATES FOR ITEM AND REMOVE DIALOG
            //viewState stores the current expansion status of a given view => one value by created by item.id
            //viewState can take 3 values : expanded, expanded_noscroll (=> used on view creation), closed
            item.viewState = new api.Value( 'closed' );
            item.removeDialogVisible = new api.Value( false );

            //input.options = options;
            //write the options as properties, name is included
            $.extend( item, options || {} );

            //declares a default model
            item.defaultItemModel = _.clone( options.defaultItemModel ) || { id : '', title : '' };

            //set initial values
            var _initial_model = $.extend( item.defaultItemModel, options.initial_item_model );

            // Check initial model here : to be overriden in each module
            _initial_model = item.validateItemModelOnInitialize( _initial_model );

            //this won't be listened to at this stage
            item.set( _initial_model );

            //USER EVENT MAP
            item.userEventMap = new api.Value( [
                  //toggles remove view alert
                  {
                        trigger   : 'click keydown',
                        selector  : [ '.' + item.module.control.css_attr.display_alert_btn, '.' + item.module.control.css_attr.cancel_alert_btn ].join(','),
                        name      : 'toggle_remove_alert',
                        actions   : ['toggleRemoveAlert']
                  },
                  //removes item and destroys its view
                  {
                        trigger   : 'click keydown',
                        selector  : '.' + item.module.control.css_attr.remove_view_btn,
                        name      : 'remove_item',
                        actions   : ['removeItem']
                  },
                  //edit view
                  {
                        trigger   : 'click keydown',
                        selector  : [ '.' + item.module.control.css_attr.edit_view_btn, '.' + item.module.control.css_attr.item_title ].join(','),
                        name      : 'edit_view',
                        actions   : [ 'setViewVisibility' ]
                  },
                  //clone view
                  {
                        trigger   : 'click keydown',
                        selector  : '.czr-clone-item',
                        name      : 'clone_view',
                        actions   : function( args ) {
                              args = args || {};
                              var _cloned_item_model = $.extend( {}, true, item() );
                              _cloned_item_model.id = '';
                              this.module.addItem( args, _cloned_item_model ).done( function() {
                                    // Nimble Builder => make sure the dynamic stylesheet is refreshed
                                    if ( window.sektionsLocalizedData && api.czr_skopeBase ) {
                                          api.previewer.trigger( 'sek-refresh-stylesheet', {
                                                local_skope_id : api.czr_skopeBase.getSkopeProperty( 'skope_id' ),
                                                location_skope_id : sektionsLocalizedData.globalSkopeId
                                          });
                                    }
                              });
                        }
                  },
                  //tabs navigation
                  {
                        trigger   : 'click keydown',
                        selector  : '.tabs nav li',
                        name      : 'tab_nav',
                        actions   : function( args ) {
                              //toggleTabVisibility is declared in the module ctor and its "this" is the item or the modOpt
                              var tabIdSwitchedTo = $( args.dom_event.currentTarget, args.dom_el ).data('tab-id');
                              this.module.toggleTabVisibility.call( this, tabIdSwitchedTo );
                              this.trigger( 'tab-switch', { id : tabIdSwitchedTo } );
                        }
                  }
            ]);




            //ITEM IS READY
            //1) push it to the module item collection
            //2) observe its changes
            item.isReady.done( function() {
                  //push it to the collection
                  item.module.updateItemsCollection( { item : item() } );
                  //listen to each single item change
                  item.callbacks.add( function() { return item.itemReact.apply(item, arguments ); } );

                  //SCHEDULE INPUTS SETUP
                  //=> when the item content has been rendered. Typically on item expansion for a multi-items module.
                  // => or for mono item, right on item.renderItemWrapper()
                  item.bind( 'contentRendered', function() {
                        //create the collection of inputs if needed
                        //first time or after a removal
                        // previous condition included :  ! _.has( item, 'czr_Input' )
                        if ( _.isEmpty( item.inputCollection() ) ) {
                              if ( serverControlParams.isDevMode ) {
                                    api.CZR_Helpers.setupInputCollectionFromDOM.call( item );
                                    //the item.container is now available
                                    //Setup the tabs navigation
                                    //setupTabNav is defined in the module ctor and its this is the item or the modOpt
                                    item.module.setupTabNav.call( item );
                              } else {
                                    try {
                                          api.CZR_Helpers.setupInputCollectionFromDOM.call( item );
                                          //the item.container is now available
                                          //Setup the tabs navigation
                                          //setupTabNav is defined in the module ctor and its this is the item or the modOpt
                                          item.module.setupTabNav.call( item );
                                    } catch( er ) {
                                          api.errorLog( 'In item.isReady.done : ' + er );
                                    }
                              }
                        }
                  });

                  //SCHEDULE INPUTS DESTROY
                  item.bind( 'contentRemoved', function() {
                        if ( _.has( item, 'czr_Input' ) )
                          api.CZR_Helpers.removeInputCollection.call( item );
                  });

                  //When shall we render the item ?
                  //If the module is part of a simple control, the item can be render now,
                  if ( item.canBeRendered() ) {
                        item.mayBeRenderItemWrapper();
                  }

                  //ITEM WRAPPER VIEW SETUP
                  //defer actions on item view embedded
                  item.embedded.done( function() {
                        //define the item view DOM event map
                        //bind actions when the item is embedded : item title, etc.
                        item.itemWrapperViewSetup( _initial_model );
                  });
            });//item.isReady.done()

            //if an item is manually added : open it
            // if ( item.is_added_by_user ) {
            //   item.setViewVisibility( {}, true );//empty obj because this method can be fired by the dom chain actions, always passing an object. true for added_by_user
            // }
            //item.setViewVisibility( {}, item.is_added_by_user );

      },//initialize

      //overridable method
      //Fired if the item has been instantiated
      //The item.callbacks are declared.
      ready : function() {
            // July 2021 introduced so we can remotely add visibility functions
            api.trigger('czr_module_item_is_ready', {
                  module_type : this.module.module_type,
                  item : this
            });
            this.isReady.resolve();
      },

      // overridable method introduced with the flat skope
      // problem to solve => an instantiated item, doesn't necessary have to be rendered in a given context.
      canBeRendered : function() {
            return true;
      },

      // @return validated model object
      // To be overriden in each module
      validateItemModelOnInitialize : function( item_model_candidate ) {
            return item_model_candidate;
      },

      // React to a single item change
      // cb of module.czr_Item( item.id ).callbacks
      // the params can typically hold informations passed by the input that has been changed and its specific preview transport (can be PostMessage )
      // params looks like :
      // {
      //  module : {}
      //  input_changed     : string input.id
      //  input_transport   : 'postMessage' or '',
      //  not_preview_sent  : bool
      // }
      itemReact : function( to, from, params ) {
            var item = this,
                module = item.module;

            params = params || {};

            //update the collection
            module.updateItemsCollection( { item : to, params : params } ).done( function() {
                  //Always update the view title when the item collection has been updated
                  item.writeItemViewTitle( to, params );
            });

            //send item to the preview. On update only, not on creation.
            // if ( ! _.isEmpty(from) || ! _.isUndefined(from) ) {
            //       api.consoleLog('DO WE REALLY NEED TO SEND THIS TO THE PREVIEW WITH _sendItem(to, from) ?');
            //       item._sendItem(to, from);
            // }
      }
});//$.extend
})( wp.customize , jQuery, _ );//extends api.CZRBaseControl

var CZRItemMths = CZRItemMths || {};
( function ( api, $, _ ) {
$.extend( CZRItemMths , {
      //The idea is to send only the currently modified item instead of the entire collection
      //the entire collection is sent anyway on api(setId).set( value ), and accessible in the preview via api(setId).bind( fn( to) )
      _sendItem : function( to, from ) {
            var item = this,
                module = item.module,
                _changed_props = [];

            //which property(ies) has(ve) changed ?
            _.each( from, function( _val, _key ) {
                  if ( _val != to[_key] )
                    _changed_props.push(_key);
            });

            _.each( _changed_props, function( _prop ) {
                  api.previewer.send( 'sub_setting', {
                        set_id : module.control.id,
                        id : to.id,
                        changed_prop : _prop,
                        value : to[_prop]
                  });

                  //add a hook here
                  module.trigger('item_sent', { item : to , dom_el: item.container, changed_prop : _prop } );
            });
      },

      // fired on click event
      // @see initialize()
      toggleRemoveAlert : function() {
            var _isVisible = this.removeDialogVisible();
            this.module.closeRemoveDialogs();
            this.removeDialogVisible( ! _isVisible );
      },

      //fired on click dom event
      //for dynamic multi input modules
      //@return void()
      //@param params : { dom_el : {}, dom_event : {}, event : {}, model {} }
      removeItem : function( params ) {
            params = params || {};
            var item = this,
                module = this.module,
                _new_collection = _.clone( module.itemCollection() );

            //hook here
            module.trigger('pre_item_dom_remove', item() );

            //destroy the Item DOM el
            item._destroyView();

            //new collection
            //say it
            _new_collection = _.without( _new_collection, _.findWhere( _new_collection, {id: item.id }) );
            module.itemCollection.set( _new_collection );
            //hook here
            module.trigger('pre_item_api_remove', item() );

            var _item_ = $.extend( true, {}, item() );

            // <REMOVE THE ITEM FROM THE COLLECTION>
            module.czr_Item.remove( item.id );
            // </REMOVE THE ITEM FROM THE COLLECTION>

            //refresh the preview frame (only needed if transport is postMessage && has no partial refresh set )
            //must be a dom event not triggered
            //otherwise we are in the init collection case where the items are fetched and added from the setting in initialize
            if ( 'postMessage' == api(module.control.id).transport && _.has( params, 'dom_event') && ! _.has( params.dom_event, 'isTrigger' ) && ! api.CZR_Helpers.hasPartRefresh( module.control.id ) ) {
                  // api.previewer.refresh().done( function() {
                  //       _dfd_.resolve();
                  // });
                  // It would be better to wait for the refresh promise
                  // The following approach to bind and unbind when refreshing the preview is similar to the one coded in module::addItem()
                  var triggerEventWhenPreviewerReady = function() {
                        api.previewer.unbind( 'ready', triggerEventWhenPreviewerReady );
                        module.trigger( 'item-removed', _item_ );
                  };
                  api.previewer.bind( 'ready', triggerEventWhenPreviewerReady );
                  api.previewer.refresh();
            } else {
                  module.trigger( 'item-removed', _item_ );
                  module.control.trigger( 'item-removed', _item_ );
            }

      },

      //@return the item {...} from the collection
      //takes a item unique id as param
      getModel : function(id) {
            return this();
      }

});//$.extend
})( wp.customize , jQuery, _ );
//extends api.CZRBaseControl
var CZRItemMths = CZRItemMths || {};
( function ( api, $, _ ) {
$.extend( CZRItemMths , {
      //fired on initialize for items in module embedded in a regular control
      mayBeRenderItemWrapper : function() {
            var item = this;

            if ( 'pending' != item.embedded.state() )
              return;
            // Make sure we don't print twice
            if ( ! _.isEmpty( item.container ) && item.container.length > 0 )
              return;

            $.when( item.renderItemWrapper() ).done( function( $_container ) {
                  item.container = $_container;
                  if ( _.isUndefined( item.container ) || ! item.container.length ) {
                        throw new Error( 'In mayBeRenderItemWrapper the Item view has not been rendered : ' + item.id );
                  } else {
                        //say it
                        item.embedded.resolve();
                  }
            });
      },

      //the view wrapper has been rendered by WP
      //the content ( the various inputs ) is rendered by the following methods
      //an event is triggered on the control.container when content is rendered
      renderItemWrapper : function( _item_model_ ) {
            //=> an array of objects
            var item = this,
                module = item.module,
                dfd = $.Deferred(),
                $_view_el;

            // Create a deep copy of the item, so we can inject custom properties before parsing the template, without affecting the original item
            var item_model_for_template_injection = $.extend( true, {}, _item_model_ || item() );

            var appendAndResolve = function( _tmpl_ ) {
                  //if module is multi item, then render the item crud header part
                  //Note : for the widget module, the getTemplateSelectorPart method is overridden
                  if ( module.isMultiItem() ) {
                        //do we have an html template ?
                        if ( _.isEmpty( _tmpl_ ) ) {
                              dfd.reject( 'renderItemWrapper => Missing html template for module : '+ module.id );
                        }
                        $_view_el.append( _tmpl_ );
                  }

                  //then, append the item content wrapper
                  $_view_el.append( $( '<div/>', { class: module.control.css_attr.item_content } ) );

                  dfd.resolve( $_view_el );
            };//appendAndResolve


            // allow plugin to alter the item_model before template injection
            item.trigger( 'item-model-before-item-wrapper-template-injection', item_model_for_template_injection );

            //render the item wrapper
            $_view_el = $('<li>', { class : module.control.css_attr.single_item, 'data-id' : item_model_for_template_injection.id,  id : item_model_for_template_injection.id } );

            //append the item view to the first module view wrapper
            //!!note : => there could be additional sub view wrapper inside !!
            //$( '.' + module.control.css_attr.items_wrapper , module.container).first().append( $_view_el );
            // module.itemsWrapper has been stored as a $ var in module initialize() when the tmpl has been embedded
            module.itemsWrapper.append( $_view_el );

            if ( module.isMultiItem() ) {
                  var _template_selector;
                  // Do we have view content template script?
                  // if yes, let's use it <= Old way
                  // Otherwise let's fetch the html template from the server
                  if ( ! _.isEmpty( module.rudItemPart ) ) {
                        _template_selector = module.getTemplateSelectorPart( 'rudItemPart', item_model_for_template_injection );
                        //do we have view template script?
                        if ( 1 > $( '#tmpl-' + _template_selector ).length ) {
                            dfd.reject( 'Missing template for item ' + item.id + '. The provided template script has no been found : #tmpl-' + _template_selector );
                        }
                        var items_are_clonable = api.czrModuleMap[module.module_type] && api.czrModuleMap[module.module_type].items_are_clonable;
                        appendAndResolve( wp.template( _template_selector )( $.extend( item_model_for_template_injection, { is_sortable : module.sortable, items_are_clonable : items_are_clonable } ) ) );
                  } else {

                        // allow plugin to alter the ajax params before fetching
                        var requestParams = {
                              tmpl : 'rud-item-part',
                              module_type: 'all_modules',
                              module_id : module.id,
                              control_id : module.control.id
                        };
                        item.trigger( 'item-wrapper-tmpl-params-before-fetching', requestParams );

                        // Let's check if the filtered requested params can find a match of a printed tmpl of the module
                        // this filter 'item-wrapper-tmpl-params-before-fetching', is used in the widget zone module of the Hueman theme (june 2018 )
                        // it allows us to assign a specific template for the built-in widget zones
                        if ( ! _.isEmpty( module[ requestParams.tmpl ] ) ) {
                              _template_selector = module.getTemplateSelectorPart( requestParams.tmpl, item_model_for_template_injection );
                              //do we have view template script?
                              if ( 1 > $( '#tmpl-' + _template_selector ).length ) {
                                  dfd.reject( 'Missing template for item ' + item.id + '. The provided template script has no been found : #tmpl-' + _template_selector );
                              }
                              appendAndResolve( wp.template( _template_selector )( item_model_for_template_injection ) );
                        } else {
                              api.CZR_Helpers.getModuleTmpl( requestParams ).done( function( _serverTmpl_ ) {
                                    //console.log( 'renderItemWrapper => success response =>', module.id, _serverTmpl_);
                                    appendAndResolve( api.CZR_Helpers.parseTemplate( _serverTmpl_ )(  $.extend( item_model_for_template_injection, { is_sortable : module.sortable } ) ) );
                              }).fail( function( _r_ ) {
                                    //console.log( 'renderItemWrapper => fail response =>', _r_);
                                    dfd.reject( 'renderItemWrapper => Problem when fetching the rud-item-part tmpl from server for module : '+ module.id );
                              });
                        }
                  }
            } else {//if ( module.isMultiItem() ) {}
                  appendAndResolve();
            }

            return dfd.promise();
      },


      // fired when item is ready and embedded
      // define the item view DOM event map
      // bind actions when the item is embedded
      itemWrapperViewSetup : function( _item_model_ ) {
            var item = this,
                module = this.module;

            // _item_model_ = item() || item.initial_item_model;//could not be set yet

            // Let's create a deep copy now
            item_model = item() || item.initial_item_model;//$.extend( true, {}, _item_model_ );

            // always write the title
            item.writeItemViewTitle();


            // When do we render the item content ?
            // If this is a multi-item module, let's render each item content when they are expanded.
            // In the case of a single item module, we can render the item content now.
            var _updateItemContentDeferred = function( $_item_content, to, from ) {
                  //update the $.Deferred state
                  if ( ! _.isUndefined( $_item_content ) && false !== $_item_content.length ) {
                        item.contentContainer = $_item_content;
                        // The 'contentRendered' event triggers the api.CZR_Helpers.setupInputCollectionFromDOM.call( item );
                        item.trigger( 'contentRendered', { item_content : $_item_content } );
                        item.toggleItemExpansion( to, item.module.isMultiItem() ? 150 : 0 );//the second param is the duration
                        item.cleanLoader();

                  }
                  else {
                        throw new Error( 'Module : ' + item.module.id + ', the item content has not been rendered for ' + item.id );
                  }
            };

            // MULTI-ITEM MODULE
            if ( item.module.isMultiItem() ) {
                  item.viewState.callbacks.add( function( to, from ) {
                        //viewState can take 3 states : expanded, expanded_noscroll, closed
                        var _isExpanded = -1 !== to.indexOf( 'expanded' );

                        //If this module has mod Opt, always close the opt pane on view state change
                        if ( module.hasModOpt() && _isExpanded ) {
                              api.czr_ModOptVisible( false, {
                                    module : module,//the current module for which the modOpt is being expanded
                                    focus : false//the id of the tab we want to focus on
                              });
                        }

                        if ( _isExpanded ) {
                              //item already rendered ?
                              if ( _.isObject( item.contentContainer ) && false !== item.contentContainer.length ) {
                                    //toggle on view state change
                                    item.toggleItemExpansion(to);
                              } else {
                                    item.printLoader();
                                    item.renderItemContent( item() || item.initial_item_model )
                                          .done( function( $_item_content ) {
                                                //introduce a small delay to give some times to the modules to be printed.
                                                //@todo : needed ?
                                                //_updateItemContentDeferred = _.debounce(_updateItemContentDeferred, 50 );
                                                _updateItemContentDeferred( $_item_content, to, from );
                                          })
                                          .fail( function( _r_ ) {
                                                api.errorLog( "multi-item module => failed item.renderItemContent for module : " + module.id, _r_ );
                                          });
                              }
                        } else {
                              //toggle on view state change
                              item.toggleItemExpansion( to ).done( function() {
                                    if ( _.isObject( item.contentContainer ) && false !== item.contentContainer.length ) {
                                          item.trigger( 'beforeContenRemoved' );
                                          //Removes DOM input nodes
                                          $( '.' + module.control.css_attr.item_content, item.container ).children().each( function() {
                                                $(this).remove();
                                          });
                                          //clean any other content like a commented html markup
                                          $( '.' + module.control.css_attr.item_content, item.container ).html('');
                                          //reset the contentContainer property
                                          item.contentContainer = null;
                                          //will remove the input collection values
                                          item.trigger( 'contentRemoved' );
                                    }
                              });
                        }
                  });
            }
            // SINGLE ITEM MODULE
            else {
                  //react to the item state changes
                  item.viewState.callbacks.add( function( to, from ) {
                        //toggle on view state change
                        item.toggleItemExpansion.apply( item, [ to, 0 ] );
                  });
                  item.printLoader();
                  //renderview content now for a single item module
                  item.renderItemContent( item_model )
                        .done( function( $_item_content ) {
                              _updateItemContentDeferred( $_item_content, true );
                              //item.viewState.set('expanded');
                        })
                        .fail( function( _r_ ) {
                              api.errare( "mono-item module => failed item.renderItemContent for module : " + module.id, _r_ );
                        });
            }

            //DOM listeners for the user action in item view wrapper
            api.CZR_Helpers.setupDOMListeners(
                  item.userEventMap(),//actions to execute
                  { model:item_model, dom_el:item.container },//model + dom scope
                  item //instance where to look for the cb methods
            );

            //Listen to the remove dialog state
            item.removeDialogVisible.bind( function( visible ) {
                  var module = item.module,
                      $_alert_el = $( '.' + module.control.css_attr.remove_alert_wrapper, item.container ).first();

                  //first close all open items views and dialogs
                  if ( visible )
                    module.closeAllItems();

                  //Close Mod opts if any
                  if ( visible && module.hasModOpt() ) {
                        api.czr_ModOptVisible( false, {
                              module : module,//the current module for which the modOpt is being expanded
                              focus : false//the id of the tab we want to focus on
                        });
                  }

                  //Close Pre item dialog
                  if ( visible && _.has( module, 'preItem' ) ) {
                        module.preItemExpanded(false);
                  }

                  //then close any other open remove dialog in the item container
                  $('.' + module.control.css_attr.remove_alert_wrapper, item.container ).not( $_alert_el ).each( function() {
                        if ( $(this).hasClass( 'open' ) ) {
                              $(this).slideToggle( {
                                    duration : 200,
                                    done : function() {
                                          $(this).toggleClass('open' , false );
                                          //deactivate the icons
                                          $(this).siblings().find('.' + module.control.css_attr.display_alert_btn).toggleClass( 'active' , false );
                                    }
                              } );
                        }
                  });

                  //print the html if dialod is expanded
                  if ( visible ) {
                        // Do we have view content template script?
                        // if yes, let's use it <= Old way
                        // Otherwise let's fetch the html template from the server
                        if ( ! _.isEmpty( module.alertPart ) ) {
                              if ( 1 > $( '#tmpl-' + module.alertPart ).length || _.isEmpty( item.container ) ) {
                                    api.errare( 'No removal alert template available for items in module :' + module.id );
                                    return;
                              }
                              $_alert_el.html( wp.template( module.alertPart )( { title : ( item().title || item.id ) } ) );
                              item.trigger( 'remove-dialog-rendered');
                        } else {
                              api.CZR_Helpers.getModuleTmpl( {
                                    tmpl : 'rud-item-alert-part',
                                    module_type: 'all_modules',
                                    module_id : module.id,
                                    control_id : module.control.id
                              } ).done( function( _serverTmpl_ ) {
                                    //console.log( 'item.removeDialogVisible => success response =>', module.id, _serverTmpl_);
                                    $_alert_el.html( api.CZR_Helpers.parseTemplate( _serverTmpl_ )( { title : ( item().title || item.id ) } ) );
                                    item.trigger( 'remove-dialog-rendered');
                              }).fail( function( _r_ ) {
                                    //console.log( 'item.removeDialogVisible => fail response =>', _r_);
                                    api.errare( 'item.removeDialogVisible => Problem when fetching the tmpl from server for module : '+ module.id, _r_ );
                              });
                        }
                  }

                  //Slide it
                  var _slideComplete = function( visible ) {
                        $_alert_el.toggleClass( 'open' , visible );
                        //set the active class of the clicked icon
                        item.container.find('.' + module.control.css_attr.display_alert_btn ).toggleClass( 'active', visible );
                        //adjust scrolling to display the entire dialog block
                        if ( visible )
                          module._adjustScrollExpandedBlock( item.container );
                  };
                  if ( visible ) {
                        $_alert_el.stop( true, true ).slideDown( 200, function() { _slideComplete( visible ); } );
                  } else {
                        $_alert_el.stop( true, true ).slideUp( 200, function() { _slideComplete( visible ); } );
                  }
            });//item.removeDialogVisible.bind()
      },//itemWrapperViewSetup



      //renders saved items views and attach event handlers
      //the saved item look like :
      //array[ { id : 'sidebar-one', title : 'A Title One' }, {id : 'sidebar-two', title : 'A Title Two' }]
      renderItemContent : function( _item_model_ ) {
            //=> an array of objects
            var item = this,
                module = this.module,
                dfd = $.Deferred();

            // Create a deep copy of the item, so we can inject custom properties before parsing the template, without affecting the original item
            var item_model_for_template_injection = $.extend( true, {}, _item_model_ || item() );

            // allow plugin to alter the item_model before template injection
            item.trigger( 'item-model-before-item-content-template-injection', item_model_for_template_injection );

            var appendAndResolve = function( _tmpl_ ) {
                  //do we have an html template ?
                  if ( _.isEmpty( _tmpl_ ) ) {
                        dfd.reject( 'renderItemContent => Missing html template for module : '+ module.id );
                  }
                  var $itemContentWrapper = $( '.' + module.control.css_attr.item_content, item.container );
                  // append the view content
                  $( _tmpl_ ).appendTo( $itemContentWrapper );
                  dfd.resolve( $itemContentWrapper );
            };//appendAndResolve

            // Do we have view content template script?
            // if yes, let's use it <= Old way
            // Otherwise let's fetch the html template from the server
            if ( ! _.isEmpty( module.itemInputList ) || _.isFunction( module.itemInputList ) ) {
                  var tmplSelectorSuffix = module.getTemplateSelectorPart( 'itemInputList', item_model_for_template_injection );
                  if ( 1 > $( '#tmpl-' + tmplSelectorSuffix ).length ) {
                        dfd.reject( 'renderItemContent => No itemInputList content template defined for module ' + module.id + '. The template script id should be : #tmpl-' + tmplSelectorSuffix );
                  } else {
                        appendAndResolve( wp.template( tmplSelectorSuffix )( $.extend( item_model_for_template_injection, { control_id : module.control.id } ) ) );
                  }

            } else {
                  var requestParams = {
                        tmpl : 'item-inputs',
                        module_type: module.module_type,
                        module_id : module.id,
                        control_id : module.control.id,
                        item_model : item_model_for_template_injection
                  };
                  // allow plugins to filter the query param before fetching the template for item content
                  module.trigger( 'filter-request-params-before-fetching-for-item-content-tmpl', requestParams );

                  api.CZR_Helpers.getModuleTmpl( requestParams ).done( function( _serverTmpl_ ) {
                        //console.log( 'renderItemContent => success response =>', _serverTmpl_);
                        appendAndResolve( api.CZR_Helpers.parseTemplate( _serverTmpl_ )( $.extend( item_model_for_template_injection, { control_id : module.control.id } ) ) );
                  }).fail( function( _r_ ) {
                        //console.log( 'renderItemContent => fail response =>', _r_);
                        dfd.reject( _r_ );
                  });
            }
            return dfd.promise();
      },





      //fired in setupItemListeners
      writeItemViewTitle : function( item_model ) {
            var item = this,
                module = item.module,
                _model = item_model || item(),
                //Let's fall back on the id if the title is not set or empty
                _title = ( _.has( _model, 'title') && ! _.isEmpty( _model.title ) ) ? api.CZR_Helpers.capitalize( _model.title ) : _model.id;

            _title = api.CZR_Helpers.truncate( _title, 20 );
            $( '.' + module.control.css_attr.item_title , item.container ).text( _title );
            //add a hook here
            api.CZR_Helpers.doActions('after_writeViewTitle', item.container , _model, item );
      },



      //@param : obj = { event : {}, model : {}, view : ${} }
      //Fired on view_rendered:new when a new model has been added
      //Fired on click on edit_view_btn
      setViewVisibility : function( obj, is_added_by_user ) {
            var item = this,
                module = this.module;
            if ( is_added_by_user ) {
                  item.viewState.set( 'expanded_noscroll' );
            } else {
                  module.closeAllItems( item.id );
                  if ( _.has(module, 'preItem') ) {
                    module.preItemExpanded.set(false);
                  }
                  item.viewState.set( 'expanded' == item._getViewState() ? 'closed' : 'expanded' );
            }
      },


      _getViewState : function() {
            return -1 == this.viewState().indexOf('expanded') ? 'closed' : 'expanded';
      },


      // callback of item.viewState.callbacks
      // viewState can take 3 states : expanded, expanded_noscroll, closed
      toggleItemExpansion : function( status, duration ) {
            var visible = 'closed' != status,
                item = this,
                module = this.module,
                $el = $( '.' + module.control.css_attr.item_content , item.container ).first(),
                dfd = $.Deferred(),
                _slideComplete = function( visible ) {
                      item.container.toggleClass( 'open' , visible );
                      //close all remove dialogs
                      if ( visible )
                        module.closeRemoveDialogs();

                      //toggle the icon activate class depending on the status
                      //switch icon
                      var $_edit_icon = $el.siblings().find('.' + module.control.css_attr.edit_view_btn );

                      $_edit_icon.toggleClass('active' , visible );
                      if ( visible )
                        $_edit_icon.removeClass('fa-pencil-alt').addClass('fa-minus-square').attr('title', serverControlParams.i18n.close );
                      else
                        $_edit_icon.removeClass('fa-minus-square').addClass('fa-pencil-alt').attr('title', serverControlParams.i18n.edit );

                      //scroll to the currently expanded view
                      if ( 'expanded' == status ) {
                            module._adjustScrollExpandedBlock( item.container );
                      }

                      dfd.resolve();
                };
            duration = _.isUndefined( duration ) ? 150 : duration;
            if ( visible ) {
                  $el.stop( true, true ).slideDown( duration, function() { _slideComplete( visible ); } );
            } else {
                  $el.stop( true, true ).slideUp( 0, function() { _slideComplete( visible ); } );
            }

            return dfd.promise();
      },


      //removes the view dom module
      _destroyView : function ( duration ) {
            this.container.fadeOut( {
                duration : duration ||400,
                done : function() {
                  $(this).remove();
                }
            });
      },






      // LOADER HELPERS
      // @return void()
      // print a loader between the moment the item container is appended, and the item content is fetched from the server
      printLoader : function() {
            var item = this;
            item.container
                .css({'position' :'relative'})
                .append( api.CZR_Helpers.css_loader_html ).find('.czr-css-loader').fadeIn( 'fast' );

            // Start the countdown for auto-cleaning
            clearTimeout( $.data( this, '_czr_loader_active_timer_') );
            $.data( this, '_czr_loader_active_timer_', setTimeout(function() {
                  item.cleanLoader();
            }, 5000 ) );
      },

      // @return void()
      cleanLoader : function() {
            this.container
                .css({'min-height' : ''})
                .find('.czr-css-loader').remove();
      },
});//$.extend
})( wp.customize , jQuery, _ );//extends api.Value
//options:
// module : module,
// initial_modOpt_model : modOpt, can contains the already db saved values
// defaultModOptModel : module.defaultModOptModel
// control : control instance

var CZRModOptMths = CZRModOptMths || {};
( function ( api, $, _ ) {
$.extend( CZRModOptMths , {
      initialize: function( options ) {
            if ( _.isUndefined(options.module) || _.isEmpty(options.module) ) {
              throw new Error('No module assigned to modOpt.');
            }

            var modOpt = this;
            api.Value.prototype.initialize.call( modOpt, null, options );

            //DEFERRED STATES
            //store the state of ready.
            //=> we don't want the ready method to be fired several times
            modOpt.isReady = $.Deferred();

            //VARIOUS DEFINITIONS
            modOpt.container = null;//will store the modOpt $ dom element
            modOpt.inputCollection = new api.Value({});

            //input.options = options;
            //write the options as properties, name is included
            $.extend( modOpt, options || {} );

            //declares a default modOpt model
            modOpt.defaultModOptModel = _.clone( options.defaultModOptModel ) || { is_mod_opt : true };

            //set initial values
            var _initial_model = $.extend( modOpt.defaultModOptModel, options.initial_modOpt_model );
            var ctrl = modOpt.module.control;
            //this won't be listened to at this stage
            modOpt.set( _initial_model );

            //OPTIONS IS READY
            //observe its changes when ready
            modOpt.isReady.done( function() {
                  //listen to any modOpt change
                  //=> done in the module
                  //modOpt.callbacks.add( function() { return modOpt.modOptReact.apply(modOpt, arguments ); } );

                  //When shall we render the modOpt ?
                  //If the module is part of a simple control, the modOpt can be render now,
                  //modOpt.mayBeRenderModOptWrapper();

                  //RENDER THE CONTROL TITLE GEAR ICON
                  if( ! $( '.' + ctrl.css_attr.edit_modopt_icon, ctrl.container ).length ) {
                        $.when( ctrl.container
                              .find('.customize-control-title').first()//was.find('.customize-control-title')
                              .append( $( '<span/>', {
                                    class : [ ctrl.css_attr.edit_modopt_icon, 'fas fa-cog' ].join(' '),
                                    title : serverControlParams.i18n['Settings']
                              } ) ) )
                        .done( function(){
                              $( '.' + ctrl.css_attr.edit_modopt_icon, ctrl.container ).fadeIn( 400 );
                        });
                  }

                  //LISTEN TO USER ACTIONS ON CONTROL EL
                  api.CZR_Helpers.setupDOMListeners(
                        [
                              //toggle mod options
                              {
                                    trigger   : 'click keydown',
                                    selector  : '.' + ctrl.css_attr.edit_modopt_icon,
                                    name      : 'toggle_mod_option',
                                    actions   : function() {
                                          // @see : moduleCtor::maybeAwakeAndBindSharedModOpt => api.czr_ModOptVisible.bind()
                                          api.czr_ModOptVisible( ! api.czr_ModOptVisible(), {
                                                module : modOpt.module,//the current module for which the modOpt is being expanded
                                                focus : false//the id of the tab we want to focus on
                                          });
                                    }
                              }
                        ],//actions to execute
                        { dom_el: ctrl.container },//dom scope
                        modOpt //instance where to look for the cb methods
                  );
                  //modOpt.userEventMap = new api.Value( [] );
            });//modOpt.isReady.done()

      },//initialize

      //overridable method
      //Fired if the modOpt has been instantiated
      //The modOpt.callbacks are declared.
      ready : function() {
            this.isReady.resolve();
      }
});//$.extend
})( wp.customize , jQuery, _ );//extends api.CZRBaseControl

var CZRModOptMths = CZRModOptMths || {};
( function ( api, $, _ ) {
$.extend( CZRModOptMths , {
      //fired when modOpt is ready and embedded
      //define the modOpt view DOM event map
      //bind actions when the modOpt is embedded
      modOptWrapperViewSetup : function( modOpt_model ) {
              var modOpt = this,
                  module = this.module,
                  dfd = $.Deferred(),
                  _setupDOMListeners = function( $_container ) {
                        //DOM listeners for the user action in modOpt view wrapper
                        api.CZR_Helpers.setupDOMListeners(
                             [
                                    //toggle mod options
                                    {
                                          trigger   : 'click keydown',
                                          selector  : '.' + module.control.css_attr.close_modopt_icon,
                                          name      : 'close_mod_option',
                                          actions   : function() {
                                                // @see : moduleCtor::maybeAwakeAndBindSharedModOpt => api.czr_ModOptVisible.bind()
                                                api.czr_ModOptVisible( false, {
                                                      module : module,//the current module for which the modOpt is being expanded
                                                      focus : false//the id of the tab we want to focus on
                                                });
                                          }
                                    },
                                    //tabs navigation
                                    {
                                          trigger   : 'click keydown',
                                          selector  : '.tabs nav li',
                                          name      : 'tab_nav',
                                          actions   : function( args ) {
                                                //toggleTabVisibility is declared in the module ctor and its "this" is the item or the modOpt
                                                var tabIdSwitchedTo = $( args.dom_event.currentTarget, args.dom_el ).data('tab-id');
                                                this.module.toggleTabVisibility.call( this, tabIdSwitchedTo );
                                                this.trigger( 'tab-switch', { id : tabIdSwitchedTo } );
                                          }
                                    }
                              ],//actions to execute
                              { dom_el: $_container },//model + dom scope
                              modOpt //instance where to look for the cb methods
                        );
                  };

              modOpt_model = modOpt() || modOpt.initial_modOpt_model;//could not be set yet

              //renderview content now
              modOpt.renderModOptContent( modOpt_model )
                    .done( function( $_container ) {
                          //update the $.Deferred state
                          if ( ! _.isEmpty( $_container ) && 0 < $_container.length ) {
                                _setupDOMListeners( $_container );
                                dfd.resolve( $_container );
                          }
                          else {
                                throw new Error( 'Module : ' + modOpt.module.id + ', the modOpt content has not been rendered' );
                          }
                    })
                    .fail( function( _r_ ) {
                          api.errorLog( "failed modOpt.renderModOptContent for module : " + module.id, _r_ );
                    })
                    .then( function() {
                          //the modOpt.container is now available
                          //Setup the tabs navigation
                          //setupTabNav is defined in the module ctor and its this is the item or the modOpt
                          modOpt.module.setupTabNav.call( modOpt );
                    });

              return dfd.promise();
      },


      //renders saved modOpt views
      //returns a promise( $container )
      //the saved modOpt look like :
      //array[ { id : 'sidebar-one', title : 'A Title One' }, {id : 'sidebar-two', title : 'A Title Two' }]
      renderModOptContent : function( modOpt_model ) {
              //=> an array of objects
              var modOpt = this,
                  module = this.module,
                  dfd = $.Deferred();

              modOpt_model = modOpt_model || modOpt();

              var appendAndResolve = function( _tmpl_ ) {
                    //do we have an html template ?
                    if ( _.isEmpty( _tmpl_ ) ) {
                          dfd.reject( 'renderModOptContent => Missing html template for module : '+ module.id );
                    }

                    var _ctrlLabel = '';
                    try {
                          _ctrlLabel = [ serverControlParams.i18n['Options for'], module.control.params.label ].join(' ');
                    } catch( er ) {
                          api.errorLog( 'renderItemContent => Problem with ctrl label => ' + er );
                          _ctrlLabel = serverControlParams.i18n['Settings'];
                    }

                    $('#widgets-left').after( $( '<div/>', {
                          class : module.control.css_attr.mod_opt_wrapper,
                          html : [
                                [ '<h2 class="mod-opt-title">', _ctrlLabel , '</h2>' ].join(''),
                                '<span class="fas fa-times ' + module.control.css_attr.close_modopt_icon + '" title="close"></span>'
                          ].join('')
                    } ) );

                    //render the mod opt content for this module
                    $( '.' + module.control.css_attr.mod_opt_wrapper ).append( _tmpl_ );

                    dfd.resolve( $( '.' + module.control.css_attr.mod_opt_wrapper ) );
              };//appendAndResolve

              // Do we have view content template script?
              // if yes, let's use it <= Old way
              // Otherwise let's fetch the html template from the server
              if ( ! _.isEmpty( module.itemPreAddEl ) ) {
                    var tmplSelectorSuffix = module.getTemplateSelectorPart( 'modOptInputList', modOpt_model );
                    if ( 1 > $( '#tmpl-' + tmplSelectorSuffix ).length ) {
                          dfd.reject( 'renderModOptContent => No modOpt content template defined for module ' + module.id + '. The template script id should be : #tmpl-' + tmplSelectorSuffix );
                    }
                    appendAndResolve( wp.template( tmplSelectorSuffix )( modOpt_model ) );
              } else {
                    api.CZR_Helpers.getModuleTmpl( {
                          tmpl : 'mod-opt',
                          module_type: module.module_type,
                          module_id : module.id,
                          control_id : module.control.id
                    } ).done( function( _serverTmpl_ ) {
                          //console.log( 'renderModOptContent => success response =>', _serverTmpl_);
                          appendAndResolve( api.CZR_Helpers.parseTemplate( _serverTmpl_ )( modOpt_model ) );
                    }).fail( function( _r_ ) {
                          //console.log( 'renderModOptContent => fail response =>', _r_);
                          dfd.reject( 'renderPreItemView => Problem when fetching the mod-opt tmpl from server for module : '+ module.id );
                    });
              }

              return dfd.promise();
      },



      toggleModPanelView : function( visible ) {
            var modOpt = this,
                module = this.module,
                ctrl = module.control,
                dfd = $.Deferred();

            module.control.container.toggleClass( 'czr-modopt-visible', visible );
            $('body').toggleClass('czr-editing-modopt', visible );
            //Let the panel slide (  -webkit-transition: left .18s ease-in-out )
            _.delay( function() {
                  dfd.resolve();
            }, 200 );
            return dfd.promise();
      }
});//$.extend
})( wp.customize , jQuery, _ );//MULTI CONTROL CLASS
//extends api.Value
//
//Setup the collection of items
//renders the control view
//Listen to items collection changes and update the control setting
//MODULE OPTIONS :
  // control     : control,
  // crud        : bool
  // id          : '',
  // items       : [], module.items,
  // modOpt       : {}
  // module_type : module.module_type,
  // multi_item  : bool
  // section     : module.section,
var CZRModuleMths = CZRModuleMths || {};
( function ( api, $, _ ) {
$.extend( CZRModuleMths, {
      initialize: function( id, constructorOptions ) {
            if ( _.isUndefined(constructorOptions.control) || _.isEmpty(constructorOptions.control) ) {
                throw new Error('No control assigned to module ' + id );
            }
            var module = this;
            api.Value.prototype.initialize.call( this, null, constructorOptions );

            //store the state of ready.
            //=> we don't want the ready method to be fired several times
            module.isReady = $.Deferred();

            //write the module constructor options as properties
            // The default module model can be get with
            // and is formed this way :
            //@see getDefaultModuleApiModel : function() {
            //if embedded in a control, amend the common model with the section id
            //     return {
            //             id : '',//module.id,
            //             module_type : '',//module.module_type,
            //             modOpt : {},//the module modOpt property, typically high level properties that area applied to all items of the module
            //             items   : [],//$.extend( true, {}, module.items ),
            //             crud : false,
            //             hasPreItem : true,//a crud module has a pre item by default
            //             refresh_on_add_item : true,// the preview is refreshed on item add
            //             multi_item : false,
            //             sortable : false,//<= a module can be multi-item but not necessarily sortable
            //             control : {},//control,
            //             section : ''
            //       };
            // },

            $.extend( module, constructorOptions || {} );

            //extend the module with new template Selectors
            //can have been overriden at this stage from a module constructor
            $.extend( module, {
                  crudModulePart : module.crudModulePart || '', //'czr-crud-module-part',//create, read, update, delete
                  rudItemPart : module.rudItemPart || '',// 'czr-rud-item-part',//read, update, delete
                  ruItemPart : module.ruItemPart || '',// 'czr-ru-item-part',//read, update <= ONLY USED IN THE WIDGET MODULE
                  alertPart : module.alertPart || '',// 'czr-rud-item-alert-part',//used both for items and modules removal
                  itemInputList : module.itemInputList || '',//is specific for each crud module
                  modOptInputList : module.modOptInputList || ''//is specific for each module
            } );

            //embed : define a container, store the embed state, fire the render method
            module.embedded = $.Deferred();
            module.itemsWrapper = '';//will store the $ item container

            //if a module is embedded in a control, its container == the control container.
            module.container = $( module.control.selector );

            //render the item(s) wrapper
            //and resolve the module.embedded promise()
            module.renderModuleParts()
                  .done( function( $_module_items_wrapper ){
                        if ( false === $_module_items_wrapper.length ) {
                            throw new Error( 'The items wrapper has not been rendered for module : ' + module.id );
                        }
                        //stores the items wrapper ( </ul> el ) as a jQuery var
                        module.itemsWrapper = $_module_items_wrapper;
                        module.embedded.resolve();
                  })
                  .fail( function( _r_ ) {
                        throw new Error( [ "initialize module => failed module.renderModuleParts() for module : " , module.id , _r_ ].join(' '));
                  });

            /*-----------------------------------------------
            * MODULE OPTIONS
            ------------------------------------------------*/
            //declares a default Mod options API model
            module.defaultAPImodOptModel = {
                  initial_modOpt_model : {},
                  defaultModOptModel : {},
                  control : {},//control instance
                  module : {}//module instance
            };

            //declares a default modOpt model
            module.defaultModOptModel = {};

            //define a default Constructors
            module.modOptConstructor = module.modOptConstructor || api.CZRModOpt;

            /*-----------------------------------------------
            * ITEMS
            ------------------------------------------------*/
            module.itemCollection = new api.Value( [] );

            //declares a default Item API model
            module.defaultAPIitemModel = {
                  id : '',
                  initial_item_model : {},
                  defaultItemModel : {},
                  control : {},//control instance
                  module : {},//module instance
                  is_added_by_user : false
            };

            // declares a default item model
            module.defaultItemModel = api.czrModuleMap[ module.module_type ].defaultItemModel || { id : '', title : '' };

            // item constuctor : use the constructor already defined in a module, or fallback on the default one
            module.itemConstructor = module.itemConstructor || api.CZRItem;

            // czr_model stores the each model value => one value by created by model.id
            module.czr_Item = new api.Values();


            /*-----------------------------------------------
            * SET THE DEFAULT INPUT CONSTRUCTOR AND INPUT OPTIONS
            ------------------------------------------------*/
            // input constuctor : use the constructor already defined in a module, or fallback on the default one
            module.inputConstructor = module.inputConstructor || api.CZRInput;//constructor for the items input
            if ( module.hasModOpt() ) {
                  //use the constructor already defined in a module, or fallback on the default one
                  module.inputModOptConstructor = module.inputModOptConstructor || api.CZRInput;//constructor for the modOpt input
            }
            module.inputOptions = {};//<= can be set by each module specifically
            //For example, if I need specific options for the content_picker, this is where I will set them in the module extended object


            /*-----------------------------------------------
            * FIRE ON isReady
            ------------------------------------------------*/
            //module.ready(); => fired by children
            module.isReady.done( function() {
                  //store the module dirtyness, => no items set
                  module.isDirty = new api.Value( constructorOptions.dirty || false );

                  //initialize the module api.Value()
                  //constructorOptions has the same structure as the one described in prepareModuleforAPI
                  //setting the module Value won't be listen to at this stage
                  //api.infoLog('module.isReady.done() => constructorOptions',  constructorOptions);
                  module.initializeModuleModel( constructorOptions )
                        .done( function( initialModuleValue ) {
                              module.set( initialModuleValue );
                        })
                        .fail( function( response ){ api.errare( 'Module : ' + module.id + ' initialize module model failed : ', response ); })
                        .always( function( initialModuleValue ) {
                              //listen to each single module change
                              module.callbacks.add( function() { return module.moduleReact.apply( module, arguments ); } );

                              //if the module is not registered yet (for example when the module is added by user),
                              //=> push it to the collection of the module-collection control
                              //=> updates the wp api setting
                              if (  ! module.control.isModuleRegistered( module.id ) ) {
                                  module.control.updateModulesCollection( { module : constructorOptions, is_registered : false } );
                              }

                              module.bind('items-collection-populated', function( collection ) {
                                    //listen to item Collection changes
                                    module.itemCollection.callbacks.add( function() { return module.itemCollectionReact.apply( module, arguments ); } );

                                    // The sortable property is set on module registration
                                    // if not specified, the sortable will be set to true by default if the module is crud or multi-item
                                    if ( false !== module.sortable ) {
                                          module._makeItemsSortable();
                                    }

                                    // this event is listened to by Nimble Builder to expand the module once all the items collection is populated
                                    module.control.container.trigger('items-collection-populated');
                              });

                              //populate and instantiate the items now when a module is embedded in a regular control
                              module.populateSavedItemCollection();

                              //When the module has modOpt :
                              //=> Instantiate the modOpt and setup listener
                              if ( module.hasModOpt() ) {
                                    module.instantiateModOpt();
                              }
                        });
            });//module.isReady.done()


            /*-----------------------------------------------
            * Maybe resolve isReady() on parent section expanded
            ------------------------------------------------*/
            if ( true === api.czrModuleMap[ module.module_type ].ready_on_section_expanded ) {
                  //fired ready :
                  //1) on section expansion
                  //2) or in the case of a module embedded in a regular control, if the module section is already opened => typically when skope is enabled
                  if ( _.has( api, 'czr_activeSectionId' ) && module.control.section() == api.czr_activeSectionId() && 'resolved' != module.isReady.state() ) {
                        module.embedded.then( function() {
                              module.ready();
                        });
                  }

                  // defer the expanded callback when the section is instantiated
                  api.section( module.control.section(), function( _section_ ) {
                        _section_.expanded.bind(function(to) {
                              //set module ready on section expansion
                              if ( 'resolved' != module.isReady.state() ) {
                                    module.embedded.then( function() {
                                          module.ready();
                                    });
                              }
                        });
                  });
            }

            /*-----------------------------------------------
            * Maybe resolve isReady() on custom control event
            // To be specified when registering the control
            // used in Nimble to delay the instantiation of the input when the control accordion is expanded with event 'sek-accordion-expanded'
            ------------------------------------------------*/
            var _control_event = api.czrModuleMap[ module.module_type ].ready_on_control_event;
            if ( ! _.isUndefined( _control_event ) ) {
                  // defer the expanded callback when the section is instantiated
                  api.control( module.control.id, function( _control_ ) {
                        _control_.container.on( _control_event, function(evt) {
                              //set module ready on module accordion expansion
                              if ( 'resolved' != module.isReady.state() ) {
                                    module.embedded.then( function() {
                                          module.ready();
                                    });
                              }
                        });

                        // Nov 2020 => in WP 5.6, this setup was made too late
                        // That's why we need to introduce an event + a property informing Nimble that we're ready
                        // @see Nimble ::scheduleModuleAccordion
                        _control_.container.data('module_ready_on_custom_control_event_is_setup',true);
                        _control_.container.trigger('module_ready_on_custom_control_event_is_setup');
                  });
            }

            // Maybe instantiate and bind the api.Value() controlling the module option panel, for the module using it ( has_mod_opt : true on registration )
            this.maybeAwakeAndBindSharedModOpt();
      },//initialize()




      //////////////////////////////////
      ///READY
      //////////////////////////////////
      //When the control is embedded on the page, this method is fired in api.CZRBaseModuleControl:ready()
      //=> right after the module is instantiated.
      //If the module is a dynamic one (CRUD like), then this method is invoked by the child class
      ready : function() {
            var module = this;
            module.isReady.resolve();
      },



      //fired when module is initialized, on module.isReady.done()
      //designed to be extended or overridden to add specific items or properties
      initializeModuleModel : function( constructorOptions ) {
            var module = this, dfd = $.Deferred();
            if ( ! module.isMultiItem() && ! module.isCrud() ) {
                  //this is a static module. We only have one item
                  //init module item if needed.
                  if ( _.isEmpty( constructorOptions.items ) ) {
                        var def = _.clone( module.defaultItemModel );
                        constructorOptions.items = [ $.extend( def, { id : module.id } ) ];
                  }
            }
            return dfd.resolve( constructorOptions ).promise();
      },


      //cb of : module.itemCollection.callbacks
      //the data can typically hold informations passed by the input that has been changed and its specific preview transport (can be PostMessage )
      //data looks like :
      //{
      //  module : {}
      //  input_changed     : string input.id
      //  input_transport   : 'postMessage' or '',
      //  not_preview_sent  : bool
      //}
      itemCollectionReact : function( to, from, data ) {
            var module = this,
                _current_model = module(),
                _new_model = $.extend( true, {}, _current_model );
            _new_model.items = to;
            //update the dirtyness state
            module.isDirty.set(true);
            //set the the new items model
            module.set( _new_model, data || {} );
      },

      //This method is fired from the control
      filterItemsBeforeCoreApiSettingValue : function( itemsToReturn ) {
            return itemsToReturn;
      },

      //cb of module.callbacks
      //=> sets the setting value via the module collection !
      moduleReact : function( to, from, data ) {
            //cb of : module.callbacks
            var module            = this,
                control           = module.control,
                isItemUpdate    = ( _.size( from.items ) == _.size( to.items ) ) && ! _.isEmpty( _.difference( to.items, from.items ) ),
                isColumnUpdate  = to.column_id != from.column_id,
                refreshPreview    = function() {
                      api.previewer.refresh();
                };

            //update the collection + pass data
            control.updateModulesCollection( {
                  module : $.extend( true, {}, to ),
                  data : data//useful to pass contextual info when a change happens
            } );

            // //Always update the view title
            // module.writeViewTitle(to);

            // //@todo : do we need that ?
            // //send module to the preview. On update only, not on creation.
            // if ( ! _.isEmpty(from) || ! _.isUndefined(from) ) {
            //   module._sendModule(to, from);
            // }
      },

      //@todo : create a smart helper to get either the wp api section or the czr api sektion, depending on the module context
      getModuleSection : function() {
            return this.section;
      },

      //is this module multi item ?
      //@return bool
      isMultiItem : function() {
            return api.CZR_Helpers.isMultiItemModule( null, this );
      },

      //is this module crud ?
      //@return bool
      isCrud : function() {
            return api.CZR_Helpers.isCrudModule( null, this );
      },

      hasModOpt : function() {
            return api.CZR_Helpers.hasModuleModOpt( null, this );
      },


      //////////////////////////////////
      ///MODULE OPTION :
      ///1) PREPARE
      ///2) INSTANTIATE
      ///3) LISTEN TO AND SET PARENT MODULE ON CHANGE
      //////////////////////////////////
      //fired when module isReady
      instantiateModOpt : function() {
            var module = this;
            //Prepare the modOpt and instantiate it
            var modOpt_candidate = module.prepareModOptForAPI( module().modOpt || {} );
            module.czr_ModOpt = new module.modOptConstructor( modOpt_candidate );
            module.czr_ModOpt.ready();
            //update the module model on modOpt change
            module.czr_ModOpt.callbacks.add( function( to, from, data ) {
                  var _current_model = module(),
                      _new_model = $.extend( true, {}, _current_model );
                  _new_model.modOpt = to;
                  //update the dirtyness state
                  module.isDirty(true);
                  //set the the new items model
                  //the data can typically hold informations passed by the input that has been changed and its specific preview transport (can be PostMessage )
                  //data looks like :
                  //{
                  //  module : {}
                  //  input_changed     : string input.id
                  //  input_transport   : 'postMessage' or '',
                  //  not_preview_sent  : bool
                  //}
                  module( _new_model, data );
            });
      },

      //@return an API ready modOpt object with the following properties
      // initial_modOpt_model : {},
      // defaultModOptModel : {},
      // control : {},//control instance
      // module : {},//module instance
      //@param modOpt_candidate is an object. Can contain the saved modOpt properties on init.
      prepareModOptForAPI : function( modOpt_candidate ) {
            var module = this,
                api_ready_modOpt = {};
            // if ( ! _.isObject( modOpt_candidate ) ) {
            //       throw new Error('preparemodOptForAPI : a modOpt must be an object to be instantiated.');
            // }
            modOpt_candidate = _.isObject( modOpt_candidate ) ? modOpt_candidate : {};

            _.each( module.defaultAPImodOptModel, function( _value, _key ) {
                  var _candidate_val = modOpt_candidate[_key];
                  switch( _key ) {
                        case 'initial_modOpt_model' :
                            //make sure that the provided modOpt has all the default properties set
                            _.each( module.getDefaultModOptModel() , function( _value, _property ) {
                                  if ( ! _.has( modOpt_candidate, _property) )
                                     modOpt_candidate[_property] = _value;
                            });
                            api_ready_modOpt[_key] = modOpt_candidate;

                        break;
                        case  'defaultModOptModel' :
                            api_ready_modOpt[_key] = _.clone( module.defaultModOptModel );
                        break;
                        case  'control' :
                            api_ready_modOpt[_key] = module.control;
                        break;
                        case  'module' :
                            api_ready_modOpt[_key] = module;
                        break;
                  }//switch
            });
            return api_ready_modOpt;
      },

      //Returns the default modOpt defined in initialize
      //Each chid class can override the default item and the following method
      getDefaultModOptModel : function( id ) {
            var module = this;
            return $.extend( _.clone( module.defaultModOptModel ), { is_mod_opt : true } );
      },


      //The idea is to send only the currently modified item instead of the entire collection
      //the entire collection is sent anyway on api(setId).set( value ), and accessible in the preview via api(setId).bind( fn( to) )
      //This method can be called on input change and on czr-partial-refresh-done
      //{
      //  input_id :
      //  input_parent_id :
      //  is_mod_opt :
      //  to :
      //  from :
      //  isPartialRefresh : bool//<= let us know if it is a full wrapper refresh or a single input update ( true when fired from sendModuleInputsToPreview )
      //}
      sendInputToPreview : function( args ) {
            var module = this;
            //normalizes the args
            args = _.extend(
              {
                    input_id        : '',
                    input_parent_id : '',//<= can be the mod opt or an item
                    to              : null,
                    from            : null
              } , args );

            if ( _.isEqual( args.to, args.from ) )
              return;

            //This is listened to by the preview frame
            api.previewer.send( 'czr_input', {
                  set_id        : api.CZR_Helpers.getControlSettingId( module.control.id ),
                  module_id     : module.id,//<= will allow us to target the right dom element on front end
                  module        : { items : $.extend( true, {}, module().items ) , modOpt : module.hasModOpt() ?  $.extend( true, {}, module().modOpt ): {} },
                  input_parent_id : args.input_parent_id,//<= can be the mod opt or the item
                  input_id      : args.input_id,
                  value         : args.to,
                  isPartialRefresh : args.isPartialRefresh//<= let us know if it is a full wrapper refresh or a single input update ( true when fired from sendModuleInputsToPreview )
            });

            //add a hook here
            module.trigger( 'input_sent', { input : args.to , dom_el: module.container } );
      },


      //@return void()
      //Fired on partial refresh in base control initialize, only for module type controls
      //This method can be called when don't have input instances available
      //=> typically when reordering items, mod options and items are closed, therefore there's no input instances.
      //=> the input id are being retrieved from the input parent models : items and mod options.
      //@param args = { isPartialRefresh : bool }
      sendModuleInputsToPreview : function( args ) {
            var module = this,
                _sendInputData = function() {
                      var inputParent = this,//this is the input parent : item or modOpt
                          inputParentModel = $.extend( true, {}, inputParent() );
                      //we don't need to send the id, which is never an input, but generated by the api.
                      inputParentModel = _.omit( inputParentModel, 'id' );

                      _.each( inputParentModel, function( inputVal, inputId ) {
                            module.sendInputToPreview( {
                                  input_id : inputId,
                                  input_parent_id : inputParent.id,
                                  to : inputVal,
                                  from : null,
                                  isPartialRefresh : args.isPartialRefresh
                            });
                      });
                };

            module.czr_Item.each( function( _itm_ ) {
                  _sendInputData.call( _itm_ );
            });

            if ( module.hasModOpt() ) {
                  _sendInputData.call( module.czr_ModOpt );
            }
      },


      // Fired in ::initialize()
      // Maybe instantiate and bind the api.Value() controlling the visibility of the module option panel, for the module using it ( has_mod_opt : true on registration )
      maybeAwakeAndBindSharedModOpt : function() {
            if ( ! _.isUndefined( api.czr_ModOptVisible ) )
              return;

            //MOD OPT PANEL SETTINGS
            api.czr_ModOptVisible = new api.Value( false );

            //MOD OPT VISIBLE REACT
            // passing an optional args object allows us to expand the modopt panel and focus on a specific tab right after
            //@args : {
            //  module : module,//the current module for which the modOpt is being expanded
            //  focus : 'section-topline-2'//the id of the tab we want to focus on
            //}
            api.czr_ModOptVisible.bind( function( visible, from, args ) {
                  args = args || {};
                  if ( ! _.isFunction( args.module ) || ! _.isFunction( args.module.czr_ModOpt ) ) {
                        api.errare( 'moduleCtor::maybeAwakeAndBindSharedModOpt => api.czr_ModOptVisible.bind() => incorrect arguments', args );
                        return;
                  }
                  var modOpt = args.module.czr_ModOpt,
                      module = args.module;

                  // Append content on expansion
                  // Remove on collapse
                  if ( visible ) {
                        //first close all opened remove dialogs and opened items
                        module.closeRemoveDialogs().closeAllItems();

                        modOpt.modOptWrapperViewSetup( modOpt() ).done( function( $_container ) {
                              modOpt.container = $_container;
                              try {
                                    api.CZR_Helpers.setupInputCollectionFromDOM.call( modOpt ).toggleModPanelView( visible );
                              } catch(e) {
                                    api.consoleLog(e);
                              }
                              if ( module && args.focus ) {
                                    _.delay( function() {
                                          if ( _.isNull(  modOpt.container ) || ! modOpt.container.find('[data-tab-id="' + args.focus + '"] a').length )
                                            return;
                                          modOpt.container.find('[data-tab-id="' + args.focus + '"] a').trigger('click');
                                    }, 200 );
                              }
                        });

                  } else {
                        modOpt.toggleModPanelView( visible ).done( function() {
                              if ( modOpt.container && 0 < modOpt.container.length ) {
                                    $.when( modOpt.container.remove() ).done( function() {
                                          api.CZR_Helpers.removeInputCollection.call( modOpt );
                                    });
                              } else {
                                    api.CZR_Helpers.removeInputCollection.call( modOpt );
                              }
                              modOpt.container = null;
                        });
                  }
            } );
      }
});//$.extend//CZRBaseControlMths
})( wp.customize , jQuery, _ );//MULTI CONTROL CLASS
//extends api.CZRBaseControl
//
//Setup the collection of items
//renders the module view
//Listen to items collection changes and update the control setting

var CZRModuleMths = CZRModuleMths || {};
( function ( api, $, _ ) {
$.extend( CZRModuleMths, {
      //@fired in module ready on api('ready')
      //the module().items has been set in initialize
      //A collection of items can be supplied.
      populateSavedItemCollection : function( _itemCollection_ ) {
              var module = this,
                  _deepCopyOfItemCollection;

              if ( ! _.isArray( _itemCollection_ || module().items ) ) {
                    api.errorLog( 'populateSavedItemCollection : The saved items collection must be an array in module :' + module.id );
                    return;
              }
              _deepCopyOfItemCollection = $.extend( true, [], _itemCollection_ || module().items );

              //populates the collection with the saved items
              //the modOpt must be skipped
              //the saved items + modOpt is an array looking like :
              ////MODOPT IS THE FIRST ARRAY ELEMENT: A modOpt has no unique id and has the property is_mod_opt set to true
              //[
              //  is_mod_opt : true //<= inform us that this is not an item but a modOpt
              //],
              ////THEN COME THE ITEMS
              //[
              //  id : "czr_slide_module_0"
              //     slide-background : 21,
              //     ....
              //   ],
              //   [
              // id : "czr_slide_module_1"
              //     slide-background : 21,
              //     ....
              //   ]

              // CHECK THAT WE DON'T HAVE ANY MODOPT AT THIS STAGE
              //=> the items and the modOpt should already be split at this stage, because it's done before module instantiation... this check is totally paranoid.
              _.each( _deepCopyOfItemCollection , function( item_candidate , key ) {
                    if ( _.has( item_candidate, 'is_mod_opt' ) ) {
                          throw new Error( 'populateSavedItemCollection => there should be no mod opt to instantiate here.');
                    }
              });

              // allow modules to hook here
              module.trigger( 'filterItemCandidatesBeforeInstantiation', _deepCopyOfItemCollection );

              //INSTANTIATE THE ITEMS
              _.each( _deepCopyOfItemCollection, function( item_candidate , key ) {
                    //instantiates and fires ready
                    var _doInstantiate_ = function() {
                          var _item_instance_ = module.instantiateItem( item_candidate );
                          if ( _.isFunction( _item_instance_ ) ) {
                                _item_instance_.ready();
                          } else {
                                api.errare( 'populateSavedItemCollection => Could not instantiate item in module ' + module.id , item_candidate );
                          }
                    };
                    //adds it to the collection and fire item.ready()
                    if ( serverControlParams.isDevMode ) {
                          _doInstantiate_();
                    } else {
                          try { _doInstantiate_(); } catch( er ) {
                                api.errare( 'populateSavedItemCollection => ' + er );
                          }
                    }
              });

              //check if everything went well
              _.each( _deepCopyOfItemCollection, function( _item ) {
                    if ( ! _.isObject( _item ) ) {
                          return;
                    }
                    if ( _.isUndefined( _.findWhere( module.itemCollection(), _item.id ) ) ) {
                          throw new Error( 'populateSavedItemCollection => The saved items have not been properly populated in module : ' + module.id );
                    }
              });

              module.trigger( 'items-collection-populated' );
              //do we need to chain this method ?
              //return this;
      },


      instantiateItem : function( item_candidate, is_added_by_user ) {
              var module = this;

              // Cast to an object now.
              item_candidate = _.isObject( item_candidate ) ? item_candidate : {};

              // FIRST VALIDATION
              //allow modules to validate the item_candidate before addition
              item_candidate = module.validateItemBeforeAddition( item_candidate, is_added_by_user );

              // Abort here and display a simple console message if item is null or false, for example if validateItemBeforeAddition returned null or false
              if ( ! item_candidate || _.isNull( item_candidate ) ) {
                    api.errare( 'CZRModule::instantiateItem() => item_candidate did not pass validation in module ' + module.id );
                    return;
              }

              // NORMALIZE
              //Prepare the item, make sure its id is set and unique
              item_candidate = module.prepareItemForAPI( item_candidate );

              if ( ! _.isObject( item_candidate ) ) {
                    api.errare( 'CZRModule::instantiateItem() => an item should be described by an object in module type : ' + module.module_type, 'module id : '  + module.id );
                    return;
              }

              // Display a simple console message if item is null or false, for example if validateItemBeforeInstantiation returned null or false
              if ( ! item_candidate || _.isNull( item_candidate ) ) {
                    api.errare( 'CZRModule::instantiateItem() => item_candidate invalid in module ' + module.id );
                    return;
              }

              //ITEM ID CHECKS
              if ( ! _.has( item_candidate, 'id' ) ) {
                    throw new Error('CZRModule::instantiateItem() => an item has no id and could not be added in the collection of : ' + this.id );
              }
              if ( module.czr_Item.has( item_candidate.id ) ) {
                    throw new Error('CZRModule::instantiateItem() => the following item id ' + item_candidate.id + ' already exists in module.czr_Item() for module ' + this.id  );
              }
              //instantiate the item with the item constructor, default one or provided by the module
              module.czr_Item.add( item_candidate.id, new module.itemConstructor( item_candidate.id, item_candidate ) );

              if ( ! module.czr_Item.has( item_candidate.id ) ) {
                    throw new Error('CZRModule::instantiateItem() => instantiation failed for item id ' + item_candidate.id + ' for module ' + this.id  );
              }
              //the item is now ready and will listen to changes
              //return the instance
              return module.czr_Item( item_candidate.id );
      },


      // Designed to be overriden in modules
      validateItemBeforeAddition : function( item_candidate, is_added_by_user ) {
            return item_candidate;
      },

      //@return an API ready item object with the following properties
      // id : '',
      // initial_item_model : {},
      // defaultItemModel : {},
      // control : {},//control instance
      // module : {},//module instance
      // is_added_by_user : false
      prepareItemForAPI : function( item_candidate ) {
              var module = this,
                  api_ready_item = {};
              // if ( ! _.isObject( item_candidate ) ) {
              //       throw new Error('prepareitemForAPI : a item must be an object to be instantiated.');
              // }
              item_candidate = _.isObject( item_candidate ) ? item_candidate : {};

              _.each( module.defaultAPIitemModel, function( _value, _key ) {
                    var _candidate_val = item_candidate[_key];
                    switch( _key ) {
                          case 'id' :
                              // The id can be specified in a module ( ex: the pre defined item ids of the Font Customizer module )
                              // => that's why we need to check here if the item id is not already registered here
                              if ( _.isEmpty( _candidate_val ) ) {
                                    api_ready_item[_key] = module.generateItemId( module.module_type );
                              } else {
                                    if ( module.isItemRegistered( _candidate_val ) ) {
                                          module.generateItemId( _candidate_val );
                                    } else {
                                          api_ready_item[_key] = _candidate_val;
                                    }
                              }
                          break;
                          case 'initial_item_model' :
                              //make sure that the provided item has all the default properties set
                              _.each( module.getDefaultItemModel() , function( _value, _property ) {
                                    if ( ! _.has( item_candidate, _property) )
                                       item_candidate[_property] = _value;
                              });
                              api_ready_item[_key] = item_candidate;

                          break;
                          case  'defaultItemModel' :
                              api_ready_item[_key] = _.clone( module.defaultItemModel );
                          break;
                          case  'control' :
                              api_ready_item[_key] = module.control;
                          break;
                          case  'module' :
                              api_ready_item[_key] = module;
                          break;
                          case 'is_added_by_user' :
                              api_ready_item[_key] =  _.isBoolean( _candidate_val ) ? _candidate_val : false;
                          break;
                    }//switch
              });

              //if we don't have an id at this stage, let's generate it.
              if ( ! _.has( api_ready_item, 'id' ) ) {
                    api_ready_item.id = module.generateItemId( module.module_type );
              }

              //Now amend the initial_item_model with the generated id
              api_ready_item.initial_item_model.id = api_ready_item.id;

              return module.validateItemBeforeInstantiation( api_ready_item );
      },


      // Designed to be overriden in modules
      validateItemBeforeInstantiation : function( api_ready_item ) {
            return api_ready_item;
      },


      // recursive
      // will generate a unique id with the provided prefix
      generateItemId : function( prefix, key, i ) {
              //prevent a potential infinite loop
              i = i || 1;
              if ( i > 100 ) {
                    throw new Error( 'Infinite loop when generating of a module id.' );
              }
              var module = this;
              key = key || module._getNextItemKeyInCollection();
              var id_candidate = prefix + '_' + key;

              //do we have a module collection value ?
              if ( ! _.has( module, 'itemCollection' ) || ! _.isArray( module.itemCollection() ) ) {
                    throw new Error('The item collection does not exist or is not properly set in module : ' + module.id );
              }

              //make sure the module is not already instantiated
              if ( module.isItemRegistered( id_candidate ) ) {
                key++; i++;
                return module.generateItemId( prefix, key, i );
              }
              return id_candidate;
      },


      //helper : return an int
      //=> the next available id of the item collection
      _getNextItemKeyInCollection : function() {
              var module = this,
                _maxItem = {},
                _next_key = 0;

              //get the initial key
              //=> if we already have a collection, extract all keys, select the max and increment it.
              //else, key is 0
              if ( _.isEmpty( module.itemCollection() ) )
                return _next_key;
              if ( _.isArray( module.itemCollection() ) && 1 === _.size( module.itemCollection() ) ) {
                    _maxItem = module.itemCollection()[0];
              } else {
                    _maxItem = _.max( module.itemCollection(), function( _item ) {
                          if ( ! _.isNumber( _item.id.replace(/[^\/\d]/g,'') ) )
                            return 0;
                          return parseInt( _item.id.replace( /[^\/\d]/g, '' ), 10 );
                    });
              }

              //For a single item collection, with an index free id, it might happen that the item is not parsable. Make sure it is. Otherwise, use the default key 0
              if ( ! _.isUndefined( _maxItem ) && _.isNumber( _maxItem.id.replace(/[^\/\d]/g,'') ) ) {
                    _next_key = parseInt( _maxItem.id.replace(/[^\/\d]/g,''), 10 ) + 1;
              }
              return _next_key;
      },



      //this helper allows to check if an item has been registered in the collection
      //no matter if it's not instantiated yet
      isItemRegistered : function( id_candidate ) {
            var module = this;
            return ! _.isUndefined( _.findWhere( module.itemCollection(), { id : id_candidate}) );
      },


      //Fired in module.czr_Item.itemReact
      //@param args can be
      //{
      //  collection : [],
      //  params : params {}
      //},
      //
      //or {
      //  item : {}
      //  params : params {}
      //}
      //if a collection is provided in the passed args then simply refresh the collection
      //=> typically used when reordering the collection item with sortable or when a item is removed
      //
      //the args.params can typically hold informations passed by the input that has been changed and its specific preview transport (can be PostMessage )
      //params looks like :
      //{
      //  module : {}
      //  input_changed     : string input.id
      //  input_transport   : 'postMessage' or '',
      //  not_preview_sent  : bool
      //}
      //@return a deferred promise
      updateItemsCollection : function( args ) {
              var module = this,
                  _current_collection = module.itemCollection(),
                  _new_collection = _.clone(_current_collection),
                  dfd = $.Deferred();

              //if a collection is provided in the passed args then simply refresh the collection
              //=> typically used when reordering the collection item with sortable or when a item is removed
              if ( _.has( args, 'collection' ) ) {
                    //reset the collection
                    module.itemCollection.set( args.collection );
                    return;
              }

              if ( ! _.has( args, 'item' ) ) {
                  throw new Error('updateItemsCollection, no item provided ' + module.control.id + '. Aborting');
              }
              //normalizes with params
              args = _.extend( { params : {} }, args );

              var item_candidate = _.clone( args.item ),
                  hasMissingProperty = false;

              // Is the item well formed ? Does it have all the properties of the default model ?
              // Each module has to declare a defaultItemModel which augments the default one : { id : '', title : '' };
              // Let's loop on the defaultItemModel property and check that none is missing in the candidate
              _.each( module.defaultItemModel, function( itemData, key ) {
                    if ( ! _.has( item_candidate, key ) ) {
                          throw new Error( 'CZRModuleMths => updateItemsCollection : Missing property "' + key + '" for item candidate' );
                    }
              });

              if ( hasMissingProperty )
                return;

              //the item already exist in the collection
              if ( _.findWhere( _new_collection, { id : item_candidate.id } ) ) {
                    _.each( _current_collection , function( _item, _ind ) {
                          if ( _item.id != item_candidate.id )
                            return;

                          //set the new val to the changed property
                          _new_collection[_ind] = item_candidate;
                    });
              }
              //the item has to be added
              else {
                  _new_collection.push( item_candidate );
              }

              //updates the collection value
              //=> is listened to by module.itemCollectionReact
              module.itemCollection.set( _new_collection, args.params );
              return dfd.resolve( { collection : _new_collection, params : args.params } ).promise();
      },



      //fire on sortable() update callback
      //@returns a sorted collection as an array of item objects
      _getSortedDOMItemCollection : function( ) {
              var module = this,
                  _old_collection = _.clone( module.itemCollection() ),
                  _new_collection = [],
                  dfd = $.Deferred();

              //re-build the collection from the DOM
              $( '.' + module.control.css_attr.single_item, module.container ).each( function( _index ) {
                    var _item = _.findWhere( _old_collection, {id: $(this).attr('data-id') });
                    //do we have a match in the existing collection ?
                    if ( ! _item )
                      return;

                    _new_collection[_index] = _item;
              });

              if ( _old_collection.length != _new_collection.length ) {
                  throw new Error('There was a problem when re-building the item collection from the DOM in module : ' + module.id );
              }
              return dfd.resolve( _new_collection ).promise();
      },


      //This method should
      //1) remove the item views
      //2) remove the czr_items instances
      //3) remove the item collection
      //4) re-initialize items
      //5) re-setup the item collection
      //6) re-instantiate the items
      //7) re-render their views
      refreshItemCollection : function() {
            var module = this;
            //Remove item views and instances
            module.czr_Item.each( function( _itm ) {
                  if ( module.czr_Item( _itm.id ).container && 0 < module.czr_Item( _itm.id ).container.length ) {
                        $.when( module.czr_Item( _itm.id ).container.remove() ).done( function() {
                              //Remove item instances
                              module.czr_Item.remove( _itm.id );
                        });
                  }
            });

            // Reset the item collection
            // => the collection listeners will be setup after populate, on 'items-collection-populated'
            module.itemCollection = new api.Value( [] );
            module.populateSavedItemCollection();
      }
});//$.extend//CZRBaseControlMths
})( wp.customize , jQuery, _ );//MULTI CONTROL CLASS
//extends api.CZRBaseControl
//
//Setup the collection of items
//renders the module view
//Listen to items collection changes and update the control setting

var CZRModuleMths = CZRModuleMths || {};
( function ( api, $, _ ) {
$.extend( CZRModuleMths, {
      //Returns the default item defined in initialize
      //Each chid class can override the default item and the following method
      getDefaultItemModel : function( id ) {
              var module = this;
              return $.extend( _.clone( module.defaultItemModel ), { id : id || '' } );
      },

      //////////////////////////////////
      ///MODEL HELPERS
      //////////////////////////////////
      //the job of this function is to return a new item ready to be added to the collection
      //the new item shall have a unique id
      //!!recursive
      _initNewItem : function( _item , _next_key ) {
              var module = this,
                  _new_item = { id : '' },
                  _id;

              //get the next available key of the collection
              _next_key = 'undefined' != typeof(_next_key) ? _next_key : _.size( module.itemCollection() );

              if ( _.isNumber(_next_key) ) {
                _id = module.module_type + '_' + _next_key;
              }
              else {
                _id = _next_key;
                //reset next key to 0 in case a recursive loop is needed later
                _next_key = 0;
              }

              if ( _item && ! _.isEmpty( _item) )
                _new_item = $.extend( _item, { id : _id } );
              else
                _new_item = this.getDefaultItemModel( _id );

              //check the id existence, and its unicity
              if ( _.has(_new_item, 'id') && module._isItemIdPossible(_id) ) {
                    //make sure that the provided item has all the default properties set
                    _.map( module.getDefaultItemModel() , function( value, property ){
                          if ( ! _.has(_new_item, property) )
                            _new_item[property] = value;
                    });

                return _new_item;
              }

              //if id already exists, then test a new one
              return module._initNewItem( _new_item, _next_key + 1);
      }
});//$.extend
})( wp.customize , jQuery, _ );//MULTI CONTROL CLASS
//extends api.CZRBaseControl
//
//Setup the collection of items
//renders the module view
//Listen to items collection changes and update the control setting

var CZRModuleMths = CZRModuleMths || {};
( function ( api, $, _ ) {
$.extend( CZRModuleMths, {
      //fired on module.isReady.done()
      //the module.container is set.
      renderModuleParts : function() {
            var module = this,
                $_moduleContentEl = $( module.container ),
                dfd = $.Deferred();

            var appendAndResolve = function( _tmpl_ ) {
                  if ( module.isCrud() ) {
                        //do we have an html template ?
                        if ( _.isEmpty( _tmpl_ ) ) {
                              dfd.reject( 'renderModuleParts => Missing html template for module : '+ module.id );
                        }
                        //append the module wrapper to the column
                        $_moduleContentEl.append( _tmpl_ );
                  }

                  // Always append this
                  var $_module_items_wrapper = $(
                        '<ul/>',
                        {
                          class : [
                            module.control.css_attr.items_wrapper,
                            module.module_type,
                            module.isMultiItem() ? 'multi-item-mod' : 'mono-item-mod',
                            module.isCrud() ? 'crud-mod' : 'not-crud-mod'
                          ].join(' ')
                        }
                  );

                  $_moduleContentEl.append( $_module_items_wrapper );

                  dfd.resolve( $( $_module_items_wrapper, $_moduleContentEl ) );
            };//appendAndResolve

            //Crud modules => then let's add the crud module part tmpl
            if ( module.isCrud() ) {
                  // Do we have view content template script?
                  // if yes, let's use it <= Old way
                  // Otherwise let's fetch the html template from the server
                  if ( ! _.isEmpty( module.crudModulePart ) ) {
                        if ( 1 > $( '#tmpl-' + module.crudModulePart ).length ) {
                              dfd.reject( 'renderModuleParts => no crud Module Part template for module ' + module.id + '. The template script id should be : #tmpl-' + module.crudModulePart );
                        }
                        appendAndResolve( wp.template( module.crudModulePart )( {} ) );
                  } else {
                        api.CZR_Helpers.getModuleTmpl( {
                              tmpl : 'crud-module-part',
                              module_type: 'all_modules',
                              module_id : module.id,
                              control_id : module.control.id
                        } ).done( function( _serverTmpl_ ) {
                              //console.log( 'renderModuleParts => success response =>', module.id, _serverTmpl_);
                              appendAndResolve( api.CZR_Helpers.parseTemplate( _serverTmpl_ )( {} ) );
                        }).fail( function( _r_ ) {
                              api.errare( 'renderModuleParts => fail response =>', _r_);
                              dfd.reject( 'renderModuleParts => Problem when fetching the crud-module-part tmpl from server for module : '+ module.id );
                        });
                  }
            } else {
                  appendAndResolve();
            }
            return dfd.promise();
      },

      //called before rendering a view. Fired in module::renderItemWrapper()
      //can be overridden to set a specific view template depending on the model properties
      //@return string
      //@type can be
      //Read Update Delete (rud...)
      //Read Update (ru)
      //...
      //@item_model is an object describing the current item model
      getTemplateSelectorPart : function( type, item_model ) {
              var module = this, _el;
              switch( type ) {
                    case 'rudItemPart' :
                      _el = module.rudItemPart;
                      break;
                    case 'ruItemPart' :
                      _el = module.ruItemPart;
                      break;
                    case 'modOptInputList' :
                      _el = module.modOptInputList;
                      break;
                    case 'itemInputList' :
                      _el = _.isFunction( module.itemInputList ) ? module.itemInputList( item_model ) : module.itemInputList;
                      break;
              }
              if ( _.isEmpty(_el) ) {
                   throw new Error('No valid template has been found in getTemplateSelectorPart() ' + module.id + '. Aborting');
              } else {
                  return _el;
              }
      },

      //helper
      //get the $ view DOM el from the item id
      getViewEl : function( id ) {
              var module = this;
              return $( '[data-id = "' + id + '"]', module.container );
      },


      //fired on add_item
      //fired on views_sorted
      closeAllItems : function( id ) {
              var module = this,
                  _current_collection = _.clone( module.itemCollection() ),
                  _filtered_collection = _.filter( _current_collection , function( mod) { return mod.id != id; } );

              _.each( _filtered_collection, function( _item ) {
                    if ( module.czr_Item.has(_item.id) && 'expanded' == module.czr_Item(_item.id)._getViewState(_item.id) )
                      module.czr_Item( _item.id ).viewState.set( 'closed' ); // => will fire the cb toggleItemExpansion
              } );

              // 'czr-all-items-closed' has been introduced when coding the Simple Nimble slider module. @see https://github.com/presscustomizr/nimble-builder/issues/82
              // When using the text editor in the items of in a multi-item module
              // We need to clear the editor instances each time all items are closed, before opening a new one
              api.trigger('czr-all-items-closed', { module_id : module.id } );
              return this;
      },


      //make sure a given jQuery block is fully visible
      //@param $(el)
      _adjustScrollExpandedBlock : function( $_block_el, adjust ) {
              if ( ! $_block_el.length || _.isUndefined( this.getModuleSection() ) )
                return;
              var module = this,
                   $_moduleSection = $( '.accordion-section-content', module.section.container ),//was api.section( control.section() )
                  _currentScrollTopVal = $_moduleSection.scrollTop(),
                  _scrollDownVal,
                  _adjust = adjust || 90;

              setTimeout( function() {
                    if ( ( $_block_el.offset().top + $_block_el.height() + _adjust ) > $(window.top).height() ) {
                        _scrollDownVal = $_block_el.offset().top + $_block_el.height() + _adjust - $(window.top).height();
                        if ( _scrollDownVal > 0 ) {
                            $_moduleSection.animate({
                                scrollTop:  _currentScrollTopVal + _scrollDownVal
                            }, 500);
                        }
                    }
              }, 50);
      },



      //close alert wrapper
      //+ deactivate the icon
      closeRemoveDialogs : function() {
              var module = this;
              if ( ! _.isArray( module.itemCollection() ) )
                return;

              module.czr_Item.each( function( _item_ ) {
                    _item_.removeDialogVisible( false );
              });

              // $('.' + module.control.css_attr.remove_alert_wrapper, module.container ).each( function() {
              //       if ( $(this).hasClass('open') ) {
              //             $(this).slideToggle( {
              //                   duration : 100,
              //                   done : function() {
              //                     $(this).toggleClass('open' , false );
              //                     //deactivate the icons
              //                     $(this).siblings().find('.' + module.control.css_attr.display_alert_btn).toggleClass('active' , false );
              //                   }
              //             } );
              //       }
              // });
              return this;
      },


      // fired when module.isReady.done
      // if sortable is 'true' on registration
      // default is false
      _makeItemsSortable : function(obj) {
              if ( wp.media.isTouchDevice || ! $.fn.sortable )
                return;
              var module = this;
              $( '.' + module.control.css_attr.items_wrapper, module.container ).sortable( {
                    handle: '.' + module.control.css_attr.item_sort_handle,
                    start: function() {},
                    update: function( event, ui ) {
                          var _sortedCollectionReact = function() {
                                if ( _.has(module, 'preItem') ) {
                                      module.preItemExpanded.set(false);
                                }

                                module.closeAllItems().closeRemoveDialogs();
                                var refreshPreview = function() {
                                      api.previewer.refresh();
                                };
                                //refreshes the preview frame  :
                                //1) only needed if transport is postMessage, because is triggered by wp otherwise
                                //2) only needed when : add, remove, sort item(s).
                                //var isItemUpdate = ( _.size(from) == _.size(to) ) && ! _.isEmpty( _.difference(from, to) );
                                if ( 'postMessage' == api(module.control.id).transport  && ! api.CZR_Helpers.hasPartRefresh( module.control.id ) ) {
                                      refreshPreview = _.debounce( refreshPreview, 500 );//500ms are enough
                                      refreshPreview();
                                }

                                module.trigger( 'item-collection-sorted' );
                          };
                          module._getSortedDOMItemCollection()
                                .done( function( _collection_ ) {
                                      module.itemCollection.set( _collection_ );
                                })
                                .then( function() {
                                      _sortedCollectionReact();
                                });
                          //refreshes the preview frame, only if the associated setting is a postMessage transport one, with no partial refresh
                          // if ( 'postMessage' == api( module.control.id ).transport && ! api.CZR_Helpers.hasPartRefresh( module.control.id ) ) {
                          //         _.delay( function() { api.previewer.refresh(); }, 100 );
                          // }
                    }//update
                  }
              );
        },



      /*-----------------------------------------------
      * TABS NAVIGATION IN ITEMS AND MODOPT
      ------------------------------------------------*/
      //This method is fired on tab click
      // IMPORTANT : the this is the item or the modopt instance. NOT the module.
      // =>This method has been added to the module constructor to avoid repeating the code in two places because it is used both in items and modOpts
      // @return void()
      toggleTabVisibility : function( tabIdSwitchedTo ) {
            var inputParent = this,
                tabs = $( inputParent.container ).find('li'),
                content_items = $( inputParent.container ).find('section');
                //tabIdSwitchedTo = $( args.dom_event.currentTarget, args.dom_el ).attr('data-tab-id');

            $( '.tabs nav li', inputParent.container ).each( function() {
                  $(this).removeClass('tab-current').addClass('tab-inactive');
            });
            $( inputParent.container ).find('li[data-tab-id="' + tabIdSwitchedTo + '"]').addClass('tab-current').removeClass('tab-inactive');

            $( 'section', inputParent.container ).each( function() {
                    $(this).removeClass('content-current');
            });
            $( inputParent.container ).find('section[id="' + tabIdSwitchedTo + '"]').addClass('content-current');
      },

      // @return void()
      // the inputParent.container (item or modOpt) is now available ar this stage
      //  Setup the tabs navigation
      //=> Make sure the first tab is the current visible one
      setupTabNav : function() {
            var inputParent = this,
                preProcessTabs = function() {
                      var dfd = $.Deferred(),
                          $tabs = $( '.tabs nav li', inputParent.container );

                      $tabs.each( function() {
                            $(this).removeClass('tab-current').addClass('tab-inactive');
                      });
                      $tabs.first().addClass( 'tab-current' ).removeClass('tab-inactive');
                      $( 'section', inputParent.container ).first().addClass( 'content-current' );
                      //set the layout class based on the number of tabs
                      var _nb = $tabs.length;
                      $tabs.each( function() {
                            $(this).addClass( _nb > 0 ? 'cols-' + _nb : '' );
                      });
                      return dfd.resolve().promise();
                };
            setTimeout(
                  function() {
                        preProcessTabs().done( function() {
                              $('.tabs', inputParent.container ).show();
                        });
                  },
                  20//<= introducing a small delay to let jQuery do its preprocessing job
            );
      }
});//$.extend
})( wp.customize , jQuery, _ );//MULTI CONTROL CLASS
//extends api.CZRModule
//
//Setup the collection of items
//renders the module view
//Listen to items collection changes and update the control setting

var CZRDynModuleMths = CZRDynModuleMths || {};
( function ( api, $, _ ) {
$.extend( CZRDynModuleMths, {
      initialize: function( id, options ) {
            var module = this;
            api.CZRModule.prototype.initialize.call( module, id, options );

            //extend the module with new template Selectors
            $.extend( module, {
                itemPreAddEl : ''//is specific for each crud module
            } );

            module.preItemsWrapper = '';//will store the pre items wrapper

            //PRE MODEL VIEW STATE
            // => will control the rendering / destruction of the DOM view
            // => the instantiation / destruction of the input Value collection
            module.preItemExpanded = new api.Value( false );

            //EXTENDS THE DEFAULT MONO MODEL CONSTRUCTOR WITH NEW METHODS
            //=> like remove item
            //module.itemConstructor = api.CZRItem.extend( module.CZRItemDynamicMths || {} );

            //default success message when item added
            module.itemAddedMessage = serverControlParams.i18n.successMessage;

            ////////////////////////////////////////////////////
            /// MODULE DOM EVENT MAP
            ////////////////////////////////////////////////////<
            // addItem utility
            // @return void()
            // @param params : { dom_el : {}, dom_event : {}, event : {}, model {} }
            var _doAddItem = function( params ) {
                    module.addItem( params ).done( function( item_id ) {
                          module.czr_Item( item_id , function( _item_ ) {
                                _item_.embedded.then( function() {
                                      _item_.viewState( 'expanded' );
                                });
                          });
                  })
                  .fail( function( error ) {
                        api.errare( 'module.addItem failed on add_item', error );
                  });
            };

            module.userEventMap = new api.Value( [
                  //pre add new item : open the dialog box
                  {
                        trigger   : 'click keydown',
                        selector  : [ '.' + module.control.css_attr.open_pre_add_btn, '.' + module.control.css_attr.cancel_pre_add_btn ].join(','),
                        name      : 'pre_add_item',
                        actions   : [
                              'closeAllItems',
                              'closeRemoveDialogs',
                              // toggles the visibility of the Remove View Block
                              // => will render or destroy the pre item view
                              // @param : obj = { event : {}, item : {}, view : ${} }
                              function( params ) {
                                    var module = this,
                                        canWe = { addTheItem : true };
                                    // allow remote filtering of the condition for addition
                                    module.trigger( 'is-item-addition-possible', canWe );

                                    // if the module has a pre-item, let's expand it, otherwise, let's add the item right away
                                    if ( canWe.addTheItem && module.hasPreItem ) {
                                          module.preItemExpanded.set( ! module.preItemExpanded() );
                                    } else {
                                          _doAddItem( params );
                                    }
                              },
                        ],
                  },
                  //add new item
                  {
                        trigger   : 'click keydown',
                        selector  : '.' + module.control.css_attr.add_new_btn, //'.czr-add-new',
                        name      : 'add_item',
                        //@param params : { dom_el : {}, dom_event : {}, event : {}, model {} }
                        actions   : function( params ) {
                              module.closeRemoveDialogs( params ).closeAllItems( params );
                              _doAddItem( params );
                        }
                  }
            ]);//module.userEventMap
      },//initialize()



      //When the control is embedded on the page, this method is fired in api.CZRBaseModuleControl:ready()
      //=> right after the module is instantiated.
      ready : function() {
            var module = this;
            //Setup the module event listeners
            module.setupDOMListeners( module.userEventMap() , { dom_el : module.container } );

            // Pre Item Value => used to store the preItem model
            module.preItem = new api.Value( module.getDefaultItemModel() );

            // Action on pre Item expansion / collapsing
            module.preItemExpanded.callbacks.add( function( isExpanded ) {
                  if ( isExpanded ) {
                        module.renderPreItemView()
                              .done( function( $preWrapper ) {
                                    module.preItemsWrapper = $preWrapper;
                                    //Re-initialize the pre item model
                                    module.preItem( module.getDefaultItemModel() );

                                    module.trigger( 'before-pre-item-input-collection-setup' );
                                    // Setup the pre item input collection from dom
                                    module.setupPreItemInputCollection();

                              })
                              .fail( function( message ) {
                                    api.errorLog( 'Pre-Item : ' + message );
                              });
                  } else {
                        $.when( module.preItemsWrapper.remove() ).done( function() {
                              module.preItem.czr_Input = {};
                              module.preItemsWrapper = null;
                              module.trigger( 'pre-item-input-collection-destroyed' );
                        });
                  }

                  // Expand / Collapse
                  module._togglePreItemViewExpansion( isExpanded );
            });

            api.CZRModule.prototype.ready.call( module );//fires the parent
      },//ready()



      //PRE MODEL INPUTS
      //fired when preItem is embedded.done()
      setupPreItemInputCollection : function() {
            var module = this;

            //Pre item input collection
            module.preItem.czr_Input = new api.Values();

            //creates the inputs based on the rendered items
            $('.' + module.control.css_attr.pre_add_wrapper, module.container)
                  .find( '.' + module.control.css_attr.sub_set_wrapper)
                  .each( function( _index ) {
                        var _id = $(this).find('[data-czrtype]').attr('data-czrtype') || 'sub_set_' + _index;
                        //instantiate the input
                        module.preItem.czr_Input.add( _id, new module.inputConstructor( _id, {//api.CZRInput;
                              id : _id,
                              type : $(this).attr('data-input-type'),
                              container : $(this),
                              input_parent : module.preItem,
                              module : module,
                              is_preItemInput : true
                        } ) );

                        //fire ready once the input Value() instance is initialized
                        module.preItem.czr_Input( _id ).ready();
                  });//each

            module.trigger( 'pre-item-input-collection-ready' );
      },

      // Intended to be overriden in a module
      // introduced in July 2019 to make it simple for a multi-item module to set a default pre-item
      // typically, in the slider image, this is a way to have a default image when adding an item
      // @see https://github.com/presscustomizr/nimble-builder/issues/479
      getPreItem : function() {
            return this.preItem();
      },


      // overridable method introduced with the flat skope
      // problem to solve in skope => an item, can't always be instantiated in a given context.
      itemCanBeInstantiated : function() {
            return true;
      },

      //Fired on user Dom action.
      //the item is manually added.
      //@return a promise() with the item_id as param
      //@param params : { dom_el : {}, dom_event : {}, event : {}, model {} }
      //@param _cloned_item_model = { id : '', title : '', ... }
      addItem : function( params, _cloned_item_model ) {
            var dfd = $.Deferred();
            if ( ! this.itemCanBeInstantiated() ) {
                  return dfd.reject().promise();
            }
            var module = this,
                item_candidate = module.getPreItem(),
                collapsePreItem = function() {
                      module.preItemExpanded.set( false );
                      //module.toggleSuccessMessage('off');
                };
            // June 2021 => introduction of clone item
            if ( _cloned_item_model && _.has( _cloned_item_model, 'id' ) ) {
                  item_candidate = _cloned_item_model;
            }
            if ( _.isEmpty( item_candidate ) || ! _.isObject( item_candidate ) ) {
                  api.errorLog( 'addItem : an item_candidate should be an object and not empty. In : ' + module.id +'. Aborted.' );
                  return dfd.reject().promise();
            }
            //display a sucess message if item_candidate is successfully instantiated
            collapsePreItem = _.debounce( collapsePreItem, 200 );

            //instantiates and fires ready
            var _doInstantiate_ = function() {
                  var _item_instance_ = module.instantiateItem( item_candidate, true );//true == Added by user
                  if ( _.isFunction( _item_instance_ ) ) {
                        _item_instance_.ready();
                  } else {
                        api.errare( 'populateSavedItemCollection => Could not instantiate item in module ' + module.id , item_candidate );
                  }
                  return _item_instance_;
            };
            //adds it to the collection and fire item.ready()
            if ( serverControlParams.isDevMode ) {
                  _doInstantiate_();
            } else {
                  try { _doInstantiate_(); } catch( er ) {
                        api.errare( 'populateSavedItemCollection : ' + er );
                        return dfd.reject().promise();
                  }
            }

            if ( ! module.czr_Item.has( item_candidate.id ) ) {
                  return dfd.reject('populateSavedItemCollection : the item ' + item_candidate.id + ' has not been instantiated in module ' + module.id ).promise();
            }

            //this iife job is to close the pre item and to maybe refresh the preview
            //then once done the item view is expanded to start editing it
            //@return a promise()
            $.Deferred( function() {
                  var _dfd_ = this;
                  module.czr_Item( item_candidate.id ).isReady.then( function() {
                        //module.toggleSuccessMessage('on');
                        collapsePreItem();

                        module.trigger('item-added', item_candidate );

                        var resolveWhenPreviewerReady = function() {
                              api.previewer.unbind( 'ready', resolveWhenPreviewerReady );
                              _dfd_.resolve();
                        };
                        //module.doActions( 'item_added_by_user' , module.container, { item : item_candidate , dom_event : params.dom_event } );

                        //refresh the preview frame (only needed if transport is postMessage && has no partial refresh set )
                        //must be a dom event not triggered
                        //otherwise we are in the init collection case where the items are fetched and added from the setting in initialize
                        // The property "refresh_on_add_item" is declared when registrating the module to the api.czrModuleMap
                        if ( module.refresh_on_add_item ) {
                              if ( 'postMessage' == api(module.control.id).transport && _.has( params, 'dom_event') && ! _.has( params.dom_event, 'isTrigger' ) && ! api.CZR_Helpers.hasPartRefresh( module.control.id ) ) {
                                    // api.previewer.refresh().done( function() {
                                    //       _dfd_.resolve();
                                    // });
                                    // It would be better to wait for the refresh promise
                                    api.previewer.bind( 'ready', resolveWhenPreviewerReady );
                                    api.previewer.refresh();
                              } else {
                                    _dfd_.resolve();
                              }
                        } else {
                              _dfd_.resolve();
                        }
                  });
            }).always( function() {
                    dfd.resolve( item_candidate.id );
            });
            return dfd.promise();
      }
});//$.extend
})( wp.customize , jQuery, _ );//MULTI CONTROL CLASS
//extends api.CZRBaseControl
//
//Setup the collection of items
//renders the module view
//Listen to items collection changes and update the module setting

var CZRDynModuleMths = CZRDynModuleMths || {};
( function ( api, $, _ ) {
$.extend( CZRDynModuleMths, {
      //////////////////////////////////////////////////
      /// PRE ADD MODEL DIALOG AND VIEW
      //////////////////////////////////////////////////
      renderPreItemView : function( obj ) {
              var module = this,
                  dfd = $.Deferred(),
                  pre_add_template;

              //is this view already rendered ?
              if ( _.isObject( module.preItemsWrapper ) && 0 < module.preItemsWrapper.length ) { //was ! _.isEmpty( module.czr_preItem('item_content')() ) )
                    return dfd.resolve( module.preItemsWrapper ).promise();
              }

              var appendAndResolve = function( _tmpl_ ){
                    //console.log('pre_add_template', _tmpl_ );
                    //do we have an html template and a module container?
                    if ( _.isEmpty( _tmpl_ ) || ! module.container ) {
                          dfd.reject( 'renderPreItemView => Missing html template for module : '+ module.id );
                    }

                    var $_pre_add_el = $('.' + module.control.css_attr.pre_add_item_content, module.container );

                    $_pre_add_el.prepend( $('<div>', { class : 'pre-item-wrapper'} ) );
                    $_pre_add_el.find('.pre-item-wrapper').append( _tmpl_ );

                    //say it
                    dfd.resolve( $_pre_add_el.find('.pre-item-wrapper') ).promise();
              };

              // do we have view template script ?
              // if yes, let's use it <= Old way
              // Otherwise let's fetch the html template from the server
              if ( ! _.isEmpty( module.itemPreAddEl ) ) {
                    if ( 1 > $( '#tmpl-' + module.itemPreAddEl ).length ) {
                          dfd.reject( 'renderPreItemView => Missing itemPreAddEl or template in module '+ module.id );
                    }
                    // parse the html
                    appendAndResolve( wp.template( module.itemPreAddEl )() );
              } else {
                    api.CZR_Helpers.getModuleTmpl( {
                          tmpl : 'pre-item',
                          module_type: module.module_type,
                          module_id : module.id,
                          control_id : module.control.id
                    } ).done( function( _serverTmpl_ ) {
                          //console.log( 'success response =>', _serverTmpl_);
                          appendAndResolve( api.CZR_Helpers.parseTemplate( _serverTmpl_ )() );
                    }).fail( function( _r_ ) {
                          //console.log( 'fail response =>', _r_);
                          dfd.reject( [ 'renderPreItemView for module : ', module.id , _r_ ].join(' ') );
                    });
              }
              return dfd.promise();
      },

      //@return $ el of the pre Item view
      _getPreItemView : function() {
              var module = this;
              return $('.' +  module.control.css_attr.pre_add_item_content, module.container );
      },


      //callback of module.preItemExpanded
      //@_is_expanded = boolean.
      _togglePreItemViewExpansion : function( _is_expanded ) {
              var module = this,
                $_pre_add_el = $( '.' +  module.control.css_attr.pre_add_item_content, module.container );

              //toggle it
              $_pre_add_el.slideToggle( {
                    duration : 200,
                    done : function() {
                          var $_btn = $( '.' +  module.control.css_attr.open_pre_add_btn, module.container );

                          $(this).toggleClass('open' , _is_expanded );
                          //switch icons
                          if ( _is_expanded )
                            $_btn.find('.fas').removeClass('fa-plus-square').addClass('fa-minus-square');
                          else
                            $_btn.find('.fas').removeClass('fa-minus-square').addClass('fa-plus-square');

                          //set the active class to the btn
                          $_btn.toggleClass( 'active', _is_expanded );

                          //set the adding_new class to the module container wrapper
                          $( module.container ).toggleClass(  module.control.css_attr.adding_new, _is_expanded );
                          //make sure it's fully visible
                          module._adjustScrollExpandedBlock( $(this), 120 );
                  }//done
              } );
      },


      toggleSuccessMessage : function( status ) {
              var module = this,
                  _message = module.itemAddedMessage,
                  $_pre_add_wrapper = $('.' + module.control.css_attr.pre_add_wrapper, module.container );
                  $_success_wrapper = $('.' + module.control.css_attr.pre_add_success, module.container );

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
              module.container.toggleClass('czr-model-added', 'on' == status );
              return this;
      }
});//$.extend//CZRBaseControlMths
})( wp.customize , jQuery, _ );//BASE CONTROL CLASS
//extends api.Control
//define a set of methods, mostly helpers, to extend the base WP control class
//this will become our base constructor for main complex controls
//EARLY SETUP

var CZRBaseControlMths = CZRBaseControlMths || {};
( function ( api, $, _ ) {
$.extend( CZRBaseControlMths, {
      initialize: function( id, options ) {
            var control = this;
            //add a shortcut to the css properties declared in the php controls
            control.css_attr = _.has( serverControlParams , 'css_attr') ? serverControlParams.css_attr : {};
            api.Control.prototype.initialize.call( control, id, options );

            //When a partial refresh is done we need to send back all postMessage input to the preview
            //=> makes sure that all post message inputs not yet saved in db are properly applied
            control.bind( 'czr-partial-refresh-done', function() {
                  if ( _.has( control, 'czr_moduleCollection' ) ) {
                        _.each( control.czr_moduleCollection(), function( _mod_ ) {
                              if ( ! control.czr_Module( _mod_.id ) )
                                return;

                              control.czr_Module( _mod_.id ).sendModuleInputsToPreview( { isPartialRefresh : true } );
                        });
                  }
            });
      },

      //@return void()
      refreshPreview : function( obj ) {
            this.previewer.refresh();
      }
});//$.extend//CZRBaseControlMths
})( wp.customize , jQuery, _ );
//BASE CONTROL CLASS
//extends api.CZRBaseControl
//define a set of methods, mostly helpers, to extend the base WP control class
//this will become our base constructor for main complex controls
//EARLY SETUP
var CZRBaseModuleControlMths = CZRBaseModuleControlMths || {};
( function ( api, $, _ ) {
$.extend( CZRBaseModuleControlMths, {
      initialize: function( id, options ) {
              var control = this;
              if ( ! api.has( id ) ) {
                    throw new Error( 'Missing a registered setting for control : ' + id );
              }


              control.czr_Module = new api.Values();

              //czr_collection stores the module collection
              control.czr_moduleCollection = new api.Value();
              control.czr_moduleCollection.set([]);

              //let's store the state of the initial module collection
              control.moduleCollectionReady = $.Deferred();
              //and listen to changes when it's ready
              control.moduleCollectionReady.done( function( obj ) {
                    //if the module is not registered yet for a single module control
                    //=> push it to the collection now, before listening to the module collection changes
                    // if (  ! control.isModuleRegistered( module.id ) ) {
                    //     control.updateModulesCollection( { module : constructorOptions } );
                    // }

                    //LISTEN TO MODULE COLLECTION
                    control.czr_moduleCollection.callbacks.add( function() { return control.moduleCollectionReact.apply( control, arguments ); } );

                    //control.removeModule( _mod );
              } );

              api.CZRBaseControl.prototype.initialize.call( control, id, options );

              //close any open item and dialog boxes on section expansion
              api.section( control.section(), function( _section_ ) {
                    _section_.expanded.bind(function(to) {
                          control.czr_Module.each( function( _mod ){
                                _mod.closeAllItems().closeRemoveDialogs();
                                if ( _.has( _mod, 'preItem' ) ) {
                                      _mod.preItemExpanded(false);
                                }
                          });
                    });
              });

      },




      //////////////////////////////////
      ///READY = CONTROL INSTANTIATED AND DOM ELEMENT EMBEDDED ON THE PAGE
      ///FIRED BEFORE API READY ? still true ?
      //
      // WP CORE => After the control is embedded on the page, invoke the "ready" method.
      // control.deferred.embedded.done( function () {
      //   control.linkElements(); // Link any additional elements after template is rendered by renderContent().
      //   control.setupNotifications();
      //   control.ready();
      // });
      //////////////////////////////////
      ready : function() {
              var control = this,
                  single_module = {},
                  savedModules;

              // Get the saved module and its initial items, get from the db of when dynamically registrating the setting control.
              try { savedModules = control.getSavedModules(); } catch( er ) {
                    api.errare( 'api.CZRBaseControl::ready() => error on control.getSavedModules()', er );
                    control.moduleCollectionReady.reject();
                    return;
              }

              // inits the collection with the saved module => there's only one module to instantiate in this case.
              // populates the collection with the saved module
              _.each( control.getSavedModules() , function( _mod, _key ) {
                    //stores it
                    single_module = _mod;

                    //adds it to the collection
                    //=> it will be fired ready usually when the control section is expanded
                    if ( serverControlParams.isDevMode ) {
                          control.instantiateModule( _mod, {} );
                    } else {
                          try { control.instantiateModule( _mod, {} ); } catch( er ) {
                                api.errare( 'api.CZRBaseControl::Failed to instantiate module ' + _mod.id , er );
                                return;
                          }
                    }

                    //adds the module name to the control container element
                    control.container.attr('data-module', _mod.id );
              });
              //the module collection is ready
              control.moduleCollectionReady.resolve( single_module );
      },









      //////////////////////////////////
      /// VARIOUS HELPERS
      //////////////////////////////////
      ///
      //@return the default API model {} needed to instantiate a module
      getDefaultModuleApiModel : function() {
            //if embedded in a control, amend the common model with the section id
            return {
                  id : '',//module.id,
                  module_type : '',//module.module_type,
                  modOpt : {},//the module modOpt property, typically high level properties that area applied to all items of the module
                  items   : [],//$.extend( true, {}, module.items ),
                  crud : false,
                  hasPreItem : true,//a crud module has a pre item by default
                  refresh_on_add_item : true,// the preview is refreshed on item add
                  multi_item : false,
                  sortable : false,//<= a module can be multi-item but not necessarily sortable
                  control : {},//control,
                  section : ''
            };
      },


      // @return the collection [] of saved module(s) to instantiate
      // This method does not make sure that the module model is ready for API.
      // => it just returns an array of saved module candidates to instantiate.
      //
      // Before instantiation, we will make sure that all required property are defined for the modules with the method control.prepareModuleForAPI()
      // control     : control,
      // crud        : bool
      // id          : '',
      // items       : [], module.items,
      // modOpt       : {}
      // module_type : module.module_type,
      // multi_item  : bool
      // section     : module.section,
      getSavedModules : function() {
              var control = this,
                  _savedModulesCandidates = [],
                  _module_type = control.params.module_type,
                  _raw_saved_module_val = [],
                  _saved_items = [],
                  _saved_modOpt = {};

              // What is the current server saved value for this setting?
              // in a normal case, it should be an array of saved properties
              // But it might not be if coming from a previous option system.
              // => let's normalize it.
              //
              // First let's perform a quick check on the current saved db val.
              // If the module is not multi-item, the saved value should be an object or empty if not set yet
              if ( ! api.CZR_Helpers.isMultiItemModule( _module_type ) && ! _.isEmpty( api( control.id )() ) && ! _.isObject( api( control.id )() ) ) {
                    api.errare('api.CZRBaseControl::getSavedModules => module Control Init for ' + control.id + '  : a mono item module control value should be an object if not empty.');
              }

              //SPLIT ITEMS [] and MODOPT {}
              //In database, items and modOpt are saved in the same option array.
              //If the module has modOpt ( the slider module for example ), the modOpt are described by an object which is always unshifted at the beginning of the setting value.

              //the raw DB setting value is an array :  modOpt {} + the saved items :
              ////META IS THE FIRST ARRAY ELEMENT: A modOpt has no unique id and has the property is_modOpt set to true
              //[
              //  is_mod_opt : true //<= inform us that this is not an item but a modOpt
              //],
              ////THEN COME THE ITEMS
              //[
              //  id : "czr_slide_module_0"
              //     slide-background : 21,
              //     ....
              //   ],
              //   [
              // id : "czr_slide_module_1"
              //     slide-background : 21,
              //     ....
              //   ]
              //  [...]

              // POPULATE THE ITEMS [] and the MODOPT {} FROM THE RAW DB SAVED SETTING VAL
              // OR with the value used when registrating the module
              //
              // Important note :
              // The items should be turned into a collection of items [].
              var settingId = api.CZR_Helpers.getControlSettingId( control.id ),
                  settingVal = api( settingId )();

              // TO FIX
              if ( _.isEmpty( settingVal ) ) {
                    _raw_saved_module_val = [];
              } else {
                    _raw_saved_module_val = _.isArray( settingVal ) ? settingVal : [ settingVal ];
              }


              _.each( _raw_saved_module_val, function( item_or_mod_opt_candidate , key ) {
                    if ( ! _.isObject( item_or_mod_opt_candidate ) ) {
                          api.errare( 'api.CZRBaseControl::::getSavedModules => an item must be an object in control ' + control.id + ' => module type => ' + control.params.module_type, _raw_saved_module_val );
                          return;
                    }

                    // An item or modOpt can be empty on init
                    // But if not empty, it has to be an associative object, with keys that are string typed
                    // Fixes the case where an item { null } was accepted
                    // https://github.com/presscustomizr/themes-customizer-fmk/issues/46
                    if ( ! _.isEmpty( item_or_mod_opt_candidate ) ) {
                          _.each( item_or_mod_opt_candidate, function( prop, _key_ ) {
                                if ( ! _.isString( _key_ ) ) {
                                      api.errare( 'api.CZRBaseControl::::getSavedModules => item not well formed in control : ' + control.id + ' => module type => ' + control.params.module_type, _raw_saved_module_val );
                                      return;
                                }
                          });
                    }


                    // Module options, if enabled, are always saved as first key
                    if ( api.CZR_Helpers.hasModuleModOpt( _module_type ) && 0*0 === key ) {
                          // a saved module mod_opt object should not have an id
                          if ( _.has( item_or_mod_opt_candidate, 'id') ) {
                                api.errare( 'api.CZRBaseControl::getSavedModules : the module ' + _module_type + ' in control ' + control.id + ' has no mod_opt defined while it should.' );
                          } else {
                                _saved_modOpt = item_or_mod_opt_candidate;
                          }
                    }
                    // else {
                    //       _saved_items.push( item_or_mod_opt_candidate );
                    // }
                    //Until April 30th 2018, was :
                    //A modOpt has the property is_modOpt set to true
                    if ( ! _.has( item_or_mod_opt_candidate, 'is_mod_opt' ) ) {
                          _saved_items.push( item_or_mod_opt_candidate );
                    }
              });


              // This is a collection with one module
              // Note : @todo : the fact that the module are saved as a collection is not relevant anymore
              // This was introduced back in 2016 when building the first version of the section plugin.
              // With Nimble, a control can have one module only.
              _savedModulesCandidates.push({
                    id : api.CZR_Helpers.getOptionName( control.id ) + '_' + control.params.type,
                    module_type : control.params.module_type,
                    section : control.section(),
                    modOpt : $.extend( true, {} , _saved_modOpt ),//disconnect with a deep cloning
                    items : $.extend( true, [] , _saved_items )//disconnect with a deep cloning
              });

              return _savedModulesCandidates;
      },


      //this helper allows to check if a module has been registered in the collection
      //no matter if it's not instantiated yet
      isModuleRegistered : function( id_candidate ) {
            var control = this;
            return ! _.isUndefined( _.findWhere( control.czr_moduleCollection(), { id : id_candidate}) );
      }
});//$.extend//CZRBaseControlMths
})( wp.customize , jQuery, _ );
//BASE CONTROL CLASS
//extends api.CZRBaseControl
//define a set of methods, mostly helpers, to extend the base WP control class
//this will become our base constructor for main complex controls
//EARLY SETUP
var CZRBaseModuleControlMths = CZRBaseModuleControlMths || {};
( function ( api, $, _ ) {
$.extend( CZRBaseModuleControlMths, {
      //@param : module {}
      //@param : constructor string
      instantiateModule : function( module, constructor ) {
              if ( ! _.has( module,'id') ) {
                    throw new Error('CZRModule::instantiateModule() : a module has no id and could not be added in the collection of : ' + this.id +'. Aborted.' );
              }
              var control = this;
              //is a constructor provided ?
              //if not try to look in the module object if we an find one
              if ( _.isUndefined(constructor) || _.isEmpty(constructor) ) {
                    constructor = control.getModuleConstructor( module );
              }
              //on init, the module collection is populated with module already having an id
              //For now, let's check if the id is empty and is not already part of the collection.
              //@todo : improve this.
              if ( ! _.isEmpty( module.id ) && control.czr_Module.has( module.id ) ) {
                    throw new Error('The module id already exists in the collection in control : ' + control.id );
              }

              var module_api_ready = control.prepareModuleForAPI( module );

              //instanciate the module with the default constructor
              control.czr_Module.add( module_api_ready.id, new constructor( module_api_ready.id, module_api_ready ) );

              if ( ! control.czr_Module.has( module_api_ready.id ) ) {
                    throw new Error('instantiateModule() : instantiation failed for module id ' + module_api_ready.id + ' in control ' + control.id  );
              }
              //return the module instance for chaining
              return control.czr_Module(module_api_ready.id);
      },



      //@return a module constructor object
      getModuleConstructor : function( module ) {
              var control = this,
                  parentConstructor = {},
                  constructor = {};

              if ( ! _.has( module, 'module_type' ) ) {
                    throw new Error('CZRModule::getModuleConstructor : no module type found for module ' + module.id );
              }
              if ( ! _.has( api.czrModuleMap, module.module_type ) ) {
                    throw new Error('Module type ' + module.module_type + ' is not listed in the module map api.czrModuleMap.' );
              }

              var _mthds = api.czrModuleMap[ module.module_type ].mthds || {},
                  _is_crud = api.czrModuleMap[ module.module_type ].crud,
                  _base_constructor = _is_crud ? api.CZRDynModule : api.CZRModule;

              // June 2020 : introduced for https://github.com/presscustomizr/nimble-builder-pro/issues/6
              // so we can remotely extend the module constructor
              api.trigger('czr_setup_module_contructor', {
                    module_type : module.module_type,
                    methods : _mthds
              });

              constructor = _base_constructor.extend( _mthds );

              if ( _.isUndefined( constructor ) || _.isEmpty(constructor) || ! constructor ) {
                    throw new Error('CZRModule::getModuleConstructor : no constructor found for module type : ' + module.module_type +'.' );
              }
              return constructor;
      },





      //@return an API ready module object
      //To be instantiated in the API, the module model must have all the required properties defined in the defaultAPIModel properly set
      prepareModuleForAPI : function( module_candidate ) {
            if ( ! _.isObject( module_candidate ) ) {
                throw new Error('prepareModuleForAPI : a module must be an object to be instantiated.');
            }

            var control = this,
                api_ready_module = {};

            // Default module model
            //{
            //       id : '',//module.id,
            //       module_type : '',//module.module_type,
            //       modOpt : {},//the module modOpt property, typically high level properties that area applied to all items of the module
            //       items   : [],//$.extend( true, {}, module.items ),
            //       crud : false,
            //       hasPreItem : true,//a crud module has a pre item by default
            //       refresh_on_add_item : true,// the preview is refreshed on item add
            //       multi_item : false,
            //       sortable : false,//<= a module can be multi-item but not necessarily sortable
            //       control : {},//control,
            //       section : ''
            // };
            _.each( control.getDefaultModuleApiModel() , function( _defaultValue, _key ) {
                  var _candidate_val = module_candidate[_key];
                  switch( _key ) {
                        //PROPERTIES COMMON TO ALL MODULES IN ALL CONTEXTS
                        case 'id' :
                              if ( _.isEmpty( _candidate_val ) ) {
                                    api_ready_module[_key] = control.generateModuleId( module_candidate.module_type );
                              } else {
                                    api_ready_module[_key] = _candidate_val;
                              }
                        break;
                        case 'module_type' :
                              if ( ! _.isString( _candidate_val ) || _.isEmpty( _candidate_val ) ) {
                                    throw new Error('prepareModuleForAPI : a module type must a string not empty');
                              }
                              api_ready_module[_key] = _candidate_val;
                        break;
                        case 'items' :
                              if ( ! _.isArray( _candidate_val )  ) {
                                    throw new Error('prepareModuleForAPI : a module item list must be an array');
                              }
                              api_ready_module[_key] = _candidate_val;
                        break;
                        case 'modOpt' :
                              if ( ! _.isObject( _candidate_val )  ) {
                                    throw new Error('prepareModuleForAPI : a module modOpt property must be an object');
                              }
                              api_ready_module[_key] = _candidate_val;
                        break;
                        case 'crud' :
                              //get the value from the czrModuleMap
                              if ( _.has( api.czrModuleMap, module_candidate.module_type ) ) {
                                    _candidate_val = api.czrModuleMap[ module_candidate.module_type ].crud;
                                    if ( _.isUndefined( _candidate_val ) ) {
                                          _candidate_val = _defaultValue;
                                    }
                              } else if ( ! _.isUndefined( _candidate_val) && ! _.isBoolean( _candidate_val )  ) {
                                    throw new Error('prepareModuleForAPI : the module param "crud" must be a boolean');
                              }
                              api_ready_module[_key] = _candidate_val || false;
                        break;
                        case 'hasPreItem' :
                              //get the value from the czrModuleMap
                              if ( _.has( api.czrModuleMap, module_candidate.module_type ) ) {
                                    _candidate_val = api.czrModuleMap[ module_candidate.module_type ].hasPreItem;
                                    if ( _.isUndefined( _candidate_val ) ) {
                                          _candidate_val = _defaultValue;
                                    }
                              } else if ( ! _.isUndefined( _candidate_val) && ! _.isBoolean( _candidate_val )  ) {
                                    throw new Error('prepareModuleForAPI : the module param "hasPreItem" must be a boolean');
                              }
                              api_ready_module[_key] = _candidate_val || false;
                        break;
                        case 'refresh_on_add_item' :
                              //get the value from the czrModuleMap
                              if ( _.has( api.czrModuleMap, module_candidate.module_type ) ) {
                                    _candidate_val = api.czrModuleMap[ module_candidate.module_type ].refresh_on_add_item;
                                    if ( _.isUndefined( _candidate_val ) ) {
                                          _candidate_val = _defaultValue;
                                    }
                              } else if ( ! _.isUndefined( _candidate_val) && ! _.isBoolean( _candidate_val )  ) {
                                    throw new Error('prepareModuleForAPI : the module param "refresh_on_add_item" must be a boolean');
                              }
                              api_ready_module[_key] = _candidate_val || false;
                        break;
                        case 'multi_item' :
                              // get the value from the czrModuleMap
                              // fallback on "crud" param if set
                              if ( _.has( api.czrModuleMap, module_candidate.module_type ) ) {
                                    _candidate_val = api.czrModuleMap[ module_candidate.module_type ].multi_item;
                                    if ( _.isUndefined( _candidate_val ) ) {
                                          _candidate_val = api.czrModuleMap[ module_candidate.module_type ].crud;
                                    }
                              } else if ( ! _.isUndefined( _candidate_val) && ! _.isBoolean( _candidate_val )  ) {
                                    throw new Error('prepareModuleForAPI : the module param "multi_item" must be a boolean');
                              }
                              api_ready_module[_key] = _candidate_val || false;
                        break;
                        //if the sortable property is not set, then check if crud or multi-item
                        case 'sortable' :
                              //get the value from the czrModuleMap
                              if ( _.has( api.czrModuleMap, module_candidate.module_type ) ) {
                                    // if the sortable param is not specified, set it based on the "crud" and "multi_item" params
                                    _candidate_val = api.czrModuleMap[ module_candidate.module_type ].sortable;
                                    if ( _.isUndefined( _candidate_val ) ) {
                                          _candidate_val = api.czrModuleMap[ module_candidate.module_type ].crud;
                                    }
                                    if ( _.isUndefined( _candidate_val ) ) {
                                          _candidate_val = api.czrModuleMap[ module_candidate.module_type ].multi_item;
                                    }
                              } else if ( ! _.isUndefined( _candidate_val) && ! _.isBoolean( _candidate_val )  ) {
                                    throw new Error('prepareModuleForAPI : the module param "sortable" must be a boolean');
                              }
                              api_ready_module[_key] = _candidate_val || false;
                        break;
                        case  'control' :
                              api_ready_module[_key] = control;//this
                        break;



                        //PROPERTIES FOR MODULE EMBEDDED IN A CONTROL
                        case  'section' :
                              if ( ! _.isString( _candidate_val ) || _.isEmpty( _candidate_val ) ) {
                                    throw new Error('prepareModuleForAPI : a module section must be a string not empty');
                              }
                              api_ready_module[_key] = _candidate_val;
                        break;



                        //PROPERTIES FOR MODULE EMBEDDED IN A SEKTION
                        case 'dirty' :
                              api_ready_module[_key] = _candidate_val || false;
                        break;
                  }//switch
            });
            return api_ready_module;
      },


      //recursive
      generateModuleId : function( module_type, key, i ) {
              //prevent a potential infinite loop
              i = i || 1;
              if ( i > 100 ) {
                    throw new Error('Infinite loop when generating of a module id.');
              }
              var control = this;
              key = key || control._getNextModuleKeyInCollection();
              var id_candidate = module_type + '_' + key;

              //do we have a module collection value ?
              if ( ! _.has(control, 'czr_moduleCollection') || ! _.isArray( control.czr_moduleCollection() ) ) {
                    throw new Error('The module collection does not exist or is not properly set in control : ' + control.id );
              }

              //make sure the module is not already instantiated
              if ( control.isModuleRegistered( id_candidate ) ) {
                key++; i++;
                return control.generateModuleId( module_type, key, i );
              }

              return id_candidate;
      },


      //helper : return an int
      //=> the next available id of the module collection
      _getNextModuleKeyInCollection : function() {
              var control = this,
                _max_mod_key = {},
                _next_key = 0;

              //get the initial key
              //=> if we already have a collection, extract all keys, select the max and increment it.
              //else, key is 0
              if ( ! _.isEmpty( control.czr_moduleCollection() ) ) {
                  _max_mod_key = _.max( control.czr_moduleCollection(), function( _mod ) {
                      return parseInt( _mod.id.replace(/[^\/\d]/g,''), 10 );
                  });
                  _next_key = parseInt( _max_mod_key.id.replace(/[^\/\d]/g,''), 10 ) + 1;
              }
              return _next_key;
      }
});//$.extend//CZRBaseControlMths
})( wp.customize , jQuery, _ );
//BASE CONTROL CLASS
//extends api.CZRBaseControl
//define a set of methods, mostly helpers, to extend the base WP control class
//this will become our base constructor for main complex controls
//EARLY SETUP
var CZRBaseModuleControlMths = CZRBaseModuleControlMths || {};
( function ( api, $, _ ) {
$.extend( CZRBaseModuleControlMths, {
      //@return void()
      //@param obj can be { collection : []}, or { module : {} }
      //Can be called :
      //- for all modules, in module.isReady.done() if the module is not registered in the collection yet.
      //- for all modules on moduleReact ( module.callbacks )
      //
      //=> sets the setting value through the module collection !
      updateModulesCollection : function( obj ) {
              var control = this,
                  _current_collection = control.czr_moduleCollection(),
                  _new_collection = $.extend( true, [], _current_collection);

              //if a collection is provided in the passed obj then simply refresh the collection
              //=> typically used when reordering the collection module with sortable or when a module is removed
              if ( _.has( obj, 'collection' ) ) {
                    //reset the collection
                    control.czr_moduleCollection.set( obj.collection, obj.data || {} );
                    return;
              }

              if ( ! _.has(obj, 'module') ) {
                    throw new Error('updateModulesCollection, no module provided ' + control.id + '. Aborting');
              }

              //normalizes the module for the API
              var module_api_ready = control.prepareModuleForAPI( _.clone( obj.module ) );

              //the module already exist in the collection
              if ( _.findWhere( _new_collection, { id : module_api_ready.id } ) ) {
                    _.each( _current_collection , function( _elt, _ind ) {
                          if ( _elt.id != module_api_ready.id )
                            return;

                          //set the new val to the changed property
                          _new_collection[_ind] = module_api_ready;
                    });
              }
              //the module has to be added
              else {
                    _new_collection.push( module_api_ready );
              }

              //WHAT ARE THE PARAMS WE WANT TO PASS TO THE NEXT ACTIONS
              var _params = {};
              //if a data property has been passed,
              //amend the data property with the changed module
              if ( _.has( obj, 'data') ) {
                    _params = $.extend( true, {}, obj.data );
                    $.extend( _params, { module : module_api_ready } );
              }
              //Inform the collection
              control.czr_moduleCollection.set( _new_collection, _params );
      },






      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////// WHERE THE STREETS HAVE NO NAMES //////////////////////////////////////////////////////
      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      // cb of control.czr_moduleCollection.callbacks
      // @params is an optional object. { silent : true }
      moduleCollectionReact : function( to, from, params ) {
            var control = this,
                is_module_added = _.size(to) > _.size(from),
                is_module_removed = _.size(from) > _.size(to),
                is_module_update = _.size(from) == _.size(to);
                is_collection_sorted = false;

            // MODULE REMOVED
            // Remove the module instance if needed
            if ( is_module_removed ) {
                  //find the module to remove
                  var _to_remove = _.filter( from, function( _mod ){
                      return _.isUndefined( _.findWhere( to, { id : _mod.id } ) );
                  });
                  _to_remove = _to_remove[0];
                  control.czr_Module.remove( _to_remove.id );
            }

            // is there a passed module param ?
            // if so prepare it for DB
            // if a module is provided, we also want to pass its id to the preview => can be used to target specific selectors in a partial refresh scenario
            if ( _.isObject( params  ) && _.has( params, 'module' ) ) {
                  params.module_id = params.module.id;
                  params.moduleRegistrationParams = params.module;
                  params.module = control.prepareModuleForDB( $.extend( true, {}, params.module  ) );
            }

            // Inform the the setting if the module is not being added to the collection for the first time,
            // We don't want to say it to the setting, because it might alter the setting dirtyness for nothing on init.
            if ( ! is_module_added ) {
                  // control.filterModuleCollectionBeforeAjax( to ) returns an array of items
                  // if the module has modOpt, the modOpt object is always added as the first element of the items array (unshifted)
                  if ( serverControlParams.isDevMode ) {
                        api( this.id ).set( control.filterModuleCollectionBeforeAjax( to ), params );
                  } else {
                        try { api( this.id ).set( control.filterModuleCollectionBeforeAjax( to ), params ); } catch( er ) {
                              api.errare( 'api.CZRBaseControl::moduleCollectionReact => error when firing control.filterModuleCollectionBeforeAjax( to )', er );
                        }
                  }
                  //.done( function( to, from, o ) {});
            }
      },
      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////// WHERE THE STREETS HAVE NO NAMES //////////////////////////////////////////////////////
      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////









      //an overridable method to act on the collection just before it is ajaxed
      //@return the collection array
      filterModuleCollectionBeforeAjax : function( collection ) {
              var control = this,
                  cloned_collection = $.extend( true, [], collection ),
                  _filtered_collection = [],
                  itemsToReturn;

              _.each( cloned_collection , function( _mod, _key ) {
                    var db_ready_mod = $.extend( true, {}, _mod );
                    _filtered_collection[_key] = control.prepareModuleForDB( db_ready_mod );
              });

              //=> in a control : we save
              //1) the collection of item(s)
              //2) the modOpt
              //at this point we should be in the case of a single module collection, typically use to populate a regular setting
              if ( _.size( cloned_collection ) > 1 ) {
                    throw new Error('There should not be several modules in the collection of control : ' + control.id );
              }
              if ( ! _.isArray( cloned_collection ) || _.isEmpty( cloned_collection ) || ! _.has( cloned_collection[0], 'items' ) ) {
                    throw new Error('The setting value could not be populated in control : ' + control.id );
              }
              var module_id = cloned_collection[0].id;

              if ( ! control.czr_Module.has( module_id ) ) {
                    throw new Error('The single module control (' + control.id + ') has no module registered with the id ' + module_id  );
              }
              var module_instance = control.czr_Module( module_id );
              if ( ! _.isArray( module_instance().items ) ) {
                    throw new Error('The module ' + module_id + ' should be an array in control : ' + control.id );
              }

              // items
              // For a mono-item module, we save the first and unique item object
              // For example :
              // {
              //  'heading_text' : "this is a heading"
              //  'font_size' : '10px'
              //  ...
              // }
              //
              // For a multi-item module, we save a collection of item objects, which may include a mod_opt item
              itemsToReturn = module_instance.isMultiItem() ? module_instance().items : ( module_instance().items[0] || [] );
              itemsToReturn = module_instance.filterItemsBeforeCoreApiSettingValue( itemsToReturn );

              //Add the modOpt if any
              return module_instance.hasModOpt() ? _.union( [ module_instance().modOpt ] , itemsToReturn ) : itemsToReturn;
      },


      // fired before adding a module to the collection of DB candidates
      // the module must have the control.getDefaultModuleDBModel structure :
      prepareModuleForDB : function ( module_db_candidate ) {
            var control = this;
            if ( ! _.isObject( module_db_candidate ) ) {
                  throw new Error('::prepareModuleForDB : a module must be an object.');
            }
            var db_ready_module = {};

            // The items property should be a collection, even for mono-item modules
            if ( ! _.isArray( module_db_candidate['items'] )  ) {
                  throw new Error('::prepareModuleForDB : a module item list must be an array');
            }

            // Let's loop on the item(s) to check if they are well formed
            _.each( module_db_candidate['items'], function( itm ) {
                  if ( ! _.isObject( itm ) ) {
                        throw new Error('::prepareModuleForDB : a module item must be an object');
                  }
            });

            db_ready_module['items'] = module_db_candidate['items'];
            return db_ready_module;
      }
});//$.extend//CZRBaseControlMths
})( wp.customize , jQuery, _ );
( function ( api, $, _ ) {
      // BASE
      // BASE : Extends some constructors with the events manager
      $.extend( CZRBaseControlMths, api.Events );
      $.extend( api.Control.prototype, api.Events );//ensures that the default WP control constructor is extended as well
      $.extend( CZRModuleMths, api.Events );
      $.extend( CZRItemMths, api.Events );
      $.extend( CZRModOptMths, api.Events );

      // BASE : Add the DOM helpers (addAction, ...) to the Control Base Class + Input Base Class
      $.extend( CZRBaseControlMths, api.CZR_Helpers );
      $.extend( CZRInputMths, api.CZR_Helpers );
      $.extend( CZRModuleMths, api.CZR_Helpers );

      // BASE INPUTS => used as constructor when creating the collection of inputs
      api.CZRInput                  = api.Value.extend( CZRInputMths );
      // Declare all available input type as a map
      api.czrInputMap = api.czrInputMap || {};

      // input_type => callback fn to fire in the Input constructor on initialize
      // the callback can receive specific params define in each module constructor
      // For example, a content picker can be given params to display only taxonomies
      // the default input_event_map can also be overriden in this callback
      $.extend( api.czrInputMap, {
            text      : '',
            textarea  : '',
            check     : 'setupIcheck',
            checkbox     : 'setupIcheck',
            //gutencheck : 'setupGutenCheck', // DEPRECATED since april 2nd 2019
            nimblecheck : '',//setupNimbleCheck',
            select    : 'setupSelect',
            radio     : 'setupRadio',
            number    : 'setupStepper',
            upload    : 'setupImageUploaderSaveAsId',
            upload_url : 'setupImageUploaderSaveAsUrl',
            color     : 'setupColorPicker',
            wp_color_alpha : 'setupColorPickerAlpha',
            wp_color  : 'setupWPColorPicker',//not used for the moment
            content_picker : 'setupContentPicker',
            password : '',
            range : 'setupSimpleRange',
            range_slider : 'setupRangeSlider',
            hidden : '',
            h_alignment : 'setupHAlignement',
            h_text_alignment : 'setupHAlignement',
            inactive : '' // introduced sept 2020 for https://github.com/presscustomizr/nimble-builder-pro/issues/67
      });



      // BASE ITEMS => used as constructor when creating the collection of models
      api.CZRItem                   = api.Value.extend( CZRItemMths );

      // BASE MODULE OPTIONS => used as constructor when creating module options
      api.CZRModOpt                 = api.Value.extend( CZRModOptMths );

      // BASE MODULES => used as constructor when creating the collection of modules
      api.CZRModule                 = api.Value.extend( CZRModuleMths );
      api.CZRDynModule              = api.CZRModule.extend( CZRDynModuleMths );

      // BASE CONTROLS
      api.CZRBaseControl            = api.Control.extend( CZRBaseControlMths );
      api.CZRBaseModuleControl      = api.CZRBaseControl.extend( CZRBaseModuleControlMths );

      $.extend( api.controlConstructor, { czr_module : api.CZRBaseModuleControl });
})( wp.customize, jQuery, _ );
//DOM READY :
//1) FIRE SPECIFIC INPUT PLUGINS
//2) ADD SOME COOL STUFFS
//3) SPECIFIC CONTROLS ACTIONS
( function ( wp, $ ) {
      $( function($) {
            var api = wp.customize || api;

            //WHAT IS HAPPENING IN THE MESSENGER
            // $(window.parent).on( 'message', function(e, o) {
            //   api.consoleLog('SENT STUFFS', JSON.parse( e.originalEvent.data), e );
            // });
            // $( window ).on( 'message', function(e, o) {
            //   api.consoleLog('INCOMING MESSAGE', JSON.parse( e.originalEvent.data), e );
            // });
            // $(window.document).bind("ajaxSend", function(e, o){
            //    api.consoleLog('AJAX SEND', e, arguments );
            // }).bind("ajaxComplete", function(e, o){
            //    api.consoleLog('AJAX COMPLETE', e, o);
            // });

            var fireHeaderButtons = function() {
                  var $header_button;

                  // Deactivated for the moment.
                  // The + button has been moved in the Nimble top bar
                  // if ( api.czr_sektions ) {
                  //       var _title_ = ( window.sektionsLocalizedData && sektionsLocalizedData.i18n && sektionsLocalizedData.i18n['Drag and drop content'] ) ? sektionsLocalizedData.i18n['Drag and drop content'] : '';
                  //       $header_button = $('<span/>', {
                  //             class:'customize-controls-home-or-add',
                  //             html:'<span class="screen-reader-text">Home</span><span class="material-icons" title="' + _title_ +'">add_circle_outline</span>'
                  //       });
                  // } else {
                  //       $header_button = $('<span/>', {
                  //             class:'customize-controls-home-or-add fas fa-home',
                  //             html:'<span class="screen-reader-text">Home</span>'
                  //       });
                  // }

                  $header_button = $('<span/>', {
                        class:'customize-controls-home-or-add fas fa-home',
                        html:'<span class="screen-reader-text">Home</span>'
                  });

                  $.when( $('#customize-header-actions').append( $header_button ) )
                        .done( function() {
                              $('body').addClass('czr-has-home-btn');
                              $header_button
                                    .keydown( function( event ) {
                                          if ( 9 === event.which ) // tab
                                            return;
                                          if ( 13 === event.which ) // enter
                                            this.trigger('click');
                                          event.preventDefault();
                                    })
                                    .on( 'click.customize-controls-home-or-add', function() {
                                          // if ( api.czr_sektions ) {
                                          //       api.previewer.trigger( 'sek-pick-content', {});
                                          // }
                                          //event.preventDefault();
                                          //close everything
                                          if ( api.section.has( api.czr_activeSectionId() ) ) {
                                                api.section( api.czr_activeSectionId() ).expanded( false );
                                          } else {
                                                api.section.each( function( _s ) {
                                                    _s.expanded( false );
                                                });
                                          }
                                          api.panel.each( function( _p ) {
                                                _p.expanded( false );
                                          });
                                    });
                              // animate on init
                              // @use button-see-mee css class declared in core in /wp-admin/css/customize-controls.css
                              _.delay( function() {
                                    if ( $header_button.hasClass( 'button-see-me') )
                                      return;
                                    var _seeMe = function() {
                                              return $.Deferred(function(){
                                                    var dfd = this;
                                                    $header_button.addClass('button-see-me');
                                                    _.delay( function() {
                                                          $header_button.removeClass('button-see-me');
                                                          dfd.resolve();
                                                    }, 800 );
                                              });
                                        },
                                        i = 0,
                                        _seeMeLoop = function() {
                                              _seeMe().done( function() {
                                                    i--;
                                                    if ( i >= 0 ) {
                                                          _.delay( function() {
                                                                _seeMeLoop();
                                                          }, 50 );
                                                    }
                                              });
                                        };
                                    _seeMeLoop();
                              }, 2000 );
                        });// done()
            };

            // Nov 2020 => remove home button for users of blocksy theme
            // https://github.com/presscustomizr/themes-customizer-fmk/issues/53
            if ( !_.contains(['blocksy'], serverControlParams.activeTheme ) ) {
                fireHeaderButtons();
            }

      });//end of $( function($) ) dom ready
})( wp, jQuery );