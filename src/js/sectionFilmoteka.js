export const onFilmClick = e => {
    if (e.target.className !== "filmoteka-nav__pages--link") {
        console.log('Кликаем по фильмам');
        console.dir(e.target);
    }
}