import home from '../partials/templates/home.hbs';
import myLibrary from '../partials/templates/myLibrary.hbs';
import { changeClasses } from './classWork';
import { loadListnersForHome, removeListnersForHome, loadListnersForMyLibrary, removeListnersForMyLibrary } from "./onLoad"
import { getRefs } from './refs';
import {showPageHome, showPageMyLibrary, hidePagination, showPagination} from './showPage'


export const changeHeader = (pageName, target) => {
    target.innerHTML = home() + myLibrary(); //добавляю контент, чтоб получить отсутствующие рефы
    const refs = getRefs();
    
    if (pageName === 'HOME') {
        removeListnersForMyLibrary(refs);
        removeListnersForHome(refs);
        target.innerHTML = home(); //меняю шапку
        const newRefs = getRefs(); //подгружаю новые рефы

        loadListnersForHome(newRefs);
        changeClasses(newRefs.headerNav.children[1].children[0], 'my-library', newRefs.headerNav.children[0].children[0], 'home');
        showPageHome(1);
        showPagination(refs);
    };
    
    if (pageName === 'MY LIBRARY') {
        // refs.galleryItems.innerHTML = '';
        removeListnersForHome(refs);
        target.innerHTML = myLibrary(); //меняю шапку
        const newRefs = getRefs(); //подгружаю новые рефы

        loadListnersForMyLibrary(newRefs);
        changeClasses(newRefs.headerNav.children[0].children[0], 'home', newRefs.headerNav.children[1].children[0], 'my-library');
        showPageMyLibrary('watched');
        hidePagination(refs);
    };
}