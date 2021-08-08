import home from '../partials/templates/home.hbs';
import myLibrary from '../partials/templates/myLibrary.hbs';
import { addClass, removeClass } from './classWork';
import { loadListnersForHome, removeListnersForHome, loadListnersForMyLibrary, removeListnersForMyLibrary } from "./onLoad"
import { getRefs } from './refs';



export const changeHeader = (pageName, target) => {
    target.innerHTML = home() + myLibrary(); //добавляю контент, чтоб получить отсутствующие рефы
    const refs = getRefs();

    if (pageName === 'HOME') {
        removeListnersForMyLibrary(refs)
        removeListnersForHome(refs);
        target.innerHTML = home(); //меняю шапку
        loadListnersForHome(refs);
        addClass(refs.headerContainer, 'home');
        removeClass(refs.headerContainer, 'my-library');
    };
    
    if (pageName === 'MY LIBRARY') {
        removeListnersForHome(refs);
        target.innerHTML = myLibrary(); //меняю шапку
        loadListnersForMyLibrary(refs);
        addClass(refs.headerContainer, 'my-library');
        removeClass(refs.headerContainer, 'home');
    };
    console.log('Переключаем шапку на ' + pageName);
}