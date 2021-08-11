
const checkTappedBtn = (event, instance) => {
    if (event.code === 'Escape') { 
        instance.close();
        window.removeEventListener('keydown', (event) => checkTappedBtn(event, instance));
    }    
}

export const loadEscListner = (instance) => {
    window.addEventListener('keydown', (event) => checkTappedBtn(event, instance)) 
}
