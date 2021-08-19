import  Notiflix                        from "notiflix";
import { consts }                       from './consts';
import axios                            from 'axios';
import { getRefsLocals }                from "./refs";
import { getRefs }                      from "./refs";
import { renderGallery }                from "../js/renderGallery";
import { parseFilmsData }               from './parseApiData';
import { tooggleClassFilterIsActive }   from './classWork';
import { doNotification }               from './localization';
import { getGenreName }                 from './genresWork';
import { makeButtonActiv }              from './paginationNav';
import { showPageHome } from "./showPage";


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

export const checkDataByGenres = (films, genreId) => {
  return films.filter((film) => film.genre_ids.indexOf(parseInt(genreId)) > 0);
}

const pushAndCount = (data, total, genreId, films, notified) => {
  const filtred = checkDataByGenres(data.results, genreId);
  const timeAlert = {
    en: "Please wait, it won't last very long.",
    ru: 'Пожалуйста подождите, это не продлится очень долго.',
    ua: 'Будь ласа зачекайте, це не займе багато часу.',
  };
  films.push(...filtred);
  total += filtred.length;
  if (total > 10 && !notified) {
    doNotification(timeAlert.en, timeAlert.ru, timeAlert.ua, 'info');
    notified = true;
  }
  return { total: filtred.length, totalAdded: total, notified, films }
}

export const getMoviesByScroll = async (searchValue, pageValue = 1, genreId) => {
  let data;
  let target = document.querySelector('.filter_is_active');
  if (!target) {
    refs.trending_ref.classList.add('filter_is_active');
    target = refs.trending_ref;
  }
  let totalResults = 0;
  let totalAdded = 0;
  let films = [];
  const currentGenres = getGenreName(genreId);
  let notified = false;
  if (!searchValue) {
    const queryOption = target.dataset.set;
    Notiflix.Loading.hourglass();
    for (let total = 0; total < 20; pageValue++) {

      await fetchMovieByModalButton(pageValue, queryOption).then(data => {
        const result = pushAndCount(data, total, genreId, films, true);
        total += result.total;
        totalResults = data.total_results;
        totalAdded += result.total;
        notified = result.notified;
        films = result.films;
        if (pageValue * 20 >= totalResults - 19) {
          total = 20;
          doNotification('No more results found', 'Больше ничего не найдено', 'Більше нічого не знайдено.', 'failure');
          throw new Error('No more results found');
        }
        
      }
      ).catch(err =>
        console.log(err),
        );
    }
    Notiflix.Loading.remove();
    const alert = {
      en: 'Also added '+ totalAdded +' trends with genre ' + currentGenres.en.name + '. Total ' + totalResults + ' results.',
      ru: 'Еще добавлено '+ totalAdded +' трендовых фільмів с жанром ' + currentGenres.ru.name + '. Всего ' + totalResults + ' кино.',
      ua: 'Ще відображено '+ totalAdded +' трендових фільмів з жанром ' + currentGenres.uk.name + '. Всього ' + totalResults + ' од.',
    };
  window.setTimeout(doNotification(alert.en, alert.ru, alert.ua, 'success'),100);
  return { films, pageValue, totalResults };
  }
  if (searchValue) {
    Notiflix.Loading.hourglass();
    for (let total = 0; total < 10; pageValue++) {
      await fetchGetSearchMovie(searchValue, pageValue).then(data => {
        const result = pushAndCount(data, total, genreId, films, notified);
        total += result.total;
        totalResults = data.total_results;
        totalAdded += result.total;
        notified = result.notified;
        films = result.films;
         if (pageValue * 10 >= totalResults - 9) {
           total = 10;
           doNotification('No more results found', 'Больше ничего не найдено', 'Більше нічого не знайдено.', 'failure');
           throw new Error('not found');
          }
        }
      ).catch(err =>
        console.log(err),
        );
    }
    Notiflix.Loading.remove();
  const alert = {
    en: 'Added ' + totalAdded +' for search query << '+searchValue+' >> genre <<' + currentGenres.ru.name + '>>. Total ' + totalResults,
    ru: 'Добавлено ' + totalAdded +' за поиском << '+searchValue+' >> жанр <<' + currentGenres.ru.name + '>>. Всего ' + totalResults,
    ua: 'Додано ' + totalAdded +' за пошуком << '+searchValue+' >> жанр <<' + currentGenres.ru.name + '>>. Всього ' + totalResults,
  };
  window.setTimeout(doNotification(alert.en, alert.ru, alert.ua, 'success'),100);
  return { films, pageValue, totalResults };
  }
}

