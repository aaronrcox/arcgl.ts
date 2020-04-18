import { App } from "../../engine/app";
import { Vec4, Vec2, Rect } from "../../engine/math";
import { levels, ILevelData } from './levels';

// import assets
import tileTypeSolidPng from './assets/tile-type-solid.png';
import tileImage1Png from './assets/tile-type-1.png';
import tileImage2Png from './assets/tile-type-2.png';
import tileImage3Png from './assets/tile-type-3.png';
import tileImage4Png from './assets/tile-type-4.png';
import tileImage5Png from './assets/tile-type-5.png';

import { Texture2D } from "../../engine/graphics/texture";
import { Renderer2d, RenderMode } from "../../engine/graphics/renderer2d";

const backgroundColor = new Vec4(236/255, 239/255, 241/255, 1.0);
const backgroundLineColor = new Vec4(1, 1, 1, 1);

const lightColors: {[key: number]: Vec4} = {
    1: new Vec4(255/255, 138/255, 128/255, 1),  // red ff8a80
    2: new Vec4(43/255, 187/255, 173/255, 1),   // green 2bbbad
    3: new Vec4(179/255, 136/255, 255/255, 1),  // purple b388ff
    4: new Vec4(149/255, 158/255, 255/255, 1),  // light blue 8c9eff
    5: new Vec4(63/255, 114/255, 155/255, 1),   // dark blue 3f729b
}

enum LightDir {
    NONE = 0,
    LEFT = 1,
    UP = 2,
    RIGHT = 3,
    DOWN = 4
}

enum TILE_SHAPE {
    NONE = 0, 
    EMPTY = 1,
    CORNER_TL = 2,
    CORNER_TR = 3,
    CORNER_BR = 4,
    CORNER_BL = 5,
    SOLID = 6
}

interface TileLightPoint {
    dir: Vec2;
    pos: Vec2;
    index: Vec2;
    color: Vec4;
    tile: Tile;
}

class Level {
    pos: Vec2;
    data: ILevelData;
    tileTextures: {[key: number]: Texture2D} = {};
    tiles: Tile[] = [];


    activeTile: Tile;
    movingTiles: Set<Tile> = new Set();

    constructor(data: ILevelData) {
        this.data = data;
    }

    posToIndex(pos: Vec2): Vec2 {
        const x = Math.floor((pos.x - this.pos.x) / this.data.tileSize);
        const y = Math.floor((pos.y - this.pos.y) / this.data.tileSize);
        return new Vec2(x, y);
    }

    indexToPos(index: Vec2): Vec2 {
        const hs = this.data.tileSize * 0.5;
        const x = Math.floor(index.x * this.data.tileSize + this.pos.x + hs);
        const y = Math.floor(index.y * this.data.tileSize + this.pos.y + hs);
        return new Vec2(x, y);
    }

    inZone(index: Vec2): Rect {
        for(const zone of this.data.zones) {
            if(zone.contains(index))
                return zone;
        }

        return null;
    }

    calculateLightPoints() {
        for(const light of this.tiles) {
            if(!(light instanceof LightTile)) 
                continue;

            light.calculateLightPoints();
        }
    }

    findTileAtIndex(index: Vec2): Tile {
        for(const t of this.tiles) {
            const ti = this.posToIndex(t.pos);
            if(ti.x === index.x && ti.y==index.y)
                return t;
        }
    }

}

class Tile {

    level: Level;
    pos: Vec2;
    size: Vec2;
    type: number;

    isMovingToTarget: boolean = false;
    targetPos: Vec2;

    onMoveFinished: (tile: Tile) => void;

    constructor(level: Level, pos: Vec2, size: Vec2, type: number) {
        this.level = level;
        this.pos = pos;
        this.size = size;
        this.targetPos = new Vec2(pos.x, pos.y);
        this.type = type;
    }

    update(dt: number) {
        this.moveToTargetPos(dt);
    }

    draw(renderer: Renderer2d) {
        const ts = this.level.data.tileSize;

        renderer.setTexture(this.level.tileTextures[1]);
        renderer.darwRect(this.pos.x, this.pos.y, ts, ts, 0, 0.5, 0.5 );

        if(this.type >= 1) {
            renderer.setTexture(this.level.tileTextures[this.type]);
            renderer.darwRect(this.pos.x, this.pos.y, ts, ts, 0, 0.5, 0.5 );
        }
        
    }

