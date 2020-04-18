
import { Vec3 } from './vec3';
import { Vec4 } from './vec4';


export interface IMat4 {
    [key: number]: number;
}

export class Mat4 implements IMat4 {

    /*
        0,  1,  2,  3,
        4,  5,  6,  7,
        8,  9,  10, 11
        12, 13, 14, 15
    */

    [key: number]: number;

    [Symbol.iterator]() {
        let step = 0;
        return { next: () => ({ value: this[step++], done: step > 16 }) }
    }

    static Identity: Mat4 = new Mat4([
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    ]);

    get right(): Vec3 { return new Vec3(this[0], this[1], this[2]); }
    get up(): Vec3 { return new Vec3(this[4], this[5], this[6]); }
    get forward(): Vec3 { return new Vec3(this[8], this[9], this[10]); }
    get pos(): Vec3 { return new Vec3(this[12], this[13], this[14]); }
    toArray() { return [...this] }

    static row(mat: IMat4, i: number): Vec4 {
        const ri = (i * 4);
        return new Vec4( mat[ri+0], mat[ri+1], mat[ri+2], mat[ri+3] );
    }

    static col(mat: IMat4, i: number): Vec4 {
        return new Vec4(mat[i+0], mat[i+4], mat[i+8], mat[i+12]);
    }

    constructor(mat: IMat4 = Mat4.Identity) {
        for(let i=0; i<16; i++)
            this[i] = mat[i];
    }

    static translation(x: number, y: number, z: number) {
        return new Mat4([
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            x, y, z, 1
        ]);
    }

    static scale(xs: number, ys: number, zs: number) {
        return new Mat4([
            xs, 0,  0, 0,
            0,  ys, 0, 0,
            0,  0,  zs, 0,
            0, 0, 0, 1
        ]);
    }

    static orthographicProjection(left: number, right: number, bottom: number, top: number, near: number, far: number) {

        return new Mat4([
            2.0 / (right - left), 0.0, 0.0, 0.0,
            0.0, 2.0 / (top - bottom), 0.0, 0.0,
            0.0, 0.0,-2.0 / (far - near), 0.0,

            -( (right + left) / (right - left)), 
            -( (top + bottom) / (top - bottom)), 
            -( (far + near) / (far - near)), 
            1.0
        ]);
    }

    static mul(lhs: IMat4, rhs: IMat4) {
        const r1 = Mat4.row(lhs, 0);
        const r2 = Mat4.row(lhs, 1);
        const r3 = Mat4.row(lhs, 2);
        const r4 = Mat4.row(lhs, 3);

        const c1 = Mat4.col(rhs, 0);
        const c2 = Mat4.col(rhs, 1);
        const c3 = Mat4.col(rhs, 2);
        const c4 = Mat4.col(rhs, 3);

        return new Mat4([
            Vec4.dot(r1, c1), Vec4.dot(r1,c2),  Vec4.dot(r1, c3), Vec4.dot(r1, c4),
            Vec4.dot(r2, c1), Vec4.dot(r2,c2),  Vec4.dot(r2, c3), Vec4.dot(r2, c4),
            Vec4.dot(r3, c1), Vec4.dot(r3,c2),  Vec4.dot(r3, c3), Vec4.dot(r3, c4),
            Vec4.dot(r4, c1), Vec4.dot(r4,c2),  Vec4.dot(r4, c3), Vec4.dot(r4, c4)
        ]);
    }

}