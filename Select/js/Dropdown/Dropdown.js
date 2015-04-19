var Dropdown = function(config) {
    this.el = config.el;
    this.el.addEventListener('blur', this.hide.bind(this));
    this.el.addEventListener('click', this.toggle.bind(this));
    this.el.addEventListener('keydown', this.keyPressEvent.bind(this));
}

Dropdown.prototype.show = function() {
    if (this.available) {
        this.el.classList.add('dropdown_active_yes');
        this.customActionShow();
    }
    this.active = true;
}

Dropdown.prototype.hide = function() {
    this.el.classList.remove('dropdown_active_yes');
    this.customActionHide();
    this.active = false;
}

Dropdown.prototype.toggle = function() {
    if (this.el.classList.contains('dropdown_active_yes')) {
        this.hide();
    }
    else {
        this.show();
    }
}

Dropdown.prototype.keyPressEvent = function(e) {
    console.log(e.keyCode);
    if (e.keyCode == 38 || e.keyCode == 40) {
        this.show();
    }
    else if (e.keyCode == '27') {
        this.hide();
    }
}

Dropdown.prototype.customActionShow = function() {}

Dropdown.prototype.customActionHide = function() {}

Dropdown.prototype.available = true;


