import { showMorePageHomeGenres } from "./showPage";
let prevPosition = 0;
let allowFetch = true;
export const getHeightOfDocument = () => {
    return Math.max(parseFloat(document.body.clientHeight), parseFloat(document.body.offsetHeight), parseFloat(document.body.scrollHeight));
}

const isBottom = (height, position) => {
    return (position + 1000 > height );
}

export const scrollingWindow = async (currentPage, genreId, genreName) => {
    const currentPosition = window.scrollY;
    const bottomPosition = getHeightOfDocument();
    if (isBottom(bottomPosition, currentPosition) && bottomPosition > 1000 && currentPosition > prevPosition && allowFetch) {
        allowFetch = false;
        return showMorePageHomeGenres(currentPage, genreId, genreName)
            .then(page => {
                allowFetch = true;
                return page;
            });
    };
    prevPosition = currentPosition;
    return currentPage;
    
}