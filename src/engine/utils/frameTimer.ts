
import { Timer } from './timer';

export class FrameTimer extends Timer
{
    framesPerSecond: number = 0;
    
    private frameCounter: number = 0;
    private runningTime: number = 0;

    constructor() {
        super();
     }

    update() {
        this.stop();
        this.runningTime += this.deltaTime;
        this.frameCounter += 1;

        if(this.runningTime >= 1) {
            this.framesPerSecond = this.frameCounter;
            this.runningTime = 0;
            this.frameCounter = 0;
        }

        this.start();
    }
}
