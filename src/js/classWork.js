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