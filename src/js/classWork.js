import { getRefs } from "./refs";

export const addClass = (target, className) => {
    if (!target.classList.contains(className)) {
        target.classList.add(className);
    }
};

export const removeClass = (target, className) => {
    if (target.classList.contains(className)) {
        target.classList.remove(className);
    }
};

export const changeClasses = (refToRemoveCurrent, classToRemove, refToAddCurrent, classToAdd) => {
        const refs = getRefs();
        addClass(refs.headerContainer, classToAdd);
        addClass(refToAddCurrent, 'current');
        removeClass(refs.headerContainer, classToRemove);
        removeClass(refToRemoveCurrent, 'current');
}