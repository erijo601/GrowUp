class Cubicle {

    public worldPosition: Position;
    public background: PIXI.Sprite;
    public items: CubicleItem[];

    constructor(worldX: number, worldY: number) {

        this.worldPosition = new Position(worldX, worldY);

        this.background = new PIXI.Sprite(PIXI.Loader.shared.resources["level-office-cubicle"].texture);

        this.items = [];
        //  TODO: Lite sumpmässigt innehåll och placering i cuben
    }

    public onEnter(): void {

    }

    public onExit(): void {

    }

    public isInside(playerPosition: Position) : boolean {

        if (playerPosition.x >= this.worldPosition.x && playerPosition.x <= this.worldPosition.x + 300 &&
            playerPosition.y >= this.worldPosition.y && playerPosition.y <= this.worldPosition.y + 300) {

            return true;
        }

        return false;
    }

    public update(playerWorldPosition: Position) {

        let cubicleRelativeToPlayer = new Position(
            this.worldPosition.x - playerWorldPosition.x + 950 / 2,
            this.worldPosition.y - playerWorldPosition.y + 950 / 2);

        this.background.x = cubicleRelativeToPlayer.x;
        this.background.y = cubicleRelativeToPlayer.y;

        for (let item of this.items) {

            item.update(cubicleRelativeToPlayer);
        }
    }
}

class CubicleItem {

    public sprite: PIXI.Sprite;
    public relativeToCubicle: Position;

    constructor(relativeToCubicleX: number, relativeToCubicleY: number) {

        this.relativeToCubicle = new Position(relativeToCubicleX, relativeToCubicleY);
    }

    public update(cubicleRelativeToPlayer: Position) {

        this.sprite.x = cubicleRelativeToPlayer.x + this.relativeToCubicle.x + 950 / 2;
        this.sprite.y = cubicleRelativeToPlayer.y + this.relativeToCubicle.y + 950 / 2;
    }
}