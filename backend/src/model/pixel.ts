export class S9Pixel {
   x: number;
   y: number;
   color: string;

   constructor(init: Partial<S9Pixel>) {
       this.x = init.x;
       this.y = init.y;
       this.color = init.color;
   }
}
