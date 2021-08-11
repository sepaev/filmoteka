import * as basicLightbox from 'basiclightbox';
import { getRefs } from './refs';
import { loadEscListner } from './escClose';

const refs = getRefs();
const instance = basicLightbox.create(refs.modalFilm);


export const onFilmClick = (e) => {
    const targetCard = e.target.parentNode.parentNode;
    const targetCardId = targetCard.dataset.id;
    if (targetCard.className === "film") { // проверка на клик (нужно тестить. может нужно менять)
        // 1 тут получить id фильма
        instance.show(() => {refs.modalCard.innerHTML = 'id ' + targetCardId;});// 2 открывает модалку фильма         
        // обработка клика по esc   
        loadEscListner(instance);

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

