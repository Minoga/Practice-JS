var Select = function(config) {
    Dropdown.call(this, config.el);
    this._subscribers = {};
    this.el = config.el;
    this.input = this.el.getElementsByClassName('dropdown__control')[0];
    this.options = [];
    this.available = this.el.classList.contains('select_type_disabled') ? false : true;
    Array.prototype.forEach.call(this.el.querySelectorAll('.option'), function(item) {
        this.options.push(item);
    }, this);
    this.el.addEventListener('keypress', this.keyPress.bind(this));
    this.el.addEventListener('click', this.click.bind(this));
    this.options.some(function(item) {
        if (item.getAttribute('data-selected')) {
            this.change(item);
            return true;
        }
    }, this);
    this.el.addEventListener('mouseover', this.over.bind(this));
    this.el.addEventListener('mouseout', this.out.bind(this));
}

inherit(Select, Dropdown);

Select.prototype.keyPress = function(e) {
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

Select.prototype.click = function(e) {
    var currentOption = e.target;
    if (currentOption.classList.contains('option')) {
        this.change(currentOption);
    }
}

Select.prototype.change = function(item) {
    this.input.innerHTML = item.innerHTML;
    this.input.setAttribute('data-value', item.getAttribute('data-value'));
    this.el.blur();
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
    var value = this.input.getAttribute('data-value');
    this.options.some(function(item) {
        if (item.getAttribute('data-value') == value) {
            item.classList.add('option_active_yes');
            return true;
        }
    }, this);
}

Select.prototype.customActionHide = function(e) {
    this.options.some(function(item){
        if (item.classList.contains('option_active_yes')) {
            item.classList.remove('option_active_yes');
            return true;
        }
    })
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
