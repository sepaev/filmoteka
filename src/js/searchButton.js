import {getMoviesPagination } from "./getContent"
import Notiflix from "notiflix";
import { renderGallery } from "../js/renderGallery"
import { getRefs } from "./refs";

export const onSearchButtonClick = e => {
    const refs = getRefs();
    console.dir(refs.searchBox);
    Notiflix.Loading.pulse();
    getMoviesPagination(refs.searchBox.value, 1)
        .then(data => {
            Notiflix.Loading.remove();
            return data.results;
        })
        .then(films => {
            return films.map(film => {
                return {
                    backdrop_path: 'https://image.tmdb.org/t/p/original'+film['backdrop_path'],
                    id: film['id'],
                    original_title: film['original_title'],
                    overview: film['overview'],
                    popularity: film['popularity'],
                    poster_path: 'https://image.tmdb.org/t/p/original'+film['poster_path'],
                    release_date: film['release_date'],
                    title: film['title'],
                    vote_average: film['vote_average'],
                    vote_count: film['vote_count'],
                    genre_ids: film['genre_ids'].join(', '),
                    year: film['release_date'].slice(0, 4),
                };
            })
        }).then(films => {
            refs.galleryItems.innerHTML = '';
            console.dir(films);
            films.forEach(film => {
                renderGallery(film);
            });
            })
          .catch(error => {
           Notiflix.Loading.remove();
           console.log(error);
       });
}
// <img class="movie__img" data-id="604" src="https://image.tmdb.org/t/p/original//8xEVAe84zlL9rkfYT6dZXero4KK.jpg" alt="The Matrix Reloaded " onerror="this.onerror=null;this.src='https://upload.wikimedia.org/wikipedia/en/d/d6/Image_coming_soon.png';"></img>