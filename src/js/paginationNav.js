import { showPageHome } from './showPage';
import { getRefs } from "./refs";

//    const refs = getRefs();   

let buttons = {
    leftArrow: 'x',
    prev: ['x', 0],
    centralPages: [],
    next: ['x', 0],
    rightArrow: 'x',
    current: 'x',
    firstButton: 'x',
    lastButton: 'x',
};

const checkElement = (elem, ref) => {
    if (!elem) {
        return;
    };
    if (elem.length > 1) {
        if (elem[0] !== 'x') {
            ref.textContent = elem[0];
            ref.dataset.number = elem[1];
            ref.style.display = 'block';
        } else {
            ref.style.display = 'none';
            ref.dataset.number = '';
        };
    } else {
        if (elem !== 'x') {
            ref.textContent = elem;
            ref.dataset.number = elem;
            ref.style.display = 'block';
        } else {
            ref.style.display = 'none';
            ref.dataset.number = '';
        };
    }
}

const checkElementForArrow = (elem, ref) => {
     if (elem.length > 1) { 
        if (elem[0] !== 'x') {
            ref.dataset.number = elem[1];
            ref.style.display = 'block';
        } else {
            ref.style.display = 'none';
        };
    } else {
        if (elem !== 'x') {
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
    checkElementForArrow(buttonsObj.leftArrow, refs.leftButton);
    checkElementForArrow(buttonsObj.rightArrow, refs.rightButton);


    checkElement(buttonsObj.prev, refs.prevButton);
    checkElement(buttonsObj.next, refs.nextButton);
    checkElement(buttonsObj.firstButton, refs.firstButton);
    checkElement(buttonsObj.lastButton, refs.lastButton);
};

export const renderPaginationBtn = (totalPages, currentPage) => {   
    if (currentPage > totalPages) {
        currentPage = 1;
    }
    
    if (currentPage <= 3) { // промежуток до 3 страницы
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
        if (totalPages <= 5) {
            buttons.centralPages = [1, 2, 3, 4, 5].slice(0, totalPages);
            buttons.next = ['x', 0];
            buttons.rightArrow = 'x';
            buttons.lastButton = 'x';
        }
        writeButtons(buttons);
        return;
    }

    if (currentPage > 3 && currentPage <= totalPages - 3) { // промежуток от 3 до (последней - 3);
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
        return;
    }

    if (currentPage > totalPages - 3 && currentPage <= totalPages) { //промежуток от (последней - 3) до последней
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
        return;
    }
    
};


export const onPaginationNavClick = page => {
    showPageHome(parseInt(page));

    // console.log('Загружаю страницу' + page);
   
};

export const makeButtonActiv = (currentPage) => {
    const currentButton = document.querySelector(`a[data-number='${currentPage}'`);
    const activButton = document.querySelector('.current-page');
    console.dir(activButton);
    if (activButton) activButton.classList.remove('current-page');
    currentButton.classList.add('current-page');
};

