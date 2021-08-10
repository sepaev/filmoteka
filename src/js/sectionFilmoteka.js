import * as basicLightbox from 'basiclightbox';
import { getRefs } from './refs'
const refs = getRefs();
const instance = basicLightbox.create(refs.modalFilm);

export const onFilmClick = (e) => {
    if (e.target.className === "film") { // проверка на клик (нужно тестить. может нужно менять)
        // 1 тут получить id фильма
        instance.show(() => {console.log('lightbox modal now visible')});// 2 открывает модалку фильма
        // 3 после открытия реализовать функционал подгрузки innerHTML в модалку по id
        // 3.1 сначала методом find искать по id  совпаления в localStorage
        // 3.2 если не найдено - искать в API через функцию getContentById
        // обработка клика по modal film close button
            refs.modalFilmCloseBtn.addEventListener('click', e => {
            e.preventDefault;
            onFilmCloseClick(); //from "./js/footerDevelopers"  клик кнопке закрытия модалки
        });
    }
}

const onFilmCloseClick = () => {
    instance.close();
}

