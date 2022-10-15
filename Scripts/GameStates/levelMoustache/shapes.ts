class Shape {

    private boxW: number = 24;  //  Box-bildens storlek i pixlar
    private boxH: number = 19;
    private faceBgx: number;
    private faceBgy: number;

    public points: Point[]; // points that make up this shape
    public sprites: PIXI.Sprite[];  //  corresponding sprites
    public rotation = 0; // what rotation 0,1,2,3

    constructor(faceBgx: number, faceBgy: number) {

        this.faceBgx = faceBgx;
        this.faceBgy = faceBgy;
        this.sprites = [];
    }

    private move(x: number, y: number): Point[] {

        var newPoints = [];

        for (var i = 0; i < this.points.length; i++) {

            newPoints.push(new Point(this.points[i].x + x, this.points[i].y + y));
        }

        return newPoints;
    }

    public onExit() {

        for (let n = 0; n < this.sprites.length; n++) {

            Game.app.stage.removeChild(this.sprites[n]);
        }
    }

    public addSprites(player: number) {

        for (let point of this.points) {

            let img = "box-p" + player + "-" + MathHelper.randomInt(0, 3);

            this.sprites.push(new PIXI.Sprite(PIXI.Loader.shared.resources[img].texture));
        }

        this.updateSprites(player, 1);

        for (let n = 0; n < this.sprites.length; n++) {

            Game.app.stage.addChild(this.sprites[n]);
        }
    }

    public setPos(player: number, newPoints: Point[], partTimeLeftCurrentRow: number) {

        this.points = newPoints;
        this.updateSprites(player, partTimeLeftCurrentRow);
    }

    // return a set of points showing where this shape would be if we dropped it one
    public drop(): Point[] {

        return this.move(0, 1);
    }

    // return a set of points showing where this shape would be if we moved left one
    public moveLeft(): Point[] {

        return this.move(-1, 0);
    }

    // return a set of points showing where this shape would be if we moved right one
    public moveRight(): Point[] {

        return this.move(1, 0);
    }

    // override these
    // return a set of points showing where this shape would be if we rotate it
    public rotate(clockwise: boolean): Point[] {

        throw new Error("This method is abstract");
    }

    public updateSprites(player, partTimeLeftCurrentRow) {

        for (var i = 0; i < this.points.length; i++) {

            let sprite = this.sprites[i];
            let point = this.points[i];

            let row = point.y;

            if (row < 0) {
                row = 0;
            }

            let deltax;
            let deltay;

            if (row == 0) {

                deltax = 0;
                deltay = -19 * partTimeLeftCurrentRow;
            }
            else if (row == 20) {

                //  Detta är när raden åker ur näsan

                deltax = ((Grid.rowInfos[row - 1].x + point.x * Grid.rowInfos[row - 1].w) -
                    (Grid.rowInfos[row].x + point.x * Grid.rowInfos[row].w)) * EasingCurves.easeInExpo(partTimeLeftCurrentRow);

                deltay = (Grid.rowInfos[row - 1].y - Grid.rowInfos[row].y) * EasingCurves.easeInExpo(partTimeLeftCurrentRow);
            }
            else {

                deltax = ((Grid.rowInfos[row - 1].x + point.x * Grid.rowInfos[row - 1].w) -
                    (Grid.rowInfos[row].x + point.x * Grid.rowInfos[row].w)) * partTimeLeftCurrentRow;

                deltay = (Grid.rowInfos[row - 1].y - Grid.rowInfos[row].y) * partTimeLeftCurrentRow;
            }

            sprite.x = this.faceBgx + Grid.rowInfos[row].x + point.x * Grid.rowInfos[row].w + deltax;
            sprite.y = this.faceBgy + Grid.rowInfos[row].y + deltay;

            sprite.scale.x = 0.5 * Grid.rowInfos[row].w / 33.9;   //  Nedersta raden (i gameMatrix - inte moustache) ger scale = 0.5
            sprite.scale.y = 0.5;

            if (partTimeLeftCurrentRow == 1) {

                if (row == 20 && point.x == 0) {

                    let img = "box-p" + player + "-left-" + MathHelper.randomInt(0, 1);
                    sprite.texture = PIXI.Loader.shared.resources[img].texture;
                }
                else if (row == 20 && point.x == 9) {

                    let img = "box-p" + player + "-right-" + MathHelper.randomInt(0, 1);
                    sprite.texture = PIXI.Loader.shared.resources[img].texture;
                }
                else if (row == 26 && (point.x == 0 || point.x == 9)) {

                    let img = "box-p" + player + "-" + MathHelper.randomInt(0, 3);
                    sprite.texture = PIXI.Loader.shared.resources[img].texture;
                }
            }
        }
    }
}

