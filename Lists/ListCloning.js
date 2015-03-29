/**
* @constructor
* @class ListCloning
* @extends List
*/
var ListCloning = function(config) {
    List.call(this, config);
};

inherit(ListCloning, List);

/**
* @protected
*/
ListCloning.prototype._addLiCustom = function() {
    this.trigger('addLi', List.dragLi.cloneNode(true));
}
