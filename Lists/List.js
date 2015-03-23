var List = function (config) {
    this.el = config.el;
    this.el.addEventListener('dragstart', this.dragStart);
    this.el.addEventListener('dragover', this.dragOver);
    this.el.addEventListener('drop', this.drop.bind(this));
};

List.target = null;

List.prototype.dragStart = function(e) {
    List.target = e.target;
    List.list = this;
    e.dataTransfer.setData("text/html", e.target);
};

List.prototype.drop = function drop(e) {
    var currentList = e.target.parentNode;
    if (currentList != List.list) {
        this.addLi(List.target);
    }
};

List.prototype.dragOver = function(e) {
    e.preventDefault()
};

List.prototype.addLi = function(li) {
    this.el.appendChild(li);
}
