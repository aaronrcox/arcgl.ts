import { App } from "../../engine/app";
import { Vec4, Vec2, Rect, Mat3, Shape, Vec3, Ray, IVec2, RayHit } from "../../engine/math";
import { levels, ILevelData } from './levels';

// import assets
import tileBasePng from './assets/tile-base.png';

import { Texture2D } from "../../engine/graphics/texture";
import { Renderer2d } from "../../engine/graphics/renderer2d";

const lightColors: {[key: number]: Vec4} = {
    1: new Vec4(255/255, 255/255, 255/255, 1),  // white ff8a80
    2: new Vec4(255/255, 138/255, 128/255, 1),  // red ff8a80
    3: new Vec4(43/255, 187/255, 173/255, 1),   // green 2bbbad
    4: new Vec4(179/255, 136/255, 255/255, 1),  // purple b388ff
    5: new Vec4(149/255, 158/255, 255/255, 1),  // light blue 8c9eff
    6: new Vec4(63/255, 114/255, 155/255, 1),   // dark blue 3f729b
}

enum TILE_DIR {
    NONE = 0,
    LEFT = 1,
    UP = 2,
    RIGHT = 3,
    DOWN = 4
}

enum TILE_SHAPE {
    NONE = 0, 
    EMPTY,
    SOLID,
    CORNER,
    EMITTER,
    RECEIVER,
}


class GameObject
{
    parent: GameObject = null
    children: GameObject[] = [];

    transform: Mat3 = Mat3.identity();

    get globalTransform(): Mat3 {
        const transform = this.parent ? 
            Mat3.mul(this.transform, this.parent.globalTransform) :    
            this.transform;
        return transform;
    }

    private lastTrasform: Mat3 = null;
    private _isDirty: boolean = false;
    private _dirtyCheck: boolean = false;
    get isDirty() { return this._isDirty; }

    constructor(parent: GameObject = null) {
        this.setParent(parent);
    }

    update(dt: number) {
        if(this._dirtyCheck) {
            this._isDirty = this.lastTrasform?.equal(this.transform) == false;
            this.lastTrasform = this.transform.copy();
        }
     }
    draw(renderer2d: Renderer2d) { }

    setParent(newParent: GameObject) {
        this.parent?.removeChild(this);
        this.parent = newParent;
        this.parent?.addChild(this);
    }

    checkForChangesPerFrame(doCheck: boolean) {
        this._dirtyCheck = doCheck;
        this._isDirty = true;
    }

    private removeChild(child: GameObject) {
        const index = this.children.indexOf(child);
        if (index >= 0 ) this.children.splice(index, 1);
    }

    private addChild(child: GameObject) {
        const index = this.children.indexOf(child);
        if (index < 0) this.children.push(child);
    }
}

class Level extends GameObject {
    
    data: ILevelData;
    tileTextures: {[key: number]: Texture2D} = {};
    tiles: Tile[] = [];

    activeTile: Tile;
    movingTiles: Set<Tile> = new Set();

    constructor(data: ILevelData) {
        super();
        this.data = data;
    }

    posToIndex(pos: Vec2): Vec2 {
        const x = Math.floor(pos.x / this.data.tileSize);
        const y = Math.floor(pos.y / this.data.tileSize);
        return new Vec2(x, y);
    }

    indexToPos(index: Vec2): Vec2 {
        const hs = this.data.tileSize * 0.5;
        const x = Math.floor(index.x * this.data.tileSize + hs);
        const y = Math.floor(index.y * this.data.tileSize + hs);
        return new Vec2(x, y);
    }

    inZone(index: Vec2): Rect {
        for(const zone of this.data.zones) {
            if(zone.contains(index))
                return zone;
        }

        return null;
    }

    findTileAtIndex(index: Vec2): Tile {
        for(const t of this.tiles) {
            const ti = this.posToIndex(t.transform.pos);
            if(ti.x === index.x && ti.y==index.y)
                return t;
        }
    }

    update(dt: number) {
        super.update(dt);
    }

    draw() {

    }

}

class Tile extends GameObject {

    level: Level;
    lightId: TILE_SHAPE;
    shapeId: number;
    dirId: number;
    colorId: number;

    size: Vec2;
    shapeGeometry: Shape = null;

