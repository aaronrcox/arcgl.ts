
import RunDemo from './demos';
import { App } from './engine/app';

import { generateForm, editable, PropElementType } from './engine/forms';

// ============================================================================
// Launch the canvas demo
// ============================================================================

let app: App = null;

function getDemoNameFromHash() {
    const pathnames: string[] = window.location.hash.substr(1).split('/').filter(z => z !== "");
    const demoName = pathnames[0] ?? 'LightBender';
    return demoName;
}

function runApp() {
    if(app) {
        app.destroy();
        app = null;
    }
    app = RunDemo("canvas", getDemoNameFromHash());
    app.launch();
}

// listen for hach value change events
window.addEventListener('hashchange', () => {
    runApp();
});

window.onload = (() => {
    runApp();
});


// ============================================================================
// APP MENU
// ============================================================================
{
    const menuBtn = document.querySelector('#main-menu-button');
    const mainMenuContainerElem = document.querySelector('.main-menu-container');
    const menuMenuElem = document.querySelector('.main-menu') as HTMLElement;

    const docsBtn = document.querySelector('#docs-menu-button');
    const docsMenuContainerElem = document.querySelector('.docs-menu-container');

    const pageNav = document.querySelector('.page-nav');
    const menuBackdrop = document.querySelector('.backdrop');

    
    const canvasElem = document.querySelector('#canvas');

    let menuOpen = false;
    let docsOpen = false;

    menuBtn.addEventListener('click', () => {
        mainMenuOpen(!menuOpen);
    });
    docsBtn.addEventListener('click', () => {
        console.log('clicky');
        docsMenuOpen(!docsOpen);
    });
    menuBackdrop.addEventListener('click', () => {
        mainMenuOpen(!menuOpen);
    });


    const mainMenuOpen = (visible: boolean) => {
        menuOpen = visible;
        if(menuOpen) { 
            mainMenuContainerElem.classList.add('open');
            canvasElem.classList.add('push-right-200');
            pageNav.classList.add('push-right-400');

            menuBtn.classList.add('open')
            menuBackdrop.classList.add('active');
        }
        else {
            mainMenuContainerElem.classList.remove('open');
            canvasElem.classList.remove('push-right-200');
            pageNav.classList.remove('push-right-400');

            menuBtn.classList.remove('open');
            menuBackdrop.classList.remove('active');
        }
    }

    const docsMenuOpen = (visible: boolean) => {
        docsOpen = visible;
        if(docsOpen) { 
            docsMenuContainerElem.classList.add('open');
            docsBtn.classList.add('open')
            canvasElem.classList.add('push-left-200');
            pageNav.classList.add('push-left-400');
        }
        else {
            docsMenuContainerElem.classList.remove('open');
            docsBtn.classList.remove('open')
            canvasElem.classList.remove('push-left-200');
            pageNav.classList.remove('push-left-400');
        }
    }

// ============================================================================
// TEST FORMS GENERATION
// ============================================================================

    class TestForm {

        @editable({
            type: PropElementType.MARKDOWN
        })
        info: string = `
        # ARCGL

        A simple typescript / webgl framework
        for creating interesting interactive demos
        `;

        @editable({
            label: '',
            description: 'Demos',
        })
        buttons: { [key:string]: ()=>void } = {
            RayCast: () => {
                window.location.hash = 'RayCastingDemo';
            },
            SpriteRotationAroundOrigin: () => {
                window.location.hash = 'RectRotationDemo';
            },
            RenderToTexture: () => {
                window.location.hash = 'RenderTextureDemo';
            },
            LightBender: () => {
                window.location.hash = 'LightBender';
            }
        }
    }

    
    const testFormInstance = new TestForm();

    console.log( JSON.stringify(testFormInstance) );

    generateForm(menuMenuElem, testFormInstance, () => {
        console.log(testFormInstance);
    });

}