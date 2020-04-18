import { MouseInput } from './mouseInput';
import { KeyboardInput } from './keyboardInput';

export class InputManager {

    mouse: MouseInput;
    keyboard: KeyboardInput;


    constructor(canvas: HTMLCanvasElement) {
        this.mouse = new MouseInput(canvas);
        this.keyboard = new KeyboardInput(canvas);
    }

    destroy() {
        this.mouse.destroy();
        this.keyboard.destroy();
        
        this.keyboard = null;
        this.mouse = null;
    }
}