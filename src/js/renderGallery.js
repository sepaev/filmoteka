import galleryMovies from '../partials/templates/film.hbs';
import oneMovie from '../partials/templates/modalFilmCard.hbs';
import { getRefs } from '../js/refs';

const refs = getRefs();

export const renderGallery = function (objects) {
   refs.galleryItems.insertAdjacentHTML('beforeend', galleryMovies(objects));
};

export const renderMovie = function (object) {
    const refs = getRefs();
    console.log(object);
    // refs.modalFilm.insertAdjacentHTML('beforeend', oneMovie(object)) 
    refs.modalCard.innerHTML = oneMovie(object);
}