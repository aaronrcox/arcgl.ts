
import { Vec2 } from './vec2';
import { Vec3, IVec3 } from './vec3';


export interface IMat3 {
    [key: number]: number;
}

export class Mat3 implements IMat3 {

    [key: number]: number;
    [Symbol.iterator]() {
        let step = 0;
        return { next: () => ({ value: this[step++], done: step > 9 }) }
    }

    get right(): Vec2 { return new Vec2(this[0], this[1]); }
    get up(): Vec2 { return new Vec2(this[4], this[5]); }
    get pos(): Vec2 { return new Vec2(this[6], this[7]); }
    get scale(): Vec2 { return new Vec2( this.right.length(), this.up.length() )}

    static row(mat: IMat3, i: number): Vec3 {
        const ri = (i * 3);
        return new Vec3( mat[ri+0], mat[ri+1], mat[ri+2] );
    }

    static col(mat: IMat3, i: number): Vec3 {
        return new Vec3(mat[i+0], mat[i+3], mat[i+6]);
    }

    constructor(mat3: IMat3) {
        for(let i=0; i<9; i++)
            this[i] = mat3[i];
    }

    static identity() {
        return new Mat3([
            1, 0, 0,
            0, 1, 0,
            0, 0, 1
        ]);
    }

    static translation(x: number, y: number): Mat3 {
        return new Mat3([
            1, 0, 0,
            0, 1, 0,
            x, y, 1
        ]);
    }

    static rotation(rot: number): Mat3 {
        const s = Math.sin(rot);
        const c = Math.cos(rot);
        return new Mat3([
            c, s, 0,
           -s, c, 0,
            0, 0, 1
        ]);
    }

    static scale(xs: number, ys: number): Mat3 {
        const result = new Mat3([
            xs, 0,  0,
            0,  ys, 0,
            0,  0,  1
        ]);
        return result;
    }

    static mul(lhs: IMat3, rhs: IMat3) {

        return new Mat3([
            lhs[0]*rhs[0] + lhs[1]*rhs[3] + lhs[2]*rhs[6], // Vec3.dot(r1, c1),
            lhs[0]*rhs[1] + lhs[1]*rhs[4] + lhs[2]*rhs[7], // Vec3.dot(r1, c2), 
            lhs[0]*rhs[2] + lhs[1]*rhs[5] + lhs[2]*rhs[8], // Vec3.dot(r1, c3),
            lhs[3]*rhs[0] + lhs[4]*rhs[3] + lhs[5]*rhs[6], // Vec3.dot(r2, c1),
            lhs[3]*rhs[1] + lhs[4]*rhs[4] + lhs[5]*rhs[7], // Vec3.dot(r2, c2), 
            lhs[3]*rhs[2] + lhs[4]*rhs[5] + lhs[5]*rhs[8], // Vec3.dot(r2, c3),
            lhs[6]*rhs[0] + lhs[7]*rhs[3] + lhs[8]*rhs[6], // Vec3.dot(r3, c1),
            lhs[6]*rhs[1] + lhs[7]*rhs[4] + lhs[8]*rhs[7], // Vec3.dot(r3, c2),
            lhs[6]*rhs[2] + lhs[7]*rhs[5] + lhs[8]*rhs[8]  // Vec3.dot(r3, c3)
        ]);

        // const r1 = Mat3.row(lhs, 0);
        // const r2 = Mat3.row(lhs, 1);
        // const r3 = Mat3.row(lhs, 2);

        // const c1 = Mat3.col(rhs, 0);
        // const c2 = Mat3.col(rhs, 1);
        // const c3 = Mat3.col(rhs, 2);

        // return new Mat3([
        //     Vec3.dot(r1, c1), Vec3.dot(r1,c2),  Vec3.dot(r1, c3),
        //     Vec3.dot(r2, c1), Vec3.dot(r2,c2),  Vec3.dot(r2, c3),
        //     Vec3.dot(r3, c1), Vec3.dot(r3,c2),  Vec3.dot(r3, c3)
        // ]);
    }

    static transformPoint(mat: Mat3, point: IVec3): IVec3 {

        return {
            x: point.x*mat[0] + point.y*mat[3] + point.z*mat[6],
            y: point.x*mat[1] + point.y*mat[4] + point.z*mat[7],
            z: point.x*mat[2] + point.y*mat[5] + point.z*mat[8]
        };

        // const c1 = Mat3.col(mat, 0);
        // const c2 = Mat3.col(mat, 1);
        // const c3 = Mat3.col(mat, 2);
        // return {
        //     x: Vec3.dot(point, c1 ),
        //     y: Vec3.dot(point, c2 ),
        //     z: Vec3.dot(point, c3 )
        // }
    }

    // mul(rhs: Mat3): Mat3 {
    //     const result = Mat3.mul(this, rhs);
    //     return result;
    // }

    copy(): Mat3 {
        return new Mat3([
            this[0], this[1], this[2],
            this[3], this[4], this[5],
            this[6], this[7], this[8]
        ]);
    }

    equal(rhs: Mat3): boolean {
        const e = Number.EPSILON;
        for (let i = 0; i < 9; i++) {
            if (Math.abs(this[i] - rhs[i]) > e) {
                return false
            }
        }
        return true;
    }

    move(tx: number, ty: number) {
        this[6] += tx;
        this[7] += ty;
    }

    setPos(tx: number, ty: number) {
        this[6] = tx;
        this[7] = ty;
    }

    setPosX(tx: number) {
        this[6] = tx;
    }

    setPosY(ty: number) {
        this[7] = ty;
    }
}
