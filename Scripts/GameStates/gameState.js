var GameState = /** @class */ (function () {
    function GameState(player, xOffset, upKey, downKey, leftKey, rightKey) {
        this.stateName = "GameState";
        this.player = player;
        this.xOffset = xOffset;
        this.upKey = upKey;
        this.downKey = downKey;
        this.leftKey = leftKey;
        this.rightKey = rightKey;
    }
    GameState.prototype.onEnter = function () {
    };
    GameState.prototype.onExit = function () {
    };
    GameState.prototype.update = function (elapsedTime) {
        // elapsedTime in ms
    };
    return GameState;
}());
//# sourceMappingURL=gameState.js.map