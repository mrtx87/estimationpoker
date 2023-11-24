import { RGB } from "./rgb";

export class RGBA extends RGB {
    a: number;


    constructor(r: number, g: number, b: number, a: number) {
        super(r, g, b);
        this.a = a;
    }
}
