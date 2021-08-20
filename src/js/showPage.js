import     Notiflix                                 from "notiflix";
import { getMoviesPagination, getMoviesByScroll }   from "./getContent";
import { renderAllGallery, renderAddToGallery}      from "./renderGallery";
import { getRefs }                                  from "./refs";
import { parseFilmsData }                           from './parseApiData';
import { loadDataFromLS }                           from './localStoragе';
import { renderPaginationBtn }                      from './paginationNav';
import { makeButtonActiv }                          from './paginationNav';
import { doNotification }                           from './localization';
import { locals }                                   from './consts';

Notiflix.Notify.init({
    position: 'center-top',
    distance: '155px',
}); 
export const showFilters = (refs) => {
    refs.filterList.style.display = 'flex';
}
export const hideFilters = (refs) => {
    refs.filterList.style.display = 'none';
}
export const hidePagination = (refs) => {
    refs.paginationNav.style.display = 'none';
    refs.footer.style.position = 'absolute';
    // refs.footer.style.width = '100%';
    const docHeight = document.documentElement.scrollHeight + 150;
    const winHeight = window.innerHeight + 150;
    refs.footer.style.top = (docHeight > winHeight) ? docHeight : winHeight;
}
export const showPagination = (refs = getRefs()) => {
    refs.paginationNav.style.display = 'flex';
    refs.footer.style.position = 'inherit';
    refs.footer.style.top = 'inherit';
}

export const doOnSuccess = (totalResults, totalPages, pageNumber) => {
    const refs = getRefs();
    const alert = {
      enFirst: 'You are watching ' + pageNumber + ' page of total ' + totalPages + ' pages.',
      ruFirst: 'Вы просматриваете ' + pageNumber + ' страницу из ' + totalPages + ' возможных.',
      uaFirst: 'Ви передивляєтесь ' + pageNumber + ' сторінку із ' + totalPages + ' можливих.',
      enSecond: 'Found ' + totalResults + ' results. Total ' + totalPages + ' pages.',
      ruSecond: 'Найдено ' + totalResults + ' фильмов. Всего ' + totalPages + ' страниц.',
      uaSecond: 'Знайдено ' + totalResults + ' фільмів. Всього ' + totalPages + ' сторінок.',
    };
    pageNumber > 1 ?        
    doNotification(alert.enFirst, alert.ruFirst, alert.uaFirst, 'success')
    :
    doNotification(alert.enSecond, alert.ruSecond, alert.uaSecond, 'success');
    showPagination(refs);
    refs.headerError.style.display = 'none';
    if (totalResults < 20) {
        hidePagination(refs);
    }
};

const doOnFailure = () => {
    const refs = getRefs();
    const alert = {
      en: 'Search result not successful. Enter the correct movie name and retry.',
      ru: 'Результат поиска нулевой. Введите корректное имя фильма и повторите попытку.',
      ua: 'За вашим запитом нічтого не знайдено. Будьласка введіть коректну назву фільму та спробуйте ще раз.',
    };
    doNotification(alert.en, alert.ru, alert.ua, 'failure');
    refs.headerError.style.display = 'block';
    hidePagination(refs);
}

export const showPageHome = (pageNumber = 1) => {
    Notiflix.Loading.pulse();
    const refs = getRefs();
    getMoviesPagination(refs.searchBox.value, pageNumber) //async
    .then(data => {
        Notiflix.Loading.remove();
        if (data.total_results) {
            doOnSuccess(data.total_results, data.total_pages, pageNumber);
        } else {
            doOnFailure();
        }

        renderPaginationBtn(data.total_pages, pageNumber);
        makeButtonActiv(pageNumber);
        return data.results;
    })
    .then(films => {
        const filmData = parseFilmsData(films);
        const string = JSON.stringify(filmData);
        localStorage.setItem('tempQuery', string);
        return filmData;
    })
    .then(films => {
        renderAllGallery(films);// перебирает обьект и выводит карточки фильмов
    })
    .catch(error => {
        Notiflix.Loading.remove();
        console.log(error);
    });
    
}

export const showPageHomeGenres = (pageNumber, genreId, genreName) => {
    const refs = getRefs();
    return getMoviesByScroll(refs.searchBox.value, pageNumber, genreId, genreName)
        .then(data => {
            if (data.totalResults) {
                refs.headerError.style.display = 'none';
            } else {
                doOnFailure();
            }
            return data;
        })
        .then(data => {
            data.filmData = parseFilmsData(data.films);
            localStorage.setItem('tempQuery',  JSON.stringify(data.filmData));
            return data;
    })
    .then(data => {
        renderAllGallery(data.filmData);// перебирает обьект и выводит карточки фильмов
        return data.pageValue;
    })
};

export const showMorePageHomeGenres = (pageNumber, genreId, genreName) => {
    const refs = getRefs();
    return getMoviesByScroll(refs.searchBox.value, pageNumber, genreId, genreName)
        .then(data => {
            if (!data.totalResults) doOnFailure();
            data.filmData = parseFilmsData(data.films);
            localStorage.setItem('tempQuery', JSON.stringify(data.filmData));
            renderAddToGallery(data.filmData);// перебирает обьект и выводит карточки фильмов
            return data.pageValue;
        })
}
    
export const showPageMyLibrary = (keyName) => {
    Notiflix.Loading.pulse();
    window.setTimeout(Notiflix.Loading.remove, 200);// для красоты
    const watchedArr = loadDataFromLS(keyName);
    renderAllGallery(watchedArr);// перебирает обьект и выводит карточки фильмов
    
    Notiflix.Notify.init({
        position: 'center-top',
        distance: '165px',
    });
        const alert = {
      en: 'You have ' +watchedArr.length + ' films in your library "' +locals.getString(keyName+'_text') + '"',
      ru: 'У тебя есть ' +watchedArr.length + ' фильма(ов) в библиотеке "' +locals.getString(keyName+'_text') + '"',
      ua: 'У тебе є ' +watchedArr.length + ' фильми(ів) в переліку "' +locals.getString(keyName+'_text') + '"',
    };
    doNotification(alert.en, alert.ru, alert.ua, 'success');
}


