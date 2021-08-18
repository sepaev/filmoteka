import { getRefs } from "./refs";

const checkTappedBtn = (event, instance) => {
    if (event.code === 'Escape') { 
        instance.close();
        getRefs().body.style.overflow = 'inherit';
        window.removeEventListener('keydown', (event) => checkTappedBtn(event, instance));
    }    
}

export const loadEscListner = (instance) => {
    window.addEventListener('keydown', (event) => checkTappedBtn(event, instance)) 
}
