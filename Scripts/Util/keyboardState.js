var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var KeyboardState = (function () {
    function KeyboardState() {
        this.pressed = {};
    }
    KeyboardState.prototype.isPressed = function (key) {
        key = key.toLowerCase();
        if (this.pressed[key] == undefined) {
            return false;
        }
        return this.pressed[key];
    };
    return KeyboardState;
}());
var Keyboard = (function () {
    function Keyboard() {
        this.current = new KeyboardState();
        this.last = new KeyboardState();
        this.isDirty = false;
    }
    Keyboard.prototype.update = function () {
        if (this.isDirty == true) {
            this.last.pressed = __assign({}, this.current.pressed);
            this.isDirty = false;
        }
    };
    return Keyboard;
}());
