
export interface IVec4 {
    x: number;
    y: number;
    z: number;
    w: number;
}

export class Vec4 implements IVec4 {

    static readonly ONE = new Vec4(1,1,1,1);

    [key: number]: number;
    [Symbol.iterator]() {
        let step = 0;
        return { next: () => ({ value: this[step++], done: step > 4 }) }
    }

    get x() { return this[0]; }
    get y() { return this[1]; }
    get z() { return this[2]; }
    get w() { return this[3]; }
    get xyzw() { return [this.x, this.y, this.z, this.w]; }

    set x(value: number) { this[0] = value; }
    set y(value: number) { this[1] = value; }
    set z(value: number) { this[2] = value; }
    set w(value: number) { this[3] = value; }
    set xyzw(value: [number, number, number, number]) { 
        this.x = value[0]; 
        this.y = value[1];
        this.z = value[2];
        this.w = value[3];
    }

    constructor(x: number = 0, y: number = 0, z: number = 0, w: number = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
     }

    static add(lhs: IVec4, rhs: IVec4): Vec4 {
        return new Vec4(lhs.x + rhs.x, lhs.y + rhs.y, lhs.z + rhs.z, lhs.w + rhs.w);
    }
    static sub(lhs: IVec4, rhs: IVec4): Vec4 {
        return new Vec4(lhs.x - rhs.x, lhs.y - rhs.y, lhs.z - rhs.z, lhs.w - rhs.w);
    }
    static mul(lhs: IVec4, rhs: IVec4): Vec4 {
        return new Vec4(lhs.x * rhs.x, lhs.y * rhs.y, lhs.z * rhs.z, lhs.w * rhs.w);
    }
    static div(lhs: IVec4, rhs: IVec4): Vec4 {
        return new Vec4(lhs.x / rhs.x, lhs.y / rhs.y, lhs.z / rhs.z, lhs.w / rhs.w);
    }
    static normalise(vec: IVec4): Vec4 {
        const len = Vec4.len(vec);
        return new Vec4(vec.x / len, vec.y / len, vec.z / len, vec.w / len );
    }
    static len(vec: IVec4): number {
        return Math.sqrt(vec.x * vec.x + vec.y * vec.y + vec.z * vec.z + vec.w * vec.w);
    }
    static dot(lhs: IVec4, rhs: IVec4): number {
        return lhs.x * rhs.x + lhs.y * rhs.y + lhs.z * rhs.z + lhs.w * rhs.w;
    }

    add(rhs: IVec4): Vec4 {
        this.x += rhs.x;
        this.y += rhs.y;
        this.z += rhs.z;
        this.w += rhs.w;
        return this;
    }

    sub(rhs: IVec4): Vec4 {
        this.x -= rhs.x;
        this.y -= rhs.y;
        this.z -= rhs.z;
        this.w -= rhs.w;
        return this;
    }

    mul(rhs: IVec4) : Vec4 {
        this.x *= rhs.x;
        this.y *= rhs.y;
        this.z *= rhs.z;
        this.w *= rhs.w;
        return this;
    }

    div(rhs: IVec4) : Vec4 {
        this.x /= rhs.x;
        this.y /= rhs.y;
        this.z /= rhs.z;
        this.w /= rhs.w;
        return this;
    }

    normalise() : Vec4 {
        const len = this.length();
        this.x /= len;
        this.y /= len;
        this.z /= len;
        this.w /= len;
        return this;
    }

    length(): number {
        return Vec4.len(this);
    }

    dot(rhs: IVec4): number{
        return Vec4.dot(this, rhs);
    }

}
