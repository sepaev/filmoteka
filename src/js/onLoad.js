import { changeHeader } from "./changeHeader"
import { onSearchBoxChange } from "./searchBox"
import { onWatchedButtonClick, onQueueButtonClick } from "./libraryButtons"
import { onSearchButtonClick } from "./searchButton"
import { doLocalization, getLang } from "./localization"
import { addClass } from "./classWork";

let loaded = false; //site must be loaded once reload only on change localization

// функция по загрузке
export const onLoad = refs => {

    if (loaded) return;
    changeHeader('HOME', refs.headerDivToChange);
    doLocalization();
    const currentLang = getLang();
    const target = currentLang === 'eu-US' ? refs.engFlag : currentLang === 'ru-RU' ? refs.rusFlag : refs.ukrFlag;
    addClass(target, 'current');
    loaded = true;
}

export const loadListnersForHome = (refs) => {
    //добавление обработчика событий инпута и кнопки поиска
    refs.searchBox.addEventListener('keydown', onSearchBoxChange);
    refs.searchButton.addEventListener('click', onSearchButtonClick);
}

export const removeListnersForHome = (refs) => {
    //удаление обработчика событий инпута и кнопки поиска
    if (refs.searchBox) refs.searchBox.removeEventListener('keydown', onSearchBoxChange);
    if (refs.searchButton) refs.searchButton.removeEventListener('click', onSearchButtonClick);
}

export const loadListnersForMyLibrary = (refs) => {
    // добавление обработчиков на кнопки WATCHED и QUEUE
    refs.watchedBtn.addEventListener('click', onWatchedButtonClick);
    refs.queueBtn.addEventListener('click', onQueueButtonClick);
}

export const removeListnersForMyLibrary = (refs) => {
    //удаление обработчиков на кнопки WATCHED и QUEUE
    if (refs.watchedBtn) refs.watchedBtn.removeEventListener('click', onWatchedButtonClick);
    if (refs.queueBtn) refs.queueBtn.removeEventListener('click', onQueueButtonClick);
}
