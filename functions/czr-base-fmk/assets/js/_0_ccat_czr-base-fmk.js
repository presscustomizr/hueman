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
}/*!  CzrSelect2 namespaced version of Select2 4.0.3 | https://github.com/select2/select2/blob/master/LICENSE.md */!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a("object"==typeof exports?require("jquery"):jQuery)}(function(a){var b=function(){if(a&&a.fn&&a.fn.czrSelect2&&a.fn.czrSelect2.amd)var b=a.fn.czrSelect2.amd;var b;return function(){if(!b||!b.requirejs){b?c=b:b={};var a,c,d;!function(b){function e(a,b){return u.call(a,b)}function f(a,b){var c,d,e,f,g,h,i,j,k,l,m,n=b&&b.split("/"),o=s.map,p=o&&o["*"]||{};if(a&&"."===a.charAt(0))if(b){for(a=a.split("/"),g=a.length-1,s.nodeIdCompat&&w.test(a[g])&&(a[g]=a[g].replace(w,"")),a=n.slice(0,n.length-1).concat(a),k=0;k<a.length;k+=1)if(m=a[k],"."===m)a.splice(k,1),k-=1;else if(".."===m){if(1===k&&(".."===a[2]||".."===a[0]))break;k>0&&(a.splice(k-1,2),k-=2)}a=a.join("/")}else 0===a.indexOf("./")&&(a=a.substring(2));if((n||p)&&o){for(c=a.split("/"),k=c.length;k>0;k-=1){if(d=c.slice(0,k).join("/"),n)for(l=n.length;l>0;l-=1)if(e=o[n.slice(0,l).join("/")],e&&(e=e[d])){f=e,h=k;break}if(f)break;!i&&p&&p[d]&&(i=p[d],j=k)}!f&&i&&(f=i,h=j),f&&(c.splice(0,h,f),a=c.join("/"))}return a}function g(a,c){return function(){var d=v.call(arguments,0);return"string"!=typeof d[0]&&1===d.length&&d.push(null),n.apply(b,d.concat([a,c]))}}function h(a){return function(b){return f(b,a)}}function i(a){return function(b){q[a]=b}}function j(a){if(e(r,a)){var c=r[a];delete r[a],t[a]=!0,m.apply(b,c)}if(!e(q,a)&&!e(t,a))throw new Error("No "+a);return q[a]}function k(a){var b,c=a?a.indexOf("!"):-1;return c>-1&&(b=a.substring(0,c),a=a.substring(c+1,a.length)),[b,a]}function l(a){return function(){return s&&s.config&&s.config[a]||{}}}var m,n,o,p,q={},r={},s={},t={},u=Object.prototype.hasOwnProperty,v=[].slice,w=/\.js$/;o=function(a,b){var c,d=k(a),e=d[0];return a=d[1],e&&(e=f(e,b),c=j(e)),e?a=c&&c.normalize?c.normalize(a,h(b)):f(a,b):(a=f(a,b),d=k(a),e=d[0],a=d[1],e&&(c=j(e))),{f:e?e+"!"+a:a,n:a,pr:e,p:c}},p={require:function(a){return g(a)},exports:function(a){var b=q[a];return"undefined"!=typeof b?b:q[a]={}},module:function(a){return{id:a,uri:"",exports:q[a],config:l(a)}}},m=function(a,c,d,f){var h,k,l,m,n,s,u=[],v=typeof d;if(f=f||a,"undefined"===v||"function"===v){for(c=!c.length&&d.length?["require","exports","module"]:c,n=0;n<c.length;n+=1)if(m=o(c[n],f),k=m.f,"require"===k)u[n]=p.require(a);else if("exports"===k)u[n]=p.exports(a),s=!0;else if("module"===k)h=u[n]=p.module(a);else if(e(q,k)||e(r,k)||e(t,k))u[n]=j(k);else{if(!m.p)throw new Error(a+" missing "+k);m.p.load(m.n,g(f,!0),i(k),{}),u[n]=q[k]}l=d?d.apply(q[a],u):void 0,a&&(h&&h.exports!==b&&h.exports!==q[a]?q[a]=h.exports:l===b&&s||(q[a]=l))}else a&&(q[a]=d)},a=c=n=function(a,c,d,e,f){if("string"==typeof a)return p[a]?p[a](c):j(o(a,c).f);if(!a.splice){if(s=a,s.deps&&n(s.deps,s.callback),!c)return;c.splice?(a=c,c=d,d=null):a=b}return c=c||function(){},"function"==typeof d&&(d=e,e=f),e?m(b,a,c,d):setTimeout(function(){m(b,a,c,d)},4),n},n.config=function(a){return n(a)},a._defined=q,d=function(a,b,c){if("string"!=typeof a)throw new Error("See almond README: incorrect module build, no module name");b.splice||(c=b,b=[]),e(q,a)||e(r,a)||(r[a]=[a,b,c])},d.amd={jQuery:!0}}(),b.requirejs=a,b.require=c,b.define=d}}(),b.define("almond",function(){}),b.define("jquery",[],function(){var b=a||$;return null==b&&console&&console.error&&console.error("CzrSelect2: An instance of jQuery or a jQuery-compatible library was not found. Make sure that you are including jQuery before CzrSelect2 on your web page."),b}),b.define("czrSelect2/utils",["jquery"],function(a){function b(a){var b=a.prototype,c=[];for(var d in b){var e=b[d];"function"==typeof e&&"constructor"!==d&&c.push(d)}return c}var c={};c.Extend=function(a,b){function c(){this.constructor=a}var d={}.hasOwnProperty;for(var e in b)d.call(b,e)&&(a[e]=b[e]);return c.prototype=b.prototype,a.prototype=new c,a.__super__=b.prototype,a},c.Decorate=function(a,c){function d(){var b=Array.prototype.unshift,d=c.prototype.constructor.length,e=a.prototype.constructor;d>0&&(b.call(arguments,a.prototype.constructor),e=c.prototype.constructor),e.apply(this,arguments)}function e(){this.constructor=d}var f=b(c),g=b(a);c.displayName=a.displayName,d.prototype=new e;for(var h=0;h<g.length;h++){var i=g[h];d.prototype[i]=a.prototype[i]}for(var j=(function(a){var b=function(){};a in d.prototype&&(b=d.prototype[a]);var e=c.prototype[a];return function(){var a=Array.prototype.unshift;return a.call(arguments,b),e.apply(this,arguments)}}),k=0;k<f.length;k++){var l=f[k];d.prototype[l]=j(l)}return d};var d=function(){this.listeners={}};return d.prototype.on=function(a,b){this.listeners=this.listeners||{},a in this.listeners?this.listeners[a].push(b):this.listeners[a]=[b]},d.prototype.trigger=function(a){var b=Array.prototype.slice,c=b.call(arguments,1);this.listeners=this.listeners||{},null==c&&(c=[]),0===c.length&&c.push({}),c[0]._type=a,a in this.listeners&&this.invoke(this.listeners[a],b.call(arguments,1)),"*"in this.listeners&&this.invoke(this.listeners["*"],arguments)},d.prototype.invoke=function(a,b){for(var c=0,d=a.length;d>c;c++)a[c].apply(this,b)},c.Observable=d,c.generateChars=function(a){for(var b="",c=0;a>c;c++){var d=Math.floor(36*Math.random());b+=d.toString(36)}return b},c.bind=function(a,b){return function(){a.apply(b,arguments)}},c._convertData=function(a){for(var b in a){var c=b.split("-"),d=a;if(1!==c.length){for(var e=0;e<c.length;e++){var f=c[e];f=f.substring(0,1).toLowerCase()+f.substring(1),f in d||(d[f]={}),e==c.length-1&&(d[f]=a[b]),d=d[f]}delete a[b]}}return a},c.hasScroll=function(b,c){var d=a(c),e=c.style.overflowX,f=c.style.overflowY;return e!==f||"hidden"!==f&&"visible"!==f?"scroll"===e||"scroll"===f?!0:d.innerHeight()<c.scrollHeight||d.innerWidth()<c.scrollWidth:!1},c.escapeMarkup=function(a){var b={"\\":"&#92;","&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#47;"};return"string"!=typeof a?a:String(a).replace(/[&<>"'\/\\]/g,function(a){return b[a]})},c.appendMany=function(b,c){if("1.7"===a.fn.jquery.substr(0,3)){var d=a();a.map(c,function(a){d=d.add(a)}),c=d}b.append(c)},c}),b.define("czrSelect2/results",["jquery","./utils"],function(a,b){function c(a,b,d){this.$element=a,this.data=d,this.options=b,c.__super__.constructor.call(this)}return b.Extend(c,b.Observable),c.prototype.render=function(){var b=a('<ul class="czrSelect2-results__options" role="tree"></ul>');return this.options.get("multiple")&&b.attr("aria-multiselectable","true"),this.$results=b,b},c.prototype.clear=function(){this.$results.empty()},c.prototype.displayMessage=function(b){var c=this.options.get("escapeMarkup");this.clear(),this.hideLoading();var d=a('<li role="treeitem" aria-live="assertive" class="czrSelect2-results__option"></li>'),e=this.options.get("translations").get(b.message);d.append(c(e(b.args))),d[0].className+=" czrSelect2-results__message",this.$results.append(d)},c.prototype.hideMessages=function(){this.$results.find(".czrSelect2-results__message").remove()},c.prototype.append=function(a){this.hideLoading();var b=[];if(null==a.results||0===a.results.length)return void(0===this.$results.children().length&&this.trigger("results:message",{message:"noResults"}));a.results=this.sort(a.results);for(var c=0;c<a.results.length;c++){var d=a.results[c],e=this.option(d);b.push(e)}this.$results.append(b)},c.prototype.position=function(a,b){var c=b.find(".czrSelect2-results");c.append(a)},c.prototype.sort=function(a){var b=this.options.get("sorter");return b(a)},c.prototype.highlightFirstItem=function(){var a=this.$results.find(".czrSelect2-results__option[aria-selected]"),b=a.filter("[aria-selected=true]");b.length>0?b.first().trigger("mouseenter"):a.first().trigger("mouseenter"),this.ensureHighlightVisible()},c.prototype.setClasses=function(){var b=this;this.data.current(function(c){var d=a.map(c,function(a){return a.id.toString()}),e=b.$results.find(".czrSelect2-results__option[aria-selected]");e.each(function(){var b=a(this),c=a.data(this,"data"),e=""+c.id;null!=c.element&&c.element.selected||null==c.element&&a.inArray(e,d)>-1?b.attr("aria-selected","true"):b.attr("aria-selected","false")})})},c.prototype.showLoading=function(a){this.hideLoading();var b=this.options.get("translations").get("searching"),c={disabled:!0,loading:!0,text:b(a)},d=this.option(c);d.className+=" loading-results",this.$results.prepend(d)},c.prototype.hideLoading=function(){this.$results.find(".loading-results").remove()},c.prototype.option=function(b){var c=document.createElement("li");c.className="czrSelect2-results__option";var d={role:"treeitem","aria-selected":"false"};b.disabled&&(delete d["aria-selected"],d["aria-disabled"]="true"),null==b.id&&delete d["aria-selected"],null!=b._resultId&&(c.id=b._resultId),b.title&&(c.title=b.title),b.children&&(d.role="group",d["aria-label"]=b.text,delete d["aria-selected"]);for(var e in d){var f=d[e];c.setAttribute(e,f)}if(b.children){var g=a(c),h=document.createElement("strong");h.className="czrSelect2-results__group";a(h);this.template(b,h);for(var i=[],j=0;j<b.children.length;j++){var k=b.children[j],l=this.option(k);i.push(l)}var m=a("<ul></ul>",{"class":"czrSelect2-results__options czrSelect2-results__options--nested"});m.append(i),g.append(h),g.append(m)}else this.template(b,c);return a.data(c,"data",b),c},c.prototype.bind=function(b,c){var d=this,e=b.id+"-results";this.$results.attr("id",e),b.on("results:all",function(a){d.clear(),d.append(a.data),b.isOpen()&&(d.setClasses(),d.highlightFirstItem())}),b.on("results:append",function(a){d.append(a.data),b.isOpen()&&d.setClasses()}),b.on("query",function(a){d.hideMessages(),d.showLoading(a)}),b.on("select",function(){b.isOpen()&&(d.setClasses(),d.highlightFirstItem())}),b.on("unselect",function(){b.isOpen()&&(d.setClasses(),d.highlightFirstItem())}),b.on("open",function(){d.$results.attr("aria-expanded","true"),d.$results.attr("aria-hidden","false"),d.setClasses(),d.ensureHighlightVisible()}),b.on("close",function(){d.$results.attr("aria-expanded","false"),d.$results.attr("aria-hidden","true"),d.$results.removeAttr("aria-activedescendant")}),b.on("results:toggle",function(){var a=d.getHighlightedResults();0!==a.length&&a.trigger("mouseup")}),b.on("results:select",function(){var a=d.getHighlightedResults();if(0!==a.length){var b=a.data("data");"true"==a.attr("aria-selected")?d.trigger("close",{}):d.trigger("select",{data:b})}}),b.on("results:previous",function(){var a=d.getHighlightedResults(),b=d.$results.find("[aria-selected]"),c=b.index(a);if(0!==c){var e=c-1;0===a.length&&(e=0);var f=b.eq(e);f.trigger("mouseenter");var g=d.$results.offset().top,h=f.offset().top,i=d.$results.scrollTop()+(h-g);0===e?d.$results.scrollTop(0):0>h-g&&d.$results.scrollTop(i)}}),b.on("results:next",function(){var a=d.getHighlightedResults(),b=d.$results.find("[aria-selected]"),c=b.index(a),e=c+1;if(!(e>=b.length)){var f=b.eq(e);f.trigger("mouseenter");var g=d.$results.offset().top+d.$results.outerHeight(!1),h=f.offset().top+f.outerHeight(!1),i=d.$results.scrollTop()+h-g;0===e?d.$results.scrollTop(0):h>g&&d.$results.scrollTop(i)}}),b.on("results:focus",function(a){a.element.addClass("czrSelect2-results__option--highlighted")}),b.on("results:message",function(a){d.displayMessage(a)}),a.fn.mousewheel&&this.$results.on("mousewheel",function(a){var b=d.$results.scrollTop(),c=d.$results.get(0).scrollHeight-b+a.deltaY,e=a.deltaY>0&&b-a.deltaY<=0,f=a.deltaY<0&&c<=d.$results.height();e?(d.$results.scrollTop(0),a.preventDefault(),a.stopPropagation()):f&&(d.$results.scrollTop(d.$results.get(0).scrollHeight-d.$results.height()),a.preventDefault(),a.stopPropagation())}),this.$results.on("mouseup",".czrSelect2-results__option[aria-selected]",function(b){var c=a(this),e=c.data("data");return"true"===c.attr("aria-selected")?void(d.options.get("multiple")?d.trigger("unselect",{originalEvent:b,data:e}):d.trigger("close",{})):void d.trigger("select",{originalEvent:b,data:e})}),this.$results.on("mouseenter",".czrSelect2-results__option[aria-selected]",function(b){var c=a(this).data("data");d.getHighlightedResults().removeClass("czrSelect2-results__option--highlighted"),d.trigger("results:focus",{data:c,element:a(this)})})},c.prototype.getHighlightedResults=function(){var a=this.$results.find(".czrSelect2-results__option--highlighted");return a},c.prototype.destroy=function(){this.$results.remove()},c.prototype.ensureHighlightVisible=function(){var a=this.getHighlightedResults();if(0!==a.length){var b=this.$results.find("[aria-selected]"),c=b.index(a),d=this.$results.offset().top,e=a.offset().top,f=this.$results.scrollTop()+(e-d),g=e-d;f-=2*a.outerHeight(!1),2>=c?this.$results.scrollTop(0):(g>this.$results.outerHeight()||0>g)&&this.$results.scrollTop(f)}},c.prototype.template=function(b,c){var d=this.options.get("templateResult"),e=this.options.get("escapeMarkup"),f=d(b,c);null==f?c.style.display="none":"string"==typeof f?c.innerHTML=e(f):a(c).append(f)},c}),b.define("czrSelect2/keys",[],function(){var a={BACKSPACE:8,TAB:9,ENTER:13,SHIFT:16,CTRL:17,ALT:18,ESC:27,SPACE:32,PAGE_UP:33,PAGE_DOWN:34,END:35,HOME:36,LEFT:37,UP:38,RIGHT:39,DOWN:40,DELETE:46};return a}),b.define("czrSelect2/selection/base",["jquery","../utils","../keys"],function(a,b,c){function d(a,b){this.$element=a,this.options=b,d.__super__.constructor.call(this)}return b.Extend(d,b.Observable),d.prototype.render=function(){var b=a('<span class="czrSelect2-selection" role="combobox"  aria-haspopup="true" aria-expanded="false"></span>');return this._tabindex=0,null!=this.$element.data("old-tabindex")?this._tabindex=this.$element.data("old-tabindex"):null!=this.$element.attr("tabindex")&&(this._tabindex=this.$element.attr("tabindex")),b.attr("title",this.$element.attr("title")),b.attr("tabindex",this._tabindex),this.$selection=b,b},d.prototype.bind=function(a,b){var d=this,e=(a.id+"-container",a.id+"-results");this.container=a,this.$selection.on("focus",function(a){d.trigger("focus",a)}),this.$selection.on("blur",function(a){d._handleBlur(a)}),this.$selection.on("keydown",function(a){d.trigger("keypress",a),a.which===c.SPACE&&a.preventDefault()}),a.on("results:focus",function(a){d.$selection.attr("aria-activedescendant",a.data._resultId)}),a.on("selection:update",function(a){d.update(a.data)}),a.on("open",function(){d.$selection.attr("aria-expanded","true"),d.$selection.attr("aria-owns",e),d._attachCloseHandler(a)}),a.on("close",function(){d.$selection.attr("aria-expanded","false"),d.$selection.removeAttr("aria-activedescendant"),d.$selection.removeAttr("aria-owns"),d.$selection.focus(),d._detachCloseHandler(a)}),a.on("enable",function(){d.$selection.attr("tabindex",d._tabindex)}),a.on("disable",function(){d.$selection.attr("tabindex","-1")})},d.prototype._handleBlur=function(b){var c=this;window.setTimeout(function(){document.activeElement==c.$selection[0]||a.contains(c.$selection[0],document.activeElement)||c.trigger("blur",b)},1)},d.prototype._attachCloseHandler=function(b){a(document.body).on("mousedown.czrSelect2."+b.id,function(b){var c=a(b.target),d=c.closest(".czrSelect2"),e=a(".czrSelect2.czrSelect2-container--open");e.each(function(){var b=a(this);if(this!=d[0]){var c=b.data("element");c.czrSelect2("close")}})})},d.prototype._detachCloseHandler=function(b){a(document.body).off("mousedown.czrSelect2."+b.id)},d.prototype.position=function(a,b){var c=b.find(".selection");c.append(a)},d.prototype.destroy=function(){this._detachCloseHandler(this.container)},d.prototype.update=function(a){throw new Error("The `update` method must be defined in child classes.")},d}),b.define("czrSelect2/selection/single",["jquery","./base","../utils","../keys"],function(a,b,c,d){function e(){e.__super__.constructor.apply(this,arguments)}return c.Extend(e,b),e.prototype.render=function(){var a=e.__super__.render.call(this);return a.addClass("czrSelect2-selection--single"),a.html('<span class="czrSelect2-selection__rendered"></span><span class="czrSelect2-selection__arrow" role="presentation"><b role="presentation"></b></span>'),a},e.prototype.bind=function(a,b){var c=this;e.__super__.bind.apply(this,arguments);var d=a.id+"-container";this.$selection.find(".czrSelect2-selection__rendered").attr("id",d),this.$selection.attr("aria-labelledby",d),this.$selection.on("mousedown",function(a){1===a.which&&c.trigger("toggle",{originalEvent:a})}),this.$selection.on("focus",function(a){}),this.$selection.on("blur",function(a){}),a.on("focus",function(b){a.isOpen()||c.$selection.focus()}),a.on("selection:update",function(a){c.update(a.data)})},e.prototype.clear=function(){this.$selection.find(".czrSelect2-selection__rendered").empty()},e.prototype.display=function(a,b){var c=this.options.get("templateSelection"),d=this.options.get("escapeMarkup");return d(c(a,b))},e.prototype.selectionContainer=function(){return a("<span></span>")},e.prototype.update=function(a){if(0===a.length)return void this.clear();var b=a[0],c=this.$selection.find(".czrSelect2-selection__rendered"),d=this.display(b,c);c.empty().append(d),c.prop("title",b.title||b.text)},e}),b.define("czrSelect2/selection/multiple",["jquery","./base","../utils"],function(a,b,c){function d(a,b){d.__super__.constructor.apply(this,arguments)}return c.Extend(d,b),d.prototype.render=function(){var a=d.__super__.render.call(this);return a.addClass("czrSelect2-selection--multiple"),a.html('<ul class="czrSelect2-selection__rendered"></ul>'),a},d.prototype.bind=function(b,c){var e=this;d.__super__.bind.apply(this,arguments),this.$selection.on("click",function(a){e.trigger("toggle",{originalEvent:a})}),this.$selection.on("click",".czrSelect2-selection__choice__remove",function(b){if(!e.options.get("disabled")){var c=a(this),d=c.parent(),f=d.data("data");e.trigger("unselect",{originalEvent:b,data:f})}})},d.prototype.clear=function(){this.$selection.find(".czrSelect2-selection__rendered").empty()},d.prototype.display=function(a,b){var c=this.options.get("templateSelection"),d=this.options.get("escapeMarkup");return d(c(a,b))},d.prototype.selectionContainer=function(){var b=a('<li class="czrSelect2-selection__choice"><span class="czrSelect2-selection__choice__remove" role="presentation">&times;</span></li>');return b},d.prototype.update=function(a){if(this.clear(),0!==a.length){for(var b=[],d=0;d<a.length;d++){var e=a[d],f=this.selectionContainer(),g=this.display(e,f);f.append(g),f.prop("title",e.title||e.text),f.data("data",e),b.push(f)}var h=this.$selection.find(".czrSelect2-selection__rendered");c.appendMany(h,b)}},d}),b.define("czrSelect2/selection/placeholder",["../utils"],function(a){function b(a,b,c){this.placeholder=this.normalizePlaceholder(c.get("placeholder")),a.call(this,b,c)}return b.prototype.normalizePlaceholder=function(a,b){return"string"==typeof b&&(b={id:"",text:b}),b},b.prototype.createPlaceholder=function(a,b){var c=this.selectionContainer();return c.html(this.display(b)),c.addClass("czrSelect2-selection__placeholder").removeClass("czrSelect2-selection__choice"),c},b.prototype.update=function(a,b){var c=1==b.length&&b[0].id!=this.placeholder.id,d=b.length>1;if(d||c)return a.call(this,b);this.clear();var e=this.createPlaceholder(this.placeholder);this.$selection.find(".czrSelect2-selection__rendered").append(e)},b}),b.define("czrSelect2/selection/allowClear",["jquery","../keys"],function(a,b){function c(){}return c.prototype.bind=function(a,b,c){var d=this;a.call(this,b,c),null==this.placeholder&&this.options.get("debug")&&window.console&&console.error&&console.error("CzrSelect2: The `allowClear` option should be used in combination with the `placeholder` option."),this.$selection.on("mousedown",".czrSelect2-selection__clear",function(a){d._handleClear(a)}),b.on("keypress",function(a){d._handleKeyboardClear(a,b)})},c.prototype._handleClear=function(a,b){if(!this.options.get("disabled")){var c=this.$selection.find(".czrSelect2-selection__clear");if(0!==c.length){b.stopPropagation();for(var d=c.data("data"),e=0;e<d.length;e++){var f={data:d[e]};if(this.trigger("unselect",f),f.prevented)return}this.$element.val(this.placeholder.id).trigger("change"),this.trigger("toggle",{})}}},c.prototype._handleKeyboardClear=function(a,c,d){d.isOpen()||(c.which==b.DELETE||c.which==b.BACKSPACE)&&this._handleClear(c)},c.prototype.update=function(b,c){if(b.call(this,c),!(this.$selection.find(".czrSelect2-selection__placeholder").length>0||0===c.length)){var d=a('<span class="czrSelect2-selection__clear">&times;</span>');d.data("data",c),this.$selection.find(".czrSelect2-selection__rendered").prepend(d)}},c}),b.define("czrSelect2/selection/search",["jquery","../utils","../keys"],function(a,b,c){function d(a,b,c){a.call(this,b,c)}return d.prototype.render=function(b){var c=a('<li class="czrSelect2-search czrSelect2-search--inline"><input class="czrSelect2-search__field" type="search" tabindex="-1" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" role="textbox" aria-autocomplete="list" /></li>');this.$searchContainer=c,this.$search=c.find("input");var d=b.call(this);return this._transferTabIndex(),d},d.prototype.bind=function(a,b,d){var e=this;a.call(this,b,d),b.on("open",function(){e.$search.trigger("focus")}),b.on("close",function(){e.$search.val(""),e.$search.removeAttr("aria-activedescendant"),e.$search.trigger("focus")}),b.on("enable",function(){e.$search.prop("disabled",!1),e._transferTabIndex()}),b.on("disable",function(){e.$search.prop("disabled",!0)}),b.on("focus",function(a){e.$search.trigger("focus")}),b.on("results:focus",function(a){e.$search.attr("aria-activedescendant",a.id)}),this.$selection.on("focusin",".czrSelect2-search--inline",function(a){e.trigger("focus",a)}),this.$selection.on("focusout",".czrSelect2-search--inline",function(a){e._handleBlur(a)}),this.$selection.on("keydown",".czrSelect2-search--inline",function(a){a.stopPropagation(),e.trigger("keypress",a),e._keyUpPrevented=a.isDefaultPrevented();var b=a.which;if(b===c.BACKSPACE&&""===e.$search.val()){var d=e.$searchContainer.prev(".czrSelect2-selection__choice");if(d.length>0){var f=d.data("data");e.searchRemoveChoice(f),a.preventDefault()}}});var f=document.documentMode,g=f&&11>=f;this.$selection.on("input.searchcheck",".czrSelect2-search--inline",function(a){return g?void e.$selection.off("input.search input.searchcheck"):void e.$selection.off("keyup.search")}),this.$selection.on("keyup.search input.search",".czrSelect2-search--inline",function(a){if(g&&"input"===a.type)return void e.$selection.off("input.search input.searchcheck");var b=a.which;b!=c.SHIFT&&b!=c.CTRL&&b!=c.ALT&&b!=c.TAB&&e.handleSearch(a)})},d.prototype._transferTabIndex=function(a){this.$search.attr("tabindex",this.$selection.attr("tabindex")),this.$selection.attr("tabindex","-1")},d.prototype.createPlaceholder=function(a,b){this.$search.attr("placeholder",b.text)},d.prototype.update=function(a,b){var c=this.$search[0]==document.activeElement;this.$search.attr("placeholder",""),a.call(this,b),this.$selection.find(".czrSelect2-selection__rendered").append(this.$searchContainer),this.resizeSearch(),c&&this.$search.focus()},d.prototype.handleSearch=function(){if(this.resizeSearch(),!this._keyUpPrevented){var a=this.$search.val();this.trigger("query",{term:a})}this._keyUpPrevented=!1},d.prototype.searchRemoveChoice=function(a,b){this.trigger("unselect",{data:b}),this.$search.val(b.text),this.handleSearch()},d.prototype.resizeSearch=function(){this.$search.css("width","25px");var a="";if(""!==this.$search.attr("placeholder"))a=this.$selection.find(".czrSelect2-selection__rendered").innerWidth();else{var b=this.$search.val().length+1;a=.75*b+"em"}this.$search.css("width",a)},d}),b.define("czrSelect2/selection/eventRelay",["jquery"],function(a){function b(){}return b.prototype.bind=function(b,c,d){var e=this,f=["open","opening","close","closing","select","selecting","unselect","unselecting"],g=["opening","closing","selecting","unselecting"];b.call(this,c,d),c.on("*",function(b,c){if(-1!==a.inArray(b,f)){c=c||{};var d=a.Event("czrSelect2:"+b,{params:c});e.$element.trigger(d),-1!==a.inArray(b,g)&&(c.prevented=d.isDefaultPrevented())}})},b}),b.define("czrSelect2/translation",["jquery","require"],function(a,b){function c(a){this.dict=a||{}}return c.prototype.all=function(){return this.dict},c.prototype.get=function(a){return this.dict[a]},c.prototype.extend=function(b){this.dict=a.extend({},b.all(),this.dict)},c._cache={},c.loadPath=function(a){if(!(a in c._cache)){var d=b(a);c._cache[a]=d}return new c(c._cache[a])},c}),b.define("czrSelect2/diacritics",[],function(){var a={"Ⓐ":"A","Ａ":"A","À":"A","Á":"A","Â":"A","Ầ":"A","Ấ":"A","Ẫ":"A","Ẩ":"A","Ã":"A","Ā":"A","Ă":"A","Ằ":"A","Ắ":"A","Ẵ":"A","Ẳ":"A","Ȧ":"A","Ǡ":"A","Ä":"A","Ǟ":"A","Ả":"A","Å":"A","Ǻ":"A","Ǎ":"A","Ȁ":"A","Ȃ":"A","Ạ":"A","Ậ":"A","Ặ":"A","Ḁ":"A","Ą":"A","Ⱥ":"A","Ɐ":"A","Ꜳ":"AA","Æ":"AE","Ǽ":"AE","Ǣ":"AE","Ꜵ":"AO","Ꜷ":"AU","Ꜹ":"AV","Ꜻ":"AV","Ꜽ":"AY","Ⓑ":"B","Ｂ":"B","Ḃ":"B","Ḅ":"B","Ḇ":"B","Ƀ":"B","Ƃ":"B","Ɓ":"B","Ⓒ":"C","Ｃ":"C","Ć":"C","Ĉ":"C","Ċ":"C","Č":"C","Ç":"C","Ḉ":"C","Ƈ":"C","Ȼ":"C","Ꜿ":"C","Ⓓ":"D","Ｄ":"D","Ḋ":"D","Ď":"D","Ḍ":"D","Ḑ":"D","Ḓ":"D","Ḏ":"D","Đ":"D","Ƌ":"D","Ɗ":"D","Ɖ":"D","Ꝺ":"D","Ǳ":"DZ","Ǆ":"DZ","ǲ":"Dz","ǅ":"Dz","Ⓔ":"E","Ｅ":"E","È":"E","É":"E","Ê":"E","Ề":"E","Ế":"E","Ễ":"E","Ể":"E","Ẽ":"E","Ē":"E","Ḕ":"E","Ḗ":"E","Ĕ":"E","Ė":"E","Ë":"E","Ẻ":"E","Ě":"E","Ȅ":"E","Ȇ":"E","Ẹ":"E","Ệ":"E","Ȩ":"E","Ḝ":"E","Ę":"E","Ḙ":"E","Ḛ":"E","Ɛ":"E","Ǝ":"E","Ⓕ":"F","Ｆ":"F","Ḟ":"F","Ƒ":"F","Ꝼ":"F","Ⓖ":"G","Ｇ":"G","Ǵ":"G","Ĝ":"G","Ḡ":"G","Ğ":"G","Ġ":"G","Ǧ":"G","Ģ":"G","Ǥ":"G","Ɠ":"G","Ꞡ":"G","Ᵹ":"G","Ꝿ":"G","Ⓗ":"H","Ｈ":"H","Ĥ":"H","Ḣ":"H","Ḧ":"H","Ȟ":"H","Ḥ":"H","Ḩ":"H","Ḫ":"H","Ħ":"H","Ⱨ":"H","Ⱶ":"H","Ɥ":"H","Ⓘ":"I","Ｉ":"I","Ì":"I","Í":"I","Î":"I","Ĩ":"I","Ī":"I","Ĭ":"I","İ":"I","Ï":"I","Ḯ":"I","Ỉ":"I","Ǐ":"I","Ȉ":"I","Ȋ":"I","Ị":"I","Į":"I","Ḭ":"I","Ɨ":"I","Ⓙ":"J","Ｊ":"J","Ĵ":"J","Ɉ":"J","Ⓚ":"K","Ｋ":"K","Ḱ":"K","Ǩ":"K","Ḳ":"K","Ķ":"K","Ḵ":"K","Ƙ":"K","Ⱪ":"K","Ꝁ":"K","Ꝃ":"K","Ꝅ":"K","Ꞣ":"K","Ⓛ":"L","Ｌ":"L","Ŀ":"L","Ĺ":"L","Ľ":"L","Ḷ":"L","Ḹ":"L","Ļ":"L","Ḽ":"L","Ḻ":"L","Ł":"L","Ƚ":"L","Ɫ":"L","Ⱡ":"L","Ꝉ":"L","Ꝇ":"L","Ꞁ":"L","Ǉ":"LJ","ǈ":"Lj","Ⓜ":"M","Ｍ":"M","Ḿ":"M","Ṁ":"M","Ṃ":"M","Ɱ":"M","Ɯ":"M","Ⓝ":"N","Ｎ":"N","Ǹ":"N","Ń":"N","Ñ":"N","Ṅ":"N","Ň":"N","Ṇ":"N","Ņ":"N","Ṋ":"N","Ṉ":"N","Ƞ":"N","Ɲ":"N","Ꞑ":"N","Ꞥ":"N","Ǌ":"NJ","ǋ":"Nj","Ⓞ":"O","Ｏ":"O","Ò":"O","Ó":"O","Ô":"O","Ồ":"O","Ố":"O","Ỗ":"O","Ổ":"O","Õ":"O","Ṍ":"O","Ȭ":"O","Ṏ":"O","Ō":"O","Ṑ":"O","Ṓ":"O","Ŏ":"O","Ȯ":"O","Ȱ":"O","Ö":"O","Ȫ":"O","Ỏ":"O","Ő":"O","Ǒ":"O","Ȍ":"O","Ȏ":"O","Ơ":"O","Ờ":"O","Ớ":"O","Ỡ":"O","Ở":"O","Ợ":"O","Ọ":"O","Ộ":"O","Ǫ":"O","Ǭ":"O","Ø":"O","Ǿ":"O","Ɔ":"O","Ɵ":"O","Ꝋ":"O","Ꝍ":"O","Ƣ":"OI","Ꝏ":"OO","Ȣ":"OU","Ⓟ":"P","Ｐ":"P","Ṕ":"P","Ṗ":"P","Ƥ":"P","Ᵽ":"P","Ꝑ":"P","Ꝓ":"P","Ꝕ":"P","Ⓠ":"Q","Ｑ":"Q","Ꝗ":"Q","Ꝙ":"Q","Ɋ":"Q","Ⓡ":"R","Ｒ":"R","Ŕ":"R","Ṙ":"R","Ř":"R","Ȑ":"R","Ȓ":"R","Ṛ":"R","Ṝ":"R","Ŗ":"R","Ṟ":"R","Ɍ":"R","Ɽ":"R","Ꝛ":"R","Ꞧ":"R","Ꞃ":"R","Ⓢ":"S","Ｓ":"S","ẞ":"S","Ś":"S","Ṥ":"S","Ŝ":"S","Ṡ":"S","Š":"S","Ṧ":"S","Ṣ":"S","Ṩ":"S","Ș":"S","Ş":"S","Ȿ":"S","Ꞩ":"S","Ꞅ":"S","Ⓣ":"T","Ｔ":"T","Ṫ":"T","Ť":"T","Ṭ":"T","Ț":"T","Ţ":"T","Ṱ":"T","Ṯ":"T","Ŧ":"T","Ƭ":"T","Ʈ":"T","Ⱦ":"T","Ꞇ":"T","Ꜩ":"TZ","Ⓤ":"U","Ｕ":"U","Ù":"U","Ú":"U","Û":"U","Ũ":"U","Ṹ":"U","Ū":"U","Ṻ":"U","Ŭ":"U","Ü":"U","Ǜ":"U","Ǘ":"U","Ǖ":"U","Ǚ":"U","Ủ":"U","Ů":"U","Ű":"U","Ǔ":"U","Ȕ":"U","Ȗ":"U","Ư":"U","Ừ":"U","Ứ":"U","Ữ":"U","Ử":"U","Ự":"U","Ụ":"U","Ṳ":"U","Ų":"U","Ṷ":"U","Ṵ":"U","Ʉ":"U","Ⓥ":"V","Ｖ":"V","Ṽ":"V","Ṿ":"V","Ʋ":"V","Ꝟ":"V","Ʌ":"V","Ꝡ":"VY","Ⓦ":"W","Ｗ":"W","Ẁ":"W","Ẃ":"W","Ŵ":"W","Ẇ":"W","Ẅ":"W","Ẉ":"W","Ⱳ":"W","Ⓧ":"X","Ｘ":"X","Ẋ":"X","Ẍ":"X","Ⓨ":"Y","Ｙ":"Y","Ỳ":"Y","Ý":"Y","Ŷ":"Y","Ỹ":"Y","Ȳ":"Y","Ẏ":"Y","Ÿ":"Y","Ỷ":"Y","Ỵ":"Y","Ƴ":"Y","Ɏ":"Y","Ỿ":"Y","Ⓩ":"Z","Ｚ":"Z","Ź":"Z","Ẑ":"Z","Ż":"Z","Ž":"Z","Ẓ":"Z","Ẕ":"Z","Ƶ":"Z","Ȥ":"Z","Ɀ":"Z","Ⱬ":"Z","Ꝣ":"Z","ⓐ":"a","ａ":"a","ẚ":"a","à":"a","á":"a","â":"a","ầ":"a","ấ":"a","ẫ":"a","ẩ":"a","ã":"a","ā":"a","ă":"a","ằ":"a","ắ":"a","ẵ":"a","ẳ":"a","ȧ":"a","ǡ":"a","ä":"a","ǟ":"a","ả":"a","å":"a","ǻ":"a","ǎ":"a","ȁ":"a","ȃ":"a","ạ":"a","ậ":"a","ặ":"a","ḁ":"a","ą":"a","ⱥ":"a","ɐ":"a","ꜳ":"aa","æ":"ae","ǽ":"ae","ǣ":"ae","ꜵ":"ao","ꜷ":"au","ꜹ":"av","ꜻ":"av","ꜽ":"ay","ⓑ":"b","ｂ":"b","ḃ":"b","ḅ":"b","ḇ":"b","ƀ":"b","ƃ":"b","ɓ":"b","ⓒ":"c","ｃ":"c","ć":"c","ĉ":"c","ċ":"c","č":"c","ç":"c","ḉ":"c","ƈ":"c","ȼ":"c","ꜿ":"c","ↄ":"c","ⓓ":"d","ｄ":"d","ḋ":"d","ď":"d","ḍ":"d","ḑ":"d","ḓ":"d","ḏ":"d","đ":"d","ƌ":"d","ɖ":"d","ɗ":"d","ꝺ":"d","ǳ":"dz","ǆ":"dz","ⓔ":"e","ｅ":"e","è":"e","é":"e","ê":"e","ề":"e","ế":"e","ễ":"e","ể":"e","ẽ":"e","ē":"e","ḕ":"e","ḗ":"e","ĕ":"e","ė":"e","ë":"e","ẻ":"e","ě":"e","ȅ":"e","ȇ":"e","ẹ":"e","ệ":"e","ȩ":"e","ḝ":"e","ę":"e","ḙ":"e","ḛ":"e","ɇ":"e","ɛ":"e","ǝ":"e","ⓕ":"f","ｆ":"f","ḟ":"f","ƒ":"f","ꝼ":"f","ⓖ":"g","ｇ":"g","ǵ":"g","ĝ":"g","ḡ":"g","ğ":"g","ġ":"g","ǧ":"g","ģ":"g","ǥ":"g","ɠ":"g","ꞡ":"g","ᵹ":"g","ꝿ":"g","ⓗ":"h","ｈ":"h","ĥ":"h","ḣ":"h","ḧ":"h","ȟ":"h","ḥ":"h","ḩ":"h","ḫ":"h","ẖ":"h","ħ":"h","ⱨ":"h","ⱶ":"h","ɥ":"h","ƕ":"hv","ⓘ":"i","ｉ":"i","ì":"i","í":"i","î":"i","ĩ":"i","ī":"i","ĭ":"i","ï":"i","ḯ":"i","ỉ":"i","ǐ":"i","ȉ":"i","ȋ":"i","ị":"i","į":"i","ḭ":"i","ɨ":"i","ı":"i","ⓙ":"j","ｊ":"j","ĵ":"j","ǰ":"j","ɉ":"j","ⓚ":"k","ｋ":"k","ḱ":"k","ǩ":"k","ḳ":"k","ķ":"k","ḵ":"k","ƙ":"k","ⱪ":"k","ꝁ":"k","ꝃ":"k","ꝅ":"k","ꞣ":"k","ⓛ":"l","ｌ":"l","ŀ":"l","ĺ":"l","ľ":"l","ḷ":"l","ḹ":"l","ļ":"l","ḽ":"l","ḻ":"l","ſ":"l","ł":"l","ƚ":"l","ɫ":"l","ⱡ":"l","ꝉ":"l","ꞁ":"l","ꝇ":"l","ǉ":"lj","ⓜ":"m","ｍ":"m","ḿ":"m","ṁ":"m","ṃ":"m","ɱ":"m","ɯ":"m","ⓝ":"n","ｎ":"n","ǹ":"n","ń":"n","ñ":"n","ṅ":"n","ň":"n","ṇ":"n","ņ":"n","ṋ":"n","ṉ":"n","ƞ":"n","ɲ":"n","ŉ":"n","ꞑ":"n","ꞥ":"n","ǌ":"nj","ⓞ":"o","ｏ":"o","ò":"o","ó":"o","ô":"o","ồ":"o","ố":"o","ỗ":"o","ổ":"o","õ":"o","ṍ":"o","ȭ":"o","ṏ":"o","ō":"o","ṑ":"o","ṓ":"o","ŏ":"o","ȯ":"o","ȱ":"o","ö":"o","ȫ":"o","ỏ":"o","ő":"o","ǒ":"o","ȍ":"o","ȏ":"o","ơ":"o","ờ":"o","ớ":"o","ỡ":"o","ở":"o","ợ":"o","ọ":"o","ộ":"o","ǫ":"o","ǭ":"o","ø":"o","ǿ":"o","ɔ":"o","ꝋ":"o","ꝍ":"o","ɵ":"o","ƣ":"oi","ȣ":"ou","ꝏ":"oo","ⓟ":"p","ｐ":"p","ṕ":"p","ṗ":"p","ƥ":"p","ᵽ":"p","ꝑ":"p","ꝓ":"p","ꝕ":"p","ⓠ":"q","ｑ":"q","ɋ":"q","ꝗ":"q","ꝙ":"q","ⓡ":"r","ｒ":"r","ŕ":"r","ṙ":"r","ř":"r","ȑ":"r","ȓ":"r","ṛ":"r","ṝ":"r","ŗ":"r","ṟ":"r","ɍ":"r","ɽ":"r","ꝛ":"r","ꞧ":"r","ꞃ":"r","ⓢ":"s","ｓ":"s","ß":"s","ś":"s","ṥ":"s","ŝ":"s","ṡ":"s","š":"s","ṧ":"s","ṣ":"s","ṩ":"s","ș":"s","ş":"s","ȿ":"s","ꞩ":"s","ꞅ":"s","ẛ":"s","ⓣ":"t","ｔ":"t","ṫ":"t","ẗ":"t","ť":"t","ṭ":"t","ț":"t","ţ":"t","ṱ":"t","ṯ":"t","ŧ":"t","ƭ":"t","ʈ":"t","ⱦ":"t","ꞇ":"t","ꜩ":"tz","ⓤ":"u","ｕ":"u","ù":"u","ú":"u","û":"u","ũ":"u","ṹ":"u","ū":"u","ṻ":"u","ŭ":"u","ü":"u","ǜ":"u","ǘ":"u","ǖ":"u","ǚ":"u","ủ":"u","ů":"u","ű":"u","ǔ":"u","ȕ":"u","ȗ":"u","ư":"u","ừ":"u","ứ":"u","ữ":"u","ử":"u","ự":"u","ụ":"u","ṳ":"u","ų":"u","ṷ":"u","ṵ":"u","ʉ":"u","ⓥ":"v","ｖ":"v","ṽ":"v","ṿ":"v","ʋ":"v","ꝟ":"v","ʌ":"v","ꝡ":"vy","ⓦ":"w","ｗ":"w","ẁ":"w","ẃ":"w","ŵ":"w","ẇ":"w","ẅ":"w","ẘ":"w","ẉ":"w","ⱳ":"w","ⓧ":"x","ｘ":"x","ẋ":"x","ẍ":"x","ⓨ":"y","ｙ":"y","ỳ":"y","ý":"y","ŷ":"y","ỹ":"y","ȳ":"y","ẏ":"y","ÿ":"y","ỷ":"y","ẙ":"y","ỵ":"y","ƴ":"y","ɏ":"y","ỿ":"y","ⓩ":"z","ｚ":"z","ź":"z","ẑ":"z","ż":"z","ž":"z","ẓ":"z","ẕ":"z","ƶ":"z","ȥ":"z","ɀ":"z","ⱬ":"z","ꝣ":"z","Ά":"Α","Έ":"Ε","Ή":"Η","Ί":"Ι","Ϊ":"Ι","Ό":"Ο","Ύ":"Υ","Ϋ":"Υ","Ώ":"Ω","ά":"α","έ":"ε","ή":"η","ί":"ι","ϊ":"ι","ΐ":"ι","ό":"ο","ύ":"υ","ϋ":"υ","ΰ":"υ","ω":"ω","ς":"σ"};return a}),b.define("czrSelect2/data/base",["../utils"],function(a){function b(a,c){b.__super__.constructor.call(this)}return a.Extend(b,a.Observable),b.prototype.current=function(a){throw new Error("The `current` method must be defined in child classes.")},b.prototype.query=function(a,b){throw new Error("The `query` method must be defined in child classes.")},b.prototype.bind=function(a,b){},b.prototype.destroy=function(){},b.prototype.generateResultId=function(b,c){var d=b.id+"-result-";return d+=a.generateChars(4),d+=null!=c.id?"-"+c.id.toString():"-"+a.generateChars(4)},b}),b.define("czrSelect2/data/select",["./base","../utils","jquery"],function(a,b,c){function d(a,b){this.$element=a,this.options=b,d.__super__.constructor.call(this)}return b.Extend(d,a),d.prototype.current=function(a){var b=[],d=this;this.$element.find(":selected").each(function(){var a=c(this),e=d.item(a);b.push(e)}),a(b)},d.prototype.select=function(a){var b=this;if(a.selected=!0,c(a.element).is("option"))return a.element.selected=!0,void this.$element.trigger("change");
if(this.$element.prop("multiple"))this.current(function(d){var e=[];a=[a],a.push.apply(a,d);for(var f=0;f<a.length;f++){var g=a[f].id;-1===c.inArray(g,e)&&e.push(g)}b.$element.val(e),b.$element.trigger("change")});else{var d=a.id;this.$element.val(d),this.$element.trigger("change")}},d.prototype.unselect=function(a){var b=this;if(this.$element.prop("multiple"))return a.selected=!1,c(a.element).is("option")?(a.element.selected=!1,void this.$element.trigger("change")):void this.current(function(d){for(var e=[],f=0;f<d.length;f++){var g=d[f].id;g!==a.id&&-1===c.inArray(g,e)&&e.push(g)}b.$element.val(e),b.$element.trigger("change")})},d.prototype.bind=function(a,b){var c=this;this.container=a,a.on("select",function(a){c.select(a.data)}),a.on("unselect",function(a){c.unselect(a.data)})},d.prototype.destroy=function(){this.$element.find("*").each(function(){c.removeData(this,"data")})},d.prototype.query=function(a,b){var d=[],e=this,f=this.$element.children();f.each(function(){var b=c(this);if(b.is("option")||b.is("optgroup")){var f=e.item(b),g=e.matches(a,f);null!==g&&d.push(g)}}),b({results:d})},d.prototype.addOptions=function(a){b.appendMany(this.$element,a)},d.prototype.option=function(a){var b;a.children?(b=document.createElement("optgroup"),b.label=a.text):(b=document.createElement("option"),void 0!==b.textContent?b.textContent=a.text:b.innerText=a.text),a.id&&(b.value=a.id),a.disabled&&(b.disabled=!0),a.selected&&(b.selected=!0),a.title&&(b.title=a.title);var d=c(b),e=this._normalizeItem(a);return e.element=b,c.data(b,"data",e),d},d.prototype.item=function(a){var b={};if(b=c.data(a[0],"data"),null!=b)return b;if(a.is("option"))b={id:a.val(),text:a.text(),disabled:a.prop("disabled"),selected:a.prop("selected"),title:a.prop("title")};else if(a.is("optgroup")){b={text:a.prop("label"),children:[],title:a.prop("title")};for(var d=a.children("option"),e=[],f=0;f<d.length;f++){var g=c(d[f]),h=this.item(g);e.push(h)}b.children=e}return b=this._normalizeItem(b),b.element=a[0],c.data(a[0],"data",b),b},d.prototype._normalizeItem=function(a){c.isPlainObject(a)||(a={id:a,text:a}),a=c.extend({},{text:""},a);var b={selected:!1,disabled:!1};return null!=a.id&&(a.id=a.id.toString()),null!=a.text&&(a.text=a.text.toString()),null==a._resultId&&a.id&&null!=this.container&&(a._resultId=this.generateResultId(this.container,a)),c.extend({},b,a)},d.prototype.matches=function(a,b){var c=this.options.get("matcher");return c(a,b)},d}),b.define("czrSelect2/data/array",["./select","../utils","jquery"],function(a,b,c){function d(a,b){var c=b.get("data")||[];d.__super__.constructor.call(this,a,b),this.addOptions(this.convertToOptions(c))}return b.Extend(d,a),d.prototype.select=function(a){var b=this.$element.find("option").filter(function(b,c){return c.value==a.id.toString()});0===b.length&&(b=this.option(a),this.addOptions(b)),d.__super__.select.call(this,a)},d.prototype.convertToOptions=function(a){function d(a){return function(){return c(this).val()==a.id}}for(var e=this,f=this.$element.find("option"),g=f.map(function(){return e.item(c(this)).id}).get(),h=[],i=0;i<a.length;i++){var j=this._normalizeItem(a[i]);if(c.inArray(j.id,g)>=0){var k=f.filter(d(j)),l=this.item(k),m=c.extend(!0,{},j,l),n=this.option(m);k.replaceWith(n)}else{var o=this.option(j);if(j.children){var p=this.convertToOptions(j.children);b.appendMany(o,p)}h.push(o)}}return h},d}),b.define("czrSelect2/data/ajax",["./array","../utils","jquery"],function(a,b,c){function d(a,b){this.ajaxOptions=this._applyDefaults(b.get("ajax")),null!=this.ajaxOptions.processResults&&(this.processResults=this.ajaxOptions.processResults),d.__super__.constructor.call(this,a,b)}return b.Extend(d,a),d.prototype._applyDefaults=function(a){var b={data:function(a){return c.extend({},a,{q:a.term})},transport:function(a,b,d){var e=c.ajax(a);return e.then(b),e.fail(d),e}};return c.extend({},b,a,!0)},d.prototype.processResults=function(a){return a},d.prototype.query=function(a,b){function d(){var d=f.transport(f,function(d){var f=e.processResults(d,a);e.options.get("debug")&&window.console&&console.error&&(f&&f.results&&c.isArray(f.results)||console.error("CzrSelect2: The AJAX results did not return an array in the `results` key of the response.")),b(f)},function(){d.status&&"0"===d.status||e.trigger("results:message",{message:"errorLoading"})});e._request=d}var e=this;null!=this._request&&(c.isFunction(this._request.abort)&&this._request.abort(),this._request=null);var f=c.extend({type:"GET"},this.ajaxOptions);"function"==typeof f.url&&(f.url=f.url.call(this.$element,a)),"function"==typeof f.data&&(f.data=f.data.call(this.$element,a)),this.ajaxOptions.delay&&null!=a.term?(this._queryTimeout&&window.clearTimeout(this._queryTimeout),this._queryTimeout=window.setTimeout(d,this.ajaxOptions.delay)):d()},d}),b.define("czrSelect2/data/tags",["jquery"],function(a){function b(b,c,d){var e=d.get("tags"),f=d.get("createTag");void 0!==f&&(this.createTag=f);var g=d.get("insertTag");if(void 0!==g&&(this.insertTag=g),b.call(this,c,d),a.isArray(e))for(var h=0;h<e.length;h++){var i=e[h],j=this._normalizeItem(i),k=this.option(j);this.$element.append(k)}}return b.prototype.query=function(a,b,c){function d(a,f){for(var g=a.results,h=0;h<g.length;h++){var i=g[h],j=null!=i.children&&!d({results:i.children},!0),k=i.text===b.term;if(k||j)return f?!1:(a.data=g,void c(a))}if(f)return!0;var l=e.createTag(b);if(null!=l){var m=e.option(l);m.attr("data-czrSelect2-tag",!0),e.addOptions([m]),e.insertTag(g,l)}a.results=g,c(a)}var e=this;return this._removeOldTags(),null==b.term||null!=b.page?void a.call(this,b,c):void a.call(this,b,d)},b.prototype.createTag=function(b,c){var d=a.trim(c.term);return""===d?null:{id:d,text:d}},b.prototype.insertTag=function(a,b,c){b.unshift(c)},b.prototype._removeOldTags=function(b){var c=(this._lastTag,this.$element.find("option[data-czrSelect2-tag]"));c.each(function(){this.selected||a(this).remove()})},b}),b.define("czrSelect2/data/tokenizer",["jquery"],function(a){function b(a,b,c){var d=c.get("tokenizer");void 0!==d&&(this.tokenizer=d),a.call(this,b,c)}return b.prototype.bind=function(a,b,c){a.call(this,b,c),this.$search=b.dropdown.$search||b.selection.$search||c.find(".czrSelect2-search__field")},b.prototype.query=function(b,c,d){function e(b){var c=g._normalizeItem(b),d=g.$element.find("option").filter(function(){return a(this).val()===c.id});if(!d.length){var e=g.option(c);e.attr("data-czrSelect2-tag",!0),g._removeOldTags(),g.addOptions([e])}f(c)}function f(a){g.trigger("select",{data:a})}var g=this;c.term=c.term||"";var h=this.tokenizer(c,this.options,e);h.term!==c.term&&(this.$search.length&&(this.$search.val(h.term),this.$search.focus()),c.term=h.term),b.call(this,c,d)},b.prototype.tokenizer=function(b,c,d,e){for(var f=d.get("tokenSeparators")||[],g=c.term,h=0,i=this.createTag||function(a){return{id:a.term,text:a.term}};h<g.length;){var j=g[h];if(-1!==a.inArray(j,f)){var k=g.substr(0,h),l=a.extend({},c,{term:k}),m=i(l);null!=m?(e(m),g=g.substr(h+1)||"",h=0):h++}else h++}return{term:g}},b}),b.define("czrSelect2/data/minimumInputLength",[],function(){function a(a,b,c){this.minimumInputLength=c.get("minimumInputLength"),a.call(this,b,c)}return a.prototype.query=function(a,b,c){return b.term=b.term||"",b.term.length<this.minimumInputLength?void this.trigger("results:message",{message:"inputTooShort",args:{minimum:this.minimumInputLength,input:b.term,params:b}}):void a.call(this,b,c)},a}),b.define("czrSelect2/data/maximumInputLength",[],function(){function a(a,b,c){this.maximumInputLength=c.get("maximumInputLength"),a.call(this,b,c)}return a.prototype.query=function(a,b,c){return b.term=b.term||"",this.maximumInputLength>0&&b.term.length>this.maximumInputLength?void this.trigger("results:message",{message:"inputTooLong",args:{maximum:this.maximumInputLength,input:b.term,params:b}}):void a.call(this,b,c)},a}),b.define("czrSelect2/data/maximumSelectionLength",[],function(){function a(a,b,c){this.maximumSelectionLength=c.get("maximumSelectionLength"),a.call(this,b,c)}return a.prototype.query=function(a,b,c){var d=this;this.current(function(e){var f=null!=e?e.length:0;return d.maximumSelectionLength>0&&f>=d.maximumSelectionLength?void d.trigger("results:message",{message:"maximumSelected",args:{maximum:d.maximumSelectionLength}}):void a.call(d,b,c)})},a}),b.define("czrSelect2/dropdown",["jquery","./utils"],function(a,b){function c(a,b){this.$element=a,this.options=b,c.__super__.constructor.call(this)}return b.Extend(c,b.Observable),c.prototype.render=function(){var b=a('<span class="czrSelect2-dropdown"><span class="czrSelect2-results"></span></span>');return b.attr("dir",this.options.get("dir")),this.$dropdown=b,b},c.prototype.bind=function(){},c.prototype.position=function(a,b){},c.prototype.destroy=function(){this.$dropdown.remove()},c}),b.define("czrSelect2/dropdown/search",["jquery","../utils"],function(a,b){function c(){}return c.prototype.render=function(b){var c=b.call(this),d=a('<span class="czrSelect2-search czrSelect2-search--dropdown"><input class="czrSelect2-search__field" type="search" tabindex="-1" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" role="textbox" /></span>');return this.$searchContainer=d,this.$search=d.find("input"),c.prepend(d),c},c.prototype.bind=function(b,c,d){var e=this;b.call(this,c,d),this.$search.on("keydown",function(a){e.trigger("keypress",a),e._keyUpPrevented=a.isDefaultPrevented()}),this.$search.on("input",function(b){a(this).off("keyup")}),this.$search.on("keyup input",function(a){e.handleSearch(a)}),c.on("open",function(){e.$search.attr("tabindex",0),e.$search.focus(),window.setTimeout(function(){e.$search.focus()},0)}),c.on("close",function(){e.$search.attr("tabindex",-1),e.$search.val("")}),c.on("focus",function(){c.isOpen()&&e.$search.focus()}),c.on("results:all",function(a){if(null==a.query.term||""===a.query.term){var b=e.showSearch(a);b?e.$searchContainer.removeClass("czrSelect2-search--hide"):e.$searchContainer.addClass("czrSelect2-search--hide")}})},c.prototype.handleSearch=function(a){if(!this._keyUpPrevented){var b=this.$search.val();this.trigger("query",{term:b})}this._keyUpPrevented=!1},c.prototype.showSearch=function(a,b){return!0},c}),b.define("czrSelect2/dropdown/hidePlaceholder",[],function(){function a(a,b,c,d){this.placeholder=this.normalizePlaceholder(c.get("placeholder")),a.call(this,b,c,d)}return a.prototype.append=function(a,b){b.results=this.removePlaceholder(b.results),a.call(this,b)},a.prototype.normalizePlaceholder=function(a,b){return"string"==typeof b&&(b={id:"",text:b}),b},a.prototype.removePlaceholder=function(a,b){for(var c=b.slice(0),d=b.length-1;d>=0;d--){var e=b[d];this.placeholder.id===e.id&&c.splice(d,1)}return c},a}),b.define("czrSelect2/dropdown/infiniteScroll",["jquery"],function(a){function b(a,b,c,d){this.lastParams={},a.call(this,b,c,d),this.$loadingMore=this.createLoadingMore(),this.loading=!1}return b.prototype.append=function(a,b){this.$loadingMore.remove(),this.loading=!1,a.call(this,b),this.showLoadingMore(b)&&this.$results.append(this.$loadingMore)},b.prototype.bind=function(b,c,d){var e=this;b.call(this,c,d),c.on("query",function(a){e.lastParams=a,e.loading=!0}),c.on("query:append",function(a){e.lastParams=a,e.loading=!0}),this.$results.on("scroll",function(){var b=a.contains(document.documentElement,e.$loadingMore[0]);if(!e.loading&&b){var c=e.$results.offset().top+e.$results.outerHeight(!1),d=e.$loadingMore.offset().top+e.$loadingMore.outerHeight(!1);c+50>=d&&e.loadMore()}})},b.prototype.loadMore=function(){this.loading=!0;var b=a.extend({},{page:1},this.lastParams);b.page++,this.trigger("query:append",b)},b.prototype.showLoadingMore=function(a,b){return b.pagination&&b.pagination.more},b.prototype.createLoadingMore=function(){var b=a('<li class="czrSelect2-results__option czrSelect2-results__option--load-more"role="treeitem" aria-disabled="true"></li>'),c=this.options.get("translations").get("loadingMore");return b.html(c(this.lastParams)),b},b}),b.define("czrSelect2/dropdown/attachBody",["jquery","../utils"],function(a,b){function c(b,c,d){this.$dropdownParent=d.get("dropdownParent")||a(document.body),b.call(this,c,d)}return c.prototype.bind=function(a,b,c){var d=this,e=!1;a.call(this,b,c),b.on("open",function(){d._showDropdown(),d._attachPositioningHandler(b),e||(e=!0,b.on("results:all",function(){d._positionDropdown(),d._resizeDropdown()}),b.on("results:append",function(){d._positionDropdown(),d._resizeDropdown()}))}),b.on("close",function(){d._hideDropdown(),d._detachPositioningHandler(b)}),this.$dropdownContainer.on("mousedown",function(a){a.stopPropagation()})},c.prototype.destroy=function(a){a.call(this),this.$dropdownContainer.remove()},c.prototype.position=function(a,b,c){b.attr("class",c.attr("class")),b.removeClass("czrSelect2"),b.addClass("czrSelect2-container--open"),b.css({position:"absolute",top:-999999}),this.$container=c},c.prototype.render=function(b){var c=a("<span></span>"),d=b.call(this);return c.append(d),this.$dropdownContainer=c,c},c.prototype._hideDropdown=function(a){this.$dropdownContainer.detach()},c.prototype._attachPositioningHandler=function(c,d){var e=this,f="scroll.czrSelect2."+d.id,g="resize.czrSelect2."+d.id,h="orientationchange.czrSelect2."+d.id,i=this.$container.parents().filter(b.hasScroll);i.each(function(){a(this).data("czrSelect2-scroll-position",{x:a(this).scrollLeft(),y:a(this).scrollTop()})}),i.on(f,function(b){var c=a(this).data("czrSelect2-scroll-position");a(this).scrollTop(c.y)}),a(window).on(f+" "+g+" "+h,function(a){e._positionDropdown(),e._resizeDropdown()})},c.prototype._detachPositioningHandler=function(c,d){var e="scroll.czrSelect2."+d.id,f="resize.czrSelect2."+d.id,g="orientationchange.czrSelect2."+d.id,h=this.$container.parents().filter(b.hasScroll);h.off(e),a(window).off(e+" "+f+" "+g)},c.prototype._positionDropdown=function(){var b=a(window),c=this.$dropdown.hasClass("czrSelect2-dropdown--above"),d=this.$dropdown.hasClass("czrSelect2-dropdown--below"),e=null,f=this.$container.offset();f.bottom=f.top+this.$container.outerHeight(!1);var g={height:this.$container.outerHeight(!1)};g.top=f.top,g.bottom=f.top+g.height;var h={height:this.$dropdown.outerHeight(!1)},i={top:b.scrollTop(),bottom:b.scrollTop()+b.height()},j=i.top<f.top-h.height,k=i.bottom>f.bottom+h.height,l={left:f.left,top:g.bottom},m=this.$dropdownParent;"static"===m.css("position")&&(m=m.offsetParent());var n=m.offset();l.top-=n.top,l.left-=n.left,c||d||(e="below"),k||!j||c?!j&&k&&c&&(e="below"):e="above",("above"==e||c&&"below"!==e)&&(l.top=g.top-n.top-h.height),null!=e&&(this.$dropdown.removeClass("czrSelect2-dropdown--below czrSelect2-dropdown--above").addClass("czrSelect2-dropdown--"+e),this.$container.removeClass("czrSelect2-container--below czrSelect2-container--above").addClass("czrSelect2-container--"+e)),this.$dropdownContainer.css(l)},c.prototype._resizeDropdown=function(){var a={width:this.$container.outerWidth(!1)+"px"};this.options.get("dropdownAutoWidth")&&(a.minWidth=a.width,a.position="relative",a.width="auto"),this.$dropdown.css(a)},c.prototype._showDropdown=function(a){this.$dropdownContainer.appendTo(this.$dropdownParent),this._positionDropdown(),this._resizeDropdown()},c}),b.define("czrSelect2/dropdown/minimumResultsForSearch",[],function(){function a(b){for(var c=0,d=0;d<b.length;d++){var e=b[d];e.children?c+=a(e.children):c++}return c}function b(a,b,c,d){this.minimumResultsForSearch=c.get("minimumResultsForSearch"),this.minimumResultsForSearch<0&&(this.minimumResultsForSearch=1/0),a.call(this,b,c,d)}return b.prototype.showSearch=function(b,c){return a(c.data.results)<this.minimumResultsForSearch?!1:b.call(this,c)},b}),b.define("czrSelect2/dropdown/selectOnClose",[],function(){function a(){}return a.prototype.bind=function(a,b,c){var d=this;a.call(this,b,c),b.on("close",function(a){d._handleSelectOnClose(a)})},a.prototype._handleSelectOnClose=function(a,b){if(b&&null!=b.originalCzrSelect2Event){var c=b.originalCzrSelect2Event;if("select"===c._type||"unselect"===c._type)return}var d=this.getHighlightedResults();if(!(d.length<1)){var e=d.data("data");null!=e.element&&e.element.selected||null==e.element&&e.selected||this.trigger("select",{data:e})}},a}),b.define("czrSelect2/dropdown/closeOnSelect",[],function(){function a(){}return a.prototype.bind=function(a,b,c){var d=this;a.call(this,b,c),b.on("select",function(a){d._selectTriggered(a)}),b.on("unselect",function(a){d._selectTriggered(a)})},a.prototype._selectTriggered=function(a,b){var c=b.originalEvent;c&&c.ctrlKey||this.trigger("close",{originalEvent:c,originalCzrSelect2Event:b})},a}),b.define("czrSelect2/i18n/en",[],function(){return{errorLoading:function(){return"The results could not be loaded."},inputTooLong:function(a){var b=a.input.length-a.maximum,c="Please delete "+b+" character";return 1!=b&&(c+="s"),c},inputTooShort:function(a){var b=a.minimum-a.input.length,c="Please enter "+b+" or more characters";return c},loadingMore:function(){return"Loading more results…"},maximumSelected:function(a){var b="You can only select "+a.maximum+" item";return 1!=a.maximum&&(b+="s"),b},noResults:function(){return"No results found"},searching:function(){return"Searching…"}}}),b.define("czrSelect2/defaults",["jquery","require","./results","./selection/single","./selection/multiple","./selection/placeholder","./selection/allowClear","./selection/search","./selection/eventRelay","./utils","./translation","./diacritics","./data/select","./data/array","./data/ajax","./data/tags","./data/tokenizer","./data/minimumInputLength","./data/maximumInputLength","./data/maximumSelectionLength","./dropdown","./dropdown/search","./dropdown/hidePlaceholder","./dropdown/infiniteScroll","./dropdown/attachBody","./dropdown/minimumResultsForSearch","./dropdown/selectOnClose","./dropdown/closeOnSelect","./i18n/en"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C){function D(){this.reset()}D.prototype.apply=function(l){if(l=a.extend(!0,{},this.defaults,l),null==l.dataAdapter){if(null!=l.ajax?l.dataAdapter=o:null!=l.data?l.dataAdapter=n:l.dataAdapter=m,l.minimumInputLength>0&&(l.dataAdapter=j.Decorate(l.dataAdapter,r)),l.maximumInputLength>0&&(l.dataAdapter=j.Decorate(l.dataAdapter,s)),l.maximumSelectionLength>0&&(l.dataAdapter=j.Decorate(l.dataAdapter,t)),l.tags&&(l.dataAdapter=j.Decorate(l.dataAdapter,p)),(null!=l.tokenSeparators||null!=l.tokenizer)&&(l.dataAdapter=j.Decorate(l.dataAdapter,q)),null!=l.query){var C=b(l.amdBase+"compat/query");l.dataAdapter=j.Decorate(l.dataAdapter,C)}if(null!=l.initSelection){var D=b(l.amdBase+"compat/initSelection");l.dataAdapter=j.Decorate(l.dataAdapter,D)}}if(null==l.resultsAdapter&&(l.resultsAdapter=c,null!=l.ajax&&(l.resultsAdapter=j.Decorate(l.resultsAdapter,x)),null!=l.placeholder&&(l.resultsAdapter=j.Decorate(l.resultsAdapter,w)),l.selectOnClose&&(l.resultsAdapter=j.Decorate(l.resultsAdapter,A))),null==l.dropdownAdapter){if(l.multiple)l.dropdownAdapter=u;else{var E=j.Decorate(u,v);l.dropdownAdapter=E}if(0!==l.minimumResultsForSearch&&(l.dropdownAdapter=j.Decorate(l.dropdownAdapter,z)),l.closeOnSelect&&(l.dropdownAdapter=j.Decorate(l.dropdownAdapter,B)),null!=l.dropdownCssClass||null!=l.dropdownCss||null!=l.adaptDropdownCssClass){var F=b(l.amdBase+"compat/dropdownCss");l.dropdownAdapter=j.Decorate(l.dropdownAdapter,F)}l.dropdownAdapter=j.Decorate(l.dropdownAdapter,y)}if(null==l.selectionAdapter){if(l.multiple?l.selectionAdapter=e:l.selectionAdapter=d,null!=l.placeholder&&(l.selectionAdapter=j.Decorate(l.selectionAdapter,f)),l.allowClear&&(l.selectionAdapter=j.Decorate(l.selectionAdapter,g)),l.multiple&&(l.selectionAdapter=j.Decorate(l.selectionAdapter,h)),null!=l.containerCssClass||null!=l.containerCss||null!=l.adaptContainerCssClass){var G=b(l.amdBase+"compat/containerCss");l.selectionAdapter=j.Decorate(l.selectionAdapter,G)}l.selectionAdapter=j.Decorate(l.selectionAdapter,i)}if("string"==typeof l.language)if(l.language.indexOf("-")>0){var H=l.language.split("-"),I=H[0];l.language=[l.language,I]}else l.language=[l.language];if(a.isArray(l.language)){var J=new k;l.language.push("en");for(var K=l.language,L=0;L<K.length;L++){var M=K[L],N={};try{N=k.loadPath(M)}catch(O){try{M=this.defaults.amdLanguageBase+M,N=k.loadPath(M)}catch(P){l.debug&&window.console&&console.warn&&console.warn('CzrSelect2: The language file for "'+M+'" could not be automatically loaded. A fallback will be used instead.');continue}}J.extend(N)}l.translations=J}else{var Q=k.loadPath(this.defaults.amdLanguageBase+"en"),R=new k(l.language);R.extend(Q),l.translations=R}return l},D.prototype.reset=function(){function b(a){function b(a){return l[a]||a}return a.replace(/[^\u0000-\u007E]/g,b)}function c(d,e){if(""===a.trim(d.term))return e;if(e.children&&e.children.length>0){for(var f=a.extend(!0,{},e),g=e.children.length-1;g>=0;g--){var h=e.children[g],i=c(d,h);null==i&&f.children.splice(g,1)}return f.children.length>0?f:c(d,f)}var j=b(e.text).toUpperCase(),k=b(d.term).toUpperCase();return j.indexOf(k)>-1?e:null}this.defaults={amdBase:"./",amdLanguageBase:"./i18n/",closeOnSelect:!0,debug:!1,dropdownAutoWidth:!1,escapeMarkup:j.escapeMarkup,language:C,matcher:c,minimumInputLength:0,maximumInputLength:0,maximumSelectionLength:0,minimumResultsForSearch:0,selectOnClose:!1,sorter:function(a){return a},templateResult:function(a){return a.text},templateSelection:function(a){return a.text},theme:"default",width:"resolve"}},D.prototype.set=function(b,c){var d=a.camelCase(b),e={};e[d]=c;var f=j._convertData(e);a.extend(this.defaults,f)};var E=new D;return E}),b.define("czrSelect2/options",["require","jquery","./defaults","./utils"],function(a,b,c,d){function e(b,e){if(this.options=b,null!=e&&this.fromElement(e),this.options=c.apply(this.options),e&&e.is("input")){var f=a(this.get("amdBase")+"compat/inputData");this.options.dataAdapter=d.Decorate(this.options.dataAdapter,f)}}return e.prototype.fromElement=function(a){var c=["czrSelect2"];null==this.options.multiple&&(this.options.multiple=a.prop("multiple")),null==this.options.disabled&&(this.options.disabled=a.prop("disabled")),null==this.options.language&&(a.prop("lang")?this.options.language=a.prop("lang").toLowerCase():a.closest("[lang]").prop("lang")&&(this.options.language=a.closest("[lang]").prop("lang"))),null==this.options.dir&&(a.prop("dir")?this.options.dir=a.prop("dir"):a.closest("[dir]").prop("dir")?this.options.dir=a.closest("[dir]").prop("dir"):this.options.dir="ltr"),a.prop("disabled",this.options.disabled),a.prop("multiple",this.options.multiple),a.data("czrSelect2Tags")&&(this.options.debug&&window.console&&console.warn&&console.warn('CzrSelect2: The `data-czrSelect2-tags` attribute has been changed to use the `data-data` and `data-tags="true"` attributes and will be removed in future versions of CzrSelect2.'),a.data("data",a.data("czrSelect2Tags")),a.data("tags",!0)),a.data("ajaxUrl")&&(this.options.debug&&window.console&&console.warn&&console.warn("CzrSelect2: The `data-ajax-url` attribute has been changed to `data-ajax--url` and support for the old attribute will be removed in future versions of CzrSelect2."),a.attr("ajax--url",a.data("ajaxUrl")),a.data("ajax--url",a.data("ajaxUrl")));var e={};e=b.fn.jquery&&"1."==b.fn.jquery.substr(0,2)&&a[0].dataset?b.extend(!0,{},a[0].dataset,a.data()):a.data();var f=b.extend(!0,{},e);f=d._convertData(f);for(var g in f)b.inArray(g,c)>-1||(b.isPlainObject(this.options[g])?b.extend(this.options[g],f[g]):this.options[g]=f[g]);return this},e.prototype.get=function(a){return this.options[a]},e.prototype.set=function(a,b){this.options[a]=b},e}),b.define("czrSelect2/core",["jquery","./options","./utils","./keys"],function(a,b,c,d){var e=function(a,c){null!=a.data("czrSelect2")&&a.data("czrSelect2").destroy(),this.$element=a,this.id=this._generateId(a),c=c||{},this.options=new b(c,a),e.__super__.constructor.call(this);var d=a.attr("tabindex")||0;a.data("old-tabindex",d),a.attr("tabindex","-1");var f=this.options.get("dataAdapter");this.dataAdapter=new f(a,this.options);var g=this.render();this._placeContainer(g);var h=this.options.get("selectionAdapter");this.selection=new h(a,this.options),this.$selection=this.selection.render(),this.selection.position(this.$selection,g);var i=this.options.get("dropdownAdapter");this.dropdown=new i(a,this.options),this.$dropdown=this.dropdown.render(),this.dropdown.position(this.$dropdown,g);var j=this.options.get("resultsAdapter");this.results=new j(a,this.options,this.dataAdapter),this.$results=this.results.render(),this.results.position(this.$results,this.$dropdown);var k=this;this._bindAdapters(),this._registerDomEvents(),this._registerDataEvents(),this._registerSelectionEvents(),this._registerDropdownEvents(),this._registerResultsEvents(),this._registerEvents(),this.dataAdapter.current(function(a){k.trigger("selection:update",{data:a})}),a.addClass("czrSelect2-hidden-accessible"),a.attr("aria-hidden","true"),this._syncAttributes(),a.data("czrSelect2",this)};return c.Extend(e,c.Observable),e.prototype._generateId=function(a){var b="";return b=null!=a.attr("id")?a.attr("id"):null!=a.attr("name")?a.attr("name")+"-"+c.generateChars(2):c.generateChars(4),b=b.replace(/(:|\.|\[|\]|,)/g,""),b="czrSelect2-"+b},e.prototype._placeContainer=function(a){a.insertAfter(this.$element);var b=this._resolveWidth(this.$element,this.options.get("width"));null!=b&&a.css("width",b)},e.prototype._resolveWidth=function(a,b){var c=/^width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i;if("resolve"==b){var d=this._resolveWidth(a,"style");return null!=d?d:this._resolveWidth(a,"element")}if("element"==b){var e=a.outerWidth(!1);return 0>=e?"auto":e+"px"}if("style"==b){var f=a.attr("style");if("string"!=typeof f)return null;for(var g=f.split(";"),h=0,i=g.length;i>h;h+=1){var j=g[h].replace(/\s/g,""),k=j.match(c);if(null!==k&&k.length>=1)return k[1]}return null}return b},e.prototype._bindAdapters=function(){this.dataAdapter.bind(this,this.$container),this.selection.bind(this,this.$container),this.dropdown.bind(this,this.$container),this.results.bind(this,this.$container)},e.prototype._registerDomEvents=function(){var b=this;this.$element.on("change.czrSelect2",function(){b.dataAdapter.current(function(a){b.trigger("selection:update",{data:a})})}),this.$element.on("focus.czrSelect2",function(a){b.trigger("focus",a)}),this._syncA=c.bind(this._syncAttributes,this),this._syncS=c.bind(this._syncSubtree,this),this.$element[0].attachEvent&&this.$element[0].attachEvent("onpropertychange",this._syncA);var d=window.MutationObserver||window.WebKitMutationObserver||window.MozMutationObserver;null!=d?(this._observer=new d(function(c){a.each(c,b._syncA),a.each(c,b._syncS)}),this._observer.observe(this.$element[0],{attributes:!0,childList:!0,subtree:!1})):this.$element[0].addEventListener&&(this.$element[0].addEventListener("DOMAttrModified",b._syncA,!1),this.$element[0].addEventListener("DOMNodeInserted",b._syncS,!1),this.$element[0].addEventListener("DOMNodeRemoved",b._syncS,!1))},e.prototype._registerDataEvents=function(){var a=this;this.dataAdapter.on("*",function(b,c){a.trigger(b,c)})},e.prototype._registerSelectionEvents=function(){var b=this,c=["toggle","focus"];this.selection.on("toggle",function(){b.toggleDropdown()}),this.selection.on("focus",function(a){b.focus(a)}),this.selection.on("*",function(d,e){-1===a.inArray(d,c)&&b.trigger(d,e)})},e.prototype._registerDropdownEvents=function(){var a=this;this.dropdown.on("*",function(b,c){a.trigger(b,c)})},e.prototype._registerResultsEvents=function(){var a=this;this.results.on("*",function(b,c){a.trigger(b,c)})},e.prototype._registerEvents=function(){var a=this;this.on("open",function(){a.$container.addClass("czrSelect2-container--open")}),this.on("close",function(){a.$container.removeClass("czrSelect2-container--open")}),this.on("enable",function(){a.$container.removeClass("czrSelect2-container--disabled")}),this.on("disable",function(){a.$container.addClass("czrSelect2-container--disabled")}),this.on("blur",function(){a.$container.removeClass("czrSelect2-container--focus")}),this.on("query",function(b){a.isOpen()||a.trigger("open",{}),this.dataAdapter.query(b,function(c){a.trigger("results:all",{data:c,query:b})})}),this.on("query:append",function(b){this.dataAdapter.query(b,function(c){a.trigger("results:append",{data:c,query:b})})}),this.on("keypress",function(b){var c=b.which;a.isOpen()?c===d.ESC||c===d.TAB||c===d.UP&&b.altKey?(a.close(),b.preventDefault()):c===d.ENTER?(a.trigger("results:select",{}),b.preventDefault()):c===d.SPACE&&b.ctrlKey?(a.trigger("results:toggle",{}),b.preventDefault()):c===d.UP?(a.trigger("results:previous",{}),b.preventDefault()):c===d.DOWN&&(a.trigger("results:next",{}),b.preventDefault()):(c===d.ENTER||c===d.SPACE||c===d.DOWN&&b.altKey)&&(a.open(),b.preventDefault())})},e.prototype._syncAttributes=function(){this.options.set("disabled",this.$element.prop("disabled")),this.options.get("disabled")?(this.isOpen()&&this.close(),this.trigger("disable",{})):this.trigger("enable",{})},e.prototype._syncSubtree=function(a,b){var c=!1,d=this;if(!a||!a.target||"OPTION"===a.target.nodeName||"OPTGROUP"===a.target.nodeName){if(b)if(b.addedNodes&&b.addedNodes.length>0)for(var e=0;e<b.addedNodes.length;e++){var f=b.addedNodes[e];f.selected&&(c=!0)}else b.removedNodes&&b.removedNodes.length>0&&(c=!0);else c=!0;c&&this.dataAdapter.current(function(a){d.trigger("selection:update",{data:a})})}},e.prototype.trigger=function(a,b){var c=e.__super__.trigger,d={open:"opening",close:"closing",select:"selecting",unselect:"unselecting"};if(void 0===b&&(b={}),a in d){var f=d[a],g={prevented:!1,name:a,args:b};if(c.call(this,f,g),g.prevented)return void(b.prevented=!0)}c.call(this,a,b)},e.prototype.toggleDropdown=function(){this.options.get("disabled")||(this.isOpen()?this.close():this.open())},e.prototype.open=function(){this.isOpen()||this.trigger("query",{})},e.prototype.close=function(){this.isOpen()&&this.trigger("close",{})},e.prototype.isOpen=function(){return this.$container.hasClass("czrSelect2-container--open")},e.prototype.hasFocus=function(){return this.$container.hasClass("czrSelect2-container--focus")},e.prototype.focus=function(a){this.hasFocus()||(this.$container.addClass("czrSelect2-container--focus"),this.trigger("focus",{}))},e.prototype.enable=function(a){this.options.get("debug")&&window.console&&console.warn&&console.warn('CzrSelect2: The `czrSelect2("enable")` method has been deprecated and will be removed in later CzrSelect2 versions. Use $element.prop("disabled") instead.'),(null==a||0===a.length)&&(a=[!0]);var b=!a[0];this.$element.prop("disabled",b)},e.prototype.data=function(){this.options.get("debug")&&arguments.length>0&&window.console&&console.warn&&console.warn('CzrSelect2: Data can no longer be set using `czrSelect2("data")`. You should consider setting the value instead using `$element.val()`.');var a=[];return this.dataAdapter.current(function(b){a=b}),a},e.prototype.val=function(b){if(this.options.get("debug")&&window.console&&console.warn&&console.warn('CzrSelect2: The `czrSelect2("val")` method has been deprecated and will be removed in later CzrSelect2 versions. Use $element.val() instead.'),null==b||0===b.length)return this.$element.val();var c=b[0];a.isArray(c)&&(c=a.map(c,function(a){return a.toString()})),this.$element.val(c).trigger("change")},e.prototype.destroy=function(){this.$container.remove(),this.$element[0].detachEvent&&this.$element[0].detachEvent("onpropertychange",this._syncA),null!=this._observer?(this._observer.disconnect(),this._observer=null):this.$element[0].removeEventListener&&(this.$element[0].removeEventListener("DOMAttrModified",this._syncA,!1),this.$element[0].removeEventListener("DOMNodeInserted",this._syncS,!1),this.$element[0].removeEventListener("DOMNodeRemoved",this._syncS,!1)),this._syncA=null,this._syncS=null,this.$element.off(".czrSelect2"),this.$element.attr("tabindex",this.$element.data("old-tabindex")),this.$element.removeClass("czrSelect2-hidden-accessible"),this.$element.attr("aria-hidden","false"),this.$element.removeData("czrSelect2"),this.dataAdapter.destroy(),this.selection.destroy(),this.dropdown.destroy(),this.results.destroy(),this.dataAdapter=null,this.selection=null,this.dropdown=null,this.results=null;
},e.prototype.render=function(){var b=a('<span class="czrSelect2 czrSelect2-container"><span class="selection"></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>');return b.attr("dir",this.options.get("dir")),this.$container=b,this.$container.addClass("czrSelect2-container--"+this.options.get("theme")),b.data("element",this.$element),b},e}),b.define("jquery-mousewheel",["jquery"],function(a){return a}),b.define("jquery.czrSelect2",["jquery","jquery-mousewheel","./czrSelect2/core","./czrSelect2/defaults"],function(a,b,c,d){if(null==a.fn.czrSelect2){var e=["open","close","destroy"];a.fn.czrSelect2=function(b){if(b=b||{},"object"==typeof b)return this.each(function(){var d=a.extend(!0,{},b);new c(a(this),d)}),this;if("string"==typeof b){var d,f=Array.prototype.slice.call(arguments,1);return this.each(function(){var c=a(this).data("czrSelect2");null==c&&window.console&&console.error&&console.error("The czrSelect2('"+b+"') method was called on an element that is not using CzrSelect2."),d=c[b].apply(c,f)}),a.inArray(b,e)>-1?this:d}throw new Error("Invalid arguments for CzrSelect2: "+b)}}return null==a.fn.czrSelect2.defaults&&(a.fn.czrSelect2.defaults=d),c}),{define:b.define,require:b.require}}(),c=b.require("jquery.czrSelect2");return a.fn.czrSelect2.amd=b,c});/*! rangeslider.js - v2.3.2 | (c) 2018 @andreruffert | MIT license | https://github.com/andreruffert/rangeslider.js */
!function(a){"use strict";"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?module.exports=a(require("jquery")):a(jQuery)}(function(a){"use strict";function b(){var a=document.createElement("input");return a.setAttribute("type","range"),"text"!==a.type}function c(a,b){var c=Array.prototype.slice.call(arguments,2);return setTimeout(function(){return a.apply(null,c)},b)}function d(a,b){return b=b||100,function(){if(!a.debouncing){var c=Array.prototype.slice.apply(arguments);a.lastReturnVal=a.apply(window,c),a.debouncing=!0}return clearTimeout(a.debounceTimeout),a.debounceTimeout=setTimeout(function(){a.debouncing=!1},b),a.lastReturnVal}}function e(a){return a&&(0===a.offsetWidth||0===a.offsetHeight||!1===a.open)}function f(a){for(var b=[],c=a.parentNode;e(c);)b.push(c),c=c.parentNode;return b}function g(a,b){function c(a){void 0!==a.open&&(a.open=!a.open)}var d=f(a),e=d.length,g=[],h=a[b];if(e){for(var i=0;i<e;i++)g[i]=d[i].style.cssText,d[i].style.setProperty?d[i].style.setProperty("display","block","important"):d[i].style.cssText+=";display: block !important",d[i].style.height="0",d[i].style.overflow="hidden",d[i].style.visibility="hidden",c(d[i]);h=a[b];for(var j=0;j<e;j++)d[j].style.cssText=g[j],c(d[j])}return h}function h(a,b){var c=parseFloat(a);return Number.isNaN(c)?b:c}function i(a){return a.charAt(0).toUpperCase()+a.substr(1)}function j(b,e){if(this.$window=a(window),this.$document=a(document),this.$element=a(b),this.options=a.extend({},n,e),this.polyfill=this.options.polyfill,this.orientation=this.$element[0].getAttribute("data-orientation")||this.options.orientation,this.onInit=this.options.onInit,this.onSlide=this.options.onSlide,this.onSlideEnd=this.options.onSlideEnd,this.DIMENSION=o.orientation[this.orientation].dimension,this.DIRECTION=o.orientation[this.orientation].direction,this.DIRECTION_STYLE=o.orientation[this.orientation].directionStyle,this.COORDINATE=o.orientation[this.orientation].coordinate,this.polyfill&&m)return!1;this.identifier="js-"+k+"-"+l++,this.startEvent=this.options.startEvent.join("."+this.identifier+" ")+"."+this.identifier,this.moveEvent=this.options.moveEvent.join("."+this.identifier+" ")+"."+this.identifier,this.endEvent=this.options.endEvent.join("."+this.identifier+" ")+"."+this.identifier,this.toFixed=(this.step+"").replace(".","").length-1,this.$fill=a('<div class="'+this.options.fillClass+'" />'),this.$handle=a('<div class="'+this.options.handleClass+'" />'),this.$range=a('<div class="'+this.options.rangeClass+" "+this.options[this.orientation+"Class"]+'" id="'+this.identifier+'" />').insertAfter(this.$element).prepend(this.$fill,this.$handle),this.$element.css({position:"absolute",width:"1px",height:"1px",overflow:"hidden",opacity:"0"}),this.handleDown=a.proxy(this.handleDown,this),this.handleMove=a.proxy(this.handleMove,this),this.handleEnd=a.proxy(this.handleEnd,this),this.init();var f=this;this.$window.on("resize."+this.identifier,d(function(){c(function(){f.update(!1,!1)},300)},20)),this.$document.on(this.startEvent,"#"+this.identifier+":not(."+this.options.disabledClass+")",this.handleDown),this.$element.on("change."+this.identifier,function(a,b){if(!b||b.origin!==f.identifier){var c=a.target.value,d=f.getPositionFromValue(c);f.setPosition(d)}})}Number.isNaN=Number.isNaN||function(a){return"number"==typeof a&&a!==a};var k="rangeslider",l=0,m=b(),n={polyfill:!0,orientation:"horizontal",rangeClass:"rangeslider",disabledClass:"rangeslider--disabled",activeClass:"rangeslider--active",horizontalClass:"rangeslider--horizontal",verticalClass:"rangeslider--vertical",fillClass:"rangeslider__fill",handleClass:"rangeslider__handle",startEvent:["mousedown","touchstart","pointerdown"],moveEvent:["mousemove","touchmove","pointermove"],endEvent:["mouseup","touchend","pointerup"]},o={orientation:{horizontal:{dimension:"width",direction:"left",directionStyle:"left",coordinate:"x"},vertical:{dimension:"height",direction:"top",directionStyle:"bottom",coordinate:"y"}}};return j.prototype.init=function(){this.update(!0,!1),this.onInit&&"function"==typeof this.onInit&&this.onInit()},j.prototype.update=function(a,b){a=a||!1,a&&(this.min=h(this.$element[0].getAttribute("min"),0),this.max=h(this.$element[0].getAttribute("max"),100),this.value=h(this.$element[0].value,Math.round(this.min+(this.max-this.min)/2)),this.step=h(this.$element[0].getAttribute("step"),1)),this.handleDimension=g(this.$handle[0],"offset"+i(this.DIMENSION)),this.rangeDimension=g(this.$range[0],"offset"+i(this.DIMENSION)),this.maxHandlePos=this.rangeDimension-this.handleDimension,this.grabPos=this.handleDimension/2,this.position=this.getPositionFromValue(this.value),this.$element[0].disabled?this.$range.addClass(this.options.disabledClass):this.$range.removeClass(this.options.disabledClass),this.setPosition(this.position,b)},j.prototype.handleDown=function(a){if(a.preventDefault(),!(a.button&&0!==a.button||(this.$document.on(this.moveEvent,this.handleMove),this.$document.on(this.endEvent,this.handleEnd),this.$range.addClass(this.options.activeClass),(" "+a.target.className+" ").replace(/[\n\t]/g," ").indexOf(this.options.handleClass)>-1))){var b=this.getRelativePosition(a),c=this.$range[0].getBoundingClientRect()[this.DIRECTION],d=this.getPositionFromNode(this.$handle[0])-c,e="vertical"===this.orientation?this.maxHandlePos-(b-this.grabPos):b-this.grabPos;this.setPosition(e),b>=d&&b<d+this.handleDimension&&(this.grabPos=b-d)}},j.prototype.handleMove=function(a){a.preventDefault();var b=this.getRelativePosition(a),c="vertical"===this.orientation?this.maxHandlePos-(b-this.grabPos):b-this.grabPos;this.setPosition(c)},j.prototype.handleEnd=function(a){a.preventDefault(),this.$document.off(this.moveEvent,this.handleMove),this.$document.off(this.endEvent,this.handleEnd),this.$range.removeClass(this.options.activeClass),this.$element.trigger("change",{origin:this.identifier}),this.onSlideEnd&&"function"==typeof this.onSlideEnd&&this.onSlideEnd(this.position,this.value)},j.prototype.cap=function(a,b,c){return a<b?b:a>c?c:a},j.prototype.setPosition=function(a,b){var c,d;void 0===b&&(b=!0),c=this.getValueFromPosition(this.cap(a,0,this.maxHandlePos)),d=this.getPositionFromValue(c),this.$fill[0].style[this.DIMENSION]=d+this.grabPos+"px",this.$handle[0].style[this.DIRECTION_STYLE]=d+"px",this.setValue(c),this.position=d,this.value=c,b&&this.onSlide&&"function"==typeof this.onSlide&&this.onSlide(d,c)},j.prototype.getPositionFromNode=function(a){for(var b=0;null!==a;)b+=a.offsetLeft,a=a.offsetParent;return b},j.prototype.getRelativePosition=function(a){var b=i(this.COORDINATE),c=this.$range[0].getBoundingClientRect()[this.DIRECTION],d=0;return void 0!==a.originalEvent["client"+b]?d=a.originalEvent["client"+b]:a.originalEvent.touches&&a.originalEvent.touches[0]&&void 0!==a.originalEvent.touches[0]["client"+b]?d=a.originalEvent.touches[0]["client"+b]:a.currentPoint&&void 0!==a.currentPoint[this.COORDINATE]&&(d=a.currentPoint[this.COORDINATE]),d-c},j.prototype.getPositionFromValue=function(a){var b;return b=(a-this.min)/(this.max-this.min),Number.isNaN(b)?0:b*this.maxHandlePos},j.prototype.getValueFromPosition=function(a){var b,c;return b=a/(this.maxHandlePos||1),c=this.step*Math.round(b*(this.max-this.min)/this.step)+this.min,Number(c.toFixed(this.toFixed))},j.prototype.setValue=function(a){a===this.value&&""!==this.$element[0].value||this.$element.val(a).trigger("input",{origin:this.identifier})},j.prototype.destroy=function(){this.$document.off("."+this.identifier),this.$window.off("."+this.identifier),this.$element.off("."+this.identifier).removeAttr("style").removeData("plugin_"+k),this.$range&&this.$range.length&&this.$range[0].parentNode.removeChild(this.$range[0])},a.fn[k]=function(b){var c=Array.prototype.slice.call(arguments,1);return this.each(function(){var d=a(this),e=d.data("plugin_"+k);e||d.data("plugin_"+k,e=new j(this,b)),"string"==typeof b&&e[b].apply(e,c)})},"rangeslider.js is available in jQuery context e.g $(selector).rangeslider(options);"});/*! wp-color-picker-alpha 2.1.3, https://github.com/kallookoo/wp-color-picker-alpha, GPLv2 Licensed */
(function($){if($.wp.wpColorPicker.prototype._hasAlpha){return}var image='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAAHnlligAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAHJJREFUeNpi+P///4EDBxiAGMgCCCAGFB5AADGCRBgYDh48CCRZIJS9vT2QBAggFBkmBiSAogxFBiCAoHogAKIKAlBUYTELAiAmEtABEECk20G6BOmuIl0CIMBQ/IEMkO0myiSSraaaBhZcbkUOs0HuBwDplz5uFJ3Z4gAAAABJRU5ErkJggg==',_after='<div class="wp-picker-holder" />',_wrap='<div class="wp-picker-container" />',_button='<input type="button" class="button button-small" />',_deprecated=(wpColorPickerL10n.current!==undefined);if(_deprecated){var _before='<a tabindex="0" class="wp-color-result" />'}else{var _before='<button type="button" class="button wp-color-result" aria-expanded="false"><span class="wp-color-result-text"></span></button>',_wrappingLabel='<label></label>',_wrappingLabelText='<span class="screen-reader-text"></span>'}Color.fn.toString=function(){if(this._alpha<1){return this.toCSS('rgba',this._alpha).replace(/\s+/g,'')}var hex=parseInt(this._color,10).toString(16);if(this.error){return ''}if(hex.length<6){hex=('00000'+hex).substr(-6)}return '#'+hex};$.widget('wp.wpColorPicker',$.wp.wpColorPicker,{_hasAlpha:true,_create:function(){if(!$.support.iris){return}var self=this,el=self.element;$.extend(self.options,el.data());if(self.options.type==='hue'){return self._createHueOnly()}self.close=$.proxy(self.close,self);self.initialValue=el.val();el.addClass('wp-color-picker');if(_deprecated){el.hide().wrap(_wrap);self.wrap=el.parent();self.toggler=$(_before).insertBefore(el).css({backgroundColor:self.initialValue}).attr('title',wpColorPickerL10n.pick).attr('data-current',wpColorPickerL10n.current);self.pickerContainer=$(_after).insertAfter(el);self.button=$(_button).addClass('hidden')}else{if(!el.parent('label').length){el.wrap(_wrappingLabel);self.wrappingLabelText=$(_wrappingLabelText).insertBefore(el).text(wpColorPickerL10n.defaultLabel)}self.wrappingLabel=el.parent();self.wrappingLabel.wrap(_wrap);self.wrap=self.wrappingLabel.parent();self.toggler=$(_before).insertBefore(self.wrappingLabel).css({backgroundColor:self.initialValue});self.toggler.find('.wp-color-result-text').text(wpColorPickerL10n.pick);self.pickerContainer=$(_after).insertAfter(self.wrappingLabel);self.button=$(_button)}if(self.options.defaultColor){self.button.addClass('wp-picker-default').val(wpColorPickerL10n.defaultString);if(!_deprecated){self.button.attr('aria-label',wpColorPickerL10n.defaultAriaLabel)}}else{self.button.addClass('wp-picker-clear').val(wpColorPickerL10n.clear);if(!_deprecated){self.button.attr('aria-label',wpColorPickerL10n.clearAriaLabel)}}if(_deprecated){el.wrap('<span class="wp-picker-input-wrap" />').after(self.button)}else{self.wrappingLabel.wrap('<span class="wp-picker-input-wrap hidden" />').after(self.button);self.inputWrapper=el.closest('.wp-picker-input-wrap')}el.iris({target:self.pickerContainer,hide:self.options.hide,width:self.options.width,mode:self.options.mode,palettes:self.options.palettes,change:function(event,ui){if(self.options.alpha){self.toggler.css({'background-image':'url('+image+')'});if(_deprecated){self.toggler.html('<span class="color-alpha" />')}else{self.toggler.css({'position':'relative'});if(self.toggler.find('span.color-alpha').length==0){self.toggler.append('<span class="color-alpha" />')}}self.toggler.find('span.color-alpha').css({'width':'30px','height':'24px','position':'absolute','top':0,'left':0,'border-top-left-radius':'2px','border-bottom-left-radius':'2px','background':ui.color.toString()})}else{self.toggler.css({backgroundColor:ui.color.toString()})}if($.isFunction(self.options.change)){self.options.change.call(this,event,ui)}}});el.val(self.initialValue);self._addListeners();if(!self.options.hide){self.toggler.click()}el.on('czr-colorpicker-close',function(){if(self.toggler.hasClass('wp-picker-open')){self.close()}})},_addListeners:function(){var self=this;self.wrap.on('click.wpcolorpicker',function(event){event.stopPropagation()});self.toggler.click(function(){if(self.toggler.hasClass('wp-picker-open')){self.close()}else{self.open()}});self.element.on('change',function(event){if($(this).val()===''||self.element.hasClass('iris-error')){if(self.options.alpha){if(_deprecated){self.toggler.removeAttr('style')}self.toggler.find('span.color-alpha').css('backgroundColor','')}else{self.toggler.css('backgroundColor','')}if($.isFunction(self.options.clear)){self.options.clear.call(this,event)}}});self.button.on('click',function(event){if($(this).hasClass('wp-picker-clear')){self.element.val('');if(self.options.alpha){if(_deprecated){self.toggler.removeAttr('style')}self.toggler.find('span.color-alpha').css('backgroundColor','')}else{self.toggler.css('backgroundColor','')}if($.isFunction(self.options.clear)){self.options.clear.call(this,event)}}else if($(this).hasClass('wp-picker-default')){self.element.val(self.options.defaultColor).change()}})},open:function(){var self=this;$('body').find('.wp-color-picker').not(self.element).each(function(){$(this).trigger('czr-colorpicker-close')});this.element.iris('toggle');this.inputWrapper.removeClass('hidden');this.wrap.addClass('wp-picker-active');this.toggler.addClass('wp-picker-open').attr('aria-expanded','true')},close:function(){try{this.element.iris('toggle')}catch(er){console.log('color-picker => error on ::close()',er)}this.inputWrapper.addClass('hidden');this.wrap.removeClass('wp-picker-active');this.toggler.removeClass('wp-picker-open').attr('aria-expanded','false');}});$.widget('a8c.iris',$.a8c.iris,{_create:function(){this._super();this.options.alpha=this.element.data('alpha')||false;if(!this.element.is(':input')){this.options.alpha=false}if(typeof this.options.alpha!=='undefined'&&this.options.alpha){var self=this,el=self.element,_html='<div class="iris-strip iris-slider iris-alpha-slider"><div class="iris-slider-offset iris-slider-offset-alpha"></div></div>',aContainer=$(_html).appendTo(self.picker.find('.iris-picker-inner')),aSlider=aContainer.find('.iris-slider-offset-alpha'),controls={aContainer:aContainer,aSlider:aSlider};if(typeof el.data('custom-width')!=='undefined'){self.options.customWidth=parseInt(el.data('custom-width'))||0}else{self.options.customWidth=100}self.options.defaultWidth=el.width();if(self._color._alpha<1||self._color.toString().indexOf('rgb')!=-1){el.width(parseInt(self.options.defaultWidth+self.options.customWidth))}$.each(controls,function(k,v){self.controls[k]=v});self.controls.square.css({'margin-right':'0'});var emptyWidth=(self.picker.width()-self.controls.square.width()-20),stripsMargin=(emptyWidth/6),stripsWidth=((emptyWidth/2)-stripsMargin);$.each(['aContainer','strip'],function(k,v){self.controls[v].width(stripsWidth).css({'margin-left':stripsMargin+'px'})});self._initControls();self._change()}},_initControls:function(){this._super();if(this.options.alpha){var self=this,controls=self.controls;controls.aSlider.slider({orientation:'vertical',min:0,max:100,step:1,value:parseInt(self._color._alpha*100),slide:function(event,ui){self._color._alpha=parseFloat(ui.value/100);self._change.apply(self,arguments)}})}},_change:function(){this._super();var self=this,el=self.element;if(this.options.alpha){var controls=self.controls,alpha=parseInt(self._color._alpha*100),color=self._color.toRgb(),gradient=['rgb('+color.r+','+color.g+','+color.b+') 0%','rgba('+color.r+','+color.g+','+color.b+', 0) 100%'],defaultWidth=self.options.defaultWidth,customWidth=self.options.customWidth,target=self.picker.closest('.wp-picker-container').find('.wp-color-result');controls.aContainer.css({'background':'linear-gradient(to bottom, '+gradient.join(', ')+'), url('+image+')'});if(target.hasClass('wp-picker-open')){controls.aSlider.slider('value',alpha);if(self._color._alpha<1){controls.strip.attr('style',controls.strip.attr('style').replace(/rgba\(([0-9]+,)(\s+)?([0-9]+,)(\s+)?([0-9]+)(,(\s+)?[0-9\.]+)\)/g,'rgb($1$3$5)'));el.width(parseInt(defaultWidth+customWidth))}else{el.width(defaultWidth)}}}var reset=el.data('reset-alpha')||false;if(reset){self.picker.find('.iris-palette-container').on('click.palette','.iris-palette',function(){self._color._alpha=1;self.active='external';self._change()})}},_addInputListeners:function(input){var self=this,debounceTimeout=100,callback=function(event){var color=new Color(input.val()),val=input.val();input.removeClass('iris-error');if(color.error){if(val!==''){input.addClass('iris-error')}}else{if(color.toString()!==self._color.toString()){if(!(event.type==='keyup'&&val.match(/^[0-9a-fA-F]{3}$/))){self._setOption('color',color.toString())}}}};input.on('change',callback).on('keyup',self._debounce(callback,debounceTimeout));if(self.options.hide){input.on('focus',function(){self.show()})}}})}(jQuery));
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
( function ( api, $, _ ) {
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
      api.consoleLog = function() {
            if ( ! serverControlParams.isDevMode )
              return;
            if ( ( _.isUndefined( console ) && typeof window.console.log != 'function' ) )
              return;
            console.log.apply( console, _prettyPrintLog( { consoleArguments : arguments } ) );
            console.log( 'Unstyled console message : ', arguments );
      };

      api.errorLog = function() {
            if ( ( _.isUndefined( console ) && typeof window.console.log != 'function' ) )
              return;

            console.log.apply( console, _prettyPrintLog( { bgCol : '#ffd5a0', textCol : '#000', consoleArguments : arguments } ) );
      };

      api.errare = function( title, msg ) { _wrapLogInsideTags( title, msg, '#ffd5a0' ); };
      api.infoLog = function( title, msg ) { _wrapLogInsideTags( title, msg, '#5ed1f5' ); };

      api.czr_isChangeSetOn = function() {
            return serverControlParams.isChangeSetOn && true === true;//&& true === true is just there to hackily cast the returned value as boolean.
      };
})( wp.customize , jQuery, _);
( function ( api, $, _ ) {
      api.bind('ready', function() {
            var _do = function() {
                  if ( _.isUndefined( window.themeServerControlParams ) || _.isUndefined( themeServerControlParams.isThemeSwitchOn ) )
                    return;

                  if ( ! themeServerControlParams.isThemeSwitchOn ) {
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


            var _storeCurrentSection = function( expanded, section_id ) {
                  api.czr_activeSectionId( expanded ? section_id : '' );
            };
            api.section.each( function( _sec ) {
                  if ( 'publish_settings' == _sec.id )
                    return;
                  _sec.expanded.bind( function( expanded ) { _storeCurrentSection( expanded, _sec.id ); } );
            });
            api.section.bind( 'add', function( section_instance ) {
                  if ( 'publish_settings' == section_instance.id )
                    return;
                  section_instance.expanded.bind( function( expanded ) { _storeCurrentSection( expanded, section_instance.id ); } );
            });

            var _storeCurrentPanel = function( expanded, panel_id ) {
                  api.czr_activePanelId( expanded ? panel_id : '' );
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
          var dynRegistrationCandidates = serverControlParams.paramsForDynamicRegistration || [];
          if ( ! _.isObject( serverControlParams.paramsForDynamicRegistration ) ) {
                api.errorLog( 'serverControlParams.paramsForDynamicRegistration should be an array');
          }

          _.each( serverControlParams.paramsForDynamicRegistration, function( dynParams, setId ) {
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
      var registerDynamicModuleSettingControl = function( args ) {
            args = _.extend( {
                  'setting_id' : '',
                  'module_type' : '',
                  'option_value'  : [],
                  'setting' : {},
                  'section' : { id : '', title : '' },
                  'control' : {},

            }, args );
            if ( _.isEmpty( args.setting_id ) || _.isEmpty( args.module_type ) ) {
                  api.errare( 'registerDynamicModuleSettingControl => args', args );
                  throw new Error( 'registerDynamicModuleSettingControl => missing params when registrating a setting');
            }
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
            var sectionArgs = args.section;
            if ( ! _.isEmpty( sectionArgs ) ) {
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
            var controlId = settingId,
                controlArgs = args.control,
                ctrlSectionId;
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
      api.Value.prototype.set = function( to, o ) {
            var from = this._value, dfd = $.Deferred(), self = this, _promises = [];

            to = this._setter.apply( this, arguments );
            to = this.validate( to );
            args = _.extend( { silent : false }, _.isObject( o ) ? o : {} );
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
      api.Value.prototype.bind = function() {
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
      api.Setting.prototype.silent_set =function( to, dirtyness ) {
            var from = this._value,
                _save_state = api.state('saved')();

            to = this._setter.apply( this, arguments );
            to = this.validate( to );
            if ( null === to || _.isEqual( from, to ) ) {
              return this;
            }

            this._value = to;
            this._dirty = ( _.isUndefined( dirtyness ) || ! _.isBoolean( dirtyness ) ) ? this._dirty : dirtyness;

            this.callbacks.fireWith( this, [ to, from, { silent : true } ] );
            api.state('saved')( _save_state );
            return this;
      };
})( wp.customize , jQuery, _ );
( function ( api, $, _ ) {
      api.Setting.prototype.preview = function( to, from , data ) {
            var setting = this, transport, dfd = $.Deferred();

            transport = setting.transport;
            if ( ! _.isUndefined( from ) && ! _.isEmpty( from ) && ! _.isNull( from ) ) {
                  if ( _.isObject( data ) && true === data.not_preview_sent ) {
                        return dfd.resolve( arguments ).promise();
                  }
            }
            if ( _.has( data, 'silent' ) && false !== data.silent )
              return dfd.resolve( arguments ).promise();
            if ( 'postMessage' === transport && ! api.state( 'previewerAlive' ).get() ) {
                  transport = 'refresh';
            }

            if ( 'postMessage' === transport ) {
                  setting.previewer.send( 'pre_setting', {
                        set_id : setting.id,
                        data   : data,//<= { module_id : 'string', module : {} } which typically includes the module_id and the module model ( items, mod options )
                        value  : to
                  });
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
      if ( 'function' == typeof api.Section ) {
            var _original_section_initialize = api.Section.prototype.initialize;
            api.Section.prototype.initialize = function( id, options ) {
                  _original_section_initialize.apply( this, [id, options] );
                  var section = this;

                  this.expanded.callbacks.add( function( _expanded ) {
                    if ( ! _expanded )
                      return;

                  var container = section.container.closest( '.wp-full-overlay-sidebar-content' ),
                        content = section.container.find( '.accordion-section-content' );
                    _resizeContentHeight = function() {
                      content.css( 'height', container.innerHeight() );
                  };
                    _resizeContentHeight();
                    $( window ).on( 'resize.customizer-section', _.debounce( _resizeContentHeight, 110 ) );
                  });
            };
      }
})( wp.customize , jQuery, _ );
(function (api, $, _) {
api.CZR_Helpers = api.CZR_Helpers || {};
api.CZR_Helpers = $.extend( api.CZR_Helpers, {
      setupInputCollectionFromDOM : function() {
            var inputParentInst = this;//<= because fired with .call( inputParentInst )
            if ( ! _.isFunction( inputParentInst ) ) {
                  throw new Error( 'setupInputCollectionFromDOM => inputParentInst is not valid.' );
            }
            var module = inputParentInst.module,
                is_mod_opt = _.has( inputParentInst() , 'is_mod_opt' );
            if ( ! _.isEmpty( inputParentInst.inputCollection() ) )
              return;
            inputParentInst.czr_Input = inputParentInst.czr_Input || new api.Values();
            inputParentInst.inputConstructor = is_mod_opt ? module.inputModOptConstructor : module.inputConstructor;

            var _defaultInputParentModel = is_mod_opt ? inputParentInst.defaultModOptModel : inputParentInst.defaultItemModel;

            if ( _.isEmpty( _defaultInputParentModel ) || _.isUndefined( _defaultInputParentModel ) ) {
                  throw new Error( 'setupInputCollectionFromDOM => No default model found in item or mod opt ' + inputParentInst.id + '.' );
            }
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
            $( '.' + module.control.css_attr.sub_set_wrapper, inputParentInst.container).each( function( _index ) {
                  var _id = $(this).find('[data-czrtype]').attr( 'data-czrtype' ),
                      _value = _.has( inputParentInst_model, _id ) ? inputParentInst_model[ _id ] : '';
                  if ( _.isUndefined( _id ) || _.isEmpty( _id ) ) {
                        api.errare( 'setupInputCollectionFromDOM => missing data-czrtype id for input type ' + $(this).data( 'input-type' ) + ' in module ' + module.id + '. Check that the server input template is properly declared.' );
                        return;
                  }
                  if ( ! _.has( inputParentInst_model, _id ) ) {
                        throw new Error('setupInputCollectionFromDOM => The item or mod opt property : ' + _id + ' has been found in the DOM but not in the item or mod opt model : '+ inputParentInst.id + '. The input can not be instantiated.');
                  }
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
                  api.trigger( 'input-args-before-instantiation', _inputArgs );
                  inputParentInst.czr_Input.add( _id, new inputParentInst.inputConstructor( _id, _inputArgs ) );
                  inputParentInst.czr_Input( _id ).ready();
                  dom_inputParentInst_model[ _id ] = _value;
            });//each
            inputParentInst.inputCollection( dom_inputParentInst_model );
            return inputParentInst;
      }
});//$.extend
})( wp.customize , jQuery, _);
(function (api, $, _) {
api.CZR_Helpers = api.CZR_Helpers || {};
api.CZR_Helpers = $.extend( api.CZR_Helpers, {
      getModuleTmpl : function( args ) {
            var dfd = $.Deferred();
            args = _.extend( {
                  tmpl : '',
                  module_type: '',
                  module_id : '',
                  cache : true,//<= shall we cache the tmpl or not. Should be true in almost all cases.
                  nonce: api.settings.nonce.save//<= do we need to set a specific nonce to fetch the tmpls ?
            }, args );
            if ( _.isEmpty( args.tmpl ) || _.isEmpty( args.module_type ) ) {
                  dfd.reject( 'api.CZR_Helpers.getModuleTmpl => missing tmpl or module_type param' );
            }
            api.CZR_Helpers.czr_cachedTmpl = api.CZR_Helpers.czr_cachedTmpl || {};
            api.CZR_Helpers.czr_cachedTmpl[ args.module_type ] = api.CZR_Helpers.czr_cachedTmpl[ args.module_type ] || {};
            if ( true === args.cache && ! _.isEmpty( api.CZR_Helpers.czr_cachedTmpl[ args.module_type ][ args.tmpl ] ) && _.isString( api.CZR_Helpers.czr_cachedTmpl[ args.module_type ][ args.tmpl ] ) ) {
                  dfd.resolve( api.CZR_Helpers.czr_cachedTmpl[ args.module_type ][ args.tmpl ] );
            } else {
                  if ( _.isObject( api.CZR_Helpers.czr_cachedTmpl[ args.module_type ][ args.tmpl ] ) && 'pending' == api.CZR_Helpers.czr_cachedTmpl[ args.module_type ][ args.tmpl ].state() ) {
                        return api.CZR_Helpers.czr_cachedTmpl[ args.module_type ][ args.tmpl ];//<= this is a $.promise()
                  } else {
                        api.CZR_Helpers.czr_cachedTmpl[ args.module_type ][ args.tmpl ] = wp.ajax.post( 'ac_get_template', args )
                              .done( function( _serverTmpl_ ) {
                                    dfd.resolve( _serverTmpl_ );
                                    api.CZR_Helpers.czr_cachedTmpl[ args.module_type ][ args.tmpl ] = _serverTmpl_;
                              }).fail( function( _r_ ) {
                                    api.errare( 'api.CZR_Helpers.getModuleTmpl => Problem when fetching the ' + args.tmpl + ' tmpl from server for module : ' + args.module_id + ' ' + args.module_type, _r_);
                                    dfd.reject( _r_ );
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
})( wp.customize , jQuery, _);
(function (api, $, _) {
      api.CZR_Helpers = api.CZR_Helpers || {};
      api.CZR_Helpers = $.extend( api.CZR_Helpers, {
            register : function( params ) {
                  if ( ! _.has( params, 'id' ) ) {
                        api.errare( 'register => missing id ', params );
                        return;
                  }

                  var __element__ = {}, defaults;

                  switch ( params.what ) {
                        case 'setting' :
                              if ( api.has( params.id ) ) {
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

                              var SettingConstructor = api.settingConstructor[ settingArgs.type ] || api.Setting;
                              if ( _.isObject( params.options ) ) {
                                    settingArgs  = _.extend( settingArgs , params.options );
                              }

                              try { api.add( new SettingConstructor( params.id, settingArgs.value, settingArgs ) ); } catch ( er ) {
                                    api.errare( 'api.CZR_Helpers::register => problem when adding a setting to the api', er );
                              }
                        break;


                        case 'panel' :
                              if ( ! _.has( params, 'id' ) ){
                                    throw new Error( 'registerPanel => missing panel id ');
                              }

                              if ( api.panel.has( params.id ) ) {
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
                              if ( _.isObject( params.options ) ) {
                                    panelParams  = _.extend( panelParams , params.options );
                              }
                              panelParams = _.extend( { params: panelParams }, panelParams ); // Inclusion of params alias is for back-compat for custom panels that expect to augment this property.

                              try { __element__ = api.panel.add( new PanelConstructor( params.id, panelParams ) ); } catch ( er ) {
                                    api.errare( 'api.CZR_Helpers::register => problem when adding a panel to the api', er );
                              }
                        break;


                        case 'section' :
                              if ( ! _.has( params, 'id' ) ){
                                    throw new Error( 'registerSection => missing section id ');
                              }

                              if ( api.section.has( params.id ) ) {
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
                                    break;
                              }
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
                  if ( false !== params.track ) {
                        api.trigger( 'czr-new-registered', params );
                  }

                  return 'setting' == params.what ? params : __element__.deferred.embedded;
            }
      });//$.extend
})( wp.customize , jQuery, _);
(function (api, $, _) {
api.CZR_Helpers = api.CZR_Helpers || {};
api.CZR_Helpers = $.extend( api.CZR_Helpers, {
      css_loader_html : '<div class="czr-css-loader czr-mr-loader" style="display:none"><div></div><div></div><div></div></div>',
      getControlSettingId : function( control_id, setting_type ) {
            setting_type = 'default' || setting_type;
            if ( ! api.control.has( control_id ) ) {
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
                return setId;
            }
            if (  _.contains( themeServerControlParams.wpBuiltinSettings, setId ) )
              return setId;
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
                return name;
            }
            var self = this;
            if ( -1 == name.indexOf( themeServerControlParams.themeOptions) )
              return name;
            return name.replace(/\[|\]/g, '').replace( themeServerControlParams.themeOptions, '');
      },
      hasPartRefresh : function( setId ) {
            if ( ! _.has( api, 'czr_partials')  )
              return;
            return  _.contains( _.map( api.czr_partials(), function( partial, key ) {
                  return _.contains( partial.settings, setId );
            }), true );
      },
      getSectionControlIds : function( section_id ) {
            section_id = section_id || api.czr_activeSectionId();
            return ! api.section.has( section_id ) ?
                  [] :
                  _.map( api.section( section_id ).controls(), function( _ctrl ) {
                        return _ctrl.id;
                  });
      },
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
      removeInputCollection : function() {
            var inputParentInst = this;//<= because fired with .call( inputParentInst )
            if ( ! _.isFunction( inputParentInst ) ) {
                  throw new Error( 'removeInputCollection : inputParentInst is not valid.' );
            }
            if ( ! _.has( inputParentInst, 'czr_Input') )
              return;
            inputParentInst.czr_Input.each( function( _input ) {
                  inputParentInst.czr_Input.remove( _input.id );
            });
            inputParentInst.inputCollection({});
      },
      refreshModuleControl : function( wpSetId ) {
            var _constructor = api.controlConstructor.czr_module,
                _control_type = api.control( wpSetId ).params.type,
                _control_data = api.settings.controls[wpSetId];
            $.when( api.control( wpSetId ).container.remove() ).done( function() {
                  api.control.remove( wpSetId );
                  api.control.add( wpSetId,  new _constructor( wpSetId, { params : _control_data, previewer : api.previewer }) );
            });

      },
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
      hexToRgb : function( hex ) {
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
})( wp.customize , jQuery, _);
(function (api, $, _) {
api.CZR_Helpers = api.CZR_Helpers || {};
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
      setupDOMListeners : function( event_map , args, instance ) {
              var control = this,
                  _defaultArgs = {
                        model : {},
                        dom_el : {}
                  };

              instance = instance || control;
              if ( ! _.isArray( event_map ) ) {
                    api.errare( 'setupDomListeners : event_map should be an array', args );
                    return;
              }
              if ( ! _.isObject( args ) ) {
                    api.errare( 'setupDomListeners : args should be an object', event_map );
                    return;
              }

              args = _.extend( _defaultArgs, args );
              if ( ! ( args.dom_el instanceof jQuery ) || 1 > args.dom_el.length ) {
                    api.errare( 'setupDomListeners : dom element should be an existing dom element', args );
                    return;
              }
              _.map( event_map , function( _event ) {
                    if ( ! _.isString( _event.selector ) || _.isEmpty( _event.selector ) ) {
                          api.errare( 'setupDOMListeners : selector must be a string not empty. Aborting setup of action(s) : ' + _event.actions.join(',') );
                          return;
                    }
                    if ( ! _.isString( _event.selector ) || _.isEmpty( _event.selector ) ) {
                          api.errare( 'setupDOMListeners : selector must be a string not empty. Aborting setup of action(s) : ' + _event.actions.join(',') );
                          return;
                    }
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
                    args.dom_el.data( 'czr-listener-collection' , _currentListenerCollection );
                    args.dom_el.on( _event.trigger , _event.selector, function( e, event_params ) {
                          e.stopPropagation();
                          if ( api.utils.isKeydownButNotEnterEvent( e ) ) {
                            return;
                          }
                          e.preventDefault(); // Keep this AFTER the key filter above
                          var actionsParams = $.extend( true, {}, args );
                          if ( _.has( actionsParams, 'model') && _.has( actionsParams.model, 'id') ) {
                                if ( _.has( instance, 'get' ) )
                                  actionsParams.model = instance();
                                else
                                  actionsParams.model = instance.getModel( actionsParams.model.id );
                          }
                          $.extend( actionsParams, { event : _event, dom_event : e } );
                          $.extend( actionsParams, event_params );
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
      executeEventActionChain : function( args, instance ) {
              var control = this;
              if ( 'function' === typeof( args.event.actions ) )
                return args.event.actions.call( instance, args );
              if ( ! _.isArray( args.event.actions ) )
                args.event.actions = [ args.event.actions ];
              var _break = false;
              _.map( args.event.actions, function( _cb ) {
                    if ( _break )
                      return;

                    var _cbCandidate = function() {};
                    if ( 'function' === typeof( _cb ) ) {
                          _cbCandidate = _cb;
                    } else {
                          if ( 'function' != typeof( instance[ _cb ] ) ) {
                                throw new Error( 'executeEventActionChain : the action : ' + _cb + ' has not been found when firing event : ' + args.event.selector );
                          } else {
                                _cbCandidate = instance[ _cb ];
                          }
                    }
                    var $_dom_el = ( _.has(args, 'dom_el') && -1 != args.dom_el.length ) ? args.dom_el : control.container;

                    if ( 'string' === typeof( _cb ) ) {
                          $_dom_el.trigger( 'before_' + _cb, _.omit( args, 'event' ) );
                    }
                    var _cb_return = _cbCandidate.call( instance, args );
                    if ( false === _cb_return )
                      _break = true;

                    if ( 'string' === typeof( _cb ) ) {
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
  api.czr_wpQueryDataReady = api.czr_wpQueryDataReady || $.Deferred();
  api.czr_wpQueryInfos = api.czr_wpQueryInfos || new api.Value();
  api.bind( 'ready', function() {
        /* WP CONDITIONAL TAGS => stores and observes the WP conditional tags sent by the preview */
        api.previewer.bind( 'czr-query-data-ready', function( data ) {

              api.czr_wpQueryInfos( data );

              if ( 'pending' == api.czr_wpQueryDataReady.state() ) {
                    api.czr_wpQueryDataReady.resolve( data );
              }
        });
        api.previewer.bind( 'czr-partial-refresh-data', function( data ) {
              api.czr_partials = api.czr_partials || new api.Value();
              api.czr_partials.set( data );
        });
        api.previewer.bind( 'czr-partial-refresh-done', function( data ) {
              if ( ! _.has( data, 'set_id' ) )
                return;
              var setId = api.CZR_Helpers.build_setId( data.set_id );
              if ( ! api.has( setId ) )
                return;
              var ctrlId = api.CZR_Helpers.getControlSettingId( setId );
              if ( ! api.control.has( ctrlId ) )
                return;
              api.control( ctrlId ).trigger( 'czr-partial-refresh-done' );
        });
  });//api.bind('ready')
})( wp.customize , jQuery, _ );var CZRInputMths = CZRInputMths || {};
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
          $.extend( input, options || {} );
          input.constructorOptions = $.extend( true, {}, options );
          input.isReady = $.Deferred();
          if ( ! _.isUndefined( options.input_value ) ) {
                input.set( options.input_value );
          }
          var trigger_map = {
                text : 'keyup',
                textarea : 'keyup',
                password : 'keyup',
                color : 'colorpickerchange',
                range : 'input propertychange'
          };
          input.input_event_map = [
                  {
                    trigger   : $.trim( ['change', trigger_map[input.type] || '' ].join(' ') ),//was 'propertychange change click keyup input',//colorpickerchange is a custom colorpicker event @see method setupColorPicker => otherwise we don't
                    selector  : 'input[data-czrtype], select[data-czrtype], textarea[data-czrtype]',
                    name      : 'set_input_value',
                    actions   : function( obj ) {
                        if ( ! _.has( input.input_parent, 'syncElements') || ! _.has( input.input_parent.syncElements, input.id ) ) {
                              throw new Error('WARNING : THE INPUT ' + input.id + ' HAS NO SYNCED ELEMENT.');
                        }
                    }//was 'updateInput'
                  }
          ];
          if ( api.czrInputMap && _.has( api.czrInputMap, input.type ) ) {
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
          input.enabled = new api.Value( true );
          input.isReady.done( function() {
                input.enabled.bind( function( enabled ) {
                      input.container.toggleClass( 'disabled', ! enabled );
                });
          });
    },
    ready : function() {
            var input = this;
            input.setupDOMListeners( input.input_event_map , { dom_el : input.container }, input );
            input.callbacks.add( function() { return input.inputReact.apply( input, arguments ); } );
            $.when( input.setupSynchronizer() ).done( function() {
                  input.isReady.resolve( input );
            } );

    },
    setupSynchronizer: function() {
          var input       = this,
              input_parent        = input.input_parent,
              $_input_el  = input.container.find('[data-czrtype]'),
              is_textarea = input.container.find('[data-czrtype]').is('textarea');

          var syncElement = new api.Element( $_input_el );
          input_parent.syncElements = input_parent.syncElements || {};
          input_parent.syncElements[input.id] = syncElement;//adds the input syncElement to the collection
          syncElement.sync( input );//sync with the input instance
          syncElement.set( input() );
    },
    inputReact : function( to, from, data ) {
          var input = this,
              _current_input_parent = input.input_parent(),
              _new_model        = _.clone( _current_input_parent ),//initialize it to the current value
              _isPreItemInput = input.is_preItemInput;
          if ( ! input.enabled() )
            return;
          _new_model =  ( ! _.isObject(_new_model) || _.isEmpty(_new_model) ) ? {} : _new_model;
          _new_model[ input.id ] = to;
          input.input_parent.set( _new_model, {
                input_changed     : input.id,
                input_value       : input(),
                input_transport   : input.transport,
                not_preview_sent  : 'postMessage' === input.transport,//<= this parameter set to true will prevent the setting to be sent to the preview ( @see api.Setting.prototype.preview override ). This is useful to decide if a specific input should refresh or not the preview.
                inputRegistrationParams : input.constructorOptions
          } );
          if ( ! _isPreItemInput ) {
                input.input_parent.trigger( input.id + ':changed', to );
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
                  $(this).val( o.color.toString() ).trigger('colorpickerchange').trigger('change');
            }
        });
    },

    setupColorPickerAlpha : function() {
        var input  = this;

        input.container.find('input').wpColorPicker({
            palettes: true,
            width: window.innerWidth >= 1440 ? 271 : 251,
            change : function( e, o ) {
                  $(this).val( o.color.toString() ).trigger('colorpickerchange').trigger('change');
            },
            clear : function( e, o ) {
                  input('');
            }
        });
    },

    setupSelect : function() {
        var input = this;
        $('select', input.container ).not('.no-selecter-js')
              .each( function() {
                    $(this).selecter({
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

    setupGutenCheck : function( params ) {
          var input      = this;
          var $input = input.container.find('input[type=checkbox]'),
              $checkWrapper = $( '.czr-toggle-check', input.container );
          var _do_ = function() {
                $input.closest('.czr-toggle-check').toggleClass( 'is-checked', $input.is(':checked') );
                $checkWrapper.find('svg').remove();
                $checkWrapper.append(
                      ! $input.is(':checked') ? '<svg class="czr-toggle-check__off" width="6" height="6" aria-hidden="true" role="img" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 6 6"><path d="M3 1.5c.8 0 1.5.7 1.5 1.5S3.8 4.5 3 4.5 1.5 3.8 1.5 3 2.2 1.5 3 1.5M3 0C1.3 0 0 1.3 0 3s1.3 3 3 3 3-1.3 3-3-1.3-3-3-3z"></path></svg>' : '<svg class="czr-toggle-check__on" width="2" height="6" aria-hidden="true" role="img" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2 6"><path d="M0 0h2v6H0z"></path></svg>'
                );
          };
          $input.on( 'change', _do_ );
          _do_();
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
    setupSimpleRange : function() {},
    setupRangeSlider : function( options ) {
          var input = this,
              $handle,
              _updateHandle = function(el, val) {
                    var _unit = input.container.find('input').data( 'unit' );
                    el.textContent = val + ( _.isEmpty( input.container.find('input').data( 'unit' ) ) ? '' : _unit );
              };

          $( input.container ).find('input').rangeslider( {
                polyfill: false,
                rangeClass: 'rangeslider',
                disabledClass: 'rangeslider--disabled',
                horizontalClass: 'rangeslider--horizontal',
                verticalClass: 'rangeslider--vertical',
                fillClass: 'rangeslider__fill',
                handleClass: 'rangeslider__handle',
                onInit: function() {
                      $handle = $('.rangeslider__handle', this.$range);
                      $('.rangeslider__handle', this.$range);
                      _updateHandle( $handle[0], this.value );
                },
                onSlide: function(position, value) {
                      _updateHandle( $handle[0], value );
                },
          } );
    },
    setupHAlignement : function( input_options ) {
        var input = this,
            $wrapper = $('.sek-h-align-wrapper', input.container );
        $wrapper.find( 'div[data-sek-align="' + input() +'"]' ).addClass('selected');
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
    setupImageUploaderSaveAsId : function() {
          this.setupImageUploader();
    },
    setupImageUploaderSaveAsUrl : function() {
          this.setupImageUploader( { save_as_url : true } );
    },
    setupImageUploader : function( args ) {
          var input        = this,
              _model       = input();

          args = _.extend( { save_as_url : false }, args || {} );
          input.save_as_url = args.save_as_url;
          input.attachment   = {};
          if ( ! input.container )
            return this;

          input.tmplRendered = $.Deferred();
          input.setupContentRendering( _model, {} );
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
        if ( ( input.attachment.id != to ) && from !== to ) {
              if ( _.isEmpty( to ) ) {
                    input.attachment = {};
                    input.renderImageUploaderTemplate();
              } else if ( ! _.isNumber( to ) ) {
                    input.renderImageUploaderTemplate( { fromUrl : true, url : to });
              }
              _attachment = wp.media.attachment( to );
              if ( _.isObject( _attachment ) && _.has( _attachment, 'attributes' ) && _.has( _attachment.attributes, 'sizes' ) ) {
                    input.attachment       = _attachment.attributes;
                    input.renderImageUploaderTemplate();
              }
              else {
                    if ( _.isNumber( to ) ) {
                          wp.media.attachment( to ).fetch().done( function() {
                                input.attachment       = this.attributes;
                                input.renderImageUploaderTemplate();
                          }).fail( function() {
                                api.errorLog('renderImageUploaderTemplate => failed attempt to fetch an img with id : ' + to );
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
        _.bindAll( input, 'czrImgUploadRemoveFile', 'czrImgUploadOpenFrame', 'czrImgUploadSelect');
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
        input.attachment = {};
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
        input.attachment = attachment;
        input.set( input.save_as_url ? attachment.url : attachment.id );
  },
  renderImageUploaderTemplate: function( args ) {
        var input  = this;
        args = _.extend( { fromUrl : false, url : '' }, args || {} );

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

        api.CZR_Helpers.getModuleTmpl( {
              tmpl : 'img-uploader',
              module_type: 'all_modules',
              module_id : input.module.id
        } ).done( function( _serverTmpl_ ) {
              $_view_el.html( api.CZR_Helpers.parseTemplate( _serverTmpl_ )( _template_params ) );
              input.tmplRendered.resolve();
              input.container.trigger( input.id + ':content_rendered' );
        }).fail( function( _r_ ) {
              input.tmplRendered.reject( 'renderImageUploaderTemplate => Problem when fetching the tmpl from server for module : '+ input.module.id );
        });
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
var CZRInputMths = CZRInputMths || {};
( function ( api, $, _ ) {
$.extend( CZRInputMths , {
      setupContentPicker: function( wpObjectTypes ) {
              var input  = this,
              _event_map = [];

              /* Dummy for the prototype purpose */
              $.extend( _.isObject( wpObjectTypes ) ? wpObjectTypes : {}, {
                    post : '',
                    taxonomy : ''
              } );

              input.wpObjectTypes = wpObjectTypes;

              /* Methodize this or use a template */
              input.container.find('.czr-input').append('<select data-select-type="content-picker-select" class="js-example-basic-simple"></select>');
              input.input_event_map = [
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
                                _.each( _default, function( val, k ){
                                      if ( '_custom_' !== _raw_val.id ) {
                                            if ( ! _.has( _raw_val, k ) || _.isEmpty( _raw_val[ k ] ) ) {
                                                  api.errare( 'content_picker : missing input param : ' + k );
                                                  return;
                                            }
                                      }
                                      _val_candidate[ k ] = _raw_val[ k ];
                                } );
                                input.set( _val_candidate );
                          }
                    }
              ];
              input.isReady.done( function() {
                    input.setupContentSelecter();
              });

      },
      setupContentSelecter : function() {
              var input = this;
              if ( ! _.isEmpty( input() ) ) {
                    var _attributes = {
                          value : input().id || '',
                          title : input().title || '',
                          selected : "selected"
                    };
                    input.container.find('select').append( $( '<option>', _attributes ) );
              }
              input.currentAjaxAction = input.currentAjaxAction || new api.Value();
              input.currentAjaxAction.bind( function( ajaxAction ) {
                    input.defaultValueHasBeenPushed = false;
              });
              input.container.find( 'select' ).on('czrSelect2:select czrSelect2:unselect czrSelect2:close czrSelect2:open', function (e) {
                    input.defaultValueHasBeenPushed = false;
              });

              input.container.find( 'select' ).czrSelect2( {
                    placeholder: {
                          id: '-1', // the value of the option
                          title: 'Select'
                    },
                    data : input.setupSelectedContents(),
                    ajax: {
                          url: wp.ajax.settings.url,// was serverControlParams.AjaxUrl,
                          type: 'POST',
                          dataType: 'json',
                          delay: 250,
                          debug: true,
                          data: function ( params ) {
                                var page = params.page ? params.page : 0;
                                page = params.term ? params.page : page;
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
                          processResults: function ( data, params ) {
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
                                      pagination:  { more: items.length >= 1 }//<= the pagination boolean param can be tricky => here set to >= 10 because we query 10 + add a custom link item on the first query
                                };
                          },
                    },//ajax
                    templateSelection: input.czrFormatContentSelected,
                    templateResult: input.czrFormatContentSelected,
                    escapeMarkup: function ( markup ) { return markup; },
             });//czrSelect2 setup
      },
      czrFormatContentSelected: function ( item ) {
              if ( item.loading ) return item.text;
              var markup = "<div class='content-picker-item clearfix'>" +
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
})( wp.customize , jQuery, _ );var CZRInputMths = CZRInputMths || {};
( function ( api, $, _ ) {
$.extend( CZRInputMths , {
      setupTinyMceEditor : function() {
            var input        = this;
            if ( ! input.container ) {
                throw new Error( 'The input container is not set for WP text editor in module :' + input.module.id );
            }
            input.input_parent.control.bind( 'tinyMceEditorUpdated', function( params ) {
                  if ( api.sekEditorSynchronizedInput().control_id != input.input_parent.control.id || api.sekEditorSynchronizedInput().input_id != input.id )
                    return;
                  input( wp.editor.removep( params.html_content || api.sekTinyMceEditor.getContent() ) );
                  if ( params.modified_editor_element && params.modified_editor_element.length > 0 ) {
                        params.modified_editor_element.focus();
                  } else {
                        api.sekTinyMceEditor.focus();
                  }

            });

      },//setupTextEditor

});//$.extend
})( wp.customize , jQuery, _ );//extends api.Value

var CZRItemMths = CZRItemMths || {};
( function ( api, $, _ ) {
$.extend( CZRItemMths , {
      initialize: function( id, options ) {
            if ( _.isUndefined(options.module) || _.isEmpty(options.module) ) {
              throw new Error('No module assigned to item ' + id + '. Aborting');
            }

            var item = this;
            api.Value.prototype.initialize.call( item, null, options );
            item.isReady = $.Deferred();
            item.embedded = $.Deferred();
            item.container = null;//will store the item $ dom element
            item.contentContainer = null;//will store the item content $ dom element
            item.czr_Input = new api.Values();
            item.inputCollection = new api.Value({});
            item.viewState = new api.Value( 'closed' );
            item.removeDialogVisible = new api.Value( false );
            $.extend( item, options || {} );
            item.defaultItemModel = _.clone( options.defaultItemModel ) || { id : '', title : '' };
            var _initial_model = $.extend( item.defaultItemModel, options.initial_item_model );
            _initial_model = item.validateItemModelOnInitialize( _initial_model );
            item.set( _initial_model );
            item.userEventMap = new api.Value( [
                  {
                        trigger   : 'click keydown',
                        selector  : [ '.' + item.module.control.css_attr.display_alert_btn, '.' + item.module.control.css_attr.cancel_alert_btn ].join(','),
                        name      : 'toggle_remove_alert',
                        actions   : function() {
                              var _isVisible = this.removeDialogVisible();
                              this.module.closeRemoveDialogs();
                              this.removeDialogVisible( ! _isVisible );
                        }
                  },
                  {
                        trigger   : 'click keydown',
                        selector  : '.' + item.module.control.css_attr.remove_view_btn,
                        name      : 'remove_item',
                        actions   : ['removeItem']
                  },
                  {
                        trigger   : 'click keydown',
                        selector  : [ '.' + item.module.control.css_attr.edit_view_btn, '.' + item.module.control.css_attr.item_title ].join(','),
                        name      : 'edit_view',
                        actions   : [ 'setViewVisibility' ]
                  },
                  {
                        trigger   : 'click keydown',
                        selector  : '.tabs nav li',
                        name      : 'tab_nav',
                        actions   : function( args ) {
                              var tabIdSwitchedTo = $( args.dom_event.currentTarget, args.dom_el ).data('tab-id');
                              this.module.toggleTabVisibility.call( this, tabIdSwitchedTo );
                              this.trigger( 'tab-switch', { id : tabIdSwitchedTo } );
                        }
                  }
            ]);
            item.isReady.done( function() {
                  item.module.updateItemsCollection( { item : item() } );
                  item.callbacks.add( function() { return item.itemReact.apply(item, arguments ); } );
                  item.bind( 'contentRendered', function() {
                        if ( _.isEmpty( item.inputCollection() ) ) {
                              if ( serverControlParams.isDevMode ) {
                                    api.CZR_Helpers.setupInputCollectionFromDOM.call( item );
                                    item.module.setupTabNav.call( item );
                              } else {
                                    try {
                                          api.CZR_Helpers.setupInputCollectionFromDOM.call( item );
                                          item.module.setupTabNav.call( item );
                                    } catch( er ) {
                                          api.errorLog( 'In item.isReady.done : ' + er );
                                    }
                              }
                        }
                  });
                  item.bind( 'contentRemoved', function() {
                        if ( _.has( item, 'czr_Input' ) )
                          api.CZR_Helpers.removeInputCollection.call( item );
                  });
                  if ( item.canBeRendered() ) {
                        item.mayBeRenderItemWrapper();
                  }
                  item.embedded.done( function() {
                        item.itemWrapperViewSetup( _initial_model );
                  });
            });//item.isReady.done()

      },//initialize
      ready : function() {
            this.isReady.resolve();
      },
      canBeRendered : function() {
            return true;
      },
      validateItemModelOnInitialize : function( item_model_candidate ) {
            return item_model_candidate;
      },
      itemReact : function( to, from, params ) {
            var item = this,
                module = item.module;

            params = params || {};
            module.updateItemsCollection( { item : to, params : params } ).done( function() {
                  item.writeItemViewTitle( to, params );
            });
      }
});//$.extend
})( wp.customize , jQuery, _ );//extends api.CZRBaseControl

var CZRItemMths = CZRItemMths || {};
( function ( api, $, _ ) {
$.extend( CZRItemMths , {
      _sendItem : function( to, from ) {
            var item = this,
                module = item.module,
                _changed_props = [];
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
                  module.trigger('item_sent', { item : to , dom_el: item.container, changed_prop : _prop } );
            });
      },
      removeItem : function( params ) {
            var item = this,
                module = this.module,
                _new_collection = _.clone( module.itemCollection() );
            module.trigger('pre_item_dom_remove', item() );
            item._destroyView();
            _new_collection = _.without( _new_collection, _.findWhere( _new_collection, {id: item.id }) );
            module.itemCollection.set( _new_collection );
            module.trigger('pre_item_api_remove', item() );

            var _item_ = $.extend( true, {}, item() );
            module.czr_Item.remove( item.id );
            if ( 'postMessage' == api(module.control.id).transport && _.has( params, 'dom_event') && ! _.has( params.dom_event, 'isTrigger' ) && ! api.CZR_Helpers.hasPartRefresh( module.control.id ) ) {
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
      getModel : function(id) {
            return this();
      }

});//$.extend
})( wp.customize , jQuery, _ );
var CZRItemMths = CZRItemMths || {};
( function ( api, $, _ ) {
$.extend( CZRItemMths , {
      mayBeRenderItemWrapper : function() {
            var item = this;

            if ( 'pending' != item.embedded.state() )
              return;
            if ( ! _.isEmpty( item.container ) && item.container.length > 0 )
              return;

            $.when( item.renderItemWrapper() ).done( function( $_container ) {
                  item.container = $_container;
                  if ( _.isUndefined( item.container ) || ! item.container.length ) {
                        throw new Error( 'In mayBeRenderItemWrapper the Item view has not been rendered : ' + item.id );
                  } else {
                        item.embedded.resolve();
                  }
            });
      },
      renderItemWrapper : function( _item_model_ ) {
            var item = this,
                module = item.module,
                dfd = $.Deferred(),
                $_view_el;
            var item_model_for_template_injection = $.extend( true, {}, _item_model_ || item() );

            var appendAndResolve = function( _tmpl_ ) {
                  if ( module.isMultiItem() ) {
                        if ( _.isEmpty( _tmpl_ ) ) {
                              dfd.reject( 'renderItemWrapper => Missing html template for module : '+ module.id );
                        }
                        $_view_el.append( _tmpl_ );
                  }
                  $_view_el.append( $( '<div/>', { class: module.control.css_attr.item_content } ) );

                  dfd.resolve( $_view_el );
            };//appendAndResolve
            item.trigger( 'item-model-before-item-wrapper-template-injection', item_model_for_template_injection );
            $_view_el = $('<li>', { class : module.control.css_attr.single_item, 'data-id' : item_model_for_template_injection.id,  id : item_model_for_template_injection.id } );
            module.itemsWrapper.append( $_view_el );

            if ( module.isMultiItem() ) {
                  var _template_selector;
                  if ( ! _.isEmpty( module.rudItemPart ) ) {
                        _template_selector = module.getTemplateSelectorPart( 'rudItemPart', item_model_for_template_injection );
                        if ( 1 > $( '#tmpl-' + _template_selector ).length ) {
                            dfd.reject( 'Missing template for item ' + item.id + '. The provided template script has no been found : #tmpl-' + _template_selector );
                        }
                        appendAndResolve( wp.template( _template_selector )( item_model_for_template_injection ) );
                  } else {
                        var requestParams = {
                              tmpl : 'rud-item-part',
                              module_type: 'all_modules',
                              module_id : module.id,
                              control_id : module.control.id
                        };
                        item.trigger( 'item-wrapper-tmpl-params-before-fetching', requestParams );
                        if ( ! _.isEmpty( module[ requestParams.tmpl ] ) ) {
                              _template_selector = module.getTemplateSelectorPart( requestParams.tmpl, item_model_for_template_injection );
                              if ( 1 > $( '#tmpl-' + _template_selector ).length ) {
                                  dfd.reject( 'Missing template for item ' + item.id + '. The provided template script has no been found : #tmpl-' + _template_selector );
                              }
                              appendAndResolve( wp.template( _template_selector )( item_model_for_template_injection ) );
                        } else {
                              api.CZR_Helpers.getModuleTmpl( requestParams ).done( function( _serverTmpl_ ) {
                                    appendAndResolve( api.CZR_Helpers.parseTemplate( _serverTmpl_ )( { is_sortable : module.sortable } ) );
                              }).fail( function( _r_ ) {
                                    dfd.reject( 'renderItemWrapper => Problem when fetching the rud-item-part tmpl from server for module : '+ module.id );
                              });
                        }
                  }
            } else {//if ( module.isMultiItem() ) {}
                  appendAndResolve();
            }

            return dfd.promise();
      },
      itemWrapperViewSetup : function( _item_model_ ) {
            var item = this,
                module = this.module;
            item_model = item() || item.initial_item_model;//$.extend( true, {}, _item_model_ );
            item.writeItemViewTitle();
            var _updateItemContentDeferred = function( $_item_content, to, from ) {
                  if ( ! _.isUndefined( $_item_content ) && false !== $_item_content.length ) {
                        item.contentContainer = $_item_content;
                        item.trigger( 'contentRendered', { item_content : $_item_content } );
                        item.toggleItemExpansion( to, item.module.isMultiItem() ? 150 : 0 );//the second param is the duration
                        item.cleanLoader();

                  }
                  else {
                        throw new Error( 'Module : ' + item.module.id + ', the item content has not been rendered for ' + item.id );
                  }
            };
            if ( item.module.isMultiItem() ) {
                  item.viewState.callbacks.add( function( to, from ) {
                        var _isExpanded = -1 !== to.indexOf( 'expanded' );
                        if ( module.hasModOpt() && _isExpanded ) {
                              api.czr_ModOptVisible( false, {
                                    module : module,//the current module for which the modOpt is being expanded
                                    focus : false//the id of the tab we want to focus on
                              });
                        }

                        if ( _isExpanded ) {
                              if ( _.isObject( item.contentContainer ) && false !== item.contentContainer.length ) {
                                    item.toggleItemExpansion(to);
                              } else {
                                    item.printLoader();
                                    item.renderItemContent( item() || item.initial_item_model )
                                          .done( function( $_item_content ) {
                                                _updateItemContentDeferred( $_item_content, to, from );
                                          })
                                          .fail( function( _r_ ) {
                                                api.errorLog( "multi-item module => failed item.renderItemContent for module : " + module.id, _r_ );
                                          });
                              }
                        } else {
                              item.toggleItemExpansion( to ).done( function() {
                                    if ( _.isObject( item.contentContainer ) && false !== item.contentContainer.length ) {
                                          item.trigger( 'beforeContenRemoved' );
                                          $( '.' + module.control.css_attr.item_content, item.container ).children().each( function() {
                                                $(this).remove();
                                          });
                                          $( '.' + module.control.css_attr.item_content, item.container ).html('');
                                          item.contentContainer = null;
                                          item.trigger( 'contentRemoved' );
                                    }
                              });
                        }
                  });
            }
            else {
                  item.viewState.callbacks.add( function( to, from ) {
                        item.toggleItemExpansion.apply( item, [ to, 0 ] );
                  });
                  item.printLoader();
                  item.renderItemContent( item_model )
                        .done( function( $_item_content ) {
                              _updateItemContentDeferred( $_item_content, true );
                        })
                        .fail( function( _r_ ) {
                              api.errare( "mono-item module => failed item.renderItemContent for module : " + module.id, _r_ );
                        });
            }
            api.CZR_Helpers.setupDOMListeners(
                  item.userEventMap(),//actions to execute
                  { model:item_model, dom_el:item.container },//model + dom scope
                  item //instance where to look for the cb methods
            );
            item.removeDialogVisible.bind( function( visible ) {
                  var module = item.module,
                      $_alert_el = $( '.' + module.control.css_attr.remove_alert_wrapper, item.container ).first();
                  if ( visible )
                    module.closeAllItems();
                  if ( visible && module.hasModOpt() ) {
                        api.czr_ModOptVisible( false, {
                              module : module,//the current module for which the modOpt is being expanded
                              focus : false//the id of the tab we want to focus on
                        });
                  }
                  if ( visible && _.has( module, 'preItem' ) ) {
                        module.preItemExpanded(false);
                  }
                  $('.' + module.control.css_attr.remove_alert_wrapper, item.container ).not( $_alert_el ).each( function() {
                        if ( $(this).hasClass( 'open' ) ) {
                              $(this).slideToggle( {
                                    duration : 200,
                                    done : function() {
                                          $(this).toggleClass('open' , false );
                                          $(this).siblings().find('.' + module.control.css_attr.display_alert_btn).toggleClass( 'active' , false );
                                    }
                              } );
                        }
                  });
                  if ( visible ) {
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
                                    $_alert_el.html( api.CZR_Helpers.parseTemplate( _serverTmpl_ )( { title : ( item().title || item.id ) } ) );
                                    item.trigger( 'remove-dialog-rendered');
                              }).fail( function( _r_ ) {
                                    api.errare( 'item.removeDialogVisible => Problem when fetching the tmpl from server for module : '+ module.id, _r_ );
                              });
                        }
                  }
                  var _slideComplete = function( visible ) {
                        $_alert_el.toggleClass( 'open' , visible );
                        item.container.find('.' + module.control.css_attr.display_alert_btn ).toggleClass( 'active', visible );
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
      renderItemContent : function( _item_model_ ) {
            var item = this,
                module = this.module,
                dfd = $.Deferred();
            var item_model_for_template_injection = $.extend( true, {}, _item_model_ || item() );
            item.trigger( 'item-model-before-item-content-template-injection', item_model_for_template_injection );

            var appendAndResolve = function( _tmpl_ ) {
                  if ( _.isEmpty( _tmpl_ ) ) {
                        dfd.reject( 'renderItemContent => Missing html template for module : '+ module.id );
                  }
                  var $itemContentWrapper = $( '.' + module.control.css_attr.item_content, item.container );
                  $( _tmpl_ ).appendTo( $itemContentWrapper );
                  dfd.resolve( $itemContentWrapper );
            };//appendAndResolve
            if ( ! _.isEmpty( module.itemInputList ) || _.isFunction( module.itemInputList ) ) {
                  var tmplSelectorSuffix = module.getTemplateSelectorPart( 'itemInputList', item_model_for_template_injection );
                  if ( 1 > $( '#tmpl-' + tmplSelectorSuffix ).length ) {
                        dfd.reject( 'renderItemContent => No itemInputList content template defined for module ' + module.id + '. The template script id should be : #tmpl-' + tmplSelectorSuffix );
                  } else {
                        appendAndResolve( wp.template( tmplSelectorSuffix )( item_model_for_template_injection ) );
                  }

            } else {
                  var requestParams = {
                        tmpl : 'item-inputs',
                        module_type: module.module_type,
                        module_id : module.id,
                        control_id : module.control.id,
                        item_model : item_model_for_template_injection
                  };
                  module.trigger( 'filter-request-params-before-fetching-for-item-content-tmpl', requestParams );

                  api.CZR_Helpers.getModuleTmpl( requestParams ).done( function( _serverTmpl_ ) {
                        appendAndResolve( api.CZR_Helpers.parseTemplate( _serverTmpl_ )( $.extend( item_model_for_template_injection, { control_id : module.control.id } ) ) );
                  }).fail( function( _r_ ) {
                        dfd.reject( _r_ );
                  });
            }
            return dfd.promise();
      },
      writeItemViewTitle : function( item_model ) {
            var item = this,
                module = item.module,
                _model = item_model || item(),
                _title = ( _.has( _model, 'title') && ! _.isEmpty( _model.title ) ) ? api.CZR_Helpers.capitalize( _model.title ) : _model.id;

            _title = api.CZR_Helpers.truncate( _title, 20 );
            $( '.' + module.control.css_attr.item_title , item.container ).text( _title );
            api.CZR_Helpers.doActions('after_writeViewTitle', item.container , _model, item );
      },
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
      toggleItemExpansion : function( status, duration ) {
            var visible = 'closed' != status,
                item = this,
                module = this.module,
                $el = $( '.' + module.control.css_attr.item_content , item.container ).first(),
                dfd = $.Deferred(),
                _slideComplete = function( visible ) {
                      item.container.toggleClass( 'open' , visible );
                      if ( visible )
                        module.closeRemoveDialogs();
                      var $_edit_icon = $el.siblings().find('.' + module.control.css_attr.edit_view_btn );

                      $_edit_icon.toggleClass('active' , visible );
                      if ( visible )
                        $_edit_icon.removeClass('fa-pencil-alt').addClass('fa-minus-square').attr('title', serverControlParams.i18n.close );
                      else
                        $_edit_icon.removeClass('fa-minus-square').addClass('fa-pencil-alt').attr('title', serverControlParams.i18n.edit );
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
      _destroyView : function ( duration ) {
            this.container.fadeOut( {
                duration : duration ||400,
                done : function() {
                  $(this).remove();
                }
            });
      },
      printLoader : function() {
            var item = this;
            item.container
                .css({'position' :'relative'})
                .append( api.CZR_Helpers.css_loader_html ).find('.czr-css-loader').fadeIn( 'fast' );
            clearTimeout( $.data( this, '_czr_loader_active_timer_') );
            $.data( this, '_czr_loader_active_timer_', setTimeout(function() {
                  item.cleanLoader();
            }, 5000 ) );
      },
      cleanLoader : function() {
            this.container
                .css({'min-height' : ''})
                .find('.czr-css-loader').remove();
      },
});//$.extend
})( wp.customize , jQuery, _ );//extends api.Value

var CZRModOptMths = CZRModOptMths || {};
( function ( api, $, _ ) {
$.extend( CZRModOptMths , {
      initialize: function( options ) {
            if ( _.isUndefined(options.module) || _.isEmpty(options.module) ) {
              throw new Error('No module assigned to modOpt.');
            }

            var modOpt = this;
            api.Value.prototype.initialize.call( modOpt, null, options );
            modOpt.isReady = $.Deferred();
            modOpt.container = null;//will store the modOpt $ dom element
            modOpt.inputCollection = new api.Value({});
            $.extend( modOpt, options || {} );
            modOpt.defaultModOptModel = _.clone( options.defaultModOptModel ) || { is_mod_opt : true };
            var _initial_model = $.extend( modOpt.defaultModOptModel, options.initial_modOpt_model );
            var ctrl = modOpt.module.control;
            modOpt.set( _initial_model );
            modOpt.isReady.done( function() {
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
                  api.CZR_Helpers.setupDOMListeners(
                        [
                              {
                                    trigger   : 'click keydown',
                                    selector  : '.' + ctrl.css_attr.edit_modopt_icon,
                                    name      : 'toggle_mod_option',
                                    actions   : function() {
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
            });//modOpt.isReady.done()

      },//initialize
      ready : function() {
            this.isReady.resolve();
      }
});//$.extend
})( wp.customize , jQuery, _ );//extends api.CZRBaseControl

var CZRModOptMths = CZRModOptMths || {};
( function ( api, $, _ ) {
$.extend( CZRModOptMths , {
      modOptWrapperViewSetup : function( modOpt_model ) {
              var modOpt = this,
                  module = this.module,
                  dfd = $.Deferred(),
                  _setupDOMListeners = function( $_container ) {
                        api.CZR_Helpers.setupDOMListeners(
                             [
                                    {
                                          trigger   : 'click keydown',
                                          selector  : '.' + module.control.css_attr.close_modopt_icon,
                                          name      : 'close_mod_option',
                                          actions   : function() {
                                                api.czr_ModOptVisible( false, {
                                                      module : module,//the current module for which the modOpt is being expanded
                                                      focus : false//the id of the tab we want to focus on
                                                });
                                          }
                                    },
                                    {
                                          trigger   : 'click keydown',
                                          selector  : '.tabs nav li',
                                          name      : 'tab_nav',
                                          actions   : function( args ) {
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
              modOpt.renderModOptContent( modOpt_model )
                    .done( function( $_container ) {
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
                          modOpt.module.setupTabNav.call( modOpt );
                    });

              return dfd.promise();
      },
      renderModOptContent : function( modOpt_model ) {
              var modOpt = this,
                  module = this.module,
                  dfd = $.Deferred();

              modOpt_model = modOpt_model || modOpt();

              var appendAndResolve = function( _tmpl_ ) {
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
                    $( '.' + module.control.css_attr.mod_opt_wrapper ).append( _tmpl_ );

                    dfd.resolve( $( '.' + module.control.css_attr.mod_opt_wrapper ) );
              };//appendAndResolve
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
                          appendAndResolve( api.CZR_Helpers.parseTemplate( _serverTmpl_ )( modOpt_model ) );
                    }).fail( function( _r_ ) {
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
            _.delay( function() {
                  dfd.resolve();
            }, 200 );
            return dfd.promise();
      }
});//$.extend
})( wp.customize , jQuery, _ );//MULTI CONTROL CLASS
var CZRModuleMths = CZRModuleMths || {};
( function ( api, $, _ ) {
$.extend( CZRModuleMths, {
      initialize: function( id, constructorOptions ) {
            if ( _.isUndefined(constructorOptions.control) || _.isEmpty(constructorOptions.control) ) {
                throw new Error('No control assigned to module ' + id );
            }
            var module = this;
            api.Value.prototype.initialize.call( this, null, constructorOptions );
            module.isReady = $.Deferred();

            $.extend( module, constructorOptions || {} );
            $.extend( module, {
                  crudModulePart : '', //'czr-crud-module-part',//create, read, update, delete
                  rudItemPart : '',// 'czr-rud-item-part',//read, update, delete
                  ruItemPart : '',// 'czr-ru-item-part',//read, update <= ONLY USED IN THE WIDGET MODULE
                  alertPart : '',// 'czr-rud-item-alert-part',//used both for items and modules removal
                  itemInputList : '',//is specific for each crud module
                  modOptInputList : ''//is specific for each module
            } );
            module.embedded = $.Deferred();
            module.itemsWrapper = '';//will store the $ item container
            module.container = $( module.control.selector );
            module.renderModuleParts()
                  .done( function( $_module_items_wrapper ){
                        if ( false === $_module_items_wrapper.length ) {
                            throw new Error( 'The items wrapper has not been rendered for module : ' + module.id );
                        }
                        module.itemsWrapper = $_module_items_wrapper;
                        module.embedded.resolve();
                  })
                  .fail( function( _r_ ) {
                        throw new Error( [ "initialize module => failed module.renderModuleParts() for module : " , module.id , _r_ ].join(' '));
                  });

            /*-----------------------------------------------
            * MODULE OPTIONS
            ------------------------------------------------*/
            module.defaultAPImodOptModel = {
                  initial_modOpt_model : {},
                  defaultModOptModel : {},
                  control : {},//control instance
                  module : {}//module instance
            };
            module.defaultModOptModel = {};
            module.modOptConstructor = module.modOptConstructor || api.CZRModOpt;

            /*-----------------------------------------------
            * ITEMS
            ------------------------------------------------*/
            module.itemCollection = new api.Value( [] );
            module.defaultAPIitemModel = {
                  id : '',
                  initial_item_model : {},
                  defaultItemModel : {},
                  control : {},//control instance
                  module : {},//module instance
                  is_added_by_user : false
            };
            module.defaultItemModel = api.czrModuleMap[ module.module_type ].defaultItemModel || { id : '', title : '' };
            module.itemConstructor = module.itemConstructor || api.CZRItem;
            module.czr_Item = new api.Values();


            /*-----------------------------------------------
            * SET THE DEFAULT INPUT CONSTRUCTOR AND INPUT OPTIONS
            ------------------------------------------------*/
            module.inputConstructor = module.inputConstructor || api.CZRInput;//constructor for the items input
            if ( module.hasModOpt() ) {
                  module.inputModOptConstructor = module.inputModOptConstructor || api.CZRInput;//constructor for the modOpt input
            }
            module.inputOptions = {};//<= can be set by each module specifically


            /*-----------------------------------------------
            * FIRE ON isReady
            ------------------------------------------------*/
            module.isReady.done( function() {
                  module.isDirty = new api.Value( constructorOptions.dirty || false );
                  module.initializeModuleModel( constructorOptions )
                        .done( function( initialModuleValue ) {
                              module.set( initialModuleValue );
                        })
                        .fail( function( response ){ api.errare( 'Module : ' + module.id + ' initialize module model failed : ', response ); })
                        .always( function( initialModuleValue ) {
                              module.callbacks.add( function() { return module.moduleReact.apply( module, arguments ); } );
                              if (  ! module.control.isModuleRegistered( module.id ) ) {
                                  module.control.updateModulesCollection( { module : constructorOptions, is_registered : false } );
                              }

                              module.bind('items-collection-populated', function( collection ) {
                                    module.itemCollection.callbacks.add( function() { return module.itemCollectionReact.apply( module, arguments ); } );
                                    if ( false !== module.sortable ) {
                                          module._makeItemsSortable();
                                    }
                              });
                              module.populateSavedItemCollection();
                              if ( module.hasModOpt() ) {
                                    module.instantiateModOpt();
                              }
                        });
            });//module.isReady.done()


            /*-----------------------------------------------
            * Maybe resolve isReady() on parent section expanded
            ------------------------------------------------*/
            if ( true === api.czrModuleMap[ module.module_type ].ready_on_section_expanded ) {
                  if ( _.has( api, 'czr_activeSectionId' ) && module.control.section() == api.czr_activeSectionId() && 'resolved' != module.isReady.state() ) {
                        module.embedded.then( function() {
                              module.ready();
                        });
                  }
                  api.section( module.control.section(), function( _section_ ) {
                        _section_.expanded.bind(function(to) {
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
            ------------------------------------------------*/
            var _control_event = api.czrModuleMap[ module.module_type ].ready_on_control_event;
            if ( ! _.isUndefined( _control_event ) ) {
                  api.control( module.control.id, function( _control_ ) {
                        _control_.container.on( _control_event, function(evt) {
                              if ( 'resolved' != module.isReady.state() ) {
                                    module.embedded.then( function() {
                                          module.ready();
                                    });
                              }
                        });
                  });
            }
            this.maybeAwakeAndBindSharedModOpt();
      },//initialize()
      ready : function() {
            var module = this;
            module.isReady.resolve();
      },
      initializeModuleModel : function( constructorOptions ) {
            var module = this, dfd = $.Deferred();
            if ( ! module.isMultiItem() && ! module.isCrud() ) {
                  if ( _.isEmpty( constructorOptions.items ) ) {
                        var def = _.clone( module.defaultItemModel );
                        constructorOptions.items = [ $.extend( def, { id : module.id } ) ];
                  }
            }
            return dfd.resolve( constructorOptions ).promise();
      },
      itemCollectionReact : function( to, from, data ) {
            var module = this,
                _current_model = module(),
                _new_model = $.extend( true, {}, _current_model );
            _new_model.items = to;
            module.isDirty.set(true);
            module.set( _new_model, data || {} );
      },
      filterItemsBeforeCoreApiSettingValue : function( itemsToReturn ) {
            return itemsToReturn;
      },
      moduleReact : function( to, from, data ) {
            var module            = this,
                control           = module.control,
                isItemUpdate    = ( _.size( from.items ) == _.size( to.items ) ) && ! _.isEmpty( _.difference( to.items, from.items ) ),
                isColumnUpdate  = to.column_id != from.column_id,
                refreshPreview    = function() {
                      api.previewer.refresh();
                };
            control.updateModulesCollection( {
                  module : $.extend( true, {}, to ),
                  data : data//useful to pass contextual info when a change happens
            } );
      },
      getModuleSection : function() {
            return this.section;
      },
      isMultiItem : function() {
            return api.CZR_Helpers.isMultiItemModule( null, this );
      },
      isCrud : function() {
            return api.CZR_Helpers.isCrudModule( null, this );
      },

      hasModOpt : function() {
            return api.CZR_Helpers.hasModuleModOpt( null, this );
      },
      instantiateModOpt : function() {
            var module = this;
            var modOpt_candidate = module.prepareModOptForAPI( module().modOpt || {} );
            module.czr_ModOpt = new module.modOptConstructor( modOpt_candidate );
            module.czr_ModOpt.ready();
            module.czr_ModOpt.callbacks.add( function( to, from, data ) {
                  var _current_model = module(),
                      _new_model = $.extend( true, {}, _current_model );
                  _new_model.modOpt = to;
                  module.isDirty(true);
                  module( _new_model, data );
            });
      },
      prepareModOptForAPI : function( modOpt_candidate ) {
            var module = this,
                api_ready_modOpt = {};
            modOpt_candidate = _.isObject( modOpt_candidate ) ? modOpt_candidate : {};

            _.each( module.defaultAPImodOptModel, function( _value, _key ) {
                  var _candidate_val = modOpt_candidate[_key];
                  switch( _key ) {
                        case 'initial_modOpt_model' :
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
      getDefaultModOptModel : function( id ) {
            var module = this;
            return $.extend( _.clone( module.defaultModOptModel ), { is_mod_opt : true } );
      },
      sendInputToPreview : function( args ) {
            var module = this;
            args = _.extend(
              {
                    input_id        : '',
                    input_parent_id : '',//<= can be the mod opt or an item
                    to              : null,
                    from            : null
              } , args );

            if ( _.isEqual( args.to, args.from ) )
              return;
            api.previewer.send( 'czr_input', {
                  set_id        : api.CZR_Helpers.getControlSettingId( module.control.id ),
                  module_id     : module.id,//<= will allow us to target the right dom element on front end
                  module        : { items : $.extend( true, {}, module().items ) , modOpt : module.hasModOpt() ?  $.extend( true, {}, module().modOpt ): {} },
                  input_parent_id : args.input_parent_id,//<= can be the mod opt or the item
                  input_id      : args.input_id,
                  value         : args.to,
                  isPartialRefresh : args.isPartialRefresh//<= let us know if it is a full wrapper refresh or a single input update ( true when fired from sendModuleInputsToPreview )
            });
            module.trigger( 'input_sent', { input : args.to , dom_el: module.container } );
      },
      sendModuleInputsToPreview : function( args ) {
            var module = this,
                _sendInputData = function() {
                      var inputParent = this,//this is the input parent : item or modOpt
                          inputParentModel = $.extend( true, {}, inputParent() );
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
      maybeAwakeAndBindSharedModOpt : function() {
            if ( ! _.isUndefined( api.czr_ModOptVisible ) )
              return;
            api.czr_ModOptVisible = new api.Value( false );
            api.czr_ModOptVisible.bind( function( visible, from, args ) {
                  args = args || {};
                  if ( ! _.isFunction( args.module ) || ! _.isFunction( args.module.czr_ModOpt ) ) {
                        api.errare( 'moduleCtor::maybeAwakeAndBindSharedModOpt => api.czr_ModOptVisible.bind() => incorrect arguments', args );
                        return;
                  }
                  var modOpt = args.module.czr_ModOpt,
                      module = args.module;
                  if ( visible ) {
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

var CZRModuleMths = CZRModuleMths || {};
( function ( api, $, _ ) {
$.extend( CZRModuleMths, {
      populateSavedItemCollection : function( _itemCollection_ ) {
              var module = this,
                  _deepCopyOfItemCollection;

              if ( ! _.isArray( _itemCollection_ || module().items ) ) {
                    api.errorLog( 'populateSavedItemCollection : The saved items collection must be an array in module :' + module.id );
                    return;
              }
              _deepCopyOfItemCollection = $.extend( true, [], _itemCollection_ || module().items );
              _.each( _deepCopyOfItemCollection , function( item_candidate , key ) {
                    if ( _.has( item_candidate, 'is_mod_opt' ) ) {
                          throw new Error( 'populateSavedItemCollection => there should be no mod opt to instantiate here.');
                    }
              });
              module.trigger( 'filterItemCandidatesBeforeInstantiation', _deepCopyOfItemCollection );
              _.each( _deepCopyOfItemCollection, function( item_candidate , key ) {
                    var _doInstantiate_ = function() {
                          var _item_instance_ = module.instantiateItem( item_candidate );
                          if ( _.isFunction( _item_instance_ ) ) {
                                _item_instance_.ready();
                          } else {
                                api.errare( 'populateSavedItemCollection => Could not instantiate item in module ' + module.id , item_candidate );
                          }
                    };
                    if ( serverControlParams.isDevMode ) {
                          _doInstantiate_();
                    } else {
                          try { _doInstantiate_(); } catch( er ) {
                                api.errare( 'populateSavedItemCollection => ' + er );
                          }
                    }
              });
              _.each( _deepCopyOfItemCollection, function( _item ) {
                    if ( ! _.isObject( _item ) ) {
                          return;
                    }
                    if ( _.isUndefined( _.findWhere( module.itemCollection(), _item.id ) ) ) {
                          throw new Error( 'populateSavedItemCollection => The saved items have not been properly populated in module : ' + module.id );
                    }
              });

              module.trigger( 'items-collection-populated' );
      },


      instantiateItem : function( item_candidate, is_added_by_user ) {
              var module = this;
              item_candidate = _.isObject( item_candidate ) ? item_candidate : {};
              item_candidate = module.validateItemBeforeAddition( item_candidate, is_added_by_user );
              if ( ! item_candidate || _.isNull( item_candidate ) ) {
                    api.errare( 'CZRModule::instantiateItem() => item_candidate did not pass validation in module ' + module.id );
                    return;
              }
              item_candidate = module.prepareItemForAPI( item_candidate );

              if ( ! _.isObject( item_candidate ) ) {
                    api.errare( 'CZRModule::instantiateItem() => an item should be described by an object in module type : ' + module.module_type, 'module id : '  + module.id );
                    return;
              }
              if ( ! item_candidate || _.isNull( item_candidate ) ) {
                    api.errare( 'CZRModule::instantiateItem() => item_candidate invalid in module ' + module.id );
                    return;
              }
              if ( ! _.has( item_candidate, 'id' ) ) {
                    throw new Error('CZRModule::instantiateItem() => an item has no id and could not be added in the collection of : ' + this.id );
              }
              if ( module.czr_Item.has( item_candidate.id ) ) {
                    throw new Error('CZRModule::instantiateItem() => the following item id ' + item_candidate.id + ' already exists in module.czr_Item() for module ' + this.id  );
              }
              module.czr_Item.add( item_candidate.id, new module.itemConstructor( item_candidate.id, item_candidate ) );

              if ( ! module.czr_Item.has( item_candidate.id ) ) {
                    throw new Error('CZRModule::instantiateItem() => instantiation failed for item id ' + item_candidate.id + ' for module ' + this.id  );
              }
              return module.czr_Item( item_candidate.id );
      },
      validateItemBeforeAddition : function( item_candidate, is_added_by_user ) {
            return item_candidate;
      },
      prepareItemForAPI : function( item_candidate ) {
              var module = this,
                  api_ready_item = {};
              item_candidate = _.isObject( item_candidate ) ? item_candidate : {};

              _.each( module.defaultAPIitemModel, function( _value, _key ) {
                    var _candidate_val = item_candidate[_key];
                    switch( _key ) {
                          case 'id' :
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
              if ( ! _.has( api_ready_item, 'id' ) ) {
                    api_ready_item.id = module.generateItemId( module.module_type );
              }
              api_ready_item.initial_item_model.id = api_ready_item.id;

              return module.validateItemBeforeInstantiation( api_ready_item );
      },
      validateItemBeforeInstantiation : function( api_ready_item ) {
            return api_ready_item;
      },
      generateItemId : function( prefix, key, i ) {
              i = i || 1;
              if ( i > 100 ) {
                    throw new Error( 'Infinite loop when generating of a module id.' );
              }
              var module = this;
              key = key || module._getNextItemKeyInCollection();
              var id_candidate = prefix + '_' + key;
              if ( ! _.has( module, 'itemCollection' ) || ! _.isArray( module.itemCollection() ) ) {
                    throw new Error('The item collection does not exist or is not properly set in module : ' + module.id );
              }
              if ( module.isItemRegistered( id_candidate ) ) {
                key++; i++;
                return module.generateItemId( prefix, key, i );
              }
              return id_candidate;
      },
      _getNextItemKeyInCollection : function() {
              var module = this,
                _maxItem = {},
                _next_key = 0;
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
              if ( ! _.isUndefined( _maxItem ) && _.isNumber( _maxItem.id.replace(/[^\/\d]/g,'') ) ) {
                    _next_key = parseInt( _maxItem.id.replace(/[^\/\d]/g,''), 10 ) + 1;
              }
              return _next_key;
      },
      isItemRegistered : function( id_candidate ) {
            var module = this;
            return ! _.isUndefined( _.findWhere( module.itemCollection(), { id : id_candidate}) );
      },
      updateItemsCollection : function( args ) {
              var module = this,
                  _current_collection = module.itemCollection(),
                  _new_collection = _.clone(_current_collection),
                  dfd = $.Deferred();
              if ( _.has( args, 'collection' ) ) {
                    module.itemCollection.set( args.collection );
                    return;
              }

              if ( ! _.has( args, 'item' ) ) {
                  throw new Error('updateItemsCollection, no item provided ' + module.control.id + '. Aborting');
              }
              args = _.extend( { params : {} }, args );

              var item_candidate = _.clone( args.item ),
                  hasMissingProperty = false;
              _.each( module.defaultItemModel, function( itemData, key ) {
                    if ( ! _.has( item_candidate, key ) ) {
                          throw new Error( 'CZRModuleMths => updateItemsCollection : Missing property "' + key + '" for item candidate' );
                    }
              });

              if ( hasMissingProperty )
                return;
              if ( _.findWhere( _new_collection, { id : item_candidate.id } ) ) {
                    _.each( _current_collection , function( _item, _ind ) {
                          if ( _item.id != item_candidate.id )
                            return;
                          _new_collection[_ind] = item_candidate;
                    });
              }
              else {
                  _new_collection.push( item_candidate );
              }
              module.itemCollection.set( _new_collection, args.params );
              return dfd.resolve( { collection : _new_collection, params : args.params } ).promise();
      },
      _getSortedDOMItemCollection : function( ) {
              var module = this,
                  _old_collection = _.clone( module.itemCollection() ),
                  _new_collection = [],
                  dfd = $.Deferred();
              $( '.' + module.control.css_attr.single_item, module.container ).each( function( _index ) {
                    var _item = _.findWhere( _old_collection, {id: $(this).attr('data-id') });
                    if ( ! _item )
                      return;

                    _new_collection[_index] = _item;
              });

              if ( _old_collection.length != _new_collection.length ) {
                  throw new Error('There was a problem when re-building the item collection from the DOM in module : ' + module.id );
              }
              return dfd.resolve( _new_collection ).promise();
      },
      refreshItemCollection : function() {
            var module = this;
            module.czr_Item.each( function( _itm ) {
                  if ( module.czr_Item( _itm.id ).container && 0 < module.czr_Item( _itm.id ).container.length ) {
                        $.when( module.czr_Item( _itm.id ).container.remove() ).done( function() {
                              module.czr_Item.remove( _itm.id );
                        });
                  }
            });
            module.itemCollection = new api.Value( [] );
            module.populateSavedItemCollection();
      }
});//$.extend//CZRBaseControlMths
})( wp.customize , jQuery, _ );//MULTI CONTROL CLASS

var CZRModuleMths = CZRModuleMths || {};
( function ( api, $, _ ) {
$.extend( CZRModuleMths, {
      getDefaultItemModel : function( id ) {
              var module = this;
              return $.extend( _.clone( module.defaultItemModel ), { id : id || '' } );
      },
      _initNewItem : function( _item , _next_key ) {
              var module = this,
                  _new_item = { id : '' },
                  _id;
              _next_key = 'undefined' != typeof(_next_key) ? _next_key : _.size( module.itemCollection() );

              if ( _.isNumber(_next_key) ) {
                _id = module.module_type + '_' + _next_key;
              }
              else {
                _id = _next_key;
                _next_key = 0;
              }

              if ( _item && ! _.isEmpty( _item) )
                _new_item = $.extend( _item, { id : _id } );
              else
                _new_item = this.getDefaultItemModel( _id );
              if ( _.has(_new_item, 'id') && module._isItemIdPossible(_id) ) {
                    _.map( module.getDefaultItemModel() , function( value, property ){
                          if ( ! _.has(_new_item, property) )
                            _new_item[property] = value;
                    });

                return _new_item;
              }
              return module._initNewItem( _new_item, _next_key + 1);
      }
});//$.extend
})( wp.customize , jQuery, _ );//MULTI CONTROL CLASS

var CZRModuleMths = CZRModuleMths || {};
( function ( api, $, _ ) {
$.extend( CZRModuleMths, {
      renderModuleParts : function() {
            var module = this,
                $_moduleContentEl = $( module.container ),
                dfd = $.Deferred();

            var appendAndResolve = function( _tmpl_ ) {
                  if ( module.isCrud() ) {
                        if ( _.isEmpty( _tmpl_ ) ) {
                              dfd.reject( 'renderModuleParts => Missing html template for module : '+ module.id );
                        }
                        $_moduleContentEl.append( _tmpl_ );
                  }
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
            if ( module.isCrud() ) {
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
      getViewEl : function( id ) {
              var module = this;
              return $( '[data-id = "' + id + '"]', module.container );
      },
      closeAllItems : function( id ) {
              var module = this,
                  _current_collection = _.clone( module.itemCollection() ),
                  _filtered_collection = _.filter( _current_collection , function( mod) { return mod.id != id; } );

              _.each( _filtered_collection, function( _item ) {
                    if ( module.czr_Item.has(_item.id) && 'expanded' == module.czr_Item(_item.id)._getViewState(_item.id) )
                      module.czr_Item( _item.id ).viewState.set( 'closed' ); // => will fire the cb toggleItemExpansion
              } );
              return this;
      },
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
      closeRemoveDialogs : function() {
              var module = this;
              if ( ! _.isArray( module.itemCollection() ) )
                return;

              module.czr_Item.each( function( _item_ ) {
                    _item_.removeDialogVisible( false );
              });
              return this;
      },
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
                    }//update
                  }
              );
        },



      /*-----------------------------------------------
      * TABS NAVIGATION IN ITEMS AND MODOPT
      ------------------------------------------------*/
      toggleTabVisibility : function( tabIdSwitchedTo ) {
            var inputParent = this,
                tabs = $( inputParent.container ).find('li'),
                content_items = $( inputParent.container ).find('section');

            $( '.tabs nav li', inputParent.container ).each( function() {
                  $(this).removeClass('tab-current').addClass('tab-inactive');
            });
            $( inputParent.container ).find('li[data-tab-id="' + tabIdSwitchedTo + '"]').addClass('tab-current').removeClass('tab-inactive');

            $( 'section', inputParent.container ).each( function() {
                    $(this).removeClass('content-current');
            });
            $( inputParent.container ).find('section[id="' + tabIdSwitchedTo + '"]').addClass('content-current');
      },
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

var CZRDynModuleMths = CZRDynModuleMths || {};
( function ( api, $, _ ) {
$.extend( CZRDynModuleMths, {
      initialize: function( id, options ) {
            var module = this;
            api.CZRModule.prototype.initialize.call( module, id, options );
            $.extend( module, {
                itemPreAddEl : ''//is specific for each crud module
            } );

            module.preItemsWrapper = '';//will store the pre items wrapper
            module.preItemExpanded = new api.Value( false );
            module.itemAddedMessage = serverControlParams.i18n.successMessage;
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
                  {
                        trigger   : 'click keydown',
                        selector  : [ '.' + module.control.css_attr.open_pre_add_btn, '.' + module.control.css_attr.cancel_pre_add_btn ].join(','),
                        name      : 'pre_add_item',
                        actions   : [
                              'closeAllItems',
                              'closeRemoveDialogs',
                              function( params ) {
                                    var module = this,
                                        canWe = { addTheItem : true };
                                    module.trigger( 'is-item-addition-possible', canWe );
                                    if ( canWe.addTheItem && module.hasPreItem ) {
                                          module.preItemExpanded.set( ! module.preItemExpanded() );
                                    } else {
                                          _doAddItem( params );
                                    }
                              },
                        ],
                  },
                  {
                        trigger   : 'click keydown',
                        selector  : '.' + module.control.css_attr.add_new_btn, //'.czr-add-new',
                        name      : 'add_item',
                        actions   : function( params ) {
                              module.closeRemoveDialogs( params ).closeAllItems( params );
                              _doAddItem( params );
                        }
                  }
            ]);//module.userEventMap
      },//initialize()
      ready : function() {
            var module = this;
            module.setupDOMListeners( module.userEventMap() , { dom_el : module.container } );
            module.preItem = new api.Value( module.getDefaultItemModel() );
            module.preItemExpanded.callbacks.add( function( isExpanded ) {
                  if ( isExpanded ) {
                        module.renderPreItemView()
                              .done( function( $preWrapper ) {
                                    module.preItemsWrapper = $preWrapper;
                                    module.preItem( module.getDefaultItemModel() );

                                    module.trigger( 'before-pre-item-input-collection-setup' );
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
                  module._togglePreItemViewExpansion( isExpanded );
            });

            api.CZRModule.prototype.ready.call( module );//fires the parent
      },//ready()
      setupPreItemInputCollection : function() {
            var module = this;
            module.preItem.czr_Input = new api.Values();
            $('.' + module.control.css_attr.pre_add_wrapper, module.container)
                  .find( '.' + module.control.css_attr.sub_set_wrapper)
                  .each( function( _index ) {
                        var _id = $(this).find('[data-czrtype]').attr('data-czrtype') || 'sub_set_' + _index;
                        module.preItem.czr_Input.add( _id, new module.inputConstructor( _id, {//api.CZRInput;
                              id : _id,
                              type : $(this).attr('data-input-type'),
                              container : $(this),
                              input_parent : module.preItem,
                              module : module,
                              is_preItemInput : true
                        } ) );
                        module.preItem.czr_Input( _id ).ready();
                  });//each

            module.trigger( 'pre-item-input-collection-ready' );
      },
      itemCanBeInstantiated : function() {
            return true;
      },
      addItem : function( params ) {
            var dfd = $.Deferred();
            if ( ! this.itemCanBeInstantiated() ) {
                  return dfd.reject().promise();
            }
            var module = this,
                item_candidate = module.preItem(),
                collapsePreItem = function() {
                      module.preItemExpanded.set( false );
                };

            if ( _.isEmpty( item_candidate ) || ! _.isObject( item_candidate ) ) {
                  api.errorLog( 'addItem : an item_candidate should be an object and not empty. In : ' + module.id +'. Aborted.' );
                  return dfd.reject().promise();
            }
            collapsePreItem = _.debounce( collapsePreItem, 200 );
            var _doInstantiate_ = function() {
                  var _item_instance_ = module.instantiateItem( item_candidate, true );//true == Added by user
                  if ( _.isFunction( _item_instance_ ) ) {
                        _item_instance_.ready();
                  } else {
                        api.errare( 'populateSavedItemCollection => Could not instantiate item in module ' + module.id , item_candidate );
                  }
                  return _item_instance_;
            };
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
            $.Deferred( function() {
                  var _dfd_ = this;
                  module.czr_Item( item_candidate.id ).isReady.then( function() {
                        collapsePreItem();

                        module.trigger('item-added', item_candidate );

                        var resolveWhenPreviewerReady = function() {
                              api.previewer.unbind( 'ready', resolveWhenPreviewerReady );
                              _dfd_.resolve();
                        };
                        if ( module.refresh_on_add_item ) {
                              if ( 'postMessage' == api(module.control.id).transport && _.has( params, 'dom_event') && ! _.has( params.dom_event, 'isTrigger' ) && ! api.CZR_Helpers.hasPartRefresh( module.control.id ) ) {
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

var CZRDynModuleMths = CZRDynModuleMths || {};
( function ( api, $, _ ) {
$.extend( CZRDynModuleMths, {
      renderPreItemView : function( obj ) {
              var module = this,
                  dfd = $.Deferred(),
                  pre_add_template;
              if ( _.isObject( module.preItemsWrapper ) && 0 < module.preItemsWrapper.length ) { //was ! _.isEmpty( module.czr_preItem('item_content')() ) )
                    return dfd.resolve( module.preItemsWrapper ).promise();
              }

              var appendAndResolve = function( _tmpl_ ){
                    if ( _.isEmpty( _tmpl_ ) || ! module.container ) {
                          dfd.reject( 'renderPreItemView => Missing html template for module : '+ module.id );
                    }

                    var $_pre_add_el = $('.' + module.control.css_attr.pre_add_item_content, module.container );

                    $_pre_add_el.prepend( $('<div>', { class : 'pre-item-wrapper'} ) );
                    $_pre_add_el.find('.pre-item-wrapper').append( _tmpl_ );
                    dfd.resolve( $_pre_add_el.find('.pre-item-wrapper') ).promise();
              };
              if ( ! _.isEmpty( module.itemPreAddEl ) ) {
                    if ( 1 > $( '#tmpl-' + module.itemPreAddEl ).length ) {
                          dfd.reject( 'renderPreItemView => Missing itemPreAddEl or template in module '+ module.id );
                    }
                    appendAndResolve( wp.template( module.itemPreAddEl )() );
              } else {
                    api.CZR_Helpers.getModuleTmpl( {
                          tmpl : 'pre-item',
                          module_type: module.module_type,
                          module_id : module.id,
                          control_id : module.control.id
                    } ).done( function( _serverTmpl_ ) {
                          appendAndResolve( api.CZR_Helpers.parseTemplate( _serverTmpl_ )() );
                    }).fail( function( _r_ ) {
                          dfd.reject( [ 'renderPreItemView for module : ', module.id , _r_ ].join(' ') );
                    });
              }
              return dfd.promise();
      },
      _getPreItemView : function() {
              var module = this;
              return $('.' +  module.control.css_attr.pre_add_item_content, module.container );
      },
      _togglePreItemViewExpansion : function( _is_expanded ) {
              var module = this,
                $_pre_add_el = $( '.' +  module.control.css_attr.pre_add_item_content, module.container );
              $_pre_add_el.slideToggle( {
                    duration : 200,
                    done : function() {
                          var $_btn = $( '.' +  module.control.css_attr.open_pre_add_btn, module.container );

                          $(this).toggleClass('open' , _is_expanded );
                          if ( _is_expanded )
                            $_btn.find('.fas').removeClass('fa-plus-square').addClass('fa-minus-square');
                          else
                            $_btn.find('.fas').removeClass('fa-minus-square').addClass('fa-plus-square');
                          $_btn.toggleClass( 'active', _is_expanded );
                          $( module.container ).toggleClass(  module.control.css_attr.adding_new, _is_expanded );
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
                  $_success_wrapper.find('p').text(_message);
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

var CZRBaseControlMths = CZRBaseControlMths || {};
( function ( api, $, _ ) {
$.extend( CZRBaseControlMths, {
      initialize: function( id, options ) {
            var control = this;
            control.css_attr = _.has( serverControlParams , 'css_attr') ? serverControlParams.css_attr : {};
            api.Control.prototype.initialize.call( control, id, options );
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
      refreshPreview : function( obj ) {
            this.previewer.refresh();
      }
});//$.extend//CZRBaseControlMths
})( wp.customize , jQuery, _ );
var CZRBaseModuleControlMths = CZRBaseModuleControlMths || {};
( function ( api, $, _ ) {
$.extend( CZRBaseModuleControlMths, {
      initialize: function( id, options ) {
              var control = this;
              if ( ! api.has( id ) ) {
                    throw new Error( 'Missing a registered setting for control : ' + id );
              }


              control.czr_Module = new api.Values();
              control.czr_moduleCollection = new api.Value();
              control.czr_moduleCollection.set([]);
              control.moduleCollectionReady = $.Deferred();
              control.moduleCollectionReady.done( function( obj ) {
                    control.czr_moduleCollection.callbacks.add( function() { return control.moduleCollectionReact.apply( control, arguments ); } );
              } );

              api.CZRBaseControl.prototype.initialize.call( control, id, options );
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
      ready : function() {
              var control = this,
                  single_module = {},
                  savedModules;
              try { savedModules = control.getSavedModules(); } catch( er ) {
                    api.errare( 'api.CZRBaseControl::ready() => error on control.getSavedModules()', er );
                    control.moduleCollectionReady.reject();
                    return;
              }
              _.each( control.getSavedModules() , function( _mod, _key ) {
                    single_module = _mod;
                    if ( serverControlParams.isDevMode ) {
                          control.instantiateModule( _mod, {} );
                    } else {
                          try { control.instantiateModule( _mod, {} ); } catch( er ) {
                                api.errare( 'api.CZRBaseControl::Failed to instantiate module ' + _mod.id , er );
                                return;
                          }
                    }
                    control.container.attr('data-module', _mod.id );
              });
              control.moduleCollectionReady.resolve( single_module );
      },
      getDefaultModuleApiModel : function() {
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
      getSavedModules : function() {
              var control = this,
                  _savedModulesCandidates = [],
                  _module_type = control.params.module_type,
                  _raw_saved_module_val = [],
                  _saved_items = [],
                  _saved_modOpt = {};
              if ( ! api.CZR_Helpers.isMultiItemModule( _module_type ) && ! _.isEmpty( api( control.id )() ) && ! _.isObject( api( control.id )() ) ) {
                    api.errare('api.CZRBaseControl::getSavedModules => module Control Init for ' + control.id + '  : a mono item module control value should be an object if not empty.');
              }
              var settingId = api.CZR_Helpers.getControlSettingId( control.id ),
                  settingVal = api( settingId )();
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
                    if ( ! _.isEmpty( item_or_mod_opt_candidate ) ) {
                          _.each( item_or_mod_opt_candidate, function( prop, _key_ ) {
                                if ( ! _.isString( _key_ ) ) {
                                      api.errare( 'api.CZRBaseControl::::getSavedModules => item not well formed in control : ' + control.id + ' => module type => ' + control.params.module_type, _raw_saved_module_val );
                                      return;
                                }
                          });
                    }
                    if ( api.CZR_Helpers.hasModuleModOpt( _module_type ) && 0*0 === key ) {
                          if ( _.has( item_or_mod_opt_candidate, 'id') ) {
                                api.errare( 'api.CZRBaseControl::getSavedModules : the module ' + _module_type + ' in control ' + control.id + ' has no mod_opt defined while it should.' );
                          } else {
                                _saved_modOpt = item_or_mod_opt_candidate;
                          }
                    }
                    if ( ! _.has( item_or_mod_opt_candidate, 'is_mod_opt' ) ) {
                          _saved_items.push( item_or_mod_opt_candidate );
                    }
              });
              _savedModulesCandidates.push({
                    id : api.CZR_Helpers.getOptionName( control.id ) + '_' + control.params.type,
                    module_type : control.params.module_type,
                    section : control.section(),
                    modOpt : $.extend( true, {} , _saved_modOpt ),//disconnect with a deep cloning
                    items : $.extend( true, [] , _saved_items )//disconnect with a deep cloning
              });

              return _savedModulesCandidates;
      },
      isModuleRegistered : function( id_candidate ) {
            var control = this;
            return ! _.isUndefined( _.findWhere( control.czr_moduleCollection(), { id : id_candidate}) );
      }
});//$.extend//CZRBaseControlMths
})( wp.customize , jQuery, _ );
var CZRBaseModuleControlMths = CZRBaseModuleControlMths || {};
( function ( api, $, _ ) {
$.extend( CZRBaseModuleControlMths, {
      instantiateModule : function( module, constructor ) {
              if ( ! _.has( module,'id') ) {
                    throw new Error('CZRModule::instantiateModule() : a module has no id and could not be added in the collection of : ' + this.id +'. Aborted.' );
              }
              var control = this;
              if ( _.isUndefined(constructor) || _.isEmpty(constructor) ) {
                    constructor = control.getModuleConstructor( module );
              }
              if ( ! _.isEmpty( module.id ) && control.czr_Module.has( module.id ) ) {
                    throw new Error('The module id already exists in the collection in control : ' + control.id );
              }

              var module_api_ready = control.prepareModuleForAPI( module );
              control.czr_Module.add( module_api_ready.id, new constructor( module_api_ready.id, module_api_ready ) );

              if ( ! control.czr_Module.has( module_api_ready.id ) ) {
                    throw new Error('instantiateModule() : instantiation failed for module id ' + module_api_ready.id + ' in control ' + control.id  );
              }
              return control.czr_Module(module_api_ready.id);
      },
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

              var _mthds = api.czrModuleMap[ module.module_type ].mthds,
                  _is_crud = api.czrModuleMap[ module.module_type ].crud,
                  _base_constructor = _is_crud ? api.CZRDynModule : api.CZRModule;

              constructor = _base_constructor.extend( _mthds );

              if ( _.isUndefined( constructor ) || _.isEmpty(constructor) || ! constructor ) {
                    throw new Error('CZRModule::getModuleConstructor : no constructor found for module type : ' + module.module_type +'.' );
              }
              return constructor;
      },
      prepareModuleForAPI : function( module_candidate ) {
            if ( ! _.isObject( module_candidate ) ) {
                throw new Error('prepareModuleForAPI : a module must be an object to be instantiated.');
            }

            var control = this,
                api_ready_module = {};
            _.each( control.getDefaultModuleApiModel() , function( _defaultValue, _key ) {
                  var _candidate_val = module_candidate[_key];
                  switch( _key ) {
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
                        case 'sortable' :
                              if ( _.has( api.czrModuleMap, module_candidate.module_type ) ) {
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
                        case  'section' :
                              if ( ! _.isString( _candidate_val ) || _.isEmpty( _candidate_val ) ) {
                                    throw new Error('prepareModuleForAPI : a module section must be a string not empty');
                              }
                              api_ready_module[_key] = _candidate_val;
                        break;
                        case 'dirty' :
                              api_ready_module[_key] = _candidate_val || false;
                        break;
                  }//switch
            });
            return api_ready_module;
      },
      generateModuleId : function( module_type, key, i ) {
              i = i || 1;
              if ( i > 100 ) {
                    throw new Error('Infinite loop when generating of a module id.');
              }
              var control = this;
              key = key || control._getNextModuleKeyInCollection();
              var id_candidate = module_type + '_' + key;
              if ( ! _.has(control, 'czr_moduleCollection') || ! _.isArray( control.czr_moduleCollection() ) ) {
                    throw new Error('The module collection does not exist or is not properly set in control : ' + control.id );
              }
              if ( control.isModuleRegistered( id_candidate ) ) {
                key++; i++;
                return control.generateModuleId( module_type, key, i );
              }

              return id_candidate;
      },
      _getNextModuleKeyInCollection : function() {
              var control = this,
                _max_mod_key = {},
                _next_key = 0;
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
var CZRBaseModuleControlMths = CZRBaseModuleControlMths || {};
( function ( api, $, _ ) {
$.extend( CZRBaseModuleControlMths, {
      updateModulesCollection : function( obj ) {
              var control = this,
                  _current_collection = control.czr_moduleCollection(),
                  _new_collection = $.extend( true, [], _current_collection);
              if ( _.has( obj, 'collection' ) ) {
                    control.czr_moduleCollection.set( obj.collection, obj.data || {} );
                    return;
              }

              if ( ! _.has(obj, 'module') ) {
                    throw new Error('updateModulesCollection, no module provided ' + control.id + '. Aborting');
              }
              var module_api_ready = control.prepareModuleForAPI( _.clone( obj.module ) );
              if ( _.findWhere( _new_collection, { id : module_api_ready.id } ) ) {
                    _.each( _current_collection , function( _elt, _ind ) {
                          if ( _elt.id != module_api_ready.id )
                            return;
                          _new_collection[_ind] = module_api_ready;
                    });
              }
              else {
                    _new_collection.push( module_api_ready );
              }
              var _params = {};
              if ( _.has( obj, 'data') ) {
                    _params = $.extend( true, {}, obj.data );
                    $.extend( _params, { module : module_api_ready } );
              }
              control.czr_moduleCollection.set( _new_collection, _params );
      },
      moduleCollectionReact : function( to, from, params ) {
            var control = this,
                is_module_added = _.size(to) > _.size(from),
                is_module_removed = _.size(from) > _.size(to),
                is_module_update = _.size(from) == _.size(to);
                is_collection_sorted = false;
            if ( is_module_removed ) {
                  var _to_remove = _.filter( from, function( _mod ){
                      return _.isUndefined( _.findWhere( to, { id : _mod.id } ) );
                  });
                  _to_remove = _to_remove[0];
                  control.czr_Module.remove( _to_remove.id );
            }
            if ( _.isObject( params  ) && _.has( params, 'module' ) ) {
                  params.module_id = params.module.id;
                  params.moduleRegistrationParams = params.module;
                  params.module = control.prepareModuleForDB( $.extend( true, {}, params.module  ) );
            }
            if ( ! is_module_added ) {
                  if ( serverControlParams.isDevMode ) {
                        api( this.id ).set( control.filterModuleCollectionBeforeAjax( to ), params );
                  } else {
                        try { api( this.id ).set( control.filterModuleCollectionBeforeAjax( to ), params ); } catch( er ) {
                              api.errare( 'api.CZRBaseControl::moduleCollectionReact => error when firing control.filterModuleCollectionBeforeAjax( to )', er );
                        }
                  }
            }
      },
      filterModuleCollectionBeforeAjax : function( collection ) {
              var control = this,
                  cloned_collection = $.extend( true, [], collection ),
                  _filtered_collection = [],
                  itemsToReturn;

              _.each( cloned_collection , function( _mod, _key ) {
                    var db_ready_mod = $.extend( true, {}, _mod );
                    _filtered_collection[_key] = control.prepareModuleForDB( db_ready_mod );
              });
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
              itemsToReturn = module_instance.isMultiItem() ? module_instance().items : ( module_instance().items[0] || [] );
              itemsToReturn = module_instance.filterItemsBeforeCoreApiSettingValue( itemsToReturn );
              return module_instance.hasModOpt() ? _.union( [ module_instance().modOpt ] , itemsToReturn ) : itemsToReturn;
      },
      prepareModuleForDB : function ( module_db_candidate ) {
            var control = this;
            if ( ! _.isObject( module_db_candidate ) ) {
                  throw new Error('::prepareModuleForDB : a module must be an object.');
            }
            var db_ready_module = {};
            if ( ! _.isArray( module_db_candidate['items'] )  ) {
                  throw new Error('::prepareModuleForDB : a module item list must be an array');
            }
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
      $.extend( CZRBaseControlMths, api.Events );
      $.extend( api.Control.prototype, api.Events );//ensures that the default WP control constructor is extended as well
      $.extend( CZRModuleMths, api.Events );
      $.extend( CZRItemMths, api.Events );
      $.extend( CZRModOptMths, api.Events );
      $.extend( CZRBaseControlMths, api.CZR_Helpers );
      $.extend( CZRInputMths, api.CZR_Helpers );
      $.extend( CZRModuleMths, api.CZR_Helpers );
      api.CZRInput                  = api.Value.extend( CZRInputMths );
      api.czrInputMap = api.czrInputMap || {};
      $.extend( api.czrInputMap, {
            text      : '',
            textarea  : '',
            check     : 'setupIcheck',
            checkbox     : 'setupIcheck',
            gutencheck : 'setupGutenCheck',
            select    : 'setupSelect',
            radio     : 'setupRadio',
            number    : 'setupStepper',
            upload    : 'setupImageUploaderSaveAsId',
            upload_url : 'setupImageUploaderSaveAsUrl',
            color     : 'setupColorPicker',
            wp_color_alpha : 'setupColorPickerAlpha',
            wp_color  : 'setupWPColorPicker',//not used for the moment
            content_picker : 'setupContentPicker',
            tiny_mce_editor : 'setupTinyMceEditor',
            password : '',
            range : 'setupSimpleRange',
            range_slider : 'setupRangeSlider',
            hidden : '',
            h_alignment : 'setupHAlignement',
            h_text_alignment : 'setupHAlignement'
      });
      api.CZRItem                   = api.Value.extend( CZRItemMths );
      api.CZRModOpt                 = api.Value.extend( CZRModOptMths );
      api.CZRModule                 = api.Value.extend( CZRModuleMths );
      api.CZRDynModule              = api.CZRModule.extend( CZRDynModuleMths );
      api.CZRBaseControl            = api.Control.extend( CZRBaseControlMths );
      api.CZRBaseModuleControl      = api.CZRBaseControl.extend( CZRBaseModuleControlMths );

      $.extend( api.controlConstructor, { czr_module : api.CZRBaseModuleControl });
})( wp.customize, jQuery, _ );
( function ( wp, $ ) {
      $( function($) {
            var api = wp.customize || api;

            var fireHeaderButtons = function() {
                  var $header_button;

                  $header_button = $('<span/>', {
                        class:'customize-controls-home-or-add fas fa-home',
                        html:'<span class="screen-reader-text">Home</span>'
                  });

                  $.when( $('#customize-header-actions').append( $header_button ) )
                        .done( function() {
                              $header_button
                                    .keydown( function( event ) {
                                          if ( 9 === event.which ) // tab
                                            return;
                                          if ( 13 === event.which ) // enter
                                            this.click();
                                          event.preventDefault();
                                    })
                                    .on( 'click.customize-controls-home-or-add', function() {
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

            fireHeaderButtons();

      });//end of $( function($) ) dom ready
})( wp, jQuery );