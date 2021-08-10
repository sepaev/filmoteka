import * as basicLightbox from 'basiclightbox';
import { getRefs } from './refs'
const refs = getRefs();

const instance = basicLightbox.create(refs.modalDevs);

export const onDevLinkClick = () => {
    instance.show();
// обработка клика по modal developer close
    refs.devCloseBtn.addEventListener('click', e => {
    e.preventDefault;
    onDevCloseClick(); //from "./js/footerDevelopers"  клик по ссылке разработчиков
});
}

const onDevCloseClick = () => {
    instance.close();
}