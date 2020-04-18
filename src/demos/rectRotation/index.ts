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

        this.renderer2d.begin();

        const w = 75;
        const h = 75;

        this.renderer2d.saveState(true);
        this.renderer2d.setTexture(this.image);
        this.renderer2d.setColor(new Vec4(1,1,1,1));

        this.renderer2d.darwRect(100, 100, this.canvas.width - 200, this.canvas.height - 200, 0, 0, 0);

        this.renderer2d.setColor(new Vec4(1, 0, 0, 0.5));

        // draw boxes rotating various pivot poitns
        this.renderer2d.darwRect(100, 100, w, h, this.rot, 0, 0);
        this.renderer2d.darwRect(this.canvas.width / 2, 100, w, h, this.rot, 0.5, 0);
        this.renderer2d.darwRect(this.canvas.width - 100, 100, w, h, this.rot, 1, 0);

        this.renderer2d.darwRect(100, this.canvas.height/2, w, h, this.rot, 0, 0.5);
        this.renderer2d.darwRect(this.canvas.width / 2, this.canvas.height/2, w, h, this.rot, 0.5, 0.5);
        this.renderer2d.darwRect(this.canvas.width - 100, this.canvas.height/2, w, h, this.rot, 1, 0.5);

        this.renderer2d.darwRect(100, this.canvas.height - 100, w, h, this.rot, 0, 1);
        this.renderer2d.darwRect(this.canvas.width / 2, this.canvas.height-100, w, h, this.rot, 0.5, 1);
        this.renderer2d.darwRect(this.canvas.width - 100, this.canvas.height -100, w, h, this.rot, 1, 1);

        this.renderer2d.popState();
        this.renderer2d.saveState();

        // draw lines to show pivot points
        const lineThickness = 2;
        this.renderer2d.drawLine(100, 100, this.canvas.width - 100, 100, lineThickness);
        this.renderer2d.drawLine(100, this.canvas.height/2, this.canvas.width - 100, this.canvas.height/2, lineThickness);
        this.renderer2d.drawLine(100, this.canvas.height - 100, this.canvas.width - 100, this.canvas.height - 100, lineThickness);

        this.renderer2d.drawLine(100, 100, 100, this.canvas.height - 100, lineThickness);
        this.renderer2d.drawLine(this.canvas.width/2, 100, this.canvas.width/2, this.canvas.height - 100, lineThickness);
        this.renderer2d.drawLine(this.canvas.width-100, 100, this.canvas.width-100, this.canvas.height - 100, lineThickness);


        this.renderer2d.end();

    }

}
