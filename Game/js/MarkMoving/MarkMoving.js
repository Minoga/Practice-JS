/**
 * @class MarkMoving
 * @extends Mark
 */
var MarkMoving = function(config) {
    Mark.call(this, config);
    this._move();
};

inherit(MarkMoving, Mark);

/**
 * @const (number)
 */
MarkMoving.prototype.ANIMATION_DELAY = 200;

/**
 * @const (array)
 */
MarkMoving.prototype.MOVE_HELPER = [10, 10, 10, -10, -10, 10, 10, 10, 10, -10, 10, -10, -10, -10, 10, -10, 10, 10, 10, -10, -10, 10, -10, 10, 10, -10, 10, -10, -10, -10, 10, -10];

/**
 * @private
 */
MarkMoving.prototype._move = function() {
    this.timer = setInterval(this._changeCoordinates.bind(this), this.ANIMATION_DELAY);
};

/**
 * @private
 */
MarkMoving.prototype._changeCoordinates = function() {
    var lengthMoveHelper = this.MOVE_HELPER.length,
        dx = this.MOVE_HELPER[Math.floor(Math.random()*lengthMoveHelper)],
        dy = this.MOVE_HELPER[Math.floor(Math.random()*lengthMoveHelper)],
        computedStyle = getComputedStyle(this.el),
        currentLeft = parseInt(computedStyle.left),
        currentSize = parseInt(computedStyle.width),
        currentTop = parseInt(computedStyle.top);
    if ((currentLeft + dx > this.MAX_LEFT - currentSize) || (currentLeft + dx < 0)) {
        this.el.style.left = currentLeft - dx + 'px';
    } else {
        this.el.style.left = currentLeft + dx + 'px';
    }
    if ((currentTop + dy > this.MAX_TOP - currentSize) || (currentTop + dy < 0)) {
        this.el.style.top = currentTop - dy + 'px';
    } else {
        this.el.style.top = currentTop + dy + 'px';
    }
};
