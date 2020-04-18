
import { ITexture2d } from './texture';

export class RenderTexture implements ITexture2d {

    width: number = 0;
    height: number = 0;
    handle: WebGLTexture = null;

    glFrameBuffer: WebGLFramebuffer = null;
    glDepthBuffer: WebGLRenderbuffer = null;

    static rendetTargetStack: RenderTexture[] = [];
    
    constructor(protected gl: WebGL2RenderingContext) {
        
    }

    load(width: number, height: number) {
        this.width = width;
        this.height = height;


        // Create an opengl texture
        this.handle = this.gl.createTexture();
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.handle);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.REPEAT);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.REPEAT);
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.width, this.height, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, null);

        // create the framebuffer
        this.glFrameBuffer = this.gl.createFramebuffer();
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.glFrameBuffer);
        this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0, this.gl.TEXTURE_2D, this.handle, 0);
        this.gl.drawBuffers([this.gl.COLOR_ATTACHMENT0]);

        // checck if everything was successfull
        const frameBufferStatus = this.gl.checkFramebufferStatus(this.gl.FRAMEBUFFER);
        if( frameBufferStatus != this.gl.FRAMEBUFFER_COMPLETE )
            return false;

        // restore things back to normal
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
        this.gl.bindTexture(this.gl.TEXTURE_2D, null);

        return true;

    }

    destroy() {
        this.gl.deleteFramebuffer(this.glFrameBuffer);
        this.gl.deleteTexture(this.handle);
    }

    enable() {
        RenderTexture.enableRenderTarget(this.gl, this);
    }

    disable() {
        RenderTexture.disableRenderTarget(this.gl);
    }

    static enableRenderTarget(gl: WebGL2RenderingContext, target: RenderTexture) {

        RenderTexture.rendetTargetStack.push(target);

        const currentRenderTarget = RenderTexture.currentRenderTarget();
        gl.bindFramebuffer(gl.FRAMEBUFFER, currentRenderTarget.glFrameBuffer);
        gl.viewport(0, 0, currentRenderTarget.width, currentRenderTarget.height);
        
    }

    static disableRenderTarget(gl: WebGL2RenderingContext) {
        if(RenderTexture.rendetTargetStack.length > 1)
            RenderTexture.rendetTargetStack.pop();

        const currentRenderTarget = RenderTexture.currentRenderTarget();
        gl.bindFramebuffer(gl.FRAMEBUFFER, currentRenderTarget.glFrameBuffer);
        gl.viewport(0, 0, currentRenderTarget.width, currentRenderTarget.height);

    }

    static currentRenderTarget() {
        return RenderTexture.rendetTargetStack[RenderTexture.rendetTargetStack.length-1] ?? null
    }
}