    private moveToTargetPos(dt: number) {
        if(this.isMovingToTarget === false)
            return;
        const speed = 8;
        const moveDir = Vec2.sub(this.targetPos, this.pos).normalise();
        this.pos.add({x: moveDir.x * dt * this.size.x * speed, y: moveDir.y * dt * this.size.y * speed});

        // snap the position to target when its close enough.
        if(Math.abs(this.pos.x - this.targetPos.x) < 4 )
            this.pos.x = this.targetPos.x;

        if(Math.abs(this.pos.y - this.targetPos.y) < 4 )
            this.pos.y = this.targetPos.y;

        if(this.pos.x == this.targetPos.x && this.pos.y == this.targetPos.y){
            this.isMovingToTarget = false;
            if(this.onMoveFinished)
                this.onMoveFinished(this);
        }
    }

    move(dir: Vec2) {
        const index = this.level.posToIndex(this.pos).add(dir);
        this.targetPos = this.level.indexToPos(index);
        this,this.isMovingToTarget = true;
    }

    moveWith(dir: Vec2, withIndex: Vec2): boolean {
        const index = this.level.posToIndex(this.pos);

        if((index.y == withIndex.y && dir.x !== 0) || (index.x == withIndex.x && dir.y !== 0)) {
            this.move(dir);
            return true;
        }

        return false;
    }    
}

class LightTile extends Tile {

    colorId: number;
    lightDir: LightDir = LightDir.NONE;
    lightPoints: Array<TileLightPoint[]> = [];

    get color() { return lightColors[this.colorId] ?? new Vec4(1,1,1,1); }

    constructor(level: Level, pos: Vec2, size: Vec2, type: number) {
        super(level, pos, size, type);
    }

    draw(renderer: Renderer2d) {
        super.draw(renderer);

        renderer.saveState(true);

        const color = new Vec4(this.color.x, this.color.y, this.color.z, 0.5);
        color.w = 0.5;

        renderer.setColor(color);
        renderer.darwRect(this.pos.x, this.pos.y, this.level.data.tileSize/2, this.level.data.tileSize/2, 0, 0.5, 0.5);

        renderer.popState();
    }

    
    drawLight(renderer: Renderer2d) {
        
        if (this.lightPoints.length == 0 )
            return;

        for(const lps of this.lightPoints) {
            const points = lps.map(z => z.pos);
            const colors = lps.map(z => new Vec4(z.color.x, z.color.y, z.color.z, z.color.w));
            colors[colors.length-1].w = 0;
    
            renderer.saveState(true);
            renderer.setColor(new Vec4(this.color.x, this.color.y, this.color.z, 0.5));
            const lineThickness = this.level.data.tileSize/3
            renderer.drawLines(points, lineThickness, colors);
            renderer.popState();
        }
    }

    calculateLightPoints() {
        this.lightPoints = [];
        if(this.lightDir == LightDir.NONE)
            return;

        const dirVec = this.dirToVec(this.lightDir);

        const ligtBeam: TileLightPoint[] = [];
        this.lightPoints.push(ligtBeam);

        ligtBeam.push({
            dir: dirVec,
            index: this.level.posToIndex(this.pos),
            pos: new Vec2(this.pos.x, this.pos.y).sub({x: dirVec.x * 9, y: dirVec.y * 9}),
            color: this.color,
            tile: null
        });
        this.traceLightPoints(ligtBeam, this.dirToVec(this.lightDir), this.pos);
    }

