class EasingCurves {

    //  Mer fina kurvor här -> https://easings.net/

    static easeInOutQuad(x: number): number {

        if (x > 1) {
            x = 1
        }
        else if (x < 0) {
            x = 0
        }

        return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
    }

    static easeInOutCubic(x: number): number {

        return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
    }

    static easeInSine(x: number): number {

        return 1 - Math.cos((x * Math.PI) / 2);
    }

    static easeInCubic(x: number): number {

        return x * x * x;
    }

    static easeInQuart(x: number): number {

        return x * x * x * x;
    }

    static easeInQuint(x: number): number {

        return x * x * x * x * x;
    }

    static easeOutQuad(x: number): number {

        return 1 - (1 - x) * (1 - x);
    }

    static easeOutQuint(x: number): number {

        return 1 - Math.pow(1 - x, 5);
    }

    static easeInOutSine(x: number): number {

        return -(Math.cos(Math.PI * x) - 1) / 2;
    }

    static easeOutSine(x: number): number {

        return Math.sin((x * Math.PI) / 2);
    }

    static easeInOutBack(x: number): number {

        const c1 = 1.70158;
        const c2 = c1 * 1.525;

        return x < 0.5
            ? (Math.pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2
            : (Math.pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
    }

    static easeOutBack(x: number): number {

        const c1 = 1.70158;
        const c3 = c1 + 1;

        return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
    }

    static easeInExpo(x: number): number {

        return x === 0 ? 0 : Math.pow(2, 10 * x - 10);
    }

    static easeOutExpo(x: number): number {

        return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
    }

    static easeOutBounce(x: number): number {

        const n1 = 7.5625;
        const d1 = 2.75;

        if (x < 1 / d1) {
            return n1 * x * x;
        }
        else if (x < 2 / d1) {
            return n1 * (x -= 1.5 / d1) * x + 0.75;
        }
        else if (x < 2.5 / d1) {
            return n1 * (x -= 2.25 / d1) * x + 0.9375;
        }
        else {
            return n1 * (x -= 2.625 / d1) * x + 0.984375;
        }
    }

    static easeOutElastic(x: number): number {

        const c4 = (2 * Math.PI) / 3;

        return x === 0
            ? 0
            : x === 1
                ? 1
                : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
    }
}