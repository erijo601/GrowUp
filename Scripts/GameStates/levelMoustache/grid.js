var Grid = (function () {
    function Grid() {
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
    };
    Grid.prototype.onExit = function () {
        for (var _i = 0, _a = this.shapes; _i < _a.length; _i++) {
            var shape = _a[_i];
            shape.onExit();
        }
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
    Grid.prototype.getSmallestY = function () {
        for (var y = 0; y < this.rows; y++) {
            for (var x = 0; x < this.cols; x++) {
                if (this.gameMatrix[y][x] == true) {
                    return y;
                }
            }
        }
        return this.rows;
    };
    Grid.prototype.fadeNoseContent = function (alpha) {
        for (var _i = 0, _a = this.shapes; _i < _a.length; _i++) {
            var shape = _a[_i];
            for (var i = 0; i < shape.points.length; i++) {
                if (shape.points[i].y < this.rows) {
                    shape.sprites[i].alpha = alpha;
                }
            }
        }
    };
    Grid.prototype.addShape = function (shape) {
        this.shapes.push(shape);
        for (var i = 0; i < shape.points.length; i++) {
            if (shape.points[i].y < 0) {
                return false;
            }
            this.gameMatrix[shape.points[i].y][shape.points[i].x] = true;
        }
        return true;
    };
    Grid.prototype.updateRows = function (player, partTimeLeftCurrentRow) {
        for (var _i = 0, _a = this.shapes; _i < _a.length; _i++) {
            var shape = _a[_i];
            shape.setPos(player, shape.points, partTimeLeftCurrentRow);
        }
    };
    Grid.prototype.dropRows = function (player) {
        for (var _i = 0, _a = this.shapes; _i < _a.length; _i++) {
            var shape = _a[_i];
            var points = shape.drop();
            shape.setPos(player, points, 1);
        }
        var score = 0;
        for (var h = this.rows + this.moustacheRows - 1; h >= 0; h--) {
            for (var w = 0; w < this.cols; w++) {
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
    };
    return Grid;
}());
var RowInfo = (function () {
    function RowInfo(x, y, w) {
        this.x = x;
        this.y = y;
        this.w = w;
    }
    return RowInfo;
}());
