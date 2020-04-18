
import RunDemo from './demos';

// ============================================================================
// Launch the canvas demo
// ============================================================================

const pathnames: string[] = window.location.pathname.split('/').filter(z => z !== "");
const demoName = pathnames[0] ?? 'LightBender';
console.log(pathnames);

// const app = new Demo2("canvas");
const app = RunDemo("canvas", demoName);
app.launch();



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