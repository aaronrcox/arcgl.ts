
export interface IVec3 {
    x: number;
    y: number;
    z: number;
}

export class Vec3 implements IVec3 {

    [key: number]: number;
    [Symbol.iterator]() {
        let step = 0;
        return { next: () => ({ value: this[step++], done: step > 3 }) }
    }

    get x() { return this[0]; }
    get y() { return this[1]; }
    get z() { return this[2]; }
    get xyz() { return [this.x, this.y, this.z]; }

    set x(value: number) { this[0] = value; }
    set y(value: number) { this[1] = value; }
    set z(value: number) { this[2] = value; }
    set xyz(value: [number, number, number]) { 
        this.x = value[0]; 
        this.y = value[1];
        this.z = value[2];
    }

    constructor(x: number = 0, y: number = 0, z: number = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
     }

    static add(lhs: IVec3, rhs: IVec3): Vec3 {
        return new Vec3(lhs.x + rhs.x, lhs.y + rhs.y, lhs.z + rhs.z);
    }
    static sub(lhs: IVec3, rhs: IVec3): Vec3 {
        return new Vec3(lhs.x - rhs.x, lhs.y - rhs.y, lhs.z - rhs.z);
    }
    static mul(lhs: IVec3, rhs: IVec3): Vec3 {
        return new Vec3(lhs.x * rhs.x, lhs.y * rhs.y, lhs.z * rhs.z);
    }
    static div(lhs: IVec3, rhs: IVec3): Vec3 {
        return new Vec3(lhs.x / rhs.x, lhs.y / rhs.y, lhs.z / rhs.z);
    }
    static normalise(vec: IVec3): Vec3 {
        const len = Vec3.len(vec);
        return new Vec3(vec.x / len, vec.y / len, vec.z / len );
    }
    static len(vec: IVec3): number {
        return Math.sqrt(vec.x * vec.x + vec.y * vec.y + vec.z * vec.z);
    }
    static dot(lhs: IVec3, rhs: IVec3): number {
        return lhs.x * rhs.x + lhs.y * rhs.y + lhs.z * rhs.z;
    }


    add(rhs: IVec3): Vec3 {
        this.x += rhs.x;
        this.y += rhs.y;
        this.z += rhs.z;
        return this;
    }

    sub(rhs: IVec3): Vec3 {
        this.x -= rhs.x;
        this.y -= rhs.y;
        this.z -= rhs.z;
        return this;
    }

    mul(rhs: IVec3) : Vec3 {
        this.x *= rhs.x;
        this.y *= rhs.y;
        this.z *= rhs.z;
        return this;
    }

    div(rhs: IVec3) : Vec3 {
        this.x /= rhs.x;
        this.y /= rhs.y;
        this.z /= rhs.z;
        return this;
    }

    normalise() : Vec3 {
        const len = this.length();
        this.x /= len;
        this.y /= len;
        this.z /= len;
        return this;
    }

    length(): number {
        return Vec3.len(this);
    }

    dot(rhs: IVec3): number{
        return Vec3.dot(this, rhs);
    }
}