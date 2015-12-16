require('jquery');

/**
 * Cross browser helpers for getting and setting the caret position in input elements
 */

/**
 * get current caret position
 * @param element
 * @returns {*}
 */
var getPosition = function (element) {
  if (typeof element.selectionEnd !== 'undefined') {
    return element.selectionEnd;
  } else if (document.selection) { // < IE9
    return Math.abs(document.selection.createRange().moveEnd('character', -1000000));
  }
};

/**
 * set caret position on specified element
 * @param element
 * @param position
 */
var setPosition = function (element, position) {
  if (typeof element.selectionEnd !== 'undefined') {
    element.selectionEnd = position;
  } else if (element.createTextRange) { // < IE9
    var range = element.createTextRange();
    range.collapse(true);
    range.moveEnd('character', position);
    range.moveStart('character', position);
    range.select();
  }
};

module.exports = function () {
  return {
    getPosition: getPosition,
    setPosition: setPosition
  };
};
