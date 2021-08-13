import {getMoviesPagination } from "./getContent"
import Notiflix from "notiflix";
import { renderAllGallery } from "../js/renderGallery"
import { getRefs } from "./refs";
import { parseFilmsData } from './parseApiData'
import { loadDataFromLS } from './localStoragе'
import { renderPaginationBtn } from './paginationNav'


export const showPageHome = (pageNumber) => {
    Notiflix.Loading.pulse();
    const refs = getRefs();
    getMoviesPagination(refs.searchBox.value, pageNumber) //async
    .then(data => {
        Notiflix.Loading.remove();
        console.dir(data.total_pages);
        renderPaginationBtn(data.total_pages, pageNumber)
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
    window.setTimeout(Notiflix.Loading.remove, 500);// для красоты
    const watchedArr = loadDataFromLS(keyName);
    renderAllGallery(watchedArr);// перебирает обьект и выводит карточки фильмов

}
