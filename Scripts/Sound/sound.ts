class SoundPlayer {

    public titleIntro: Howl;
    public titleLoop: Howl;
    public titleSwoosh: Howl;
    public musicScoreScreen: Howl;
    public musicMoustache: Howl;
    public scoreWheel: Howl;

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

        this.musicScoreScreen = new Howl({
            src: ['sound/music-score.mp3'],
            preload: true,
            volume: 1.0,
            loop: true
        });

        this.musicScoreScreen.on("fade", function () {
            if (that.musicScoreScreen.volume() == 0) {
                that.musicScoreScreen.stop();
            }
        });

        this.musicMoustache = new Howl({
            src: ['sound/music-moustache.mp3'],
            preload: true,
            volume: 1.0,
            loop: false
        });

        this.scoreWheel = new Howl({
            src: ['sound/score-wheel.mp3'],
            preload: true,
            volume: 1.0,
            loop: true,
        });

        this.scoreWheel.on("fade", function () {
            if (that.scoreWheel.volume() == 0) {
                that.scoreWheel.stop();
            }
        });                
    }
}