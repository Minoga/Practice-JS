var list1 = new List({
    el: document.getElementById('test1')
});
var list2 = new ListHighlight({
    el: document.getElementById('test2')
});
var list3= new ListCloning({
    el: document.getElementById('test3')
});

var manager = new Manager([list1, list2, list3]);
list3.manager = manager;
