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

export const tooggleClassCurrent = (refToAdd, ferToRemove) => {
    addClass(refToAdd, 'current');
    removeClass(ferToRemove, 'current');
}

export const tooggleClassFilterIsActive = (refToAdd, ferToRemove) => {
    addClass(refToAdd, 'filter_is_active');
    removeClass(ferToRemove, 'filter_is_active');
}

export const tooggleRandomClass = (ref, classToAdd, classToRemove) => {
    addClass(ref, classToAdd);
    removeClass(ref, classToRemove);
}

export const changeClasses = (refToRemoveCurrent, classToRemove, refToAddCurrent, classToAdd) => {
    const refs = getRefs();
    const header = refs.headerContainer;
    tooggleRandomClass(header, classToAdd, classToRemove);
    tooggleClassCurrent(refToAddCurrent, refToRemoveCurrent);
}