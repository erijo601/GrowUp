var Util = (function () {
    function Util() {
    }
    Util.prototype.intersects = function (points1, points2) {
        var a = points1;
        var b = points2;
        var polygons = [a, b];
        var minA, maxA, projected, minB, maxB, j;
        for (var i = 0; i < polygons.length; i++) {
            var polygon = polygons[i];
            for (var i1 = 0; i1 < polygon.length; i1 += 2) {
                var i2 = (i1 + 2) % polygon.length;
                var normal = { x: polygon[i2 + 1] - polygon[i1 + 1], y: polygon[i1] - polygon[i2] };
                minA = maxA = null;
                for (j = 0; j < a.length; j += 2) {
                    projected = normal.x * a[j] + normal.y * a[j + 1];
                    if (minA === null || projected < minA) {
                        minA = projected;
                    }
                    if (maxA === null || projected > maxA) {
                        maxA = projected;
                    }
                }
                minB = maxB = null;
                for (j = 0; j < b.length; j += 2) {
                    projected = normal.x * b[j] + normal.y * b[j + 1];
                    if (minB === null || projected < minB) {
                        minB = projected;
                    }
                    if (maxB === null || projected > maxB) {
                        maxB = projected;
                    }
                }
                if (maxA < minB || maxB < minA) {
                    return false;
                }
            }
        }
        return true;
    };
    return Util;
}());
//# sourceMappingURL=Util.js.map