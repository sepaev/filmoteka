import './sass/main.scss';
import { debounce } from 'throttle-debounce';
import { getRefs } from './js/refs'
import { consts } from "./js/consts";
import { onSearchBoxChange, onSearchBoxFocus } from "./js/searchBox"
import { onSearchButtonClick } from "./js/searchButton"
import { onFilmClick } from "./js/sectionFilmoteka"
import { onHeaderNavClick } from "./js/headerNav"
import { onPaginationNavClick } from "./js/paginationNav"
import { onDevLinkClick } from "./js/footerDevelopers"

const refs = getRefs();
console.log("Подключенные рефы ↓");
console.dir(refs);
//обработка инпута
refs.searchBox.addEventListener('input',
  debounce(consts.DEBOUNCE_DELAY, (e) => {
    onSearchBoxChange(e);
  }))

refs.searchBox.addEventListener('focus', e => onSearchBoxFocus(e));
  
// обработка кнопки поиска
refs.searchButton.addEventListener('click', e => {
  e.preventDefault;
  onSearchButtonClick(e);
});

// обработка клика по фильму
refs.filmsSection.addEventListener('click', e => {
    e.preventDefault;
    onFilmClick(e, refs);
});

// обработка клика по header nav
refs.headerNav.addEventListener('click', e => {
    e.preventDefault;
    onHeaderNavClick(e);
});

// обработка клика по header pagination nav
refs.paginationNav.addEventListener('click', e => {
    e.preventDefault;
    onPaginationNavClick(e);
});

// обработка клика по header developer link
refs.devLink.addEventListener('click', e => {
    e.preventDefault;
    onDevLinkClick(e, refs);
});




// пример дебаунса и троттла из нод модулей БУДЬТЕ ВНИМАТЕЛЬНЫ!!!! 
// В ЭТОМ НПМ ПАКЕТЕ ВНАЧАЛЕ DELAY ПОТОМ ФУНКЦИЯ

// import { debounce } from 'throttle-debounce';
// import { throttle } from 'throttle-debounce';

// const debounceFunc = debounce(DELAY, CALLBACK);
// const throttleFunc = debounce(DELAY, CALLBACK);
