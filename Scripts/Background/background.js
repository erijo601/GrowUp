var Background = /** @class */ (function () {
    function Background() {
        this.speed = 1080 / 40;
        this.gap = 350;
        this.visible = false;
        this.timeTilImageChange = 15000;
        this.currentImageNumber = MathHelper.randomInt(0, 5);
        this.backgroundItems = [];
        var stepsX = Math.ceil((1920 + 100 + 1080) / this.gap) * 2;
        var stepsY = Math.ceil((1080 + 100) / this.gap);
        for (var y = 0; y <= stepsY; y++) {
            for (var x = -8; x <= stepsX; x++) {
                var yCoord = y * this.gap;
                var xCoord = x * this.gap / 2;
                if (x % 2 == 0) {
                    yCoord += this.gap / 2;
                }
                this.backgroundItems.push(new BackgroundItem(xCoord, yCoord, this.currentImageNumber));
            }
        }
    }
    Background.prototype.update = function (elapsedTime) {
        this.timeTilImageChange -= elapsedTime;
        if (this.timeTilImageChange <= 0) {
            this.timeTilImageChange = 15000;
            this.fadeOut(1000);
            this.fadeIn(1000);
        }
        var alpha = 1;
        if (this.fadeOutLeft > 0) {
            this.fadeOutLeft -= elapsedTime;
            if (this.fadeOutLeft < 0) {
                this.fadeOutLeft = 0;
                var newImageNumbers = [];
                for (var n = 0; n <= 5; n++) {
                    if (n != this.currentImageNumber) {
                        newImageNumbers.push(n);
                    }
                }
                this.currentImageNumber = newImageNumbers[MathHelper.randomInt(0, 4)];
                for (var _i = 0, _a = this.backgroundItems; _i < _a.length; _i++) {
                    var item = _a[_i];
                    item.sprite.texture = PIXI.Loader.shared.resources["background" + this.currentImageNumber].texture;
                }
            }
            var part = 1 - this.fadeOutLeft / this.fadeTotal;
            alpha = 1 - part;
        }
        else if (this.fadeInLeft > 0) {
            this.fadeInLeft -= elapsedTime;
            if (this.fadeInLeft < 0) {
                this.fadeInLeft = 0;
            }
            var part = 1 - this.fadeInLeft / this.fadeTotal;
            alpha = part;
        }
        for (var _b = 0, _c = this.backgroundItems; _b < _c.length; _b++) {
            var item = _c[_b];
            item.sprite.alpha = alpha;
            item.sprite.x -= this.speed * elapsedTime / 1000;
            item.sprite.y += this.speed * elapsedTime / 1000;
            if (item.sprite.y > 1080 || item.sprite.x < -100) {
                var backSteps = Math.ceil(1180 / this.gap);
                item.sprite.x += backSteps * this.gap;
                item.sprite.y -= backSteps * this.gap;
            }
        }
    };
    Background.prototype.fadeIn = function (time) {
        this.fadeInLeft = time;
        this.fadeTotal = time;
        this.visible = true;
    };
    Background.prototype.fadeOut = function (time) {
        this.fadeOutLeft = time;
        this.fadeTotal = time;
    };
    return Background;
}());
var BackgroundItem = /** @class */ (function () {
    function BackgroundItem(x, y, imageNumber) {
        this.sprite = new PIXI.Sprite(PIXI.Loader.shared.resources["background" + imageNumber].texture);
        this.sprite.x = x;
        this.sprite.y = y;
        this.sprite.alpha = 0; //  Starts invisible. Fade in later.
        Game.app.stage.addChild(this.sprite);
    }
    return BackgroundItem;
}());
//# sourceMappingURL=background.js.map