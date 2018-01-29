window.addEventListener=window.addEventListener||function(r,t){window.attachEvent("on"+r,t)},Date.now||(Date.now=function(){return(new Date).getTime()}),Object.create||(Object.create=function(r,t){if(void 0!==t)throw"The multiple-argument version of Object.create is not provided by this browser and cannot be shimmed.";function e(){}return e.prototype=r,new e}),Array.prototype.filter||(Array.prototype.filter=function(r){"use strict";if(void 0===this||null===this)throw new TypeError;var t=Object(this),e=t.length>>>0;if("function"!=typeof r)throw new TypeError;for(var n=[],o=arguments.length>=2?arguments[1]:void 0,i=0;i<e;i++)if(i in t){var a=t[i];r.call(o,a,i,t)&&n.push(a)}return n}),Array.prototype.map||(Array.prototype.map=function(r,t){var e,n,o;if(null===this)throw new TypeError(" this is null or not defined");var i=Object(this),a=i.length>>>0;if("function"!=typeof r)throw new TypeError(r+" is not a function");for(arguments.length>1&&(e=t),n=new Array(a),o=0;o<a;){var f,u;o in i&&(f=i[o],u=r.call(e,f,o,i),n[o]=u),o++}return n}),Array.from||(Array.from=function(){var r=Object.prototype.toString,t=function(t){return"function"==typeof t||"[object Function]"===r.call(t)},e=Math.pow(2,53)-1,n=function(r){var t,n=(t=Number(r),isNaN(t)?0:0!==t&&isFinite(t)?(t>0?1:-1)*Math.floor(Math.abs(t)):t);return Math.min(Math.max(n,0),e)};return function(r){var e=Object(r);if(null==r)throw new TypeError("Array.from requires an array-like object - not null or undefined");var o,i=arguments.length>1?arguments[1]:void 0;if(void 0!==i){if(!t(i))throw new TypeError("Array.from: when provided, the second argument must be a function");arguments.length>2&&(o=arguments[2])}for(var a,f=n(e.length),u=t(this)?Object(new this(f)):new Array(f),c=0;c<f;)a=e[c],u[c]=i?void 0===o?i(a,c):i.call(o,a,c):a,c+=1;return u.length=f,u}}());/*! iCheck v1.0.1 by Damir Sultanov, http://git.io/arlzeA, MIT Licensed */
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
}/*! Select2 4.0.3 | https://github.com/select2/select2/blob/master/LICENSE.md */!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a("object"==typeof exports?require("jquery"):jQuery)}(function(a){var b=function(){if(a&&a.fn&&a.fn.select2&&a.fn.select2.amd)var b=a.fn.select2.amd;var b;return function(){if(!b||!b.requirejs){b?c=b:b={};var a,c,d;!function(b){function e(a,b){return u.call(a,b)}function f(a,b){var c,d,e,f,g,h,i,j,k,l,m,n=b&&b.split("/"),o=s.map,p=o&&o["*"]||{};if(a&&"."===a.charAt(0))if(b){for(a=a.split("/"),g=a.length-1,s.nodeIdCompat&&w.test(a[g])&&(a[g]=a[g].replace(w,"")),a=n.slice(0,n.length-1).concat(a),k=0;k<a.length;k+=1)if(m=a[k],"."===m)a.splice(k,1),k-=1;else if(".."===m){if(1===k&&(".."===a[2]||".."===a[0]))break;k>0&&(a.splice(k-1,2),k-=2)}a=a.join("/")}else 0===a.indexOf("./")&&(a=a.substring(2));if((n||p)&&o){for(c=a.split("/"),k=c.length;k>0;k-=1){if(d=c.slice(0,k).join("/"),n)for(l=n.length;l>0;l-=1)if(e=o[n.slice(0,l).join("/")],e&&(e=e[d])){f=e,h=k;break}if(f)break;!i&&p&&p[d]&&(i=p[d],j=k)}!f&&i&&(f=i,h=j),f&&(c.splice(0,h,f),a=c.join("/"))}return a}function g(a,c){return function(){var d=v.call(arguments,0);return"string"!=typeof d[0]&&1===d.length&&d.push(null),n.apply(b,d.concat([a,c]))}}function h(a){return function(b){return f(b,a)}}function i(a){return function(b){q[a]=b}}function j(a){if(e(r,a)){var c=r[a];delete r[a],t[a]=!0,m.apply(b,c)}if(!e(q,a)&&!e(t,a))throw new Error("No "+a);return q[a]}function k(a){var b,c=a?a.indexOf("!"):-1;return c>-1&&(b=a.substring(0,c),a=a.substring(c+1,a.length)),[b,a]}function l(a){return function(){return s&&s.config&&s.config[a]||{}}}var m,n,o,p,q={},r={},s={},t={},u=Object.prototype.hasOwnProperty,v=[].slice,w=/\.js$/;o=function(a,b){var c,d=k(a),e=d[0];return a=d[1],e&&(e=f(e,b),c=j(e)),e?a=c&&c.normalize?c.normalize(a,h(b)):f(a,b):(a=f(a,b),d=k(a),e=d[0],a=d[1],e&&(c=j(e))),{f:e?e+"!"+a:a,n:a,pr:e,p:c}},p={require:function(a){return g(a)},exports:function(a){var b=q[a];return"undefined"!=typeof b?b:q[a]={}},module:function(a){return{id:a,uri:"",exports:q[a],config:l(a)}}},m=function(a,c,d,f){var h,k,l,m,n,s,u=[],v=typeof d;if(f=f||a,"undefined"===v||"function"===v){for(c=!c.length&&d.length?["require","exports","module"]:c,n=0;n<c.length;n+=1)if(m=o(c[n],f),k=m.f,"require"===k)u[n]=p.require(a);else if("exports"===k)u[n]=p.exports(a),s=!0;else if("module"===k)h=u[n]=p.module(a);else if(e(q,k)||e(r,k)||e(t,k))u[n]=j(k);else{if(!m.p)throw new Error(a+" missing "+k);m.p.load(m.n,g(f,!0),i(k),{}),u[n]=q[k]}l=d?d.apply(q[a],u):void 0,a&&(h&&h.exports!==b&&h.exports!==q[a]?q[a]=h.exports:l===b&&s||(q[a]=l))}else a&&(q[a]=d)},a=c=n=function(a,c,d,e,f){if("string"==typeof a)return p[a]?p[a](c):j(o(a,c).f);if(!a.splice){if(s=a,s.deps&&n(s.deps,s.callback),!c)return;c.splice?(a=c,c=d,d=null):a=b}return c=c||function(){},"function"==typeof d&&(d=e,e=f),e?m(b,a,c,d):setTimeout(function(){m(b,a,c,d)},4),n},n.config=function(a){return n(a)},a._defined=q,d=function(a,b,c){if("string"!=typeof a)throw new Error("See almond README: incorrect module build, no module name");b.splice||(c=b,b=[]),e(q,a)||e(r,a)||(r[a]=[a,b,c])},d.amd={jQuery:!0}}(),b.requirejs=a,b.require=c,b.define=d}}(),b.define("almond",function(){}),b.define("jquery",[],function(){var b=a||$;return null==b&&console&&console.error&&console.error("Select2: An instance of jQuery or a jQuery-compatible library was not found. Make sure that you are including jQuery before Select2 on your web page."),b}),b.define("select2/utils",["jquery"],function(a){function b(a){var b=a.prototype,c=[];for(var d in b){var e=b[d];"function"==typeof e&&"constructor"!==d&&c.push(d)}return c}var c={};c.Extend=function(a,b){function c(){this.constructor=a}var d={}.hasOwnProperty;for(var e in b)d.call(b,e)&&(a[e]=b[e]);return c.prototype=b.prototype,a.prototype=new c,a.__super__=b.prototype,a},c.Decorate=function(a,c){function d(){var b=Array.prototype.unshift,d=c.prototype.constructor.length,e=a.prototype.constructor;d>0&&(b.call(arguments,a.prototype.constructor),e=c.prototype.constructor),e.apply(this,arguments)}function e(){this.constructor=d}var f=b(c),g=b(a);c.displayName=a.displayName,d.prototype=new e;for(var h=0;h<g.length;h++){var i=g[h];d.prototype[i]=a.prototype[i]}for(var j=(function(a){var b=function(){};a in d.prototype&&(b=d.prototype[a]);var e=c.prototype[a];return function(){var a=Array.prototype.unshift;return a.call(arguments,b),e.apply(this,arguments)}}),k=0;k<f.length;k++){var l=f[k];d.prototype[l]=j(l)}return d};var d=function(){this.listeners={}};return d.prototype.on=function(a,b){this.listeners=this.listeners||{},a in this.listeners?this.listeners[a].push(b):this.listeners[a]=[b]},d.prototype.trigger=function(a){var b=Array.prototype.slice,c=b.call(arguments,1);this.listeners=this.listeners||{},null==c&&(c=[]),0===c.length&&c.push({}),c[0]._type=a,a in this.listeners&&this.invoke(this.listeners[a],b.call(arguments,1)),"*"in this.listeners&&this.invoke(this.listeners["*"],arguments)},d.prototype.invoke=function(a,b){for(var c=0,d=a.length;d>c;c++)a[c].apply(this,b)},c.Observable=d,c.generateChars=function(a){for(var b="",c=0;a>c;c++){var d=Math.floor(36*Math.random());b+=d.toString(36)}return b},c.bind=function(a,b){return function(){a.apply(b,arguments)}},c._convertData=function(a){for(var b in a){var c=b.split("-"),d=a;if(1!==c.length){for(var e=0;e<c.length;e++){var f=c[e];f=f.substring(0,1).toLowerCase()+f.substring(1),f in d||(d[f]={}),e==c.length-1&&(d[f]=a[b]),d=d[f]}delete a[b]}}return a},c.hasScroll=function(b,c){var d=a(c),e=c.style.overflowX,f=c.style.overflowY;return e!==f||"hidden"!==f&&"visible"!==f?"scroll"===e||"scroll"===f?!0:d.innerHeight()<c.scrollHeight||d.innerWidth()<c.scrollWidth:!1},c.escapeMarkup=function(a){var b={"\\":"&#92;","&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#47;"};return"string"!=typeof a?a:String(a).replace(/[&<>"'\/\\]/g,function(a){return b[a]})},c.appendMany=function(b,c){if("1.7"===a.fn.jquery.substr(0,3)){var d=a();a.map(c,function(a){d=d.add(a)}),c=d}b.append(c)},c}),b.define("select2/results",["jquery","./utils"],function(a,b){function c(a,b,d){this.$element=a,this.data=d,this.options=b,c.__super__.constructor.call(this)}return b.Extend(c,b.Observable),c.prototype.render=function(){var b=a('<ul class="select2-results__options" role="tree"></ul>');return this.options.get("multiple")&&b.attr("aria-multiselectable","true"),this.$results=b,b},c.prototype.clear=function(){this.$results.empty()},c.prototype.displayMessage=function(b){var c=this.options.get("escapeMarkup");this.clear(),this.hideLoading();var d=a('<li role="treeitem" aria-live="assertive" class="select2-results__option"></li>'),e=this.options.get("translations").get(b.message);d.append(c(e(b.args))),d[0].className+=" select2-results__message",this.$results.append(d)},c.prototype.hideMessages=function(){this.$results.find(".select2-results__message").remove()},c.prototype.append=function(a){this.hideLoading();var b=[];if(null==a.results||0===a.results.length)return void(0===this.$results.children().length&&this.trigger("results:message",{message:"noResults"}));a.results=this.sort(a.results);for(var c=0;c<a.results.length;c++){var d=a.results[c],e=this.option(d);b.push(e)}this.$results.append(b)},c.prototype.position=function(a,b){var c=b.find(".select2-results");c.append(a)},c.prototype.sort=function(a){var b=this.options.get("sorter");return b(a)},c.prototype.highlightFirstItem=function(){var a=this.$results.find(".select2-results__option[aria-selected]"),b=a.filter("[aria-selected=true]");b.length>0?b.first().trigger("mouseenter"):a.first().trigger("mouseenter"),this.ensureHighlightVisible()},c.prototype.setClasses=function(){var b=this;this.data.current(function(c){var d=a.map(c,function(a){return a.id.toString()}),e=b.$results.find(".select2-results__option[aria-selected]");e.each(function(){var b=a(this),c=a.data(this,"data"),e=""+c.id;null!=c.element&&c.element.selected||null==c.element&&a.inArray(e,d)>-1?b.attr("aria-selected","true"):b.attr("aria-selected","false")})})},c.prototype.showLoading=function(a){this.hideLoading();var b=this.options.get("translations").get("searching"),c={disabled:!0,loading:!0,text:b(a)},d=this.option(c);d.className+=" loading-results",this.$results.prepend(d)},c.prototype.hideLoading=function(){this.$results.find(".loading-results").remove()},c.prototype.option=function(b){var c=document.createElement("li");c.className="select2-results__option";var d={role:"treeitem","aria-selected":"false"};b.disabled&&(delete d["aria-selected"],d["aria-disabled"]="true"),null==b.id&&delete d["aria-selected"],null!=b._resultId&&(c.id=b._resultId),b.title&&(c.title=b.title),b.children&&(d.role="group",d["aria-label"]=b.text,delete d["aria-selected"]);for(var e in d){var f=d[e];c.setAttribute(e,f)}if(b.children){var g=a(c),h=document.createElement("strong");h.className="select2-results__group";a(h);this.template(b,h);for(var i=[],j=0;j<b.children.length;j++){var k=b.children[j],l=this.option(k);i.push(l)}var m=a("<ul></ul>",{"class":"select2-results__options select2-results__options--nested"});m.append(i),g.append(h),g.append(m)}else this.template(b,c);return a.data(c,"data",b),c},c.prototype.bind=function(b,c){var d=this,e=b.id+"-results";this.$results.attr("id",e),b.on("results:all",function(a){d.clear(),d.append(a.data),b.isOpen()&&(d.setClasses(),d.highlightFirstItem())}),b.on("results:append",function(a){d.append(a.data),b.isOpen()&&d.setClasses()}),b.on("query",function(a){d.hideMessages(),d.showLoading(a)}),b.on("select",function(){b.isOpen()&&(d.setClasses(),d.highlightFirstItem())}),b.on("unselect",function(){b.isOpen()&&(d.setClasses(),d.highlightFirstItem())}),b.on("open",function(){d.$results.attr("aria-expanded","true"),d.$results.attr("aria-hidden","false"),d.setClasses(),d.ensureHighlightVisible()}),b.on("close",function(){d.$results.attr("aria-expanded","false"),d.$results.attr("aria-hidden","true"),d.$results.removeAttr("aria-activedescendant")}),b.on("results:toggle",function(){var a=d.getHighlightedResults();0!==a.length&&a.trigger("mouseup")}),b.on("results:select",function(){var a=d.getHighlightedResults();if(0!==a.length){var b=a.data("data");"true"==a.attr("aria-selected")?d.trigger("close",{}):d.trigger("select",{data:b})}}),b.on("results:previous",function(){var a=d.getHighlightedResults(),b=d.$results.find("[aria-selected]"),c=b.index(a);if(0!==c){var e=c-1;0===a.length&&(e=0);var f=b.eq(e);f.trigger("mouseenter");var g=d.$results.offset().top,h=f.offset().top,i=d.$results.scrollTop()+(h-g);0===e?d.$results.scrollTop(0):0>h-g&&d.$results.scrollTop(i)}}),b.on("results:next",function(){var a=d.getHighlightedResults(),b=d.$results.find("[aria-selected]"),c=b.index(a),e=c+1;if(!(e>=b.length)){var f=b.eq(e);f.trigger("mouseenter");var g=d.$results.offset().top+d.$results.outerHeight(!1),h=f.offset().top+f.outerHeight(!1),i=d.$results.scrollTop()+h-g;0===e?d.$results.scrollTop(0):h>g&&d.$results.scrollTop(i)}}),b.on("results:focus",function(a){a.element.addClass("select2-results__option--highlighted")}),b.on("results:message",function(a){d.displayMessage(a)}),a.fn.mousewheel&&this.$results.on("mousewheel",function(a){var b=d.$results.scrollTop(),c=d.$results.get(0).scrollHeight-b+a.deltaY,e=a.deltaY>0&&b-a.deltaY<=0,f=a.deltaY<0&&c<=d.$results.height();e?(d.$results.scrollTop(0),a.preventDefault(),a.stopPropagation()):f&&(d.$results.scrollTop(d.$results.get(0).scrollHeight-d.$results.height()),a.preventDefault(),a.stopPropagation())}),this.$results.on("mouseup",".select2-results__option[aria-selected]",function(b){var c=a(this),e=c.data("data");return"true"===c.attr("aria-selected")?void(d.options.get("multiple")?d.trigger("unselect",{originalEvent:b,data:e}):d.trigger("close",{})):void d.trigger("select",{originalEvent:b,data:e})}),this.$results.on("mouseenter",".select2-results__option[aria-selected]",function(b){var c=a(this).data("data");d.getHighlightedResults().removeClass("select2-results__option--highlighted"),d.trigger("results:focus",{data:c,element:a(this)})})},c.prototype.getHighlightedResults=function(){var a=this.$results.find(".select2-results__option--highlighted");return a},c.prototype.destroy=function(){this.$results.remove()},c.prototype.ensureHighlightVisible=function(){var a=this.getHighlightedResults();if(0!==a.length){var b=this.$results.find("[aria-selected]"),c=b.index(a),d=this.$results.offset().top,e=a.offset().top,f=this.$results.scrollTop()+(e-d),g=e-d;f-=2*a.outerHeight(!1),2>=c?this.$results.scrollTop(0):(g>this.$results.outerHeight()||0>g)&&this.$results.scrollTop(f)}},c.prototype.template=function(b,c){var d=this.options.get("templateResult"),e=this.options.get("escapeMarkup"),f=d(b,c);null==f?c.style.display="none":"string"==typeof f?c.innerHTML=e(f):a(c).append(f)},c}),b.define("select2/keys",[],function(){var a={BACKSPACE:8,TAB:9,ENTER:13,SHIFT:16,CTRL:17,ALT:18,ESC:27,SPACE:32,PAGE_UP:33,PAGE_DOWN:34,END:35,HOME:36,LEFT:37,UP:38,RIGHT:39,DOWN:40,DELETE:46};return a}),b.define("select2/selection/base",["jquery","../utils","../keys"],function(a,b,c){function d(a,b){this.$element=a,this.options=b,d.__super__.constructor.call(this)}return b.Extend(d,b.Observable),d.prototype.render=function(){var b=a('<span class="select2-selection" role="combobox"  aria-haspopup="true" aria-expanded="false"></span>');return this._tabindex=0,null!=this.$element.data("old-tabindex")?this._tabindex=this.$element.data("old-tabindex"):null!=this.$element.attr("tabindex")&&(this._tabindex=this.$element.attr("tabindex")),b.attr("title",this.$element.attr("title")),b.attr("tabindex",this._tabindex),this.$selection=b,b},d.prototype.bind=function(a,b){var d=this,e=(a.id+"-container",a.id+"-results");this.container=a,this.$selection.on("focus",function(a){d.trigger("focus",a)}),this.$selection.on("blur",function(a){d._handleBlur(a)}),this.$selection.on("keydown",function(a){d.trigger("keypress",a),a.which===c.SPACE&&a.preventDefault()}),a.on("results:focus",function(a){d.$selection.attr("aria-activedescendant",a.data._resultId)}),a.on("selection:update",function(a){d.update(a.data)}),a.on("open",function(){d.$selection.attr("aria-expanded","true"),d.$selection.attr("aria-owns",e),d._attachCloseHandler(a)}),a.on("close",function(){d.$selection.attr("aria-expanded","false"),d.$selection.removeAttr("aria-activedescendant"),d.$selection.removeAttr("aria-owns"),d.$selection.focus(),d._detachCloseHandler(a)}),a.on("enable",function(){d.$selection.attr("tabindex",d._tabindex)}),a.on("disable",function(){d.$selection.attr("tabindex","-1")})},d.prototype._handleBlur=function(b){var c=this;window.setTimeout(function(){document.activeElement==c.$selection[0]||a.contains(c.$selection[0],document.activeElement)||c.trigger("blur",b)},1)},d.prototype._attachCloseHandler=function(b){a(document.body).on("mousedown.select2."+b.id,function(b){var c=a(b.target),d=c.closest(".select2"),e=a(".select2.select2-container--open");e.each(function(){var b=a(this);if(this!=d[0]){var c=b.data("element");c.select2("close")}})})},d.prototype._detachCloseHandler=function(b){a(document.body).off("mousedown.select2."+b.id)},d.prototype.position=function(a,b){var c=b.find(".selection");c.append(a)},d.prototype.destroy=function(){this._detachCloseHandler(this.container)},d.prototype.update=function(a){throw new Error("The `update` method must be defined in child classes.")},d}),b.define("select2/selection/single",["jquery","./base","../utils","../keys"],function(a,b,c,d){function e(){e.__super__.constructor.apply(this,arguments)}return c.Extend(e,b),e.prototype.render=function(){var a=e.__super__.render.call(this);return a.addClass("select2-selection--single"),a.html('<span class="select2-selection__rendered"></span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span>'),a},e.prototype.bind=function(a,b){var c=this;e.__super__.bind.apply(this,arguments);var d=a.id+"-container";this.$selection.find(".select2-selection__rendered").attr("id",d),this.$selection.attr("aria-labelledby",d),this.$selection.on("mousedown",function(a){1===a.which&&c.trigger("toggle",{originalEvent:a})}),this.$selection.on("focus",function(a){}),this.$selection.on("blur",function(a){}),a.on("focus",function(b){a.isOpen()||c.$selection.focus()}),a.on("selection:update",function(a){c.update(a.data)})},e.prototype.clear=function(){this.$selection.find(".select2-selection__rendered").empty()},e.prototype.display=function(a,b){var c=this.options.get("templateSelection"),d=this.options.get("escapeMarkup");return d(c(a,b))},e.prototype.selectionContainer=function(){return a("<span></span>")},e.prototype.update=function(a){if(0===a.length)return void this.clear();var b=a[0],c=this.$selection.find(".select2-selection__rendered"),d=this.display(b,c);c.empty().append(d),c.prop("title",b.title||b.text)},e}),b.define("select2/selection/multiple",["jquery","./base","../utils"],function(a,b,c){function d(a,b){d.__super__.constructor.apply(this,arguments)}return c.Extend(d,b),d.prototype.render=function(){var a=d.__super__.render.call(this);return a.addClass("select2-selection--multiple"),a.html('<ul class="select2-selection__rendered"></ul>'),a},d.prototype.bind=function(b,c){var e=this;d.__super__.bind.apply(this,arguments),this.$selection.on("click",function(a){e.trigger("toggle",{originalEvent:a})}),this.$selection.on("click",".select2-selection__choice__remove",function(b){if(!e.options.get("disabled")){var c=a(this),d=c.parent(),f=d.data("data");e.trigger("unselect",{originalEvent:b,data:f})}})},d.prototype.clear=function(){this.$selection.find(".select2-selection__rendered").empty()},d.prototype.display=function(a,b){var c=this.options.get("templateSelection"),d=this.options.get("escapeMarkup");return d(c(a,b))},d.prototype.selectionContainer=function(){var b=a('<li class="select2-selection__choice"><span class="select2-selection__choice__remove" role="presentation">&times;</span></li>');return b},d.prototype.update=function(a){if(this.clear(),0!==a.length){for(var b=[],d=0;d<a.length;d++){var e=a[d],f=this.selectionContainer(),g=this.display(e,f);f.append(g),f.prop("title",e.title||e.text),f.data("data",e),b.push(f)}var h=this.$selection.find(".select2-selection__rendered");c.appendMany(h,b)}},d}),b.define("select2/selection/placeholder",["../utils"],function(a){function b(a,b,c){this.placeholder=this.normalizePlaceholder(c.get("placeholder")),a.call(this,b,c)}return b.prototype.normalizePlaceholder=function(a,b){return"string"==typeof b&&(b={id:"",text:b}),b},b.prototype.createPlaceholder=function(a,b){var c=this.selectionContainer();return c.html(this.display(b)),c.addClass("select2-selection__placeholder").removeClass("select2-selection__choice"),c},b.prototype.update=function(a,b){var c=1==b.length&&b[0].id!=this.placeholder.id,d=b.length>1;if(d||c)return a.call(this,b);this.clear();var e=this.createPlaceholder(this.placeholder);this.$selection.find(".select2-selection__rendered").append(e)},b}),b.define("select2/selection/allowClear",["jquery","../keys"],function(a,b){function c(){}return c.prototype.bind=function(a,b,c){var d=this;a.call(this,b,c),null==this.placeholder&&this.options.get("debug")&&window.console&&console.error&&console.error("Select2: The `allowClear` option should be used in combination with the `placeholder` option."),this.$selection.on("mousedown",".select2-selection__clear",function(a){d._handleClear(a)}),b.on("keypress",function(a){d._handleKeyboardClear(a,b)})},c.prototype._handleClear=function(a,b){if(!this.options.get("disabled")){var c=this.$selection.find(".select2-selection__clear");if(0!==c.length){b.stopPropagation();for(var d=c.data("data"),e=0;e<d.length;e++){var f={data:d[e]};if(this.trigger("unselect",f),f.prevented)return}this.$element.val(this.placeholder.id).trigger("change"),this.trigger("toggle",{})}}},c.prototype._handleKeyboardClear=function(a,c,d){d.isOpen()||(c.which==b.DELETE||c.which==b.BACKSPACE)&&this._handleClear(c)},c.prototype.update=function(b,c){if(b.call(this,c),!(this.$selection.find(".select2-selection__placeholder").length>0||0===c.length)){var d=a('<span class="select2-selection__clear">&times;</span>');d.data("data",c),this.$selection.find(".select2-selection__rendered").prepend(d)}},c}),b.define("select2/selection/search",["jquery","../utils","../keys"],function(a,b,c){function d(a,b,c){a.call(this,b,c)}return d.prototype.render=function(b){var c=a('<li class="select2-search select2-search--inline"><input class="select2-search__field" type="search" tabindex="-1" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" role="textbox" aria-autocomplete="list" /></li>');this.$searchContainer=c,this.$search=c.find("input");var d=b.call(this);return this._transferTabIndex(),d},d.prototype.bind=function(a,b,d){var e=this;a.call(this,b,d),b.on("open",function(){e.$search.trigger("focus")}),b.on("close",function(){e.$search.val(""),e.$search.removeAttr("aria-activedescendant"),e.$search.trigger("focus")}),b.on("enable",function(){e.$search.prop("disabled",!1),e._transferTabIndex()}),b.on("disable",function(){e.$search.prop("disabled",!0)}),b.on("focus",function(a){e.$search.trigger("focus")}),b.on("results:focus",function(a){e.$search.attr("aria-activedescendant",a.id)}),this.$selection.on("focusin",".select2-search--inline",function(a){e.trigger("focus",a)}),this.$selection.on("focusout",".select2-search--inline",function(a){e._handleBlur(a)}),this.$selection.on("keydown",".select2-search--inline",function(a){a.stopPropagation(),e.trigger("keypress",a),e._keyUpPrevented=a.isDefaultPrevented();var b=a.which;if(b===c.BACKSPACE&&""===e.$search.val()){var d=e.$searchContainer.prev(".select2-selection__choice");if(d.length>0){var f=d.data("data");e.searchRemoveChoice(f),a.preventDefault()}}});var f=document.documentMode,g=f&&11>=f;this.$selection.on("input.searchcheck",".select2-search--inline",function(a){return g?void e.$selection.off("input.search input.searchcheck"):void e.$selection.off("keyup.search")}),this.$selection.on("keyup.search input.search",".select2-search--inline",function(a){if(g&&"input"===a.type)return void e.$selection.off("input.search input.searchcheck");var b=a.which;b!=c.SHIFT&&b!=c.CTRL&&b!=c.ALT&&b!=c.TAB&&e.handleSearch(a)})},d.prototype._transferTabIndex=function(a){this.$search.attr("tabindex",this.$selection.attr("tabindex")),this.$selection.attr("tabindex","-1")},d.prototype.createPlaceholder=function(a,b){this.$search.attr("placeholder",b.text)},d.prototype.update=function(a,b){var c=this.$search[0]==document.activeElement;this.$search.attr("placeholder",""),a.call(this,b),this.$selection.find(".select2-selection__rendered").append(this.$searchContainer),this.resizeSearch(),c&&this.$search.focus()},d.prototype.handleSearch=function(){if(this.resizeSearch(),!this._keyUpPrevented){var a=this.$search.val();this.trigger("query",{term:a})}this._keyUpPrevented=!1},d.prototype.searchRemoveChoice=function(a,b){this.trigger("unselect",{data:b}),this.$search.val(b.text),this.handleSearch()},d.prototype.resizeSearch=function(){this.$search.css("width","25px");var a="";if(""!==this.$search.attr("placeholder"))a=this.$selection.find(".select2-selection__rendered").innerWidth();else{var b=this.$search.val().length+1;a=.75*b+"em"}this.$search.css("width",a)},d}),b.define("select2/selection/eventRelay",["jquery"],function(a){function b(){}return b.prototype.bind=function(b,c,d){var e=this,f=["open","opening","close","closing","select","selecting","unselect","unselecting"],g=["opening","closing","selecting","unselecting"];b.call(this,c,d),c.on("*",function(b,c){if(-1!==a.inArray(b,f)){c=c||{};var d=a.Event("select2:"+b,{params:c});e.$element.trigger(d),-1!==a.inArray(b,g)&&(c.prevented=d.isDefaultPrevented())}})},b}),b.define("select2/translation",["jquery","require"],function(a,b){function c(a){this.dict=a||{}}return c.prototype.all=function(){return this.dict},c.prototype.get=function(a){return this.dict[a]},c.prototype.extend=function(b){this.dict=a.extend({},b.all(),this.dict)},c._cache={},c.loadPath=function(a){if(!(a in c._cache)){var d=b(a);c._cache[a]=d}return new c(c._cache[a])},c}),b.define("select2/diacritics",[],function(){var a={"Ⓐ":"A","Ａ":"A","À":"A","Á":"A","Â":"A","Ầ":"A","Ấ":"A","Ẫ":"A","Ẩ":"A","Ã":"A","Ā":"A","Ă":"A","Ằ":"A","Ắ":"A","Ẵ":"A","Ẳ":"A","Ȧ":"A","Ǡ":"A","Ä":"A","Ǟ":"A","Ả":"A","Å":"A","Ǻ":"A","Ǎ":"A","Ȁ":"A","Ȃ":"A","Ạ":"A","Ậ":"A","Ặ":"A","Ḁ":"A","Ą":"A","Ⱥ":"A","Ɐ":"A","Ꜳ":"AA","Æ":"AE","Ǽ":"AE","Ǣ":"AE","Ꜵ":"AO","Ꜷ":"AU","Ꜹ":"AV","Ꜻ":"AV","Ꜽ":"AY","Ⓑ":"B","Ｂ":"B","Ḃ":"B","Ḅ":"B","Ḇ":"B","Ƀ":"B","Ƃ":"B","Ɓ":"B","Ⓒ":"C","Ｃ":"C","Ć":"C","Ĉ":"C","Ċ":"C","Č":"C","Ç":"C","Ḉ":"C","Ƈ":"C","Ȼ":"C","Ꜿ":"C","Ⓓ":"D","Ｄ":"D","Ḋ":"D","Ď":"D","Ḍ":"D","Ḑ":"D","Ḓ":"D","Ḏ":"D","Đ":"D","Ƌ":"D","Ɗ":"D","Ɖ":"D","Ꝺ":"D","Ǳ":"DZ","Ǆ":"DZ","ǲ":"Dz","ǅ":"Dz","Ⓔ":"E","Ｅ":"E","È":"E","É":"E","Ê":"E","Ề":"E","Ế":"E","Ễ":"E","Ể":"E","Ẽ":"E","Ē":"E","Ḕ":"E","Ḗ":"E","Ĕ":"E","Ė":"E","Ë":"E","Ẻ":"E","Ě":"E","Ȅ":"E","Ȇ":"E","Ẹ":"E","Ệ":"E","Ȩ":"E","Ḝ":"E","Ę":"E","Ḙ":"E","Ḛ":"E","Ɛ":"E","Ǝ":"E","Ⓕ":"F","Ｆ":"F","Ḟ":"F","Ƒ":"F","Ꝼ":"F","Ⓖ":"G","Ｇ":"G","Ǵ":"G","Ĝ":"G","Ḡ":"G","Ğ":"G","Ġ":"G","Ǧ":"G","Ģ":"G","Ǥ":"G","Ɠ":"G","Ꞡ":"G","Ᵹ":"G","Ꝿ":"G","Ⓗ":"H","Ｈ":"H","Ĥ":"H","Ḣ":"H","Ḧ":"H","Ȟ":"H","Ḥ":"H","Ḩ":"H","Ḫ":"H","Ħ":"H","Ⱨ":"H","Ⱶ":"H","Ɥ":"H","Ⓘ":"I","Ｉ":"I","Ì":"I","Í":"I","Î":"I","Ĩ":"I","Ī":"I","Ĭ":"I","İ":"I","Ï":"I","Ḯ":"I","Ỉ":"I","Ǐ":"I","Ȉ":"I","Ȋ":"I","Ị":"I","Į":"I","Ḭ":"I","Ɨ":"I","Ⓙ":"J","Ｊ":"J","Ĵ":"J","Ɉ":"J","Ⓚ":"K","Ｋ":"K","Ḱ":"K","Ǩ":"K","Ḳ":"K","Ķ":"K","Ḵ":"K","Ƙ":"K","Ⱪ":"K","Ꝁ":"K","Ꝃ":"K","Ꝅ":"K","Ꞣ":"K","Ⓛ":"L","Ｌ":"L","Ŀ":"L","Ĺ":"L","Ľ":"L","Ḷ":"L","Ḹ":"L","Ļ":"L","Ḽ":"L","Ḻ":"L","Ł":"L","Ƚ":"L","Ɫ":"L","Ⱡ":"L","Ꝉ":"L","Ꝇ":"L","Ꞁ":"L","Ǉ":"LJ","ǈ":"Lj","Ⓜ":"M","Ｍ":"M","Ḿ":"M","Ṁ":"M","Ṃ":"M","Ɱ":"M","Ɯ":"M","Ⓝ":"N","Ｎ":"N","Ǹ":"N","Ń":"N","Ñ":"N","Ṅ":"N","Ň":"N","Ṇ":"N","Ņ":"N","Ṋ":"N","Ṉ":"N","Ƞ":"N","Ɲ":"N","Ꞑ":"N","Ꞥ":"N","Ǌ":"NJ","ǋ":"Nj","Ⓞ":"O","Ｏ":"O","Ò":"O","Ó":"O","Ô":"O","Ồ":"O","Ố":"O","Ỗ":"O","Ổ":"O","Õ":"O","Ṍ":"O","Ȭ":"O","Ṏ":"O","Ō":"O","Ṑ":"O","Ṓ":"O","Ŏ":"O","Ȯ":"O","Ȱ":"O","Ö":"O","Ȫ":"O","Ỏ":"O","Ő":"O","Ǒ":"O","Ȍ":"O","Ȏ":"O","Ơ":"O","Ờ":"O","Ớ":"O","Ỡ":"O","Ở":"O","Ợ":"O","Ọ":"O","Ộ":"O","Ǫ":"O","Ǭ":"O","Ø":"O","Ǿ":"O","Ɔ":"O","Ɵ":"O","Ꝋ":"O","Ꝍ":"O","Ƣ":"OI","Ꝏ":"OO","Ȣ":"OU","Ⓟ":"P","Ｐ":"P","Ṕ":"P","Ṗ":"P","Ƥ":"P","Ᵽ":"P","Ꝑ":"P","Ꝓ":"P","Ꝕ":"P","Ⓠ":"Q","Ｑ":"Q","Ꝗ":"Q","Ꝙ":"Q","Ɋ":"Q","Ⓡ":"R","Ｒ":"R","Ŕ":"R","Ṙ":"R","Ř":"R","Ȑ":"R","Ȓ":"R","Ṛ":"R","Ṝ":"R","Ŗ":"R","Ṟ":"R","Ɍ":"R","Ɽ":"R","Ꝛ":"R","Ꞧ":"R","Ꞃ":"R","Ⓢ":"S","Ｓ":"S","ẞ":"S","Ś":"S","Ṥ":"S","Ŝ":"S","Ṡ":"S","Š":"S","Ṧ":"S","Ṣ":"S","Ṩ":"S","Ș":"S","Ş":"S","Ȿ":"S","Ꞩ":"S","Ꞅ":"S","Ⓣ":"T","Ｔ":"T","Ṫ":"T","Ť":"T","Ṭ":"T","Ț":"T","Ţ":"T","Ṱ":"T","Ṯ":"T","Ŧ":"T","Ƭ":"T","Ʈ":"T","Ⱦ":"T","Ꞇ":"T","Ꜩ":"TZ","Ⓤ":"U","Ｕ":"U","Ù":"U","Ú":"U","Û":"U","Ũ":"U","Ṹ":"U","Ū":"U","Ṻ":"U","Ŭ":"U","Ü":"U","Ǜ":"U","Ǘ":"U","Ǖ":"U","Ǚ":"U","Ủ":"U","Ů":"U","Ű":"U","Ǔ":"U","Ȕ":"U","Ȗ":"U","Ư":"U","Ừ":"U","Ứ":"U","Ữ":"U","Ử":"U","Ự":"U","Ụ":"U","Ṳ":"U","Ų":"U","Ṷ":"U","Ṵ":"U","Ʉ":"U","Ⓥ":"V","Ｖ":"V","Ṽ":"V","Ṿ":"V","Ʋ":"V","Ꝟ":"V","Ʌ":"V","Ꝡ":"VY","Ⓦ":"W","Ｗ":"W","Ẁ":"W","Ẃ":"W","Ŵ":"W","Ẇ":"W","Ẅ":"W","Ẉ":"W","Ⱳ":"W","Ⓧ":"X","Ｘ":"X","Ẋ":"X","Ẍ":"X","Ⓨ":"Y","Ｙ":"Y","Ỳ":"Y","Ý":"Y","Ŷ":"Y","Ỹ":"Y","Ȳ":"Y","Ẏ":"Y","Ÿ":"Y","Ỷ":"Y","Ỵ":"Y","Ƴ":"Y","Ɏ":"Y","Ỿ":"Y","Ⓩ":"Z","Ｚ":"Z","Ź":"Z","Ẑ":"Z","Ż":"Z","Ž":"Z","Ẓ":"Z","Ẕ":"Z","Ƶ":"Z","Ȥ":"Z","Ɀ":"Z","Ⱬ":"Z","Ꝣ":"Z","ⓐ":"a","ａ":"a","ẚ":"a","à":"a","á":"a","â":"a","ầ":"a","ấ":"a","ẫ":"a","ẩ":"a","ã":"a","ā":"a","ă":"a","ằ":"a","ắ":"a","ẵ":"a","ẳ":"a","ȧ":"a","ǡ":"a","ä":"a","ǟ":"a","ả":"a","å":"a","ǻ":"a","ǎ":"a","ȁ":"a","ȃ":"a","ạ":"a","ậ":"a","ặ":"a","ḁ":"a","ą":"a","ⱥ":"a","ɐ":"a","ꜳ":"aa","æ":"ae","ǽ":"ae","ǣ":"ae","ꜵ":"ao","ꜷ":"au","ꜹ":"av","ꜻ":"av","ꜽ":"ay","ⓑ":"b","ｂ":"b","ḃ":"b","ḅ":"b","ḇ":"b","ƀ":"b","ƃ":"b","ɓ":"b","ⓒ":"c","ｃ":"c","ć":"c","ĉ":"c","ċ":"c","č":"c","ç":"c","ḉ":"c","ƈ":"c","ȼ":"c","ꜿ":"c","ↄ":"c","ⓓ":"d","ｄ":"d","ḋ":"d","ď":"d","ḍ":"d","ḑ":"d","ḓ":"d","ḏ":"d","đ":"d","ƌ":"d","ɖ":"d","ɗ":"d","ꝺ":"d","ǳ":"dz","ǆ":"dz","ⓔ":"e","ｅ":"e","è":"e","é":"e","ê":"e","ề":"e","ế":"e","ễ":"e","ể":"e","ẽ":"e","ē":"e","ḕ":"e","ḗ":"e","ĕ":"e","ė":"e","ë":"e","ẻ":"e","ě":"e","ȅ":"e","ȇ":"e","ẹ":"e","ệ":"e","ȩ":"e","ḝ":"e","ę":"e","ḙ":"e","ḛ":"e","ɇ":"e","ɛ":"e","ǝ":"e","ⓕ":"f","ｆ":"f","ḟ":"f","ƒ":"f","ꝼ":"f","ⓖ":"g","ｇ":"g","ǵ":"g","ĝ":"g","ḡ":"g","ğ":"g","ġ":"g","ǧ":"g","ģ":"g","ǥ":"g","ɠ":"g","ꞡ":"g","ᵹ":"g","ꝿ":"g","ⓗ":"h","ｈ":"h","ĥ":"h","ḣ":"h","ḧ":"h","ȟ":"h","ḥ":"h","ḩ":"h","ḫ":"h","ẖ":"h","ħ":"h","ⱨ":"h","ⱶ":"h","ɥ":"h","ƕ":"hv","ⓘ":"i","ｉ":"i","ì":"i","í":"i","î":"i","ĩ":"i","ī":"i","ĭ":"i","ï":"i","ḯ":"i","ỉ":"i","ǐ":"i","ȉ":"i","ȋ":"i","ị":"i","į":"i","ḭ":"i","ɨ":"i","ı":"i","ⓙ":"j","ｊ":"j","ĵ":"j","ǰ":"j","ɉ":"j","ⓚ":"k","ｋ":"k","ḱ":"k","ǩ":"k","ḳ":"k","ķ":"k","ḵ":"k","ƙ":"k","ⱪ":"k","ꝁ":"k","ꝃ":"k","ꝅ":"k","ꞣ":"k","ⓛ":"l","ｌ":"l","ŀ":"l","ĺ":"l","ľ":"l","ḷ":"l","ḹ":"l","ļ":"l","ḽ":"l","ḻ":"l","ſ":"l","ł":"l","ƚ":"l","ɫ":"l","ⱡ":"l","ꝉ":"l","ꞁ":"l","ꝇ":"l","ǉ":"lj","ⓜ":"m","ｍ":"m","ḿ":"m","ṁ":"m","ṃ":"m","ɱ":"m","ɯ":"m","ⓝ":"n","ｎ":"n","ǹ":"n","ń":"n","ñ":"n","ṅ":"n","ň":"n","ṇ":"n","ņ":"n","ṋ":"n","ṉ":"n","ƞ":"n","ɲ":"n","ŉ":"n","ꞑ":"n","ꞥ":"n","ǌ":"nj","ⓞ":"o","ｏ":"o","ò":"o","ó":"o","ô":"o","ồ":"o","ố":"o","ỗ":"o","ổ":"o","õ":"o","ṍ":"o","ȭ":"o","ṏ":"o","ō":"o","ṑ":"o","ṓ":"o","ŏ":"o","ȯ":"o","ȱ":"o","ö":"o","ȫ":"o","ỏ":"o","ő":"o","ǒ":"o","ȍ":"o","ȏ":"o","ơ":"o","ờ":"o","ớ":"o","ỡ":"o","ở":"o","ợ":"o","ọ":"o","ộ":"o","ǫ":"o","ǭ":"o","ø":"o","ǿ":"o","ɔ":"o","ꝋ":"o","ꝍ":"o","ɵ":"o","ƣ":"oi","ȣ":"ou","ꝏ":"oo","ⓟ":"p","ｐ":"p","ṕ":"p","ṗ":"p","ƥ":"p","ᵽ":"p","ꝑ":"p","ꝓ":"p","ꝕ":"p","ⓠ":"q","ｑ":"q","ɋ":"q","ꝗ":"q","ꝙ":"q","ⓡ":"r","ｒ":"r","ŕ":"r","ṙ":"r","ř":"r","ȑ":"r","ȓ":"r","ṛ":"r","ṝ":"r","ŗ":"r","ṟ":"r","ɍ":"r","ɽ":"r","ꝛ":"r","ꞧ":"r","ꞃ":"r","ⓢ":"s","ｓ":"s","ß":"s","ś":"s","ṥ":"s","ŝ":"s","ṡ":"s","š":"s","ṧ":"s","ṣ":"s","ṩ":"s","ș":"s","ş":"s","ȿ":"s","ꞩ":"s","ꞅ":"s","ẛ":"s","ⓣ":"t","ｔ":"t","ṫ":"t","ẗ":"t","ť":"t","ṭ":"t","ț":"t","ţ":"t","ṱ":"t","ṯ":"t","ŧ":"t","ƭ":"t","ʈ":"t","ⱦ":"t","ꞇ":"t","ꜩ":"tz","ⓤ":"u","ｕ":"u","ù":"u","ú":"u","û":"u","ũ":"u","ṹ":"u","ū":"u","ṻ":"u","ŭ":"u","ü":"u","ǜ":"u","ǘ":"u","ǖ":"u","ǚ":"u","ủ":"u","ů":"u","ű":"u","ǔ":"u","ȕ":"u","ȗ":"u","ư":"u","ừ":"u","ứ":"u","ữ":"u","ử":"u","ự":"u","ụ":"u","ṳ":"u","ų":"u","ṷ":"u","ṵ":"u","ʉ":"u","ⓥ":"v","ｖ":"v","ṽ":"v","ṿ":"v","ʋ":"v","ꝟ":"v","ʌ":"v","ꝡ":"vy","ⓦ":"w","ｗ":"w","ẁ":"w","ẃ":"w","ŵ":"w","ẇ":"w","ẅ":"w","ẘ":"w","ẉ":"w","ⱳ":"w","ⓧ":"x","ｘ":"x","ẋ":"x","ẍ":"x","ⓨ":"y","ｙ":"y","ỳ":"y","ý":"y","ŷ":"y","ỹ":"y","ȳ":"y","ẏ":"y","ÿ":"y","ỷ":"y","ẙ":"y","ỵ":"y","ƴ":"y","ɏ":"y","ỿ":"y","ⓩ":"z","ｚ":"z","ź":"z","ẑ":"z","ż":"z","ž":"z","ẓ":"z","ẕ":"z","ƶ":"z","ȥ":"z","ɀ":"z","ⱬ":"z","ꝣ":"z","Ά":"Α","Έ":"Ε","Ή":"Η","Ί":"Ι","Ϊ":"Ι","Ό":"Ο","Ύ":"Υ","Ϋ":"Υ","Ώ":"Ω","ά":"α","έ":"ε","ή":"η","ί":"ι","ϊ":"ι","ΐ":"ι","ό":"ο","ύ":"υ","ϋ":"υ","ΰ":"υ","ω":"ω","ς":"σ"};return a}),b.define("select2/data/base",["../utils"],function(a){function b(a,c){b.__super__.constructor.call(this)}return a.Extend(b,a.Observable),b.prototype.current=function(a){throw new Error("The `current` method must be defined in child classes.")},b.prototype.query=function(a,b){throw new Error("The `query` method must be defined in child classes.")},b.prototype.bind=function(a,b){},b.prototype.destroy=function(){},b.prototype.generateResultId=function(b,c){var d=b.id+"-result-";return d+=a.generateChars(4),d+=null!=c.id?"-"+c.id.toString():"-"+a.generateChars(4)},b}),b.define("select2/data/select",["./base","../utils","jquery"],function(a,b,c){function d(a,b){this.$element=a,this.options=b,d.__super__.constructor.call(this)}return b.Extend(d,a),d.prototype.current=function(a){var b=[],d=this;this.$element.find(":selected").each(function(){var a=c(this),e=d.item(a);b.push(e)}),a(b)},d.prototype.select=function(a){var b=this;if(a.selected=!0,c(a.element).is("option"))return a.element.selected=!0,void this.$element.trigger("change");
if(this.$element.prop("multiple"))this.current(function(d){var e=[];a=[a],a.push.apply(a,d);for(var f=0;f<a.length;f++){var g=a[f].id;-1===c.inArray(g,e)&&e.push(g)}b.$element.val(e),b.$element.trigger("change")});else{var d=a.id;this.$element.val(d),this.$element.trigger("change")}},d.prototype.unselect=function(a){var b=this;if(this.$element.prop("multiple"))return a.selected=!1,c(a.element).is("option")?(a.element.selected=!1,void this.$element.trigger("change")):void this.current(function(d){for(var e=[],f=0;f<d.length;f++){var g=d[f].id;g!==a.id&&-1===c.inArray(g,e)&&e.push(g)}b.$element.val(e),b.$element.trigger("change")})},d.prototype.bind=function(a,b){var c=this;this.container=a,a.on("select",function(a){c.select(a.data)}),a.on("unselect",function(a){c.unselect(a.data)})},d.prototype.destroy=function(){this.$element.find("*").each(function(){c.removeData(this,"data")})},d.prototype.query=function(a,b){var d=[],e=this,f=this.$element.children();f.each(function(){var b=c(this);if(b.is("option")||b.is("optgroup")){var f=e.item(b),g=e.matches(a,f);null!==g&&d.push(g)}}),b({results:d})},d.prototype.addOptions=function(a){b.appendMany(this.$element,a)},d.prototype.option=function(a){var b;a.children?(b=document.createElement("optgroup"),b.label=a.text):(b=document.createElement("option"),void 0!==b.textContent?b.textContent=a.text:b.innerText=a.text),a.id&&(b.value=a.id),a.disabled&&(b.disabled=!0),a.selected&&(b.selected=!0),a.title&&(b.title=a.title);var d=c(b),e=this._normalizeItem(a);return e.element=b,c.data(b,"data",e),d},d.prototype.item=function(a){var b={};if(b=c.data(a[0],"data"),null!=b)return b;if(a.is("option"))b={id:a.val(),text:a.text(),disabled:a.prop("disabled"),selected:a.prop("selected"),title:a.prop("title")};else if(a.is("optgroup")){b={text:a.prop("label"),children:[],title:a.prop("title")};for(var d=a.children("option"),e=[],f=0;f<d.length;f++){var g=c(d[f]),h=this.item(g);e.push(h)}b.children=e}return b=this._normalizeItem(b),b.element=a[0],c.data(a[0],"data",b),b},d.prototype._normalizeItem=function(a){c.isPlainObject(a)||(a={id:a,text:a}),a=c.extend({},{text:""},a);var b={selected:!1,disabled:!1};return null!=a.id&&(a.id=a.id.toString()),null!=a.text&&(a.text=a.text.toString()),null==a._resultId&&a.id&&null!=this.container&&(a._resultId=this.generateResultId(this.container,a)),c.extend({},b,a)},d.prototype.matches=function(a,b){var c=this.options.get("matcher");return c(a,b)},d}),b.define("select2/data/array",["./select","../utils","jquery"],function(a,b,c){function d(a,b){var c=b.get("data")||[];d.__super__.constructor.call(this,a,b),this.addOptions(this.convertToOptions(c))}return b.Extend(d,a),d.prototype.select=function(a){var b=this.$element.find("option").filter(function(b,c){return c.value==a.id.toString()});0===b.length&&(b=this.option(a),this.addOptions(b)),d.__super__.select.call(this,a)},d.prototype.convertToOptions=function(a){function d(a){return function(){return c(this).val()==a.id}}for(var e=this,f=this.$element.find("option"),g=f.map(function(){return e.item(c(this)).id}).get(),h=[],i=0;i<a.length;i++){var j=this._normalizeItem(a[i]);if(c.inArray(j.id,g)>=0){var k=f.filter(d(j)),l=this.item(k),m=c.extend(!0,{},j,l),n=this.option(m);k.replaceWith(n)}else{var o=this.option(j);if(j.children){var p=this.convertToOptions(j.children);b.appendMany(o,p)}h.push(o)}}return h},d}),b.define("select2/data/ajax",["./array","../utils","jquery"],function(a,b,c){function d(a,b){this.ajaxOptions=this._applyDefaults(b.get("ajax")),null!=this.ajaxOptions.processResults&&(this.processResults=this.ajaxOptions.processResults),d.__super__.constructor.call(this,a,b)}return b.Extend(d,a),d.prototype._applyDefaults=function(a){var b={data:function(a){return c.extend({},a,{q:a.term})},transport:function(a,b,d){var e=c.ajax(a);return e.then(b),e.fail(d),e}};return c.extend({},b,a,!0)},d.prototype.processResults=function(a){return a},d.prototype.query=function(a,b){function d(){var d=f.transport(f,function(d){var f=e.processResults(d,a);e.options.get("debug")&&window.console&&console.error&&(f&&f.results&&c.isArray(f.results)||console.error("Select2: The AJAX results did not return an array in the `results` key of the response.")),b(f)},function(){d.status&&"0"===d.status||e.trigger("results:message",{message:"errorLoading"})});e._request=d}var e=this;null!=this._request&&(c.isFunction(this._request.abort)&&this._request.abort(),this._request=null);var f=c.extend({type:"GET"},this.ajaxOptions);"function"==typeof f.url&&(f.url=f.url.call(this.$element,a)),"function"==typeof f.data&&(f.data=f.data.call(this.$element,a)),this.ajaxOptions.delay&&null!=a.term?(this._queryTimeout&&window.clearTimeout(this._queryTimeout),this._queryTimeout=window.setTimeout(d,this.ajaxOptions.delay)):d()},d}),b.define("select2/data/tags",["jquery"],function(a){function b(b,c,d){var e=d.get("tags"),f=d.get("createTag");void 0!==f&&(this.createTag=f);var g=d.get("insertTag");if(void 0!==g&&(this.insertTag=g),b.call(this,c,d),a.isArray(e))for(var h=0;h<e.length;h++){var i=e[h],j=this._normalizeItem(i),k=this.option(j);this.$element.append(k)}}return b.prototype.query=function(a,b,c){function d(a,f){for(var g=a.results,h=0;h<g.length;h++){var i=g[h],j=null!=i.children&&!d({results:i.children},!0),k=i.text===b.term;if(k||j)return f?!1:(a.data=g,void c(a))}if(f)return!0;var l=e.createTag(b);if(null!=l){var m=e.option(l);m.attr("data-select2-tag",!0),e.addOptions([m]),e.insertTag(g,l)}a.results=g,c(a)}var e=this;return this._removeOldTags(),null==b.term||null!=b.page?void a.call(this,b,c):void a.call(this,b,d)},b.prototype.createTag=function(b,c){var d=a.trim(c.term);return""===d?null:{id:d,text:d}},b.prototype.insertTag=function(a,b,c){b.unshift(c)},b.prototype._removeOldTags=function(b){var c=(this._lastTag,this.$element.find("option[data-select2-tag]"));c.each(function(){this.selected||a(this).remove()})},b}),b.define("select2/data/tokenizer",["jquery"],function(a){function b(a,b,c){var d=c.get("tokenizer");void 0!==d&&(this.tokenizer=d),a.call(this,b,c)}return b.prototype.bind=function(a,b,c){a.call(this,b,c),this.$search=b.dropdown.$search||b.selection.$search||c.find(".select2-search__field")},b.prototype.query=function(b,c,d){function e(b){var c=g._normalizeItem(b),d=g.$element.find("option").filter(function(){return a(this).val()===c.id});if(!d.length){var e=g.option(c);e.attr("data-select2-tag",!0),g._removeOldTags(),g.addOptions([e])}f(c)}function f(a){g.trigger("select",{data:a})}var g=this;c.term=c.term||"";var h=this.tokenizer(c,this.options,e);h.term!==c.term&&(this.$search.length&&(this.$search.val(h.term),this.$search.focus()),c.term=h.term),b.call(this,c,d)},b.prototype.tokenizer=function(b,c,d,e){for(var f=d.get("tokenSeparators")||[],g=c.term,h=0,i=this.createTag||function(a){return{id:a.term,text:a.term}};h<g.length;){var j=g[h];if(-1!==a.inArray(j,f)){var k=g.substr(0,h),l=a.extend({},c,{term:k}),m=i(l);null!=m?(e(m),g=g.substr(h+1)||"",h=0):h++}else h++}return{term:g}},b}),b.define("select2/data/minimumInputLength",[],function(){function a(a,b,c){this.minimumInputLength=c.get("minimumInputLength"),a.call(this,b,c)}return a.prototype.query=function(a,b,c){return b.term=b.term||"",b.term.length<this.minimumInputLength?void this.trigger("results:message",{message:"inputTooShort",args:{minimum:this.minimumInputLength,input:b.term,params:b}}):void a.call(this,b,c)},a}),b.define("select2/data/maximumInputLength",[],function(){function a(a,b,c){this.maximumInputLength=c.get("maximumInputLength"),a.call(this,b,c)}return a.prototype.query=function(a,b,c){return b.term=b.term||"",this.maximumInputLength>0&&b.term.length>this.maximumInputLength?void this.trigger("results:message",{message:"inputTooLong",args:{maximum:this.maximumInputLength,input:b.term,params:b}}):void a.call(this,b,c)},a}),b.define("select2/data/maximumSelectionLength",[],function(){function a(a,b,c){this.maximumSelectionLength=c.get("maximumSelectionLength"),a.call(this,b,c)}return a.prototype.query=function(a,b,c){var d=this;this.current(function(e){var f=null!=e?e.length:0;return d.maximumSelectionLength>0&&f>=d.maximumSelectionLength?void d.trigger("results:message",{message:"maximumSelected",args:{maximum:d.maximumSelectionLength}}):void a.call(d,b,c)})},a}),b.define("select2/dropdown",["jquery","./utils"],function(a,b){function c(a,b){this.$element=a,this.options=b,c.__super__.constructor.call(this)}return b.Extend(c,b.Observable),c.prototype.render=function(){var b=a('<span class="select2-dropdown"><span class="select2-results"></span></span>');return b.attr("dir",this.options.get("dir")),this.$dropdown=b,b},c.prototype.bind=function(){},c.prototype.position=function(a,b){},c.prototype.destroy=function(){this.$dropdown.remove()},c}),b.define("select2/dropdown/search",["jquery","../utils"],function(a,b){function c(){}return c.prototype.render=function(b){var c=b.call(this),d=a('<span class="select2-search select2-search--dropdown"><input class="select2-search__field" type="search" tabindex="-1" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" role="textbox" /></span>');return this.$searchContainer=d,this.$search=d.find("input"),c.prepend(d),c},c.prototype.bind=function(b,c,d){var e=this;b.call(this,c,d),this.$search.on("keydown",function(a){e.trigger("keypress",a),e._keyUpPrevented=a.isDefaultPrevented()}),this.$search.on("input",function(b){a(this).off("keyup")}),this.$search.on("keyup input",function(a){e.handleSearch(a)}),c.on("open",function(){e.$search.attr("tabindex",0),e.$search.focus(),window.setTimeout(function(){e.$search.focus()},0)}),c.on("close",function(){e.$search.attr("tabindex",-1),e.$search.val("")}),c.on("focus",function(){c.isOpen()&&e.$search.focus()}),c.on("results:all",function(a){if(null==a.query.term||""===a.query.term){var b=e.showSearch(a);b?e.$searchContainer.removeClass("select2-search--hide"):e.$searchContainer.addClass("select2-search--hide")}})},c.prototype.handleSearch=function(a){if(!this._keyUpPrevented){var b=this.$search.val();this.trigger("query",{term:b})}this._keyUpPrevented=!1},c.prototype.showSearch=function(a,b){return!0},c}),b.define("select2/dropdown/hidePlaceholder",[],function(){function a(a,b,c,d){this.placeholder=this.normalizePlaceholder(c.get("placeholder")),a.call(this,b,c,d)}return a.prototype.append=function(a,b){b.results=this.removePlaceholder(b.results),a.call(this,b)},a.prototype.normalizePlaceholder=function(a,b){return"string"==typeof b&&(b={id:"",text:b}),b},a.prototype.removePlaceholder=function(a,b){for(var c=b.slice(0),d=b.length-1;d>=0;d--){var e=b[d];this.placeholder.id===e.id&&c.splice(d,1)}return c},a}),b.define("select2/dropdown/infiniteScroll",["jquery"],function(a){function b(a,b,c,d){this.lastParams={},a.call(this,b,c,d),this.$loadingMore=this.createLoadingMore(),this.loading=!1}return b.prototype.append=function(a,b){this.$loadingMore.remove(),this.loading=!1,a.call(this,b),this.showLoadingMore(b)&&this.$results.append(this.$loadingMore)},b.prototype.bind=function(b,c,d){var e=this;b.call(this,c,d),c.on("query",function(a){e.lastParams=a,e.loading=!0}),c.on("query:append",function(a){e.lastParams=a,e.loading=!0}),this.$results.on("scroll",function(){var b=a.contains(document.documentElement,e.$loadingMore[0]);if(!e.loading&&b){var c=e.$results.offset().top+e.$results.outerHeight(!1),d=e.$loadingMore.offset().top+e.$loadingMore.outerHeight(!1);c+50>=d&&e.loadMore()}})},b.prototype.loadMore=function(){this.loading=!0;var b=a.extend({},{page:1},this.lastParams);b.page++,this.trigger("query:append",b)},b.prototype.showLoadingMore=function(a,b){return b.pagination&&b.pagination.more},b.prototype.createLoadingMore=function(){var b=a('<li class="select2-results__option select2-results__option--load-more"role="treeitem" aria-disabled="true"></li>'),c=this.options.get("translations").get("loadingMore");return b.html(c(this.lastParams)),b},b}),b.define("select2/dropdown/attachBody",["jquery","../utils"],function(a,b){function c(b,c,d){this.$dropdownParent=d.get("dropdownParent")||a(document.body),b.call(this,c,d)}return c.prototype.bind=function(a,b,c){var d=this,e=!1;a.call(this,b,c),b.on("open",function(){d._showDropdown(),d._attachPositioningHandler(b),e||(e=!0,b.on("results:all",function(){d._positionDropdown(),d._resizeDropdown()}),b.on("results:append",function(){d._positionDropdown(),d._resizeDropdown()}))}),b.on("close",function(){d._hideDropdown(),d._detachPositioningHandler(b)}),this.$dropdownContainer.on("mousedown",function(a){a.stopPropagation()})},c.prototype.destroy=function(a){a.call(this),this.$dropdownContainer.remove()},c.prototype.position=function(a,b,c){b.attr("class",c.attr("class")),b.removeClass("select2"),b.addClass("select2-container--open"),b.css({position:"absolute",top:-999999}),this.$container=c},c.prototype.render=function(b){var c=a("<span></span>"),d=b.call(this);return c.append(d),this.$dropdownContainer=c,c},c.prototype._hideDropdown=function(a){this.$dropdownContainer.detach()},c.prototype._attachPositioningHandler=function(c,d){var e=this,f="scroll.select2."+d.id,g="resize.select2."+d.id,h="orientationchange.select2."+d.id,i=this.$container.parents().filter(b.hasScroll);i.each(function(){a(this).data("select2-scroll-position",{x:a(this).scrollLeft(),y:a(this).scrollTop()})}),i.on(f,function(b){var c=a(this).data("select2-scroll-position");a(this).scrollTop(c.y)}),a(window).on(f+" "+g+" "+h,function(a){e._positionDropdown(),e._resizeDropdown()})},c.prototype._detachPositioningHandler=function(c,d){var e="scroll.select2."+d.id,f="resize.select2."+d.id,g="orientationchange.select2."+d.id,h=this.$container.parents().filter(b.hasScroll);h.off(e),a(window).off(e+" "+f+" "+g)},c.prototype._positionDropdown=function(){var b=a(window),c=this.$dropdown.hasClass("select2-dropdown--above"),d=this.$dropdown.hasClass("select2-dropdown--below"),e=null,f=this.$container.offset();f.bottom=f.top+this.$container.outerHeight(!1);var g={height:this.$container.outerHeight(!1)};g.top=f.top,g.bottom=f.top+g.height;var h={height:this.$dropdown.outerHeight(!1)},i={top:b.scrollTop(),bottom:b.scrollTop()+b.height()},j=i.top<f.top-h.height,k=i.bottom>f.bottom+h.height,l={left:f.left,top:g.bottom},m=this.$dropdownParent;"static"===m.css("position")&&(m=m.offsetParent());var n=m.offset();l.top-=n.top,l.left-=n.left,c||d||(e="below"),k||!j||c?!j&&k&&c&&(e="below"):e="above",("above"==e||c&&"below"!==e)&&(l.top=g.top-n.top-h.height),null!=e&&(this.$dropdown.removeClass("select2-dropdown--below select2-dropdown--above").addClass("select2-dropdown--"+e),this.$container.removeClass("select2-container--below select2-container--above").addClass("select2-container--"+e)),this.$dropdownContainer.css(l)},c.prototype._resizeDropdown=function(){var a={width:this.$container.outerWidth(!1)+"px"};this.options.get("dropdownAutoWidth")&&(a.minWidth=a.width,a.position="relative",a.width="auto"),this.$dropdown.css(a)},c.prototype._showDropdown=function(a){this.$dropdownContainer.appendTo(this.$dropdownParent),this._positionDropdown(),this._resizeDropdown()},c}),b.define("select2/dropdown/minimumResultsForSearch",[],function(){function a(b){for(var c=0,d=0;d<b.length;d++){var e=b[d];e.children?c+=a(e.children):c++}return c}function b(a,b,c,d){this.minimumResultsForSearch=c.get("minimumResultsForSearch"),this.minimumResultsForSearch<0&&(this.minimumResultsForSearch=1/0),a.call(this,b,c,d)}return b.prototype.showSearch=function(b,c){return a(c.data.results)<this.minimumResultsForSearch?!1:b.call(this,c)},b}),b.define("select2/dropdown/selectOnClose",[],function(){function a(){}return a.prototype.bind=function(a,b,c){var d=this;a.call(this,b,c),b.on("close",function(a){d._handleSelectOnClose(a)})},a.prototype._handleSelectOnClose=function(a,b){if(b&&null!=b.originalSelect2Event){var c=b.originalSelect2Event;if("select"===c._type||"unselect"===c._type)return}var d=this.getHighlightedResults();if(!(d.length<1)){var e=d.data("data");null!=e.element&&e.element.selected||null==e.element&&e.selected||this.trigger("select",{data:e})}},a}),b.define("select2/dropdown/closeOnSelect",[],function(){function a(){}return a.prototype.bind=function(a,b,c){var d=this;a.call(this,b,c),b.on("select",function(a){d._selectTriggered(a)}),b.on("unselect",function(a){d._selectTriggered(a)})},a.prototype._selectTriggered=function(a,b){var c=b.originalEvent;c&&c.ctrlKey||this.trigger("close",{originalEvent:c,originalSelect2Event:b})},a}),b.define("select2/i18n/en",[],function(){return{errorLoading:function(){return"The results could not be loaded."},inputTooLong:function(a){var b=a.input.length-a.maximum,c="Please delete "+b+" character";return 1!=b&&(c+="s"),c},inputTooShort:function(a){var b=a.minimum-a.input.length,c="Please enter "+b+" or more characters";return c},loadingMore:function(){return"Loading more results…"},maximumSelected:function(a){var b="You can only select "+a.maximum+" item";return 1!=a.maximum&&(b+="s"),b},noResults:function(){return"No results found"},searching:function(){return"Searching…"}}}),b.define("select2/defaults",["jquery","require","./results","./selection/single","./selection/multiple","./selection/placeholder","./selection/allowClear","./selection/search","./selection/eventRelay","./utils","./translation","./diacritics","./data/select","./data/array","./data/ajax","./data/tags","./data/tokenizer","./data/minimumInputLength","./data/maximumInputLength","./data/maximumSelectionLength","./dropdown","./dropdown/search","./dropdown/hidePlaceholder","./dropdown/infiniteScroll","./dropdown/attachBody","./dropdown/minimumResultsForSearch","./dropdown/selectOnClose","./dropdown/closeOnSelect","./i18n/en"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C){function D(){this.reset()}D.prototype.apply=function(l){if(l=a.extend(!0,{},this.defaults,l),null==l.dataAdapter){if(null!=l.ajax?l.dataAdapter=o:null!=l.data?l.dataAdapter=n:l.dataAdapter=m,l.minimumInputLength>0&&(l.dataAdapter=j.Decorate(l.dataAdapter,r)),l.maximumInputLength>0&&(l.dataAdapter=j.Decorate(l.dataAdapter,s)),l.maximumSelectionLength>0&&(l.dataAdapter=j.Decorate(l.dataAdapter,t)),l.tags&&(l.dataAdapter=j.Decorate(l.dataAdapter,p)),(null!=l.tokenSeparators||null!=l.tokenizer)&&(l.dataAdapter=j.Decorate(l.dataAdapter,q)),null!=l.query){var C=b(l.amdBase+"compat/query");l.dataAdapter=j.Decorate(l.dataAdapter,C)}if(null!=l.initSelection){var D=b(l.amdBase+"compat/initSelection");l.dataAdapter=j.Decorate(l.dataAdapter,D)}}if(null==l.resultsAdapter&&(l.resultsAdapter=c,null!=l.ajax&&(l.resultsAdapter=j.Decorate(l.resultsAdapter,x)),null!=l.placeholder&&(l.resultsAdapter=j.Decorate(l.resultsAdapter,w)),l.selectOnClose&&(l.resultsAdapter=j.Decorate(l.resultsAdapter,A))),null==l.dropdownAdapter){if(l.multiple)l.dropdownAdapter=u;else{var E=j.Decorate(u,v);l.dropdownAdapter=E}if(0!==l.minimumResultsForSearch&&(l.dropdownAdapter=j.Decorate(l.dropdownAdapter,z)),l.closeOnSelect&&(l.dropdownAdapter=j.Decorate(l.dropdownAdapter,B)),null!=l.dropdownCssClass||null!=l.dropdownCss||null!=l.adaptDropdownCssClass){var F=b(l.amdBase+"compat/dropdownCss");l.dropdownAdapter=j.Decorate(l.dropdownAdapter,F)}l.dropdownAdapter=j.Decorate(l.dropdownAdapter,y)}if(null==l.selectionAdapter){if(l.multiple?l.selectionAdapter=e:l.selectionAdapter=d,null!=l.placeholder&&(l.selectionAdapter=j.Decorate(l.selectionAdapter,f)),l.allowClear&&(l.selectionAdapter=j.Decorate(l.selectionAdapter,g)),l.multiple&&(l.selectionAdapter=j.Decorate(l.selectionAdapter,h)),null!=l.containerCssClass||null!=l.containerCss||null!=l.adaptContainerCssClass){var G=b(l.amdBase+"compat/containerCss");l.selectionAdapter=j.Decorate(l.selectionAdapter,G)}l.selectionAdapter=j.Decorate(l.selectionAdapter,i)}if("string"==typeof l.language)if(l.language.indexOf("-")>0){var H=l.language.split("-"),I=H[0];l.language=[l.language,I]}else l.language=[l.language];if(a.isArray(l.language)){var J=new k;l.language.push("en");for(var K=l.language,L=0;L<K.length;L++){var M=K[L],N={};try{N=k.loadPath(M)}catch(O){try{M=this.defaults.amdLanguageBase+M,N=k.loadPath(M)}catch(P){l.debug&&window.console&&console.warn&&console.warn('Select2: The language file for "'+M+'" could not be automatically loaded. A fallback will be used instead.');continue}}J.extend(N)}l.translations=J}else{var Q=k.loadPath(this.defaults.amdLanguageBase+"en"),R=new k(l.language);R.extend(Q),l.translations=R}return l},D.prototype.reset=function(){function b(a){function b(a){return l[a]||a}return a.replace(/[^\u0000-\u007E]/g,b)}function c(d,e){if(""===a.trim(d.term))return e;if(e.children&&e.children.length>0){for(var f=a.extend(!0,{},e),g=e.children.length-1;g>=0;g--){var h=e.children[g],i=c(d,h);null==i&&f.children.splice(g,1)}return f.children.length>0?f:c(d,f)}var j=b(e.text).toUpperCase(),k=b(d.term).toUpperCase();return j.indexOf(k)>-1?e:null}this.defaults={amdBase:"./",amdLanguageBase:"./i18n/",closeOnSelect:!0,debug:!1,dropdownAutoWidth:!1,escapeMarkup:j.escapeMarkup,language:C,matcher:c,minimumInputLength:0,maximumInputLength:0,maximumSelectionLength:0,minimumResultsForSearch:0,selectOnClose:!1,sorter:function(a){return a},templateResult:function(a){return a.text},templateSelection:function(a){return a.text},theme:"default",width:"resolve"}},D.prototype.set=function(b,c){var d=a.camelCase(b),e={};e[d]=c;var f=j._convertData(e);a.extend(this.defaults,f)};var E=new D;return E}),b.define("select2/options",["require","jquery","./defaults","./utils"],function(a,b,c,d){function e(b,e){if(this.options=b,null!=e&&this.fromElement(e),this.options=c.apply(this.options),e&&e.is("input")){var f=a(this.get("amdBase")+"compat/inputData");this.options.dataAdapter=d.Decorate(this.options.dataAdapter,f)}}return e.prototype.fromElement=function(a){var c=["select2"];null==this.options.multiple&&(this.options.multiple=a.prop("multiple")),null==this.options.disabled&&(this.options.disabled=a.prop("disabled")),null==this.options.language&&(a.prop("lang")?this.options.language=a.prop("lang").toLowerCase():a.closest("[lang]").prop("lang")&&(this.options.language=a.closest("[lang]").prop("lang"))),null==this.options.dir&&(a.prop("dir")?this.options.dir=a.prop("dir"):a.closest("[dir]").prop("dir")?this.options.dir=a.closest("[dir]").prop("dir"):this.options.dir="ltr"),a.prop("disabled",this.options.disabled),a.prop("multiple",this.options.multiple),a.data("select2Tags")&&(this.options.debug&&window.console&&console.warn&&console.warn('Select2: The `data-select2-tags` attribute has been changed to use the `data-data` and `data-tags="true"` attributes and will be removed in future versions of Select2.'),a.data("data",a.data("select2Tags")),a.data("tags",!0)),a.data("ajaxUrl")&&(this.options.debug&&window.console&&console.warn&&console.warn("Select2: The `data-ajax-url` attribute has been changed to `data-ajax--url` and support for the old attribute will be removed in future versions of Select2."),a.attr("ajax--url",a.data("ajaxUrl")),a.data("ajax--url",a.data("ajaxUrl")));var e={};e=b.fn.jquery&&"1."==b.fn.jquery.substr(0,2)&&a[0].dataset?b.extend(!0,{},a[0].dataset,a.data()):a.data();var f=b.extend(!0,{},e);f=d._convertData(f);for(var g in f)b.inArray(g,c)>-1||(b.isPlainObject(this.options[g])?b.extend(this.options[g],f[g]):this.options[g]=f[g]);return this},e.prototype.get=function(a){return this.options[a]},e.prototype.set=function(a,b){this.options[a]=b},e}),b.define("select2/core",["jquery","./options","./utils","./keys"],function(a,b,c,d){var e=function(a,c){null!=a.data("select2")&&a.data("select2").destroy(),this.$element=a,this.id=this._generateId(a),c=c||{},this.options=new b(c,a),e.__super__.constructor.call(this);var d=a.attr("tabindex")||0;a.data("old-tabindex",d),a.attr("tabindex","-1");var f=this.options.get("dataAdapter");this.dataAdapter=new f(a,this.options);var g=this.render();this._placeContainer(g);var h=this.options.get("selectionAdapter");this.selection=new h(a,this.options),this.$selection=this.selection.render(),this.selection.position(this.$selection,g);var i=this.options.get("dropdownAdapter");this.dropdown=new i(a,this.options),this.$dropdown=this.dropdown.render(),this.dropdown.position(this.$dropdown,g);var j=this.options.get("resultsAdapter");this.results=new j(a,this.options,this.dataAdapter),this.$results=this.results.render(),this.results.position(this.$results,this.$dropdown);var k=this;this._bindAdapters(),this._registerDomEvents(),this._registerDataEvents(),this._registerSelectionEvents(),this._registerDropdownEvents(),this._registerResultsEvents(),this._registerEvents(),this.dataAdapter.current(function(a){k.trigger("selection:update",{data:a})}),a.addClass("select2-hidden-accessible"),a.attr("aria-hidden","true"),this._syncAttributes(),a.data("select2",this)};return c.Extend(e,c.Observable),e.prototype._generateId=function(a){var b="";return b=null!=a.attr("id")?a.attr("id"):null!=a.attr("name")?a.attr("name")+"-"+c.generateChars(2):c.generateChars(4),b=b.replace(/(:|\.|\[|\]|,)/g,""),b="select2-"+b},e.prototype._placeContainer=function(a){a.insertAfter(this.$element);var b=this._resolveWidth(this.$element,this.options.get("width"));null!=b&&a.css("width",b)},e.prototype._resolveWidth=function(a,b){var c=/^width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i;if("resolve"==b){var d=this._resolveWidth(a,"style");return null!=d?d:this._resolveWidth(a,"element")}if("element"==b){var e=a.outerWidth(!1);return 0>=e?"auto":e+"px"}if("style"==b){var f=a.attr("style");if("string"!=typeof f)return null;for(var g=f.split(";"),h=0,i=g.length;i>h;h+=1){var j=g[h].replace(/\s/g,""),k=j.match(c);if(null!==k&&k.length>=1)return k[1]}return null}return b},e.prototype._bindAdapters=function(){this.dataAdapter.bind(this,this.$container),this.selection.bind(this,this.$container),this.dropdown.bind(this,this.$container),this.results.bind(this,this.$container)},e.prototype._registerDomEvents=function(){var b=this;this.$element.on("change.select2",function(){b.dataAdapter.current(function(a){b.trigger("selection:update",{data:a})})}),this.$element.on("focus.select2",function(a){b.trigger("focus",a)}),this._syncA=c.bind(this._syncAttributes,this),this._syncS=c.bind(this._syncSubtree,this),this.$element[0].attachEvent&&this.$element[0].attachEvent("onpropertychange",this._syncA);var d=window.MutationObserver||window.WebKitMutationObserver||window.MozMutationObserver;null!=d?(this._observer=new d(function(c){a.each(c,b._syncA),a.each(c,b._syncS)}),this._observer.observe(this.$element[0],{attributes:!0,childList:!0,subtree:!1})):this.$element[0].addEventListener&&(this.$element[0].addEventListener("DOMAttrModified",b._syncA,!1),this.$element[0].addEventListener("DOMNodeInserted",b._syncS,!1),this.$element[0].addEventListener("DOMNodeRemoved",b._syncS,!1))},e.prototype._registerDataEvents=function(){var a=this;this.dataAdapter.on("*",function(b,c){a.trigger(b,c)})},e.prototype._registerSelectionEvents=function(){var b=this,c=["toggle","focus"];this.selection.on("toggle",function(){b.toggleDropdown()}),this.selection.on("focus",function(a){b.focus(a)}),this.selection.on("*",function(d,e){-1===a.inArray(d,c)&&b.trigger(d,e)})},e.prototype._registerDropdownEvents=function(){var a=this;this.dropdown.on("*",function(b,c){a.trigger(b,c)})},e.prototype._registerResultsEvents=function(){var a=this;this.results.on("*",function(b,c){a.trigger(b,c)})},e.prototype._registerEvents=function(){var a=this;this.on("open",function(){a.$container.addClass("select2-container--open")}),this.on("close",function(){a.$container.removeClass("select2-container--open")}),this.on("enable",function(){a.$container.removeClass("select2-container--disabled")}),this.on("disable",function(){a.$container.addClass("select2-container--disabled")}),this.on("blur",function(){a.$container.removeClass("select2-container--focus")}),this.on("query",function(b){a.isOpen()||a.trigger("open",{}),this.dataAdapter.query(b,function(c){a.trigger("results:all",{data:c,query:b})})}),this.on("query:append",function(b){this.dataAdapter.query(b,function(c){a.trigger("results:append",{data:c,query:b})})}),this.on("keypress",function(b){var c=b.which;a.isOpen()?c===d.ESC||c===d.TAB||c===d.UP&&b.altKey?(a.close(),b.preventDefault()):c===d.ENTER?(a.trigger("results:select",{}),b.preventDefault()):c===d.SPACE&&b.ctrlKey?(a.trigger("results:toggle",{}),b.preventDefault()):c===d.UP?(a.trigger("results:previous",{}),b.preventDefault()):c===d.DOWN&&(a.trigger("results:next",{}),b.preventDefault()):(c===d.ENTER||c===d.SPACE||c===d.DOWN&&b.altKey)&&(a.open(),b.preventDefault())})},e.prototype._syncAttributes=function(){this.options.set("disabled",this.$element.prop("disabled")),this.options.get("disabled")?(this.isOpen()&&this.close(),this.trigger("disable",{})):this.trigger("enable",{})},e.prototype._syncSubtree=function(a,b){var c=!1,d=this;if(!a||!a.target||"OPTION"===a.target.nodeName||"OPTGROUP"===a.target.nodeName){if(b)if(b.addedNodes&&b.addedNodes.length>0)for(var e=0;e<b.addedNodes.length;e++){var f=b.addedNodes[e];f.selected&&(c=!0)}else b.removedNodes&&b.removedNodes.length>0&&(c=!0);else c=!0;c&&this.dataAdapter.current(function(a){d.trigger("selection:update",{data:a})})}},e.prototype.trigger=function(a,b){var c=e.__super__.trigger,d={open:"opening",close:"closing",select:"selecting",unselect:"unselecting"};if(void 0===b&&(b={}),a in d){var f=d[a],g={prevented:!1,name:a,args:b};if(c.call(this,f,g),g.prevented)return void(b.prevented=!0)}c.call(this,a,b)},e.prototype.toggleDropdown=function(){this.options.get("disabled")||(this.isOpen()?this.close():this.open())},e.prototype.open=function(){this.isOpen()||this.trigger("query",{})},e.prototype.close=function(){this.isOpen()&&this.trigger("close",{})},e.prototype.isOpen=function(){return this.$container.hasClass("select2-container--open")},e.prototype.hasFocus=function(){return this.$container.hasClass("select2-container--focus")},e.prototype.focus=function(a){this.hasFocus()||(this.$container.addClass("select2-container--focus"),this.trigger("focus",{}))},e.prototype.enable=function(a){this.options.get("debug")&&window.console&&console.warn&&console.warn('Select2: The `select2("enable")` method has been deprecated and will be removed in later Select2 versions. Use $element.prop("disabled") instead.'),(null==a||0===a.length)&&(a=[!0]);var b=!a[0];this.$element.prop("disabled",b)},e.prototype.data=function(){this.options.get("debug")&&arguments.length>0&&window.console&&console.warn&&console.warn('Select2: Data can no longer be set using `select2("data")`. You should consider setting the value instead using `$element.val()`.');var a=[];return this.dataAdapter.current(function(b){a=b}),a},e.prototype.val=function(b){if(this.options.get("debug")&&window.console&&console.warn&&console.warn('Select2: The `select2("val")` method has been deprecated and will be removed in later Select2 versions. Use $element.val() instead.'),null==b||0===b.length)return this.$element.val();var c=b[0];a.isArray(c)&&(c=a.map(c,function(a){return a.toString()})),this.$element.val(c).trigger("change")},e.prototype.destroy=function(){this.$container.remove(),this.$element[0].detachEvent&&this.$element[0].detachEvent("onpropertychange",this._syncA),null!=this._observer?(this._observer.disconnect(),this._observer=null):this.$element[0].removeEventListener&&(this.$element[0].removeEventListener("DOMAttrModified",this._syncA,!1),this.$element[0].removeEventListener("DOMNodeInserted",this._syncS,!1),this.$element[0].removeEventListener("DOMNodeRemoved",this._syncS,!1)),this._syncA=null,this._syncS=null,this.$element.off(".select2"),this.$element.attr("tabindex",this.$element.data("old-tabindex")),this.$element.removeClass("select2-hidden-accessible"),this.$element.attr("aria-hidden","false"),this.$element.removeData("select2"),this.dataAdapter.destroy(),this.selection.destroy(),this.dropdown.destroy(),this.results.destroy(),this.dataAdapter=null,this.selection=null,this.dropdown=null,this.results=null;
},e.prototype.render=function(){var b=a('<span class="select2 select2-container"><span class="selection"></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>');return b.attr("dir",this.options.get("dir")),this.$container=b,this.$container.addClass("select2-container--"+this.options.get("theme")),b.data("element",this.$element),b},e}),b.define("jquery-mousewheel",["jquery"],function(a){return a}),b.define("jquery.select2",["jquery","jquery-mousewheel","./select2/core","./select2/defaults"],function(a,b,c,d){if(null==a.fn.select2){var e=["open","close","destroy"];a.fn.select2=function(b){if(b=b||{},"object"==typeof b)return this.each(function(){var d=a.extend(!0,{},b);new c(a(this),d)}),this;if("string"==typeof b){var d,f=Array.prototype.slice.call(arguments,1);return this.each(function(){var c=a(this).data("select2");null==c&&window.console&&console.error&&console.error("The select2('"+b+"') method was called on an element that is not using Select2."),d=c[b].apply(c,f)}),a.inArray(b,e)>-1?this:d}throw new Error("Invalid arguments for Select2: "+b)}}return null==a.fn.select2.defaults&&(a.fn.select2.defaults=d),c}),{define:b.define,require:b.require}}(),c=b.require("jquery.select2");return a.fn.select2.amd=b,c});/*! rangeslider.js - v2.3.0 | (c) 2016 @andreruffert | MIT license | https://github.com/andreruffert/rangeslider.js */
!function(a){"use strict";"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?module.exports=a(require("jquery")):a(jQuery)}(function(a){"use strict";function b(){var a=document.createElement("input");return a.setAttribute("type","range"),"text"!==a.type}function c(a,b){var c=Array.prototype.slice.call(arguments,2);return setTimeout(function(){return a.apply(null,c)},b)}function d(a,b){return b=b||100,function(){if(!a.debouncing){var c=Array.prototype.slice.apply(arguments);a.lastReturnVal=a.apply(window,c),a.debouncing=!0}return clearTimeout(a.debounceTimeout),a.debounceTimeout=setTimeout(function(){a.debouncing=!1},b),a.lastReturnVal}}function e(a){return a&&(0===a.offsetWidth||0===a.offsetHeight||a.open===!1)}function f(a){for(var b=[],c=a.parentNode;e(c);)b.push(c),c=c.parentNode;return b}function g(a,b){function c(a){"undefined"!=typeof a.open&&(a.open=!a.open)}var d=f(a),e=d.length,g=[],h=a[b];if(e){for(var i=0;i<e;i++)g[i]=d[i].style.cssText,d[i].style.setProperty?d[i].style.setProperty("display","block","important"):d[i].style.cssText+=";display: block !important",d[i].style.height="0",d[i].style.overflow="hidden",d[i].style.visibility="hidden",c(d[i]);h=a[b];for(var j=0;j<e;j++)d[j].style.cssText=g[j],c(d[j])}return h}function h(a,b){var c=parseFloat(a);return Number.isNaN(c)?b:c}function i(a){return a.charAt(0).toUpperCase()+a.substr(1)}function j(b,e){if(this.$window=a(window),this.$document=a(document),this.$element=a(b),this.options=a.extend({},n,e),this.polyfill=this.options.polyfill,this.orientation=this.$element[0].getAttribute("data-orientation")||this.options.orientation,this.onInit=this.options.onInit,this.onSlide=this.options.onSlide,this.onSlideEnd=this.options.onSlideEnd,this.DIMENSION=o.orientation[this.orientation].dimension,this.DIRECTION=o.orientation[this.orientation].direction,this.DIRECTION_STYLE=o.orientation[this.orientation].directionStyle,this.COORDINATE=o.orientation[this.orientation].coordinate,this.polyfill&&m)return!1;this.identifier="js-"+k+"-"+l++,this.startEvent=this.options.startEvent.join("."+this.identifier+" ")+"."+this.identifier,this.moveEvent=this.options.moveEvent.join("."+this.identifier+" ")+"."+this.identifier,this.endEvent=this.options.endEvent.join("."+this.identifier+" ")+"."+this.identifier,this.toFixed=(this.step+"").replace(".","").length-1,this.$fill=a('<div class="'+this.options.fillClass+'" />'),this.$handle=a('<div class="'+this.options.handleClass+'" />'),this.$range=a('<div class="'+this.options.rangeClass+" "+this.options[this.orientation+"Class"]+'" id="'+this.identifier+'" />').insertAfter(this.$element).prepend(this.$fill,this.$handle),this.$element.css({position:"absolute",width:"1px",height:"1px",overflow:"hidden",opacity:"0"}),this.handleDown=a.proxy(this.handleDown,this),this.handleMove=a.proxy(this.handleMove,this),this.handleEnd=a.proxy(this.handleEnd,this),this.init();var f=this;this.$window.on("resize."+this.identifier,d(function(){c(function(){f.update(!1,!1)},300)},20)),this.$document.on(this.startEvent,"#"+this.identifier+":not(."+this.options.disabledClass+")",this.handleDown),this.$element.on("change."+this.identifier,function(a,b){if(!b||b.origin!==f.identifier){var c=a.target.value,d=f.getPositionFromValue(c);f.setPosition(d)}})}Number.isNaN=Number.isNaN||function(a){return"number"==typeof a&&a!==a};var k="rangeslider",l=0,m=b(),n={polyfill:!0,orientation:"horizontal",rangeClass:"rangeslider",disabledClass:"rangeslider--disabled",activeClass:"rangeslider--active",horizontalClass:"rangeslider--horizontal",verticalClass:"rangeslider--vertical",fillClass:"rangeslider__fill",handleClass:"rangeslider__handle",startEvent:["mousedown","touchstart","pointerdown"],moveEvent:["mousemove","touchmove","pointermove"],endEvent:["mouseup","touchend","pointerup"]},o={orientation:{horizontal:{dimension:"width",direction:"left",directionStyle:"left",coordinate:"x"},vertical:{dimension:"height",direction:"top",directionStyle:"bottom",coordinate:"y"}}};return j.prototype.init=function(){this.update(!0,!1),this.onInit&&"function"==typeof this.onInit&&this.onInit()},j.prototype.update=function(a,b){a=a||!1,a&&(this.min=h(this.$element[0].getAttribute("min"),0),this.max=h(this.$element[0].getAttribute("max"),100),this.value=h(this.$element[0].value,Math.round(this.min+(this.max-this.min)/2)),this.step=h(this.$element[0].getAttribute("step"),1)),this.handleDimension=g(this.$handle[0],"offset"+i(this.DIMENSION)),this.rangeDimension=g(this.$range[0],"offset"+i(this.DIMENSION)),this.maxHandlePos=this.rangeDimension-this.handleDimension,this.grabPos=this.handleDimension/2,this.position=this.getPositionFromValue(this.value),this.$element[0].disabled?this.$range.addClass(this.options.disabledClass):this.$range.removeClass(this.options.disabledClass),this.setPosition(this.position,b)},j.prototype.handleDown=function(a){if(a.preventDefault(),this.$document.on(this.moveEvent,this.handleMove),this.$document.on(this.endEvent,this.handleEnd),this.$range.addClass(this.options.activeClass),!((" "+a.target.className+" ").replace(/[\n\t]/g," ").indexOf(this.options.handleClass)>-1)){var b=this.getRelativePosition(a),c=this.$range[0].getBoundingClientRect()[this.DIRECTION],d=this.getPositionFromNode(this.$handle[0])-c,e="vertical"===this.orientation?this.maxHandlePos-(b-this.grabPos):b-this.grabPos;this.setPosition(e),b>=d&&b<d+this.handleDimension&&(this.grabPos=b-d)}},j.prototype.handleMove=function(a){a.preventDefault();var b=this.getRelativePosition(a),c="vertical"===this.orientation?this.maxHandlePos-(b-this.grabPos):b-this.grabPos;this.setPosition(c)},j.prototype.handleEnd=function(a){a.preventDefault(),this.$document.off(this.moveEvent,this.handleMove),this.$document.off(this.endEvent,this.handleEnd),this.$range.removeClass(this.options.activeClass),this.$element.trigger("change",{origin:this.identifier}),this.onSlideEnd&&"function"==typeof this.onSlideEnd&&this.onSlideEnd(this.position,this.value)},j.prototype.cap=function(a,b,c){return a<b?b:a>c?c:a},j.prototype.setPosition=function(a,b){var c,d;void 0===b&&(b=!0),c=this.getValueFromPosition(this.cap(a,0,this.maxHandlePos)),d=this.getPositionFromValue(c),this.$fill[0].style[this.DIMENSION]=d+this.grabPos+"px",this.$handle[0].style[this.DIRECTION_STYLE]=d+"px",this.setValue(c),this.position=d,this.value=c,b&&this.onSlide&&"function"==typeof this.onSlide&&this.onSlide(d,c)},j.prototype.getPositionFromNode=function(a){for(var b=0;null!==a;)b+=a.offsetLeft,a=a.offsetParent;return b},j.prototype.getRelativePosition=function(a){var b=i(this.COORDINATE),c=this.$range[0].getBoundingClientRect()[this.DIRECTION],d=0;return"undefined"!=typeof a.originalEvent["client"+b]?d=a.originalEvent["client"+b]:a.originalEvent.touches&&a.originalEvent.touches[0]&&"undefined"!=typeof a.originalEvent.touches[0]["client"+b]?d=a.originalEvent.touches[0]["client"+b]:a.currentPoint&&"undefined"!=typeof a.currentPoint[this.COORDINATE]&&(d=a.currentPoint[this.COORDINATE]),d-c},j.prototype.getPositionFromValue=function(a){var b,c;return b=(a-this.min)/(this.max-this.min),c=Number.isNaN(b)?0:b*this.maxHandlePos},j.prototype.getValueFromPosition=function(a){var b,c;return b=a/(this.maxHandlePos||1),c=this.step*Math.round(b*(this.max-this.min)/this.step)+this.min,Number(c.toFixed(this.toFixed))},j.prototype.setValue=function(a){a===this.value&&""!==this.$element[0].value||this.$element.val(a).trigger("input",{origin:this.identifier})},j.prototype.destroy=function(){this.$document.off("."+this.identifier),this.$window.off("."+this.identifier),this.$element.off("."+this.identifier).removeAttr("style").removeData("plugin_"+k),this.$range&&this.$range.length&&this.$range[0].parentNode.removeChild(this.$range[0])},a.fn[k]=function(b){var c=Array.prototype.slice.call(arguments,1);return this.each(function(){var d=a(this),e=d.data("plugin_"+k);e||d.data("plugin_"+k,e=new j(this,b)),"string"==typeof b&&e[b].apply(e,c)})},"rangeslider.js is available in jQuery context e.g $(selector).rangeslider(options);"});
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
      //The api.czr_skopeReady is used by some modules like the slider to fire actions
      //if skope is disabled, we need to resolve it now.
      api.czr_skopeReady = $.Deferred();
      if ( _.isUndefined( serverControlParams.isSkopOn ) || ! serverControlParams.isSkopOn ) {
            api.czr_skopeReady.resolve();
      }

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
                      return string.length > 150 ? string.substr( 0, 149 ) : string;
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
            console.log( 'Unstyled error message : ', arguments );
      };

      api.czr_isSkopOn = function() {
            return ! _.isUndefined ( serverControlParams.isSkopOn ) && serverControlParams.isSkopOn && _.has( api, 'czr_skopeBase' );
      };

      api.czr_isChangeSetOn = function() {
            return serverControlParams.isChangeSetOn && true === true;//&& true === true is just there to hackily cast the returned value as boolean.
      };

})( wp.customize , jQuery, _);
( function ( api, $, _ ) {
      // if ( ! serverControlParams.isSkopOn )
      //   return;
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
      //@param dirtyness : the current dirtyness status of this setting in the skope
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

            if ( serverControlParams.isSkopOn && api.czr_isPreviewerSkopeAware && 'pending' == api.czr_isPreviewerSkopeAware.state() ) {
                  this.previewer.refresh();
                  return dfd.resolve( arguments ).promise();
            }
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
                  //the refresh() method only returns a promise when skope is on
                  if ( serverControlParams.isSkopOn ) {
                        setting.previewer.refresh().always( function() {
                              dfd.resolve( arguments );
                        });
                  } else {
                        setting.previewer.refresh();
                        dfd.resolve( arguments );
                  }
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
      //While a control should always have a default setting,
      //It can have additional setting assigned
      //This method returns the default setting or the specified type if requested
      //Example : header_image has default and data
      getControlSettingId : function( control_id, setting_type ) {
            setting_type = 'default' || setting_type;
            if ( ! api.control.has( control_id ) ) {
                  api.consoleLog( 'getControlSettingId : The requested control_id is not registered in the api yet : ' + control_id );
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
              '<span class="far fa-question-circle"></span>'
            ].join('');
      },


      /*
      * @return string
      * simple helper to build the setting wp api ready id
      */
      build_setId : function ( setId ) {
            //exclude the WP built-in settings like blogdescription, show_on_front, etc
            if ( _.contains( serverControlParams.wpBuiltinSettings, setId ) )
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
            if ( ! _.contains( serverControlParams.themeSettingList, setId ) )
              return setId;

            return -1 == setId.indexOf( serverControlParams.themeOptions ) ? [ serverControlParams.themeOptions +'[' , setId  , ']' ].join('') : setId;
    },

      /*
      * @return string
      * simple helper to extract the option name from a setting id
      */
      getOptionName : function(name) {
            var self = this;
            //targets only the options of the theme
            if ( -1 == name.indexOf(serverControlParams.themeOptions) )
              return name;
            return name.replace(/\[|\]/g, '').replace(serverControlParams.themeOptions, '');
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



      //This method is now statically accessed by item and modopt instances because it does the same job for both.
      //=> It instantiates the inputs based on what it finds in the DOM ( item or mod opt js templates )
      //
      //Fired on 'contentRendered' for items and on user click for module options (mod opt)
      //creates the inputs based on the rendered parent item or mod option
      //inputParentInst can be an item instance or a module option instance
      setupInputCollectionFromDOM : function() {
            var inputParentInst = this;//<= because fired with .call( inputParentInst )
            if ( ! _.isFunction( inputParentInst ) ) {
                  throw new Error( 'setupInputCollectionFromDOM : inputParentInst is not valid.' );
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
              throw new Error( 'No default model found in item or mod opt ' + inputParentInst.id + '.' );
            }

            //prepare and sets the inputParentInst value on api ready
            //=> triggers the module rendering + DOM LISTENERS
            var inputParentInst_model = $.extend( true, {}, inputParentInst() );

            if ( ! _.isObject( inputParentInst_model ) )
              inputParentInst_model = _defaultInputParentModel;
            else
              inputParentInst_model = $.extend( _defaultInputParentModel, inputParentInst_model );

            var dom_inputParentInst_model = {};

            //creates the inputs based on the rendered item or mod opt
            $( '.' + module.control.css_attr.sub_set_wrapper, inputParentInst.container).each( function( _index ) {
                  var _id = $(this).find('[data-type]').attr( 'data-type' ),
                      _value = _.has( inputParentInst_model, _id ) ? inputParentInst_model[ _id ] : '';

                  //skip if no valid input data-type is found in this node
                  if ( _.isUndefined( _id ) || _.isEmpty( _id ) ) {
                        api.consoleLog( 'setupInputCollectionFromDOM : missing data-type for ' + module.id );
                        return;
                  }
                  //check if this property exists in the current inputParentInst model
                  if ( ! _.has( inputParentInst_model, _id ) ) {
                        throw new Error('The item or mod opt property : ' + _id + ' has been found in the DOM but not in the item or mod opt model : '+ inputParentInst.id + '. The input can not be instantiated.');
                  }

                  //Do we have a specific set of options defined in the parent module for this inputConstructor ?
                  var _inputType      = $(this).attr( 'data-input-type' ),
                      _inputTransport = $(this).attr( 'data-transport' ) || 'inherit',//<= if no specific transport ( refresh or postMessage ) has been defined in the template, inherits the control transport
                      _inputOptions   = _.has( module.inputOptions, _inputType ) ? module.inputOptions[ _inputType ] : {};

                  //INSTANTIATE THE INPUT
                  inputParentInst.czr_Input.add( _id, new inputParentInst.inputConstructor( _id, {
                        id            : _id,
                        type          : _inputType,
                        transport     : _inputTransport,
                        input_value   : _value,
                        input_options : _inputOptions,//<= a module can define a specific set of option
                        container     : $(this),
                        input_parent  : inputParentInst,
                        is_mod_opt    : is_mod_opt,
                        module        : module
                  } ) );

                  //FIRE THE INPUT
                  //fires ready once the input Value() instance is initialized
                  inputParentInst.czr_Input( _id ).ready();

                  //POPULATES THE PARENT INPUT COLLECTION
                  dom_inputParentInst_model[ _id ] = _value;
                  //shall we trigger a specific event when the input collection from DOM has been populated ?
            });//each

            //stores the collection
            inputParentInst.inputCollection( dom_inputParentInst_model );

            //chain
            return inputParentInst;
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


      //COLORS
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
                    api.errorLog( 'setupDomListeners : event_map should be an array', args );
                    return;
              }

              //args : are we good ?
              if ( ! _.isObject( args ) ) {
                    api.errorLog( 'setupDomListeners : args should be an object', event_map );
                    return;
              }

              args = _.extend( _defaultArgs, args );
              // => we need an existing dom element
              if ( ! args.dom_el instanceof jQuery || 1 > args.dom_el.length ) {
                    api.errorLog( 'setupDomListeners : dom element should be an existing dom element', args );
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
                          api.errorLog( 'setupDOMListeners : selector must be a string not empty. Aborting setup of action(s) : ' + _event.actions.join(',') );
                          return;
                    }

                    //Are we good ?
                    if ( ! _.isString( _event.selector ) || _.isEmpty( _event.selector ) ) {
                          api.errorLog( 'setupDOMListeners : selector must be a string not empty. Aborting setup of action(s) : ' + _event.actions.join(',') );
                          return;
                    }

                    // if ( ! _event.name && ! _.isEmpty( _event.name ) ) {
                    //     api.errorLog('in setupDOMListeners : missing name', _event );
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
                                // api.errorLog('Dom listener already created for event : ', _name );
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
                                api.errorLog( 'executeEventActionChain : missing obj.event or obj.event.actions' );
                                return;
                          }
                          try { control.executeEventActionChain( actionsParams, instance ); } catch( er ) {
                                api.errorLog( 'In setupDOMListeners : problem when trying to fire actions : ' + actionsParams.event.actions );
                                api.errorLog( 'Error : ' + er );
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
  //This promise will let us know when we have the first set of preview query ready to use
  //This is needed for modules contextually dependant
  //For example, the slider module will initialize the module model based on the contextual informations, if no items have been set yet.

  api.czr_wpQueryDataReady = $.Deferred();
  api.czr_wpQueryInfos = api.czr_wpQueryInfos || new api.Value();
  api.czr_partials = api.czr_partials || new api.Value();
  /*****************************************************************************
  * CAPTURE PREVIEW INFORMATIONS ON REFRESH + REACT TO THEM
  *****************************************************************************/
  //Data are sent by the preview frame when the panel has sent the 'sync' or even better 'active' event
  api.bind( 'ready', function() {
        //observe widget settings changes
        api.previewer.bind('houston-widget-settings', function(data) {
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

              //stores and update the widget zone settings
              api.czr_widgetZoneSettings = api.czr_widgetZoneSettings || new api.Value();//will store all widget zones data sent by preview as an observable object
              api.czr_widgetZoneSettings.set( {
                    actives :  data.renderedSidebars,
                    inactives :  _inactives,
                    registered :  _registered,
                    candidates :  _candidates,
                    available_locations :  data.availableWidgetLocations//built server side
              } );

        });

        /* WP CONDITIONAL TAGS => stores and observes the WP conditional tags sent by the preview */
        api.previewer.bind( 'czr-query-data-ready', function( data ) {
              api.czr_wpQueryInfos( data );
              if ( 'pending' == api.czr_wpQueryDataReady.state() ) {
                    api.czr_wpQueryDataReady.resolve( data );
              }
        });

        //PARTIAL REFRESHS => stores and observes the partials data sent by the preview
        api.previewer.bind( 'czr-partial-refresh-data', function( data ) {
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
// input_value : $(this).find('[data-type]').val(),
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

          //DEFERRED STATES
          //store the state of ready.
          input.isReady = $.Deferred();

          //initialize to the provided value if any
          if ( ! _.isUndefined(options.input_value) ) {
                input.set( options.input_value );
          }

          //Try to find a match with the provided constructor type
          //=> fire the relevant callback with the provided input_options
          //input.type_map is declared in extend_api_base
          if ( api.czrInputMap && _.has( api.czrInputMap, input.type ) ) {
                var _meth = api.czrInputMap[ input.type ];
                if ( _.isFunction( input[_meth]) ) {
                      input[_meth]( options.input_options || null );
                }
          } else {
                api.consoleLog('Warning an input : ' + input.id + ' has no corresponding method defined in api.czrInputMap.');
          }

          var trigger_map = {
                text : 'keyup',
                textarea : 'keyup',
                password : 'keyup',
                color : 'colorpickerchange',
                range : 'input propertychange'
          };

          //Input Event Map
          input.input_event_map = [
                  //set input value
                  {
                    trigger   : $.trim( ['change', trigger_map[input.type] || '' ].join(' ') ),//was 'propertychange change click keyup input',//colorpickerchange is a custom colorpicker event @see method setupColorPicker => otherwise we don't
                    selector  : 'input[data-type], select[data-type], textarea[data-type]',
                    name      : 'set_input_value',
                    actions   : function( obj ) {
                        if ( ! _.has( input.input_parent, 'syncElements') || ! _.has( input.input_parent.syncElements, input.id ) ) {
                            throw new Error('WARNING : THE INPUT ' + input.id + ' HAS NO SYNCED ELEMENT.');
                        }
                    }//was 'updateInput'
                  }
          ];

          //Visibility
          input.visible = new api.Value( true );
          input.isReady.done( function() {
                input.visible.bind( function( visible ) {
                      if ( visible )
                        input.container.stop( true, true ).slideDown( 200 );
                      else
                        input.container.stop( true, true ).slideUp( 200 );
                });
          });

          //Visibility
          input.enabled = new api.Value( true );
          input.isReady.done( function() {
                input.enabled.bind( function( enabled ) {
                      input.container.toggleClass( 'disabled', ! enabled );
                });
          });

    },


    //this method is not fired automatically
    //It has to be invoked once the input has been instanciated.
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
              $_input_el  = input.container.find('[data-type]'),
              is_textarea = input.container.find('[data-type]').is('textarea');

          //@hack => todo
          //for text area inputs, the synchronizer is buggy
          if ( is_textarea ) {
            throw new Error('TO DO : THE TEXTAREA INPUT ARE NOT READY IN THE SYNCHRONIZER!');
          }

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
                input_transport   : input.transport,
                not_preview_sent  : 'postMessage' === input.transport//<= this parameter set to true will prevent the setting to be sent to the preview ( @see api.Setting.prototype.preview override ). This is useful to decide if a specific input should refresh or not the preview.
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
                  //input.container.find('[data-type]').trigger('colorpickerchange');

                  //synchronizes with the original input
                  //OLD => $(this).val( $(this).wpColorPicker('color') ).trigger('colorpickerchange').trigger('change');
                  $(this).val( o.color.toString() ).trigger('colorpickerchange').trigger('change');
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

    setupStepper : function( obj ) {
          var input      = this;
          $('input[type="number"]',input.container ).each( function( e ) {
                $(this).stepper();
          });
    },

    //@use rangeslider https://github.com/andreruffert/rangeslider.js
    setupRangeSlider : function( options ) {
              var input = this,
                  $handle,
                  _updateHandle = function(el, val) {
                        el.textContent = val + "%";
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
                    //onSlide: function(position, value) {},
                    // Callback function
                    //onSlideEnd: function(position, value) {}
              } ).on('input', function() {
                    _updateHandle( $handle[0], this.value );
              });
        }
});//$.extend
})( wp.customize , jQuery, _ );var CZRInputMths = CZRInputMths || {};
( function ( api, $, _ ) {
$.extend( CZRInputMths , {
    setupImageUploader : function() {
          var input        = this,
              _model       = input();

          //an instance field where we'll store the current attachment
          input.attachment   = {};

          //do we have an html template and a input container?
          if ( ! input.container )
            return this;

          this.tmplRendered = $.Deferred();
          this.setupContentRendering( _model, {} );

          //valid just in the init
          this.tmplRendered.done( function(){
            input.czrImgUploaderBinding();
          });
  },

  setupContentRendering : function( to, from) {
        var input = this, _attachment;
        //retrieve new image if 'to' is different from the saved one
        //NEED A BETTER WAY?
        if ( ( input.attachment.id != to ) && from !== to ) {
              if ( ! to ) {
                    input.attachment = {};
                    input.renderImageUploaderTemplate();
              }
              //Has this image already been fetched ?
              _attachment = wp.media.attachment( to );
              if ( _.isObject( _attachment ) && _.has( _attachment, 'attributes' ) && _.has( _attachment.attributes, 'sizes' ) ) {
                    input.attachment       = _attachment.attributes;
                    input.renderImageUploaderTemplate();
              } else {
                    wp.media.attachment( to ).fetch().done( function() {
                          input.attachment       = this.attributes;
                          input.renderImageUploaderTemplate();
                    });
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
              input.setupContentRendering(to,from);
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
        input.set(attachment.id);
  },




  //////////////////////////////////////////////////
  /// HELPERS
  //////////////////////////////////////////////////
  renderImageUploaderTemplate: function() {
        var input  = this;

        //do we have view template script?
        if ( 0 === $( '#tmpl-czr-input-img-uploader-view-content' ).length )
          return;

        var view_template = wp.template('czr-input-img-uploader-view-content');

        //  //do we have an html template and a module container?
        if ( ! view_template  || ! input.container )
         return;

        var $_view_el    = input.container.find('.' + input.module.control.css_attr.img_upload_container );

        if ( ! $_view_el.length )
          return;

        var _template_params = {
          button_labels : input.getUploaderLabels(),
          settings      : input.id,
          attachment    : input.attachment,
          canUpload     : true
        };

        $_view_el.html( view_template( _template_params) );

        input.tmplRendered.resolve();
        input.container.trigger( input.id + ':content_rendered' );

        return true;
  },

  getUploaderLabels : function() {
        var _ts = serverControlParams.i18n,
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
        _.each( _map, function( ts_string, key ) {
              if ( _.isUndefined( ts_string ) ) {
                    var input = this;
                    api.errorLog( 'A translated string is missing ( ' + key + ' ) for the image uploader input in module : ' + input.module.id );
                    return '';
              }
        });

        return _map;
  }
});//$.extend
})( wp.customize , jQuery, _ );/* Fix caching, select2 default one seems to not correctly work, or it doesn't what I think it should */
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
      setupContentPicker: function( wpObjectTypes ) {
              var input  = this,
              _event_map = [];

              /* Dummy for the prototype purpose */
              //input.object = ['post']; //this.control.params.object_types  - array('page', 'post')
              $.extend( {
                    post : '',
                    taxonomy : ''
              }, _.isObject( wpObjectTypes ) ? wpObjectTypes : {} );

              input.wpObjectTypes = wpObjectTypes;

              /* Methodize this or use a template */
              input.container.find('.czr-input').append('<select data-select-type="content-picker-select" class="js-example-basic-simple"></select>');

              //binding
              _event_map = [
                    //set input value
                    {
                          trigger   : 'change',
                          selector  : 'select[data-select-type]',
                          name      : 'set_input_value',
                          actions   : function( obj ){
                                var $_changed_input   = $( obj.dom_event.currentTarget, obj.dom_el ),
                                    _raw_val          = $( $_changed_input, obj.dom_el ).select2( 'data' ),
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
                                    api.errorLog( 'Content Picker Input : the picked value should be an object not empty.');
                                    return;
                                }

                                //normalize and purge useless select2 fields
                                //=> skip a possible _custom_ id, used for example in the slider module to set a custom url
                                _.each( _default, function( val, k ){
                                      if ( '_custom_' !== _raw_val.id ) {
                                            if ( ! _.has( _raw_val, k ) || _.isEmpty( _raw_val[ k ] ) ) {
                                                  api.errorLog( 'content_picker : missing input param : ' + k );
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

              input.setupDOMListeners( _event_map , { dom_el : input.container }, input );
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

              input.container.find( 'select' ).select2( {
                    placeholder: {
                          id: '-1', // the value of the option
                          title: 'Select'
                    },
                    data : input.setupSelectedContents(),
                    //  allowClear: true,
                    ajax: {
                          url: serverControlParams.AjaxUrl,
                          type: 'POST',
                          dataType: 'json',
                          delay: 250,
                          debug: true,
                          data: function ( params ) {
                                //for some reason I'm not getting at the moment the params.page returned when searching is different
                                var page = params.page ? params.page : 0;
                                page = params.term ? params.page : page;
                                return {
                                      action          : params.term ? "search-available-content-items-customizer" : "load-available-content-items-customizer",
                                      search          : params.term,
                                      wp_customize    : 'on',
                                      page            : page,
                                      wp_object_types : JSON.stringify( input.wpObjectTypes ),
                                      CZRCpNonce      : serverControlParams.CZRCpNonce
                                };
                          },
                          /* transport: function (params, success, failure) {
                            var $request = $.ajax(params);

                            $request.then(success);
                            $request.fail(failure);

                            return $request;
                          },*/
                          processResults: function ( data, params ) {
                                //let us remotely set a default option like custom link when initializing the content picker input.
                                input.defaultContentPickerOption = input.defaultContentPickerOption || [];

                                if ( ! data.success )
                                  return { results: input.defaultContentPickerOption };


                                var items   = data.data.items,
                                    _results = [];

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
                                      pagination: { more: data.data.items.length >= 10 }//<= the pagination boolean param can be tricky => here set to >= 10 because we query 10 + add a custom link item on the first query
                                };
                          },
                    },//ajax
                    templateSelection: input.czrFormatContentSelected,
                    templateResult: input.czrFormatContentSelected,
                    escapeMarkup: function ( markup ) { return markup; },
             });//select2 setup
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
})( wp.customize , jQuery, _ );var CZRInputMths = CZRInputMths || {};
( function ( api, $, _ ) {
$.extend( CZRInputMths , {
      setupTextEditor : function() {
            var input        = this,
                _model       = input();

            //do we have an html template and a input container?
            if ( ! input.container ) {
                throw new Error( 'The input container is not set for WP text editor in module.' + input.module.id );
            }

            if ( ! input.czrRenderInputTextEditorTemplate() )
              return;

            input.editor       = tinyMCE( 'czr-customize-content_editor' );
            input.textarea     = $( '#czr-customize-content_editor' );
            input.editorPane   = $( '#czr-customize-content_editor-pane' );
            input.dragbar      = $( '#czr-customize-content_editor-dragbar' );
            input.editorFrame  = $( '#czr-customize-content_editor_ifr' );
            input.mceTools     = $( '#wp-czr-customize-content_editor-tools' );
            input.mceToolbar   = input.editorPane.find( '.mce-toolbar-grp' );
            input.mceStatusbar = input.editorPane.find( '.mce-statusbar' );

            input.preview      = $( '#customize-preview' );
            input.collapse     = $( '.collapse-sidebar' );

            input.textpreview  = input.container.find('textarea');
            input.toggleButton = input.container.find('button.text_editor-button');

            //status
            input.editorExpanded   = new api.Value( false );


            //initial filling of the textpreview and button text
            input.czrUpdateTextPreview();
            input.czrSetToggleButtonText( input.editorExpanded() );

            input.czrTextEditorBinding();

            input.czrResizeEditorOnUserRequest();
      },

      czrTextEditorBinding : function() {
              var input = this,
                  editor = input.editor,
                  textarea = input.textarea,
                  toggleButton = input.toggleButton,
                  editorExpanded = input.editorExpanded,
                  editorPane   = input.editorPane;


              input.bind( input.id + ':changed', input.czrUpdateTextPreview );

              _.bindAll( input, 'czrOnVisualEditorChange', 'czrOnTextEditorChange', 'czrResizeEditorOnWindowResize' );

              toggleButton.on( 'click', function() {
                    input.editorExpanded.set( ! input.editorExpanded() );
                    if ( input.editorExpanded() ) {
                      editor.focus();
                    }
              });

              //on this module section close close the editor and unbind this input
              input.module.czr_ModuleState.bind(
                function( state ) {
                  if ( 'expanded' != state )
                    input.editorExpanded.set( false );
              });

              input.editorExpanded.bind( function (expanded) {

                    api.consoleLog('in input.editorExpanded', expanded, input() );
                    /*
                    * Ensure only the latest input is bound
                    */
                    if ( editor.locker && editor.locker !== input ) {
                        editor.locker.editorExpanded.set(false);
                        editor.locker = null;
                    }if ( ! editor.locker || editor.locker === input ) {
                        $(document.body).toggleClass('czr-customize-content_editor-pane-open', expanded);
                        editor.locker = input;
                    }

                    //set toggle button text
                    input.czrSetToggleButtonText( expanded );

                    if ( expanded ) {
                        editor.setContent( wp.editor.autop( input() ) );
                        editor.on( 'input change keyup', input.czrOnVisualEditorChange );
                        textarea.on( 'input', input.czrOnTextEditorChange );
                        input.czrResizeEditor( window.innerHeight - editorPane.height() );
                        $( window ).on('resize', input.czrResizeEditorOnWindowResize );

                    } else {
                        editor.off( 'input change keyup', input.czrOnVisualEditorChange );
                        textarea.off( 'input', input.czrOnTextEditorChange );
                        $( window ).off('resize', input.czrResizeEditorOnWindowResize );

                        //resize reset
                        input.czrResizeReset();
                    }
              } );
      },

      czrOnVisualEditorChange : function() {
              var input = this,
                  editor = input.editor,
                  value;

              value = wp.editor.removep( editor.getContent() );
              input.set(value);
      },

      czrOnTextEditorChange : function() {
              var input = this,
                  textarea = input.textarea,
                  value;

              value = textarea.val();
              input.set(value);
      },
      czrUpdateTextPreview: function() {
              var input   = this,
                  input_model = input(),
                  value;

              //TODO: better stripping
              value = input_model.replace(/(<([^>]+)>)/ig,"");
              //max 30 chars
              if ( value.length > 30 )
                value = value.substring(0, 34) + '...';

              input.textpreview.val( value );
      },
      //////////////////////////////////////////////////
      /// HELPERS
      //////////////////////////////////////////////////
      czrRenderInputTextEditorTemplate: function() {
              var input  = this;

              //do we have view template script?
              if ( 0 === $( '#tmpl-czr-input-text_editor-view-content' ).length ) {
                  throw new Error('Missing js template for text editor input in module : ' + input.module.id );
              }

              var view_template = wp.template('czr-input-text_editor-view-content'),
                      $_view_el = input.container.find('input');

              //  //do we have an html template and a module container?
              if ( ! view_template  || ! input.container )
                return;

              api.consoleLog('Model injected in text editor tmpl : ', input() );

              $_view_el.after( view_template( input() ) );

              return true;
      },
      czrIsEditorExpanded : function() {
              return $( document.body ).hasClass('czr-customize-content_editor-pane-open');
      },
      czrResizeReset  : function() {
              var input = this,
                  preview = input.preview,
                  collapse = input.collapse,
                  sectionContent = input.container.closest('ul.accordion-section-content');

              sectionContent.css( 'padding-bottom', '' );
              preview.css( 'bottom', '' );
              collapse.css( 'bottom', '' );
      },
      czrResizeEditor : function( position ) {
              var windowHeight = window.innerHeight,
                  windowWidth = window.innerWidth,
                  minScroll = 40,
                  maxScroll = 1,
                  mobileWidth = 782,
                  collapseMinSpacing = 56,
                  collapseBottomOutsideEditor = 8,
                  collapseBottomInsideEditor = 4,
                  args = {},
                  input = this,
                  sectionContent = input.container.closest('ul.accordion-section-content'),
                  mceTools = input.mceTools,
                  mceToolbar = input.mceToolbar,
                  mceStatusbar = input.mceStatusbar,
                  preview      = input.preview,
                  collapse     = input.collapse,
                  editorPane   = input.editorPane,
                  editorFrame  = input.editorFrame;

              if ( ! input.editorExpanded() ) {
                return;
              }

              if ( ! _.isNaN( position ) ) {
                resizeHeight = windowHeight - position;
              }

              args.height = resizeHeight;
              args.components = mceTools.outerHeight() + mceToolbar.outerHeight() + mceStatusbar.outerHeight();

              if ( resizeHeight < minScroll ) {
                args.height = minScroll;
              }

              if ( resizeHeight > windowHeight - maxScroll ) {
                args.height = windowHeight - maxScroll;
              }

              if ( windowHeight < editorPane.outerHeight() ) {
                args.height = windowHeight;
              }

              preview.css( 'bottom', args.height );
              editorPane.css( 'height', args.height );
              editorFrame.css( 'height', args.height - args.components );
              collapse.css( 'bottom', args.height + collapseBottomOutsideEditor );

              if ( collapseMinSpacing > windowHeight - args.height ) {
                collapse.css( 'bottom', mceStatusbar.outerHeight() + collapseBottomInsideEditor );
              }

              if ( windowWidth <= mobileWidth ) {
                sectionContent.css( 'padding-bottom', args.height );
              } else {
                sectionContent.css( 'padding-bottom', '' );
              }
      },
      czrResizeEditorOnWindowResize : function() {
              var input = this,
                  resizeDelay = 50,
                  editorPane   = input.editorPane;

              if ( ! input.editorExpanded() ) {
                return;
              }

              _.delay( function() {
                input.czrResizeEditor( window.innerHeight - editorPane.height() );
              }, resizeDelay );

      },
      czrResizeEditorOnUserRequest : function() {
              var input = this,
                  dragbar = input.dragbar,
                  editorFrame = input.editorFrame;

              dragbar.on( 'mousedown', function() {
                if ( ! input.editorExpanded() )
                  return;

                $( document ).on( 'mousemove.czr-customize-content_editor', function( event ) {
                    event.preventDefault();
                    $( document.body ).addClass( 'czr-customize-content_editor-pane-resize' );
                    editorFrame.css( 'pointer-events', 'none' );
                    input.czrResizeEditor( event.pageY );
                  } );
                } );

              dragbar.on( 'mouseup', function() {
                if ( ! input.editorExpanded() )
                  return;

                $( document ).off( 'mousemove.czr-customize-content_editor' );
                $( document.body ).removeClass( 'czr-customize-content_editor-pane-resize' );
                editorFrame.css( 'pointer-events', '' );
              } );

      },
      czrSetToggleButtonText : function( $_expanded ) {
              var input = this;

              input.toggleButton.text( serverControlParams.i18n.mods.textEditor[ ! $_expanded ? 'Edit' : 'Close Editor' ] );
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
                        actions   : function() {
                              var _isVisible = this.removeDialogVisible();
                              this.module.closeRemoveDialogs();
                              this.removeDialogVisible( ! _isVisible );
                        }
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
                              //toggleTabVisibility is defined in the module ctor and its this is the item or the modOpt
                              this.module.toggleTabVisibility.call( this, args );
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
                  });

                  //SCHEDULE INPUTS DESTROY
                  item.bind( 'contentRemoved', function() {
                        if ( _.has( item, 'czr_Input' ) )
                          api.CZR_Helpers.removeInputCollection.call( item );
                  });

                  //When shall we render the item ?
                  //If the module is part of a simple control, the item can be render now,
                  //If the module is part of a sektion, then the item will be rendered on module edit.
                  // if ( ! item.module.isInSektion() ) {
                  //       item.mayBeRenderItemWrapper();
                  // }
                  item.mayBeRenderItemWrapper();

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


      // @return validated model object
      // To be overriden in each module
      validateItemModelOnInitialize : function( item_model_candidate ) {
            return item_model_candidate;
      },

      //React to a single item change
      //cb of module.czr_Item( item.id ).callbacks
      //the data can typically hold informations passed by the input that has been changed and its specific preview transport (can be PostMessage )
      //data looks like :
      //{
      //  module : {}
      //  input_changed     : string input.id
      //  input_transport   : 'postMessage' or '',
      //  not_preview_sent  : bool
      //}
      itemReact : function( to, from, data ) {
            var item = this,
                module = item.module;

            data = data || {};

            //update the collection
            module.updateItemsCollection( { item : to, data : data } ).done( function() {
                  //Always update the view title when the item collection has been updated
                  item.writeItemViewTitle( to, data );
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

      //fired on click dom event
      //for dynamic multi input modules
      removeItem : function() {
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
            //remove the item from the collection
            module.czr_Item.remove( item.id );
            module.trigger( 'item-removed', _item_ );
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
      //fired when user edit module for items in modules embedded in a sektion
      mayBeRenderItemWrapper : function() {
            var item = this;

            if ( 'pending' != item.embedded.state() )
              return;

            $.when( item.renderItemWrapper() ).done( function( $_container ) {
                  item.container = $_container;
                  if ( _.isUndefined(item.container) || ! item.container.length ) {
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
      renderItemWrapper : function( item_model ) {
            //=> an array of objects
            var item = this,
                module = item.module;

            item_model = item_model || item();

            //render the item wrapper
            $_view_el = $('<li>', { class : module.control.css_attr.single_item, 'data-id' : item_model.id,  id : item_model.id } );

            //append the item view to the first module view wrapper
            //!!note : => there could be additional sub view wrapper inside !!
            //$( '.' + module.control.css_attr.items_wrapper , module.container).first().append( $_view_el );
            // module.itemsWrapper has been stored as a $ var in module initialize() when the tmpl has been embedded
            module.itemsWrapper.append( $_view_el );

            //if module is multi item, then render the item crud header part
            //Note : for the widget module, the getTemplateEl method is overridden
            if ( module.isMultiItem() ) {
                  var _template_selector = module.getTemplateEl( 'rudItemPart', item_model );
                  //do we have view template script?
                  if ( 0 === $( '#tmpl-' + _template_selector ).length ) {
                      throw new Error('Missing template for item ' + item.id + '. The provided template script has no been found : #tmpl-' + module.getTemplateEl( 'rudItemPart', item_model ) );
                  }
                  $_view_el.append( $( wp.template( _template_selector )( item_model ) ) );
            }


            //then, append the item content wrapper
            $_view_el.append( $( '<div/>', { class: module.control.css_attr.item_content } ) );

            return $_view_el;
      },

      // fired when item is ready and embedded
      // define the item view DOM event map
      // bind actions when the item is embedded
      itemWrapperViewSetup : function( item_model ) {
            var item = this,
                module = this.module;

            item_model = item() || item.initial_item_model;//could not be set yet

            //always write the title
            item.writeItemViewTitle();


            //When do we render the item content ?
            //If this is a multi-item module, let's render each item content when they are expanded.
            //In the case of a single item module, we can render the item content now.
            var _updateItemContentDeferred = function( $_content, to, from ) {
                  //update the $.Deferred state
                  if ( ! _.isUndefined( $_content ) && false !== $_content.length ) {
                      item.trigger( 'contentRendered' );
                      item.contentContainer = $_content;
                      item.toggleItemExpansion( to, from );
                  }
                  else {
                      throw new Error( 'Module : ' + item.module.id + ', the item content has not been rendered for ' + item.id );
                  }
            };

            if ( item.module.isMultiItem() ) {
                  item.viewState.callbacks.add( function( to, from ) {
                        //viewState can take 3 states : expanded, expanded_noscroll, closed
                        var _isExpanded = -1 !== to.indexOf( 'expanded' );

                        //If this module has mod Opt, always close the opt pane on view state change
                        if ( module.hasModOpt() && _isExpanded ) {
                              api.czr_ModOptVisible( false );
                        }

                        if ( _isExpanded ) {
                              //item already rendered ?
                              if ( _.isObject( item.contentContainer ) && false !== item.contentContainer.length ) {
                                    //toggle on view state change
                                    item.toggleItemExpansion(to, from );
                              } else {
                                    $.when( item.renderItemContent( item() || item.initial_item_model ) ).done( function( $_item_content ) {
                                          //introduce a small delay to give some times to the modules to be printed.
                                          //@todo : needed ?
                                          _updateItemContentDeferred = _.debounce(_updateItemContentDeferred, 50 );
                                          _updateItemContentDeferred( $_item_content, to, from );
                                    });
                              }
                        } else {
                              //toggle on view state change
                              item.toggleItemExpansion( to, from ).done( function() {
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
            } else {
                  //react to the item state changes
                  item.viewState.callbacks.add( function( to, from ) {
                        //toggle on view state change
                        item.toggleItemExpansion.apply(item, arguments );
                  });

                  //renderview content now for a single item module
                  $.when( item.renderItemContent( item_model ) ).done( function( $_item_content ) {
                        _updateItemContentDeferred( $_item_content, true );
                        //item.viewState.set('expanded');
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
                        api.czr_ModOptVisible( false );
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
                        //do we have an html template and a control container?
                        if ( ! wp.template( module.AlertPart )  || ! item.container ) {
                              api.consoleLog( 'No removal alert template available for items in module :' + module.id );
                              return;
                        }

                        $_alert_el.html( wp.template( module.AlertPart )( { title : ( item().title || item.id ) } ) );
                        item.trigger( 'remove-dialog-rendered');
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
                  if ( visible )
                    $_alert_el.stop( true, true ).slideDown( 200, function() { _slideComplete( visible ); } );
                  else
                    $_alert_el.stop( true, true ).slideUp( 200, function() { _slideComplete( visible ); } );
            });//item.removeDialogVisible.bind()
      },//itemWrapperViewSetup



      //renders saved items views and attach event handlers
      //the saved item look like :
      //array[ { id : 'sidebar-one', title : 'A Title One' }, {id : 'sidebar-two', title : 'A Title Two' }]
      renderItemContent : function( item_model ) {
            //=> an array of objects
            var item = this,
                module = this.module;

            item_model = item_model || item();

            //do we have view content template script?
            if ( 0 === $( '#tmpl-' + module.getTemplateEl( 'itemInputList', item_model ) ).length ) {
                throw new Error('No item content template defined for module ' + module.id + '. The template script id should be : #tmpl-' + module.getTemplateEl( 'itemInputList', item_model ) );
            }

            var  item_content_template = wp.template( module.getTemplateEl( 'itemInputList', item_model ) );

            //do we have an html template ?
            if ( ! item_content_template )
              return this;

            //the view content
            $( item_content_template( item_model )).appendTo( $('.' + module.control.css_attr.item_content, item.container ) );

            return $( $( item_content_template( item_model )), item.container );
      },





      //fired in setupItemListeners
      writeItemViewTitle : function( item_model ) {
            var item = this,
                module = item.module,
                _model = item_model || item(),
                _title = _.has( _model, 'title')? api.CZR_Helpers.capitalize( _model.title ) : _model.id;

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


      //callback of item.viewState.callbacks
      //viewState can take 3 states : expanded, expanded_noscroll, closed
      toggleItemExpansion : function( status, from, duration ) {
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

            if ( visible )
              $el.stop( true, true ).slideDown( duration || 200, function() { _slideComplete( visible ); } );
            else
              $el.stop( true, true ).slideUp( 200, function() { _slideComplete( visible ); } );

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
      }
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
                  if ( visible ) {
                        //first close all opened remove dialogs and opened items
                        modOpt.module.closeRemoveDialogs().closeAllItems();

                        modOpt.modOptWrapperViewSetup( _initial_model ).done( function( $_container ) {
                              modOpt.container = $_container;
                              try {
                                    api.CZR_Helpers.setupInputCollectionFromDOM.call( modOpt ).toggleModPanelView( visible );
                              } catch(e) {
                                    api.consoleLog(e);
                              }
                              if ( args.module && args.focus ) {
                                    _.delay( function() {
                                          if ( _.isNull(  args.module.czr_ModOpt.container ) || ! args.module.czr_ModOpt.container.find('[data-tab-id="' + args.focus + '"] a').length )
                                            return;
                                          args.module.czr_ModOpt.container.find('[data-tab-id="' + args.focus + '"] a').trigger('click');
                                    }, 200 );
                              }
                        });

                  } else {
                        modOpt.toggleModPanelView( visible ).done( function() {
                              if ( false !== modOpt.container.length ) {
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
                                          api.czr_ModOptVisible( ! api.czr_ModOptVisible() );
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
                                                api.czr_ModOptVisible( false );
                                          }
                                    },
                                    //tabs navigation
                                    {
                                          trigger   : 'click keydown',
                                          selector  : '.tabs nav li',
                                          name      : 'tab_nav',
                                          actions   : function( args ) {
                                                //toggleTabVisibility is defined in the module ctor and its this is the item or the modOpt
                                                this.module.toggleTabVisibility.call( this, args );
                                          }
                                    }
                              ],//actions to execute
                              { dom_el: $_container },//model + dom scope
                              modOpt //instance where to look for the cb methods
                        );
                  };

              modOpt_model = modOpt() || modOpt.initial_modOpt_model;//could not be set yet

              //renderview content now
              $.when( modOpt.renderModOptContent( modOpt_model ) )
                    .done( function( $_container ) {
                          //update the $.Deferred state
                          if ( ! _.isUndefined( $_container ) && false !== $_container.length ) {
                                _setupDOMListeners( $_container );
                                dfd.resolve( $_container );
                          }
                          else {
                                throw new Error( 'Module : ' + modOpt.module.id + ', the modOpt content has not been rendered' );
                          }
                    })
                    .then( function() {
                          //the modOpt.container is now available
                          //Setup the tabs navigation
                          //setupTabNav is defined in the module ctor and its this is the item or the modOpt
                          modOpt.module.setupTabNav.call( modOpt );
                    });

              return dfd.promise();
      },


      //renders saved modOpt views and attach event handlers
      //the saved modOpt look like :
      //array[ { id : 'sidebar-one', title : 'A Title One' }, {id : 'sidebar-two', title : 'A Title Two' }]
      renderModOptContent : function( modOpt_model ) {
              //=> an array of objects
              var modOpt = this,
                  module = this.module;

              modOpt_model = modOpt_model || modOpt();

              //do we have view content template script?
              if ( 0 === $( '#tmpl-' + module.getTemplateEl( 'modOptInputList', modOpt_model ) ).length ) {
                    api.errorLog('renderModOptContent : No modOpt content template defined for module ' + module.id + '. The template script id should be : #tmpl-' + module.getTemplateEl( 'modOptInputList', modOpt_model ) );
                    return;
              }
              var  modOpt_content_template = wp.template( module.getTemplateEl( 'modOptInputList', modOpt_model ) );

              //do we have an html template ?
              if ( ! modOpt_content_template )
                return this;

              var _ctrlLabel = '';
              try {
                    _ctrlLabel = [ serverControlParams.i18n['Options for'], module.control.params.label ].join(' ');
              } catch( er ) {
                    api.errorLog( 'In renderModOptContent : ' + er );
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
              $( '.' + module.control.css_attr.mod_opt_wrapper ).append( $( modOpt_content_template( modOpt_model ) ) );

              return $( '.' + module.control.css_attr.mod_opt_wrapper );
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
  // is_added_by_user : is_added_by_user || false
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

            //write the options as properties
            $.extend( module, constructorOptions || {} );

            //extend the module with new template Selectors
            $.extend( module, {
                  crudModulePart : 'czr-crud-module-part',//create, read, update, delete
                  rudItemPart : 'czr-rud-item-part',//read, update, delete
                  ruItemPart : 'czr-ru-item-part',//read, update
                  itemInputList : '',//is specific for each crud module
                  modOptInputList : '',//is specific for each module
                  AlertPart : 'czr-rud-item-alert-part',//used both for items and modules removal

            } );

            //embed : define a container, store the embed state, fire the render method
            module.embedded = $.Deferred();
            module.itemsWrapper = '';//will store the $ item container

            //if a module is embedded in a control, its container == the control container.
            //if the module is part of a sektion, its container will be set and resolve() later ( @see multi_module part )
            if ( ! module.isInSektion() ) {
                  module.container = $( module.control.selector );
                  module.embedded.resolve();
            }

            //render the item(s) wrapper
            module.embedded.done( function() {
                  $.when( module.renderModuleParts() ).done(function( $_module_items_wrapper ){
                        if ( false === $_module_items_wrapper.length ) {
                            throw new Error( 'The items wrapper has not been rendered for module : ' + module.id );
                        }
                        //stores the items wrapper ( </ul> el ) as a jQuery var
                        module.itemsWrapper = $_module_items_wrapper;
                  });
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
            module.modOptConstructor = api.CZRModOpt;

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

            //declares a default item model
            module.defaultItemModel = { id : '', title : '' };

            //define a default Constructors
            module.itemConstructor = api.CZRItem;
            //czr_model stores the each model value => one value by created by model.id
            module.czr_Item = new api.Values();


            /*-----------------------------------------------
            * SET THE DEFAULT INPUT CONSTRUCTOR AND INPUT OPTIONS
            ------------------------------------------------*/
            module.inputConstructor = api.CZRInput;//constructor for the items input
            if ( module.hasModOpt() ) {
                  module.inputModOptConstructor = api.CZRInput;//constructor for the modOpt input
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
                  module.initializeModuleModel( constructorOptions )
                        .done( function( initialModuleValue ) {
                              module.set( initialModuleValue );
                        })
                        .fail( function( response ){ api.consoleLog( 'Module : ' + module.id + ' initialize module model failed : ', response ); })
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

                                    //it can be overridden by a module in its initialize method
                                    if ( module.isMultiItem() ) {
                                          module._makeItemsSortable();
                                    }
                              });

                              //populate and instantiate the items now when a module is embedded in a regular control
                              //if in a sektion, the populateSavedItemCollection() will be fired on module edit
                              if ( ! module.isInSektion() )
                                module.populateSavedItemCollection();

                              //When the module has modOpt :
                              //=> Instantiate the modOpt and setup listener
                              if ( module.hasModOpt() ) {
                                  module.instantiateModOpt();
                              }
                        });
            });//module.isReady.done()
      },




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


      //cb of module.callbacks
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

      //@return bool
      isInSektion : function() {
            var module = this;
            return _.has( module, 'sektion_id' );
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
      populateSavedItemCollection : function() {
              var module = this, _saved_items = [];
              if ( ! _.isArray( module().items ) ) {
                    api.errorLog( 'populateSavedItemCollection : The saved items collection must be an array in module :' + module.id );
                    return;
              }

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

              //FILTER THE ACTUAL ITEMS ( REMOVE THE MODOPTS ELEMENT IF ANY )
              //=> the items and the modOpt should already be split at this stage, because it's done before module instantiation... this check is totally paranoid.
              _.each( module().items, function( item_candidate , key ) {
                    if ( _.has( item_candidate, 'id') && ! _.has( item_candidate, 'is_mod_opt' ) ) {
                          _saved_items.push( item_candidate );
                    }
              });

              //INSTANTIATE THE ITEMS
              _.each( _saved_items, function( item_candidate , key ) {
                    //adds it to the collection and fire item.ready()
                    try { module.instantiateItem( item_candidate ).ready(); } catch( er ) {
                          api.errorLog( 'populateSavedItemCollection : ' + er );
                    }
              });

              //check if everything went well
              _.each( _saved_items, function( _item ) {
                    if ( _.isUndefined( _.findWhere( module.itemCollection(), _item.id ) ) ) {
                          throw new Error( 'populateSavedItemCollection : The saved items have not been properly populated in module : ' + module.id );
                    }
              });

              module.trigger( 'items-collection-populated' );
              //do we need to chain this method ?
              //return this;
      },


      instantiateItem : function( item, is_added_by_user ) {
              var module = this;
              //Prepare the item, make sure its id is set and unique
              item_candidate = module.prepareItemForAPI( item );

              // Display a simple console message if item is null or false, for example if validateItemBeforeInstantiation returned null or false
              if ( ! item_candidate || _.isNull( item_candidate ) ) {
                    api.consoleLog( 'item_candidate invalid. InstantiateItem aborted in module ' + module.id );
                    return;
              }

              //Item id checks !
              if ( ! _.has( item_candidate, 'id' ) ) {
                throw new Error('CZRModule::instantiateItem() : an item has no id and could not be added in the collection of : ' + this.id );
              }
              if ( module.czr_Item.has( item_candidate.id ) ) {
                  throw new Error('CZRModule::instantiateItem() : the following item id ' + item_candidate.id + ' already exists in module.czr_Item() for module ' + this.id  );
              }
              //instanciate the item with the default constructor
              module.czr_Item.add( item_candidate.id, new module.itemConstructor( item_candidate.id, item_candidate ) );

              if ( ! module.czr_Item.has( item_candidate.id ) ) {
                  throw new Error('CZRModule::instantiateItem() : instantiation failed for item id ' + item_candidate.id + ' for module ' + this.id  );
              }
              //the item is now ready and will listen to changes
              //return the instance
              return module.czr_Item( item_candidate.id );
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
      //  data : data {}
      //},
      //
      //or {
      //  item : {}
      //  data : data {}
      //}
      //if a collection is provided in the passed args then simply refresh the collection
      //=> typically used when reordering the collection item with sortable or when a item is removed
      //
      //the args.data can typically hold informations passed by the input that has been changed and its specific preview transport (can be PostMessage )
      //data looks like :
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
              //normalizes with data
              args = _.extend( { data : {} }, args );

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
              module.itemCollection.set( _new_collection, args.data );
              return dfd.resolve( { collection : _new_collection, data : args.data } ).promise();
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
                  $.when( module.czr_Item( _itm.id ).container.remove() ).done( function() {
                        //Remove item instances
                        module.czr_Item.remove( _itm.id );
                  });
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
      //the module.container is set. Either as the control.container or the single module wrapper in a sektion
      renderModuleParts : function() {
              var module = this,
                  $_moduleContentEl = module.isInSektion() ? $( module.container ).find('.czr-mod-content') : $( module.container );

              //Crud modules => then let's add the crud module part tmpl
              if ( module.isCrud() ) {
                    //do we have view template script?
                    if ( 0 === $( '#tmpl-' + module.crudModulePart ).length ) {
                      throw new Error('No crud Module Part template for module ' + module.id + '. The template script id should be : #tmpl-' + module.crudModulePart );
                    }

                    //append the module wrapper to the column
                    $_moduleContentEl.append( $( wp.template( module.crudModulePart )( {} ) ) );
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

              $_moduleContentEl.append($_module_items_wrapper);

              return $( $_module_items_wrapper, $_moduleContentEl );
      },

      //called before rendering a view. Fired in module::renderItemWrapper()
      //can be overridden to set a specific view template depending on the model properties
      //@return string
      //@type can be
      //Read Update Delete (rud...)
      //Read Update (ru)
      //...
      //@item_model is an object describing the current item model
      getTemplateEl : function( type, item_model ) {
              var module = this, _el;
              switch(type) {
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
                      _el = module.itemInputList;
                      break;
              }
              if ( _.isEmpty(_el) ) {
                   throw new Error('No valid template has been found in getTemplateEl() ' + module.id + '. Aborting');
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


      //fired when module.isReady.done
      _makeItemsSortable : function(obj) {
              if ( wp.media.isTouchDevice || ! $.fn.sortable )
                return;
              var module = this;
              $( '.' + module.control.css_attr.items_wrapper, module.container ).sortable( {
                    handle: '.' + module.control.css_attr.item_sort_handle,
                    start: function() {
                          //close the module panel if needed
                          if ( _.has(api, 'czrModulePanelState' ) )
                            api.czrModulePanelState.set(false);
                          //close the sektion settings panel if needed
                          if ( _.has(api, 'czrSekSettingsPanelState' ) )
                            api.czrSekSettingsPanelState.set(false);
                    },
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
      //the @args is the classical DOM listener obj {model : model, dom_el : $_view_el, event : _event, dom_event : e ,refreshed : _refreshed }
      // IMPORTANT : the this is the item or the modopt instance. NOT the module.
      // =>This method has been added to the module constructor to avoid repeating the code in two places because it is used both in items and modOpts
      // @return void()
      toggleTabVisibility : function( args ) {
            var inputParent = this,
                tabs = $( inputParent.container ).find('li'),
                content_items = $( inputParent.container ).find('section'),
                tabIdSwitchedTo = $( args.dom_event.currentTarget, args.dom_el ).attr('data-tab-id');

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
                              $('.tabs', inputParent.container ).fadeIn( 450 );
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
            ////////////////////////////////////////////////////
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
                              function(obj) {
                                    var module = this;
                                    module.preItemExpanded.set( ! module.preItemExpanded() );
                              },
                        ],
                  },
                  //add new item
                  {
                        trigger   : 'click keydown',
                        selector  : '.' + module.control.css_attr.add_new_btn, //'.czr-add-new',
                        name      : 'add_item',
                        actions   : [ 'closeRemoveDialogs', 'closeAllItems', 'addItem' ],
                  }
            ]);//module.userEventMap
      },



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
                        var _id = $(this).find('[data-type]').attr('data-type') || 'sub_set_' + _index;
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


      // Designed to be overriden in modules
      validateItemBeforeAddition : function( item_candidate ) {
            return item_candidate;
      },


      //Fired on user Dom action.
      //the item is manually added.
      //@return a promise() for future sequential actions
      addItem : function(obj) {
            var module = this,
                item_candidate = module.preItem(),
                collapsePreItem = function() {
                      module.preItemExpanded.set( false );
                      //module.toggleSuccessMessage('off');
                },
                dfd = $.Deferred();

            if ( _.isEmpty(item_candidate) || ! _.isObject(item_candidate) ) {
                  api.errorLog( 'addItem : an item_candidate should be an object and not empty. In : ' + module.id +'. Aborted.' );
                  return dfd.resolve().promise();
            }
            //display a sucess message if item_candidate is successfully instantiated
            collapsePreItem = _.debounce( collapsePreItem, 200 );

            //allow modules to validate the item_candidate before addition
            item_candidate = module.validateItemBeforeAddition( item_candidate );

            // Abort here and display a simple console message if item is null or false, for example if validateItemBeforeAddition returned null or false
            if ( ! item_candidate || _.isNull( item_candidate ) ) {
                  api.consoleLog( 'item_candidate invalid. InstantiateItem aborted in module ' + module.id );
                  return;
            }


            //instantiates and fires ready
            module.instantiateItem( item_candidate, true ).ready(); //true == Added by user

            //this iife job is to close the pre item and to maybe refresh the preview
            //@return a promise(), then once done the item view is expanded to start editing it
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
                        //module.doActions( 'item_added_by_user' , module.container, { item : item_candidate , dom_event : obj.dom_event } );

                        //refresh the preview frame (only needed if transport is postMessage && has no partial refresh set )
                        //must be a dom event not triggered
                        //otherwise we are in the init collection case where the items are fetched and added from the setting in initialize
                        if ( 'postMessage' == api(module.control.id).transport && _.has( obj, 'dom_event') && ! _.has( obj.dom_event, 'isTrigger' ) && ! api.CZR_Helpers.hasPartRefresh( module.control.id ) ) {
                              // api.previewer.refresh().done( function() {
                              //       _dfd_.resolve();
                              // });
                              // It would be better to wait for the refresh promise
                              api.previewer.bind( 'ready', resolveWhenPreviewerReady );
                              api.previewer.refresh();
                        } else {
                              _dfd_.resolve();
                        }
                  });
            }).done( function() {
                    module.czr_Item( item_candidate.id ).viewState( 'expanded' );
            }).always( function() {
                    dfd.resolve();
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
              var module = this, dfd = $.Deferred();
              //is this view already rendered ?
              if ( _.isObject( module.preItemsWrapper ) && 0 < module.preItemsWrapper.length ) //was ! _.isEmpty( module.czr_preItem('item_content')() ) )
                return dfd.resolve( module.preItemsWrapper ).promise();

              //do we have view template script?
              if ( ! _.has(module, 'itemPreAddEl') ||  0 === $( '#tmpl-' + module.itemPreAddEl ).length )
                return dfd.reject( 'Missing itemPreAddEl or template ').promise();

              //print the html
              var pre_add_template = wp.template( module.itemPreAddEl );

              //do we have an html template and a module container?
              if ( ! pre_add_template  || ! module.container )
                return dfd.reject( 'Missing html template ').promise();

              var $_pre_add_el = $('.' + module.control.css_attr.pre_add_item_content, module.container );

              $_pre_add_el.prepend( $('<div>', { class : 'pre-item-wrapper'} ) );
              $_pre_add_el.find('.pre-item-wrapper').append( pre_add_template() );

              //say it
              return dfd.resolve( $_pre_add_el.find('.pre-item-wrapper') ).promise();
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

              control.czr_Module = new api.Values();

              //czr_collection stores the module collection
              control.czr_moduleCollection = new api.Value();
              control.czr_moduleCollection.set([]);

              //let's store the state of the initial module collection
              control.moduleCollectionReady = $.Deferred();
              //and listen to changes when it's ready
              control.moduleCollectionReady.done( function( obj ) {
                    if ( ! control.isMultiModuleControl( options ) ) {
                      //api.consoleLog('MODULE COLLECTION READY IN CONTROL : ', control.id , obj.id, control.isModuleRegistered( obj.id ) );
                    }
                    //if the module is not registered yet for a single module control
                    //=> push it to the collection now, before listening to the module collection changes
                    // if (  ! control.isModuleRegistered( module.id ) ) {
                    //     control.updateModulesCollection( { module : constructorOptions } );
                    // }

                    //LISTEN TO MODULE COLLECTION
                    control.czr_moduleCollection.callbacks.add( function() { return control.moduleCollectionReact.apply( control, arguments ); } );

                    //control.removeModule( _mod );
              } );

              //FOR MULTI MODULE CONTROL : Stores the module instance of the synchronized sektion
              if ( control.isMultiModuleControl( options ) ) {
                    control.syncSektionModule = new api.Value();
              }

              api.CZRBaseControl.prototype.initialize.call( control, id, options );

              //FOR TEST PURPOSES
              // api(this.id).bind( function( to, from) {
              //     api.consoleLog( 'SETTING ', control.id, ' HAS CHANGED : ', to, from );
              // });

              //close any open item and dialog boxes on section expansion
              api.section( control.section() ).expanded.bind(function(to) {
                    control.czr_Module.each( function( _mod ){
                          _mod.closeAllItems().closeRemoveDialogs();
                          if ( _.has( _mod, 'preItem' ) ) {
                                _mod.preItemExpanded(false);
                          }
                    });
              });

      },




      //////////////////////////////////
      ///READY = CONTROL INSTANTIATED AND DOM ELEMENT EMBEDDED ON THE PAGE
      ///FIRED BEFORE API READY
      //////////////////////////////////
      ready : function() {
              var control = this;
              if ( control.isMultiModuleControl() ) {
                    //POPULATE THE SAVED MODULE COLLECTION WHEN THE SYNCHRONIZED SEKTIONS SETTING HAS PROVIDED ITS INSTANCE
                    control.syncSektionModule.bind( function( sektion_module_instance, from) {
                          if ( 'resolved' == control.moduleCollectionReady.state() )
                            return;
                          control.registerModulesOnInit( sektion_module_instance );
                          //the module collection is ready
                          control.moduleCollectionReady.resolve();
                    });
              } else {
                    var single_module = {};
                    //inits the collection with the saved module => there's only one module to instantiate in this case.
                    //populates the collection with the saved module
                    _.each( control.getSavedModules() , function( _mod, _key ) {
                          //stores it
                          single_module = _mod;

                          //adds it to the collection
                          //=> it will be fired ready usually when the control section is expanded
                          try { control.instantiateModule( _mod, {} ); } catch( er ) {
                                api.errorLog( 'Failed to instantiate module ' + _mod.id + ' ' + er );
                                return;
                          }

                          //adds the module name to the control container element
                          control.container.attr('data-module', _mod.id );
                    });
                    //the module collection is ready
                    control.moduleCollectionReady.resolve( single_module );
              }


              //LISTEN TO MODULE CANDIDATES ADDED BY USERS
              control.bind( 'user-module-candidate', function( _module ) {
                    var module;
                    //instanciate + fire ready()
                    //=> the module will be added in the collection on isReady.done()
                    try {
                          module = control.instantiateModule( _module, {} ); //module, constructor
                    } catch( er ) {
                          api.errorLog( 'Failed to instantiate module ' + _module.id + ' ' + er );
                          return;
                    }
                    //If everything went fine, fires ready
                    module.ready( _module.is_added_by_user );
              });
      },









      //////////////////////////////////
      /// VARIOUS HELPERS
      //////////////////////////////////
      ///
      //@return the default API model {} needed to instantiate a module
      //Depending on the module context, control or sektion, the default model has to hold different properties
      getDefaultModuleApiModel : function() {
              //Modules share the common model either they are in a sektion or in a control
              var commonAPIModel = {
                    id : '',//module.id,
                    module_type : '',//module.module_type,
                    modOpt : {},//the module modOpt property, typically high level properties that area applied to all items of the module
                    items   : [],//$.extend( true, {}, module.items ),
                    crud : false,
                    multi_item : false,
                    sortable : false,//<= a module can be multi-item but not necessarily sortable
                    control : {},//control,
              };

              //if embedded in a control, amend the common model with the section id
              if ( ! this.isMultiModuleControl() ) {
                  return $.extend( commonAPIModel, {
                      section : ''//id of the control section
                  } );
              } else {
                  return $.extend( commonAPIModel, {
                      column_id : '',//a string like col_7
                      sektion : {},// => the sektion instance
                      sektion_id : '',
                      is_added_by_user : false,
                      dirty : false
                  } );
              }
      },

      //@return the default DB model {} that will be used when the setting will send the ajax save request
      //Depending on the module context, control or sektion, the default DB model has to hold different properties
      getDefaultModuleDBModel : function() {
              var commonDBModel = {
                    items   : [],//$.extend( true, {}, module.items ),
              };

              //if embedded in a sektion, we need more the item(s) collection
              if ( this.isMultiModuleControl() ) {
                  return $.extend( commonDBModel, {
                      id : '',
                      module_type : '',
                      column_id : '',
                      sektion_id : '',
                      dirty : false
                  } );
              } else {
                  return commonDBModel;
              }
      },


      //@return bool
      //@param options is optional.
      //Passed when first invoked in the constructor.
      //Once the control is instantiated, we can access the options from the instance
      isMultiModuleControl : function( options ) {
              var _type, control = this;
              //since WP v4.9, the control options are not wrapper in the params property but passed directly instead.
              if ( _.isUndefined( options ) ){
                  _type = _.has( control, 'params') ? control.params.type : control.type;
              } else {
                  _type = _.has( options, 'params') ? options.params.type : options.type;
              }
              return 'czr_multi_module' == _type;
      },


      //@return the control instance of the synchronized collection of modules
      getSyncCollectionControl : function() {
            var control = this;
            if ( _.isUndefined( control.params.syncCollection ) ) {
                throw new Error( 'Control ' + control.id + ' has no synchronized sektion control defined.');
            }
            return api.control( api.CZR_Helpers.build_setId( control.params.syncCollection ) );
      },


      //@return the collection [] of saved module(s) to instantiate
      //This method does not make sure that the module model is ready for API.
      //=> it just returns an array of saved module candidates to instantiate.
      //
      //Before instantiation, we will make sure that all required property are defined for the modules with the method control.prepareModuleForAPI()
      // control     : control,
      // crud        : bool
      // id          : '',
      // items       : [], module.items,
      // modOpt       : {}
      // module_type : module.module_type,
      // multi_item  : bool
      // section     : module.section,
      // is_added_by_user : is_added_by_user || false
      getSavedModules : function() {
              var control = this,
                  _savedModulesCandidates = [],
                  _module_type = control.params.module_type,
                  _raw_saved_module_val = [],
                  _saved_items = [],
                  _saved_modOpt = {};

              //In the case of multi module control synchronized with a sektion
              // => the saved modules is a collection saved in the setting
              //For a module embedded in a regular control, we need to hard code the single module collection
              // => in this case, the corresponding setting will store the collection of item(s)
              if ( control.isMultiModuleControl() ) {
                  _savedModulesCandidates = $.extend( true, [], api( control.id )() );//deep clone
              } else {
                  //What is the current server saved value for this setting?
                  //in a normal case, it should be an array of saved properties
                  //But it might not be if coming from a previous option system.
                  //=> let's normalize it.
                  //First let's perform a quick check on the current saved db val.
                  //If the module is not multi-item, the saved value should be an object or empty if not set yet
                  if ( api.CZR_Helpers.isMultiItemModule( _module_type ) && ! _.isEmpty( api( control.id )() ) && ! _.isObject( api( control.id )() ) ) {
                      api.consoleLog('Module Control Init for ' + control.id + '  : a mono item module control value should be an object if not empty.');
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

                  //POPULATE THE ITEMS [] and the MODOPT {} FROM THE RAW DB SAVED SETTING VAL
                  _raw_saved_module_val = _.isArray( api( control.id )() ) ? api( control.id )() : [ api( control.id )() ];

                  _.each( _raw_saved_module_val, function( item_or_mod_opt_candidate , key ) {
                        if ( api.CZR_Helpers.hasModuleModOpt( _module_type ) && 0*0 === key ) {
                              // a saved module mod_opt object should not have an id
                              if ( _.has( item_or_mod_opt_candidate, 'id') ) {
                                    api.consoleLog( 'getSavedModules : the module ' + _module_type + ' in control ' + control.id + ' has no mod_opt defined while it should.' );
                              } else {
                                    _saved_modOpt = item_or_mod_opt_candidate;
                              }
                        }
                        if ( _.has( item_or_mod_opt_candidate, 'id') && ! _.has( item_or_mod_opt_candidate, 'is_mod_opt' ) ) {
                              _saved_items.push( item_or_mod_opt_candidate );
                        }
                  });


                  //for now this is a collection with one module
                  _savedModulesCandidates.push(
                        {
                              id : api.CZR_Helpers.getOptionName( control.id ) + '_' + control.params.type,
                              module_type : control.params.module_type,
                              section : control.section(),
                              modOpt : $.extend( true, {} , _saved_modOpt ),//disconnect with a deep cloning
                              items : $.extend( true, [] , _saved_items )//disconnect with a deep cloning
                        }
                  );
              }
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

              //in the general case of multi_module / sektion control, we need to extend the module constructors
              if ( ! _.isEmpty( module.sektion_id ) ) {
                  parentConstructor = _base_constructor.extend( _mthds );
                  constructor = parentConstructor.extend( control.getMultiModuleExtender( parentConstructor ) );
              } else {
                //in the particular case of a module embedded in a control, the constructor is ready to be fired.
                  constructor = _base_constructor.extend( _mthds );
              }

              if ( _.isUndefined(constructor) || _.isEmpty(constructor) || ! constructor ) {
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

            _.each( control.getDefaultModuleApiModel() , function( _value, _key ) {
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
                              } else if ( ! _.isUndefined( _candidate_val) && ! _.isBoolean( _candidate_val )  ) {
                                    throw new Error('prepareModuleForAPI : the module param "crud" must be a boolean');
                              }
                              api_ready_module[_key] = _candidate_val || false;
                        break;
                        case 'multi_item' :
                              //get the value from the czrModuleMap
                              if ( _.has( api.czrModuleMap, module_candidate.module_type ) ) {
                                    _candidate_val = api.czrModuleMap[ module_candidate.module_type ].crud || api.czrModuleMap[ module_candidate.module_type ].multi_item;
                              } else if ( ! _.isUndefined( _candidate_val) && ! _.isBoolean( _candidate_val )  ) {
                                    throw new Error('prepareModuleForAPI : the module param "multi_item" must be a boolean');
                              }
                              api_ready_module[_key] = _candidate_val || false;
                        break;
                        //if the sortable property is not set, then check if crud or multi-item
                        case 'sortable' :
                              //get the value from the czrModuleMap
                              if ( _.has( api.czrModuleMap, module_candidate.module_type ) ) {
                                    _candidate_val = api.czrModuleMap[ module_candidate.module_type ].sortable || api.czrModuleMap[ module_candidate.module_type ].crud || api.czrModuleMap[ module_candidate.module_type ].multi_item;
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
                        case  'column_id' :
                              if ( ! _.isString( _candidate_val ) || _.isEmpty( _candidate_val ) ) {
                                    throw new Error('prepareModuleForAPI : a module column id must a string not empty');
                              }
                              api_ready_module[_key] = _candidate_val;
                        break;
                        case  'sektion' :
                              if ( ! _.isObject( _candidate_val ) || _.isEmpty( _candidate_val ) ) {
                                    throw new Error('prepareModuleForAPI : a module sektion must be an object not empty');
                              }
                              api_ready_module[_key] = _candidate_val;
                        break;
                        case  'sektion_id' :
                              if ( ! _.isString( _candidate_val ) || _.isEmpty( _candidate_val ) ) {
                                    throw new Error('prepareModuleForAPI : a module sektion id must be a string not empty');
                              }
                              api_ready_module[_key] = _candidate_val;
                        break;
                        case 'is_added_by_user' :
                              if ( ! _.isUndefined( _candidate_val) && ! _.isBoolean( _candidate_val )  ) {
                                    throw new Error('prepareModuleForAPI : the module param "is_added_by_user" must be a boolean');
                              }
                            api_ready_module[_key] = _candidate_val || false;
                        break;
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
      //Multi Module method
      //fired when the main sektion module has synchronised its if with the module-collection control
      registerModulesOnInit : function( sektion_module_instance ) {
              var control = this,
                  _orphan_mods = [];

              _.each( control.getSavedModules() , function( _mod, _key ) {
                      //a module previously embedded in a deleted sektion must not be registered
                      if ( ! sektion_module_instance.czr_Item.has( _mod.sektion_id ) ) {
                            api.errorLog( 'Warning Module ' + _mod.id + ' is orphan : it has no sektion to be embedded to. It Must be removed.');
                            _orphan_mods.push(_mod);
                            return;
                      }
                      //@todo handle the case of a module embedded in a previously deleted column
                      //=> register it in the first column of the sektion ?

                      var _sektion = sektion_module_instance.czr_Item( _mod.sektion_id );

                      if ( _.isUndefined( _sektion ) ) {
                            throw new Error( 'sektion instance missing. Impossible to instantiate module : ' + _mod.id );
                      }

                      //add the sektion instance before update the api collection
                      $.extend( _mod, {sektion : _sektion} );

                      //push it to the collection of the module-collection control
                      //=> the instantiation will take place later, on column instantiation
                      control.updateModulesCollection( {module : _mod } );
              });

              //REMOVE ORPHAN MODULES ON INIT
              //But only when the module collectionn has been resolved
              control.moduleCollectionReady.then( function() {
                    //if there are some orphans mods, the module-collection setting must be updated now.
                    if ( ! _.isEmpty( _orphan_mods ) ) {
                        control.moduleCollectionReact( control.czr_moduleCollection(), [], { orphans_module_removal : _orphan_mods } );
                    }
              });
      },



      //@return void()
      //@param obj can be { collection : []}, or { module : {} }
      //Can be called :
      //1) for multimodule control, in register modules on init, when the main sektion module has synchronised with the module-collection control
      //2) for all modules, in module.isReady.done() if the module is not registered in the collection yet.
      //3) for all modules on moduleReact ( module.callbacks )
      //
      //=> sets the setting value via the module collection !
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
      //cb of control.czr_moduleCollection.callbacks
      //@data is an optional object. { silent : true }
      moduleCollectionReact : function( to, from, data ) {
            var control = this,
                is_module_added = _.size(to) > _.size(from),
                is_module_removed = _.size(from) > _.size(to),
                is_module_update = _.size(from) == _.size(to);
                is_collection_sorted = false;

            //MODULE REMOVED
            //Remove the module instance if needed
            if ( is_module_removed ) {
                  //find the module to remove
                  var _to_remove = _.filter( from, function( _mod ){
                      return _.isUndefined( _.findWhere( to, { id : _mod.id } ) );
                  });
                  _to_remove = _to_remove[0];
                  control.czr_Module.remove( _to_remove.id );
            }

            //is there a passed module param ?
            //if so prepare it for DB
            //if a module is provided, we also want to pass its id to the preview => can be used to target specific selectors in a partial refresh scenario
            if ( _.isObject( data  ) && _.has( data, 'module' ) ) {
                  data.module_id = data.module.id;
                  data.module = control.prepareModuleForDB( $.extend( true, {}, data.module  ) );
            }

            //Inform the the setting
            //If we are in a single module control (not a sektion, multimodule)
            //AND that the module is being added to the collection for the first time,
            //We don't want to say it to the setting, because it might alter the setting dirtyness for nothing on init.
            if ( ! control.isMultiModuleControl() && is_module_added ) {
                  return;
            }
            else {
                  //control.filterModuleCollectionBeforeAjax( to ) returns an array of items
                  //if the module has modOpt, the modOpt object is always added as the first element of the items array (unshifted)
                  api( this.id )
                        .set( control.filterModuleCollectionBeforeAjax( to ), data );
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
                  _filtered_collection = $.extend( true, [], collection ),
                  _to_return;

              _.each( collection , function( _mod, _key ) {
                    var db_ready_mod = $.extend( true, {}, _mod );
                    _filtered_collection[_key] = control.prepareModuleForDB( db_ready_mod );
              });

              //we don't want to save the same things if we the modules are embedded in a control or in a sektion
              //=> in a sektion : we save the collection of modules
              //=> in a control : we save
              //1) the collection of item(s)
              //2) the modOpt
              if ( control.isMultiModuleControl() ) {
                    return _filtered_collection;
              } else {
                    //at this point we should be in the case of a single module collection, typically use to populate a regular setting
                    if ( _.size( collection ) > 1 ) {
                      throw new Error('There should not be several modules in the collection of control : ' + control.id );
                    }
                    if ( ! _.isArray( collection ) || _.isEmpty( collection ) || ! _.has( collection[0], 'items' ) ) {
                      throw new Error('The setting value could not be populated in control : ' + control.id );
                    }
                    var module_id = collection[0].id;

                    if ( ! control.czr_Module.has( module_id ) ) {
                       throw new Error('The single module control (' + control.id + ') has no module registered with the id ' + module_id  );
                    }
                    var module_instance = control.czr_Module( module_id );
                    if ( ! _.isArray( module_instance().items ) ) {
                      throw new Error('The module ' + module_id + ' should be an array in control : ' + control.id );
                    }

                    //items
                    _to_return = module_instance.isMultiItem() ? module_instance().items : ( module_instance().items[0] || [] );

                    //Add the modOpt if any
                    return module_instance.hasModOpt() ? _.union( [ module_instance().modOpt ] , _to_return ) : _to_return;
              }
      },




      //fired before adding a module to the collection of DB candidates
      //the module must have the control.getDefaultModuleDBModel structure :
      prepareModuleForDB : function ( module_db_candidate ) {
            if ( ! _.isObject( module_db_candidate ) ) {
                throw new Error('MultiModule Control::prepareModuleForDB : a module must be an object. Aborting.');
            }
            var control = this,
                db_ready_module = {};

            _.each( control.getDefaultModuleDBModel() , function( _value, _key ) {
                  if ( ! _.has( module_db_candidate, _key ) ) {
                      throw new Error('MultiModule Control::prepareModuleForDB : a module is missing the property : ' + _key + ' . Aborting.');
                  }

                  var _candidate_val = module_db_candidate[ _key ];
                  switch( _key ) {
                        //PROPERTIES COMMON TO ALL MODULES IN ALL CONTEXTS
                        case 'items' :
                          if ( ! _.isArray( _candidate_val )  ) {
                              throw new Error('prepareModuleForDB : a module item list must be an array');
                          }
                          db_ready_module[ _key ] = _candidate_val;
                        break;



                        //PROPERTIES FOR MODULE EMBEDDED IN A SEKTION
                        case 'id' :
                          if ( ! _.isString( _candidate_val ) || _.isEmpty( _candidate_val ) ) {
                              throw new Error('prepareModuleForDB : a module id must a string not empty');
                          }
                          db_ready_module[ _key ] = _candidate_val;
                        break;
                        case 'module_type' :
                          if ( ! _.isString( _candidate_val ) || _.isEmpty( _candidate_val ) ) {
                              throw new Error('prepareModuleForDB : a module type must a string not empty');
                          }
                          db_ready_module[ _key ] = _candidate_val;
                        break;
                        case  'column_id' :
                          if ( ! _.isString( _candidate_val ) || _.isEmpty( _candidate_val ) ) {
                              throw new Error('prepareModuleForDB : a module column id must a string not empty');
                          }
                          db_ready_module[ _key ] = _candidate_val;
                        break;
                        case  'sektion_id' :
                          if ( ! _.isObject( module_db_candidate.sektion ) || ! _.has( module_db_candidate.sektion, 'id' ) ) {
                              throw new Error('prepareModuleForDB : a module sektion must be an object with an id.');
                          }
                          //in the API, the sektion property hold by the module is an instance
                          //let's use only the id for the DB
                          db_ready_module[ _key ] = module_db_candidate.sektion.id;
                        break;
                        case 'dirty' :
                          if ( control.czr_Module.has( module_db_candidate.id ) )
                              db_ready_module[ _key ] = control.czr_Module( module_db_candidate.id ).isDirty();
                          else
                              db_ready_module[ _key ] = _candidate_val;
                          if ( ! _.isBoolean( db_ready_module[ _key ] ) ) {
                              throw new Error('prepareModuleForDB : a module dirty state must be a boolean.');
                          }
                        break;
                  }//switch
            });
            return db_ready_module;
      }
});//$.extend//CZRBaseControlMths
})( wp.customize , jQuery, _ );
//extends api.CZRBaseModuleControl
var CZRMultiModuleControlMths = CZRMultiModuleControlMths || {};
( function ( api, $, _ ) {
$.extend( CZRMultiModuleControlMths, {
      initialize: function( id, options ) {
              var control = this;

              //listen to the module-collection setting changes
              //=> synchronize the columns in the sektion setting
              api.consoleLog('IN MULTI MODULE INITIALIZE ? ', options );
              api(id).callbacks.add( function() { return control.syncColumn.apply( control, arguments ); } );

              //when the synchronized sektion module sends its instance, check the consistency with the module-collection setting
              //=> each modules of the module-collection setting should be present in a column of the synchronized sektion
              // control.syncSektionModule().bind( function( sektion_module_instance ) {
              //     sektion_module_instance.czr_columnCollection.each( function( _col ) {
              //           api.consoleLog('_col.modules', _col.modules);
              //     });
              // });

              api.CZRBaseModuleControl.prototype.initialize.call( control, id, options );
      },


      ready : function() {
            var control = this;
            api.consoleLog('MODULE-COLLECTION CONTROL READY', this.id );
            api.CZRBaseModuleControl.prototype.ready.apply( control, arguments);
      },

      //cb of : api(control.id).callbacks.
      syncColumn : function( to, from, data ) {
            api.consoleLog('IN SYNC COLUMN', to, from, data );
            if ( ! _.isUndefined(data) && data.silent )
              return;
            api.consoleLog('IN SYNXXX', api.control('hu_theme_options[module-collection]').syncSektionModule()(), this.syncSektionModule()(), this.id );

            //ORPHANS MODULE REMOVED ON INIT, VOID()
            //=> there's no column to synchronize
            if ( _.has( data, 'orphans_module_removal' ) )
              return;

            //always get the control instance from the api
            //=> because the control on which this callback is binded can be re instantiated, typically on skope switch
            var control = api.control( this.id );
            //MODULE ADDED
            //determine if a module has been added
            var added_mod = _.filter( to, function( _mod, _key ){
                return ! _.findWhere( from, { id : _mod.id } );
            } );
            if ( ! _.isEmpty( added_mod ) ) {
                  api.consoleLog('ADDED MODULE?', added_mod );
                  _.each( added_mod, function( _mod ) {
                          control.syncSektionModule().czr_Column( _mod.column_id ).updateColumnModuleCollection( { module : _mod } );
                  });
            }

            //MODULE REMOVED
            var removed_mod = _.filter( from, function( _mod, _key ){
                return ! _.findWhere( to, { id : _mod.id } );
            } );
            if ( ! _.isEmpty( removed_mod ) ) {
                  _.each( removed_mod, function( _mod ) {
                          control.syncSektionModule().czr_Column( _mod.column_id ).removeModuleFromColumnCollection( _mod );
                  });
            }

            //MODULE HAS BEEN MOVED TO ANOTHER COLUMN
            if ( _.size(from) == _.size(to) && _.has( data, 'module') && _.has( data, 'source_column') && _.has( data, 'target_column') ) {
                    $.when( control.syncSektionModule().moveModuleFromTo( data.module, data.source_column, data.target_column ) ).done( function() {
                          control.syncSektionModule().control.trigger('module-moved', { module : data.module, source_column: data.source_column, target_column :data.target_column });
                    } );
            }
            control.trigger( 'columns-synchronized', to );
      },


      ////////////////////////////////////////////
      /// REMOVE MODULE
      ///////////////////////////////////////////
      //@param module = obj => the module model
      removeModule : function( module ) {
            var control = this;
            //remove module from DOM if it's been embedded
            if ( control.czr_Module.has( module.id ) && 'resolved' == control.czr_Module( module.id ).embedded.state() )
                control.czr_Module( module.id ).container.remove();

            //remove module from API
            control.removeModuleFromCollection( module );
      },


      removeModuleFromCollection : function( module ) {
            var control = this,
                _current_collection = control.czr_moduleCollection(),
                _new_collection = $.extend( true, [], _current_collection);

            _new_collection = _.filter( _new_collection, function( _mod ) {
                  return _mod.id != module.id;
            } );
            control.czr_moduleCollection.set( _new_collection );
      }
});//$.extend//CZRBaseControlMths
})( wp.customize , jQuery, _ );
//extends api.CZRBaseModuleControl
var CZRMultiModuleControlMths = CZRMultiModuleControlMths || {};
( function ( api, $, _ ) {
$.extend( CZRMultiModuleControlMths, {
      //adapt modules for them to be used in a multimodule control, synchronized with a sektions control.
      //@todo. => create equivalent extender when they are used in controls.
      getMultiModuleExtender : function( parentConstructor ) {
            var control = this;
            $.extend( control.CZRModuleExtended, {
                  initialize: function( id, constructorOptions ) {
                        var module = this;
                        //run the parent initialize
                        parentConstructor.prototype.initialize.call( module, id, constructorOptions );

                        api.consoleLog('MODULE INSTANTIATED : ', module.id );

                        //extend the module with new template Selectors
                        $.extend( module, {
                              singleModuleWrapper : 'czr-single-module-wrapper',
                              sektionModuleTitle : 'czr-module-sektion-title-part',
                              ruModuleEl : 'czr-ru-module-sektion-content'
                        } );

                        //ADD A MODULE STATE OBSERVER
                        //czr_ModuleState stores the current expansion status of a given module
                        //can take 2 values : expanded, closed
                        module.czr_ModuleState = new api.Value( false );

                        //SETUP MODULE VIEW WHEN MODULE READY
                        module.isReady.done( function() {
                              module.setupModuleView();
                        });

                        //ADD A MODULE TITLE ELEMENT EMBEDDED STATE
                        module.moduleTitleEmbedded = $.Deferred();

                        //ADD A MODULE COLUMN STATE OBSERVER
                        module.modColumn = new api.Value();
                        module.modColumn.set( constructorOptions.column_id );

                        //React to a module column change. Typically fired when moving a module from one column to another.
                        module.modColumn.bind( function( to, from ) {
                              api.consoleLog('MODULE ' + module.id + ' HAS BEEN MOVED TO COLUMN', to, module() );
                              var _current_model = module(),
                                  _new_model = $.extend( true, {}, _current_model );

                              _new_model.column_id = to;

                              //When the module value changes, here's what happens :
                              //IN THE MODULE COLLECTION CONTROL / SETTING
                              //1) the module reacts and inform the control.czr_moduleCollection()
                              //2) the control.czr_moduleCollection() reacts and inform the 'module-collection' setting
                              //3) the module-collection setting react and inform the relevant column.columnModuleCollection() instance with the syncColumn() method
                              //
                              //IN THE SEKTIONS CONTROL / SETTING
                              //4) the column.columnModuleCollection() instance reacts and inform the column() instance
                              //5) the column() instance reacts and inform the sektion module.czr_columnCollection() instance
                              //6) the module.czr_columnCollection() instance reacts and inform the relevant sektion() instance
                              //7) the sektion() instance reacts and inform the itemCollection() (=> a sektion() is actually an item )
                              //8) the itemCollection() reacts and inform its module() instance
                              //9) the module() instance reacts and inform the moduleCollection() instance
                              //10) the control.czr_moduleCollection() instance reacts and inform the 'sektions' setting
                              module.set( _new_model, { target_column : to, source_column : from } );
                              //var updatedModuleCollection = $.extend( true, [], module.control.czr_moduleCollection() );
                              //api(module.control.id).set( module.control.filterModuleCollectionBeforeAjax( updatedModuleCollection ) );
                        } );
                  },

                  //////////////////////////////////
                  ///READY
                  //////////////////////////////////
                  //when a module is embedded in a sektion, we need to render it before ready is done
                  //=> this allows us to override the container element declared in the parent initialize
                  //when ready done => the module items are embedded (without their content)
                  ready : function( is_added_by_user ) {
                          var module = this;
                           api.consoleLog('MODULE READY IN EXTENDED MODULE CLASS : ', module.id );
                          $.when( module.renderModuleWrapper( is_added_by_user ) ).done( function( $_module_container ) {
                                if ( _.isUndefined($_module_container) || false === $_module_container.length ) {
                                    throw new Error( 'Module container has not been embedded for module :' + module.id );
                                }
                                module.container = $_module_container;
                                module.embedded.resolve();
                          } );
                          //run the parent initialize
                          parentConstructor.prototype.ready.call( module );
                          //module.isReady.resolve();
                  }

            });
            return control.CZRModuleExtended;
      },


      //this object holds the various methods allowing a module to be rendered in a multimodule control
      CZRModuleExtended  : {
            //fired in ready.
            //=> before isReady.done().
            renderModuleWrapper : function( is_added_by_user ) {
                    //=> an array of objects
                    var module = this;

                    //has this module view already been rendered?
                    if ( 'resolved' == module.embedded.state() )
                      return module.container;

                    //do we have view template script?
                    if ( 0 === $( '#tmpl-' + module.singleModuleWrapper ).length ) {
                      throw new Error('No template for module ' + module.id + '. The template script id should be : #tmpl-' + module.singleModuleWrapper );
                    }

                    var module_wrapper_tmpl = wp.template( module.singleModuleWrapper ),
                        tmpl_data = {
                            id : module.id,
                            type : module.module_type
                        },
                        $_module_el = $(  module_wrapper_tmpl( tmpl_data ) );

                    //append the module wrapper to the column
                    //if added by user, search for the module candidate element, render after and delete the element
                    if ( is_added_by_user ) {
                        $.when( $( '.czr-module-collection-wrapper' , module._getColumn().container ).find( '.czr-module-candidate').after( $_module_el ) ).
                          done( function() {
                            $( '.czr-module-collection-wrapper' , module._getColumn().container ).find( '.czr-module-candidate').remove();
                          });
                    } else {
                        $( '.czr-module-collection-wrapper' , module._getColumn().container).append( $_module_el );
                    }


                    // //then append the ru module template
                    // var mod_content_wrapper_tmpl = wp.template( module.ruModuleEl ),
                    //     $_mod_content_wrapper = $(  mod_content_wrapper_tmpl( tmpl_data ) );

                    // $( '.czr-mod-content', $_module_el).append( $_mod_content_wrapper );

                    return $_module_el;
            },





            setupModuleView : function() {
                    var module = this;

                    module.view_event_map = [
                            //toggles remove view alert
                            {
                              trigger   : 'click keydown',
                              selector  : [ '.czr-remove-mod', '.' + module.control.css_attr.cancel_alert_btn ].join(','),
                              name      : 'toggle_remove_alert',
                              actions   : ['toggleModuleRemoveAlert']
                            },
                            //removes module and destroys its view
                            {
                              trigger   : 'click keydown',
                              selector  : '.' + module.control.css_attr.remove_view_btn,
                              name      : 'remove_module',
                              actions   : ['removeModule']
                            },
                            //edit view
                            {
                              trigger   : 'click keydown',
                              selector  : '.czr-edit-mod',
                              name      : 'edit_module',
                              actions   : ['setModuleViewVisibility', 'sendEditModule']
                            },
                            {
                              trigger   : 'click keydown',
                              selector  : '.czr-module-back',
                              name      : 'back_to_column',
                              actions   : ['setModuleViewVisibility']
                            },
                            {
                              trigger   : 'mouseenter',
                              selector  : '.czr-mod-header',
                              name      : 'hovering_module',
                              actions   : function( obj ) {
                                    api.previewer.send( 'start_hovering_module', {
                                          id : module.id
                                    });
                              }
                            },
                            {
                              trigger   : 'mouseleave',
                              selector  : '.czr-mod-header',
                              name      : 'hovering_module',
                              actions   : function( obj ) {
                                  api.previewer.send( 'stop_hovering_module', {
                                        id : module.id
                                  });
                              }
                            }
                    ];

                    //defer actions on module view embedded
                    module.embedded.done( function() {
                          //add a listener on view state change
                          module.czr_ModuleState.callbacks.add( function() { return module.setupModuleViewStateListeners.apply(module, arguments ); } );

                          //setup DOM listener
                          api.CZR_Helpers.setupDOMListeners(
                                module.view_event_map,//actions to execute
                                { module : { id : module.id } , dom_el:module.container },//model + dom scope
                                module //instance where to look for the cb methods
                          );//listeners for the view wrapper
                    });
            },

            //fired on click
            setModuleViewVisibility : function( obj, is_added_by_user ) {
                  var module = this;

                  module.czr_ModuleState( ! module.czr_ModuleState() );

                  //always close the module panel
                  api.czrModulePanelState.set(false);
                  //always close the sektion settings panel
                  api.czrSekSettingsPanelState.set(false);

                  //close all sektions but the one from which the button has been clicked
                  module.control.syncSektionModule().closeAllOtherSektions( $(obj.dom_event.currentTarget, obj.dom_el ) );

                  // if ( is_added_by_user ) {
                  //   item.viewState.set( 'expanded_noscroll' );
                  // } else {
                  //   module.closeAllItems( item.id );
                  //   if ( _.has(module, 'preItem') ) {
                  //     module.preItemExpanded.set( false );
                  //   }
                  //   }
                  //   item.viewState.set( 'expanded' == item._getViewState() ? 'closed' : 'expanded' );
                  // }
            },

            //fired on click
            sendEditModule : function( obj ) {
                  var module = this;
                  api.previewer.send( 'edit_module', {
                        id : module.id
                  });
            },

            //cb of module.czr_ModuleState.callbacks
            //On first module expansion, render the module item(s) content
            setupModuleViewStateListeners : function( expanded ) {
                  var module = this;
                  //setup an api value for the current opened module.
                  api.czr_isModuleExpanded = api.czr_isModuleExpanded || new api.Value();

                  if ( expanded )
                    api.czr_isModuleExpanded( module );
                  else
                    api.czr_isModuleExpanded( false );

                  //expand / collapse
                  $.when( module.toggleModuleViewExpansion( expanded ) ).done( function() {
                        if ( expanded ) {
                              //render the module title
                              module.renderModuleTitle();

                              //populates the saved items collection
                              module.populateSavedItemCollection();

                              //render the item(s)
                              //on first rendering, use the regular method.
                              //for further re-rendering, when the embedded state is resolved()
                              // => 1) re-render each item
                              // => 2) re-instantiate each input
                              // module.czr_Item.each ( function( item ) {
                              //       if ( ! item.module.isMultiItem() )
                              //           item.viewState.set('expanded');
                              //       if ( 'resolved' == item.embedded.state() ) {
                              //           $.when( item.renderItemWrapper() ).done( function( $_item_container ) {
                              //               item.container = $_item_container;

                              //               $.when( item.renderItemContent() ).done( function() {
                              //                   api.CZR_Helpers.setupInputCollectionFromDOM.call( item );
                              //               });

                              //               if ( ! item.module.isMultiItem() )
                              //                   item.viewState.set('expanded');
                              //           });

                              //       }
                              //       else {
                              //           item.mayBeRenderItemWrapper();
                              //       }
                              // } );
                        }
                        else {
                              module.czr_Item.each ( function( item ) {
                                    item.viewState.set('closed');
                                    item._destroyView( 0 );
                                    //api.CZR_Helpers.removeInputCollection.call( item );
                                    module.czr_Item.remove( item.id );
                              } );
                        }
                  });
            },


            renderModuleTitle : function() {
                  var module = this;
                  if( 'resolved' == module.moduleTitleEmbedded.state() )
                    return;

                  //render the module title
                  //do we have view template script?
                  if ( 0 === $( '#tmpl-' + module.sektionModuleTitle ).length ) {
                    throw new Error('No sektion title Module Part template for module ' + module.id + '. The template script id should be : #tmpl-' + module.sektionModuleTitle );
                  }
                  //append the title when in a sektion and resolve the embedded state
                  $.when( $( module.container ).find('.czr-mod-content').prepend(
                        $( wp.template( module.sektionModuleTitle )( { id : module.id } ) )
                  ) ).done( function() {
                        module.moduleTitleEmbedded.resolve();
                  });
            },


            //fired in setupModuleViewStateListeners()
            toggleModuleViewExpansion : function( expanded, duration ) {
                  var module = this;

                  //slide Toggle and toggle the 'open' class
                  $( '.czr-mod-content' , module.container ).slideToggle( {
                      duration : duration || 200,
                      done : function() {
                            var $_overlay = module.container.closest( '.wp-full-overlay' ),
                                $_backBtn = module.container.find( '.czr-module-back' ),
                                $_modTitle = module.container.find('.czr-module-title');

                            module.container.toggleClass('open' , expanded );
                            $_overlay.toggleClass('czr-module-open', expanded );
                            $_modTitle.attr( 'tabindex', expanded ? '-1' : '0' );
                            $_backBtn.attr( 'tabindex', expanded ? '0' : '-1' );

                            if( expanded ) {
                                $_backBtn.focus();
                            } else {
                                $_modTitle.focus();
                            }

                            //close all alerts
                            //module.closeRemoveDialogs();

                            //toggle the icon activate class depending on the status
                            //switch icon
                            //var $_edit_icon = $(this).siblings().find('.' + module.control.css_attr.edit_view_btn );

                            // $_edit_icon.toggleClass('active' , expanded );
                            // if ( expanded )
                            //   $_edit_icon.removeClass('fa-pencil').addClass('fa-minus-square').attr('title', serverControlParams.i18n.close );
                            // else
                            //   $_edit_icon.removeClass('fa-minus-square').addClass('fa-pencil').attr('title', serverControlParams.i18n.edit );

                            //scroll to the currently expanded view
                            if ( expanded )
                              module._adjustScrollExpandedBlock( module.container );
                      }//done callback
                    } );
            },









            toggleModuleRemoveAlert : function( obj ) {
                    var module = this,
                        control = this.control,
                        $_alert_el = $( '.' + module.control.css_attr.remove_alert_wrapper, module.container ).first(),
                        $_clicked = obj.dom_event,
                        $_column_container = control.syncSektionModule().czr_Column( module.column_id ).container;

                    //first close all open  views
                    //module.closeAllItems();

                    //close the main sektion pre_item view
                    if ( _.has(module, 'preItem') ) {
                        control.syncSektionModule().preItemExpanded.set( false );
                    }

                    //then close any other open remove alert in the column containuer
                    $('.' + module.control.css_attr.remove_alert_wrapper, $_column_container ).not($_alert_el).each( function() {
                          if ( $(this).hasClass('open') ) {
                                $(this).slideToggle( {
                                      duration : 200,
                                      done : function() {
                                            $(this).toggleClass('open' , false );
                                            //deactivate the icons
                                            $(this).siblings().find('.' + module.control.css_attr.display_alert_btn).toggleClass('active' , false );
                                      }
                                } );
                          }
                    });

                    //print the html
                    //do we have an html template and a control container?
                    if ( ! wp.template( module.AlertPart )  || ! module.container ) {
                        throw new Error( 'No removal alert template available for module :' + module.id );
                    }

                    $_alert_el.html( wp.template( module.AlertPart )( { title : ( module().title || module.id ) } ) );

                    //toggle it
                    $_alert_el.slideToggle( {
                          duration : 200,
                          done : function() {
                                var _is_open = ! $(this).hasClass('open') && $(this).is(':visible');
                                $(this).toggleClass('open' , _is_open );
                                //set the active class of the clicked icon
                                $( obj.dom_el ).find('.' + module.control.css_attr.display_alert_btn).toggleClass( 'active', _is_open );
                                //adjust scrolling to display the entire dialog block
                                if ( _is_open )
                                  module._adjustScrollExpandedBlock( module.container );
                          }
                    } );
            },




            //@param module = obj => the module model
            //Fired on click
            removeModule : function( obj ) {
                  this.control.removeModule( obj.module );
            },














            _getColumn : function() {
                    var module = this;
                    return module.control.syncSektionModule().czr_Column( module.modColumn() );
            },

            _getSektion : function() {

            }
      }
});//$.extend//CZRBaseControlMths
})( wp.customize , jQuery, _ );
( function ( api, $, _ ) {
      //BASE
      //BASE : Extends some constructors with the events manager
      $.extend( CZRBaseControlMths, api.Events );
      $.extend( api.Control.prototype, api.Events );//ensures that the default WP control constructor is extended as well
      $.extend( CZRModuleMths, api.Events );
      $.extend( CZRItemMths, api.Events );
      $.extend( CZRModOptMths, api.Events );

      //BASE : Add the DOM helpers (addAction, ...) to the Control Base Class + Input Base Class
      $.extend( CZRBaseControlMths, api.CZR_Helpers );
      $.extend( CZRInputMths, api.CZR_Helpers );
      $.extend( CZRModuleMths, api.CZR_Helpers );

      //BASE INPUTS => used as constructor when creating the collection of inputs
      api.CZRInput                  = api.Value.extend( CZRInputMths );
      //Declare all available input type as a map
      api.czrInputMap = api.czrInputMap || {};
      //input_type => callback fn to fire in the Input constructor on initialize
      //the callback can receive specific params define in each module constructor
      //For example, a content picker can be given params to display only taxonomies
      $.extend( api.czrInputMap, {
            text      : '',
            textarea  : '',
            check     : 'setupIcheck',
            select    : 'setupSelect',
            number    : 'setupStepper',
            upload    : 'setupImageUploader',
            color     : 'setupColorPicker',
            content_picker : 'setupContentPicker',
            text_editor    : 'setupTextEditor',
            password : '',
            range_slider : 'setupRangeSlider',
            hidden : ''
      });

      //BASE ITEMS => used as constructor when creating the collection of models
      api.CZRItem                   = api.Value.extend( CZRItemMths );

      //BASE MODULE OPTIONS => used as constructor when creating module options
      api.CZRModOpt                 = api.Value.extend( CZRModOptMths );

      //BASE MODULES => used as constructor when creating the collection of modules
      api.CZRModule                 = api.Value.extend( CZRModuleMths );
      api.CZRDynModule              = api.CZRModule.extend( CZRDynModuleMths );

      //BASE COLUMNS => used as constructor
      //Columns are a pro feature, only part of the full build.
      if ( ! _.isUndefined( window.CZRColumnMths ) ) {
            api.CZRColumn           = api.Value.extend( CZRColumnMths );
      }

      //BASE CONTROLS
      api.CZRBaseControl            = api.Control.extend( CZRBaseControlMths );
      api.CZRBaseModuleControl      = api.CZRBaseControl.extend( CZRBaseModuleControlMths );
      api.CZRMultiModuleControl     = api.CZRBaseModuleControl.extend( CZRMultiModuleControlMths );

      $.extend( api.controlConstructor, {
            czr_module : api.CZRBaseModuleControl,
            czr_multi_module : api.CZRMultiModuleControl,
            //czr_sektions   : api.CZRSektionsControl
      });

})( wp.customize, jQuery, _ );
( function ( api, $, _ ) {
      /*****************************************************************************
      * A SKOPE AWARE PREVIEWER QUERY
      *****************************************************************************/
      api.bind('ready', function() {
            if ( ! serverControlParams.isSkopOn )
              return;

            /**
            * Build the query to send along with the Preview request.
            *
            * @return {object}
            */
            var _coreQuery = api.previewer.query;


            //@todo : turn those arguments into an object ?
            //the dyn_type can also be set to 'wp_default_type' when saving a skope excluded setting
            //@queryVars = {
            //    skope_id : string,
            //    action : string,
            //    the_dirties : {},
            //    dyn_type : string,
            //    opt_name : string
            // }
            api.previewer.query =  function( queryVars ) {
                  //if skope instantiation went wrong, serverControlParams.isSkopOn has been reset to false
                  //=> that's why we check it here again before doing anything else
                  if ( ! serverControlParams.isSkopOn ) {
                        return _coreQuery.apply( this );
                  }

                  //IS SKOP ON
                  //falls back to WP core treatment if skope is not on or if the requested skope is not registered
                  if ( ! _.has( api, 'czr_skope') ) {
                        api.consoleLog('QUERY : SKOPE IS NOT FULLY READY YEY. FALLING BACK ON CORE QUERY');
                        return _coreQuery.apply( this );
                  }

                  //HAS THE FIRST SKOPE COLLECTION BEEN POPULATED ?
                  if ( 'pending' == api.czr_initialSkopeCollectionPopulated.state() ) {
                        api.consoleLog('QUERY : INITIAL SKOPE COLLECTION NOT POPULATED YET. FALLING BACK ON CORE QUERY');
                        return _coreQuery.apply( this );
                  }

                  //the previewer is now skope aware
                  if ( 'pending' == api.czr_isPreviewerSkopeAware.state() ) {
                        api.czr_isPreviewerSkopeAware.resolve();
                        //return _coreQuery.apply( this );
                  }

                  //Skope is fully ready but the query is accessed from core (widgets) or a plugin
                  //=> fallback on the core method
                  if ( ! _.isObject( queryVars ) && 'resolved' == api.czr_initialSkopeCollectionPopulated.state() && 'resolved' == api.czr_initialSkopeCollectionPopulated.state() ) {
                        return _coreQuery.apply( this );
                  }

                  //IS THE SKOPE ID PROVIDED ?
                  //When navigating in the preview, the skope_id might not be provided.
                  //In this case, falls back on the activeSkope() or the global skope
                  //skope_id = skope_id || api.czr_activeSkopeId() || api.czr_skopeBase.getGlobalSkopeId();
                  if ( _.isUndefined( queryVars.skope_id ) || ! _.isString( queryVars.skope_id ) ) {
                        queryVars.skope_id = api.czr_activeSkopeId() || api.czr_skopeBase.getGlobalSkopeId();
                  }

                  var globalCustomized = {},
                      skopeCustomized = {},
                      _defaults = {
                            skope_id : null,
                            action : null,
                            the_dirties : {},
                            dyn_type : null,
                            opt_name : null
                      },
                      _to_return;

                  queryVars = $.extend( _defaults, queryVars );

                  //ARE THE DIRTIES WELL FORMED OR NOT EMPTY ?
                  if ( ! _.isObject( queryVars.the_dirties ) ) {
                        api.consoleLog('QUERY PARAMS : ', queryVars );
                        throw new Error( 'QUERY DIRTIES MUST BE AN OBJECT. Requested action : ' + queryVars.action );
                  }

                  ///TO CHANGE ?
                  if ( 'pending' != api.czr_isPreviewerSkopeAware.state() && _.isNull( queryVars.skope_id ) ) {
                        api.consoleLog('QUERY PARAMS : ', queryVars );
                        //api.consoleLog( 'OVERRIDEN QUERY : NO SKOPE ID. FALLING BACK ON CORE QUERY.' );
                        throw new Error( 'OVERRIDEN QUERY : NO SKOPE ID. FALLING BACK ON CORE QUERY. Requested action : ' + queryVars.action );
                        //return _coreQuery.apply( this );
                  }

                  //IS THE REQUESTED ACTION AUTHORIZED ?
                  if ( ! _.contains( [ null, 'refresh', 'save', 'reset', 'changeset_update' ], queryVars.action ) ) {
                        api.consoleLog('QUERY PARAMS : ', queryVars );
                        throw new Error( 'A REQUESTED QUERY HAS NO AUTHORIZED ACTION. Requested action : ' + queryVars.action );
                  }

                  //@return an object of customized values for each of the current skopes :
                  //{
                  //  'skope_id_1' = { ... },
                  //  'skope_id_2' = { ... }
                  //}
                  var _getSkopesCustomized = function() {
                        //if the initial skope collection has been populated, let's populate the skopeCustomized
                        if ( 'pending' == api.czr_initialSkopeCollectionPopulated.state() )
                          return {};
                        var _skpCust = {};
                        //Loop current skopes collection
                        //Exclude the global skope
                        _.each( api.czr_currentSkopesCollection(), function( _skp ) {
                              if ( 'global' == _skp.skope )
                                return;
                              _skpCust[_skp.id] = api.czr_skopeBase.getSkopeDirties( _skp.id );
                        } );
                        return _skpCust;
                  };



                  ///BUILD THE DIRTIES
                  //There are cases ( _forceSidebarDirtyRefresh ) when the dirties can be passed as param
                  //In this cases, we use them and assign them to the relevant customized object
                  //Since 4.7 and the changeset introduction, the boolean param 'excludeCustomizedSaved' can be passed to the query
                  if ( _.isNull( queryVars.the_dirties ) || _.isEmpty( queryVars.the_dirties ) ) {
                        globalCustomized = api.dirtyValues( { unsaved:  queryVars.excludeCustomizedSaved || false } );
                        skopeCustomized = _getSkopesCustomized();
                  } else {
                        if ( 'global' == api.czr_skopeBase.getActiveSkopeName() )
                          globalCustomized = queryVars.the_dirties;
                        else
                          skopeCustomized[ api.czr_activeSkopeId() ] = queryVars.the_dirties;
                  }


                  ///HANDLE THE VARIOUS CASES : REFRESH, SAVE, RESET
                  //on first load OR if the current skope is the customized one, build the globalCustomized the regular way : typically a refresh after setting change
                  //otherwise, get the dirties from the requested skope instance : typically a save action on several skopes
                  switch( queryVars.action ) {
                        case null :
                        case 'refresh' :
                              //INHERITANCE : FILTER THE DIRTIES
                              //when refreshing the preview, we need to apply the skope inheritance to the customized values
                              //apply the inheritance
                              // var _inheritanceReadyCustomized = {};
                              // _.each( skopeCustomized, function( _custValues, _skopId ) {
                              //       _inheritanceReadyCustomized[_skopId] =  api.czr_skopeBase.applyDirtyCustomizedInheritance( _custValues, _skopId );
                              // } );
                              // skopeCustomized = _inheritanceReadyCustomized;

                              //globalCustomized = api.czr_skopeBase.applyDirtyCustomizedInheritance( globalCustomized, api.czr_skopeBase.getGlobalSkopeId() );
                        break;

                        case 'changeset_update' :
                              if ( _.isUndefined( queryVars.opt_name ) ) {
                                    throw new Error('Missing opt_name param in the changeset_update query for skope : ' + queryVars.skope_id );
                              }
                        break;


                        case 'save' :
                              // if ( _.isEmpty( queryVars.the_dirties ) ) {
                              //       throw new Error( 'QUERY : A SAVE QUERY MUST HAVE A NOT EMPTY DIRTY OBJECT TO SUBMIT' );
                              // }
                              //Set the Dyn type
                              //the dyn type might be passed as a param to the query in some cases
                              //typically to save skope excluded settings. In this case the dyn_type is set to false, to fall back on the default wp one : theme_mod or option
                              if ( _.isNull( queryVars.dyn_type ) )
                                    queryVars.dyn_type = api.czr_skope( queryVars.skope_id )().dyn_type;//post_meta, term_meta, user_meta, trans, option
                              if ( _.isNull( queryVars.dyn_type ) || _.isUndefined( queryVars.dyn_type ) ) {
                                    throw new Error( 'QUERY : A SAVE QUERY MUST HAVE A VALID DYN TYPE.' + queryVars.skope_id );
                              }
                              //Set the dirties  || api.czr_skopeBase.getSkopeDirties(skope_id) ?
                              //globalCustomized = queryVars.the_dirties; //was : api.czr_skope( skope_id ).dirtyValues();
                        break;

                        case 'reset' :
                              //no specific treatment for reset
                              if ( _.isNull( queryVars.dyn_type ) )
                                    queryVars.dyn_type = api.czr_skope( queryVars.skope_id )().dyn_type;//post_meta, term_meta, user_meta, trans, option
                              if ( _.isNull( queryVars.dyn_type ) || _.isUndefined( queryVars.dyn_type ) ) {
                                    throw new Error( 'QUERY : A RESET QUERY MUST HAVE A VALID DYN TYPE.' + queryVars.skope_id );
                              }
                        break;
                  }


                  //BUILD THE CURRENT SKOPES ARRAY
                  var _current_skopes = {};
                  _.each( api.czr_currentSkopesCollection(), function( _skp ) {
                        _current_skopes[_skp.skope] = { id : _skp.id, opt_name : _skp.opt_name };
                  });


                  //Before 4.7 and the changeset introduction, the queryVars were :
                  //{
                  //  wp_customize: 'on',
                  //  theme:      api.settings.theme.stylesheet,
                  //  customized: JSON.stringify( globalCustomized ),
                  //  nonce:      this.nonce.preview
                  //}

                  //Since 4.7 the queryVars are :
                  //{
                  //  wp_customize: 'on',
                  //  customize_theme: api.settings.theme.stylesheet,
                  //  customized : JSON.stringify( api.dirtyValues( { unsaved: options && options.excludeCustomizedSaved } ) );
                  //  nonce: this.nonce.preview,
                  //  customize_changeset_uuid: api.settings.changeset.uuid
                  //}

                  //common properties
                  _to_return = {
                        wp_customize: 'on',
                        //theme is added after, because the property name has been changed to customize_theme in 4.7
                        //always make sure that the customized values is not empty, otherwise nothing will be posted since 4.7.
                        //@see api.PreviewFrame::run()
                        customized:      '{}' == JSON.stringify( globalCustomized ) ? '{\"__not_customized__\"}' : JSON.stringify( globalCustomized ),
                        skopeCustomized:  JSON.stringify( skopeCustomized ),
                        nonce:            this.nonce.preview,
                        skope:            api.czr_skope( queryVars.skope_id )().skope,
                        level_id:          api.czr_skope( queryVars.skope_id )().level,
                        skope_id:         queryVars.skope_id,
                        dyn_type:         queryVars.dyn_type,
                        opt_name:         ! _.isNull( queryVars.opt_name ) ? queryVars.opt_name : api.czr_skope( queryVars.skope_id )().opt_name,
                        obj_id:           api.czr_skope( queryVars.skope_id )().obj_id,
                        current_skopes:   JSON.stringify( _current_skopes ) || {},
                        channel:          this.channel(),
                        revisionIndex:    api._latestRevision
                  };

                  //since 4.7
                  if ( api.czr_isChangeSetOn() ) {
                        _to_return = $.extend( _to_return , {
                              customize_theme: api.settings.theme.stylesheet,
                              customize_changeset_uuid: api.settings.changeset.uuid
                        });
                  }
                  //before 4.7
                  else {
                        _to_return = $.extend( _to_return , {
                              theme: api.settings.theme.stylesheet
                        });
                  }
                  // api.consoleLog('DIRTY VALUES TO SUBMIT ? ', globalCustomized, api.czr_skopeBase.getSkopeDirties(skope_id) );
                  return _to_return;

            };//api.previewer.query
      });//api.bind('ready')
})( wp.customize , jQuery, _ );
( function ( api, $, _ ) {
      api.bind( 'czr-skope-started', function() {
            var _original_save = api.previewer.save, response;

            // OVERRIDES WP
            // Save the changesets for all skopes as post metas of the customize_changeset post
            // Then fire the original save method
            // => server side, if the changeset post status transitions to "publish", the skope metas attached to the customize_changeset post will be merged with the post metas of the skope post.
            // This "publish" case is handled by add_action( 'transition_post_status', 'ha_publish_skope_changeset_metas', 0, 3 );
            api.previewer.save = function( args ) {
                  //return api.czr_skopeSave.save( args );
                  return api.requestChangesetUpdate( {}, { autosave: true } )
                              .always( function( _response_ ) {
                                    response = _response_.response;
                                    _original_save.apply( api.previewer,  args ).done( function() {
                                          //<@4.9compat>
                                          //api.state( 'selectedChangesetStatus' ) was introduced in 4.9
                                          if ( api.state.has( 'selectedChangesetStatus' ) && 'publish' != api.state( 'selectedChangesetStatus' )() )
                                            return;
                                          //</@4.9compat>
                                          api.previewer.refresh( { waitSkopeSynced : true } )
                                                .fail( function( refresh_data ) {
                                                      api.consoleLog('Refresh failed after a save action', refresh_data );
                                                })
                                                .done( function( refresh_data ) {
                                                      //response can be undefined, always set them as an object with 'publish' changet_setstatus by default
                                                      //because this will be used in various api events ( 'saved', ... ) that does not accept an undefined val.
                                                      response = _.extend( { changeset_status : 'publish' },  response || {} );
                                                      //POST PROCESS AFTER SAVE
                                                      //Reset dirtyness
                                                      //check if synchronized with server
                                                      reactWhenSaveDone( refresh_data.skopesServerData );
                                                });
                                    });
                              })
                              .fail( function( _response_ ) {
                                  response = _response_.response;
                                  api.consoleLog( 'apiRequestChangesetUpdate failed => ', response );
                              })
                              .done( function( _response_ ) {
                                  var _dirtyness_ = {};

                                  _.each( api.czr_currentSkopesCollection(), function( _skp ) {
                                        _.each( api.czr_skope( _skp.id ).dirtyValues(), function( _val, _setId ) {
                                            _dirtyness_[_setId] = _val;
                                        });
                                  } );

                                  if ( _.isEmpty( _dirtyness_ ) ) {
                                        api.state( 'changesetStatus' ).set( 'auto-draft' == api.state( 'changesetStatus' )() ? '' : api.state( 'changesetStatus' )() );
                                        api.state( 'saved' )(true);
                                  }
                              });
            };

            //Fired when all submissions are done and the preview has been refreshed
            //@param {} skopesServerData looks like :
            //{
            //    czr_skopes : [
            //        0 : { ... skope_model_0 ... },
            //        1 : { ... skope_model_1 ... },
            //        2 : { ... skope_model_2 ... }
            //    ],
            //    isChangesetDirty : boolean
            //}
            var reactWhenSaveDone = function( skopesServerData ) {
                  var saved_dirties = {};
                  skopesServerData = _.extend(
                      {
                            czr_skopes : [],
                            isChangesetDirty : false
                      },
                      skopesServerData
                  );

                  //STORE THE SAVED DIRTIES AND RESET THEM FOR EACH SKOPE
                  // store the saved dirties with their opt name ! important because we will need to match the data sent by the server, before the skope id is generated
                  // (will be used as param to update the db val property of each saved skope)
                  // AND THEN reset them for each skope
                  _.each( api.czr_skopeCollection(), function( _skp_ ) {
                        saved_dirties[ _skp_.opt_name ] = api.czr_skopeBase.getSkopeDirties( _skp_.id );
                        api.czr_skope( _skp_.id ).dirtyValues( {} );
                        api.czr_skope( _skp_.id ).changesetValues( {} );
                  });


                  //ARE THE SAVED DIRTIES AND THE UPDATED DB VALUES SENT BY SERVER SYNCHRONIZED ?
                  // => let's check if the server sends the same saved values
                  // => reset the czr_saveDirties to default.
                  var _notSyncedSettings    = [],
                      _sentSkopeCollection  = skopesServerData.czr_skopes;

                  //api.consoleLog('REACT WHEN SAVE DONE', skopesServerData, saved_dirties, _sentSkopeCollection );;

                  _.each( saved_dirties, function( skp_data, _saved_opt_name ) {
                        _.each( skp_data, function( _val, _setId ) {
                              //first, let's check if the sent skopes have not changed ( typically, if a user has opened another page in the preview )
                              if ( _.isUndefined( _.findWhere( _sentSkopeCollection, { opt_name : _saved_opt_name } ) ) )
                                return;
                              //exclude ExcludedWPBuiltinSetting and not eligible theme settings from this check
                              if ( ! api.czr_skopeBase.isSettingSkopeEligible( _setId ) )
                                return;

                              var sent_skope_db_values  = _.findWhere( _sentSkopeCollection, { opt_name : _saved_opt_name } ).db,
                                  sent_skope_level      = _.findWhere( _sentSkopeCollection, { opt_name : _saved_opt_name } ).skope,
                                  wpSetId               = api.CZR_Helpers.build_setId( _setId ),
                                  shortSetId            = api.CZR_Helpers.getOptionName( _setId ),
                                  sent_set_val          = sent_skope_db_values[wpSetId];

                              //for the global skope, the server won't send the settings for which the value has been reset to default
                              //skip this case too
                              if ( _.isUndefined( sent_set_val ) && 'global' == sent_skope_level && _val === serverControlParams.defaultOptionsValues[shortSetId] )
                                return;

                              if ( _.isUndefined( sent_set_val ) || ! _.isEqual( sent_set_val, _val ) ) {
                                    _notSyncedSettings.push( { opt_name : _saved_opt_name, setId : wpSetId, server_val : sent_set_val, api_val : _val } );
                              }
                        });
                  });

                  if ( ! _.isEmpty( _notSyncedSettings ) ) {
                        api.consoleLog('SOME SETTINGS HAVE NOT BEEN PROPERLY SAVED : ', _notSyncedSettings );
                  } else {
                        api.consoleLog('ALL RIGHT, SERVER AND API ARE SYNCHRONIZED AFTER SAVE' );
                  }

                  //SYNCHRONIZE THE API.SETTINGS.SETTINGS WITH THE SAVED VALUE FOR GLOBAL SKOPE
                  //finally make sure the api.settings.settings values are always synchronized with the global skope instance
                  api.czr_skopeBase.maybeSynchronizeGlobalSkope();

                  //UPDATE CURRENT SKOPE CONTROL NOTICES IN THE CURRENTLY EXPANDED SECTION
                  api.czr_skopeBase.updateCtrlSkpNot( api.CZR_Helpers.getSectionControlIds() );

                  //MAKE SURE TO COLLAPSE THE CONTROL NOTICES AFTER SAVED IF CURRENT SKOPE IS GLOBAL
                  var _setupSectionCtrlNotices = function() {
                        var sectionCtrls = api.CZR_Helpers.getSectionControlIds( api.czr_activeSectionId() );
                        _.each( sectionCtrls, function( ctrlId ) {
                              if ( ! api.has( ctrlId ) || _.isUndefined( api.control( ctrlId ) ) )
                                return;
                              var ctrl = api.control( ctrlId );
                              if ( ! _.has( ctrl, 'czr_states' ) )
                                return;
                              ctrl.czr_states( 'noticeVisible' )( api.czr_skopeBase.isCtrlNoticeVisible( ctrlId ) );
                        });
                  };
                  //_.delay( _setupSectionCtrlNotices, 500 );
            };//reactWhenSaveDone()
      });//api.bind('ready')
})( wp.customize , jQuery, _ );
(function (api, $, _) {
      if ( ! serverControlParams.isSkopOn )
        return;

      /*****************************************************************************
      * SYNCHRONIZER AUGMENTED
      *****************************************************************************/
      // var _original_element_initialize = api.Element.prototype.initialize;
      // api.Element.prototype.initialize = function( element, options  ) {
      //         //call the original constructor
      //         _original_element_initialize .apply( this, [element, options ] );
      //         api.consoleLog('IN OVERRIDEN INITIALIZE ELEMENT ?');
      //         // if ( this.element.is('select') ) {
      //         //     api.consoleLog('element, options', element, options);
      //         // }
      // };

      // //CHECKBOX WITH ICHECK
      api.Element.synchronizer.checkbox.update = function( to ) {
            this.element.prop( 'checked', to );
            this.element.iCheck('update');
      };

      var _original = api.Element.synchronizer.val.update;
      api.Element.synchronizer.val.update = function(to) {
            var self = this,
                _modifySynchronizer = function() {
                      //SELECT CASE
                      if ( self.element.is('select') ) {
                            //SELECT2 OR SELECTER
                            //select2.val() documented https://select2.github.io/announcements-4.0.html
                            self.element.val(to).trigger('change');
                      } else if ( self.element.hasClass('wp-color-picker') ) {
                            //COLOR PICKER CASE
                            self.element.val(to).trigger('change');
                      }
                      else {
                            //falls back to the parent behaviour
                            self.element.val( to );
                      }
                };
            //if skope on,
            //wait for skope to be fully loaded to alter this
            if ( serverControlParams.isSkopOn ) {
                  if ( 'resolved' != api.czr_skopeReady.state() ) {
                        return _original.call( self, to );
                  } else {
                        api.czr_skopeReady.then( function () {
                              _modifySynchronizer();
                        });
                  }
            } else {
                  _modifySynchronizer();
            }
      };

      api.Element.synchronizer.val.refresh = function() {
            var syncApiInstance = this;
            //SELECT CASE
            //Avoid null values because not taken into account by the api.value.set() method
            //=> keep the same var type empty if the setting val is reset by user
            if ( this.element.is('select') && _.isNull( this.element.val() ) ) {
                  if ( _.isArray( syncApiInstance() ) )
                    return [];
                  else if ( _.isObject( syncApiInstance() ) )
                    return {};
                  else
                    return '';
            } else {
                  //falls back to the parent behaviour
                  return  this.element.val();
            }
      };
})( wp.customize , jQuery, _ );
( function ( api, $, _ ) {
      var coreRefresh = api.Previewer.prototype.refresh;
      var _new_refresh = function( params ) {
            params = _.extend({
                        waitSkopeSynced : true,
                        the_dirties : {}
                  },
                  params
            );

            var previewer = this, dfd = $.Deferred();

            //if skope instantiation went wrong, serverControlParams.isSkopOn has been reset to false
            //=> that's why we check it here again before doing anything else
            if ( ! serverControlParams.isSkopOn ) {
                  return dfd.resolve().promise();
            }

            //if too early, then let's fall back on core
            if ( ! _.has( api, 'czr_activeSkopeId') || _.isUndefined( api.czr_activeSkopeId() ) ) {
                  api.consoleLog( 'The api.czr_activeSkopeId() is undefined in the api.previewer._new_refresh() method.');
                  //Fire the core one
                  coreRefresh.apply( previewer );
                  return dfd.resolve().promise();

                  //PREVIOUS CODE
                  // if ( 'resolved' != api.czr_skopeReady.state() ) {
                  //       api.czr_skopeReady.done( function() {
                  //             _new_refresh.apply( api.previewer, params );
                  //       });
                  //       //Fire the core one
                  //       coreRefresh.apply( previewer );
                  //       return dfd.resolve().promise();
                  // }
            }

            // Display loading indicator
            previewer.send( 'loading-initiated' );

            previewer.abort();

            var query_params = api.czr_getSkopeQueryParams({
                      skope_id : api.czr_activeSkopeId(),
                      action : 'refresh',
                      the_dirties : params.the_dirties || {}
                });

            previewer.loading = new api.PreviewFrame({
                  url:        previewer.url(),
                  previewUrl: previewer.previewUrl(),
                  query:      previewer.query( query_params ) || {},
                  container:  previewer.container,
                  signature:  'WP_CUSTOMIZER_SIGNATURE'//will be deprecated in 4.7
            });

            previewer.settingsModifiedWhileLoading = {};
            onSettingChange = function( setting ) {
                  previewer.settingsModifiedWhileLoading[ setting.id ] = true;
            };
            api.bind( 'change', onSettingChange );

            previewer.loading.always( function() {
                  api.unbind( 'change', onSettingChange );
            } );

            //Needed before WP 4.7
            if ( ! api.czr_isChangeSetOn() ) {
                  previewer._previousPreview = previewer._previousPreview || previewer.preview;
            }

            previewer.loading.done( function( readyData ) {
                  var loadingFrame = this, onceSynced;

                  previewer.preview = loadingFrame;
                  previewer.targetWindow( loadingFrame.targetWindow() );
                  previewer.channel( loadingFrame.channel() );
                  onceSynced = function( skopesServerData ) {
                        loadingFrame.unbind( 'synced', onceSynced );
                        loadingFrame.unbind( 'czr-skopes-synced', onceSynced );

                        if ( previewer._previousPreview ) {
                              previewer._previousPreview.destroy();
                        } //before WP 4.7
                        else {
                            if ( previewer.preview )
                              previewer.preview.destroy();
                        }

                        previewer._previousPreview = previewer.preview;
                        previewer.deferred.active.resolve();
                        delete previewer.loading;

                        //Before WP 4.7
                        // if ( ! api.czr_isChangeSetOn() ) {
                        //     previewer.targetWindow( this.targetWindow() );
                        //     previewer.channel( this.channel() );
                        // }

                        api.trigger( 'pre_refresh_done', { previewer : previewer, skopesServerData : skopesServerData || {} } );
                        dfd.resolve( { previewer : previewer, skopesServerData : skopesServerData || {} } );
                  };

                  //Before WP 4.7 !!
                  if ( ! api.czr_isChangeSetOn() ) {
                      previewer.send( 'sync', {
                            scroll:   previewer.scroll,
                            settings: api.get()
                      });
                  }

                  if ( params.waitSkopeSynced ) {
                        loadingFrame.bind( 'czr-skopes-synced', onceSynced );
                  } else {
                        //default WP behaviour before and after 4.7
                        loadingFrame.bind( 'synced', onceSynced );
                  }


                  // This event will be received directly by the previewer in normal navigation; this is only needed for seamless refresh.
                  previewer.trigger( 'ready', readyData );
            });

            // Note : the location param has been removed in WP 4.7
            previewer.loading.fail( function( reason, location ) {
                  api.consoleLog('LOADING FAILED : ' ,  reason, location, arguments );
                  previewer.send( 'loading-failed' );
                  //Before WP 4.7 !!
                  if ( ! api.czr_isChangeSetOn() ) {
                      if ( 'redirect' === reason && location ) {
                            previewer.previewUrl( location );
                      }
                  }

                  if ( 'logged out' === reason ) {
                        if ( previewer.preview ) {
                              previewer.preview.destroy();
                              delete previewer.preview;
                        }

                        previewer.login().done( previewer.refresh );
                  }

                  if ( 'cheatin' === reason ) {
                        previewer.cheatin();
                  }
                  dfd.reject( reason );
            });

            return dfd.promise();
      };//_new_refresh()




      //'czr-skope-started' is fired after the skopeBase has been initialized.
      //the api is 'ready' at this point
      api.bind( 'czr-skope-started' , function() {
            //post process after refresh
            //@param param = { previewer : previewer, skopesServerData : skopesServerData || {} }
            // api.bind( 'pre_refresh_done', function( params ) {
            // });
            czr_override_refresh_for_skope();
            //OVERRIDES CORE
            api.Previewer.prototype.refresh = _new_refresh;
      });

      //since 4.7 (when changeset has been introduced ), the core query takes parameter
      //Typically an object looking like { excludeCustomizedSaved: true }
      api.czr_getSkopeQueryParams = function( params ) {
            if ( ! api.czr_isChangeSetOn() )
              return params;
            params = ! _.isObject(params) ? {} : params;
            var _action = params.action || 'refresh';
            switch( _action ) {
                  case 'refresh' :
                      params = $.extend( params, { excludeCustomizedSaved: true } );
                  break;
            }
            return params;
      };


      //fired on 'czr-skope-started', after the skopeBase has been initialized
      czr_override_refresh_for_skope = function() {
            if ( ! serverControlParams.isSkopOn )
              return;


            /**
            * Refresh the preview.
            */
            //The purpose of this refresh method is to pass additional params to the query()
            //=> we want to know the skope, and the action
            //=> here the action is always refresh.
            //=> this way we are able to better identify what to do in the api.previewer.query method
            //
            //@params can hold an obj looking like :
            //{
            //  waitSkopeSynced : true,
            //  the_dirties : {}
            //}
            //
            //When waitSkopeSynced is set to true, the refresh will wait for the 'czr_skopes_synced' event to be synced
            //if not, it waits for the default 'synced' wp event to be resolved
            //api.previewer._new_refresh = _new_refresh;

            // Debounce to prevent hammering server and then wait for any pending update requests.
            // Overrides the WP api.previewer.refresh method
            // We may need to pass force dirties here
            api.previewer.refresh = function( _params_ ) {
                  var dfd = $.Deferred();
                  var _refresh_ = function( params ) {
                        var refreshOnceProcessingComplete,
                            isProcessingComplete = function() {
                              return 0 === api.state( 'processing' ).get();
                            },
                            resolveRefresh = function() {
                                  _new_refresh.call( api.previewer, params ).done( function( refresh_data ) {
                                        dfd.resolve( refresh_data );
                                  });
                            };
                        if ( isProcessingComplete() ) {
                              resolveRefresh();
                        } else {
                              refreshOnceProcessingComplete = function() {
                                    if ( isProcessingComplete() ) {
                                          resolveRefresh();
                                          api.state( 'processing' ).unbind( refreshOnceProcessingComplete );
                                    }
                              };
                              api.state( 'processing' ).bind( refreshOnceProcessingComplete );
                        }
                  };
                  _refresh_ = _.debounce( _refresh_, api.previewer.refreshBuffer );
                  _refresh_( _params_ );
                  return dfd.promise();
            };
      };//czr_override_refresh_for_skope
})( wp.customize , jQuery, _ );
( function ( api, $, _ ) {
      if ( ! serverControlParams.isSkopOn )
        return;

      /**
       * Get the dirty setting values.
       * Overrides the default method introduced in 4.7
       * !! This method only returns the dirties of the global skope !!
       *
       * @param {object} [options] Options.
       * @param {boolean} [options.unsaved=false] Whether only values not saved yet into a changeset will be returned (differential changes).
       * @returns {object} Dirty setting values.
       */
      api.dirtyValues = function dirtyValues( options ) {
            return api.czr_skopeBase.getSkopeDirties( api.czr_skopeBase.getGlobalSkopeId(), options );
      };

})( wp.customize , jQuery, _ );
( function ( api, $, _ ) {
      if ( ! serverControlParams.isSkopOn || ! api.czr_isChangeSetOn() )
        return;

      //WP Changeset is requested for an update with an ajax query in the following situation :
      //1) before unloading the window
      //2) when focus removed from window.
      //3) on schedule : every 60 000 ms. ( api.settings.timeouts.changesetAutoSave ) <= set to 10 000 ms on api 'ready' for skope
      //
      //
      //But the update will only takes place if the current api.dirtyValues() are not empty. That's the problem we address with this override.
      //The function api.dirtyValues() only returns :
      //1) the dirty settings of the global skope
      //2) AND that have not been saved during the latest saved revision ( api._lastSavedRevision )
      //
      //
      //So we need to find a way to fire a changeset update for all the other skopes
      //The proposed solution here is to base the changeset update decision not on the emptyness of the dirtyValues but on the api._latestRevision index.
      //
      //
      //How does the saved and revision index works.
      //api._lastSavedRevision is set when the changeset update request is done() with the following code :
      //api._lastSavedRevision = Math.max( api._latestRevision, api._lastSavedRevision );
      //
      //api._latestRevision is incremented +1 each time a setting change occurs in the api. Not matter in which skope this change has been done.
      //
      //Therefore, as soon as we detect that api._latestRevision > api._lastSavedRevision, then we can authorize a changeset update.
      //The changeset update request will pass the usual skope query parameters, including the current skope dirtyness.
      //=> this will allow an ajax update of the changeset post metas for the modified skopes.
      //
      //
      //IMPORTANT :
      //If the 0 === api._lastSavedRevision is empty and that we are not customizing the global skope,
      //it means that the changeset post ID will not be set yet
      //=> But the skope meta changeset need a post ID ! when doing the ajax request server side
      //so the original method has to be fired with a dummy change,
      //this will pass the write the _.isEmpty( submittedChanges ) test in api.requestChangesetUpdate() and create a post ID


      //Backup the original method
      var _original_requestChangesetUpdate = api.requestChangesetUpdate;

      /**
       * Request updates to the changeset.
       * @since 4.7.0
       * @access public
       *
       * @param {object}  [changes] - Mapping of setting IDs to setting params each normally including a value property, or mapping to null.
       *                             If not provided, then the changes will still be obtained from unsaved dirty settings.
       * @param {object}  [_args_] - Additional options for the save request.
       * @param {boolean} [_args_.autosave=false] - Whether changes will be stored in autosave revision if the changeset has been promoted from an auto-draft.
       * @param {boolean} [_args_.force=false] - Send request to update even when there are no changes to submit. This can be used to request the latest status of the changeset on the server.
       * @param {string}  [_args_.title] - Title to update in the changeset. Optional.
       * @param {string}  [_args_.date] - Date to update in the changeset. Optional.
       * @returns {jQuery.Promise} Promise resolving with the response data.
       */
      //@4.9compat : added _args_ => example : { autosave: true }
      api.requestChangesetUpdate = function( changes, _args_ ) {
            var self = this,
                _main_deferred_ = $.Deferred(),
                data,
                _skopesToUpdate = [],
                _promises = [],
                _global_skope_changes = changes || {},
                failedPromises = [],
                _all_skopes_data_ = [],
                _recursiveCallDeferred = $.Deferred();
                // _original = function( changes ) {
                //     _original_requestChangesetUpdate(changes).then( function( data ) {
                //         _main_deferred_.resolve( data );
                //     });
                // };
            //<@4.9compat>
            _args_ = _args_ || {};
            //</@4.9compat>
            //if skope instantiation went wrong, serverControlParams.isSkopOn has been reset to false
            //=> that's why we check it here again before doing anything else
            if ( ! serverControlParams.isSkopOn ) {
                  return _original_requestChangesetUpdate();
            }


            //MAKES SURE THAT A CHANGESET POST ID EXISTS
            //=> add a dummy_change to global if if ( 0 === api._lastSavedRevision || _.isEmpty( api.state( 'changesetStatus' )() ) )
            //
            //and that we are not customizing the global skope,
            //it means that the changeset post ID will not be set yet, so let's fire the original
            //The core WP method will only create a new changeset post if there is something to save
            //=> that's the purpose of this dummy_change
            if ( 0 === api._lastSavedRevision || _.isEmpty( api.state( 'changesetStatus' )() ) ) {
                  _global_skope_changes = _.extend( _global_skope_changes, {
                        blogname : { dummy_change : 'dummy_change' }
                  } );
            }

            //POPULATE THE SKOPE CHANGESET UPDATES PROMISES
            //Loop current skopes collection
            //Exclude the global skope
            _.each( api.czr_currentSkopesCollection(), function( _skp ) {
                  if ( 'global' == _skp.skope )
                    return;
                  _skopesToUpdate.push( _skp.id );
            } );

            var _mayBeresolve = function( _index ) {
                  if ( ! _.isUndefined( _skopesToUpdate[ _index + 1 ] ) || _promises.length != _skopesToUpdate.length )
                    return;

                  if ( _.isEmpty( failedPromises ) ) {
                        _recursiveCallDeferred.resolve( _all_skopes_data_ );
                  } else {
                        var _buildResponse = function() {
                                  var _failedResponse = [];
                                  _.each( failedPromises, function( _r ) {
                                        _failedResponse.push( api.czr_skopeBase.buildServerResponse( _r ) );
                                  } );
                                  return $.trim( _failedResponse.join( ' | ') );
                        };
                        _recursiveCallDeferred.reject( _buildResponse() );
                  }
                  return true;
            };


            // recursive pushes for not global skopes
            var recursiveCall = function( _index ) {
                  //on first push run, set the api state to processing.
                  // Make sure that publishing a changeset waits for all changeset update requests to complete.
                  if ( _.isUndefined( _index ) || ( ( 0 * 0 ) == _index ) ) {
                      api.state( 'processing' ).set( 1 );
                  }

                  _index = _index || 0;
                  if ( _.isUndefined( _skopesToUpdate[_index] ) ) {
                        api.consoleLog( 'Undefined Skope in changeset recursive call ', _index, _skopesToUpdate, _skopesToUpdate[_index] );
                        return _recursiveCallDeferred.resolve( _all_skopes_data_ ).promise();
                  }

                  //_promises.push( self.getSubmitPromise( _skopesToUpdate[ _index ] ) );
                  ////@4.9compat : added _args_ param
                  api._requestSkopeChangetsetUpdate( changes, _skopesToUpdate[_index], _args_ )
                        .always( function() { _promises.push( _index ); } )
                        .fail( function( response ) {
                              failedPromises.push( response );
                              api.consoleLog('CHANGESET UPDATE RECURSIVE FAIL FOR SKOPE : ', _skopesToUpdate[_index] );
                              if (  ! _mayBeresolve( _index ) )
                                recursiveCall( _index + 1 );
                        } )
                        .done( function( _skope_data_ ) {
                              _all_skopes_data_.push( _skope_data_ );
                              if (  ! _mayBeresolve( _index ) )
                                recursiveCall( _index + 1 );
                        } );

                  return _recursiveCallDeferred.promise();
            };




            //RESOLVE WITH THE WP GLOBAL CHANGESET PROMISE WHEN ALL SKOPE PROMISES ARE DONE
            //PROBLEM TO SOLVE : in the core original changeset method, the api._lastSavedRevision property is incremented when global dirties are saved
            //=> between the core changeset update and before the skope changeset update, we need to reset the api._lastSavedRevision to its previous value
            //=> otherwise some dirties might not be taken into account in the skope.
            //=> This can happen typically for a setting dirty both in global and other skope(s)
            var _lastSavedRevisionBefore = api._lastSavedRevision;
            //@4.9 compat : added _args_ param

            _original_requestChangesetUpdate( _global_skope_changes, _args_ )
                  .fail( function( r ) {
                        api.consoleLog( 'WP requestChangesetUpdateFail', r, api.czr_skopeBase.buildServerResponse(r) );

                        // Ensure that all settings updated subsequently will be included in the next changeset update request.
                        api._lastSavedRevision = Math.max( api._latestRevision, api._lastSavedRevision );
                        //api.state( 'changesetStatus' ).set( _data_.changeset_status );
                        // Make sure that publishing a changeset waits for all changeset update requests to complete.
                        api.state( 'processing' ).set( 0 );

                        _main_deferred_.reject( r );
                        r = api.czr_skopeBase.buildServerResponse(r);

                        //<@4.9compat>
                        if ( ! _.isUndefined( api.notifications ) ) {
                              api.notifications.add( new wp.customize.Notification( 'changeset_update_failed', {
                                    type: 'error',
                                    message: r,
                                    dismissible: true
                              } ) );

                              // Removed if not dismissed after 5 seconds
                              _.delay( function() {
                                    if ( api.notifications.has( 'changeset_update_failed' ) ) {
                                          var _notif_ = api.notifications( 'changeset_update_failed' );
                                          if ( _notif_.parent ) {
                                                _notif_.parent.remove( _notif_.code );
                                          } else {
                                                _notif_.container.remove();
                                          }
                                    }
                              }, 5000 );
                        }
                        //</@4.9compat>
                        else {
                              api.czr_serverNotification({
                                    status:'error',
                                    message : r
                              });
                      }
                  })
                  .done( function( wp_original_response ) {
                        // $.when.apply( null, _promises ).then( function() {
                        //       _main_deferred_.resolve( wp_original_response );
                        // });
                        //Restore the _lastSavedRevision index to its previous state to not miss any setting that could have been updated by WP for global.

                        //Bail if attempting to update the skope changesets before the initial collection has been populated
                        if ( 'pending' == api.czr_initialSkopeCollectionPopulated.state() )
                          _main_deferred_.resolve( wp_original_response );

                        api._lastSavedRevision = _lastSavedRevisionBefore;
                        recursiveCall()
                              .always( function() {
                                    // Ensure that all settings updated subsequently will be included in the next changeset update request.
                                    api._lastSavedRevision = Math.max( api._latestRevision, api._lastSavedRevision );

                                    //<@4.9compat>
                                    var _dirtyness_ = {};

                                    _.each( api.czr_currentSkopesCollection(), function( _skp ) {
                                          _.each( api.czr_skope( _skp.id ).dirtyValues(), function( _val, _setId ) {
                                              _dirtyness_[_setId] = _val;
                                          });
                                    } );

                                    if ( _.isEmpty( _dirtyness_ ) && _.isEqual( _global_skope_changes, { blogname : { dummy_change : 'dummy_change' } } ) ) {
                                          api.state( 'changesetStatus' ).set( 'auto-draft' == api.state( 'changesetStatus' )() ? '' : api.state( 'changesetStatus' )() );
                                          api.state( 'saved' )(true);
                                    }
                                    //</@4.9compat>

                                    // Make sure that publishing a changeset waits for all changeset update requests to complete.
                                    api.state( 'processing' ).set( 0 );
                              })
                              .fail( function( r ) {
                                    _main_deferred_.reject( r );
                                    api.consoleLog( 'CHANGESET UPDATE RECURSIVE PUSH FAIL', r , _all_skopes_data_ );
                                    api.trigger( 'changeset-error', r );
                                    api.czr_serverNotification( { message: r, status : 'error' } );
                              } )
                              .done( function() {
                                    _main_deferred_.resolve( wp_original_response );
                              });
                  });

            return _main_deferred_.promise();
      };



      //@update the changeset meta for a given skope
      //Adapted copy from the original api.requestChangesetUpdate()
      //@4.9compat : added _args_ param
      api._requestSkopeChangetsetUpdate = function( changes, skope_id, _args_ ) {
            if ( _.isUndefined( skope_id ) || ! api.czr_skope.has( skope_id ) ) {
                  throw new Error( 'In api._requestSkopeChangetsetUpdate() : a valid and registered skope_id must be provided' );
            }

            var deferred = new $.Deferred(),
                request,
                submittedChanges = {},
                data,
                submittedArgs;

            //if no skope has been provided, then let's use the active one
            skope_id = skope_id || api.czr_activeSkopeId();

            //<@4.9compat>
            // Prevent attempting changeset update while request is being made.
            // Disabled
            // if ( 0 !== api.state( 'processing' ).get() ) {
            //   deferred.reject( 'already_processing' );
            //   return deferred.promise();
            // }

            //<@4.9compat>
            submittedArgs = _.extend( {
              title: null,
              date: null,
              autosave: false,
              force: false
            }, _args_ );
            //</@4.9compat>

            if ( changes ) {
                  _.extend( submittedChanges, changes );
            }


            //Ensure all revised settings (changes pending save) are also included, but not if marked for deletion in changes.
            _.each( api.czr_skopeBase.getSkopeDirties( skope_id ) , function( dirtyValue, settingId ) {
                  if ( ! changes || null !== changes[ settingId ] ) {
                        submittedChanges[ settingId ] = _.extend(
                              {},
                              submittedChanges[ settingId ] || {},
                              { value: dirtyValue }
                        );
                  }
            } );


            //  _.each( api.czr_skope( skope_id ).dirtyValues(), function( dirtyValue, settingId ) {
            //       submittedChanges[ settingId ] = _.extend(
            //             { value: dirtyValue }
            //       );
            // } );

            //<@4.9compat>
            // Short-circuit when there are no pending changes.
            if ( ! submittedArgs.force && _.isEmpty( submittedChanges ) && null === submittedArgs.title && null === submittedArgs.date ) {
                  deferred.resolve( {} );
                  return deferred.promise();
            }

            // A status would cause a revision to be made, and for this wp.customize.previewer.save() should be used. Status is also disallowed for revisions regardless.
            if ( submittedArgs.status ) {
              return deferred.reject( { code: 'illegal_status_in_changeset_update' } ).promise();
            }

            // Dates not being allowed for revisions are is a technical limitation of post revisions.
            if ( submittedArgs.date && submittedArgs.autosave ) {
              return deferred.reject( { code: 'illegal_autosave_with_date_gmt' } ).promise();
            }
            //</@4.9compat>

            if ( api._latestRevision <= api._lastSavedRevision ) {
                  deferred.resolve( {} );
                  return deferred.promise();
            }

            // Allow plugins to attach additional params to the settings.
            api.trigger( 'skope-changeset-save', submittedChanges );

            var queryVars = {
                  skope_id : skope_id,
                  action : 'changeset_update',
                  opt_name : api.czr_skope( skope_id ).opt_name
            };

            //BUILD THE QUERY
            data = api.previewer.query( _.extend( queryVars, { excludeCustomizedSaved: true } ) );
            delete data.customized; // Being sent in customize_changeset_data instead.
            _.extend( data, {
                  nonce: api.settings.nonce.save,
                  customize_changeset_data: JSON.stringify( submittedChanges )
            } );

            // var _dumby_request = function( _data ) {
            //     var dfd = $.Deferred();
            //     setTimeout( function() {
            //         dfd.resolve( _data );
            //     }, 5000 );
            //     return dfd.promise();
            // };

            ////////////////////// FIRE THE REQUEST //////////////////////
            //request = _dumby_request( data );
            wp.ajax.post( 'customize_skope_changeset_save', data )
                  .done( function requestChangesetUpdateDone( _data_ ) {
                        //api.consoleLog('SKOPE CHANGETSET DONE FOR SKOPE ' + _data_.skope_id , _data_ );
                        deferred.resolve( _data_ );
                        //api.trigger( 'changeset-saved', _data_ );
                  } )
                  .fail( function requestChangesetUpdateFail( _data_ ) {
                        api.consoleLog('SKOPE CHANGESET FAIL FOR SKOPE ' + _data_.skope_id, _data_ );
                        deferred.reject( _data_ );
                        //api.trigger( 'changeset-error', _data_ );
                  } )
                  .always( function( _data_ ) {
                        if ( ! _.isUndefined( _data_ ) && _data_.setting_validities ) {
                              api._handleSettingValidities( {
                                    settingValidities: _data_.setting_validities,
                                    focusInvalidControl: true
                              } );
                        }
                  } );

            return deferred.promise();
      };
})( wp.customize , jQuery, _ );
( function ( api, $, _ ) {
      /*****************************************************************************
      * FIRE SKOPE ON READY
      *****************************************************************************/
      //this promise will be resolved when
      //1) the initial skopes collection has been populated
      //2) the initial skope has been switched to
      //
      //OR if skope is disabled
      //note : api.czr_skopeReady has been declared earlier, in the early helpers
      api.bind( 'ready' , function() {
            if ( serverControlParams.isSkopOn ) {
                  api.czr_isLoadingSkope  = new api.Value( false );
                  api.czr_isLoadingSkope.bind( function( loading ) {
                        toggleSkopeLoadPane( loading );
                  });
                  api.czr_skopeBase   = new api.CZR_skopeBase();
                  //api.czr_skopeSave   = new api.CZR_skopeSave();
                  api.czr_skopeReset  = new api.CZR_skopeReset();

                  api.trigger('czr-skope-started');

                  //@return void()
                  //This top note will be rendered 40s and self closed if not closed before by the user
                  var _toggleTopFailureNote = function() {
                        api.czr_skopeBase.toggleTopNote( true, {
                              title : serverControlParams.i18n.skope['There was a problem when trying to load the customizer.'],
                              message : [
                                    serverControlParams.i18n.skope['Please refer to'],
                                    '<a href="http://docs.presscustomizr.com/article/285-there-was-a-problem-when-trying-to-load-the-customizer" target="_blank">',
                                    serverControlParams.i18n.skope['this documentation page'],
                                    '</a>',
                                    serverControlParams.i18n.skope['to understand how to fix the problem.']
                              ].join(' '),
                              selfCloseAfter : 40000
                        });
                  };


                  api.czr_skopeReady
                        .done( function() {
                              api.trigger('czr-skope-ready');
                        })
                        .fail( function( error ) {
                              api.errorLog( 'Skope could not be instantiated : ' + error );
                              //This top note will be rendered 40s and self closed if not closed before by the user
                              _toggleTopFailureNote();
                              serverControlParams.isSkopOn = false;
                        })
                        .always( function() {
                              api.czr_isLoadingSkope( false );
                        });

                  //If skope was properly instantiated but there's another problem occuring after, display a self closing top notification after 30 s
                  if ( 'rejected' != api.czr_skopeReady.state() ) {
                        //Make sure the loading icon panel is destroyed after a moment
                        //Typically if there was a problem in the WP js API and the skope could not be initialized
                        //if the skopeReady state is still pending after 40 seconds, there's obviously a problem
                        setTimeout( function() {
                            if ( 'pending' == api.czr_skopeReady.state() )  {
                                  //This top note will be rendered 40s and self closed if not closed before by the user
                                  _toggleTopFailureNote();

                                  api.czr_isLoadingSkope( false );
                            }
                        }, 40000);
                  }
            }

            //let's set a lower autosave interval ( default is 60000 ms )
            if ( serverControlParams.isChangeSetOn ) {
                  api.settings.timeouts.changesetAutoSave = 10000;
            }
      } );

      //INCLUDE THE REVISION COUNT IF WP < 4.7
      if ( ! _.has( api, '_latestRevision') ) {
            /**
             * Current change count.
             */
            api._latestRevision = 0;

            /**
             * Latest revisions associated with the updated setting.
             */
            api._latestSettingRevisions = {};

            /*
             * Keep track of the revision associated with each updated setting so that
             * requestChangesetUpdate knows which dirty settings to include. Also, once
             * ready is triggered and all initial settings have been added, increment
             * revision for each newly-created initially-dirty setting so that it will
             * also be included in changeset update requests.
             */
            api.bind( 'change', function incrementChangedSettingRevision( setting ) {
                  api._latestRevision += 1;
                  api._latestSettingRevisions[ setting.id ] = api._latestRevision;
            } );
            api.bind( 'ready', function() {
                  api.bind( 'add', function incrementCreatedSettingRevision( setting ) {
                        if ( setting._dirty ) {
                              api._latestRevision += 1;
                              api._latestSettingRevisions[ setting.id ] = api._latestRevision;
                        }
                  } );
            } );
      }

      //@fired before skopeReady
      var toggleSkopeLoadPane = function( loading ) {
            loading = _.isUndefined( loading ) ? true : loading;
            var self = this, $skopeLoadingPanel,
                _render = function() {
                      var dfd = $.Deferred();
                      try {
                            _tmpl =  wp.template( 'czr-skope-pane' )({ is_skope_loading : true });
                      } catch( er ) {
                            api.errorLog( 'In toggleSkopeLoadPane : error when parsing the the reset skope template : ' + er );
                            dfd.resolve( false );
                      }
                      $.when( $('#customize-preview').after( $( _tmpl ) ) )
                            .always( function() {
                                  dfd.resolve( $( '#czr-skope-pane' ) );
                            });

                      return dfd.promise();
                },
                _destroy = function() {
                      _.delay( function() {
                            $.when( $('body').removeClass('czr-skope-pane-open') ).done( function() {
                                  _.delay( function() {
                                        $.when( $('body').removeClass('czr-skop-loading') ).done( function() {
                                              if ( false !== $( '#czr-skope-pane' ).length ) {
                                                    setTimeout( function() {
                                                          $( '#czr-skope-pane' ).remove();
                                                    }, 400 );
                                              }
                                        });
                                  }, 200);
                            });
                      }, 50);
                };

            //display load pane if skope is not yet ready and loading is true
            if ( 'pending' == api.czr_skopeReady.state() && loading ) {
                  $('body').addClass('czr-skop-loading');
                  _render()
                        .done( function( $_el ) {
                              $skopeLoadingPanel = $_el;
                        })
                        .then( function() {
                              if ( ! $skopeLoadingPanel.length )
                                return;

                              _.delay( function() {
                                    //set height
                                    var _height = $('#customize-preview').height();
                                    $skopeLoadingPanel.css( 'line-height', _height +'px' ).css( 'height', _height + 'px' );
                                    //display
                                    $('body').addClass('czr-skope-pane-open');
                              }, 50 );
                        });
            }

            api.czr_skopeReady.done( function() {
                  _destroy();
            });
            //if a destroy is requested, typically when the loading delay exceeds 15 seconds
            if ( ! loading ) {
                  _destroy();
            }
      };//toggleSkopeLoadPane

})( wp.customize , jQuery, _);

  //WHAT IS A SKOPE ?
  //A skope is an object describing a set of options for a given customization context
  //It is constructed by the czr_skopeModel constructor
  //it has a model with the following properties
  // - a name : 'global', 'all_posts'
  // - a corresponding database option name
  // - a database option type (dyn_type)
  // - a customization status : active, inactive. Are we currently customizing this skope ?
  // - a priority status that can be forced
  // - an applied status => is this skope the one that will be applied on front end in the current context?
  //  => this status depends on :
  //      1) a default priority local (post id ) > global specific (all posts) > global (default options)
  //      2) a user decision : a priority can be forced. For example who is the winner when two categories have been customized ?
  // - a dirtyness status : has this skope been customized ?
  // - a set of values, each one having a dirtyness state => the  : { optname#2 : { value : ..., _dirty : bool }, optname#2 : {...}, ...  }
  //
  // It is rendered with a view which includes DOM listeners.
  // Users can :
  //  - customize each skope separately,
  //  - force a priority
  //  - reset a skope set of option
  //  - copy the values of one skope to another
  //
  //  What is the default skope ?
  //  - 'global' when accessing the customizer from appearance > customize
  //  - 'local' when customizing from the front end, or an edit screen : post (post, cpt, page, attachment), tax term, user
  //
  //  What are the options eligibile for the skope customization ?
  //  - the skope customization can be applied to all theme settings 'hu_theme_options'. The option not eligible have been flagged 'no-skope' when registered server side.
  //  - the WP built-in settings like blogname, site-icon,... are also eligible
  //  - all other settings like menu, widgets, sidebars are excluded for the moment.
  //
  //  On init, the default skope is set as active.
  //  if the default skope is not 'global', then the switch to the relevant skope is triggered and the eligible settings values are updated "silently"
  //  the dirties are stored in each skope models when the user customize
  //
  //
  //  On skope switch,
  //  1) the values of the dirty values of the current skope are stored in the model
  //  2) the values of the new skope are fetched from the db if they have not been yet.
  //  3) all eligible settings are updated with the new values.
  //  4) if the new skope has no dirty value yet, the saved state is reset.
  //
  //
  //
  //
  //
  // WHAT IS THE SKOPE PRIORITY CONCEPT ?
  // Since a given option can have its value set differently for each skope level, a priority must be defined, in order to know what is the value to use.
  //
  //  => The skope priority defines which option value will be used if this option has been customized in several skopes.
  //
  // There are 3 main levels of skopes :
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
  // Note: except for home, 404 and search which are saved as transients, the other local skopes are saved as metas : post metas, term metas, user metas
  //
  // Priorities without the special group (tag, cat, author):
  //    - For a post, page or term : LOCAL (this post id) > GROUP (all posts)  > GLOBAL (entire website options)
  //    - For home, 404, search : LOCAL > GLOBAL. There's no GROUP in this case.
  //    - for a term archive (tag, cat, custom tax) : LOCAL (the term id) > GROUP ( all terms of this type ) > GLOBAL
  //
  // Priorities with the special groups : this is relevant for post and pages only.
  // Let's take a post example.
  // A user can decide to define a set of option (a skope) for all posts tagged with a specific tag.
  // In this case the priority is : LOCAL > SPECIAL GROUP (the "post tagged with {tag}") > GROUP > GLOBAL
  // CONFLICT CASE : If a given post has several terms, and if more than one term have a customized skope.
  //  => since no priority can be defined between two terms, the priority is back to the default : LOCAL > GROUP > GLOBAL
  // How to fix a conflict case ?
  // It is possible to force a "winner" within the special groups. When editing a skope, the user can check an option (! => force this skope when relevant )
  // => if there's a forced winner the priority becomes : LOCAL > FORCED SPECIAL GROUP > GROUP > GLOBAL
  // In the customizer, only one special group winner can be set at a time.
  // If different winners have been set in separate customization sessions, and that the user add several winners term in the post edit screen, it might happen that
  // a the customizer ends up to have several special group winners. In this case, a conflict notice is displayed in the skope dialog box, explaining how to resolve this
  // winner conflict. As long as the winner conflict is unresolved, the priority falls back to : LOCAL > GROUP > GLOBAL.
  //
  //
  //
  //
  //
  //
  // WHAT IS THE SKOPE INHERITANCE CONCEPT ?
  // In the customizer, all skopes are partially customized => For example, a page can only have specific layout options set
  // The question to adress is then : What about all the un-customized options of this skope? Which value should be applied ?
  //
  // The skope inheritance is the complement of the skope priority.
  // It addresses the problem of which values should be used for un-customized options in a given skope.
  //
  // Taking the same page example, if the "skin" option has not been set locally, then it checks the lower skope priority level.
  // In this case, the previous level is "All Pages".
  // If nothing has been set in the "All Pages", we'll go to the previous one : "Global."
  //
  // In the customizer, this skope inheritance has to be reflected so that user can immediately understand which option is applied to which skope.
  // For a given skope, all un-customized settings will inherit their value from the lower priority levels, down to GLOBAL.
  //
  //
  //
  // HOW DOES THIS WORK ?
  // CZR_skopeBase listens to skope collection changes
  // 1) instantiate new models (CZR_skope), remove old ones and their view
  // 2) sets each skope models active skope state changes


  // CZR_skope
  // 1) instantiate, the skope view (CZR_skopeView)
  // 2) listens to the active state
  //   => store dirtyness on switch
  //   => fetch the db values, build the full set of values ( db + dirties + default) and update the settings

  // CZR_skopeView
  // 1) renders the view
  // 2) listens to model active state
  //   => change the view display elements
  // 3) listen to DOM interactions and set skope values : state, priority

  // @todo in the view, return the $() element to store the view.container




/*****************************************************************************
* THE SKOPE BASE OBJECT
*****************************************************************************/
var CZRSkopeBaseMths = CZRSkopeBaseMths || {};
(function ( api, $, _ ) {
      $.extend( CZRSkopeBaseMths, {

          globalSettingVal : {},//will store the global setting val. Populated on init.

          initialize: function() {
                var self = this;
                ///////////////////// DEFINITIONS /////////////////////
                self.skope_colors = {
                      global : 'rgb(255, 255, 255)',
                      special_group : 'rgba(173, 213, 247, 0.55)',
                      group  : 'rgba(120, 136, 158, 0.12)',// 'rgba(39, 59, 88, 0.12)',// 'rgba(173, 213, 247, 0.55)',
                      local  : 'rgba(187, 211, 247, 0.28)', //rgba(39, 59, 88, 0.28)'// 'rgba(78, 122, 199, 0.35)'
                };
                //Deferred used to make sure the overridden api.previewer.query method has been taken into account
                api.czr_isPreviewerSkopeAware   = $.Deferred();
                //Store the state of the first skope collection state
                api.czr_initialSkopeCollectionPopulated = $.Deferred();
                //store the embed state
                self.skopeWrapperEmbedded       = $.Deferred();

                //the skope instance constructor
                api.czr_skope                   = new api.Values();

                //the czr_skopeCollection stores all skopes instantiated by the user
                //this collection is not updated directly
                //=> it's updated on skope() instance change
                api.czr_skopeCollection         = new api.Value([]);//all available skope, including the current skopes
                //the current skopes collection get updated each time the 'czr-skopes-synced' event is triggered on the api by the preview
                api.czr_currentSkopesCollection = new api.Value([]);


                //the currently active skope
                api.czr_activeSkopeId           = new api.Value();
                //Store the global dirtyness state of the API
                api.czr_dirtyness               = new api.Value( false );
                //store the resetting state
                api.czr_isResettingSkope        = new api.Value( false );

                //Add new state to the api
                api.state.create('switching-skope')( false );

                ///////////////////// SKOPIFY THE API AND THE PANEL /////////////////////
                //REACT TO API DIRTYNESS
                api.czr_dirtyness.callbacks.add( function() { return self.apiDirtynessReact.apply(self, arguments ); } );

                //LOADING ICON DURING INITIAL SKOPE SETUP
                //this api.Value() and its callback are declared in pre_base
                api.czr_isLoadingSkope( true );

                //LISTEN TO EACH API SETTING CHANGES
                // => POPULATE THE DIRTYNESS OF THE CURRENTLY ACTIVE SKOPE
                self.bindAPISettings();

                //LISTEN TO THE API STATES => SET SAVE BUTTON STATE
                //=> this value is set on control and skope reset
                //+ set by wp
                //
                //<@4.9compat>
                // => deactivated for v4.9
                // api.state.bind( 'change', function() {
                //       self.setSaveButtonStates();
                // });
                //</@4.9compat>

                //EMBED THE SKOPE WRAPPER
                //=> WAIT FOR SKOPE TO BE READY api.czr_skopeReady.state == 'resolved'
                api.czr_skopeReady.then( function() {
                      if ( 'pending' == self.skopeWrapperEmbedded.state() ) {
                            $.when( self.embedSkopeWrapper() ).done( function() {
                                  self.skopeWrapperEmbedded.resolve();
                            });
                      }
                });


                ///////////////////// SKOPE COLLECTIONS SYNCHRONISATION AND LISTENERS /////////////////////
                //LISTEN TO SKOPE SYNC => UPDATE SKOPE COLLECTION ON START AND ON EACH REFRESH
                //Will make sure server DB values are always synchronized with the instantiated skopes
                //the sent data look like :
                //{
                //  czr_skopes : _wpCustomizeSettings.czr_skopes || [],
                //  isChangesetDirty : boolean
                // }
                //
                //Bail if skope has not been properly instantiated 'rejected' == api.czr_skopeReady.state()
                api.previewer.bind( 'czr-skopes-synced', function( data ) {
                      if ( ! serverControlParams.isSkopOn || 'rejected' == api.czr_skopeReady.state() ) {
                            return;
                      }
                      //api.consoleLog('czr-skopes-ready DATA', data );
                      var preview = this,
                          previousSkopeCollection = api.czr_currentSkopesCollection();
                      //initialize skopes with the server sent data
                      //if skope has not been initialized yet and the server sent wrong data, then reject the skope ready promise()
                      if ( ! _.has( data, 'czr_skopes') ) {
                            if ( 'resolved' != api.czr_skopeReady.state() ) {
                                  api.czr_skopeReady.reject();
                            }
                            api.errorLog( "On 'czr-skopes-synced' : missing skopes in the server data" );
                            return;
                      }

                      //1) Updated the collection with normalized skopes  => prepareSkopeForAPI + api.czr_currentSkopesCollection( collection )
                      //2) When the api.czr_currentSkopesCollection() Value is set => instantiates the missing skope
                      //3) Set the skope layout view when the skope embedded promise is resolved
                      try {
                            api.czr_skopeBase.updateSkopeCollection( data.czr_skopes , preview.channel() );
                      } catch ( er ) {
                            api.czr_skopeReady.reject( er );
                            return;
                      }

                      //@return void()
                      // => refresh skope notice below the skope switcher title
                      // => refresh bottom skope infos in the preview
                      var _refreshSkopeInfosNotices = function() {
                            //WRITE THE CURRENT SKOPE TITLE
                            self._writeCurrentSkopeTitle();

                            //REFRESH PREVIEW BOTTOM INFOS
                            //the default behaviour is to display the bottom infos block in the preview
                            //and to refresh its content
                            if ( api.czr_bottomInfosVisible() ) {
                                  self.renderBottomInfosTmpl();//<= will build a new bottom skope message infos in the preview based on the new active skopes
                            } else {
                                  //Display + build and render the skope infos
                                  api.czr_bottomInfosVisible( true );
                            }
                      };


                      //Always wait for the initial collection to be populated
                      api.czr_initialSkopeCollectionPopulated.then( function() {
                            var refreshActiveSkope = _.isUndefined( _.findWhere( api.czr_currentSkopesCollection(), {id : api.czr_activeSkopeId() } ) );
                            api.czr_skopeBase.reactWhenSkopeSyncedDone( data ).done( function() {
                                  //if the current active skope has been removed from the current skopes collection
                                  //=> set relevant scope as active. Falls back on 'global'
                                  if ( refreshActiveSkope ) {
                                        try {
                                              api.czr_activeSkopeId( self.getActiveSkopeId() )
                                                    .done( function() {
                                                          if ( 'resolved' != api.czr_skopeReady.state() ) {
                                                                api.czr_skopeReady.resolve( self.getActiveSkopeId() );
                                                          }
                                                          //REFRESH SKOPE INFOS IN TITLE AND PREVIEW FRAME
                                                          _refreshSkopeInfosNotices();
                                                    })
                                                    .fail( function() {
                                                          throw new Error( 'Error when trying to set the active skope after skope synced.' );
                                                    });
                                        } catch ( er ) {
                                              api.errorLog( 'In reactWhenSkopeSyncedDone => api.czr_activeSkopeId() : ' + er );
                                        }
                                  } else if ( ! _.isEmpty( previousSkopeCollection ) ) { //Rewrite the title when the local skope has changed
                                        var _prevLoc = _.findWhere( previousSkopeCollection , { skope : 'local' } ).opt_name,
                                            _newLoc  =_.findWhere( data.czr_skopes, { skope : 'local' } ).opt_name;

                                        if ( _newLoc !== _prevLoc && 'resolved' == api.czr_skopeReady.state() ) {
                                              //REFRESH SKOPE INFOS IN TITLE AND PREVIEW FRAME
                                              _refreshSkopeInfosNotices();
                                        }
                                  }
                            });
                      });
                });


                //CURRENT SKOPE COLLECTION LISTENER
                //The skope collection is set on 'czr-skopes-synced' triggered by the preview
                //setup the callbacks of the skope collection update
                //on init and on preview change : the collection of skopes is populated with new skopes
                //=> instanciate the relevant skope object + render them
                api.czr_currentSkopesCollection.bind( function( to, from ) {
                      return self.currentSkopesCollectionReact( to, from );
                }, { deferred : true });


                //WHEN THE INITIAL SKOPE COLLECTION HAS BEEN POPULATED ( in currentSkopesCollectionReact )
                //LET'S BIND CALLBACKS TO ACTIVE SKOPE AND ACTIVE SECTION
                api.czr_initialSkopeCollectionPopulated.done( function() {
                      //LISTEN AND REACT TO ACTIVE SKOPE UPDATE
                      //api.czr_activeSkopeId.callbacks.add( function() { return self.activeSkopeReact.apply(self, arguments ); } );
                      api.czr_activeSkopeId.bind( function( to, from ) {
                              //Always close the mod option panel if exists
                              if ( _.has( api, 'czr_ModOptVisible') ) {
                                    api.czr_ModOptVisible( false );
                              }
                              return self.activeSkopeReact( to, from ).then( function( _updatedSetIds ) {
                                    api.trigger( 'skope-switched-done',
                                          {
                                                current_skope_id    : to,
                                                previous_skope_id   : from,
                                                updated_setting_ids : _updatedSetIds || []
                                          }
                                    );
                              });
                      }, { deferred : true } );

                      //REACT TO EXPANDED ACTIVE SECTION
                      //=> silently update all eligible controls of this sektion with the current skope values
                      api.czr_activeSectionId.callbacks.add( function() { return self.activeSectionReact.apply(self, arguments ); } );

                      //REACT TO EXPANDED ACTIVE PANEL
                      //=> silently update all eligible controls of this sektion with the current skope values
                      api.czr_activePanelId.callbacks.add( function() { return self.activePanelReact.apply(self, arguments ); } );

                      //GLOBAL SKOPE COLLECTION LISTENER
                      //api.czr_skopeCollection.callbacks.add( function() { return self.globalSkopeCollectionReact.apply(self, arguments ); } );
                });


                //////////////// LISTEN TO SKOPE SWITCH EVENT //////////////////
                //1) reset visibilities
                //2) update control skope notices
                //@args =
                //{
                //  current_skope_id : string
                //  previous_skope_id : string
                //  updated_setting_ids : [] //<= can be empty if no section was expanded
                //}
                api.bind( 'skope-switched-done', function( args ) {
                      args = _.extend(
                            {
                                  current_skope_id : '',
                                  previous_skope_id : '',
                                  updated_setting_ids : []
                            },
                            args
                      );
                      return self.skopeSwitchedDoneReact( args );
                });


                ///////////////////// LISTEN TO THE SERVER /////////////////////
                //SERVER NOTIFICATION SETUP
                api.czr_serverNotification   = new api.Value( {status : 'success', message : '', expanded : true} );
                api.czr_serverNotification.bind( function( to, from ) {
                        self.toggleServerNotice( to );
                });



                ///////////////////// SETUP PREVIEW NOTE AND INFOS BLOCKS /////////////////////
                /// 1) defines observable value to control the block view visibilities
                /// 2) listen to those values state to render / destroy the views
                /// 3) setup DOM listeners inside the views to react on user actions : close block + write an ajax option for example
                self._setupPreviewNotificationsBlocks();//top note and bottom skope infos



                ///////////////////// SKOPE SWITCHER EVENT MAP /////////////////
                self.scopeSwitcherEventMap = [
                      //skope reset : do reset
                      {
                            trigger   : 'click keydown',
                            selector  : '.czr-dismiss-notification',
                            name      : 'dismiss-notification',
                            actions   : function() {
                                  api.czr_serverNotification( { expanded : false } );
                            }
                      },
                      //toggle title notice
                      {
                            trigger   : 'click keydown',
                            selector  : '.czr-toggle-title-notice',
                            name      : 'toggle-title-notice',
                            actions   : function( params ) {
                                  if ( _.isUndefined( self.skopeTitleNoticeVisible ) ) {
                                        self.skopeTitleNoticeVisible = new api.Value( false );
                                        self.skopeTitleNoticeVisible.bind( function( to ) {
                                              params.dom_el.find( '.czr-skope-title')
                                                    .toggleClass( 'notice-visible', to );
                                        });
                                  }

                                  self.skopeTitleNoticeVisible( ! self.skopeTitleNoticeVisible() );
                            }
                      }
                ];

                //Setup DOM user actions when api.czr_skopeReady => self.skopeWrapperEmbedded are resolved
                self.skopeWrapperEmbedded.then( function() {
                      api.CZR_Helpers.setupDOMListeners( self.scopeSwitcherEventMap , { dom_el : $('.czr-scope-switcher') }, self );
                });


                ///////////////////// VARIOUS /////////////////////
                //DECLARE THE LIST OF CONTROL TYPES FOR WHICH THE VIEW IS REFRESHED ON CHANGE
                self.refreshedControls = [ 'czr_cropped_image'];// [ 'czr_cropped_image', 'czr_multi_module', 'czr_module' ];

                //WIDGETS AND SIDEBAR SPECIFIC TREATMENTS
                self.initWidgetSidebarSpecifics();

                //LISTEN TO GLOBAL DB OPTION CHANGES
                //When an option is reset on the global skope,
                //we need to update it in the initially sent _wpCustomizeSettings.settings
                //api.czr_globalDBoptions.callbacks.add( function() { return self.globalDBoptionsReact.apply(self, arguments ); } );


                ///////////////////// LISTEN TO PAINT EVENT /////////////////////
                //The paint event occurs :
                //1) on skope switch
                //2) on sektion expansion
                //3) on panel expansion
                api.bind( 'czr-paint', function( params ) {
                      api.czr_skopeReady.then( function() {
                            self.wash( params ).paint( params );
                      });
                });
          },//initialize

















          /*****************************************************************************
          * EMBED WRAPPER
          *****************************************************************************/
          //fired in initialize
          //=> embed the wrapper for all skope boxes
          //=> add a specific class to the body czr-skop-on
          //=> Listen to skope switch in main title
          embedSkopeWrapper : function() {
                var self = this;
                $('#customize-header-actions').append( $('<div/>', {class:'czr-scope-switcher', html:'<div class="czr-skopes-wrapper"></div>'}) );
                $('body').addClass('czr-skop-on');
                var _eventMap = [
                    //skope switch
                    {
                          trigger   : 'click keydown',
                          selector  : '.czr-skope-switch',
                          name      : 'control_skope_switch',
                          actions   : function( params ) {
                                var _skopeIdToSwithTo = $( params.dom_event.currentTarget, params.dom_el ).attr('data-skope-id');
                                if ( ! _.isEmpty( _skopeIdToSwithTo ) && api.czr_skope.has( _skopeIdToSwithTo ) )
                                  api.czr_activeSkopeId( _skopeIdToSwithTo );
                          }
                    }
                ];
                api.CZR_Helpers.setupDOMListeners( _eventMap , { dom_el : $('.czr-scope-switcher') }, self );
          },









          /*****************************************************************************
          * API DIRTYNESS REACTIONS
          *****************************************************************************/
          //cb of api.czr_dirtyness()
          apiDirtynessReact : function( is_dirty ) {
                $('body').toggleClass('czr-api-dirty', is_dirty );
                api.state( 'saved')( ! is_dirty );
          },









          /*****************************************************************************
          * OVERRIDE SAVE BUTTON STATES : api.state.bind( 'change') callback
          *****************************************************************************/
          //@return void()
          setSaveButtonStates : function() {
                //the 'saving' state was introduced in 4.7
                //For prior versions, let's declare it and add its callback that we need in the api.previewer.save() method
                if ( ! api.state.has('saving') ) {
                      api.state.create('saving');
                      api.state('saving').bind( function( isSaving ) {
                            $( document.body ).toggleClass( 'saving', isSaving );
                      } );
                }
                var saveBtn   = $( '#save' ),
                    closeBtn  = $( '.customize-controls-close' ),
                    saved     = api.state( 'saved'),
                    saving    = api.state( 'saving'),
                    activated = api.state( 'activated' ),
                    changesetStatus = api.state.has('changesetStatus' ) ? api.state( 'changesetStatus' )() : 'auto-draft';

                if ( api.czr_dirtyness() || ! saved() ) {
                      saveBtn.val( api.l10n.save );
                      closeBtn.find( '.screen-reader-text' ).text( api.l10n.cancel );
                } else {
                      saveBtn.val( api.l10n.saved );
                      closeBtn.find( '.screen-reader-text' ).text( api.l10n.close );
                }
                var canSave = ! saving() && ( ! activated() || ! saved() ) && 'publish' !== changesetStatus;
                saveBtn.prop( 'disabled', ! canSave );
          },











          //cb of 'skope-switched-done' event => fired when the api.czr_activeSkopeId().done() <=> refresh is done()
          //1) set the ctrl dependencies in the currently active section
          //2) update ctrl skope notices in the currently active section + expand the ctrl notice if skope is not 'global'
          //3) adds a skope level class to the #customize-controls wrapper
          //@args =
          //{
          //  current_skope_id : string
          //  previous_skope_id : string
          //  updated_setting_ids : [] //<= can be empty if no section was expanded
          //}
          skopeSwitchedDoneReact : function( args ) {
                var self = this,
                    _doWhenSkopeReady = function() {
                          //CURRENTLY EXPANDED SECTION : SET CTRL DEPENDENCIES WHEN POSSIBLE
                          api.czr_CrtlDependenciesReady.then( function() {
                            if ( ! _.isUndefined( api.czr_activeSectionId() ) && ! _.isEmpty( api.czr_activeSectionId() ) ) {
                                  try {
                                        api.czr_ctrlDependencies.setServiDependencies( api.czr_activeSectionId(), null, true );//target sec id, source sec id, refresh
                                  } catch( er ) {
                                        api.errorLog( 'On skope-switched-done : ' + er );
                                  }
                                }
                          });

                          //CURRENTLY EXPANDED SECTION : UPDATE CURRENT SKOPE CONTROL NOTICES AND MAYBE EXPAND THE NOTICE
                          self.updateCtrlSkpNot( api.CZR_Helpers.getSectionControlIds() );

                          //ADD A SKOPE LEVEL CSS CLASS TO THE #customize-controls wrapper
                          if ( api.czr_skope.has( args.previous_skope_id ) ) {
                                $( '#customize-controls' ).removeClass( [ 'czr-', api.czr_skope( args.previous_skope_id )().skope, '-skope-level'].join('') );
                          }
                          if ( api.czr_skope.has( args.current_skope_id ) ) {
                                $( '#customize-controls' ).addClass( [ 'czr-', api.czr_skope( args.current_skope_id )().skope, '-skope-level'].join('') );
                          }

                          //CURRENTLY EXPANDED SECTION
                          //=> Display ctrl notice if skope is not global
                          //=> Hide the reset dialog
                          var _setupSectionControlDialogs = function() {
                                if ( _.isUndefined( api.czr_activeSectionId() ) || _.isEmpty( api.czr_activeSectionId() ) )
                                  return;
                                var ctrls = api.CZR_Helpers.getSectionControlIds( api.czr_activeSectionId()  );
                                _.each( ctrls, function( ctrlId ) {
                                      api.control.when( ctrlId, function() {
                                            var ctrl = api.control( ctrlId );
                                            if ( ! _.has( ctrl, 'czr_states' ) )
                                              return;

                                            ctrl.deferred.embedded.then( function() {
                                                  //Always display the notice when skope is not global
                                                  //=> let user understand where the setting value is coming from
                                                  ctrl.czr_states( 'noticeVisible' )( self.isCtrlNoticeVisible( ctrlId ) );
                                                  ctrl.czr_states( 'resetVisible' )( false );
                                            });
                                      });
                                });
                          };

                          //REFRESH PREVIEW BOTTOM INFOS
                          //on skope switched done, the default behaviour is to display the bottom infos block in the preview
                          //and to refresh its content
                          if ( api.czr_bottomInfosVisible() ) {
                                self.renderBottomInfosTmpl();//<= will build a new bottom skope message infos in the preview based on the new active skopes
                          } else {
                                //Display + build and render the skope infos
                                api.czr_bottomInfosVisible( true );
                          }

                          //Setup control dialogs after a delay on skope switched.
                          //=> the delay is needed for controls that have been re-rendered.
                          _.delay( function() {
                                _setupSectionControlDialogs();
                          }, 500 );
                    };


                //api.consoleLog('SKOPE SWITCHED TO', args.current_skope_id, api.czr_activeSectionId() );
                //Skope is ready when :
                //1) the initial skopes collection has been populated
                //2) the initial skope has been switched to
                api.czr_skopeReady.then( function() {
                      _doWhenSkopeReady();
                });
          },















          //@return void()
          _setupPreviewNotificationsBlocks : function() {
                var self = this;
                ///////////////////// TOP NOTE BLOCK /////////////////////
                api.czr_topNoteVisible = new api.Value( false );
                api.czr_skopeReady.then( function() {
                      api.czr_topNoteVisible.bind( function( visible ) {
                              var noteParams = {},
                                  _defaultParams = {
                                        title : '',
                                        message : '',
                                        actions : '',
                                        selfCloseAfter : 20000
                                  };
                              //noteParams is an object :
                              //{
                              // title : '',
                              // message : '',
                              // actions : fn(),
                              // selfCloseAfter : 20000 in ms
                              //}
                              noteParams = $.extend( _defaultParams , serverControlParams.topNoteParams );

                              //SPECIFIC AJAX ACTION FOR THE WELCOME NOTE
                              noteParams.actions = function() {
                                    var _query = $.extend(
                                          api.previewer.query(),
                                          { nonce:  api.previewer.nonce.save }
                                    );
                                    wp.ajax.post( 'czr_dismiss_top_note' , _query )
                                          .always( function () {})
                                          .fail( function ( response ) { api.consoleLog( 'czr_dismiss_top_note failed', _query, response ); })
                                          .done( function( response ) {});
                              };

                              self.toggleTopNote( visible, noteParams );
                      });

                      //Toggle the top note on initialization
                      _.delay( function() {
                            api.czr_topNoteVisible( ! _.isEmpty( serverControlParams.isTopNoteOn ) || 1 == serverControlParams.isTopNoteOn );
                      }, 2000 );
                });



                ///////////////////// BOTTOM INFOS BLOCK /////////////////////
                api.czr_bottomInfosVisible = new api.Value( false );
                api.czr_skopeReady.then( function() {
                      //Listen to changes
                      api.czr_bottomInfosVisible.bind( function( visible ) {
                              var noteParams = {},
                                  _defaultParams = {
                                        title : '',
                                        message : '',
                                        actions : '',
                                        selfCloseAfter : 20000
                                  };
                              //noteParams is an object :
                              //{
                              // title : '',
                              // message : '',
                              // actions : fn(),
                              // selfCloseAfter : 20000 in ms
                              //}
                              noteParams = $.extend( _defaultParams , {} );

                              return self.toggleBottomInfos( visible, noteParams );//returns a promise()
                      }, { deferred : true } );

                      //never set to true if 'show-skope-infos' is unchecked
                      var _skopeInfosSetId = api.CZR_Helpers.build_setId( 'show-skope-infos' );
                      api.when( _skopeInfosSetId, function( _set_ ){
                            api.czr_bottomInfosVisible.validate = function( value ) {
                                  var _v = _set_(),
                                      _isChecked = 0 !== _v && '0' !== _v && false !== _v && 'off' !== _v;

                                  return _isChecked ? value : false;
                            };

                            //Listen to skope infos setting in admin section
                            _set_.bind( function( visible ) {
                                  api.czr_bottomInfosVisible( 0 !== visible && '0' !== visible && false !== visible && 'off' !== visible );
                            });
                      });



                      //Toggle the top note on initialization
                      _.delay( function() {
                            api.czr_bottomInfosVisible( true );
                      }, 2000 );
                });//api.czr_skopeReady.then()
          }





          //cb of api.czr_globalDBoptions.callbacks
          //update the _wpCustomizeSettings.settings if they have been updated by a reset of global skope, or a control reset of global skope
          //When an option is reset on the global skope, we need to set the new value to default in _wpCustomizeSettings.settings
          // globalDBoptionsReact : function( to, from ) {
          //       var self = this,
          //           resetted_opts = _.difference( from, to );

          //       //reset option case
          //       if ( ! _.isEmpty(resetted_opts) ) {
          //             api.consoleLog( 'HAS RESET OPTIONS', resetted_opts );
          //             //reset each reset setting to its default val
          //             _.each( resetted_opts, function( shortSetId ) {
          //                   var wpSetId = api.CZR_Helpers.build_setId( shortSetId );
          //                   if ( _.has( api.settings.settings, wpSetId) )
          //                     api.settings.settings[wpSetId].value = serverControlParams.defaultOptionsValues[shortSetId];
          //                   self.processSilentUpdates( { refresh : false } );//silently update with no refresh
          //             });
          //       }

          //       //make sure the hasDBValues is synchronized with the server
          //       api.czr_skope( self.getGlobalSkopeId() ).hasDBValues( ! _.isEmpty( to ) );//might trigger cb hasDBValuesReact()
          // }
      });//$.extend()
})( wp.customize , jQuery, _);

var CZRSkopeBaseMths = CZRSkopeBaseMths || {};
(function ( api, $, _ ) {
$.extend( CZRSkopeBaseMths, {

      //callback of api.czr_serverNotification
      //notice is an object :
      //  {
      //    status : 'success',
      //    expanded : true,
      //    message : '',
      //    auto_collapse : false
      //  }
      toggleServerNotice : function( notice ) {
            notice = _.isObject( notice ) ? notice : {};
            notice = _.extend( {
                  status : 'success',
                  expanded : true,
                  message : '',
                  auto_collapse : false
            }, notice );

            //bail for changeset_already_published
            if ( 'changeset_already_published' == notice.message )
              return;

            //bail if not dev mode
            if ( ! serverControlParams.isDevMode )
              return;

            this.serverNoticeEmbedded = this.serverNoticeEmbedded || $.Deferred();

            var self = this,
                _embed = function() {
                      $('.czr-scope-switcher').prepend(
                            $( '<div/>', {
                                  class:'czr-server-notice',
                                  html:'<span class="czr-server-message"></span><span class="fas fa-times-circle czr-dismiss-notification"></span>'
                            } )
                      );
                },
                _toggleNotice = function() {
                      var $notif_wrap         = $( '.czr-server-notice', '.czr-scope-switcher' ),
                          $header             = $('.wp-full-overlay-header'),
                          $sidebar            = $('.wp-full-overlay-sidebar .wp-full-overlay-sidebar-content'),
                          _header_height,
                          _notif_wrap_height,
                          _set_height = function( _h ) {
                                // $header.css( 'height', '');
                                // $sidebar.css( 'top', '' );
                                // if ( _.isUndefined( _h ) )
                                //   return;
                                // $header.css( 'height', _h + 'px' );
                                // $sidebar.css( 'top', _h + 'px' );
                                return true;
                          };

                      //Close the main skope switcher title inheritance infos if exists and opened
                      if ( self.skopeTitleNoticeVisible )
                          self.skopeTitleNoticeVisible( false );

                      if ( ! notice.expanded ) {
                            $notif_wrap
                                  .fadeOut( {
                                        duration : 200,
                                        complete : function() {
                                              //$( this ).css( 'height', 'auto' );
                                  } } );
                            setTimeout( function() {
                                  _set_height();
                            } , 200 );

                      } else {
                            $notif_wrap.toggleClass( 'czr-server-error', 'error' == notice.status );
                            if ( 'error' == notice.status ) {
                                  $('.czr-server-message', $notif_wrap )
                                        .html( _.isEmpty( notice.message ) ? 'Server Problem.' : notice.message );
                            } else {
                                  $('.czr-server-message', $notif_wrap )
                                        .html( _.isEmpty( notice.message ) ? 'Success.' : notice.message );
                            }
                            _notif_wrap_height  = $( '.czr-server-notice', '.czr-scope-switcher' ).outerHeight();
                            _header_height  = $header.outerHeight() + _notif_wrap_height;

                            setTimeout( function() {
                                  $.when( _set_height( _header_height ) ).done( function() {
                                        $notif_wrap
                                        .fadeIn( {
                                              duration : 200,
                                              complete : function() {
                                                    $( this ).css( 'height', 'auto' );
                                        } } );
                                  } );
                            }, 400 );
                      }
                };

            //prepend the wrapper if needed
            if ( 'pending' == self.serverNoticeEmbedded.state() ) {
                  $.when( _embed() ).done( function() {
                        setTimeout( function() {
                              self.serverNoticeEmbedded.resolve();
                              _toggleNotice();
                        }, 200 );
                  });
            } else {
                  _toggleNotice();
            }

            //Always auto-collapse the notification after a custom delay
            _.delay( function() {
                        api.czr_serverNotification( { expanded : false } );
                  },
                  ( 'success' == notice.status || false !== notice.auto_collapse ) ? 4000 : 5000
            );
      },

      //utility : build a server response as a string
      //ready to be displayed in the notifications
      buildServerResponse : function( _r ) {
            var resp = false;
            //server error
            if ( _.isObject( _r ) ) {
                  if ( _.has( _r, 'responseJSON') && ! _.isUndefined( _r.responseJSON.data ) && ! _.isEmpty( _r.responseJSON.data ) ) {
                        resp = _r.responseJSON.data;
                  }
                  // else if ( _.has( _r, 'responseText') && ! _.isEmpty( _r.responseText ) ) {
                  //       try {
                  //             resp = JSON.parse( _r.responseText );
                  //       } catch( e ) {
                  //             resp = 'Server Error';
                  //       }
                  // }
                  else if ( _.has( _r , 'statusText' ) && ! _.isEmpty( _r.statusText ) ) {
                        resp = _r.statusText;
                  }
            }
            if ( _.isObject( _r ) && ! resp ) {
                  try {
                        JSON.stringify( _r );
                  } catch( e ) {
                        resp = 'Server Error';
                  }
            } else if ( ! resp ) {
                  resp = '0' === _r ? 'Not logged in.' : _r;
            } else if ( '-1' === _r ) {
              // Back-compat in case any other check_ajax_referer() call is dying
                  resp = 'Identification issue detected, please refresh your page.';
            }
            return resp;
      }
});//$.extend()
})( wp.customize , jQuery, _);
var CZRSkopeBaseMths = CZRSkopeBaseMths || {};
(function ( api, $, _ ) {
$.extend( CZRSkopeBaseMths, {

      //can be call directly, but is also a callback of api.czr_topNoteVisible, fired on skope base initialize
      //noteParams is an object :
      //{
      // title : '',
      // message : '',
      // actions : fn()
      //}
      toggleTopNote : function( visible, noteParams ) {
            noteParams = _.isObject( noteParams ) ? noteParams : {};
            var self = this,
                _defaultParams = {
                      title : '',
                      message : '',
                      actions : '',
                      selfCloseAfter : 20000
                },
                _renderAndSetup = function() {
                      $.when( self.renderTopNoteTmpl( noteParams ) ).done( function( $_el ) {
                            self.welcomeNote = $_el;
                            //display
                            _.delay( function() {
                                $('body').addClass('czr-top-note-open');
                            }, 200 );
                            api.CZR_Helpers.setupDOMListeners(
                                  [ {
                                        trigger   : 'click keydown',
                                        selector  : '.czr-preview-note-close',
                                        actions   : function() {
                                              _hideAndDestroy().done( function() {
                                                    api.czr_topNoteVisible( false );
                                                    if ( _.isFunction( noteParams.actions ) ) {
                                                          noteParams.actions();
                                                    }
                                              });
                                        }
                                  } ] ,
                                  { dom_el : self.welcomeNote },
                                  self
                            );
                      });
                },
                _hideAndDestroy = function() {
                      var dfd = $.Deferred();
                      $('body').removeClass('czr-top-note-open');
                      if ( self.welcomeNote.length ) {
                            //remove Dom element after slide up
                            _.delay( function() {
                                  self.welcomeNote.remove();
                                  dfd.resolve();
                            }, 300 );
                      } else {
                          dfd.resolve();
                      }
                      return dfd.promise();
                };

            noteParams = $.extend( _defaultParams , noteParams);

            if ( visible ) {
                  _renderAndSetup();
            } else {
                  _hideAndDestroy().done( function() {
                        api.czr_topNoteVisible( false );//should be already false
                  });
            }

            //Always auto-collapse the notification
            _.delay( function() {
                        api.czr_topNoteVisible( false );
                  },
                  noteParams.selfCloseAfter || 20000
            );
      },


      //@param = { note_title  : '', note_message : '' }
      renderTopNoteTmpl : function( params ) {
            if ( $( '#czr-top-note' ).length )
              return $( '#czr-top-note' );

            var self = this,
                _tmpl = '',
                _title = params.title || '',
                _message = params.message || '';

            try {
                  _tmpl =  wp.template( 'czr-top-note' )( { title : _title } );
            } catch( er ) {
                  api.errorLog( 'Error when parsing the the top note template : ' + er );
                  return false;
            }
            $('#customize-preview').after( $( _tmpl ) );
            $('.czr-note-message', '#czr-top-note').html( _message );
            return $( '#czr-top-note' );
      }
});//$.extend()
})( wp.customize , jQuery, _);
var CZRSkopeBaseMths = CZRSkopeBaseMths || {};
(function ( api, $, _ ) {
$.extend( CZRSkopeBaseMths, {
    /*****************************************************************************
    * WORDPRESS API ACTIONS ON INIT
    *****************************************************************************/
    //fired in initialize
    //Listen to each api settings changes
    //1) update the current skope dirties with the user val
    //2) Refresh the controls reset state
    //can be fired when a setting is dynamically added. For example a widget.
    //In this case, the param SetId is not null
    bindAPISettings : function( requestedSetId ) {
          var self = this,
              //This is fired after the WP Core callback : setting.bind( setting.preview );
              _settingChangeReact = function( new_val, old_val, o ) {
                    //"this" is the setting instance
                    var setId = this.id,
                        skope_id;

                    //if skope instantiation went wrong, serverControlParams.isSkopOn has been reset to false
                    //=> that's why we check it here again before doing anything else
                    if ( ! serverControlParams.isSkopOn )
                      return;

                    if ( ! _.has( api, 'czr_activeSkopeId') || _.isUndefined( api.czr_activeSkopeId() ) ) {
                          api.errorLog( 'The api.czr_activeSkopeId() is undefined in the api.czr_skopeBase.bindAPISettings method.');
                          //return;
                    }

                    //For skope eligible settings : Update the skope dirties with the new val of this setId
                    //=> not eligibile skope will update the global skope dirties
                    //=> this has to be kept like this because the global dirties aare being populated with :
                    // api.dirtyValues = function dirtyValues( options ) {
                    //       return api.czr_skopeBase.getSkopeDirties( api.czr_skopeBase.getGlobalSkopeId(), options );
                    // };
                    if ( api( setId )._dirty ) {
                          skope_id = self.isSettingSkopeEligible( setId ) ? api.czr_activeSkopeId() : self.getGlobalSkopeId();
                          api.czr_skope( skope_id ).updateSkopeDirties( setId, new_val );
                    }

                    //collapse any expanded reset modifications if the control is not currently being reset.
                    if ( _.has( api.control(setId), 'czr_states' ) && ! api.control(setId).czr_states( 'isResetting' )() ) {
                          api.control( setId ).czr_states( 'resetVisible' )( false );
                    }

                    //Update the skope inheritance notice for the setting control
                    if ( self.isSettingSkopeEligible( setId ) ) {
                          self.updateCtrlSkpNot( setId );
                    }
              };//_settingChangeReact()

          //if a setting Id is requested
          if ( ! _.isUndefined( requestedSetId ) ) {
                api( requestedSetId ).bind( _settingChangeReact );
          }
          else {
                //parse the current eligible skope settings and write a setting val object
                api.each( function ( _setting ) {
                    _setting.bind( _settingChangeReact );
                });
          }

          //BIND SETTINGS ADDED LATER : Typical example : menus
          var _dynamicallyAddedSettingsReact = function( setting_instance ) {
                if ( setting_instance.callbacks.has( _settingChangeReact ) )
                  return;
                setting_instance.bind( _settingChangeReact );
          };

          if ( ! api.topics.change.has( _dynamicallyAddedSettingsReact ) ) {
                api.bind( 'change', _dynamicallyAddedSettingsReact );
          }
    }
});//$.extend()
})( wp.customize , jQuery, _ );
var CZRSkopeBaseMths = CZRSkopeBaseMths || {};
( function ( api, $, _ ) {
$.extend( CZRSkopeBaseMths, {

    /*****************************************************************************
    * REACT ON SKOPE SYNCED
    *****************************************************************************/
    //Fired on 'czr-skopes-synced'
    //with param :
    //{
    //  czr_skopes : _wpCustomizeSettings.czr_skopes || [],
    //  isChangesetDirty : boolean,
    // }
    reactWhenSkopeSyncedDone : function( server_params ) {
          var self = this, dfd = $.Deferred();
          if ( ! _.has( server_params, 'czr_skopes' ) || _.isEmpty( server_params.czr_skopes ) ) {
                api.errorLog( 'Missing skope data after refresh', server_params );
                return dfd.resolve().promise();
          }
          //API DIRTYNESS UPDATE
          if ( ! api.czr_dirtyness() ) {
                api.czr_dirtyness( _.isBoolean( server_params.isChangesetDirty ) ? server_params.isChangesetDirty : false );
          }

          var _sentSkopeCollection = server_params.czr_skopes;
          //CHANGESET UPDATE
          //always update the changesets of the sent skope collection after a refresh
          //match them with the opt_name, because they don't have an id when emitted from server
          _.each( api.czr_skopeCollection(), function( _skp ) {
                var _sent_skope = _.findWhere( _sentSkopeCollection, { opt_name : _skp.opt_name } );
                //do we have a match based on opt_name with the _sentSkopeCollection ?
                if ( _.isUndefined( _sent_skope ) )
                  return;
                //if so then let's update the skope model with the new db values
                var _changeset_candidate = _.isEmpty( _sent_skope.changeset || {} ) ? {} : _sent_skope.changeset,
                    _api_ready_chgset = {};

                //We only update the changeset with registered setting id
                _.each( _changeset_candidate, function( _val, _setId ) {
                      if ( ! api.has( _setId ) ) {
                            api.consoleLog( 'In reactWhenSkopeSyncedDone : attempting to update the changeset with a non registered setting : ' + _setId );
                      }
                      _api_ready_chgset[_setId] = _val;
                });

                //_new_changeset = $.extend( api.czr_skope( _skp.id ).changesetValues(), _sent_changeset );
                //=> updating the changeset will also trigger a skope dirtyValues() update
                api.czr_skope( _skp.id ).changesetValues( _api_ready_chgset );
          });

          //DB VALUES UPDATE
          //UPDATE EACH SKOPE MODEL WITH THE NEW DB VAL SENT BY THE SERVER
          //The sent skope have no id (because assigned in the api)
          //=> however we can match them with their unique opt_name property
          //then update the skope db values, including the global skope
          _.each( api.czr_skopeCollection(), function( _skp ) {
                var _sent_skope = _.findWhere( _sentSkopeCollection, { opt_name : _skp.opt_name } );
                //do we have a match based on opt_name with the _sentSkopeCollection ?
                if ( _.isUndefined( _sent_skope ) )
                  return;

                //if so then let's update the skope model with the new db values
                var _current_db_vals  = $.extend( true, {}, api.czr_skope( _skp.id ).dbValues() ),
                    _dbVals_candidate = $.extend( _current_db_vals , _sent_skope.db || {} ),
                    _api_ready_dbvals = {};

                //We only update the dbValues with registered setting id
                _.each( _dbVals_candidate, function( _val, _setId ) {
                      if ( ! api.has( _setId ) ) {
                            api.consoleLog( 'In reactWhenSkopeSyncedDone : attempting to update the db values with a non registered setting : ' + _setId );
                      }
                      _api_ready_dbvals[_setId] = _val;
                });


                api.czr_skope( _skp.id ).dbValues( _api_ready_dbvals );
          });
          //introduce a small delay to let the api values be fully updated
          //useful when attempting to refresh the control notices after a save action
          _.delay( function() {
              dfd.resolve();
          }, 500 );
          return dfd.promise();
    }
});//$.extend()
})( wp.customize , jQuery, _ );

var CZRSkopeBaseMths = CZRSkopeBaseMths || {};
( function ( api, $, _ ) {
$.extend( CZRSkopeBaseMths, {

    /*****************************************************************************
    * REACT ON ACTIVE SECTION SETUP DONE
    *****************************************************************************/
    // fired on 'active-section-setup'
    // params looks like : { controls : controls, section_id : section_id }
    _maybeSetupAssignedMenuLocations : function( active_section ) {
          if ( _.isUndefined( active_section ) || _.isEmpty( active_section ) || ! api.section.has( active_section.id ) ) {
                api.consoleLog( 'In _maybeSetupAssignedMenuLocations : no valid section_id provided.');
          }
          var self = this;
          //is this a menu section ? and does it have assigned locations ?
          if ( ! active_section.assignedLocations )
            return;

          //locations is an array of locations for a menu
          //=> we want to synchronize the reset button of this menu location in this section, with the one of the nav_menu_location setting
          var _assignedLocReact = function( locations ) {};

          if ( ! active_section.assignedLocations.callbacks.has( _assignedLocReact ) ) {
                active_section.assignedLocations.bind( _assignedLocReact );
          }
    },



    /*****************************************************************************
    * REACT TO ACTIVE SECTION EXPANSION
    *****************************************************************************/
    //cb of api.czr_activeSectionId()
    activeSectionReact : function( active_sec_id , previous_sec_id ) {
          //PAINT
          if ( 'add_menu' != active_sec_id ) {
                api.trigger('czr-paint', { active_section_id : active_sec_id } );
          }

          var self = this,
              _doReactPrevious = function( previous_sec_id ) {
                    //COLLAPSE ANY RESET DIALOG
                    var controls = api.CZR_Helpers.getSectionControlIds( previous_sec_id  );
                    _.each( controls, function( ctrlId ) {
                          if ( ! api.has( ctrlId ) || _.isUndefined( api.control( ctrlId ) ) )
                            return;
                          var ctrl = api.control( ctrlId );
                          if ( ! _.has( ctrl, 'czr_states' ) )
                            return;

                          ctrl.czr_states( 'resetVisible' )( false );
                    });
              },
              _doReactActive = function( active_section, active_sec_id ) {
                    //PRE RENDER THE CONTROL RESET ICONS + NOTICE
                    self.setupActiveSkopedControls( {
                          section_id : active_sec_id
                    });

                    //PROCESS SILENT UPDATES
                    self.processSilentUpdates( { section_id : active_sec_id  } )
                          .fail( function() {
                                throw new Error( 'Fail to process silent updates after initial skope collection has been populated' );
                          })
                          .done( function() {
                                // var _update_candidates = self._getSilentUpdateCandidates( active_sec_id  );
                                // self.processSilentUpdates( { candidates : _update_candidates } );
                                // //add control single reset + observable values
                                // self.setupActiveSkopedControls();

                                //Always display the notice when skope is not global
                                //=> let user understand where the setting value is coming from
                                var _setupSectionCtrlNotices = function() {
                                      var controls = api.CZR_Helpers.getSectionControlIds( active_sec_id );
                                      _.each( controls, function( ctrlId ) {
                                            if ( ! api.has( ctrlId ) || _.isUndefined( api.control( ctrlId ) ) )
                                              return;
                                            var ctrl = api.control( ctrlId );
                                            if ( ! _.has( ctrl, 'czr_states' ) )
                                              return;
                                            ctrl.czr_states( 'noticeVisible' )( self.isCtrlNoticeVisible( ctrlId ) );
                                      });
                                };

                                //Setup ctrol notices after a delay
                                //=>the delay is needed for controls that have been re-rendered.
                                _.delay( function() {
                                      _setupSectionCtrlNotices();
                                }, 700 );

                                //Sidebar Widget specific
                                if ( ! self.isExcludedSidebarsWidgets() ) {
                                      self.forceSidebarDirtyRefresh( active_sec_id , api.czr_activeSkopeId() );
                                }
                          });

                    //TRIGGER AN OBJECT RICH EVENT
                    //LISTEN TO ACTIVE SECTION SETUP : RESET ICONS + CONTROL NOTICES ARE WRITEEN
                    //=> handles the synchronized assigned locations for menus
                    // 'skoped-controls-setup' is triggered when self.setupActiveSkopedControls()
                    // params looks like : { controls : controls, section_id : section_id }
                    if ( ! _.has( api.topics, 'active-section-setup' ) ) {
                          api.bind( 'active-section-setup', function( params ) {
                                var defaults = {
                                      controls : [],
                                      section_id : ''
                                };
                                params = _.extend( defaults, params );
                                self._maybeSetupAssignedMenuLocations( params );
                          });
                    }

                    //Switch to global skope for not skoped sections
                    api.czr_skopeReady.then( function() {
                          var _switchBack = function( _title ) {
                                //<@4.9compat>
                                if ( ! _.isUndefined( api.notifications ) ) {
                                      api.notifications.add( new wp.customize.Notification( _title, {
                                            type: 'info',
                                            message: [ _title, serverControlParams.i18n.skope['is always customized sitewide.'] ].join(' '),
                                            dismissible: true
                                      } ) );

                                      // Removed if not dismissed after 5 seconds
                                      _.delay( function() {
                                            if ( api.notifications.has( _title ) ) {
                                                  var _notif_ = api.notifications( _title );
                                                  if ( _notif_.parent ) {
                                                        _notif_.parent.remove( _notif_.code );
                                                  } else {
                                                        _notif_.container.remove();
                                                  }
                                            }
                                      }, 5000 );
                                }
                                //</@4.9compat>
                                else {
                                      api.czr_serverNotification({
                                            status:'success',
                                            message : [ _title, serverControlParams.i18n.skope['is always customized sitewide.'] ].join(' ')
                                      });
                                }

                                api.czr_activeSkopeId( self.getGlobalSkopeId() );
                          };
                          //Switch to global skope for not skoped sections
                          if ( 'global' != api.czr_skope( api.czr_activeSkopeId() )().skope ) {
                                if ( self.isExcludedWPCustomCss() && 'custom_css' == active_sec_id ) {
                                      _switchBack( api.section( active_sec_id ).params.title );
                                }
                                if ( _.contains( ['admin_sec', 'tc_font_customizer_settings' ], active_sec_id ) ) {
                                      _switchBack( api.section( active_sec_id ).params.title );
                                }

                                if ( 'nav_menu[' == active_sec_id.substring( 0, 'nav_menu['.length ) || 'add_menu' == active_sec_id ) {
                                      //<@4.9compat>
                                      if ( ! _.isUndefined( api.notifications ) ) {
                                            api.notifications.add( new wp.customize.Notification( 'nav_menus_sitewide', {
                                                  type: 'info',
                                                  message: serverControlParams.i18n.skope['Menus are created sitewide.'],
                                                  dismissible: true
                                            } ) );

                                            // Removed if not dismissed after 5 seconds
                                            _.delay( function() {
                                                  if ( api.notifications.has( 'nav_menus_sitewide' ) ) {
                                                        var _notif_ = api.notifications( 'nav_menus_sitewide' );
                                                        if ( _notif_.parent ) {
                                                              _notif_.parent.remove( _notif_.code );
                                                        } else {
                                                              _notif_.container.remove();
                                                        }
                                                  }
                                            }, 5000 );
                                      }
                                      //</@4.9compat>
                                      else {
                                            api.czr_serverNotification({
                                                  status:'success',
                                                  message : serverControlParams.i18n.skope['Menus are created sitewide.']
                                            });
                                      }
                                }
                          }
                    });

                    //SAY IT
                    api.trigger('active-section-setup', active_section );
              };



          //defer the callback execution when the first skope collection has been populated
          //=> otherwise it might be to early. For example in autofocus request cases.
          api.czr_initialSkopeCollectionPopulated.then( function() {
                api.section.when( active_sec_id , function( active_section ) {
                      //<@4.9compat>
                      // Bail if is opening the publish_setting section
                      if ( 'publish_settings' == active_sec_id )
                        return;
                      //</@4.9compat>
                      active_section.deferred.embedded.then( function() {
                            try { _doReactActive( active_section, active_sec_id ); } catch( er ) {
                                  api.errorLog( 'activeSectionReact => _doReactActive : ' + er );
                            }

                      });
                });
                if ( ! _.isEmpty( previous_sec_id ) && api.section.has( previous_sec_id ) ) {
                      _doReactPrevious( previous_sec_id );
                }
          });
    },


    /*****************************************************************************
    * REACT TO ACTIVE PANEL EXPANSION
    *****************************************************************************/
    //cb of api.czr_activePanelId()
    activePanelReact : function( active_panel_id , previous_panel_id ) {
          var self = this;
          api.czr_initialSkopeCollectionPopulated.then( function() {
                api.trigger('czr-paint', { active_panel_id : active_panel_id } );
                var _switchBack = function( _title ) {
                      //<@4.9compat>
                      if ( ! _.isUndefined( api.notifications ) ) {
                            api.notifications.add( new wp.customize.Notification( _title, {
                                  type: 'info',
                                  message: [ _title, serverControlParams.i18n.skope['is always customized sitewide.'] ].join(' '),
                                  dismissible: true
                            } ) );

                            // Removed if not dismissed after 5 seconds
                            _.delay( function() {
                                  if ( api.notifications.has( _title ) ) {
                                        var _notif_ = api.notifications( _title );
                                        if ( _notif_.parent ) {
                                              _notif_.parent.remove( _notif_.code );
                                        } else {
                                              _notif_.container.remove();
                                        }
                                  }
                            }, 5000 );
                      }
                      //</@4.9compat>
                      else {
                            api.czr_serverNotification({
                                  status:'success',
                                  message : [ _title, serverControlParams.i18n.skope['is always customized sitewide.'] ].join(' ')
                            });
                      }

                      api.czr_activeSkopeId( self.getGlobalSkopeId() );
                };

                //Display a notifictation skoped panels
                api.czr_skopeReady.then( function() {
                      if ( 'global' != api.czr_skope( api.czr_activeSkopeId() )().skope ) {
                            if ( self.isExcludedSidebarsWidgets() && 'widgets' == active_panel_id ) {
                                  //<@4.9compat>
                                  if ( ! _.isUndefined( api.notifications ) ) {
                                        api.notifications.add( new wp.customize.Notification( 'widgets_are_sitewide', {
                                              type: 'info',
                                              message: serverControlParams.i18n.skope['Widgets are created sitewide.'],
                                              dismissible: true
                                        } ) );

                                        // Removed if not dismissed after 5 seconds
                                        _.delay( function() {
                                              if ( api.notifications.has( 'widgets_are_sitewide' ) ) {
                                                    var _notif_ = api.notifications( 'widgets_are_sitewide' );
                                                    if ( _notif_.parent ) {
                                                          _notif_.parent.remove( _notif_.code );
                                                    } else {
                                                          _notif_.container.remove();
                                                    }
                                              }
                                        }, 5000 );
                                  }
                                  //</@4.9compat>
                                  else {
                                        api.czr_serverNotification({
                                              status:'success',
                                              message : serverControlParams.i18n.skope['Widgets are created sitewide.']
                                        });
                                  }
                                  //_switchBack( api.panel( active_panel_id ).params.title );
                            }
                      }
                });

                //Silently update all sections of the nav_menus panel each time it's switch to
                //=> fixes the problem of locations not being refreshd below the menu titles
                api.czr_skopeReady.then( function() {
                      if ( 'nav_menus' == active_panel_id ) {
                            _.each( api.panel( active_panel_id ).sections(), function( _sec ) {
                                  //PROCESS SILENT UPDATES
                                  self.processSilentUpdates( { section_id : _sec.id, awake_if_not_active : true } );
                            });
                      }
                });
          });
    }
});//$.extend()
})( wp.customize , jQuery, _ );
/*****************************************************************************
* THE SKOPE BASE OBJECT
*****************************************************************************/
var CZRSkopeBaseMths = CZRSkopeBaseMths || {};
( function ( api, $, _ ) {
$.extend( CZRSkopeBaseMths, {

    /*****************************************************************************
    * PAINT AND WASH
    *****************************************************************************/
    //fired on 'czr-paint'
    //params = {
    //  active_panel_id : '',
    //  active_section_id : '',
    //  is_skope_switch : false
    //}
    wash : function( params ) {
          var self = this,
              //@param element = { el : ${}, color : string }
              _do_wash = function( element ) {
                    if ( ! _.has( element, 'el') || ! element.el.length )
                      return;
                    $.when( element.el.removeClass('czr-painted') ).done( function() {
                          $(this).css( 'background', '' ).css('color', '');
                    });
              };
          if ( api.czr_skopeBase.paintedElements ) {
                _.each( api.czr_skopeBase.paintedElements(), function( _el ) { _do_wash( _el ); } );
                api.czr_skopeBase.paintedElements( [] );
          }
          return this;
    },

    //fired on 'czr-paint'
    //params = {
    //  active_panel_id : '',
    //  active_section_id : '',
    //  is_skope_switch : false
    //}
    paint : function( params ) {
          var _bgColor = 'inherit',
              defaults = {
                    active_panel_id : api.czr_activePanelId(),
                    active_section_id : api.czr_activeSectionId(),
                    is_skope_switch : false
              },
              _paint_candidates = [];
          params = $.extend( defaults, params );

          if ( ! _.isUndefined( api.czr_activeSkopeId() ) && api.czr_skope.has( api.czr_activeSkopeId() ) ) {
                  _bgColor = api.czr_skope( api.czr_activeSkopeId() ).color;
          }

          //@param element = { el : ${}, color : string }
          var _do_paint = function( element ) {
                if ( ! _.has( element, 'el') || ! element.el.length )
                  return;
                //If is skope switch, add a css class to handle a smoother background color transition
                if ( params.is_skope_switch ) {
                      $.when( element.el.addClass('czr-painted') ).done( function() {
                            $(this).css( 'background', element.bgColor || _bgColor );
                      });
                } else {
                      element.el.css( 'background', element.bgColor || _bgColor );
                }
                //paint text in dark for accessibility when skope background is not white ( == not global skope )
                if ( 'global' != api.czr_skope( api.czr_activeSkopeId() )().skope ) {
                       element.el.css( 'color', '#000');
                }

          };

          api.czr_skopeBase.paintedElements = api.czr_skopeBase.paintedElements || new api.Value( [] );

          //CASE 1 : NO ACTIVE PANEL, NO ACTIVE SECTION => WE ARE ON ROOT
          if ( _.isEmpty( params.active_panel_id ) && _.isEmpty( params.active_section_id ) ) {
                _paint_candidates.push( {
                      el : $( '#customize-info' ).find('.accordion-section-title').first()
                });
                api.panel.each( function( _panel ) {
                      // _panel.container.css('background', _bgColor );
                      _paint_candidates.push( {
                            el : _panel.container.find( '.accordion-section-title').first()
                      });
                });
                //Also include orphaned sections that have no panel assigned
                //=> example front page content
                api.section.each( function( _section ) {
                      if ( ! _.isEmpty( _section.panel() ) )
                        return;
                      _paint_candidates.push( {
                            el : _section.container.find( '.accordion-section-title').first()
                      });
                });
          }

          //CASE 2 : ACTIVE PANEL, NO ACTIVE SECTION => WE ARE IN A PANEL ROOT
          if ( ! _.isEmpty( params.active_panel_id ) && _.isEmpty( params.active_section_id ) ) {
                api.panel.when( params.active_panel_id , function( active_panel ) {
                      active_panel.deferred.embedded.then( function() {
                            //active_panel.container.css('background', _bgColor );
                            _paint_candidates.push( {
                                  el : active_panel.container.find( '.accordion-section-title, .customize-panel-back' )
                            });
                      });
                });
          }

          //CASE 3 : ACTIVE SECTION
          if ( ! _.isEmpty( params.active_section_id ) ) {
                api.section.when( params.active_section_id , function( active_section ) {
                      active_section.deferred.embedded.then( function() {
                            _paint_candidates.push(
                                  {
                                        el : active_section.container.find( '.customize-section-title, .customize-section-back' ),
                                        bgColor : 'inherit'
                                  },
                                  {
                                        el : active_section.container
                                  }
                            );
                            //for WP < 4.7
                            if ( ! api.czr_isChangeSetOn() ) {
                                  _paint_candidates.push(
                                        {
                                              el : active_section.container.find('.accordion-section-content')
                                        }
                                  );
                            }
                      });
                });
          }

          //PROCESS PAINT AND POPULATE THE VALUE
          _.each( _paint_candidates, function( _el ) { _do_paint( _el ); } );
          api.czr_skopeBase.paintedElements( _paint_candidates );
          return this;
    }
});//$.extend()
})( wp.customize , jQuery, _ );
var CZRSkopeBaseMths = CZRSkopeBaseMths || {};
(function ( api, $, _ ) {
$.extend( CZRSkopeBaseMths, {

      //can be call directly, but the recommend way is to use api.czr_bottomInfosVisible, fired on skope base initialize, for which the following method is a callback
      //noteParams is an object :
      //{
      // title : '',
      // message : '',
      // actions : fn()
      //}
      toggleBottomInfos : function( visible, noteParams ) {
            noteParams = _.isObject( noteParams ) ? noteParams : {};
            var self = this,
                dfd = $.Deferred(),
                _defaultParams = {
                      title : '',
                      message : '',
                      actions : '',
                      selfCloseAfter : 20000
                },
                _skopeInfosSetId = api.CZR_Helpers.build_setId('show-skope-infos'),
                _renderAndSetup = function() {
                      var _dfd = $.Deferred();
                      //Render and setup DOM listeners
                      $.when( self.renderBottomInfosTmpl( noteParams ) )
                            .done( function( $_el ) {
                                  self.bottomInfosContainer = $_el;
                                  //Reveal and resolve
                                  _.delay( function() {
                                        $('body').addClass('czr-bottom-infos-open');
                                        _dfd.resolve();
                                  }, 200 );

                                  //setup DOM listeners
                                  api.CZR_Helpers.setupDOMListeners(
                                        [
                                              {
                                                    trigger   : 'click keydown',
                                                    selector  : '.czr-preview-note-close',
                                                    actions   : function() {
                                                          _hideAndDestroy().done( function() {
                                                                api.czr_bottomInfosVisible( false );
                                                                if ( _.isFunction( noteParams.actions ) ) {
                                                                      noteParams.actions();
                                                                }
                                                          });
                                                    }
                                              },
                                              //skope switch
                                              {
                                                    trigger   : 'click keydown',
                                                    selector  : '.czr-skope-switch',
                                                    actions   : function( params ) {
                                                          var _skopeIdToSwithTo = $( params.dom_event.currentTarget, params.dom_el ).attr('data-skope-id');
                                                          if ( ! _.isEmpty( _skopeIdToSwithTo ) && api.czr_skope.has( _skopeIdToSwithTo ) )
                                                            api.czr_activeSkopeId( _skopeIdToSwithTo );
                                                    }
                                              },
                                              {
                                                    trigger   : 'click keydown',
                                                    selector  : '.czr-disable-bottom-infos',
                                                    actions   : function( params ) {
                                                          if ( api.control.has( _skopeInfosSetId ) ) {
                                                                api.control( _skopeInfosSetId ).focus();
                                                          }
                                                    }
                                              }
                                        ] ,
                                        { dom_el : self.bottomInfosContainer },
                                        self
                                  );
                            })
                            .fail( function() {
                                  _dfd.resolve();
                            });
                      return _dfd.promise();
                },
                _hideAndDestroy = function() {
                      return $.Deferred( function() {
                            var _dfd_ = this;
                            $('body').removeClass('czr-bottom-infos-open');
                            if ( self.bottomInfosContainer.length ) {
                                  //remove and reset
                                  _.delay( function() {
                                        self.bottomInfosContainer.remove();
                                        self.bottomInfosContainer = false;
                                        _dfd_.resolve();
                                  }, 300 );
                            } else {
                                _dfd_.resolve();
                            }
                      });
                };


            noteParams = $.extend( _defaultParams , noteParams);

            if ( visible ) {
                  _renderAndSetup().always( function() {
                        dfd.resolve();
                  });
            } else {
                  _hideAndDestroy().done( function() {
                        api.czr_bottomInfosVisible( false );//should be already false
                        dfd.resolve();
                  });
            }

            //Always auto-collapse the infos block
            // _.delay( function() {
            //             api.czr_bottomInfosVisible( false );
            //       },
            //       noteParams.selfCloseAfter || 20000
            // );
            return dfd.promise();
      },


      //@param = { note_title  : '', note_message : '' }
      renderBottomInfosTmpl : function( params ) {
            params = params || {};
            var self = this,
                _tmpl = '',
                _skope_id = api.czr_activeSkopeId();

            //Don't go further if the current skope is not registered yet
            if ( ! api.czr_skope.has( _skope_id ) || ! _.isObject( api.czr_skope( _skope_id )() ) )
              return false;

            var _skope_title = api.czr_skope( _skope_id )().long_title,
                _ctxTitle = api.czr_skope( _skope_id )().ctx_title;

            _skope_title = _.isString( _skope_title ) ? _skope_title : '';
            _ctxTitle = _.isString( _ctxTitle ) ? _ctxTitle : '';

            var _title = params.title || ['Customizing', _ctxTitle.toLowerCase() ].join(' '),
                _message = params.message || self._getSkopeInfosMessage( _skope_id ),
                _renderTmpl = function() {
                      return $.Deferred( function() {
                            var dfd = this;
                            try {
                                  _tmpl =  wp.template( 'czr-bottom-infos' )( { title : _title } );
                                  $('#customize-preview').after( $( _tmpl ) );
                                  dfd.resolve();
                            } catch( er ) {
                                  api.errorLog( 'Error when parsing the the bottom infos template : ' + er );
                                  dfd.reject( er );
                            }
                      });
                };

            //on initial rendering, print the template
            if ( _.isUndefined( this.bottomInfosContainer ) || 1 != this.bottomInfosContainer.length ) {
                  _renderTmpl().done( function() {
                        $('.czr-note-message', '#czr-bottom-infos').html( _message );
                  });
            } else {
                  $('.czr-note-content', self.bottomInfosContainer ).fadeOut({
                        duration : 'fast',
                        complete : function() {
                              $( 'h2', self.bottomInfosContainer ).html( [ '&middot;', _title, '&middot;' ].join(' ') );
                              $('.czr-note-message', self.bottomInfosContainer ).html( _message );
                              $(this).fadeIn('fast');
                        }
                  });

            }
            return ( this.bottomInfosContainer && 1 == this.bottomInfosContainer.length ) ? this.bottomInfosContainer : $( '#czr-bottom-infos' );
      },


      //@return html string
      //a skope is described by the following properties :
      // color:"rgba(39, 59, 88, 0.28)"
      // ctx_title:"Home"
      // dyn_type:"skope_meta"
      // id:"local_home"
      // is_forced:false
      // is_winner:true
      // level:"home"
      // long_title:"Options for home"
      // obj_id:"home"
      // opt_name:"hueman_czr_home"
      // skope:"local"
      // title:"Options for home"
      _getSkopeInfosMessage : function( skope_id ) {
            skope_id = skope_id || api.czr_activeSkopeId();
            var _localSkopeId = _.findWhere( api.czr_currentSkopesCollection(), { skope : 'local' } ).id;

            //Paranoid but, always bail if :
            //1) the current skope id is not registered,
            //2) the skope is not an object
            //3) the local skope is undefined
            if ( ! api.czr_skope.has( skope_id ) || ! _.isObject( api.czr_skope( skope_id )() ) || _.isUndefined( _localSkopeId ) )
              return '';

            var self = this,
                _skpLevel = api.czr_skope( skope_id )().skope,
                _inheritedFrom = self.getInheritedSkopeTitles(),
                _overrides = self.getOverridenSkopeTitles(),
                _localCtxTitle = api.czr_skope( _localSkopeId )().ctx_title,//<= the context title is always the one of the local skope
                current_title = api.czr_skope( skope_id )().long_title,//ex : Options for home
                _html;

            switch( _skpLevel ) {
                    case 'global' :
                          _html = [
                                serverControlParams.i18n.skope['The customizations made site wide are inherited by all other levels of customization.'],
                                '<br/>',
                                serverControlParams.i18n.skope['The current context'],
                                ['(', _localCtxTitle, ')'].join(' '),
                                serverControlParams.i18n.skope['can be customized more specifically at the following level'] + '(s)',
                                ':',
                                _overrides + '.'
                          ].join(' ');
                    break;
                    case 'group' :
                          _html = [
                                serverControlParams.i18n.skope['The current customizations will be applied to'],
                                api.czr_skope( skope_id )().ctx_title.toLowerCase() + '.',
                                '<br/>',
                                serverControlParams.i18n.skope['The options not customized at this level will inherit their value from'],
                                _inheritedFrom,
                                '.<br/>',
                                serverControlParams.i18n.skope['The current context'],
                                ['(', _localCtxTitle, ')'].join(' '),
                                serverControlParams.i18n.skope['can be customized more specifically at the following level'],
                                ':',
                                _overrides + '.'
                          ].join(' ');
                    break;
                    case 'local' :
                          _html = [
                                serverControlParams.i18n.skope['The current context'],
                                ['(', _localCtxTitle, ')'].join(' '),
                                serverControlParams.i18n.skope['can be customized with a specific set of options.'],
                                '<br/>',
                                serverControlParams.i18n.skope['The options not customized at this level will inherit their value from'],
                                _inheritedFrom + '.'
                          ].join(' ');
                    break;
            }

            return $.trim( [
                  '<span class="czr-skope-bottom-infos">',
                    _html,
                    '</span>'
            ].join(' ') );

            // return $.trim( [
            //       '<span class="czr-skope-bottom-infos">',
            //         serverControlParams.i18n.skope['In this context :'],
            //         _.isEmpty( _inheritedFrom ) ? ' ' : serverControlParams.i18n.skope['inherits from'],
            //         _inheritedFrom,
            //         _.isEmpty( _inheritedFrom ) ? '' : _.isEmpty( _overrides ) ? '.' : [',' , serverControlParams.i18n.skope['and'] ].join(' '),
            //         _.isEmpty( _overrides ) ? ' ' : serverControlParams.i18n.skope['overridden by'],
            //         _overrides,
            //         _.isEmpty( _overrides ) ? '</span>' : '.</span>'
            // ].join(' ') );
      }
});//$.extend()
})( wp.customize , jQuery, _);
var CZRSkopeBaseMths = CZRSkopeBaseMths || {};
( function ( api, $, _ ) {
$.extend( CZRSkopeBaseMths, {

    /*****************************************************************************
    * HELPERS
    *****************************************************************************/
    //@return bool
    isSkopeRegisteredInCollection : function( skope_id, collection ) {
          var self = this;
          collection = collection || api.czr_skopeCollection();
          return ! _.isUndefined( _.findWhere( collection, { id : skope_id } ) );
    },

    //@return bool
    isSkopeRegisteredInCurrentCollection : function( skope_id, collection ) {
          var self = this;
          collection = collection || api.czr_currentSkopesCollection();
          return ! _.isUndefined( _.findWhere( collection, { id : skope_id } ) );
    },

    //@return bool
    isGlobalSkopeRegistered : function() {
          var _model = _.findWhere( api.czr_currentSkopesCollection(), { skope : 'global'} );
          return _.isObject( _model ) && _.has( _model, 'id' );
    },

    //@return string
    getGlobalSkopeId : function() {
          if ( ! _.has(api, 'czr_skope') )
            return '';
          var id = '';
          api.czr_skope.each( function(skp){
              if ( 'global' == skp().skope )
                id = skp().id;
          });
          return id;
    },

    //after a saved action, the 'global' option might have changed
    //=> this method, return only the changed db values
    getChangedGlobalDBSettingValues : function( serverGlobalDBValues ) {
          var _changedDbVal = {};

          _.each( serverGlobalDBValues, function( _val, _setId ){
              _wpSetId = api.CZR_Helpers.build_setId( _setId);

              if ( ! _.has( api.settings.settings, _wpSetId ) )
                return;
              if ( _.isEqual( _val , api.settings.settings[ _wpSetId ].value ) )
                return;
              _changedDbVal[_setId] = _val;
          });
          return _changedDbVal;
    },


    //@return the current active skope id
    //If server send isLocalSkope = true, then try to activate the local skope
    //Fallbacks on global
    getActiveSkopeId : function( _current_skope_collection ) {
          _current_skope_collection = _current_skope_collection || api.czr_currentSkopesCollection();

          var _currentSkopeLevel, _newSkopeCandidate, _skpId;
          if ( ! _.isEmpty( api.czr_activeSkopeId() ) && api.czr_skope.has( api.czr_activeSkopeId() ) ) {
                _currentSkopeLevel = api.czr_skope( api.czr_activeSkopeId() )().skope;
          } else if ( serverControlParams.isLocalSkope ) {
                _currentSkopeLevel = 'local';
          } else {
                _currentSkopeLevel = 'global';
          }

          _newSkopeCandidate = _.findWhere( _current_skope_collection, { skope : _currentSkopeLevel } );

          _skpId = ! _.isUndefined( _newSkopeCandidate ) ? _newSkopeCandidate.id : _.findWhere( _current_skope_collection, { skope : 'global' } ).id;

          if ( _.isUndefined( _skpId ) ) {
                throw new Error( 'No default skope was found in getActiveSkopeId ', _current_skope_collection );
          }

          // _.each( _current_skope_collection, function( _skop ) {
          //       _active_candidates[ _skop.skope ] = _skop.id;
          // });

          // //Apply a basic skope priority. => @todo refine this treatment
          // if ( _.has( _active_candidates, 'local' ) )
          //   return _active_candidates.local;
          // if ( _.has( _active_candidates, 'group' ) )
          //   return _active_candidates.group;
          // if ( _.has( _active_candidates, 'special_group' ) )
          //   return active_candidates.special_group;
          return _skpId;
          //return _.findWhere( _current_skope_collection, { skope : 'global' } ).id;
    },

    //@return a skope name string : local, group, special_group, global
    getActiveSkopeName : function() {
          if ( ! api.czr_skope.has( api.czr_activeSkopeId() ) )
            return 'global';
          return api.czr_skope( api.czr_activeSkopeId() )().skope;
    },


    //@return boolean
    //! important : the setId param must be the full name. For example : hu_theme_option[color-1]
    isSettingSkopeEligible : function( setId ) {
          var self = this,
              shortSetId = api.CZR_Helpers.getOptionName( setId );

          if( _.isUndefined( setId ) || ! api.has( setId ) ) {
            api.consoleLog( 'THE SETTING ' + setId + ' IS NOT ELIGIBLE TO SKOPE BECAUSE UNDEFINED OR NOT REGISTERED IN THE API.' );
            return false;
          }
          //exclude :
          //widget controls
          //sidebars
          //menu settings
          //active_theme
          if ( self.isExcludedWPBuiltinSetting( setId ) )
            return false;
          //skopeExcludedSettings look like ( short IDs ) :
          //{
          //   //short ids of theme settings
          //   'post-comments',
          //   'page-comments',
          //   'layout-home',
          //
          //   //protected theme settings
          //   'ver'
          //
          //   //wp builtins
          //   'show_on_front',
          //   'page_on_front',
          // }
          if ( _.contains( serverControlParams.skopeExcludedSettings, shortSetId ) ) {
            //api.consoleLog( 'THE SETTING ' + setId + ' IS NOT ELIGIBLE TO SKOPE BECAUSE PART OF THE EXCLUDED LIST.' );
            return false;
          } else if ( self.isThemeSetting( setId ) ) {
            return true;
            //api.consoleLog( 'THE SETTING ' + setId + ' IS NOT ELIGIBLE TO SKOPE BECAUSE NOT PART OF THE THEME OPTIONS AND NOT WP AUTHORIZED BUILT IN OPTIONS' );
          } else
           return true;
    },


    //@return boolean
    //! important : the setId param must be the full name. For example : hu_theme_option[color-1]
    isSettingResetEligible : function( setId ) {
          var self = this,
              shortSetId = api.CZR_Helpers.getOptionName( setId );

          if( _.isUndefined( setId ) || ! api.has( setId ) ) {
            api.consoleLog( 'THE SETTING ' + setId + ' IS NOT ELIGIBLE TO RESET BECAUSE UNDEFINED OR NOT REGISTERED IN THE API.' );
            return;
          }
          //exclude widget controls and menu settings and sidebars
          if ( self.isExcludedWPBuiltinSetting( setId ) )
            return;
          if ( ! self.isThemeSetting( setId ) && ! self.isWPAuthorizedSetting( setId ) ) {
            api.consoleLog( 'THE SETTING ' + setId + ' IS NOT ELIGIBLE TO RESET BECAUSE NOT PART OF THE THEME OPTIONS AND NOT WP AUTHORIZED BUILT IN OPTIONS' );
          } else
           return true;
    },

    //@return bool
    isThemeSetting : function( setId ) {
          return _.isString( setId ) && -1 !== setId.indexOf( serverControlParams.themeOptions );
    },

    //@return bool
    isWPAuthorizedSetting : function( setId ) {
          return _.isString( setId ) && _.contains( serverControlParams.wpBuiltinSettings, setId );
    },

    //@return boolean
    isExcludedWPBuiltinSetting : function( setId ) {
          var self = this;
          if ( _.isUndefined(setId) )
            return true;
          if ( 'active_theme' == setId )
            return true;
          //allow the list of server defined settings
          if ( _.contains( serverControlParams.wpBuiltinSettings, setId ) )
            return false;

          //exclude the WP built-in settings like sidebars_widgets*, widget_*, custom_css
          //specifics for nav_menus:
          //1) exclude always :
          //nav_menu[* => each menu created
          //nav_menu_item => the items of the menus
          //nav_menus_created_posts
          //2) exclude maybe :
          //nav_menu_locations
          var _patterns = [ 'widget_', 'nav_menu', 'sidebars_', 'custom_css', 'nav_menu[', 'nav_menu_item', 'nav_menus_created_posts', 'nav_menu_locations' ],
              _isExcld = false;
          _.each( _patterns, function( _ptrn ) {
                switch( _ptrn ) {
                      case 'widget_' :
                      case 'sidebars_' :
                            if ( _ptrn == setId.substring( 0, _ptrn.length ) ) {
                                  _isExcld = self.isExcludedSidebarsWidgets();
                            }
                      break;

                      case 'nav_menu[' :
                      case 'nav_menu_item' :
                      case 'nav_menus_created_posts' :
                            if ( _ptrn == setId.substring( 0, _ptrn.length ) ) {
                                  _isExcld = true;
                            }
                      break;

                      case 'nav_menu_locations' :
                            if ( _ptrn == setId.substring( 0, _ptrn.length ) ) {
                                  _isExcld = self.isExcludedNavMenuLocations();
                            }
                      break;

                      case 'custom_css' :
                            if ( _ptrn == setId.substring( 0, _ptrn.length ) ) {
                                  _isExcld = self.isExcludedWPCustomCss();
                            }
                      break;


                }
          });
          return _isExcld;
    },

    //@return bool
    isExcludedSidebarsWidgets : function() {
          var _servParam = serverControlParams.isSidebarsWigetsSkoped;//can be a boolean or a string "" for false, "1" for true
          return ! ( ! _.isUndefined( _servParam ) && ! _.isEmpty( _servParam ) && false !== _servParam );
    },

    //@return bool
    isExcludedNavMenuLocations : function() {
          //Nav menu location are not well supported before 4.7 => potential infinite refresh
          if ( ! api.czr_isChangeSetOn() )
            return true;
          var _servParam = serverControlParams.isNavMenuLocationsSkoped;//can be a boolean or a string "" for false, "1" for true
          return ! ( ! _.isUndefined( _servParam ) && ! _.isEmpty( _servParam ) && false !== _servParam );
    },

    //@return bool
    isExcludedWPCustomCss : function() {
          var _servParam = serverControlParams.isWPCustomCssSkoped;//can be a boolean or a string "" for false, "1" for true
          return ! ( ! _.isUndefined( _servParam ) && ! _.isEmpty( _servParam ) && false !== _servParam );
    },


    //return the current db value for a pair setId / skope_id
    _getDBSettingVal : function( setId, skope_id  ) {
          var shortSetId = api.CZR_Helpers.getOptionName(setId),
              wpSetId = api.CZR_Helpers.build_setId(setId);
          if ( ! api.czr_skope.has( skope_id ) ) {
                api.consoleLog( '_getDBSettingVal : the requested skope id is not registered : ' + skope_id );
                return '_no_db_val';
          }
          if ( _.has( api.czr_skope( skope_id ).dbValues(), wpSetId ) ) {
                return api.czr_skope( skope_id ).dbValues()[wpSetId];
          } else if ( _.has( api.czr_skope( skope_id ).dbValues(), shortSetId ) ) {
                return api.czr_skope( skope_id ).dbValues()[shortSetId];
          } else {
                return '_no_db_val';
          }
    },


    //@return {} of dirties
    //@options object { unsaved: boolean } was introduced with the changeset in WP 4.7.
    //=> the goal is to only get the api dirties that have not yet been saved in the changeset.
    getSkopeDirties : function( skope_id, options ) {
          if ( ! api.czr_skope.has( skope_id ) )
            return {};

          //the already saved settings are excluded from the skope dirties by default
          //=> the "real" customized values will be re-built server side anyway, by merging $_POST and changeset data, either on refresh or save.
          options = options || {};
          options = _.extend( { unsaved : true }, options );

          var values = {};
          //each skope stores its API dirties in an observable value : dirtyValues()
          _.each( api.czr_skope( skope_id ).dirtyValues(), function( _val, _setId ) {
                var settingRevision;
                //since 4.7 and the changeset, only the settings not yet saved in the db changeset are returned
                if ( api.czr_isChangeSetOn() ) {
                      settingRevision = api._latestSettingRevisions[ _setId ];
                      // Skip including settings that have already been included in the changeset, if only requesting unsaved.
                      if ( api.state( 'changesetStatus' ).get() && ( options && options.unsaved ) && ( _.isUndefined( settingRevision ) || settingRevision <= api._lastSavedRevision ) ) {
                            //api.consoleLog( 'DIRTIES : ' + _setId + ' will be excluded from dirties because last revision was : ' + settingRevision + ' == to last saved revision : ' + api._lastSavedRevision );
                            return;
                      }
                }
                values[ _setId ] = _val;
          } );
          return values;
    },

    getSkopeExcludedDirties : function() {
          //ARE THERE DIRTIES IN THE WP API ?
          var self = this,
              _wpDirties = {};
          api.each( function ( value, setId ) {
                if ( value._dirty ) {
                  _wpDirties[ setId ] = value();
                }
          } );

          //ARE THERE DIRTIES IN THE GLOBAL SKOPE
          var _globalSkopeId = self.getGlobalSkopeId(),
              _globalSkpDirties = self.getSkopeDirties( _globalSkopeId );

          //RETURN THE _wpDirties not present in the global skope dirties
          return _.omit( _wpDirties, function( _value, setId ) {
              //var shortOptName = api.CZR_Helpers.getOptionName( setId );
              return self.isSettingSkopeEligible( setId );
          } );
    },

    /**
   * @param {String} widgetId
   * @returns {Object}
   */
    parseWidgetId : function( widgetId, prefixToRemove ) {
        var matches, parsed = {
          number: null,
          id_base: null
        };

        matches = widgetId.match( /^(.+)-(\d+)$/ );
        if ( matches ) {
          parsed.id_base = matches[1];
          parsed.number = parseInt( matches[2], 10 );
        } else {
          // likely an old single widget
          parsed.id_base = widgetId;
        }

        if ( ! _.isUndefined( prefixToRemove ) )
          parsed.id_base = parsed.id_base.replace( prefixToRemove , '');
        return parsed;
    },

    /**
     * @param {String} widgetId
     * @returns {String} settingId
     */
    widgetIdToSettingId: function( widgetId , prefixToRemove ) {
        var parsed = this.parseWidgetId( widgetId, prefixToRemove ), settingId;

        settingId = parsed.id_base;
        if ( parsed.number ) {
          settingId += '[' + parsed.number + ']';
        }
        return settingId;
    },




    isWidgetRegisteredGlobally : function( widgetId ) {
        var self = this;
            registered = false;
        _.each( _wpCustomizeWidgetsSettings.registeredWidgets, function( _val, _short_id ) {
            if ( ! registered && 'widget_' + self.widgetIdToSettingId(_short_id) == widgetId )
              registered = true;
        } );
        return registered;
    }
});//$.extend
})( wp.customize , jQuery, _ );
var CZRSkopeBaseMths = CZRSkopeBaseMths || {};
( function ( api, $, _ ) {
$.extend( CZRSkopeBaseMths, {

    getAppliedPrioritySkopeId : function( setId, skope_id ) {
          if ( ! api.has( api.CZR_Helpers.build_setId(setId) ) ) {
                api.errorLog( 'getAppliedPrioritySkopeId : the requested setting id does not exist in the api : ' + api.CZR_Helpers.build_setId(setId) );
                return skope_id;
          }
          if ( ! api.czr_skope.has( skope_id ) ) {
                api.errorLog( 'getAppliedPrioritySkopeId : the requested skope id is not registered : ' + skope_id );
                return skope_id;
          }

          //Are we already in the 'local' skope ?
          var self = this,
              _local_skope_id = _.findWhere( api.czr_currentSkopesCollection(), { skope : 'local' } ).id;

          if ( _.isUndefined( _local_skope_id ) || skope_id == _local_skope_id )
            return skope_id;

          //start from local and do the salmon until either :
          //1) a value is found
          //2) the requested skope id is reached in the hierarchy
          var _salmonToMatch = function( _skp_id ) {
                var wpSetId = api.CZR_Helpers.build_setId( setId ),
                    val_candidate = '___',
                    skope_model = api.czr_skope( _skp_id )(),
                    initial_val;

                if ( _skp_id == skope_id )
                  return skope_id;

                //is the setting API dirty ?
                if ( api.czr_skope( _skp_id ).getSkopeSettingAPIDirtyness( wpSetId ) )
                  return skope_model.id;

                //is the setting CHANGESET dirty ?
                if ( api.czr_isChangeSetOn() ) {
                      if ( api.czr_skope( _skp_id ).getSkopeSettingChangesetDirtyness( wpSetId ) )
                        return skope_model.id;
                }

                //do we have a db val stored ?
                var _skope_db_val = self._getDBSettingVal( setId, _skp_id);
                if ( _skope_db_val != '_no_db_val' ) {
                      return skope_model.id;
                }
                //if we are already in the final 'local' skope, then let's return its value
                else if( 'global' == skope_model.skope ) {
                      // if ( _.isNull(initial_val) ) {
                      //   throw new Error('INITIAL VAL IS NULL FOR SETTING ' + setId + ' CHECK IF IT HAS BEEN DYNAMICALLY ADDED. IF SO, THERE SHOULD BE A DIRTY TO GRAB');
                      // }
                      return skope_model.id;
                }
                else {
                      //if not dirty and no db val, then let's recursively apply the inheritance
                      return '___' != val_candidate ? skope_model.title : _salmonToMatch( self._getParentSkopeId( skope_model ) );
                }
          };
          return _salmonToMatch( _local_skope_id );
    },

    //@return string : the skope title from which a setting id inherits its current value
    getOverridenSkopeTitles : function() {
          var skope_id = skope_id || api.czr_activeSkopeId();
          if ( ! api.czr_skope.has( skope_id ) ) {
                api.errorLog( 'getInheritedSkopeTitles : the requested skope id is not registered : ' + skope_id );
                return '';
          }
           //Are we already in the 'local' skope ?
          var self = this,
              _local_skope_id = _.findWhere( api.czr_currentSkopesCollection(), { skope : 'local' } ).id;

          if ( _.isUndefined( _local_skope_id ) || skope_id == _local_skope_id )
            return '';

          //start from local and do the salmon
          var _salmonToMatch = function( _skp_id, _skp_ids ) {
                _skp_ids = _skp_ids || [];
                var skope_model = api.czr_skope( _skp_id )();

                if ( _skp_id == skope_id )
                  return _skp_ids;
                _skp_ids.unshift( _skp_id );
                return _salmonToMatch( self._getParentSkopeId( skope_model ), _skp_ids );
          };

          return _.map( _salmonToMatch( _local_skope_id ), function( id ) {
                return self.buildSkopeLink( id );
          }).join( ' ' + serverControlParams.i18n.skope['and'] + ' ' );
    },


    //@return the skope title from which a setting id inherits its current value
    getInheritedSkopeId : function( setId, skope_id ) {
          if ( ! api.has( api.CZR_Helpers.build_setId(setId) ) ) {
                api.errorLog( 'getInheritedSkopeId : the requested setting id does not exist in the api : ' + api.CZR_Helpers.build_setId(setId) );
                return skope_id;
          }
          if ( ! api.czr_skope.has( skope_id ) ) {
                api.errorLog( 'getInheritedSkopeId : the requested skope id is not registered : ' + skope_id );
                return skope_id;
          }

          var self = this,
              wpSetId = api.CZR_Helpers.build_setId( setId ),
              val_candidate = '___',
              skope_model = api.czr_skope( skope_id )(),
              initial_val;
          //initial val
          //some settings like widgets may be dynamically added. Therefore their initial val won't be stored in the api.settings.settings
          if ( _.has( api.settings.settings, wpSetId ) )
            initial_val = api.settings.settings[wpSetId].value;
          else
            initial_val = null;

          //is the setting API dirty ?
          if ( api.czr_skope( skope_id ).getSkopeSettingAPIDirtyness( wpSetId ) )
            return skope_id;

          //is the setting CHANGESET dirty ?
          if ( api.czr_isChangeSetOn() ) {
                if ( api.czr_skope( skope_id ).getSkopeSettingChangesetDirtyness( wpSetId ) )
                  return skope_id;
          }

          //do we have a db val stored ?
          var _skope_db_val = self._getDBSettingVal( setId, skope_id );
          if ( _skope_db_val != '_no_db_val' )
            return skope_id;
          //if we are already in the final 'global' skope, then let's return its value
          else if( 'global' == skope_model.skope ) {
            // if ( _.isNull(initial_val) ) {
            //   throw new Error('INITIAL VAL IS NULL FOR SETTING ' + setId + ' CHECK IF IT HAS BEEN DYNAMICALLY ADDED. IF SO, THERE SHOULD BE A DIRTY TO GRAB');
            // }
            return skope_id;
          }
          else
            //if not dirty and no db val, then let's recursively apply the inheritance
            return '___' != val_candidate ?skope_id : self.getInheritedSkopeId( setId, self._getParentSkopeId( skope_model ) );
    },


    //@return the skope title from which a setting id inherits its current value
    //@return string
    getInheritedSkopeTitles : function( skope_id, skope_ids ) {
          skope_id = skope_id || api.czr_activeSkopeId();
          if ( ! api.czr_skope.has( skope_id ) ) {
                api.errorLog( 'getInheritedSkopeTitles : the requested skope id is not registered : ' + skope_id );
                return '';
          }
          skope_ids = skope_ids || [];
          var self = this,
              skope_model = api.czr_skope( skope_id )();

          if ( skope_id !== api.czr_activeSkopeId() )
              skope_ids.unshift( skope_id );

          if ( 'global' !== skope_model.skope )
              return self.getInheritedSkopeTitles( self._getParentSkopeId( skope_model ), skope_ids );

          return _.map( skope_ids, function( id ) {
                return self.buildSkopeLink( id );
          }).join(' ' + serverControlParams.i18n.skope['and'] + ' ');
    },

    //@return string
    buildSkopeLink : function( skope_id ) {
          if ( ! api.czr_skope.has( skope_id ) ) {
                api.errorLog( 'buildSkopeLink : the requested skope id is not registered : ' + skope_id );
                return '';
          }
          var _link_title = [ serverControlParams.i18n.skope['Switch to scope'], api.czr_skope( skope_id )().title ].join(' : ');
          return [
                '<span class="czr-skope-switch" title=" ' + _link_title + '" data-skope-id="' + skope_id + '">',
                api.czr_skope( skope_id )().title,
                '</span>'
          ].join( '' );
    },


    //@return boolean
    //isAllowedWPBuiltinSetting :

    //performs a recursive inheritance to get a setId Val for a given skope
    //@return an api setting value
    getSkopeSettingVal : function( setId, skope_id ) {
          if ( ! api.has( api.CZR_Helpers.build_setId(setId) ) ) {
                api.errorLog( 'getSkopeSettingVal : the requested setting id does not exist in the api : ' + api.CZR_Helpers.build_setId(setId) );
                return null;
          }
          if ( ! api.czr_skope.has( skope_id ) ) {
                api.errorLog( 'getSkopeSettingVal : the requested skope id is not registered : ' + skope_id );
                return null;
          }

          var self = this,
              wpSetId = api.CZR_Helpers.build_setId( setId ),
              val_candidate = '___',
              skope_model = api.czr_skope( skope_id )(),
              initial_val;

          //initial val
          //some settings like widgets may be dynamically added. Therefore their initial val won't be stored in the api.settings.settings
          if ( _.has( api.settings.settings, wpSetId ) )
            initial_val = api.settings.settings[wpSetId].value;
          else
            initial_val = null;

          //is the setting API dirty ?
          if ( api.czr_skope( skope_id ).getSkopeSettingAPIDirtyness( wpSetId ) )
            return api.czr_skope( skope_id ).dirtyValues()[ wpSetId ];

          //is the setting CHANGESET dirty ?
          if ( api.czr_isChangeSetOn() ) {
                if ( api.czr_skope( skope_id ).getSkopeSettingChangesetDirtyness( wpSetId ) )
                  return api.czr_skope( skope_id ).changesetValues()[ wpSetId ];
          }

          //do we have a db val stored ?
          var _skope_db_val = self._getDBSettingVal( setId, skope_id );
          if ( _skope_db_val != '_no_db_val' )
            return _skope_db_val;
          //if we are already in the final 'global' skope, then let's return its value
          else if( 'global' == skope_model.skope ) {
            // if ( _.isNull(initial_val) ) {
            //   throw new Error('INITIAL VAL IS NULL FOR SETTING ' + setId + ' CHECK IF IT HAS BEEN DYNAMICALLY ADDED. IF SO, THERE SHOULD BE A DIRTY TO GRAB');
            // }
            return '___' == val_candidate ? initial_val : val_candidate;
          }
          else
            //if not dirty and no db val, then let's recursively apply the inheritance
            return '___' != val_candidate ? val_candidate : self.getSkopeSettingVal( setId, self._getParentSkopeId( skope_model ) );
    },


    //implement the skope inheritance to build the dirtyCustomized
    //@recursive
    applyDirtyCustomizedInheritance : function( dirtyCustomized, skope_id ) {
          skope_id = skope_id || api.czr_activeSkopeId() || api.czr_skopeBase.getGlobalSkopeId();
          dirtyCustomized = dirtyCustomized || {};

          var self = this,
              skope_model = api.czr_skope( skope_id )();

          if ( 'global' == skope_model.skope )
            return dirtyCustomized;

          var parent_skope_id = self._getParentSkopeId( skope_model ),
              parent_dirties = api.czr_skope( parent_skope_id ).dirtyValues();

          //use the parent dirty value if the current skope setId is not dirty and has no db val
          _.each( parent_dirties, function( _val, wpSetId ){
                var shortSetId = api.CZR_Helpers.getOptionName( wpSetId );
                if ( _.isUndefined( dirtyCustomized[wpSetId] ) && _.isUndefined( api.czr_skope( skope_model.id ).dbValues()[shortSetId] ) )
                    dirtyCustomized[wpSetId] = _val;
          });
          return 'global' == api.czr_skope( parent_skope_id )().skope ? dirtyCustomized : self.applyDirtyCustomizedInheritance( dirtyCustomized, parent_skope_id );
    },



    //@return the parent skope id of a given skope within the collections of currentSkopes
    //recursive
    _getParentSkopeId : function( skope_model, _index ) {
          var self = this,
              hierark = ['local', 'group', 'special_group', 'global'],
              parent_skope_ind = _index || ( _.findIndex( hierark, function( _skp ) { return skope_model.skope == _skp; } ) + 1 ) * 1,
              parent_skope_skope = hierark[ parent_skope_ind ];

          if ( _.isUndefined( parent_skope_skope ) ) {
              return _.findWhere( api.czr_currentSkopesCollection(), { skope : 'global' } ).id;
          }

          //=> the inheritance is limited to current set of skopes
          if ( _.isUndefined( _.findWhere( api.czr_currentSkopesCollection(), { skope : parent_skope_skope } ) ) ) {
              return self._getParentSkopeId( skope_model, parent_skope_ind + 1 );
          }
          return _.findWhere( api.czr_currentSkopesCollection(), { skope : parent_skope_skope } ).id;
    },


    //@return the parent skope id of a given skope within the collections of currentSkopes
    //recursive
    _getChildSkopeId : function( skope_model, _index ) {
          var self = this,
              hierark = ['local', 'group', 'special_group', 'global'],
              child_skope_ind = _index || ( _.findIndex( hierark, function( _skp ) { return skope_model.skope == _skp; } ) - 1 ) * 1,
              child_skope_skope = hierark[ child_skope_ind ];

          if ( _.isUndefined( child_skope_skope ) ) {
              return _.findWhere( api.czr_currentSkopesCollection(), { skope : 'local' } ).id;
          }

          //=> the inheritance is limited to current set of skopes
          if ( _.isUndefined( _.findWhere( api.czr_currentSkopesCollection(), { skope : child_skope_skope } ) ) ) {
              return self._getParentSkopeId( skope_model, child_skope_ind - 1 );
          }
          return _.findWhere( api.czr_currentSkopesCollection(), { skope : child_skope_skope } ).id;
    }

});//$.extend
})( wp.customize , jQuery, _ );
var CZRSkopeBaseMths = CZRSkopeBaseMths || {};
( function ( api, $, _ ) {
$.extend( CZRSkopeBaseMths, {

    //Fired on 'czr-skopes-synced' triggered by the preview, each time the preview is refreshed.
    //On a Save Action, api.czr_savedDirties has been populated =>
    // 1) check if the server sends the same saved values
    // 2) update the skope db properties with the latests saved ones
    //
    //A skope candidate is structured this way :
    //{
    // changeset : Object
    // color:"rgb(255, 255, 255)"
    // db:Object
    // dyn_type:"option"
    // has_db_val:true
    // id:""
    // is_forced:false
    // is_primary:true
    // is_winner:false
    // level:"_all_"
    // long_title:"Site wide options"
    // obj_id:""
    // opt_name:"hu_theme_options"
    // skope:"global"
    // title:"Site wide options"
    //}
    //@see api_overrides
    updateSkopeCollection : function( sent_collection, sent_channel ) {
          //api.consoleLog('UPDATE SKOPE COLLECTION', sent_collection, sent_channel );
          var self = this;
              _api_ready_collection = [];

          //normalize each sent skopes
          _.each( sent_collection, function( _skope, _key ) {
                var skope_candidate = $.extend( true, {}, _skope );//deep clone to avoid any shared references
                _api_ready_collection.push( self.prepareSkopeForAPI( skope_candidate ) );
          });

          //keep the global skope unchanged
          //=> this is required because the server always sends an empty set of db options for the global skope, unlike the other skopes
          if ( self.isGlobalSkopeRegistered() ) {
                var _updated_api_ready_collection = [],
                    _global_skp_model = $.extend( true, {}, api.czr_skope( self.getGlobalSkopeId() )() );

                _.each( _api_ready_collection, function( _skp, _k ) {
                      if ( 'global' == _skp.skope )
                        _updated_api_ready_collection.push( _global_skp_model );
                      else
                        _updated_api_ready_collection.push( _skp );
                });
                _api_ready_collection = _updated_api_ready_collection;
          }

          //set the new collection of current skopes
          //=> this will instantiate the not instantiated skopes
          api.czr_currentSkopesCollection( _api_ready_collection );
    },


    //@param skope_candidate
    ////A skope candidate is structured this way :
    //{
    // changeset : Object
    // color:"rgb(255, 255, 255)"
    // db:Object
    // dyn_type:"option"
    // has_db_val:true
    // id:""
    // is_forced:false
    // is_primary:true
    // is_winner:false
    // level:"_all_"
    // long_title:"Site wide options"
    // obj_id:""
    // opt_name:"hu_theme_options"
    // skope:"global"
    // title:"Site wide options"
    //}
    prepareSkopeForAPI : function( skope_candidate ) {
          if ( ! _.isObject( skope_candidate ) ) {
              throw new Error('prepareSkopeForAPI : a skope must be an object to be API ready');
          }
          var self = this,
              api_ready_skope = {};

          _.each( serverControlParams.defaultSkopeModel , function( _value, _key ) {
                var _candidate_val = skope_candidate[_key];
                switch( _key ) {
                      case 'title' :
                            if ( ! _.isString( _candidate_val ) ) {
                                throw new Error('prepareSkopeForAPI : a skope title property must a string');
                            }
                            api_ready_skope[_key] = _candidate_val;
                      break;
                      case 'long_title' :
                            if ( ! _.isString( _candidate_val ) ) {
                                throw new Error('prepareSkopeForAPI : a skope title property must a string');
                            }
                            api_ready_skope[_key] = _candidate_val;
                      break;
                      case 'ctx_title' :
                            if ( ! _.isString( _candidate_val ) ) {
                                throw new Error('prepareSkopeForAPI : a skope context title property must a string');
                            }
                            api_ready_skope[_key] = _candidate_val;
                      break;
                      case 'skope' :
                            if ( ! _.isString( _candidate_val ) || _.isEmpty( _candidate_val ) ) {
                                throw new Error('prepareSkopeForAPI : a skope "skope" property must a string not empty');
                            }
                            api_ready_skope[_key] = _candidate_val;
                      break;
                      case 'level' :
                            if ( ! _.isString( _candidate_val ) || _.isEmpty( _candidate_val ) ) {
                                throw new Error('prepareSkopeForAPI : a skope level must a string not empty for skope ' + _candidate_val.skope );
                            }
                            api_ready_skope[_key] = _candidate_val;
                      break;
                      case 'dyn_type' :
                            if ( ! _.isString( _candidate_val ) || ! _.contains( serverControlParams.skopeDynTypes, _candidate_val ) ) {
                                throw new Error('prepareSkopeForAPI : missing or invalid dyn type for skope ' + skope_candidate );
                            }
                            api_ready_skope[_key] = _candidate_val;
                      break;
                      case 'opt_name' :
                            if ( ! _.isString( _candidate_val ) || _.isEmpty( _candidate_val ) ) {
                                throw new Error('prepareSkopeForAPI : invalid "opt_name" property for skope ' + _candidate_val.skope );
                            }
                            api_ready_skope[_key] = _candidate_val;
                      break;
                      case 'obj_id' :
                            if ( ! _.isString( _candidate_val ) ) {
                                throw new Error('prepareSkopeForAPI : invalid "obj_id" for skope ' + _candidate_val.skope );
                            }
                            api_ready_skope[_key] = _candidate_val;
                      break;
                      case  'is_winner' :
                            if ( ! _.isUndefined( _candidate_val) && ! _.isBoolean( _candidate_val )  ) {
                                throw new Error('prepareSkopeForAPI : skope property "is_winner" must be a boolean');
                            }
                            api_ready_skope[_key] = _candidate_val;
                      break;
                      case  'is_forced' :
                            if ( ! _.isUndefined( _candidate_val) && ! _.isBoolean( _candidate_val )  ) {
                                throw new Error('prepareSkopeForAPI : skope property "is_primary" must be a boolean');
                            }
                            api_ready_skope[_key] = _candidate_val;
                      break;
                      //when the global db values have been changed, typically on save,
                      //the 'db' property will store the difference between api.settings.settings and the db options server generated
                      case  'db' :
                            if ( _.isArray( _candidate_val ) || _.isEmpty( _candidate_val ) )
                              _candidate_val = {};
                            if ( _.isUndefined( _candidate_val) || ! _.isObject( _candidate_val ) ) {
                                throw new Error('prepareSkopeForAPI : skope property "db" must be an object');
                            }
                            api_ready_skope[_key] = _candidate_val;
                      break;
                      case  'changeset' :
                            if ( _.isArray( _candidate_val ) || _.isEmpty( _candidate_val ) )
                              _candidate_val = {};
                            if ( _.isUndefined( _candidate_val) || ! _.isObject( _candidate_val ) ) {
                                throw new Error('prepareSkopeForAPI : skope property "changeset" must be an object');
                            }
                            api_ready_skope[_key] = _candidate_val;
                      break;
                      case  'has_db_val' :
                            if ( ! _.isUndefined( _candidate_val) && ! _.isBoolean( _candidate_val )  ) {
                                throw new Error('prepareSkopeForAPI : skope property "has_db_val" must be a boolean');
                            }
                            api_ready_skope[_key] = _candidate_val;
                      break;
                }//switch
          });

          //Assign a color based on the hiearchy level
          api_ready_skope.color = self.skope_colors[ api_ready_skope.skope ] || 'rgb(255, 255, 255)';

          //Finally, generate the id and the title
          api_ready_skope.id = api_ready_skope.skope + '_' + api_ready_skope.level;
          if ( ! _.isString( api_ready_skope.id ) || _.isEmpty( api_ready_skope.id ) ) {
                throw new Error('prepareSkopeForAPI : a skope id must a string not empty');
          }
          if ( ! _.isString( api_ready_skope.title ) || _.isEmpty( api_ready_skope.title ) ) {
                api_ready_skope.title = id;
                api_ready_skope.long_title = id;
          }
          return api_ready_skope;
    },


    //cb of api.czr_currentSkopesCollection.callbacks
    //fired in initialize
    currentSkopesCollectionReact : function( to, from ) {
          var self = this,
              _new_collection = $.extend( true, [], to ) || [],
              _old_collection = $.extend( true, [], from ) || [],
              dfd = $.Deferred();

          //what are the skope to instantiate ?
          //=>on init, instantiate them all
          //=>on refresh, instantiate the new ones and remove the non relevant
          var _to_instantiate = [];
              _to_remove = [];
              _to_update = [];
              _instantiateAndEmbed = function( _candidates_ ) {
                    //Instantiate the new skopes
                    //api.consoleLog('SKOPES TO INSTANTIATE?', _to_instantiate );
                    _.each( _candidates_, function( _skope ) {
                          _skope = $.extend( true, {}, _skope );//use a cloned skop to instantiate : @todo : do we still need that ?
                          api.czr_skope.add( _skope.id , new api.CZR_skope( _skope.id , _skope ) );
                    });

                    //Then embed the not ready ones
                    //=> we need to do that after the instantiaion of the entire new collection, because a skope instance my need to get other skope instances when embedded
                    _.each( _candidates_, function( _skope ) {
                          //fire this right after instantiation for the views (we need the model instances in the views)
                          if ( ! api.czr_skope.has( _skope.id ) ) {
                              throw new Error( 'Skope id : ' + _skope.id + ' has not been instantiated.');
                          }
                          if ( 'pending' == api.czr_skope( _skope.id ).isReady.state() ) {
                                api.czr_skope( _skope.id ).ready();
                          }
                    });
              };

          //BUILD THE CANDIDATES TO INSTANTIATE
          _.each( _new_collection, function( _sent_skope ) {
                if ( ! api.czr_skope.has( _sent_skope.id  ) )
                  _to_instantiate.push( _sent_skope );
          });

          //TRY TO INSTANTIATE
          try {
                _instantiateAndEmbed( _to_instantiate );
          } catch( er ) {
                api.errorLog( "currentSkopesCollectionReact : " + er );
                return dfd.resolve().promise();
          }


          //SET THE CONTEXTUALLY ACTIVE SKOPES VISIBILITY AND LAYOUT WHEN skopeReady and skopeWrapperEmbedded
          //Which skopes are visible ?
          //=> the ones sent by the preview
          var _setActiveAndLayout = function() {
                var _activeSkopeNum = _.size( _new_collection ),
                    _setLayoutClass = function( _skp_instance ) {
                          //remove previous layout class
                          var _newClasses = _skp_instance.container.attr('class').split(' ');
                          _.each( _skp_instance.container.attr('class').split(' '), function( _c ) {
                                if ( 'width-' == _c.substring( 0, 6) ) {
                                      _newClasses = _.without( _newClasses, _c );
                                }
                          });
                          $.when( _skp_instance.container.attr('class', _newClasses.join(' ') ) )
                                .done( function() {
                                      //set new layout class
                                      _skp_instance.container.addClass( 'width-' + ( Math.round( 100 / _activeSkopeNum ) ) );
                                });
                    };
                api.czr_skope.each( function( _skp_instance ) {
                      if ( _.isUndefined( _.findWhere( _new_collection, { id : _skp_instance().id } ) ) ) {
                            _skp_instance.visible( false );
                            _skp_instance.isReady.then( function() {
                                  _skp_instance.container.toggleClass( 'active-collection', false );
                            });
                      }
                      else {
                            _skp_instance.visible( true );
                            var _activeSkpDomPostProcess = function() {
                                  _setLayoutClass( _skp_instance );
                                  _skp_instance.container.toggleClass( 'active-collection', true );
                            };
                            if ( 'pending' == _skp_instance.isReady.state() ) {
                                  _skp_instance.isReady.then( function() {
                                        _activeSkpDomPostProcess();
                                  });
                            } else {
                                  _activeSkpDomPostProcess();
                            }
                      }
                } );
          };

          //SET THE CONTEXTUALLY ACTIVE SKOPES VISIBILITY AND LAYOUT WHEN skopeReady and skopeWrapperEmbedded
          self.skopeWrapperEmbedded.then( function() {
                _setActiveAndLayout();
          });

          //ON INITIAL COLLECTION POPULATE, RESOLVE THE DEFERRED STATE
          //=> this way we can defer earlier actions.
          //For example when autofocus is requested, the section might be expanded before the initial skope collection is sent from the preview.
          if ( _.isEmpty( from ) && ! _.isEmpty( to ) )
            api.czr_initialSkopeCollectionPopulated.resolve();

          //MAKE SURE TO SYNCHRONIZE api.settings.settings with the current global skope updated db values
          self.maybeSynchronizeGlobalSkope();

          return dfd.resolve( 'changed' ).promise();
    },//listenToSkopeCollection()


    //fired in updateSkopeCollection
    //args can be
    //{
    //  isGlobalReset : false
    //  isSetting : false,
    //  isSkope : false,
    //  settingIdToReset : '',
    //  skopeIdToReset : ''
    //}
    maybeSynchronizeGlobalSkope : function( args ) {
          args = args || {};
          if ( ! _.isObject( args ) ) {
              throw new Error('maybeSynchronizeGlobalSkope : args must be an object');
          }
          var self = this,
              dfd = $.Deferred(),
              defaults = _.extend({
                        isGlobalReset : false,
                        isSetting : false,
                        settingIdToReset : '',
                        isSkope : false,
                        skopeIdToReset : ''
                    },
                    args
              ),
              _setIdToReset,
              shortSetId,
              defaultVal;

          if ( self.isGlobalSkopeRegistered() ) {
                var _global_skp_db_values = api.czr_skope( self.getGlobalSkopeId() ).dbValues();
                _.each( _global_skp_db_values, function( _val, setId ){
                      if ( api.has( setId ) && ! _.isEqual( api.settings.settings[setId].value, _val ) ) {
                            api.settings.settings[setId].value = _val;
                      }
                });

                //check if there's theme option removed from the global skope db values that needs to be set to default
                if ( args.isGlobalReset && args.isSetting ) {
                      _setIdToReset = args.settingIdToReset;
                      shortSetId    = api.CZR_Helpers.getOptionName( _setIdToReset );
                      defaultVal    = serverControlParams.defaultOptionsValues[ shortSetId ];

                      if ( _.isUndefined( api.settings.settings[ _setIdToReset ] ) || _.isUndefined( defaultVal ) )
                        return;
                      if ( defaultVal != api.settings.settings[ _setIdToReset ].value ) {
                            api.settings.settings[ _setIdToReset ].value = defaultVal;
                      }
                }

                //check if there's theme option removed from the global skope db values that needs to be set to default
                if ( args.isGlobalReset && args.isSkope ) {
                      _.each( api.settings.settings, function( _params, _setId ) {
                            if ( ! self.isThemeSetting( _setId ) )
                              return;

                            shortSetId = api.CZR_Helpers.getOptionName( _setId );
                            if ( ! _.has( serverControlParams.defaultOptionsValues, shortSetId ) )
                              return;
                            api.settings.settings[_setId].value = serverControlParams.defaultOptionsValues[ shortSetId ];
                      });
                }
          }
          return dfd.resolve().promise();
    }
});//$.extend
})( wp.customize , jQuery, _ );
var CZRSkopeBaseMths = CZRSkopeBaseMths || {};
( function ( api, $, _ ) {
$.extend( CZRSkopeBaseMths, {

    //declared in initialize
    //cb of api.czr_activeSkopeId.callbacks
    //react when the active skope has been set to a new value
    // => change the to and from skope active() state
    // => silently update each setting values with the skope set of vals
    activeSkopeReact : function( to, from ) {
          var self = this, dfd = $.Deferred();
          //set the to and from scope state on init and switch
          if ( ! _.isUndefined(from) && api.czr_skope.has(from) )
            api.czr_skope(from).active(false);
          else if ( ! _.isUndefined( from ) )
            throw new Error('listenToActiveSkope : previous scope does not exist in the collection', from );

          if ( ! _.isUndefined(to) && api.czr_skope.has(to) )
            api.czr_skope(to).active(true);
          else
            throw new Error('listenToActiveSkope : requested scope ' + to + ' does not exist in the collection');


          //BAIL AND RETURN PROMISE HERE IF SWITCHING TO A PANEL OR SECTION WITH ONLY UNSKOPED SETTINGS
          // => widgets and custom_css
          //Switch to global skope for not skoped panels
          var _switchBack = function( _title ) {
                api.czr_activeSkopeId( self.getGlobalSkopeId() );
                //<@4.9compat>
                if ( ! _.isUndefined( api.notifications ) ) {
                      api.notifications.add( new wp.customize.Notification( _title, {
                            type: 'info',
                            message: [ _title , 'is always customized sitewide.' ].join(' '),
                            dismissible: true
                      } ) );

                      // Removed if not dismissed after 5 seconds
                      _.delay( function() {
                            if ( api.notifications.has( _title ) ) {
                                  var _notif_ = api.notifications( _title );
                                  if ( _notif_.parent ) {
                                        _notif_.parent.remove( _notif_.code );
                                  } else {
                                        _notif_.container.remove();
                                  }
                            }
                      }, 5000 );
                }
                //</@4.9compat>
                else {
                      api.czr_serverNotification({
                            status:'success',
                            message : [ _title , 'is always customized sitewide.' ].join(' ')
                      });
                }
                return dfd.resolve().promise();
          };


          if ( self.isExcludedSidebarsWidgets() && 'widgets' == api.czr_activePanelId() && to != self.getGlobalSkopeId() ) {
                //<@4.9compat>
                if ( ! _.isUndefined( api.notifications ) ) {
                      api.notifications.add( new wp.customize.Notification( 'widgets_are_sidewide', {
                            type: 'info',
                            message: serverControlParams.i18n.skope['Widgets are created sitewide.'],
                            dismissible: true
                      } ) );

                      // Removed if not dismissed after 5 seconds
                      _.delay( function() {
                            if ( api.notifications.has( 'widgets_are_sidewide' ) ) {
                                  var _notif_ = api.notifications( 'widgets_are_sidewide' );
                                  if ( _notif_.parent ) {
                                        _notif_.parent.remove( _notif_.code );
                                  } else {
                                        _notif_.container.remove();
                                  }
                            }
                      }, 5000 );
                }
                //</@4.9compat>
                else {
                      api.czr_serverNotification({
                            status:'success',
                            message : [
                                  serverControlParams.i18n.skope['Widgets are created sitewide.']
                            ].join(' ')
                      });
                }

                //return dfd.resolve().promise();// _switchBack( api.panel( api.czr_activePanelId() ).params.title );
          }

          if ( self.isExcludedWPCustomCss() && 'custom_css' == api.czr_activeSectionId() && to != self.getGlobalSkopeId() ) {
                return _switchBack( api.section( api.czr_activeSectionId() ).params.title );
          }
          if ( 'admin_sec' == api.czr_activeSectionId() && to != self.getGlobalSkopeId() ) {
                return _switchBack( api.section( api.czr_activeSectionId() ).params.title );
          }
          if ( 'tc_font_customizer_settings' == api.czr_activeSectionId() && to != self.getGlobalSkopeId() ) {
                return _switchBack( api.section( api.czr_activeSectionId() ).params.title );
          }

          if ( ( 'nav_menu' == api.czr_activeSectionId().substring( 0, 'nav_menu'.length ) || 'add_menu' == api.czr_activeSectionId() ) && to != self.getGlobalSkopeId() )  {
                api.czr_serverNotification({
                      status:'success',
                      message : [
                            serverControlParams.i18n.skope['Menus are created sitewide.']
                      ].join(' ')
                });
                //_switchBack( api.section( api.czr_activeSectionId() ).params.title );
          }


          //AWAKE NOT CURRENTLY ACTIVE NAV MENUS SECTION
          //=> this solves the problem of nav menu location not being refreshed on skope switch
          if ( 'nav_menus' == api.czr_activePanelId() ) {
                _.each( api.panel( api.czr_activePanelId() ).sections(), function( _sec ) {
                      //PROCESS SILENT UPDATES
                      self.processSilentUpdates( { section_id : _sec.id, awake_if_not_active : true } );
                });
          }


          //Set state
          api.state('switching-skope')( true );
          //write the current skope title
          self._writeCurrentSkopeTitle( to );
          //paint skope color
          api.trigger( 'czr-paint', { is_skope_switch : true } );

          //CURRENT EXPANDED SECTION DEPENDANT ACTIONS
          //stop here if the active section is not set yet
          //=> the silent update will be fired on section expansion anyway
          //=> refresh now if the previewer is not skope aware, this will post the dyn_type used in the preview to get the proper option if the skope is not 'global'
          //=> otherwise simply refresh to set the new skope in the query params => needed for the preview frame
          if ( _.isUndefined( api.czr_activeSectionId() ) ) {
                // if ( 'pending' == api.czr_isPreviewerSkopeAware.state() ) {
                //     api.previewer.refresh();
                // } else {
                //     api.previewer.refresh();
                // }
                api.state('switching-skope')( false );
                api.previewer.refresh();
                return dfd.resolve().promise();
          }

          //close the module panel id needed
          if ( _.has( api, 'czrModulePanelState') )
            api.czrModulePanelState(false);

          //PROCESS SILENT UPDATES
          //Build the silent update candidates array
          //populates with the current section setting ids or the one provided
          var _silentUpdateCands = self._getSilentUpdateCandidates();

          //add the previous skope dirty settings ids
          if ( ! _.isUndefined( from ) ) {
            _.each( api.czr_skope( from ).dirtyValues(), function( val, _setId ) {
                  if ( ! _.contains( _silentUpdateCands, _setId ) )
                      _silentUpdateCands.push( _setId );
            } );
          }
          if ( ! _.isUndefined( to ) ) {
            _.each( api.czr_skope( to ).dirtyValues(), function( val, _setId ) {
                  if ( ! _.contains( _silentUpdateCands, _setId ) )
                      _silentUpdateCands.push( _setId );
            } );
          }

          //api.consoleLog('ACTIVE SKOPE REACT', to, from, _silentUpdateCands );

          //Process Silent Updates and
          //make sure that the visibility is processed after the silent updates
          var _debouncedProcessSilentUpdates = function() {
                self.processSilentUpdates( {
                            candidates : _silentUpdateCands,
                            section_id : null,
                            refresh : false//will be done on done()
                      })
                      .fail( function() {
                            dfd.reject();
                            api.state('switching-skope')( false );
                            throw new Error( 'Fail to process silent updates in _debouncedProcessSilentUpdates');
                      })
                      .done( function( _updatedSetIds ) {
                            api.previewer.refresh()
                                  .always( function() {
                                        dfd.resolve( _updatedSetIds );
                                        api.state( 'switching-skope' )( false );
                                  });

                            //on first skope reaction ( initialization phase ) , when from is still undefined : no need to refresh if the target skope is global
                            //=> improve speed performance on init
                            // if ( _.isUndefined( from ) && api.czr_skope.has( to ) && 'global' == api.czr_skope( to )().skope ) {
                            //       dfd.resolve( _updatedSetIds );
                            //       api.state( 'switching-skope' )( false );
                            // } else {
                            //       api.previewer.refresh()
                            //             .always( function() {
                            //                   dfd.resolve( _updatedSetIds );
                            //                   api.state( 'switching-skope' )( false );
                            //             });
                            // }
                      });
          };

          //Process silent updates
          //Collapse the current expanded module if any
          if ( _.has(api, 'czr_isModuleExpanded') && false !== api.czr_isModuleExpanded() ) {
                api.czr_isModuleExpanded().setupModuleViewStateListeners(false);
                _debouncedProcessSilentUpdates = _.debounce( _debouncedProcessSilentUpdates, 400 );
                _debouncedProcessSilentUpdates();
          } else {
                _debouncedProcessSilentUpdates();
          }
          return dfd.promise();
    },//activeSkopeReact



    //@return void()
    //Fired in activeSkopeReact()
    _writeCurrentSkopeTitle : function( skope_id ) {
          var self = this,
              current_title = api.czr_skope( skope_id || api.czr_activeSkopeId() )().long_title,
              _buildTitleHtml = function() {
                    var _inheritedFrom = self.getInheritedSkopeTitles(),
                        _overrides = self.getOverridenSkopeTitles();

                    return $.trim( [
                          '<span class="czr-main-title"><span class="czr-toggle-title-notice fas fa-info-circle"></span>',
                          'global' == api.czr_skope( skope_id || api.czr_activeSkopeId() )().skope ? current_title : ['Customizing', current_title ].join(' '),
                          '</span>',
                          '<span class="czr-skope-inherits-from">',
                          serverControlParams.i18n.skope['In this context :'],
                          _.isEmpty( _inheritedFrom ) ? ' ' : serverControlParams.i18n.skope['inherits from'],
                          _inheritedFrom,
                          _.isEmpty( _inheritedFrom ) ? '' : _.isEmpty( _overrides ) ? '.' : [',' , serverControlParams.i18n.skope['and'] ].join(' '),
                          _.isEmpty( _overrides ) ? ' ' : serverControlParams.i18n.skope['overridden by'],
                          _overrides,
                          _.isEmpty( _overrides ) ? '' : '.',
                          '</span>'
                    ].join(' ') );
              },
              _toggle_spinner = function( visible ) {
                    if ( visible ) {
                          $('.czr-scope-switcher').find('.spinner').fadeIn();
                    } else {
                          $('.czr-scope-switcher').find('.spinner').fadeOut();
                    }
              };

          //render / update the title
          self.skopeWrapperEmbedded
                .then( function() {
                      if ( ! $('.czr-scope-switcher').find('.czr-current-skope-title').length ) {
                            $('.czr-scope-switcher').prepend(
                                  $( '<h2/>', {
                                        class : 'czr-current-skope-title',
                                        html : [
                                              '<span class="czr-skope-title">',
                                              '<span class="spinner">',
                                              _buildTitleHtml(),
                                              '</span>',
                                              '</span>'
                                        ].join('')
                                  })
                            );
                      } else {
                            $.when( $('.czr-scope-switcher').find('.czr-skope-title').fadeOut(200) ).done( function() {
                                  $(this)
                                        .html( _buildTitleHtml() )
                                        .fadeIn(200);
                            });
                      }

                      if ( _.isUndefined( api.state( 'switching-skope' ).isBound ) ) {
                            api.state('switching-skope').bind( _toggle_spinner );
                            api.state( 'switching-skope' ).isBound = true;
                      }
          });
    }//_writeCurrentSkopeTitle
});//$.extend
})( wp.customize , jQuery, _ );
var CZRSkopeBaseMths = CZRSkopeBaseMths || {};
( function ( api, $, _ ) {
$.extend( CZRSkopeBaseMths, {
    //@param params :
    // {
    //   candidates : silentUpdateCands,
    //   section_id : section_id,
    //   refresh : true,
    //   awake_if_not_active : false
    // }
    processSilentUpdates : function( params ) {
          //api.consoleLog('PROCESS SILENT UPDATES', params );
          //a setting id can be passed as param instead of an object
          if ( _.isString( params ) )
            params = { candidates : [ params ] };
          else
            params = params || {};

          var self = this,
              defaultParams = {
                  candidates : [],
                  section_id : api.czr_activeSectionId(),
                  refresh : true,
                  awake_if_not_active : false
              },
              dfd = $.Deferred();

          params = $.extend( defaultParams, params );

          //Cast the candidates to an array, if only one setId is passed as a string
          if ( _.isString( params.candidates ) ) {
            params.candidates = [ params.candidates ];
          }

          //do we have well defined silent update candidates ?
          if ( _.isEmpty( params.candidates ) )
                params.candidates = self._getSilentUpdateCandidates( params.section_id, params.awake_if_not_active );
          if ( ! _.isArray( params.candidates ) ) {
                throw new Error('processSilentUpdates : the update candidates must be an array.');
          }

          //bail now if we still don't have candidates to update
          if ( _.isEmpty( params.candidates ) )
            return dfd.resolve( [] ).promise();


          var _enjoyTheSilence = function() {
                self.silentlyUpdateSettings( params.candidates, params.refresh )
                      .fail( function() {
                            dfd.reject();
                      })
                      .done( function( updated_settings ) {
                            _.delay( function() {
                                  self.setupActiveSkopedControls( {
                                        section_id : params.section_id
                                  });
                            }, 1000 );
                            dfd.resolve( updated_settings );
                      });
          };

          //silently update the settings of a the currently active section() to the values of the current skope
          //silentlyUpdateSettings returns a promise.
          if ( 'resolved' != api.czr_skopeReady.state() ) {
                dfd.resolve( [] );
                api.czr_skopeReady.done( function() {
                      _enjoyTheSilence();
                });
          } else {
                _enjoyTheSilence();
          }

          return dfd.promise();
    },




    /*****************************************************************************
    * UPDATE SETTING VALUES
    *****************************************************************************/
    //silently update a set of settings or a given setId
    //1) Build an array of promises for each settings
    //2) When all asynchronous promises are done(). Refresh()
    //@return an array of promises. Typically if a setting update has to re-render an image related control, the promise is the ajax request object
    silentlyUpdateSettings : function( _silentUpdateCands, refresh ) {
          //Declare a new api state
          if ( ! api.state.has( 'silent-update-processing') )
            api.state.create( 'silent-update-processing' )( false );

          api.state( 'silent-update-processing' )(true);

          //api.consoleLog('silentlyUpdateSettings', _silentUpdateCands, refresh );
          var self = this,
              _silentUpdatePromises = {},
              dfd = $.Deferred();

          refresh = _.isUndefined( refresh ) ? true : refresh;

          if ( _.isUndefined( _silentUpdateCands ) || _.isEmpty( _silentUpdateCands ) ) {
            _silentUpdateCands = self._getSilentUpdateCandidates();
          }

          if ( _.isString( _silentUpdateCands ) ) {
            _silentUpdateCands = [ _silentUpdateCands ];
          }

          //api.consoleLog('the silentUpdateCands', _silentUpdateCands );

          //Fire the silent updates promises
          _.each( _silentUpdateCands, function( setId ) {
                if ( api.control.has( setId ) &&  'czr_multi_module' == api.control(setId).params.type )
                  return;
                _silentUpdatePromises[setId] = self.getSettingUpdatePromise( setId );
          });


          var _deferred = [],
              _updatedSetIds = [];
              // _silently_update = function( _silentUpdatePromises ) {
              //        _.each( _silentUpdatePromises, function( _promise_ , setId ) {
              //               //Silently set
              //               var wpSetId = api.CZR_Helpers.build_setId( setId ),
              //                   _skopeDirtyness = api.czr_skope( api.czr_activeSkopeId() ).getSkopeSettingDirtyness( setId );
              //               api( wpSetId ).silent_set( obj.val, _skopeDirtyness );
              //         });
              // };

         //Populates the promises
         //Silently set each setting when its promise is done.
          _.each( _silentUpdatePromises, function( _promise_ , setId ) {
                _promise_.done( function( _new_setting_val_ ) {
                      //Silently set
                      var wpSetId = api.CZR_Helpers.build_setId( setId ),
                          _skopeDirtyness = api.czr_skope( api.czr_activeSkopeId() ).getSkopeSettingDirtyness( setId );
                      if ( ! _.isEqual( api( wpSetId )(), _new_setting_val_ ) ) {
                            _updatedSetIds.push( setId );
                      }
                      api( wpSetId ).silent_set( _new_setting_val_ , _skopeDirtyness );
                });

                _deferred.push( _promise_ );
          });

          //Resolve this method deferred when all setting promises are done
          $.when.apply( null, _deferred )
          // .always( function() {
          //       var _has_rejected_promise = false;
          //       _.each( _deferred, function( _defd ) {
          //             if ( _.isObject( _defd ) && 'rejected' == _defd.state() ) {
          //                   _has_rejected_promise = true;
          //             }
          //             //@todo improve this!
          //             $.when( _silently_update() ).done( function() {
          //                 api.previewer.refresh();
          //             });
          //       });

          // })
          .fail( function() {
                dfd.reject();
                throw new Error( 'silentlyUpdateSettings FAILED. Candidates : ' + _silentUpdateCands );
          })
          .always( function() {
                api.state( 'silent-update-processing' )( false );
          })
          .then( function() {
                _.each( _deferred, function( prom ){
                      if ( _.isObject( prom ) && 'resolved' !== prom.state() ) {
                            throw new Error( 'a silent update promise is unresolved : ' + _silentUpdateCands );
                      }
                });
                //always refresh by default
                if ( refresh && ! _.isEmpty( _updatedSetIds ) ) {
                      api.previewer.refresh()
                            .always( function() {
                                  dfd.resolve( _updatedSetIds );
                            });
                } else {
                      dfd.resolve( _updatedSetIds );
                }
          });

          //return the collection of update promises
          return dfd.promise();
    },






    //This method is typically called to update the current active skope settings values
    //
    //, therefore @param shortSetId is the only mandatory param
    //@param setId : the api setting id, might be the short version
    //@param val : the new val
    //@return a promise() $ object when an ajax fetch is processed, typically when updating an image.
    getSettingUpdatePromise : function( setId ) {
          if ( _.isUndefined( setId ) ) {
              throw new Error('getSettingUpdatePromise : the provided setId is not defined');
          }
          if ( ! api.has( api.CZR_Helpers.build_setId( setId ) ) ) {
              throw new Error('getSettingUpdatePromise : the provided wpSetId is not registered : ' + api.CZR_Helpers.build_setId( setId ) );
          }

          var self = this,
              wpSetId = api.CZR_Helpers.build_setId( setId ),
              current_setting_val = api( wpSetId )(),//typically the previous skope val
              dfd = $.Deferred(),
              _promise = false,
              skope_id = api.czr_activeSkopeId(),
              val = api.czr_skopeBase.getSkopeSettingVal( setId, skope_id );

          //resolve here if the setting val was unchanged
          if ( _.isEqual( current_setting_val, val ) ) {
                return dfd.resolve( val ).promise();
          }

          //THE FOLLOWING TREATMENTS ARE ADAPTED TO SETTING WITH A CORRESPONDING CONTROL
          //header_image_data not concerned for example
          if ( api.control.has( wpSetId ) ) {
                //The normal way to synchronize the setting api val and the html val is to use
                //an overridden version of api.Element.synchronizer.val.update
                //For some specific controls, we need to implement a different way to synchronize
                var control_type = api.control( wpSetId ).params.type,
                    _control_data = api.settings.controls[wpSetId],
                    _constructor;

                //////////EXPERIMENT
                // if ( 'widget_form' == control_type ) {
                //   api.control( wpSetId ).container.remove();
                //   api.control.remove( wpSetId );
                // }

                switch ( control_type ) {
                      //CROPPED IMAGE CONTROL
                      case 'czr_cropped_image' :
                            _promise = self._getCzrCroppedImagePromise( wpSetId, _control_data );
                      break;

                      case 'czr_module' :
                            self._processCzrModuleSilentActions( wpSetId, control_type, skope_id , _control_data);
                      break;

                      // case 'czr_multi_module' :
                      //       _constructor = api.controlConstructor[control_type];
                      //       if ( api.control.has( wpSetId ) ) {
                      //           //remove the container and its control
                      //           api.control( wpSetId ).container.remove();
                      //           api.control.remove( wpSetId );
                      //       }
                      //       //Silently set
                      //       api( wpSetId ).silent_set( val, current_skope_instance.getSkopeSettingDirtyness( setId ) );
                      //       //re-instantiate the control with the updated _control_data
                      //       api.control.add( wpSetId,  new _constructor( wpSetId, { params : _control_data, previewer : api.previewer }) );
                      // break;

                      // default :
                      //       //Silent set
                      //       api( wpSetId ).silent_set( val, current_skope_instance.getSkopeSettingDirtyness( setId ) );
                      // break;
                }//switch
          }//end if api.control.has( wpSetId )


          //Special case : the header_image control has 2 associated settings : header_image and header_image_data
          //when switching skope, we want to refresh the control with the right image
          //This is a setting
          if ( _.has(api.settings.controls, 'header_image') && 'header_image' == wpSetId  ) {
                _promise = self._getHeaderImagePromise( wpSetId, skope_id );
          }
          if ( ! _promise || ! _.isObject( _promise ) ) {
                dfd.resolve( val );
          } else {
                _promise.always( function() {
                      dfd.resolve( val );
                });
          }

          return dfd.promise();
    },//getSettingUpdatePromise()




    /*****************************************************************************
    * GET SILENT UPDATE CANDIDATE FROM A SECTION. FALLS BACK ON THE CURRENT ONE
    *****************************************************************************/
    _getSilentUpdateCandidates : function( section_id, awake_if_not_active ) {
          var self = this,
              SilentUpdateCands = [];
          section_id = ( _.isUndefined( section_id ) || _.isNull( section_id ) ) ? api.czr_activeSectionId() : section_id;

          //skope switch when no section expanded
          //=> Make it possible to "awake" a not active section
          //=> typically used to awake nav_menu_locations section when in nav_menus panel
          if ( _.isEmpty( api.czr_activeSectionId() ) && ! awake_if_not_active ) {
                return [];
          }
          //error cases
          if ( _.isUndefined( section_id ) ) {
                api.consoleLog( '_getSilentUpdateCandidates : No active section provided');
                return [];
          }
          if ( ! api.section.has( section_id ) ) {
                throw new Error( '_getSilentUpdateCandidates : The section ' + section_id + ' is not registered in the API.');
          }

          //GET THE CURRENT EXPANDED SECTION SET IDS
          var section_settings = api.CZR_Helpers.getSectionSettingIds( section_id );

          //keep only the skope eligible setIds
          section_settings = _.filter( section_settings, function( setId ) {
              return self.isSettingSkopeEligible( setId );
          });

          //Populates the silent update candidates array
          _.each( section_settings, function( setId ) {
                SilentUpdateCands.push( setId );
          });

          return SilentUpdateCands;
    }

});//$.extend
})( wp.customize , jQuery, _ );
var CZRSkopeBaseMths = CZRSkopeBaseMths || {};
( function ( api, $, _ ) {
$.extend( CZRSkopeBaseMths, {
    /*****************************************************************************
    * SILENT ACTIONS for czr_module_type on skope switch
    * ?? @todo : can't we fire this earlier than in getPromises ?
    *****************************************************************************/
    //@return void()
    _processCzrModuleSilentActions : function( wpSetId, control_type, skope_id, _control_data) {
          var _synced_control_id, _synced_control_val, _synced_control_data, _synced_control_constructor, _syncSektionModuleId,
              _synced_short_id = _.has( api.control( wpSetId ).params, 'syncCollection' ) ? api.control( wpSetId ).params.syncCollection : '',
              _shortSetId =  api.CZR_Helpers.build_setId(wpSetId),
              _val = api.czr_skopeBase.getSkopeSettingVal( _shortSetId, skope_id ),
              current_skope_instance = api.czr_skope( api.czr_activeSkopeId() );

          //if in a multimodule context
          if ( ! _.isEmpty( _synced_short_id ) && ! _.isUndefined( _synced_short_id ) ) {
                _synced_control_id = api.CZR_Helpers.build_setId( _synced_short_id );
                _synced_control_val = api.czr_skopeBase.getSkopeSettingVal( _synced_control_id, skope_id );
                _synced_control_data = api.settings.controls[_synced_control_id];
                _synced_control_constructor = api.controlConstructor.czr_multi_module;
                _syncSektionModuleId =  api.control( _synced_control_id ).syncSektionModule()().id;

                //remove the container and its control
                api.control( _synced_control_id ).container.remove();
                api.control.remove(_synced_control_id );
                //Silently set
                api( _synced_control_id ).silent_set( _synced_control_val, current_skope_instance.getSkopeSettingDirtyness( _synced_control_id ) );

                //add the current skope to the control
                $.extend( _synced_control_data, { czr_skope : skope_id });

                //re-instantiate the control with the updated _control_data
                api.control.add( _synced_control_id,  new _synced_control_constructor( _synced_control_id, { params : _synced_control_data, previewer : api.previewer }) );
          }

          _constructor = api.controlConstructor[control_type];

          //remove the container and its control
          api.control( wpSetId ).container.remove();
          api.control.remove( wpSetId );
          //Silently set
          api( wpSetId ).silent_set( _val, current_skope_instance.getSkopeSettingDirtyness( _shortSetId ) );

          //add the current skope to the control
          $.extend( _control_data, { czr_skope : skope_id });

          //re-instantiate the control with the updated _control_data
          api.control.add( wpSetId,  new _constructor( wpSetId, { params : _control_data, previewer : api.previewer }) );

          //Fire the sektion module if there's a synced sektion
          if ( ! _.isEmpty( _synced_short_id ) && ! _.isUndefined( _synced_short_id ) ) {
                api.consoleLog('FIRE SEKTION MODULE?', _syncSektionModuleId, api.control( wpSetId ).czr_Module( _syncSektionModuleId ).isReady.state() );
                api.control( wpSetId ).czr_Module( _syncSektionModuleId ).fireSektionModule();
          }
    },





    /*****************************************************************************
    * GET PROMISE FOR TYPE : czr_cropped_image
    *****************************************************************************/
    //@return promise
    _getCzrCroppedImagePromise : function( wpSetId, _control_data ) {
          var _constructor = api.controlConstructor.czr_cropped_image, dfd = $.Deferred(),
              val = api.has(wpSetId) ? api(wpSetId)() : null;
          //@make sure that the val is not null => won't be accepted in silent set
          val = null === val ? "" : val;

          //re-add the control when the new image has been fetched asynchronously.
          //if no image can be fetched, for example when in the active skope, the image is not set, then
          //refresh the control without attachment data
          wp.media.attachment( val ).fetch().done( function() {
                //remove the container and its control
                api.control( wpSetId ).container.remove();
                api.control.remove( wpSetId );
                //update the data with the new img attributes
                _control_data.attachment = this.attributes;
                //instantiate the control with the updated _control_data
                api.control.add( wpSetId,  new _constructor( wpSetId, { params : _control_data, previewer : api.previewer }) );
                dfd.resolve();
          } ).fail( function() {
                //remove the container and its control
                api.control( wpSetId ).container.remove();
                api.control.remove( wpSetId );
                //update the data : remove the attachment property
                _control_data = _.omit( _control_data, 'attachment' );
                //instantiate the control with the updated _control_data
                api.control.add( wpSetId,  new _constructor( wpSetId, { params : _control_data, previewer : api.previewer }) );
                dfd.reject();
          });

          //set the media fetched as promise to return;
          return dfd.promise();
    },



    /*****************************************************************************
    * HEADER IMAGE PROMISE
    *****************************************************************************/
    //@return promise
    _getHeaderImagePromise : function( wpSetId, skope_id ) {
          var dfd = $.Deferred();
          if ( ! _.has(api.settings.controls, 'header_image') || 'header_image' != wpSetId  ) {
            return dfd.resolve().promise();
          }

          var _header_constructor = api.controlConstructor.header,
              _header_control_data = $.extend( true, {}, api.settings.controls.header_image );

          //@make sure that the header_image_data is not null => won't be accepted in silent set
          header_image_data = null === api.czr_skopeBase.getSkopeSettingVal( 'header_image_data', skope_id ) ? "" : api.czr_skopeBase.getSkopeSettingVal( 'header_image_data', skope_id );

          var attachment_id;
          var _reset_header_image_crtl = function( _updated_header_control_data ) {
                _updated_header_control_data = _updated_header_control_data || _header_control_data;
                //remove the container and its control
                api.control( 'header_image' ).container.remove();
                api.control.remove( 'header_image' );

                //reset the HeaderTool objects, captured early
                api.HeaderTool.UploadsList = api.czr_HeaderTool.UploadsList;
                api.HeaderTool.DefaultsList = api.czr_HeaderTool.DefaultsList;
                api.HeaderTool.CombinedList = api.czr_HeaderTool.CombinedList;
                var _render_control = function() {
                      //instantiate the control with the updated _header_control_data
                      api.control.add( 'header_image',  new _header_constructor( 'header_image', { params : _updated_header_control_data, previewer : api.previewer }) );
                };
                _render_control = _.debounce( _render_control, 800 );
                _render_control();
          };


          if ( ! _.has( header_image_data, 'attachment_id' ) ) {
                _reset_header_image_crtl();
                dfd.resolve();
          } else {
                attachment_id = header_image_data.attachment_id;

                //re-add the control when the new image has been fetched asynchronously.
                //if no image can be fetched, for example when in the active skope, the image is not set, then
                //refresh the control without attachment data
                wp.media.attachment( attachment_id ).fetch().done( function() {
                      //update the data with the new img attributes
                      _header_control_data.attachment = this.attributes;
                      _reset_header_image_crtl( _header_control_data );
                      dfd.resolve();
                } ).fail( function() {
                      //update the data : remove the attachment property
                      _header_control_data = _.omit( _header_control_data, 'attachment' );

                      //remove the container and its control
                      api.control( 'header_image' ).container.remove();
                      api.control.remove( 'header_image' );

                      //reset the HeaderTool objects, captured early
                      api.HeaderTool.UploadsList = api.czr_HeaderTool.UploadsList;
                      api.HeaderTool.DefaultsList = api.czr_HeaderTool.DefaultsList;
                      api.HeaderTool.CombinedList = api.czr_HeaderTool.CombinedList;
                      //instantiate the control with the updated _header_control_data
                      api.control.add( 'header_image',  new _header_constructor( 'header_image', { params : _header_control_data, previewer : api.previewer }) );
                      dfd.reject();
                });
          }//else

          //return the promise
          return dfd.promise();
    }
});//$.extend
})( wp.customize , jQuery, _ );

/*****************************************************************************
* THE SKOPE BASE OBJECT
*****************************************************************************/
var CZRSkopeBaseMths = CZRSkopeBaseMths || {};
( function ( api, $, _ ) {
$.extend( CZRSkopeBaseMths, {
    /*****************************************************************************
    * SETUP CONTROL RESET ON SECTION EXPANSION + SKOPE SWITCH
    *****************************************************************************/
    //fired on section expansion + skope switch, when silentlyUpdateSettings.done()
    //@param obj :
    //{
    //  controls : [] of controls or controlId string
    //  section_id : string
    //}
    //@return void()
    setupActiveSkopedControls : function( obj ) {
          var self = this, section_id, controls, setupParams, eligibleCtrls, dfd = $.Deferred();
              defaultSetupParams = {
                    controls : [],
                    section_id : api.czr_activeSectionId()
              };
          setupParams = $.extend( defaultSetupParams, obj );

          if ( ! _.isObject( setupParams ) || ! _.has( setupParams, 'controls' ) || ! _.has( setupParams, 'section_id' ) ) {
                throw new Error( 'setupActiveSkopedControls : the setupParams param must be an object with properties controls and section_id.');
          }

          section_id  = setupParams.section_id;
          controls    = setupParams.controls;
          eligibleCtrls = [];

          if ( _.isEmpty( section_id ) || ! _.isString( section_id ) ) {
                section_id = api.czr_activeSectionId();
          }
          if ( _.isEmpty( controls ) ) {
                controls = api.CZR_Helpers.getSectionControlIds( section_id  );
          }

          controls = _.isString( controls ) ? [controls] : controls;


          //1) Add CSS classes
          //2) filter only eligible ctrlIds
          eligibleCtrls = _.filter( controls, function( ctrlId ) {
                var setId = api.CZR_Helpers.getControlSettingId( ctrlId );
                if ( setId && ! self.isSettingSkopeEligible( setId ) ) {
                      api.control( ctrlId ).container.addClass('czr-not-skoped');
                }
                if ( setId && self.isWPAuthorizedSetting( setId ) ) {
                      api.control( ctrlId ).container.addClass('is-wp-authorized-setting');
                }
                return setId && self.isSettingSkopeEligible( setId );
                //return true;
                //return self.isSettingSkopeEligible( ctrlId );
                //return self.isSettingResetEligible( ctrlId );
          });

          //Bail before printing anything if 'nav_menu[' section
          if ( 'nav_menu[' == section_id.substring( 0, 'nav_menu['.length ) )
            return dfd.resolve().promise();

          //Render the reset icon ONLY for eligible controls
          //Setup the state for all controls, even not eligible ones
          if ( ! _.isEmpty( controls ) ) {
                api.czr_skopeReady.then( function() {
                      $.when( self.renderControlsSingleReset( eligibleCtrls ) ).done( function() {
                            //api.consoleLog('RENDER CONTROL SINGLE RESET DONE', controls );
                            //add observable Value(s) to the section control
                            _.each( controls, function( ctrlId ) {
                                  self.listenSkopedControl( ctrlId );
                            } );
                            dfd.resolve();
                      });
                });
                //paranoid line of code...
                if ( 'rejected' == api.czr_skopeReady.state() )
                  dfd.resolve();
          }

          //Prepare skope control notice for all controls, even the non eligible ones
          self.renderCtrlSkpNotIcon( controls );
          return dfd.promise();
    },//setupActiveSkopedControls



    //@params ctrlId = string control id candidate to setup
    listenSkopedControl : function( ctrlId ) {
          var self = this;

          if ( ! api.has( ctrlId ) || _.isUndefined( api.control( ctrlId ) ) )
            return;

          var ctrl        = api.control( ctrlId ),
              setId       = api.CZR_Helpers.getControlSettingId( ctrlId ),
              shortSetId  = api.CZR_Helpers.getOptionName( setId ),
              defaults    = {
                    hasDBVal : false,
                    isDirty : false,
                    noticeVisible : false,
                    resetVisible : false,
                    isResetting : false
              },
              initial_states = {};

          //Declare observable Values
          // + Bind them
          if ( ! _.has( ctrl, 'czr_states' ) ) {
                ctrl.czr_states = new api.Values();
                _.each( defaults, function( _state_val, _state_name ) {
                      ctrl.czr_states.create( _state_name );
                      ctrl.czr_states( _state_name )( _state_val );
                });
                //Then listen to their changes
                try { self.bindControlStates( ctrl ); } catch( er ) {
                      api.errorLog( 'bindControlStates : ' + er );
                }
          }

          //Set them
          // initial_states = _.extend(
          //       defaults,
          //       {
          //             hasDBVal : api.czr_skope( api.czr_activeSkopeId() ).hasSkopeSettingDBValues( ctrlId ),
          //             isDirty : api.czr_skope( api.czr_activeSkopeId() ).getSkopeSettingDirtyness( ctrlId )
          //       }
          // );
          ctrl.czr_states( 'hasDBVal' )( api.czr_skope( api.czr_activeSkopeId() ).hasSkopeSettingDBValues( setId ) );
          ctrl.czr_states( 'isDirty' )( api.czr_skope( api.czr_activeSkopeId() ).getSkopeSettingDirtyness( setId ) );

          //api.consoleLog( 'SETUP CONTROL VALUES ?', ctrlId, api.czr_skope( api.czr_activeSkopeId() ).hasSkopeSettingDBValues( ctrlId ) );


          if ( ! _.has( ctrl, 'userEventMap' ) ) {
                ctrl.userEventMap = [
                      //toggle reset dialog
                      {
                            trigger   : 'click keydown',
                            selector  : '.czr-setting-reset, .czr-cancel-button',
                            name      : 'control_reset_warning',
                            actions   : function() {
                                  if ( ! ctrl.czr_states('isDirty')() && ! ctrl.czr_states( 'hasDBVal' )() )
                                    return;
                                  //close all other warnings expanded in the section
                                  _.each( _.without( api.CZR_Helpers.getSectionControlIds( ctrl.section() ), ctrlId ) , function( _id ) {
                                        if ( _.has( api.control(_id), 'czr_states') ) {
                                              api.control(_id).czr_states( 'resetVisible' )( false );
                                        }
                                  });
                                  ctrl.czr_states( 'resetVisible' )( ! ctrl.czr_states( 'resetVisible' )() );
                                  //collapse the control notice expanded if resetting requested
                                  ctrl.czr_states( 'noticeVisible' )( ! ctrl.czr_states( 'resetVisible' )() );
                            }
                      },
                      //skope reset : do reset
                      {
                            trigger   : 'click keydown',
                            selector  : '.czr-control-do-reset',
                            name      : 'control_do_reset',
                            actions   : function() {
                                  self.doResetSetting( ctrlId );
                            }
                      },
                      //skope switch
                      {
                            trigger   : 'click keydown',
                            selector  : '.czr-skope-switch',
                            name      : 'control_skope_switch',
                            actions   : function( params ) {
                                  var _skopeIdToSwithTo = $( params.dom_event.currentTarget, params.dom_el ).attr('data-skope-id');
                                  if ( ! _.isEmpty( _skopeIdToSwithTo ) && api.czr_skope.has( _skopeIdToSwithTo ) )
                                    api.czr_activeSkopeId( _skopeIdToSwithTo );
                            }
                      },
                      //Toggle Notice
                      {
                            trigger   : 'click keydown',
                            selector  : '.czr-toggle-notice',
                            name      : 'control_toggle_notice',
                            actions   : function( params ) {
                                  ctrl.czr_states( 'noticeVisible' )( ! ctrl.czr_states( 'noticeVisible' )() );
                                  //collapse the control reset dialog expanded
                                  if ( ctrl.czr_states( 'noticeVisible' )() ) {
                                        ctrl.czr_states( 'resetVisible' )( false );
                                  }
                            }
                      }
                ];
                api.CZR_Helpers.setupDOMListeners( ctrl.userEventMap , { dom_el : ctrl.container }, self );
          }
    },

    //The ctrl.czr_states registered api.Values are :
    //hasDBVal : false,
    //isDirty : false,
    //noticeVisible : false,
    //resetVisible : false
    bindControlStates : function( ctrl ) {
          if ( ! api.control.has( ctrl.id ) ) {
                throw new Error( 'in bindControlStates, the provided ctrl id is not registered in the api : ' + ctrl.id );
          }
          var self = this,
              setId = api.CZR_Helpers.getControlSettingId( ctrl.id );

          //DB VALS
          ctrl.czr_states( 'hasDBVal' ).bind( function( bool ) {
                ctrl.container.toggleClass( 'has-db-val', bool );
                if ( bool ) {
                      _title = serverControlParams.i18n.skope['Reset your customized ( and published ) value'];
                } else if ( ctrl.czr_states('isDirty')() ) {
                      _title = serverControlParams.i18n.skope['Reset your customized ( but not yet published ) value'];
                } else {
                      _title = serverControlParams.i18n.skope['Not customized yet, nothing to reset'];
                }
                ctrl.container.find('.czr-setting-reset').attr( 'title', _title );
          });

          //API DIRTYNESS
          ctrl.czr_states( 'isDirty' ).bind( function( bool ) {
                ctrl.container.toggleClass( 'is-dirty', bool );
                var _title;
                if ( bool ) {
                      _title = serverControlParams.i18n.skope['Reset your customized ( but not yet published ) value'];
                } else if ( ctrl.czr_states('hasDBVal')() ) {
                      _title = serverControlParams.i18n.skope['Reset your customized ( and published ) value'];
                } else {
                      _title = serverControlParams.i18n.skope['Not customized yet, nothing to reset'];
                }
                ctrl.container.find('.czr-setting-reset').attr( 'title', _title );
          });

          //NOTICE VISIBILITY
          ctrl.czr_states( 'noticeVisible' ).bind( function( visible ) {
                ctrl.container.toggleClass( 'czr-notice-visible', visible );
                var $noticeContainer = ctrl.getNotificationsContainerElement();
                if ( false !== $noticeContainer && false !== $noticeContainer.length ) {
                      if ( ! visible ) {
                            $.when( $noticeContainer
                                  .stop()
                                  .slideUp( 'fast', null, function() {
                                        $( this ).css( 'height', 'auto' );
                                  } ) ).done( function() {
                                        self.removeCtrlSkpNot( ctrl.id );
                                  });
                      } else {
                            self.updateCtrlSkpNot( ctrl.id, true );//<= True for visible
                            $noticeContainer
                                  .stop()
                                  .slideDown( 'fast', null, function() {
                                        $( this ).css( 'height', 'auto' );
                                  } );
                      }
                }
          });

          //RESET VISIBILITY
          ctrl.czr_states( 'resetVisible' ).bind( function( visible ) {
                var section_id = ctrl.section() || api.czr_activeSectionId();
                if ( visible ) {
                      //self.renderControlResetWarningTmpl
                      //returns an object : { container : $(el), is_authorized : is_authorized }
                      $.when( self.renderControlResetWarningTmpl( ctrl.id ) ).done( function( _params ) {
                            if ( _.isEmpty( _params ) )
                              return;
                            ctrl.czr_resetDialogContainer = _params.container;
                            _params.container.slideToggle('fast');
                            //Close and remove automatically if the user attempted to reset a non authorized setting
                            //The setting can not be reset if :
                            //1) WP setting
                            //2) global skope
                            //3) setting not dirty => db reset
                            if ( ! _params.is_authorized ) {
                                  _.delay( function() {
                                        $.when( ctrl.czr_resetDialogContainer.slideToggle('fast') ).done( function() {
                                              ctrl.czr_resetDialogContainer.remove();
                                        });
                                  }, 3000 );
                            }
                      });
                } else {
                      if ( _.has( ctrl, 'czr_resetDialogContainer' ) && ctrl.czr_resetDialogContainer.length )
                            $.when( ctrl.czr_resetDialogContainer.slideToggle('fast') ).done( function() {
                                  ctrl.czr_resetDialogContainer.remove();
                            });
                }
          });
    }
});//$.extend()
})( wp.customize , jQuery, _ );

/*****************************************************************************
* THE SKOPE BASE OBJECT
*****************************************************************************/
var CZRSkopeBaseMths = CZRSkopeBaseMths || {};
( function ( api, $, _ ) {
$.extend( CZRSkopeBaseMths, {
    //fired on
    //1) active section expansion
    //2) and on skope switch
    //render each control reset icons with a delay
    //=> because some control like media upload are re-rendered on section expansion
    //@params controls = array of skope eligible control ids
    renderControlsSingleReset : function( controls ) {
          var self = this, dfd = $.Deferred();
          //create the control ids list if not set
          if ( _.isUndefined( controls ) || _.isEmpty( controls ) ) {
                controls = api.CZR_Helpers.getSectionControlIds( api.czr_activeSectionId() );
                //filter only eligible controlIds
                controls = _.filter( controls, function( _id ) {
                      var setId = api.CZR_Helpers.getControlSettingId( _id );
                      return setId && self.isSettingSkopeEligible( setId );
                });
          }

          var controlIds = _.isArray(controls) ? controls : [controls],
              render_reset_icons = function( ctrlIds ) {
                    if ( _.isEmpty( ctrlIds ) ) {
                          dfd.resolve();
                          return;
                    }
                    //api.consoleLog('IN RENDER RESET ICONS', ctrlIds );
                    _.each( ctrlIds, function( _id ) {
                          api.control.when( _id, function() {
                                var ctrl  = api.control( _id ),
                                    setId = api.CZR_Helpers.getControlSettingId( _id );

                                if( $('.czr-setting-reset', ctrl.container ).length ) {
                                      dfd.resolve();
                                      return;
                                }

                                ctrl.deferred.embedded.then( function() {
                                      $.when(
                                            ctrl.container
                                                  .find('.customize-control-title').first()//was.find('.customize-control-title')
                                                  .prepend( $( '<span/>', {
                                                        class : 'czr-setting-reset fas fa-sync',
                                                        title : ''
                                                  } ) ) )
                                      .done( function(){
                                            ctrl.container.addClass('czr-skoped');
                                            $('.czr-setting-reset', ctrl.container).fadeIn( 400 );
                                            dfd.resolve();
                                      });
                                });//then()
                          });//when()
                    });//_each
              };

          //debounce because some control like media upload are re-rendered on section expansion
          render_reset_icons = _.debounce( render_reset_icons , 200 );
          render_reset_icons( controlIds );
          return dfd.promise();
    },



    //Fired in self.bindControlStates()
    //@uses The ctrl.czr_states('isDirty') value
    renderControlResetWarningTmpl : function( ctrlId ) {
          if ( ! api.control.has( ctrlId ) )
            return {};

          var self = this,
              ctrl = api.control( ctrlId ),
              setId = api.CZR_Helpers.getControlSettingId( ctrlId ),
              _tmpl = '',
              warning_message,
              success_message,
              isWPSetting = ( function() {
                    //exclude the WP built-in settings like blogdescription, show_on_front, etc
                    if ( _.contains( serverControlParams.wpBuiltinSettings, api.CZR_Helpers.getOptionName( setId ) ) )
                      return true;
                    if ( ! _.contains( serverControlParams.themeSettingList, api.CZR_Helpers.getOptionName( setId ) ) )
                      return true;
                    return false;
              })(),
              _currentSkopeModel = api.czr_skope( api.czr_activeSkopeId() )();

          if ( ctrl.czr_states( 'isDirty' )() ) {
                warning_message = [
                      'global' == _currentSkopeModel.skope ? serverControlParams.i18n.skope['Please confirm that you want to reset your current customizations for this option'] : serverControlParams.i18n.skope['Please confirm that you want to reset your current customizations for this option in'],
                      'global' == _currentSkopeModel.skope ? serverControlParams.i18n.skope['sitewide'] : _currentSkopeModel.ctx_title
                ].join(' ');
                success_message = serverControlParams.i18n.skope['Your customizations have been reset'];
          } else {
                if ( isWPSetting && 'global' == _currentSkopeModel.skope ) {
                      warning_message = serverControlParams.i18n.skope['This WordPress setting can not be reset sitewide'];
                } else {
                      warning_message = [
                          'global' == _currentSkopeModel.skope ? serverControlParams.i18n.skope['Please confirm that you want to reset this option'] : serverControlParams.i18n.skope['Please confirm that you want to reset this option in'],
                          'global' == _currentSkopeModel.skope ? serverControlParams.i18n.skope['sitewide'] : _currentSkopeModel.ctx_title
                      ].join(' ');
                      success_message = serverControlParams.i18n.skope['The option has been reset'];
                }
          }

          //The setting can not be reset if :
          //1) WP setting
          //2) global skope
          //3) setting not dirty => db reset
          var is_authorized = ! ( isWPSetting && 'global' == api.czr_skope( api.czr_activeSkopeId() )().skope && ! ctrl.czr_states( 'isDirty' )() ),
              _tmpl_data = {
                    warning_message : warning_message + '.',
                    success_message : success_message + '.',
                    is_authorized : is_authorized
              };
          try {
                _tmpl =  wp.template('czr-reset-control')( _tmpl_data );
          } catch( er ) {
                api.errorLog( 'Error when parsing the the reset control template : ' + er );
                return { container : false, is_authorized : false };
          }

          $('.customize-control-title', ctrl.container).first().after( $( _tmpl ) );

          return { container : $( '.czr-ctrl-reset-warning', ctrl.container ), is_authorized : is_authorized };
    },


    //Fired on user click
    //Defined in the ctrl user event map
    //@uses The ctrl.czr_states values
    //Will fire a different callback, whether the setting is dirty or has db val
    doResetSetting : function( ctrlId ) {
          var self = this,
              setId = api.CZR_Helpers.getControlSettingId( ctrlId ),
              ctrl = api.control( ctrlId ),
              skope_id = api.czr_activeSkopeId(),
              reset_method = ctrl.czr_states( 'isDirty' )() ? '_resetControlDirtyness' : '_resetControlAPIVal',
              _setResetDialogVisibility = function() {
                    var ctrl = this;//<= fired with .call( ctrlInstance )
                    ctrl.czr_states( 'resetVisible' )( false );
                    ctrl.czr_states( 'isResetting' )( false);
                    ctrl.container.removeClass('czr-resetting-control');
              },
              _updateAPI = function( ctrlId ) {
                    var _silentUpdate = function() {
                              api.czr_skopeBase.processSilentUpdates( { candidates : ctrlId, refresh : false } )
                                    .fail( function() { api.consoleLog( 'Silent update failed after resetting control : ' + ctrlId ); } )
                                    .done( function() {
                                          api.control.when( ctrlId, function() {
                                                //the control instance might have changed if it has been re-rendered.
                                                //=> make sure we grab the new one
                                                var ctrl = api.control( ctrlId );
                                                $.when( $('.czr-crtl-reset-dialog', ctrl.container ).fadeOut('300') ).done( function() {
                                                      $.when( $('.czr-reset-success', ctrl.container ).fadeIn('300') ).done( function( $_el ) {
                                                            _.delay( function() {
                                                                  $.when( $_el.fadeOut('300') ).done( function() {
                                                                        self.setupActiveSkopedControls( { controls : [ ctrlId ] } ).done( function() {
                                                                              if ( ctrl.czr_states ) {
                                                                                    _setResetDialogVisibility.call( ctrl );
                                                                                    ctrl.czr_states( 'noticeVisible' )( self.isCtrlNoticeVisible( ctrlId ) );
                                                                              }
                                                                        });
                                                                  });
                                                            }, 500 );
                                                      });
                                                });
                                          });
                                    });//done()
                    };//_silentUpdate

                    //Specific case for global :
                    //After a published value reset (not a dirty reset),
                    //we need to re-synchronize the api.settings.settings with the default theme options values
                    self[reset_method](ctrlId)
                          .done( function() {
                                api.consoleLog('REFRESH AFTER A SETTING RESET');
                                //api.previewer.refresh() method is resolved with an object looking like :
                                //{
                                //    previewer : api.previewer,
                                //    skopesServerData : {
                                //        czr_skopes : _wpCustomizeSettings.czr_skopes || [],
                                //        isChangesetDirty : boolean
                                //    },
                                // }
                                api.previewer.refresh()
                                      .fail( function( refresh_data ) {
                                            api.errorLog('Setting reset refresh failed.', refresh_data );
                                      })
                                      .done( function( refresh_data ) {
                                            if ( 'global' == api.czr_skope( skope_id )().skope && '_resetControlAPIVal' == reset_method ) {
                                                  var _sentSkopeCollection,
                                                      _serverGlobalDbValues = {},
                                                      _skope_opt_name = api.czr_skope( skope_id )().opt_name;

                                                  if ( ! _.isUndefined( refresh_data.skopesServerData ) && _.has( refresh_data.skopesServerData, 'czr_skopes' ) ) {
                                                        _sentSkopeCollection = refresh_data.skopesServerData.czr_skopes;
                                                        if ( _.isUndefined( _.findWhere( _sentSkopeCollection, { opt_name : _skope_opt_name } ) ) ) {
                                                              _serverGlobalDbValues = _.findWhere( _sentSkopeCollection, { opt_name : _skope_opt_name } ).db || {};
                                                        }
                                                  }
                                                  api.czr_skopeBase.maybeSynchronizeGlobalSkope( { isGlobalReset : true, isSetting : true, settingIdToReset : setId } )
                                                        .done( function() {
                                                              _silentUpdate();
                                                        });
                                            } else {
                                                  _silentUpdate();
                                            }
                                      });
                          });
              };//_updateAPI


          ctrl.czr_states( 'isResetting' )( true );
          ctrl.container.addClass('czr-resetting-control');

          //api.consoleLog('DO RESET SETTING', ctrlId, ctrl.czr_states( 'isDirty' )() );

          api.czr_skopeReset[ ctrl.czr_states( 'isDirty' )() ? 'resetChangeset' : 'resetPublished' ](
                      { skope_id : skope_id, setId : setId, is_setting : true } )
                      .done( function( r ) {
                            _updateAPI( ctrlId );
                      })
                      .fail( function( r ) {
                              api.errorLog( 'Reset failed', r );
                              $.when( $('.czr-crtl-reset-dialog', ctrl.container ).fadeOut('300') ).done( function() {
                                    $.when( $('.czr-reset-fail', ctrl.container ).fadeIn('300') ).done( function() {
                                          $('.czr-reset-fail', ctrl.container ).append('<p>' + r + '</p>');
                                          _.delay( function() {
                                                _setResetDialogVisibility.call( ctrl );
                                                self.setupActiveSkopedControls( { controls : [ ctrlId ] } );
                                          }, 2000 );
                                    });
                              });
                      });

    },

    //updates the current skope dirties and the changeset dirties
    _resetControlDirtyness : function( ctrlId ) {
          var setId           = api.CZR_Helpers.getControlSettingId( ctrlId ),
              skope_instance  = api.czr_skope( api.czr_activeSkopeId() ),
              current_dirties = $.extend( true, {}, skope_instance.dirtyValues() ),
              new_dirties     = {},
              current_changeset = $.extend( true, {}, skope_instance.changesetValues() ),
              new_changeset     = {},
              dfd             = $.Deferred();

          new_dirties   = _.omit( current_dirties, setId );
          new_changeset = _.omit( current_changeset, setId );
          skope_instance.dirtyValues( new_dirties );
          skope_instance.changesetValues( new_dirties );

          return dfd.resolve().promise();
    },


    //@uses The ctrl.czr_states values
    //updates the current skope dbValues
    //update the ctrl state
    _resetControlAPIVal : function( ctrlId ) {
          var setId = api.CZR_Helpers.getControlSettingId( ctrlId ),
              current_skope_db  = api.czr_skope( api.czr_activeSkopeId() ).dbValues(),
              new_skope_db      = $.extend( true, {}, current_skope_db ),
              dfd = $.Deferred();

          if ( _.has( api.control( ctrlId ), 'czr_states') ) {
                api.control(ctrlId).czr_states( 'hasDBVal' )( false );
                //update the skope db property and say it
                api.czr_skope( api.czr_activeSkopeId() ).dbValues( _.omit( new_skope_db, setId ) );
          }
          return dfd.resolve().promise();
    }
});//$.extend()
})( wp.customize , jQuery, _ );

/*****************************************************************************
* THE SKOPE BASE OBJECT
*****************************************************************************/
var CZRSkopeBaseMths = CZRSkopeBaseMths || {};
( function ( api, $, _ ) {
$.extend( CZRSkopeBaseMths, {

    //fired when a section is expanded
    //fired when a setting value is changed
    renderCtrlSkpNotIcon : function( controlIdCandidates ) {
          var self = this,
              controlIds = _.isArray(controlIdCandidates) ? controlIdCandidates : [controlIdCandidates];

          _.each( controlIds, function( _id ) {
                api.control.when( _id, function() {
                      var ctrl = api.control( _id );
                      ctrl.deferred.embedded.then( function() {
                            //RENDER TOGGLE ICON
                            if( $('.czr-toggle-notice', ctrl.container ).length )
                              return;

                            $.when( ctrl.container
                                  .find('.customize-control-title').first()//was.find('.customize-control-title')
                                  .append( $( '<span/>', {
                                        class : 'czr-toggle-notice fas fa-info-circle',
                                        title : serverControlParams.i18n.skope['Display informations about the scope of this option.']
                                  } ) ) )
                            .done( function(){
                                  $('.czr-toggle-notice', ctrl.container).fadeIn( 400 );
                            });
                      });

                });

          });
    },


    //fired when a control notice is expanded
    updateCtrlSkpNot : function( controlIdCandidates, visible ) {
           var self = this,
              controlIds = _.isArray(controlIdCandidates) ? controlIdCandidates : [controlIdCandidates],
              _isSkoped = function( setId ) {
                    return setId && self.isSettingSkopeEligible( setId );
              },//filter only eligible ctrlIds

              _generateControlNotice = function( setId, _localSkopeId ) {
                    var _currentSkopeId         = api.czr_activeSkopeId(),
                        _inheritedFromSkopeId   = self.getInheritedSkopeId( setId, _currentSkopeId ),
                        _overridedBySkopeId     = self.getAppliedPrioritySkopeId( setId, _currentSkopeId ),
                        _html = [],
                        _isCustomized,
                        _hasDBVal,
                        _ctxTitle;

                    //////////////////////
                    /// CASE 0 : not skoped
                    if ( ! _isSkoped( setId ) ) {
                          _html.push( [
                                serverControlParams.i18n.skope['This option is always customized sitewide and cannot be reset.']
                          ].join(' ') );
                          return _html.join(' | ');
                    }

                    //////////////////////
                    /// CASE 1
                    if ( _inheritedFromSkopeId == _overridedBySkopeId && api.czr_skope.has( _inheritedFromSkopeId ) && _currentSkopeId == _inheritedFromSkopeId ) {
                          //is the setId customized in the current skope ?
                          _isCustomized = ! _.isUndefined( api.czr_skope( _currentSkopeId ).dirtyValues()[setId] );
                          _hasDBVal     = ! _.isUndefined( api.czr_skope( _currentSkopeId ).dbValues()[setId] );

                          _ctxTitle = api.czr_skope( _inheritedFromSkopeId )().ctx_title;

                          _ctxTitle = ( _.isString( _ctxTitle ) ? _ctxTitle : '' ).toLowerCase();

                          if ( _isCustomized ) {
                                if ( 'global' == api.czr_skope( _inheritedFromSkopeId )().skope ) {
                                      _html.push( [
                                            serverControlParams.i18n.skope['Customized. Will be applied sitewide once published.'],
                                      ].join(' ') );
                                } else {
                                    _html.push( [
                                          serverControlParams.i18n.skope['Customized. Will be applied to'],
                                          '<strong>' + _ctxTitle + '</strong>',
                                          serverControlParams.i18n.skope['once published.']
                                    ].join(' ') );
                                }
                          } else {
                                if ( _hasDBVal ) {
                                      if ( 'global' == api.czr_skope( _inheritedFromSkopeId )().skope ) {
                                            _html.push( [
                                                  serverControlParams.i18n.skope['Customized and applied sitewide.'],
                                            ].join(' ') );
                                      } else {
                                            _html.push( [
                                                  serverControlParams.i18n.skope['Customized and applied to'],
                                                  '<strong>' + _ctxTitle + '.' + '</strong>'
                                            ].join(' ') );
                                      }
                                } else {
                                      _html.push( serverControlParams.i18n.skope['Default website value applied sitewide.'] );
                                }
                          }
                    }


                    /////////////////////
                    /// CASE 2 : Skope is different than global, there is an inheritance
                    if ( _inheritedFromSkopeId !== _currentSkopeId && api.czr_skope.has( _inheritedFromSkopeId ) ) {
                          //is the setId customized in the current skope ?
                          _isCustomized = ! _.isUndefined( api.czr_skope( _inheritedFromSkopeId ).dirtyValues()[setId] );
                          _hasDBVal     = ! _.isUndefined( api.czr_skope( _inheritedFromSkopeId ).dbValues()[setId] );

                          _ctxTitle = api.czr_skope( _currentSkopeId )().ctx_title;

                          _ctxTitle = ( _.isString( _ctxTitle ) ? _ctxTitle : '' ).toLowerCase();

                          if ( ! _isCustomized && ! _hasDBVal ) {
                                _html.push(
                                      [
                                            serverControlParams.i18n.skope['Default website value.'],
                                            serverControlParams.i18n.skope['You can customize this specifically for'],
                                            '<strong>' + _ctxTitle + '.' + '</strong>'
                                      ].join(' ')
                                );
                          } else {
                                _html.push(
                                      [
                                            serverControlParams.i18n.skope['Currently inherited from'],
                                            self.buildSkopeLink( _inheritedFromSkopeId ) + '.',
                                            serverControlParams.i18n.skope['You can customize this specifically for'],
                                            '<strong>' + _ctxTitle + '.' + '</strong>'
                                      ].join(' ')
                                );
                          }
                    }


                    /////////////////////
                    /// CASE 3
                    if ( _overridedBySkopeId !== _currentSkopeId && api.czr_skope.has( _overridedBySkopeId ) ) {
                          //is the setId customized or saved in the winner skope ?
                          //_hasDBVal = ! _.isUndefined( api.czr_skope( _overridedBySkopeId ).dbValues()[setId] );
                          _isCustomized = ! _.isUndefined( api.czr_skope( _overridedBySkopeId ).dirtyValues()[setId] );

                          _ctxTitle = api.czr_skope( _localSkopeId )().ctx_title;

                          _ctxTitle = ( _.isString( _ctxTitle ) ? _ctxTitle : '' ).toLowerCase();

                          _html.push( [
                                ! _isCustomized ? serverControlParams.i18n.skope['The value currently applied to'] : serverControlParams.i18n.skope['The value that will be applied to'],
                                '<strong>' + _ctxTitle + '</strong>',
                                ! _isCustomized ? serverControlParams.i18n.skope['is set in'] : serverControlParams.i18n.skope['is customized in'],
                                self.buildSkopeLink( _overridedBySkopeId ),
                                serverControlParams.i18n.skope['which has a higher priority than the current option scope'],
                                '<strong>( ' + api.czr_skope( _currentSkopeId )().title + ' ).</strong>'
                          ].join(' ') );
                    }

                    return _html.join(' | ');
              };//_generateControlNotice


          _.each( controlIds, function( _id ) {
                api.control.when( _id, function() {
                      var ctrl = api.control( _id ),
                          setId = api.CZR_Helpers.getControlSettingId( _id ),//get the relevant setting_id for this control
                          _visible = _.isUndefined( visible ) ? ( ctrl.czr_states && ctrl.czr_states( 'noticeVisible' )() ) : visible;

                      //Bail here if the ctrl notice is not set to visible
                      if ( ! _visible  )
                        return;

                      ctrl.deferred.embedded.then( function() {
                            var _localSkopeId = _.findWhere( api.czr_currentSkopesCollection(), { skope : 'local' } ).id,
                                $noticeContainer = ctrl.getNotificationsContainerElement();

                            if ( ! $noticeContainer || ! $noticeContainer.length || _.isUndefined( _localSkopeId ) )
                              return;

                            try {
                                  _html = _generateControlNotice( setId, _localSkopeId );
                            } catch ( er ) {
                                  api.errorLog( '_generateControlNotice : ' + er );
                            }


                            var $skopeNoticeEl = $( '.czr-skope-notice', $noticeContainer );
                            if ( $skopeNoticeEl.length ) {
                                  $skopeNoticeEl.html( _html );
                            } else {
                                  $noticeContainer.append(
                                        [ '<span class="czr-notice czr-skope-notice">', _html ,'</span>' ].join('')
                                  );
                            }
                      });
                });
          });
    },//updateCtrlSkpNot

    // Utility
    // @return bool
    // @param ctrlId = string
    // When do we display the ctrl notice ?
    // 1) When the current skope is not global
    // 2) when the current skope is global AND is overriden by a local or group skope
    isCtrlNoticeVisible : function( ctrlId ) {
          if ( ! api.control.has( ctrlId ) )
            return false;

          var self = this,
              setId = api.CZR_Helpers.getControlSettingId( ctrlId ),//get the relevant setting_id for this control
              _currentSkopeId  = api.czr_activeSkopeId(),
              _overridedBySkopeId  = self.getAppliedPrioritySkopeId( setId, _currentSkopeId ),
              _isSkoped = function( setId ) {
                    return setId && self.isSettingSkopeEligible( setId );
              };//filter only eligible ctrlIds

          if ( 'global' != api.czr_skope( _currentSkopeId )().skope ) {
                return true;
          } else if ( _overridedBySkopeId !== _currentSkopeId && api.czr_skope.has( _overridedBySkopeId ) ) {
                return true;
          }
          return false;
    },


    //@return void()
    removeCtrlSkpNot : function( controlIdCandidates ) {
          var self = this,
              controlIds = _.isArray(controlIdCandidates) ? controlIdCandidates : [controlIdCandidates];

          _.each( controlIds, function( _id ) {
                api.control.when( _id, function() {
                      var ctrl = api.control( _id );

                      ctrl.deferred.embedded.then( function() {
                            var $noticeContainer = ctrl.getNotificationsContainerElement();

                            if ( ! $noticeContainer || ! $noticeContainer.length )
                              return;

                            var $skopeNoticeEl = $( '.czr-skope-notice', $noticeContainer );
                            if ( $skopeNoticeEl.length )
                                  $skopeNoticeEl.remove();
                      });
                });
          });
    }
});//$.extend()
})( wp.customize , jQuery, _ );
var CZRSkopeResetMths = CZRSkopeResetMths || {};
( function ( api, $, _ ) {
$.extend( CZRSkopeResetMths, {
      initialize: function() {
            var self = this;
            self.previewer = api.previewer;
            api.state.create('czr-resetting')(false);
            api.state('czr-resetting').bind( function( state ) {
                  $( document.body ).toggleClass( 'czr-resetting', false !== state );
            });
      },

      //args : {
      //  is_setting : false,
      //  is_skope : false,
      //  skope_id : '',
      //  setId : ''
      //}
      resetChangeset : function( args ) {
            var dfd = $.Deferred(),
                self = this,
                processing = api.state( 'processing' ),
                submitWhenPossible,
                submit_reset,
                request,
                requestAjaxAction,
                query_params,
                query,
                defaults = {
                      is_setting  : false,
                      is_skope    : false,
                      skope_id    : api.czr_activeSkopeId() || '',
                      setId       : ''
                };

            args = _.extend( defaults, args );
            var skope_id = args.skope_id,
                setId = args.setId;

            if( ! api.czr_isChangeSetOn() )
              return dfd.resolve().promise();

            // => will be set to false always after asynchronous request
            //skope dependant submit()
            submit_reset = function( skope_id, setId ) {
                  if ( _.isUndefined( skope_id ) ) {
                      throw new Error( 'RESET: MISSING skope_id');
                  }
                  api.state( 'czr-resetting' )( true );
                  //the skope reset query takes parameters
                  query_params = {
                        skope_id : skope_id,
                        action : 'reset'
                  };
                  query = $.extend(
                        self.previewer.query( query_params ),
                        { nonce:  self.previewer.nonce.save }
                  );

                  //Several cases here :
                  //1) single setting reset
                  //2) entire skope reset
                  if ( args.is_setting ) {
                        $.extend( query , { setting_id : setId } );
                        requestAjaxAction = 'czr_changeset_setting_reset';
                  } else if ( args.is_skope ) {
                        requestAjaxAction = 'czr_changeset_skope_reset';
                  } else {
                        return dfd.reject( 'reset_ajax_action_not_specified' ).promise();
                  }

                  wp.ajax.post( requestAjaxAction , query )
                        .always( function () {
                              api.state( 'czr-resetting' )( false );
                        })
                        .fail( function ( response ) {
                              if ( '0' === response ) {
                                  response = 'not_logged_in';
                              } else if ( '-1' === response ) {
                                // Back-compat in case any other check_ajax_referer() call is dying
                                  response = 'invalid_nonce';
                              }

                              if ( 'invalid_nonce' === response ) {
                                  self.previewer.cheatin();
                              } else if ( 'not_logged_in' === response ) {
                                    self.previewer.preview.iframe.hide();
                                    self.previewer.login().done( function() {
                                          self.resetChangeset( args );
                                          self.previewer.preview.iframe.show();
                                    } );
                              }
                              api.consoleLog( requestAjaxAction + ' failed ', query, response );
                              response = api.czr_skopeBase.buildServerResponse( response );
                              api.trigger( 'error', response );

                              api.czr_serverNotification( { message: response, status : 'error' } );
                              dfd.reject( response );
                        })
                        .done( function( response ) {
                              dfd.resolve( response );
                        });
            };//submit_reset()

            if ( 0 === processing() && false === api.state( 'czr-resetting' )() ) {
                  submit_reset( skope_id, setId );
            } else {
                  submitWhenPossible = function () {
                        if ( 0 === processing() && false === api.state( 'czr-resetting' )() ) {
                              api.state.unbind( 'change', submitWhenPossible );
                              submit_reset( skope_id, setId );
                        }
                  };
                  api.state.bind( 'change', submitWhenPossible );
            }

            return dfd.promise();
      },





      //args : {
      //  is_setting : false,
      //  is_skope : false,
      //  skope_id : '',
      //  setId : ''
      //}
      resetPublished : function( args ) {
            var dfd = $.Deferred(),
                self = this,
                processing = api.state( 'processing' ),
                submitWhenPossible,
                submit_reset,
                request,
                requestAjaxAction,
                query_params,
                query,
                defaults = {
                      is_setting  : false,
                      is_skope    : false,
                      skope_id    : api.czr_activeSkopeId() || '',
                      setId       : ''
                };

            args = _.extend( defaults, args );
            var skope_id = args.skope_id,
                setId = args.setId;

            //skope dependant submit()
            submit_reset = function( skope_id, setId ) {
                  if ( _.isUndefined( skope_id ) ) {
                      throw new Error( 'RESET: MISSING skope_id');
                  }
                  api.state( 'czr-resetting' )( true );
                  //the skope reset query takes parameters
                  query_params = {
                        skope_id : skope_id,
                        action : 'reset'
                  };
                  query = $.extend(
                        self.previewer.query( query_params ),
                        { nonce:  self.previewer.nonce.save }
                  );

                  //Several cases here :
                  //1) single setting reset
                  //2) entire skope reset
                  if ( args.is_setting ) {
                      $.extend( query , { setting_id : setId } );
                      requestAjaxAction = 'czr_published_setting_reset';
                  } else if ( args.is_skope ) {
                      requestAjaxAction = 'czr_published_skope_reset';
                  } else {
                      return dfd.reject( 'reset_ajax_action_not_specified' ).promise();
                  }

                  api.consoleLog('in czr_reset submit : ', skope_id, query );

                  wp.ajax.post( requestAjaxAction , query )
                        .always( function () {
                              api.state( 'czr-resetting' )( false );
                        })
                        .fail( function ( response ) {
                              if ( '0' === response ) {
                                  response = 'not_logged_in';
                              } else if ( '-1' === response ) {
                                // Back-compat in case any other check_ajax_referer() call is dying
                                  response = 'invalid_nonce';
                              }

                              if ( 'invalid_nonce' === response ) {
                                  self.previewer.cheatin();
                              } else if ( 'not_logged_in' === response ) {
                                    self.previewer.preview.iframe.hide();
                                    self.previewer.login().done( function() {
                                          self.resetChangeset( args );
                                          self.previewer.preview.iframe.show();
                                    } );
                              }
                              api.consoleLog( requestAjaxAction + ' failed ', query, response );
                              response = api.czr_skopeBase.buildServerResponse( response );
                              api.trigger( 'error', response );

                              api.czr_serverNotification( { message: response, status : 'error' } );
                              dfd.reject( response );
                        })
                        .done( function( response ) {
                              dfd.resolve( response );
                        });

            };//submit_reset()

            if ( 0 === processing() && false === api.state( 'czr-resetting' )() ) {
                  submit_reset( skope_id, setId );
            } else {
                  submitWhenPossible = function () {
                        if ( 0 === processing() && false === api.state( 'czr-resetting' )() ) {
                              api.state.unbind( 'change', submitWhenPossible );
                              submit_reset( skope_id, setId );
                        }
                  };
                  api.state.bind( 'change', submitWhenPossible );
            }

            return dfd.promise();
      }
});//$.extend
})( wp.customize , jQuery, _ );

var CZRSkopeBaseMths = CZRSkopeBaseMths || {};
( function ( api, $, _ ) {
$.extend( CZRSkopeBaseMths, {
      //fired in skopeBase initialize
      initWidgetSidebarSpecifics : function() {
            var self = this;
            if ( ! self.isExcludedSidebarsWidgets() ) {
                api.czr_activeSkopeId.bind( function( active_skope ) {
                    self.forceSidebarDirtyRefresh( api.czr_activeSectionId(), active_skope );
                });
            }

          //WHEN A WIDGET IS ADDED
          $( document ).bind( 'widget-added', function( e, $o ) {
              if ( self.isExcludedSidebarsWidgets() )
                  return;

              var wgtIdAttr = $o.closest('.customize-control').attr('id'),
                  //get the widget id from the customize-control id attr, and remove 'customize-control-' prefix to get the proper set id
                  wdgtSetId = api.czr_skopeBase.widgetIdToSettingId( wgtIdAttr, 'customize-control-' );
              if ( ! api.has( wdgtSetId ) ) {
                  throw new Error( 'AN ADDED WIDGET COULD NOT BE BOUND IN SKOPE. ' +  wdgtSetId);
              } else {
                  self.listenAPISettings( wdgtSetId );
              }
          });
      },


      forceSidebarDirtyRefresh : function( active_section, active_skope ) {
            var self = this;
            if ( self.isExcludedSidebarsWidgets() )
              return;
            var _save_state = api.state('saved')();

            //Specific for widget sidebars section
            var _debounced = function() {
                if ( api.section.has( active_section ) && "sidebar" == api.section(active_section).params.type ) {
                    var active_skope = active_skope || api.czr_activeSkopeId(),
                        related_setting_name = 'sidebars_widgets[' + api.section(active_section).params.sidebarId + ']',
                        related_setting_val = self.getSkopeSettingVal( related_setting_name, active_skope );

                    //api( related_setting_name )( self.getSkopeSettingVal( related_setting_name, api.czr_activeSkopeId() ) );
                    api.czr_skope( active_skope ).updateSkopeDirties( related_setting_name, related_setting_val );

                    api.previewer.refresh( { the_dirties : api.czr_skope( active_skope ).dirtyValues() } )
                          .done( function() {
                                api.state('saved')( _save_state );
                          });
                }
            };
            _debounced = _.debounce( _debounced, 500 );
            _debounced();
      }
} );//$.extend
})( wp.customize , jQuery, _ );

var CZRSkopeMths = CZRSkopeMths || {};
( function ( api, $, _ ) {
//The Active state is delegated to the scope base class
$.extend( CZRSkopeMths, {
      /*****************************************************************************
      * THE SKOPE MODEL
      *****************************************************************************/
      // 'id'          => 'global',
      // 'level'       => '_all_',
      // 'dyn_type'    => 'option',
      // 'opt_name'    => HU_THEME_OPTIONS,
      // 'is_winner'   => false,
      // 'db'    => array(),
      // 'has_db_val'  => false
      // 'is_forced'  => false,
      initialize: function( skope_id, constructor_options ) {
            var skope = this;
            api.Value.prototype.initialize.call( skope, null, constructor_options );

            skope.isReady = $.Deferred();
            skope.embedded = $.Deferred();
            skope.el = 'czr-scope-' + skope_id;//@todo replace with a css selector based on the scope name

            //write the options as properties, skope_id is included
            $.extend( skope, constructor_options || {} );

            //Make it alive with various Values
            skope.visible     = new api.Value( true );
            skope.winner      = new api.Value( false ); //is this skope the one that will be applied on front end in the current context?
            skope.priority    = new api.Value(); //shall this skope always win or respect the default skopes priority
            skope.active      = new api.Value( false ); //active, inactive. Are we currently customizing this skope ?
            skope.dirtyness   = new api.Value( false ); //true or false : has this skope been customized ?
            skope.skopeResetDialogVisibility = new api.Value( false );

            //setting values are stored in :
            skope.hasDBValues = new api.Value( false );
            skope.dirtyValues = new api.Value({});//stores the current customized value.
            skope.dbValues    = new api.Value({});//stores the latest db values => will be updated on each skope synced event
            skope.changesetValues = new api.Value({});//stores the latest changeset values => will be updated on each skope synced eventsynced event

            ////////////////////////////////////////////////////
            /// MODULE DOM EVENT MAP
            ////////////////////////////////////////////////////
            skope.userEventMap = new api.Value( [
                  //skope switch
                  {
                        trigger   : 'click keydown',
                        selector  : '.czr-scope-switch, .czr-skp-switch-link',
                        name      : 'skope_switch',
                        actions   : function() {
                              api.czr_activeSkopeId( skope().id );
                        }
                  },
                  //skope reset : display warning
                  {
                        trigger   : 'click keydown',
                        selector  : '.czr-scope-reset',
                        name      : 'skope_reset_warning',
                        actions   : 'reactOnSkopeResetUserRequest'
                  }
            ]);//module.userEventMap

            //Reset actions ( deferred cb )
            skope.skopeResetDialogVisibility.bind( function( to, from ) {
                  return skope.skopeResetDialogReact( to );
            }, { deferred : true } );


            //LISTEN TO API DIRTYNESS
            //@to is {setId1 : val1, setId2 : val2, ...}
            skope.dirtyValues.callbacks.add(function() { return skope.dirtyValuesReact.apply(skope, arguments ); } );

            //LISTEN TO CHANGESET VALUES
            skope.changesetValues.callbacks.add(function() { return skope.changesetValuesReact.apply(skope, arguments ); } );

            //LISTEN TO DB VALUES
            skope.dbValues.callbacks.add(function() { return skope.dbValuesReact.apply(skope, arguments ); } );

            //UPDATE global skope collection each time a skope model is populated or updated
            skope.callbacks.add(function() { return skope.skopeReact.apply( skope, arguments ); } );

            //PREPARE THE CONSTRUCTOR OPTIONS AND SET SKOPE MODEL WITH IT
            //=> we don't need to store the db , has_db_val, and changeset properties in the model statically
            //because it will be stored as observable values
            skope.set( _.omit( constructor_options, function( _v, _key ) {
                  return _.contains( [ 'db', 'changeset', 'has_db_val' ], _key );
            } ) );





            ////////////////////////////////////////////////////
            /// SETUP SKOPE OBSERVABLE VALUES LISTENERS
            /// => skope embedded dependants
            ////////////////////////////////////////////////////
            skope.setupObservableViewValuesCallbacks();

            //Now that the values are listened to. Let's set some initial values
            skope.dirtyness( ! _.isEmpty( constructor_options.changeset ) );
            skope.hasDBValues( ! _.isEmpty( constructor_options.db ) );
            skope.winner( constructor_options.is_winner );




            ////////////////////////////////////////////////////
            /// EMBED + SETUP DOM LISTENERS
            ////////////////////////////////////////////////////
            skope.embedded
                  .fail( function() {
                        throw new Error('The container of skope ' + skope().id + ' has not been embededd');
                  })
                  .done( function() {
                        //api.consoleLog('SKOPE : '  + skope().id + ' EMBEDDED');
                        //Setup the user event listeners
                        skope.setupDOMListeners( skope.userEventMap() , { dom_el : skope.container } );

                        skope.isReady.resolve();
                  });

      },//initialize



      //this skope model is instantiated at this point.
      ready : function() {
            var skope = this;
            //WAIT FOR THE SKOPE WRAPPER TO BE EMBEDDED
            //=> The skope wrapper is embedded when api.czr_skopeReady.state() == 'resolved'
            api.czr_skopeBase.skopeWrapperEmbedded.done( function() {
                  //EMBED THE SKOPE VIEW : EMBED AND STORE THE CONTAINER
                  try {
                        $.when( skope.embedSkopeDialogBox() ).done( function( $_container ){
                              if ( false !== $_container.length ) {
                                    //paint it
                                    $_container.css('background-color', skope.color );
                                    skope.container = $_container;
                                    skope.embedded.resolve( $_container );
                              } else {
                                    skope.embedded.reject();
                              }
                        });
                  } catch( er ) {
                        api.errorLog( "In skope base : " + er );
                        skope.embedded.reject();
                  }
            });
      },




      /*****************************************************************************
      * SKOPE API DIRTIES REACTIONS
      *****************************************************************************/
      dirtyValuesReact : function( to, from ) {
            //api.consoleLog('IN DIRTY VALUES REACT', this.id, to, from );
            var skope = this;

            //set the skope() dirtyness boolean state value
            skope.dirtyness( ! _.isEmpty( to ) );
            // skope.dirtyness(
            //       ! _.isEmpty(
            //             'global' != skope().skope ?
            //             to :
            //             _.omit( to, function( _val, _id ) {
            //                   return ! api.czr_skopeBase.isThemeSetting( _id );
            //             })
            //       )
            // );

            //set the API global dirtyness
            api.czr_dirtyness( ! _.isEmpty(to) );

            //build the collection of control ids for which the dirtyness has to be reset
            var ctrlIdDirtynessToClean = [];
            _.each( from, function( _val, _id ) {
                if ( _.has( to, _id ) )
                  return;
                ctrlIdDirtynessToClean.push( _id );
            });

            //SET THE ACTIVE SKOPE CONTROLS DIRTYNESSES
            //The ctrl.czr_state value looks like :
            //{
            // hasDBVal : false,
            // isDirty : false,
            // noticeVisible : false,
            // resetVisible : false
            //}
            if ( skope().id == api.czr_activeSkopeId() ) {
                  //RESET DIRTYNESS FOR THE CLEAN SETTINGS CONTROLS IN THE ACTIVE SKOPE
                  _.each( ctrlIdDirtynessToClean , function( setId ) {
                        if ( ! _.has( api.control( setId ), 'czr_states') )
                          return;
                        api.control( setId ).czr_states( 'isDirty' )( false );
                  });
                  //Set control dirtyness for dirty settings
                  _.each( to, function( _val, _setId ) {
                        if ( ! _.has( api.control( _setId ), 'czr_states') )
                          return;
                        api.control( _setId ).czr_states( 'isDirty' )( true );
                  });
            }
      },


      /*****************************************************************************
      * SKOPE API CHANGESET REACTIONS
      *****************************************************************************/
      changesetValuesReact : function( to, from ) {
            var skope = this,
                _currentServerDirties = $.extend( true, {}, skope.dirtyValues() );
            skope.dirtyValues( $.extend( _currentServerDirties, to ) );
      },


      /*****************************************************************************
      * SKOPE DB VALUES REACTIONS
      *****************************************************************************/
      dbValuesReact : function( to, from ) {
            var skope = this;

            //set the skope() db dirtyness boolean state value
            skope.hasDBValues(
                  ! _.isEmpty(
                        'global' != skope().skope ?
                        to :
                        _.omit( to, function( _val, _id ) {
                              return ! api.czr_skopeBase.isThemeSetting( _id );
                        })
                  )
            );

            //RESET DIRTYNESS FOR THE CONTROLS IN THE ACTIVE SKOPE
            //=> make sure this is set for the active skopes only
            var ctrlIdDbToReset = [];
            _.each( from, function( _val, _id ) {
                if ( _.has( to, _id ) )
                  return;
                ctrlIdDbToReset.push( _id );
            });
            //The ctrl.czr_state value looks like :
            //{
            // hasDBVal : false,
            // isDirty : false,
            // noticeVisible : false,
            // resetVisible : false
            //}
            if ( skope().id == api.czr_activeSkopeId() ) {
                  _.each( ctrlIdDbToReset , function( setId ) {
                        if ( ! _.has( api.control( setId ), 'czr_states') )
                          return;
                        api.control( setId ).czr_states( 'hasDBVal' )( false );
                  });
                  //Set control db dirtyness for settings with a db value
                  _.each( to, function( _val, _setId ) {
                        if ( ! _.has( api.control( _setId ), 'czr_states') )
                          return;

                        api.control( _setId ).czr_states( 'hasDBVal' )( true );
                  });
            }
      },


      /*****************************************************************************
      * SKOPE MODEL CHANGES CALLBACKS
      *****************************************************************************/
      //cb of skope.callbacks
      skopeReact : function( to, from ) {
            var skope = this,
                _current_collection = [],
                _new_collection = [];

            //INFORM COLLECTION
            //populate case
            if ( ! api.czr_skopeBase.isSkopeRegisteredInCollection( to.id ) ) {
                  //Add this new skope to the global skope collection
                  _current_collection = $.extend( true, [], api.czr_skopeCollection() );
                  _current_collection.push( to );
                  api.czr_skopeCollection( _current_collection );
            }
            //update case
            else {
                  //Add this new skope to the global skope collection
                  _current_collection = $.extend( true, [], api.czr_skopeCollection() );
                  _new_collection = _current_collection;
                  //update the collection with the current new skope model
                  _.each( _current_collection, function( _skope, _key ) {
                      if ( _skope.id != skope().id )
                        return;
                      _new_collection[_key] = to;
                  });
                  api.czr_skopeCollection( _new_collection );
            }
      },








      /*****************************************************************************
      * VALUES CALLBACKS WHEN SKOPE EMBEDDED AND READY
      * => The skope container exists at this stage
      *****************************************************************************/
      //@fired in initiliaze
      setupObservableViewValuesCallbacks : function() {
            var skope = this;
            //hide when this skope is not in the current skopes list
            skope.visible.bind( function( is_visible ){
                  if ( 'pending' == skope.embedded.state() ) {
                        skope.embedded.done( function() {
                              skope.container.toggle( is_visible );
                        });
                  } else {
                        skope.container.toggle( is_visible );
                  }

            });

            //How does the view react to model changes ?
            //When active :
            //1) add a green point to the view box
            //2) disable the switch-to icon
            skope.active.bind( function() {
                  if ( 'pending' == skope.embedded.state() ) {
                        skope.embedded.done( function() {
                              skope.activeStateReact.apply( skope, arguments );
                        });
                  } else {
                        skope.activeStateReact.apply( skope, arguments );
                  }
            });

            skope.dirtyness.bind( function() {
                  if ( 'pending' == skope.embedded.state() ) {
                        skope.embedded.done( function() {
                              skope.dirtynessReact.apply( skope, arguments );
                        });
                  } else {
                        skope.dirtynessReact.apply( skope, arguments );
                  }
            });

            skope.hasDBValues.bind( function() {
                  if ( 'pending' == skope.embedded.state() ) {
                        skope.embedded.done( function() {
                              skope.hasDBValuesReact.apply( skope, arguments );
                        });
                  } else {
                        skope.hasDBValuesReact.apply( skope, arguments );
                  }
            });

            skope.winner.bind( function() {
                  if ( 'pending' == skope.embedded.state() ) {
                        skope.embedded.done( function() {
                              skope.winnerReact.apply( skope, arguments );
                        });
                  } else {
                        skope.winnerReact.apply( skope, arguments );
                  }
            });
      },//setupObservableViewValuesCallbacks

      //cb of skope.active.callbacks
      activeStateReact : function( to, from ){
            var skope = this;
            skope.container.toggleClass('inactive', ! to ).toggleClass( 'active', to );
            //api.consoleLog('in the view : listen for scope state change', this.name, to, from );
            $('.czr-scope-switch', skope.container).toggleClass('fa-toggle-on', to).toggleClass('fa-toggle-off', !to);
      },

      //cb of skope.dirtyness.callbacks
      dirtynessReact : function( to, from ) {
            var skope = this;
            $.when( this.container.toggleClass( 'dirty', to ) ).done( function() {
                if ( to )
                  $( '.czr-scope-reset', skope.container).fadeIn('slow').attr('title', [ serverControlParams.i18n.skope['Reset the current customizations for'], skope().title ].join(' ') );
                else if ( ! skope.hasDBValues() )
                  $( '.czr-scope-reset', skope.container).fadeOut('fast');
            });
      },

      //cb of skope.hasDBValues.callbacks
      hasDBValuesReact : function( to, from ) {
            var skope = this;
            $.when( skope.container.toggleClass('has-db-val', to ) ).done( function() {
                if ( to ) {
                      $( '.czr-scope-reset', skope.container)
                            .fadeIn( 'slow')
                            .attr( 'title', [
                                  'global' == skope().skope ? serverControlParams.i18n.skope['Reset the theme options published sitewide'] : serverControlParams.i18n.skope['Reset your website published options for'],
                                  'global' == skope().skope ? '' : skope().title
                            ].join(' ') );
                }
                else if ( ! skope.dirtyness() ) {
                      $( '.czr-scope-reset', skope.container ).fadeOut('fast');
                }
            });
      },

      //cb of skope.winner.callbacks
      winnerReact : function( is_winner ) {
            var skope = this;
            this.container.toggleClass('is_winner', is_winner );

            if ( is_winner ) {
                  //make sure there's only one winner in the current skope collection
                  _.each( api.czr_currentSkopesCollection(), function( _skope ) {
                        if ( _skope.id == skope().id )
                          return;
                        var _current_model = $.extend( true, {}, _skope );
                        $.extend( _current_model, { is_winner : false } );
                        api.czr_skope( _skope.id )( _current_model );
                  });
            }
      },




      /*****************************************************************************
      * HELPERS
      *****************************************************************************/
      //this method updates a given skope instance dirty values
      //and returns the dirty values object
      //fired on api setting change and in the ajax query
      updateSkopeDirties : function( setId, new_val ) {
            var skope = this,
                shortSetId = api.CZR_Helpers.getOptionName( setId );

            //for the settings that are excluded from skope, the skope is always the global one
            if ( ! api.czr_skopeBase.isSettingSkopeEligible( setId ) && 'global' != skope().skope )
              return api.czr_skope( api.czr_skopeBase.getGlobalSkopeId() ).updateSkopeDirties( setId, new_val );

            var current_dirties = $.extend( true, {}, skope.dirtyValues() ),
                _dirtyCustomized = {};

            _dirtyCustomized[ setId ] = new_val;
            skope.dirtyValues.set( $.extend( current_dirties , _dirtyCustomized ) );
            return skope.dirtyValues();
      },



      //@return the boolean dirtyness state of a given setId for a given skope
      getSkopeSettingDirtyness : function( setId ) {
            var skope = this;
            return skope.getSkopeSettingAPIDirtyness( setId ) || skope.getSkopeSettingChangesetDirtyness( setId );
      },

      //Has this skope already be customized in the API ?
      getSkopeSettingAPIDirtyness : function( setId ) {
            var skope = this;
            return _.has( skope.dirtyValues(), api.CZR_Helpers.build_setId( setId ) );
      },

      //Has this skope already be customized in the API ?
      getSkopeSettingChangesetDirtyness : function( setId ) {
            var skope = this;
            if ( ! api.czr_isChangeSetOn() )
              return skope.getSkopeSettingAPIDirtyness( setId );
            return _.has( skope.changesetValues(), api.CZR_Helpers.build_setId( setId ) );
      },

      //@return boolean
      hasSkopeSettingDBValues : function( setId ) {
            var skope = this,
                _setId = api.CZR_Helpers.build_setId(setId);

            return ! _.isUndefined( api.czr_skope( api.czr_activeSkopeId() ).dbValues()[_setId] );
      }
});//$.extend(
})( wp.customize , jQuery, _ );
var CZRSkopeMths = CZRSkopeMths || {};
( function ( api, $, _ ) {
$.extend( CZRSkopeMths, {
      embedSkopeDialogBox : function() {
            var skope = this,
                skope_model = $.extend( true, {}, skope() ),
                _tmpl = '';

            //@todo will need to be refreshed on scopes change in the future
            if ( ! $('#customize-header-actions').find('.czr-scope-switcher').length ) {
                throw new Error('The skope switcher wrapper is not printed, the skope can not be embedded.');
            }
            try {
                  _tmpl =  wp.template('czr-skope')( _.extend( skope_model, { el : skope.el } ) );
            } catch( er ) {
                  api.errorLog( 'Error when parsing the template of a skope' + er );
                  return false;
            }

            $('.czr-skopes-wrapper', '#customize-header-actions').append( $( _tmpl ) );
            return $( '.' + skope.el , '.czr-skopes-wrapper' );
      },




      // setSkopeSwitcherButtonActive : function( dyn_type ) {
      //       $('.button', '.czr-scope-switcher').each( function( ind ) {
      //         $(this).toggleClass( 'active', dyn_type == $(this).attr('data-dyn-type') );
      //       });
      // },



      /*****************************************************************************
      * RESET
      *****************************************************************************/
      renderResetWarningTmpl : function() {
            var skope = this,
                skope_model = $.extend( true, {}, skope() ),
                _tmpl = '',
                warning_message,
                success_message;

            if ( skope.dirtyness() ) {
                  warning_message = [
                        serverControlParams.i18n.skope['Please confirm that you want to reset your current ( not published ) customizations for'],
                        skope().ctx_title
                  ].join(' ');
                  success_message = [
                        serverControlParams.i18n.skope['Your customizations have been reset for'],
                        skope().ctx_title
                  ].join(' ');
            } else {
                  warning_message = [
                        'global' == skope().skope ? serverControlParams.i18n.skope['Please confirm that you want to reset your sitewide published customizations. Note : this will not reset the customizations made in other option scopes'] : serverControlParams.i18n.skope['Please confirm that you want to reset your published customizations for'],
                        'global' == skope().skope ? '' : skope().ctx_title
                  ].join(' ');
                  success_message = [
                        serverControlParams.i18n.skope['Your published customizations have been reset for'],
                        skope().title
                  ].join(' ');
            }

            try {
                  _tmpl =  wp.template( 'czr-skope-pane' )(
                        _.extend( skope_model, {
                              el : skope.el,
                              warning_message : warning_message + '.',
                              success_message : success_message + '.'
                        } )
                  );
            } catch( er ) {
                  api.errorLog( 'Error when parsing the the reset skope template : ' + er );
                  return false;
            }

            $('#customize-preview').after( $( _tmpl ) );

            return $( '#czr-skope-pane' );
      },




      /*****************************************************************************
      * HELPERS
      *****************************************************************************/
      getEl : function() {
            var skope = this;
            return $( skope.el, '#customize-header-actions');
      }
});//$.extend()
})( wp.customize , jQuery, _ );

var CZRSkopeMths = CZRSkopeMths || {};
( function ( api, $, _ ) {
//The Active state is delegated to the skope base class
$.extend( CZRSkopeMths, {
      /*****************************************************************************
      * RESET
      *****************************************************************************/
      //Fired when on user click on ".czr-scope-reset", defined in skope model init
      //Handles several scenarios :
      //1) a reset ajax request (save, changeset, reset) can be currently processed, we need to wait for completion
      //2) another skope reset dialog panel might be already opened
      reactOnSkopeResetUserRequest : function() {
            var skope = this,
                _fireReaction = function() {
                      api.state( 'czr-resetting')( true );
                      if ( api.czr_activeSkopeId() != skope().id ) {
                            api.czr_activeSkopeId( skope().id )
                                  .done( function() {
                                        skope.skopeResetDialogVisibility( ! skope.skopeResetDialogVisibility() ).done( function() {
                                              api.state( 'czr-resetting')( false );
                                        });

                                  });
                      } else {
                            skope.skopeResetDialogVisibility( ! skope.skopeResetDialogVisibility() ).done( function() {
                                  api.state( 'czr-resetting')( false );
                            });
                      }
                };

            //Bail if other process currenty running
            if ( ( api.state( 'czr-resetting')() || 0 !== api.state( 'processing' )() ) ) {
                    api.czr_serverNotification( {
                          message: 'Slow down, you move too fast !',
                          status : 'success',
                          auto_collapse : true
                    });
                    return;
            }
            //Close the current panel if a reset for a different skope is requested
            if ( api.czr_activeSkopeId() != skope().id && api.czr_skope( api.czr_activeSkopeId() ).skopeResetDialogVisibility() ) {
                  api.czr_skope( api.czr_activeSkopeId() ).skopeResetDialogVisibility( false ).done( function() {
                        _fireReaction();
                  });
            } else {
                  _fireReaction();
            }
      },









      //cb of skope.skopeResetDialogVisibility.callbacks
      //Setup user DOM events listeners
      //Render the dialog box
      skopeResetDialogReact : function( visible ) {
            var skope = this, dfd = $.Deferred();
            //Are we currently performing a reset or any other processing task ? (reset setting or skope, saving )
            //=> if so, let's defer the current action when its possible
            // if ( api.state( 'czr-resetting')() || 0 !== api.state( 'processing' )() ) {
            //         var reactWhenPossible = function () {
            //               if ( 0 === api.state( 'processing' )() && false === api.state( 'czr-resetting' )() ) {
            //                     api.state.unbind( 'change', reactWhenPossible );
            //                     skope.skopeResetDialogReact( visible );
            //               }
            //         };
            //         api.state.bind( 'change', reactWhenPossible );
            //         return dfd.resolve().promise();
            // }

            //Event Map for the Reset Panel
            skope.userResetEventMap = skope.userResetEventMap || new api.Value( [
                  //skope reset : display warning
                  {
                        trigger   : 'click keydown',
                        selector  : '.czr-scope-reset-cancel',
                        name      : 'skope_reset_cancel',
                        actions   : function() {
                            skope.skopeResetDialogVisibility( ! skope.skopeResetDialogVisibility() );
                        }
                  },
                  //skope reset : do reset
                  {
                        trigger   : 'click keydown',
                        selector  : '.czr-scope-do-reset',
                        name      : 'skope_do_reset',
                        actions   : 'doResetSkopeValues'
                  }
              ]
            );

            if ( visible ) {
                  //inform the api that we are resetting
                  //=> some actions have to be frozen in this state
                  //like for example, resetting another skope
                  api.czr_isResettingSkope( skope().id );

                  //render reset warning template
                  $.when( skope.renderResetWarningTmpl() ).done( function( $_container ) {
                        skope.resetPanel = $_container;
                        //add the reset type class
                        skope.resetPanel.addClass( skope.dirtyness() ? 'dirty-reset' : 'db-reset' );
                        skope.setupDOMListeners( skope.userResetEventMap() , { dom_el : skope.resetPanel } );
                        //$('body').addClass('czr-skope-pane-open');
                  }).then( function() {
                        setTimeout( function() {
                              //set height
                              var _height = $('#customize-preview').height();
                              skope.resetPanel.css( 'line-height', _height +'px' ).css( 'height', _height + 'px' );
                              //display
                              $('body').addClass('czr-skope-pane-open');
                        }, 50 );
                  });
            } else {
                  $.when( $('body').removeClass('czr-skope-pane-open') ).done( function() {
                        if ( _.has( skope, 'resetPanel') && false !== skope.resetPanel.length ) {
                              setTimeout( function() {
                                    skope.resetPanel.remove();
                                    api.czr_isResettingSkope( false );
                              }, 300 );
                        }
                  });
            }

            //wait for panel sliding action before resolving
            _.delay( function() { dfd.resolve(); }, 350 );

            return dfd.promise();
      },



      //fired on user click
      //Is used for both resetting customized and db values, depending on the skope customization state
      doResetSkopeValues : function() {
            var skope = this,
                skope_id = skope().id,
                reset_method = skope.dirtyness() ? '_resetSkopeDirties' : '_resetSkopeAPIValues',
                _updateAPI = function() {
                      var _silentUpdate = function() {
                            api.czr_skopeBase.processSilentUpdates( { refresh : false } )
                                  .fail( function() { api.consoleLog( 'Silent update failed after resetting skope : ' + skope_id ); } )
                                  .done( function() {
                                        $.when( $('.czr-reset-warning', skope.resetPanel ).fadeOut('300') ).done( function() {
                                              $.when( $('.czr-reset-success', skope.resetPanel ).fadeIn('300') ).done( function() {
                                                    _.delay( function() {
                                                          api.czr_isResettingSkope( false );
                                                          skope.skopeResetDialogVisibility( false );
                                                    }, 2000 );
                                              });
                                        });
                                  });
                      };

                      skope[reset_method]()
                            .done( function() {
                                  //api.previewer.refresh() method is resolved with an object looking like :
                                  //{
                                  //    previewer : api.previewer,
                                  //    skopesServerData : {
                                  //        czr_skopes : _wpCustomizeSettings.czr_skopes || [],
                                  //        isChangesetDirty : boolean
                                  //    },
                                  // }
                                  api.previewer.refresh()
                                        .fail( function( refresh_data ) {
                                              api.consoleLog('SKOPE RESET REFRESH FAILED', refresh_data );
                                        })
                                        .done( function( refresh_data ) {
                                              if ( 'global' == api.czr_skope( skope_id )().skope && '_resetSkopeAPIValues' == reset_method ) {
                                                    var _sentSkopeCollection,
                                                        _serverGlobalDbValues = {},
                                                        _skope_opt_name = api.czr_skope( skope_id )().opt_name;

                                                    if ( ! _.isUndefined( refresh_data.skopesServerData ) && _.has( refresh_data.skopesServerData, 'czr_skopes' ) ) {
                                                          _sentSkopeCollection = refresh_data.skopesServerData.czr_skopes;
                                                          if ( _.isUndefined( _.findWhere( _sentSkopeCollection, { opt_name : _skope_opt_name } ) ) ) {
                                                                _serverGlobalDbValues = _.findWhere( _sentSkopeCollection, { opt_name : _skope_opt_name } ).db || {};
                                                          }
                                                    }
                                                    api.czr_skopeBase.maybeSynchronizeGlobalSkope( { isGlobalReset : true, isSkope : true, skopeIdToReset : skope_id } )
                                                          .done( function() {
                                                                _silentUpdate();
                                                          });
                                              } else {
                                                    _silentUpdate();
                                              }
                                        });

                            });
                };//_updateAPI

            $('body').addClass('czr-resetting-skope');
            //$('.czr-reset-warning', skope.resetPanel ).hide();

            //When resetting the db value, wait for the ajax promise to be done before reseting the api values.
            api.czr_skopeReset[ skope.dirtyness() ? 'resetChangeset' : 'resetPublished' ](
                        { skope_id : skope().id, is_skope : true } )
                        .always( function() {
                              $('body').removeClass('czr-resetting-skope');//hides the spinner
                        })
                        .done( function( r ) {
                              _updateAPI();
                        })
                        .fail( function( r ) {
                                skope.skopeResetDialogVisibility( false );
                                api.consoleLog('Skope reset failed', r );
                        });
      },


      //fired in doResetSkopeValues
      //@uses The ctrl.czr_states values
      _resetSkopeDirties : function() {
            var skope = this, dfd = $.Deferred();
            skope.dirtyValues({});
            skope.changesetValues({});
            return dfd.resolve().promise();
      },

      //fired in doResetSkopeValues
      //@uses The ctrl.czr_states values
      _resetSkopeAPIValues : function() {
            var skope = this, dfd = $.Deferred();
            //update the skope model db property
            skope.dbValues( {} );
            return dfd.resolve().promise();
      }
});//$.extend(
})( wp.customize , jQuery, _ );
( function ( api, $, _ ) {

      //SKOPE
      $.extend( CZRSkopeBaseMths, api.Events );
      $.extend( CZRSkopeMths, api.Events );
      $.extend( CZRSkopeMths, api.CZR_Helpers );
      api.CZR_skopeBase             = api.Class.extend( CZRSkopeBaseMths );
      //api.CZR_skopeSave             = api.Class.extend( CZRSkopeSaveMths );
      api.CZR_skopeReset            = api.Class.extend( CZRSkopeResetMths );
      api.CZR_skope                 = api.Value.extend( CZRSkopeMths ); //=> used as constructor when creating the collection of skopes

      //Skope related :
      //=> Special case for the header image
      //Capture objects before they are overridden by WP.
      //=> needed when regenerating the header_image control.
      if ( _.has(api, 'HeaderTool') ) {
            api.czr_HeaderTool = $.extend(  true, {}, api.HeaderTool );
      }

})( wp.customize, jQuery, _ );
( function ( api, $, _ ) {
      //SET THE ACTIVE STATE OF THE THEMES SECTION BASED ON WHAT THE SERVER SENT
      api.bind('ready', function() {
            var _do = function() {
                  api.section('themes').active.bind( function( active ) {
                        if ( ! _.has( serverControlParams, 'isThemeSwitchOn' ) || ! _.isEmpty( serverControlParams.isThemeSwitchOn ) )
                          return;
                        api.section('themes').active( serverControlParams.isThemeSwitchOn );
                        //reset the callbacks
                        api.section('themes').active.callbacks = $.Callbacks();
                  });
            };
            if ( api.section.has( 'themes') )
                _do();
            else
                api.section.when( 'themes', function( _s ) {
                      _do();
                });
      });



})( wp.customize , jQuery, _);
( function ( api, $, _ ) {
      /*****************************************************************************
      * DEFINE SOME USEFUL OBSERVABLE VALUES
      *****************************************************************************/
      //STORE THE CURRENTLY ACTIVE SECTION AND PANELS IN AN OBSERVABLE VALUE
      //BIND EXISTING AND FUTURE SECTIONS AND PANELS
      api.czr_activeSectionId = new api.Value('');
      api.czr_activePanelId = new api.Value('');

      /*****************************************************************************
      * OBSERVE UBIQUE CONTROL'S SECTIONS EXPANSION
      *****************************************************************************/
      if ( 'function' === typeof api.Section ) {
            //move controls back and forth in declared ubique sections
            //=> implemented in the customizr theme for the social links boolean visibility controls ( socials in header, sidebar, footer )
            api.control.bind( 'add', function( _ctrl ) {
                  if ( _ctrl.params.ubq_section && _ctrl.params.ubq_section.section ) {
                        //save original state
                        _ctrl.params.original_priority = _ctrl.params.priority;
                        _ctrl.params.original_section  = _ctrl.params.section;

                        api.section.when( _ctrl.params.ubq_section.section, function( _section_instance ) {
                                _section_instance.expanded.bind( function( expanded ) {
                                      if ( expanded ) {
                                            if ( _ctrl.params.ubq_section.priority ) {
                                                  _ctrl.priority( _ctrl.params.ubq_section.priority );
                                            }
                                            _ctrl.section( _ctrl.params.ubq_section.section );
                                      }
                                      else {
                                            _ctrl.priority( _ctrl.params.original_priority );
                                            _ctrl.section( _ctrl.params.original_section );
                                      }
                                });

                        } );
                  }
            });
      }


      /*****************************************************************************
      * OBSERVE UBIQUE CONTROL'S PANELS EXPANSION
      *****************************************************************************/
      if ( 'function' === typeof api.Panel ) {
            //move section back and forth in declared ubique panels
            api.section.bind( 'add', function( _sec ) {
                  if ( _sec.params.ubq_panel && _sec.params.ubq_panel.panel ) {
                        //save original state
                        _sec.params.original_priority = _sec.params.priority;
                        _sec.params.original_panel  = _sec.params.panel;

                        api.panel.when( _sec.params.ubq_panel.panel, function( _panel_instance ) {
                                _panel_instance.expanded.bind( function( expanded ) {
                                      if ( expanded ) {
                                            if ( _sec.params.ubq_panel.priority ) {
                                                  _sec.priority( _sec.params.ubq_panel.priority );
                                            }
                                            _sec.panel( _sec.params.ubq_panel.panel );
                                      }
                                      else {
                                            _sec.priority( _sec.params.original_priority );
                                            _sec.panel( _sec.params.original_panel );
                                      }
                                });

                        } );
                  }
            });
      }


      /*****************************************************************************
      * CLOSE THE MOD OPTION PANEL ( if exists ) ON : section change, panel change, skope switch
      *****************************************************************************/
      //@return void()
      var _closeModOpt = function() {
            if ( ! _.has( api, 'czr_ModOptVisible') )
              return;
            api.czr_ModOptVisible(false);
      };
      api.czr_activeSectionId.bind( _closeModOpt );
      api.czr_activePanelId.bind( _closeModOpt );

      /*****************************************************************************
      * OBSERVE SECTIONS AND PANEL EXPANSION
      * /store the current expanded section and panel
      *****************************************************************************/
      api.bind('ready', function() {
            if ( 'function' != typeof api.Section ) {
              throw new Error( 'Your current version of WordPress does not support the customizer sections needed for this theme. Please upgrade WordPress to the latest version.' );
            }
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
                  api.trigger('czr-paint', { active_panel_id : section_instance.panel() } );
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
      * ADD PRO BEFORE SPECIFIC SECTIONS AND PANELS
      *****************************************************************************/
      if ( serverControlParams.isPro ) {
            _.each( [
                  //WFC
                  'tc_font_customizer_settings',

                  //hueman pro
                  'header_image_sec',
                  'content_blog_sec',
                  'static_front_page',
                  'content_single_sec',

                  //customizr-pro
                  'tc_fpu',
                  'nav',
                  'post_lists_sec',
                  'galleries_sec',
                  'footer_customizer_sec',
                  'custom_scripts_sec',
                  'contact_info_sec'

            ], function( _secId ) {
                  _.delay( function() {
                      api.section.when( _secId, function( _sec_ ) {
                            if ( 1 >= _sec_.headContainer.length ) {
                                _sec_.headContainer.find('.accordion-section-title').prepend( '<span class="pro-title-block">Pro</span>' );
                            }
                      });
                  }, 1000 );
            });
            _.each( [
                  //hueman pro
                  //'hu-header-panel',
                  //'hu-content-panel',

                  //customizr-pro
                  //'tc-header-panel',
                  //'tc-content-panel',
                  //'tc-footer-panel',
                  //'tc-advanced-panel'
            ], function( _secId ) {
                  api.panel.when( _secId, function( _sec_ ) {
                        if ( 1 >= _sec_.headContainer.length ) {
                            _sec_.headContainer.find('.accordion-section-title').prepend( '<span class="pro-title-block">Pro</span>' );
                        }
                  });
            });
      }


      /*****************************************************************************
      * PRO SECTION CONSTRUCTOR
      *****************************************************************************/
      if ( ! serverControlParams.isPro && _.isFunction( api.Section ) ) {
            proSectionConstructor = api.Section.extend( {
                  active : true,
                  // No events for this type of section.
                  attachEvents: function () {},
                  // Always make the section active.
                  isContextuallyActive: function () {
                    return this.active();
                  },
                  _toggleActive: function(){ return true; },

            } );

            $.extend( api.sectionConstructor, {
                  'czr-customize-section-pro' : proSectionConstructor
            });
      }
})( wp.customize , jQuery, _);
//extends api.CZRDynModule
var CZRSocialModuleMths = CZRSocialModuleMths || {};
( function ( api, $, _ ) {
$.extend( CZRSocialModuleMths, {
      initialize: function( id, options ) {
              var module = this;
              //run the parent initialize
              api.CZRDynModule.prototype.initialize.call( module, id, options );

              //extend the module with new template Selectors
              $.extend( module, {
                    itemPreAddEl : 'czr-module-social-pre-add-view-content',
                    itemInputList : 'czr-module-social-item-content',
                    modOptInputList : 'czr-module-social-mod-opt'
              } );


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
                //'bitbucket-square', //<-  removed in fa5
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
                'deviantart',
                'digg',
                'dribbble',
                'dropbox',
                'drupal',
                'edge',
                'empire',
                'envelope',
                'envelope-o', //<- go with far envelope
                'envelope-square',
                'expeditedssl',
                'facebook',
                'facebook-f (alias)',
                //'facebook-official', //<-  removed in fa5
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
                'github-alt',
                'github-square',
                'gitlab',
                'git-square',
                'google',
                'google-plus',
                //'google-plus-circle', //<- removed in fa5
                //'google-plus-official', //<- removed in fa5
                'google-plus-g', //<- added in fa5
                'google-plus-square',
                'google-wallet',
                'gratipay',
                'hacker-news',
                'houzz',
                'imdb',
                'instagram',
                'internet-explorer',
                'ioxhost',
                'joomla',
                'jsfiddle',
                'lastfm',
                'lastfm-square',
                'leanpub',
                'linkedin',
                //'linkedin-square', //<-  removed in fa5
                'linkedin-in', //<- added in fa5
                'linux',
                'maxcdn',
                //'meanpath', <- removed in fa5
                'meetup',
                'medium',
                'mixcloud',
                'mobile',
                'mobile-alt',//<- added in fa5
                'modx',
                'odnoklassniki',
                'odnoklassniki-square',
                'opencart',
                'openid',
                'opera',
                'optin-monster',
                'pagelines',
                'paypal',
                'phone',
                'phone-square',
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
                'snapchat',
                'soundcloud',
                'spotify',
                'stack-exchange',
                'stack-overflow',
                'steam',
                'steam-square',
                'stumbleupon',
                'stumbleupon-circle',
                'telegram',
                'tencent-weibo',
                'trello',
                'tripadvisor',
                'tumblr',
                'tumblr-square',
                'twitch',
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
                'y-combinator',
                'yelp',
                'youtube',
                //'youtube-play', //<- removed in fa5
                'youtube-square'
              ];

              //FA5 backward compatibility with FA4
              //see https://github.com/presscustomizr/customizr/issues/1364
              this.fa_solid_icons = [
                'fa-envelope',
                'fa-envelope-square',
                'fa-mobile',
                'fa-mobile-alt',
                'fa-phone',
                'fa-phone-square',
                'fa-rss',
                'fa-rss-square',
                'fa-share-alt',
                'fa-share-alt-square'
              ];

              this.fa_icons_replacement = {
                'fa-bitbucket-square'     : 'fa-bitbucket',
                'fa-facebook-official'    : 'fa-facebook-f',
                'fa-google-plus-circle'   : 'fa-google-plus',
                'fa-google-plus-official' : 'fa-google-plus',
                'fa-linkedin-square'      : 'fa-linkedin',
                'fa-youtube-play'         : 'fa-youtube'
              }

              //EXTEND THE DEFAULT CONSTRUCTORS FOR INPUT
              module.inputConstructor = api.CZRInput.extend( module.CZRSocialsInputMths || {} );
              //EXTEND THE DEFAULT CONSTRUCTORS FOR MONOMODEL
              module.itemConstructor = api.CZRItem.extend( module.CZRSocialsItem || {} );

              //declares a default ModOpt model
              this.defaultModOptModel = {
                  is_mod_opt : true,
                  module_id : module.id,
                  'social-size' : serverControlParams.social_el_params.defaultSocialSize || 14
              };

              //declares a default model
              this.defaultItemModel = {
                    id : '',
                    title : '' ,
                    'social-icon' : '',
                    'social-link' : '',
                    'social-color' : serverControlParams.social_el_params.defaultSocialColor,
                    'social-target' : 1
              };

              //overrides the default success message
              this.itemAddedMessage = serverControlParams.i18n.socialLinkAdded;

              //fired ready :
              //1) on section expansion
              //2) or in the case of a module embedded in a regular control, if the module section is already opened => typically when skope is enabled
              if ( _.has( api, 'czr_activeSectionId' ) && module.control.section() == api.czr_activeSectionId() && 'resolved' != module.isReady.state() ) {
                    module.ready();
              }

              api.section( module.control.section() ).expanded.bind(function(to) {
                    //set module ready on section expansion
                    if ( 'resolved' != module.isReady.state() ) {
                          module.ready();
                    }
              });

              module.isReady.then( function() {
                    //specific update for the item preModel on social-icon change
                    module.preItem.bind( function( to, from ) {
                          if ( ! _.has(to, 'social-icon') )
                            return;
                          if ( _.isEqual( to['social-icon'], from['social-icon'] ) )
                            return;
                          module.updateItemModel( module.preItem, true );
                    });
              });
      },//initialize


      //ACTIONS ON ICON CHANGE
      //Fired on 'social-icon:changed'
      //Don't fire in pre item case
      //@item_instance an be the preItem or an already created item
      updateItemModel : function( item_instance, is_preItem ) {
              var item = item_instance;
              is_preItem = is_preItem || false;

              //check if we are in the pre Item case => if so, the social-icon might be empty
              if ( ! _.has( item(), 'social-icon') || _.isEmpty( item()['social-icon'] ) )
                return;

              var _new_model, _new_title, _new_color;

              _new_model  = $.extend( true, {}, item() );//always safer to deep clone ( alternative to _.clone() ) => we don't know how nested this object might be in the future
              _new_title  = this.getTitleFromIcon( _new_model['social-icon'] );
              _new_color  = serverControlParams.social_el_params.defaultSocialColor;
              if ( ! is_preItem && item.czr_Input.has( 'social-color' ) )
                _new_color = item.czr_Input('social-color')();

              //add text follow us... to the title
              _new_title = [ serverControlParams.i18n.followUs, _new_title].join(' ');

              if ( is_preItem ) {
                    _new_model = $.extend( _new_model, { title : _new_title, 'social-color' : _new_color } );
                    item.set( _new_model );
              } else {
                    item.czr_Input('title').set( _new_title );
                    //item.czr_Input('social-link').set( '' );
                    if ( item.czr_Input('social-color') ) { //optional
                      item.czr_Input('social-color').set( _new_color );
                    }
              }
      },

      /* Helpers */
      getTitleFromIcon : function( icon ) {
              return api.CZR_Helpers.capitalize( icon.replace('fa-', '').replace('envelope', 'email') );
      },

      getIconFromTitle : function( title ) {
              return  'fa-' . title.toLowerCase().replace('envelope', 'email');
      },

      //from : https://stackoverflow.com/a/34560648
      _strReplace : function( $f, $r, $s ) {
              return $s.replace(new RegExp("(" + (typeof($f) == "string" ? $f.replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&") : $f.map(function(i){return i.replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&")}).join("|")) + ")", "g"), typeof($r) == "string" ? $r : typeof($f) == "string" ? $r[0] : function(i){ return $r[$f.indexOf(i)]});
      },

      buildFaIcon : function( value ) {
              //FA5 backward compatibility with FA4
              //see https://github.com/presscustomizr/customizr/issues/1364
              //by default they're brands
              var _fa_group       = 'fab', //<- brand group by default
                  _icon_class     = value.toLowerCase(),
                solidIcons        = this.fa_solid_icons,
                iconsReplacement  = this.fa_icons_replacement;

              _icon_class = this._strReplace( _.keys( iconsReplacement ),  _.values( iconsReplacement ),_icon_class);

              //former -o icons => now part of the far (Regular) group
              if ( _icon_class.match(/-o$/) ) {
                    _fa_group  = 'far';
                    _icon_class = _icon_class.replace(/-o$/,'');
              }
              //solid icons
              else if ( _.contains( solidIcons, _icon_class ) ) {
                    _fa_group = 'fas';
              }

              return _fa_group + ' ' +_icon_class;

      },



      CZRSocialsInputMths : {
              setupSelect : function() {
                    var input              = this,
                        item               = input.input_parent,
                        module             = input.module,
                        socialList         = module.social_icons,
                        solidIcons         = module.fa_solid_icons,
                        iconsReplacement   = module.fa_icons_eplacement,
                        _model             = item(),
                        //check if we are in the pre Item case => if so, the id is empty
                        is_preItem         = _.isEmpty( _model.id );

                    //=> add the select text in the pre Item case
                    if ( is_preItem ) {
                          socialList = _.union( [ serverControlParams.i18n.selectSocialIcon ], socialList );
                    }

                    //generates the options
                    _.each( socialList , function( icon_name, k ) {
                          // in the pre Item case the first select element is the notice "Select a social icon"
                          // doesn't need the fa-* class
                          var _value    = ( is_preItem && 0 === k ) ? '' : 'fa-' + icon_name.toLowerCase(),
                              _attributes = {
                                    value : _value,
                                    html: module.getTitleFromIcon( icon_name )
                              };
                          if ( _value == _model['social-icon'] )
                            $.extend( _attributes, { selected : "selected" } );

                          $( 'select[data-type="social-icon"]', input.container ).append( $('<option>', _attributes) );
                    });

                    function addIcon( state ) {
                          if (! state.id) { return state.text; }

                          //two spans here because we cannot wrap the social text into the social icon span as the solid FA5 font-weight is bold
                          var  $state = $(
                            '<span class="' + module.buildFaIcon( state.element.value.toLowerCase() ) + '"></span><span class="social-name">&nbsp;&nbsp;' + state.text + '</span>'
                          );
                          return $state;
                    }

                    //fire select2
                    $( 'select[data-type="social-icon"]', input.container ).select2( {
                            templateResult: addIcon,
                            templateSelection: addIcon
                    });
            },

            setupColorPicker : function( obj ) {
                    var input      = this,
                        item       = input.input_parent,
                        module     = input.module,
                        $el        = $( 'input[data-type="social-color"]', input.container );

                    $el.iris( {
                              palettes: true,
                              hide:false,
                              defaultColor : serverControlParams.social_el_params.defaultSocialColor || 'rgba(255,255,255,0.7)',
                              change : function( e, o ) {
                                    //if the input val is not updated here, it's not detected right away.
                                    //weird
                                    //is there a "change complete" kind of event for iris ?
                                    //hack to reset the color to default...@todo => use another color picker.
                                    if ( _.has( o, 'color') && 16777215 == o.color._color )
                                      $(this).val( serverControlParams.social_el_params.defaultSocialColor || 'rgba(255,255,255,0.7)' );
                                    else
                                      $(this).val( o.color.toString() );

                                    $(this).trigger('colorpickerchange').trigger('change');
                              }
                    });

                    //when the picker opens, it might be below the visible viewport.
                    //No built-in event available to react on this in the wpColorPicker unfortunately
                    $el.closest('div').on('click keydown', function() {
                          module._adjustScrollExpandedBlock( input.container );
                    });
            }

      },//CZRSocialsInputMths









      CZRSocialsItem : {
              //Fired if the item has been instantiated
              //The item.callbacks are declared.
              ready : function() {
                    var item = this;
                    api.CZRItem.prototype.ready.call( item );

                    //update the item model on social-icon change
                    item.bind('social-icon:changed', function(){
                          item.module.updateItemModel( item );
                    });
              },


              _buildTitle : function( title, icon, color ) {
                      var item = this,
                          module     = item.module;

                      title = title || ( 'string' === typeof(icon) ? api.CZR_Helpers.capitalize( icon.replace( 'fa-', '') ) : '' );
                      title = api.CZR_Helpers.truncate(title, 20);
                      icon = icon || 'fa-' + module.social_icons[0];
                      color = color || serverControlParams.social_el_params.defaultSocialColor;

                      return '<div><span class="' + module.buildFaIcon( icon ) + '" style="color:' + color + '"></span> ' + title + '</div>';
              },

              //overrides the default parent method by a custom one
              //at this stage, the model passed in the obj is up to date
              writeItemViewTitle : function( model ) {
                      var item = this,
                          module     = item.module,
                          _model = model || item(),
                          _title = module.getTitleFromIcon( _model['social-icon'] );

                      $( '.' + module.control.css_attr.item_title , item.container ).html(
                        item._buildTitle( _title, _model['social-icon'], _model['social-color'] )
                      );
              }
      },//CZRSocialsItem
});//$.extend
})( wp.customize , jQuery, _ );//extends api.CZRDynModule

var CZRWidgetAreaModuleMths = CZRWidgetAreaModuleMths || {};
( function ( api, $, _ ) {
$.extend( CZRWidgetAreaModuleMths, {
      initialize: function( id, constructorOptions ) {
              var module = this;

              api.CZRDynModule.prototype.initialize.call( this, id, constructorOptions );

              //extend the module with new template Selectors
              $.extend( module, {
                    itemPreAddEl : 'czr-module-widgets-pre-add-view-content',
                    itemInputList : 'czr-module-widgets-item-input-list',
                    itemInputListReduced : 'czr-module-widgets-item-input-list-reduced',
                    ruItemPart : 'czr-module-widgets-ru-item-part'
              } );

              //EXTEND THE DEFAULT CONSTRUCTORS FOR INPUT
              module.inputConstructor = api.CZRInput.extend( module.CZRWZonesInputMths || {} );
              //EXTEND THE DEFAULT CONSTRUCTORS FOR MONOMODEL
              module.itemConstructor = api.CZRItem.extend( module.CZRWZonesItem || {} );

              module.serverParams = serverControlParams.widget_area_el_params || {};

              //add a shortcut to the server side json properties
              module.contexts = _.has( module.serverParams , 'sidebar_contexts') ? module.serverParams.sidebar_contexts : {};

              //context match map
              module.context_match_map = {
                      is_404 : '404',
                      is_category : 'archive-category',
                      is_home : 'home',
                      is_page : 'page',
                      is_search : 'search',
                      is_single : 'single'
              };


              module.locations = _.has( module.serverParams , 'sidebar_locations') ? module.serverParams.sidebar_locations : {};

              //declares a default model
              module.defaultItemModel = {
                      id : '',
                      title : serverControlParams.i18n.widgetZone,
                      contexts : _.without( _.keys(module.contexts), '_all_' ),//the server list of contexts is an object, we only need the keys, whitout _all_
                      locations : [ module.serverParams.defaultWidgetLocation ],
                      description : ''
              };

              //overrides the default success message
              this.itemAddedMessage = serverControlParams.i18n.widgetZoneAdded;

              //Observe and react to sidebar insights from the preview frame
              // SIDEBAR INSIGHTS => stores and observes the sidebars and widgets settings sent by the preview */
              if ( ! _.has( api, 'sidebar_insights' ) ) {
                    api.sidebar_insights = new api.Values();
                    api.sidebar_insights.create('candidates');//will store the sidebar candidates on preview refresh
                    api.sidebar_insights.create('actives');//will record the refreshed active list of active sidebars sent from the preview
                    api.sidebar_insights.create('inactives');
                    api.sidebar_insights.create('registered');
                    api.sidebar_insights.create('available_locations');
              }


              this.listenToSidebarInsights();

              //React on 'houston-widget-settings'
              //actives :  data.renderedSidebars,
              // inactives :  _inactives,
              // registered :  _registered,
              // candidates :  _candidates,
              // available_locations :  data.availableWidgetLocations//built server side
              api.czr_widgetZoneSettings = api.czr_widgetZoneSettings || new api.Value();
              api.czr_widgetZoneSettings.bind( function( updated_data_sent_from_preview , from ) {
                      module.isReady.then( function() {
                            _.each( updated_data_sent_from_preview, function( _data, _key ) {
                                  api.sidebar_insights( _key ).set( _data );
                            });
                      });
              });




              //AVAILABLE LOCATIONS FOR THE PRE MODEL
              //1) add an observable value to module.preItem to handle the alert visibility
              module.preItem_location_alert_view_state = new api.Value( 'closed');
              //2) add state listeners
              module.preItem_location_alert_view_state.callbacks.add( function( to, from ) {
                        module._toggleLocationAlertExpansion( module.container, to );
              });


              //REACT ON ADD / REMOVE ITEMS
              module.bind( 'item-added', function( model ) {
                      module.addWidgetSidebar( model );
              });

              module.bind( 'pre_item_api_remove' , function(model) {
                      module.removeWidgetSidebar( model );
              });


              //records the top margin value of the widgets panel on each expansion
              var fixTopMargin = new api.Values();
              fixTopMargin.create('fixed_for_current_session');
              fixTopMargin.create('value');

              api.section(module.serverParams.dynWidgetSection).fixTopMargin = fixTopMargin;
              api.section(module.serverParams.dynWidgetSection).fixTopMargin('fixed_for_current_session').set(false);


              //setup reactions on widget section expansion
              //change the expanded behaviour for the widget zone section
              //api.section(module.serverParams.dynWidgetSection).expanded.callbacks.add( function() { return module.widgetSectionReact.apply(module, arguments ); } );

              //bind actions on widget panel expansion and widget zone section expansion
              //Fire the module
              api.panel('widgets').expanded.callbacks.add( function(to, from) {
                    module.widgetPanelReact();//setup some visual adjustments, must be ran each time panel is closed or expanded

                    //Fire the module if not done already
                    if ( 'resolved' == module.isReady.state() )
                      return;
                    module.ready();
              });
      },//initialize




      //When the control is embedded on the page, this method is fired in api.CZRBaseModuleControl:ready()
      //=> right after the module is instantiated.
      ready : function() {
              var module = this;
              api.CZRDynModule.prototype.ready.call( module );

              //add state listener on pre Item view
              module.preItemExpanded.callbacks.add( function( to, from ) {
                    if ( ! to )
                      return;
                    //refresh the location list
                    module.preItem.czr_Input('locations')._setupLocationSelect( true );//true for refresh
                    //refresh the location alert message
                    module.preItem.czr_Input('locations').mayBeDisplayModelAlert();
              });
      },



      //overrides parent method
      //adds the default widget zones in the items
      initializeModuleModel : function( constructorOptions ) {
                  var module = this, dfd = $.Deferred();
                  constructorOptions.items = _.union( _.has( module.serverParams, 'default_zones' ) ? module.serverParams.default_zones : [], constructorOptions.items );
                  return dfd.resolve( constructorOptions ).promise();
      },
















      CZRWZonesInputMths : {
            ready : function() {
                    var input = this;

                    input.bind('locations:changed', function(){
                        input.mayBeDisplayModelAlert();
                    });

                    api.CZRInput.prototype.ready.call( input);
            },



            //////////////////////////////////////////////////
            ///SETUP SELECTS
            //////////////////////////////////////////////////
            //setup select on view_rendered|item_content_event_map
            setupSelect : function() {
                    var input      = this;
                    if ( 'locations' == this.id )
                      this._setupLocationSelect();
                    if ( 'contexts' == this.id )
                      this._setupContextSelect();

            },

            //helper
            _setupContextSelect : function() {
                    var input      = this,
                        input_contexts = input(),
                        item = input.input_parent,
                        module     = input.module;

                    //generates the contexts options
                    _.each( module.contexts, function( title, key ) {
                          var _attributes = {
                                value : key,
                                html: title
                              };
                          if ( key == input_contexts || _.contains( input_contexts, key ) )
                            $.extend( _attributes, { selected : "selected" } );

                          $( 'select[data-type="contexts"]', input.container ).append( $('<option>', _attributes) );
                    });
                    //fire select2
                    $( 'select[data-type="contexts"]', input.container ).select2();
            },


            //helper
            //the refresh param is a bool
            _setupLocationSelect : function(refresh ) {
                    var input      = this,
                        input_locations = input(),
                        item = input.input_parent,
                        module     = input.module,
                        available_locs = api.sidebar_insights('available_locations')();

                    //generates the locations options
                    //append them if not set yet
                    if ( ! $( 'select[data-type="locations"]', input.container ).children().length ) {
                          _.each( module.locations, function( title, key ) {
                                var _attributes = {
                                      value : key,
                                      html: title
                                    };

                                if ( key == input_locations || _.contains( input_locations, key ) )
                                  $.extend( _attributes, { selected : "selected" } );

                                $( 'select[data-type="locations"]', input.container ).append( $('<option>', _attributes) );
                          });
                    }//if

                    function setAvailability( state ) {
                          if (! state.id) { return state.text; }
                          if (  _.contains(available_locs, state.element.value) ) { return state.text; }
                          var $state = $(
                            '<span class="czr-unavailable-location fas fa-ban" title="' + serverControlParams.i18n.unavailableLocation + '">&nbsp;&nbsp;' + state.text + '</span>'
                          );
                          return $state;
                    }

                    if ( refresh ) {
                          $( 'select[data-type="locations"]', input.container ).select2( 'destroy' );
                    }

                    //fire select2
                    $( 'select[data-type="locations"]', input.container ).select2( {
                      templateResult: setAvailability,
                      templateSelection: setAvailability
                    });
            },

            //fired on view event map : 'locations:changed'
            //@param obj { dom_el: $() , model : {} )
            mayBeDisplayModelAlert : function() {
                    var input      = this,
                        item = input.input_parent,
                        module     = input.module;

                    //check if we are in the pre Item case => if so, the locations might be empty
                    if ( ! _.has( item(), 'locations') || _.isEmpty( item().locations ) )
                      return;

                    var _selected_locations = $('select[data-type="locations"]', input.container ).val(),
                        available_locs = api.sidebar_insights('available_locations')(),
                        _unavailable = _.filter( _selected_locations, function( loc ) {
                          return ! _.contains(available_locs, loc);
                        });

                    //check if we are in the pre Item case => if so, the id is empty
                    if ( ! _.has( item(), 'id' ) || _.isEmpty( item().id ) ) {
                          module.preItem_location_alert_view_state.set( ! _.isEmpty( _unavailable ) ? 'expanded' : 'closed' );
                    } else {
                          item.czr_itemLocationAlert.set( ! _.isEmpty( _unavailable ) ? 'expanded' : 'closed' );
                    }
            }
      },//CZRWZonesInputMths















      CZRWZonesItem : {
            initialize : function( id, options ) {
                    var item = this,
                        module = item.module;

                    //Add some observable values for this item
                    item.czr_itemLocationAlert = new api.Value();

                    api.CZRItem.prototype.initialize.call( item, null, options );
            },



            //extend parent setupview
            itemWrapperViewSetup : function() {
                    var item = this,
                        module = item.module;

                    api.CZRItem.prototype.itemWrapperViewSetup.call(item);

                    /// ALERT FOR NOT AVAILABLE LOCATION
                    item.czr_itemLocationAlert.set('closed');

                    //add a state listener on expansion change
                    item.czr_itemLocationAlert.callbacks.add( function( to, from ) {
                          module._toggleLocationAlertExpansion( item.container , to );
                    });

                    //update item title
                    item.writeSubtitleInfos(item());

                    //this is fired just after the itemWrapperViewSetupApiListeners
                    //=> add a callback to refresh the availability status of the locations in the select location picker
                    //add a state listener on expansion change
                    item.viewState.callbacks.add( function( to, from ) {
                          if ( -1 == to.indexOf('expanded') )//can take the expanded_noscroll value !
                            return;
                          //don't try to invoke the input instances before the content is actually rendered
                          //=> there might be cases when the content rendering is debounced...
                          item.bind('contentRendered', function() {
                                //refresh the location list
                                item.czr_Input('locations')._setupLocationSelect( true );//true for refresh
                                //refresh the location alert message
                                item.czr_Input('locations').mayBeDisplayModelAlert();
                          });

                    });
            },


            //extend parent listener
            itemReact : function(to, from) {
                    var item = this;
                    api.CZRItem.prototype.itemReact.call(item, to, from);

                    item.writeSubtitleInfos(to);
                    item.updateSectionTitle(to).setModelUpdateTimer();
            },



            //Fired in setupItemListeners. Reacts to model change.
            //Write html informations under the title : location(s) and context(s)
            writeSubtitleInfos : function(model) {
                    var item = this,
                        module = item.module,
                        _model = _.clone( model || item() ),
                        _locations = [],
                        _contexts = [],
                        _html = '';

                    if ( ! item.container.length )
                      return this;

                    //generate the locations and the contexts text from the json data if exists
                    _model.locations =_.isString(_model.locations) ? [_model.locations] : _model.locations;
                    _.each( _model.locations, function( loc ) {
                          if ( _.has( module.locations , loc ) )
                            _locations.push(module.locations[loc]);
                          else
                            _locations.push(loc);
                      }
                    );

                    //build the context list
                    _model.contexts =_.isString(_model.contexts) ? [_model.contexts] : _model.contexts;

                    //all contexts cases ?
                    if ( item._hasModelAllContexts( model ) ) {
                      _contexts.push(module.contexts._all_);
                    } else {
                      _.each( _model.contexts, function( con ) {
                              if ( _.has( module.contexts , con ) )
                                _contexts.push(module.contexts[con]);
                              else
                                _contexts.push(con);
                            }
                      );
                    }

                    //Translated strings
                    var _locationText = serverControlParams.i18n.locations,
                        _contextText = serverControlParams.i18n.contexts,
                        _notsetText = serverControlParams.i18n.notset;

                    _locations = _.isEmpty( _locations ) ? '<span style="font-weight: bold;">' + _notsetText + '</span>' : _locations.join(', ');
                    _contexts = _.isEmpty( _contexts ) ? '<span style="font-weight: bold;">' + _notsetText + '</span>' : _contexts.join(', ');

                    //write the description if builtin
                    //else, write the dynamic location
                    // if ( _.has(_model, 'description') && _.has(_model, 'is_builtin') )
                    //   _html =  _model.description + ' <strong>|</strong> <u>Contexts</u> : ' + _contexts;
                    // else

                    _html = '<u>' + _locationText + '</u> : ' + _locations + ' <strong>|</strong> <u>' + _contextText + '</u> : ' + _contexts;

                    if ( ! $('.czr-zone-infos', item.container ).length ) {
                          var $_zone_infos = $('<div/>', {
                            class : [ 'czr-zone-infos' , module.control.css_attr.item_sort_handle ].join(' '),
                            html : _html
                          });
                          $( '.' + module.control.css_attr.item_btns, item.container ).after($_zone_infos);
                    } else {
                          $('.czr-zone-infos', item.container ).html(_html);
                    }

                    return this;
            },//writeSubtitleInfos



            ////Fired in setupItemListeners
            updateSectionTitle : function(model) {
                    var _sidebar_id = 'sidebar-widgets-' + model.id,
                        _new_title  = model.title;
                    //does this section exists ?
                    if ( ! api.section.has(_sidebar_id) )
                      return this;

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
                    return this;
            },


            //fired on model_update
            //Don't hammer the preview with too many refreshs
            //2 seconds delay
            setModelUpdateTimer : function() {
                    var item = this,
                        module = item.module;

                    clearTimeout( $.data(this, 'modelUpdateTimer') );
                    $.data(
                        this,
                        'modelUpdateTimer',
                        setTimeout( function() {
                            //refresh preview
                            module.control.refreshPreview();
                        } , 1000)
                    );//$.data
            },


            //@return bool
            //takes the model unique id
            _hasModelAllContexts : function( model ) {
                    var item = this,
                        module = item.module,
                        moduleContexts = _.keys(module.contexts);

                    model = model || this();

                    if ( ! _.has(model, 'contexts') )
                      return;

                    if ( _.contains( model.contexts, '_all_') )
                      return true;

                    //case when model does not have _all_ but all the others
                    return _.isEmpty( _.difference( _.without(moduleContexts, '_all_') , model.contexts ) );
            },

            //@param contexts = array of contexts
            //api.czr_wpQueryInfos is refreshed on each preview refresh
            _getMatchingContexts : function( defaults ) {
                    var module = this,
                        _current = api.czr_wpQueryInfos().conditional_tags || {},
                        _matched = _.filter( module.context_match_map, function( hu, wp ) { return true === _current[wp]; } );

                    return _.isEmpty( _matched ) ? defaults : _matched;
            }
      },//CZRWZonesItem














      //DEPRECATED : THE CONTROLS TO SYNCHRONIZE HAVE BEEN REMOVED

      //fired on model_added_by_user and from the timer method
      //1) model_added, before renderItemWrapper action
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












      /////////////////////////////////////////
      /// ADD / REMOVE WIDGET ZONES
      ////////////////////////////////////////
      //fired on model_added_by_user
      //
      //can also be called statically when a dynamic sidebar is added in the preview
      //in this case the parameter are the sidebar data with id and name
      addWidgetSidebar : function( model, sidebar_data ) {
            if ( ! _.isObject(model) && _.isEmpty(sidebar_data) ) {
                  throw new Error('No valid input were provided to add a new Widget Zone.');
            }


            //ADD the new sidebar to the existing collection
            //Clone the serverControlParams.defaultWidgetSidebar sidebar
            var module = this,
                _model        = ! _.isEmpty(model) ? _.clone(model) : sidebar_data,
                _new_sidebar  = _.isEmpty(model) ? sidebar_data : $.extend(
                      _.clone( _.findWhere( api.Widgets.data.registeredSidebars, { id: module.serverParams.defaultWidgetSidebar } ) ),
                      {
                            name : _model.title,
                            id : _model.id
                      }
                );

            //Add it to the backbone collection
            api.Widgets.registeredSidebars.add( _new_sidebar );

            //test if added:
            //api.Widgets.registeredSidebars('czr_sidebars_8');


            //ADD the sidebar section
            var _params = $.extend(
                    _.clone( api.section( "sidebar-widgets-" + module.serverParams.defaultWidgetSidebar ).params ),
                    {
                          id : "sidebar-widgets-" + _model.id,
                          instanceNumber: _.max(api.settings.sections, function(sec){ return sec.instanceNumber; }).instanceNumber + 1,
                          sidebarId: _new_sidebar.id,
                          title: _new_sidebar.name,
                          description : 'undefined' != typeof(sidebar_data) ? sidebar_data.description : api.section( "sidebar-widgets-" + module.serverParams.defaultWidgetSidebar ).params.description,
                          //always set the new priority to the maximum + 1 ( module.serverParams.dynWidgetSection is excluded from this calculation because it must always be at the bottom )
                          priority: _.max( _.omit( api.settings.sections, module.serverParams.dynWidgetSection), function(sec){ return sec.instanceNumber; }).priority + 1,
                    }
            );

            api.section.add( _params.id, new api.sectionConstructor[ _params.type ]( _params.id ,{ params : _params } ) );

            //add it to the static collection of settings
            api.settings.sections[ _params.id ] = _params.id;

            //ADD A SETTING
            //Clone the module.serverParams.defaultWidgetSidebar sidebar widget area setting
            var _new_set_id = 'sidebars_widgets['+_model.id+']',
                _new_set    = $.extend(
                      _.clone( api.settings.settings['sidebars_widgets[' + module.serverParams.defaultWidgetSidebar + ']'] ),
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
                      _.clone( api.settings.controls['sidebars_widgets[' + module.serverParams.defaultWidgetSidebar + ']'] ),
                      {
                        settings : { default : _new_set_id }
                  }),
                _new_control = {};


            //replace  serverControlParams.defaultWidgetSidebar  by the new sidebar id
            _.each( _cloned_control, function( param, key ) {
                    if ( 'string' == typeof(param) ) {
                      param = param.replace( module.serverParams.defaultWidgetSidebar , _model.id );
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
      removeWidgetSidebar : function( model ) {
            var module = this;
            if ( ! _.isObject(model) || _.isEmpty(model) ) {
                  throw new Error('No valid data were provided to remove a Widget Zone.');
            }

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

            //refresh
            var _refresh = function() {
              api.previewer.refresh();
            };
            _refresh = _.debounce( _refresh, 500 );
            $.when( _refresh() ).done( function() {
                  //say it
                  module.trigger( 'widget_zone_removed',
                        {
                              model : model,
                              section_id : "sidebar-widgets-" + model.id ,
                              setting_id : 'sidebars_widgets['+model.id+']'
                        }
                  );
            });
      },











      /////////////////////////////////////////
      /// SET EXPANSION CALLBACKS FOR WIDGET PANEL AND WIDGET ZONE CREATION SECTION
      ////////////////////////////////////////
      //cb of : api.panel('widgets').expanded.callbacks.add
      widgetPanelReact : function() {
            var module = this;
            //will be used for adjustments
            var _top_margin = api.panel('widgets').container.find( '.control-panel-content' ).css('margin-top');

            api.section(module.serverParams.dynWidgetSection).fixTopMargin('value').set( _top_margin );

            var _section_content = api.section(module.serverParams.dynWidgetSection).container.find( '.accordion-section-content' ),
              _panel_content = api.panel('widgets').container.find( '.control-panel-content' ),
              _set_margins = function() {
                    _section_content.css( 'margin-top', '' );
                    _panel_content.css('margin-top', api.section(module.serverParams.dynWidgetSection).fixTopMargin('value')() );
              };

            // Fix the top margin after reflow.
            api.bind( 'pane-contents-reflowed', _.debounce( function() {
                  _set_margins();
            }, 150 ) );

            //Close all views on widget panel expansion/clos
            module.closeAllItems().closeRemoveDialogs();
            //Close preItem dialog box if exists
            if ( _.has( module, 'preItemExpanded' ) )
              module.preItemExpanded.set(false);
      },//widgetPanelReact()


      //cb of api.section(module.serverParams.dynWidgetSection).expanded.callbacks
      widgetSectionReact : function( to, from ) {
            var module = this,
                section =  api.section(module.serverParams.dynWidgetSection),
                container = section.container.closest( '.wp-full-overlay-sidebar-content' ),
                content = section.container.find( '.accordion-section-content' ),
                overlay = section.container.closest( '.wp-full-overlay' ),
                backBtn = section.container.find( '.customize-section-back' ),
                sectionTitle = section.container.find( '.accordion-section-title' ).first(),
                headerActionsHeight = $( '#customize-header-actions' ).height(),
                resizeContentHeight, expand, position, scroll;

            if ( to ) {
                  overlay.removeClass( 'section-open' );
                  content.css( 'height', 'auto' );
                  //section.container.removeClass( 'open' );
                  sectionTitle.attr( 'tabindex', '0' );
                  content.css( 'margin-top', '' );
                  container.scrollTop( 0 );
            }

            module.closeAllItems().closeRemoveDialogs();

            content.slideToggle();
      },







      /////////////////////////////////////////
      /// LISTEN TO SIDEBAR INSIGHTS FROM THE PREVIEW FRAME
      /// REACT TO THEM
      ////////////////////////////////////////
      listenToSidebarInsights : function() {
            var module = this;

            //VISIBILITY BASED ON THE SIDEBAR INSIGHTS
            api.sidebar_insights('registered').callbacks.add( function( _registered_zones ) {
                    var _current_collection = _.clone( module.itemCollection() );
                    _.each( _current_collection, function( _model ) {
                          if ( ! module.getViewEl(_model.id).length )
                            return;

                          module.getViewEl(_model.id).css('display' , _.contains( _registered_zones, _model.id ) ? 'block' : 'none' );
                    });
            });

            //OPACITY SIDEBAR INSIGHTS BASED
            api.sidebar_insights('inactives').callbacks.add( function( _inactives_zones ) {
                    var _current_collection = _.clone( module.itemCollection() );
                    _.each( _current_collection, function( _model ) {
                          if ( ! module.getViewEl(_model.id).length )
                            return;

                          if ( _.contains( _inactives_zones, _model.id ) ) {
                                module.getViewEl( _model.id ).addClass('inactive');
                                if ( ! module.getViewEl( _model.id ).find('.czr-inactive-alert').length ) {
                                      module.getViewEl( _model.id ).find('.czr-item-title').append(
                                        $('<span/>', {class : "czr-inactive-alert", html : " [ " + serverControlParams.i18n.inactiveWidgetZone + " ]" })
                                      );
                                }
                          }
                          else {
                                module.getViewEl( _model.id ).removeClass('inactive');
                                if ( module.getViewEl( _model.id ).find('.czr-inactive-alert').length )
                                  module.getViewEl( _model.id ).find('.czr-inactive-alert').remove();
                          }
                    });
            });

            //WIDGET SIDEBAR CREATION BASED ON SIDEBAR INSIGHTS
            //react to a new register candidate(s) on preview refresh
            api.sidebar_insights('candidates').callbacks.add( function(_candidates) {
                  if ( ! _.isArray(_candidates) )
                    return;
                  _.each( _candidates, function( _sidebar ) {
                        if ( ! _.isObject(_sidebar) )
                          return;
                        //add this widget sidebar and the related setting and control.
                        //Only if not added already
                        if ( api.section.has("sidebar-widgets-" +_sidebar.id ) )
                          return;

                        //access the registration method statically
                        module.addWidgetSidebar( {}, _sidebar );
                        //activate it if so
                        if ( _.has( api.sidebar_insights('actives')(), _sidebar.id ) && api.section.has("sidebar-widgets-" +_sidebar.id ) )
                          api.section( "sidebar-widgets-" +_sidebar.id ).activate();
                  });
            });
      },//listenToSidebarInsights()







      /////////////////////////////////////////
      /// OVERRIDEN METHODS
      ////////////////////////////////////////
      //fired in toggleItemExpansion()
      //has to be overridden for the widget zones control because this control is embedded directly in a panel and not in a section
      //therefore the module to animate the scrollTop is not the section container but $('.wp-full-overlay-sidebar-content')
      _adjustScrollExpandedBlock : function( $_block_el, adjust ) {
            if ( ! $_block_el.length )
              return;
            var module = this,
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
      getDefaultItemModel : function( id ) {
              var module = this,
                  _current_collection = module.itemCollection(),
                  _default = _.clone( module.defaultItemModel ),
                  _default_contexts = _default.contexts;
              return $.extend( _default, {
                  title : 'Widget Zone ' +  ( _.size(_current_collection)*1 + 1 )
                  //contexts : module._getMatchingContexts( _default_contexts )
                });
      },



      //overrides parent
      //called before rendering a view. Fired in module::renderItemWrapper()
      //can be overridden to set a specific view template depending on the model properties
      //@return string
      //@type can be
      //Read Update Delete (rud...)
      //Read Update (ru)
      //...
      //@item_model is an object describing the current item model
      getTemplateEl : function( type, item_model ) {
              var module = this, _el;
              //force view-content type to ru-item-part if the model is a built-in (primary, secondary, footer-1, ...)
              //=> user can't delete a built-in model.
              if ( 'rudItemPart' == type ) {
                  type = ( _.has(item_model, 'is_builtin') && item_model.is_builtin ) ? 'ruItemPart' : type;
              } else if ( 'itemInputList' == type ) {
                  type = ( _.has(item_model, 'is_builtin') && item_model.is_builtin ) ? 'itemInputListReduced' : type;
              }

              switch(type) {
                    case 'rudItemPart' :
                      _el = module.rudItemPart;
                        break;
                    case 'ruItemPart' :
                      _el = module.ruItemPart;
                      break;
                    case 'itemInputList' :
                      _el = module.itemInputList;
                      break;
                    case 'itemInputListReduced' :
                      _el = module.itemInputListReduced;
                      break;
              }

              if ( _.isEmpty(_el) ) {
                throw new Error( 'No valid template has been found in getTemplateEl()' );
              } else {
                return _el;
              }
      },


      _toggleLocationAlertExpansion : function( $view, to ) {
              var $_alert_el = $view.find('.czr-location-alert');
              if ( ! $_alert_el.length ) {
                    var _html = [
                      '<span>' + serverControlParams.i18n.locationWarning + '</span>',
                      api.CZR_Helpers.getDocSearchLink( serverControlParams.i18n.locationWarning ),
                    ].join('');

                    $_alert_el = $('<div/>', {
                          class:'czr-location-alert',
                          html:_html,
                          style:"display:none"
                    });

                    $('select[data-type="locations"]', $view ).closest('div').after($_alert_el);
              }
              $_alert_el.toggle( 'expanded' == to);
      }
});//$.extend()
})( wp.customize , jQuery, _ );
//extends api.CZRModule
var CZRBodyBgModuleMths = CZRBodyBgModuleMths || {};
( function ( api, $, _ ) {
$.extend( CZRBodyBgModuleMths, {
      initialize: function( id, options ) {
            var module = this;
            //run the parent initialize
            api.CZRModule.prototype.initialize.call( module, id, options );

            //extend the module with new template Selectors
            $.extend( module, {
                  itemInputList : 'czr-module-bodybg-item-content'
            } );

            //EXTEND THE DEFAULT CONSTRUCTORS FOR INPUT
            module.inputConstructor = api.CZRInput.extend( module.CZRBodyBgInputMths || {} );
            //EXTEND THE DEFAULT CONSTRUCTORS FOR MONOMODEL
            module.itemConstructor = api.CZRItem.extend( module.CZBodyBgItemMths || {} );

            //declares a default model
            module.defaultItemModel = {
                  'background-color' : '#eaeaea',
                  'background-image' : '',
                  'background-repeat' : 'no-repeat',
                  'background-attachment' : 'fixed',
                  'background-position' : 'center center',
                  'background-size' : 'cover'
            };
            api.consoleLog('New module instantiated : ', module.id );
            //fired ready :
            //1) on section expansion
            //2) or in the case of a module embedded in a regular control, if the module section is alreay opened => typically when skope is enabled
            if ( _.has( api, 'czr_activeSectionId' ) && module.control.section() == api.czr_activeSectionId() && 'resolved' != module.isReady.state() ) {
                  module.ready();
            }
            api.section( module.control.section() ).expanded.bind(function(to) {
                  if ( 'resolved' == module.isReady.state() )
                    return;
                  module.ready();
            });
      },//initialize



      CZRBodyBgInputMths : {
            //////////////////////////////////////////////////
            ///SETUP SELECTS
            //////////////////////////////////////////////////
            //setup select on view_rendered|item_content_event_map
            setupSelect : function() {
                  var input         = this,
                      _id_param_map = {
                        'background-repeat' : 'bg_repeat_options',
                        'background-attachment' : 'bg_attachment_options',
                        'background-position' : 'bg_position_options'
                      },
                      item          = input.input_parent,
                      serverParams  = serverControlParams.body_bg_module_params,
                      options       = {},
                      module        = input.module;

                  if ( ! _.has( _id_param_map, input.id ) )
                    return;

                  if ( _.isUndefined( serverParams ) || _.isUndefined( serverParams[ _id_param_map[input.id] ] ) )
                    return;
                  options = serverParams[ _id_param_map[input.id] ];
                  if ( _.isEmpty(options) )
                    return;
                  //generates the options
                  _.each( options, function( title, key ) {
                        var _attributes = {
                              value : key,
                              html: title
                            };
                        if ( key == input() || _.contains( input(), key ) )
                          $.extend( _attributes, { selected : "selected" } );

                        $( 'select[data-type]', input.container ).append( $('<option>', _attributes) );
                  });
                  //fire select2
                  $( 'select[data-type]', input.container ).select2();
            }
      },


      CZBodyBgItemMths : {
            //Fired if the item has been instantiated
            //The item.callbacks are declared.
            ready : function() {
                  var item = this;
                  api.CZRItem.prototype.ready.call( item );

                  item.inputCollection.bind( function( _col_ ) {
                        if ( ! _.isEmpty( _col ) && item.czr_Input && item.czr_Input.has( 'background-image' ) ) {
                              item.czr_Input('background-image').isReady.done( function( input_instance ) {
                                    var set_visibilities = function( bg_val  ) {
                                          var is_bg_img_set = ! _.isEmpty( bg_val ) ||_.isNumber( bg_val);
                                          _.each( ['background-repeat', 'background-attachment', 'background-position', 'background-size'], function( dep ) {
                                                item.czr_Input(dep).container.toggle( is_bg_img_set || false );
                                          });
                                    };
                                    set_visibilities( input_instance() );
                                    //update the item model on 'background-image' change
                                    item.bind('background-image:changed', function(){
                                          set_visibilities( item.czr_Input('background-image')() );
                                    });
                              });
                        }
                  });

            },

      }
});//$.extend
})( wp.customize , jQuery, _ );
(function ( api, $, _ ) {
//provides a description of each module
      //=> will determine :
      //1) how to initialize the module model. If not crud, then the initial item(s) model shall be provided
      //2) which js template(s) to use : if crud, the module template shall include the add new and pre-item elements.
      //   , if crud, the item shall be removable
      //3) how to render : if multi item, the item content is rendered when user click on edit button.
      //    If not multi item, the single item content is rendered as soon as the item wrapper is rendered.
      //4) some DOM behaviour. For example, a multi item shall be sortable.
      api.czrModuleMap = api.czrModuleMap || {};
      $.extend( api.czrModuleMap, {
            czr_widget_areas_module : {
                  mthds : CZRWidgetAreaModuleMths,
                  crud : true,
                  sektion_allowed : false,
                  name : 'Widget Areas'
            },
            czr_social_module : {
                  mthds : CZRSocialModuleMths,
                  crud : true,
                  name : 'Social Icons',
                  has_mod_opt : true
            },
            czr_background : {
                  mthds : CZRBodyBgModuleMths,
                  crud : false,
                  multi_item : false,
                  name : 'Slider'
            }
      });
})( wp.customize, jQuery, _ );
//named czr_multiple_picker in the php setting map
var CZRMultiplePickerMths = CZRMultiplePickerMths || {};
/* Multiple Picker */
/**
 * @constructor
 * @augments wp.customize.Control
 * @augments wp.customize.Class
 */
( function ( api, $, _ ) {
$.extend( CZRMultiplePickerMths , {
      ready: function() {
            var control  = this,
                _select  = this.container.find('select');


            _select.select2({
                  closeOnSelect: false,
                  templateSelection: czrEscapeMarkup
            });

            function czrEscapeMarkup(obj) {
                  //trim dashes
                  return obj.text.replace(/\u2013|\u2014/g, "");
            }

            //handle case when all choices become unselected
            _select.on('change', function(e){
                  if ( 0 === $(this).find("option:selected").length )
                    control.setting.set([]);
            });
      }
});//$.extend
})( wp.customize , jQuery, _ );
//named czr_cropped_image in the php setting map
var CZRCroppedImageMths = CZRCroppedImageMths || {};

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
      $.extend( CZRCroppedImageMths , {
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
      });//extend
})( wp.customize, jQuery, _);

//named czr_upload in the php setting map
var CZRUploadMths = CZRUploadMths || {};
( function ( api, $, _ ) {
/**
 * @constructor
 * @augments wp.customize.Control
 * @augments wp.customize.Class
 */
$.extend( CZRUploadMths, {
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
            this.removerVisibility( this.setting() );
      },


      success: function( attachment ) {
            this.setting.set( attachment.get('id') );
      },
      removerVisibility: function( to ) {
            this.remover.toggle( to != this.params.removed );
      }
});//extend
})( wp.customize , jQuery, _ );
//named czr_layouts in the php setting map
var CZRLayoutSelectMths = CZRLayoutSelectMths || {};
( function ( api, $, _ ) {
$.extend( CZRLayoutSelectMths , {
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
});//$.extend
})( wp.customize , jQuery, _ );
( function ( api, $, _ ) {
      //THEME CONTROLS
      //api.CZRBackgroundControl     = api.CZRItemControl.extend( CZRBackgroundMths );

      //api.CZRWidgetAreasControl    = api.CZRDynModule.extend( CZRWidgetAreasMths );

      api.CZRUploadControl          = api.Control.extend( CZRUploadMths );
      api.CZRLayoutControl          = api.Control.extend( CZRLayoutSelectMths );
      api.CZRMultiplePickerControl  = api.Control.extend( CZRMultiplePickerMths );


      $.extend( api.controlConstructor, {
            czr_upload     : api.CZRUploadControl,
            //czr_sidebars   : api.CZRWidgetAreasControl,
            //czr_socials    : api.CZRSocialControl,
            czr_multiple_picker : api.CZRMultiplePickerControl,
            czr_layouts    : api.CZRLayoutControl
            //czr_background : api.CZRBackgroundControl
      });

      if ( 'function' == typeof api.CroppedImageControl ) {
            api.CZRCroppedImageControl   = api.CroppedImageControl.extend( CZRCroppedImageMths );

            $.extend( api.controlConstructor, {
                  czr_cropped_image : api.CZRCroppedImageControl
            });
      }

      if ( 'function' == typeof api.CodeEditorControl ) {
            $.extend( api.controlConstructor, {
                  czr_code_editor : api.CodeEditorControl
            });
      }

})( wp.customize, jQuery, _ );
( function (api, $, _) {
      var $_nav_section_container,
          i18n = serverControlParams.i18n || {};

      api.czr_CrtlDependenciesReady = $.Deferred();

      api.bind( 'ready' , function() {
            if ( _.has( api, 'czr_ctrlDependencies') )
              return;
            if ( serverControlParams.isSkopOn ) {
                  // If skope is on, we need to wait for the initial setup to be finished
                  // otherwise, we might refer to not instantiated skopes when processing silent updates further in the code
                  //Skope is ready when :
                  //1) the initial skopes collection has been populated
                  //2) the initial skope has been switched to
                  if ( 'resolved' != api.czr_skopeReady.state() ) {
                        api.czr_skopeReady.done( function() {
                              api.czr_ctrlDependencies = new api.CZR_ctrlDependencies();
                              api.czr_CrtlDependenciesReady.resolve();
                        });
                  }
            } else {
                  api.czr_ctrlDependencies = new api.CZR_ctrlDependencies();
                  api.czr_CrtlDependenciesReady.resolve();
            }

      } );


      api.CZR_ctrlDependencies = api.Class.extend( {
              dominiDeps : [],
              initialize: function() {
                    var self = this;

                    this.defaultDominusParams = {
                          dominus : '',
                          servi : [],
                          visibility : null,
                          actions : null,
                          onSectionExpand : true
                    };

                    //store the default control dependencies
                    this.dominiDeps = _.extend( this.dominiDeps, this._getControlDeps() );
                    if ( ! _.isArray( self.dominiDeps ) ) {
                        throw new Error('Visibilities : the dominos dependency array is not an array.');
                    }
                    api.czr_activeSectionId.bind( function( section_id ) {
                          if ( ! _.isEmpty( section_id ) && api.section.has( section_id ) ) {
                                try {
                                      self.setServiDependencies( section_id );
                                } catch( er ) {
                                      api.errorLog( 'In api.CZR_ctrlDependencies : ' + er );
                                }
                          }
                    });


                    //@param target_source is an object :
                    // {
                    //    target : section_id to awake
                    //    source : section_id from which the request for awaking has been done
                    // }
                    api.bind( 'awaken-section', function( target_source ) {
                          //if skope on ( serverControlParams.isSkopOn ), then defer the visibility awakening after the silent updates
                          if ( serverControlParams.isSkopOn && _.has( api ,'czr_skopeBase' ) ) {
                                api.czr_skopeBase.processSilentUpdates( {
                                      candidates : {},
                                      section_id : target_source.target,
                                      refresh : false
                                } ).then( function() {
                                      try {
                                            self.setServiDependencies( target_source.target, target_source.source );
                                      } catch( er ) {
                                            api.errorLog( 'On awaken-section, ctrl deps : ' + er );
                                      }
                                });
                          } else {
                                try {
                                      self.setServiDependencies( target_source.target, target_source.source );
                                } catch( er ) {
                                      api.errorLog( 'On awaken-section, ctrl deps : ' + er );
                                }
                          }
                    });

                    //FAVICON SPECIFICS
                    //@todo => move to the theme ?
                    //favicon note on load and on change(since wp 4.3)
                    this._handleFaviconNote();
              },


              //Process the visibility callbacks for the controls of a target targetSectionId
              //@param targetSectionId : string
              //@param sourceSectionId : string, the section from which the request has been done
              setServiDependencies : function( targetSectionId, sourceSectionId, refresh ) {
                    var self = this, params, dfd = $.Deferred();

                    refresh = refresh || false;

                    if ( _.isUndefined( targetSectionId ) || ! api.section.has( targetSectionId ) ) {
                          throw new Error( 'Control Dependencies : the targetSectionId is missing or not registered : ' + targetSectionId );
                    }

                    //Assign a visibility state deferred to the target section
                    api.section( targetSectionId ).czr_ctrlDependenciesReady = api.section( targetSectionId ).czr_ctrlDependenciesReady || $.Deferred();

                    //Bail here if this section has already been setup for ctrl dependencies
                    if ( ! refresh && 'resolved' == api.section( targetSectionId ).czr_ctrlDependenciesReady.state() )
                      return dfd.resolve().promise();

                    //FIND DOMINI IN THE TARGET SECTION
                    //=> setup their callbacks
                    _.each( self.dominiDeps , function( params ) {
                          if ( ! _.has( params, 'dominus' ) || ! _.isString( params.dominus ) || _.isEmpty( params.dominus ) ) {
                                throw new Error( 'Control Dependencies : a dominus control id must be a not empty string.');
                          }

                          var wpDominusId = api.CZR_Helpers.build_setId( params.dominus );
                          if ( ! api.control.has( wpDominusId ) )
                            return;

                          if ( api.control( wpDominusId ).section() != targetSectionId )
                            return;

                          //Attempt to normalize the params
                          params = self._prepareDominusParams( params );
                          if ( _.isEmpty(params) )
                            return;

                          self._processDominusCallbacks( params.dominus, params, refresh )
                                .fail( function() {
                                      api.consoleLog( 'self._processDominusCallbacks fail for section ' + targetSectionId );
                                      dfd.reject();
                                })
                                .done( function() {
                                      dfd.resolve();
                                });
                    });


                    //EXTERNAL DOMINI : AWAKE THE SECTIONS
                    //check if any control of the current section is the servus of a dominus located in another section
                    var _secCtrls = api.CZR_Helpers.getSectionControlIds( targetSectionId ),
                        _getServusDomini = function( shortServudId ) {
                              var _dominiIds = [];
                              _.each( self.dominiDeps , function( params ) {
                                    if ( ! _.has( params, 'servi' ) || ! _.isArray( params.servi ) || ! _.has( params, 'dominus' ) || _.isEmpty( params.dominus ) ) {
                                          api.errorLog( 'Control Dependencies : wrong params in _getServusDomini.');
                                          return;
                                    }

                                    if ( _.contains( params.servi , shortServudId ) && ! _.contains( _dominiIds , params.dominus ) ) {
                                          //Attempt to normalize the params
                                          params = self._prepareDominusParams( params );
                                          if ( _.isEmpty(params) )
                                            return;
                                          else
                                            _dominiIds.push( params.dominus );
                                    }
                              });
                              return ! _.isArray( _dominiIds ) ? [] : _dominiIds;
                        },
                        _servusDominiIds = [];

                    //Build the domini array
                    _.each( _secCtrls, function( servusCandidateId ) {
                          if ( _.isEmpty( _getServusDomini( servusCandidateId ) ) )
                            return;

                          _servusDominiIds = _.union( _servusDominiIds, _getServusDomini( servusCandidateId ) );
                    });

                    //let's loop on the domini ids and check if we need to "awake" an external section
                    _.each( _servusDominiIds, function( shortDominusId ){

                          var wpDominusId = api.CZR_Helpers.build_setId( shortDominusId );
                          //This dominus must be located in another section
                          if ( api.control( wpDominusId ).section() == targetSectionId )
                              return;
                          //The dominus section can't be the current source if set. => otherwise potential infinite loop scenario.
                          if ( sourceSectionId == api.control( wpDominusId ).section() )
                              return;
                          //inform the api that a section has to be awaken
                          //=> first silently update the section controls if skope on
                          //=> then fire the visibilities
                          api.trigger( 'awaken-section', {
                                target : api.control( wpDominusId ).section(),
                                source : targetSectionId
                          } );
                    } );

                    //This section has been setup for ctrl dependencies
                    dfd.always( function() {
                          api.section( targetSectionId ).czr_ctrlDependenciesReady.resolve();
                    });
                    return dfd.promise();
              },


              //This method fires a callback when a control is registered in the api.
              //If the control is registered, then it fires the callback when it is embedded
              //If the control is embedeed, it fires the callback
              //=> typical use case : a control can be both removed from the API and the DOM, and then added back on skope switch
              //
              //@param wpCtrlId : string name of the control as registered in the WP API
              //@param callback : fn callback to fire
              //@param args : [] or callback arguments
              _deferCallbackForControl : function( wpCrtlId, callback, args ) {
                    var dfd = $.Deferred();
                    if ( _.isEmpty(wpCrtlId) || ! _.isString(wpCrtlId) ) {
                        throw new Error( '_deferCallbackForControl : the control id is missing.' );
                    }
                    if ( ! _.isFunction( callback ) ) {
                        throw new Error( '_deferCallbackForControl : callback must be a funtion.' );
                    }
                    args = ( _.isUndefined(args) || ! _.isArray( args ) ) ? [] : args;

                    if ( api.control.has( wpCrtlId ) ) {
                          if ( 'resolved' == api.control(wpCrtlId ).deferred.embedded.state() ) {
                                $.when( callback.apply( null, args ) )
                                      .fail( function() { dfd.reject(); })
                                      .done( function() { dfd.resolve(); });
                          } else {
                                api.control( wpCrtlId ).deferred.embedded.then( function() {
                                      $.when( callback.apply( null, args ) )
                                            .fail( function() { dfd.reject(); })
                                            .done( function() { dfd.resolve(); });
                                });
                          }
                    } else {
                          api.control.when( wpCrtlId, function() {
                                api.control( wpCrtlId ).deferred.embedded.then( function() {
                                      $.when( callback.apply( null, args ) )
                                            .fail( function() { dfd.reject(); })
                                            .done( function() { dfd.resolve(); });
                                });
                          });
                    }
                    return dfd.promise();
              },


              /*
              * @return void
              * show or hide setting according to the dependency + callback pair
              * @params setId = the short setting id, whitout the theme option prefix OR the WP built-in setting
              * @params o = { controls [], callback fn, onSectionExpand bool }
              */
              _processDominusCallbacks : function( shortDominusId, dominusParams, refresh ) {
                    var self = this,
                        wpDominusId = api.CZR_Helpers.build_setId( shortDominusId ),
                        dominusSetInst = api( wpDominusId ),
                        dfd = $.Deferred(),
                        hasProcessed = false;

                    //loop on the dominus servi and apply + bind the visibility cb
                    _.each( dominusParams.servi , function( servusShortSetId ) {
                            if ( ! api.control.has( api.CZR_Helpers.build_setId( servusShortSetId ) ) ) {
                                return;
                            }
                            //set visibility when control is embedded
                            //or when control is added to the api
                            //=> solves the problem of visibility callbacks lost when control are re-rendered
                            var _fireDominusCallbacks = function( dominusSetVal, servusShortSetId, dominusParams, refresh ) {
                                      var _toFire = [],
                                          _args = arguments;
                                      _.each( dominusParams, function( _item, _key ) {
                                            switch( _key ) {
                                                case 'visibility' :
                                                    self._setVisibility.apply( null, _args );
                                                break;
                                                case 'actions' :
                                                    if ( _.isFunction( _item ) )
                                                        _item.apply( null, _args );
                                                break;
                                            }
                                      });
                                },
                                _deferCallbacks = function( dominusSetVal ) {
                                      dominusSetVal = dominusSetVal  || dominusSetInst();
                                      var wpServusSetId = api.CZR_Helpers.build_setId( servusShortSetId );
                                      self._deferCallbackForControl(
                                                  wpServusSetId,
                                                  _fireDominusCallbacks,
                                                  [ dominusSetVal, servusShortSetId, dominusParams ]
                                            )
                                            .always( function() { hasProcessed = true; })
                                            .fail( function() { dfd.reject(); })
                                            .done( function() { dfd.resolve(); });
                                };


                            //APPLY THE DEPENDENCIES
                            _deferCallbacks();

                            //BIND THE DOMINUS SETTING INSTANCE
                            //store the visibility bound state
                            if ( ! _.has( dominusSetInst, 'czr_visibilityServi' ) )
                                dominusSetInst.czr_visibilityServi = new api.Value( [] );

                            //Maybe bind to react on setting _dirty change
                            var _currentDependantBound = dominusSetInst.czr_visibilityServi();
                            //Make sure a dependant visibility action is bound only once for a setting id to another setting control id
                            if ( ! _.contains( _currentDependantBound, servusShortSetId ) ) {
                                  dominusSetInst.bind( function( dominusSetVal ) {
                                      _deferCallbacks( dominusSetVal );
                                  });
                                  dominusSetInst.czr_visibilityServi( _.union( _currentDependantBound, [ servusShortSetId ] ) );
                            }
                    } );//_.each
                    if ( ! hasProcessed )
                      return dfd.resolve().promise();
                    return dfd.promise();
              },



              //@return void()
              _setVisibility : function ( dominusSetVal, servusShortSetId, dominusParams, refresh ) {
                    var wpServusSetId = api.CZR_Helpers.build_setId( servusShortSetId ),
                        visibility = dominusParams.visibility( dominusSetVal, servusShortSetId, dominusParams.dominus );

                    refresh = refresh || false;
                    //Allows us to filter between visibility callbacks and other actions
                    //a non visibility callback shall return null
                    if ( ! _.isBoolean( visibility ) || ( 'unchanged' == visibility && ! refresh ) )
                      return;

                    //when skope is enabled, we might be doing a silent update
                    //=> this method should be bailed if so
                    var _doVisibilitiesWhenPossible = function() {
                            if ( api.state.has( 'silent-update-processing' ) && api.state( 'silent-update-processing' )() )
                              return;
                            api.control( wpServusSetId, function( _controlInst ) {
                                  var _args = {
                                        duration : 'fast',
                                        completeCallback : function() {},
                                        unchanged : false
                                  };

                                  if ( _.has( _controlInst, 'active' ) )
                                    visibility = visibility && _controlInst.active();

                                  if ( _.has( _controlInst, 'defaultActiveArguments' ) )
                                    _args = control.defaultActiveArguments;

                                  _controlInst.onChangeActive( visibility , _controlInst.defaultActiveArguments );
                            });
                            if ( api.state.has( 'silent-update-processing' ) ) {
                                  api.state( 'silent-update-processing' ).unbind( _doVisibilitiesWhenPossible );
                            }
                    };

                    if ( api.state.has( 'silent-update-processing' ) && api.state( 'silent-update-processing' )() ) {
                          api.state( 'silent-update-processing' ).bind( _doVisibilitiesWhenPossible );
                    } else {
                          _doVisibilitiesWhenPossible();
                    }

              },










              /*****************************************************************************
              * HELPERS
              *****************************************************************************/
              /*
              * Abstract
              * Will be provided by the theme
              * @return main control dependencies object
              */
              _getControlDeps : function() {
                return {};
              },


              //@return a visibility ready object of param describing the dependencies between a dominus and its servi.
              //this.defaultDominusParams = {
              //       dominus : '',
              //       servi : [],
              //       visibility : fn() {},
              //       actions : fn() {},
              //       onSectionExpand : true
              // };
              _prepareDominusParams : function( params_candidate ) {
                    var self = this,
                        _ready_params = {};

                    //Check mandatory conditions
                    if ( ! _.isObject( params_candidate ) ) {
                          api.errorLog( 'Visibilities : a dominus param definition must be an object.');
                          return _ready_params;
                    }
                    if ( ! _.has( params_candidate, 'visibility' ) && ! _.has( params_candidate, 'actions' ) ) {
                          api.errorLog( 'Visibilities : a dominus definition must include a visibility or an actions callback.');
                          return _ready_params;
                    }
                    if ( ! _.has( params_candidate, 'dominus' ) || ! _.isString( params_candidate.dominus ) || _.isEmpty( params_candidate.dominus ) ) {
                          api.errorLog( 'Visibilities : a dominus control id must be a not empty string.');
                          return _ready_params;
                    }
                    var wpDominusId = api.CZR_Helpers.build_setId( params_candidate.dominus );
                    if ( ! api.control.has( wpDominusId ) ) {
                          api.errorLog( 'Visibilities : a dominus control id is not registered : ' + wpDominusId );
                          return _ready_params;
                    }
                    if ( ! _.has( params_candidate, 'servi' ) || _.isUndefined( params_candidate.servi ) || ! _.isArray( params_candidate.servi ) || _.isEmpty( params_candidate.servi ) ) {
                          api.errorLog( 'Visibilities : servi must be set as an array not empty.');
                          return _ready_params;
                    }

                    _.each( self.defaultDominusParams , function( _value, _key ) {
                        var _candidate_val = params_candidate[ _key ];

                        switch( _key ) {
                              case 'visibility' :
                                  if ( ! _.isUndefined( _candidate_val ) && ! _.isEmpty( _candidate_val ) && ! _.isFunction( _candidate_val ) ) {
                                        throw new Error( 'Visibilities : a dominus visibility callback must be a function : ' + params_candidate.dominus );
                                  }
                              break;
                              case 'actions' :
                                  if ( ! _.isUndefined( _candidate_val ) && ! _.isEmpty( _candidate_val ) && ! _.isFunction( _candidate_val ) ) {
                                        throw new Error( 'Visibilities : a dominus actions callback must be a function : ' + params_candidate.dominus );
                                  }
                              break;
                              case 'onSectionExpand' :
                                  if ( ! _.isUndefined( _candidate_val ) && ! _.isEmpty( _candidate_val ) && ! _.isBoolean( _candidate_val ) ) {
                                        throw new Error( 'Visibilities : a dominus onSectionExpand param must be a boolean : ' + params_candidate.dominus );
                                  }
                              break;
                        }
                        _ready_params[_key] = _candidate_val;
                    });

                    return _ready_params;
              },



              /*****************************************************************************
              * FAVICON SPECIFICS
              *****************************************************************************/
              /**
              * Fired on api ready
              * May change the site_icon description on load
              * May add a callback to site_icon
              * @return void()
              */
              _handleFaviconNote : function() {
                    var self = this,
                        _fav_setId = api.CZR_Helpers.build_setId( serverControlParams.faviconOptionName );
                    //do nothing if (||)
                    //1) WP version < 4.3 where site icon has been introduced
                    //2) User had not defined a favicon
                    //3) User has already set WP site icon
                    if ( ! api.has('site_icon') || ! api.control('site_icon') || ( api.has( _fav_setId ) && 0 === + api( _fav_setId )() ) || + api('site_icon')() > 0 )
                      return;

                    var _oldDes     = api.control('site_icon').params.description;
                        _newDes     = ['<strong>' , i18n.faviconNote || '' , '</strong><br/><br/>' ].join('') + _oldDes;

                    //on api ready
                    self._printFaviconNote(_newDes );

                    //on site icon change
                    api('site_icon').callbacks.add( function(to) {
                      if ( +to > 0 ) {
                        //reset the description to default
                        api.control('site_icon').container.find('.description').text(_oldDes);
                        //reset the previous favicon setting
                        if ( api.has( _fav_setId ) )
                          api( _fav_setId ).set("");
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
      );//api.Class.extend() //api.CZR_ctrlDependencies
})( wp.customize, jQuery, _);
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
                  var _ctrl = api.control( controlId );
                  $('input[type=checkbox]', _ctrl.container ).each( function() {
                        //Exclude font customizer
                        if ( 'tc_font_customizer_settings' == _ctrl.params.section )
                          return;
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
                  $('select[data-customize-setting-link]', api.control(controlId).container )
                        .not('.no-selecter-js')
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
            api.czrSetupStepper = function( controlId, refresh ) {
                  //Exclude no-selecter-js
                  var _ctrl = api.control( controlId );
                  $('input[type="number"]', _ctrl.container ).each( function() { $(this).stepper(); });
            };//api.czrSetupStepper()

            // LOOP ON EACH CONTROL REGISTERED AND INSTANTIATE THE PLUGINS
            // @todo => react on control added
            api.control.each( function( control ){
                  if ( ! _.has( control, 'id' ) )
                    return;
                  //exclude widget controls and menu controls for checkboxes
                  if ( 'widget_' != control.id.substring(0, 'widget_'.length ) && 'nav_menu' != control.id.substring( 0, 'nav_menu'.length ) ) {
                        api.czrSetupCheckbox(control.id);
                  }
                  if ( 'nav_menu_locations' != control.id.substring( 0, 'nav_menu_locations'.length ) ) {
                        api.czrSetupSelect(control.id);
                  }

                  // Stepper : exclude controls from specific sections
                  var _exclude = [
                       'publish_settings', //<= the outer section introduced in v4.9 to publish / saved draft / schedule
                       'tc_font_customizer_settings' //the font customizer plugin has its own way to instantiate the stepper, with custom attributes previously set to the input like step, min, etc...
                  ];

                  if ( 0 < control.container.find( 'input[type="number"]' ).length && control.params && control.params.section && ! _.contains( _exclude,  control.params.section ) ) {
                        api.czrSetupStepper(control.id);
                  }
            });


            var fireHeaderButtons = function() {
                  var $home_button = $('<span/>', { class:'customize-controls-home fas fa-home', html:'<span class="screen-reader-text">Home</span>' } );
                  $.when( $('#customize-header-actions').append( $home_button ) )
                        .done( function() {
                              $home_button
                                    .keydown( function( event ) {
                                          if ( 9 === event.which ) // tab
                                            return;
                                          if ( 13 === event.which ) // enter
                                            this.click();
                                          event.preventDefault();
                                    })
                                    .on( 'click.customize-controls-home', function() {
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
                        });
            };

            fireHeaderButtons();

      });//end of $( function($) ) dom ready
})( wp, jQuery );