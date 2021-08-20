import  Notiflix                        from "notiflix";
import  axios                           from 'axios';
import { consts }                       from './consts';
import { getRefsLocals }                from "./refs";
import { getRefs }                      from "./refs";
import { tooggleClassFilterIsActive }   from './classWork';
import { doNotification }               from './localization';
import { doStopInfinitScroll }          from './genresWork';
import { showPageHome }                 from "./showPage";


const refs = getRefsLocals();
const mainRefs = getRefs()

const { API_KEY, API_URL } = consts;
axios.defaults.baseURL = `${API_URL}`;


// landing page movies

export const  fetchGetTrending = async (pageValue) => {
    const { data } = await axios.get(
      `/trending/movie/week?api_key=${API_KEY}&page=${pageValue}&language=${consts.LANGUAGE}`,
  );
    const { results, total_pages, page, total_results } = data;
    return { results, total_pages, page, total_results };
}

export const fetchMovieByModalButton = async (pageValue, queryOption) => {
  let string;
  if (queryOption === 'trending') {
    string = `/trending/movie/week?api_key=${API_KEY}&language=${consts.LANGUAGE}&page=${pageValue}`;
  } else {
    string = `/movie/${queryOption}?api_key=${API_KEY}&language=${consts.LANGUAGE}&page=${pageValue}`;
  } 
  const { data } = await axios.get(string);
  const { results, total_pages, page, total_results } = data;
    return { results, total_pages, page, total_results };
}


// on Search movies

export const fetchGetSearchMovie = async (valueSearch, pageValue) => {
    const { data } = await axios.get(
      `/search/movie?api_key=${API_KEY}&page=${pageValue}&query=${valueSearch}&language=${consts.LANGUAGE}`,
    );
    const { results, total_pages, page, total_results } = data;
    return { results, total_pages, page, total_results };
}

// get Movies by ID

export const fetchGetMovieById = async (id) => {
    const { data } = await axios.get(`/movie/${id}?api_key=${API_KEY}&language=${consts.LANGUAGE}`);
    return data;
}

// function to get movies for landing page - trending or on Search
// dynamic page Value with pagination 

export const getMoviesPagination = async (searchValue, pageValue = 1) => {
  // проверка на выбраный фильтр
  let data;
  let target = document.querySelector('.filter_is_active');
  if (!target) {
    refs.trending_ref.classList.add('filter_is_active');
    target = refs.trending_ref;
  }
  // ОТОБРАЖЕНИЕ СТРАНИЦ ---NO SEARCH VALUE---////////////////ФИЛЬТРЫ
  if (!searchValue) { 
    const queryOption = target.dataset.set;
     data = await fetchMovieByModalButton(pageValue, queryOption).catch(err => console.log(err));
     return data;
  }
  // ОТОБРАЖЕНИЕ СТРАНИЦ ---SEARCH VALUE---////////////////ПОИСК ФИЛЬМА
  if (searchValue) {
      target.classList.remove('filter_is_active');
      const data = await fetchGetSearchMovie(searchValue, pageValue).catch(err =>console.log(err));
      return data;
    }
}

const findFilmWithGenre = (films, genreId, totalFounds, notified) => {
  const filtredFilms = films.filter((film) => film.genre_ids.indexOf(parseInt(genreId)) > 0);
  const infoText = { en: "Please wait, it won't last very long.", ru: 'Пожалуйста подождите, это не продлится очень долго.', ua: 'Будь ласа зачекайте, це не займе багато часу.'};
  
  totalFounds += filtredFilms.length;
  if (totalFounds > 7 && !notified) {
    doNotification(infoText.en, infoText.ru, infoText.ua, 'info');
    notified = true;
  }
  return { filtredFilms, notified}
}

export const getMoviesByScroll = async (searchValue, pageValue = 1, genreId, genreName) => {
  let target = document.querySelector('.filter_is_active');
  if (!target) {
    refs.trending_ref.classList.add('filter_is_active');
    target = refs.trending_ref;
  }
  let totalResults = 0;
  let totalAdded = 0;
  let films = [];
  let notified = false;
  if (!searchValue) {
    const queryOption = target.dataset.set;
    Notiflix.Loading.hourglass();
    ////////START IF //////////
    for (let counter = 0; counter < 15; pageValue++) {

      await fetchMovieByModalButton(pageValue, queryOption)
        .then(data => {
        const result = findFilmWithGenre(data.results, genreId, counter, true);
        counter += result.filtredFilms.length;
        if (!totalResults) totalResults = data.total_results;
        totalAdded = counter;             //totalAdded внешняя
        notified = result.notified;       //notified внешняя
        films.push(...result.filtredFilms);  //films внешний обьект с фильмами
        if (pageValue * 20 >= totalResults) {
          counter = 15;
          doNotification('No more results found', 'Больше ничего не найдено', 'Більше нічого не знайдено.', 'failure');
        }
        
      }
      ).catch(err =>
        console.log(err),
        );
    }
    ///END IF//////

    Notiflix.Loading.remove();
    const textAlert = {
      en: 'Added '+ totalAdded +' films with genre ' + genreName,
      ru: 'Добавлено '+ totalAdded +' фильмов с жанром ' + genreName,
      ua: 'Додано '+ totalAdded +' фільмів  з жанром ' + genreName,
    };
    if (totalAdded) doNotification(textAlert.en, textAlert.ru, textAlert.ua, 'success');
    return { films, pageValue, totalResults };
  }
  if (searchValue) {
    Notiflix.Loading.hourglass();
    for (let counter = 0; counter < 10; pageValue++) {
      await fetchGetSearchMovie(searchValue, pageValue)
        .then(data => {
        const result = findFilmWithGenre(data.results, genreId, counter, notified);
        counter += result.filtredFilms.length;
        if (!totalResults) totalResults = data.total_results;
        totalAdded = counter;
        notified = result.notified;
        films.push(...result.filtredFilms);
         if (pageValue * 20 >= totalResults) {
           counter = 10;
           doNotification('No more results found', 'Больше ничего не найдено', 'Більше нічого не знайдено.', 'failure');
          }
        }
      ).catch(err =>
        console.log(err),
        );
    }
    Notiflix.Loading.remove();
    const textAlert = {
      en: 'Added '+ totalAdded +' films with genre ' + genreName,
      ru: 'Добавлено '+ totalAdded +' фильмов с жанром ' + genreName,
      ua: 'Додано '+ totalAdded +' фільмів  з жанром ' + genreName,
    };
  if (totalAdded) doNotification(textAlert.en, textAlert.ru, textAlert.ua, 'success');
  return { films, pageValue, totalResults };
  }
}

export const makeFilterSearch = (e) => {
  if (e.target.nodeName !== 'BUTTON') return;
  doStopInfinitScroll();
  const activeButton = document.querySelector('.filter_is_active');
  tooggleClassFilterIsActive(e.target, activeButton);
  showPageHome(1);
}