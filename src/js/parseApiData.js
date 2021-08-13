import { genres } from "./consts";

//обрезаю дату
export const trimYear = (fullDate) => {
    if (!fullDate) return ''
    return fullDate.slice(0, 4);
}
// перевожу жанры в строку
export const getGenres = (genresIdsFromAPI) => {
    if (genresIdsFromAPI.length < 1) return '';
    let genresString = '';
    genresIdsFromAPI.forEach(genreId => {
        const genre = genres.find(genre => genre.id === genreId);
        genresString += genre.name+', ';
    });
    return genresString.slice(0, genresString.length - 2);
}
export const checkPoster = (poster, reserve) => {
    // if (!poster) return '/3UJ3aHkRzpmIM87BWrk72nTN2v8.jpg';
    // if (!poster) return '/a7lscT93aGgvD6W5Po7dTVLdv19.jpg';
    // if (!poster) return '/4WMsWamXvGD0gC9mHfaoz3dmmwJ.jpg';
    if (poster) return poster;
    if (reserve) return reserve;
    return '/qpGlfnvynjPqAtqRCyFMFGLAAgW.jpg';
}

export const parseFilmsData = (films) => {
    return films.map(film => {
        return {
            backdrop_path: film['backdrop_path'],
            id: film['id'],
            original_title: film['original_title'],
            overview: film['overview'],
            popularity: film['popularity'],
            poster_path: checkPoster(film['poster_path'],film['backdrop_path']),
            release_date: film['release_date'],
            title: film['title'],
            vote_average: film['vote_average'],
            vote_count: film['vote_count'],
            genres: getGenres(film['genre_ids']),
            year: trimYear(film['release_date']),
        };
    });
};
