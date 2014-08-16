'use strict';

/**
 * Vendor-specific implementations of `Element.prototype.matches()`.
 */

var proto = Element.prototype;

var nativeMatches = proto.matches ||
  proto.mozMatchesSelector ||
  proto.msMatchesSelector ||
  proto.oMatchesSelector ||
  proto.webkitMatchesSelector;

/**
 * Determine if the browser supports matching orphan elements. IE 9's
 * vendor-specific implementation doesn't work with orphans and neither does
 * the fallback for older browsers.
 */

var matchesOrphans = (function () {
  return nativeMatches ? nativeMatches.call(document.createElement('a'), 'a') : false;
}());

/**
 * Determine if a DOM element matches a CSS selector
 *
 * @param {Element} elem
 * @param {String} selector
 * @return {Boolean}
 * @api public
 */

function matches(elem, selector) {
  if (!elem || elem.nodeType !== 1) {
    return false;
  }

  var parentElem = elem.parentNode;

  // create a parent for orphans if the browser requires it
  if (!parentElem && !matchesOrphans) {
    parentElem = document.createDocumentFragment();
    parentElem.appendChild(elem);
  }

  // use native 'matches'
  if (nativeMatches) {
      return nativeMatches.call(elem, selector);
  }

  // native support for `matches` is missing and a fallback is required
  var nodes = parentElem.querySelectorAll(selector);
  var i = nodes.length;

  while (i--) {
    if (nodes[i] === elem) {
      return true;
    }
  }

  return false;
}

/**
 * Expose `matches`
 */

module.exports = matches;
