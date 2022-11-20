var SoundPlayer = /** @class */ (function () {
    function SoundPlayer() {
        this.loadCommonSounds();
    }
    SoundPlayer.prototype.loadCommonSounds = function () {
        this.titleIntro = new Howl({
            src: ['sound/title-intro.mp3'],
            //html5: true,
            preload: true,
            volume: 1.0,
            loop: false
        });
        this.titleLoop = new Howl({
            src: ['sound/title-loop.mp3'],
            //html5: true,
            preload: true,
            volume: 1.0,
            loop: true
        });
        var that = this;
        this.titleIntro.on("end", function () { that.titleLoop.play(); });
        this.titleSwoosh = new Howl({
            src: ['sound/title-swoosh.mp3'],
            //html5: true,
            preload: true,
            volume: 0.8,
            loop: false
        });
        this.musicScoreScreen = new Howl({
            src: ['sound/music-score.mp3'],
            //html5: true,
            preload: true,
            volume: 1.0,
            loop: true
        });
        this.musicScoreScreen.on("fade", function () {
            that.musicScoreScreen.stop();
        });
        this.musicMoustache = new Howl({
            src: ['sound/music-moustache.mp3'],
            //html5: true,
            preload: true,
            volume: 1.0,
            loop: false
        });
        this.musicTie = new Howl({
            src: ['sound/music-tie.mp3'],
            //html5: true,
            preload: true,
            volume: 1.0,
            loop: false
        });
        this.musicHat = new Howl({
            src: ['sound/music-hat.mp3'],
            //html5: true,
            preload: true,
            volume: 1.0,
            loop: false
        });
        this.musicOffice = new Howl({
            src: ['sound/music-office.mp3'],
            //html5: true,
            preload: true,
            volume: 0.8,
            loop: false
        });
        this.musicWhiskey = new Howl({
            src: ['sound/music-whiskey.mp3'],
            //html5: true,
            preload: true,
            volume: 1.0,
            loop: false
        });
        this.musicEnd = new Howl({
            src: ['sound/music-end.mp3'],
            //html5: true,
            preload: true,
            volume: 1.0,
            loop: true
        });
        this.scoreWheel = new Howl({
            src: ['sound/score-wheel.mp3'],
            //html5: true,
            preload: true,
            volume: 0.7,
            loop: true,
        });
        this.scoreWheel.on("fade", function () {
            that.scoreWheel.stop();
        });
        this.titleLoop.on("fade", function () {
            that.titleLoop.stop();
        });
    };
    return SoundPlayer;
}());
//# sourceMappingURL=sound.js.map