export const makeFilterSearch = (e) => {
  if (e.target.nodeName !== 'BUTTON') return;
  const activeButton = document.querySelector('.filter_is_active');
  tooggleClassFilterIsActive(e.target, activeButton);
  showPageHome(1);
  // Notiflix.Loading.pulse();
  // makeButtonActiv(1);
  // console.log(e.target);
  // console.log(activeButton);
  // const queryOption = e.target.dataset.set;

  // if (e.target.dataset.set === "trending") {
  //   fetchGetTrending(1).then(films => parseFilmsData(films.results))
  //     .then(films => {
  //       Notiflix.Loading.remove();
  //       mainRefs.galleryItems.innerHTML = '';
  //       films.forEach(film => renderGallery(film));
  //     })
  //     .catch(err => {
  //       Notiflix.Loading.remove();
  //       console.log(err);
  //     });
  // };

  // fetchMovieByModalButton(1, queryOption).then(films => parseFilmsData(films.results))
  //   .then(films => {
  //     Notiflix.Loading.remove();
  //     mainRefs.galleryItems.innerHTML = '';
  //     films.forEach(film => renderGallery(film));
  //   })
  //   .catch(err => {
  //     Notiflix.Loading.remove();
  //     console.log(err);
  //   });
}


// get Latest

// export const fetchLatest = async (pageValue) => {
//   const {data} = await axios.get(
//     `/movie/latest?api_key=${API_KEY}&page=${pageValue}&language=${consts.LANGUAGE}`,
//   );
//   const { results, total_pages, page, total_results } = data;
//     return { results, total_pages, page, total_results };
// }

// get Now Playing

// export const fetchNowPlaying = async (pageValue) => {
//   const {data} = await axios.get(
//     `movie/now_playing?api_key=${API_KEY}&page=${pageValue}&language=${consts.LANGUAGE}`,
//   );
//   const { results, total_pages, page, total_results } = data;
//     return { results, total_pages, page, total_results };
// }

// // get Popular

// export const fetchPopular = async (pageValue) => {
//   const {data} = await axios.get(
//     `movie/popular?api_key=${API_KEY}&page=${pageValue}&language=${consts.LANGUAGE}`,
//   );
//   const { results, total_pages, page, total_results } = data;
//     return { results, total_pages, page, total_results };
// }

// // get Upcoming

// export const fetchUpcoming = async (pageValue) => {
//   const {data} = await axios.get(
//     `movie/upcoming?api_key=${API_KEY}&page=${pageValue}&language=${consts.LANGUAGE}`,
//   );
//   const { results, total_pages, page, total_results } = data;
//     return { results, total_pages, page, total_results };
// }

// // get Top Rated

// export const fetchTopRated = async (pageValue) => {
//   const {data} = await axios.get(
//     `movie/top_rated?api_key=${API_KEY}&page=${pageValue}&language=${consts.LANGUAGE}`,
//   );
//   const { results, total_pages, page, total_results } = data;
//     return { results, total_pages, page, total_results };
// }


//refs.latest_ref.addEventListener('click', makeFilterSearch)
// refs.trending_ref.addEventListener('click', makeFilterSearch)
// refs.now_playing_ref.addEventListener('click', makeFilterSearch)
// refs.popular_ref.addEventListener('click', makeFilterSearch)
// refs.top_rated_ref.addEventListener('click', makeFilterSearch)
// refs.upcoming_ref.addEventListener('click', makeFilterSearch)



// console.log(e.target)
// if (e.target.dataset.set === "now_playing") {
// fetchNowPlaying(1).then(films => {
// mainRefs.galleryItems.innerHTML = '';
// films.results.forEach(film => renderGallery(film));
// }).catch(err => console.log(err))
// } 

// else if (e.target.dataset.set === "popular") {
// fetchPopular(1).then(films => {
// mainRefs.galleryItems.innerHTML = '';
// films.results.forEach(film => renderGallery(film));
// }).catch(err => console.log(err))
// } 

// else if (e.target.dataset.set === "top_rated") {
// fetchTopRated(1).then(films => {
// mainRefs.galleryItems.innerHTML = '';
// films.results.forEach(film => renderGallery(film));
// }).catch(err => console.log(err))
// } 
  
// else if (e.target.dataset.set === "upcoming") {
//   fetchUpcoming(1).then(films => parseFilmsData(films.results))
//     .then(films => {
//       mainRefs.galleryItems.innerHTML = '';
//       films.forEach(film => renderGallery(film));
// }).catch(err => console.log(err))
// } 
  
// else if (e.target.dataset.set === "trending") {
// fetchGetTrending(1).then(films => {
// mainRefs.galleryItems.innerHTML = '';
// films.results.forEach(film => renderGallery(film));
// }).catch(err => console.log(err))
// }




//console.dir(mainRefs.filterList.map())


// let options = {
//     type: "search",
//     what: "movie",
//     language: "en-US",
//     page: 1,
//     adult: true,
//     query: "Matrix",
// }

// export const getContent = async (e) => {
//     console.log("URL = " + API_URL + "?api_key=" + API_KEY);
//     try {
//         const response = await axios.get(getString(options));
//         console.log("Внизу пример запроса по поиску 'Matrix'↓");
//         console.log(response.data);
//         return response.data;
//     } catch(error) {
//         console.log(error);;
//     }
// }


// const getString = (opt) => {
//     return opt.type+"/"+opt.what+"?api_key="+API_KEY+"&query="+opt.query+"&language="+opt.language+"&page="+opt.page+"&include_adult="+opt.adault
// }
// Пример ссылки
// https://api.themoviedb.org/3/search/movie?api_key=8948cf34f147d17edd39edcb74badce4&language=en-US&page=1&include_adult=false
