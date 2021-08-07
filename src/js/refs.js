export const getRefs = () => {
  return {
    searchBox: document.querySelector('.header-search__input'),
    searchButton: document.querySelector('.header-search__button'),
    filmsSection: document.querySelector('.filmoteka'),
    headerNav: document.querySelector('.header-nav__list'),
    prevButton: document.querySelector('.filmoteka-nav__left'),
    nextButton: document.querySelector('.filmoteka-nav__right'),
    devLink: document.querySelector('.footer__dev--link'),
    paginationNav: document.querySelector('.filmoteka-nav'),
    modalFilm: document.querySelector('.modal-film'),
    modalDevs: document.querySelector('.modal-devs'),
    //кнопка WATCHED
    //кнопка QUEUE
    //кнопка Закрытия модалки
    //кнопка ADD TO WATCHED
    //кнопка ADD TO QUEUE
  };
};