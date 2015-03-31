/**
* @constructor
* @class List
* @param {HTMLUListElement} config.el
*/
var List = function(config) {
    this.el = config.el;
    this.el.addEventListener('dragstart', this._dragStart.bind(this));
    this.el.addEventListener('dragover', this._dragOver);
    this.el.addEventListener('drop', this._drop.bind(this));
};


/**
* Save li element that you drag
* @type HTMLLIElement
*/
List.dragLi = null;

/**
* Save ul element that is parent of List.dragLi
* @type HTMLUListElement
*/
List.list = null;

/**
* @private
* @param {Event} e
*/
List.prototype._dragStart = function(e) {
    List.dragLi = e.target;
    List.list = e.currentTarget;
    e.dataTransfer.setData("text/html", e.target); // Никак не используется, но в фф без этого не работает.
};

/**
* @private
* @param {Event} e
*/
List.prototype._drop = function(e) {
    var currentList = e.currentTarget;
    if (currentList != List.list) {
        this._addLiCustom(currentList);
        this.addLi(List.dragLi);
    }
};

/**
* @protected
*/
List.prototype._addLiCustom = function() {};

/**
* @public
* @param {HTMLLIElement} li
*/
List.prototype.addLi = function(li) {
    this.el.appendChild(li);
}

/**
* @protected
* @param {Event} e
*/
List.prototype._dragOver = function(e) {
    e.preventDefault();
};

/**
* @protected
*/
List.prototype._subscribers = {};

/**
* @public
* @param {string} event
* @param {function} callback
*/
List.prototype.on = function(event, callback, context) {
    this._subscribers[event] = callback.bind(context);
};

/**
* @public
* @param {string} event
*/
List.prototype.trigger = function(event) {
    if (arguments.length > 1) {
        var args = Array.prototype.slice.apply(arguments, [1])
    }
    this._subscribers[event].apply(this, args);
};
