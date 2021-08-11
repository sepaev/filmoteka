import { genres } from "./consts";

//обрезаю дату
const trimYear = (fullDate) => {
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

export const parseFilmsData = (films) => {
    return films.map(film => {
        return {
            backdrop_path: film['backdrop_path'],
            id: film['id'],
            original_title: film['original_title'],
            overview: film['overview'],
            popularity: film['popularity'],
            poster_path: film['poster_path'],
            release_date: film['release_date'],
            title: film['title'],
            vote_average: film['vote_average'],
            vote_count: film['vote_count'],
            genres: getGenres(film['genre_ids']),
            year: trimYear(film['release_date']),
        };
    });
};
