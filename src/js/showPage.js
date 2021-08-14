import {getMoviesPagination } from "./getContent"
import Notiflix from "notiflix";
import { renderAllGallery } from "../js/renderGallery"
import { getRefs } from "./refs";
import { parseFilmsData } from './parseApiData'
import { loadDataFromLS } from './localStoragе'
import { renderPaginationBtn } from './paginationNav'
import { makeButtonActiv } from './paginationNav'

Notiflix.Notify.init({
    position: 'center-top',
    distance: '180px',
}); 

export const hidePagination = (refs) => {
    refs.paginationNav.style.display = 'none';
    refs.footer.style.position = 'absolute';
    refs.footer.style.width = '100vw';
    const docHeight = document.documentElement.scrollHeight + 150;
    const winHeight = window.innerHeight + 150;
    refs.footer.style.top = (docHeight > winHeight) ? docHeight : winHeight;
}
export const showPagination = (refs) => {
    refs.paginationNav.style.display = 'flex';
    refs.footer.style.position = 'inherit';
    refs.footer.style.top = 'inherit';
}

const doOnSuccess = (totalResults, totalPages, pageNumber) => {
    const refs = getRefs();
    pageNumber > 1?
    Notiflix.Notify.success('You are watching ' + pageNumber + ' page of total ' + totalPages + ' pages')
    :
    Notiflix.Notify.success('Found ' + totalResults + ' results. Total ' + totalPages + ' pages');
    showPagination(refs);
    refs.headerError.style.display = 'none';
    if (totalResults < 20) {
        hidePagination(refs);
    }
};

const doOnFailure = () => {
    const refs = getRefs();
    Notiflix.Notify.failure('Search result not successful. Enter the correct movie name and');
    refs.headerError.style.display = 'block';
    hidePagination(refs);
}

export const showPageHome = (pageNumber) => {
    Notiflix.Loading.pulse();
    const refs = getRefs();
    getMoviesPagination(refs.searchBox.value, pageNumber) //async
    .then(data => {
        Notiflix.Loading.remove();
        if (data.total_results) {
            doOnSuccess(data.total_results, data.total_pages, pageNumber);
        } else {
            doOnFailure();
        }
        renderPaginationBtn(data.total_pages, pageNumber)
        makeButtonActiv(pageNumber)
        return data.results;
    })
        .then(films => {
           const filmData = parseFilmsData(films);
           const string = JSON.stringify(filmData);
           localStorage.setItem('tempQuery', string);
           return filmData;
        })
        .then(films => {
            renderAllGallery(films);// перебирает обьект и выводит карточки фильмов
    })
      .catch(error => {
       Notiflix.Loading.remove();
       console.log(error);
   });
}

export const showPageMyLibrary = (keyName) => {
    Notiflix.Loading.pulse();
    window.setTimeout(Notiflix.Loading.remove, 200);// для красоты
    const watchedArr = loadDataFromLS(keyName);
    renderAllGallery(watchedArr);// перебирает обьект и выводит карточки фильмов
    
    Notiflix.Notify.init({
        position: 'center-top',
        distance: '195px',
    }); 
Notiflix.Notify.success('You have ' +watchedArr.length + ' films in your library "' +keyName + '"');
}
