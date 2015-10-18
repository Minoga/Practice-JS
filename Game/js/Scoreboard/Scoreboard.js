/**
 * @class Scoreboard
 * @param {HTMLElement} config.el
 * @constructor
 */
var Scoreboard = function(config) {
    this.el = config.el;
};

/**
 * @public
 */
Scoreboard.prototype.changeCount = function() {
    this.el.innerHTML = parseInt(this.el.innerHTML) + 1;
};
