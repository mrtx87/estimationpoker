export class RGB {
    r: number;
    g: number;
    b: number;


    constructor(r: number, g: number, b: number) {
        this.r = r;
        this.g = g;
        this.b = b;
    }

    getR(): number {
        return this.r;
    }

    setR(value: number) {
        this.r = value;
    }

    getG(): number {
        return this.g;
    }

    setG(value: number) {
        this.g = value;
    }

    getB(): number {
        return this.b;
    }

    setB(value: number) {
        this.b = value;
    }

    equals(color: RGB) {
        return this.r === color?.r && this.g === color?.g && this.b === color?.b;
    }

    toHex() {
        return "#" + this.componentToHex(this.r) + this.componentToHex(this.g) + this.componentToHex(this.b);
    }

    private componentToHex(c: number) {
        let hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }

    static from(init: Partial<RGB>) {
        return new RGB(init.r, init.g, init.b);
    }
}
