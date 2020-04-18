

import { App } from "../../engine/app";
import { Vec2, IVec2, Shape, Ray, RayHit } from "../../engine/math";



export class RayCastingDemo extends App {

    polygons: Shape[] = [];
    
    rays: Ray[] = [];
    rayHits: RayHit[] = [];

    allRays: Array<Ray> = [];

    elapsedTime: number = 0;

    constructor(htmlCanvasId: string) {
        super(htmlCanvasId);
    }

    async loadAssets(): Promise<void> {
        await super.loadAssets();

        const ww = this.canvas.width;
        const wh = this.canvas.height;
        const aw = ww/1.5;
        const ah = wh/1.5;
        const as = Math.min(aw, ah);
        const left = ww/2 - as/2;
        const right = ww/2 + as/2;
        const top =  wh/2 - as/2;
        const bottom = wh/2 + as/2;

        this.polygons.push( Shape.makeCircle(ww/2 - as/4, wh/2, as/10,4));
        this.polygons.push( Shape.makeCircle(ww/2 + as/4, wh/2, as/10,4));
        this.polygons.push( Shape.makeCircle(ww/2, wh/2 - as/4, as/10,4));
        this.polygons.push( Shape.makeCircle(ww/2, wh/2 + as/4, as/10,4));
        // this.polygons.push( Shape.makeCircle(right, 300, 50,4));
        // this.polygons.push( Shape.makeCircle(300, 500, 50,4));
        // this.polygons.push( Shape.makeCircle(400, 400, 50,4));

        this.polygons.push( Shape.makeBox(left, top, right-left, bottom-top));
        this.polygons.push( Shape.makeBox(0, 0,ww, wh));

        // this.polygons.push( Shape.makeLine(200, 100, 200, 400));
        // this.polygons.push( Shape.makeLine(500, 400, 500, 100));
        //this.polygons.push( Shape.makeLine(100, 300, 400, 300));
        //this.polygons.push( Shape.makeLine(400, 300, 100, 300));

        this.rays = [] // this.makeRayFan(100, 100, 64);


        // this.rays.push(new Ray(new Vec2(0, 0), new Vec2(0.707,-0.707)  ));
        // this.rays.push(new Ray(new Vec2(0, 0), new Vec2(0, 1)  ));
        // this.rays.push(new Ray(new Vec2(0, 0), new Vec2(0, 1)  ));
        // this.rays.push(new Ray(new Vec2(0, 0), new Vec2(0, 1)  ));
        // this.rays.push(new Ray(new Vec2(0, 0), new Vec2(0, 1)  ));
        // this.rays.push(new Ray(new Vec2(0, 0), new Vec2(0, 1)  ));
        // this.rays.push(new Ray(new Vec2(0, 0), new Vec2(0, 1)  ));

    }
    
    update() {
        super.update();
        this.elapsedTime += this.time.deltaTime;

        // this.updateRayPositions(this.input.mouse.pos.x, this.input.mouse.pos.y);
        // this.rays = this.makeRayFan(this.input.mouse.pos.x, this.input.mouse.pos.y, 64);
        // this.rays = this.makeRaysToShapes(this.input.mouse.pos.x, this.input.mouse.pos.y, this.polygons);

        this.elapsedTime = Math.PI / 3;
        //this.rays = this.makeRayLine(this.input.mouse.pos, new Vec2(Math.cos(this.elapsedTime), Math.sin(this.elapsedTime)), 10, 1);
        //this.rays = this.makeRaysToShapes(this.input.mouse.pos.x, this.input.mouse.pos.y, this.polygons);
        this.rays = this.makeRayFan(this.input.mouse.pos.x, this.input.mouse.pos.y, 64);

        this.rayHits = [];
        this.allRays = [];

        for(let i=0; i<this.rays.length; i++) {
            const r = this.rays[i]
            r.castToShapes(this.polygons, 0);
            this.rayHits.push(...r.hits());
            this.allRays.push(...r.rays());
        }
    }

    draw() {
        super.draw();
        this.renderer2d.begin();
       
        for(const p of this.polygons)
            this.drawShape(p);

        this.drawRays(this.allRays);
        // this.drawRayHits(this.rayHits);

        this.renderer2d.end();
    }

    drawShape(polygon: Shape) {
        this.renderer2d.saveState();
        this.renderer2d.drawLines(polygon.points, 1);
        this.renderer2d.popState();
    }



    updateRayPositions(xPos: number, yPos: number) {
        for(let i=0; i<this.rays.length; i++) {
            const r = this.rays[i];

            r.pos.x = xPos;
            r.pos.y = yPos;
        }
    }

    drawRays(rays: Ray[]) {
        for(const r of rays) {
            const p0 = r.pos;
            
            //this.renderer2d.drawCircle(p0.x, p0.y, 3, 4);

            const d = Math.min(r.hit?.distance ?? 2000);
            
            const p1 = Vec2.mul(r.dir, {x: d, y:d}).add(r.pos);
            this.renderer2d.drawLine(p0.x, p0.y, p1.x, p1.y, 1);
        }
    }

    drawRayHits(rayHits: RayHit[]) {
        for(const h of rayHits) {
            this.renderer2d.drawLine(h.incomingRay.pos.x, h.incomingRay.pos.y, h.point.x, h.point.y, 1);
        }
    }


    makeRayFan(xPos: number, yPos: number, numRays: number): Ray[] {
        const rays: Ray[] = [];
        for(let i=0; i<numRays;  i++) {
            const r = ((2.0 * Math.PI) / numRays) * i;
            rays.push(new Ray(
                new Vec2(xPos, yPos), 
                new Vec2(Math.sin(r), -Math.cos(r))
            ));
        }

        return rays;
    }

    makeRaysToShapes(xPos: number, yPos: number, shapes: Shape[]) {
        const pos = new Vec2(xPos, yPos);
        const rays: Ray[] = [];
        for(const shape of shapes) {
            for(const p of shape.points) {
                rays.push(new Ray(pos, Vec2.sub(p, pos).normalise()) );
            }
        }

        return rays;
    }

    makeRayLine(pos: IVec2, dir: IVec2, count: number, spacing: number) {
        const rays: Ray[] = [];
        const pDir = Vec2.perpendicular(dir);

        for(let i=0; i<count; i++) {
            rays.push(
                new Ray(Vec2.add(pos, Vec2.scale(pDir, i*spacing)), dir)
            )
        }
        return rays;
    }
}