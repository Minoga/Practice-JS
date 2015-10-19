/**
 * @class Mark
 * @param {boolean} config.square
 * @param {boolean} config.changeSizeAbility
 * @param {function} config.clickAction
 * @constructor
 */
var Mark = function (config) {
    var mark = document.createElement('div');
    this._changeSizeAbility = config.changeSizeAbility ? true : false;
    mark.style.left = this._definePosition(0, this.MAX_LEFT - this.SIZE) + 'px';
    mark.style.top = this._definePosition(0, this.MAX_TOP - this.SIZE) + 'px';
    mark.style.width = mark.style.height = this.SIZE + 'px';
    mark.className = 'game__mark ' + this.STATES[this._currentState] + (config.square ? ' game__mark_square_yes' : '');
    mark.addEventListener('click', config.clickAction);
    this._el = mark;
};

/**
 * @return {HTMLElement}
 */
Mark.prototype.getEl = function() {
    return this._el;
};

/**
 * @const {number}
 */
Mark.prototype.STATES_NUMBER = 5;

/**
 * @const {number}
 */
Mark.prototype.MAX_LEFT = 900;

/**
 * @const {number}
 */
Mark.prototype.MAX_TOP = 400;

/**
 * @const {number}
 */
Mark.prototype.SIZE = 30;

/**
 * @const {number}
 */
Mark.prototype.CHANGE_SIZE_VALUE = 3;

/**
 * @type {boolean}
 * @private
 */
Mark.prototype._changeSizeAbility = false;

/**
 * @type {number}
 * @private
 */
Mark.prototype._currentState = 0;

/**
 * @type {array}
 * @const
 */
Mark.prototype.STATES = ['game__mark_state_1', 'game__mark_state_2', 'game__mark_state_3', 'game__mark_state_4', 'game__mark_state_5', 'game__mark_state_6'];

/**
 * @public
 */
Mark.prototype.changeState = function() {
    this._el.classList.remove(this.STATES[this._currentState]);
    this._currentState++;
    this._el.classList.add(this.STATES[this._currentState]);
    if (this._changeSizeAbility) {
        this._el.style.width = this._el.style.height = parseInt(this._el.style.width, 10) - this.CHANGE_SIZE_VALUE + 'px';
    }
    if (this._currentState == this.STATES_NUMBER) {
        this._currentState = 0;
    }
};

/**
 * @param {number} min
 * @param {number} max
 * @return {number}
 * @private
 */
Mark.prototype._definePosition = function (min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
