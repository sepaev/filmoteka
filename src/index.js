import './sass/main.scss';
import { getRefs } from './js/refs'

import { onFilmClick } from "./js/sectionFilmoteka"
import { changeHeader } from "./js/changeHeader"
import { onPaginationNavClick } from "./js/paginationNav"
import { onDevLinkClick } from "./js/footerDevelopers"
import { onLoad } from "./js/onLoad"

const refs = getRefs();
onLoad(refs); //функция загружает все что необходимо сделать при запуске
              // тут находятся слушатели на кнопки и инпуты шапки
console.log("Подключенные рефы ↓");
console.dir(refs); //чтоб сразу увидеть все подключенные рефы. Позже все консоли удалятся


// обработка клика по фильму
refs.filmsSection.addEventListener('click', e => {
    e.preventDefault;
    onFilmClick(e, refs); //from "./js/sectionFilmoteka" клик по любой карточке фильма
});

// обработка клика по header nav
refs.headerNav.addEventListener('click', e => {
  e.preventDefault;
  if (e.target.nodeName === "A") {
    changeHeader(e.target.textContent, refs.headerDivToChange); //from "./js/headerNav" меняет шапку HOME/MY LIBRARY
  };
});

// обработка клика по header logo
refs.headerLogo.addEventListener('click', e => {
  changeHeader('HOME', refs.headerDivToChange); //from "./js/headerNav" всегда меняет шапку на HOME
});

// обработка клика по header pagination nav
refs.paginationNav.addEventListener('click', e => {
  e.preventDefault;
  if (e.target.nodeName === "A") { onPaginationNavClick(e.target.textContent) };
});
// обработка клика по header developer link
refs.devLink.addEventListener('click', e => {
    e.preventDefault;
    onDevLinkClick(e, refs); //from "./js/footerDevelopers"  клик по ссылке разработчиков
});




// пример дебаунса и троттла из нод модулей БУДЬТЕ ВНИМАТЕЛЬНЫ!!!! 
// В ЭТОМ НПМ ПАКЕТЕ ВНАЧАЛЕ DELAY ПОТОМ ФУНКЦИЯ

// import { debounce } from 'throttle-debounce';
// import { throttle } from 'throttle-debounce';

// const debounceFunc = debounce(DELAY, CALLBACK);
// const throttleFunc = debounce(DELAY, CALLBACK);
