

import { App } from "../../engine/app";
import { Vec2 } from "../../engine/math";

export class LineRenderingDemo extends App {

    constructor(htmlCanvasId: string) {
        super(htmlCanvasId);
    }

    async loadAssets(): Promise<void> {
        await super.loadAssets();
    }
    
    update() {
        super.update();
    }

    draw() {
        super.draw();

        this.renderer2d.begin();

        const points = [
            new Vec2(100, 100),
            new Vec2(200, 100),
            this.input.mouse.pos
        ];

        this.renderer2d.drawLines(points, 20);

        this.renderer2d.drawLine(300, 300, 400, 400, 6);

        this.renderer2d.end();
    }

}