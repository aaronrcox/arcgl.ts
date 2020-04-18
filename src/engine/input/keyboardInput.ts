

export class KeyboardInput {
    
    lastKeyState: {[key: number]: boolean} = {};
    keyState: {[key: number]: boolean} = {};

    constructor(private canvas: HTMLCanvasElement) {
        console.log('creating keyboard input');
        document.addEventListener("keydown", this.keyDownEventHandler);
        document.addEventListener("keyup", this.keyUpEventHandler);
        
        // this.canvas.onkeydown = this.keyDownEventHandler;
        // this.canvas.onkeydown = this.keyUpEventHandler;

        //this.canvas.addEventListener("keydown", this.keyDownEventHandler);
        //this.canvas.addEventListener("keyup", this.keyUpEventHandler);
    }

    destroy() {
        document.removeEventListener("keydown", this.keyDownEventHandler);
        document.removeEventListener("keyup", this.keyUpEventHandler);
    }

    isKeyDown(key: number): boolean {
        return this.keyState[key] || false;
    }

    wasKeyPressed(key: number): boolean {
        return (this.keyState[key] && !this.lastKeyState[key]) || false;
    }

    wasKeyReleased(key: number): boolean {
        return (this.keyState[key] && !this.lastKeyState[key]) || false;
    }

    update() {
        this.lastKeyState = {...this.keyState};
    }

    private keyDownEventHandler = (e: KeyboardEvent) => {
        
        console.log(e.key + ' : ' + e.keyCode);
        this.keyState[e.keyCode] = true;
    }

    private keyUpEventHandler = (e: KeyboardEvent) => {
        this.keyState[e.keyCode] = false;
    }

}