/*! jquery.scroll.to.top - v0.0.1 - 2014-09-13 */
!function(a){"use strict";function b(a,b){var c=[],d=0;do c.push(a),d+=a[b];while(a=a.offsetParent);return{chain:c,offset:d}}function c(a,c){var d,e,f,g="left"===c?"offsetLeft":"offsetTop",h="left"===c?"scrollLeft":"scrollTop",i="left"===c?"overflowX":"overflowY",j=a;if(a){for(;(j=j.parentNode)&&(d=window.getComputedStyle(j),d&&"scroll"!==d.overflow&&"scroll"!==d[i]););e=b(a,g),f=b(j,g),j[h]=e.offset-f.offset}}a.extend(a.fn,{scrollToLeft:function(){c(this.get(0),"left")},scrollToTop:function(){c(this.get(0),"top")}})}(window.jQuery||window.Zepto);
