import { consts } from './consts';
import axios from 'axios';

const { API_KEY, API_URL } = consts;
axios.defaults.baseURL = `${API_URL}`;

// landing page movies

export const fetchGetTrending = async (pageValue) => {
    const { data } = await axios.get(
      `/trending/movie/week?api_key=${API_KEY}&page=${pageValue}`,
    );
    console.dir(data)
    const { results, total_pages, page, total_results } = data;
    return { results, total_pages, page, total_results };
}

// on Search movies

export const fetchGetSearchMovie = async (valueSearch, pageValue) => {
    const { data } = await axios.get(
      `/search/movie?api_key=${API_KEY}&page=${pageValue}&query=${valueSearch}`,
    );
    const { results, total_pages, page, total_results } = data;
    return { results, total_pages, page, total_results };
}

// get Movies by ID

export const fetchGetMovieById = async (id) => {
    const { data } = await axios.get(`/movie/${id}?api_key=${API_KEY}`);
    return data;
}

// function to get movies for landing page - trending or on Search
// dynamic page Value with pagination 

export const getMoviesPagination = async (searchValue, pageValue = 1) => {
    if (!searchValue) {
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

// export default {fetchGetTrending, fetchGetSearchMovie, fetchGetMovieById, getMoviesPagination}






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
// https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>&language=en-US&page=1&include_adult=false