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
var IntroState = (function (_super) {
    __extends(IntroState, _super);
    function IntroState(xOffset, upKey, downKey, leftKey, rightKey) {
        var _this = _super.call(this, 1, xOffset, upKey, downKey, leftKey, rightKey) || this;
        _this.stateName = "IntroState";
        _this.background = new PIXI.Sprite(PIXI.Loader.shared.resources["intro-bg"].texture);
        _this.background.scale.x = 2;
        _this.background.scale.y = 2;
        _this.background.x = 0;
        _this.background.y = 0;
        return _this;
    }
    IntroState.prototype.onEnter = function () {
        Game.app.stage.addChild(this.background);
    };
    IntroState.prototype.onExit = function () {
        Game.app.stage.removeChild(this.background);
        Game.currentStatePlayer1 = new TitleState(this.xOffset, this.upKey, this.downKey, this.leftKey, this.rightKey);
        Game.currentStatePlayer1.onEnter();
    };
    IntroState.prototype.update = function (elapsedTime) {
        if (!Game.keyboard.current.isPressed('enter') && Game.keyboard.last.isPressed('enter')) {
            this.onExit();
        }
    };
    return IntroState;
}(GameState));
