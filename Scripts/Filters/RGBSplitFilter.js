var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var RGBSplitFilter = /** @class */ (function (_super) {
    __extends(RGBSplitFilter, _super);
    function RGBSplitFilter(red, green, blue) {
        if (red === void 0) { red = new PIXI.Point(-10, 0); }
        if (green === void 0) { green = new PIXI.Point(0, 10); }
        if (blue === void 0) { blue = new PIXI.Point(0, 0); }
        var _this = _super.call(this, RGBSplitFilter.vertex, RGBSplitFilter.fragment) || this;
        _this.red = red;
        _this.green = green;
        _this.blue = blue;
        return _this;
    }
    Object.defineProperty(RGBSplitFilter.prototype, "red", {
        get: function () {
            return this.uniforms.red;
        },
        set: function (value) {
            this.uniforms.red = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RGBSplitFilter.prototype, "green", {
        get: function () {
            return this.uniforms.green;
        },
        set: function (value) {
            this.uniforms.green = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RGBSplitFilter.prototype, "blue", {
        get: function () {
            return this.uniforms.blue;
        },
        set: function (value) {
            this.uniforms.blue = value;
        },
        enumerable: false,
        configurable: true
    });
    //  For 2d, vertex shaders will most likely always be the same
    RGBSplitFilter.vertex = "\n        attribute vec2 aVertexPosition;\n        attribute vec2 aTextureCoord;\n\n        uniform mat3 projectionMatrix;\n\n        varying vec2 vTextureCoord;\n\n        void main(void)\n        {\n            gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n            vTextureCoord = aTextureCoord;\n        }\n        ";
    RGBSplitFilter.fragment = "\n        precision mediump float;\n\n        varying vec2 vTextureCoord;\n\n        uniform sampler2D uSampler;\n        uniform vec4 filterArea;\n        uniform vec2 red;\n        uniform vec2 green;\n        uniform vec2 blue;\n\n        void main(void)\n        {\n           gl_FragColor.r = texture2D(uSampler, vTextureCoord + red/filterArea.xy).r;\n           gl_FragColor.g = texture2D(uSampler, vTextureCoord + green/filterArea.xy).g;\n           gl_FragColor.b = texture2D(uSampler, vTextureCoord + blue/filterArea.xy).b;\n           gl_FragColor.a = texture2D(uSampler, vTextureCoord).a;\n        }\n        ";
    return RGBSplitFilter;
}(PIXI.Filter));
//# sourceMappingURL=RGBSplitFilter.js.map