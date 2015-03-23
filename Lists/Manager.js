var Manager = function(lists) {
    this.lists = lists;
};
Manager.prototype.addList = function(item) {
    this.lists[0].addLi(item.cloneNode(true));
}
