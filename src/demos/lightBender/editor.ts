import img from '../../assets/prop-crate-plain.png';
import { Texture2D } from "../../engine/graphics/texture";
import { App } from "../../engine/app";
import { Vec2, Vec4, Shape } from '../../engine/math';
import { Renderer2d } from '../../engine/graphics/renderer2d';
import { RenderTarget } from '../../engine/graphics/renderTarget';
import { MOUSE } from '../../engine/input/mouseInput';

// texture imports
import tileBasePng from './assets/tile-base.png';

type ShapeId = string | TILE_TYPE;
type ColorId = string;
type DirId = string | TILE_DIR;
type LightId = string;


interface ITileData {
    shapeId: ShapeId;
    colorId: ColorId;
    dirId: DirId;
    LightId: LightId;
}

interface IGrid<T> {
    [key: number]: {[key: number]: Set<T>};
}

enum TILE_DIR {
    NONE = '0',
    LEFT = '1',
    UP = '2',
    RIGHT = '3',
    DOWN = '4'
}

enum TILE_TYPE {
    EMPTY = '0',
    SOLID = '1',
    CORNER = '2',
    EMITTER = '3',
    RECEIVER = '4',
}

const LIGHT_COLORS: {[key: string]: Vec4} = {
    '0': new Vec4(255/255, 255/255, 255/255, 1),  // white ff8a80
    '1': new Vec4(255/255, 138/255, 128/255, 1),  // red ff8a80
    '2': new Vec4(43/255, 187/255, 173/255, 1),   // green 2bbbad
    '3': new Vec4(179/255, 136/255, 255/255, 1),  // purple b388ff
    '4': new Vec4(149/255, 158/255, 255/255, 1),  // light blue 8c9eff
    '5': new Vec4(63/255, 114/255, 155/255, 1),   // dark blue 3f729b
}

class Tile {

    static textures: Texture2D[] = [];

    level: Level = null;
    data: ITileData = null;

    pos: Vec2 = new Vec2();
    rot: number = Math.PI;
    collider: Shape = null;

    get index() {
        return this.level.posToIndex(this.pos);
    }

    constructor(level: Level, data: ITileData, pos: Vec2) {
        this.level = level;
        this.data = data;
        this.pos = pos;
        this.rot = Tile.tileRotation(this.data.dirId);

        this.level.tiles.push(this);
    }

    update() {
        this.level.moveTile(this, this.index, this.index);
        this.updateCollider();
    }

    updateCollider() {
        this.collider = Tile.createTileShape(this.data.shapeId, this.pos.x, this.pos.y, this.level.tWidth, this.level.tHeight, this.rot);
    }

    draw(renderer: Renderer2d) {

        renderer.saveState(true);
        renderer.setTexture(Tile.textures[0]);
        renderer.darwRect(this.pos.x, this.pos.y, this.level.tWidth, this.level.tHeight, 0, 0.5, 0.5);
        this.drawCollider(renderer);
        renderer.popState();
    }

    drawCollider(renderer: Renderer2d) {
        if(this.collider) {
            renderer.setColor(LIGHT_COLORS[this.data.colorId] ?? new Vec4(1, 0, 1, 1));
            // renderer.drawLines(this.collider.points, 2);
            for(let i=0; i<this.collider.points.length-1; i++) {
                const p0 = this.collider.points[i];
                const p1 = this.collider.points[(i+1) % this.collider.points.length];
                renderer.drawLine(p0.x, p0.y, p1.x, p1.y, 2);
            }
        }
    }

    move(amount: Vec2){
        const index = this.index;
        this.pos.add(amount);
        const newIndex = this.index;
        if(index.x != newIndex.x || index.y != newIndex.y)
            this.level.moveTile(this, index, newIndex);
    }

    static createTileShape(shape: ShapeId, xPos: number, yPos: number, width: number, height: number, rot: number): Shape {
        switch(shape) {
            case TILE_TYPE.SOLID:
                return Shape.makeBox(xPos, yPos, width, height, rot, false);
            case TILE_TYPE.EMITTER: 
            case TILE_TYPE.RECEIVER:
                return Shape.makeBox(xPos, yPos, width, height, rot, true)
            case TILE_TYPE.CORNER: 
                return Shape.makeAngleTriangle(xPos, yPos, width, height, rot);
            default:
                return null;
        }
    }

    static tileRotation(dir: DirId): number {
        switch(dir) {
            case TILE_DIR.RIGHT: return 0;
            case TILE_DIR.DOWN: return Math.PI / 2; // 90 deg cw
            case TILE_DIR.LEFT: return Math.PI; // 180 deg cw
            case TILE_DIR.UP: return Math.PI + Math.PI / 2; // 270 deg cw
            default: return 0;
        }
    }

}

class Level {

    grid: IGrid<Tile> = {};
    tiles: Tile[] = [];

    rows: number = 8;
    cols: number = 8;
    tWidth: number = 8;
    tHeight: number = 8;

    pos: Vec2 = new Vec2();

    mouseHoverIndex: Vec2 = new Vec2();

    constructor() {
        this.tWidth = 55;
        this.tHeight = 55;
        this.pos = new Vec2(
            (RenderTarget.current.width / 2) - (this.tWidth * this.cols * 0.5),
            (RenderTarget.current.height / 2) - (this.tHeight * this.rows * 0.5)
        );

        // Initialise the grid lookup
        for(let y=0; y<this.rows; y++) {
            this.grid[y] = {};
            for(let x=0; x<this.cols; x++) {
                this.grid[y][x] = new Set<Tile>();
            }
        }
    }


