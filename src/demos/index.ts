import { LightBender } from './lightBender';
import { RayCastingDemo } from './rayCasting';
import { LineRenderingDemo } from './lineRendering';
import { RenderTextureDemo } from './renderTextureDemo';
import { App } from '../engine/app';


function RunDemo(canvasId: string, name: string) {
    switch(name) {
        case 'LightBender': return new LightBender(canvasId);
        case 'RayCastingDemo': return new RayCastingDemo(canvasId);
        case 'LineRenderingDemo': return new LineRenderingDemo(canvasId);
        case 'RenderTextureDemo': return new RenderTextureDemo(canvasId);
        default: return new App(canvasId);
    }
}

export default RunDemo;