
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
    const menuBtn = document.querySelector('.menu-btn');
    const pageNav = document.querySelector('.page-nav');
    const menuBackdrop = document.querySelector('.backdrop');

    const docsElem = document.querySelector('.docs-container');
    const canvasElem = document.querySelector('#canvas');

    let menuOpen = false;
    menuBtn.addEventListener('click', () => {
        hamburgerMenu(!menuOpen);
    });
    menuBackdrop.addEventListener('click', () => {
        hamburgerMenu(!menuOpen);
    });

    const hamburgerMenu = (visible: boolean) => {
        menuOpen = visible;
        if(menuOpen){ 
            docsElem.classList.add('open');
            canvasElem.classList.add('push-right-200');
            pageNav.classList.add('push-right-400');

            menuBtn.classList.add('open')
            menuBackdrop.classList.add('active');
        }
        else {
            docsElem.classList.remove('open');
            canvasElem.classList.remove('push-right-200');
            pageNav.classList.remove('push-right-400');

            menuBtn.classList.remove('open');
            menuBackdrop.classList.remove('active');
        }
    }

// ============================================================================
// TEST FORMS GENERATION
// ============================================================================

    enum EItemTest
    {
        OPTION_ONE,
        OPTION_TWO,
        OPTION_THREE
    }

    class Vec3
    {
        x: number = 0;
        y: number = 0;
        z: number = 0;
    }

    interface IVec3
    {
        x: number;
        y: number;
        z: number;
    }

    class TestForm {

        @editable({
            type: PropElementType.MARKDOWN
        })
        info: string = `
        # Hello world

        A Simple C++ example hello world program

            #include <iostream>
            int main(int argc, char **argv)
            {
                std::cout << "hello world" << std::endl;
                return 0;
            }
        `;

        @editable({
            label: '',
            description: 'Demos'
        })
        buttons: { [key:string]: ()=>void } = {
            RayCast: () => {
                window.location.hash = 'RayCastingDemo';
                hamburgerMenu(false);
            },
            RenderToTexture: () => {
                window.location.hash = 'RenderTextureDemo';
                hamburgerMenu(false);
            },
            LightBender: () => {
                window.location.hash = 'LightBender';
                hamburgerMenu(false);
            }
        }

        // @editable()
        // firstName: string = 'Aaron';

        // @editable()
        // pos: Vec3 = new Vec3();

        // @editable()
        // dir: IVec3 = {x: 0, y: 0, z: 0};

        // @editable({
        //     items_per_row: 3
        // })
        // vel: IVec3 = {x: 0, y: 0, z: 0};

        // @editable({
        //     description: 'transformation matrix',
        //     items_per_row: 4
        // })
        // mat: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

    }

    const docsContainerElem = document.querySelector('.docs') as HTMLElement;
    const testFormInstance = new TestForm();

    console.log(testFormInstance);

    generateForm(docsContainerElem, testFormInstance, () => {
        console.log(testFormInstance);
    });


}