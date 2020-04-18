
import { Vec2 } from '../math';


export class MouseInput {
    
    pos: Vec2 = new Vec2();
    dt: Vec2 = new Vec2();
    leftButtonDown: boolean = false;

    constructor(private canvas: HTMLCanvasElement) {
        this.canvas.addEventListener("mousedown", this.mouseDownEventHandler);
        this.canvas.addEventListener("mousemove", this.mouseMoveEventHandler);
        this.canvas.addEventListener("mouseup", this.mouseUpEventHandler);
    }

    destroy() {
        this.canvas.removeEventListener("mousedown", this.mouseDownEventHandler);
        this.canvas.removeEventListener("mousemove", this.mouseMoveEventHandler);
        this.canvas.removeEventListener("mouseup", this.mouseUpEventHandler);
    }

    update() {
        this.dt = new Vec2();
    }

    private mouseDownEventHandler = (e: MouseEvent) => {
        this.leftButtonDown = true;
    }

    private mouseMoveEventHandler = (e: MouseEvent) => {

        const area = this.canvas.getBoundingClientRect();

        const lastPos = this.pos;
        this.pos = new Vec2(e.pageX - area.x, e.pageY - area.y);
        this.dt = Vec2.sub(this.pos, lastPos);
    }
    private mouseUpEventHandler = () => {
        this.leftButtonDown = false;
    }
}