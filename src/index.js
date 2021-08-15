import './sass/main.scss';
import { getRefs } from './js/refs'
import { debounce } from 'throttle-debounce';
import { consts } from "./js/consts";
import { onFilmClick } from "./js/sectionFilmoteka"
import { changeHeader } from "./js/changeHeader"
import { onPaginationNavClick } from "./js/paginationNav"
import { onDevLinkClick } from "./js/footerDevelopers"
import { onLoad } from "./js/onLoad"
import { activateScrollButton } from './js/btnScrollUp'
import { changeLanguage, doLocalisation } from './js/localization'
import './js/theme';
import './js/animationSVG';
import './js/signUP';
// import './js/ajax';
import './js/videoTrailer';
import './js/signIN';
import './js/sign_IN';

const refs = getRefs();
onLoad(refs); //функция загружает все что необходимо сделать при запуске
              // тут находятся слушатели на кнопки и инпуты шапки
// обработка клика по фильму
refs.filmsSection.addEventListener('click', e => {
    e.preventDefault;
    onFilmClick(e); //from "./js/sectionFilmoteka" клик по любой карточке фильма
});

// обработка клика по header nav
refs.headerNav.addEventListener('click', e => {
  e.preventDefault;
  if (e.target.nodeName === "A") {
    changeHeader(e.target.textContent, refs.headerDivToChange); //from "./js/headerNav" меняет шапку HOME/MY LIBRARY
  };
});

// обработка клика по control language
refs.languageLinks.addEventListener('click', e => {
  e.preventDefault;
  if (e.target.nodeName === "use") {
    const lang = e.target.parentNode.parentNode.dataset.set;
    changeLanguage(lang); //from "./js/localization" меняет язык сайта

  };
});

// обработка клика по header logo
refs.headerLogo.addEventListener('click', e => {
  changeHeader('HOME', refs.headerDivToChange); //from "./js/headerNav" всегда меняет шапку на HOME
});

// обработка клика по header pagination nav
refs.paginationNav.addEventListener('click', e => {
  e.preventDefault;

  if (e.target.nodeName === "A") {
    onPaginationNavClick(e.target.dataset.number);
  };
});

// обработка клика по header developer link
refs.devLink.addEventListener('click', e => {
    e.preventDefault;
    onDevLinkClick(e); //from "./js/footerDevelopers"  клик по ссылке разработчиков
});

// обработка клика по scroll UP
window.addEventListener('scroll',
  debounce(consts.DEBOUNCE_DELAY, (e) => {
     activateScrollButton(e);//from "./js/btnScrollUp"  клик по ссылке подняться вверх встраницы
   }));
