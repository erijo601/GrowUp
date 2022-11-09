var Cutscene = /** @class */ (function () {
    function Cutscene(x, y, player, upKey, downKey, leftKey, rightKey, scoreCounter) {
        this.visible = false;
        this.x = x;
        this.y = y;
        this.player = player;
        this.upKey = upKey;
        this.downKey = downKey;
        this.leftKey = leftKey;
        this.rightKey = rightKey;
        this.scoreCounter = scoreCounter;
        this.background = new PIXI.Sprite(PIXI.Loader.shared.resources["level-office-cutscene-background-p" + player].texture);
        this.background.x = 0;
        this.background.y = 0;
        this.background.zIndex = 1000;
        this.head = new PIXI.Sprite(PIXI.Loader.shared.resources["level-office-cutscene-head-p" + player].texture);
        this.head.x = 100;
        this.head.y = 260;
        this.head.zIndex = 1001;
        this.head.pivot.x = 150;
        this.head.pivot.y = 200;
        //  Angle: 0 -> 30
        this.textStart = new PIXI.Sprite(PIXI.Loader.shared.resources["level-office-cutscene-text-start"].texture);
        this.textStart.x = 1920 / 2;
        this.textStart.y = 1080 / 2;
        this.textStart.pivot.x = this.textStart.width / 2;
        this.textStart.pivot.y = this.textStart.height / 2;
        this.textStart.zIndex = 201;
        this.textStart.visible = false;
        this.textEnd = new PIXI.Sprite(PIXI.Loader.shared.resources["level-office-cutscene-text-end"].texture);
        this.textEnd.x = 1920 / 2;
        this.textEnd.y = 1080 / 2;
        this.textEnd.pivot.x = this.textEnd.width / 2;
        this.textEnd.pivot.y = this.textEnd.height / 2;
        this.textEnd.zIndex = 201;
        this.textEnd.visible = false;
        this.handPoint = new PIXI.Sprite(PIXI.Loader.shared.resources["level-office-cutscene-hand-point-p" + player].texture);
        this.handPoint.x = -708; //  -708 -> -107
        this.handPoint.y = 408;
        this.handPoint.zIndex = 1003;
        this.handEmpty = new PIXI.Sprite(PIXI.Loader.shared.resources["level-office-cutscene-hand-empty-p" + player].texture);
        this.handEmpty.x = -107; //  -107 -> -22
        this.handEmpty.y = 392; //  392 -> 660
        this.handEmpty.zIndex = 1003;
        this.handCoffee = new PIXI.Sprite(PIXI.Loader.shared.resources["level-office-cutscene-hand-coffee-p" + player].texture);
        this.handCoffee.x = 162; //  162 -> 83
        this.handCoffee.y = 724;
        this.handCoffee.zIndex = 1003;
        this.handCoffee.pivot.x = 175;
        this.handCoffee.pivot.y = 65;
        //  Angle 0 -> 60
        this.eye = new PIXI.Sprite(PIXI.Loader.shared.resources["level-office-cutscene-eye"].texture);
        this.eye.x = x + 164;
        this.eye.y = y + 236;
        this.eye.zIndex = 1002;
        this.eye.pivot.x = 14;
        this.eye.pivot.y = 14;
        this.eye.visible = false;
        this.cup = new PIXI.Sprite(PIXI.Loader.shared.resources["level-office-cutscene-cup"].texture);
        this.cup.x = 562;
        this.cup.y = 688;
        this.cup.zIndex = 1002;
        this.coffee = new PIXI.Sprite(PIXI.Loader.shared.resources["level-office-cutscene-coffee0"].texture);
        this.coffee.x = x + 632;
        this.coffee.y = y + 650;
        this.coffee.zIndex = 1001;
        this.coffee.visible = false;
        this.renderTexture = PIXI.RenderTexture.create({ width: this.background.width, height: this.background.height });
        this.sprite = new PIXI.Sprite(this.renderTexture);
        this.sprite.x = x;
        this.sprite.y = y;
        this.sprite.zIndex = 200;
        this.instructions = new PIXI.Sprite(PIXI.Loader.shared.resources["keyright-p1"].texture);
        this.instructions.zIndex = 1003;
        this.instructions.x = this.x + 256;
        this.instructions.y = this.y + 411;
    }
    Cutscene.prototype.isVisible = function () {
        return this.visible;
    };
    Cutscene.prototype.onEnter = function () {
        this.visible = true;
        this.currentState = 0;
        this.timeElapsedCurrentStateTransition = 0;
        this.totalTransitionTime = 300;
        this.isTransition = false;
        this.cupsHad = 0;
        this.timeLeftCurrentFrameCoffee = 20;
        this.currentFrameCoffee = 0;
        this.timeLeftCurrentFrameInstructions = 1000 / 8;
        this.currentFrameInstructions = 0;
        Game.app.stage.addChild(this.sprite);
        Game.app.stage.addChild(this.eye);
        Game.app.stage.addChild(this.coffee);
        Game.app.stage.addChild(this.instructions);
        Game.app.stage.addChild(this.textStart);
        Game.app.stage.addChild(this.textEnd);
        this.updateSprites(this.currentState, 0);
    };
    Cutscene.prototype.onExit = function () {
        Game.app.stage.removeChild(this.sprite);
        Game.app.stage.removeChild(this.eye);
        Game.app.stage.removeChild(this.coffee);
        Game.app.stage.removeChild(this.instructions);
        Game.app.stage.removeChild(this.textStart);
        Game.app.stage.removeChild(this.textEnd);
    };
    Cutscene.prototype.showStartText = function (partElapsed) {
        this.textStart.visible = true;
        this.textEnd.visible = false;
        this.textStart.scale.x = 0.5 + 0.5 * EasingCurves.easeOutBack(partElapsed);
        this.textStart.scale.y = 0.5 + 0.5 * EasingCurves.easeOutBack(partElapsed);
    };
    Cutscene.prototype.showEndText = function (partElapsed) {
        this.textStart.visible = false;
        this.textEnd.visible = true;
        this.textEnd.scale.x = 0.5 + 0.5 * EasingCurves.easeOutBack(partElapsed);
        this.textEnd.scale.y = 0.5 + 0.5 * EasingCurves.easeOutBack(partElapsed);
    };
    Cutscene.prototype.hideTexts = function () {
        this.textStart.visible = false;
        this.textEnd.visible = false;
    };
    Cutscene.prototype.update = function (elapsedTime) {
        this.scoreCounter.update(elapsedTime);
        if (this.isTransition) {
            this.instructions.visible = false;
        }
        else {
            this.instructions.visible = true;
            this.timeLeftCurrentFrameInstructions -= elapsedTime;
            if (this.timeLeftCurrentFrameInstructions <= 0) {
                this.timeLeftCurrentFrameInstructions += 1000 / 8;
                this.currentFrameInstructions++;
                if (this.currentFrameInstructions > 1) {
                    this.currentFrameInstructions = 0;
                }
                var textureKey = "";
                if (this.currentState == 0) {
                    textureKey = "keyright" + (this.currentFrameInstructions == 0 ? "" : "-pressed") + "-p" + this.player;
                }
                else if (this.currentState == 1) {
                    textureKey = "keydown" + (this.currentFrameInstructions == 0 ? "" : "-pressed") + "-p" + this.player;
                }
                else if (this.currentState == 2) {
                    textureKey = "keyleft" + (this.currentFrameInstructions == 0 ? "" : "-pressed") + "-p" + this.player;
                }
                else {
                    textureKey = "keyup" + (this.currentFrameInstructions == 0 ? "" : "-pressed") + "-p" + this.player;
                }
                this.instructions.texture = PIXI.Loader.shared.resources[textureKey].texture;
            }
        }
        if (this.cupsHad > 0 && this.head.angle == 0) {
            this.eye.visible = true;
            this.eye.angle += this.cupsHad * 360 * elapsedTime / 1000;
        }
        else {
            this.eye.visible = false;
        }
        if (this.currentState == 1) {
            this.coffee.visible = true;
            this.timeLeftCurrentFrameCoffee -= elapsedTime;
            if (this.timeLeftCurrentFrameCoffee < 0) {
                this.timeLeftCurrentFrameCoffee = 20;
                this.currentFrameCoffee++;
                if (this.currentFrameCoffee > 1) {
                    this.currentFrameCoffee = 0;
                }
                this.coffee.texture = PIXI.Loader.shared.resources["level-office-cutscene-coffee" + this.currentFrameCoffee].texture;
            }
        }
        else {
            this.coffee.visible = false;
        }
        if (this.isTransition) {
            this.timeElapsedCurrentStateTransition += elapsedTime;
            if (this.timeElapsedCurrentStateTransition > this.totalTransitionTime) {
                this.isTransition = false;
                this.timeElapsedCurrentStateTransition = 0;
                this.currentState++;
                if (this.currentState > 3) {
                    this.currentState = 0;
                    this.cupsHad++;
                    this.scoreCounter.setNewScore(this.scoreCounter.getDesiredScore() + 1, 200);
                }
                if (this.currentState == 0) {
                    this.totalTransitionTime = 300;
                    this.instructions.x = this.x + 256;
                    this.instructions.y = this.y + 411;
                }
                else if (this.currentState == 1) {
                    this.totalTransitionTime = 200;
                    this.instructions.x = this.x + 423;
                    this.instructions.y = this.y + 550;
                }
                else if (this.currentState == 2) {
                    this.totalTransitionTime = 100;
                    this.instructions.x = this.x + 367;
                    this.instructions.y = this.y + 662;
                }
                else if (this.currentState == 3) {
                    this.totalTransitionTime = 400;
                    this.instructions.x = this.x + 361;
                    this.instructions.y = this.y + 609;
                }
            }
            this.updateSprites(this.currentState, this.timeElapsedCurrentStateTransition / this.totalTransitionTime);
        }
        else {
            if (this.currentState == 0 &&
                Game.keyboard.current.isPressed(this.rightKey) && !Game.keyboard.last.isPressed(this.rightKey)) {
                this.isTransition = true;
            }
            else if (this.currentState == 1 &&
                Game.keyboard.current.isPressed(this.downKey) && !Game.keyboard.last.isPressed(this.downKey)) {
                this.isTransition = true;
            }
            else if (this.currentState == 2 &&
                Game.keyboard.current.isPressed(this.leftKey) && !Game.keyboard.last.isPressed(this.leftKey)) {
                this.isTransition = true;
            }
            else if (this.currentState == 3 &&
                Game.keyboard.current.isPressed(this.upKey) && !Game.keyboard.last.isPressed(this.upKey)) {
                this.isTransition = true;
            }
        }
    };
    Cutscene.prototype.updateSprites = function (state, partElapsed) {
        this.cup.visible = false;
        this.handCoffee.visible = false;
        this.handCoffee.angle = 0;
        this.handEmpty.visible = false;
        this.handPoint.visible = false;
        this.head.angle = 0;
        if (state == 0) {
            //  Push button
            this.handPoint.visible = true;
            this.handPoint.x = -708 + 601 * partElapsed;
        }
        else if (state == 1) {
            //  Grab cup
            this.cup.visible = true;
            this.handEmpty.visible = true;
            this.handEmpty.x = -87 + 65 * partElapsed;
            this.handEmpty.y = 398 + 262 * partElapsed;
        }
        else if (state == 2) {
            //  Pull back cup
            this.handCoffee.visible = true;
            this.handCoffee.x = 162 - 129 * partElapsed;
        }
        else if (state == 3) {
            //  Chug cup
            partElapsed *= 2;
            if (partElapsed > 1) {
                partElapsed = 1;
            }
            this.handCoffee.visible = true;
            this.handCoffee.x = 33;
            this.handCoffee.angle = -60 * partElapsed;
            if (partElapsed > 0.9) {
                var partHead = (partElapsed - 0.9) / 0.1;
                this.head.angle = -30 * partHead;
            }
        }
        this.render();
    };
    Cutscene.prototype.render = function () {
        Game.app.renderer.render(this.background, this.renderTexture, true);
        Game.app.renderer.render(this.head, this.renderTexture, false);
        Game.app.renderer.render(this.cup, this.renderTexture, false);
        Game.app.renderer.render(this.handPoint, this.renderTexture, false);
        Game.app.renderer.render(this.handEmpty, this.renderTexture, false);
        Game.app.renderer.render(this.handCoffee, this.renderTexture, false);
    };
    return Cutscene;
}());
//# sourceMappingURL=cutscene.js.map