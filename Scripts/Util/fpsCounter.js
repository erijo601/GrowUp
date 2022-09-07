var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var FpsCounter = /** @class */ (function (_super) {
    __extends(FpsCounter, _super);
    function FpsCounter() {
        var _this = _super.call(this) || this;
        var defaultStyle = new PIXI.TextStyle({
            fontSize: FpsCounter.DEFAULT_FONT_SIZE,
            fill: FpsCounter.DEFAULT_FONT_COLOR,
        });
        _this.timeValues = [];
        _this.lastTime = new Date().getTime();
        _this.fpsTextField = new PIXI.Text("", __assign({}, defaultStyle));
        _this.fpsTicker = new PIXI.Ticker();
        _this.fpsTicker.add(function () {
            _this.measureFPS();
        });
        _this.fpsTicker.start();
        _this.addChild(_this.fpsTextField);
        return _this;
    }
    Object.defineProperty(FpsCounter.prototype, "style", {
        set: function (style) {
            this.fpsTextField.style = style;
        },
        enumerable: false,
        configurable: true
    });
    FpsCounter.prototype.measureFPS = function () {
        var currentTime = new Date().getTime();
        this.timeValues.push(1000 / (currentTime - this.lastTime));
        if (this.timeValues.length === 30) {
            var total = 0;
            for (var i = 0; i < 30; i++) {
                total += this.timeValues[i];
            }
            this.fpsTextField.text = (total / 30).toFixed(2);
            this.timeValues.length = 0;
        }
        this.lastTime = currentTime;
    };
    FpsCounter.DEFAULT_FONT_SIZE = 24;
    FpsCounter.DEFAULT_FONT_COLOR = 0xffff00;
    return FpsCounter;
}(PIXI.Container));
//# sourceMappingURL=fpsCounter.js.map