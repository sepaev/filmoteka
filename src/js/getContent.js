import { consts } from './consts';
import axios from 'axios';
import { getRefsLocals } from "./refs";
import { getRefs } from "./refs";
import { renderGallery } from "../js/renderGallery";
import { parseFilmsData } from './parseApiData';



const refs = getRefsLocals();
const mainRefs = getRefs()

const { API_KEY, API_URL } = consts;
axios.defaults.baseURL = `${API_URL}`;


// landing page movies

export const fetchGetTrending = async (pageValue) => {
    const { data } = await axios.get(
      `/trending/movie/week?api_key=${API_KEY}&page=${pageValue}&language=${consts.LANGUAGE}`,
    );
    console.dir(data)
    const { results, total_pages, page, total_results } = data;
    return { results, total_pages, page, total_results };
}

export const fetchMovieByModalButton = async (pageValue, queryOption) => {
  const {data} = await axios.get(
    `/movie/${queryOption}?api_key=${API_KEY}&page=${pageValue}&language=${consts.LANGUAGE}`,
  );
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
    if (!searchValue) {
      refs.trending_ref.classList.add('filter_is_active');
      const data = await fetchGetTrending(pageValue).catch(err =>
        console.log(err),
      );
      return data;
    }
  
    if (searchValue) {
      const data = await fetchGetSearchMovie(searchValue, pageValue).catch(err =>
        console.log(err),
      );
      return data;
    }
}

mainRefs.filterList.addEventListener('click', e => {
  if (e.target.nodeName !== 'BUTTON') {
    return
  }
  makeFilterSearch(e)
})

function makeFilterSearch (e) {
  const activeButton = document.querySelector('.filter_is_active');
  activeButton.classList.remove('filter_is_active');
  e.target.classList.add('filter_is_active');
  const queryOption = e.target.dataset.set;

  if (e.target.dataset.set === "trending") {
    fetchGetTrending(1).then(films => parseFilmsData(films.results))
  .then(films => {
    mainRefs.galleryItems.innerHTML = '';
    films.forEach(film => renderGallery(film));
}).catch(err => console.log(err))
 };

  fetchMovieByModalButton(1, queryOption).then(films => parseFilmsData(films.results))
  .then(films => {
    mainRefs.galleryItems.innerHTML = '';
    films.forEach(film => renderGallery(film));
}).catch(err => console.log(err))



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
}



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