    onMoveFinished: (tile: Tile) => void;
    isMovingToTarget: boolean = false;
    targetPos: Vec2;

    static tileGeometries: Shape[] = [];

    constructor(level: Level, lightId: number, shapeId: TILE_SHAPE, dirId: TILE_DIR, colorId: number) {
        super(level);
        this.level = level;
        this.lightId = lightId;
        this.shapeId = shapeId;
        this.dirId = dirId;
        this.colorId = colorId;
    }

    update(dt: number) {
        super.update(dt);
        this.moveToTargetPos(dt);

        this.updateShapeGeometry();
    }

    draw(renderer: Renderer2d) {}

    drawShapeGeometry(renderer: Renderer2d) {
        if(this.shapeGeometry) {
            renderer.setColor(new Vec4(1, 1, 1, 1));
            renderer.drawLines(this.shapeGeometry.points, 2);
        }
    }

    updateShapeGeometry() {
        if(this.shapeGeometry) {
            const gt = this.globalTransform;
            const updatedShape = Tile.createTileShape(this.shapeId, gt.pos.x, gt.pos.y, 
                this.level.data.tileSize * 0.6, 
                this.level.data.tileSize * 0.6, Tile.tileRotation(this.dirId));

            this.shapeGeometry.points = updatedShape.points;
        }
    }

    private moveToTargetPos(dt: number) {
        if(this.isMovingToTarget === false)
            return;

        const size = this.level.data.tileSize;
            
        const speed = 6;
        const moveDir = Vec2.sub(this.targetPos, this.transform.pos).normalise();
        this.transform.move(moveDir.x * dt * size * speed, moveDir.y * dt * size * speed);

        // snap the position to target when its close enough.
        if(Math.abs(this.transform.pos.x - this.targetPos.x) < 4 )
            this.transform.setPosX(this.targetPos.x);

        if(Math.abs(this.transform.pos.y - this.targetPos.y) < 4 )
            this.transform.setPosY(this.targetPos.y);

        // check if we are at the target position
        if(this.transform.pos.x == this.targetPos.x && this.transform.pos.y == this.targetPos.y){
            this.isMovingToTarget = false;
            if(this.onMoveFinished)
                this.onMoveFinished(this);
        }
    }

    move(dir: Vec2) {
        const index = this.level.posToIndex(this.transform.pos).add(dir);
        this.targetPos = this.level.indexToPos(index);
        this,this.isMovingToTarget = true;
    }

    moveWith(dir: Vec2, withIndex: Vec2): boolean {
        const index = this.level.posToIndex(this.transform.pos);

        if((index.y == withIndex.y && dir.x !== 0) || (index.x == withIndex.x && dir.y !== 0)) {
            this.move(dir);
            return true;
        }

        return false;
    }

    static tileRotation(shape: TILE_DIR): number {
        switch(shape) {
            case TILE_DIR.RIGHT: return 0;
            case TILE_DIR.DOWN: return Math.PI / 2; // 90 deg cw
            case TILE_DIR.LEFT: return Math.PI; // 180 deg cw
            case TILE_DIR.UP: return Math.PI + Math.PI / 2; // 270 deg cw
            default: return 0;
        }
    }

    static createTileShape(shape: TILE_SHAPE, xPos: number, yPos: number, width: number, height: number, rot: number): Shape {
        switch(shape) {
            case TILE_SHAPE.SOLID:
                return Shape.makeBox(xPos, yPos, width, height, rot, false);
            case TILE_SHAPE.EMITTER: 
            case TILE_SHAPE.RECEIVER:
                return Shape.makeBox(xPos, yPos, width, height, rot, true)
            case TILE_SHAPE.CORNER: 
                return Shape.makeAngleTriangle(xPos, yPos, width, height, rot);
            default:
                return null;
        }
    }
}

class BlockTile extends Tile {
    constructor(level: Level, lightId: number, shapeId: TILE_SHAPE, dirId: TILE_DIR, colorId: number) {
        super(level, lightId, shapeId, dirId, colorId);

        const rot = Tile.tileRotation(dirId);
        this.shapeGeometry = Tile.createTileShape(this.shapeId, this.transform.pos.x, this.transform.pos.y, this.level.data.tileSize, this.level.data.tileSize, rot );

        if(this.shapeGeometry?.points.length > 0) {
            this.checkForChangesPerFrame(true);
            Tile.tileGeometries.push(this.shapeGeometry);
        }
    }

