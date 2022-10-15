class Grid {

    public cols: number;
    public rows: number;
    public moustacheRows: number;
    private gameMatrix: boolean[][];
    private shapes: Shape[];

    static rowInfos: RowInfo[];

    constructor() {

        this.cols = 10;
        this.rows = 20;
        this.moustacheRows = 10;

        this.shapes = [];

        this.createRowInfos();

        this.gameMatrix = [];

        for (var h = 0; h < this.rows + this.moustacheRows; h++) {

            this.gameMatrix[h] = [];

            for (var w = 0; w < this.cols; w++) {

                this.gameMatrix[h][w] = false;
            }
        }
    }

    private createRowInfos() {

        Grid.rowInfos = [];

        Grid.rowInfos.push(new RowInfo(306, 247, 23));
        Grid.rowInfos.push(new RowInfo(304, 266, 23.5));
        Grid.rowInfos.push(new RowInfo(301, 285, 23.9));
        Grid.rowInfos.push(new RowInfo(297, 304, 24.7));
        Grid.rowInfos.push(new RowInfo(295, 323, 25.1));
        Grid.rowInfos.push(new RowInfo(293, 342, 25.7));
        Grid.rowInfos.push(new RowInfo(289, 361, 26.4));
        Grid.rowInfos.push(new RowInfo(286, 380, 26.9));
        Grid.rowInfos.push(new RowInfo(284, 399, 27.4));
        Grid.rowInfos.push(new RowInfo(280, 418, 28.1));
        Grid.rowInfos.push(new RowInfo(277, 437, 28.7));
        Grid.rowInfos.push(new RowInfo(275, 455, 29.1));
        Grid.rowInfos.push(new RowInfo(271, 474, 29.8));
        Grid.rowInfos.push(new RowInfo(269, 493, 30.3));
        Grid.rowInfos.push(new RowInfo(266, 512, 30.9));
        Grid.rowInfos.push(new RowInfo(263, 531, 31.6));
        Grid.rowInfos.push(new RowInfo(260, 550, 32.2));
        Grid.rowInfos.push(new RowInfo(257, 569, 32.7));
        Grid.rowInfos.push(new RowInfo(254, 588, 33.4));
        Grid.rowInfos.push(new RowInfo(252, 607, 33.9));

        Grid.rowInfos.push(new RowInfo(233, 741, (340 + 38 * 1) / 10));
        Grid.rowInfos.push(new RowInfo(195, 760, (340 + 38 * 3) / 10));
        Grid.rowInfos.push(new RowInfo(157, 779, (340 + 38 * 5) / 10));
        Grid.rowInfos.push(new RowInfo(119, 798, (340 + 38 * 7) / 10));
        Grid.rowInfos.push(new RowInfo(100, 817, (340 + 38 * 8) / 10));
        Grid.rowInfos.push(new RowInfo(81, 836, (340 + 38 * 9) / 10));

        Grid.rowInfos.push(new RowInfo(62, 855, (340 + 38 * 10) / 10));
        Grid.rowInfos.push(new RowInfo(62, 874, (340 + 38 * 10) / 10));
        Grid.rowInfos.push(new RowInfo(62, 893, (340 + 38 * 10) / 10));
        Grid.rowInfos.push(new RowInfo(62, 912, (340 + 38 * 10) / 10));
    }

    public onExit() {

        for (let shape of this.shapes) {

            shape.onExit();
        }
    }

    public isPosValid(points: Point[]) {

        let valid: boolean = true;

        for (var i = 0; i < points.length; i++) {

            if ((points[i].x < 0) ||
                (points[i].x >= this.cols) ||
                (points[i].y >= this.rows)) {

                valid = false;
                break;
            }

            if (points[i].y >= 0) {

                if (this.gameMatrix[points[i].y][points[i].x] == true) {

                    valid = false;
                    break;
                }
            }
        }

        return valid;
    }

    public getSmallestY(): number {

        for (let y = 0; y < this.rows; y++) {

            for (let x = 0; x < this.cols; x++) {

                if (this.gameMatrix[y][x] == true) {

                    return y;
                }
            }
        }

        return this.rows;
    }

    public fadeNoseContent(alpha: number) {

        for (let shape of this.shapes) {

            for (let i = 0; i < shape.points.length; i++) {

                if (shape.points[i].y < this.rows) {

                    shape.sprites[i].alpha = alpha;
                }
            }
        }
    }

    public addShape(shape: Shape) {

        this.shapes.push(shape);

        for (var i = 0; i < shape.points.length; i++) {

            if (shape.points[i].y < 0) {

                //  a block has landed and it isn't even fully on the grid yet
                return false;
            }

            this.gameMatrix[shape.points[i].y][shape.points[i].x] = true;
        }

        return true;
    }

    public updateRows(player: number, partTimeLeftCurrentRow: number) {

        for (let shape of this.shapes) {

            shape.setPos(player, shape.points, partTimeLeftCurrentRow);
        }
    }

    public dropRows(player: number) : number {

        for (let shape of this.shapes) {

            let points = shape.drop();
            shape.setPos(player, points, 1);
        }

        let score = 0;

        for (let h = this.rows + this.moustacheRows - 1; h >= 0; h--) {

            for (let w = 0; w < this.cols; w++) {

                if (h == 0) {

                    this.gameMatrix[h][w] = false;
                }
                else {

                    this.gameMatrix[h][w] = this.gameMatrix[h - 1][w];

                    if (h == 20 && this.gameMatrix[h][w] == true) {

                        score++;
                    }
                }
            }
        }

        return score;
    }
}

class RowInfo {

    public x: number;
    public y: number;
    public w: number;

    constructor(x, y, w) {

        this.x = x;
        this.y = y;
        this.w = w;
    }
}