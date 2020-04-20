
import { Vec2, IVec2, IVec3, Vec4, IVec4, Mat4, Rect } from '../math';
import { ITexture2d, Texture2D } from './texture';
import { Shader } from './shader';
import { Mat3 } from '../math/mat3';
import { RenderTexture } from './renderTexture';

export enum RenderMode {
    FILL,
    WIREFRAME,
}

const vertex_shader = `
    precision mediump float;

    attribute vec3 a_position;
    attribute vec4 a_color;
    attribute vec2 a_uv;

    uniform mat4 u_projection;

    varying vec2 v_uv;
    varying vec4 v_color;
    varying float v_uvId;

    void main() 
    {
        v_uvId = a_position.z;
        v_color = a_color;
        v_uv = a_uv;
        gl_Position = vec4(a_position.x, a_position.y, 0.0, 1.0) * u_projection;
    }
`;

const fragment_shader = `
    precision mediump float;

    varying vec2 v_uv;
    varying vec4 v_color;
    varying float v_uvId;

    uniform sampler2D u_texture0;
    uniform sampler2D u_texture1;
    uniform sampler2D u_texture2;
    uniform sampler2D u_texture3;
    uniform sampler2D u_texture4;

    void main() 
    {
        if      ( v_uvId == 0.0 ) gl_FragColor = texture2D(u_texture0, v_uv.st) * v_color;
        else if ( v_uvId == 1.0 ) gl_FragColor = texture2D(u_texture1, v_uv.st) * v_color;
        else if ( v_uvId == 2.0 ) gl_FragColor = texture2D(u_texture2, v_uv.st) * v_color;
        else if ( v_uvId == 3.0 ) gl_FragColor = texture2D(u_texture3, v_uv.st) * v_color;
        else if ( v_uvId == 4.0 ) gl_FragColor = texture2D(u_texture4, v_uv.st) * v_color;
        else gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
    }
`;

class Renderer2DSpriteShader extends Shader {
    constructor(gl: WebGL2RenderingContext) {
        super(gl);

        this.program = this.createProgram(
            this.createShader(vertex_shader, this.gl.VERTEX_SHADER),
            this.createShader(fragment_shader, this.gl.FRAGMENT_SHADER),
            ['a_position', 'a_color', 'a_uv'], true
        );
    }

    setTexture(textureHandle: WebGLTexture, index: number) {
        const textureLoc = this.gl.getUniformLocation(this.program, `u_texture${index}`);
        this.bindTexture2d(textureHandle, textureLoc, index);
    }

    setProjection(projection: Mat4) {
        const uniformProjectionLoc = this.gl.getUniformLocation(this.program, "u_projection");
        const arr = projection.toArray();

        this.gl.uniformMatrix4fv(uniformProjectionLoc, true, arr );
    }
}

class GlMeshBuffer {

    vao: WebGLVertexArrayObject;
    vbo: WebGLBuffer;
    ibo: WebGLBuffer;

    vSizeBytes: number;
    iSizeBytes: number;

    constructor(protected gl: WebGL2RenderingContext, vSizeBytes: number, iSizeBytes: number) {
        this.vSizeBytes = vSizeBytes;
        this.iSizeBytes = iSizeBytes;

        this.vao = this.gl.createVertexArray();
        this.vbo = this.gl.createBuffer();
        this.ibo = this.gl.createBuffer();
    }

    destroy() {
        this.gl.deleteBuffer(this.ibo);
        this.gl.deleteBuffer(this.vbo);
        this.gl.deleteVertexArray(this.vao);
    }

