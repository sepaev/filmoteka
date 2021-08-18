import searchListTempl from '../partials/templates/searchListTemplate.hbs';

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
    const searchListRef = document.querySelector("[data-index='card-list']");
    searchListRef.classList.add('open');
    const markup = searchListTempl(arrRender);
    searchListRef.innerHTML = markup;
  
    document.addEventListener('click', handlerCloseList);
    window.addEventListener('keydown', hendlerEscCloseList);
  }
  /**
    This function deletes a pop-up bar
   */
  function deleteListSearch() {
    const searchListRef = document.querySelector("[data-index='card-list']");
    searchListRef.innerHTML = '';
    searchListRef.classList.remove('open');
    document.removeEventListener('click', handlerCloseList);
    window.removeEventListener('keydown', hendlerEscCloseList);
    // makeCardsActive();
  }
  
  function sortByRating(array) {
    return array.sort((a, b) => b.vote_average - a.vote_average);
  }
  
  function handlerCloseList(event) {
    event.preventDefault();
    const searchListRef = document.querySelector("[data-index='card-list']");
    if (!searchListRef) {
      return;
    }
    if (!searchListRef.contains(event.target)) {
      deleteListSearch();
    }
  }
  
  function hendlerEscCloseList({ code }) {
    if (code === 'Escape') {
      deleteListSearch();
    }
  }
    
  export { renderListSearch, deleteListSearch };