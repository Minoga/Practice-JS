var Select = function(config) {
    Dropdown.call(this, config);
    this._subscribers = {};
    this.input = this.el.getElementsByClassName('dropdown__control')[0];
    this.options = [];
    this.available = !this.el.classList.contains('select_type_disabled');
    Array.prototype.forEach.call(this.el.querySelectorAll('.option'), function(item) {
        this.options.push(item);
    }, this);
    this.el.addEventListener('keypress', this.autoComplete.bind(this));
    this.el.addEventListener('click', this.click.bind(this));
    this.options.some(function(item) {
        if (item.getAttribute('data-selected')) {
            this.change(item);
            this.activeOption = this.fakeActiveOption = item;
            return true;
        }
    }, this);
    this.el.addEventListener('mouseover', this.over.bind(this));
    this.el.addEventListener('mouseout', this.out.bind(this));
}

inherit(Select, Dropdown);

Select.prototype.autoComplete = function(e) {
    if (getChar(e)) {
        var char = getChar(e).toLowerCase();
        if (char) {
            this.options.some(function(item) {
                if (char == item.innerHTML[0].toLowerCase()) {
                    this.change(item);
                    return true;
                }
            }, this)
        }
    }
    else {
        return false;
    }
}

Dropdown.prototype.keyPressEvent = function(e) {
    if (e.keyCode == 38 || e.keyCode == 40) {
        if (!this.active) {
            this.show();
        }
        if (e.keyCode == 40) {
            this.fakeActiveOption.classList.remove('option_active_yes');
            if (this.fakeActiveOption.nextElementSibling) {
                this.fakeActiveOption.nextElementSibling.classList.add('option_active_yes');
                this.fakeActiveOption = this.fakeActiveOption.nextElementSibling;
                this.input.innerHTML = this.fakeActiveOption.innerHTML;
            }
            else {
                this.options[0].classList.add('option_active_yes')
                this.fakeActiveOption = this.options[0];
                this.input.innerHTML = this.fakeActiveOption.innerHTML;
            }
        }
        if (e.keyCode == 38) {
            this.fakeActiveOption.classList.remove('option_active_yes');
            if (this.fakeActiveOption.previousElementSibling) {
                this.fakeActiveOption.previousElementSibling.classList.add('option_active_yes');
                this.fakeActiveOption = this.fakeActiveOption.previousElementSibling;
                this.input.innerHTML = this.fakeActiveOption.innerHTML;
            }
            else {
                this.options[this.options.length - 1].classList.add('option_active_yes')
                this.fakeActiveOption = this.options[this.options.length - 1];
                this.input.innerHTML = this.fakeActiveOption.innerHTML;
            }
        }
    }
    else if (e.keyCode == '27' || e.keyCode == '13' && this.active) {
        this.change(this.fakeActiveOption);
    }
}

Select.prototype.click = function(e) {
    var currentOption = e.target;
    if (currentOption.classList.contains('option')) {
        this.change(currentOption);
    }
}

Select.prototype.change = function(item) {
    this.input.innerHTML = item.innerHTML;
    this.activeOption = item;
    this.input.setAttribute('data-value', item.getAttribute('data-value'));
    this.hide();
}

Select.prototype.over = function(e) {
    if (e.target.classList.contains('option') && !(e.relatedTarget.classList.contains('option'))) {
        this.options.some(function(item) {
            if (item.classList.contains('option_active_yes')) {
                item.classList.remove('option_active_yes');
                return true;
            };
        });
        e.target.classList.add('option_active_yes')
    }
    else if (e.target.classList.contains('option')) {
        e.target.classList.add('option_active_yes')
    }
}

Select.prototype.out = function(e) {
    if (e.target.classList.contains('option') && e.relatedTarget.classList.contains('option')) {
        e.target.classList.remove('option_active_yes')
    }
}

Select.prototype.customActionShow = function() {
    this.activeOption.classList.add('option_active_yes');

}

Select.prototype.customActionHide = function(e) {
    this.options.some(function(item){
        if (item.classList.contains('option_active_yes')) {
            item.classList.remove('option_active_yes');
            return true;
        }
    });
    this.fakeActiveOption = this.activeOption;
}


/**
* @public
* @param {string} event
* @param {function} callback
*/
Select.prototype.on = function(event, callback, context) {
    if (!this._subscribers[event]) {
        this._subscribers[event] = [];
    };
    this._subscribers[event].push(callback.bind(context));
};

/**
* @public
* @param {string} event
*/
Select.prototype.trigger = function(event) {
    if (arguments.length > 1) {
        var args = Array.prototype.slice.apply(arguments, [1])
    }
    if (this._subscribers[event]) {
        this._subscribers[event].forEach(function(item){item.apply(this, args)}, this);
    }
};
