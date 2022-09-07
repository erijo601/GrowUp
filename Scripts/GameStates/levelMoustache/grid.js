var Grid = /** @class */ (function () {
    function Grid() {
        this.cols = 10;
        this.rows = 20;
        this.createRowInfos();
        this.gameMatrix = [];
        for (var h = 0; h < this.rows; h++) {
            this.gameMatrix[h] = [];
            for (var w = 0; w < this.cols; w++) {
                this.gameMatrix[h][w] = false;
            }
        }
    }
    Grid.prototype.createRowInfos = function () {
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
    };
    Grid.prototype.isPosValid = function (points) {
        var valid = true;
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
    };
    Grid.prototype.addShape = function (shape) {
        for (var i = 0; i < shape.points.length; i++) {
            if (shape.points[i].y < 0) {
                //  a block has landed and it isn't even fully on the grid yet
                return false;
            }
            this.gameMatrix[shape.points[i].y][shape.points[i].x] = true;
        }
        return true;
    };
    return Grid;
}());
var RowInfo = /** @class */ (function () {
    function RowInfo(x, y, w) {
        this.x = x;
        this.y = y;
        this.w = w;
    }
    return RowInfo;
}());
//# sourceMappingURL=grid.js.map