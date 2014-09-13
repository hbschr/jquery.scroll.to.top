!function ($) {
  'use strict';

  function getOffsetParentChain (element, offsetTopLeft) {
    var chain = [],
        offset = 0;

    do {
      chain.push(element);
      offset += element[offsetTopLeft];
    } while ( element = element.offsetParent);

    return {
      chain: chain,
      offset: offset,
    }
  }


  function scrollTo (element, alignment) {
    var offsetTopLeft = alignment === 'left' ? 'offsetLeft' : 'offsetTop',
        scrollTopLeft = alignment === 'left' ? 'scrollLeft' : 'scrollTop',
        overflow = alignment === 'left' ? 'overflowX' : 'overflowY',
        scrollContainer = element,
        style,
        chainElement,
        chainContainer;

    if (!element)
      return;

    // get first scrollable ancestor
    // for the moment only explicit scrollbars are supported.
    while (scrollContainer = scrollContainer.parentNode) {
      style = window.getComputedStyle(scrollContainer);
      if ( !style || (style.overflow === 'scroll') || (style[overflow] === 'scroll') )
        break;
    }

    chainElement = getOffsetParentChain(element, offsetTopLeft);
    chainContainer = getOffsetParentChain(scrollContainer, offsetTopLeft);

    // assume the last items are identical, f.e. 'body'

    scrollContainer[scrollTopLeft] = chainElement.offset - chainContainer.offset;
  }


  // export
  $.extend($.fn, {
    scrollToLeft: function () {
      scrollTo(this.get(0), 'left');
    },
    scrollToTop: function () {
      scrollTo(this.get(0), 'top');
    },
  });

}(window.jQuery || window.Zepto);
