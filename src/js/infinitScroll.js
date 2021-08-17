import { showMorePageHomeGenres } from "./showPage";

export const getHeightOfDocument = () => {
    return Math.max(parseFloat(document.body.clientHeight), parseFloat(document.body.offsetHeight), parseFloat(document.body.scrollHeight));
}

const isBottom = (height, position) => {
    return (position + 1000 > height );
}

export const scrollingWindow = async (currentPage, genreId) => {
    const currentPosition = window.scrollY;
    const bottomPosition = getHeightOfDocument();
    console.log(currentPosition + 1000 +' > '+ bottomPosition + ' = ' +isBottom(bottomPosition, currentPosition));
    if (isBottom(bottomPosition, currentPosition) && bottomPosition > 1000) {
        return showMorePageHomeGenres(currentPage, genreId)
    };
    return currentPage;
    
}