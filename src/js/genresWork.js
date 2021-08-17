import { getRefs } from "./refs"
import { scrollingWindow } from "./infinitScroll";
import { hidePagination, showPageHomeGenres } from "./showPage";
import { throttle} from "throttle-debounce";
import { consts } from "./consts";

let currentPage = 1;
let genreId = 0;
// let genreName = '';

const checkNewCurrentPage = (newPage) => {
    if (newPage > currentPage) {
        currentPage = newPage;
        return;
    }
    if (newPage === currentPage) {
        console.log('Current page: '+newPage+' Do nothing and waiting for loading content')
        return;
    }
    if (newPage < currentPage) {
        currentPage = 1;
        genreId = 0;

    window.removeEventListener('scroll',
        throttle(consts.DEBOUNCE_DELAY, (e) => {
        const newCurrentPage = scrollingWindow(currentPage, genreId);//from "./js/infinitScroll"  для отслеживания безконечного скролла
            checkNewCurrentPage(newCurrentPage);
        }));
    }
}

export const doOpenGenre = (id, name, instance) => {
    checkNewCurrentPage(1);
    genreId = id;
    // genreName = name;
    const refs = getRefs();
    refs.galleryItems.innerHTML = '';
    hidePagination(refs);
    showPageHomeGenres(currentPage, id, name)
        .then(page => {
            currentPage = page;
        });
    if (instance) instance.close();

    window.addEventListener('scroll',
        throttle(consts.DEBOUNCE_DELAY, (e) => {
            scrollingWindow(currentPage, genreId)//from "./js/infinitScroll"  для отслеживания безконечного скролла
                .then(newCurrentPage => checkNewCurrentPage(newCurrentPage))
                .catch(error => console.log(error));
        }));

};

