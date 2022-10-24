var ColorHelper = /** @class */ (function () {
    function ColorHelper() {
    }
    ColorHelper.rgbToHex = function (r, g, b) {
        var hexString = "0x" + this.componentToHex(Math.floor(r)) + this.componentToHex(Math.floor(g)) + this.componentToHex(Math.floor(b));
        var number = new Number(hexString);
        return number.valueOf();
    };
    ColorHelper.componentToHex = function (c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    };
    return ColorHelper;
}());
//# sourceMappingURL=colorHelper.js.map