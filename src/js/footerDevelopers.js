import * as basicLightbox from 'basiclightbox';
import { getRefs } from './refs';
import { loadEscListner } from './escClose';
import { doLocalisation } from './localization';

const refs = getRefs();
const instance = basicLightbox.create(refs.modalDevs);

export const onDevLinkClick = () => {
    instance.show();
    doLocalisation();
     
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


