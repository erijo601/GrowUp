class LoadingState extends GameState {

    public pipe: PIXI.AnimatedSprite;

    public timeLeftCurrentFrame: number;

    public currentFrame: number;

    public totalTimeElasped: number;

    public activeLetters: SmokeLetter[];

    private nextLoadingLetter: number;
    private timeTilNextLoadingLetter: number;
    private noMoreLetters: boolean;

    constructor() {

        super(1, 0, null, null, null, null);

        this.stateName = "LoadingState";

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
        this.pipe.y = 677;

        this.activeLetters = [];

        this.onEnter();
    }

    public onEnter(): void {

        Game.app.stage.addChild(this.pipe);

        this.totalTimeElasped = 0;
        this.timeLeftCurrentFrame = 500;

        this.nextLoadingLetter = 0;
        this.timeTilNextLoadingLetter = 500;
        this.noMoreLetters = false;
    }

    public onExit(): void {

        this.pipe.visible = false;

        Game.app.stage.removeChild(this.pipe);

        for (let n = 0; n < this.activeLetters.length; n++) {

            this.activeLetters[n].removeFromStage();
        }

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
            
            this.timeLeftCurrentFrame += 400;
        }

        //  Spawn new loading letters

        if (this.timeTilNextLoadingLetter > 0 && !this.noMoreLetters) {

            this.timeTilNextLoadingLetter -= elapsedTime;

            if (this.timeTilNextLoadingLetter <= 0) {

                if (this.nextLoadingLetter == 7) {

                    for (let n = 0; n < this.activeLetters.length; n++) {

                        this.activeLetters[n].totalFadeoutTime = 1000;
                        this.activeLetters[n].fadeoutTimeLeft = 1000;
                    }

                    this.nextLoadingLetter = 0;
                    this.timeTilNextLoadingLetter += 1000;
                }
                else {

                    if (this.nextLoadingLetter == 0 && Game.doneLoading) {

                        this.noMoreLetters = true;
                    }

                    this.pipe.gotoAndPlay(0);

                    let that = this;

                    this.pipe.onFrameChange = function (currentFrame: number) {

                        if (that.noMoreLetters) {
                            //  Långsammare windup-animation för den sista puffen

                            if (currentFrame == 1) {

                                that.pipe.animationSpeed = 0.2;
                            }
                            else if (currentFrame == 2) {

                                that.pipe.animationSpeed = 0.15;
                            }
                            else if (currentFrame == 3) {

                                that.pipe.animationSpeed = 0.125;
                            }
                            else if (currentFrame == 4) {

                                that.pipe.animationSpeed = 0.1;
                            }
                            else {

                                that.pipe.animationSpeed = 0.3;
                            }
                        }

                        if (currentFrame == 6) {

                            if (that.noMoreLetters) {

                                that.spawnPressEnterLetters();
                            }
                            else {

                                that.spawnLoadingLetter();
                            }
                        }
                    };                    

                    this.timeTilNextLoadingLetter += 650;
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
                this.activeLetters.push(new SmokeLetter('l', 630, 446));
                break;
            case 1:
                this.activeLetters.push(new SmokeLetter('o', 722, 447));
                break;
            case 2:
                this.activeLetters.push(new SmokeLetter('a', 828, 443));
                break;
            case 3:
                this.activeLetters.push(new SmokeLetter('d', 931, 446));
                break;
            case 4:
                this.activeLetters.push(new SmokeLetter('i', 1010, 446));
                break;
            case 5:
                this.activeLetters.push(new SmokeLetter('n', 1100, 445));
                break;
            case 6:
                this.activeLetters.push(new SmokeLetter('g', 1202, 445));
                break;
        }

        this.nextLoadingLetter++;

        if (this.nextLoadingLetter > 7) {

            this.nextLoadingLetter = 7;
        }
    }

    private spawnPressEnterLetters() {

        //  TODO P and R
        this.activeLetters.push(new SmokeLetter('p', 440, 446));
        this.activeLetters.push(new SmokeLetter('r', 535, 446));
        this.activeLetters.push(new SmokeLetter('e', 630, 446));
        this.activeLetters.push(new SmokeLetter('s', 722, 447));
        this.activeLetters.push(new SmokeLetter('s', 828, 443));
        
        this.activeLetters.push(new SmokeLetter('e', 1010, 446));
        this.activeLetters.push(new SmokeLetter('n', 1100, 445));
        this.activeLetters.push(new SmokeLetter('t', 1202, 445));
        this.activeLetters.push(new SmokeLetter('e', 1295, 445));
        this.activeLetters.push(new SmokeLetter('r', 1390, 445));
        //  TODO E and R
    }
}