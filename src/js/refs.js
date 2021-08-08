export const getRefs = () => {
  return {
    searchBox: document.querySelector('.header-search__input'),
    searchButton: document.querySelector('.header-search__button'),
    filmsSection: document.querySelector('.filmoteka'),
    headerNav: document.querySelector('.header-nav__list'),
    headerLogo: document.querySelector('.header__logo-icon'),
    headerDivToChange: document.querySelector('.header-search'),
    headerContainer: document.querySelector('.header__container'),
    prevButton: document.querySelector('.filmoteka-nav__left'),
    nextButton: document.querySelector('.filmoteka-nav__right'),
    devLink: document.querySelector('.footer__dev--link'),
    paginationNav: document.querySelector('.filmoteka-nav'),
    modalFilm: document.querySelector('.modal-film'),
    modalDevs: document.querySelector('.modal-devs'),
    watchedBtn: document.querySelector('.my-library__watched-btn'),
    queueBtn: document.querySelector('.my-library__queue-btn'),
      //кнопка Закрытия модалки
    //кнопка ADD TO WATCHED
    //кнопка ADD TO QUEUE
  };
};