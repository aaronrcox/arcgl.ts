
import RunDemo from './demos';
import { App } from './engine/app';

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
    const menuList = document.querySelector('.page-nav ul');
    const menuBackdrop = document.querySelector('.backdrop');
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
            menuBtn.classList.add('open')
            menuList.classList.add('open');
            menuBackdrop.classList.add('active');
        }
        else {
            menuBtn.classList.remove('open');
            menuList.classList.remove('open');
            menuBackdrop.classList.remove('active');
        }
    }

}