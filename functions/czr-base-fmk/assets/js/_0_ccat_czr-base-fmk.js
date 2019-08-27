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
                        appendAndResolve( wp.template( _template_selector )( $.extend( item_model_for_template_injection, { is_sortable : module.sortable } ) ) );
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
            // used in Nimble to delay the instantiation of the input when the control accordion is expanded
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
      addItem : function( params ) {
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

              var _mthds = api.czrModuleMap[ module.module_type ].mthds,
                  _is_crud = api.czrModuleMap[ module.module_type ].crud,
                  _base_constructor = _is_crud ? api.CZRDynModule : api.CZRModule;

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
            h_text_alignment : 'setupHAlignement'
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
                              $header_button
                                    .keydown( function( event ) {
                                          if ( 9 === event.which ) // tab
                                            return;
                                          if ( 13 === event.which ) // enter
                                            this.click();
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

            fireHeaderButtons();

      });//end of $( function($) ) dom ready
})( wp, jQuery );