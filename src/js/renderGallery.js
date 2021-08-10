import galleryMovies from '../partials/templates/film.hbs';
import oneMovie from '../partials/templates/modalFilmCard.hbs';
import { getRefs } from '../js/refs';

const refs = getRefs();

export const renderGallery = function (objects) {
    refs.galleryItems.innerHTML = '';
    if (objects.id) {
        refs.galleryItems.insertAdjacentHTML('afterbegin', oneMovie(objects));
    } else {
        refs.galleryItems.insertAdjacentHTML('afterbegin', galleryMovies(objects));
    }
  };