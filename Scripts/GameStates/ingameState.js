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
var IngameState = /** @class */ (function (_super) {
    __extends(IngameState, _super);
    function IngameState() {
        var _this = _super.call(this) || this;
        _this.rgbSplitFilter = new RGBSplitFilter();
        _this.rgbSplitFilter.red = new PIXI.Point(-5, -5); //  I can mess with the shader parameters later, like in update()
        _this.sprite = new PIXI.Sprite(PIXI.Loader.shared.resources["example-image"].texture);
        _this.sprite.anchor.set(0.5);
        //  Add the image to position 800, 100 inside the renderers buffer (1920*1080). Dont worry about the actual window size.
        _this.sprite.x = 800;
        _this.sprite.y = 100;
        _this.sprite.rotation = 0;
        _this.sprite.filters = [_this.rgbSplitFilter];
        return _this;
    }
    IngameState.prototype.onEnter = function () {
        Game.app.stage.addChild(this.sprite);
        //  Sound won't play until there is some kind of user interaction on the page (mouse, keyboard)
        //  This is a built in behavour in browsers to avoid annyoing autoplaying sounds 
        Game.soundPlayer.exampleSong.volume(0.05);
        Game.soundPlayer.exampleSong.play();
    };
    IngameState.prototype.onExit = function () {
        Game.app.stage.removeChild(this.sprite);
        Game.soundPlayer.exampleSong.stop();
    };
    IngameState.prototype.update = function (elapsedTime) {
        // elapsedTime in ms
        this.sprite.rotation += 0.001 * elapsedTime;
        if (Game.keyboard.current.isPressed('a') && !Game.keyboard.last.isPressed('a')) {
            this.sprite.x -= 100;
        }
        if (Game.keyboard.current.isPressed('d')) {
            this.sprite.x += 1 * elapsedTime;
        }
        this.sprite.y = Game.mouse.current.y;
    };
    return IngameState;
}(GameState));
//# sourceMappingURL=ingameState.js.map