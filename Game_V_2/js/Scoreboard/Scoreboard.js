/**
 * @class Scoreboard
 * @param {HTMLElement} config.el
 * @constructor
 */
var Scoreboard = function(config) {
    this.el = config.el;
};

/**
 * @private {number}
 */
Scoreboard.prototype._count = 0;

/**
 * @public
 */
Scoreboard.prototype.changeCount = function() {
    this.el.textContent = ++this._count;
};
