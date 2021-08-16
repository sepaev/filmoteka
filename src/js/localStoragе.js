import { locals } from './consts'
import { doNotification } from './localization';
  let strings = locals;
// Принимает имя ключа `localStorageKey` по которому будет произведена выборка.
export const loadDataFromLS = localStorageKey => {
  try {
    let string = localStorage.getItem(localStorageKey);
    if (string === null) {
      string = '[]';
      // создает пустой массив LS, если ключа еще нет
    }
    const data = JSON.parse(string);
    if (Array.isArray(data)) {
      return data;
    } else {
      throw new Error('Object is not array');
    }
  } catch (err) {
    console.error('Get LocslStorage error: ', err);
  }
};
// Принимает ключ `localStorageKey` и значение обьект фильмов `object`.
export const setDataToLS = (localStorageKey, object) => {
  try {
    if (Array.isArray(object)) {
      const string = JSON.stringify(object);
      localStorage.setItem(localStorageKey, string);
    } else {
      throw new Error('Object is not array');
    }
  } catch (err) {
    console.error('Set LocslStorage error: ', err);
  }
};

//Добавляет фильм : пушит переданный 'newFilm' в LocalStorage с ключем 'localStorageKey'
export const addMovieToLocalStorage = (localStorageKey, newFilm) => {

  const currentDataArray = loadDataFromLS(localStorageKey);
  const newDataArray = newFilm;
  if (currentDataArray.find(film => film.id === newFilm.id)) {
    const alert = {
      en: newFilm.title + ' arledy added to ' + strings.getString(localStorageKey + '_text'),
      ru: newFilm.title + ' уже добавлен в ' + strings.getString(localStorageKey + '_text'),
      ua: newFilm.title + ' вже додано в ' + strings.getString(localStorageKey + '_text'),
    };
    doNotification(alert.en, alert.ru, alert.ua, 'faulure');
    return;
  } else {
    // newDataArray.push(currentDataArray);
    currentDataArray.push(newDataArray);
    setDataToLS(localStorageKey, currentDataArray);
    const alert = {
      en: newFilm.title + ' succesfully added to ' + strings.getString(localStorageKey + '_text'),
      ru: newFilm.title + ' успешно добавлен в ' + strings.getString(localStorageKey + '_text'),
      ua: newFilm.title + ' додано в ' + strings.getString(localStorageKey + '_text'),
    };
    doNotification(alert.en, alert.ru, alert.ua, 'success');
  }
};

export const removeMovieFromLocalStorage = (localStorageKey, newFilm) => {
  const currentDataArray = loadDataFromLS(localStorageKey);
  const newDataArray = [];
  if (currentDataArray.find(film => film.id === newFilm.id)) {
    currentDataArray.forEach(film => {
      if (film.id !== newFilm.id) newDataArray.push(film);
    });
    setDataToLS(localStorageKey, newDataArray);
    const alert = {
      en: newFilm.title + ' succesfully removed from ' + strings.getString(localStorageKey + '_text'),
      ru: newFilm.title + ' успешно удален мз списка ' + strings.getString(localStorageKey + '_text'),
      ua: newFilm.title + ' видалено зі списка ' + strings.getString(localStorageKey + '_text'),
    };
    doNotification(alert.en, alert.ru, alert.ua, 'success');
  } else {
    const alert = {
      en: 'Not found Film ' + newFilm.title + ' in ' + strings.getString(localStorageKey + '_text') + ' list',
      ru: 'Не найдено фильм  ' + newFilm.title + ' в списке ' + strings.getString(localStorageKey + '_text'),
      ua: 'Не знайдено фільм  ' + newFilm.title + ' в переліку "' + strings.getString(localStorageKey + '_text') + ' фыльми"',
      ua: newFilm.title + ' видалено зі списка ' + strings.getString(localStorageKey + '_text'),
    };
    doNotification(alert.en, alert.ru, alert.ua, 'failure');
  }
};
