class MathHelper {

    static randomInt(min, max): number {

        //  min and max included
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    static clamp(value, min, max): number {

        return Math.min(Math.max(value, min), max);
    }
}

class Interval {

    public min: number;
    public max: number;

    constructor(min: number, max: number) {

        this.min = min;
        this.max = max;
    }

    public random(): number {

        return Math.random() * (this.max - this.min) + this.min;
    }
}