class SquareShape extends Shape {

    constructor(faceBgx: number, faceBgy: number, cols: number) {

        super(faceBgx, faceBgy);

        var x = cols / 2;
        var y = -2;

        this.points = [];
        this.points.push(new Point(x, y));
        this.points.push(new Point(x + 1, y));
        this.points.push(new Point(x, y + 1));
        this.points.push(new Point(x + 1, y + 1));
    }

    public rotate(clockwise: boolean): Point[] {
        // this shape does not rotate
        return this.points;
    }
}

class LShape extends Shape {

    private leftHanded: boolean;

    constructor(faceBgx: number, faceBgy: number, leftHanded: boolean, cols: number) {

        super(faceBgx, faceBgy);

        this.leftHanded = leftHanded;

        var x = cols / 2;
        var y = -2;
        this.points = [];

        this.points.push(new Point(x, y - 1));
        this.points.push(new Point(x, y)); // 1 is our base point
        this.points.push(new Point(x, y + 1));
        this.points.push(new Point(x + (leftHanded ? -1 : 1), y + 1));
    }

    public rotate(clockwise: boolean): Point[] {

        this.rotation = (this.rotation + (clockwise ? 1 : -1)) % 4;
        var newPoints = [];

        switch (this.rotation) {

            case 0:
                newPoints.push(new Point(this.points[1].x, this.points[1].y - 1));
                newPoints.push(new Point(this.points[1].x, this.points[1].y));
                newPoints.push(new Point(this.points[1].x, this.points[1].y + 1));
                newPoints.push(new Point(this.points[1].x + (this.leftHanded ? -1 : 1), this.points[1].y + 1));
                break;

            case 1:
                newPoints.push(new Point(this.points[1].x + 1, this.points[1].y));
                newPoints.push(new Point(this.points[1].x, this.points[1].y));
                newPoints.push(new Point(this.points[1].x - 1, this.points[1].y));
                newPoints.push(new Point(this.points[1].x - 1, this.points[1].y + (this.leftHanded ? -1 : 1)));
                break;

            case 2:
                newPoints.push(new Point(this.points[1].x, this.points[1].y + 1));
                newPoints.push(new Point(this.points[1].x, this.points[1].y));
                newPoints.push(new Point(this.points[1].x, this.points[1].y - 1));
                newPoints.push(new Point(this.points[1].x + (this.leftHanded ? 1 : -1), this.points[1].y - 1));
                break;

            case 3:
                newPoints.push(new Point(this.points[1].x - 1, this.points[1].y));
                newPoints.push(new Point(this.points[1].x, this.points[1].y));
                newPoints.push(new Point(this.points[1].x + 1, this.points[1].y));
                newPoints.push(new Point(this.points[1].x + 1, this.points[1].y + (this.leftHanded ? 1 : -1)));
                break;

        }

        return newPoints;
    }
}

class StepShape extends Shape {

    private leftHanded: boolean;

    constructor(faceBgx: number, faceBgy: number, leftHanded: boolean, cols: number) {

        super(faceBgx, faceBgy);

        this.leftHanded = leftHanded;
        var x = cols / 2;
        var y = -1;

        this.points = [];
        this.points.push(new Point(x + (leftHanded ? 1 : -1), y));
        this.points.push(new Point(x, y)); // point 1 is our base point
        this.points.push(new Point(x, y - 1));
        this.points.push(new Point(x + (leftHanded ? -1 : 1), y - 1));
    }


