import * as basicLightbox from 'basiclightbox';
import { getRefs } from './refs'
const refs = getRefs();
const instance = basicLightbox.create(refs.modalFilm);

export const onFilmClick = (e) => {
    if (e.target.className !== "filmoteka-nav__pages--link") { // для примера

        instance.show(() => console.log('lightbox modal now visible'));
        // обработка клика по modal film close button
            refs.modalFilmCloseBtn.addEventListener('click', e => {
            e.preventDefault;
            onFilmCloseClick(); //from "./js/footerDevelopers"  клик по ссылке разработчиков
        });
    }
}

const onFilmCloseClick = () => {
    instance.close();
}

