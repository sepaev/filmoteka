import * as basicLightbox from 'basiclightbox';
import { getRefs } from './refs';
import { loadEscListner } from './escClose';
import {
  addMovieToLocalStorage,
  loadDataFromLS,
  removeMovieFromLocalStorage,
} from './localStoragе';

import { fetchGetMovieById } from './getContent';
import modalFilmCardTpl from '../partials/templates/modalFilmCard.hbs';

// import * as parseApiData from './parseApiData';
import { getGenres, checkPoster, trimYear, parseFilmsData } from './parseApiData';
import { doLocalisation } from './localization';

const refs = getRefs();
const instance = basicLightbox.create(refs.modalFilm);
let cardItem = null;
let isAdded = false;

// const body = document.querySelector('body');
refs.modalWatchedBtn.addEventListener('click', onAddToLS);
refs.modalQueueBtn.addEventListener('click', onAddToLS);

export const onFilmClick = e => {
  refs.body.style.overflow = 'hidden';
  let targetCard = e.target.parentNode.parentNode;
  targetCard = targetCard.className === 'film' ? targetCard : targetCard.parentNode;
  const targetCardId = targetCard.dataset.id;

  if (targetCard.className === 'film') {
    // проверка на клик (нужно тестить. может нужно менять)
    // 1 тут получить id фильма
    // onAddToLS(e);
    instance.show();
    doLocalisation();

    // обработка клика по esc
    loadEscListner(instance);

    refs.modalFilmCloseBtn.addEventListener('click', e => {
      e.preventDefault;

      onFilmCloseClick(); //from "./js/footerDevelopers"  клик кнопке закрытия модалки
    });

    getFilmData(targetCardId);
    renderFilmCard(cardItem);

    // проверяет, есть ли карточка в ЛС
    checkAdd('watched', targetCardId, refs.modalWatchedBtn);
    checkAdd('queue', targetCardId, refs.modalQueueBtn);
  }
};

function getFilmData(targetCardId) {
  const currentArray = JSON.parse(localStorage.getItem('tempQuery'));

  // находит объект по айди, проверка на наличие фильма в временном хранилище
  cardItem = currentArray.find(cardItem => cardItem.id === Number(targetCardId));

  if (cardItem !== null) {
    // console.log('выполняется, если cardItem НЕ null, фильм есть в временном LS', cardItem);
    isAdded = true;
    return cardItem;
  }

  findCardItem(targetCardId).then(cardItem => {
    // console.log('выполняется, если cardItem null, фильма нет в временном LS', cardItem);
    renderFilmCard(cardItem);
    return cardItem;
  });
}

function findCardItem(targetCardId) {
  return fetchGetMovieById(targetCardId).then(data => {
    const genre_ids = data.genres.map(genre => genre.id);
    return {
      backdrop_path: data['backdrop_path'],
      id: data['id'],
      original_title: data['original_title'],
      overview: data['overview'],
      popularity: data['popularity'],
      poster_path: checkPoster(data['poster_path'], data['backdrop_path']),
      release_date: data['release_date'],
      title: data['title'],
      vote_average: data['vote_average'],
      vote_count: data['vote_count'],
      genres: getGenres(genre_ids),
      year: trimYear(data['release_date']),
    };
  });
}

const onFilmCloseClick = () => {
  instance.close();

  //убирает инлайн стили на кнопках в модалке и с body по закрытию
  refs.modalWatchedBtn.style.color = '';
  refs.modalWatchedBtn.style.backgroundColor = '';
  refs.modalQueueBtn.style.color = '';
  refs.modalQueueBtn.style.backgroundColor = '';

  refs.body.style.overflow = '';
};

function renderFilmCard(filmCard) {
  refs.modalCard.innerHTML = modalFilmCardTpl(filmCard);
  doLocalisation();
}

// добавляет или удаляет из LS
function onAddToLS(e) {
  const targetBtn = e.target;
  const localStorageKey = targetBtn === refs.modalWatchedBtn ? 'watched' : 'queue';
  const filmId = targetBtn.parentNode.previousElementSibling.lastElementChild.dataset.id;
  const currentDataArray = loadDataFromLS(localStorageKey);

  if (currentDataArray.find(film => film.id === Number(filmId)) !== undefined) {
    // console.log('есть в лс, удаляем');
    removeMovieFromLocalStorage(localStorageKey, getFilmData(filmId));
    isAdded = false;
    changeBtnStyle(targetBtn);
  } else {
    // console.log('нет в лс, добавляем');
    addMovieToLocalStorage(localStorageKey, getFilmData(filmId));
    isAdded = true;
    changeBtnStyle(targetBtn);
  }
}

// проверяет, есть ли фильм под соответствующим ключом в LS
function checkAdd(localStorageKey, targetCardId, targetBtn) {
  if (loadDataFromLS(localStorageKey).some(film => film.id === Number(targetCardId))) {
    isAdded = true;
  } else isAdded = false;
  changeBtnStyle(targetBtn);
}

// меняет стили кнопки
function changeBtnStyle(targetBtn) {
  targetBtn.style.color = isAdded ? '#fff' : '';
  targetBtn.style.backgroundColor = isAdded ? '#ff6b08' : '';
  isAdded = false;
}
