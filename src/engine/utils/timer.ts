
export class Timer {
    deltaTime: number = 0;
    startTime: number = 0;
    stopTime: number = 0;

    start() {
        this.stopTime = 0;
        this.startTime = performance.now() / 1000;
    }
    stop() {
        this.stopTime = performance.now() / 1000;
        this.deltaTime = this.stopTime - this.startTime;
    }
}