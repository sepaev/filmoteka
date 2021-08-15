import * as basicLightbox from 'basiclightbox';
import { getRefs } from './refs';
import { loadEscListner } from './escClose';
import {addMovieToLocalStorage, removeMovieFromLocalStorage} from './localStoragе';

import { fetchGetMovieById } from './getContent';
import modalFilmCardTpl from '../partials/templates/modalFilmCard.hbs';

// import * as parseApiData from './parseApiData';
import { getGenres, checkPoster, trimYear, parseFilmsData } from './parseApiData';
import { doLocalisation } from './localization';

const refs = getRefs();
const instance = basicLightbox.create(refs.modalFilm);
let currentItem = null;

// const body = document.querySelector('body');
refs.modalWatchedBtn.addEventListener('click', onAddToWatched);
refs.modalQueueBtn.addEventListener('click', onAddToQueue);

// console.log(refs.modalWatchedBtn);

export const onFilmClick = e => {
  // body.style.overflow = 'hidden';
  let targetCard = e.target.parentNode.parentNode;
  targetCard = targetCard.className === 'film' ? targetCard : targetCard.parentNode;
  const targetCardId = targetCard.dataset.id;
  if (targetCard.className === 'film') {
    // проверка на клик (нужно тестить. может нужно менять)
    // 1 тут получить id фильма
    instance.show(() => {
      // берет данные по фильмам из временного хранилища и парсит их в переменную
      const currentArray = JSON.parse(localStorage.getItem('tempQuery'));
      // находит объект по айди, проверка на наличие фильма в временном хранилище
      currentItem = currentArray.find(currentItem => currentItem.id === Number(targetCardId));

      if (currentItem !== undefined) {
        renderFilmCard(currentItem);
        doLocalisation();
        return;
      }

      fetchGetMovieById(targetCardId).then(data => {
        const genre_ids = data.genres.map(genre => genre.id);

        currentItem = parseFilmsData(data);
        renderFilmCard(currentItem);
        doLocalisation();
        // window.setTimeout(doLocalisation, 100);
        return;
      }); 
    });

    // обработка клика по esc
    loadEscListner(instance);

    refs.modalFilmCloseBtn.addEventListener('click', e => {
      e.preventDefault;
      onFilmCloseClick(); //from "./js/footerDevelopers"  клик кнопке закрытия модалки
    });
  }
};

const onFilmCloseClick = () => {
  // body.style.overflow = '';

  instance.close();
};

function renderFilmCard(filmCard) {
  // isAddedtoWatched(filmCard);
  // isAddedtoQueue(filmCard);
  refs.modalCard.innerHTML = modalFilmCardTpl(filmCard);
  doLocalisation();
}

function onAddToWatched(currentItem) {
  addMovieToLocalStorage('watced', currentItem )
  // isAddedtoWatched(currentItem);
  // if (!localStorageApi.getMovies('watched').some(film => film.id === currentItem.id)) {
  //   localStorageApi.addMovie('watched', currentItem);
  // }
}

function onAddToQueue(currentItem) {
    addMovieToLocalStorage('queue', currentItem )
    // isAddedtoQueue(currentItem);
  // console.log(localStorageApi.getMovies('queue').some(film => film.id === currentItem.id));
  // if (!localStorageApi.getMovies('queue').some(film => film.id === currentItem.id)) {
  //   localStorageApi.addMovie('queue', currentItem);
  // }
}

// function isAddedtoWatched(currentItem) {
//   if (localStorageApi.getMovies('watched').some(film => film.id === currentItem.id)) {
//     refs.modalWatchedBtn.textContent = 'Already in watched!';
//   } else refs.modalWatchedBtn.textContent = 'add to watched';
// }

// function isAddedtoQueue(currentItem) {
//   if (localStorageApi.getMovies('queue').some(film => film.id === currentItem.id)) {
//     refs.modalQueueBtn.textContent = 'Already in Queue!';
//   } else refs.modalQueueBtn.textContent = 'add to Queue';
// }