    draw(renderer: Renderer2d) {
        const gt = this.globalTransform;
        const pos = gt.pos;
        const scale = gt.scale;

        const tsx = this.level.data.tileSize * scale.x;
        const tsy = this.level.data.tileSize * scale.y;

        // what about if the global transform has rotated... add rotation?
        const rot = Tile.tileRotation(this.dirId); 

        renderer.setColor(new Vec4(1,1,1,0.5));
        renderer.setTexture(this.level.tileTextures[1]);
        renderer.darwRect(pos.x, pos.y, tsx, tsy, rot, 0.5, 0.5 );

        this.drawShapeGeometry(renderer);
    }
}

class EmitterTile extends Tile {

    lightRays: Ray[] = [];
    allLightRays: Ray[] = [];

    get color() { return lightColors[this.colorId] ?? new Vec4(1,1,1,1); }

    constructor(level: Level, lightId: number, shapeId: TILE_SHAPE, dirId: TILE_DIR, colorId: number) {
        super(level,lightId, shapeId, dirId, colorId);

        const rot = Tile.tileRotation(this.dirId);
        this.shapeGeometry = Tile.createTileShape(this.shapeId, this.transform.pos.x, this.transform.pos.y, this.level.data.tileSize, this.level.data.tileSize, rot);

        if(this.shapeGeometry?.points.length > 0) {
            this.checkForChangesPerFrame(true);
            Tile.tileGeometries.push(this.shapeGeometry);
        }
    }

    update(dt: number) {
        super.update(dt);
    }

    updateLights(dt: number) {
        const gt = this.globalTransform;
        const rayDir = this.dirToVec(this.dirId);
        const rayOffset = Vec2.negate(rayDir).scale(6);
        gt.move(rayOffset.x, rayOffset.y)
        
        if(this.shapeId == TILE_SHAPE.EMITTER) {
            this.lightRays = this.makeRayLine(gt.pos, rayDir, 4, 3);
            this.allLightRays = [];
    
            for(let i=0; i<this.lightRays.length; i++) {
                const r = this.lightRays[i];
                r.castToShapes(Tile.tileGeometries, 10);
                this.allLightRays.push(...r.rays());
            }
        }
    }

    draw(renderer: Renderer2d) {
        super.draw(renderer);

        const gt = this.globalTransform;
        const pos = gt.pos;
        const scale = gt.scale;
        const tsx = this.level.data.tileSize * scale.x;
        const tsy = this.level.data.tileSize * scale.y;

        renderer.saveState(true);

        const color = new Vec4(this.color.x, this.color.y, this.color.z, 1);

        renderer.setColor(color);
        renderer.darwRect(pos.x, pos.y, tsx/2, tsy/2, 0, 0.5, 0.5);

        this.drawLight(renderer);

        renderer.setColor(new Vec4(0,0,0,1));
        this.drawShapeGeometry(renderer);

        renderer.popState();
    }

    drawLight(renderer: Renderer2d) {

        const color = new Vec4(this.color.x, this.color.y, this.color.z, 0.5);
        renderer.saveState();
        renderer.setColor(color);
        
        for(const r of this.allLightRays) {
            const d = Math.min(r.hit?.distance ?? 2000);
            const p0 = r.pos;
            const p1 = Vec2.mul(r.dir, {x: d, y:d}).add(r.pos);
            
            renderer.drawLine(p0.x, p0.y, p1.x, p1.y, 3);

            // renderer.darwRect(tp0.x, tp0.y, 10, 10, 0, 0.5, 0.5);
        }

        renderer.popState();
    }
    
    dirToVec(dir: TILE_DIR) {
        switch(dir) {
            case TILE_DIR.LEFT: return new Vec2(-1, 0);
            case TILE_DIR.UP: return new Vec2(0, -1);
            case TILE_DIR.RIGHT: return new Vec2(1, 0);
            case TILE_DIR.DOWN: return new Vec2(0, 1);
            default: return new Vec2(0, 0);
        }
    }

    makeRayLine(pos: IVec2, dir: IVec2, count: number, spacing: number): Ray[] {
        const rays: Ray[] = [];
        const pDir = Vec2.perpendicular(dir);

        const min = Math.ceil(count/2);
        const max = Math.ceil(count/2);
        for(let i=-min; i<=max; i++) {
            rays.push( new Ray(Vec2.add(pos, Vec2.scale(pDir, i*spacing)), dir) )
        }
        return rays;
    }
}

