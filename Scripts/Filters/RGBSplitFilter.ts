class RGBSplitFilter extends PIXI.Filter {

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

        varying vec2 vTextureCoord;

        uniform sampler2D uSampler;
        uniform vec4 filterArea;
        uniform vec2 red;
        uniform vec2 green;
        uniform vec2 blue;

        void main(void)
        {
           gl_FragColor.r = texture2D(uSampler, vTextureCoord + red/filterArea.xy).r;
           gl_FragColor.g = texture2D(uSampler, vTextureCoord + green/filterArea.xy).g;
           gl_FragColor.b = texture2D(uSampler, vTextureCoord + blue/filterArea.xy).b;
           gl_FragColor.a = texture2D(uSampler, vTextureCoord).a;
        }
        `;

    constructor(red: PIXI.Point = new PIXI.Point(-10, 0), green: PIXI.Point = new PIXI.Point(0, 10), blue: PIXI.Point = new PIXI.Point(0, 0)) {
        super(RGBSplitFilter.vertex, RGBSplitFilter.fragment);
        this.red = red;
        this.green = green;
        this.blue = blue;
    }

    get red(): PIXI.Point {
        return this.uniforms.red;
    }
    set red(value: PIXI.Point) {
        this.uniforms.red = value;
    }

    get green(): PIXI.Point {
        return this.uniforms.green;
    }
    set green(value: PIXI.Point) {
        this.uniforms.green = value;
    }

    get blue(): PIXI.Point {
        return this.uniforms.blue;
    }
    set blue(value: PIXI.Point) {
        this.uniforms.blue = value;
    }
}