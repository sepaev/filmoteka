import { genres } from "./consts";
import { getLang } from "./localization";

//обрезаю дату
export const trimYear = (fullDate) => {
    if (!fullDate) return ''
    return fullDate.slice(0, 4);
}
// перевожу жанры в строку
export const getGenres = (genresIdsFromAPI) => {
    if (!genresIdsFromAPI || genresIdsFromAPI.length < 1) return '';
    const lang = getLang().slice(0, 2);
    let genresString = '';
    
    genresIdsFromAPI.forEach(genreId => {
        const genre = genres[lang].find(genre => genre.id === genreId);
        genresString += genre.name+', ';
    });
    return genresString.slice(0, genresString.length - 2);
}

export const getGenresToArr = (genresIdsFromAPI) => {
    if (!genresIdsFromAPI || genresIdsFromAPI.length  < 1 ) return '';
    const lang = getLang().slice(0, 2);
    let genresArr = [];

    genresIdsFromAPI.forEach(genreId => {
        const genre = genres[lang].find(genre => genre.id === genreId);
        genresArr.push({ id: genreId, name: genre.name });
    });
    return genresArr;
}
export const getArray = (array, reserv) => {
    if (array) {
        return [...array];
    }
    return [reserv, reserv, reserv];
}

export const checkPoster = (poster, reserve) => {
    // if (!poster) return '/3UJ3aHkRzpmIM87BWrk72nTN2v8.jpg';
    // if (!poster) return '/a7lscT93aGgvD6W5Po7dTVLdv19.jpg';
    // if (!poster) return '/4WMsWamXvGD0gC9mHfaoz3dmmwJ.jpg';
    if (poster) return poster;
    if (reserve) return reserve;
    return '/qpGlfnvynjPqAtqRCyFMFGLAAgW.jpg';
}


export const parseOneFilm = (film) => {
    return {
        backdrop_path: film.backdrop_path,
        id: film.id,
        original_title: film.original_title,
        overview: film.overview,
        popularity: film.popularity,
        poster_path: checkPoster(film.poster_path, film.backdrop_path),
        release_date: film.release_date,
        title: film.title,
        vote_average: film.vote_average,
        vote_count: film.vote_count,
        ids: getArray(film.ids, film.id),
        posters: getArray(film.posters, film.poster_path),
        genres: getGenres(film.genre_ids),
        genresArr: getGenresToArr(film.genre_ids),
        year: trimYear(film.release_date)
    };
}

export const parseFilmsData = (films) => {
    return films.map(film => parseOneFilm(film));

};