import img from '../../assets/prop-crate-plain.png';
import { Texture2D } from "../../engine/graphics/texture";
import { App } from "../../engine/app";
import { Vec2, Vec4 } from '../../engine/math';
import { Renderer2d } from '../../engine/graphics/renderer2d';
import { RenderTarget } from '../../engine/graphics/renderTarget';
import { MOUSE } from '../../engine/input/mouseInput';

// texture imports
import tileBasePng from './assets/tile-base.png';

type ShapeId = string;
type ColorId = string;
type DirId = string;
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

class Tile {

    static textures: Texture2D[] = [];

    level: Level = null;
    data: ITileData = null;
    pos: Vec2;

    get index() {
        return this.level.posToIndex(this.pos);
    }

    constructor(level: Level, data: ITileData, pos: Vec2) {
        this.level = level;
        this.data = data;
        this.pos = pos;

        this.level.tiles.push(this);
    }

    update() {
        this.level.moveTile(this, this.index, this.index)
    }

    draw(renderer: Renderer2d) {

        console.log(this.pos);

        renderer.saveState(true);
        renderer.setTexture(Tile.textures[0]);
        renderer.darwRect(this.pos.x, this.pos.y, this.level.tWidth, this.level.tHeight, 0, 0.5, 0.5);
        renderer.popState();

    }

    move(amount: Vec2){
        const index = this.index;
        this.pos.add(amount);
        const newIndex = this.index;
        if(index.x != newIndex.x || index.y != newIndex.y)
            this.level.moveTile(this, index, newIndex);
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
            this.createTile('0001', this.mouseHoverIndex);
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
        const tData = {
            shapeId: data[0],
            colorId: data[1],
            dirId: data[2],
            LightId: data[3],
        }
        const tile = new Tile(this, tData, this.indexToPos(index));
        
        return tile;
    }

    moveTile(tile: Tile, oldIndex: Vec2, newIndex: Vec2) {
        if(oldIndex) this.grid[oldIndex.y][oldIndex.x].delete(tile);
        if(newIndex) this.grid[newIndex.y][newIndex.x].add(tile);
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
        return (index.x >= 0 && index.x < this.cols && index.y >= 0 && index.y < this.rows) ? index : null;
    }

    indexToPos(index: Vec2): Vec2 {
        return new Vec2(
            (index.x * this.tWidth) + this.pos.x + (this.tWidth * 0.5),
            (index.y * this.tHeight) + this.pos.y + (this.tHeight * 0.5)
        )
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
