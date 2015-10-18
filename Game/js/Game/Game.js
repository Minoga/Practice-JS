/**
 * @param {Element} config.el
 * @constructor
 */
var Game = function(config) {
    this._el = config.el;
    this._mark = new this.LEVELS[this._currentLevel].type({
        container: this._el,
        square: this.LEVELS[this._currentLevel].square
    });
    this._scoreboard = new Scoreboard({
        el: document.querySelector('.game__scoreboard')
    });
    this._mark.el.addEventListener('click', this._clickMark.bind(this));
};

/**
 * @type {number}
 * @const
 */
Game.prototype.LEVELS_NUMBER = 3;

/**
 * @type {number}
 * @const
 */
Game.prototype.STATES_NUMBER = 5;

/**
 * @type {number}
 * @private
 */
Game.prototype._currentState = 0;

/**
 * @type {number}
 * @private
 */
Game.prototype._currentLevel = 0;

/**
 * @type {array}
 * @const
 */
Game.prototype.LEVELS = [{type: Mark}, {type: Mark, square: true, changeSizeAbility:true}, {type: MarkMoving}, {type: MarkMoving, square: true, changeSizeAbility:true}];

/**
 * @private
 */
Game.prototype._clickMark = function() {
    this._scoreboard.changeCount();
    this._mark.changeState();
    this._currentState++;
    if (this._currentState == this.STATES_NUMBER) {
        if (this._currentLevel < this.LEVELS_NUMBER) {
            alert('Вы перешли на следующий уровень.');
            this._currentState = 0;
            this._currentLevel++;
            this._mark.el.parentNode.removeChild(this._mark.el);
            this._mark = new this.LEVELS[this._currentLevel].type({
                container: this._el,
                square: this.LEVELS[this._currentLevel].square,
                changeSizeAbility: this.LEVELS[this._currentLevel].changeSizeAbility
            });
            this._mark.el.addEventListener('click', this._clickMark.bind(this));
        } else {
            alert('Вы победили!!!');
            this._mark.el.parentNode.removeChild(this._mark.el);
        }
    }
};
