
export interface ITexture2d {
    
    handle: WebGLTexture;
    width: number;
    height: number;

}

export class Texture2D implements ITexture2d {

    image: HTMLImageElement;
    handle: WebGLTexture;

    get width() {
        return this.image.width;
    }

    get height() {
        return this.image.height;
    }

    constructor(protected gl: WebGL2RenderingContext) {
        this.image = new Image();
    }

    destroy() {
        this.gl.deleteTexture(this.handle);
        this.handle = null;
    }

    load(location: string): Promise<Texture2D> {
        return new Promise<Texture2D>((resolve, reject) => {
            this.image.crossOrigin = 'anonymous';
            this.image.src = location;
            this.image.addEventListener('load', () => {

                this.handle = this.gl.createTexture();
                this.gl.bindTexture(this.gl.TEXTURE_2D, this.handle);

                this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
                this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
                this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.REPEAT);
                this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.REPEAT);

                this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.width, this.height, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, this.image);

                this.gl.bindTexture(this.gl.TEXTURE_2D, this.handle);

                resolve(this);
            });
        });
    }

}