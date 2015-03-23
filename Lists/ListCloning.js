var ListCloning = function(config) {
    List.call(this, config);
    this.manager = config.manager;
};

inherit(ListCloning, List);

ListCloning.prototype.drop = function drop(e) {
    var currentList = e.target.parentNode;
    if (currentList != List.list) {
        currentList.appendChild(List.target);
        this.manager.addList(List.target);
    };

};
