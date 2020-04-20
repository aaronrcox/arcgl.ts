

import { RenderTexture } from './renderTexture';

export class RenderTarget
{
    static get current(): RenderTexture {
        const len = RenderTexture.rendetTargetStack.length;
        return RenderTexture.rendetTargetStack[len-1];
    }
}