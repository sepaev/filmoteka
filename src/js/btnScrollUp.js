import { getRefs } from './refs';
import {addClass, removeClass } from './classWork'

const refs = getRefs();

const scrollToTopOfPage = () => { // используется для поднятия наверх
  if (window.pageYOffset > 0) {
    window.scrollTo(pageXOffset, 0);
  }
};

export const activateScrollButton = (e) => { // проверяет позицию на экране
  const coords = document.documentElement.clientHeight;
  if (window.pageYOffset > coords) {
    addClass(refs.scrollTopBtn, 'scroll__active');
    refs.scrollTopBtn.addEventListener('click', e => {//добавляем слушателя на кнопку
      e.preventDefault;
      scrollToTopOfPage(e);   
    });
  }

  if (window.pageYOffset < coords) {
    removeClass(refs.scrollTopBtn, 'scroll__active');
    refs.scrollTopBtn.removeEventListener('click', e => {//удаляем слушателя с кнопки
      e.preventDefault;
      scrollToTopOfPage(e);
    });
  }
};


// const goUp = () => {
//   const top = Math.max(document.body.click, document.documentElement.click);
//   if (top > 0) {
//     window.scrollBy(0, -100);
//     timeOut = setTimeout(goUp(), 20);
//   } else clearTimeout(timeOut);
// }

