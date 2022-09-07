class LoadingState extends GameState {

    public logoFz: PIXI.AnimatedSprite;
    public logoTimer: number;

    public pipe: PIXI.AnimatedSprite;

    public timeLeftCurrentFrame: number;

    public currentFrame: number;

    public totalTimeElasped: number;

    public activeLetters: SmokeLetter[];

    private nextLoadingLetter: number;
    private timeTilNextLoadingLetter: number;

    constructor() {

        super(0, null, null, null, null);

        let fzTextures = [];

        for (let n = 0; n < 8; n++) {

            fzTextures.push(Game.loadingScreenLoader.resources["fz" + n].texture);
        }

        fzTextures.push(Game.loadingScreenLoader.resources["fz0"].texture);

        this.logoFz = new PIXI.AnimatedSprite(fzTextures);
        this.logoFz.loop = false;
        this.logoFz.animationSpeed = 0.2;
        this.logoFz.x = 730;
        this.logoFz.y = 70;

        var that = this;

        this.logoFz.onComplete = function () {

            that.logoTimer = setTimeout(() => { that.logoFz.gotoAndPlay(0); }, 2000);
        };

        let pipeTextures = [];

        pipeTextures.push(Game.loadingScreenLoader.resources["pipe0"].texture);
        pipeTextures.push(Game.loadingScreenLoader.resources["pipe1"].texture);
        pipeTextures.push(Game.loadingScreenLoader.resources["pipe1"].texture);
        pipeTextures.push(Game.loadingScreenLoader.resources["pipe2"].texture);
        pipeTextures.push(Game.loadingScreenLoader.resources["pipe2"].texture);
        pipeTextures.push(Game.loadingScreenLoader.resources["pipe3"].texture);
        pipeTextures.push(Game.loadingScreenLoader.resources["pipe4"].texture);
        pipeTextures.push(Game.loadingScreenLoader.resources["pipe3"].texture);
        pipeTextures.push(Game.loadingScreenLoader.resources["pipe0"].texture);

        this.pipe = new PIXI.AnimatedSprite(pipeTextures);
        this.pipe.loop = false;
        this.pipe.animationSpeed = 0.3;
        this.pipe.x = 786;
        this.pipe.y = 777;

        this.activeLetters = [];

        this.onEnter();
    }

    public onEnter(): void {

        Game.app.stage.addChild(this.logoFz);
        Game.app.stage.addChild(this.pipe);

        this.logoFz.gotoAndPlay(0);

        this.totalTimeElasped = 0;
        this.timeLeftCurrentFrame = 500;

        this.nextLoadingLetter = 0;
        this.timeTilNextLoadingLetter = 500;
    }

    public onExit(): void {

        Game.app.stage.removeChild(this.logoFz);

        for (let n = 0; n < this.activeLetters.length; n++) {

            this.activeLetters[n].removeFromStage();
        }

        clearTimeout(this.logoTimer);

        Game.app.renderer.backgroundColor = 0xffffff;

        Game.currentStatePlayer1 = new TitleState(0, 'w', 's', 'a', 'd');
        Game.currentStatePlayer1.onEnter();
    }

    public update(elapsedTime: number): void {

        // elapsedTime in ms

        if (Game.doneLoading && !Game.keyboard.current.isPressed('enter') && Game.keyboard.last.isPressed('enter')) {

            this.onExit();
        }





        //  Alternate between letter and letter-alt

        this.timeLeftCurrentFrame -= elapsedTime;

        if (this.timeLeftCurrentFrame <= 0) {

            for (let n = 0; n < this.activeLetters.length; n++) {

                this.activeLetters[n].changeFrame();
            }
            
            this.timeLeftCurrentFrame += 500;
        }

        //  Spawn new loading letters

        if (this.timeTilNextLoadingLetter > 0) {

            this.timeTilNextLoadingLetter -= elapsedTime;

            if (this.timeTilNextLoadingLetter <= 0) {

                if (this.nextLoadingLetter == 7) {

                    for (let n = 0; n < this.activeLetters.length; n++) {

                        this.activeLetters[n].totalFadeoutTime = 3000;
                        this.activeLetters[n].fadeoutTimeLeft = 3000;
                    }

                    this.nextLoadingLetter = 0;
                    this.timeTilNextLoadingLetter += 3000;
                }
                else {

                    this.pipe.gotoAndPlay(0);

                    let that = this;

                    this.pipe.onFrameChange = function (currentFrame: number) {

                        if (currentFrame == 6) {

                            //  TODO: Jag ska inte alltid spawna loading letter här. En gång på slutet ska jag spawna press enter letters (alla samtidigt)

                            that.spawnLoadingLetter();
                        }
                    };                    

                    this.timeTilNextLoadingLetter += 800;
                }
            }
        }








        //  Update all active letters
        let n = this.activeLetters.length;

        while (n--) {

            this.activeLetters[n].update(elapsedTime);

            if (this.activeLetters[n].shouldRemove) {

                this.activeLetters.splice(n, 1);
            }
        }
    }

    private spawnLoadingLetter() {

        switch (this.nextLoadingLetter) {
            case 0:
                this.activeLetters.push(new SmokeLetter('l', 630, 546));
                break;
            case 1:
                this.activeLetters.push(new SmokeLetter('o', 722, 547));
                break;
            case 2:
                this.activeLetters.push(new SmokeLetter('a', 828, 543));
                break;
            case 3:
                this.activeLetters.push(new SmokeLetter('d', 931, 546));
                break;
            case 4:
                this.activeLetters.push(new SmokeLetter('i', 1027, 546));
                break;
            case 5:
                this.activeLetters.push(new SmokeLetter('n', 1100, 545));
                break;
            case 6:
                this.activeLetters.push(new SmokeLetter('g', 1202, 550));
                break;
        }

        this.nextLoadingLetter++;

        if (this.nextLoadingLetter > 7) {

            this.nextLoadingLetter = 7;
        }
    }
}