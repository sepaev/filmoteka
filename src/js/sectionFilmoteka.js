import * as basicLightbox from 'basiclightbox';
import { getRefs } from './refs';
import { loadEscListner } from './escClose';

import { fetchGetMovieById } from './getContent';
import modalFilmCardTpl from '../partials/templates/modalFilmCard.hbs';

import * as parseApiData from './parseApiData';

const refs = getRefs();
const instance = basicLightbox.create(refs.modalFilm);

const body = document.querySelector('body');

export const onFilmClick = e => {
  // body.style.overflow = 'hidden';

  let targetCard = e.target.parentNode.parentNode;
  targetCard = targetCard.className === 'film' ?  targetCard : targetCard.parentNode
  const targetCardId = targetCard.dataset.id;
  if (targetCard.className === 'film') {
    // проверка на клик (нужно тестить. может нужно менять)
    // 1 тут получить id фильма
    instance.show(() => { 
      // берет данные по фильмам из временного хранилища и парсит их в переменную
      const currentArray = JSON.parse(localStorage.getItem('tempQuery'));
      // находит объект по айди
      const currentItem = currentArray.find(currentItem => currentItem.id === Number(targetCardId));

      if (currentItem === undefined) {
        fetchGetMovieById(targetCardId).then(data => console.log(data));
      }

      refs.modalCard.innerHTML = modalFilmCardTpl(currentItem);
    });

    // 2 открывает модалку фильма
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
};

const onFilmCloseClick = () => {
  body.style.overflow = '';

  instance.close();
};
