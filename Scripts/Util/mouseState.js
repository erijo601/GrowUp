var MouseState = /** @class */ (function () {
    function MouseState() {
        this.x = 0;
        this.y = 0;
        this.leftButtonDown = false;
        this.rightButtonDown = false;
    }
    return MouseState;
}());
var Mouse = /** @class */ (function () {
    function Mouse() {
        this.current = new MouseState();
        this.last = new MouseState();
    }
    return Mouse;
}());
//# sourceMappingURL=mouseState.js.map