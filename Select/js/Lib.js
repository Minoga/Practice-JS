function getChar(event) {
  if (event.which == null) {  // IE
    if (event.keyCode < 32) return null; // спец. символ
    return String.fromCharCode(event.keyCode)
  }

  if (event.which!=0 && event.charCode!=0) { // все кроме IE
    if (event.which < 32) return null; // спец. символ
    return String.fromCharCode(event.which); // остальные
  }

  return null; // спец. символ
}

/**
 * Организует наследование для функций-конструкторов
 * @param {Function} Child
 * @param {Function} Parent
 */
function inherit(Child, Parent) {
    "use strict";
    function F() {}
    F.prototype = Parent.prototype;
    Child.prototype = new F();
    Child.prototype.constructor = Child;
}
