class IntroState extends GameState {

    public background: PIXI.Sprite;

    constructor(xOffset: number, upKey: string, downKey: string, leftKey: string, rightKey: string) {

        super(xOffset, upKey, downKey, leftKey, rightKey);

        this.background = new PIXI.Sprite(PIXI.Loader.shared.resources["intro-bg"].texture);
        this.background.scale.x = 2;
        this.background.scale.y = 2;

        this.background.x = 0;
        this.background.y = 0;
    }

    public onEnter(): void {

        Game.app.stage.addChild(this.background);
    }

    public onExit(): void {

        Game.app.stage.removeChild(this.background);

        Game.currentStatePlayer1 = new TitleState(this.xOffset, this.upKey, this.downKey, this.leftKey, this.rightKey);
        Game.currentStatePlayer1.onEnter();
    }

    public update(elapsedTime: number): void {

        // elapsedTime in ms

        if (!Game.keyboard.current.isPressed('enter') && Game.keyboard.last.isPressed('enter')) {

            this.onExit();
        }
    }
}