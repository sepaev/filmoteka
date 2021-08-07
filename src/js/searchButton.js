import {getContent} from "./getContent"
import Notiflix from "notiflix";

export const onSearchButtonClick = e => {
    console.log('Кликаем поиск');
    console.log(e);
    Notiflix.Loading.pulse();
    getContent(e)
        .then(film => {
            Notiflix.Loading.remove();
            return film;
        })
          .catch(error => {
           Notiflix.Loading.remove();
           console.log(error);
       });
}