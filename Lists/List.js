/**
* @constructor
* @class List
* @param {HTMLUListElement} config.el
*/
var List = function (config) {
    this.el = config.el;
    this.el.addEventListener('dragstart', this._dragStart);
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
* @protected
* @param {Event} e
*/
List.prototype._dragStart = function(e) {
    List.dragLi = e.target;
    List.list = this;
    e.dataTransfer.setData("text/html", e.target); // Никак не используется, но в фф без этого не работает.
};

/**
* @protected
* @param {Event} e
*/
List.prototype._drop = function drop(e) {
    var currentList = e.target.parentNode;
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
* @private
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
List.prototype.on = function(event, callback) {
    this._subscribers[event] = callback;
};

/**
* @public
* @param {string} event
* @param {any} arg
*/
List.prototype.trigger = function(event, arg) {
    this._subscribers[event](arg);
};
