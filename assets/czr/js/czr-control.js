/*! addEventListener Polyfill ie9- http://stackoverflow.com/a/27790212*/
window.addEventListener=window.addEventListener||function(a,b){window.attachEvent("on"+a,b)},/*!  Datenow Polyfill ie9- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/now */
Date.now||(Date.now=function(){return(new Date).getTime()}),/*! Object.create monkey patch ie8 http://stackoverflow.com/a/18020326 */
Object.create||(Object.create=function(a,b){function c(){}if("undefined"!=typeof b)throw"The multiple-argument version of Object.create is not provided by this browser and cannot be shimmed.";return c.prototype=a,new c}),/*! https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter */
Array.prototype.filter||(Array.prototype.filter=function(a){"use strict";if(void 0===this||null===this)throw new TypeError;var b=Object(this),c=b.length>>>0;if("function"!=typeof a)throw new TypeError;for(var d=[],e=arguments.length>=2?arguments[1]:void 0,f=0;c>f;f++)if(f in b){var g=b[f];a.call(e,g,f,b)&&d.push(g)}return d}),/*! map was added to the ECMA-262 standard in the 5th edition */
Array.prototype.map||(Array.prototype.map=function(a,b){var c,d,e;if(null===this)throw new TypeError(" this is null or not defined");var f=Object(this),g=f.length>>>0;if("function"!=typeof a)throw new TypeError(a+" is not a function");for(arguments.length>1&&(c=b),d=new Array(g),e=0;g>e;){var h,i;e in f&&(h=f[e],i=a.call(c,h,e,f),d[e]=i),e++}return d});/*! iCheck v1.0.1 by Damir Sultanov, http://git.io/arlzeA, MIT Licensed */
if ( 'function' != typeof(jQuery.fn.iCheck) ) {
  !function(a){function b(a,b,e){var f=a[0],g=/er/.test(e)?p:/bl/.test(e)?n:l,h=e==q?{checked:f[l],disabled:f[n],indeterminate:"true"==a.attr(p)||"false"==a.attr(o)}:f[g];if(/^(ch|di|in)/.test(e)&&!h)c(a,g);else if(/^(un|en|de)/.test(e)&&h)d(a,g);else if(e==q)for(g in h)h[g]?c(a,g,!0):d(a,g,!0);else b&&"toggle"!=e||(b||a[u]("ifClicked"),h?f[r]!==k&&d(a,g):c(a,g))}function c(b,c,e){var q=b[0],u=b.parent(),v=c==l,x=c==p,y=c==n,z=x?o:v?m:"enabled",A=f(b,z+g(q[r])),B=f(b,c+g(q[r]));if(!0!==q[c]){if(!e&&c==l&&q[r]==k&&q.name){var C=b.closest("form"),D='input[name="'+q.name+'"]',D=C.length?C.find(D):a(D);D.each(function(){this!==q&&a(this).data(i)&&d(a(this),c)})}x?(q[c]=!0,q[l]&&d(b,l,"force")):(e||(q[c]=!0),v&&q[p]&&d(b,p,!1)),h(b,v,c,e)}q[n]&&f(b,w,!0)&&u.find("."+j).css(w,"default"),u[s](B||f(b,c)||""),y?u.attr("aria-disabled","true"):u.attr("aria-checked",x?"mixed":"true"),u[t](A||f(b,z)||"")}function d(a,b,c){var d=a[0],e=a.parent(),i=b==l,k=b==p,q=b==n,u=k?o:i?m:"enabled",v=f(a,u+g(d[r])),x=f(a,b+g(d[r]));!1!==d[b]&&((k||!c||"force"==c)&&(d[b]=!1),h(a,i,u,c)),!d[n]&&f(a,w,!0)&&e.find("."+j).css(w,"pointer"),e[t](x||f(a,b)||""),q?e.attr("aria-disabled","false"):e.attr("aria-checked","false"),e[s](v||f(a,u)||"")}function e(b,c){b.data(i)&&(b.parent().html(b.attr("style",b.data(i).s||"")),c&&b[u](c),b.off(".i").unwrap(),a(v+'[for="'+b[0].id+'"]').add(b.closest(v)).off(".i"))}function f(a,b,c){return a.data(i)?a.data(i).o[b+(c?"":"Class")]:void 0}function g(a){return a.charAt(0).toUpperCase()+a.slice(1)}function h(a,b,c,d){d||(b&&a[u]("ifToggled"),a[u]("ifChanged")[u]("if"+g(c)))}var i="iCheck",j=i+"-helper",k="radio",l="checked",m="un"+l,n="disabled",o="determinate",p="in"+o,q="update",r="type",s="addClass",t="removeClass",u="trigger",v="label",w="cursor",x=/ipad|iphone|ipod|android|blackberry|windows phone|opera mini|silk/i.test(navigator.userAgent);a.fn[i]=function(f,g){var h='input[type="checkbox"], input[type="'+k+'"]',m=a(),o=function(b){b.each(function(){var b=a(this);m=b.is(h)?m.add(b):m.add(b.find(h))})};if(/^(check|uncheck|toggle|indeterminate|determinate|disable|enable|update|destroy)$/i.test(f))return f=f.toLowerCase(),o(this),m.each(function(){var c=a(this);"destroy"==f?e(c,"ifDestroyed"):b(c,!0,f),a.isFunction(g)&&g()});if("object"!=typeof f&&f)return this;var w=a.extend({checkedClass:l,disabledClass:n,indeterminateClass:p,labelHover:!0,aria:!1},f),y=w.handle,z=w.hoverClass||"hover",A=w.focusClass||"focus",B=w.activeClass||"active",C=!!w.labelHover,D=w.labelHoverClass||"hover",E=0|(""+w.increaseArea).replace("%","");return("checkbox"==y||y==k)&&(h='input[type="'+y+'"]'),-50>E&&(E=-50),o(this),m.each(function(){var f=a(this);e(f);var g=this,h=g.id,m=-E+"%",o=100+2*E+"%",o={position:"absolute",top:m,left:m,display:"block",width:o,height:o,margin:0,padding:0,background:"#fff",border:0,opacity:0},m=x?{position:"absolute",visibility:"hidden"}:E?o:{position:"absolute",opacity:0},p="checkbox"==g[r]?w.checkboxClass||"icheckbox":w.radioClass||"i"+k,y=a(v+'[for="'+h+'"]').add(f.closest(v)),F=!!w.aria,G=i+"-"+Math.random().toString(36).substr(2,6),H='<div class="'+p+'" '+(F?'role="'+g[r]+'" ':"");F&&y.each(function(){H+='aria-labelledby="',this.id?H+=this.id:(this.id=G,H+=G),H+='"'}),H=f.wrap(H+"/>")[u]("ifCreated").parent().append(w.insert),o=a('<ins class="'+j+'"/>').css(o).appendTo(H),f.data(i,{o:w,s:f.attr("style")}).css(m),w.inheritClass&&H[s](g.className||""),w.inheritID&&h&&H.attr("id",i+"-"+h),"static"==H.css("position")&&H.css("position","relative"),b(f,!0,q),y.length&&y.on("click.i mouseover.i mouseout.i touchbegin.i touchend.i",function(c){var d=c[r],e=a(this);if(!g[n]){if("click"==d){if(a(c.target).is("a"))return;b(f,!1,!0)}else C&&(/ut|nd/.test(d)?(H[t](z),e[t](D)):(H[s](z),e[s](D)));if(!x)return!1;c.stopPropagation()}}),f.on("click.i focus.i blur.i keyup.i keydown.i keypress.i",function(a){var b=a[r];return a=a.keyCode,"click"==b?!1:"keydown"==b&&32==a?(g[r]==k&&g[l]||(g[l]?d(f,l):c(f,l)),!1):("keyup"==b&&g[r]==k?!g[l]&&c(f,l):/us|ur/.test(b)&&H["blur"==b?t:s](A),void 0)}),o.on("click mousedown mouseup mouseover mouseout touchbegin.i touchend.i",function(a){var c=a[r],d=/wn|up/.test(c)?B:z;if(!g[n]){if("click"==c?b(f,!1,!0):(/wn|er|in/.test(c)?H[s](d):H[t](d+" "+B),y.length&&C&&d==z&&y[/ut|nd/.test(c)?t:s](D)),!x)return!1;a.stopPropagation()}})})}}(window.jQuery||window.Zepto);
}
if ( 'function' != typeof(jQuery.fn.selecter) ) {
  !function(a,b){"use strict";function c(b){b=a.extend({},x,b||{}),null===w&&(w=a("body"));for(var c=a(this),e=0,f=c.length;f>e;e++)d(c.eq(e),b);return c}function d(b,c){if(!b.hasClass("selecter-element")){c=a.extend({},c,b.data("selecter-options")),c.external&&(c.links=!0);var d=b.find("option, optgroup"),g=d.filter("option"),h=g.filter(":selected"),n=""!==c.label?-1:g.index(h),p=c.links?"nav":"div";c.tabIndex=b[0].tabIndex,b[0].tabIndex=-1,c.multiple=b.prop("multiple"),c.disabled=b.is(":disabled");var q="<"+p+' class="selecter '+c.customClass;v?q+=" mobile":c.cover&&(q+=" cover"),q+=c.multiple?" multiple":" closed",c.disabled&&(q+=" disabled"),q+='" tabindex="'+c.tabIndex+'">',c.multiple||(q+='<span class="selecter-selected'+(""!==c.label?" placeholder":"")+'">',q+=a("<span></span").text(r(""!==c.label?c.label:h.text(),c.trim)).html(),q+="</span>"),q+='<div class="selecter-options">',q+="</div>",q+="</"+p+">",b.addClass("selecter-element").after(q);var s=b.next(".selecter"),u=a.extend({$select:b,$allOptions:d,$options:g,$selecter:s,$selected:s.find(".selecter-selected"),$itemsWrapper:s.find(".selecter-options"),index:-1,guid:t++},c);e(u),o(n,u),void 0!==a.fn.scroller&&u.$itemsWrapper.scroller(),u.$selecter.on("touchstart.selecter click.selecter",".selecter-selected",u,f).on("click.selecter",".selecter-item",u,j).on("close.selecter",u,i).data("selecter",u),u.$select.on("change.selecter",u,k),v||(u.$selecter.on("focus.selecter",u,l).on("blur.selecter",u,m),u.$select.on("focus.selecter",u,function(a){a.data.$selecter.trigger("focus")}))}}function e(b){for(var c="",d=b.links?"a":"span",e=0,f=0,g=b.$allOptions.length;g>f;f++){var h=b.$allOptions.eq(f);if("OPTGROUP"===h[0].tagName)c+='<span class="selecter-group',h.is(":disabled")&&(c+=" disabled"),c+='">'+h.attr("label")+"</span>";else{var i=h.val();h.attr("value")||h.attr("value",i),c+="<"+d+' class="selecter-item',h.is(":selected")&&""===b.label&&(c+=" selected"),h.is(":disabled")&&(c+=" disabled"),c+='" ',c+=b.links?'href="'+i+'"':'data-value="'+i+'"',c+=">"+a("<span></span>").text(r(h.text(),b.trim)).html()+"</"+d+">",e++}}b.$itemsWrapper.html(c),b.$items=b.$selecter.find(".selecter-item")}function f(c){c.preventDefault(),c.stopPropagation();var d=c.data;if(!d.$select.is(":disabled"))if(a(".selecter").not(d.$selecter).trigger("close.selecter",[d]),v){var e=d.$select[0];if(b.document.createEvent){var f=b.document.createEvent("MouseEvents");f.initMouseEvent("mousedown",!1,!0,b,0,0,0,0,0,!1,!1,!1,!1,0,null),e.dispatchEvent(f)}else e.fireEvent&&e.fireEvent("onmousedown")}else d.$selecter.hasClass("closed")?g(c):d.$selecter.hasClass("open")&&i(c)}function g(b){b.preventDefault(),b.stopPropagation();var c=b.data;if(!c.$selecter.hasClass("open")){var d=c.$selecter.offset(),e=w.outerHeight(),f=c.$itemsWrapper.outerHeight(!0),g=c.index>=0?c.$items.eq(c.index).position():{left:0,top:0};d.top+f>e&&c.$selecter.addClass("bottom"),c.$itemsWrapper.show(),c.$selecter.removeClass("closed").addClass("open"),w.on("click.selecter-"+c.guid,":not(.selecter-options)",c,h),void 0!==a.fn.scroller?c.$itemsWrapper.scroller("scroll",c.$itemsWrapper.find(".scroller-content").scrollTop()+g.top,0).scroller("reset"):c.$itemsWrapper.scrollTop(c.$itemsWrapper.scrollTop()+g.top)}}function h(b){b.preventDefault(),b.stopPropagation(),0===a(b.currentTarget).parents(".selecter").length&&i(b)}function i(a){a.preventDefault(),a.stopPropagation();var b=a.data;b.$selecter.hasClass("open")&&(b.$itemsWrapper.hide(),b.$selecter.removeClass("open bottom").addClass("closed"),w.off(".selecter-"+b.guid))}function j(b){b.preventDefault(),b.stopPropagation();var c=a(this),d=b.data;if(!d.$select.is(":disabled")){if(d.$itemsWrapper.is(":visible")){var e=d.$items.index(c);o(e,d),p(d)}d.multiple||i(b)}}function k(b,c){var d=a(this),e=b.data;if(!c&&!e.multiple){var f=e.$options.index(e.$options.filter("[value='"+s(d.val())+"']"));o(f,e),p(e)}}function l(b){b.preventDefault(),b.stopPropagation();var c=b.data;c.$select.is(":disabled")||c.multiple||(c.$selecter.addClass("focus").on("keydown.selecter"+c.guid,c,n),a(".selecter").not(c.$selecter).trigger("close.selecter",[c]))}function m(b){b.preventDefault(),b.stopPropagation();var c=b.data;c.$selecter.removeClass("focus").off("keydown.selecter"+c.guid+" keyup.selecter"+c.guid),a(".selecter").not(c.$selecter).trigger("close.selecter",[c])}function n(b){var c=b.data;if(13===b.keyCode)c.$selecter.hasClass("open")&&(i(b),o(c.index,c)),p(c);else if(!(9===b.keyCode||b.metaKey||b.altKey||b.ctrlKey||b.shiftKey)){b.preventDefault(),b.stopPropagation();var d=c.$items.length-1,e=c.index<0?0:c.index;if(a.inArray(b.keyCode,u?[38,40,37,39]:[38,40])>-1)e+=38===b.keyCode||u&&37===b.keyCode?-1:1,0>e&&(e=0),e>d&&(e=d);else{var f,g,h=String.fromCharCode(b.keyCode).toUpperCase();for(g=c.index+1;d>=g;g++)if(f=c.$options.eq(g).text().charAt(0).toUpperCase(),f===h){e=g;break}if(0>e)for(g=0;d>=g;g++)if(f=c.$options.eq(g).text().charAt(0).toUpperCase(),f===h){e=g;break}}e>=0&&o(e,c)}}function o(a,b){var c=b.$items.eq(a),d=c.hasClass("selected"),e=c.hasClass("disabled");if(!e){if(-1===a&&""!==b.label)b.$selected.html(b.label);else if(d)b.multiple&&(b.$options.eq(a).prop("selected",null),c.removeClass("selected"));else{{var f=c.html();c.data("value")}b.multiple?b.$options.eq(a).prop("selected",!0):(b.$selected.html(f).removeClass("placeholder"),b.$items.filter(".selected").removeClass("selected"),b.$select[0].selectedIndex=a),c.addClass("selected")}(!d||b.multiple)&&(b.index=a)}}function p(a){a.links?q(a):(a.callback.call(a.$selecter,a.$select.val(),a.index),a.$select.trigger("change",[!0]))}function q(a){var c=a.$select.val();a.external?b.open(c):b.location.href=c}function r(a,b){return 0===b?a:a.length>b?a.substring(0,b)+"...":a}function s(a){return a.replace(/([;&,\.\+\*\~':"\!\^#$%@\[\]\(\)=>\|])/g,"\\$1")}var t=0,u=b.navigator.userAgent.toLowerCase().indexOf("firefox")>-1,v=/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(b.navigator.userAgent||b.navigator.vendor||b.opera),w=null,x={callback:a.noop,cover:!1,customClass:"",label:"",external:!1,links:!1,trim:0},y={defaults:function(b){return x=a.extend(x,b||{}),a(this)},disable:function(b){return a(this).each(function(c,d){var e=a(d).next(".selecter").data("selecter");if(e)if("undefined"!=typeof b){var f=e.$items.index(e.$items.filter("[data-value="+b+"]"));e.$items.eq(f).addClass("disabled"),e.$options.eq(f).prop("disabled",!0)}else e.$selecter.hasClass("open")&&e.$selecter.find(".selecter-selected").trigger("click.selecter"),e.$selecter.addClass("disabled"),e.$select.prop("disabled",!0)})},enable:function(b){return a(this).each(function(c,d){var e=a(d).next(".selecter").data("selecter");if(e)if("undefined"!=typeof b){var f=e.$items.index(e.$items.filter("[data-value="+b+"]"));e.$items.eq(f).removeClass("disabled"),e.$options.eq(f).prop("disabled",!1)}else e.$selecter.removeClass("disabled"),e.$select.prop("disabled",!1)})},destroy:function(){return a(this).each(function(b,c){var d=a(c).next(".selecter").data("selecter");d&&(d.$selecter.hasClass("open")&&d.$selecter.find(".selecter-selected").trigger("click.selecter"),void 0!==a.fn.scroller&&d.$selecter.find(".selecter-options").scroller("destroy"),d.$select[0].tabIndex=d.tabIndex,d.$select.off(".selecter").removeClass("selecter-element").show(),d.$selecter.off(".selecter").remove())})},refresh:function(){return a(this).each(function(b,c){var d=a(c).next(".selecter").data("selecter");if(d){var f=d.index;d.$allOptions=d.$select.find("option, optgroup"),d.$options=d.$allOptions.filter("option"),d.index=-1,f=d.$options.index(d.$options.filter(":selected")),e(d),o(f,d)}})}};a.fn.selecter=function(a){return y[a]?y[a].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof a&&a?this:c.apply(this,arguments)},a.selecter=function(a){"defaults"===a&&y.defaults.apply(this,Array.prototype.slice.call(arguments,1))}}(jQuery,window);
}
if ( 'function' != typeof(jQuery.fn.stepper) ) {
  !function(a){"use strict";function b(b){b=a.extend({},k,b||{});for(var d=a(this),e=0,f=d.length;f>e;e++)c(d.eq(e),b);return d}function c(b,c){if(!b.hasClass("stepper-input")){c=a.extend({},c,b.data("stepper-options"));var e=parseFloat(b.attr("min")),f=parseFloat(b.attr("max")),g=parseFloat(b.attr("step"))||1;b.addClass("stepper-input").wrap('<div class="stepper '+c.customClass+'" />').after('<span class="stepper-arrow up">'+c.labels.up+'</span><span class="stepper-arrow down">'+c.labels.down+"</span>");var h=b.parent(".stepper"),j=a.extend({$stepper:h,$input:b,$arrow:h.find(".stepper-arrow"),min:void 0===typeof e||isNaN(e)?!1:e,max:void 0===typeof f||isNaN(f)?!1:f,step:void 0===typeof g||isNaN(g)?1:g,timer:null},c);j.digits=i(j.step),b.is(":disabled")&&h.addClass("disabled"),h.on("touchstart.stepper mousedown.stepper",".stepper-arrow",j,d).data("stepper",j)}}function d(b){b.preventDefault(),b.stopPropagation(),e(b);var c=b.data;if(!c.$input.is(":disabled")&&!c.$stepper.hasClass("disabled")){var d=a(b.target).hasClass("up")?c.step:-c.step;c.timer=g(c.timer,125,function(){f(c,d,!1)}),f(c,d),a("body").on("touchend.stepper mouseup.stepper",c,e)}}function e(b){b.preventDefault(),b.stopPropagation();var c=b.data;h(c.timer),a("body").off(".stepper")}function f(a,b){var c=parseFloat(a.$input.val()),d=b;void 0===typeof c||isNaN(c)?d=a.min!==!1?a.min:0:a.min!==!1&&c<a.min?d=a.min:d+=c;var e=(d-a.min)%a.step;0!==e&&(d-=e),a.min!==!1&&d<a.min&&(d=a.min),a.max!==!1&&d>a.max&&(d-=a.step),d!==c&&(d=j(d,a.digits),a.$input.val(d).trigger("change"))}function g(a,b,c){return h(a),setInterval(c,b)}function h(a){a&&(clearInterval(a),a=null)}function i(a){var b=String(a);return b.indexOf(".")>-1?b.length-b.indexOf(".")-1:0}function j(a,b){var c=Math.pow(10,b);return Math.round(a*c)/c}var k={customClass:"",labels:{up:"Up",down:"Down"}},l={defaults:function(b){return k=a.extend(k,b||{}),a(this)},destroy:function(){return a(this).each(function(){var b=a(this).data("stepper");b&&(b.$stepper.off(".stepper").find(".stepper-arrow").remove(),b.$input.unwrap().removeClass("stepper-input"))})},disable:function(){return a(this).each(function(){var b=a(this).data("stepper");b&&(b.$input.attr("disabled","disabled"),b.$stepper.addClass("disabled"))})},enable:function(){return a(this).each(function(){var b=a(this).data("stepper");b&&(b.$input.attr("disabled",null),b.$stepper.removeClass("disabled"))})}};a.fn.stepper=function(a){return l[a]?l[a].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof a&&a?this:b.apply(this,arguments)},a.stepper=function(a){"defaults"===a&&l.defaults.apply(this,Array.prototype.slice.call(arguments,1))}}(jQuery,this);
}/*! Select2 4.0.1 | https://github.com/select2/select2/blob/master/LICENSE.md */!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a("object"==typeof exports?require("jquery"):jQuery)}(function(a){var b=function(){if(a&&a.fn&&a.fn.select2&&a.fn.select2.amd)var b=a.fn.select2.amd;var b;return function(){if(!b||!b.requirejs){b?c=b:b={};var a,c,d;!function(b){function e(a,b){return u.call(a,b)}function f(a,b){var c,d,e,f,g,h,i,j,k,l,m,n=b&&b.split("/"),o=s.map,p=o&&o["*"]||{};if(a&&"."===a.charAt(0))if(b){for(a=a.split("/"),g=a.length-1,s.nodeIdCompat&&w.test(a[g])&&(a[g]=a[g].replace(w,"")),a=n.slice(0,n.length-1).concat(a),k=0;k<a.length;k+=1)if(m=a[k],"."===m)a.splice(k,1),k-=1;else if(".."===m){if(1===k&&(".."===a[2]||".."===a[0]))break;k>0&&(a.splice(k-1,2),k-=2)}a=a.join("/")}else 0===a.indexOf("./")&&(a=a.substring(2));if((n||p)&&o){for(c=a.split("/"),k=c.length;k>0;k-=1){if(d=c.slice(0,k).join("/"),n)for(l=n.length;l>0;l-=1)if(e=o[n.slice(0,l).join("/")],e&&(e=e[d])){f=e,h=k;break}if(f)break;!i&&p&&p[d]&&(i=p[d],j=k)}!f&&i&&(f=i,h=j),f&&(c.splice(0,h,f),a=c.join("/"))}return a}function g(a,c){return function(){var d=v.call(arguments,0);return"string"!=typeof d[0]&&1===d.length&&d.push(null),n.apply(b,d.concat([a,c]))}}function h(a){return function(b){return f(b,a)}}function i(a){return function(b){q[a]=b}}function j(a){if(e(r,a)){var c=r[a];delete r[a],t[a]=!0,m.apply(b,c)}if(!e(q,a)&&!e(t,a))throw new Error("No "+a);return q[a]}function k(a){var b,c=a?a.indexOf("!"):-1;return c>-1&&(b=a.substring(0,c),a=a.substring(c+1,a.length)),[b,a]}function l(a){return function(){return s&&s.config&&s.config[a]||{}}}var m,n,o,p,q={},r={},s={},t={},u=Object.prototype.hasOwnProperty,v=[].slice,w=/\.js$/;o=function(a,b){var c,d=k(a),e=d[0];return a=d[1],e&&(e=f(e,b),c=j(e)),e?a=c&&c.normalize?c.normalize(a,h(b)):f(a,b):(a=f(a,b),d=k(a),e=d[0],a=d[1],e&&(c=j(e))),{f:e?e+"!"+a:a,n:a,pr:e,p:c}},p={require:function(a){return g(a)},exports:function(a){var b=q[a];return"undefined"!=typeof b?b:q[a]={}},module:function(a){return{id:a,uri:"",exports:q[a],config:l(a)}}},m=function(a,c,d,f){var h,k,l,m,n,s,u=[],v=typeof d;if(f=f||a,"undefined"===v||"function"===v){for(c=!c.length&&d.length?["require","exports","module"]:c,n=0;n<c.length;n+=1)if(m=o(c[n],f),k=m.f,"require"===k)u[n]=p.require(a);else if("exports"===k)u[n]=p.exports(a),s=!0;else if("module"===k)h=u[n]=p.module(a);else if(e(q,k)||e(r,k)||e(t,k))u[n]=j(k);else{if(!m.p)throw new Error(a+" missing "+k);m.p.load(m.n,g(f,!0),i(k),{}),u[n]=q[k]}l=d?d.apply(q[a],u):void 0,a&&(h&&h.exports!==b&&h.exports!==q[a]?q[a]=h.exports:l===b&&s||(q[a]=l))}else a&&(q[a]=d)},a=c=n=function(a,c,d,e,f){if("string"==typeof a)return p[a]?p[a](c):j(o(a,c).f);if(!a.splice){if(s=a,s.deps&&n(s.deps,s.callback),!c)return;c.splice?(a=c,c=d,d=null):a=b}return c=c||function(){},"function"==typeof d&&(d=e,e=f),e?m(b,a,c,d):setTimeout(function(){m(b,a,c,d)},4),n},n.config=function(a){return n(a)},a._defined=q,d=function(a,b,c){if("string"!=typeof a)throw new Error("See almond README: incorrect module build, no module name");b.splice||(c=b,b=[]),e(q,a)||e(r,a)||(r[a]=[a,b,c])},d.amd={jQuery:!0}}(),b.requirejs=a,b.require=c,b.define=d}}(),b.define("almond",function(){}),b.define("jquery",[],function(){var b=a||$;return null==b&&console&&console.error&&console.error("Select2: An instance of jQuery or a jQuery-compatible library was not found. Make sure that you are including jQuery before Select2 on your web page."),b}),b.define("select2/utils",["jquery"],function(a){function b(a){var b=a.prototype,c=[];for(var d in b){var e=b[d];"function"==typeof e&&"constructor"!==d&&c.push(d)}return c}var c={};c.Extend=function(a,b){function c(){this.constructor=a}var d={}.hasOwnProperty;for(var e in b)d.call(b,e)&&(a[e]=b[e]);return c.prototype=b.prototype,a.prototype=new c,a.__super__=b.prototype,a},c.Decorate=function(a,c){function d(){var b=Array.prototype.unshift,d=c.prototype.constructor.length,e=a.prototype.constructor;d>0&&(b.call(arguments,a.prototype.constructor),e=c.prototype.constructor),e.apply(this,arguments)}function e(){this.constructor=d}var f=b(c),g=b(a);c.displayName=a.displayName,d.prototype=new e;for(var h=0;h<g.length;h++){var i=g[h];d.prototype[i]=a.prototype[i]}for(var j=(function(a){var b=function(){};a in d.prototype&&(b=d.prototype[a]);var e=c.prototype[a];return function(){var a=Array.prototype.unshift;return a.call(arguments,b),e.apply(this,arguments)}}),k=0;k<f.length;k++){var l=f[k];d.prototype[l]=j(l)}return d};var d=function(){this.listeners={}};return d.prototype.on=function(a,b){this.listeners=this.listeners||{},a in this.listeners?this.listeners[a].push(b):this.listeners[a]=[b]},d.prototype.trigger=function(a){var b=Array.prototype.slice;this.listeners=this.listeners||{},a in this.listeners&&this.invoke(this.listeners[a],b.call(arguments,1)),"*"in this.listeners&&this.invoke(this.listeners["*"],arguments)},d.prototype.invoke=function(a,b){for(var c=0,d=a.length;d>c;c++)a[c].apply(this,b)},c.Observable=d,c.generateChars=function(a){for(var b="",c=0;a>c;c++){var d=Math.floor(36*Math.random());b+=d.toString(36)}return b},c.bind=function(a,b){return function(){a.apply(b,arguments)}},c._convertData=function(a){for(var b in a){var c=b.split("-"),d=a;if(1!==c.length){for(var e=0;e<c.length;e++){var f=c[e];f=f.substring(0,1).toLowerCase()+f.substring(1),f in d||(d[f]={}),e==c.length-1&&(d[f]=a[b]),d=d[f]}delete a[b]}}return a},c.hasScroll=function(b,c){var d=a(c),e=c.style.overflowX,f=c.style.overflowY;return e!==f||"hidden"!==f&&"visible"!==f?"scroll"===e||"scroll"===f?!0:d.innerHeight()<c.scrollHeight||d.innerWidth()<c.scrollWidth:!1},c.escapeMarkup=function(a){var b={"\\":"&#92;","&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#47;"};return"string"!=typeof a?a:String(a).replace(/[&<>"'\/\\]/g,function(a){return b[a]})},c.appendMany=function(b,c){if("1.7"===a.fn.jquery.substr(0,3)){var d=a();a.map(c,function(a){d=d.add(a)}),c=d}b.append(c)},c}),b.define("select2/results",["jquery","./utils"],function(a,b){function c(a,b,d){this.$element=a,this.data=d,this.options=b,c.__super__.constructor.call(this)}return b.Extend(c,b.Observable),c.prototype.render=function(){var b=a('<ul class="select2-results__options" role="tree"></ul>');return this.options.get("multiple")&&b.attr("aria-multiselectable","true"),this.$results=b,b},c.prototype.clear=function(){this.$results.empty()},c.prototype.displayMessage=function(b){var c=this.options.get("escapeMarkup");this.clear(),this.hideLoading();var d=a('<li role="treeitem" aria-live="assertive" class="select2-results__option"></li>'),e=this.options.get("translations").get(b.message);d.append(c(e(b.args))),d[0].className+=" select2-results__message",this.$results.append(d)},c.prototype.hideMessages=function(){this.$results.find(".select2-results__message").remove()},c.prototype.append=function(a){this.hideLoading();var b=[];if(null==a.results||0===a.results.length)return void(0===this.$results.children().length&&this.trigger("results:message",{message:"noResults"}));a.results=this.sort(a.results);for(var c=0;c<a.results.length;c++){var d=a.results[c],e=this.option(d);b.push(e)}this.$results.append(b)},c.prototype.position=function(a,b){var c=b.find(".select2-results");c.append(a)},c.prototype.sort=function(a){var b=this.options.get("sorter");return b(a)},c.prototype.setClasses=function(){var b=this;this.data.current(function(c){var d=a.map(c,function(a){return a.id.toString()}),e=b.$results.find(".select2-results__option[aria-selected]");e.each(function(){var b=a(this),c=a.data(this,"data"),e=""+c.id;null!=c.element&&c.element.selected||null==c.element&&a.inArray(e,d)>-1?b.attr("aria-selected","true"):b.attr("aria-selected","false")});var f=e.filter("[aria-selected=true]");f.length>0?f.first().trigger("mouseenter"):e.first().trigger("mouseenter")})},c.prototype.showLoading=function(a){this.hideLoading();var b=this.options.get("translations").get("searching"),c={disabled:!0,loading:!0,text:b(a)},d=this.option(c);d.className+=" loading-results",this.$results.prepend(d)},c.prototype.hideLoading=function(){this.$results.find(".loading-results").remove()},c.prototype.option=function(b){var c=document.createElement("li");c.className="select2-results__option";var d={role:"treeitem","aria-selected":"false"};b.disabled&&(delete d["aria-selected"],d["aria-disabled"]="true"),null==b.id&&delete d["aria-selected"],null!=b._resultId&&(c.id=b._resultId),b.title&&(c.title=b.title),b.children&&(d.role="group",d["aria-label"]=b.text,delete d["aria-selected"]);for(var e in d){var f=d[e];c.setAttribute(e,f)}if(b.children){var g=a(c),h=document.createElement("strong");h.className="select2-results__group";a(h);this.template(b,h);for(var i=[],j=0;j<b.children.length;j++){var k=b.children[j],l=this.option(k);i.push(l)}var m=a("<ul></ul>",{"class":"select2-results__options select2-results__options--nested"});m.append(i),g.append(h),g.append(m)}else this.template(b,c);return a.data(c,"data",b),c},c.prototype.bind=function(b,c){var d=this,e=b.id+"-results";this.$results.attr("id",e),b.on("results:all",function(a){d.clear(),d.append(a.data),b.isOpen()&&d.setClasses()}),b.on("results:append",function(a){d.append(a.data),b.isOpen()&&d.setClasses()}),b.on("query",function(a){d.hideMessages(),d.showLoading(a)}),b.on("select",function(){b.isOpen()&&d.setClasses()}),b.on("unselect",function(){b.isOpen()&&d.setClasses()}),b.on("open",function(){d.$results.attr("aria-expanded","true"),d.$results.attr("aria-hidden","false"),d.setClasses(),d.ensureHighlightVisible()}),b.on("close",function(){d.$results.attr("aria-expanded","false"),d.$results.attr("aria-hidden","true"),d.$results.removeAttr("aria-activedescendant")}),b.on("results:toggle",function(){var a=d.getHighlightedResults();0!==a.length&&a.trigger("mouseup")}),b.on("results:select",function(){var a=d.getHighlightedResults();if(0!==a.length){var b=a.data("data");"true"==a.attr("aria-selected")?d.trigger("close",{}):d.trigger("select",{data:b})}}),b.on("results:previous",function(){var a=d.getHighlightedResults(),b=d.$results.find("[aria-selected]"),c=b.index(a);if(0!==c){var e=c-1;0===a.length&&(e=0);var f=b.eq(e);f.trigger("mouseenter");var g=d.$results.offset().top,h=f.offset().top,i=d.$results.scrollTop()+(h-g);0===e?d.$results.scrollTop(0):0>h-g&&d.$results.scrollTop(i)}}),b.on("results:next",function(){var a=d.getHighlightedResults(),b=d.$results.find("[aria-selected]"),c=b.index(a),e=c+1;if(!(e>=b.length)){var f=b.eq(e);f.trigger("mouseenter");var g=d.$results.offset().top+d.$results.outerHeight(!1),h=f.offset().top+f.outerHeight(!1),i=d.$results.scrollTop()+h-g;0===e?d.$results.scrollTop(0):h>g&&d.$results.scrollTop(i)}}),b.on("results:focus",function(a){a.element.addClass("select2-results__option--highlighted")}),b.on("results:message",function(a){d.displayMessage(a)}),a.fn.mousewheel&&this.$results.on("mousewheel",function(a){var b=d.$results.scrollTop(),c=d.$results.get(0).scrollHeight-d.$results.scrollTop()+a.deltaY,e=a.deltaY>0&&b-a.deltaY<=0,f=a.deltaY<0&&c<=d.$results.height();e?(d.$results.scrollTop(0),a.preventDefault(),a.stopPropagation()):f&&(d.$results.scrollTop(d.$results.get(0).scrollHeight-d.$results.height()),a.preventDefault(),a.stopPropagation())}),this.$results.on("mouseup",".select2-results__option[aria-selected]",function(b){var c=a(this),e=c.data("data");return"true"===c.attr("aria-selected")?void(d.options.get("multiple")?d.trigger("unselect",{originalEvent:b,data:e}):d.trigger("close",{})):void d.trigger("select",{originalEvent:b,data:e})}),this.$results.on("mouseenter",".select2-results__option[aria-selected]",function(b){var c=a(this).data("data");d.getHighlightedResults().removeClass("select2-results__option--highlighted"),d.trigger("results:focus",{data:c,element:a(this)})})},c.prototype.getHighlightedResults=function(){var a=this.$results.find(".select2-results__option--highlighted");return a},c.prototype.destroy=function(){this.$results.remove()},c.prototype.ensureHighlightVisible=function(){var a=this.getHighlightedResults();if(0!==a.length){var b=this.$results.find("[aria-selected]"),c=b.index(a),d=this.$results.offset().top,e=a.offset().top,f=this.$results.scrollTop()+(e-d),g=e-d;f-=2*a.outerHeight(!1),2>=c?this.$results.scrollTop(0):(g>this.$results.outerHeight()||0>g)&&this.$results.scrollTop(f)}},c.prototype.template=function(b,c){var d=this.options.get("templateResult"),e=this.options.get("escapeMarkup"),f=d(b,c);null==f?c.style.display="none":"string"==typeof f?c.innerHTML=e(f):a(c).append(f)},c}),b.define("select2/keys",[],function(){var a={BACKSPACE:8,TAB:9,ENTER:13,SHIFT:16,CTRL:17,ALT:18,ESC:27,SPACE:32,PAGE_UP:33,PAGE_DOWN:34,END:35,HOME:36,LEFT:37,UP:38,RIGHT:39,DOWN:40,DELETE:46};return a}),b.define("select2/selection/base",["jquery","../utils","../keys"],function(a,b,c){function d(a,b){this.$element=a,this.options=b,d.__super__.constructor.call(this)}return b.Extend(d,b.Observable),d.prototype.render=function(){var b=a('<span class="select2-selection" role="combobox"  aria-haspopup="true" aria-expanded="false"></span>');return this._tabindex=0,null!=this.$element.data("old-tabindex")?this._tabindex=this.$element.data("old-tabindex"):null!=this.$element.attr("tabindex")&&(this._tabindex=this.$element.attr("tabindex")),b.attr("title",this.$element.attr("title")),b.attr("tabindex",this._tabindex),this.$selection=b,b},d.prototype.bind=function(a,b){var d=this,e=(a.id+"-container",a.id+"-results");this.container=a,this.$selection.on("focus",function(a){d.trigger("focus",a)}),this.$selection.on("blur",function(a){d._handleBlur(a)}),this.$selection.on("keydown",function(a){d.trigger("keypress",a),a.which===c.SPACE&&a.preventDefault()}),a.on("results:focus",function(a){d.$selection.attr("aria-activedescendant",a.data._resultId)}),a.on("selection:update",function(a){d.update(a.data)}),a.on("open",function(){d.$selection.attr("aria-expanded","true"),d.$selection.attr("aria-owns",e),d._attachCloseHandler(a)}),a.on("close",function(){d.$selection.attr("aria-expanded","false"),d.$selection.removeAttr("aria-activedescendant"),d.$selection.removeAttr("aria-owns"),d.$selection.focus(),d._detachCloseHandler(a)}),a.on("enable",function(){d.$selection.attr("tabindex",d._tabindex)}),a.on("disable",function(){d.$selection.attr("tabindex","-1")})},d.prototype._handleBlur=function(b){var c=this;window.setTimeout(function(){document.activeElement==c.$selection[0]||a.contains(c.$selection[0],document.activeElement)||c.trigger("blur",b)},1)},d.prototype._attachCloseHandler=function(b){a(document.body).on("mousedown.select2."+b.id,function(b){var c=a(b.target),d=c.closest(".select2"),e=a(".select2.select2-container--open");e.each(function(){var b=a(this);if(this!=d[0]){var c=b.data("element");c.select2("close")}})})},d.prototype._detachCloseHandler=function(b){a(document.body).off("mousedown.select2."+b.id)},d.prototype.position=function(a,b){var c=b.find(".selection");c.append(a)},d.prototype.destroy=function(){this._detachCloseHandler(this.container)},d.prototype.update=function(a){throw new Error("The `update` method must be defined in child classes.")},d}),b.define("select2/selection/single",["jquery","./base","../utils","../keys"],function(a,b,c,d){function e(){e.__super__.constructor.apply(this,arguments)}return c.Extend(e,b),e.prototype.render=function(){var a=e.__super__.render.call(this);return a.addClass("select2-selection--single"),a.html('<span class="select2-selection__rendered"></span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span>'),a},e.prototype.bind=function(a,b){var c=this;e.__super__.bind.apply(this,arguments);var d=a.id+"-container";this.$selection.find(".select2-selection__rendered").attr("id",d),this.$selection.attr("aria-labelledby",d),this.$selection.on("mousedown",function(a){1===a.which&&c.trigger("toggle",{originalEvent:a})}),this.$selection.on("focus",function(a){}),this.$selection.on("blur",function(a){}),a.on("selection:update",function(a){c.update(a.data)})},e.prototype.clear=function(){this.$selection.find(".select2-selection__rendered").empty()},e.prototype.display=function(a,b){var c=this.options.get("templateSelection"),d=this.options.get("escapeMarkup");return d(c(a,b))},e.prototype.selectionContainer=function(){return a("<span></span>")},e.prototype.update=function(a){if(0===a.length)return void this.clear();var b=a[0],c=this.$selection.find(".select2-selection__rendered"),d=this.display(b,c);c.empty().append(d),c.prop("title",b.title||b.text)},e}),b.define("select2/selection/multiple",["jquery","./base","../utils"],function(a,b,c){function d(a,b){d.__super__.constructor.apply(this,arguments)}return c.Extend(d,b),d.prototype.render=function(){var a=d.__super__.render.call(this);return a.addClass("select2-selection--multiple"),a.html('<ul class="select2-selection__rendered"></ul>'),a},d.prototype.bind=function(b,c){var e=this;d.__super__.bind.apply(this,arguments),this.$selection.on("click",function(a){e.trigger("toggle",{originalEvent:a})}),this.$selection.on("click",".select2-selection__choice__remove",function(b){if(!e.options.get("disabled")){var c=a(this),d=c.parent(),f=d.data("data");e.trigger("unselect",{originalEvent:b,data:f})}})},d.prototype.clear=function(){this.$selection.find(".select2-selection__rendered").empty()},d.prototype.display=function(a,b){var c=this.options.get("templateSelection"),d=this.options.get("escapeMarkup");return d(c(a,b))},d.prototype.selectionContainer=function(){var b=a('<li class="select2-selection__choice"><span class="select2-selection__choice__remove" role="presentation">&times;</span></li>');return b},d.prototype.update=function(a){if(this.clear(),0!==a.length){for(var b=[],d=0;d<a.length;d++){var e=a[d],f=this.selectionContainer(),g=this.display(e,f);f.append(g),f.prop("title",e.title||e.text),f.data("data",e),b.push(f)}var h=this.$selection.find(".select2-selection__rendered");c.appendMany(h,b)}},d}),b.define("select2/selection/placeholder",["../utils"],function(a){function b(a,b,c){this.placeholder=this.normalizePlaceholder(c.get("placeholder")),a.call(this,b,c)}return b.prototype.normalizePlaceholder=function(a,b){return"string"==typeof b&&(b={id:"",text:b}),b},b.prototype.createPlaceholder=function(a,b){var c=this.selectionContainer();return c.html(this.display(b)),c.addClass("select2-selection__placeholder").removeClass("select2-selection__choice"),c},b.prototype.update=function(a,b){var c=1==b.length&&b[0].id!=this.placeholder.id,d=b.length>1;if(d||c)return a.call(this,b);this.clear();var e=this.createPlaceholder(this.placeholder);this.$selection.find(".select2-selection__rendered").append(e)},b}),b.define("select2/selection/allowClear",["jquery","../keys"],function(a,b){function c(){}return c.prototype.bind=function(a,b,c){var d=this;a.call(this,b,c),null==this.placeholder&&this.options.get("debug")&&window.console&&console.error&&console.error("Select2: The `allowClear` option should be used in combination with the `placeholder` option."),this.$selection.on("mousedown",".select2-selection__clear",function(a){d._handleClear(a)}),b.on("keypress",function(a){d._handleKeyboardClear(a,b)})},c.prototype._handleClear=function(a,b){if(!this.options.get("disabled")){var c=this.$selection.find(".select2-selection__clear");if(0!==c.length){b.stopPropagation();for(var d=c.data("data"),e=0;e<d.length;e++){var f={data:d[e]};if(this.trigger("unselect",f),f.prevented)return}this.$element.val(this.placeholder.id).trigger("change"),this.trigger("toggle",{})}}},c.prototype._handleKeyboardClear=function(a,c,d){d.isOpen()||(c.which==b.DELETE||c.which==b.BACKSPACE)&&this._handleClear(c)},c.prototype.update=function(b,c){if(b.call(this,c),!(this.$selection.find(".select2-selection__placeholder").length>0||0===c.length)){var d=a('<span class="select2-selection__clear">&times;</span>');d.data("data",c),this.$selection.find(".select2-selection__rendered").prepend(d)}},c}),b.define("select2/selection/search",["jquery","../utils","../keys"],function(a,b,c){function d(a,b,c){a.call(this,b,c)}return d.prototype.render=function(b){var c=a('<li class="select2-search select2-search--inline"><input class="select2-search__field" type="search" tabindex="-1" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" role="textbox" aria-autocomplete="list" /></li>');this.$searchContainer=c,this.$search=c.find("input");var d=b.call(this);return this._transferTabIndex(),d},d.prototype.bind=function(a,b,d){var e=this;a.call(this,b,d),b.on("open",function(){e.$search.trigger("focus")}),b.on("close",function(){e.$search.val(""),e.$search.removeAttr("aria-activedescendant"),e.$search.trigger("focus")}),b.on("enable",function(){e.$search.prop("disabled",!1),e._transferTabIndex()}),b.on("disable",function(){e.$search.prop("disabled",!0)}),b.on("focus",function(a){e.$search.trigger("focus")}),b.on("results:focus",function(a){e.$search.attr("aria-activedescendant",a.id)}),this.$selection.on("focusin",".select2-search--inline",function(a){e.trigger("focus",a)}),this.$selection.on("focusout",".select2-search--inline",function(a){e._handleBlur(a)}),this.$selection.on("keydown",".select2-search--inline",function(a){a.stopPropagation(),e.trigger("keypress",a),e._keyUpPrevented=a.isDefaultPrevented();var b=a.which;if(b===c.BACKSPACE&&""===e.$search.val()){var d=e.$searchContainer.prev(".select2-selection__choice");if(d.length>0){var f=d.data("data");e.searchRemoveChoice(f),a.preventDefault()}}});var f=document.documentMode,g=f&&11>=f;this.$selection.on("input.searchcheck",".select2-search--inline",function(a){return g?void e.$selection.off("input.search input.searchcheck"):void e.$selection.off("keyup.search")}),this.$selection.on("keyup.search input.search",".select2-search--inline",function(a){if(g&&"input"===a.type)return void e.$selection.off("input.search input.searchcheck");var b=a.which;b!=c.SHIFT&&b!=c.CTRL&&b!=c.ALT&&b!=c.TAB&&e.handleSearch(a)})},d.prototype._transferTabIndex=function(a){this.$search.attr("tabindex",this.$selection.attr("tabindex")),this.$selection.attr("tabindex","-1")},d.prototype.createPlaceholder=function(a,b){this.$search.attr("placeholder",b.text)},d.prototype.update=function(a,b){var c=this.$search[0]==document.activeElement;this.$search.attr("placeholder",""),a.call(this,b),this.$selection.find(".select2-selection__rendered").append(this.$searchContainer),this.resizeSearch(),c&&this.$search.focus()},d.prototype.handleSearch=function(){if(this.resizeSearch(),!this._keyUpPrevented){var a=this.$search.val();this.trigger("query",{term:a})}this._keyUpPrevented=!1},d.prototype.searchRemoveChoice=function(a,b){this.trigger("unselect",{data:b}),this.$search.val(b.text),this.handleSearch()},d.prototype.resizeSearch=function(){this.$search.css("width","25px");var a="";if(""!==this.$search.attr("placeholder"))a=this.$selection.find(".select2-selection__rendered").innerWidth();else{var b=this.$search.val().length+1;a=.75*b+"em"}this.$search.css("width",a)},d}),b.define("select2/selection/eventRelay",["jquery"],function(a){function b(){}return b.prototype.bind=function(b,c,d){var e=this,f=["open","opening","close","closing","select","selecting","unselect","unselecting"],g=["opening","closing","selecting","unselecting"];b.call(this,c,d),c.on("*",function(b,c){if(-1!==a.inArray(b,f)){c=c||{};var d=a.Event("select2:"+b,{params:c});e.$element.trigger(d),-1!==a.inArray(b,g)&&(c.prevented=d.isDefaultPrevented())}})},b}),b.define("select2/translation",["jquery","require"],function(a,b){function c(a){this.dict=a||{}}return c.prototype.all=function(){return this.dict},c.prototype.get=function(a){return this.dict[a]},c.prototype.extend=function(b){this.dict=a.extend({},b.all(),this.dict)},c._cache={},c.loadPath=function(a){if(!(a in c._cache)){var d=b(a);c._cache[a]=d}return new c(c._cache[a])},c}),b.define("select2/diacritics",[],function(){var a={"Ⓐ":"A","Ａ":"A","À":"A","Á":"A","Â":"A","Ầ":"A","Ấ":"A","Ẫ":"A","Ẩ":"A","Ã":"A","Ā":"A","Ă":"A","Ằ":"A","Ắ":"A","Ẵ":"A","Ẳ":"A","Ȧ":"A","Ǡ":"A","Ä":"A","Ǟ":"A","Ả":"A","Å":"A","Ǻ":"A","Ǎ":"A","Ȁ":"A","Ȃ":"A","Ạ":"A","Ậ":"A","Ặ":"A","Ḁ":"A","Ą":"A","Ⱥ":"A","Ɐ":"A","Ꜳ":"AA","Æ":"AE","Ǽ":"AE","Ǣ":"AE","Ꜵ":"AO","Ꜷ":"AU","Ꜹ":"AV","Ꜻ":"AV","Ꜽ":"AY","Ⓑ":"B","Ｂ":"B","Ḃ":"B","Ḅ":"B","Ḇ":"B","Ƀ":"B","Ƃ":"B","Ɓ":"B","Ⓒ":"C","Ｃ":"C","Ć":"C","Ĉ":"C","Ċ":"C","Č":"C","Ç":"C","Ḉ":"C","Ƈ":"C","Ȼ":"C","Ꜿ":"C","Ⓓ":"D","Ｄ":"D","Ḋ":"D","Ď":"D","Ḍ":"D","Ḑ":"D","Ḓ":"D","Ḏ":"D","Đ":"D","Ƌ":"D","Ɗ":"D","Ɖ":"D","Ꝺ":"D","Ǳ":"DZ","Ǆ":"DZ","ǲ":"Dz","ǅ":"Dz","Ⓔ":"E","Ｅ":"E","È":"E","É":"E","Ê":"E","Ề":"E","Ế":"E","Ễ":"E","Ể":"E","Ẽ":"E","Ē":"E","Ḕ":"E","Ḗ":"E","Ĕ":"E","Ė":"E","Ë":"E","Ẻ":"E","Ě":"E","Ȅ":"E","Ȇ":"E","Ẹ":"E","Ệ":"E","Ȩ":"E","Ḝ":"E","Ę":"E","Ḙ":"E","Ḛ":"E","Ɛ":"E","Ǝ":"E","Ⓕ":"F","Ｆ":"F","Ḟ":"F","Ƒ":"F","Ꝼ":"F","Ⓖ":"G","Ｇ":"G","Ǵ":"G","Ĝ":"G","Ḡ":"G","Ğ":"G","Ġ":"G","Ǧ":"G","Ģ":"G","Ǥ":"G","Ɠ":"G","Ꞡ":"G","Ᵹ":"G","Ꝿ":"G","Ⓗ":"H","Ｈ":"H","Ĥ":"H","Ḣ":"H","Ḧ":"H","Ȟ":"H","Ḥ":"H","Ḩ":"H","Ḫ":"H","Ħ":"H","Ⱨ":"H","Ⱶ":"H","Ɥ":"H","Ⓘ":"I","Ｉ":"I","Ì":"I","Í":"I","Î":"I","Ĩ":"I","Ī":"I","Ĭ":"I","İ":"I","Ï":"I","Ḯ":"I","Ỉ":"I","Ǐ":"I","Ȉ":"I","Ȋ":"I","Ị":"I","Į":"I","Ḭ":"I","Ɨ":"I","Ⓙ":"J","Ｊ":"J","Ĵ":"J","Ɉ":"J","Ⓚ":"K","Ｋ":"K","Ḱ":"K","Ǩ":"K","Ḳ":"K","Ķ":"K","Ḵ":"K","Ƙ":"K","Ⱪ":"K","Ꝁ":"K","Ꝃ":"K","Ꝅ":"K","Ꞣ":"K","Ⓛ":"L","Ｌ":"L","Ŀ":"L","Ĺ":"L","Ľ":"L","Ḷ":"L","Ḹ":"L","Ļ":"L","Ḽ":"L","Ḻ":"L","Ł":"L","Ƚ":"L","Ɫ":"L","Ⱡ":"L","Ꝉ":"L","Ꝇ":"L","Ꞁ":"L","Ǉ":"LJ","ǈ":"Lj","Ⓜ":"M","Ｍ":"M","Ḿ":"M","Ṁ":"M","Ṃ":"M","Ɱ":"M","Ɯ":"M","Ⓝ":"N","Ｎ":"N","Ǹ":"N","Ń":"N","Ñ":"N","Ṅ":"N","Ň":"N","Ṇ":"N","Ņ":"N","Ṋ":"N","Ṉ":"N","Ƞ":"N","Ɲ":"N","Ꞑ":"N","Ꞥ":"N","Ǌ":"NJ","ǋ":"Nj","Ⓞ":"O","Ｏ":"O","Ò":"O","Ó":"O","Ô":"O","Ồ":"O","Ố":"O","Ỗ":"O","Ổ":"O","Õ":"O","Ṍ":"O","Ȭ":"O","Ṏ":"O","Ō":"O","Ṑ":"O","Ṓ":"O","Ŏ":"O","Ȯ":"O","Ȱ":"O","Ö":"O","Ȫ":"O","Ỏ":"O","Ő":"O","Ǒ":"O","Ȍ":"O","Ȏ":"O","Ơ":"O","Ờ":"O","Ớ":"O","Ỡ":"O","Ở":"O","Ợ":"O","Ọ":"O","Ộ":"O","Ǫ":"O","Ǭ":"O","Ø":"O","Ǿ":"O","Ɔ":"O","Ɵ":"O","Ꝋ":"O","Ꝍ":"O","Ƣ":"OI","Ꝏ":"OO","Ȣ":"OU","Ⓟ":"P","Ｐ":"P","Ṕ":"P","Ṗ":"P","Ƥ":"P","Ᵽ":"P","Ꝑ":"P","Ꝓ":"P","Ꝕ":"P","Ⓠ":"Q","Ｑ":"Q","Ꝗ":"Q","Ꝙ":"Q","Ɋ":"Q","Ⓡ":"R","Ｒ":"R","Ŕ":"R","Ṙ":"R","Ř":"R","Ȑ":"R","Ȓ":"R","Ṛ":"R","Ṝ":"R","Ŗ":"R","Ṟ":"R","Ɍ":"R","Ɽ":"R","Ꝛ":"R","Ꞧ":"R","Ꞃ":"R","Ⓢ":"S","Ｓ":"S","ẞ":"S","Ś":"S","Ṥ":"S","Ŝ":"S","Ṡ":"S","Š":"S","Ṧ":"S","Ṣ":"S","Ṩ":"S","Ș":"S","Ş":"S","Ȿ":"S","Ꞩ":"S","Ꞅ":"S","Ⓣ":"T","Ｔ":"T","Ṫ":"T","Ť":"T","Ṭ":"T","Ț":"T","Ţ":"T","Ṱ":"T","Ṯ":"T","Ŧ":"T","Ƭ":"T","Ʈ":"T","Ⱦ":"T","Ꞇ":"T","Ꜩ":"TZ","Ⓤ":"U","Ｕ":"U","Ù":"U","Ú":"U","Û":"U","Ũ":"U","Ṹ":"U","Ū":"U","Ṻ":"U","Ŭ":"U","Ü":"U","Ǜ":"U","Ǘ":"U","Ǖ":"U","Ǚ":"U","Ủ":"U","Ů":"U","Ű":"U","Ǔ":"U","Ȕ":"U","Ȗ":"U","Ư":"U","Ừ":"U","Ứ":"U","Ữ":"U","Ử":"U","Ự":"U","Ụ":"U","Ṳ":"U","Ų":"U","Ṷ":"U","Ṵ":"U","Ʉ":"U","Ⓥ":"V","Ｖ":"V","Ṽ":"V","Ṿ":"V","Ʋ":"V","Ꝟ":"V","Ʌ":"V","Ꝡ":"VY","Ⓦ":"W","Ｗ":"W","Ẁ":"W","Ẃ":"W","Ŵ":"W","Ẇ":"W","Ẅ":"W","Ẉ":"W","Ⱳ":"W","Ⓧ":"X","Ｘ":"X","Ẋ":"X","Ẍ":"X","Ⓨ":"Y","Ｙ":"Y","Ỳ":"Y","Ý":"Y","Ŷ":"Y","Ỹ":"Y","Ȳ":"Y","Ẏ":"Y","Ÿ":"Y","Ỷ":"Y","Ỵ":"Y","Ƴ":"Y","Ɏ":"Y","Ỿ":"Y","Ⓩ":"Z","Ｚ":"Z","Ź":"Z","Ẑ":"Z","Ż":"Z","Ž":"Z","Ẓ":"Z","Ẕ":"Z","Ƶ":"Z","Ȥ":"Z","Ɀ":"Z","Ⱬ":"Z","Ꝣ":"Z","ⓐ":"a","ａ":"a","ẚ":"a","à":"a","á":"a","â":"a","ầ":"a","ấ":"a","ẫ":"a","ẩ":"a","ã":"a","ā":"a","ă":"a","ằ":"a","ắ":"a","ẵ":"a","ẳ":"a","ȧ":"a","ǡ":"a","ä":"a","ǟ":"a","ả":"a","å":"a","ǻ":"a","ǎ":"a","ȁ":"a","ȃ":"a","ạ":"a","ậ":"a","ặ":"a","ḁ":"a","ą":"a","ⱥ":"a","ɐ":"a","ꜳ":"aa","æ":"ae","ǽ":"ae","ǣ":"ae","ꜵ":"ao","ꜷ":"au","ꜹ":"av","ꜻ":"av","ꜽ":"ay","ⓑ":"b","ｂ":"b","ḃ":"b","ḅ":"b","ḇ":"b","ƀ":"b","ƃ":"b","ɓ":"b","ⓒ":"c","ｃ":"c","ć":"c","ĉ":"c","ċ":"c","č":"c","ç":"c","ḉ":"c","ƈ":"c","ȼ":"c","ꜿ":"c","ↄ":"c","ⓓ":"d","ｄ":"d","ḋ":"d","ď":"d","ḍ":"d","ḑ":"d","ḓ":"d","ḏ":"d","đ":"d","ƌ":"d","ɖ":"d","ɗ":"d","ꝺ":"d","ǳ":"dz","ǆ":"dz","ⓔ":"e","ｅ":"e","è":"e","é":"e","ê":"e","ề":"e","ế":"e","ễ":"e","ể":"e","ẽ":"e","ē":"e","ḕ":"e","ḗ":"e","ĕ":"e","ė":"e","ë":"e","ẻ":"e","ě":"e","ȅ":"e","ȇ":"e","ẹ":"e","ệ":"e","ȩ":"e","ḝ":"e","ę":"e","ḙ":"e","ḛ":"e","ɇ":"e","ɛ":"e","ǝ":"e","ⓕ":"f","ｆ":"f","ḟ":"f","ƒ":"f","ꝼ":"f","ⓖ":"g","ｇ":"g","ǵ":"g","ĝ":"g","ḡ":"g","ğ":"g","ġ":"g","ǧ":"g","ģ":"g","ǥ":"g","ɠ":"g","ꞡ":"g","ᵹ":"g","ꝿ":"g","ⓗ":"h","ｈ":"h","ĥ":"h","ḣ":"h","ḧ":"h","ȟ":"h","ḥ":"h","ḩ":"h","ḫ":"h","ẖ":"h","ħ":"h","ⱨ":"h","ⱶ":"h","ɥ":"h","ƕ":"hv","ⓘ":"i","ｉ":"i","ì":"i","í":"i","î":"i","ĩ":"i","ī":"i","ĭ":"i","ï":"i","ḯ":"i","ỉ":"i","ǐ":"i","ȉ":"i","ȋ":"i","ị":"i","į":"i","ḭ":"i","ɨ":"i","ı":"i","ⓙ":"j","ｊ":"j","ĵ":"j","ǰ":"j","ɉ":"j","ⓚ":"k","ｋ":"k","ḱ":"k","ǩ":"k","ḳ":"k","ķ":"k","ḵ":"k","ƙ":"k","ⱪ":"k","ꝁ":"k","ꝃ":"k","ꝅ":"k","ꞣ":"k","ⓛ":"l","ｌ":"l","ŀ":"l","ĺ":"l","ľ":"l","ḷ":"l","ḹ":"l","ļ":"l","ḽ":"l","ḻ":"l","ſ":"l","ł":"l","ƚ":"l","ɫ":"l","ⱡ":"l","ꝉ":"l","ꞁ":"l","ꝇ":"l","ǉ":"lj","ⓜ":"m","ｍ":"m","ḿ":"m","ṁ":"m","ṃ":"m","ɱ":"m","ɯ":"m","ⓝ":"n","ｎ":"n","ǹ":"n","ń":"n","ñ":"n","ṅ":"n","ň":"n","ṇ":"n","ņ":"n","ṋ":"n","ṉ":"n","ƞ":"n","ɲ":"n","ŉ":"n","ꞑ":"n","ꞥ":"n","ǌ":"nj","ⓞ":"o","ｏ":"o","ò":"o","ó":"o","ô":"o","ồ":"o","ố":"o","ỗ":"o","ổ":"o","õ":"o","ṍ":"o","ȭ":"o","ṏ":"o","ō":"o","ṑ":"o","ṓ":"o","ŏ":"o","ȯ":"o","ȱ":"o","ö":"o","ȫ":"o","ỏ":"o","ő":"o","ǒ":"o","ȍ":"o","ȏ":"o","ơ":"o","ờ":"o","ớ":"o","ỡ":"o","ở":"o","ợ":"o","ọ":"o","ộ":"o","ǫ":"o","ǭ":"o","ø":"o","ǿ":"o","ɔ":"o","ꝋ":"o","ꝍ":"o","ɵ":"o","ƣ":"oi","ȣ":"ou","ꝏ":"oo","ⓟ":"p","ｐ":"p","ṕ":"p","ṗ":"p","ƥ":"p","ᵽ":"p","ꝑ":"p","ꝓ":"p","ꝕ":"p","ⓠ":"q","ｑ":"q","ɋ":"q","ꝗ":"q","ꝙ":"q","ⓡ":"r","ｒ":"r","ŕ":"r","ṙ":"r","ř":"r","ȑ":"r","ȓ":"r","ṛ":"r","ṝ":"r","ŗ":"r","ṟ":"r","ɍ":"r","ɽ":"r","ꝛ":"r","ꞧ":"r","ꞃ":"r","ⓢ":"s","ｓ":"s","ß":"s","ś":"s","ṥ":"s","ŝ":"s","ṡ":"s","š":"s","ṧ":"s","ṣ":"s","ṩ":"s","ș":"s","ş":"s","ȿ":"s","ꞩ":"s","ꞅ":"s","ẛ":"s","ⓣ":"t","ｔ":"t","ṫ":"t","ẗ":"t","ť":"t","ṭ":"t","ț":"t","ţ":"t","ṱ":"t","ṯ":"t","ŧ":"t","ƭ":"t","ʈ":"t","ⱦ":"t","ꞇ":"t","ꜩ":"tz","ⓤ":"u","ｕ":"u","ù":"u","ú":"u","û":"u","ũ":"u","ṹ":"u","ū":"u","ṻ":"u","ŭ":"u","ü":"u","ǜ":"u","ǘ":"u","ǖ":"u","ǚ":"u","ủ":"u","ů":"u","ű":"u","ǔ":"u","ȕ":"u","ȗ":"u","ư":"u","ừ":"u","ứ":"u","ữ":"u","ử":"u","ự":"u","ụ":"u","ṳ":"u","ų":"u","ṷ":"u","ṵ":"u","ʉ":"u","ⓥ":"v","ｖ":"v","ṽ":"v","ṿ":"v","ʋ":"v","ꝟ":"v","ʌ":"v","ꝡ":"vy","ⓦ":"w","ｗ":"w","ẁ":"w","ẃ":"w","ŵ":"w","ẇ":"w","ẅ":"w","ẘ":"w","ẉ":"w","ⱳ":"w","ⓧ":"x","ｘ":"x","ẋ":"x","ẍ":"x","ⓨ":"y","ｙ":"y","ỳ":"y","ý":"y","ŷ":"y","ỹ":"y","ȳ":"y","ẏ":"y","ÿ":"y","ỷ":"y","ẙ":"y","ỵ":"y","ƴ":"y","ɏ":"y","ỿ":"y","ⓩ":"z","ｚ":"z","ź":"z","ẑ":"z","ż":"z","ž":"z","ẓ":"z","ẕ":"z","ƶ":"z","ȥ":"z","ɀ":"z","ⱬ":"z","ꝣ":"z","Ά":"Α","Έ":"Ε","Ή":"Η","Ί":"Ι","Ϊ":"Ι","Ό":"Ο","Ύ":"Υ","Ϋ":"Υ","Ώ":"Ω","ά":"α","έ":"ε","ή":"η","ί":"ι","ϊ":"ι","ΐ":"ι","ό":"ο","ύ":"υ","ϋ":"υ","ΰ":"υ","ω":"ω","ς":"σ"};return a}),b.define("select2/data/base",["../utils"],function(a){function b(a,c){b.__super__.constructor.call(this)}return a.Extend(b,a.Observable),b.prototype.current=function(a){throw new Error("The `current` method must be defined in child classes.")},b.prototype.query=function(a,b){throw new Error("The `query` method must be defined in child classes.")},b.prototype.bind=function(a,b){},b.prototype.destroy=function(){},b.prototype.generateResultId=function(b,c){var d=b.id+"-result-";return d+=a.generateChars(4),d+=null!=c.id?"-"+c.id.toString():"-"+a.generateChars(4)},b}),b.define("select2/data/select",["./base","../utils","jquery"],function(a,b,c){function d(a,b){this.$element=a,this.options=b,d.__super__.constructor.call(this)}return b.Extend(d,a),d.prototype.current=function(a){var b=[],d=this;this.$element.find(":selected").each(function(){var a=c(this),e=d.item(a);b.push(e)}),a(b)},d.prototype.select=function(a){var b=this;if(a.selected=!0,c(a.element).is("option"))return a.element.selected=!0,void this.$element.trigger("change");if(this.$element.prop("multiple"))this.current(function(d){var e=[];a=[a],a.push.apply(a,d);for(var f=0;f<a.length;f++){var g=a[f].id;-1===c.inArray(g,e)&&e.push(g)}b.$element.val(e),b.$element.trigger("change")});else{var d=a.id;this.$element.val(d),this.$element.trigger("change")}},d.prototype.unselect=function(a){
var b=this;if(this.$element.prop("multiple"))return a.selected=!1,c(a.element).is("option")?(a.element.selected=!1,void this.$element.trigger("change")):void this.current(function(d){for(var e=[],f=0;f<d.length;f++){var g=d[f].id;g!==a.id&&-1===c.inArray(g,e)&&e.push(g)}b.$element.val(e),b.$element.trigger("change")})},d.prototype.bind=function(a,b){var c=this;this.container=a,a.on("select",function(a){c.select(a.data)}),a.on("unselect",function(a){c.unselect(a.data)})},d.prototype.destroy=function(){this.$element.find("*").each(function(){c.removeData(this,"data")})},d.prototype.query=function(a,b){var d=[],e=this,f=this.$element.children();f.each(function(){var b=c(this);if(b.is("option")||b.is("optgroup")){var f=e.item(b),g=e.matches(a,f);null!==g&&d.push(g)}}),b({results:d})},d.prototype.addOptions=function(a){b.appendMany(this.$element,a)},d.prototype.option=function(a){var b;a.children?(b=document.createElement("optgroup"),b.label=a.text):(b=document.createElement("option"),void 0!==b.textContent?b.textContent=a.text:b.innerText=a.text),a.id&&(b.value=a.id),a.disabled&&(b.disabled=!0),a.selected&&(b.selected=!0),a.title&&(b.title=a.title);var d=c(b),e=this._normalizeItem(a);return e.element=b,c.data(b,"data",e),d},d.prototype.item=function(a){var b={};if(b=c.data(a[0],"data"),null!=b)return b;if(a.is("option"))b={id:a.val(),text:a.text(),disabled:a.prop("disabled"),selected:a.prop("selected"),title:a.prop("title")};else if(a.is("optgroup")){b={text:a.prop("label"),children:[],title:a.prop("title")};for(var d=a.children("option"),e=[],f=0;f<d.length;f++){var g=c(d[f]),h=this.item(g);e.push(h)}b.children=e}return b=this._normalizeItem(b),b.element=a[0],c.data(a[0],"data",b),b},d.prototype._normalizeItem=function(a){c.isPlainObject(a)||(a={id:a,text:a}),a=c.extend({},{text:""},a);var b={selected:!1,disabled:!1};return null!=a.id&&(a.id=a.id.toString()),null!=a.text&&(a.text=a.text.toString()),null==a._resultId&&a.id&&null!=this.container&&(a._resultId=this.generateResultId(this.container,a)),c.extend({},b,a)},d.prototype.matches=function(a,b){var c=this.options.get("matcher");return c(a,b)},d}),b.define("select2/data/array",["./select","../utils","jquery"],function(a,b,c){function d(a,b){var c=b.get("data")||[];d.__super__.constructor.call(this,a,b),this.addOptions(this.convertToOptions(c))}return b.Extend(d,a),d.prototype.select=function(a){var b=this.$element.find("option").filter(function(b,c){return c.value==a.id.toString()});0===b.length&&(b=this.option(a),this.addOptions(b)),d.__super__.select.call(this,a)},d.prototype.convertToOptions=function(a){function d(a){return function(){return c(this).val()==a.id}}for(var e=this,f=this.$element.find("option"),g=f.map(function(){return e.item(c(this)).id}).get(),h=[],i=0;i<a.length;i++){var j=this._normalizeItem(a[i]);if(c.inArray(j.id,g)>=0){var k=f.filter(d(j)),l=this.item(k),m=c.extend(!0,{},l,j),n=this.option(m);k.replaceWith(n)}else{var o=this.option(j);if(j.children){var p=this.convertToOptions(j.children);b.appendMany(o,p)}h.push(o)}}return h},d}),b.define("select2/data/ajax",["./array","../utils","jquery"],function(a,b,c){function d(a,b){this.ajaxOptions=this._applyDefaults(b.get("ajax")),null!=this.ajaxOptions.processResults&&(this.processResults=this.ajaxOptions.processResults),d.__super__.constructor.call(this,a,b)}return b.Extend(d,a),d.prototype._applyDefaults=function(a){var b={data:function(a){return c.extend({},a,{q:a.term})},transport:function(a,b,d){var e=c.ajax(a);return e.then(b),e.fail(d),e}};return c.extend({},b,a,!0)},d.prototype.processResults=function(a){return a},d.prototype.query=function(a,b){function d(){var d=f.transport(f,function(d){var f=e.processResults(d,a);e.options.get("debug")&&window.console&&console.error&&(f&&f.results&&c.isArray(f.results)||console.error("Select2: The AJAX results did not return an array in the `results` key of the response.")),b(f)},function(){});e._request=d}var e=this;null!=this._request&&(c.isFunction(this._request.abort)&&this._request.abort(),this._request=null);var f=c.extend({type:"GET"},this.ajaxOptions);"function"==typeof f.url&&(f.url=f.url.call(this.$element,a)),"function"==typeof f.data&&(f.data=f.data.call(this.$element,a)),this.ajaxOptions.delay&&""!==a.term?(this._queryTimeout&&window.clearTimeout(this._queryTimeout),this._queryTimeout=window.setTimeout(d,this.ajaxOptions.delay)):d()},d}),b.define("select2/data/tags",["jquery"],function(a){function b(b,c,d){var e=d.get("tags"),f=d.get("createTag");if(void 0!==f&&(this.createTag=f),b.call(this,c,d),a.isArray(e))for(var g=0;g<e.length;g++){var h=e[g],i=this._normalizeItem(h),j=this.option(i);this.$element.append(j)}}return b.prototype.query=function(a,b,c){function d(a,f){for(var g=a.results,h=0;h<g.length;h++){var i=g[h],j=null!=i.children&&!d({results:i.children},!0),k=i.text===b.term;if(k||j)return f?!1:(a.data=g,void c(a))}if(f)return!0;var l=e.createTag(b);if(null!=l){var m=e.option(l);m.attr("data-select2-tag",!0),e.addOptions([m]),e.insertTag(g,l)}a.results=g,c(a)}var e=this;return this._removeOldTags(),null==b.term||null!=b.page?void a.call(this,b,c):void a.call(this,b,d)},b.prototype.createTag=function(b,c){var d=a.trim(c.term);return""===d?null:{id:d,text:d}},b.prototype.insertTag=function(a,b,c){b.unshift(c)},b.prototype._removeOldTags=function(b){var c=(this._lastTag,this.$element.find("option[data-select2-tag]"));c.each(function(){this.selected||a(this).remove()})},b}),b.define("select2/data/tokenizer",["jquery"],function(a){function b(a,b,c){var d=c.get("tokenizer");void 0!==d&&(this.tokenizer=d),a.call(this,b,c)}return b.prototype.bind=function(a,b,c){a.call(this,b,c),this.$search=b.dropdown.$search||b.selection.$search||c.find(".select2-search__field")},b.prototype.query=function(a,b,c){function d(a){e.trigger("select",{data:a})}var e=this;b.term=b.term||"";var f=this.tokenizer(b,this.options,d);f.term!==b.term&&(this.$search.length&&(this.$search.val(f.term),this.$search.focus()),b.term=f.term),a.call(this,b,c)},b.prototype.tokenizer=function(b,c,d,e){for(var f=d.get("tokenSeparators")||[],g=c.term,h=0,i=this.createTag||function(a){return{id:a.term,text:a.term}};h<g.length;){var j=g[h];if(-1!==a.inArray(j,f)){var k=g.substr(0,h),l=a.extend({},c,{term:k}),m=i(l);null!=m?(e(m),g=g.substr(h+1)||"",h=0):h++}else h++}return{term:g}},b}),b.define("select2/data/minimumInputLength",[],function(){function a(a,b,c){this.minimumInputLength=c.get("minimumInputLength"),a.call(this,b,c)}return a.prototype.query=function(a,b,c){return b.term=b.term||"",b.term.length<this.minimumInputLength?void this.trigger("results:message",{message:"inputTooShort",args:{minimum:this.minimumInputLength,input:b.term,params:b}}):void a.call(this,b,c)},a}),b.define("select2/data/maximumInputLength",[],function(){function a(a,b,c){this.maximumInputLength=c.get("maximumInputLength"),a.call(this,b,c)}return a.prototype.query=function(a,b,c){return b.term=b.term||"",this.maximumInputLength>0&&b.term.length>this.maximumInputLength?void this.trigger("results:message",{message:"inputTooLong",args:{maximum:this.maximumInputLength,input:b.term,params:b}}):void a.call(this,b,c)},a}),b.define("select2/data/maximumSelectionLength",[],function(){function a(a,b,c){this.maximumSelectionLength=c.get("maximumSelectionLength"),a.call(this,b,c)}return a.prototype.query=function(a,b,c){var d=this;this.current(function(e){var f=null!=e?e.length:0;return d.maximumSelectionLength>0&&f>=d.maximumSelectionLength?void d.trigger("results:message",{message:"maximumSelected",args:{maximum:d.maximumSelectionLength}}):void a.call(d,b,c)})},a}),b.define("select2/dropdown",["jquery","./utils"],function(a,b){function c(a,b){this.$element=a,this.options=b,c.__super__.constructor.call(this)}return b.Extend(c,b.Observable),c.prototype.render=function(){var b=a('<span class="select2-dropdown"><span class="select2-results"></span></span>');return b.attr("dir",this.options.get("dir")),this.$dropdown=b,b},c.prototype.bind=function(){},c.prototype.position=function(a,b){},c.prototype.destroy=function(){this.$dropdown.remove()},c}),b.define("select2/dropdown/search",["jquery","../utils"],function(a,b){function c(){}return c.prototype.render=function(b){var c=b.call(this),d=a('<span class="select2-search select2-search--dropdown"><input class="select2-search__field" type="search" tabindex="-1" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" role="textbox" /></span>');return this.$searchContainer=d,this.$search=d.find("input"),c.prepend(d),c},c.prototype.bind=function(b,c,d){var e=this;b.call(this,c,d),this.$search.on("keydown",function(a){e.trigger("keypress",a),e._keyUpPrevented=a.isDefaultPrevented()}),this.$search.on("input",function(b){a(this).off("keyup")}),this.$search.on("keyup input",function(a){e.handleSearch(a)}),c.on("open",function(){e.$search.attr("tabindex",0),e.$search.focus(),window.setTimeout(function(){e.$search.focus()},0)}),c.on("close",function(){e.$search.attr("tabindex",-1),e.$search.val("")}),c.on("results:all",function(a){if(null==a.query.term||""===a.query.term){var b=e.showSearch(a);b?e.$searchContainer.removeClass("select2-search--hide"):e.$searchContainer.addClass("select2-search--hide")}})},c.prototype.handleSearch=function(a){if(!this._keyUpPrevented){var b=this.$search.val();this.trigger("query",{term:b})}this._keyUpPrevented=!1},c.prototype.showSearch=function(a,b){return!0},c}),b.define("select2/dropdown/hidePlaceholder",[],function(){function a(a,b,c,d){this.placeholder=this.normalizePlaceholder(c.get("placeholder")),a.call(this,b,c,d)}return a.prototype.append=function(a,b){b.results=this.removePlaceholder(b.results),a.call(this,b)},a.prototype.normalizePlaceholder=function(a,b){return"string"==typeof b&&(b={id:"",text:b}),b},a.prototype.removePlaceholder=function(a,b){for(var c=b.slice(0),d=b.length-1;d>=0;d--){var e=b[d];this.placeholder.id===e.id&&c.splice(d,1)}return c},a}),b.define("select2/dropdown/infiniteScroll",["jquery"],function(a){function b(a,b,c,d){this.lastParams={},a.call(this,b,c,d),this.$loadingMore=this.createLoadingMore(),this.loading=!1}return b.prototype.append=function(a,b){this.$loadingMore.remove(),this.loading=!1,a.call(this,b),this.showLoadingMore(b)&&this.$results.append(this.$loadingMore)},b.prototype.bind=function(b,c,d){var e=this;b.call(this,c,d),c.on("query",function(a){e.lastParams=a,e.loading=!0}),c.on("query:append",function(a){e.lastParams=a,e.loading=!0}),this.$results.on("scroll",function(){var b=a.contains(document.documentElement,e.$loadingMore[0]);if(!e.loading&&b){var c=e.$results.offset().top+e.$results.outerHeight(!1),d=e.$loadingMore.offset().top+e.$loadingMore.outerHeight(!1);c+50>=d&&e.loadMore()}})},b.prototype.loadMore=function(){this.loading=!0;var b=a.extend({},{page:1},this.lastParams);b.page++,this.trigger("query:append",b)},b.prototype.showLoadingMore=function(a,b){return b.pagination&&b.pagination.more},b.prototype.createLoadingMore=function(){var b=a('<li class="select2-results__option select2-results__option--load-more"role="treeitem" aria-disabled="true"></li>'),c=this.options.get("translations").get("loadingMore");return b.html(c(this.lastParams)),b},b}),b.define("select2/dropdown/attachBody",["jquery","../utils"],function(a,b){function c(b,c,d){this.$dropdownParent=d.get("dropdownParent")||a(document.body),b.call(this,c,d)}return c.prototype.bind=function(a,b,c){var d=this,e=!1;a.call(this,b,c),b.on("open",function(){d._showDropdown(),d._attachPositioningHandler(b),e||(e=!0,b.on("results:all",function(){d._positionDropdown(),d._resizeDropdown()}),b.on("results:append",function(){d._positionDropdown(),d._resizeDropdown()}))}),b.on("close",function(){d._hideDropdown(),d._detachPositioningHandler(b)}),this.$dropdownContainer.on("mousedown",function(a){a.stopPropagation()})},c.prototype.destroy=function(a){a.call(this),this.$dropdownContainer.remove()},c.prototype.position=function(a,b,c){b.attr("class",c.attr("class")),b.removeClass("select2"),b.addClass("select2-container--open"),b.css({position:"absolute",top:-999999}),this.$container=c},c.prototype.render=function(b){var c=a("<span></span>"),d=b.call(this);return c.append(d),this.$dropdownContainer=c,c},c.prototype._hideDropdown=function(a){this.$dropdownContainer.detach()},c.prototype._attachPositioningHandler=function(c,d){var e=this,f="scroll.select2."+d.id,g="resize.select2."+d.id,h="orientationchange.select2."+d.id,i=this.$container.parents().filter(b.hasScroll);i.each(function(){a(this).data("select2-scroll-position",{x:a(this).scrollLeft(),y:a(this).scrollTop()})}),i.on(f,function(b){var c=a(this).data("select2-scroll-position");a(this).scrollTop(c.y)}),a(window).on(f+" "+g+" "+h,function(a){e._positionDropdown(),e._resizeDropdown()})},c.prototype._detachPositioningHandler=function(c,d){var e="scroll.select2."+d.id,f="resize.select2."+d.id,g="orientationchange.select2."+d.id,h=this.$container.parents().filter(b.hasScroll);h.off(e),a(window).off(e+" "+f+" "+g)},c.prototype._positionDropdown=function(){var b=a(window),c=this.$dropdown.hasClass("select2-dropdown--above"),d=this.$dropdown.hasClass("select2-dropdown--below"),e=null,f=(this.$container.position(),this.$container.offset());f.bottom=f.top+this.$container.outerHeight(!1);var g={height:this.$container.outerHeight(!1)};g.top=f.top,g.bottom=f.top+g.height;var h={height:this.$dropdown.outerHeight(!1)},i={top:b.scrollTop(),bottom:b.scrollTop()+b.height()},j=i.top<f.top-h.height,k=i.bottom>f.bottom+h.height,l={left:f.left,top:g.bottom};if("static"!==this.$dropdownParent[0].style.position){var m=this.$dropdownParent.offset();l.top-=m.top,l.left-=m.left}c||d||(e="below"),k||!j||c?!j&&k&&c&&(e="below"):e="above",("above"==e||c&&"below"!==e)&&(l.top=g.top-h.height),null!=e&&(this.$dropdown.removeClass("select2-dropdown--below select2-dropdown--above").addClass("select2-dropdown--"+e),this.$container.removeClass("select2-container--below select2-container--above").addClass("select2-container--"+e)),this.$dropdownContainer.css(l)},c.prototype._resizeDropdown=function(){var a={width:this.$container.outerWidth(!1)+"px"};this.options.get("dropdownAutoWidth")&&(a.minWidth=a.width,a.width="auto"),this.$dropdown.css(a)},c.prototype._showDropdown=function(a){this.$dropdownContainer.appendTo(this.$dropdownParent),this._positionDropdown(),this._resizeDropdown()},c}),b.define("select2/dropdown/minimumResultsForSearch",[],function(){function a(b){for(var c=0,d=0;d<b.length;d++){var e=b[d];e.children?c+=a(e.children):c++}return c}function b(a,b,c,d){this.minimumResultsForSearch=c.get("minimumResultsForSearch"),this.minimumResultsForSearch<0&&(this.minimumResultsForSearch=1/0),a.call(this,b,c,d)}return b.prototype.showSearch=function(b,c){return a(c.data.results)<this.minimumResultsForSearch?!1:b.call(this,c)},b}),b.define("select2/dropdown/selectOnClose",[],function(){function a(){}return a.prototype.bind=function(a,b,c){var d=this;a.call(this,b,c),b.on("close",function(){d._handleSelectOnClose()})},a.prototype._handleSelectOnClose=function(){var a=this.getHighlightedResults();if(!(a.length<1)){var b=a.data("data");null!=b.element&&b.element.selected||null==b.element&&b.selected||this.trigger("select",{data:b})}},a}),b.define("select2/dropdown/closeOnSelect",[],function(){function a(){}return a.prototype.bind=function(a,b,c){var d=this;a.call(this,b,c),b.on("select",function(a){d._selectTriggered(a)}),b.on("unselect",function(a){d._selectTriggered(a)})},a.prototype._selectTriggered=function(a,b){var c=b.originalEvent;c&&c.ctrlKey||this.trigger("close",{})},a}),b.define("select2/i18n/en",[],function(){return{errorLoading:function(){return"The results could not be loaded."},inputTooLong:function(a){var b=a.input.length-a.maximum,c="Please delete "+b+" character";return 1!=b&&(c+="s"),c},inputTooShort:function(a){var b=a.minimum-a.input.length,c="Please enter "+b+" or more characters";return c},loadingMore:function(){return"Loading more results…"},maximumSelected:function(a){var b="You can only select "+a.maximum+" item";return 1!=a.maximum&&(b+="s"),b},noResults:function(){return"No results found"},searching:function(){return"Searching…"}}}),b.define("select2/defaults",["jquery","require","./results","./selection/single","./selection/multiple","./selection/placeholder","./selection/allowClear","./selection/search","./selection/eventRelay","./utils","./translation","./diacritics","./data/select","./data/array","./data/ajax","./data/tags","./data/tokenizer","./data/minimumInputLength","./data/maximumInputLength","./data/maximumSelectionLength","./dropdown","./dropdown/search","./dropdown/hidePlaceholder","./dropdown/infiniteScroll","./dropdown/attachBody","./dropdown/minimumResultsForSearch","./dropdown/selectOnClose","./dropdown/closeOnSelect","./i18n/en"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C){function D(){this.reset()}D.prototype.apply=function(l){if(l=a.extend({},this.defaults,l),null==l.dataAdapter){if(null!=l.ajax?l.dataAdapter=o:null!=l.data?l.dataAdapter=n:l.dataAdapter=m,l.minimumInputLength>0&&(l.dataAdapter=j.Decorate(l.dataAdapter,r)),l.maximumInputLength>0&&(l.dataAdapter=j.Decorate(l.dataAdapter,s)),l.maximumSelectionLength>0&&(l.dataAdapter=j.Decorate(l.dataAdapter,t)),l.tags&&(l.dataAdapter=j.Decorate(l.dataAdapter,p)),(null!=l.tokenSeparators||null!=l.tokenizer)&&(l.dataAdapter=j.Decorate(l.dataAdapter,q)),null!=l.query){var C=b(l.amdBase+"compat/query");l.dataAdapter=j.Decorate(l.dataAdapter,C)}if(null!=l.initSelection){var D=b(l.amdBase+"compat/initSelection");l.dataAdapter=j.Decorate(l.dataAdapter,D)}}if(null==l.resultsAdapter&&(l.resultsAdapter=c,null!=l.ajax&&(l.resultsAdapter=j.Decorate(l.resultsAdapter,x)),null!=l.placeholder&&(l.resultsAdapter=j.Decorate(l.resultsAdapter,w)),l.selectOnClose&&(l.resultsAdapter=j.Decorate(l.resultsAdapter,A))),null==l.dropdownAdapter){if(l.multiple)l.dropdownAdapter=u;else{var E=j.Decorate(u,v);l.dropdownAdapter=E}if(0!==l.minimumResultsForSearch&&(l.dropdownAdapter=j.Decorate(l.dropdownAdapter,z)),l.closeOnSelect&&(l.dropdownAdapter=j.Decorate(l.dropdownAdapter,B)),null!=l.dropdownCssClass||null!=l.dropdownCss||null!=l.adaptDropdownCssClass){var F=b(l.amdBase+"compat/dropdownCss");l.dropdownAdapter=j.Decorate(l.dropdownAdapter,F)}l.dropdownAdapter=j.Decorate(l.dropdownAdapter,y)}if(null==l.selectionAdapter){if(l.multiple?l.selectionAdapter=e:l.selectionAdapter=d,null!=l.placeholder&&(l.selectionAdapter=j.Decorate(l.selectionAdapter,f)),l.allowClear&&(l.selectionAdapter=j.Decorate(l.selectionAdapter,g)),l.multiple&&(l.selectionAdapter=j.Decorate(l.selectionAdapter,h)),null!=l.containerCssClass||null!=l.containerCss||null!=l.adaptContainerCssClass){var G=b(l.amdBase+"compat/containerCss");l.selectionAdapter=j.Decorate(l.selectionAdapter,G)}l.selectionAdapter=j.Decorate(l.selectionAdapter,i)}if("string"==typeof l.language)if(l.language.indexOf("-")>0){var H=l.language.split("-"),I=H[0];l.language=[l.language,I]}else l.language=[l.language];if(a.isArray(l.language)){var J=new k;l.language.push("en");for(var K=l.language,L=0;L<K.length;L++){var M=K[L],N={};try{N=k.loadPath(M)}catch(O){try{M=this.defaults.amdLanguageBase+M,N=k.loadPath(M)}catch(P){l.debug&&window.console&&console.warn&&console.warn('Select2: The language file for "'+M+'" could not be automatically loaded. A fallback will be used instead.');continue}}J.extend(N)}l.translations=J}else{var Q=k.loadPath(this.defaults.amdLanguageBase+"en"),R=new k(l.language);R.extend(Q),l.translations=R}return l},D.prototype.reset=function(){function b(a){function b(a){return l[a]||a}return a.replace(/[^\u0000-\u007E]/g,b)}function c(d,e){if(""===a.trim(d.term))return e;if(e.children&&e.children.length>0){for(var f=a.extend(!0,{},e),g=e.children.length-1;g>=0;g--){var h=e.children[g],i=c(d,h);null==i&&f.children.splice(g,1)}return f.children.length>0?f:c(d,f)}var j=b(e.text).toUpperCase(),k=b(d.term).toUpperCase();return j.indexOf(k)>-1?e:null}this.defaults={amdBase:"./",amdLanguageBase:"./i18n/",closeOnSelect:!0,debug:!1,dropdownAutoWidth:!1,escapeMarkup:j.escapeMarkup,language:C,matcher:c,minimumInputLength:0,maximumInputLength:0,maximumSelectionLength:0,minimumResultsForSearch:0,selectOnClose:!1,sorter:function(a){return a},templateResult:function(a){return a.text},templateSelection:function(a){return a.text},theme:"default",width:"resolve"}},D.prototype.set=function(b,c){var d=a.camelCase(b),e={};e[d]=c;var f=j._convertData(e);a.extend(this.defaults,f)};var E=new D;return E}),b.define("select2/options",["require","jquery","./defaults","./utils"],function(a,b,c,d){function e(b,e){if(this.options=b,null!=e&&this.fromElement(e),this.options=c.apply(this.options),e&&e.is("input")){var f=a(this.get("amdBase")+"compat/inputData");this.options.dataAdapter=d.Decorate(this.options.dataAdapter,f)}}return e.prototype.fromElement=function(a){var c=["select2"];null==this.options.multiple&&(this.options.multiple=a.prop("multiple")),null==this.options.disabled&&(this.options.disabled=a.prop("disabled")),null==this.options.language&&(a.prop("lang")?this.options.language=a.prop("lang").toLowerCase():a.closest("[lang]").prop("lang")&&(this.options.language=a.closest("[lang]").prop("lang"))),null==this.options.dir&&(a.prop("dir")?this.options.dir=a.prop("dir"):a.closest("[dir]").prop("dir")?this.options.dir=a.closest("[dir]").prop("dir"):this.options.dir="ltr"),a.prop("disabled",this.options.disabled),a.prop("multiple",this.options.multiple),a.data("select2Tags")&&(this.options.debug&&window.console&&console.warn&&console.warn('Select2: The `data-select2-tags` attribute has been changed to use the `data-data` and `data-tags="true"` attributes and will be removed in future versions of Select2.'),a.data("data",a.data("select2Tags")),a.data("tags",!0)),a.data("ajaxUrl")&&(this.options.debug&&window.console&&console.warn&&console.warn("Select2: The `data-ajax-url` attribute has been changed to `data-ajax--url` and support for the old attribute will be removed in future versions of Select2."),a.attr("ajax--url",a.data("ajaxUrl")),a.data("ajax--url",a.data("ajaxUrl")));var e={};e=b.fn.jquery&&"1."==b.fn.jquery.substr(0,2)&&a[0].dataset?b.extend(!0,{},a[0].dataset,a.data()):a.data();var f=b.extend(!0,{},e);f=d._convertData(f);for(var g in f)b.inArray(g,c)>-1||(b.isPlainObject(this.options[g])?b.extend(this.options[g],f[g]):this.options[g]=f[g]);return this},e.prototype.get=function(a){return this.options[a]},e.prototype.set=function(a,b){this.options[a]=b},e}),b.define("select2/core",["jquery","./options","./utils","./keys"],function(a,b,c,d){var e=function(a,c){null!=a.data("select2")&&a.data("select2").destroy(),this.$element=a,this.id=this._generateId(a),c=c||{},this.options=new b(c,a),e.__super__.constructor.call(this);var d=a.attr("tabindex")||0;a.data("old-tabindex",d),a.attr("tabindex","-1");var f=this.options.get("dataAdapter");this.dataAdapter=new f(a,this.options);var g=this.render();this._placeContainer(g);var h=this.options.get("selectionAdapter");this.selection=new h(a,this.options),this.$selection=this.selection.render(),this.selection.position(this.$selection,g);var i=this.options.get("dropdownAdapter");this.dropdown=new i(a,this.options),this.$dropdown=this.dropdown.render(),this.dropdown.position(this.$dropdown,g);var j=this.options.get("resultsAdapter");this.results=new j(a,this.options,this.dataAdapter),this.$results=this.results.render(),this.results.position(this.$results,this.$dropdown);var k=this;this._bindAdapters(),this._registerDomEvents(),this._registerDataEvents(),this._registerSelectionEvents(),this._registerDropdownEvents(),this._registerResultsEvents(),this._registerEvents(),this.dataAdapter.current(function(a){k.trigger("selection:update",{data:a})}),a.addClass("select2-hidden-accessible"),a.attr("aria-hidden","true"),this._syncAttributes(),a.data("select2",this)};return c.Extend(e,c.Observable),e.prototype._generateId=function(a){var b="";return b=null!=a.attr("id")?a.attr("id"):null!=a.attr("name")?a.attr("name")+"-"+c.generateChars(2):c.generateChars(4),b="select2-"+b},e.prototype._placeContainer=function(a){a.insertAfter(this.$element);var b=this._resolveWidth(this.$element,this.options.get("width"));null!=b&&a.css("width",b)},e.prototype._resolveWidth=function(a,b){var c=/^width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i;if("resolve"==b){var d=this._resolveWidth(a,"style");return null!=d?d:this._resolveWidth(a,"element")}if("element"==b){var e=a.outerWidth(!1);return 0>=e?"auto":e+"px"}if("style"==b){var f=a.attr("style");if("string"!=typeof f)return null;for(var g=f.split(";"),h=0,i=g.length;i>h;h+=1){var j=g[h].replace(/\s/g,""),k=j.match(c);if(null!==k&&k.length>=1)return k[1]}return null}return b},e.prototype._bindAdapters=function(){this.dataAdapter.bind(this,this.$container),this.selection.bind(this,this.$container),this.dropdown.bind(this,this.$container),this.results.bind(this,this.$container)},e.prototype._registerDomEvents=function(){var b=this;this.$element.on("change.select2",function(){b.dataAdapter.current(function(a){b.trigger("selection:update",{data:a})})}),this._sync=c.bind(this._syncAttributes,this),this.$element[0].attachEvent&&this.$element[0].attachEvent("onpropertychange",this._sync);var d=window.MutationObserver||window.WebKitMutationObserver||window.MozMutationObserver;null!=d?(this._observer=new d(function(c){a.each(c,b._sync)}),this._observer.observe(this.$element[0],{attributes:!0,subtree:!1})):this.$element[0].addEventListener&&this.$element[0].addEventListener("DOMAttrModified",b._sync,!1)},e.prototype._registerDataEvents=function(){var a=this;this.dataAdapter.on("*",function(b,c){a.trigger(b,c)})},e.prototype._registerSelectionEvents=function(){var b=this,c=["toggle","focus"];this.selection.on("toggle",function(){b.toggleDropdown()}),this.selection.on("focus",function(a){b.focus(a)}),this.selection.on("*",function(d,e){-1===a.inArray(d,c)&&b.trigger(d,e)})},e.prototype._registerDropdownEvents=function(){var a=this;this.dropdown.on("*",function(b,c){a.trigger(b,c)})},e.prototype._registerResultsEvents=function(){var a=this;this.results.on("*",function(b,c){a.trigger(b,c)})},e.prototype._registerEvents=function(){var a=this;this.on("open",function(){a.$container.addClass("select2-container--open")}),this.on("close",function(){a.$container.removeClass("select2-container--open")}),this.on("enable",function(){a.$container.removeClass("select2-container--disabled")}),this.on("disable",function(){a.$container.addClass("select2-container--disabled")}),this.on("blur",function(){a.$container.removeClass("select2-container--focus")}),this.on("query",function(b){a.isOpen()||a.trigger("open",{}),this.dataAdapter.query(b,function(c){a.trigger("results:all",{data:c,query:b})})}),this.on("query:append",function(b){this.dataAdapter.query(b,function(c){a.trigger("results:append",{data:c,query:b})})}),this.on("keypress",function(b){var c=b.which;a.isOpen()?c===d.ESC||c===d.TAB||c===d.UP&&b.altKey?(a.close(),b.preventDefault()):c===d.ENTER?(a.trigger("results:select",{}),b.preventDefault()):c===d.SPACE&&b.ctrlKey?(a.trigger("results:toggle",{}),b.preventDefault()):c===d.UP?(a.trigger("results:previous",{}),b.preventDefault()):c===d.DOWN&&(a.trigger("results:next",{}),b.preventDefault()):(c===d.ENTER||c===d.SPACE||c===d.DOWN&&b.altKey)&&(a.open(),b.preventDefault())})},e.prototype._syncAttributes=function(){this.options.set("disabled",this.$element.prop("disabled")),this.options.get("disabled")?(this.isOpen()&&this.close(),this.trigger("disable",{})):this.trigger("enable",{})},e.prototype.trigger=function(a,b){var c=e.__super__.trigger,d={open:"opening",close:"closing",select:"selecting",unselect:"unselecting"};if(void 0===b&&(b={}),a in d){var f=d[a],g={prevented:!1,name:a,args:b};if(c.call(this,f,g),g.prevented)return void(b.prevented=!0)}c.call(this,a,b)},e.prototype.toggleDropdown=function(){this.options.get("disabled")||(this.isOpen()?this.close():this.open())},e.prototype.open=function(){this.isOpen()||this.trigger("query",{})},e.prototype.close=function(){this.isOpen()&&this.trigger("close",{})},e.prototype.isOpen=function(){return this.$container.hasClass("select2-container--open")},e.prototype.hasFocus=function(){return this.$container.hasClass("select2-container--focus")},e.prototype.focus=function(a){this.hasFocus()||(this.$container.addClass("select2-container--focus"),this.trigger("focus",{}))},e.prototype.enable=function(a){this.options.get("debug")&&window.console&&console.warn&&console.warn('Select2: The `select2("enable")` method has been deprecated and will be removed in later Select2 versions. Use $element.prop("disabled") instead.'),(null==a||0===a.length)&&(a=[!0]);var b=!a[0];this.$element.prop("disabled",b)},e.prototype.data=function(){this.options.get("debug")&&arguments.length>0&&window.console&&console.warn&&console.warn('Select2: Data can no longer be set using `select2("data")`. You should consider setting the value instead using `$element.val()`.');var a=[];return this.dataAdapter.current(function(b){a=b}),a},e.prototype.val=function(b){if(this.options.get("debug")&&window.console&&console.warn&&console.warn('Select2: The `select2("val")` method has been deprecated and will be removed in later Select2 versions. Use $element.val() instead.'),null==b||0===b.length)return this.$element.val();var c=b[0];a.isArray(c)&&(c=a.map(c,function(a){return a.toString()})),this.$element.val(c).trigger("change")},e.prototype.destroy=function(){this.$container.remove(),this.$element[0].detachEvent&&this.$element[0].detachEvent("onpropertychange",this._sync),null!=this._observer?(this._observer.disconnect(),this._observer=null):this.$element[0].removeEventListener&&this.$element[0].removeEventListener("DOMAttrModified",this._sync,!1),this._sync=null,this.$element.off(".select2"),this.$element.attr("tabindex",this.$element.data("old-tabindex")),this.$element.removeClass("select2-hidden-accessible"),this.$element.attr("aria-hidden","false"),this.$element.removeData("select2"),this.dataAdapter.destroy(),this.selection.destroy(),this.dropdown.destroy(),this.results.destroy(),this.dataAdapter=null,this.selection=null,this.dropdown=null,this.results=null},e.prototype.render=function(){var b=a('<span class="select2 select2-container"><span class="selection"></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>');return b.attr("dir",this.options.get("dir")),this.$container=b,this.$container.addClass("select2-container--"+this.options.get("theme")),b.data("element",this.$element),b},e}),b.define("jquery-mousewheel",["jquery"],function(a){return a}),b.define("jquery.select2",["jquery","jquery-mousewheel","./select2/core","./select2/defaults"],function(a,b,c,d){if(null==a.fn.select2){var e=["open","close","destroy"];a.fn.select2=function(b){if(b=b||{},"object"==typeof b)return this.each(function(){var d=a.extend(!0,{},b);new c(a(this),d)}),this;if("string"==typeof b){var d;return this.each(function(){var c=a(this).data("select2");null==c&&window.console&&console.error&&console.error("The select2('"+b+"') method was called on an element that is not using Select2.");var e=Array.prototype.slice.call(arguments,1);d=c[b].apply(c,e)}),a.inArray(b,e)>-1?this:d}throw new Error("Invalid arguments for Select2: "+b)}}return null==a.fn.select2.defaults&&(a.fn.select2.defaults=d),c}),{define:b.define,require:b.require}}(),c=b.require("jquery.select2");return a.fn.select2.amd=b,c});var czr_debug = {
  log: function(o) {debug.queue.push(['log', arguments, debug.stack.slice(0)]); if (window.console && typeof window.console.log == 'function') {window.console.log(o);}},
  error: function(o) {debug.queue.push(['error', arguments, debug.stack.slice(0)]); if (window.console && typeof window.console.error == 'function') {window.console.error(o);}},
  queue: [],
  stack: []
};

var api = api || wp.customize, $ = $ || jQuery;
(function (api, $, _) {
      api.consoleLog = function() {
            if ( ( _.isUndefined( console ) && typeof window.console.log != 'function' ) || ! serverControlParams.isDevMode )
              return;
            console.log.apply( console, arguments );
      };
      api.czr_wp_conditionals = new api.Value();
      api.czr_widgetZoneSettings = new api.Value();//will store all widget zones data sent by preview as an observable object
      api.sidebar_insights = new api.Values();
      api.sidebar_insights.create('candidates');//will store the sidebar candidates on preview refresh
      api.sidebar_insights.create('actives');//will record the refreshed active list of active sidebars sent from the preview
      api.sidebar_insights.create('inactives');
      api.sidebar_insights.create('registered');
      api.sidebar_insights.create('available_locations');
      api.czr_partials = new api.Value();
      api.czr_activeSectionId = new api.Value();
      api.bind('ready', function() {
          if ( 'function' != typeof api.Section ) {
            throw new Error( 'Your current version of WordPress does not support the customizer sections needed for this theme. Please upgrade WordPress to the latest version.' );
          }
          api.section.each( function( _sec ) {
                _sec.expanded.bind( function( expanded ) {
                      api.czr_activeSectionId( expanded ? _sec.id : api.czr_activeSectionId() );
                });
          });
      });

})( wp.customize , jQuery, _);
var CZRSkopeBaseMths = CZRSkopeBaseMths || {};
$.extend( CZRSkopeBaseMths, {

    globalSettingVal : {},//will store the global setting val. Populated on init.

    initialize: function() {
          var self = this;
          api.czr_skopeCollection = new api.Value([]);//all available skope, including the current skopes
          api.czr_currentSkopesCollection = new api.Value([]);
          api.czr_activeSkope = new api.Value();
          api.czr_skope = new api.Values();
          self.skopeWrapperEmbedded = $.Deferred();
          self.initialSkopeCollectionPopulated = $.Deferred();
          api.czr_isResettingSkope = new api.Value( false );
          api.czr_globalDBoptions = new api.Value([]);

          api.czr_savedDirties = new api.Value({ channel : '', saved : {} });
          if ( 'pending' == self.skopeWrapperEmbedded.state() ) {
              $.when( self.embedSkopeWrapper() ).done( function() {
                  self.skopeWrapperEmbedded.resolve();
              });
          }
          api.czr_activeSkope.callbacks.add( function() { return self.activeSkopeReact.apply(self, arguments ); } );
          if ( ! self.isExcludedSidebarsWidgets() ) {
              api.czr_activeSkope.bind( function( active_skope ) {
                  _forceSidebarDirtyRefresh( api.czr_activeSectionId(), active_skope );
              });
          }
          api.czr_activeSectionId.bind( function( active_section ) {
                self.initialSkopeCollectionPopulated.then( function() {
                      self.processSilentUpdates( { section_id : active_section } );
                      if ( ! self.isExcludedSidebarsWidgets() ) {
                            _forceSidebarDirtyRefresh( active_section, api.czr_activeSkope() );
                      }
                });

          } );


          var _forceSidebarDirtyRefresh = function( active_section, active_skope ) {
                if ( self.isExcludedSidebarsWidgets() )
                  return;
                var _save_state = api.state('saved')();
                var _debounced = function() {
                    if ( api.section.has( active_section ) && "sidebar" == api.section(active_section).params.type ) {
                        var active_skope = active_skope || api.czr_activeSkope(),
                            related_setting_name = 'sidebars_widgets[' + api.section(active_section).params.sidebarId + ']',
                            related_setting_val = self.getSkopeSettingVal( related_setting_name, active_skope );
                        self.updateSkopeDirties( related_setting_name, related_setting_val, active_skope );

                        api.previewer._new_refresh( api.czr_skope( active_skope ).dirtyValues() );
                    }
                };
                _debounced = _.debounce( _debounced, 2000 );
                _debounced();

                api.state('saved')( _save_state );
          };
          api.czr_currentSkopesCollection.callbacks.add( function() { return self.currentSkopesCollectionReact.apply(self, arguments ); } );
          self.listenAPISettings();
          $( document ).bind( 'widget-added', function( e, $o ) {
              if ( self.isExcludedSidebarsWidgets() )
                  return;

              var wgtIdAttr = $o.closest('.customize-control').attr('id'),
                  wdgtSetId = api.czr_skopeBase.widgetIdToSettingId( wgtIdAttr, 'customize-control-' );
              if ( ! api.has( wdgtSetId ) ) {
                  throw new Error( 'AN ADDED WIDGET COULD NOT BE BOUND IN SKOPE. ' +  wdgtSetId);
              } else {
                  self.listenAPISettings( wdgtSetId );
              }
          });
          api.state('saved').bind( function( saved ) {
              $('body').toggleClass('czr-api-dirty', ! saved );
          });
          self.bind( 'skopes-saved', function( _saved_dirties ) {
                api.previewer.refresh();
                _.each( _saved_dirties, function( _skp_dirties, _skp_id ){
                      if ( _skp_id != api.czr_activeSkope() )
                        return;
                      _.each( _skp_dirties, function( _v, setId ) {
                          if ( _.has(api.control(setId), 'czr_isDirty') )
                            api.control(setId).czr_isDirty(false);
                          if ( _.has(api.control(setId), 'czr_hasDBVal') )
                            api.control(setId).czr_hasDBVal(true);
                      });
                });
                api.consoleLog( 'SAVED DIRTIES', _saved_dirties );
          });
          api.czr_globalDBoptions.callbacks.add( function() { return self.globalDBoptionsReact.apply(self, arguments ); } );
          self.refreshedControls = [ 'czr_cropped_image'];// [ 'czr_cropped_image', 'czr_multi_module', 'czr_module' ];
    },
    embedSkopeWrapper : function() {
          var self = this;
          $('#customize-header-actions').append( $('<div/>', {class:'czr-scope-switcher'}) );
          $('body').addClass('czr-skop-on');
    },
    listenAPISettings : function( requestedSetId ) {
          var self = this,
              _bindListener = function( setId, new_val, old_val, o ) {
                    if ( ! _.has( api, 'czr_activeSkope') || _.isUndefined( api.czr_activeSkope() ) ) {
                      api.consoleLog( 'The api.czr_activeSkope() is undefined in the api.previewer._new_refresh() method.');
                    }
                    api.consoleLog('ELIGIBLE SETTING HAS CHANGED', setId, new_val, old_val, o );
                    if ( api(setId)._dirty ) {
                        self.updateSkopeDirties( setId, new_val );
                    }
                    if ( _.has( api.control(setId), 'czr_isDirty' ) ) {
                        api.control(setId).czr_isDirty( api(setId)._dirty );
                    }
              };//bindListener()


          if ( ! _.isUndefined( requestedSetId ) ) {
              api( requestedSetId ).bind( function(to, from, o ) { _bindListener( requestedSetId, to, from, o ); });
          }
          else {
              api.each( function ( _setting ) {
                  _setting.bind( function(to, from, o ) { _bindListener( _setting.id, to, from, o ); });
              });
          }
    },
    updateSkopeDirties : function( setId, new_val, skope_id ) {
          skope_id = skope_id || api.czr_activeSkope();
          var self = this,
              skope_instance,
              shortSetId = api.CZR_Helpers.getOptionName( setId );
          skope_instance = self.isSettingSkopeEligible( setId ) ? api.czr_skope( skope_id ) : api.czr_skope( self.getGlobalSkopeId() );//the global skope instance

          if ( _.isUndefined( skope_instance ) ) {
            throw new Error('updateSkopeDirties : the required skope id is not registered.');
          }

          var current_dirties = $.extend( true, {}, skope_instance.dirtyValues() ),
              _dirtyCustomized = {};

          _dirtyCustomized[ setId ] = new_val;
          skope_instance.dirtyValues.set( $.extend( current_dirties , _dirtyCustomized ) );
          return skope_instance.dirtyValues();
    },
    globalDBoptionsReact : function( to, from ) {
          var self = this,
              resetted_opts = _.difference( from, to );
          if ( ! _.isEmpty(resetted_opts) ) {
              api.consoleLog( 'HAS RESET OPTIONS', resetted_opts );
              _.each( resetted_opts, function( shortSetId ) {
                    var wpSetId = api.CZR_Helpers.build_setId( shortSetId );
                    if ( _.has( api.settings.settings, wpSetId) )
                      api.settings.settings[wpSetId].value = serverControlParams.defaultOptionsValues[shortSetId];
                    self.silentlyUpdateSettings( [], false );//silently update with no refresh
              });
          }
          api.czr_skope( self.getGlobalSkopeId() ).hasDBValues( ! _.isEmpty( to ) );//might trigger cb hasDBValuesReact()
          api.czr_skope( self.getGlobalSkopeId() )().has_db_val = ! _.isEmpty( to );

    }
});//$.extend()
var CZRSkopeBaseMths = CZRSkopeBaseMths || {};
$.extend( CZRSkopeBaseMths, {
    isSkopeRegisteredInCollection : function( skope_id, collection ) {
          var self = this;
          collection = collection || api.czr_skopeCollection();
          return ! _.isUndefined( _.findWhere( collection, { id : skope_id } ) );
    },
    isSkopeRegisteredInCurrentCollection : function( skope_id, collection ) {
          var self = this;
          collection = collection || api.czr_currentSkopesCollection();
          return ! _.isUndefined( _.findWhere( collection, { id : skope_id } ) );
    },
    isGlobalSkopeRegistered : function() {
          var _model = _.findWhere( api.czr_currentSkopesCollection(), { skope : 'global'} );
          return _.isObject( _model ) && _.has( _model, 'id' );
    },
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
    getActiveSkope : function( _current_skope_collection ) {
          var _active_candidates = {},
              _def = _.findWhere( _current_skope_collection, {is_default : true } ).id;
          _def = ! _.isUndefined(_def) ? _def : _.findWhere( _current_skope_collection, { skope : 'global' } ).id;

          _.each( _current_skope_collection, function( _skop ) {
                _active_candidates[_skop.skope] = _skop.id;
          });
          if ( _.has( _active_candidates, 'local' ) )
            return _active_candidates.local;
          if ( _.has( _active_candidates, 'group' ) )
            return _active_candidates.group;
          if ( _.has( _active_candidates, 'special_group' ) )
            return active_candidates.special_group;
          return _def;
    },
    isSettingSkopeEligible : function( setId ) {
          var self = this,
              shortSetId = api.CZR_Helpers.getOptionName( setId );

          if( _.isUndefined( setId ) || ! api.has( setId ) ) {
            api.consoleLog( 'THE SETTING ' + setId + ' IS NOT ELIGIBLE TO SKOPE BECAUSE UNDEFINED OR NOT REGISTERED IN THE API.' );
            return false;
          }
          if ( self.isExcludedWPBuiltinSetting( setId ) )
            return false;
          if ( _.contains( serverControlParams.skopeExcludedSettings, shortSetId ) ) {
            return false;
          } else if ( -1 != setId.indexOf( serverControlParams.themeOptions ) ) {
            return true;
          } else
           return true;
    },
    isSettingResetEligible : function( setId ) {
          var self = this,
              shortSetId = api.CZR_Helpers.getOptionName( setId );

          if( _.isUndefined( setId ) || ! api.has( setId ) ) {
            api.consoleLog( 'THE SETTING ' + setId + ' IS NOT ELIGIBLE TO RESET BECAUSE UNDEFINED OR NOT REGISTERED IN THE API.' );
            return;
          }
          if ( self.isExcludedWPBuiltinSetting( setId ) )
            return;
          if ( -1 == setId.indexOf( serverControlParams.themeOptions ) && ! _.contains( serverControlParams.wpBuiltinSettings, setId ) ) {
            api.consoleLog( 'THE SETTING ' + setId + ' IS NOT ELIGIBLE TO RESET BECAUSE NOT PART OF THE THEME OPTIONS AND NOT WP AUTHORIZED BUILT IN OPTIONS' );
          } else
           return true;
    },
    isExcludedWPBuiltinSetting : function( setId ) {
          if ( _.isUndefined(setId) )
            return true;
          if ( 'active_theme' == setId )
            return true;
          if ( _.contains( serverControlParams.wpBuiltinSettings, setId ) )
            return false;
          if ( 'sidebars_' == setId.substring(0, 9) )
            return this.isExcludedSidebarsWidgets();
          if ( 'widget_' == setId.substring(0, 7) )
            return this.isExcludedSidebarsWidgets();
          return 'nav_menu' == setId.substring(0, 8);
    },
    isExcludedSidebarsWidgets : function() {
          var SidWidgParam = serverControlParams.isSidebarsWigetsAuthorized;//can be a boolean or a string "" for false, "1" for true
              isSidebarWidgetSkoped = ! _.isUndefined(SidWidgParam) && ! _.isEmpty( SidWidgParam ) && false !== SidWidgParam;
          return ! isSidebarWidgetSkoped;
    },
    getSkopeSettingVal : function( setId, skope_id ) {
          if ( ! api.has( api.CZR_Helpers.build_setId(setId) ) ) {
              throw new Error('getSkopeSettingVal : the requested setting id does not exist in the api : ' + api.CZR_Helpers.build_setId(setId) );
          }
          if ( ! api.czr_skope.has( skope_id ) ) {
              throw new Error('getSkopeSettingVal : the requested skope id is not registered : ' + skope_id );
          }

          var self = this,
              wpSetId = api.CZR_Helpers.build_setId( setId ),
              val_candidate = '___',
              skope_model = api.czr_skope( skope_id )(),
              initial_val;
          if ( _.has( api.settings.settings, wpSetId ) )
            initial_val = api.settings.settings[wpSetId].value;
          else
            initial_val = null;
          if ( api.czr_skope( skope_id ).getSkopeSettingDirtyness( wpSetId ) )
            return api.czr_skope( skope_id ).dirtyValues()[ wpSetId ];
          var _skope_db_val = self._getDBSettingVal( setId, skope_model );
          if ( _skope_db_val != '_no_db_val' )
            return _skope_db_val;
          else if( 'global' == skope_model.skope ) {
            return '___' == val_candidate ? initial_val : val_candidate;
          }
          else
            return '___' != val_candidate ? val_candidate : self.getSkopeSettingVal( setId, self._getParentSkopeId( skope_model ) );
    },
    applyDirtyCustomizedInheritance : function( dirtyCustomized, skope_id ) {
          skope_id = skope_id || api.czr_activeSkope() || api.czr_skopeBase.getGlobalSkopeId();
          dirtyCustomized = dirtyCustomized || {};

          var self = this,
              skope_model = api.czr_skope( skope_id )();

          if ( 'global' == skope_model.skope )
            return dirtyCustomized;

          var parent_skope_id = self._getParentSkopeId( skope_model ),
              parent_dirties = api.czr_skope( parent_skope_id ).dirtyValues();
          _.each( parent_dirties, function( _val, wpSetId ){
                var shortSetId = api.CZR_Helpers.getOptionName( wpSetId );
                if ( _.isUndefined( dirtyCustomized[wpSetId] ) && _.isUndefined( skope_model.db[shortSetId] ) )
                    dirtyCustomized[wpSetId] = _val;
          });
          return 'global' == api.czr_skope( parent_skope_id )().skope ? dirtyCustomized : self.applyDirtyCustomizedInheritance( dirtyCustomized, parent_skope_id );
    },
    _getParentSkopeId : function( skope_model, _index ) {
          var self = this,
              hierark = ['local', 'group', 'special_group', 'global'],
              parent_skope_ind = _index || ( _.findIndex( hierark, function( _skp ) { return skope_model.skope == _skp; } ) + 1 ) * 1,
              parent_skope_skope = hierark[ parent_skope_ind ];

          if ( _.isUndefined( parent_skope_skope ) ) {
              return _.findWhere( api.czr_currentSkopesCollection(), { skope : 'global' } ).id;
          }
          if ( _.isUndefined( _.findWhere( api.czr_currentSkopesCollection(), { skope : parent_skope_skope } ) ) ) {
              return self._getParentSkopeId( skope_model, parent_skope_ind + 1 );
          }
          return _.findWhere( api.czr_currentSkopesCollection(), { skope : parent_skope_skope } ).id;
    },
    _getDBSettingVal : function( setId, skope_model  ) {
          var shortSetId = api.CZR_Helpers.getOptionName(setId),
              wpSetId = api.CZR_Helpers.build_setId(setId);

          return _.has( skope_model.db, shortSetId ) ? skope_model.db[shortSetId] : '_no_db_val';
    },
    isAPIDirty : function() {
          var isDirty = false;
          _.each( api.czr_currentSkopesCollection(), function( skp ){
                if ( ! isDirty && api.czr_skope( skp.id ).dirtyness() )
                  isDirty = true;
          });
          return isDirty;
    },
    getSkopeDirties : function( skope_id ) {
          if ( ! api.czr_skope.has( skope_id) )
            return {};
          return api.czr_skope( skope_id ).dirtyValues();
    },

    getSkopeExcludedDirties : function() {
          var self = this,
              _wpDirties = {};
          api.each( function ( value, setId ) {
                if ( value._dirty ) {
                  _wpDirties[ setId ] = value();
                }
          } );
          var _globalSkopeId = self.getGlobalSkopeId(),
              _globalSkpDirties = self.getSkopeDirties( _globalSkopeId );
          return _.omit( _wpDirties, function( _value, setId ) {
              return self.isSettingSkopeEligible( setId );
          } );
    },
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
          parsed.id_base = widgetId;
        }

        if ( ! _.isUndefined( prefixToRemove ) )
          parsed.id_base = parsed.id_base.replace( prefixToRemove , '');
        return parsed;
    },
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
    },
    _getSilentUpdateCandidates : function( section_id ) {
          var self = this,
              SilentUpdateCands = [];
          section_id = ( _.isUndefined( section_id ) || _.isNull( section_id ) ) ? api.czr_activeSectionId() : section_id;

          if ( _.isUndefined( section_id ) ) {
            api.consoleLog( '_getSilentUpdateCandidates : No active section provided');
            return;
          }
          if ( ! api.section.has( section_id ) ) {
              throw new Error( '_getSilentUpdateCandidates : The section ' + section_id + ' is not registered in the API.');
          }
          var section_settings = api.CZR_Helpers.getSectionSettingIds( section_id );
          section_settings = _.filter( section_settings, function(setId) {
              return self.isSettingSkopeEligible( setId );
          });
          _.each( section_settings, function( setId ) {
                SilentUpdateCands.push( setId );
          });

          return SilentUpdateCands;
    }



});//$.extend
var CZRSkopeBaseMths = CZRSkopeBaseMths || {};
$.extend( CZRSkopeBaseMths, {
    updateSkopeCollection : function( sent_collection, sent_channel ) {
          api.consoleLog('UPDATE SKOPE COLLECTION', sent_collection, sent_channel );
          var self = this;
              _api_ready_collection = [];
          _.each( sent_collection, function( _skope, _key ) {
                var skope_candidate = $.extend( true, {}, _skope );//deep clone to avoid any shared references
                _api_ready_collection.push( self.prepareSkopeForAPI( skope_candidate ) );
          });
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
          if ( ! _.isEmpty(api.czr_savedDirties().channel) && sent_channel != api.czr_savedDirties().channel ) {
                var not_sync = [];
                _.each( api.czr_savedDirties().saved, function( skp_id ) {
                      _.each( skp_id, function( _val, _setId ) {
                            if ( _.isUndefined( _.findWhere( _api_ready_collection, { id : skp_id} ) ) )
                              return;

                            var sent_skope_db_values = _.findWhere( _api_ready_collection, { id : skp_id} ).db,
                                shortSetId = api.CZR_Helpers.build_setId( _setId ),
                                sent_set_val = sent_skope_db_values[shortSetId];

                            if ( _.isUndefined( sent_set_val ) || ! _.isEqual(sent_set_val, _val ) ) {
                                not_sync.push( { skope_id : skp_id, setId : shortSetId, server_val : sent_set_val, api_val : _val } );
                            }
                      });
                });

                if ( ! _.isEmpty( not_sync) ) {
                    api.consoleLog('SOME SETTINGS HAVE NOT BEEN PROPERLY SAVED : ', not_sync);
                } else {
                    api.consoleLog('ALL RIGHT : SETTING VALUES ARE SYNCHRONIZED BETWEEN THE SERVER AND THE API');
                }
                $.when( self.updateSavedSkopesDbValues( api.czr_savedDirties().saved ) ).done( function() {
                      api.czr_savedDirties( { channel : '', saved : {} } );
                });
                self.maybeSynchronizeGlobalSkope();
          }
          api.czr_currentSkopesCollection( _api_ready_collection );
    },



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
                              throw new Error('prepareSkopeForAPI : missing or invalid dyn type for skope ' + _candidate_val.skope );
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
                      case  'is_default' :
                          if ( ! _.isUndefined( _candidate_val) && ! _.isBoolean( _candidate_val )  ) {
                              throw new Error('prepareSkopeForAPI : skope property "is_default" must be a boolean');
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
                      case  'db' :
                          if ( _.isArray( _candidate_val ) || _.isEmpty( _candidate_val ) )
                            _candidate_val = {};
                          if ( _.isUndefined( _candidate_val) || ! _.isObject( _candidate_val ) ) {
                              throw new Error('prepareSkopeForAPI : skope property "db" must be an object');
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
    currentSkopesCollectionReact : function(to, from) {
          var self = this,
              _new_collection = $.extend( true, [], to ) || [],
              _old_collection = $.extend( true, [], from ) || [];
          var _to_instantiate = [];
          var _to_remove = [];
          var _to_update = [];
          _.each( _new_collection, function( _sent_skope ) {
              if ( ! api.czr_skope.has( _sent_skope.id  ) )
                _to_instantiate.push( _sent_skope );
          });
          api.consoleLog('SKOPES TO INSTANTIATE?', _to_instantiate );
          _.each( _to_instantiate, function( _skope ) {
              _skope = $.extend( true, {}, _skope );//use a cloned skop to instantiate : @todo : do we still need that ?
              api.czr_skope.add( _skope.id , new api.CZR_skope( _skope.id , _skope ) );
              if ( ! api.czr_skope.has( _skope.id ) ) {
                  throw new Error( 'Skope id : ' + _skope.id + ' has not been instantiated.');
              }
              api.czr_skope( _skope.id ).ready();
          });
          if ( _.isUndefined( _.findWhere( api.czr_currentSkopesCollection(), {id : api.czr_activeSkope() } ) ) )
            api.czr_activeSkope( self.getActiveSkope( _new_collection ) );
          var _activeSkopeNum = _.size( _new_collection ),
              _setLayoutClass = function( _skp_instance ) {
                    var _newClasses = _skp_instance.container.attr('class').split(' ');
                    _.each( _skp_instance.container.attr('class').split(' '), function( _c ) {
                          if ( 'width-' == _c.substring( 0, 6) ) {
                              _newClasses = _.without( _newClasses, _c );
                          }
                    });
                    $.when( _skp_instance.container.attr('class', _newClasses.join(' ') ) )
                          .done( function() {
                                _skp_instance.container.addClass( 'width-' + ( Math.round( 100 / _activeSkopeNum ) ) );
                          });
              };
          api.czr_skope.each( function( _skp_instance ){
                if ( _.isUndefined( _.findWhere( _new_collection, { id : _skp_instance().id } ) ) ) {
                      _skp_instance.visible(false);
                }
                else {
                      _skp_instance.visible(true);
                      if ( 'pending' == _skp_instance.embedded.state() ) {
                            _skp_instance.embedded.then( function() {
                                  _setLayoutClass( _skp_instance );
                            });
                      } else {
                            _setLayoutClass( _skp_instance );
                      }
                }
          } );
          if ( _.isEmpty(from) && ! _.isEmpty(to) )
            self.initialSkopeCollectionPopulated.resolve();
          self.maybeSynchronizeGlobalSkope();

    },//listenToSkopeCollection()
    maybeSynchronizeGlobalSkope : function() {
          var self = this;
          if ( self.isGlobalSkopeRegistered() ) {
                var _global_skp_db_values = api.czr_skope( self.getGlobalSkopeId() )().db;
                _.each( _global_skp_db_values, function( _val, shortSetId ){
                      var wpSetId = api.CZR_Helpers.build_setId( shortSetId );
                      if ( ! _.isEqual( api.settings.settings[wpSetId].value, _val ) ) {
                          api.settings.settings[wpSetId].value = _val;
                      }
                });
                api.consoleLog('GLOBAL SKOPE HAS BEEN SYNCHRONIZED WITH THE API.');
          }
    },
    updateSavedSkopesDbValues : function( _saved_dirties ) {
          _.each( _saved_dirties, function( _dirties, _skope_id ) {
                var _current_model = $.extend( true, {}, api.czr_skope( _skope_id )() ),
                    _new_db_val = ! _.isObject( _current_model.db ) ? {} : $.extend( true, {}, _current_model.db ),
                    _api_ready_dirties = {};
                _.each( _dirties, function( _val, _wp_opt_name ) {
                      var _k = api.CZR_Helpers.getOptionName( _wp_opt_name );
                      _api_ready_dirties[_k] = _val;
                });

                api.consoleLog('IN UPDATE SAVED SKOPES DB VALUES', _skope_id, _saved_dirties, _new_db_val, _api_ready_dirties);
                $.extend( _new_db_val, _api_ready_dirties );

                $.extend( _current_model, { db : _new_db_val, has_db_val : ! _.isEmpty(_api_ready_dirties) } );
                api.czr_skope( _skope_id )( _current_model );
          });
    },
});//$.extend
var CZRSkopeBaseMths = CZRSkopeBaseMths || {};
$.extend( CZRSkopeBaseMths, {
    activeSkopeReact : function( to, from ) {
          var self = this;
          if ( ! _.isUndefined(from) && api.czr_skope.has(from) )
            api.czr_skope(from).active(false);
          else if ( ! _.isUndefined(from) )
            throw new Error('listenToActiveSkope : previous scope does not exist in the collection');

          if ( ! _.isUndefined(to) && api.czr_skope.has(to) )
            api.czr_skope(to).active(true);
          else
            throw new Error('listenToActiveSkope : requested scope ' + to + ' does not exist in the collection');
          self._writeCurrentSkopeTitle( to );
          api.consoleLog('ACTIVE SKOPE SWITCH : ' + from + ' => ' + to );

          if ( _.isUndefined( api.czr_activeSectionId() ) ) {
                if ( 'pending' == api.czr_isPreviewerSkopeAware.state() ) {
                    api.previewer.refresh();
                } else {
                    api.previewer.refresh();
                }
                return;
          }
          if ( _.has( api, 'czrModulePanelState') )
            api.czrModulePanelState(false);
          var SilentUpdateCands = self._getSilentUpdateCandidates();
          if ( ! _.isUndefined( from ) ) {
            _.each( api.czr_skope( from ).dirtyValues(), function( val, _setId ) {
                  if ( ! _.contains( SilentUpdateCands, _setId ) )
                      SilentUpdateCands.push( _setId );
            } );
          }
          if ( ! _.isUndefined( to ) ) {
            _.each( api.czr_skope( to ).dirtyValues(), function( val, _setId ) {
                  if ( ! _.contains( SilentUpdateCands, _setId ) )
                      SilentUpdateCands.push( _setId );
            } );
          }

          var _debouncedProcessSilentUpdates = function() {
                var _promises = self.processSilentUpdates( {
                      silent_update_candidates : SilentUpdateCands,
                      section_id : null
                } );
                $.when.apply( null, _promises )
                      .then( function() {
                            api.czr_visibilities.setServiVisibility( api.czr_activeSectionId() );
                      });
          };
          if ( _.has(api, 'czr_isModuleExpanded') && false !== api.czr_isModuleExpanded() ) {
                api.czr_isModuleExpanded().setupModuleViewStateListeners(false);
                _debouncedProcessSilentUpdates = _.debounce( _debouncedProcessSilentUpdates, 400 );
          } else {
                _debouncedProcessSilentUpdates();
          }
    },
    _writeCurrentSkopeTitle : function( skope_id ) {
          var self = this,
              current_title = api.czr_skope( skope_id|| api.czr_activeSkope() ).long_title;

          self.skopeWrapperEmbedded.then( function() {
                if ( ! $('.czr-scope-switcher').find('.czr-current-skope-title').length )
                  $('.czr-scope-switcher').prepend( $( '<h2/>', { class : 'czr-current-skope-title'} ) );
                $('.czr-scope-switcher').find('.czr-current-skope-title').html(
                    '<strong>Current Options Scope : </strong></br>' + '<span class="czr-skope-title">' + current_title + '</span>'
                );
          });

    }
});//$.extend
var CZRSkopeBaseMths = CZRSkopeBaseMths || {};
$.extend( CZRSkopeBaseMths, {
    processSilentUpdates : function( obj ) {
          var self = this, silentUpdateCands, _params,
              defaultParams = {
                  silent_update_candidates : [],
                  section_id : api.czr_activeSectionId()
              };
          _params = $.extend( defaultParams, obj );
          if ( _.isUndefined( _params.silent_update_candidates ) || _.isEmpty( _params.silent_update_candidates ) )
                silentUpdateCands = self._getSilentUpdateCandidates( _params.section_id );
          else if ( ! _.isArray( _params.silent_update_candidates ) ) {
                throw new Error('processSilentUpdates : the update candidates must be an array.');
          } else {
                silentUpdateCands = _params.silent_update_candidates;
          }

          console.log('silentUpdateCands ============>>> ', _params, silentUpdateCands);
          var _promises = self.silentlyUpdateSettings( silentUpdateCands );
          $.when.apply( null, _promises )
                .then( function() {
                      var _debouncedSetupControlReset = function() {
                          self.setupControlsReset( {
                              section_id : _params.section_id
                          });
                      };
                      _debouncedSetupControlReset = _.debounce( _debouncedSetupControlReset, 1200 );
                      _debouncedSetupControlReset();
                });

          return _promises;
    },
    silentlyUpdateSettings : function( _silentUpdateCands, refresh ) {
          var self = this,
              SilentUpdatePromises = {};

          refresh = refresh || true;

          if ( _.isUndefined( _silentUpdateCands ) || _.isEmpty( _silentUpdateCands ) ) {
            _silentUpdateCands = self._getSilentUpdateCandidates();
          }

          if ( _.isString( _silentUpdateCands ) ) {
            _silentUpdateCands = [ _silentUpdateCands ];
          }

          api.consoleLog('the silentUpdateCands', _silentUpdateCands );
          _.each( _silentUpdateCands, function( setId ) {
                if ( api.control.has( setId ) &&  'czr_multi_module' == api.control(setId).params.type )
                  return;
                SilentUpdatePromises[setId] = self.getSettingUpdatePromise( setId );
          });


          var _deferred = [],
              _silently_update = function( SilentUpdatePromises ) {
                     _.each( SilentUpdatePromises, function( obj, setId ) {
                            var wpSetId = api.CZR_Helpers.build_setId( setId ),
                                _skopeDirtyness = api.czr_skope( api.czr_activeSkope() ).getSkopeSettingDirtyness( setId );
                            api( wpSetId ).silent_set( obj.val, _skopeDirtyness );
                      });
              };
          _.each( SilentUpdatePromises, function( obj, setId ) {
                _deferred.push(obj.promise);
          });
          $.when.apply( null, _deferred )
          .then( function() {
                _.each( _deferred, function(prom){
                      if ( _.isObject( prom ) )
                        api.consoleLog( 'promise state() after silent update', prom.state() );
                });
                $.when( _silently_update( SilentUpdatePromises ) ).done( function() {
                    console.log( '!!!! SilentUpdatePromises', SilentUpdatePromises );
                    if ( refresh )
                        api.previewer.refresh();
                });
          });
          return _deferred;
    },
    getSettingUpdatePromise : function( setId ) {
          if ( _.isUndefined( setId ) ) {
              throw new Error('getSettingUpdatePromise : the provided setId is not defined');
          }
          var self = this,
              wpSetId = api.CZR_Helpers.build_setId( setId ),
              current_setting_val = api( wpSetId )(),//typically the previous skope val
              _promise,
              skope_id = api.czr_activeSkope(),
              val = api.czr_skopeBase.getSkopeSettingVal( setId, skope_id );
          if ( ! api.has( wpSetId ) ) {
              throw new Error('getSettingUpdatePromise : the provided setId is not registered in the api.');
          }
          if ( _.isEqual( current_setting_val, val ) )
            return { promise : true, val : val };
          if ( api.control.has( wpSetId ) ) {
                var control_type = api.control( wpSetId ).params.type,
                    _control_data = api.settings.controls[wpSetId],
                    _constructor;

                switch ( control_type ) {
                      case 'czr_cropped_image' :
                            _promise = self._getCzrCroppedImagePromise( wpSetId, _control_data );
                      break;

                      case 'czr_module' :
                            self._processCzrModuleSilentActions( wpSetId, control_type, skope_id , _control_data);
                      break;
                }//switch
          }//end if api.control.has( wpSetId )
          if ( _.has(api.settings.controls, 'header_image') && 'header_image' == wpSetId  ) {
              _promise = self._getHeaderImagePromise( wpSetId, skope_id );
          }

          return  { promise : _promise || true, val : val };
    },//getSettingUpdatePromise()
    _processCzrModuleSilentActions : function( wpSetId, control_type, skope_id, _control_data) {
          var _synced_control_id, _synced_control_val, _synced_control_data, _synced_control_constructor, _syncSektionModuleId,
              _synced_short_id = _.has( api.control( wpSetId ).params, 'syncCollection' ) ? api.control( wpSetId ).params.syncCollection : '',
              _shortSetId =  api.CZR_Helpers.build_setId(wpSetId),
              _val = api.czr_skopeBase.getSkopeSettingVal( _shortSetId, skope_id ),
              current_skope_instance = api.czr_skope( api.czr_activeSkope() );
          if ( ! _.isEmpty( _synced_short_id ) && ! _.isUndefined( _synced_short_id ) ) {
                _synced_control_id = api.CZR_Helpers.build_setId( _synced_short_id );
                _synced_control_val = api.czr_skopeBase.getSkopeSettingVal( _synced_control_id, skope_id );
                _synced_control_data = api.settings.controls[_synced_control_id];
                _synced_control_constructor = api.controlConstructor.czr_multi_module;
                _syncSektionModuleId =  api.control( _synced_control_id ).syncSektionModule()().id;
                api.control( _synced_control_id ).container.remove();
                api.control.remove(_synced_control_id );
                api( _synced_control_id ).silent_set( _synced_control_val, current_skope_instance.getSkopeSettingDirtyness( _synced_control_id ) );
                $.extend( _synced_control_data, { czr_skope : skope_id });
                api.control.add( _synced_control_id,  new _synced_control_constructor( _synced_control_id, { params : _synced_control_data, previewer : api.previewer }) );
          }

          _constructor = api.controlConstructor[control_type];
          api.control( wpSetId ).container.remove();
          api.control.remove( wpSetId );
          api( wpSetId ).silent_set( _val, current_skope_instance.getSkopeSettingDirtyness( _shortSetId ) );
          $.extend( _control_data, { czr_skope : skope_id });
          api.control.add( wpSetId,  new _constructor( wpSetId, { params : _control_data, previewer : api.previewer }) );
          if ( ! _.isEmpty( _synced_short_id ) && ! _.isUndefined( _synced_short_id ) ) {
                api.consoleLog('FIRE SEKTION MODULE?', _syncSektionModuleId, api.control( wpSetId ).czr_Module( _syncSektionModuleId ).isReady.state() );
                api.control( wpSetId ).czr_Module( _syncSektionModuleId ).fireSektionModule();
          }
    },
    _getCzrCroppedImagePromise : function( wpSetId, _control_data ) {
          _constructor = api.controlConstructor.czr_cropped_image;
          val = null === val ? "" : val;
          wp.media.attachment( val ).fetch().done( function() {
                api.control( wpSetId ).container.remove();
                api.control.remove( wpSetId );
                _control_data.attachment = this.attributes;
                api.control.add( wpSetId,  new _constructor( wpSetId, { params : _control_data, previewer : api.previewer }) );
          } ).fail( function() {
                api.control( wpSetId ).container.remove();
                api.control.remove( wpSetId );
                _control_data = _.omit( _control_data, 'attachment' );
                api.control.add( wpSetId,  new _constructor( wpSetId, { params : _control_data, previewer : api.previewer }) );
          });
          return wp.media.attachment( val ).fetch();
    },
    _getHeaderImagePromise : function( wpSetId, skope_id ) {
          if ( ! _.has(api.settings.controls, 'header_image') || 'header_image' != wpSetId  )
            return;

          var _header_constructor = api.controlConstructor.header,
              _header_control_data = $.extend( true, {}, api.settings.controls.header_image );
          header_image_data = null === api.czr_skopeBase.getSkopeSettingVal( 'header_image_data', skope_id ) ? "" : api.czr_skopeBase.getSkopeSettingVal( 'header_image_data', skope_id );

          var attachment_id;
          var _reset_header_image_crtl = function( _updated_header_control_data ) {
              _updated_header_control_data = _updated_header_control_data || _header_control_data;
              api.control( 'header_image' ).container.remove();
              api.control.remove( 'header_image' );
              api.HeaderTool.UploadsList = api.czr_HeaderTool.UploadsList;
              api.HeaderTool.DefaultsList = api.czr_HeaderTool.DefaultsList;
              api.HeaderTool.CombinedList = api.czr_HeaderTool.CombinedList;
              var _render_control = function() {
                api.control.add( 'header_image',  new _header_constructor( 'header_image', { params : _updated_header_control_data, previewer : api.previewer }) );
              };
              _render_control = _.debounce( _render_control, 800 );
              _render_control();
          };


          if ( ! _.has( header_image_data, 'attachment_id' ) ) {
              _reset_header_image_crtl();
          } else {
              attachment_id = header_image_data.attachment_id;
              wp.media.attachment( attachment_id ).fetch().done( function() {
                    _header_control_data.attachment = this.attributes;
                    _reset_header_image_crtl( _header_control_data );
              } ).fail( function() {
                    _header_control_data = _.omit( _header_control_data, 'attachment' );
                    api.control( 'header_image' ).container.remove();
                    api.control.remove( 'header_image' );
                    api.HeaderTool.UploadsList = api.czr_HeaderTool.UploadsList;
                    api.HeaderTool.DefaultsList = api.czr_HeaderTool.DefaultsList;
                    api.HeaderTool.CombinedList = api.czr_HeaderTool.CombinedList;
                    api.control.add( 'header_image',  new _header_constructor( 'header_image', { params : _header_control_data, previewer : api.previewer }) );
              });
              return wp.media.attachment( attachment_id ).fetch();
          }//else
          return true;
    }
});//$.extend
var CZRSkopeBaseMths = CZRSkopeBaseMths || {};
$.extend( CZRSkopeBaseMths, {
    setupControlsReset : function( obj ) {
          var self = this, section_id, controls, setupParams,
              defaultSetupParams = {
                  controls : [],
                  section_id : api.czr_activeSectionId()
              };
          setupParams = $.extend( defaultSetupParams, obj );

          api.consoleLog('SETUP CONTROLS RESET ?', obj.controls );

          if ( ! _.isObject( setupParams ) || ! _.has( setupParams, 'controls' ) || ! _.has( setupParams, 'section_id' ) ) {
                throw new Error( 'SetupControlsReset : the setupParams param must be an object with properties controls and section_id.');
          }

          section_id = setupParams.section_id;
          controls = setupParams.controls;

          if ( _.isEmpty( section_id ) || ! _.isString( section_id ) ) {
                section_id = api.czr_activeSectionId();
          }
          if ( _.isEmpty( controls ) ) {
                controls = api.CZR_Helpers.getSectionControlIds( section_id  );
          }

          controls = _.isString( controls ) ? [controls] : controls;
          controls = _.filter( controls, function( setId ) {
              return true;
          });

          if ( _.isEmpty(controls) )
            return;

          $.when( self.renderControlsSingleReset( controls ) ).done( function() {
                self.setupControlsValues( controls );
          });

    },
    renderControlsSingleReset : function( controls ) {
          var self = this;
          if ( _.isUndefined( controls ) || _.isEmpty( controls ) ) {
                controls = api.CZR_Helpers.getSectionControlIds( api.czr_activeSectionId() );
                controls = _.filter( controls, function( setId ) {
                    return self.isSettingSkopeEligible( setId );
                });
          }

          var setIds = _.isArray(controls) ? controls : [controls],
              render_reset_icons = function( setIds ) {
                    api.consoleLog('IN RENDER RESET ICONS', setIds );
                    _.each( setIds, function( _id ) {
                          if ( ! api.control.has( _id ) )
                            return;
                          var ctrl = api.control( _id );

                          if( $('.czr-setting-reset', ctrl.container ).length )
                            return;

                          ctrl.deferred.embedded.then( function() {
                                $.when( ctrl.container
                                    .find('.customize-control-title').first()//was.find('.customize-control-title')
                                    .prepend( $( '<span/>', {
                                      class : 'czr-setting-reset fa fa-refresh',
                                      title : 'Reset'
                                    }))).done( function(){
                                  $('.czr-setting-reset', ctrl.container).fadeIn(400);
                                });

                          });//then()
                    });//_each
              };
          render_reset_icons = _.debounce( render_reset_icons , 500 );
          render_reset_icons(setIds);
    },
    setupControlsValues : function( controls ) {
          var self = this;
          _.each( controls, function( setId ) {
                if ( ! api.has( setId ) || _.isUndefined( api.control( setId ) ) )
                  return;
                var ctrl = api.control( setId ),
                    shortSetId = api.CZR_Helpers.getOptionName( setId );

                if ( ! _.has( ctrl, 'czr_hasDBVal' ) && ! _.has( ctrl, 'czr_isDirty' ) ) {
                      ctrl.czr_hasDBVal = new api.Value(false);
                      ctrl.czr_isDirty = new api.Value(false);
                      ctrl.czr_hasDBVal.bind( function( has_db_val ) {
                            ctrl.container.toggleClass( 'has-db-val', has_db_val );
                      });
                      ctrl.czr_isDirty.bind( function( is_dirty ) {
                            ctrl.container.toggleClass( 'is-dirty', is_dirty );
                      });
                }

                api.consoleLog( 'SETUP CONTROL VALUES ?', setId, ctrl.czr_hasDBVal(), api.czr_skope( api.czr_activeSkope() ).hasSkopeSettingDBValues( setId ) );
                ctrl.czr_hasDBVal(
                      api.czr_skope( api.czr_activeSkope() ).hasSkopeSettingDBValues( setId )
                );
                ctrl.czr_isDirty( api.czr_skope( api.czr_activeSkope() ).getSkopeSettingDirtyness( setId ) );

                if ( ! _.has( ctrl, 'czr_resetVisibility' ) ) {
                      ctrl.czr_resetVisibility = new api.Value(false);
                      ctrl.czr_resetVisibility.bind( function( visible ) {
                          self.controlResetVisibilityReact( visible, setId );
                      });
                }

                if ( ! _.has( ctrl, 'userEventMap' ) ) {
                      ctrl.userEventMap = [
                            {
                                  trigger   : 'click keydown',
                                  selector  : '.czr-setting-reset, .czr-cancel-button',
                                  name      : 'control_reset_warning',
                                  actions   : function() {
                                        if ( ! ctrl.czr_isDirty() && ! ctrl.czr_hasDBVal() )
                                          return;
                                        _.each( _.without( api.CZR_Helpers.getSectionControlIds( ctrl.section() ), setId ) , function( _id ) {
                                              if ( _.has( api.control(_id), 'czr_resetVisibility') )
                                                api.control(_id).czr_resetVisibility(false);
                                        });
                                        ctrl.czr_resetVisibility( ! ctrl.czr_resetVisibility() );
                                  }
                            },
                            {
                                  trigger   : 'click keydown',
                                  selector  : '.czr-control-do-reset',
                                  name      : 'control_do_reset',
                                  actions   : function() {
                                        self.doResetSetting( setId );
                                  }
                            }
                      ];
                      api.CZR_Helpers.setupDOMListeners( ctrl.userEventMap , { dom_el : ctrl.container }, self );
                }
          });
    },
    controlResetVisibilityReact : function( visible, setId ) {
          var self = this,
              ctrl = api.control( setId ),
              section_id = ctrl.section() || api.czr_activeSectionId();

          if ( visible ) {
                $.when( self.renderControlResetWarningTmpl(setId ) ).done( function( $_resetWarning ) {
                      ctrl.czr_resetWarning = $_resetWarning;
                      $_resetWarning.slideToggle('fast');
                });
          } else {
                if ( _.has( ctrl, 'czr_resetWarning' ) && ctrl.czr_resetWarning.length )
                      $.when( ctrl.czr_resetWarning.slideToggle('fast') ).done( function() {
                            ctrl.czr_resetWarning.remove();
                      });
          }

    },


    renderControlResetWarningTmpl : function( setId ) {
          var self = this,
              ctrl = api.control( setId ),
              _tmpl = '',
              warning_message,
              success_message;

          if ( ctrl.czr_isDirty() ) {
              warning_message = 'Are you sure you want to reset your current customizations for this control?';
              success_message = 'Your customizations have been reset.';
          } else {
              warning_message = 'Are you sure you want to reset this option to default?';
              success_message = 'The options have been reset to defaults.';
          }

          try {
            _tmpl =  wp.template('czr-reset-control')(
                {
                  warning_message : warning_message,
                  success_message : success_message
                }
            );
          }
          catch(e) {
            throw new Error('Error when parsing the the reset control template : ' + e );
          }

          $('.customize-control-title', ctrl.container).first().after( $( _tmpl ) );

          return $( '.czr-ctrl-reset-warning', ctrl.container );
    },
    doResetSetting : function( setId ) {
          var self = this,
              ctrl = api.control(setId),
              skope_id = api.czr_activeSkope(),
              reset_method = ctrl.czr_isDirty() ? '_resetControlDirtyness' : '_resetControlAPIVal',
              _do_reset = function( setId ) {
                    $.when(
                          self[reset_method](setId),
                          api.czr_skopeBase.silentlyUpdateSettings( setId )
                    ).done( function() {
                          $('.czr-reset-success', ctrl.container ).fadeIn('300');
                          api.previewer.refresh();
                          setTimeout( function() {
                              ctrl.container.removeClass('czr-resetting-control');//hides the spinner
                              ctrl.czr_resetVisibility(false);
                              self.setupControlsReset( { controls : [ setId ] } );
                          }, 2000 );
                    });

              };

          ctrl.container.addClass('czr-resetting-control');
          api.consoleLog('DO RESET SETTING', setId );

          if ( ctrl.czr_isDirty() ) {
                _do_reset( setId );
          } else {
                $.when( api.previewer.czr_reset( skope_id, setId ) ).done( function() {
                  _do_reset( setId );
                }).fail( function(response) {
                        $('.czr-reset-fail', ctrl.container ).fadeIn('300');
                        $('.czr-reset-fail', ctrl.container ).append('<p>' + response + '</p>');
                        setTimeout( function() {
                            ctrl.czr_resetVisibility(false);
                        }, 3000 );
                });
          }

    },

    _resetControlDirtyness : function( setId ) {
          var skope_instance = api.czr_skope( api.czr_activeSkope() ),
              current_dirties = skope_instance.dirtyValues(),
              new_dirties = $.extend( true, {}, current_dirties );

          new_dirties = _.omit( new_dirties, setId );
          skope_instance.dirtyValues( new_dirties );
          api.state('saved')( ! api.czr_skopeBase.isAPIDirty() );
    },

    _resetControlAPIVal : function( setId ) {
          var skope_model = api.czr_skope( api.czr_activeSkope() )(),
              new_skope_model = $.extend( true, {}, skope_model ),
              current_skope_db = new_skope_model.db,
              new_skope_db = $.extend( true, {}, current_skope_db ),
              shortSetId = api.CZR_Helpers.getOptionName(setId),
              reset_control_db_state = function( setId ) {
                    if ( _.has(api.control( setId ), 'czr_hasDBVal') )
                        api.control(setId).czr_hasDBVal(false);
              };

          if ( 'global' == skope_model.skope ) {
                _.each( api.czr_globalDBoptions(), function( _id ) {
                      if ( _id == shortSetId )
                        reset_control_db_state( setId );
                });
          } else {
                reset_control_db_state( setId );
          }

          api.consoleLog('SKOPE DB VAL AFTER RESET?', new_skope_db );
          new_skope_model.db = _.omit( new_skope_db, shortSetId );
          new_skope_model.has_db_val = ! _.isEmpty( new_skope_model.db );
          api.czr_skope( skope_model.id ).hasDBValues( new_skope_model.has_db_val );

          api.consoleLog('new_skope_model ?', new_skope_model );

          api.czr_skope( skope_model.id )( new_skope_model );
    },
    setupControlsInheritance : function( controls ) {
          var self = this,
              section_id = api.czr_activeSectionId();

          api.consoleLog('SETUP CONTROLS RESET ?', controls );
          controls = _.isUndefined( controls ) ? api.CZR_Helpers.getSectionControlIds( section_id  ) : controls;
          controls = _.isString( controls ) ? [controls] : controls;
          controls = _.filter( controls, function( setId ) {
              return self.isSettingSkopeEligible( setId );
          });

          if ( _.isEmpty(controls) )
            return;

          $.when( self.renderControlsSingleReset( controls ) ).done( function() {
                self.setupControlsValues( controls );
          });

    },


});//$.extend()

var CZRSkopeMths = CZRSkopeMths || {};

$.extend( CZRSkopeMths, {
    initialize: function( skope_id, constructor_options ) {
          var skope = this;
          api.Value.prototype.initialize.call( skope, null, constructor_options );

          skope.isReady = $.Deferred();
          skope.embedded = $.Deferred();
          skope.el = 'czr-scope-' + skope_id;//@todo replace with a css selector based on the scope name
          $.extend( skope, constructor_options || {} );
          skope.visible     = new api.Value(true);
          skope.winner      = new api.Value(false); //is this skope the one that will be applied on front end in the current context?
          skope.priority    = new api.Value(); //shall this skope always win or respect the default skopes priority
          skope.active      = new api.Value( false ); //active, inactive. Are we currently customizing this skope ?
          skope.dirtyness   = new api.Value( false ); //true or false : has this skope been customized ?
          skope.resetWarningVisible = new api.Value(false);
          skope.hasDBValues    = new api.Value(false);
          skope.dirtyValues = new api.Value({});//stores the current customized value.
          skope.userEventMap = new api.Value( [
                {
                  trigger   : 'click keydown',
                  selector  : '.czr-scope-switch',
                  name      : 'skope_switch',
                  actions   : function() {
                      api.czr_activeSkope( skope_id );
                  }
                },
                {
                  trigger   : 'click keydown',
                  selector  : '.czr-scope-reset',
                  name      : 'skope_reset_warning',
                  actions   : function() {
                      skope.resetWarningVisible( ! skope.resetWarningVisible() );
                  }
                }
          ]);//module.userEventMap
          skope.active.callbacks.add(function() { return skope.activeStateReact.apply(skope, arguments ); } );
          skope.dirtyness.callbacks.add(function() { return skope.dirtynessReact.apply(skope, arguments ); } );
          skope.hasDBValues.callbacks.add(function() { return skope.hasDBValuesReact.apply(skope, arguments ); } );
          skope.winner.callbacks.add(function() { return skope.winnerReact.apply(skope, arguments ); } );
          skope.resetWarningVisible.callbacks.add(function() { return skope.resetReact.apply(skope, arguments ); } );
          skope.dirtyValues.callbacks.add( function(to) {
              skope.dirtyness( ! _.isEmpty(to) );
          });
          skope.callbacks.add(function() { return skope.skopeReact.apply( skope, arguments ); } );
          skope( constructor_options );

          skope.isReady.done( function() {
          });
    },
    ready : function() {
          var skope = this;
          $.when( skope.embedSkopeDialogBox() ).done( function( $_container ){
              if ( false !== $_container.length ) {
                  skope.container = $_container;
                  skope.embedded.resolve();
              } else {
                  throw new Error('The container of skope ' + skope().id + ' has not been embededd');
              }
          });

          skope.embedded.done( function() {
              skope.setupDOMListeners( skope.userEventMap() , { dom_el : skope.container } );
              skope.visible.bind( function( is_visible ){
                  skope.container.toggle( is_visible );
              });
              skope.isReady.resolve();
          });
    },
    skopeReact : function( to, from ) {
          var skope = this,
              _current_collection = [],
              _new_collection = [];
          if ( ! api.czr_skopeBase.isSkopeRegisteredInCollection( to.id ) ) {
                _current_collection = $.extend( true, [], api.czr_skopeCollection() );
                _current_collection.push( to );
                api.czr_skopeCollection( _current_collection );
          }
          else {
                _current_collection = $.extend( true, [], api.czr_skopeCollection() );
                _new_collection = _current_collection;
                _.each( _current_collection, function( _skope, _key ) {
                    if ( _skope.id != skope().id )
                      return;
                    _new_collection[_key] = to;
                });
                api.czr_skopeCollection( _new_collection );
          }
          $.when( skope.embedded.promise() ).done( function() {
                skope.hasDBValues( to.has_db_val );
                skope.winner( to.is_winner );
          });
    },
    activeStateReact : function(to, from){
          var skope = this;
          skope.container.toggleClass('active', to);
          $('.czr-scope-switch', skope.container).toggleClass('fa-toggle-on', to).toggleClass('fa-toggle-off', !to);
    },
    dirtynessReact : function(to, from) {
          var skope = this;
          $.when( this.container.toggleClass('dirty', to) ).done( function() {
              if ( to )
                $( '.czr-scope-reset', skope.container).fadeIn('slow').attr('title', 'Reset the currently customized values');
              else if ( ! skope.hasDBValues() )
                $( '.czr-scope-reset', skope.container).fadeOut('fast');
          });
    },
    hasDBValuesReact : function(to, from) {
          var skope = this;
          $.when( skope.container.toggleClass('has-db-val', to ) ).done( function() {
              if ( to )
                $( '.czr-scope-reset', skope.container).fadeIn('slow').attr('title', 'Reset the saved values');
              else if ( ! skope.dirtyness() )
                $( '.czr-scope-reset', skope.container).fadeOut('fast');
          });
    },
    winnerReact : function( is_winner ) {
        var skope = this;
        this.container.toggleClass('is_winner', is_winner );

        if ( is_winner ) {
              _.each( api.czr_currentSkopesCollection(), function( _skope ) {
                    if ( _skope.id == skope().id )
                      return;
                    var _current_model = $.extend( true, {}, _skope );
                    $.extend( _current_model, { is_winner : false } );
                    api.czr_skope( _skope.id )( _current_model );
              });
        }
    },
    getDirties : function() {
          var skope = this,
              _dirtyCustomized = {};
          api.each( function ( value, setId ) {
              if ( value._dirty ) {
                _dirtyCustomized[ setId ] = value();
              }
          } );
          return _dirtyCustomized;
    },
    getSkopeSettingDirtyness : function( setId ) {
        var skope = this;
        return _.has( skope.dirtyValues(), api.CZR_Helpers.build_setId( setId ) );
    },
    hasSkopeSettingDBValues : function( setId ) {
        var skope = this,
            shortSetId = api.CZR_Helpers.getOptionName(setId);

        if ( 'global' == skope().skope ) {
          return _.contains( api.czr_globalDBoptions(), shortSetId );
        } else {
          return ! _.isUndefined( api.czr_skope( api.czr_activeSkope() )().db[shortSetId] );
        }
    }
  } );//$.extend(
var CZRSkopeMths = CZRSkopeMths || {};
$.extend( CZRSkopeMths, {
    embedSkopeDialogBox : function() {
          var skope = this,
              skope_model = $.extend( true, {}, skope() ),
              _tmpl = '';
          if ( ! $('#customize-header-actions').find('.czr-scope-switcher').length ) {
              throw new Error('The skope switcher wrapper is not printed, the skope can not be embedded.');
          }
          try {
            _tmpl =  wp.template('czr-skope')( _.extend( skope_model, { el : skope.el } ) );
          }
          catch(e) {
            throw new Error('Error when parsing the template of a skope' + e );
          }

          $('.czr-scope-switcher', '#customize-header-actions').append( $( _tmpl ) );
          return $( '.' + skope.el , '.czr-scope-switcher' );
    },
    renderResetWarningTmpl : function() {
          var skope = this,
              skope_model = $.extend( true, {}, skope() ),
              _tmpl = '',
              warning_message,
              success_message;

          if ( skope.dirtyness() ) {
              warning_message = 'Are you sure you want to reset your current customizations for skope : ' + skope().id + '?';
              success_message = 'Your customizations have been reset for skope ' + skope().id + '.';
          } else {
              warning_message = 'Are you sure you want to reset the options to defaults for skope : ' + skope().id + '?';
              success_message = 'The options have been reset to defaults for skope ' + skope().id + '.';
          }

          try {
            _tmpl =  wp.template('czr-reset-skope')(
                _.extend( skope_model, {
                  el : skope.el,
                  warning_message : warning_message,
                  success_message : success_message
                } )
            );
          }
          catch(e) {
            throw new Error('Error when parsing the the reset skope template : ' + e );
          }

          $('#customize-preview').after( $( _tmpl ) );

          return $( '#czr-reset-skope-pane' );
    },
    getEl : function() {
          var skope = this;
          return $( skope.el, '#customize-header-actions');
    }
});//$.extend()

var CZRSkopeMths = CZRSkopeMths || {};

$.extend( CZRSkopeMths, {
    resetReact : function( visible ) {
          var skope = this;
          if ( false !== api.czr_isResettingSkope() && skope().id != api.czr_isResettingSkope() )
            return;
          skope.userResetEventMap = skope.userResetEventMap || new api.Value( [
                {
                    trigger   : 'click keydown',
                    selector  : '.czr-scope-reset-cancel',
                    name      : 'skope_reset_cancel',
                    actions   : function() {
                        skope.resetWarningVisible( ! skope.resetWarningVisible() );
                    }
                },
                {
                    trigger   : 'click keydown',
                    selector  : '.czr-scope-do-reset',
                    name      : 'skope_do_reset',
                    actions   : 'doResetSkopeValues'
                }
            ]
          );

          if ( visible ) {
                api.czr_isResettingSkope( skope().id );
                $.when( skope.renderResetWarningTmpl() ).done( function( $_container ) {
                    skope.resetPanel = $_container;
                    skope.setupDOMListeners( skope.userResetEventMap() , { dom_el : skope.resetPanel } );
                }).then( function() {
                    setTimeout( function() {
                        var _height = $('#customize-preview').height();
                        skope.resetPanel.css( 'line-height', _height +'px' ).css( 'height', _height + 'px' );
                        $('body').addClass('czr-reset-skope-pane-open');

                    }, 50 );
                });
          } else {
                $.when( $('body').removeClass('czr-reset-skope-pane-open') ).done( function() {
                    if ( _.has( skope, 'resetPanel') && false !== skope.resetPanel.length ) {
                        setTimeout( function() {
                            skope.resetPanel.remove();
                            api.czr_isResettingSkope( false );
                        }, 300 );
                    }
                });
          }
    },
    doResetSkopeValues : function() {
          var skope = this,
              reset_method = skope.dirtyness() ? '_resetSkopeDirties' : '_resetSkopeAPIValues',
              _do_reset = function() {
                    $.when(
                          skope[reset_method](),
                          api.czr_skopeBase.silentlyUpdateSettings()
                    ).done( function() {
                          $('.czr-reset-success', skope.resetPanel ).fadeIn('300');
                          $('body').removeClass('czr-resetting-skope');//hide the spinner
                          api.previewer.refresh();
                          setTimeout( function() {
                              api.czr_isResettingSkope( false );
                              skope.resetWarningVisible(false);
                          }, 2000 );
                    });

              };

          $('body').addClass('czr-resetting-skope');
          $('.czr-reset-warning', skope.resetPanel ).hide();
          if ( skope.dirtyness() ) {
              _do_reset();
          } else {
              $.when( api.previewer.czr_reset( skope().id ) ).done( function() {
                    _do_reset();
              }).fail( function() {
                      $('.czr-reset-fail', skope.resetPanel ).fadeIn('300');
                      setTimeout( function() {
                          api.czr_isResettingSkope( false );
                          skope.resetWarningVisible(false);
                      }, 300 );
                });
          }
    },
    _resetSkopeDirties : function() {
          var skope = this;
          if ( api.czr_activeSkope() == skope().id ) {
              _.each( skope.dirtyValues(), function( _v, setId ) {
                    if ( _.has(api.control(setId), 'czr_isDirty') )
                      api.control(setId).czr_isDirty(false);
              });
          }
          skope.dirtyValues({});
          api.state('saved')( ! api.czr_skopeBase.isAPIDirty() );
    },
    _resetSkopeAPIValues : function() {
          var skope = this,
              current_model = $.extend( true, {}, skope() ),
              reset_control_db_state = function( shortSetId ) {
                    var wpSetId = api.CZR_Helpers.build_setId( shortSetId );
                    if ( _.has(api.control(wpSetId), 'czr_hasDBVal') )
                      api.control(wpSetId).czr_hasDBVal(false);
              };
          if ( api.czr_activeSkope() == skope().id ) {
                if ( 'global' == skope().skope ) {
                    _.each( api.czr_globalDBoptions(), function( shortSetId ) {
                        reset_control_db_state( shortSetId );
                    });
                } else {
                    _.each( skope().db, function( _v, shortSetId ) {
                        reset_control_db_state( shortSetId );
                    });
                }
          }
          $.extend( current_model, { db : {}, has_db_val : false } );
          api.czr_skope( skope().id )( current_model );
    }
  } );//$.extend(
(function (api, $, _) {
  if ( ! serverControlParams.isSkopOn )
    return;
  api.Value.prototype.set = function( to, o ) {
        var from = this._value;

        to = this._setter.apply( this, arguments );
        to = this.validate( to );
        if ( null === to || _.isEqual( from, to ) ) {
          return this;
        }

        this._value = to;
        this._dirty = true;

        this.callbacks.fireWith( this, [ to, from, o ] );

        return this;
  };
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
(function (api, $, _) {
  if ( serverControlParams.isSkopOn ) {
        api.czr_isPreviewerSkopeAware = $.Deferred();

        var _old_preview = api.Setting.prototype.preview;
        api.Setting.prototype.preview = function( to, from , o) {
            if ( 'pending' == api.czr_isPreviewerSkopeAware.state() )
              return this.previewer.refresh();
            if ( ! _.has(o, 'silent') || false === o.silent ) {
                _old_preview.call(this);
            }
        };
  }


  api.bind('ready', function() {
        if ( ! serverControlParams.isSkopOn )
          return;
        var _old_previewer_query = api.previewer.query;
        api.previewer.query =  function( query_params ) {
            query_params = query_params || {};
            if ( ! _.has( api, 'czr_skope') ) {
                api.consoleLog('QUERY : SKOPE IS NOT ON. FALLING BACK ON CORE QUERY');
                return _old_previewer_query.apply( this );
            }
            if ( 'pending' == api.czr_isPreviewerSkopeAware.state() ) {
                api.czr_isPreviewerSkopeAware.resolve();
            }

            if ( ! _.isObject( query_params ) ) {
                api.consoleLog('QUERY PARAMS : ', query_params );
                throw new Error( 'QUERY PARAMS MUST BE AN OBJECT.' );
            }
            if ( _.isUndefined( query_params.skope_id ) || ! _.isString( query_params.skope_id ) ) {
                query_params.skope_id = api.czr_activeSkope() || api.czr_skopeBase.getGlobalSkopeId();
            }

            var dirtyCustomized = {},
                default_params = {
                  skope_id : null,
                  action : null,
                  the_dirties : {},
                  dyn_type : null,
                  opt_name : null
                },
                _defaults = $.extend( true, {}, default_params );

            query_params = $.extend( _defaults, query_params );
            if ( ! _.isObject( query_params.the_dirties ) ) {
                api.consoleLog('QUERY PARAMS : ', query_params );
                throw new Error( 'QUERY DIRTIES MUST BE AN OBJECT. Requested action : ' + query_params.action );
            }
            if ( 'pending' != api.czr_isPreviewerSkopeAware.state() && _.isNull( query_params.skope_id ) ) {
                api.consoleLog('QUERY PARAMS : ', query_params );
                throw new Error( 'OVERRIDEN QUERY : NO SKOPE ID. FALLING BACK ON CORE QUERY. Requested action : ' + query_params.action );
            }
            if ( ! _.contains( [ null, 'refresh', 'save', 'reset' ], query_params.action ) ) {
                api.consoleLog('QUERY PARAMS : ', query_params );
                throw new Error( 'A REQUESTED QUERY HAS NO AUTHORIZED ACTION. Requested action : ' + query_params.action );
            }
            switch( query_params.action ) {
                case null :
                case 'refresh' :
                    if ( _.isNull( query_params.the_dirties ) || _.isEmpty( query_params.the_dirties ) ) {
                        api.each( function ( value, key ) {
                            if ( value._dirty ) {
                              dirtyCustomized[ key ] = value();
                            }
                        } );
                    } else {
                        dirtyCustomized = query_params.the_dirties;
                    }
                    dirtyCustomized = api.czr_skopeBase.applyDirtyCustomizedInheritance( dirtyCustomized, query_params.skope_id );

                break;

                case 'save' :
                    if ( _.isEmpty( query_params.the_dirties ) ) {
                      throw new Error( 'QUERY : A SAVE QUERY MUST HAVE A NOT EMPTY DIRTY OBJECT TO SUBMIT' );
                    }
                    if ( _.isNull( query_params.dyn_type ) )
                      query_params.dyn_type = api.czr_skope( query_params.skope_id )().dyn_type;//post_meta, term_meta, user_meta, trans, option
                    if ( _.isNull( query_params.dyn_type ) || _.isUndefined( query_params.dyn_type ) ) {
                      throw new Error( 'QUERY : A SAVE QUERY MUST HAVE A VALID DYN TYPE.' + query_params.skope_id );
                    }
                    dirtyCustomized = query_params.the_dirties; //was : api.czr_skope( skope_id ).dirtyValues();
                break;

                case 'reset' :
                    if ( _.isNull( query_params.dyn_type ) )
                      query_params.dyn_type = api.czr_skope( query_params.skope_id )().dyn_type;//post_meta, term_meta, user_meta, trans, option
                    if ( _.isNull( query_params.dyn_type ) || _.isUndefined( query_params.dyn_type ) ) {
                      throw new Error( 'QUERY : A RESET QUERY MUST HAVE A VALID DYN TYPE.' + query_params.skope_id );
                    }
                break;
            }
            return {
                wp_customize: 'on',
                skope :       api.czr_skope( query_params.skope_id )().skope,
                dyn_type:     query_params.dyn_type,
                opt_name:     ! _.isNull( query_params.opt_name ) ? query_params.opt_name : api.czr_skope( query_params.skope_id )().opt_name,
                obj_id:       api.czr_skope( query_params.skope_id )().obj_id,
                theme:        _wpCustomizeSettings.theme.stylesheet,
                customized:   JSON.stringify( dirtyCustomized ),
                nonce:        this.nonce.preview
            };
        };
  });//api.bind('ready')

})( wp.customize , jQuery, _ );
(function (api, $, _) {

  api.bind('ready', function() {
        if ( ! serverControlParams.isSkopOn )
          return;
        var _old_previewer_save = api.previewer.save;
        api.previewer.save = function() {
            var self = this,
                processing = api.state( 'processing' ),
                submitWhenDoneProcessing,
                submit,
                invalidSettings = [],
                invalidControls;

            $( document.body ).addClass( 'saving' );
            submit = function( params ) {
                var default_params = {
                      skope_id : null,
                      the_dirties : {},
                      dyn_type : null,
                      opt_name : null
                    },
                    _defaults = $.extend( true, {}, default_params );

                params = $.extend( _defaults, params );

                console.log('SAVE SUBMIT PARAMS', params );
                if ( _.isNull( params.skope_id ) ) {
                  throw new Error( 'OVERRIDEN SAVE::submit : MISSING skope_id');
                }
                if ( _.isNull( params.the_dirties ) ) {
                  throw new Error( 'OVERRIDEN SAVE::submit : MISSING the_dirties');
                }
                if ( _.isEmpty( params.the_dirties ) ) {
                  throw new Error( 'OVERRIDEN SAVE::submit : empty the_dirties');
                }
                var request, query;
                if ( _.has( api, 'Notification') ) {
                    api.each( function( setting ) {
                      setting.notifications.each( function( notification ) {
                        if ( 'error' === notification.type ) {
                          console.log('NOTIFICATION ERROR on SUBMIT SAVE' , notification );
                        }
                        if ( 'error' === notification.type && ( ! notification.data || ! notification.data.from_server ) ) {
                          invalidSettings.push( setting.id );
                        }
                      } );
                    } );
                    invalidControls = api.findControlsForSettings( invalidSettings );
                    if ( ! _.isEmpty( invalidControls ) ) {
                      _.values( invalidControls )[0][0].focus();
                      body.removeClass( 'saving' );
                      return;
                    }
                }
                var query_params = {
                      skope_id : params.skope_id,
                      action : 'save',
                      the_dirties : params.the_dirties,
                      dyn_type : params.dyn_type,
                      opt_name : params.opt_name
                };

                query = $.extend( self.query( query_params ), {
                    nonce:  self.nonce.save
                } );

                api.consoleLog('in submit : ', params.skope_id, query, api.previewer.channel() );

                request = wp.ajax.post( 'customize_save', query );

                api.trigger( 'save', request );

                request.fail( function ( response ) {
                    api.consoleLog('ALORS FAIL ?', params.skope_id, response );
                    if ( '0' === response ) {
                        response = 'not_logged_in';
                    } else if ( '-1' === response ) {
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
                    api.consoleLog('ALORS DONE ?', params.skope_id, response );
                } );
                return request;
              };//submit()



              var //skopeRequestDoneCollection = new api.Value( [] ),
                  dirtySkopesToSubmit = _.filter( api.czr_skopeCollection(), function( _skop ) {
                      return api.czr_skope( _skop.id ).dirtyness();
                  }),
                  _saved_dirties = {};//will be used as param to update the skope model db val after all ajx requests are done
              var submitDirtySkopes = function() {
                    var _skopeExcludedDirties = api.czr_skopeBase.getSkopeExcludedDirties();
                    var promises = [];
                    var globalSkopeId = api.czr_skopeBase.getGlobalSkopeId();
                    if ( ! _.isEmpty( _skopeExcludedDirties ) ) {
                        console.log('>>>>>>>>>>>>>>>>>>> submit request for _skopeExcludedDirties', _skopeExcludedDirties );
                        promises.push( submit( {
                              skope_id : globalSkopeId,
                              the_dirties : _skopeExcludedDirties,
                              dyn_type : 'wp_default_type'
                            })
                        );
                    }
                    _.each( dirtySkopesToSubmit, function( _skop ) {
                          var the_dirties = api.czr_skopeBase.getSkopeDirties( _skop.id );
                          api.consoleLog('submit request for skope : ', _skop, the_dirties );
                          promises.push( submit( {
                              skope_id : _skop.id,
                              the_dirties : the_dirties,
                              dyn_type : _skop.dyn_type
                            })
                          );
                    });
                    if ( ! api.czr_skopeBase.isExcludedSidebarsWidgets() ) {
                          _.each( dirtySkopesToSubmit, function( _skop ) {
                                if ( _skop.id == globalSkopeId )
                                  return;
                                console.log('>>>>>>>>>>>>>>>>>>> submit request for missing widgets globally', widget_dirties );
                                var widget_dirties = {};
                                var the_dirties = api.czr_skopeBase.getSkopeDirties( _skop.id );
                                _.each( the_dirties, function( _val, _setId ) {
                                    if ( 'widget_' == _setId.substring(0, 7) && ! api.czr_skopeBase.isWidgetRegisteredGlobally( _setId ) ) {
                                        if ( ! _.has( widget_dirties, _setId ) )
                                            widget_dirties[ _setId ] = _val;
                                    }
                                });


                                if ( ! _.isEmpty(widget_dirties) ) {
                                  promises.push( submit( {
                                      skope_id : globalSkopeId,
                                      the_dirties : widget_dirties,
                                      dyn_type : 'wp_default_type'
                                    } )
                                  );
                                }
                          });
                    }
                    _.each( dirtySkopesToSubmit, function( _skop ) {
                          if ( _skop.skope != 'global' )
                            return;
                          if ( _.isUndefined( serverControlParams.globalSkopeOptName) ) {
                            throw new Error('serverControlParams.globalSkopeOptName MUST BE DEFINED TO SAVE THE GLOBAL SKOPE.');
                          }
                          promises.push( submit( {
                              skope_id : globalSkopeId,
                              the_dirties : api.czr_skopeBase.getSkopeDirties( _skop.id ),
                              dyn_type : 'global_option',
                              opt_name : serverControlParams.globalSkopeOptName
                            } )
                          );
                    });

                    return promises;
              };




              var reactWhenPromisesDone = function( promises ) {
                    if ( _.isEmpty( promises ) ) {
                      console.log('THE SAVE PROMISES ARE EMPTY. PROBABLY BECAUSE THERE WAS ONLY EXCLUDED SKOPE SETTINGS TO SAVE', dirtySkopesToSubmit, api.czr_skopeBase.getSkopeExcludedDirties() );
                      return;
                    }

                    $.when.apply( null, promises).done( function( response ) {
                          console.log('>>>>>>>>>>>>>>>>', promises);
                          _.each( dirtySkopesToSubmit, function( _skp ) {
                                _saved_dirties[ _skp.id ] = api.czr_skopeBase.getSkopeDirties(_skp.id);
                                api.czr_skope(_skp.id).dirtyValues({});
                          });
                          api.each( function ( value ) {
                                value._dirty = false;
                          } );
                          $( document.body ).removeClass( 'saving' );
                          $( '#save' ).prop( 'disabled', false );

                          api.previewer.send( 'saved', response );
                          if ( response.setting_validities ) {
                              api._handleSettingValidities( {
                                  settingValidities: response.setting_validities,
                                  focusInvalidControl: true
                              } );
                          }


                          api.trigger( 'saved', response );
                    }).then( function() {
                          api.czr_savedDirties( { channel : api.previewer.channel() , saved : _saved_dirties });
                          api.czr_skopeBase.trigger('skopes-saved', _saved_dirties );
                    });//when()
              };


              if ( 0 === processing() ) {
                $.when( submitDirtySkopes() ).done( function( promises) {
                    reactWhenPromisesDone(promises);
                });//submit();
              } else {
                  submitWhenDoneProcessing = function () {
                      if ( 0 === processing() ) {
                          api.state.unbind( 'change', submitWhenDoneProcessing );
                          $.when( submitDirtySkopes() ).done( function( promises) {
                              reactWhenPromisesDone(promises);
                          });//submit();
                      }
                    };
                  api.state.bind( 'change', submitWhenDoneProcessing );
              }
        };//save()

  });//api.bind('ready')

})( wp.customize , jQuery, _ );
(function (api, $, _) {

  api.bind('ready', function() {
        if ( ! serverControlParams.isSkopOn )
          return;
        api.previewer.czr_reset = function( skope_id, setId ) {
              var self = this,
                  processing = api.state( 'processing' ),
                  submitWhenDoneProcessing,
                  submit_reset,
                  request,
                  query;

              $( document.body ).addClass( 'czr-resetting' );
              submit_reset = function( skope_id, setId ) {
                    if ( _.isUndefined( skope_id ) ) {
                      throw new Error( 'RESET::submit_reset : MISSING skope_id');
                    }
                    var query_params = {
                          skope_id : skope_id,
                          action : 'reset'
                    };
                    query = $.extend( self.query( query_params ), {
                        nonce:  self.nonce.save
                    } );
                    if ( ! _.isUndefined( setId ) && api.has(setId) ) {
                        $.extend( query , { set_id : setId } );
                        request = wp.ajax.post( 'czr_setting_reset', query );
                    } else {
                        request = wp.ajax.post( 'czr_skope_reset', query );
                    }

                    api.consoleLog('in czr_reset submit : ', skope_id, query );



                    request.fail( function ( response ) {
                          api.consoleLog('ALORS FAIL ?', skope_id, response );
                          if ( '0' === response ) {
                              response = 'not_logged_in';
                          } else if ( '-1' === response ) {
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
                          api.consoleLog('ALORS DONE ?', skope_id, response );

                    } );

                    request.always( function () {
                        $( document.body ).removeClass( 'czr-resetting' );
                    } );

              };//submit_reset()

              if ( 0 === processing() ) {
                    submit_reset( skope_id, setId );
              } else {
                    submitWhenDoneProcessing = function () {
                      if ( 0 === processing() ) {
                        api.state.unbind( 'change', submitWhenDoneProcessing );
                        submit_reset( skope_id, setId );
                      }
                    };
                    api.state.bind( 'change', submitWhenDoneProcessing );
              }

              return request;
        };//.czr_reset

  });//api.bind('ready')

})( wp.customize , jQuery, _ );
(function (api, $, _) {

  if ( ! serverControlParams.isSkopOn )
    return;
  api.Element.synchronizer.checkbox.update = function( to ) {
        this.element.prop( 'checked', to );
        this.element.iCheck('update');
  };

  api.Element.synchronizer.val.update = function(to) {
        if ( this.element.is('select') ) {
              this.element.val(to).trigger('change');
        } else if ( this.element.hasClass('wp-color-picker') ) {
              this.element.val(to).trigger('change');
        }
        else {
              this.element.val( to );
        }
  };

  api.Element.synchronizer.val.refresh = function() {
        var syncApiInstance = this;
        if ( this.element.is('select') && _.isNull( this.element.val() ) ) {
              if ( _.isArray( syncApiInstance() ) )
                return [];
              else if ( _.isObject( syncApiInstance() ) )
                return {};
              else
                return '';
        } else {
              return  this.element.val();
        }
  };
})( wp.customize , jQuery, _ );
(function (api, $, _) {

  api.bind('ready', function() {
        if ( ! serverControlParams.isSkopOn )
          return;
        api.previewer._new_refresh = function( the_dirties ) {
          if ( ! _.has( api, 'czr_activeSkope') || _.isUndefined( api.czr_activeSkope() ) ) {
            console.log( 'The api.czr_activeSkope() is undefined in the api.previewer._new_refresh() method.');
          }
          var self = this;
          this.send( 'loading-initiated' );

          this.abort();
          var query_params = {
              skope_id : api.czr_activeSkope(),
              action : 'refresh',
              the_dirties : the_dirties
          };

          this.loading = new api.PreviewFrame({
              url:        this.url(),
              previewUrl: this.previewUrl(),
              query:      this.query( query_params ) || {},
              container:  this.container,
              signature:  this.signature
          });

          this.loading.done( function() {
            this.bind( 'synced', function() {
              if ( self.preview )
                self.preview.destroy();
              self.preview = this;
              delete self.loading;

              self.targetWindow( this.targetWindow() );
              self.channel( this.channel() );

              self.deferred.active.resolve();
              self.send( 'active' );
            });

            this.send( 'sync', {
              scroll:   self.scroll,
              settings: api.get()
            });
          });

          this.loading.fail( function( reason, location ) {
            self.send( 'loading-failed' );
            if ( 'redirect' === reason && location ) {
              self.previewUrl( location );
            }

            if ( 'logged out' === reason ) {
              if ( self.preview ) {
                self.preview.destroy();
                delete self.preview;
              }

              self.login().done( self.refresh );
            }

            if ( 'cheatin' === reason ) {
              self.cheatin();
            }
          });
        };
        api.previewer.refresh = (function( self ) {
          var refresh  = self._new_refresh,
            callback = function() {
              timeout = null;
              refresh.call( self );
            },
            timeout;

          return function() {
            if ( typeof timeout !== 'number' ) {
              if ( self.loading ) {
                self.abort();
              } else {
                return callback();
              }
            }

            clearTimeout( timeout );
            timeout = setTimeout( callback, self.refreshBuffer );
          };
        })( api.previewer );

  });//api.bind('ready')

})( wp.customize , jQuery, _ );
(function (api, $, _) {
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
        getDocSearchLink : function( text ) {
                text = ! _.isString(text) ? '' : text;
                var _searchtext = text.replace( / /g, '+'),
                    _url = [ serverControlParams.docURL, 'search?query=', _searchtext ].join('');
                return [
                  '<a href="' + _url + '" title="' + serverControlParams.translatedStrings.readDocumentation + '" target="_blank">',
                  ' ',
                  '<span class="fa fa-question-circle-o"></span>'
                ].join('');
        },
        build_setId : function ( setId ) {
                if ( _.contains( serverControlParams.wpBuiltinSettings, setId ) )
                  return setId;
                if ( 'widget_' == setId.substring(0, 7) || 'nav_menu' == setId.substring(0, 8) || 'sidebars_' == setId.substring(0, 9) )
                  return setId;

                return -1 == setId.indexOf( serverControlParams.themeOptions ) ? [ serverControlParams.themeOptions +'[' , setId  , ']' ].join('') : setId;
        },
        getOptionName : function(name) {
              var self = this;
              if ( -1 == name.indexOf(serverControlParams.themeOptions) )
                return name;
              return name.replace(/\[|\]/g, '').replace(serverControlParams.themeOptions, '');
        },
        has_part_refresh : function( setId ) {
                if ( ! _.has( api, 'czr_partials')  )
                  return;
                return  _.contains( _.map( api.czr_partials(), function( partial, key ) {
                  return _.contains( partial.settings, setId );
                }), true );
        },
        getSectionControlIds : function( section_id ) {
                section_id = section_id || api.czr_activeSectionId();
                if ( ! api.section.has( section_id) )
                  return;
                var sec_ctrl = [];
                api.control.each( function( _ctrl ) {
                    if ( section_id == _ctrl.section() )
                      sec_ctrl.push( _ctrl.id );
                });
                return sec_ctrl;
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
                if ( _.isUndefined(string) )
                  return '';
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
        }

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
        setupDOMListeners : function( event_map , obj, instance ) {
                var control = this;
                instance = instance || control;
                _.map( event_map , function( _event ) {
                      if ( ! _.isString( _event.selector ) || _.isEmpty( _event.selector ) ) {
                        throw new Error( 'setupDOMListeners : selector must be a string not empty. Aborting setup of action(s) : ' + _event.actions.join(',') );
                      }
                      obj.dom_el.on( _event.trigger , _event.selector, function( e, event_params ) {
                            e.stopPropagation();
                            if ( api.utils.isKeydownButNotEnterEvent( e ) ) {
                              return;
                            }
                            e.preventDefault(); // Keep this AFTER the key filter above
                            var _obj = _.clone(obj);
                            if ( _.has(_obj, 'model') && _.has( _obj.model, 'id') ) {
                              if ( _.has(instance, 'get') )
                                _obj.model = instance();
                              else
                                _obj.model = instance.getModel( _obj.model.id );
                            }
                            $.extend( _obj, { event : _event, dom_event : e } );
                            $.extend( _obj, event_params );
                            control.executeEventActionChain( _obj, instance );
                      });//.on()

                });//_.map()
        },
        executeEventActionChain : function( obj, instance ) {
                var control = this;
                if ( ! _.has( obj, 'event' ) || ! _.has( obj.event, 'actions' ) ) {
                  throw new Error('executeEventActionChain : No obj.event or no obj.event.actions properties found');
                }
                if ( 'function' === typeof(obj.event.actions) )
                  return obj.event.actions(obj);
                if ( ! _.isArray(obj.event.actions) )
                  obj.event.actions = [ obj.event.actions ];
                var _break = false;
                _.map( obj.event.actions, function( _cb ) {

                  if ( _break )
                    return;

                  if ( 'function' != typeof( instance[_cb] ) ) {
                    throw new Error( 'executeEventActionChain : the action : ' + _cb + ' has not been found when firing event : ' + obj.event.selector );
                  }
                  var $_dom_el = ( _.has(obj, 'dom_el') && -1 != obj.dom_el.length ) ? obj.dom_el : control.container;

                  $_dom_el.trigger('before_' + _cb, _.omit( obj, 'event') );
                    var _cb_return = instance[_cb](obj);
                    if ( false === _cb_return )
                      _break = true;
                  $_dom_el.trigger('after_' + _cb, _.omit( obj, 'event') );

                });//_.map
        }
  });//$.extend
})( wp.customize , jQuery, _);
(function (api, $, _) {
  api.bind('ready', function() {
        api.previewer.bind('houston-widget-settings', function(data) {
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
              api.czr_widgetZoneSettings.set( {
                    actives :  data.renderedSidebars,
                    inactives :  _inactives,
                    registered :  _registered,
                    candidates :  _candidates,
                    available_locations :  data.availableWidgetLocations//built server side
              } );

        });

        api.previewer.bind( 'czr-wp-conditional-ready', function(data ) {
              api.czr_wp_conditionals.set( data );
        });

        api.previewer.bind( 'czr-partial-refresh', function(data) {
              api.czr_partials.set(data);
        });
        api.previewer.bind( 'czr-skopes-ready', function( data ) {
              if ( ! serverControlParams.isSkopOn )
                return;
              api.consoleLog('czr-skopes-ready DATA', data );
              var preview = this;
              if ( _.has(data, 'czr_skopes') )
                  api.czr_skopeBase.updateSkopeCollection( data.czr_skopes , preview.channel() );
              if ( _.has(data, 'skopeGlobalDBOpt') )
                  api.czr_globalDBoptions( data.skopeGlobalDBOpt );
        });
  });//api.bind('ready')
})( wp.customize , jQuery, _ );var CZRInputMths = CZRInputMths || {};
$.extend( CZRInputMths , {
    initialize: function( name, options ) {
            if ( _.isUndefined(options.item ) || _.isEmpty(options.item) ) {
              throw new Error('No item assigned to input ' + options.id + '. Aborting');
            }
            if ( _.isUndefined(options.module ) ) {
              throw new Error('No module assigned to input ' + options.id + '. Aborting');
            }

            api.Value.prototype.initialize.call( this, null, options );

            var input = this;
            $.extend( input, options || {} );
            input.isReady = $.Deferred();
            if ( ! _.isUndefined(options.input_value) )
              input.set(options.input_value);
            input.type_map = {
                  text : '',
                  textarea : '',
                  check : 'setupIcheck',
                  select : 'setupSelect',
                  upload : 'setupImageUploader',
                  color : 'setupColorPicker',
                  content_picker : 'setupContentPicker',
                  text_editor    : 'setupTextEditor',
                  password : ''
            };

            if ( _.has( input.type_map, input.type ) ) {
                    var _meth = input.type_map[input.type];
                    if ( _.isFunction(input[_meth]) )
                      input[_meth]();
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
                      selector  : 'input[data-type], select[data-type], textarea[data-type]',
                      name      : 'set_input_value',
                      actions   : function( obj ) {
                          if ( ! _.has( input.item, 'syncElements') || ! _.has( input.item.syncElements, input.id ) ) {
                              throw new Error('WARNING : THE INPUT ' + input.id + ' HAS NO SYNCED ELEMENT.');
                          }
                      }//was 'updateInput'
                    }
            ];
    },
    ready : function() {
            var input = this;
            input.setupDOMListeners( input.input_event_map , { dom_el : input.container }, input );
            input.callbacks.add( function() { return input.inputReact.apply(input, arguments ); } );
            $.when( input.setupSynchronizer() ).done( function() {
                  input.isReady.resolve( input );
            } );

    },
    setupSynchronizer: function() {
          var input       = this,
              item        = input.item,
              $_input_el  = input.container.find('[data-type]'),
              is_textarea = input.container.find('[data-type]').is('textarea');
          if ( is_textarea ) {
            throw new Error('TO DO : THE TEXTAREA INPUT ARE NOT READY IN THE SYNCHRONIZER!');
          }

          var syncElement = new api.Element( $_input_el );
          item.syncElements = item.syncElements || {};
          item.syncElements[input.id] = syncElement;//adds the input syncElement to the collection
          syncElement.sync( input );//sync with the input instance
          syncElement.set( input() );
    },
    inputReact : function( to, from) {
            var input = this,
                _current_item = input.item(),
                _new_model        = _.clone( _current_item );//initialize it to the current value
            _new_model =  ( ! _.isObject(_new_model) || _.isEmpty(_new_model) ) ? {} : _new_model;
            _new_model[input.id] = to;
            input.item.set(_new_model);

            if ( ! _.has( input, 'is_preItemInput' ) ) {
              input.item.trigger( input.id + ':changed', to );
            }
    }
});//$.extend
var CZRInputMths = CZRInputMths || {};
$.extend( CZRInputMths , {
    setupImageUploader : function() {
          var input        = this,
              _model       = input();
          input.attachment   = {};
          if ( ! input.container )
            return this;

          this.contentRendered = $.Deferred();
          this.setupContentRendering( _model, {} );
          this.contentRendered.done( function(){
            input.czrImgUploaderBinding();
          });
  },

  setupContentRendering : function( to, from) {
        var input = this;
        if ( ( input.attachment.id != to ) && from !== to ) {
              if ( ! to ) {
                input.attachment = {};
                input.renderImageUploaderTemplate();
              }
              wp.media.attachment( to ).fetch().done( function() {
                input.attachment       = this.attributes;
                input.renderImageUploaderTemplate();
              });
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
              input.contentRendered = $.Deferred();
              input.setupContentRendering(to,from);
        });
  },
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
  czrImgUploadInitFrame: function() {
        var input = this;

        var button_labels = this.getUploaderLabels();

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
  czrImgUploadRemoveFile: function( event ) {
        var input = this;

        if ( api.utils.isKeydownButNotEnterEvent( event ) ) {
          return;
        }
        event.preventDefault();
        input.attachment = {};
        input.set('');
  },
  czrImgUploadSelect: function() {
        var node,
            input = this,
            attachment   = input.frame.state().get( 'selection' ).first().toJSON(),  // Get the attachment from the modal frame.
            mejsSettings = window._wpmejsSettings || {};
        input.attachment = attachment;
        input.set(attachment.id);
  },
  renderImageUploaderTemplate: function() {
        var input  = this;
        if ( 0 === $( '#tmpl-czr-input-img-uploader-view-content' ).length )
          return;

        var view_template = wp.template('czr-input-img-uploader-view-content');
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

        input.contentRendered.resolve();
        input.container.trigger( input.id + ':content_rendered' );

        return true;
  },

  getUploaderLabels : function() {
        var _ts = serverControlParams.translatedStrings,
            _map = {
            'select'      : _ts.select_image,
            'change'      : _ts.change_image,
            'remove'      : _ts.remove_image,
            'default'     : _ts.default_image,
            'placeholder' : _ts.placeholder_image,
            'frame_title' : _ts.frame_title_image,
            'frame_button': _ts.frame_button_image
        };
        _.each( _map, function( ts_string, key ) {
          if ( _.isUndefined( ts_string ) ) {
            var input = this;
            throw new Error( 'A translated string is missing ( ' + key + ' ) for the image uploader input in module : ' + input.module.id );
          }
        } );

        return _map;
  }
});//$.extendvar CZRInputMths = CZRInputMths || {};
$.extend( CZRInputMths , {
    setupColorPicker : function() {
        var input  = this;

        input.container.find('input').wpColorPicker( {
            change : function( e, o ) {
                  $(this).val( $(this).wpColorPicker('color') ).trigger('colorpickerchange').trigger('change');
            }
        });
    }
});//$.extendvar CZRInputMths = CZRInputMths || {};
$.extend( CZRInputMths , {
    setupSelect : function() {
        var input = this;
        $('select', input.container ).not('.no-selecter-js')
          .each( function() {
            $(this).selecter({
            });
        });
    }
});//$.extend/* Fix caching, select2 default one seems to not correctly work, or it doesn't what I think it should */
var CZRInputMths = CZRInputMths || {};
$.extend( CZRInputMths , {
  setupContentPicker: function() {
          var input  = this,
          _event_map = [];
          input.object = ['post']; //this.control.params.object_types  - array('page', 'post')
          input.type   = 'post_type'; //this.control.params.type  - post_type
          input.container.find('.czr-input').append('<select data-select-type="content-picker-select" class="js-example-basic-simple"></select>');
          _event_map = [
              {
                trigger   : 'change',
                selector  : 'select[data-select-type]',
                name      : 'set_input_value',
                actions   : 'updateContentPickerModel'
              }
          ];

          input.setupDOMListeners( _event_map , { dom_el : input.container }, input );
          input.setupContentSelecter();
  },

  setupContentSelecter : function() {
          var input = this;

          input.container.find('select').select2({
            placeholder: {
              id: '-1', // the value of the option
              title: 'Select'
            },
            data : input.setupSelectedContents(),
            ajax: {
                  url: serverControlParams.AjaxUrl,
                  type: 'POST',
                  dataType: 'json',
                  delay: 250,
                  debug: true,
                  data: function ( params ) {
                        var page = params.page ? params.page - 1 : 0;
                        page = params.term ? params.page : page;
                        return {
                              action: params.term ? "search-available-content-items-customizer" : "load-available-content-items-customizer",
                              search: params.term,
                              wp_customize: 'on',
                              page: page,
                              type: input.type,
                              object: input.object,
                              CZRCpNonce: serverControlParams.CZRCpNonce
                        };
              },
              processResults: function (data, params) {
                    if ( ! data.success )
                      return { results: [] };

                    var items   = data.data.items,
                        _results = [];

                    _.each( items, function( item ) {
                      _results.push({
                        id          : item.id,
                        title       : item.title,
                        type_label  : item.type_label,
                        object_type : item.object
                      });
                    });
                    return {
                      results: _results,
                      pagination: { more: data.data.items.length == 10 }
                    };
              },
            },
            templateSelection: input.czrFormatContentSelected,
            templateResult: input.czrFormatContentSelected,
            escapeMarkup: function (markup) { return markup; },
         });
  },


  czrFormatContentSelected: function (item) {
          if ( item.loading ) return item.text;
          var markup = "<div class='content-picker-item clearfix'>" +
            "<div class='content-item-bar'>" +
              "<span class='item-title'>" + item.title + "</span>";

          if ( item.type_label ) {
            markup += "<span class='item-type'>" + item.type_label + "</span>";
          }

          markup += "</div></div>";

          return markup;
  },

  setupSelectedContents : function() {
        var input = this,
           _model = input();

        return _model;
  },

  updateContentPickerModel: function( obj ){
        var input = this,
            $_changed_input   = $(obj.dom_event.currentTarget, obj.dom_el ),
            _new_val          = $( $_changed_input, obj.dom_el ).select2('data');
        if ( _new_val.length ) {
          _new_val = _.map( _new_val, function( _item ){
            return {
              'id'          :  _item.id,
              'type_label'  :  _item.type_label,
              'title'       :  _item.title,
              'object_type' :  _item.object_type
            };
          });
        }

        input.set(_new_val);
        return;
  }
});//$.extend
var CZRInputMths = CZRInputMths || {};
$.extend( CZRInputMths , {
    setupTextEditor : function() {
          var input        = this,
              _model       = input();
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
          input.editorExpanded   = new api.Value( false );
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
          input.module.czr_ModuleState.bind(
            function( state ) {
              if ( 'expanded' != state )
                input.editorExpanded.set( false );
          });

          input.editorExpanded.bind( function (expanded) {

                api.consoleLog('in input.editorExpanded', expanded, input() );
                if ( editor.locker && editor.locker !== input ) {
                    editor.locker.editorExpanded.set(false);
                    editor.locker = null;
                }if ( ! editor.locker || editor.locker === input ) {
                    $(document.body).toggleClass('czr-customize-content_editor-pane-open', expanded);
                    editor.locker = input;
                }
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
          value = input_model.replace(/(<([^>]+)>)/ig,"");
          if ( value.length > 30 )
            value = value.substring(0, 34) + '...';

          input.textpreview.val( value );
  },
  czrRenderInputTextEditorTemplate: function() {
          var input  = this;
          if ( 0 === $( '#tmpl-czr-input-text_editor-view-content' ).length ) {
              throw new Error('Missing js template for text editor input in module : ' + input.module.id );
          }

          var view_template = wp.template('czr-input-text_editor-view-content'),
                  $_view_el = input.container.find('input');
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

          input.toggleButton.text( serverControlParams.translatedStrings[ ! $_expanded ? 'textEditorOpen' : 'textEditorClose' ] );
  }
});//$.extend//extends api.Value
var CZRItemMths = CZRItemMths || {};
$.extend( CZRItemMths , {
  initialize: function( id, options ) {
        if ( _.isUndefined(options.module) || _.isEmpty(options.module) ) {
          throw new Error('No module assigned to item ' + id + '. Aborting');
        }

        var item = this;
        api.Value.prototype.initialize.call( item, null, options );
        item.isReady = $.Deferred();
        item.embedded = $.Deferred();
        item.contentRendered = $.Deferred();
        $.extend( item, options || {} );
        item.defaultItemModel = _.clone( options.defaultItemModel ) || { id : '', title : '' };
        var _initial_model = $.extend( item.defaultItemModel, options.initial_item_model );
        item.set( _initial_model );
        item.userEventMap = new api.Value( [
              {
                trigger   : 'click keydown',
                selector  : [ '.' + item.module.control.css_attr.display_alert_btn, '.' + item.module.control.css_attr.cancel_alert_btn ].join(','),
                name      : 'toggle_remove_alert',
                actions   : ['toggleRemoveAlertVisibility']
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
                actions   : ['setViewVisibility']
              }
        ]);
        item.isReady.done( function() {
              item.module.updateItemsCollection( { item : item() } );
              item.callbacks.add( function() { return item.itemReact.apply(item, arguments ); } );
              item.mayBeRenderItemWrapper();
              item.embedded.done( function() {
                    item.itemWrapperViewSetup( _initial_model );
              });
              item.contentRendered.done( function() {
                    if ( ! _.has(item, 'czr_Input') )
                      item.setupInputCollectionFromDOM();
              });

        });//item.isReady.done()

  },//initialize
  ready : function() {
        this.isReady.resolve();
  },
  itemReact : function( to, from ) {
        var item = this,
            module = item.module;
        module.updateItemsCollection( {item : to });
        item.writeItemViewTitle(to);
        if ( ! _.isEmpty(from) || ! _.isUndefined(from) ) {
          api.consoleLog('DO WE REALLY NEED TO SEND THIS TO THE PREVIEW WITH _sendItem(to, from) ?');
          item._sendItem(to, from);
        }
  },


});//$.extend//extends api.Value
var CZRItemMths = CZRItemMths || {};
$.extend( CZRItemMths , {
  setupInputCollectionFromDOM : function() {
        var item = this,
            module = item.module;
        item.czr_Input = new api.Values();
        item.inputConstructor = module.inputConstructor;

        if ( _.isEmpty(item.defaultItemModel) || _.isUndefined(item.defaultItemModel) ) {
          throw new Error('No default model found in item ' + item.id + '. Aborting');
        }
        var item_model = $.extend( true, {}, item() );

        if ( ! _.isObject( item_model ) )
          item_model = item.defaultItemModel;
        else
          item_model = $.extend( item.defaultItemModel, item_model );

        var dom_item_model = {};
        $( '.' + module.control.css_attr.sub_set_wrapper, item.container).each( function( _index ) {
              var _id = $(this).find('[data-type]').attr('data-type'),
                  _value = _.has( item_model, _id) ? item_model[_id] : '';
              if ( _.isUndefined( _id ) || _.isEmpty( _id ) )
                return;
              if ( ! _.has( item_model, _id ) ) {
                    throw new Error('The item property : ' + _id + ' has been found in the DOM but not in the item model : '+ item.id + '. The input can not be instantiated.');
              }
              item.czr_Input.add( _id, new item.inputConstructor( _id, {
                    id : _id,
                    type : $(this).attr('data-input-type'),
                    input_value : _value,
                    container : $(this),
                    item : item,
                    module : module
              } ) );
              item.czr_Input(_id).ready();
              dom_item_model[_id] = _value;

        });//each
  },


  removeInputCollection : function() {
        var item = this;
        item.czr_Input.each( function( input ) {
            item.czr_Input.remove( input.id );
        });
  }


});//$.extend//extends api.CZRBaseControl
var CZRItemMths = CZRItemMths || {};

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
                module.control.previewer.send( 'sub_setting', {
                      set_id : module.control.id,
                      id : to.id,
                      changed_prop : _prop,
                      value : to[_prop]
                });
                module.trigger('item_sent', { item : to , dom_el: item.container, changed_prop : _prop } );
          });
    },
    removeItem : function() {
            var item = this,
                module = this.module,
                _new_collection = _.clone( module.itemCollection() );
            module.trigger('pre_item_dom_remove', item() );
            item._destroyView();
            _new_collection = _.without( _new_collection, _.findWhere( _new_collection, {id: item.id }) );
            module.itemCollection.set( _new_collection );
            module.trigger('pre_item_api_remove', item() );
            module.czr_Item.remove(item.id);
    },
    getModel : function(id) {
            return this();
    }

  });//$.extend
var CZRItemMths = CZRItemMths || {};

$.extend( CZRItemMths , {
  mayBeRenderItemWrapper : function() {
        var item = this;

        if ( 'pending' != item.embedded.state() )
          return;

        $.when( item.renderItemWrapper() ).done( function( $_container ) {
              item.container = $_container;
              if ( _.isUndefined(item.container) || ! item.container.length ) {
                  throw new Error( 'In mayBeRenderItemWrapper the Item view has not been rendered : ' + item.id );
              } else {
                  item.embedded.resolve();
              }
        });
  },
  itemWrapperViewSetup : function( item_model ) {
          var item = this,
              module = this.module;

          item_model = item() || item.initial_item_model;//could not be set yet
          item.czr_ItemState = new api.Value();
          item.czr_ItemState.set('closed');
          item.writeItemViewTitle();
          var _updateItemContentDeferred = function( $_content, to, from ) {
                if ( ! _.isUndefined( $_content ) && false !== $_content.length ) {
                    item.contentRendered.resolve();
                    item.toggleItemExpansion(to, from );
                }
                else {
                    throw new Error( 'Module : ' + item.module.id + ', the item content has not been rendered for ' + item.id );
                }
          };

          if ( item.module.isMultiItem() ) {
                item.czr_ItemState.callbacks.add( function( to, from ) {
                      if ( 'resolved' == item.contentRendered.state() ) {
                          item.toggleItemExpansion(to, from );
                          return;
                      }

                      $.when( item.renderItemContent( item_model ) ).done( function( $_item_content ) {
                            _updateItemContentDeferred = _.debounce(_updateItemContentDeferred, 400 );
                            _updateItemContentDeferred( $_item_content, to, from );
                      });
                });
          } else {
                item.czr_ItemState.callbacks.add( function( to, from ) {
                    item.toggleItemExpansion.apply(item, arguments );
                });
                $.when( item.renderItemContent( item_model ) ).done( function( $_item_content ) {
                      _updateItemContentDeferred( $_item_content, true );
                });
          }
          api.CZR_Helpers.setupDOMListeners(
                item.userEventMap(),//actions to execute
                { model:item_model, dom_el:item.container },//model + dom scope
                item //instance where to look for the cb methods
          );
  },
  renderItemWrapper : function( item_model ) {
        var item = this,
            module = item.module;

        item_model = item_model || item();
        $_view_el = $('<li>', { class : module.control.css_attr.single_item, 'data-id' : item_model.id,  id : item_model.id } );
        module.itemsWrapper.append( $_view_el );
        if ( module.isMultiItem() ) {
              var _template_selector = module.getTemplateEl( 'rudItemPart', item_model );
              if ( 0 === $( '#tmpl-' + _template_selector ).length ) {
                  throw new Error('Missing template for item ' + item.id + '. The provided template script has no been found : #tmpl-' + module.getTemplateEl( 'rudItemPart', item_model ) );
              }
              $_view_el.append( $( wp.template( _template_selector )( item_model ) ) );
        }
        $_view_el.append( $( '<div/>', { class: module.control.css_attr.item_content } ) );

        return $_view_el;
  },
  renderItemContent : function( item_model ) {
          var item = this,
              module = this.module;

          item_model = item_model || item();
          if ( 0 === $( '#tmpl-' + module.getTemplateEl( 'itemInputList', item_model ) ).length ) {
              throw new Error('No item content template defined for module ' + module.id + '. The template script id should be : #tmpl-' + module.getTemplateEl( 'itemInputList', item_model ) );
          }

          var  item_content_template = wp.template( module.getTemplateEl( 'itemInputList', item_model ) );
          if ( ! item_content_template )
            return this;
          $( item_content_template( item_model )).appendTo( $('.' + module.control.css_attr.item_content, item.container ) );

          return $( $( item_content_template( item_model )), item.container );
  },
  writeItemViewTitle : function( item_model ) {
        var item = this,
            module = item.module,
            _model = item_model || item(),
            _title = _.has( _model, 'title')? api.CZR_Helpers.capitalize( _model.title ) : _model.id;

        _title = api.CZR_Helpers.truncate(_title, 20);
        $( '.' + module.control.css_attr.item_title , item.container ).text(_title );
        api.CZR_Helpers.doActions('after_writeViewTitle', item.container , _model, item );
  },
  setViewVisibility : function( obj, is_added_by_user ) {
          var item = this,
              module = this.module;
          if ( is_added_by_user ) {
                item.czr_ItemState.set( 'expanded_noscroll' );
          } else {
                module.closeAllItems( item.id );
                if ( _.has(module, 'preItem') ) {
                  module.preItemExpanded.set(false);
                }
                item.czr_ItemState.set( 'expanded' == item._getViewState() ? 'closed' : 'expanded' );
          }
  },


  _getViewState : function() {
          return -1 == this.czr_ItemState().indexOf('expanded') ? 'closed' : 'expanded';
  },
  toggleItemExpansion : function( status, from, duration ) {
          var item = this,
              module = this.module;
          $( '.' + module.control.css_attr.item_content , item.container ).first().slideToggle( {
                duration : duration || 200,
                done : function() {
                      var _is_expanded = 'closed' != status;
                      item.container.toggleClass('open' , _is_expanded );
                      module.closeAllAlerts();
                      var $_edit_icon = $(this).siblings().find('.' + module.control.css_attr.edit_view_btn );

                      $_edit_icon.toggleClass('active' , _is_expanded );
                      if ( _is_expanded )
                        $_edit_icon.removeClass('fa-pencil').addClass('fa-minus-square').attr('title', serverControlParams.translatedStrings.close );
                      else
                        $_edit_icon.removeClass('fa-minus-square').addClass('fa-pencil').attr('title', serverControlParams.translatedStrings.edit );
                      if ( 'expanded' == status )
                        module._adjustScrollExpandedBlock( item.container );
                }//done callback
          } );
  },
  toggleRemoveAlertVisibility : function(obj) {
          var item = this,
              module = this.module,
              $_alert_el = $( '.' + module.control.css_attr.remove_alert_wrapper, item.container ).first(),
              $_clicked = obj.dom_event;
          module.closeAllItems();

          if ( _.has(module, 'preItem') ) {
              module.preItemExpanded.set(false);
          }
          $('.' + module.control.css_attr.remove_alert_wrapper, item.container ).not($_alert_el).each( function() {
                if ( $(this).hasClass('open') ) {
                      $(this).slideToggle( {
                            duration : 200,
                            done : function() {
                                  $(this).toggleClass('open' , false );
                                  $(this).siblings().find('.' + module.control.css_attr.display_alert_btn).toggleClass('active' , false );
                            }
                      } );
                }
          });
          if ( ! wp.template( module.AlertPart )  || ! item.container ) {
              throw new Error( 'No removal alert template available for items in module :' + module.id );
          }

          $_alert_el.html( wp.template( module.AlertPart )( { title : ( item().title || item.id ) } ) );
          $_alert_el.slideToggle( {
                duration : 200,
                done : function() {
                      var _is_open = ! $(this).hasClass('open') && $(this).is(':visible');
                      $(this).toggleClass('open' , _is_open );
                      $( obj.dom_el ).find('.' + module.control.css_attr.display_alert_btn).toggleClass( 'active', _is_open );
                      if ( _is_open )
                        module._adjustScrollExpandedBlock( item.container );
                }
          } );
  },
  _destroyView : function ( duration ) {
          this.container.fadeOut( {
              duration : duration ||400,
              done : function() {
                $(this).remove();
              }
          });
  },
});//$.extend
var CZRModuleMths = CZRModuleMths || {};

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
              crudModulePart : 'czr-crud-module-part',
              rudItemPart : 'czr-rud-item-part',//read, update, delete
              ruItemPart : 'czr-ru-item-part',//read, update
              itemInputList : '',//is specific for each crud module
              AlertPart : 'czr-rud-item-alert-part',//used both for items and modules removal

        } );
        module.embedded = $.Deferred();
        if ( ! module.isInSektion() ) {
              module.container = $( module.control.selector );
              module.embedded.resolve();
        }
        module.embedded.done( function() {
              $.when( module.renderModuleParts() ).done(function( $_module_items_wrapper ){
                    if ( false === $_module_items_wrapper.length ) {
                        throw new Error( 'The items wrapper has not been rendered for module : ' + module.id );
                    }
                    module.itemsWrapper = $_module_items_wrapper;
              });
        });
        module.itemCollection = new api.Value();
        module.itemCollection.set([]);
        module.defaultAPIitemModel = {
              id : '',
              initial_item_model : {},
              defaultItemModel : {},
              control : {},//control instance
              module : {},//module instance
              is_added_by_user : false
        };
        module.defaultItemModel = { id : '', title : '' };
        module.itemConstructor = api.CZRItem;
        module.czr_Item = new api.Values();
        module.inputConstructor = api.CZRInput;
        module.isReady.done( function() {
              module.isDirty = new api.Value( constructorOptions.dirty || false );
              module.set( module.initializeModuleModel( constructorOptions ) );
              module.callbacks.add( function() { return module.moduleReact.apply(module, arguments ); } );
              if (  ! module.control.isModuleRegistered( module.id ) ) {
                  module.control.updateModulesCollection( { module : constructorOptions, is_registered : false } );
              }

              module.bind('items-collection-populated', function( collection ) {
                    module.itemCollection.callbacks.add( function() { return module.itemCollectionReact.apply(module, arguments ); } );
                    if ( module.isMultiItem() )
                      module._makeItemsSortable();

                    api.consoleLog('SAVED ITEM COLLECTION OF MODULE ' + module.id + ' IS READY');
              });
              if ( ! module.isInSektion() )
                module.populateSavedItemCollection();
        });
  },
  ready : function() {
        var module = this;
        module.isReady.resolve();
        api.consoleLog('MODULE READY IN BASE MODULE CLASS : ', module.id );
  },
  initializeModuleModel : function( constructorOptions ) {
        var module = this;
        if ( ! module.isMultiItem() && ! module.isCrud() ) {
              if ( _.isEmpty( constructorOptions.items ) ) {
                    var def = _.clone( module.defaultItemModel );
                    constructorOptions.items = [ $.extend( def, { id : module.id } ) ];
              }
        }
        return constructorOptions;
  },
  itemCollectionReact : function( to, from, o ) {
        var module = this,
            _current_model = module(),
            _new_model = $.extend( true, {}, _current_model );
        _new_model.items = to;
        module.isDirty.set(true);
        module.set( _new_model, o || {} );
  },
  moduleReact : function( to, from, o ) {
        var module            = this,
            control           = module.control,
            is_item_update    = ( _.size(from.items) == _.size(to.items) ) && ! _.isEmpty( _.difference(to.items, from.items) ),
            is_column_update  = to.column_id != from.column_id,
            is_item_collection_sorted = _.has( o, 'item_collection_sorted' ) && o.item_collection_sorted,
            refreshPreview    = function() {
                module.control.previewer.refresh();
            };
        if ( is_item_collection_sorted ) {
              if ( _.has(module, 'preItem') ) {
                module.preItemExpanded.set(false);
              }
              module.closeAllItems();
              module.closeAllAlerts();
        }
        if ( 'postMessage' == api(module.control.id).transport && is_item_collection_sorted && ! api.CZR_Helpers.has_part_refresh( module.control.id ) ) {
              refreshPreview = _.debounce( refreshPreview, 500 );//500ms are enough
              refreshPreview();
        }
        control.updateModulesCollection( {
              module : $.extend( true, {}, to ),
              data : o//useful to pass contextual info when a change happens
        } );
  },
  getModuleSection : function() {
        return this.section;
  },
  isInSektion : function() {
        var module = this;
        return _.has( module, 'sektion_id' );
  },
  isMultiItem : function() {
        return api.CZR_Helpers.isMultiItemModule( null, this );
  },
  isCrud : function() {
        return api.CZR_Helpers.isCrudModule( null, this );
  }
});//$.extend//CZRBaseControlMths//MULTI CONTROL CLASS

var CZRModuleMths = CZRModuleMths || {};

$.extend( CZRModuleMths, {
  populateSavedItemCollection : function() {
          var module = this;
          if ( ! _.isArray( module().items ) ) {
              throw new Error( 'The saved items collection must be an array in module :' + module.id );
          }
          _.each( module().items, function( item_candidate , key ) {
                module.instantiateItem( item_candidate ).ready();
          });
          _.each( module().items, function( _item ) {
                if ( _.isUndefined( _.findWhere( module.itemCollection(), _item.id ) ) ) {
                  throw new Error( 'The saved items have not been properly populated in module : ' + module.id );
                }
          });

          module.trigger('items-collection-populated');
  },


  instantiateItem : function( item, is_added_by_user ) {
          var module = this;
          item_candidate = module.prepareItemForAPI( item );
          if ( ! _.has( item,'id') ) {
            throw new Error('CZRModule::instantiateItem() : an item has no id and could not be added in the collection of : ' + this.id );
          }
          if ( module.czr_Item.has( item_candidate.id ) ) {
              throw new Error('CZRModule::instantiateItem() : the following item id ' + item_candidate.id + ' already exists in module.czr_Item() for module ' + this.id  );
          }
          module.czr_Item.add( item_candidate.id, new module.itemConstructor( item_candidate.id, item_candidate ) );

          if ( ! module.czr_Item.has( item_candidate.id ) ) {
              throw new Error('CZRModule::instantiateItem() : instantiation failed for item id ' + item_candidate.id + ' for module ' + this.id  );
          }
          return module.czr_Item( item_candidate.id );
  },
  prepareItemForAPI : function( item_candidate ) {
          var module = this,
              api_ready_item = {};
          if ( ! _.isObject( item_candidate ) ) {
                throw new Error('prepareitemForAPI : a item must be an object to be instantiated.');
            }

          _.each( module.defaultAPIitemModel, function( _value, _key ) {
                var _candidate_val = item_candidate[_key];
                switch( _key ) {
                      case 'id' :
                          if ( _.isEmpty( _candidate_val ) ) {
                              api_ready_item[_key] = module.generateItemId( module.module_type );
                          } else {
                              api_ready_item[_key] = _candidate_val;
                          }
                      break;
                      case 'initial_item_model' :
                          _.each( module.getDefaultModel() , function( _value, _property ) {
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
          api_ready_item.initial_item_model.id = api_ready_item.id;

          return api_ready_item;
  },
  generateItemId : function( module_type, key, i ) {
          i = i || 1;
          if ( i > 100 ) {
                throw new Error('Infinite loop when generating of a module id.');
          }
          var module = this;
          key = key || module._getNextItemKeyInCollection();
          var id_candidate = module_type + '_' + key;
          if ( ! _.has(module, 'itemCollection') || ! _.isArray( module.itemCollection() ) ) {
                throw new Error('The item collection does not exist or is not properly set in module : ' + module.id );
          }
          if ( module.isItemRegistered( id_candidate ) ) {
            key++; i++;
            return module.generateItemId( module_type, key, i );
          }
          return id_candidate;
  },
  _getNextItemKeyInCollection : function() {
          var module = this,
            _max_mod_key = {},
            _next_key = 0;
          if ( ! _.isEmpty( module.itemCollection() ) ) {
              _max_mod_key = _.max( module.itemCollection(), function( _mod ) {
                  return parseInt( _mod.id.replace(/[^\/\d]/g,''), 10 );
              });
              _next_key = parseInt( _max_mod_key.id.replace(/[^\/\d]/g,''), 10 ) + 1;
          }
          return _next_key;
  },
  isItemRegistered : function( id_candidate ) {
        var module = this;
        return ! _.isUndefined( _.findWhere( module.itemCollection(), { id : id_candidate}) );
  },
  updateItemsCollection : function( obj ) {
          var module = this,
              _current_collection = module.itemCollection();
              _new_collection = _.clone(_current_collection);
          if ( _.has( obj, 'collection' ) ) {
                module.itemCollection.set(obj.collection);
                return;
          }

          if ( ! _.has(obj, 'item') ) {
              throw new Error('updateItemsCollection, no item provided ' + module.control.id + '. Aborting');
          }
          var item = _.clone(obj.item);
          if ( _.findWhere( _new_collection, { id : item.id } ) ) {
                _.each( _current_collection , function( _item, _ind ) {
                      if ( _item.id != item.id )
                        return;
                      _new_collection[_ind] = item;
                });
          }
          else {
              _new_collection.push(item);
          }
          module.itemCollection.set(_new_collection);
  },
  _getSortedDOMItemCollection : function( ) {
          var module = this,
              _old_collection = _.clone( module.itemCollection() ),
              _new_collection = [];
          $( '.' + module.control.css_attr.single_item, module.container ).each( function( _index ) {
                var _item = _.findWhere( _old_collection, {id: $(this).attr('data-id') });
                if ( ! _item )
                  return;

                _new_collection[_index] = _item;
          });

          if ( _old_collection.length != _new_collection.length ) {
              throw new Error('There was a problem when re-building the item collection from the DOM in module : ' + module.id );
          }
          return _new_collection;
  }
});//$.extend//CZRBaseControlMths//MULTI CONTROL CLASS

var CZRModuleMths = CZRModuleMths || {};

$.extend( CZRModuleMths, {
  getDefaultModel : function( id ) {
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
            _new_item = this.getDefaultModel( _id );
          if ( _.has(_new_item, 'id') && module._isItemIdPossible(_id) ) {
                _.map( module.getDefaultModel() , function( value, property ){
                      if ( ! _.has(_new_item, property) )
                        _new_item[property] = value;
                });

            return _new_item;
          }
          return module._initNewItem( _new_item, _next_key + 1);
  }

});//$.extend//MULTI CONTROL CLASS
var CZRModuleMths = CZRModuleMths || {};
$.extend( CZRModuleMths, {
  renderModuleParts : function() {
          var module = this,
              $_moduleContentEl = module.isInSektion() ? $( module.container ).find('.czr-mod-content') : $( module.container );
          if ( module.isCrud() ) {
                if ( 0 === $( '#tmpl-' + module.crudModulePart ).length ) {
                  throw new Error('No crud Module Part template for module ' + module.id + '. The template script id should be : #tmpl-' + module.crudModulePart );
                }
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
  getTemplateEl : function( type, item_model ) {
          var module = this, _el;
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
          }
          if ( _.isEmpty(_el) ) {
               throw new Error('No valid template has been found in getTemplateEl() ' + module.id + '. Aborting');
          } else {
              return _el;
          }
  },
  getViewEl : function( id ) {
          var module = this;
          return $( '[data-id = "' + id + '"]', module.container );
  },
  closeAllItems : function(id) {
          var module = this,
              _current_collection = _.clone( module.itemCollection() ),
              _filtered_collection = _.filter( _current_collection , function( mod) { return mod.id != id; } );

          _.each( _filtered_collection, function(_item) {
                if ( module.czr_Item.has(_item.id) && 'expanded' == module.czr_Item(_item.id)._getViewState(_item.id) )
                  module.czr_Item(_item.id).czr_ItemState.set( 'closed' ); // => will fire the cb toggleItemExpansion
           } );
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
  closeAllAlerts : function() {
          var module = this;
          $('.' + module.control.css_attr.remove_alert_wrapper, module.container ).each( function() {
                if ( $(this).hasClass('open') ) {
                      $(this).slideToggle( {
                            duration : 100,
                            done : function() {
                              $(this).toggleClass('open' , false );
                              $(this).siblings().find('.' + module.control.css_attr.display_alert_btn).toggleClass('active' , false );
                            }
                      } );
                }
          });
  },
  _makeItemsSortable : function(obj) {
          if ( wp.media.isTouchDevice || ! $.fn.sortable )
            return;
          var module = this;
          $( '.' + module.control.css_attr.items_wrapper, module.container ).sortable( {
                handle: '.' + module.control.css_attr.item_sort_handle,
                start: function() {
                    if ( _.has(api, 'czrModulePanelState' ) )
                      api.czrModulePanelState.set(false);
                    if ( _.has(api, 'czrSekSettingsPanelState' ) )
                      api.czrSekSettingsPanelState.set(false);
                },
                update: function( event, ui ) {
                    module.itemCollection.set( module._getSortedDOMItemCollection(), { item_collection_sorted : true } );
                }
              }
          );
  }
});//$.extend//MULTI CONTROL CLASS

var CZRDynModuleMths = CZRDynModuleMths || {};

$.extend( CZRDynModuleMths, {
  initialize: function( id, options ) {
          var module = this;
          api.CZRModule.prototype.initialize.call( module, id, options );
          $.extend( module, {
              itemPreAddEl : ''//is specific for each crud module
          } );
          module.itemAddedMessage = serverControlParams.translatedStrings.successMessage;
          module.userEventMap = new api.Value( [
                {
                    trigger   : 'click keydown',
                    selector  : [ '.' + module.control.css_attr.open_pre_add_btn, '.' + module.control.css_attr.cancel_pre_add_btn ].join(','),
                    name      : 'pre_add_item',
                    actions   : ['renderPreItemView','setPreItemViewVisibility'],
                },
                {
                    trigger   : 'click keydown',
                    selector  : '.' + module.control.css_attr.add_new_btn, //'.czr-add-new',
                    name      : 'add_item',
                    actions   : ['closeAllItems', 'addItem'],
                }
          ]);//module.userEventMap
  },
  ready : function() {
          var module = this;
          api.consoleLog( 'MODULE READY IN DYN MODULE CLASS : ', module.id );
          module.setupDOMListeners( module.userEventMap() , { dom_el : module.container } );
          module.preItem = new api.Value( module.getDefaultModel() );
          module.preItemEmbedded = $.Deferred();//was module.czr_preItem.create('item_content');
          module.preItemEmbedded.done( function() {
                module.setupPreItemInputCollection();
          });
          module.preItemExpanded = new api.Value(false);
          module.preItemExpanded.callbacks.add( function( to, from ) {
                module._togglePreItemViewExpansion( to );
          });

          api.CZRModule.prototype.ready.call( module );//fires the parent
  },//ready()
  setupPreItemInputCollection : function() {
          var module = this;
          module.preItem.czr_Input = new api.Values();
          $('.' + module.control.css_attr.pre_add_wrapper, module.container)
                .find( '.' + module.control.css_attr.sub_set_wrapper)
                .each( function( _index ) {
                      var _id = $(this).find('[data-type]').attr('data-type') || 'sub_set_' + _index;
                      module.preItem.czr_Input.add( _id, new module.inputConstructor( _id, {//api.CZRInput;
                            id : _id,
                            type : $(this).attr('data-input-type'),
                            container : $(this),
                            item : module.preItem,
                            module : module,
                            is_preItemInput : true
                      } ) );
                      module.preItem.czr_Input(_id).ready();
                });//each
  },
  addItem : function(obj) {
          var module = this,
              item = module.preItem(),
              collapsePreItem = function() {
                    module.preItemExpanded.set(false);
                    module._resetPreItemInputs();
                    module.toggleSuccessMessage('off');
              };

          if ( _.isEmpty(item) || ! _.isObject(item) ) {
            throw new Error('addItem : an item should be an object and not empty. In : ' + module.id +'. Aborted.' );
          }
          collapsePreItem = _.debounce( collapsePreItem, 2000 );
          module.instantiateItem( item, true ).ready(); //true == Added by user

          module.czr_Item( item.id ).isReady.then( function() {
                module.toggleSuccessMessage('on');
                collapsePreItem();

                module.trigger('item_added', item );
                if ( 'postMessage' == api(module.control.id).transport && _.has( obj, 'dom_event') && ! _.has( obj.dom_event, 'isTrigger' ) && ! api.CZR_Helpers.has_part_refresh( module.control.id ) ) {
                  module.control.previewer.refresh();
                }
          });



  },

  _resetPreItemInputs : function() {
          var module = this;
          module.preItem.set( module.getDefaultModel() );
          module.preItem.czr_Input.each( function( input_instance ) {
                var _input_id = input_instance.id;
                if ( ! _.has( module.getDefaultModel(), _input_id ) )
                  return;
                input_instance.set( module.getDefaultModel()._input_id );
          });
  }

});//$.extend//MULTI CONTROL CLASS

var CZRDynModuleMths = CZRDynModuleMths || {};

$.extend( CZRDynModuleMths, {
  renderPreItemView : function( obj ) {
          var module = this;
          if ( 'pending' != module.preItemEmbedded.state() ) //was ! _.isEmpty( module.czr_preItem('item_content')() ) )
            return;
          if ( ! _.has(module, 'itemPreAddEl') ||  0 === $( '#tmpl-' + module.itemPreAddEl ).length )
            return this;
          var pre_add_template = wp.template( module.itemPreAddEl );
          if ( ! pre_add_template  || ! module.container )
            return this;

          var $_pre_add_el = $('.' + module.control.css_attr.pre_add_item_content, module.container );
          $_pre_add_el.prepend( pre_add_template() );
          module.preItemEmbedded.resolve();
  },
  _getPreItemView : function() {
          var module = this;
          return $('.' +  module.control.css_attr.pre_add_item_content, module.container );
  },
  setPreItemViewVisibility : function(obj) {
          var module = this;

          module.closeAllItems();
          module.preItemExpanded.set( ! module.preItemExpanded() );
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
                        $_btn.find('.fa').removeClass('fa-plus-square').addClass('fa-minus-square');
                      else
                        $_btn.find('.fa').removeClass('fa-minus-square').addClass('fa-plus-square');
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

});//$.extend//CZRBaseControlMths//extends api.CZRDynModule

var CZRSektionMths = CZRSektionMths || {};

$.extend( CZRSektionMths, {
  initialize: function( id, options ) {
          var module = this;
          api.CZRDynModule.prototype.initialize.call( module, id, options );
          $.extend( module, {
                itemPreAddEl : 'czr-module-sektion-pre-add-view-content',
                rudItemPart : 'czr-module-sektion-rud-item-part',
                itemInputList : 'czr-module-sektion-view-content',
          } );
          module.defaultItemModel = {
                id : '',
                'sektion-layout' : 1,
                columns : []
          };
          module.bind( 'pre_item_dom_remove', function( item ) {
                module.removeSektion( item );
          });
          module.defaultDBColumnModel = {
                id : '',
                sektion_id : '',
                modules : [],
          };

          module.defaultAPIcolumnModel = {
                id : '',
                modules : [],
                sektion : {},//sektion instance
                module_id : '',
                control_id : '',
                is_added_by_user : false
          };
          module.czr_Column = new api.Values();
          module.czr_columnCollection = new api.Value();
          module.czr_columnCollection.set([]);
          module.czr_columnCollection.callbacks.add( function() { return module.columnCollectionReact.apply(module, arguments ); } );
          module.itemConstructor = api.CZRItem.extend( module.CZRSektionItem || {} );
          if ( ! _.has( module ,'modsDragInstance' ) )
            module.initModulesDragula();
          api.czrModulePanelState = api.czrModulePanelState || new api.Value( false );
          api.czrModulePanelEmbedded = api.czrModulePanelEmbedded || $.Deferred();
          module.userEventMap.set( _.union(
                module.userEventMap(),
                [
                  {
                    trigger   : 'click keydown',
                    selector  : '.add-new-module',
                    name      : 'add_new_module',
                    actions   : 'toggleModuleListPanel'
                  },
                  {
                    trigger   : 'click keydown',
                    selector  : '.' + module.control.css_attr.open_pre_add_btn,
                    name      : 'close_module_panel',
                    actions   : function() {
                        api.czrModulePanelState(false);
                    },
                  }
                ]
          ));



          api.consoleLog('SEKTION MODULE INIT', module.control.params.czr_skope );
          if ( _.has( api, 'czr_activeSkope' ) )
            api.consoleLog('SEKTION MODULE INIT', api.czr_activeSkope() );

          api.czrModulePanelBinded = api.czrModulePanelBinded || $.Deferred();
          if ( 'pending' == api.czrModulePanelBinded.state() ) {

                api.czrModulePanelState.bind( function( expanded ) {
                      var synced_control_id = api.CZR_Helpers.build_setId(  module.control.params.syncCollection ),
                              sek_module = api.control( synced_control_id ).syncSektionModule();

                      $('body').toggleClass('czr-adding-module', expanded );

                      if ( expanded ) {
                            sek_module.renderModulePanel();



                            api.consoleLog('REACT TO MODULE PANEL STATE', expanded,  module.control.params.syncCollection, sek_module() );
                            api.consoleLog('WHEN DOES THIS ACTION OCCUR?', api.czrModulePanelBinded.state() );
                            sek_module.modsDragInstance.containers.push( $('#czr-available-modules-list')[0]);
                      } else {
                            var _containers = $.extend( true, [], sek_module.modsDragInstance.containers );
                                _containers =  _.filter( _containers, function( con) {
                                    return 'czr-available-modules-list' != $(con).attr('id');
                                });
                            sek_module.modsDragInstance.containers = _containers;
                            $('#czr-module-list-panel').remove();
                      }

                });
                api.czrModulePanelBinded.resolve();
          }//if pending
          api.czrSekSettingsPanelState = api.SekSettingsPanelState || new api.Value( false );
          api.czrSekSettingsPanelEmbedded = api.SekSettingsPanelEmbedded || $.Deferred();
          module.userEventMap.set( _.union(
                module.userEventMap(),
                [
                  {
                    trigger   : 'click keydown',
                    selector  : '.czr-edit-sek-settings',
                    name      : 'edit_sek_settings',
                    actions   : 'toggleSekSettingsPanel'
                  },
                  {
                    trigger   : 'click keydown',
                    selector  : '.' + module.control.css_attr.open_pre_add_btn,
                    name      : 'close_sektion_panel',
                    actions   : function() {
                        api.czrSekSettingsPanelState.set(false);
                    },
                  }
                ]
          ));
          api.czrSekSettingsPanelEmbedded.done( function() {
                api.czrSekSettingsPanelState.callbacks.add( function() { return module.reactToSekSettingPanelState.apply(module, arguments ); } );
          });
          api.section( module.control.section() ).expanded.bind(function(to) {
              api.consoleLog('FIRE SEKTION MODULE!', module.id );
              module.fireSektionModule();
          });
  },//initialize




  fireSektionModule : function() {
      var module = this;
      if ( 'resolved' == module.isReady.state() )
        return;
      module.ready();
      module.control.getSyncCollectionControl().syncSektionModule.set( module );
  },
  removeSektion : function( sekItem ) {
        var module = this;

        _.each( sekItem.columns, function( _col ) {

              _.each( _col.modules, function( _mod ){
                    module.control.getSyncCollectionControl().removeModule( _mod );
              });//_.each
              if ( module.czr_Column.has(_col.id) && 'resolved' == module.czr_Column( _col.id ).embedded.state() )
                  module.czr_Column( _col.id ).container.remove();
              module.removeColumnFromCollection( _col );


        });//_.each

  },

  closeAllOtherSektions : function( $_clicked_el ) {
          var module = this;
              _clicked_sektion_id = $_clicked_el.closest('.czr-single-item').attr('data-id');

          module.czr_Item.each( function( _sektion ){
                if ( _clicked_sektion_id != _sektion.id ) {
                    _sektion.czr_ItemState.set( 'closed');
                } else {
                    _sektion.czr_ItemState.set( 'expanded' != _sektion.czr_ItemState() ? 'expanded_noscroll' : 'expanded' );
                }
          });
  }

});//extends api.CZRDynModule

var CZRSektionMths = CZRSektionMths || {};

$.extend( CZRSektionMths, {
  CZRSektionItem : {
          initialize: function(id, options ) {
                var sekItem = this;
                api.CZRItem.prototype.initialize.call( sekItem, null, options );
                sekItem.userEventMap.set( _.union(
                      sekItem.userEventMap(),
                      [
                        {
                          trigger   : 'click keydown',
                          selector  : [ '.' + sekItem.module.control.css_attr.edit_view_btn, '.' + sekItem.module.control.css_attr.display_alert_btn,'.' + sekItem.module.control.css_attr.item_title ].join(','),
                          name      : 'close_module_panel',
                          actions   : function() {
                              api.czrModulePanelState.set(false);
                          },
                        },
                        {
                          trigger   : 'mouseenter',
                          selector  : '.czr-item-header',
                          name      : 'hovering_sek',
                          actions   : function( obj ) {
                              sekItem.module.control.previewer.send( 'start_hovering_sek', {
                                    id : sekItem.id
                              });
                          }
                        },
                        {
                          trigger   : 'mouseleave',
                          selector  : '.czr-item-header',
                          name      : 'hovering_sek',
                          actions   : function( obj ) {
                              sekItem.module.control.previewer.send( 'stop_hovering_sek', {
                                    id : sekItem.id
                              });
                          }
                        },
                        {
                          trigger   : 'click keydown',
                          selector  : [ '.' + sekItem.module.control.css_attr.edit_view_btn, '.' + sekItem.module.control.css_attr.item_title ].join(','),
                          name      : 'send_edit_view',
                          actions   : function( obj ) {
                              sekItem.module.control.previewer.send( 'edit_sek', {
                                    id : sekItem.id
                              });
                          },
                        }
                      ]
                ));

                var _sektion_model = sekItem(),
                    module = options.module;

                if ( ! _.has(_sektion_model, 'sektion-layout') ) {
                    throw new Error('In Sektion Item initialize, no layout provided for ' + sekItem.id + '.');
                }

                sekItem.isReady.done( function() {
                      if ( ! _.isEmpty( sekItem().columns ) ) {
                            _.each( sekItem().columns , function( _column ) {
                                  var column_candidate = $.extend( true, {}, _column );//create a deep clone
                                  module.instantiateColumn( $.extend( column_candidate, { sektion : sekItem } ) );
                            });
                      } else {
                            var _col_nb = parseInt( _sektion_model['sektion-layout'] || 1, 10 );
                            for( i = 1; i < _col_nb + 1 ; i++ ) {
                                  var _default_column = $.extend( true, {}, module.defaultDBColumnModel ),
                                      column_candidate = {
                                            id : '',//a unique id will be generated when preparing the column for API.
                                            sektion_id : sekItem.id
                                      };
                                      column_candidate = $.extend( _default_column, column_candidate );

                                  module.instantiateColumn( $.extend( column_candidate, { sektion : sekItem } ) );
                            }//for
                      }
                });//sekItem.isReady

          },
          itemReact : function( to, from ) {
                var sekItem = this,
                    sektion_candidate = $.extend(true, {}, to);
                sektion_candidate = sekItem.prepareSekItemForDB( sektion_candidate );
                api.CZRItem.prototype.itemReact.call( sekItem, sektion_candidate );
          },
          prepareSekItemForDB : function( sektion_candidate ) {
                var sekItem = this,
                    db_ready_sektItem = {};

                _.each( sekItem.module.defaultItemModel, function( _value, _key ) {
                    var _candidate_val = sektion_candidate[_key];
                    switch( _key ) {
                          case 'id' :
                              if ( ! _.isString( _candidate_val ) || _.isEmpty( _candidate_val ) ) {
                                  throw new Error('The sekItem id property must be a not empty string');
                              }
                              db_ready_sektItem[_key] = _candidate_val;
                          break;
                          case 'sektion-layout' :
                              if ( ! _.isNumber( parseInt( _candidate_val, 10 ) ) || ( parseInt( _candidate_val, 10 ) < 1 ) ) {
                                  throw new Error('The sekItem layout property must be an int number > 0');
                              }
                              db_ready_sektItem[_key] = _candidate_val;
                          break;
                          case 'columns' :
                              if ( ! _.isArray( _candidate_val ) ) {
                                  throw new Error('The sekItem columns property must be an array');
                              }
                              var _db_ready_columns = [];
                              _.each( _candidate_val, function( _col ) {
                                    var _db_ready_col = sekItem.module.prepareColumnForDB(_col);
                                    _db_ready_columns.push( _db_ready_col );
                              });

                              db_ready_sektItem[_key] = _db_ready_columns;
                          break;
                    }
                });//each

                return db_ready_sektItem;
          }

  }//Sektion

});//extends api.CZRDynModule

var CZRSektionMths = CZRSektionMths || {};

$.extend( CZRSektionMths, {
  prepareColumnForDB : function( column_candidate ) {
        var module = this,
            _db_ready_col = {};

        _.each( module.defaultDBColumnModel, function( _value, _key ){
              var _candidate_val = column_candidate[_key];
              switch( _key ) {
                  case 'id' :
                      if ( ! _.isString( _candidate_val ) || _.isEmpty( _candidate_val ) ) {
                          throw new Error('The column id property must be a not empty string');
                      }
                      _db_ready_col[_key] = _candidate_val;
                  break;
                  case 'sektion_id' :
                      if ( _.isString( _candidate_val ) && ! _.isEmpty( _candidate_val ) ) {
                          _db_ready_col[_key] = _candidate_val;
                      } else if ( _.has(column_candidate, 'sektion') ) {
                          _db_ready_col[_key] = column_candidate.sektion.id;
                      } else {
                          throw new Error('The column sektion-id property must be a not empty string');
                      }
                  break;
                  case 'modules' :
                      if ( ! _.isArray( _candidate_val ) ) {
                          throw new Error('The column modules property must be an array');
                      }
                      _db_ready_col[_key] = _candidate_val;
                  break;
              }

        } );
        return _db_ready_col;
  },
  instantiateColumn : function( _column, is_added_by_user  ) {
        var module = this,
            column_model = _.clone( _column );

        if ( ! _.isEmpty( column_model.id ) && module.czr_Column.has( column_model.id ) ) {
              throw new Error('The column id already exists in the collection in module : ' + module.id );
        }

        column_model = module.prepareColumnForAPI( column_model );
        module.czr_Column.add( column_model.id , new api.CZRColumn( column_model.id, column_model ) );
        module.czr_Column(column_model.id).ready();
  },
  prepareColumnForAPI : function( column_candidate ) {
      var module = this,
          api_ready_column = {};

      if ( ! _.isObject( column_candidate ) ) {
            throw new Error('Sektion Module::prepareColumnForAPI : a column must be an object to be instantiated.');
        }

      _.each( module.defaultAPIcolumnModel, function( _value, _key ) {
            var _candidate_val = column_candidate[_key];
            switch( _key ) {
                  case 'id' :
                      if ( _.isEmpty( _candidate_val ) ) {
                          api_ready_column[_key] = module.generateColId();
                      } else {
                          api_ready_column[_key] = _candidate_val;
                      }
                  break;
                  case 'modules' :
                      if ( ! _.isArray( _candidate_val )  ) {
                          throw new Error('Sektion Module::prepareColumnForAPI : a collection of modules must be an array. Error in column ' + column_candidate.id );
                      }
                      api_ready_column[_key] = _candidate_val;
                  break;
                  case  'sektion' :
                      if ( ! _.isObject( _candidate_val ) || _.isEmpty( _candidate_val )  ) {
                          throw new Error('Sektion Module::prepareColumnForAPI : a sektion instance is missing for column ' + column_candidate.id );
                      }
                      api_ready_column[_key] = _candidate_val;
                  break;
                  case  'module_id' :
                      api_ready_column[_key] = module.id;
                  break;
                  case  'control_id' :
                      api_ready_column[_key] = module.control.id;
                  break;
                  case 'is_added_by_user' :
                      api_ready_column[_key] =  _.isBoolean( _candidate_val ) ? _candidate_val : false;
                  break;
            }//switch
      });
      return api_ready_column;
  },
  updateColumnCollection : function( obj ) {
        var module = this,
            _current_collection = module.czr_columnCollection();
            _new_collection = $.extend( true, [] , _current_collection );
        api.consoleLog('in update column collection', module.id, module.czr_columnCollection() );
        if ( _.has( obj, 'collection' ) ) {
              module.czr_columnCollection.set(obj.collection);
              return;
        }

        if ( ! _.has(obj, 'column') ) {
          throw new Error('updateColumnCollection, no column provided in module ' + module.id + '. Aborting');
        }
        var column = _.clone(obj.column);

        if ( ! _.has(column, 'id') ) {
          throw new Error('updateColumnCollection, no id provided for a column in module' + module.id + '. Aborting');
        }
        if ( _.findWhere( _new_collection, { id : column.id } ) ) {
              _.each( _current_collection , function( _elt, _ind ) {
                    if ( _elt.id != column.id )
                      return;
                    _new_collection[_ind] = column;
              });
        }
        else {
              _new_collection.push(column);
        }
        module.czr_columnCollection.set(_new_collection);
  },


  removeColumnFromCollection : function( column ) {
        var module = this,
            _current_collection = module.czr_columnCollection(),
            _new_collection = $.extend( true, [], _current_collection);

        _new_collection = _.filter( _new_collection, function( _col ) {
              return _col.id != column.id;
        } );

        module.czr_columnCollection.set(_new_collection);
  },
  columnCollectionReact : function( to, from ) {
        var module = this,
            is_column_added   = _.size(from) < _.size(to),
            is_column_removed = _.size(from) > _.size(to),
            is_column_update  = _.size(from) == _.size(to),
            _current_sek_model = {},
            _new_sek_model = {};
        if ( is_column_update ) {
              _.each( to, function( _col, _key ) {
                    if ( _.isEqual( _col, from[_key] ) )
                      return;
                    _current_sek_model = _col.sektion();
                    _new_sek_model = $.extend(true, {}, _current_sek_model);
                    _.each( _current_sek_model.columns, function( _c, _k ){
                          if ( _c.id != _col.id )
                            return;
                          _new_sek_model.columns[_k] = _col;
                    } );

                    _col.sektion.set( _new_sek_model );

              } );//_.each
        }//end if column update
        if ( is_column_added ) {
              var _new_column = _.filter( to, function( _col ){
                  return _.isUndefined( _.findWhere( from, { id : _col.id } ) );
              });

              _new_column = _new_column[0];
              _current_sek_model = _new_column.sektion();
              if ( _.isUndefined( _.findWhere( _current_sek_model.columns, {id : _new_column.id } ) ) ) {
                    _new_sek_model = $.extend(true, {}, _current_sek_model);
                    _new_sek_model.columns.push( _new_column );
                    _new_column.sektion.set( _new_sek_model );
              }

        }//end if new column case
        if ( is_column_removed ) {
              var _to_remove = _.filter( from, function( _col ){
                  return _.isUndefined( _.findWhere( to, { id : _col.id } ) );
              });
              _to_remove = _to_remove[0];

              _current_sek_model = _to_remove.sektion();
              _new_sek_model = $.extend(true, {}, _current_sek_model);//_.clone() is not enough there, we need a deep cloning.
              _new_sek_model.columns = _.filter( _new_sek_model.columns, function( _col ) {
                    return _col.id != _to_remove.id;
              } );

              _to_remove.sektion.set( _new_sek_model );
              module.czr_Column.remove( _to_remove.id );
        }
  },
  generateColId : function( key, i ) {
        i = i || 1;
        if ( i > 100 ) {
              throw new Error('Infinite loop when generating of a column id.');
        }

        var module = this;
        key = key || module._getNextColKeyInCollection();

        var id_candidate = 'col_' + key;
        if ( ! _.has(module, 'czr_columnCollection') || ! _.isArray( module.czr_columnCollection() ) ) {
              throw new Error('The column collection does not exist or is not properly set in module : ' + module.id );
        }
        if ( module.czr_Column.has( id_candidate ) ) {
          return module.generateColId( key++, i++ );
        }

        return id_candidate;
  },
  _getNextColKeyInCollection : function() {
        var module = this,
            _max_col_key = {},
            _next_key = 0;
        if ( ! _.isEmpty( module.czr_columnCollection() ) ) {
            _max_col_key = _.max( module.czr_columnCollection(), function( _col ) {
                return parseInt( _col.id.replace(/[^\/\d]/g,''), 10 );
            });
            _next_key = parseInt( _max_col_key.id.replace(/[^\/\d]/g,''), 10 ) + 1;
        }
        return _next_key;
  },
  moduleExistsInOneColumnMax : function( module_id ) {
        return 2 > this.getModuleColumn( module_id ).length;
  },
  getModuleColumn : function( module_id ) {
        var module = this,
            _mod_columns = [];
        _.each( module.czr_columnCollection(), function( _col, _key ) {
              if ( _.findWhere( _col.modules, { id : module_id } ) )
                _mod_columns.push( _col.id );
        });
        return _mod_columns;
  }

});//extends api.CZRDynModule

var CZRSektionMths = CZRSektionMths || {};

$.extend( CZRSektionMths, {
 initModulesDragula : function() {
        var module = this;
        module.modsDragInstance = dragula({
            copy: function (el, source) {
              return $(el).hasClass( 'czr-module-candidate' );
            },
            moves: function (el, source, handle, sibling) {
                return _.contains( handle.className.split(' '), 'czr-mod-drag-handler' );
            },
            accepts: function ( el, target, source, sibling ) {
                return ! _.isUndefined(target) && 'czr-available-modules-list' != $(target).attr('id') ;
            },
            isContainer : function( el ) {
              return false;
            }
        });//dragula
        module.modsDragInstance.on('drag', function( el, source ){
                module.czr_Item.each( function( _sektion ){
                      _sektion.czr_ItemState.set( 'expanded' != _sektion.czr_ItemState() ? 'expanded_noscroll' : 'expanded' );
                });
        }).on('dragend', function( el, source ){
        }).on('drop', function(el, target, source, sibling ) {
              var _dropped_module_id = $(el).attr('data-module-id'),
                  _dropped_module_type = $(el).attr('data-module-type'),
                  _target_col = $(target).closest('.czr-column').attr('data-id'),
                  _source_col = $(source).closest('.czr-column').attr('data-id'),
                  is_reorder = _target_col == _source_col,
                  is_module_candidate = $(el).hasClass('czr-module-candidate');

              if ( is_module_candidate ) {
                  if ( _.isUndefined(_target_col) || _.isUndefined(_dropped_module_type ) )
                    return;

                  module.userAddedModule( _target_col, _dropped_module_type );
                  module.reorderModulesInColumn( _target_col );
              }
              else if ( is_reorder ) {
                  module.reorderModulesInColumn( _target_col );
              } else {
                  module.control.getSyncCollectionControl().czr_Module( _dropped_module_id ).modColumn.set( _target_col );
              }
        });
        var scroll = autoScroller([
                     module.control.container.closest('.accordion-section-content')[0]
                  ],
                  {
                    direction: "vertical",
                    margin: 20,
                    pixels: 100,
                    scrollWhenOutside: true,
                    autoScroll: function(){
                        return module.modsDragInstance.dragging;
                    }
                  }
        );
  },
  userAddedModule : function( column_id, module_type  ) {
        var module = this,
            syncedCollectionControl = module.control.getSyncCollectionControl(),
            defautAPIModuleModel = _.clone( syncedCollectionControl.getDefaultModuleApiModel() );

        syncedCollectionControl.trigger(
              'user-module-candidate',
              $.extend( defautAPIModuleModel, {
                    module_type : module_type, //'czr_text_editor_module', //'czr_text_module',
                    column_id : column_id,//a string
                    sektion : module.czr_Column(column_id).sektion,//instance
                    sektion_id : module.czr_Column(column_id).sektion.id,
                    is_added_by_user : true
              } )
        );

  },



  reorderModulesInColumn : function( col_id ) {
        var module = this,
            _new_dom_module_collection = module.czr_Column( col_id  ).getColumnModuleCollectionFromDom( col_id  );

        module.czr_Column( col_id ).updateColumnModuleCollection( { collection : _new_dom_module_collection } );
  },
  moveModuleFromTo : function( moved_module, source_column, target_column ) {
        api.consoleLog( 'ALORS CE BUG?', this(), this.czr_columnCollection() );
        var module = this,
            _new_dom_module_collection = module.czr_Column( target_column ).getColumnModuleCollectionFromDom( source_column );
        if ( _.has( api, 'czrModulePanelState') )
          api.czrModulePanelState(false);
        module.czr_Column( target_column ).updateColumnModuleCollection( { collection : _new_dom_module_collection } );
        module.czr_Column( source_column ).removeModuleFromColumnCollection( moved_module );
  }
});//extends api.Value
var CZRSektionMths = CZRSektionMths || {};

$.extend( CZRSektionMths, {

    toggleModuleListPanel : function( obj ) {
          var module = this;
          api.czrSekSettingsPanelState.set(false);

          api.czrModulePanelState.set( ! api.czrModulePanelState() );
          if ( ! api.czrModulePanelState() ) {
              module.closeAllOtherSektions( $(obj.dom_event.currentTarget, obj.dom_el ) );
          } else {
              module.czr_Item.each( function( _sektion ){
                  _sektion.czr_ItemState.set( 'expanded' != _sektion.czr_ItemState() ? 'expanded_noscroll' : 'expanded' );
              });
          }
    },
    renderModulePanel : function() {
          var module = this;
          if ( 0 === $( '#tmpl-czr-available-modules' ).length ) {
            throw new Error('No template found to render the module panel list' );
          }

          $('#widgets-left').after( $( wp.template( 'czr-available-modules' )() ) );

          _.each( api.czrModuleMap, function( _data, _mod_type ) {
                  var $_mod_candidate = $('<li/>', {
                        class : 'czr-module-candidate',
                        'data-module-type' : _mod_type,
                        html : '<h3><span class="czr-mod-drag-handler fa fa-arrows-alt"></span>' + _data.name + '</h3>'
                  });
                  $('#czr-available-modules-list').append(  $_mod_candidate );
          });
    }
});//$.extend
var CZRColumnMths = CZRColumnMths || {};
$.extend( CZRColumnMths , {
    initialize: function( name, options ) {
          var column = this;
          api.Value.prototype.initialize.call( column, null, options );
          $.extend( column, options || {} );

          column.isReady = $.Deferred();
          column.embedded = $.Deferred();
          column.czr_columnModuleCollection = new api.Value();
          column.czr_columnModuleCollection.set( column.modules );
          column.set( options );
          column.defautModuleModelInColumn = { id : '' };

          api.consoleLog('column.sektion.contentRendered.state()', column.sektion.contentRendered.state() );
          column.sektion.contentRendered.done(function() {
                column.container = column.render();
                api.consoleLog('COLUMN CONTAINER?', column.container );
                column.embedded.resolve();
          });
          column.embedded.done(function() {
                column.mayBeInstantiateColumnModules();
                column.callbacks.add( function() { return column.columnReact.apply(column, arguments ); } );
                column.czr_columnModuleCollection.callbacks.add( function() { return column.columnModuleCollectionReact.apply( column, arguments ); } );
                api.CZR_Helpers.setupDOMListeners(
                        column.column_event_map,//actions to execute
                        { dom_el : column.container },//dom scope
                        column//instance where to look for the cb methods
                );
                var syncCollectionControl = api.control(column.control_id).getSyncCollectionControl();
                api.consoleLog('////////////////////////////////////////////////////');
                api.consoleLog('column.container?', column.container);
                api.consoleLog('syncCollectionControl.syncSektionModule()', syncCollectionControl.syncSektionModule()() );
                api.consoleLog('////////////////////////////////////////////////////');
                syncCollectionControl.syncSektionModule().modsDragInstance.containers.push( $('.czr-module-collection-wrapper', column.container )[0] );

          });
    },
    ready : function() {
          var column = this;
          column.isReady.resolve();
          column.sektion.module.updateColumnCollection( {column : column() });
    },
    mayBeInstantiateColumnModules : function() {
          var column = this,
              syncedCollectionControl = column.sektion.control.getSyncCollectionControl();
          $.when( syncedCollectionControl.moduleCollectionReady.promise() ).then(
                function() {
                  _.each( column.czr_columnModuleCollection() , function( _mod ) {
                            if ( syncedCollectionControl.czr_Module.has(_mod.id) )
                              return;
                            $.when( _.findWhere( syncedCollectionControl.czr_moduleCollection() , { id : _mod.id } ) ).done( function( module_candidate ) {
                                  if ( _.isUndefined( module_candidate) ||_.isEmpty( module_candidate ) ) {
                                    throw new Error( 'Module ' + _mod.id + ' was not found in the module collection.');
                                  }
                                  syncedCollectionControl.instantiateModule( module_candidate, {} ).ready();
                            });
                  } );
                },//done callback
                function() {},//fail callback
                function() {
                  api.consoleLog( 'NOT SYNCHRONIZED YET');
                }
          );//.then()
    },
    render : function() {
          var column   = this;
          $view     = $( wp.template('czr-sektion-column')( {id: column.id}) );
          $view.appendTo( $('.czr-column-wrapper', column.sektion.container ) );
          return $view;
    },
    columnReact : function( to ,from ) {
          var column = this;
          this.sektion.module.updateColumnCollection( {column : to });
    }
});//$.extend
var CZRColumnMths = CZRColumnMths || {};
$.extend( CZRColumnMths , {
    updateColumnModuleCollection : function( obj ) {
            var column = this,
                _current_collection = column.czr_columnModuleCollection();
                _new_collection = $.extend( true, [], _current_collection );

            api.consoleLog('column.czr_columnModuleCollection()', column.czr_columnModuleCollection() );
            if ( _.has( obj, 'collection' ) ) {
                  column.czr_columnModuleCollection.set(obj.collection);
                  return;
            }

            if ( ! _.has(obj, 'module') ) {
              throw new Error('updateColumnModuleCollection, no module provided in column ' + column.id + '. Aborting');
            }
            var module_ready_for_column_api = column.prepareModuleForColumnAPI( _.clone(obj.module) );
            if ( _.findWhere( _new_collection, { id : module_ready_for_column_api.id } ) ) {
                  _.each( _current_collection , function( _elt, _ind ) {
                          if ( _elt.id != module_ready_for_column_api.id )
                            return;
                          _new_collection[_ind] = module_ready_for_column_api;
                  });
            }
            else {
                  _new_collection.push(module_ready_for_column_api);
            }
            column.czr_columnModuleCollection.set( _new_collection );
    },
    columnModuleCollectionReact : function( to, from ) {
            var column = this,
                _current_column_model = column(),
                _new_column_model = _.clone( _current_column_model ),
                _new_module_collection = [];

            _.each( to , function( _mod, _key ) {
                _new_module_collection[_key] = { id : _mod.id };
            });
            _new_column_model.modules = _new_module_collection;
            column.set( _new_column_model );
    },
    removeModuleFromColumnCollection : function( module ) {
            var column = this,
                _current_collection = column.czr_columnModuleCollection();
                _new_collection = $.extend( true, [], _current_collection );

            _new_collection = _.filter( _new_collection, function( _mod ){
                return _mod.id != module.id;
            } );
            column.czr_columnModuleCollection.set( _new_collection );
    },
    prepareModuleForColumnAPI : function( module_candidate ) {
            if ( ! _.isObject( module_candidate ) ) {
                throw new Error('prepareModuleForColumnAPI : a module must be an object.');
            }
            var column = this,
                api_ready_module = {};

            _.each( column.defautModuleModelInColumn, function( _value, _key ) {
                    var _candidate_val = module_candidate[ _key ];
                    switch( _key ) {
                          case 'id' :
                            if ( ! _.isString( _candidate_val ) || _.isEmpty( _candidate_val ) ) {
                                throw new Error('prepareModuleForColumnAPI : a module id must a string not empty');
                            }
                            if ( ! column.sektion.module.moduleExistsInOneColumnMax( module_candidate.id ) ) {
                                throw new Error('A module can not be embedded in more than one column at a time. Module ' + module_candidate.id + ' exists in several columns : ' +  column.sektion.module.getModuleColumn( module_candidate.id ).join(',') );
                            }
                            api_ready_module[ _key ] = _candidate_val;
                          break;
                    }//switch
            });//each
            return api_ready_module;
    },
    getColumnModuleCollectionFromDom : function( old_col_id ) {
            var column = this,
                $_moduleWrapper = $('.czr-module-collection-wrapper', column.container ),
                _previous_column_collection = column.sektion.module.czr_Column( old_col_id ).czr_columnModuleCollection(),
                _new_collection = [];

            api.consoleLog('in GET COLUMN MODULE COLLECTION FROM DOM', old_col_id, $_moduleWrapper, column.container );

            $('.czr-single-module', $_moduleWrapper).each( function( _index ) {
                  if ( ! _.isUndefined( _.findWhere( column.czr_columnModuleCollection(), { id: $(this).attr('data-module-id') } ) ) ) {
                        _new_collection[_index] = _.findWhere( column.czr_columnModuleCollection(), { id: $(this).attr('data-module-id') } );
                        return;
                  }

                  var _module_obj = _.findWhere( _previous_column_collection, { id: $(this).attr('data-module-id') } );
                  if ( ! _module_obj ) {
                      throw new Error('The module  : ' + $(this).attr('data-module-id') + ' was not found in the collection of its previous column ' + old_col_id );
                  }
                  _new_collection[_index] = column.prepareModuleForColumnAPI( _module_obj );
            });

            if ( _.isEmpty( _new_collection ) ) {
                throw new Error('There was a problem when re-building the column module collection from the DOM in column : ' + column.id );
            }
            return _new_collection;
    }
});//$.extend//extends api.Value
var CZRSektionMths = CZRSektionMths || {};

$.extend( CZRSektionMths, {

    toggleSekSettingsPanel : function( obj ) {
          var module = this;
          if ( 'pending' == api.czrSekSettingsPanelEmbedded.state() ) {
              $.when( module.renderSekSettingsPanel() ).done( function(){
                  api.czrSekSettingsPanelEmbedded.resolve();
              });
          }
          api.czrModulePanelState.set( false );

          api.czrSekSettingsPanelState.set( ! api.czrSekSettingsPanelState() );
          module.closeAllOtherSektions( $(obj.dom_event.currentTarget, obj.dom_el ) );
    },
    reactToSekSettingPanelState : function( expanded ) {
         $('body').toggleClass('czr-editing-sektion', expanded );
    },
    renderSekSettingsPanel : function() {
          var module = this,
              _tmpl = '';
          if ( 0 === $( '#tmpl-czr-sektion-settings-panel' ).length ) {
            throw new Error('No template found to render the sektion setting panel' );
          }
          try {
            _tmpl = wp.template( 'czr-sektion-settings-panel' )();
          }
          catch(e) {
            throw new Error('Error when parsing the template of the sektion setting panel' + e );
          }
          $('#widgets-left').after( $( _tmpl ) );
    }
});//$.extend//extends api.CZRDynModule

var CZRSocialModuleMths = CZRSocialModuleMths || {};

$.extend( CZRSocialModuleMths, {
  initialize: function( id, options ) {
          var module = this;
          api.CZRDynModule.prototype.initialize.call( module, id, options );
          $.extend( module, {
                itemPreAddEl : 'czr-module-social-pre-add-view-content',
                itemInputList : 'czr-module-social-item-content'
          } );


          this.social_icons = [
            '500px','adn','amazon','android','angellist','apple','behance','behance-square','bitbucket','bitbucket-square','black-tie','btc','buysellads','chrome','codepen','codiepie','connectdevelop','contao','dashcube','delicious','delicious','deviantart','digg','dribbble','dropbox','drupal','edge','empire','expeditedssl','facebook','facebook','facebook-f (alias)','facebook-official','facebook-square','firefox','flickr','fonticons','fort-awesome','forumbee','foursquare','get-pocket','gg','gg-circle','git','github','github','github-alt','github-square','git-square','google','google','google-plus','google-plus-circle','google-plus-official','google-plus-square', 'google-wallet','gratipay','hacker-news','houzz','instagram','internet-explorer','ioxhost','joomla','jsfiddle','lastfm','lastfm-square','leanpub','linkedin','linkedin','linkedin-square','linux','maxcdn','meanpath','medium','mixcloud','modx','odnoklassniki','odnoklassniki-square','opencart','openid','opera','optin-monster','pagelines','paypal','pied-piper','pied-piper-alt','pinterest','pinterest-p','pinterest-square','product-hunt','qq','rebel','reddit','reddit-alien','reddit-square','renren','rss','rss-square','safari','scribd','sellsy','share-alt','share-alt-square','shirtsinbulk','simplybuilt','skyatlas','skype','slack','slideshare','snapchat', 'soundcloud','spotify','stack-exchange','stack-overflow','steam','steam-square','stumbleupon','stumbleupon','stumbleupon-circle','tencent-weibo','trello','tripadvisor','tumblr','tumblr-square','twitch','twitter','twitter','twitter-square','usb','viacoin','vimeo','vimeo-square','vine','vk','weibo','weixin','whatsapp','wikipedia-w','windows','wordpress','xing','xing-square','yahoo','yahoo','y-combinator','yelp','youtube','youtube-play','youtube-square'
          ];
          module.inputConstructor = api.CZRInput.extend( module.CZRSocialsInputMths || {} );
          module.itemConstructor = api.CZRItem.extend( module.CZRSocialsItem || {} );
          this.defaultItemModel = {
                id : '',
                title : '' ,
                'social-icon' : '',
                'social-link' : '',
                'social-color' : serverControlParams.social_el_params.defaultSocialColor,
                'social-target' : 1
          };
          this.itemAddedMessage = serverControlParams.translatedStrings.socialLinkAdded;
          if ( _.has( api, 'czr_activeSectionId' ) && module.control.section() == api.czr_activeSectionId() && 'resolved' != module.isReady.state() ) {
             module.ready();
          }
          api.section( module.control.section() ).expanded.bind(function(to) {
                if ( 'resolved' == module.isReady.state() )
                  return;
                module.ready();
          });

          module.isReady.then( function() {
                module.preItem.bind( function( to, from ) {
                      if ( ! _.has(to, 'social-icon') )
                        return;
                      if ( _.isEqual( to['social-icon'], from['social-icon'] ) )
                        return;
                      module.updateItemModel( module.preItem, true );
                });
          });
  },//initialize
  updateItemModel : function( item_instance, is_preItem ) {
          var item = item_instance;
          is_preItem = is_preItem || false;
          if ( ! _.has( item(), 'social-icon') || _.isEmpty( item()['social-icon'] ) )
            return;

          var _new_model  = $.extend( true, {}, item() ),//always safer to deep clone ( alternative to _.clone() ) => we don't know how nested this object might be in the future.
              _new_title  = api.CZR_Helpers.capitalize( _new_model['social-icon'].replace('fa-', '') ),
              _new_color  = serverControlParams.social_el_params.defaultSocialColor;
          _new_title = [ serverControlParams.translatedStrings.followUs, _new_title].join(' ');

          if ( is_preItem ) {
              _new_model = $.extend( _new_model, { title : _new_title, 'social-color' : _new_color } );
              item.set( _new_model );
          } else {
              item.czr_Input('title').set( _new_title );
              item.czr_Input('social-link').set( '' );
              item.czr_Input('social-color').set( _new_color );
          }
  },









  CZRSocialsInputMths : {
          setupSelect : function() {
                var input      = this,
                    item = input.item,
                    module     = input.module,
                    socialList = module.social_icons,
                    _model = item();
                if ( _.isEmpty(_model.id) ) {
                  socialList = _.union( [serverControlParams.translatedStrings.selectSocialIcon], socialList );
                }
                _.each( socialList , function( icon_name, k ) {
                      var _value = ( 0 === k ) ? '' : 'fa-' + icon_name.toLowerCase(),
                          _attributes = {
                            value : _value,
                            html: api.CZR_Helpers.capitalize(icon_name)
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
                    item = input.item,
                    module     = input.module;

                $( 'input[data-type="social-color"]', input.container ).wpColorPicker( {
                          defaultColor : 'rgba(255,255,255,0.7)',
                          change : function( e, o ) {
                                if ( _.has(o, 'color') && 16777215 == o.color._color )
                                  $(this).val( 'rgba(255,255,255,0.7)' );
                                else
                                  $(this).val( o.color.toString() );

                                $(this).trigger('colorpickerchange').trigger('change');
                          }
                });
                $( 'input[data-type="social-color"]', input.container ).closest('div').on('click keydown', function() {
                      module._adjustScrollExpandedBlock( input.container );
                });
        }

  },//CZRSocialsInputMths









  CZRSocialsItem : {
          ready : function() {
                var item = this;
                api.CZRItem.prototype.ready.call( item );
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

                  return '<div><span class="fa ' + icon + '" style="color:' + color + '"></span> ' + title + '</div>';
          },
          writeItemViewTitle : function( model ) {
                  var item = this,
                      module     = item.module,
                      _model = model || item(),
                      _title = api.CZR_Helpers.capitalize( _model['social-icon'].replace('fa-', '') );

                  $( '.' + module.control.css_attr.item_title , item.container ).html(
                    item._buildTitle( _title, _model['social-icon'], _model['social-color'] )
                  );
          }
  },//CZRSocialsItem

});

var CZRWidgetAreaModuleMths = CZRWidgetAreaModuleMths || {};

$.extend( CZRWidgetAreaModuleMths, {
  initialize: function( id, constructorOptions ) {
          var module = this;

          api.CZRDynModule.prototype.initialize.call( this, id, constructorOptions );
          $.extend( module, {
                itemPreAddEl : 'czr-module-widgets-pre-add-view-content',
                itemInputList : 'czr-module-widgets-item-input-list',
                itemInputListReduced : 'czr-module-widgets-item-input-list-reduced',
                ruItemPart : 'czr-module-widgets-ru-item-part'
          } );
          module.inputConstructor = api.CZRInput.extend( module.CZRWZonesInputMths || {} );
          module.itemConstructor = api.CZRItem.extend( module.CZRWZonesItem || {} );

          module.serverParams = serverControlParams.widget_area_el_params || {};
          module.contexts = _.has( module.serverParams , 'sidebar_contexts') ? module.serverParams.sidebar_contexts : {};
          module.context_match_map = {
                  is_404 : '404',
                  is_category : 'archive-category',
                  is_home : 'home',
                  is_page : 'page',
                  is_search : 'search',
                  is_single : 'single'
          };


          module.locations = _.has( module.serverParams , 'sidebar_locations') ? module.serverParams.sidebar_locations : {};
          module.defaultItemModel = {
                  id : '',
                  title : serverControlParams.translatedStrings.widgetZone,
                  contexts : _.without( _.keys(module.contexts), '_all_' ),//the server list of contexts is an object, we only need the keys, whitout _all_
                  locations : [ module.serverParams.defaultWidgetLocation ],
                  description : ''
          };
          this.itemAddedMessage = serverControlParams.translatedStrings.widgetZoneAdded;
          this.listenToSidebarInsights();
          api.czr_widgetZoneSettings.bind( function( updated_data_sent_from_preview , from ) {
                  module.isReady.then( function() {
                        _.each( updated_data_sent_from_preview, function( _data, _key ) {
                              api.sidebar_insights( _key ).set( _data );
                        });
                  });
          });
          module.preItem_location_alert_view_state = new api.Value( 'closed');
          module.preItem_location_alert_view_state.callbacks.add( function( to, from ) {
                    module._toggleLocationAlertExpansion( module.container, to );
          });
          module.bind( 'item_added', function( model ) {
                  module.addWidgetSidebar( model );
          });

          module.bind( 'pre_item_api_remove' , function(model) {
                  module.removeWidgetSidebar( model );
          });
          var fixTopMargin = new api.Values();
          fixTopMargin.create('fixed_for_current_session');
          fixTopMargin.create('value');

          api.section(module.serverParams.dynWidgetSection).fixTopMargin = fixTopMargin;
          api.section(module.serverParams.dynWidgetSection).fixTopMargin('fixed_for_current_session').set(false);
          api.section(module.serverParams.dynWidgetSection).expanded.callbacks.add( function() { return module.widgetSectionReact.apply(module, arguments ); } );
          api.panel('widgets').expanded.callbacks.add( function(to, from) {
                module.widgetPanelReact();//setup some visual adjustments, must be ran each time panel is closed or expanded
                if ( 'resolved' == module.isReady.state() )
                  return;
                module.ready();
          });
  },//initialize
  ready : function() {
          var module = this;
          api.CZRDynModule.prototype.ready.call( module );
          module.preItemExpanded.callbacks.add( function( to, from ) {
                if ( ! to )
                  return;
                module.preItem.czr_Input('locations')._setupLocationSelect( true );//true for refresh
                module.preItem.czr_Input('locations').mayBeDisplayModelAlert();
          });
  },
  initializeModuleModel : function( constructorOptions ) {
              var module = this;
              constructorOptions.items = _.union( _.has( module.serverParams, 'default_zones' ) ? module.serverParams.default_zones : [], constructorOptions.items );
              return constructorOptions;
  },
















  CZRWZonesInputMths : {
          ready : function() {
                  var input = this;

                  input.bind('locations:changed', function(){
                      input.mayBeDisplayModelAlert();
                  });

                  api.CZRInput.prototype.ready.call( input);
          },
          setupSelect : function() {
                  var input      = this;
                  if ( 'locations' == this.id )
                    this._setupLocationSelect();
                  if ( 'contexts' == this.id )
                    this._setupContextSelect();

          },
          _setupContextSelect : function() {
                  var input      = this,
                      input_contexts = input(),
                      item = input.item,
                      module     = input.module;
                  _.each( module.contexts, function( title, key ) {
                        var _attributes = {
                              value : key,
                              html: title
                            };
                        if ( key == input_contexts || _.contains( input_contexts, key ) )
                          $.extend( _attributes, { selected : "selected" } );

                        $( 'select[data-type="contexts"]', input.container ).append( $('<option>', _attributes) );
                  });
                  $( 'select[data-type="contexts"]', input.container ).select2();
          },
          _setupLocationSelect : function(refresh ) {
                  var input      = this,
                      input_locations = input(),
                      item = input.item,
                      module     = input.module,
                      available_locs = api.sidebar_insights('available_locations')();
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
                          '<span class="czr-unavailable-location fa fa-ban" title="' + serverControlParams.translatedStrings.unavailableLocation + '">&nbsp;&nbsp;' + state.text + '</span>'
                        );
                        return $state;
                  }

                  if ( refresh ) {
                        $( 'select[data-type="locations"]', input.container ).select2( 'destroy' );
                  }
                  $( 'select[data-type="locations"]', input.container ).select2( {
                    templateResult: setAvailability,
                    templateSelection: setAvailability
                  });
          },
          mayBeDisplayModelAlert : function() {
                  var input      = this,
                      item = input.item,
                      module     = input.module;
                  if ( ! _.has( item(), 'locations') || _.isEmpty( item().locations ) )
                    return;

                  var _selected_locations = $('select[data-type="locations"]', input.container ).val(),
                      available_locs = api.sidebar_insights('available_locations')(),
                      _unavailable = _.filter( _selected_locations, function( loc ) {
                        return ! _.contains(available_locs, loc);
                      });
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
                  item.czr_itemLocationAlert = new api.Value();

                  api.CZRItem.prototype.initialize.call( item, null, options );
          },
          itemWrapperViewSetup : function() {
                  var item = this,
                      module = item.module;

                  api.CZRItem.prototype.itemWrapperViewSetup.call(item);
                  item.czr_itemLocationAlert.set('closed');
                  item.czr_itemLocationAlert.callbacks.add( function( to, from ) {
                        module._toggleLocationAlertExpansion( item.container , to );
                  });
                  item.writeSubtitleInfos(item());
                  item.czr_ItemState.callbacks.add( function( to, from ) {
                        if ( -1 == to.indexOf('expanded') )//can take the expanded_noscroll value !
                          return;
                        item.contentRendered.then( function() {
                              item.czr_Input('locations')._setupLocationSelect( true );//true for refresh
                              item.czr_Input('locations').mayBeDisplayModelAlert();
                        });

                  });
          },
          itemReact : function(to, from) {
                  var item = this;
                  api.CZRItem.prototype.itemReact.call(item, to, from);

                  item.writeSubtitleInfos(to);
                  item.updateSectionTitle(to).setModelUpdateTimer();
          },
          writeSubtitleInfos : function(model) {
                  var item = this,
                      module = item.module,
                      _model = _.clone( model || item() ),
                      _locations = [],
                      _contexts = [],
                      _html = '';

                  if ( ! item.container.length )
                    return this;
                  _model.locations =_.isString(_model.locations) ? [_model.locations] : _model.locations;
                  _.each( _model.locations, function( loc ) {
                        if ( _.has( module.locations , loc ) )
                          _locations.push(module.locations[loc]);
                        else
                          _locations.push(loc);
                    }
                  );
                  _model.contexts =_.isString(_model.contexts) ? [_model.contexts] : _model.contexts;
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
                  var _locationText = serverControlParams.translatedStrings.locations,
                      _contextText = serverControlParams.translatedStrings.contexts,
                      _notsetText = serverControlParams.translatedStrings.notset;

                  _locations = _.isEmpty( _locations ) ? '<span style="font-weight: bold;">' + _notsetText + '</span>' : _locations.join(', ');
                  _contexts = _.isEmpty( _contexts ) ? '<span style="font-weight: bold;">' + _notsetText + '</span>' : _contexts.join(', ');

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
          updateSectionTitle : function(model) {
                  var _sidebar_id = 'sidebar-widgets-' + model.id,
                      _new_title  = model.title;
                  if ( ! api.section.has(_sidebar_id) )
                    return this;
                  $('.accordion-section-title', api.section(_sidebar_id).container ).text(_new_title);
                  $('.customize-section-title h3', api.section(_sidebar_id).container ).html(
                    '<span class="customize-action">' + api.section(_sidebar_id).params.customizeAction + '</span>' + _new_title
                  );
                  return this;
          },
          setModelUpdateTimer : function() {
                  var item = this,
                      module = item.module;

                  clearTimeout( $.data(this, 'modelUpdateTimer') );
                  $.data(
                      this,
                      'modelUpdateTimer',
                      setTimeout( function() {
                          module.control.refreshPreview();
                      } , 1000)
                  );//$.data
          },
          _hasModelAllContexts : function( model ) {
                  var item = this,
                      module = item.module,
                      moduleContexts = _.keys(module.contexts);

                  model = model || this();

                  if ( ! _.has(model, 'contexts') )
                    return;

                  if ( _.contains( model.contexts, '_all_') )
                    return true;
                  return _.isEmpty( _.difference( _.without(moduleContexts, '_all_') , model.contexts ) );
          },
          _getMatchingContexts : function( defaults ) {
                  var module = this,
                      _current = api.czr_wp_conditionals() || {},
                      _matched = _.filter(module.context_match_map, function( hu, wp ) { return true === _current[wp]; });

                  return _.isEmpty( _matched ) ? defaults : _matched;

          }
  },//CZRWZonesItem
  addWidgetSidebar : function( model, sidebar_data ) {
          if ( ! _.isObject(model) && _.isEmpty(sidebar_data) ) {
            throw new Error('No valid input were provided to add a new Widget Zone.');
          }
          var module = this,
              _model        = ! _.isEmpty(model) ? _.clone(model) : sidebar_data,
              _new_sidebar  = _.isEmpty(model) ? sidebar_data : $.extend(
                _.clone( _.findWhere( api.Widgets.data.registeredSidebars, { id: module.serverParams.defaultWidgetSidebar } ) ),
                {
                  name : _model.title,
                  id : _model.id
                }
              );
          api.Widgets.registeredSidebars.add( _new_sidebar );
          var _params = $.extend(
                  _.clone( api.section( "sidebar-widgets-" + module.serverParams.defaultWidgetSidebar ).params ),
                  {
                    id : "sidebar-widgets-" + _model.id,
                    instanceNumber: _.max(api.settings.sections, function(sec){ return sec.instanceNumber; }).instanceNumber + 1,
                    sidebarId: _new_sidebar.id,
                    title: _new_sidebar.name,
                    description : 'undefined' != typeof(sidebar_data) ? sidebar_data.description : api.section( "sidebar-widgets-" + module.serverParams.defaultWidgetSidebar ).params.description,
                    priority: _.max( _.omit( api.settings.sections, module.serverParams.dynWidgetSection), function(sec){ return sec.instanceNumber; }).priority + 1,
                  }
          );

          api.section.add( _params.id, new api.sectionConstructor[ _params.type ]( _params.id ,{ params : _params } ) );
          api.settings.sections[ _params.id ] = _params.id;
          var _new_set_id = 'sidebars_widgets['+_model.id+']',
              _new_set    = $.extend(
                _.clone( api.settings.settings['sidebars_widgets[' + module.serverParams.defaultWidgetSidebar + ']'] ),
                {
                  value:[]
                }
              );
          api.settings.settings[ _new_set_id ] = _new_set;
          api.create( _new_set_id, _new_set_id, _new_set.value, {
                  transport: _new_set.transport,
                  previewer: api.previewer,
                  dirty: false
          } );
          var _cloned_control = $.extend(
                    _.clone( api.settings.controls['sidebars_widgets[' + module.serverParams.defaultWidgetSidebar + ']'] ),
                    {
                      settings : { default : _new_set_id }
                }),
              _new_control = {};
          _.each( _cloned_control, function( param, key ) {
                  if ( 'string' == typeof(param) ) {
                    param = param.replace( module.serverParams.defaultWidgetSidebar , _model.id );
                  }
                  _new_control[key] = param;
          });
          _new_control.instanceNumber = _.max(api.settings.controls, function(con){ return con.instanceNumber; }).instanceNumber + 1;
          api.settings.controls[_new_set_id] = _new_control;
          api.control.add( _new_set_id, new api.controlConstructor[ _new_control.type ]( _new_set_id, {
                  params: _new_control,
                  previewer: api.previewer
          } ) );
          if ( _.has(this, 'container') )
            this.container.trigger( 'widget_zone_created', { model : _model, section_id : "sidebar-widgets-" + _model.id , setting_id : _new_set_id });

  },//addWidgetSidebar
  removeWidgetSidebar : function( model ) {
          var module = this;
          if ( ! _.isObject(model) || _.isEmpty(model) ) {
            throw new Error('No valid data were provided to remove a Widget Zone.');
          }
          api.Widgets.registeredSidebars.remove( model.id );
          if ( api.section.has("sidebar-widgets-" + model.id) ) {
                  api.section("sidebar-widgets-" + model.id).container.remove();
                  api.section.remove( "sidebar-widgets-" + model.id );
                  delete api.settings.sections[ "sidebar-widgets-" + model.id ];
          }
          if ( api.has('sidebars_widgets['+model.id+']') ) {
                  api.remove( 'sidebars_widgets['+model.id+']' );
                  delete api.settings.settings['sidebars_widgets['+model.id+']'];
          }
          if ( api.control.has('sidebars_widgets['+model.id+']') ) {
                  api.control( 'sidebars_widgets['+model.id+']' ).container.remove();
                  api.control.remove( 'sidebars_widgets['+model.id+']' );
                  delete api.settings.controls['sidebars_widgets['+model.id+']'];
          }
          var _refresh = function() {
            api.previewer.refresh();
          };
          _refresh = _.debounce( _refresh, 500 );
          $.when( _refresh() ).done( function() {
                module.trigger( 'widget_zone_removed',
                      {
                            model : model,
                            section_id : "sidebar-widgets-" + model.id ,
                            setting_id : 'sidebars_widgets['+model.id+']'
                      }
                );
          });


  },
  widgetPanelReact : function() {
          var module = this;
          var _top_margin = api.panel('widgets').container.find( '.control-panel-content' ).css('margin-top');
          api.section(module.serverParams.dynWidgetSection).fixTopMargin('value').set( _top_margin );

          var _section_content = api.section(module.serverParams.dynWidgetSection).container.find( '.accordion-section-content' ),
            _panel_content = api.panel('widgets').container.find( '.control-panel-content' ),
            _set_margins = function() {
                  _section_content.css( 'margin-top', '' );
                  _panel_content.css('margin-top', api.section(module.serverParams.dynWidgetSection).fixTopMargin('value')() );
            };
          api.bind( 'pane-contents-reflowed', _.debounce( function() {
                  _set_margins();
          }, 150 ) );
          module.closeAllItems();
          if ( _.has( module, 'preItemExpanded' ) )
            module.preItemExpanded.set(false);
  },//widgetPanelReact()
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
            sectionTitle.attr( 'tabindex', '0' );
            content.css( 'margin-top', '' );
            container.scrollTop( 0 );
          }

          module.closeAllItems();

          content.slideToggle();
  },
  listenToSidebarInsights : function() {
          var module = this;
          api.sidebar_insights('registered').callbacks.add( function( _registered_zones ) {
                  var _current_collection = _.clone( module.itemCollection() );
                  _.map(_current_collection, function( _model ) {
                    if ( ! module.getViewEl(_model.id).length )
                      return;

                    module.getViewEl(_model.id).css('display' , _.contains( _registered_zones, _model.id ) ? 'block' : 'none' );
                  });
          });
          api.sidebar_insights('inactives').callbacks.add( function( _inactives_zones ) {
                  var _current_collection = _.clone( module.itemCollection() );
                  _.map(_current_collection, function( _model ) {
                    if ( ! module.getViewEl(_model.id).length )
                      return;

                    if ( _.contains( _inactives_zones, _model.id ) ) {
                      module.getViewEl( _model.id ).addClass('inactive');
                      if ( ! module.getViewEl( _model.id ).find('.czr-inactive-alert').length )
                        module.getViewEl( _model.id ).find('.czr-item-title').append(
                          $('<span/>', {class : "czr-inactive-alert", html : " [ " + serverControlParams.translatedStrings.inactiveWidgetZone + " ]" })
                        );
                    }
                    else {
                      module.getViewEl( _model.id ).removeClass('inactive');
                      if ( module.getViewEl( _model.id ).find('.czr-inactive-alert').length )
                        module.getViewEl( _model.id ).find('.czr-inactive-alert').remove();
                    }
                  });
          });
          api.sidebar_insights('candidates').callbacks.add( function(_candidates) {
                  if ( ! _.isArray(_candidates) )
                    return;
                  _.map( _candidates, function( _sidebar ) {
                    if ( ! _.isObject(_sidebar) )
                      return;
                    if ( api.section.has("sidebar-widgets-" +_sidebar.id ) )
                      return;
                    module.addWidgetSidebar( {}, _sidebar );
                    if ( _.has( api.sidebar_insights('actives')(), _sidebar.id ) && api.section.has("sidebar-widgets-" +_sidebar.id ) )
                      api.section( "sidebar-widgets-" +_sidebar.id ).activate();
                  });
          });
  },//listenToSidebarInsights()
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
  getDefaultModel : function(id) {
          var module = this,
              _current_collection = module.itemCollection(),
              _default = _.clone( module.defaultItemModel ),
              _default_contexts = _default.contexts;
          return $.extend( _default, {
              title : 'Widget Zone ' +  ( _.size(_current_collection)*1 + 1 )
            });
  },
  getTemplateEl : function( type, item_model ) {
          var module = this, _el;
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






  _toggleLocationAlertExpansion : function($view, to) {
          var $_alert_el = $view.find('.czr-location-alert');

          if ( ! $_alert_el.length ) {
                var _html = [
                  '<span>' + serverControlParams.translatedStrings.locationWarning + '</span>',
                  api.CZR_Helpers.getDocSearchLink( serverControlParams.translatedStrings.locationWarning ),
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


});//$.extend()//extends api.CZRDynModule

var CZRFeaturedPageModuleMths = CZRFeaturedPageModuleMths || {};

$.extend( CZRFeaturedPageModuleMths, {
  initialize: function( id, options ) {
          var module = this;
          api.CZRDynModule.prototype.initialize.call( module, id, options );
          $.extend( module, {
                itemPreAddEl : 'czr-module-fp-pre-add-view-content',
                itemInputList : 'czr-module-fp-view-content'
          } );
          module.inputConstructor = api.CZRInput.extend( module.CZRFeaturedPagesInputMths || {} );
          module.itemConstructor = api.CZRItem.extend( module.CZRFeaturedPagesItem || {} );
          this.defaultItemModel = {
              id : '',
              title : '' ,
              'fp-post'  : '',
              'fp-title' : '',
              'fp-text'  : '',
              'fp-image' : '',
          };
          this.itemAddedMessage = serverControlParams.translatedStrings.featuredPageAdded;
          api.section( module.control.section() ).expanded.bind(function(to) {
            if ( 'resolved' == module.isReady.state() )
                  return;
            module.ready();
          });

  },//initialize
  addItem : function(obj) {

          var module     = this,
              item       = module.preItem,
              item_model = item();

          if ( _.isEmpty(item_model) || ! _.isObject(item_model) ) {
              throw new Error('addItem : an item should be an object and not empty. In : ' + module.id +'. Aborted.' );
          }

          var _fp_post        = item_model['fp-post'];
          if ( typeof _fp_post  == "undefined" )
            return;

          _fp_post = _fp_post[0];
          var done_callback =  function( _to_update ) {
                item.set( $.extend( item_model, _to_update) );
                api.CZRDynModule.prototype.addItem.call( module, obj );
          };

          var request = module.CZRFeaturedPagesItem.setContentAjaxInfo( _fp_post.id, {}, done_callback );

  },







  CZRFeaturedPagesInputMths : {
          ready : function() {
                  var input = this;
                  input.bind( 'fp-post:changed', function(){
                    input.updateItemModel();
                  });
                  input.bind( 'fp-title:changed', function(){
                    input.updateItemTitle();
                  });

                  api.CZRInput.prototype.ready.call( input );
          },
          setupImageUploader:  function(){
                  var input = this;
                  input.container.bind( 'fp-image:content_rendered', function(){
                    input.addResetDefaultButton();
                  });
                  input.container.on('click keydown', '.default-fpimage-button', function(){
                    input.setThumbnailAjax();
                  });

                  api.CZRInput.prototype.setupImageUploader.call( input );
          },
          updateItemModel : function( _new_val ) {

                  var input = this,
                      item = this.item,
                      is_preItemInput = _.has( input, 'is_preItemInput' ) && input.is_preItemInput;
                  if ( ! _.has( item(), 'fp-post') || _.isEmpty( item()['fp-post'] ) )
                    return;

                  var _new_model      = _.clone( item() ),
                      _fp_post        = _new_model['fp-post'][0],
                      _new_title      = _fp_post.title,
                      inputCollection = is_preItemInput ? input.module.preItemInput : item.czr_Input;

                  if ( is_preItemInput ) {
                        $.extend( _new_model, { title : _new_title, 'fp-title' : _new_title } );
                        item.set( _new_model );
                  } else {

                        var done_callback =  function( _to_update ) {
                          _.each( _to_update, function( value, id ){
                              item.czr_Input( id ).set( value );
                          });
                        };
                        var request = item.setContentAjaxInfo( _fp_post.id, {'fp-title' : _new_title}, done_callback );
                  }
          },


          updateItemTitle : function( _new_val ) {
                  var input = this,
                      item = this.item,
                      is_preItemInput = _.has( input, 'is_preItemInput' ) && input.is_preItemInput;

                  if ( is_preItemInput )
                    return;
                  var _new_model  = _.clone( item() ),
                      _new_title  = "undefined" !== typeof _new_model['fp-title'] ? _new_model['fp-title'] : '';

                  $.extend( _new_model, { title : _new_title} );
                  item.set( _new_model );
          },


          setThumbnailAjax : function() {
                  var item     = this.item,
                      _fp_post = item.czr_Input('fp-post')(),
                      _post_id;

                  if ( typeof _fp_post  == "undefined" )
                    return;

                  _fp_post = _fp_post[0];
                  _post_id = _fp_post.id;

                  $('.fpimage-reset-messages p').hide();
                  request = wp.ajax.post( 'get-fp-post-tb', {
                          'wp_customize': 'on',
                          'id'          : _post_id,
                          'CZRFPNonce'  : serverControlParams.CZRFPNonce
                  });


                  request.done( function( data ){
                          var thumbnail = data,
                              input = item.czr_Input('fp-image');

                          if ( 0 !== thumbnail.length ) {
                            $('.fpimage-reset-messages .success', input.container ).show('fast').fadeOut();
                            input.set( thumbnail );
                          }else {
                            $('.fpimage-reset-messages .warning', input.container ).show('fast').delay(2000).fadeOut();
                          }
                  });

                  request.fail(function( data ) {
                          if ( typeof console !== 'undefined' && console.error ) {
                            console.error( data );
                          }
                  });
          },

          addResetDefaultButton : function( $_template_params ) {
                  var input        = this,
                      item         = input.item,
                      buttonLabel  = serverControlParams.translatedStrings.featuredPageImgReset,
                      successMess  = serverControlParams.translatedStrings.featuredPageResetSucc,
                      errMess      = serverControlParams.translatedStrings.featuredPageResetErr,
                      messages     = '<div class="fpimage-reset-messages" style="clear:both"><p class="success" style="display:none">'+successMess+'</p><p class="warning" style="display:none">'+errMess+'</p></div>';

                  $('.actions', input.container)
                    .append('<button type="button" class="button default-fpimage-button">'+ buttonLabel +'</button>');
                  $('.fpimage-reset-messages', input.container ).detach();
                  $(input.container).append( messages );
          }
  },//CZRFeaturedPagesInputMths








  CZRFeaturedPagesItem : {
          setContentAjaxInfo : function( _post_id, _additional_inputs, done_callback ) {
                  var _to_update         = _additional_inputs || {};
                  request = wp.ajax.post( 'get-fp-post', {
                        'wp_customize': 'on',
                        'id'          : _post_id,
                        'CZRFPNonce'  : serverControlParams.CZRFPNonce
                  });

                  request.done( function( data ){
                        var _post_info = data.post_info;

                        if ( 0 !== _post_info.length ) {
                          $.extend( _to_update, { 'fp-image' : _post_info.thumbnail, 'fp-text' : _post_info.excerpt } );
                          if ( "function" === typeof done_callback )
                            done_callback( _to_update );
                        }
                  });

                  request.fail(function( data ) {
                        if ( typeof console !== 'undefined' && console.error ) {
                          console.error( data );
                        }
                  });

                  return request;
          },
          writeItemViewTitle : function( model ) {
                  var item = this,
                            module  = item.module,
                            _model = model || item(),
                            _title = _model.title ? _model.title : serverControlParams.translatedStrings.featuredPageTitle;

                  _title = api.CZR_Helpers.truncate(_title, 25);
                  $( '.' + module.control.css_attr.item_title , item.container ).html( _title );
                }
        }
});
var CZRTextModuleMths = CZRTextModuleMths || {};

$.extend( CZRTextModuleMths, {
  initialize: function( id, options ) {
          var module = this;
          api.CZRModule.prototype.initialize.call( module, id, options );
          $.extend( module, {
                itemInputList : 'czr-module-text-view-content',
          } );
          module.defaultItemModel = {
                id : '',
                text : ''
          };
  }//initialize
});//extends api.CZRDynModule

var CZRSlideModuleMths = CZRSlideModuleMths || {};

$.extend( CZRSlideModuleMths, {
  initialize: function( id, options ) {
          var module = this;
          api.CZRDynModule.prototype.initialize.call( module, id, options );
          $.extend( module, {
                itemPreAddEl : 'czr-module-slide-pre-item-input-list',
                itemInputList : 'czr-module-slide-item-input-list'
          } );
          module.inputConstructor = api.CZRInput.extend( module.CZRSliderInputMths || {} );
          module.itemConstructor = api.CZRItem.extend( module.CZRSliderItem || {} );
          this.defaultItemModel = {
              id : '',
              title : '',
              'slide-background' : '',
              'slide-title'      : '',
              'slide-subtitle'   : '',
          };
          this.itemAddedMessage = serverControlParams.translatedStrings.slideAdded;
  },//initialize


  CZRSliderInputMths : {
          ready : function() {
                var input = this;
                input.bind('slide-title:changed', function(){
                  input.updateItemTitle();
                });
                api.CZRInput.prototype.ready.call( input);
          },
          updateItemTitle : function( _new_val ) {
                var input = this,
                    item = this.item,
                    is_preItemInput = _.has( input, 'is_preItemInput' ) && input.is_preItemInput;

                var _new_model  = _.clone( item() ),
                    _new_title  = _new_model['slide-title'];

                $.extend( _new_model, { title : _new_title} );
                item.set( _new_model );
          },
  },//CZRSlidersInputMths
  CZRSliderItem : {
          writeItemViewTitle : function( model ) {
                var item = this,
                          module  = item.module,
                          _model = model || item(),
                          _title = _model.title ? _model.title : serverControlParams.translatedStrings.slideTitle;

                _title = api.CZR_Helpers.truncate(_title, 25);
                $( '.' + module.control.css_attr.item_title , item.container ).html( _title );
          }
  }
});//extends api.CZRDynModule

var CZRTextEditorModuleMths = CZRTextEditorModuleMths || {};

$.extend( CZRTextEditorModuleMths, {
  initialize: function( id, options ) {
          var module = this;
          api.CZRModule.prototype.initialize.call( module, id, options );
          $.extend( module, {
                itemInputList : 'czr-module-text_editor-item-content'
          } );
          module.inputConstructor = api.CZRInput.extend( module.CZRTextEditorInputMths || {} );
          module.itemConstructor = api.CZRItem.extend( module.CZRTextEditorItem || {} );
          this.defaultItemModel   = {
            id : '',
            text: ''
          };
  },//initialize




  CZRTextEditorInputMths : {
  },//CZRTextEditorsInputMths



  CZRTextEditorItem : {

  },
});//extends api.CZRModule
var CZRBodyBgModuleMths = CZRBodyBgModuleMths || {};

$.extend( CZRBodyBgModuleMths, {
  initialize: function( id, options ) {
          var module = this;
          api.CZRModule.prototype.initialize.call( module, id, options );
          $.extend( module, {
                itemInputList : 'czr-module-bodybg-item-content'
          } );
          module.inputConstructor = api.CZRInput.extend( module.CZRBodyBgInputMths || {} );
          module.itemConstructor = api.CZRItem.extend( module.CZBodyBgItemMths || {} );
          module.defaultItemModel = {
                'background-color' : '#eaeaea',
                'background-image' : '',
                'background-repeat' : 'no-repeat',
                'background-attachment' : 'fixed',
                'background-position' : 'center center',
                'background-size' : 'cover'
          };
          api.consoleLog('module ID', module.id );
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
          setupSelect : function() {
                  var input         = this,
                      _id_param_map = {
                        'background-repeat' : 'bg_repeat_options',
                        'background-attachment' : 'bg_attachment_options',
                        'background-position' : 'bg_position_options'
                      },
                      item          = input.item,
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
                  _.each( options, function( title, key ) {
                        var _attributes = {
                              value : key,
                              html: title
                            };
                        if ( key == input() || _.contains( input(), key ) )
                          $.extend( _attributes, { selected : "selected" } );

                        $( 'select[data-type]', input.container ).append( $('<option>', _attributes) );
                  });
                  $( 'select[data-type]', input.container ).select2();

          }
  },


  CZBodyBgItemMths : {
          ready : function() {
                var item = this;
                api.CZRItem.prototype.ready.call( item );

                item.czr_Input('background-image').isReady.done( function( input_instance ) {
                    var set_visibilities = function( bg_val  ) {
                          var is_bg_img_set = ! _.isEmpty( bg_val ) ||_.isNumber( bg_val);
                          _.each( ['background-repeat', 'background-attachment', 'background-position', 'background-size'], function( dep ) {
                                item.czr_Input(dep).container.toggle( is_bg_img_set || false );
                          });
                    };
                    set_visibilities( input_instance() );
                    item.bind('background-image:changed', function(){
                          set_visibilities( item.czr_Input('background-image')() );
                    });
                });
          },

  }
});//BASE CONTROL CLASS

var CZRBaseControlMths = CZRBaseControlMths || {};

$.extend( CZRBaseControlMths, {

  initialize: function( id, options ) {
          var control = this;
          control.css_attr = _.has( serverControlParams , 'css_attr') ? serverControlParams.css_attr : {};
          api.Control.prototype.initialize.call( control, id, options );
  },
  refreshPreview : function( obj ) {
          this.previewer.refresh();
  }

});//$.extend//CZRBaseControlMths
var CZRBaseModuleControlMths = CZRBaseModuleControlMths || {};

$.extend( CZRBaseModuleControlMths, {

  initialize: function( id, options ) {
          var control = this;

          control.czr_Module = new api.Values();
          control.czr_moduleCollection = new api.Value();
          control.czr_moduleCollection.set([]);
          control.moduleCollectionReady = $.Deferred();
          control.moduleCollectionReady.done( function( obj ) {
                if ( ! control.isMultiModuleControl( options.params ) ) {
                  api.consoleLog('MODULE COLLECTION READY IN CONTROL : ', control.id , obj.id, control.isModuleRegistered( obj.id ) );
                }
                control.czr_moduleCollection.callbacks.add( function() { return control.moduleCollectionReact.apply( control, arguments ); } );
          } );
          if ( control.isMultiModuleControl( options.params ) ) {
                control.syncSektionModule = new api.Value();
          }

          api.CZRBaseControl.prototype.initialize.call( control, id, options );

  },
  ready : function() {
          var control = this;
          if ( control.isMultiModuleControl() ) {
                control.syncSektionModule.bind( function( sektion_module_instance, from) {
                      if ( 'resolved' == control.moduleCollectionReady.state() )
                        return;
                      control.registerModulesOnInit( sektion_module_instance );
                      control.moduleCollectionReady.resolve();
                });
          } else {
                var single_module = {};
                console.log('control.getSavedModules()', control.getSavedModules() );
                _.each( control.getSavedModules() , function( _mod, _key ) {
                      single_module = _mod;
                      control.instantiateModule( _mod, {} );
                      control.container.attr('data-module', _mod.id );
                });
                control.moduleCollectionReady.resolve( single_module );
          }
          control.bind( 'user-module-candidate', function( _module ) {
                control.instantiateModule( _module, {} ).ready( _module.is_added_by_user ); //module, constructor
          });
  },
  getDefaultModuleApiModel : function() {
          var commonAPIModel = {
                id : '',//module.id,
                module_type : '',//module.module_type,
                items   : [],//$.extend( true, {}, module.items ),
                crud : false,
                multi_item : false,
                control : {},//control,
          };
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
  getDefaultModuleDBModel : function() {
          var commonDBModel = {
                items   : [],//$.extend( true, {}, module.items ),
          };
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
  isMultiModuleControl : function( params ) {
          return 'czr_multi_module' == ( params || this.params ).type;
  },
  getSyncCollectionControl : function() {
        var control = this;
        if ( _.isUndefined( control.params.syncCollection ) ) {
            throw new Error( 'Control ' + control.id + ' has no synchronized sektion control defined.');
        }
        return api.control( api.CZR_Helpers.build_setId( control.params.syncCollection ) );
  },
  getSavedModules : function() {
          var control = this,
              savedModules = [],
              _module_type = control.params.module_type;
          if ( control.isMultiModuleControl() ) {
              savedModules = $.extend( true, [], api(control.id)() );//deep clone
          } else {
              if ( api.CZR_Helpers.isMultiItemModule( _module_type ) && ! _.isEmpty( api(control.id)() ) && ! _.isObject( api(control.id)() ) ) {
                  api.consoleLog('Module Control Init for ' + control.id + '  : a mono item module control value should be an object if not empty.');
              }
              var _saved_items = _.isArray( api(control.id)() ) ? api(control.id)() : [ api(control.id)() ];
              savedModules.push(
                    {
                      id : api.CZR_Helpers.getOptionName( control.id ) + '_' + control.params.type,
                      module_type : control.params.module_type,
                      section : control.section(),
                      items   : $.extend( true, [] , _saved_items )//deep clone//must be a collection [] of items
                    }
              );
          }
          return savedModules;
  },
  isModuleRegistered : function( id_candidate ) {
        var control = this;
        return ! _.isUndefined( _.findWhere( control.czr_moduleCollection(), { id : id_candidate}) );
  },


});//$.extend//CZRBaseControlMths
var CZRBaseModuleControlMths = CZRBaseModuleControlMths || {};

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
          if ( ! _.isEmpty( module.sektion_id ) ) {
              parentConstructor = _base_constructor.extend( _mthds );
              constructor = parentConstructor.extend( control.getMultiModuleExtender( parentConstructor ) );
          } else {
              constructor = _base_constructor.extend( _mthds );
          }

          if ( _.isUndefined(constructor) || _.isEmpty(constructor) || ! constructor ) {
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

        _.each( control.getDefaultModuleApiModel() , function( _value, _key ) {
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
                    case 'crud' :
                        if ( _.has( api.czrModuleMap, module_candidate.module_type ) ) {
                          _candidate_val = api.czrModuleMap[ module_candidate.module_type ].crud;
                        } else if ( ! _.isUndefined( _candidate_val) && ! _.isBoolean( _candidate_val )  ) {
                            throw new Error('prepareModuleForAPI : the module param "crud" must be a boolean');
                        }
                        api_ready_module[_key] = _candidate_val || false;
                    break;
                    case 'multi_item' :
                        if ( _.has( api.czrModuleMap, module_candidate.module_type ) ) {
                          _candidate_val = api.czrModuleMap[ module_candidate.module_type ].crud || api.czrModuleMap[ module_candidate.module_type ].multi_item;
                        } else if ( ! _.isUndefined( _candidate_val) && ! _.isBoolean( _candidate_val )  ) {
                            throw new Error('prepareModuleForAPI : the module param "multi_item" must be a boolean');
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
var CZRBaseModuleControlMths = CZRBaseModuleControlMths || {};

$.extend( CZRBaseModuleControlMths, {
  registerModulesOnInit : function( sektion_module_instance ) {
          var control = this,
              _orphan_mods = [];

          _.each( control.getSavedModules() , function( _mod, _key ) {
                  if ( ! sektion_module_instance.czr_Item.has( _mod.sektion_id ) ) {
                      api.consoleLog('Warning Module ' + _mod.id + ' is orphan : it has no sektion to be embedded to. It Must be removed.');
                      _orphan_mods.push(_mod);
                      return;
                  }

                  var _sektion = sektion_module_instance.czr_Item( _mod.sektion_id );

                  if ( _.isUndefined( _sektion ) ) {
                    throw new Error('sektion instance missing. Impossible to instantiate module : ' + _mod.id );
                  }
                  $.extend( _mod, {sektion : _sektion} );
                  control.updateModulesCollection( {module : _mod } );
          });
          control.moduleCollectionReady.then( function() {
                if ( ! _.isEmpty( _orphan_mods ) ) {
                    control.moduleCollectionReact( control.czr_moduleCollection(), [], { orphans_module_removal : _orphan_mods } );
                }
          });
  },
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
          var module_api_ready = control.prepareModuleForAPI( _.clone(obj.module) );
          if ( _.findWhere( _new_collection, { id : module_api_ready.id } ) ) {
                _.each( _current_collection , function( _elt, _ind ) {
                      if ( _elt.id != module_api_ready.id )
                        return;
                      _new_collection[_ind] = module_api_ready;
                });
          }
          else {
                _new_collection.push(module_api_ready);
          }
          var _params = {};
          if ( _.has( obj, 'data') ) {
              _params = $.extend( true, {}, obj.data );
              $.extend( _params, { module : module_api_ready } );
          }
          control.czr_moduleCollection.set( _new_collection, _params );
  },
  moduleCollectionReact : function( to, from, data ) {
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
        if ( _.isObject( data  ) && _.has(data, 'module') ) {
            data.module = control.prepareModuleForDB( $.extend( true, {}, data.module  ) );
        }
        if ( ! control.isMultiModuleControl() && is_module_added )
          return;
        else
          api(this.id).set( control.filterModuleCollectionBeforeAjax(to), data );
  },
  filterModuleCollectionBeforeAjax : function( collection ) {
          var control = this,
              _filtered_collection = $.extend( true, [], collection );

          _.each( collection , function( _mod, _key ) {
                var db_ready_mod = $.extend( true, {}, _mod );
                _filtered_collection[_key] = control.prepareModuleForDB( db_ready_mod );
          });
          if ( control.isMultiModuleControl() ) {
                return _filtered_collection;
          } else {
                if ( _.size(collection) > 1 ) {
                  throw new Error('There should not be several modules in the collection of control : ' + control.id );
                }
                if ( ! _.isArray(collection) || _.isEmpty(collection) || ! _.has( collection[0], 'items' ) ) {
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
                if ( module_instance.isMultiItem() )
                  return module_instance().items;
                else {
                  return module_instance().items[0] || [];
                }
          }
  },
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
                    case 'items' :
                      if ( ! _.isArray( _candidate_val )  ) {
                          throw new Error('prepareModuleForDB : a module item list must be an array');
                      }
                      db_ready_module[ _key ] = _candidate_val;
                    break;
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
var CZRMultiModuleControlMths = CZRMultiModuleControlMths || {};

$.extend( CZRMultiModuleControlMths, {

  initialize: function( id, options ) {
          var control = this;
          api.consoleLog('IN MULTI MODULE INITIALIZE ? ', options );
          api(id).callbacks.add( function() { return control.syncColumn.apply( control, arguments ); } );

          api.CZRBaseModuleControl.prototype.initialize.call( control, id, options );

  },


  ready : function() {
      var control = this;
      api.consoleLog('MODULE-COLLECTION CONTROL READY', this.id );
      api.CZRBaseModuleControl.prototype.ready.apply( control, arguments);
  },
  syncColumn : function( to, from, data ) {
        api.consoleLog('IN SYNC COLUMN', to, from, data );
        if ( ! _.isUndefined(data) && data.silent )
          return;
        api.consoleLog('IN SYNXXX', api.control('hu_theme_options[module-collection]').syncSektionModule()(), this.syncSektionModule()(), this.id );
        if ( _.has( data, 'orphans_module_removal' ) )
          return;
        var control = api.control( this.id );
        var added_mod = _.filter( to, function( _mod, _key ){
            return ! _.findWhere( from, { id : _mod.id } );
        } );
        if ( ! _.isEmpty( added_mod ) ) {
              api.consoleLog('ADDED MODULE?', added_mod );
              _.each( added_mod, function( _mod ) {
                      control.syncSektionModule().czr_Column( _mod.column_id ).updateColumnModuleCollection( { module : _mod } );
              });
        }
        var removed_mod = _.filter( from, function( _mod, _key ){
            return ! _.findWhere( to, { id : _mod.id } );
        } );
        if ( ! _.isEmpty( removed_mod ) ) {
              _.each( removed_mod, function( _mod ) {
                      control.syncSektionModule().czr_Column( _mod.column_id ).removeModuleFromColumnCollection( _mod );
              });
        }
        if ( _.size(from) == _.size(to) && _.has( data, 'module') && _.has( data, 'source_column') && _.has( data, 'target_column') ) {
                $.when( control.syncSektionModule().moveModuleFromTo( data.module, data.source_column, data.target_column ) ).done( function() {
                      control.syncSektionModule().control.trigger('module-moved', { module : data.module, source_column: data.source_column, target_column :data.target_column });
                } );
        }
        control.trigger( 'columns-synchronized', to );
  },
  removeModule : function( module ) {
        var control = this;
        if ( control.czr_Module.has( module.id ) && 'resolved' == control.czr_Module( module.id ).embedded.state() )
            control.czr_Module( module.id ).container.remove();
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
var CZRMultiModuleControlMths = CZRMultiModuleControlMths || {};
$.extend( CZRMultiModuleControlMths, {
  getMultiModuleExtender : function( parentConstructor ) {
        var control = this;
        $.extend( control.CZRModuleExtended, {
              initialize: function( id, constructorOptions ) {
                    var module = this;
                    parentConstructor.prototype.initialize.call( module, id, constructorOptions );

                    api.consoleLog('MODULE INSTANTIATED : ', module.id );
                    $.extend( module, {
                          singleModuleWrapper : 'czr-single-module-wrapper',
                          sektionModuleTitle : 'czr-module-sektion-title-part',
                          ruModuleEl : 'czr-ru-module-sektion-content'
                    } );
                    module.czr_ModuleState = new api.Value( false );
                    module.isReady.done( function() {
                          module.setupModuleView();
                    });
                    module.moduleTitleEmbedded = $.Deferred();
                    module.modColumn = new api.Value();
                    module.modColumn.set( constructorOptions.column_id );
                    module.modColumn.bind( function( to, from ) {
                          api.consoleLog('MODULE ' + module.id + ' HAS BEEN MOVED TO COLUMN', to, module() );
                          var _current_model = module(),
                              _new_model = $.extend( true, {}, _current_model );

                          _new_model.column_id = to;
                          module.set( _new_model, { target_column : to, source_column : from } );
                    } );
              },
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
                      parentConstructor.prototype.ready.call( module );
              }

        });
        return control.CZRModuleExtended;
  },
  CZRModuleExtended  : {
        renderModuleWrapper : function( is_added_by_user ) {
                var module = this;
                if ( 'resolved' == module.embedded.state() )
                  return module.container;
                if ( 0 === $( '#tmpl-' + module.singleModuleWrapper ).length ) {
                  throw new Error('No template for module ' + module.id + '. The template script id should be : #tmpl-' + module.singleModuleWrapper );
                }

                var module_wrapper_tmpl = wp.template( module.singleModuleWrapper ),
                    tmpl_data = {
                        id : module.id,
                        type : module.module_type
                    },
                    $_module_el = $(  module_wrapper_tmpl( tmpl_data ) );
                if ( is_added_by_user ) {
                    $.when( $( '.czr-module-collection-wrapper' , module._getColumn().container ).find( '.czr-module-candidate').after( $_module_el ) ).
                      done( function() {
                        $( '.czr-module-collection-wrapper' , module._getColumn().container ).find( '.czr-module-candidate').remove();
                      });
                } else {
                    $( '.czr-module-collection-wrapper' , module._getColumn().container).append( $_module_el );
                }

                return $_module_el;
        },





        setupModuleView : function() {
                var module = this;

                module.view_event_map = [
                        {
                          trigger   : 'click keydown',
                          selector  : [ '.czr-remove-mod', '.' + module.control.css_attr.cancel_alert_btn ].join(','),
                          name      : 'toggle_remove_alert',
                          actions   : ['toggleModuleRemoveAlert']
                        },
                        {
                          trigger   : 'click keydown',
                          selector  : '.' + module.control.css_attr.remove_view_btn,
                          name      : 'remove_module',
                          actions   : ['removeModule']
                        },
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
                                module.control.previewer.send( 'start_hovering_module', {
                                      id : module.id
                                });
                          }
                        },
                        {
                          trigger   : 'mouseleave',
                          selector  : '.czr-mod-header',
                          name      : 'hovering_module',
                          actions   : function( obj ) {
                              module.control.previewer.send( 'stop_hovering_module', {
                                    id : module.id
                              });
                          }
                        }
                ];
                module.embedded.done( function() {
                      module.czr_ModuleState.callbacks.add( function() { return module.setupModuleViewStateListeners.apply(module, arguments ); } );
                      api.CZR_Helpers.setupDOMListeners(
                            module.view_event_map,//actions to execute
                            { module : { id : module.id } , dom_el:module.container },//model + dom scope
                            module //instance where to look for the cb methods
                      );//listeners for the view wrapper
                });
        },
        setModuleViewVisibility : function( obj, is_added_by_user ) {
              var module = this;

              module.czr_ModuleState( ! module.czr_ModuleState() );
              api.czrModulePanelState.set(false);
              api.czrSekSettingsPanelState.set(false);
              module.control.syncSektionModule().closeAllOtherSektions( $(obj.dom_event.currentTarget, obj.dom_el ) );
        },
        sendEditModule : function( obj ) {
              var module = this;
              module.control.previewer.send( 'edit_module', {
                    id : module.id
              });
        },
        setupModuleViewStateListeners : function( expanded ) {
              var module = this;
              api.czr_isModuleExpanded = api.czr_isModuleExpanded || new api.Value();

              if ( expanded )
                api.czr_isModuleExpanded( module );
              else
                api.czr_isModuleExpanded( false );
              $.when( module.toggleModuleViewExpansion( expanded ) ).done( function() {
                    if ( expanded ) {
                          module.renderModuleTitle();
                          module.populateSavedItemCollection();
                    }
                    else {
                          module.czr_Item.each ( function( item ) {
                                item.czr_ItemState.set('closed');
                                item._destroyView( 0 );
                                module.czr_Item.remove( item.id );
                          } );
                    }
              });
        },


        renderModuleTitle : function() {
              var module = this;
              if( 'resolved' == module.moduleTitleEmbedded.state() )
                return;
              if ( 0 === $( '#tmpl-' + module.sektionModuleTitle ).length ) {
                throw new Error('No sektion title Module Part template for module ' + module.id + '. The template script id should be : #tmpl-' + module.sektionModuleTitle );
              }
              $.when( $( module.container ).find('.czr-mod-content').prepend(
                    $( wp.template( module.sektionModuleTitle )( { id : module.id } ) )
              ) ).done( function() {
                    module.moduleTitleEmbedded.resolve();
              });
        },
        toggleModuleViewExpansion : function( expanded, duration ) {
              var module = this;
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
                if ( _.has(module, 'preItem') ) {
                    control.syncSektionModule().preItemExpanded.set( false );
                }
                $('.' + module.control.css_attr.remove_alert_wrapper, $_column_container ).not($_alert_el).each( function() {
                      if ( $(this).hasClass('open') ) {
                            $(this).slideToggle( {
                                  duration : 200,
                                  done : function() {
                                        $(this).toggleClass('open' , false );
                                        $(this).siblings().find('.' + module.control.css_attr.display_alert_btn).toggleClass('active' , false );
                                  }
                            } );
                      }
                });
                if ( ! wp.template( module.AlertPart )  || ! module.container ) {
                    throw new Error( 'No removal alert template available for module :' + module.id );
                }

                $_alert_el.html( wp.template( module.AlertPart )( { title : ( module().title || module.id ) } ) );
                $_alert_el.slideToggle( {
                      duration : 200,
                      done : function() {
                            var _is_open = ! $(this).hasClass('open') && $(this).is(':visible');
                            $(this).toggleClass('open' , _is_open );
                            $( obj.dom_el ).find('.' + module.control.css_attr.display_alert_btn).toggleClass( 'active', _is_open );
                            if ( _is_open )
                              module._adjustScrollExpandedBlock( module.container );
                      }
                } );
        },
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
var CZRMultiplePickerMths = CZRMultiplePickerMths || {};
$.extend( CZRMultiplePickerMths , {
  ready: function() {
    var control  = this,
        _select  = this.container.find('select');
    _select.on('change', function(e){
      if ( 0 === $(this).find("option:selected").length )
        control.setting.set([]);
    });
  }
});//$.extend
var CZRCroppedImageMths = CZRCroppedImageMths || {};

(function (api, $, _) {
  if ( 'function' != typeof wp.media.controller.Cropper  || 'function' != typeof api.CroppedImageControl  )
    return;
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
    $.extend( CZRCroppedImageMths , {
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
      onSelect: function() {
        var attachment = this.frame.state().get( 'selection' ).first().toJSON();
        if ( ! ( attachment.mime && attachment.mime.indexOf("image") > -1 ) ){
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
var CZRUploadMths = CZRUploadMths || {};
$.extend( CZRUploadMths, {
  ready: function() {
    var control = this;

    this.params.removed = this.params.removed || '';

    this.success = $.proxy( this.success, this );

    this.uploader = $.extend({
      container: this.container,
      browser:   this.container.find('.czr-upload'),
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
});//method definition
var CZRLayoutSelectMths = CZRLayoutSelectMths || {};

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
    $_select.select2( {
        templateResult: addImg,
        templateSelection: addImg,
        minimumResultsForSearch: Infinity
    });
  },
});//$.extend
(function (api, $, _) {
  $.extend( CZRBaseControlMths, api.Events );
  $.extend( CZRModuleMths, api.Events );
  $.extend( CZRItemMths, api.Events );
  $.extend( CZRSkopeBaseMths, api.Events );
  $.extend( CZRSkopeMths, api.Events );
  $.extend( CZRBaseControlMths, api.CZR_Helpers );
  $.extend( CZRInputMths, api.CZR_Helpers );
  $.extend( CZRModuleMths, api.CZR_Helpers );
  $.extend( CZRSkopeMths, api.CZR_Helpers );
  api.CZR_skopeBase             = api.Class.extend( CZRSkopeBaseMths );
  api.CZR_skope                 = api.Value.extend( CZRSkopeMths ); //=> used as constructor when creating the collection of skopes
  if ( _.has(api, 'HeaderTool') ) {
    api.czr_HeaderTool = $.extend(  true, {}, api.HeaderTool );
  }
  api.bind( 'ready' , function() {
        if ( serverControlParams.isSkopOn ) {
              api.czr_skopeBase = new api.CZR_skopeBase();
        }
  } );
  api.CZRInput                 = api.Value.extend( CZRInputMths );
  api.CZRItem                  = api.Value.extend( CZRItemMths );
  api.CZRModule               = api.Value.extend( CZRModuleMths );
  api.CZRDynModule            = api.CZRModule.extend( CZRDynModuleMths );
  api.CZRColumn                = api.Value.extend( CZRColumnMths );
  api.CZRBaseControl           = api.Control.extend( CZRBaseControlMths );
  api.CZRBaseModuleControl    = api.CZRBaseControl.extend( CZRBaseModuleControlMths );
  api.CZRMultiModuleControl        = api.CZRBaseModuleControl.extend( CZRMultiModuleControlMths );


  api.CZRUploadControl         = api.Control.extend( CZRUploadMths );
  api.CZRLayoutControl         = api.Control.extend( CZRLayoutSelectMths );
  api.CZRMultiplePickerControl = api.Control.extend( CZRMultiplePickerMths );



  $.extend( api.controlConstructor, {
        czr_upload     : api.CZRUploadControl,

        czr_module : api.CZRBaseModuleControl,
        czr_multi_module : api.CZRMultiModuleControl,

        czr_multiple_picker : api.CZRMultiplePickerControl,
        czr_layouts    : api.CZRLayoutControl
  });
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
            name : 'Social Icons'
        },
        czr_sektion_module : {
            mthds : CZRSektionMths,
            crud : true,
            name : 'Sektions'
        },
        czr_fp_module : {
            mthds : CZRFeaturedPageModuleMths,
            crud : true,
            name : 'Featured Pages'
        },
        czr_slide_module : {
            mthds : CZRSlideModuleMths,
            crud : true,
            name : 'Slider'
        },
        czr_text_module : {
            mthds : CZRTextModuleMths,
            crud : false,
            multi_item : false,
            name : 'Simple Text'
        },
        czr_text_editor_module : {
            mthds : CZRTextEditorModuleMths,
            crud : false,
            multi_item : false,
            name : 'WP Text Editor'
        },
        czr_background : {
            mthds : CZRBodyBgModuleMths,
            crud : false,
            multi_item : false,
            name : 'Slider'
        }
  });


  if ( 'function' == typeof api.CroppedImageControl ) {
    api.CZRCroppedImageControl   = api.CroppedImageControl.extend( CZRCroppedImageMths );

    $.extend( api.controlConstructor, {
      czr_cropped_image : api.CZRCroppedImageControl
    });
  }

})( wp.customize, jQuery, _);

(function (api, $, _) {
  var $_nav_section_container,
      translatedStrings = serverControlParams.translatedStrings || {};

  api.bind( 'ready' , function() {
    if ( ! _.has( api, 'czr_visibilities') )
      api.czr_visibilities = new api.CZR_visibilities();
  } );


  api.CZR_visibilities = api.Class.extend( {
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
                this.dominiDeps = _.extend( this.dominiDeps, this._getControlDeps() );
                if ( ! _.isArray( self.dominiDeps ) ) {
                    throw new Error('Visibilities : the dominos dependency array is not an array.');
                }
                api.czr_activeSectionId.bind( function( section_id ) {
                    self.setServiVisibility( section_id );
                });
                api.bind( 'awaken-section', function( target_source ) {
                      if ( _.has( api ,'czr_skopeBase' ) ) {
                            var _promises = api.czr_skopeBase.processSilentUpdates( {
                                  silent_update_candidates : {},
                                  section_id : target_source.target
                            } );
                            $.when.apply( null, _promises )
                                  .then( function() {
                                        self.setServiVisibility( target_source.target, target_source.source );
                                  });
                      } else {
                            self.setServiVisibility( target_source.target, target_source.source );
                      }
                });
                this._handleFaviconNote();
          },
          setServiVisibility : function( targetSectionId, sourceSectionId ) {
                var self = this, params;
                if ( _.isUndefined( targetSectionId ) || ! api.section.has( targetSectionId ) ) {
                  throw new Error( 'Visibilities : the targetSectionId is missing or not registered : ' + targetSectionId );
                }
                _.each( self.dominiDeps , function( params ) {
                      params = self._prepareDominusParams( params );
                      var wpDominusId = api.CZR_Helpers.build_setId( params.dominus );
                      if ( api.control( wpDominusId ).section() != targetSectionId )
                        return;
                      self._processDominusCallbacks( params.dominus, params );
                });
                var _secCtrls = api.CZR_Helpers.getSectionControlIds( targetSectionId ),
                    _getServusDomini = function( shortServudId ) {
                          var _dominiIds = [];
                          _.each( self.dominiDeps , function( params ) {
                                params = self._prepareDominusParams( params );
                                if ( _.contains( params.servi , shortServudId ) &&  ! _.contains( _dominiIds , params.dominus ) ) {
                                    _dominiIds.push( params.dominus );
                                }
                          });
                          return ! _.isArray( _dominiIds ) ? [] : _dominiIds;
                    },
                    _servusDominiIds = [];
                _.each( _secCtrls, function( servusCandidateId ) {
                      if ( _.isEmpty( _getServusDomini( servusCandidateId ) ) )
                        return;

                      _servusDominiIds = _.union( _servusDominiIds, _getServusDomini( servusCandidateId ) );
                });
                _.each( _servusDominiIds, function( shortDominusId ){
                      var wpDominusId = api.CZR_Helpers.build_setId( shortDominusId );
                      if ( api.control( wpDominusId ).section() == targetSectionId )
                          return;
                      if ( sourceSectionId == api.control( wpDominusId ).section() )
                          return;
                      api.trigger( 'awaken-section', {
                          target : api.control( wpDominusId ).section(),
                          source : targetSectionId
                      } );
                } );

          },
          _deferCallbackForControl : function( wpCrtlId, callback, args ) {
                if ( _.isEmpty(wpCrtlId) || ! _.isString(wpCrtlId) ) {
                    throw new Error( '_deferCallbackForControl : the control id is missing.' );
                }
                if ( ! _.isFunction( callback ) ) {
                    throw new Error( '_deferCallbackForControl : callback must be a funtion.' );
                }
                args = ( _.isUndefined(args) || ! _.isArray( args ) ) ? [] : args;

                if ( api.control.has( wpCrtlId ) ) {
                      if ( 'resolved' == api.control(wpCrtlId ).deferred.embedded.state() ) {
                            callback.apply( null, args );
                      } else {
                            api.control( wpCrtlId ).deferred.embedded.then( function(){
                                  callback.apply( null, args );
                            });
                      }
                } else {
                      api.control.when( wpCrtlId, function() {
                            api.control( wpCrtlId ).deferred.embedded.then( function(){
                                  callback.apply( null, args );
                            });
                      });
                }
          },
          _processDominusCallbacks : function( shortDominusId, dominusParams ) {
                var self = this,
                    wpDominusId = api.CZR_Helpers.build_setId( shortDominusId ),
                    dominusSetInst = api( wpDominusId );
                _.each( dominusParams.servi , function( servusShortSetId ) {
                        if ( ! api.control.has( api.CZR_Helpers.build_setId( servusShortSetId ) ) ) {
                            return;
                        }
                        var _fireDominusCallbacks = function( dominusSetVal, servusShortSetId, dominusParams ) {
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
                                  );
                            };
                        _deferCallbacks();
                        if ( ! _.has( dominusSetInst, 'czr_visibilityServi' ) )
                            dominusSetInst.czr_visibilityServi = new api.Value( [] );
                        var _currentDependantBound = dominusSetInst.czr_visibilityServi();
                        if ( ! _.contains( _currentDependantBound, servusShortSetId ) ) {
                              dominusSetInst.bind( function( dominusSetVal ) {
                                  _deferCallbacks( dominusSetVal );
                              });
                              dominusSetInst.czr_visibilityServi( _.union( _currentDependantBound, [ servusShortSetId ] ) );
                        }
                } );//_.each
          },
          _setVisibility : function ( dominusSetVal, servusShortSetId, dominusParams ) {
                var wpServusSetId = api.CZR_Helpers.build_setId( servusShortSetId ),
                    visibility = dominusParams.visibility( dominusSetVal, servusShortSetId, dominusParams.dominus );
                if ( ! _.isBoolean( visibility ) || 'unchanged' == visibility )
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
          },
          _getControlDeps : function() {
            return {};
          },
          _prepareDominusParams : function( params_candidate ) {
                var self = this,
                    _ready_params = {};
                if ( ! _.isObject( params_candidate ) ) {
                    throw new Error('Visibilities : a dominus param definition must be an object.');
                }
                if ( ! _.has( params_candidate, 'visibility' ) && ! _.has( params_candidate, 'actions' ) ) {
                    throw new Error('Visibilities : a dominus definition must include a visibility or an actions callback.');
                }
                if ( ! _.has( params_candidate, 'dominus' ) || ! _.isString( params_candidate.dominus ) || _.isEmpty( params_candidate.dominus ) ) {
                      throw new Error( 'Visibilities : a dominus control id must be a not empty string.');
                }
                var wpDominusId = api.CZR_Helpers.build_setId( params_candidate.dominus );
                if ( ! api.control.has( wpDominusId ) ) {
                      throw new Error( 'Visibilities : a dominus control id is not registered : ' + wpDominusId );
                }
                if ( ! _.has( params_candidate, 'servi' ) || _.isUndefined( params_candidate.servi ) || ! _.isArray( params_candidate.servi ) || _.isEmpty( params_candidate.servi ) ) {
                      throw new Error( 'Visibilities : servi must be set as an array not empty.');
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
          _handleFaviconNote : function() {
                var self = this,
                    _fav_setId = api.CZR_Helpers.build_setId( serverControlParams.faviconOptionName );
                if ( ! api.has('site_icon') || ! api.control('site_icon') || ( api.has( _fav_setId ) && 0 === + api( _fav_setId )() ) || + api('site_icon')() > 0 )
                  return;

                var _oldDes     = api.control('site_icon').params.description;
                    _newDes     = ['<strong>' , translatedStrings.faviconNote || '' , '</strong><br/><br/>' ].join('') + _oldDes;
                self._printFaviconNote(_newDes );
                api('site_icon').callbacks.add( function(to) {
                  if ( +to > 0 ) {
                    api.control('site_icon').container.find('.description').text(_oldDes);
                    if ( api.has( _fav_setId ) )
                      api( _fav_setId ).set("");
                  }
                  else {
                    self._printFaviconNote(_newDes );
                  }
                });
          },
          _printFaviconNote : function( _newDes ) {
                api.control('site_icon').container.find('.description').html(_newDes);
          }
    }
  );//api.Class.extend() //api.CZR_visibilities

})( wp.customize, jQuery, _);//DOM READY :
(function (wp, $) {
  $( function($) {
    var api = wp.customize || api;
    $('.accordion-section').not('.control-panel').click( function () {
      _recenter_current_section($(this));
    });

    function _recenter_current_section( section ) {
      var $siblings               = section.siblings( '.open' );
      if ( 0 !== $siblings.length &&  $siblings.offset().top < 0 ) {
        $('.wp-full-overlay-sidebar-content').animate({
              scrollTop:  - $('#customize-theme-controls').offset().top - $siblings.height() + section.offset().top + $('.wp-full-overlay-sidebar-content').offset().top
        }, 700);
      }
    }//end of fn
    api.czrSetupCheckbox = function( controlId, refresh ) {
      $('input[type=checkbox]', api.control(controlId).container ).each( function() {
        if ( 0 === $(this).val() || '0' == $(this).val() || 'off' == $(this).val() || _.isEmpty($(this).val() ) ) {
          $(this).prop('checked', false);
        } else {
          $(this).prop('checked', true);
        }
        if ( 0 !== $(this).closest('div[class^="icheckbox"]').length )
          return;

        $(this).iCheck({
          checkboxClass: 'icheckbox_flat-grey',
          radioClass: 'iradio_flat-grey',
        })
        .on( 'ifChanged', function(e){
          $(this).val( false === $(this).is(':checked') ? 0 : 1 );
          $(e.currentTarget).trigger('change');
        });
      });
    };//api.czrSetupCheckbox()
    api.czrSetupSelect = function(controlId, refresh) {
      $('select[data-customize-setting-link]', api.control(controlId).container ).not('.no-selecter-js')
        .each( function() {
          $(this).selecter({
          });
      });
    };//api.czrSetupSelect()
    api.czrSetupStepper = function(controlId, refresh) {
      $('input[type="number"]', api.control(controlId).container ).each( function() {
          $(this).stepper();
      });
    };//api.czrSetupStepper()

    api.control.each(function(control){
      if ( ! _.has(control,'id') )
        return;
      if ('widget_' != control.id.substring(0, 7) && 'nav_menu' != control.id.substring(0, 8) ) {
        api.czrSetupCheckbox(control.id);
      }
      api.czrSetupSelect(control.id);
      api.czrSetupStepper(control.id);
    });
    if ( $('.control-panel-widgets').find('.accordion-section-title').first().length ) {
      $('.control-panel-widgets').find('.accordion-section-title').first().prepend(
        $('<span/>', {class:'fa fa-magic'} )
      );
    }
  });//end of $( function($) ) dom ready

})( wp, jQuery);