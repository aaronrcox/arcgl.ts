import { IVec2, IVec3 } from ".";
import { Mat3 } from "./mat3";


export class Shape {

    constructor(public points: IVec2[] = []) {
    }

    static makeCircle(xPos: number, yPos: number, radius: number, segments: number) {
        const points: IVec2[] = [];
        for(let i=0; i<=segments;  i++) {

            const r = ((2.0 * Math.PI) / segments) * i;
            const x =  Math.sin(r) * radius;
            const y = -Math.cos(r) * radius;

            points.push({x: xPos + x, y: yPos + y});
        }

        return new Shape(points);
    }

    static makeLine(x1: number, y1: number, x2: number, y2: number) {
        const points: IVec2[] = [
            {x: x1, y: y1}, {x: x2, y: y2}
        ];

        return new Shape(points);
    }

    static makeBox(x: number, y: number, width: number, height: number, rot: number, open: boolean = false) {
        let points: IVec3[] = [
            {x:  width/2,   y:  height/2, z: 1}, // br
            {x: -width/2,   y:  height/2, z: 1}, // bl
            {x: -width/2,   y: -height/2, z: 1}, // tl
            {x:  width/2,   y: -height/2, z: 1}, // tr
        ];

        if(!open) {
            points.push( {x:  width/2,   y:  height/2, z: 1});
        }

        points = points.map(p => Mat3.transformPoint( Mat3.mul(Mat3.rotation(rot), Mat3.translation(x, y)), p )  );

        return new Shape(points);
    }

    static makeAngleTriangle(x: number, y: number, width: number, height: number, rot: number) {
        const hw = Math.ceil(width * 0.5);
        const hh = Math.ceil(height * 0.5);
        let points: IVec3[] = [
            {x: 0 - hw,     y: 0 - hh, z: 1}, 
            {x: 0 + hw,     y: 0 - hh, z: 1},
            {x: 0 - hw,     y: 0 + hh, z: 1},
            {x: 0 - hw,     y: 0 - hh, z: 1}
        ];
        points = points.map(p => Mat3.transformPoint( Mat3.mul(Mat3.rotation(rot), Mat3.translation(x, y)), p )  );
        return new Shape(points);
    }
}