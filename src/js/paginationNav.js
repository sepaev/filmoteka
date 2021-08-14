import { showPageHome } from './showPage'
import { getRefs } from "./refs";

   const refs = getRefs();   

let buttons = {
    leftArrow: null,
    prev: [null, 0],
    centralPages: [],
    next: [null, 0],
    rightArrow: null,
    current: null,
    firstButton: null,
    lastButton: null,
};

const checkElement = (elem, ref) => {
    if (!elem) {
        console.dir('RETURN!!!!!  - ' + ref);
        console.dir(ref);
        return;
    };
    console.log(elem);
    console.dir(elem);
    if (elem.length > 1) { // если ...
        if (elem[0] !== 'x') {
            ref.textContent = ref.textContent;
            ref.dataset.number = elem[1]
            ref.style.display = 'block';
        } else {
            ref.style.display = 'none';
        };
    } else {
        if (elem !== 'x') {
            ref.textContent = ref.textContent;
            ref.dataset.number = elem;
            ref.style.display = 'block';
        } else {
            ref.style.display = 'none';
        };
    }
} 

const writeButtons = buttonsObj => {
    const refs = getRefs();
    for (let i = 0; i < 5; i++){
        refs.pagesButton.children[i].children[0].textContent = buttonsObj.centralPages[i];
        refs.pagesButton.children[i].children[0].dataset.number = buttonsObj.centralPages[i];
    }
    checkElement(buttonsObj.leftArrow, refs.leftButton);
    checkElement(buttonsObj.rightArrow, refs.rightButton);
    checkElement(buttonsObj.prev, refs.prevButton);
    checkElement(buttonsObj.next, refs.nextButton);
    checkElement(buttonsObj.firstButton, refs.firstButton);
    checkElement(buttonsObj.lastButton, refs.lastButton);
};

export const renderPaginationBtn = (totalPages, currentPage) => {
    if (currentPage > totalPages) {
        currentPage = 1;
    }
    
    if (currentPage <= 3) {//не нужна первая стрелка и prev, pages рисует 12345
        buttons = {
            leftArrow: 'x',
            prev: ['x', 0],
            centralPages: [1, 2, 3, 4, 5],
            next: ['...', 6],
            rightArrow: currentPage+1,
            current: currentPage,
            firstButton: 'x',
            lastButton: totalPages,
        };
        writeButtons(buttons);
    }

    if (currentPage > 3 && currentPage <= totalPages - 3) {


        buttons = {
            leftArrow: currentPage-1,
            prev: ['...', currentPage - 3],
            centralPages: [currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2],
            next: ['...', currentPage + 3],
            rightArrow: currentPage+1,
            current: currentPage,
            firstButton: 1,
            lastButton: totalPages,
        };
        writeButtons(buttons);
    }

    if (currentPage > totalPages - 3 && currentPage <= totalPages) {
        buttons = {
            leftArrow: currentPage-1,
            prev: ['...', totalPages - 5],
            centralPages: [totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages],
            next: ['x', 0],
            rightArrow: 'x',
            current: currentPage,
            firstButton: 1,
            lastButton: 'x',
        };
        writeButtons(buttons);
    }//не нужна вторая стрелка и next,  последние 5цифр
    
};


export const onPaginationNavClick = page => {
    showPageHome(parseInt(page));
    console.log('Загружаю страницу' + page);
   
};


