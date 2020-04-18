import { IVec2 } from ".";


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

    static makeBox(x: number, y: number, width: number, height: number) {
        const points: IVec2[] = [
            {x: x, y: y}, 
            {x: x+width, y: y},
            {x: x+width, y: y+height},
            {x: x, y: y+height},
            {x: x, y: y}, 
        ];
        return new Shape(points);
    }
}