    private traceLightPoints(results: TileLightPoint[], currentDir: Vec2, pos: Vec2) {

        pos = new Vec2(pos.x, pos.y);
        const ts = this.level.data.tileSize;
        const hts = ts * 0.5;

        const index = this.level.posToIndex(pos);
        
        // check if we are out of bounds
        // if so, this will be the final point for the line to be added
        if( index.x < 0 || index.x > this.level.data.cols || 
            index.y < 0 || index.y > this.level.data.rows) {

            results.push({
                dir: new Vec2(0, 0),
                index: index,
                pos: pos,
                color: this.color,
                tile: null
            });

            return;
        }

        // does a tile exist at this position?
        const t = this.level.findTileAtIndex(index);

        let isBlocker = false;
        let nextDir = currentDir;
        const offset = new Vec2();
        
        if(t && t.type != TILE_SHAPE.NONE)
        {

            const cPos = this.level.indexToPos(index);
            const dirFromCenter = Vec2.sub(cPos, t.pos);
            const distanceFromCenter = dirFromCenter.length();

            if(Math.abs(currentDir.x) > 0)
                pos.x = t.pos.x;

            if(Math.abs(currentDir.y) > 0)
                pos.y = t.pos.y;

            // TILE_SHAPE.CORNER_TL
            //=====================================================
            if(t.type == TILE_SHAPE.CORNER_TL)
            {
                if(currentDir.x == 1) {
                    isBlocker = true;
                    offset.x -= hts - 6;
                }
                if(currentDir.y == 1) {
                    isBlocker = true;
                    offset.y -= hts - 6;
                }
                if(currentDir.x == -1) {
                    let bent = false;
                    if(distanceFromCenter >= 0 &&  distanceFromCenter <= hts - 7 - (ts/3/2)) {
                        nextDir = new Vec2(currentDir.y,-currentDir.x);
                        offset.x += distanceFromCenter * currentDir.x;
                        bent = true;
                    }

                    // console.log(`Distance: ${distanceFromCenter} \t ${bent}`);
                    
                    
                }
                if(currentDir.y == -1) {
                    nextDir = new Vec2(currentDir.y,-currentDir.x);
                   // offset.y += distanceFromCenter * currentDir.x;
                }
            }
            

            // TILE_SHAPE.CORNER_TR
            //=====================================================
            if(t.type == TILE_SHAPE.CORNER_TR && currentDir.x ==-1) {
                isBlocker = true;
                offset.x += hts - 6;
            }
            if(t.type == TILE_SHAPE.CORNER_TR && currentDir.y == 1) {
                isBlocker = true;
                offset.y -= hts - 6;
            }
            if(t.type == TILE_SHAPE.CORNER_TR && currentDir.x == 1) {
                nextDir = new Vec2(currentDir.y, currentDir.x);
            }
            if(t.type == TILE_SHAPE.CORNER_TR && currentDir.y == -1) {
                nextDir = new Vec2(currentDir.y,-currentDir.x);
            }

            // TILE_SHAPE.CORNER_BR
            //=====================================================
            if(t.type == TILE_SHAPE.CORNER_BR && currentDir.x == 1) {
                nextDir = new Vec2(currentDir.y,-currentDir.x);
            }
            if(t.type == TILE_SHAPE.CORNER_BR && currentDir.y == 1) {
                nextDir = new Vec2(-currentDir.y, currentDir.x);
            }
            if(t.type == TILE_SHAPE.CORNER_BR && currentDir.x ==-1) {
                isBlocker = true;
                offset.x += hts - 6;
            }
            if(t.type == TILE_SHAPE.CORNER_BR && currentDir.y ==-1) {
                isBlocker = true;
                offset.y += hts - 6;
            }

            // TILE_SHAPE.CORNER_BL
            //=====================================================
            if(t.type == TILE_SHAPE.CORNER_BL && currentDir.x == 1) {
                isBlocker = true;
                offset.x -= hts - 6;
            }
            if(t.type == TILE_SHAPE.CORNER_BL && currentDir.y == 1) {
                nextDir = new Vec2(currentDir.y,-currentDir.x);
            }
            if(t.type == TILE_SHAPE.CORNER_BL && currentDir.x ==-1) {
                nextDir = new Vec2(-currentDir.y, currentDir.x);
            }
            if(t.type == TILE_SHAPE.CORNER_BL && currentDir.y == -1) {
                isBlocker = true;
                offset.y += hts - 6;
            }

            // TILE_SHAPE.SOLID
            //=====================================================
            if(t.type == TILE_SHAPE.SOLID && currentDir.x == 1) {
                isBlocker = true;
            }
            if(t.type == TILE_SHAPE.SOLID && currentDir.y == 1) {
                isBlocker = true;
                
            }
            if(t.type == TILE_SHAPE.SOLID && currentDir.x ==-1) {
                isBlocker = true;
            }
            if(t.type == TILE_SHAPE.SOLID && currentDir.y == -1) {
                isBlocker = true;
            }
        }

        if(currentDir != nextDir || isBlocker) {
            pos.x += offset.x;
            pos.y += offset.y;
            results.push({
                dir: nextDir,
                index: index,
                pos: pos,
                color: this.color,
                tile: t
            });
        }
        
        if(!isBlocker) {
            const nextPos = Vec2.mul(nextDir, {x: ts, y: ts}).add(pos);
            this.traceLightPoints(results, nextDir, nextPos);
        }
    }

