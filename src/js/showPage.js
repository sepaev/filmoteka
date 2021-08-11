import {getMoviesPagination } from "./getContent"
import Notiflix from "notiflix";
import { renderGallery } from "../js/renderGallery"
import { getRefs } from "./refs";
import {parseFilmsData} from './parseApiData'

export const showPageHome = (pageNumber) => {
    Notiflix.Loading.pulse();
    const refs = getRefs();
    getMoviesPagination(refs.searchBox.value, pageNumber) //async
    .then(data => {
        Notiflix.Loading.remove();

        return data.results;
    })
        .then(films => {
           const filmData = parseFilmsData(films);
           const string = JSON.stringify(filmData);
           localStorage.setItem('tempQuery', string);
           return filmData;
        })
    .then(films => {
        refs.galleryItems.innerHTML = '';
        films.forEach(film => renderGallery(film));
    })
      .catch(error => {
       Notiflix.Loading.remove();
       console.log(error);
   });
}