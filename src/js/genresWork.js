import { getRefs } from "./refs"
import { scrollingWindow } from "./infinitScroll";
import { hidePagination, showPageHomeGenres, showPagination } from "./showPage";
import { throttle} from "throttle-debounce";
import { consts, genres } from "./consts";

let currentPageNumber = 1;
let genreId = 0;
let genreName = '';
let listnerEnabled = false;

const checknewCurrentPageNumber = (newPageNumber) => {
    if (newPageNumber > currentPageNumber) {
        currentPageNumber = newPageNumber;
        return;
    }
    if (newPageNumber === currentPageNumber) {
        return;
    }
    if (newPageNumber < currentPageNumber) {
        currentPageNumber = 1;
        genreId = 0;

    }
}

const infinitScroll = (e) => {
 scrollingWindow(currentPageNumber, genreId, genreName)//from "./js/infinitScroll"  для отслеживания безконечного скролла
    .then(newCurrentPageNumber => checknewCurrentPageNumber(newCurrentPageNumber))
    .catch(error => console.log(error));
}

export const doOpenGenre = (id, name, instance) => {
    const refs = getRefs();
    genreId = id;
    genreName = name;
    checknewCurrentPageNumber(1);
    refs.galleryItems.innerHTML = '';
    hidePagination(refs);
    showPageHomeGenres(currentPageNumber, id, name)
        .then(page => {
            currentPageNumber = page;
        });
    if (instance) instance.close();

    if (!listnerEnabled) {
        // window.addEventListener('scroll', throttle(consts.DEBOUNCE_DELAY, infinitScroll));
        window.addEventListener('scroll', infinitScroll);
        listnerEnabled = true;
    }

};

export const getGenreName = (genreId) => {
    let returnGenre = { en: '', ru: '', uk: '' };
    returnGenre.en = genres.en.find(genre => genre.id == genreId);
    returnGenre.ru = genres.ru.find(genre => genre.id == genreId);
    returnGenre.uk = genres.uk.find(genre => genre.id == genreId);
    return returnGenre;
}

export const doStopInfinitScroll = () => {

    if (listnerEnabled) {
        // window.removeEventListener('scroll', throttle(consts.DEBOUNCE_DELAY, infinitScroll));
        window.removeEventListener('scroll', infinitScroll);
        listnerEnabled = false;
    }
    showPagination();
    genreId = 0;
    genreName = '';
}