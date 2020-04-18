
import { Vec2 } from '../math';


export class MouseInput {
    
    pos: Vec2 = new Vec2();
    dt: Vec2 = new Vec2();
    leftButtonDown: boolean = false;

    constructor(private canvas: HTMLCanvasElement) {
        document.addEventListener("mousedown", this.mouseDownEventHandler);
        document.addEventListener("mousemove", this.mouseMoveEventHandler);
        document.addEventListener("mouseup", this.mouseUpEventHandler);
    }

    destroy() {
        document.removeEventListener("mousedown", this.mouseDownEventHandler);
        document.removeEventListener("mousemove", this.mouseMoveEventHandler);
        document.removeEventListener("mouseup", this.mouseUpEventHandler);
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