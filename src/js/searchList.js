import {searchListTempl} from '../partials/templates/searchListTemplate';
import {getRefs} from './refs';

const refsMain = getRefs();

function renderListSearch(searchValue, objects) {
    if (!searchValue) {
      deleteListSearch();
      return;
    }
    let cloneObjects = JSON.parse(JSON.stringify(objects));
    let arrRender = sortByRating(cloneObjects);
    if (arrRender.length > 6) {
      arrRender = cloneObjects.slice(0, 5);
    }
    refsMain.cardListOnSearch.classList.add('open');
    const markup = searchListTempl(arrRender);
    refsMain.cardListOnSearch.innerHTML = markup;
  
    document.addEventListener('click', handlerCloseList);
    window.addEventListener('keydown', hendlerEscCloseList);
  }
  /**
    This function deletes a pop-up bar
   */
  function deleteListSearch() {
    refsMain.cardListOnSearch.innerHTML = '';
    refsMain.cardListOnSearch.classList.remove('open');
    document.removeEventListener('click', handlerCloseList);
    window.removeEventListener('keydown', hendlerEscCloseList);
    // makeCardsActive();
  }
  
  function sortByRating(array) {
    return array.sort((a, b) => b.vote_average - a.vote_average);
  }
  
  function handlerCloseList(event) {
    event.preventDefault();
    if (!refsMain.cardListOnSearch) {
      return;
    }
    if (!refsMain.cardListOnSearch.contains(event.target)) {
      deleteListSearch();
    }
  }
  
  function hendlerEscCloseList({ code }) {
    if (code === 'Escape') {
      deleteListSearch();
    }
  }
  
  
  
  export { renderListSearch, deleteListSearch };