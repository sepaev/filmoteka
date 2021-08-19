import { getRefs } from "./refs"
import { scrollingWindow } from "./infinitScroll";
import { hidePagination, showPageHomeGenres } from "./showPage";
import { throttle} from "throttle-debounce";
import { consts, genres } from "./consts";

let currentPageNumber = 1;
let genreId = 0;
// let genreName = '';

const checkNewcurrentPageNumber = (newPageNumber) => {
    if (newPageNumber > currentPageNumber) {
        currentPageNumber = newPageNumber;
        return;
    }
    if (newPageNumber === currentPageNumber) {
        console.log('Current page: '+newPageNumber+' Do nothing and waiting for loading content')
        return;
    }
    if (newPageNumber < currentPageNumber) {
        currentPageNumber = 1;
        genreId = 0;

    window.removeEventListener('scroll',
        throttle(consts.DEBOUNCE_DELAY, (e) => {
        const newcurrentPageNumber = scrollingWindow(currentPageNumber, genreId);//from "./js/infinitScroll"  для отслеживания безконечного скролла
            checkNewcurrentPageNumber(newcurrentPageNumber);
        }));
    }
}

export const doOpenGenre = (id, name, instance) => {
    checkNewcurrentPageNumber(1);
    genreId = id;
    // genreName = name;
    const refs = getRefs();
    refs.galleryItems.innerHTML = '';
    hidePagination(refs);
    showPageHomeGenres(currentPageNumber, id, name)
        .then(page => {
            currentPageNumber = page;
        });
    if (instance) instance.close();

    window.addEventListener('scroll',
        throttle(consts.DEBOUNCE_DELAY, (e) => {
            scrollingWindow(currentPageNumber, genreId)//from "./js/infinitScroll"  для отслеживания безконечного скролла
                .then(newcurrentPageNumber => checkNewcurrentPageNumber(newcurrentPageNumber))
                .catch(error => console.log(error));
        }));

};

export const getGenreName = (genreId) => {
    let returnGenre = { en: '', ru: '', uk: '' };
    returnGenre.en = genres.en.find(genre => genre.id == genreId);
    returnGenre.ru = genres.ru.find(genre => genre.id == genreId);
    returnGenre.uk = genres.uk.find(genre => genre.id == genreId);
    return returnGenre;
}