    public rotate(clockwise: boolean): Point[] {

        this.rotation = (this.rotation + (clockwise ? 1 : -1)) % 2;
        var newPoints = [];

        switch (this.rotation) {

            case 0:
                newPoints.push(new Point(this.points[1].x + (this.leftHanded ? 1 : -1), this.points[1].y));
                newPoints.push(new Point(this.points[1].x, this.points[1].y));
                newPoints.push(new Point(this.points[1].x, this.points[1].y - 1));
                newPoints.push(new Point(this.points[1].x + (this.leftHanded ? -1 : 1), this.points[1].y - 1));
                break;

            case 1:
                newPoints.push(new Point(this.points[1].x, this.points[1].y + (this.leftHanded ? 1 : -1)));
                newPoints.push(new Point(this.points[1].x, this.points[1].y));
                newPoints.push(new Point(this.points[1].x + 1, this.points[1].y));
                newPoints.push(new Point(this.points[1].x + 1, this.points[1].y + (this.leftHanded ? -1 : 1)));

                break;
        }

        return newPoints;
    }
}

class StraightShape extends Shape {

    constructor(faceBgx: number, faceBgy: number, cols: number) {

        super(faceBgx, faceBgy);

        var x = cols / 2;
        var y = -2;

        this.points = [];
        this.points.push(new Point(x, y - 2));
        this.points.push(new Point(x, y - 1));
        this.points.push(new Point(x, y)); // point 2 is our base point
        this.points.push(new Point(x, y + 1));
    }

    public rotate(clockwise: boolean): Point[] {

        this.rotation = (this.rotation + (clockwise ? 1 : -1)) % 2;
        var newPoints = [];

        switch (this.rotation) {
            case 0:
                newPoints[0] = new Point(this.points[2].x, this.points[2].y - 2);
                newPoints[1] = new Point(this.points[2].x, this.points[2].y - 1);
                newPoints[2] = new Point(this.points[2].x, this.points[2].y);
                newPoints[3] = new Point(this.points[2].x, this.points[2].y + 1);
                break;

            case 1:
                newPoints[0] = new Point(this.points[2].x + 2, this.points[2].y);
                newPoints[1] = new Point(this.points[2].x + 1, this.points[2].y);
                newPoints[2] = new Point(this.points[2].x, this.points[2].y);
                newPoints[3] = new Point(this.points[2].x - 1, this.points[2].y);
                break;
        }

        return newPoints;
    }
}

class TShape extends Shape {

    constructor(faceBgx: number, faceBgy: number, cols: number) {

        super(faceBgx, faceBgy);

        this.points = [];
        var x = cols / 2;
        var y = -2;

        this.points.push(new Point(x - 1, y));
        this.points.push(new Point(x, y)); // point 1 is our base point
        this.points.push(new Point(x + 1, y));
        this.points.push(new Point(x, y + 1));
    }

    public rotate(clockwise: boolean): Point[] {

        this.rotation = (this.rotation + (clockwise ? 1 : -1)) % 4;
        var newPoints = [];

        switch (this.rotation) {
            case 0:
                newPoints.push(new Point(this.points[1].x - 1, this.points[1].y));
                newPoints.push(new Point(this.points[1].x, this.points[1].y));
                newPoints.push(new Point(this.points[1].x + 1, this.points[1].y));
                newPoints.push(new Point(this.points[1].x, this.points[1].y + 1));
                break;

            case 1:
                newPoints.push(new Point(this.points[1].x, this.points[1].y - 1));
                newPoints.push(new Point(this.points[1].x, this.points[1].y));
                newPoints.push(new Point(this.points[1].x, this.points[1].y + 1));
                newPoints.push(new Point(this.points[1].x - 1, this.points[1].y));
                break;

            case 2:
                newPoints.push(new Point(this.points[1].x + 1, this.points[1].y));
                newPoints.push(new Point(this.points[1].x, this.points[1].y));
                newPoints.push(new Point(this.points[1].x - 1, this.points[1].y));
                newPoints.push(new Point(this.points[1].x, this.points[1].y - 1));
                break;

            case 3:
                newPoints.push(new Point(this.points[1].x, this.points[1].y + 1));
                newPoints.push(new Point(this.points[1].x, this.points[1].y));
                newPoints.push(new Point(this.points[1].x, this.points[1].y - 1));
                newPoints.push(new Point(this.points[1].x + 1, this.points[1].y));
                break;

        }

        return newPoints;
    }
}

class DotShape extends Shape {

    //  Används bara för att spawna lite startblock

    constructor(faceBgx: number, faceBgy: number, x: number, y: number) {

        super(faceBgx, faceBgy);

        this.points = [];

        this.points.push(new Point(x, y));
    }

    public rotate(clockwise: boolean): Point[] {

        return this.points;
    }
}