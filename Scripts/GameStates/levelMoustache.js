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
var LevelMoustache = /** @class */ (function (_super) {
    __extends(LevelMoustache, _super);
    function LevelMoustache(xOffset, upKey, downKey, leftKey, rightKey) {
        var _this = _super.call(this, xOffset, upKey, downKey, leftKey, rightKey) || this;
        _this.faceBg = new PIXI.Sprite(PIXI.Loader.shared.resources["face-bg"].texture);
        _this.faceBg.x = 72 + _this.xOffset;
        _this.faceBg.y = 0;
        return _this;
    }
    LevelMoustache.prototype.onEnter = function () {
        this.grid = new Grid();
        Game.app.stage.addChild(this.faceBg);
        //   TODO: Lägg till alla ansiktsframes FÖRE shape 
        //  TODO: Några slumpmässiga startbitar längst ner
        this.currentShape = this.spawnShape();
        //Game.soundPlayer.exampleSong.volume(0.05);
        //Game.soundPlayer.exampleSong.play();
    };
    LevelMoustache.prototype.onExit = function () {
        /*        Game.soundPlayer.exampleSong.stop();*/
    };
    LevelMoustache.prototype.update = function (elapsedTime) {
        // elapsedTime in ms
        var points;
        if (Game.keyboard.current.isPressed(this.rightKey) && !Game.keyboard.last.isPressed(this.rightKey)) {
            points = this.currentShape.moveRight();
            if (this.grid.isPosValid(points)) {
                this.currentShape.setPos(points);
            }
        }
        if (Game.keyboard.current.isPressed(this.leftKey) && !Game.keyboard.last.isPressed(this.leftKey)) {
            points = this.currentShape.moveLeft();
            if (this.grid.isPosValid(points)) {
                this.currentShape.setPos(points);
            }
        }
        if (Game.keyboard.current.isPressed(this.upKey) && !Game.keyboard.last.isPressed(this.upKey)) {
            points = this.currentShape.rotate(true);
            if (this.grid.isPosValid(points)) {
                this.currentShape.setPos(points);
            }
        }
        if (Game.keyboard.current.isPressed(this.downKey) && !Game.keyboard.last.isPressed(this.downKey)) {
            points = this.currentShape.drop();
            if (this.grid.isPosValid(points)) {
                this.currentShape.setPos(points);
                //  TODO: check collision and maybe spawn new shape
            }
        }
    };
    LevelMoustache.prototype.spawnShape = function () {
        var shape = new LShape(this.faceBg.x, this.faceBg.y, true, 10);
        //  TODO: Slumpa shape from en bag med shapes
        return shape;
    };
    return LevelMoustache;
}(GameState));
//# sourceMappingURL=levelMoustache.js.map