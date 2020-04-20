
import { InputManager } from './input/inputManager';
import { Renderer2d } from './graphics/renderer2d';
import { FrameTimer } from './utils/frameTimer';
import { RenderTexture } from './graphics/renderTexture';

export class App
{

    static input: InputManager;

    canvas: HTMLCanvasElement;
    
    time: FrameTimer;
    renderer2d: Renderer2d;

    gl: WebGL2RenderingContext;

    get input(): InputManager {
        return App.input
    }

    constructor(htmlCanvasId: string) {

        this.canvas = document.getElementById(htmlCanvasId) as HTMLCanvasElement;
        this.resize();
        this.time = new FrameTimer();

        this.gl = this.canvas.getContext("webgl2", {
            antialias: true
        });

        if(App.input == null)
            App.input = new InputManager(this.canvas);

        this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);

        // create a fake render target reresenting the canvas
        const canvasRenderTarget = new RenderTexture(this.gl);
        canvasRenderTarget.width = this.canvas.width;
        canvasRenderTarget.height = this.canvas.height;
        canvasRenderTarget.enable();

        this.renderer2d = new Renderer2d(this.canvas, this.gl);
    }

    destroy() {
    }

    async loadAssets() {
        // derrived classes will implement load asset logic.
    }

    async launch() {
        await this.loadAssets();
        this.run();
    }

    update() {
    }

    draw() {
        this.gl.clearColor(0.0, 0.0, 0.0, 0.0); // black
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT)
    }

    run() {
        this.time.update();
        this.update();
        this.draw();

        this.input.keyboard.update();
        this.input.mouse.update();
        
        requestAnimationFrame(() => {
             this.run();
        });
    }

    private resize() {
        // Lookup the size the browser is displaying the canvas.
        var displayWidth  = this.canvas.clientWidth;
        var displayHeight = this.canvas.clientHeight;
    
        // Check if the canvas is not the same size.
        if (this.canvas.width  !== displayWidth ||
            this.canvas.height !== displayHeight) {
    
          // Make the canvas the same size
          this.canvas.width  = displayWidth;
          this.canvas.height = displayHeight;
        }
      }
}