
import RunDemo from './demos';
import { App } from './engine/app';

import { generateForm, editable, displayName, description, selectEnumOptions, markdown } from './engine/forms';

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
    const menuList = document.querySelector('.page-nav ul');
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
            canvasElem.classList.add('push-left-200');
            pageNav.classList.add('push-right-400');

            menuBtn.classList.add('open')
            // menuList.classList.add('open');
            menuBackdrop.classList.add('active');
        }
        else {
            docsElem.classList.remove('open');
            canvasElem.classList.remove('push-right-200');
            canvasElem.classList.remove('push-left-200');
            pageNav.classList.remove('push-right-400');

            menuBtn.classList.remove('open');
            // menuList.classList.remove('open');
            menuBackdrop.classList.remove('active');
        }
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

class TestForm {
    
    @editable()
    @displayName('Name') 
    @description("The quick brown fox")
    name: string = "hello world";

    @editable()
    @displayName('Do you smoke')
    @description("The quick brown fox")
    smokes: boolean = true;

    @editable()
    @displayName('Family') 
    @description("The quick brown fox")
    family: string[] = ['mum', 'dad', 'joel'];

    @editable()
    @description("The quick brown fox")
    booleans: number[] = [10, 20, 30];

    @editable()
    @displayName('Age')
    @description("the quick brown fox")
    age: number = 18;


    @editable()
    @description("the quick brown fox")
    dob: Date = new Date();

    @editable()
    @selectEnumOptions(EItemTest)
    @description("the quick brown fox")
    options: EItemTest = EItemTest.OPTION_ONE;


    @editable()
    @markdown()
    @description("the quick brown fox")
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

    @editable()
    @description("Close")
    @displayName('CLOSE')
    close() {
        const docsElem = document.querySelector('.docs-container');
        const canvasElem = document.querySelector('#canvas');
        docsElem.classList.remove('open');
        canvasElem.classList.remove('push-right');
        console.log(docsElem);
        alert('hello');
    }

    @editable()
    @displayName(' ')
    buttons: { [key:string]: ()=>void } = {
        one: () => {
            console.log('hello')
        },
        two: () => {
            console.log('world')
        },
        three: () => {
            console.log('world')
        }
    }

    @editable()
    @displayName(' ')
    people: { [key:string]: string } = {
        one: 'aaron',
        two: 'joel'
    }
}

const docsElem = document.querySelector('.docs') as HTMLElement;
const testFormInstance = new TestForm();

generateForm(docsElem, testFormInstance, () =>{
    console.log(testFormInstance.family);
});
