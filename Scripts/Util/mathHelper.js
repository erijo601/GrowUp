var MathHelper = (function () {
    function MathHelper() {
    }
    MathHelper.randomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };
    MathHelper.clamp = function (value, min, max) {
        return Math.min(Math.max(value, min), max);
    };
    return MathHelper;
}());
var Interval = (function () {
    function Interval(min, max) {
        this.min = min;
        this.max = max;
    }
    Interval.prototype.random = function () {
        return Math.random() * (this.max - this.min) + this.min;
    };
    return Interval;
}());
