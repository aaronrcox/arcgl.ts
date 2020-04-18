
import RunDemo from './demos';

// ============================================================================
// Launch the canvas demo
// ============================================================================

function getDemoNameFromHash() {
    const pathnames: string[] = window.location.hash.substr(1).split('/').filter(z => z !== "");
    const demoName = pathnames[0] ?? 'LightBender';
    return demoName;
}

function runApp() {
    const app = RunDemo("canvas", getDemoNameFromHash());
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
    let menuOpen = false;
    menuBtn.addEventListener('click', () => {
        menuOpen = !menuOpen;
        if(menuOpen){ 
            menuBtn.classList.add('open')
            menuList.classList.add('open');
        }
        else {
            menuBtn.classList.remove('open');
            menuList.classList.remove('open');
        }
        console.log('clicky');
        
    })

}