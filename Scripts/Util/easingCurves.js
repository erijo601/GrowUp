var EasingCurves = (function () {
    function EasingCurves() {
    }
    EasingCurves.easeInOutQuad = function (x) {
        if (x > 1) {
            x = 1;
        }
        else if (x < 0) {
            x = 0;
        }
        return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
    };
    EasingCurves.easeInOutCubic = function (x) {
        return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
    };
    EasingCurves.easeInSine = function (x) {
        return 1 - Math.cos((x * Math.PI) / 2);
    };
    EasingCurves.easeInCubic = function (x) {
        return x * x * x;
    };
    EasingCurves.easeInQuart = function (x) {
        return x * x * x * x;
    };
    EasingCurves.easeInQuint = function (x) {
        return x * x * x * x * x;
    };
    EasingCurves.easeOutQuad = function (x) {
        return 1 - (1 - x) * (1 - x);
    };
    EasingCurves.easeOutQuint = function (x) {
        return 1 - Math.pow(1 - x, 5);
    };
    EasingCurves.easeInOutSine = function (x) {
        return -(Math.cos(Math.PI * x) - 1) / 2;
    };
    EasingCurves.easeOutSine = function (x) {
        return Math.sin((x * Math.PI) / 2);
    };
    EasingCurves.easeInOutBack = function (x) {
        var c1 = 1.70158;
        var c2 = c1 * 1.525;
        return x < 0.5
            ? (Math.pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2
            : (Math.pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
    };
    EasingCurves.easeOutBack = function (x) {
        var c1 = 1.70158;
        var c3 = c1 + 1;
        return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
    };
    EasingCurves.easeInExpo = function (x) {
        return x === 0 ? 0 : Math.pow(2, 10 * x - 10);
    };
    EasingCurves.easeOutExpo = function (x) {
        return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
    };
    EasingCurves.easeOutBounce = function (x) {
        var n1 = 7.5625;
        var d1 = 2.75;
        if (x < 1 / d1) {
            return n1 * x * x;
        }
        else if (x < 2 / d1) {
            return n1 * (x -= 1.5 / d1) * x + 0.75;
        }
        else if (x < 2.5 / d1) {
            return n1 * (x -= 2.25 / d1) * x + 0.9375;
        }
        else {
            return n1 * (x -= 2.625 / d1) * x + 0.984375;
        }
    };
    EasingCurves.easeOutElastic = function (x) {
        var c4 = (2 * Math.PI) / 3;
        return x === 0
            ? 0
            : x === 1
                ? 1
                : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
    };
    return EasingCurves;
}());
