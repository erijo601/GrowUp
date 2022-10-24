class ColorHelper {

    static rgbToHex(r: number, g: number, b: number) {

        let hexString = "0x" + this.componentToHex(Math.floor(r)) + this.componentToHex(Math.floor(g)) + this.componentToHex(Math.floor(b));

        let number = new Number(hexString);

        return number.valueOf();
    }

    static componentToHex(c): string {

        let hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }
}