import { consts } from './consts';
import axios from 'axios';

const { API_KEY, API_URL } = consts;
axios.defaults.baseURL = `${API_URL}`;

let options = {
    type: "search",
    what: "movie",
    language: "en-US",
    page: 1,
    adult: true,
    query: "Matrix",
}

export const getContent = async (e) => {
    console.log("URL = " + API_URL + "?api_key=" + API_KEY);
    try {
        const response = await axios.get(getString(options));
        console.log("Внизу пример запроса по поиску 'Matrix'↓");
        console.log(response.data);
        return response.data;
    } catch(error) {
        console.log(error);;
    }
}


const getString = (opt) => {
    return opt.type+"/"+opt.what+"?api_key="+API_KEY+"&query="+opt.query+"&language="+opt.language+"&page="+opt.page+"&include_adult="+opt.adault
}
// Пример ссылки
// https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>&language=en-US&page=1&include_adult=false