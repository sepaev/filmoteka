import { showMorePageHomeGenres } from "./showPage";

export const getHeightOfDocument = () => {
    return Math.max(parseFloat(document.body.clientHeight), parseFloat(document.body.offsetHeight), parseFloat(document.body.scrollHeight));
}

const isBottom = (height, position) => {
    return (position + 500 > height );
}

export const scrollingWindow = async (currentPage, genreId) => {
    const currentPosition = window.scrollY;
    const bottomPosition = getHeightOfDocument();
    if (isBottom(bottomPosition, currentPosition) && bottomPosition > 1000) {
        return showMorePageHomeGenres(currentPage, genreId)
    };
    return currentPage;
    
}