    bind() {
        this.gl.bindVertexArray(this.vao);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vbo);
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.ibo);
    }

    unbind() {
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, null);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
        this.gl.bindVertexArray(null);        
    }

    setVertexBufferSize(vertexBufferLength: number) {
        const vertexBufferSize = vertexBufferLength * this.vSizeBytes;
        this.gl.bufferData(this.gl.ARRAY_BUFFER, vertexBufferSize, this.gl.DYNAMIC_DRAW);
    }

    setIndexBufferSize(indexBufferLength: number) {
        const indexBufferSize = indexBufferLength * this.iSizeBytes;
        this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, indexBufferSize, this.gl.DYNAMIC_DRAW);
    }

    setVertexBufferData(verts: ArrayBufferView, numVerts: number, floatsPerVert: number) {
        //this.gl.bufferSubData(this.gl.ARRAY_BUFFER, 0, verts, 0, numVerts * floatsPerVert);
        this.gl.bufferSubData(this.gl.ARRAY_BUFFER, 0, verts, 0);       
    }

    setIndexBufferData(indices: ArrayBufferView, num: number) {
        // this.gl.bufferSubData(this.gl.ELEMENT_ARRAY_BUFFER, 0, indices, 0, num); //,  num * this.iSizeBytes);
        this.gl.bufferSubData(this.gl.ELEMENT_ARRAY_BUFFER, 0, indices, 0); 
    }

    draw(numIndices: number, renderMode: number = this.gl.TRIANGLES) {
        this.gl.drawElements(renderMode, numIndices, this.gl.UNSIGNED_SHORT, 0);
    }
}

class SpriteBuffer
{
    // 512 sprites, 4 verts per quad, 9 floats per vert
    verts: Float32Array = new Float32Array(128 * 4 * 9);

    // 512 sprites, 6 indices per quad (3 per triangle)
    indices: Uint16Array = new Uint16Array(128 * 6);

    buffer: GlMeshBuffer;

    size = Float32Array.BYTES_PER_ELEMENT * 9;

    private currentVert: number = 0;
    private currentFace: number = 0;

    get currentVertIndex(): number { return this.currentVert * 9; }
    get currentIndicyIndex(): number { return this.currentFace * 3; }

    constructor(protected gl: WebGL2RenderingContext) {
        this.buffer = new GlMeshBuffer(this.gl, Float32Array.BYTES_PER_ELEMENT * 9, Uint16Array.BYTES_PER_ELEMENT);

        this.buffer.bind();
        this.buffer.setIndexBufferSize(this.indices.length);
        this.buffer.setVertexBufferSize(this.verts.length);

        // tell opengl the structure of our vertex
        this.gl.enableVertexAttribArray(0);
        this.gl.enableVertexAttribArray(1);
        this.gl.enableVertexAttribArray(2);
        
        const vSize = this.size;
        const fSize = Float32Array.BYTES_PER_ELEMENT;
        
        this.gl.vertexAttribPointer(0, 3, this.gl.FLOAT, false, vSize, fSize * 0); // position
        this.gl.vertexAttribPointer(1, 4, this.gl.FLOAT, false, vSize, fSize * 3); // color
        this.gl.vertexAttribPointer(2, 2, this.gl.FLOAT, false, vSize, fSize * 7); // uv

        this.buffer.unbind();
    }

    destroy() {
        this.buffer.destroy();
        this.buffer = null;
    }

    draw(renderMode: number = this.gl.TRIANGLES) {
        this.buffer.bind();
        this.buffer.setVertexBufferData(this.verts, this.currentVert, 9);
        this.buffer.setIndexBufferData(this.indices, this.currentIndicyIndex);
        this.buffer.draw(this.currentIndicyIndex, renderMode);
        this.buffer.unbind();
    }

    getPos(index: number): IVec3 {
        const i = index * this.size;
        const data = this.verts;
        return {x: data[i+0], y: data[i+1], z: data[i+2] };
    }

    getColor(index: number): IVec4 {
        const i = index * this.size;
        const data = this.verts;
        return {x: data[i+3], y: data[i+4], z: data[i+5], w: data[i+6] };
    }

    getUV(index: number): IVec2 {
        const i = index * this.size;
        const data = this.verts;
        return {x: data[i+7], y: data[i+8] };
    }

    setPos(value: IVec3) {
        const i = this.currentVertIndex;
        const data = this.verts;
        data[i+0] = value.x;
        data[i+1] = value.y;
        data[i+2] = value.z;
        return this;
    }

    setColor(value: IVec4) {
        const i = this.currentVertIndex;
        const data = this.verts;
        data[i+3] = value.x;
        data[i+4] = value.y;
        data[i+5] = value.z;
        data[i+6] = value.w;
        return this;
    }

