import {getMoviesPagination } from "./getContent"
import Notiflix from "notiflix";
import { renderGallery } from "../js/renderGallery"
import { getRefs } from "./refs";
import {parseFilmsData} from './parseApiData'

export const showPageHome = (pageNumber) => {
    Notiflix.Loading.pulse();
    const refs = getRefs();
    console.log(refs.searchBox.value);
    getMoviesPagination(refs.searchBox.value, pageNumber)
    .then(data => {
        Notiflix.Loading.remove();
        return data.results;
    })
        .then(films => {
            const a = parseFilmsData(films);
        return a;
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