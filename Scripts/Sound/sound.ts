class SoundPlayer {

    public titleIntro: Howl;
    public titleLoop: Howl;
    public titleSwoosh: Howl;

    constructor() {

        this.loadCommonSounds();
    }

    private loadCommonSounds() {

        this.titleIntro = new Howl({
            src: ['sound/title-intro.mp3'],
            preload: true,
            volume: 1.0,
            loop: false
        });

        this.titleLoop = new Howl({
            src: ['sound/title-loop.mp3'],
            preload: true,
            volume: 1.0,
            loop: true
        });

        var that = this;

        this.titleIntro.on("end", function () { that.titleLoop.play(); });

        this.titleSwoosh = new Howl({
            src: ['sound/title-swoosh.mp3'],
            preload: true,
            volume: 0.8,
            loop: false
        });        
    }
}