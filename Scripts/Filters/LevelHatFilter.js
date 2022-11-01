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
var LevelHatFilter = /** @class */ (function (_super) {
    __extends(LevelHatFilter, _super);
    function LevelHatFilter() {
        return _super.call(this, LevelHatFilter.vertex, LevelHatFilter.fragment) || this;
    }
    Object.defineProperty(LevelHatFilter.prototype, "iceRect", {
        get: function () {
            return this.uniforms.rect;
        },
        set: function (value) {
            this.uniforms.iceRect = value;
        },
        enumerable: false,
        configurable: true
    });
    //  For 2d, vertex shaders will most likely always be the same
    LevelHatFilter.vertex = "\n        attribute vec2 aVertexPosition;\n        attribute vec2 aTextureCoord;\n\n        uniform mat3 projectionMatrix;\n\n        varying vec2 vTextureCoord;\n\n        void main(void)\n        {\n            gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n            vTextureCoord = aTextureCoord;\n        }\n        ";
    LevelHatFilter.fragment = "\n        precision mediump float;\n\n        //  Standard PIXI.js uniforms\n        varying vec2 vTextureCoord;\n        uniform sampler2D uSampler;\n        uniform vec4 filterArea;\n        \n        uniform vec4 iceRect;\n\n        void main(void)\n        {\n            vec4 pixel = texture2D(uSampler, vTextureCoord);\n\n            vec2 pixelCoord = vTextureCoord.xy * filterArea.xy;\n\n            if (pixelCoord.x >= iceRect.x && pixelCoord.x <= iceRect.x + iceRect.z &&\n                pixelCoord.y >= iceRect.y && pixelCoord.y <= iceRect.y + iceRect.w) {\n\n                vec2 mirrorCoord = pixelCoord;\n                mirrorCoord.y = iceRect.y - (pixelCoord.y - iceRect.y) * 2.0;\n\n                vec2 mirrorTextureCoord;\n                mirrorTextureCoord.xy = mirrorCoord / filterArea.xy;\n\n                vec4 mirrorPixel = texture2D(uSampler, mirrorTextureCoord);\n\n                mirrorPixel.a = (pixelCoord.y - iceRect.y) / iceRect.w;\n\n                pixel = mix(pixel, mirrorPixel, mirrorPixel.a);\n                pixel.a = 1.0;\n            }\n\n            gl_FragColor = pixel;\n        }\n        ";
    return LevelHatFilter;
}(PIXI.Filter));
//# sourceMappingURL=LevelHatFilter.js.map