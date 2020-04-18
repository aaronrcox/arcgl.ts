

export abstract class Shader 
{
    infoLog: string[] = [];
    program: WebGLProgram = null;
    attributes: {[key: string]: number} = {};

    constructor(protected gl: WebGL2RenderingContext) {
    }

    destroy() {
        this.gl.deleteProgram(this.program);
    }

    enable() {
        this.gl.useProgram(this.program);
    }

    disable() {
        this.gl.useProgram(this.program);
    }

    bindTexture2d(textureHandle: WebGLTexture, uniformLoc: WebGLUniformLocation, textureChanelIndex: number) {
        this.gl.uniform1i(uniformLoc, textureChanelIndex);
        this.gl.activeTexture( this.gl.TEXTURE0 + textureChanelIndex);
        this.gl.bindTexture(this.gl.TEXTURE_2D, textureHandle);
        this.gl.activeTexture( this.gl.TEXTURE0 );
    }

    protected createShader(source: string, type: number): WebGLShader {
        const shader = this.gl.createShader(type);
        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);

        const log = this.gl.getShaderInfoLog(shader);
        this.infoLog.push('[ VERT ] ' + log);

        return shader;
    }

    protected createProgram(vertexShader: WebGLShader, fragmentShader: WebGLShader, inputs: string[], deleteShaders: boolean = true): WebGLProgram {
        const program = this.gl.createProgram();
        this.gl.attachShader(program, vertexShader);
        this.gl.attachShader(program, fragmentShader);
        
        for(let i = 0; i < inputs.length; i++) {
            this.attributes[inputs[i]] = i;
            this.gl.bindAttribLocation(program, i, inputs[i]);
        }

        this.gl.linkProgram(program);
        this.gl.validateProgram(program);
        
        const log = this.gl.getProgramInfoLog(program);
        this.infoLog.push('[ FRAG ] ' + log);        
        
        if(deleteShaders) {
            this.gl.deleteShader(vertexShader);
            this.gl.deleteShader(fragmentShader);
        }

        return program;
    }

}