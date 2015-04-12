var Dropdown = function(el) {
    this.el = el;
    this.control = this.el.querySelector('.dropdown__control');
    this.el.addEventListener('focus', this.show.bind(this));
    this.el.addEventListener('blur', this.hide.bind(this));
    this.control.addEventListener('click', this.activate.bind(this));
}

Dropdown.prototype.show = function() {
    if (this.available) {
        this.el.classList.add('dropdown_active_yes');
        this.customActionShow();
    }
}

Dropdown.prototype.hide = function(e) {
    this.el.classList.remove('dropdown_active_yes');
    this.control.classList.remove('active');
    this.customActionHide();
}

Dropdown.prototype.activate = function(e) {
    if (this.control.classList.contains('active')) {
        this.hide();
    }
    else {
        this.show();
        this.control.classList.add('active');
    }
}

Dropdown.prototype.customActionShow = function() {}

Dropdown.prototype.customActionHide = function() {}

Dropdown.prototype.available = true;


