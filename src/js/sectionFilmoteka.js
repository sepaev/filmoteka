import * as basicLightbox   from 'basiclightbox';
import modalFilmCardTpl     from '../partials/templates/modalFilmCard.hbs';
import { getRefs }          from './refs';
import { loadEscListner }   from './escClose';
import { fetchGetMovieById} from './getContent';
import { parseOneFilm }     from './parseApiData';
import { doLocalisation }   from './localization';
import { locals }           from './consts';
import { addMovieToLocalStorage, loadDataFromLS, removeMovieFromLocalStorage, } from './localStoragе';

const refs = getRefs();
const instance = basicLightbox.create(refs.modalFilm);
let cardItem = null;
let isAdded = false;

// const body = document.querySelector('body');
refs.modalWatchedBtn.addEventListener('click', onAddToLS);
refs.modalQueueBtn.addEventListener('click', onAddToLS);

export const onFilmClick = e => {
  // refs.body.style.overflow = 'hidden';
  let targetCard = e.target.parentNode.parentNode;
  targetCard = targetCard.className === 'film' ? targetCard : targetCard.parentNode;
  const targetCardId = targetCard.dataset.id;

  if (targetCard.className === 'film') {
    // проверка на клик (нужно тестить. может нужно менять)
    // 1 тут получить id фильма
    // onAddToLS(e);
    instance.show();
    refs.body.style.overflow = 'hidden';
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
    data.genre_ids = data.genres.map(genre => genre.id);
    return parseOneFilm(data);
  });
}

const onFilmCloseClick = () => {
  instance.close();
  refs.body.style.overflow = 'inherit';

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
    changeBtnStyle(targetBtn, localStorageKey);
  } else {
    // console.log('нет в лс, добавляем');
    addMovieToLocalStorage(localStorageKey, getFilmData(filmId));
    isAdded = true;
    changeBtnStyle(targetBtn, localStorageKey);
  }
}

// проверяет, есть ли фильм под соответствующим ключом в LS
function checkAdd(localStorageKey, targetCardId, targetBtn) {
  if (loadDataFromLS(localStorageKey).some(film => film.id === Number(targetCardId))) {
    isAdded = true;
  } else isAdded = false;
  changeBtnStyle(targetBtn, localStorageKey);
}

// меняет стили кнопки
function changeBtnStyle(targetBtn, keyLS) {
  targetBtn.style.color = isAdded ? '#fff' : '';
  targetBtn.style.backgroundColor = isAdded ? '#ff6b08' : '';
  targetBtn.textContent = isAdded ? locals.getString('remove_from_' + keyLS +'_text') : locals.getString('add_to_' + keyLS +'_text')
  isAdded = false;
}
