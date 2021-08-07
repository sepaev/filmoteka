import {getContent} from "./getContent"

export const onSearchButtonClick = e => {
    console.log('Кликаем поиск');
    console.log(e);
       Notiflix.Loading.circle();
    getContent(e)
        .then(pictures => {
           Notiflix.Loading.remove();
          return buildHtml(pictures, page, tag);
        })
          .catch(error => {
           Notiflix.Loading.remove();
           console.log(error);
       });
}