    dirToVec(dir: LightDir) {
        switch(dir) {
            case LightDir.LEFT: return new Vec2(-1, 0);
            case LightDir.UP: return new Vec2(0, -1);
            case LightDir.RIGHT: return new Vec2(1, 0);
            case LightDir.DOWN: return new Vec2(0, 1);
            default: return new Vec2(0, 0);
        }
    }

}

export class LightBender extends App {

    currentLevelIndex: number = 0;
    currentLevel: Level;

    tileTextures: {[key: number]: Texture2D} = {};
    
    constructor(htmlCanvasId: string) {
        super(htmlCanvasId);

        this.currentLevel = new Level(levels[this.currentLevelIndex]);
        this.currentLevel.tileTextures = this.tileTextures;
        this.loadLevel();

    }

    async loadAssets(): Promise<void> {
        await super.loadAssets();

        this.tileTextures[0] = null;
        
        this.tileTextures[1] = new Texture2D(this.gl);
        this.tileTextures[1].load(tileImage1Png);

        this.tileTextures[2] = new Texture2D(this.gl);
        this.tileTextures[2].load(tileImage2Png);

        this.tileTextures[3] = new Texture2D(this.gl);
        this.tileTextures[3].load(tileImage3Png);

        this.tileTextures[4] = new Texture2D(this.gl);
        this.tileTextures[4].load(tileImage4Png);

        this.tileTextures[5] = new Texture2D(this.gl);
        this.tileTextures[5].load(tileImage5Png);

        this.tileTextures[6] = new Texture2D(this.gl);
        this.tileTextures[6].load(tileTypeSolidPng);
    }
    
    update() {
        super.update();
        const kb = this.input.keyboard;
        const inputDir = new Vec2(0, 0);

        if(kb.wasKeyPressed(38)) inputDir.y = -1;       // up arrow
        else if(kb.wasKeyPressed(40)) inputDir.y =  1;  // down arrow
        else if(kb.wasKeyPressed(37)) inputDir.x = -1;  // left arrow
        else if(kb.wasKeyPressed(39)) inputDir.x =  1;  // right arrow
            
        if( inputDir.x !== 0 || inputDir.y !== 0) {
            this.moveActiveTile(inputDir);
        }

        for(const t of this.currentLevel.tiles) {
            t.update(this.time.deltaTime);
        }

        this.currentLevel.calculateLightPoints();
    }

    draw() {
        super.draw();
        this.gl.clearColor(0, 0, 0, 0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);

        this.renderer2d.begin();
        this.drawBackgroundGrid();
        this.drawLightBeams();
        this.drawTiles();
        this.renderer2d.end();
    }

