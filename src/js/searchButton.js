import {getContent} from "./getContent"
import Notiflix from "notiflix";

export const onSearchButtonClick = e => {
    console.log('Кликаем поиск');
    console.log(e);
    Notiflix.Loading.pulse();
    getContent(e)
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
                };
            })
        }).then( obj => console.log(obj))
          .catch(error => {
           Notiflix.Loading.remove();
           console.log(error);
       });
}
// <img class="movie__img" data-id="604" src="https://image.tmdb.org/t/p/original//8xEVAe84zlL9rkfYT6dZXero4KK.jpg" alt="The Matrix Reloaded " onerror="this.onerror=null;this.src='https://upload.wikimedia.org/wikipedia/en/d/d6/Image_coming_soon.png';"></img>