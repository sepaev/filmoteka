import Notiflix from 'notiflix';

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
    Notiflix.Notify.failure('Film ' + newFilm.title + ' arledy added to ' + localStorageKey);
    return;
  } else {
    // newDataArray.push(currentDataArray);
    currentDataArray.push(newDataArray);
    setDataToLS(localStorageKey, currentDataArray);
    Notiflix.Notify.success('Film ' + newFilm.title + ' succesfully added to ' + localStorageKey);
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
    Notiflix.Notify.success(
      'Film ' + newFilm.title + ' succesfully removed from ' + localStorageKey,
    );
  } else {
    Notiflix.Notify.failure(
      'Not found Film ' + newFilm.title + ' in ' + localStorageKey + ' to remove from it.',
    );
  }
};
