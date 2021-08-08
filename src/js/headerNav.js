import home from '../partials/templates/home.hbs';
import myLibrary from '../partials/templates/myLibrary.hbs';
import { loadListnersForHome, removeListnersForHome, loadListnersForMyLibrary, removeListnersForMyLibrary } from "./onLoad"
import { getRefs } from './refs';



export const changeHeader = (pageName, target) => {
    target.innerHTML = home() + myLibrary();
    const refs = getRefs();

    if (pageName === 'HOME') {
        removeListnersForMyLibrary(refs)
        removeListnersForHome(refs);
        target.innerHTML = home(); //меняю шапку
        loadListnersForHome(refs);
    };
    
    if (pageName === 'MY LIBRARY') {
        removeListnersForHome(refs);
        target.innerHTML = myLibrary(); //меняю шапку
        loadListnersForMyLibrary(refs);
    };
    console.log('Переключаем шапку на ' + pageName);
}