class LevelHatFilter extends PIXI.Filter {

    //  For 2d, vertex shaders will most likely always be the same
    static vertex = `
        attribute vec2 aVertexPosition;
        attribute vec2 aTextureCoord;

        uniform mat3 projectionMatrix;

        varying vec2 vTextureCoord;

        void main(void)
        {
            gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
            vTextureCoord = aTextureCoord;
        }
        `;

    static fragment = `
        precision mediump float;

        //  Standard PIXI.js uniforms
        varying vec2 vTextureCoord;
        uniform sampler2D uSampler;
        uniform vec4 filterArea;
        
        uniform vec4 iceRect;

        void main(void)
        {
            vec4 pixel = texture2D(uSampler, vTextureCoord);

            vec2 pixelCoord = vTextureCoord.xy * filterArea.xy;

            if (pixelCoord.x >= iceRect.x && pixelCoord.x <= iceRect.x + iceRect.z &&
                pixelCoord.y >= iceRect.y && pixelCoord.y <= iceRect.y + iceRect.w) {

                vec2 mirrorCoord = pixelCoord;
                mirrorCoord.y = iceRect.y - (pixelCoord.y - iceRect.y) * 2.0;

                vec2 mirrorTextureCoord;
                mirrorTextureCoord.xy = mirrorCoord / filterArea.xy;

                vec4 mirrorPixel = texture2D(uSampler, mirrorTextureCoord);

                mirrorPixel.a = (pixelCoord.y - iceRect.y) / iceRect.w;

                pixel = mix(pixel, mirrorPixel, mirrorPixel.a);
                pixel.a = 1.0;
            }

            gl_FragColor = pixel;
        }
        `;

    constructor() {
        super(LevelHatFilter.vertex, LevelHatFilter.fragment);

    }

    get iceRect(): PIXI.Rectangle {

        return this.uniforms.rect;
    }

    set iceRect(value: PIXI.Rectangle) {
        this.uniforms.iceRect = value;
    }
}