export class LightBender extends App {

    currentLevelIndex: number = 0;
    currentLevel: Level;

    tileTextures: {[key: number]: Texture2D} = {};

    world: GameObject;

    elapsedTime: number = 0;
    
    constructor(htmlCanvasId: string) {
        super(htmlCanvasId);

        this.world = new GameObject(null);
        this.world.transform.setPos(this.canvas.width / 2, this.canvas.height / 2);

        this.currentLevel = new Level(levels[this.currentLevelIndex]);
        this.currentLevel.tileTextures = this.tileTextures;
        this.currentLevel.setParent(this.world);

        this.loadLevel();

        console.log(`hw: ${this.canvas.width / 2}`);
        console.log(`hh: ${this.canvas.height / 2}`);
        console.log(this.world.globalTransform.pos);
        console.log(this.currentLevel.globalTransform.pos);
    }

    async loadAssets(): Promise<void> {
        await super.loadAssets();

        this.tileTextures[0] = null;
        
        this.tileTextures[TILE_SHAPE.EMPTY] = new Texture2D(this.gl);
        this.tileTextures[TILE_SHAPE.EMPTY].load(tileBasePng);
    }
    
    update() {
        super.update();
        const kb = this.input.keyboard;
        const inputDir = new Vec2(0, 0);

        this.elapsedTime += this.time.deltaTime;

        if(kb.wasKeyPressed(38)) inputDir.y = -1;       // up arrow
        else if(kb.wasKeyPressed(40)) inputDir.y =  1;  // down arrow
        else if(kb.wasKeyPressed(37)) inputDir.x = -1;  // left arrow
        else if(kb.wasKeyPressed(39)) inputDir.x =  1;  // right arrow
            
        if( inputDir.x !== 0 || inputDir.y !== 0) {
            this.moveActiveTile(inputDir);
        }

        // update movement of all tiles
        for(const t of this.currentLevel.tiles) {
            t.update(this.time.deltaTime);
        }

        // update the lights
        for(const t of this.currentLevel.tiles) {
            if(t instanceof EmitterTile)
                t.updateLights(this.time.deltaTime);
        }
    }

    draw() {
        super.draw();
        this.gl.clearColor(0, 0, 0, 0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);

        this.renderer2d.begin();
        this.drawBackgroundGrid();
        this.drawTiles();
        this.renderer2d.end();
    }

    drawBackgroundGrid() {

        const gt = this.currentLevel.globalTransform;
        const pos = gt.pos;
        const scale = gt.scale;

        const tsx = this.currentLevel.data.tileSize * scale.x;
        const tsy = this.currentLevel.data.tileSize * scale.y;

        const minX = 0;
        const minY = 0;
        const maxX = this.currentLevel.data.cols;
        const maxY = this.currentLevel.data.rows;

        this.renderer2d.saveState(true);

        // draw background:
        const oc = new Vec4(255/255, 255/255, 255/255, 0.2);
        const colors = [new Vec4(oc.x, oc.y, oc.z, 0), new Vec4(oc.x, oc.y, oc.z, oc.w), new Vec4(oc.x, oc.y, oc.z, oc.w), new Vec4(oc.x, oc.y, oc.z, 0)];

        // vertical lines
        for(let i=minX+2; i<=maxX-2; i++) {
            const points = [
                new Vec2(pos.x + (i*tsx), pos.y + ((minY + 0) * tsy)),
                new Vec2(pos.x + (i*tsx), pos.y + ((minY + 2) * tsy)), 
                new Vec2(pos.x + (i*tsx), pos.y + ((maxY - 2) * tsy)),
                new Vec2(pos.x + (i*tsx), pos.y + ((maxY - 0) * tsy))
            ];
            this.renderer2d.drawLines(points, 1, colors);
        }

        // horizontal
        for(let i=minY+2; i<=maxY-2; i++) {
            const points = [
                new Vec2(pos.x + ((minX + 0) * tsx),  pos.y + (i*tsy)),
                new Vec2(pos.x + ((minX + 2) * tsx),  pos.y + (i*tsy)),
                new Vec2(pos.x + ((maxX - 2) * tsx),  pos.y + (i*tsy)),
                new Vec2(pos.x + ((maxX - 0) * tsx),  pos.y + (i*tsy))
            ];
            this.renderer2d.drawLines(points, 1, colors);
        }

        this.renderer2d.popState();
    }


