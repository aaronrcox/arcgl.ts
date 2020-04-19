import img from '../../assets/prop-crate-plain.png';
import { Texture2D } from "../../engine/graphics/texture";
import { App } from "../../engine/app";
import { Vec4, Shape } from '../../engine/math';
import { RenderTexture } from '../../engine/graphics/renderTexture';

export class RenderTextureDemo extends App {

    image: Texture2D;
    rot: number  = 0;

    renderTexture: RenderTexture;

    constructor(htmlCanvasId: string) {
        super(htmlCanvasId);
    }

    async loadAssets(): Promise<void> {
        await super.loadAssets();

        this.image = new Texture2D(this.gl);
        this.image.load(img);

        this.renderTexture = new RenderTexture(this.gl);
        
        const renderTextureSize = Math.min(this.canvas.width / 4, 256);
        this.renderTexture.load(renderTextureSize, renderTextureSize);
    }
    
    update() {
        super.update();
        this.rot += this.time.deltaTime;
    }

    draw() {
        super.draw();

        const size = this.renderTexture.width;

        // Draw an image onto the render target
        // ================================================
        this.renderTexture.enable();
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);

        this.renderer2d.begin();

        this.renderer2d.saveState(true);
        this.renderer2d.setTexture(this.image);
        this.renderer2d.setColor(new Vec4(1,1,1,1));

        this.renderer2d.darwRect(size/2, size/2, size*0.75, size*0.75, this.rot, 0.5, 0.5);
        this.renderer2d.drawLines( Shape.makeBox(size/2, size/2, size-2, size-2, 0).points, 2);

        this.renderer2d.popState();
        this.renderer2d.end();

        this.renderTexture.disable();
        // ================================================

        // draw the render target image back to the canvas
        //================================================
        
        this.renderer2d.begin();

        this.renderer2d.saveState(true);
        this.renderer2d.setTexture(this.renderTexture);
        this.renderer2d.setColor(new Vec4(1,1,1,1));

        this.renderer2d.darwRect(this.canvas.width / 2 - size - 10, this.canvas.height / 2, size, size, 0, 0.5, 0.5);
        this.renderer2d.setColor(new Vec4(0, 0, 0, 1));
        this.renderer2d.darwRect(this.canvas.width / 2, this.canvas.height / 2, size, size, 0, 0.5, 0.5);
        this.renderer2d.setColor(new Vec4(1, 0, 0, 1));
        this.renderer2d.darwRect(this.canvas.width / 2 + size + 10, this.canvas.height / 2, size, size, 0, 0.5, 0.5);

        this.renderer2d.popState();
        this.renderer2d.end();

    }

}