    drawBackgroundGrid() {
        const ts = this.currentLevel.data.tileSize; 
        const nx = this.currentLevel.data.cols-2; // Math.floor(this.canvas.width / ts);
        const ny = this.currentLevel.data.rows-2; // Math.floor(this.canvas.height/ ts);
        const xo = (this.canvas.width - nx * ts) * 0.5;
        const yo = (this.canvas.height - ny * ts) * 0.5;

        this.renderer2d.saveState(true);

        // draw background:
        // const mc = new Vec4(255/255, 232/255, 206/255, 1);
        const oc = new Vec4(255/255, 255/255, 255/255, 0.2);

        this.renderer2d.setColor(oc);
        const colors = [new Vec4(oc.x, oc.y, oc.z, 0), new Vec4(oc.x, oc.y, oc.z, oc.w), new Vec4(oc.x, oc.y, oc.z, oc.w), new Vec4(oc.x, oc.y, oc.z, 0)];

        for(let i=0; i<=nx; i++) {
            const points = [
                new Vec2(xo + (i*ts), yo - (2 * ts)), 
                new Vec2(xo + (i*ts), yo - 0), 
                new Vec2(xo + (i*ts), yo + (ny * ts)), 
                new Vec2(xo + (i*ts), yo + ((ny+2) * ts))
            ];
            this.renderer2d.drawLines(points, 1, colors);
        }

        for(let i=0; i<=ny; i++) {
            const points = [
                new Vec2(xo - (2 * ts), yo + (i*ts)),
                new Vec2(xo - 0, yo + (i*ts)),
                new Vec2(xo + (nx * ts), yo + (i*ts)),
                new Vec2(xo + ((nx+2) * ts), yo + (i*ts))
            ];
            this.renderer2d.drawLines(points, 1, colors);
        }

        this.renderer2d.popState();
    }

    drawLightBeams() {
        
        for(const tile of this.currentLevel.tiles) {
            if(tile instanceof LightTile) {
                tile.drawLight(this.renderer2d);
            }
        }
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

        
        const activeTileIndex = this.currentLevel.posToIndex(this.currentLevel.activeTile.pos);
        const targetTileIndex = Vec2.add(activeTileIndex, dir);
        const zone = this.currentLevel.inZone(targetTileIndex);

        const moveTileFinishedFunc = (tile: Tile) => {
            this.currentLevel.movingTiles.delete(tile);
            tile.onMoveFinished = null;
            const index = this.currentLevel.posToIndex(tile.pos);
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
            const ti = this.currentLevel.posToIndex(t.pos);
            if(zone.contains(ti) && t.moveWith(dir, activeTileIndex) ) {
                this.currentLevel.movingTiles.add(t);
                t.onMoveFinished = moveTileFinishedFunc;
            }
        }
    }



    loadLevel() {

        const level = this.currentLevel;
        const layout = level.data.layout;
        const lights = level.data.lights;

        // if the start tile is blank, set it to the default type.
        if( layout[level.data.startTile[1]][level.data.startTile[0]] === 0 )
            layout[level.data.startTile[1]][level.data.startTile[0]] = 1;

        const tileSize = level.data.tileSize;
        const nx = level.data.cols-2; // Math.floor(this.canvas.width / ts);
        const ny = level.data.rows-2; // Math.floor(this.canvas.height/ ts);
        const xo = (this.canvas.width - (nx+2) * tileSize) * 0.5;
        const yo = (this.canvas.height - (ny+2) * tileSize) * 0.5;

        // set the position of the level, so that we can calculate index's from positions.
        level.pos = new Vec2(xo, yo);

        this.currentLevel.tiles = [];

        const rows = level.data.rows;
        const cols = level.data.cols;
        
        for(let yi = 0; yi<rows; yi++) {
            for(let xi = 0; xi<cols; xi++) {

                let lightId = lights[yi][xi];
                let tileType = layout[yi][xi];

                if(lightId != 0 )
                    tileType = 1;
                
                if(tileType === 0 )
                    continue;

                const x = xo + (xi * tileSize) + (tileSize * 0.5);
                const y = yo + (yi * tileSize) + (tileSize * 0.5);
                let tile = null;
                
                if( lightId > 0 ) {
                    tile = new LightTile(this.currentLevel, new Vec2(x, y), new Vec2(tileSize, tileSize), tileType);
                    tile.lightDir = Math.floor(lightId / 10);
                    tile.colorId = lightId - (tile.lightDir * 10);
                }
                else {
                    tile = new Tile(this.currentLevel, new Vec2(x, y), new Vec2(tileSize, tileSize), tileType);
                }

                if(xi === level.data.startTile[0] && yi === level.data.startTile[1])
                    this.currentLevel.activeTile = tile;

                this.currentLevel.tiles.push(tile);
                
            }
        }
    }

}