    drawTiles() {

        this.renderer2d.saveState(true);

        for(let i=0; i<this.currentLevel.tiles.length; i++) {
            const tile = this.currentLevel.tiles[i];
            tile.draw(this.renderer2d);
        }

        this.renderer2d.popState();
    }


    moveActiveTile(dir: Vec2) {

        if( this.currentLevel.movingTiles.size > 0 || this.currentLevel.activeTile === null )
            return;

        
        const activeTileIndex = this.currentLevel.posToIndex(this.currentLevel.activeTile.transform.pos);
        const targetTileIndex = Vec2.add(activeTileIndex, dir);
        const zone = this.currentLevel.inZone(targetTileIndex);

        const moveTileFinishedFunc = (tile: Tile) => {
            this.currentLevel.movingTiles.delete(tile);
            tile.onMoveFinished = null;
            const index = this.currentLevel.posToIndex(tile.transform.pos);
            if(!zone?.contains(index)) {
                this.currentLevel.activeTile = tile;
            }
        }

        this.currentLevel.activeTile.move(dir);
        this.currentLevel.activeTile.onMoveFinished = moveTileFinishedFunc;

        this.currentLevel.activeTile = null;

        if(zone === null)
            return;

        for(const t of this.currentLevel.tiles) {
            const ti = this.currentLevel.posToIndex(t.transform.pos);
            if(zone.contains(ti) && t.moveWith(dir, activeTileIndex) ) {
                this.currentLevel.movingTiles.add(t);
                t.onMoveFinished = moveTileFinishedFunc;
            }
        }
    }



    loadLevel() {

        
        const level = this.currentLevel;
        // const layout = level.data.layout;
        // const lights = level.data.lights;
        const map = level.data.map;

        const shapeIndex = 3;
        const colorIndex = 2;
        const dirIndex = 1;
        const lightIndex = 0;


        const tileSize = level.data.tileSize;
        const levelWidth = tileSize * level.data.rows;
        const levelHeight = tileSize * level.data.cols;

        // move the level position back
        // so that it is positioned in the scenter of the..
        // might need need to adjust this if we plan on preforming level rotations.
        level.transform.move(-levelWidth/2, -levelHeight/2);

        const cols = level.data.cols; 
        const rows = level.data.rows;

        for(let yi = 0; yi<rows; yi++) {
            for(let xi = 0; xi<cols; xi++) {


                
                let lightId = parseInt(map[yi][xi][lightIndex]);
                let dirId = parseInt(map[yi][xi][dirIndex]);
                let colorId = parseInt(map[yi][xi][colorIndex]);
                const shapeId = parseInt(map[yi][xi][shapeIndex]);

                console.log(lightId, dirId, colorId, shapeId);

                const tile = this.createTile(level, xi, yi, lightId, shapeId, dirId, colorId);
                if(tile) {
                    level.tiles.push(tile);
                }
                
                if( level.data.startTile[0] == xi && level.data.startTile[1] == yi)
                    level.activeTile = tile;

            }

        }
        
    }

    private createTile(level: Level, xIndex: number, yIndex: number, lightId: number, shapeId: TILE_SHAPE, dirId: TILE_DIR, colorId: number) {
        

        const tileSize = level.data.tileSize;
        const hTileSize = tileSize / 2;

        let tile = null;

        switch(shapeId) {
            case TILE_SHAPE.NONE:
                return;
            case TILE_SHAPE.EMPTY: 
            case TILE_SHAPE.CORNER:
            case TILE_SHAPE.SOLID:
                tile = new BlockTile(level, lightId, shapeId, dirId, colorId); break;
            case TILE_SHAPE.RECEIVER:
            case TILE_SHAPE.EMITTER:
                tile = new EmitterTile(level, lightId, shapeId, dirId, colorId); break;
            default:
                    return;
        }

        const tilePos = new Vec2(xIndex * tileSize + hTileSize, yIndex * tileSize + hTileSize);
        tile.transform.setPos(tilePos.x, tilePos.y);     

        return tile;
    }

}
