
export interface IVec2 {
    x: number;
    y: number;
}

export class Vec2 implements IVec2 {

    [key: number]: number;
    [Symbol.iterator]() {
        let step = 0;
        return { next: () => ({ value: this[step++], done: step > 2 }) }
    }

    static readonly ZERO: Vec2 = new Vec2(0, 0);

    get x() { return this[0]; }
    get y() { return this[1]; }
    get xy() { return [this.x, this.y]; }

    set x(value: number) { this[0] = value; }
    set y(value: number) { this[1] = value; }
    set xy(value: [number, number]) { 
        this.x = value[0]; 
        this.y = value[1];
    }

    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
     }

    static add(lhs: IVec2, rhs: IVec2): Vec2 {
        return new Vec2(lhs.x + rhs.x, lhs.y + rhs.y);
    }
    static sub(lhs: IVec2, rhs: IVec2): Vec2 {
        return new Vec2(lhs.x - rhs.x, lhs.y - rhs.y);
    }
    static mul(lhs: IVec2, rhs: IVec2): Vec2 {
        return new Vec2(lhs.x * rhs.x, lhs.y * rhs.y);
    }
    static scale(lhs: IVec2, rhs: number) {
        return new Vec2(lhs.x * rhs, lhs.y * rhs);
    }
    static div(lhs: IVec2, rhs: IVec2): Vec2 {
        return new Vec2(lhs.x / rhs.x, lhs.y / rhs.y);
    }
    static negate(vec: IVec2) {
        return new Vec2(-vec.x, -vec.y);
    }
    static normalise(vec: IVec2): Vec2 {
        const len = Vec2.len(vec);
        return new Vec2(vec.x / len, vec.y / len );
    }
    static len(vec: IVec2): number {
        return Math.sqrt(vec.x * vec.x + vec.y * vec.y);
    }

    static distance(vec1: IVec2, vec2: IVec2): number {
        return Vec2.sub(vec2, vec1).length();
    }
    static dot(lhs: IVec2, rhs: IVec2): number {
        return lhs.x * rhs.x + lhs.y * rhs.y;
    }
    static pivot(vec: IVec2, rot: number, point: IVec2 = {x: 0, y: 0}): Vec2 {
        const x = vec.x - point.x;
        const y = vec.y - point.y;

        return new Vec2(
            (x * Math.cos(rot)) - (y * Math.sin(rot)) + point.x, 
            (y * Math.cos(rot)) + (x * Math.sin(rot)) + point.y
        );
    }
    static reflect(vec: IVec2, normal: IVec2) {
        const d = Vec2.dot(vec, normal);
        return new Vec2(
            vec.x - 2 * d * normal.x,
            vec.y - 2 * d * normal.y
        )
    }

    add(rhs: IVec2): Vec2 {
        this.x += rhs.x;
        this.y += rhs.y;
        return this;
    }

    sub(rhs: IVec2): Vec2 {
        this.x -= rhs.x;
        this.y -= rhs.y;
        return this;
    }

    mul(rhs: IVec2) : Vec2 {
        this.x *= rhs.x;
        this.y *= rhs.y;
        return this;
    }

    div(rhs: IVec2) : Vec2 {
        this.x /= rhs.x;
        this.y /= rhs.y;
        return this;
    }

    scale(rhs: number) {
        this.x *= rhs;
        this.y *= rhs;
        return this;
    }

    negate() {
        this.x = -this.x;
        this.y = -this.y;
        return this;
    }

    normalise() : Vec2 {
        const len = this.length();
        if(len === 0)
            return this;
            
        this.x /= len;
        this.y /= len;
        return this;
    }

    length(): number {
        return Vec2.len(this);
    }

    dot(rhs: IVec2): number{
        return Vec2.dot(this, rhs);
    }

    pivot(rot: number, point: IVec2 = {x: 0, y: 0}): Vec2 {
        let x = this.x - point.x;
        let y = this.y - point.y;
        
        this.x = (x * Math.cos(rot)) - (y * Math.sin(rot)) + point.x;
        this.y = (y * Math.cos(rot)) + (x * Math.sin(rot)) + point.y;

        return this;
    }

    // 90 degree rotation cw
    static perpendicular(vec: IVec2): Vec2 {
        return new Vec2(vec.y, -vec.x);
    }
}
