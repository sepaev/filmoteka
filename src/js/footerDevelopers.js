import * as basicLightbox from 'basiclightbox';
import { getRefs } from './refs';
import { loadEscListner } from './escClose';
import { doLocalization } from './localization';

const refs = getRefs();
const instance = basicLightbox.create(refs.modalDevs, {
    onShow: (instance) => {refs.body.style.overflow = 'hidden';},
    onClose: (instance) => {refs.body.style.overflow = 'inherit';}
});

export const onDevLinkClick = () => {
    instance.show();
    
    doLocalization();
     
// обработка клика по esc   
    loadEscListner(instance);
    
// обработка клика по modal developer close
    refs.devCloseBtn.addEventListener('click', e => {
    e.preventDefault;
    onDevCloseClick(); //from "./js/footerDevelopers"  клик по ссылке разработчиков
});
}

const onDevCloseClick = () => {
    instance.close();
}


