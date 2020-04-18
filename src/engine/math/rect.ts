import { Vec2, IVec2 } from "./vec2";

export class Rect {
    pos: Vec2;
    size: Vec2;

    get left() { return this.pos.x; }
    get right() { return this.pos.x + this.size.x; }
    get top() { return this.pos.y; }
    get bottom() { return this.pos.y + this.size.y; }

    get min() { return new Vec2(this.pos.x, this.pos.y); }
    get max() { return Vec2.add(this.pos, this.size); }

    get topLeft(): IVec2       { return {x: this.pos.x, y: this.pos.y } }
    get topRight(): IVec2      { return {x: this.pos.x + this.size.x, y: this.pos.y} }
    get bottomRight(): IVec2   { return {x: this.pos.x + this.size.x, y: this.pos.y + this.size.y} }
    get bottomLeft(): IVec2    { return {x: this.pos.x, y: this.pos.y + this.size.y} }

    constructor(x: number, y: number, w: number, h: number) {
        this.pos = new Vec2(x, y);
        this.size = new Vec2(w, h);
    }

    contains(point: IVec2): boolean {
        return point.x >= this.left && point.x < this.right &&
            point.y >= this.top && point.y < this.bottom;
    }
}