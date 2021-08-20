import * as basicLightbox   from 'basiclightbox';
import   modalFilmCardTpl   from '../partials/templates/modalFilmCard.hbs';
import { getRefs }          from './refs';
import { loadEscListner }   from './escClose';
import { fetchGetMovieById} from './getContent';
import { parseOneFilm }     from './parseApiData';
import { doLocalization }   from './localization';
import { locals }           from './consts';
import { doOpenGenre }      from './genresWork';

import { addMovieToLocalStorage, loadDataFromLS, removeMovieFromLocalStorage, } from './localStoragе';

const refs = getRefs(); 
/////////LISTNERS////////////////
// const body = document.querySelector('body');
refs.modalWatchedBtn.addEventListener('click', onAddToLS);
refs.modalQueueBtn.addEventListener('click', onAddToLS);

function getCurrentBase() {
  const refs = getRefs();
  if (refs.headerContainer.classList.value === 'header__container home') return 'tempQuery';
  if (refs.headerContainer.classList.value === 'header__container my-library') {
    if (refs.watchedBtn.classList.value === 'my-library__watched-btn current') return 'watched';
    if (refs.queueBtn.classList.value === 'my-library__queue-btn current') return 'queue';
  }
  return 'tempQuery';
}

export const checkTargetModalCard = (e, instance) => {
  if (e.target.nodeName === 'IMG') slider(e, getCurrentBase());
  if (e.target.nodeName === 'A')  doOpenGenre(e.target.id, e.target.textContent, instance);
}
/////////END////////////////

const instance = basicLightbox.create(refs.modalFilm, {
    onShow: (instance) => {refs.body.style.overflow = 'hidden';},
    onClose: (instance) => {refs.body.style.overflow = 'inherit';}
});

let cardItem = null;
let isAdded = false;

export const onFilmClick = e => {
  let targetCard = e.target.parentNode.parentNode;
  targetCard = targetCard.className === 'film' ? targetCard : targetCard.parentNode;
  const targetCardId = targetCard.dataset.id;
  if (e.target.id) { //проверка клик по жанрам
    doOpenGenre(e.target.id, e.target.textContent, null);
    return;
  }
  
  if (targetCard.className === 'film') {
    // instance.show(() => console.log('lightbox now visible'));
    instance.show();
    doLocalization();
    // обработка клика по модалке с фильмом
    refs.modalCard.addEventListener('click', e => {
      e.preventDefault;
      checkTargetModalCard(e, instance); //from "./js/sectionFilmoteka"  клик по зоне модалки с фильмом
    });  
    // обработка клика по esc
    loadEscListner(instance);
    
    refs.modalFilmCloseBtn.addEventListener('click', e => {
      e.preventDefault;
      onFilmCloseClick(); //from "./js/footerDevelopers"  клик кнопке закрытия модалки
    });
    renderFilmCard(getFilmData(targetCardId, getCurrentBase()));
    
    // проверяет, есть ли карточка в ЛС
    checkAdd('watched', targetCardId, refs.modalWatchedBtn);
    checkAdd('queue', targetCardId, refs.modalQueueBtn);
    
    return;
  }
};

function findAndAddPrevNext(currentArray, targetCardId) {
    let cardItem;
  for (let i = 0; i < currentArray.length; i++) {
      // находит целевую карточку фильма в целевом массиве фильмаов
    if (currentArray[i].id === Number(targetCardId)) {
      let prev = (i === 0) ? currentArray.length-1 : i - 1;
      let cur = i;
      let next = (i === currentArray.length-1) ? 0 : i + 1;

      cardItem = currentArray[i];
      //для слайдера
      cardItem.ids = {
        prev: currentArray[prev].id,
        cur: currentArray[cur].id,
        next: currentArray[next].id,
      }
      cardItem.posters = {
        prev: currentArray[prev].poster_path,
        cur: currentArray[cur].poster_path,
        next: currentArray[next].poster_path,
      }
      // end
      i = currentArray.length; // выходит из цикла
    }
  }
  return cardItem;
}

function slider(e, baseLS) {
  e.preventDefault;
  if (e.target.className === 'modal-card__image modal-card__image--next' || e.target.className === 'modal-card__image modal-card__image--prev') {
    const targetCardId = e.target.id
    const currentArray = JSON.parse(localStorage.getItem(baseLS));
    cardItem = findAndAddPrevNext(currentArray, targetCardId);
    renderFilmCard(cardItem);
  }
}

function getFilmData(targetCardId, base = 'tempQuery') {
  const localStorageArray = JSON.parse(localStorage.getItem(base));
  // находит объект по айди, проверка на наличие фильма в временном хранилище
    cardItem = findAndAddPrevNext(localStorageArray, targetCardId);
  
  if (cardItem) {
    // console.log('выполняется, если cardItem НЕ null, фильм есть в временном LS', cardItem);
    isAdded = true;
    return cardItem;
  }

  findCardItem(targetCardId).then(cardItem => {
    // console.log('выполняется, если cardItem null, фильма нет в временном LS', cardItem);
    // renderFilmCard(cardItem);
    return cardItem;
  });
}

function findCardItem(targetCardId) {
  return fetchGetMovieById(targetCardId).then(data => {
    cardItem = findAndAddPrevNext(data, targetCardId);
    cardItem.genre_ids = data.genres.map(genre => genre.id);
    return parseOneFilm(cardItem);
  });
}

const onFilmCloseClick = () => {
  instance.close();

  //убирает инлайн стили на кнопках в модалке и с body по закрытию
  refs.modalWatchedBtn.style.color = 'inherit';
  refs.modalWatchedBtn.style.backgroundColor = 'inherit';
  refs.modalQueueBtn.style.color = 'inherit';
  refs.modalQueueBtn.style.backgroundColor = 'inherit';

  refs.body.style.overflow = 'inherit';
};

function renderFilmCard(filmCard) {
  const refs = getRefs();
  refs.modalCard.innerHTML = modalFilmCardTpl(filmCard);
  doLocalization();
}

// добавляет или удаляет из LS
function onAddToLS(e) {
  const targetBtn = e.target;
  const localStorageKey = targetBtn === refs.modalWatchedBtn ? 'watched' : 'queue';
  const filmId = targetBtn.parentNode.previousElementSibling.children[2].dataset.id;
  const currentDataArray = loadDataFromLS(localStorageKey);

  if (currentDataArray.find(film => film.id === Number(filmId)) !== undefined) {
    // console.log('есть в лс, удаляем');
    removeMovieFromLocalStorage(localStorageKey, getFilmData(filmId, getCurrentBase()));
    isAdded = false;
    changeBtnStyle(targetBtn, localStorageKey);
  } else {
    // console.log('нет в лс, добавляем');
    addMovieToLocalStorage(localStorageKey, getFilmData(filmId, getCurrentBase()));
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
