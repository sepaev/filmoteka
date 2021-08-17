import { getRefs } from "./refs"
import { doNotification } from "./localization";
import { hidePagination, showPageHomeGenres } from "./showPage";

export const doOpenGenre = (id, name, instance) => {
    const refs = getRefs();
    refs.galleryItems.innerHTML = '';
    hidePagination(refs);
    showPageHomeGenres(1, id, name);
    if (instance) instance.close();
}