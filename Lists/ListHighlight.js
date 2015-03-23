var ListHighlight = function(config) {
    List.call(this, config)
};

inherit(ListHighlight, List);

ListHighlight.prototype.drop = function drop(e) {
    var currentList = e.target.parentNode;
    if (currentList != List.list) {
        currentList.style.backgroundColor = 'red';
        self = currentList;
        setTimeout(function () {
            self.style.backgroundColor = 'white';
        }, 100);
        currentList.appendChild(List.target);
    }
};