    update() {
        this.mouseHoverIndex = this.posToIndex(App.input.mouse.pos);
        if(App.input.mouse.wasButtonPressed(MOUSE.LEFT)) {
            this.createTile('2530', this.mouseHoverIndex);
        }
        if(App.input.mouse.wasButtonPressed(MOUSE.RIGHT)) {
            this.destroyTileAt(this.mouseHoverIndex);
        }

        this.updateTiles();
    }

    updateTiles() {
        for(const tile of this.tiles) {
            tile.update();
        }
    }

    draw(renderer: Renderer2d) {
        renderer.saveState(true);

        // draw a box around the tile the mouse is on
        if(this.mouseHoverIndex !== null) {
            const tilePos = this.indexToPos(this.mouseHoverIndex);
            renderer.setColor(new Vec4(1, 1, 1, 0.1));
            renderer.darwRect(tilePos.x, tilePos.y, this.tWidth, this.tHeight, 0, 0.5, 0.5);
        }

        // draw the background grid
        const color = new Vec4(255/255, 255/255, 255/255, 0.2);
        this.drawBackgroundGrid(renderer, color);

        // darw the tiles
        for(const tile of this.tiles) {
            tile.draw(renderer);
        }

        renderer.popState();
    }

    createTile(data: string, index: Vec2) {

        if(!this.indexInBounds(index))
            return;

        const tData = {
            shapeId: data[0],
            colorId: data[1],
            dirId: data[2],
            LightId: data[3],
        }
        const tile = new Tile(this, tData, this.indexToPos(index));
        console.log(tile.data);
        return tile;
    }
    destroyTileAt(index: Vec2) {
        if(!this.indexInBounds(index))
            return;

        for(const tile of this.grid[index.y][index.x]) {
            this.grid[index.y][index.x].delete(tile);
            this.tiles.splice(this.tiles.indexOf(tile), 1);
        }
    }

    moveTile(tile: Tile, oldIndex: Vec2, newIndex: Vec2) {
        if(oldIndex && this.indexInBounds(oldIndex)) this.grid[oldIndex.y][oldIndex.x].delete(tile);
        if(newIndex && this.indexInBounds(newIndex)) this.grid[newIndex.y][newIndex.x].add(tile);
    }

    drawBackgroundGrid(renderer: Renderer2d, color: Vec4) {

        renderer.saveState(true);

        // draw background:
        const c = new Vec4(color.x, color.y, color.z, color.w);
        const colors = [new Vec4(c.x, c.y, c.z, 0), new Vec4(c.x, c.y, c.z, c.w), new Vec4(c.x, c.y, c.z, c.w), new Vec4(c.x, c.y, c.z, 0)];

        const pos: Vec2 = this.pos;
        const tw: number = this.tWidth;
        const th: number = this.tHeight;

        const minX = 0;
        const minY = 0;
        const maxX = this.cols;
        const maxY = this.rows;

        // vertical lines
        for(let i = minX; i<=maxX; i++) {
            const points = [
                new Vec2(pos.x + (i*tw), pos.y + ((minY + 0) * th)),
                new Vec2(pos.x + (i*tw), pos.y + ((minY + 2) * th)), 
                new Vec2(pos.x + (i*tw), pos.y + ((maxY - 2) * th)),
                new Vec2(pos.x + (i*tw), pos.y + ((maxY - 0) * th))
            ];

            renderer.drawLines(points, 1, colors);
        }

        // horizontal
        for(let i=minY; i<=maxY; i++) {
            const points = [
                new Vec2(pos.x + ((minX + 0) * tw),  pos.y + (i*th)),
                new Vec2(pos.x + ((minX + 2) * tw),  pos.y + (i*th)),
                new Vec2(pos.x + ((maxX - 2) * tw),  pos.y + (i*th)),
                new Vec2(pos.x + ((maxX - 0) * tw),  pos.y + (i*th))
            ];
            renderer.drawLines(points, 1, colors);
        }
        renderer.popState();
    }

    posToIndex(pos: Vec2): Vec2 {
        const index = new Vec2(
            Math.floor((pos.x - this.pos.x) / this.tWidth),
            Math.floor((pos.y - this.pos.y) / this.tHeight),
        );
        return  this.indexInBounds(index) ? index : null;
    }

    indexToPos(index: Vec2): Vec2 {
        return new Vec2(
            (index.x * this.tWidth) + this.pos.x + (this.tWidth * 0.5),
            (index.y * this.tHeight) + this.pos.y + (this.tHeight * 0.5)
        )
    }

    indexInBounds(index: Vec2): boolean {
        return (index && index.x >= 0 && index.x < this.cols && index.y >= 0 && index.y < this.rows);
    }
}

export class LightBenderEditor extends App {

    level: Level;
    levelIndex: number = 0;

    image: Texture2D;

    constructor(htmlCanvasId: string) {
        super(htmlCanvasId);
    }

    async loadAssets(): Promise<void> {
        await super.loadAssets();

        this.image = new Texture2D(this.gl);
        this.image.load(img);

        Tile.textures[0] = new Texture2D(this.gl);
        Tile.textures[0].load(tileBasePng);

        this.level = new Level();
    }
    
    update() {
        super.update();

        this.level.update();
    }

    draw() {
        super.draw();

        this.renderer2d.begin();

        this.level.draw(this.renderer2d);

        this.renderer2d.end();
    }

}
