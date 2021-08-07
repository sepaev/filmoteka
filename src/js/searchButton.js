import {getContent} from "./getContent"

export const onSearchButtonClick = e => {
    console.log('Кликаем поиск');
    console.log(e);
    getContent(e);
}