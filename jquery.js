;(function(){
    function jQuery (selector){
        return new init(selector);
    }

    function init (selector) {
        this.nodes = document.querySelectorAll(selector);
    }

    init.prototype.addClass = function (value) {
        if (this.nodes.length > 0) {
            let funcResult;
            let classes;
            [].forEach.call(this.nodes, (item, index) => {
                if (typeof value === 'function') {
                    funcResult = value.call(this, index, item.classList[0]);
                    classes = funcResult ? funcResult.split(' ') : [];
                } else if (typeof value === 'string' && value) {
                    classes = value.split(' ');
                }
                classes.forEach(cls => item.classList.add(cls));
            });
        }

        return this;
    }

    init.prototype.append = function (value) {
        if (this.nodes.length > 0) {
            let clonedNode;
            [].forEach.call(this.nodes, (item, index) => {
                if (typeof value === 'string') {
                    item.innerHTML = value;
                } else {
                    clonedNode = value.cloneNode(true);
                    item.appendChild(clonedNode);
                }
            });
        }
        return this;
    }

    init.prototype.html = function (value) {
        if (value !== undefined) {
             if (this.nodes.length > 0) {
                [].forEach.call(this.nodes, (item, index) => {
                    item.innerHTML = value;
                })
            }
        } else {
           return this.nodes[0].innerHTML;
        }
    }

    init.prototype.attr = function (name, value) {
        if (arguments.length < 2 && typeof name !== 'object') {
            return this.nodes[0].getAttribute(name);
        } else if (arguments.length > 1) {
            if (this.nodes.length > 0) {
                [].forEach.call(this.nodes, (item, index) => {
                    item.setAttribute(name, value);
                });
            }
        } else if (typeof name === 'object') {
            if (this.nodes.length > 0) {
                [].forEach.call(this.nodes, (item, index) => {
                    Object.keys(name).forEach((prop) => {
                        item.setAttribute(prop, name[prop]);
                    })
                });
            }
        }
    }

    init.prototype.children = function (selector) {
        if (this.nodes.length > 0) {
            if (selector !== undefined) {
                return [].filter.call(this.nodes[0].children, child => child.matches(selector));
            } else {
                return this.nodes[0].children;
            }
        }
    }

    init.prototype.css = function (style) {
        if (typeof style === 'object') {
            [].forEach.call(this.nodes, item => {
                Object.keys(style).forEach(prop => item.style[prop] = style[prop])
            })
        } else {
            return this.nodes[0].style[style];
        }
    }

    init.prototype.data = function (key, value) {
        if (typeof key === 'object') {
            [].forEach.call(this.nodes, item => {
                Object.keys(key).forEach(prop => {
                    item.dataset[prop] = key[prop];
                });
            });
        } else {
            let result = {};
            switch (arguments.length) {
                case 0:
                    Object.keys(this.nodes[0].dataset).forEach(item => {
                        result[item] = this.nodes[0].dataset[item];
                    });
                    break;
                case 1:
                    return this.nodes[0].dataset[key];
                    break;
                case 2:
                    [].forEach.call(this.nodes, item => {
                        item.dataset[key] = value;
                    });
                    break;
            }
            return result;
        }

    }

    init.prototype.on = function (event, selector, handler) {
        if (arguments.length === 2) {
            this.nodes[0].addEventListener(event, selector);
        } else if (arguments.length === 3) {
            this.nodes[0].addEventListener(event, event => {
                if (event.target.matches(selector)) {
                    handler.apply(this, arguments);
                }
            });
        }
        return this;
    }

    init.prototype.one = function (event, handler) {
        let counter = 0;
        this.nodes[0].addEventListener(event, function(){
            if (counter < 1) {
                handler.apply(this, arguments);
                counter++;
            }
        });
        return this;
    }

    init.prototype.each = function (func) {
        [].every.call(this.nodes, (item, index) => func.call(item, index, item) !== false);
    }

    window.$ = window.jQuery = jQuery;
}());
