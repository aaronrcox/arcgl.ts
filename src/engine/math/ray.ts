import { Vec2, IVec2, Shape } from ".";


export interface RayHit {
    incomingRay: Ray;
    reflectedRay: Ray;
    point: IVec2;
    normal: IVec2;
    distance: number;
    target: Shape;
}

export class Ray {
    pos: Vec2 = new Vec2();
    dir: Vec2 = new Vec2();
    hit: RayHit = null;

    constructor(pos: IVec2, dir: IVec2) {
        this.pos.x = pos.x;
        this.pos.y = pos.y;
        this.dir.x = dir.x;
        this.dir.y = dir.y;
    }

    castToLine(x1: number, y1: number, x2: number, y2: number, createReflected: boolean = false): boolean {

        // Line Intersection formula
        // https://en.wikipedia.org/wiki/Line-line_intersection

        this.hit = null;

        const x3 = this.pos.x;
        const y3 = this.pos.y;
        const x4 = this.pos.x + this.dir.x;
        const y4 = this.pos.y + this.dir.y;

        const den = (x1-x2) * (y3-y4) - (y1 - y2) * (x3 - x4);
        if(den === 0)
            return false;

        const t = ((x1-x3) * (y3-y4) - (y1 - y3) * (x3-x4)) / den;
        const u = -((x1-x2) * (y1-y3) - (y1 - y2) * (x1-x3)) / den

        // this means the lines are not intersecting, so return
        if(!(t >= 0 && t <= 1 && u >= 0)) {
            return false;
        }

        const point = new Vec2( x1 + t * (x2 - x1), y1 + t * (y2 - y1));
        const normal = Vec2.perpendicular( Vec2.normalise(Vec2.sub(new Vec2(x1, y1), new Vec2(x2, y2))) );
        if( normal.dot(this.dir) < 0 ) {
            normal.x = -normal.x;
            normal.y = -normal.y;
        }
            
        // calculate a new ray, that contains the point of intersection
        // and a reflected direction

        let reflectRay = null; 
        if(createReflected) {
            reflectRay = new Ray(Vec2.sub(point, this.dir), Vec2.reflect(this.dir, normal));
        }

        const hit: RayHit = {
            point: point,
            normal: normal,
            distance: Vec2.distance(this.pos, point),
            incomingRay: this,
            reflectedRay: reflectRay,
            target: null
        };
        
        this.hit = hit;
        return true;
    }

    castToShapes(shapes: Shape[], numReflections: number = 0): boolean {
        let bestHit: RayHit = null;
        this.hit = null;

        for(const shape of shapes) {
            for(let i=0; i<shape.points.length-1; i++) {
                const p1 = shape.points[i];
                const p2 = shape.points[i+1];
    
                if( this.castToLine(p1.x, p1.y, p2.x, p2.y,  numReflections >= 1) ) {
                    if((this.hit.distance < bestHit?.distance) || bestHit == null) {
                        bestHit = this.hit;
                        bestHit.target = shape;
                    }
                        
                }
            }
        }

        this.hit = bestHit;
        if(numReflections > 0 && this.hit)
            this.hit.reflectedRay.castToShapes(shapes, numReflections -1);
        
        return this.hit !== null;
    }

    rays(): Ray[] {
        const rays: Ray[] = [];
        this.recursiveGetRays(rays);
        return rays;
    }

    hits(): RayHit[] {
        const hits: RayHit[] = [];
        this.recursiveGetHits(hits);
        return hits;
    }

    private recursiveGetHits(outHits: RayHit[]) {        
        if(this.hit == null)
            return;

        outHits.push(this.hit);
        this.hit.reflectedRay?.recursiveGetHits(outHits);
    }

    private recursiveGetRays(outRays: Ray[]) {
        outRays.push(this);
        this.hit?.reflectedRay?.recursiveGetRays(outRays);
    }
}