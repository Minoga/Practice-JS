Array.prototype.forEach.call(document.querySelectorAll('.select'), function(item) {
   new Select({el: item});
});