    setUV(value: IVec2) {
        const i = this.currentVertIndex;
        const data = this.verts;
        data[i+7] = value.x;
        data[i+8] = value.y;
        return this;
    }

    clear() {
        this.currentVert = 0;
        this.currentFace = 0;
    }

    saveVert() {
        return this.currentVert++;
    }

    saveFace(i0: number, i1: number, i2: number) {
        this.indices[this.currentIndicyIndex+0] = i0;
        this.indices[this.currentIndicyIndex+1] = i1;
        this.indices[this.currentIndicyIndex+2] = i2;
        this.currentFace += 1;
        return this;
    }

}

interface IRenderState2D {
    color: IVec4[];
    uvRect?: Rect;
    texture?: ITexture2d,
    lineThickness?: number,
    renderMode?: RenderMode,
}

export class Renderer2d {

    private projection: Mat4 = new Mat4();

    private spriteBuffer: SpriteBuffer;
    private shader: Renderer2DSpriteShader;

    private maxTextures: number = 5;
    private activeTextures: ITexture2d[] = [null, null, null, null, null];
    private currentTextureId: number = 0;

    private processingRender: boolean = false;

    private blankTexture: Texture2D;

    private renderState: IRenderState2D[] = [];
    private numFlushes: number = 0;
    
    constructor(private canvas: HTMLCanvasElement, private gl: WebGL2RenderingContext) {

        // so that we can use a single shader for our 2d rendering
        // things that do not have a texture, will be textured with this blank
        // 1x1 white pixel image
        this.blankTexture = new Texture2D(this.gl);
        this.blankTexture.load("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=");

        this.saveState(true);

        // load shader
        this.shader = new Renderer2DSpriteShader(this.gl);

        // setup sprite graphics buffers
        this.spriteBuffer = new SpriteBuffer(this.gl);
    }

    destroy() {
        this.spriteBuffer.destroy();
        this.shader.destroy();
    }

    begin() {
        this.processingRender = true;
        this.spriteBuffer.clear();
        this.currentTextureId = 0;

        const renderTarget = RenderTexture.currentRenderTarget();

        // setup 2d projection matrix
        if(renderTarget == null) this.projection = Mat4.orthographicProjection(0, this.canvas.width, this.canvas.height, 0, 0, 100);
        else this.projection = Mat4.orthographicProjection(0, renderTarget.width, renderTarget.height, 0, 0, 100);

        this.gl.enable(this.gl.BLEND);
        this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
        this.gl.blendFuncSeparate(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA, this.gl.ONE, this.gl.ONE);
        
        this.shader.enable();
        this.shader.setProjection(this.projection);
    }

    end() {
        this.flushBatch();
        this.processingRender = false;

        // reset the renderstate so its fresh
        this.renderState = [];
        this.saveState(true);

        //console.log(`Flushes: ${this.numFlushes}`);
        this.numFlushes = 0;
    }

    darwRect(xPos: number, yPos: number, width: number, height: number, rot: number, xOrigin: number, yOrigin: number) {
        
        if(this.shouldFlush())
            this.flushBatch();

        const state = this.renderState[this.renderState.length - 1];
        const textureId = this.useTexture(state.texture ?? this.blankTexture);
        const color = state.color ?? [Vec4.ONE, Vec4.ONE, Vec4.ONE, Vec4.ONE];
        const uvRect = state.uvRect ?? new Rect(0, 0, 1, 1);

        const transform = 
        Mat3.mul(Mat3.mul( Mat3.scale(width, height), 
                          Mat3.rotation(rot) ), 
                 Mat3.translation(xPos, yPos) );

        // calculate the position for each of the quads
        const tl: IVec3 = Mat3.transformPoint(transform, { x: (0 - xOrigin), y: (0 - yOrigin), z: 1 } );
        const tr: IVec3 = Mat3.transformPoint(transform, { x: (1 - xOrigin), y: (0 - yOrigin), z: 1 } );
        const br: IVec3 = Mat3.transformPoint(transform, { x: (1 - xOrigin), y: (1 - yOrigin), z: 1 } );
        const bl: IVec3 = Mat3.transformPoint(transform, { x: (0 - xOrigin), y: (1 - yOrigin), z: 1 } );

        // kinda hacky, for our shader, we are storing which texture we should use in the 'z' coordinate
        // as 'z' is not used for 2d rendering
        tl.z = textureId; tr.z = textureId; br.z = textureId; bl.z = textureId;

        // build our verts
        const i0 = this.spriteBuffer.setPos(tl).setColor(color[0]).setUV(uvRect.topLeft).saveVert();
        const i1 = this.spriteBuffer.setPos(tr).setColor(color[1]).setUV(uvRect.topRight).saveVert();
        const i2 = this.spriteBuffer.setPos(br).setColor(color[2]).setUV(uvRect.bottomRight).saveVert();
        const i3 = this.spriteBuffer.setPos(bl).setColor(color[3]).setUV(uvRect.bottomLeft).saveVert();

        // save the face
        this.spriteBuffer.saveFace(i0, i1, i2).saveFace(i0, i2, i3);
    }

