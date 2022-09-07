class LevelMoustache extends GameState {

    /// https://github.com/markheath/typescript-tetris/blob/master/TypeScriptTetris/app.ts
    


    private grid: Grid;
    private currentShape: Shape;

    private faceBg: PIXI.Sprite;

    constructor(xOffset: number, upKey: string, downKey: string, leftKey: string, rightKey: string) {

        super(xOffset, upKey, downKey, leftKey, rightKey);

        this.faceBg = new PIXI.Sprite(PIXI.Loader.shared.resources["face-bg"].texture);
        this.faceBg.x = 72 + this.xOffset;
        this.faceBg.y = 0;
    }

    public onEnter(): void {

        this.grid = new Grid();

        Game.app.stage.addChild(this.faceBg);

        //   TODO: Lägg till alla ansiktsframes FÖRE shape 



        //  TODO: Några slumpmässiga startbitar längst ner

        this.currentShape = this.spawnShape();


        //Game.soundPlayer.exampleSong.volume(0.05);
        //Game.soundPlayer.exampleSong.play();
    }

    public onExit(): void {

/*        Game.soundPlayer.exampleSong.stop();*/
    }

    public update(elapsedTime: number): void {

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


        
    }

    private spawnShape() : Shape {

        let shape = new LShape(this.faceBg.x, this.faceBg.y, true, 10);

        //  TODO: Slumpa shape from en bag med shapes

        return shape;
    }
}