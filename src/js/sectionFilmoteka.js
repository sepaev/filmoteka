import * as basicLightbox from 'basiclightbox';


export const onFilmClick = (e, refs) => {
    if (e.target.className !== "filmoteka-nav__pages--link") { // для примера
        const instance = basicLightbox.create(refs.modalFilm);
        // instance.show();
        instance.show(() => console.log('lightbox modal now visible'));
        console.log('Кликаем по фильмам');
        console.dir(e.target);
    }
}