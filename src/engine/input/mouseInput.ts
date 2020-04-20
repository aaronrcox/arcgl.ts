
import { Vec2 } from '../math';

export enum MOUSE {
    LEFT = 0,
    MIDDLE = 1,
    RIGHT = 2
}

export class MouseInput {
    
    pos: Vec2 = new Vec2();
    dt: Vec2 = new Vec2();

    buttons: boolean[] = [];
    lastButtons: boolean[] = [];

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
        this.lastButtons = [...this.buttons];
    }

    isButtonDown(btn: MOUSE) {
        return this.buttons[btn];
    }

    wasButtonPressed(btn: MOUSE) {
        return this.buttons[btn] && !this.lastButtons[btn];
    }

    private mouseDownEventHandler = (e: MouseEvent) => {
        this.leftButtonDown = true;
        this.buttons[e.button] = true;
    }

    private mouseUpEventHandler = (e: MouseEvent) => {
        this.leftButtonDown = false;
        this.buttons[e.button] = false;
    }

    private mouseMoveEventHandler = (e: MouseEvent) => {

        const area = this.canvas.getBoundingClientRect();

        const lastPos = this.pos;
        this.pos = new Vec2(e.pageX - area.x, e.pageY - area.y);
        this.dt = Vec2.sub(this.pos, lastPos);
    }

}