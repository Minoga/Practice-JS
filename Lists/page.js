var list1 = new List({
    el: document.getElementById('test1')
});
var list2 = new ListHighlight({
    el: document.getElementById('test2')
});
var list3 = new ListCloning({
    el: document.getElementById('test3')
});

list3.on('addLi', list1.addLi.bind(list1));
