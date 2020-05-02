
import RunDemo from './demos';
import { App } from './engine/app';

import { generateForm, editable, displayName, description, selectEnumOptions, markdown, FormElementType } from './engine/forms';

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
    
    @editable({
        label: 'Name',
        description: 'The quick brown fox'
    })
    name: string = "hello world";

    @editable({
        label: 'Do you smoke',
        description: 'The quick brown fox'
    })
    smokes: boolean = true;

    @editable({
        label: 'Family',
        description: 'The quick brown fox'
    })
    family: string[] = ['mum', 'dad', 'joel'];

    @editable({
        label: 'Numbers',
        description: 'The quick brown fox'
    })
    numbers: number[] = [10, 20, 30];

    @editable({
        label: null
    })
    age: number = 18;

    @editable()
    dob: Date = new Date();

    @editable({ dropdown_enum_options: EItemTest})
    options: number = EItemTest.OPTION_ONE;

    @editable({
        type: FormElementType.MARKDOWN
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

    @editable()
    close() {
        alert('hello');
    }

    @editable()
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

    @editable({
        label: ''
    })
    people: { [key:string]: string } = {
        one: 'aaron',
        two: 'joel'
    }
}

const docsElem = document.querySelector('.docs') as HTMLElement;
const testFormInstance = new TestForm();

generateForm(docsElem, testFormInstance, () =>{
    testFormInstance.name += '_a';
});

console.log(testFormInstance);

setInterval(() => {
    testFormInstance.age += 1;
    // testFormInstance.numbers.push(10);
    testFormInstance.people = {...testFormInstance.people, one: testFormInstance.age.toString()};
}, 5000);