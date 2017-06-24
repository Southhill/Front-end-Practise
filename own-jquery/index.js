// 学习参考，via:https://github.com/Lucifier129/Lucifier129.github.io/blob/master/lab/build-your-own-jquery-library.md
;(function(window) {
    var
        obj = {},
        toStr = obj.toString,
        hasOwnProp = obj.hasOwnProperty,
        arr = [],
        slice = arr.slice,
        push = arr.push;

    var
        isObject = function(obj) {
            return obj == null ? obj.toString(): toStr.call(obj) === '[object Object]';
        },
        isArray = Array.isArray || function(obj) {
            return toStr.call(obj) === '[object Array]';
        },
        isFunction = function(obj) {
            return typeof obj === 'function';
        },
        isString = function(obj) {
            return typeof obj === 'string';
        },
        isBoolean = function(obj) {
            return typeof obj === 'boolean';
        },
        isNumber = function(obj) {
            return typeof obj === 'number';
        }
        inArray = function(arr, item) {
            arr = arr || [];
            return arr.indexOf(item) !== -1;
        };

    function each(obj, callback) {
        if (!isObject(obj) && !isArray(obj)) {
            return obj;
        }

        var len = obj.length;
        if (isNumber(len) && len >= 0) {
            for (var i = 0; i < len; i++) {
                var item = obj[i];
                if (callback.call(item, i, item) === false) {
                    break;
                }
            }
        } else {
            // 迭代obj类型为对象
            for (var prop in obj) {
                if (hasOwnProp.call(obj, prop)) {
                    var item = obj[prop]
                    if (callback.call(item, prop, item) === false) {
                        break;
                    }
                }
            }
        }

        return obj;
    }
    function extend(target) {
        var sources = slice.call(arguments, 1);
        each(sources, function() {
            each(this, function(key, value) {
                target[key] = value;
            });
        });
        return target;
    };
    function pushStack(target) {
        if (!target || typeof target.length !== 'number' || target < 0) {
            return target;
        }
        var len = target.length;
        var sources = slice.call(arguments, 1);
        each(sources, function() {
            if (!this || typeof this.length !== 'number' || this.length < 0) {
                return;
            }
            push.apply(target, this);
        })
        return target;
    }
    function jQuery(selector, context) {
        return new jQuery.init(select, context);
    }
    jQuery.init = function(selector, context) {
        this.length = 0; //保存为类数组
        if (selector && selector.nodeName) {
            this[0] = selector;
            this.length = 1;
        } else if (isFunction(selector)) {
            // 传入的参数为function，则为DOM ready事件
            return document.addEventListener('DOMContentLoaded', selector, false);
        } else {
            var items = (context && context.nodeName ? context : document).querySelectorAll(selector);
            pushStack(this, items);
        }
    };

    jQuery.each = each;
    jQuery.extend = extend;
    jQuery.pushStack = pushStack;

    jQuery.fn = jQuery.prototype;
    jQuery.init.prototype = jQuery.prototype;

    var $ = jQuery;

    $.fn.extend = function() {
        return extend.apply(window, [this].concat(slice.call(arguments)));
    }
    $.fn.extend({
        // DOM操作方法
        each: function(callback) {
            return each(this, callback);
        },
        find: function(selector) {
            var ret = $();
            var nodes = [];

            this.each(function() {
                var items = this.querySelectorAll(selector);
                items.length && push.apply(nodes, items);
            })

            return pushStack(ret, nodes);
        },
        eq: function(index) {
            index = index >= 0 ? index : this.length + index;
            return $(this[index]);
        },
        children: function(selector) {
            var ret = $();
            var nodes = [];

            var id = selector || 'jQuery' + Math.random().toString(36).substr(2);

            this.each(function() {
                var items;

                if (selector) {
                    this.id = this.id || id;
                    items = document.querySelectorAll(this.id + '>' + selector);

                    if (this.id === id) {
                        this.removeAttribute('id');
                    }
                } else {
                    items = this.children;
                }

                items.length && push.apply(nodes, items);
            })

            pushStack(ret, nodes);
        },
        first: function() {
            var ret = $();
            var nodes = [];
            this.each(function() {
                var item = this.firstElementChild;
                item && nodes.push(item);
            })

            pushStack(ret, nodes);
        },
        last: function() {
            var ret = $();
            var nodes = [];
            this.each(function() {
                var item = this.lastElementChild;
                item && nodes.push(item);
            })

            pushStack(ret, nodes);
        },
        siblings: function(selector) {
            var ret = $();
            var nodes = [];
            var id = selector || 'jQuery' + Math.random().toString(36).substr(2);

            this.each(function() {
                var parent = this.parentNode,
                    items;
                if (selector) {
                    parent.id = parent.id || id;
                    items = document.querySelectorAll(parent.id + '>' + selector);
                    if (parent.id === id) {
                        parent.removeAttribute('id');
                    }
                    items.length && push.apply(nodes, items);
                } else {
                    push.apply(nodes, parent.children)
                }
                nodes.splice(nodes.indexOf(this), 1);
            })

            pushStack(ret, nodes);
        },
        parent: function() {
            var ret = $();
            var nodes = [];
            this.each(function() {
                var parent = this.parentNode;
                parent && nodes.push(parent);
            })

            pushStack(ret, nodes);
        },
        index: function() {
            var target = this[0];
            return slice.call(target.parentNode.children).indexOf(this);
        },
        append: function(node) {
            var len = this.length; //该方法并没有用到len属性，为何要声明？不懂！
            this[0].appendChild(node);
            return this;
        },
        prepend: function(node) {
            var len = this.length; //该方法并没有用到len属性，为何要声明？不懂！
            var first = this[0].firstElementChild;
            this[0].insertBefore(node, first);
            return this;
        },
        // css操作方法
        css: function() {
            var args = slice.call(arguments);
            var len = args.length;

            if (len === 1 && typeof args[0] === 'string') {
                return getComputedStyle(this[0], null).getPropertyValue(args[0]);
            } else if (len === 2) {
                return this.each(function() {
                    this.style[args[0]] = args[1];
                });
            }
        },
        addClass: function(classNames) {
            if (typeof classNames !== 'string') {
                return this;
            }
            var classNames = classNames.trim().split(' ');
            return this.each(function() {
                var classList = this.classList;
                each(classNames, function(key, value) {
                    classList.add(value);
                });
            });
        },
        removeClass: function(classNames) {
            if (typeof classNames !== 'string') {
                return this;
            }
            var classNames = classNames.trim().split(' ');
            return this.each(function() {
                var classList = this.classList;
                each(classNames, function(key, value) {
                    classList.remove(value);
                });
            });
        }
    });

    var nextTick = requestAnimationFrame || function(fn) {
        return setTimeout(fn, 1000 / 60);
    };
    function getStyle(ele, prop) {
        return parseFloat(getComputedStyle(ele, null).getPropertyValue(prop));
    };
    function animate(ele, propObj, duration, callback) {
        var start = +new Date();
        var oldValue = {};
        var diff = {};
        var ratio;
        for (var prop in propObj) {
            diff[prop] = propObj[prop] - (oldValue[prop] = getStyle(ele, prop));
        }

        function move() {
            ratio = (+new Date() - start) / duration;
            if (ratio < 1) {
                each(diff, function(prop) {
                    ele.style[prop] = oldValue[prop] + this * ratio + 'px';
                });
                nextTick(move);
            } else {
                each(diff, function(prop) {
                    ele.style[prop] = propObj[prop] + 'px';
                });
                callback();
            }
        }
        move()
    }
    function noop() {}; //noop:空操作
    $.fn.animate = function(propObj, duration, callback) {
        var self = this,
            len = self.length,
            count = 0;
        return self.each(function() {
            animate(this, propObj, duration || 400, typeof callback === 'function' ? function() {
                ++count === len && callback.call(self);
            } : noop);
        });
    };
    window.$ = window.jQuery = jQuery;
}(window));
