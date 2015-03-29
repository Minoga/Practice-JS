/**
* @constructor
* @class ListHighlight
* @extends List
*/
var ListHighlight = function(config) {
    List.call(this, config)
};

inherit(ListHighlight, List);

/**
* @protected
*/
ListHighlight.prototype._addLiCustom = function() {
    var currentList = arguments[0];
    currentList.style.backgroundColor = 'red';
    var self = currentList;
    setTimeout(function () {
        self.style.backgroundColor = 'white';
    }, 100);
}
