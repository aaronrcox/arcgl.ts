import img from '../../assets/prop-crate-plain.png';
import { Texture2D } from "../../engine/graphics/texture";
import { App } from "../../engine/app";
import { Vec4 } from '../../engine/math';

export class RectRotationDemo extends App {

    image: Texture2D;
    rot: number  = 0;

    constructor(htmlCanvasId: string) {
        super(htmlCanvasId);
    }

    async loadAssets(): Promise<void> {
        await super.loadAssets();

        this.image = new Texture2D(this.gl);
        this.image.load(img);
    }
    
    update() {
        super.update();
        this.rot += this.time.deltaTime;
    }

    draw() {
        super.draw();

        const ww = this.canvas.width;
        const wh = this.canvas.height;
        const aw = ww/1.5;
        const ah = wh/1.5;
        const as = Math.min(aw, ah) - 75;
        const left = ww/2 - as/2;
        const right = ww/2 + as/2;
        const top =  wh/2 - as/2;
        const bottom = wh/2 + as/2;

        this.renderer2d.begin();

        const w = 75;
        const h = 75;

        this.renderer2d.saveState(true);
        this.renderer2d.setTexture(this.image);
        this.renderer2d.setColor(new Vec4(1,1,1,1));

        // this.renderer2d.darwRect(100, 100, this.canvas.width - 200, this.canvas.height - 200, 0, 0, 0);


        // draw boxes rotating various pivot poitns
        this.renderer2d.darwRect(left, top, w, h, this.rot, 0, 0);
        this.renderer2d.darwRect((left+right)/2, top, w, h, this.rot, 0.5, 0);
        this.renderer2d.darwRect(right, top, w, h, this.rot, 1, 0);

        this.renderer2d.darwRect(left, (top+bottom)/2, w, h, this.rot, 0, 0.5);
        this.renderer2d.darwRect((left+right)/2, (top+bottom)/2, w, h, this.rot, 0.5, 0.5);
        this.renderer2d.darwRect(right, (top+bottom)/2, w, h, this.rot, 1, 0.5);

        this.renderer2d.darwRect(left, bottom, w, h, this.rot, 0, 1);
        this.renderer2d.darwRect((left+right)/2, bottom, w, h, this.rot, 0.5, 1);
        this.renderer2d.darwRect(right, bottom, w, h, this.rot, 1, 1);

        this.renderer2d.popState();
        this.renderer2d.saveState();

        this.renderer2d.setColor(new Vec4(1, 1, 1, 0.5));

        // draw lines to show pivot points
        const lineThickness = 3;
        this.renderer2d.drawLine(left, top, right, top, lineThickness);
        this.renderer2d.drawLine(left, (bottom+top)/2, right, (bottom+top)/2, lineThickness);
        this.renderer2d.drawLine(left, bottom, right, bottom, lineThickness);

        this.renderer2d.drawLine(left, top, left, bottom, lineThickness);
        this.renderer2d.drawLine((left+right)/2, top, (left+right)/2, bottom, lineThickness);
        this.renderer2d.drawLine(right, top, right, bottom, lineThickness);

        this.renderer2d.end();
    }

}