    drawLine(x1: number, y1: number, x2: number, y2: number, thickness: number, vertColors?: IVec4[]) {
        this.drawLines([new Vec2(x1, y1), new Vec2(x2, y2)], thickness, vertColors);
    }

    drawLines(points: IVec2[], width: number, vertColors?: IVec4[]) {

        if(this.shouldFlush())
            this.flushBatch();

        vertColors = vertColors ?? [];

        this.saveState();
        const state = this.renderState[this.renderState.length - 1];
        const textureId = this.useTexture(this.blankTexture);
        const color = state.color[0] ?? Vec4.ONE;

        const indices = [];

        let iDir = Vec2.ZERO; 
        for(let i=0; i<points.length; i++) {

            const p0 = points[i];
            const p1 = points[i+1] ?? Vec2.add(p0, iDir);

            const oDir = Vec2.sub(p1 ?? p0, p0).normalise();

            const tangent = Vec2.add(iDir, oDir).normalise();
            const mighter = Vec2.perpendicular(tangent);
            const distance = width / mighter.dot(Vec2.perpendicular(oDir)) * 0.5;
            const p = Vec2.mul(mighter, {x: distance, y: distance});

            const col = vertColors[i] ?? color;

            const i0 = this.spriteBuffer.setPos({x: p0.x + p.x, y: p0.y + p.y, z: textureId}).setColor(col).setUV({x: 0, y: 0}).saveVert();
            const i1 = this.spriteBuffer.setPos({x: p0.x - p.x, y: p0.y - p.y, z: textureId}).setColor(col).setUV({x: 0, y: 0}).saveVert();
            indices.push(i0);
            indices.push(i1);

            iDir = oDir;
        }

        for(let i=0; i<indices.length-2; i += 2) {
            const index = indices[i];
            this.spriteBuffer.saveFace(index, index+1, index+2);
            this.spriteBuffer.saveFace(index+1, index+2, index+3);
        }

        this.popState();

    }

    drawCircle(xPos: number, yPos: number, radius: number, segments: number) {
        if(this.shouldFlush())
            this.flushBatch();

        const state = this.renderState[this.renderState.length - 1];
        const textureId = this.useTexture(state.texture ?? this.blankTexture);
        const color = state.color[0] ?? Vec4.ONE;
        const uvRect = state.uvRect ?? new Rect(0, 0, 1, 1);

        const i0 = this.spriteBuffer
            .setPos({x: xPos, y: yPos, z: textureId})
            .setColor(color)
            .setUV({x: (uvRect.right - uvRect.left) * 0.5, y: (uvRect.bottom - uvRect.top) * 0.5})
            .saveVert();
            
        for(let i=0; i<=segments;  i++) {
            const r = ((2.0 * Math.PI) / segments) * i;
            const x =  Math.sin(r);
            const y = -Math.cos(r);
            //this.darwRect(x, y, 5, 5, r, 0.5, 0.5);
            this.spriteBuffer
                .setPos({x: x * radius + xPos, y: y * radius + yPos, z: textureId})
                .setColor(color)
                .setUV({x: x * 0.5 + 0.5, y: y * 0.5 + 0.5})
                .saveVert();
        }

        for(let i=0; i<=segments; i++) {
           this.spriteBuffer.saveFace(i0, i0+i, i0+i+1);
        }
    }
    
