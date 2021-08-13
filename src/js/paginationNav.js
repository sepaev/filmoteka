import { showPageHome } from './showPage'
import { getRefs } from "./refs";

   const refs = getRefs();   

let buttons = {
    leftArrow: null,
    prev: null,
    centralPages: [],
    next: null,
    rightArrow: null,
    current: null,
    firstButton: null,
    lastButton: null,
};



const writeButtons = buttonsObj => {
    refs.pagesButton.children[0].children[0].textContent = buttonsObj.centralPages[0];
    refs.pagesButton.children[1].children[0].textContent = buttonsObj.centralPages[1];
    refs.pagesButton.children[2].children[0].textContent = buttonsObj.centralPages[2];
    refs.pagesButton.children[3].children[0].textContent = buttonsObj.centralPages[3];
    refs.pagesButton.children[4].children[0].textContent = buttonsObj.centralPages[4];

    if (buttonsObj.leftArrow !== null) {
        refs.leftButton.style.display = 'block';
      
    } else {
        refs.leftButton.style.display = 'none';
    }

    if (buttonsObj.rightArrow !== null) {
        refs.rightButton.style.display = 'block';
    } else {
        refs.rightButton.style.display = 'none';
    }
    if (buttonsObj.prev !== null) {
        refs.prevButton.textContent = buttonsObj.prev;
        refs.prevButton.style.display = 'inherit';
    } else {
        refs.prevButton.style.display = 'none';
    };
    if (buttonsObj.next !== null) {
        refs.nextButton.textContent = buttonsObj.next;
        refs.nextButton.style.display = 'inherit';
    } else {
        refs.nextButton.style.display = 'none';
    }
    if (buttonsObj.firstButton !== null) {
        refs.firstButton.textContent = buttonsObj.firstButton;
        refs.firstButton.style.display = 'inherit';
    } else {
        refs.firstButton.style.display = 'none';
    }
    if (buttonsObj.lastButton !== null) {
        refs.lastButton.textContent = buttonsObj.lastButton;
        refs.lastButton.style.display = 'inherit';
    } else {
        refs.lastButton.style.display = 'none';
    }
    

};

export const renderPaginationBtn = (totalPages, currentPage) => {
    if (currentPage > totalPages) {
        currentPage = 1;
    }
    
    if (currentPage <= 3) {//не нужна первая стрелка и prev, pages рисует 12345
        buttons = {
            leftArrow: null,
            prev: null,
            centralPages: [1, 2, 3, 4, 5],
            next: '...',
            rightArrow: '',
            current: currentPage,
            firstButton: null,
            lastButton: totalPages,
        };
        writeButtons(buttons);
    }

    if (currentPage > 3 && currentPage <= totalPages - 3) {


        buttons = {
            leftArrow: '',
            prev: '...',
            centralPages: [currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2],
            next: '...',
            rightArrow: '',
            current: currentPage,
            firstButton: 1,
            lastButton: totalPages,
        };
        writeButtons(buttons);
    }

    if (currentPage > totalPages - 3 && currentPage <= totalPages) {
        buttons = {
            leftArrow: '',
            prev: '...',
            centralPages: [totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages],
            next: null,
            rightArrow: null,
            current: currentPage,
            firstButton: 1,
            lastButton: null,
        };
        writeButtons(buttons);
    }//не нужна вторая стрелка и next,  последние 5цифр
    
};


export const onPaginationNavClick = page => {
    showPageHome(page);
    let totalPages = 20;
    const currentPage = parseInt(page);

    renderPaginationBtn(totalPages, currentPage);
    
};