    clear(r: number = 1, b: number = 1, g: number = 1, a: number = 1 ) {
        this.gl.clearColor(r, g, b, a);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    }
    
    setTexture(texture: ITexture2d) {
        const state = this.renderState[this.renderState.length - 1];
        state.texture = texture;
    }

    setColor(color: IVec4) {
        const state = this.renderState[this.renderState.length - 1];
        state.color[0] = color;
        state.color[1] = color;
        state.color[2] = color;
        state.color[3] = color;
    }

    setColorPoints(tlc: IVec4, trc: IVec4, brc: IVec4, blc: IVec4) {
        const state = this.renderState[this.renderState.length - 1];
        state.color[0] = tlc;
        state.color[1] = trc;
        state.color[2] = brc;
        state.color[3] = blc;
    }

    setUvRect(uvRect: Rect) {
        const state = this.renderState[this.renderState.length - 1];
        state.uvRect = uvRect;
    }

    setRenderMode(renderMode: RenderMode) {
        const state = this.renderState[this.renderState.length - 1];
        if(state.renderMode != renderMode) {
            this.flushBatch();
            state.renderMode = renderMode;
        }
    }

    saveState(setDefaults: boolean = false) {
        const state = this.renderState[this.renderState.length - 1];
        const defaults = !setDefaults ? state : {
            color: [Vec4.ONE, Vec4.ONE, Vec4.ONE, Vec4.ONE],
            uvRect: new Rect(0, 0, 1, 1),
            texture: this.blankTexture,
            renderMode: RenderMode.FILL
        };

        this.renderState.push({...this.renderState[this.renderState.length-1], 
            ...defaults
        });
    }

    popState() {
        if(this.renderState.length <= 1 )
            return;

        // do we need to re-render based on state change?
        const state = this.renderState[this.renderState.length - 1];
        const newState = this.renderState[this.renderState.length - 2];

        let flush = false;
        flush = flush || state.renderMode != newState.renderMode;

        if(flush)
            this.flushBatch();

        this.renderState.pop();
    }

    private useTexture(texture: ITexture2d) {
        // check if the texture is already in use
        // if so, return... we dont need to add it to our list of textures again.
        for(let i=0; i<=this.currentTextureId; i++){
            if(this.activeTextures[i] == texture)
                return i;
        }

        // if we've used all the textures we can, then we need to flush to make room for another texture change
        if( this.currentTextureId >= this.maxTextures )
            this.flushBatch();

        // store the texture in our active textuers array
        this.activeTextures[this.currentTextureId] = texture;
        
        // send the texture to opengl
        this.shader.setTexture(texture.handle, this.currentTextureId);

        // increment our currentTextureId for next use.
        this.currentTextureId += 1;

        // return what the current texture was.
        return this.currentTextureId - 1;
    }

    private flushBatch() {
        if(this.spriteBuffer.currentIndicyIndex === 0 || this.spriteBuffer.currentVertIndex === 0 || this.processingRender === false)
            return;

        let renderMode = this.gl.TRIANGLES;
        switch( this.renderState[this.renderState.length-1].renderMode ){
            case RenderMode.FILL: renderMode = this.gl.TRIANGLES; break;
            case RenderMode.WIREFRAME: renderMode = this.gl.LINE_STRIP; break;
        }

        // render the sprite buffer and reset for next flush
        this.spriteBuffer.draw(renderMode);
        this.spriteBuffer.clear();

        // clear our active textures as well
        for(let i=0; i<this.maxTextures; i++)
            this.activeTextures[i] = null;

        this.currentTextureId = 0;
        this.numFlushes += 1;
    }

    private shouldFlush(): boolean {
        const result =  this.spriteBuffer.currentVertIndex >= this.spriteBuffer.verts.length-1 || 
                        this.spriteBuffer.currentVertIndex >= this.spriteBuffer.indices.length-1;
        return result;
    }
}