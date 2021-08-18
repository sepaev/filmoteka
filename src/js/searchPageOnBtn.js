import * as basicLightbox       from 'basiclightbox';
import { getRefs }              from './refs';
import { showPageHome }         from './showPage'
import { doNotification }       from './localization'

let alert = true;
const turnAlert = (bool) => alert = bool;

const refs = getRefs();
const modalParameters = {
    onClose: () => {
        turnAlert(true);
        document.onkeypress = null;
        refs.buttonScs.removeEventListener('click', onModalBtnClick);
    }
};

const instance = basicLightbox.create(refs.containerScs, modalParameters);
const onModalBtnClick = (e) => {
    if (refs.inputScs.value) {
        const pageNumber = parseInt(refs.inputScs.value);
        showPageHome(pageNumber)
        refs.inputScs.value = '';
        instance.close();
    }
 };

refs.searchPage.addEventListener('click', openSearchModal);

function openSearchModal(event) {
    event.preventDefault();
    instance.show(() => {
        refs.inputScs.focus();
        refs.buttonScs.addEventListener('click', onModalBtnClick)
        document.onkeydown = (e) => {
            const key = e.keyCode;
            console.log(key);
            if (key === 13 && refs.inputScs.value==='') {
                instance.close();
                return;
            }
            if (key === 13) { // enter
                const pageNumber = parseInt(refs.inputScs.value);
                showPageHome(pageNumber)
                refs.inputScs.value = '';
                instance.close();
                return;
            }
            if (key === 27) { // esc
                instance.close();
                return;
            }
            if (key < 48 || key > 57) { // все что не цыфры
                if (key >= 16 && key <= 20) return
                if (key >= 33 && key <= 36) return
                if (key === 8 || key === 9 || key === 46 || key === 144) return;
                const inf = { en: 'Digits only', ru: 'Допускаются только цыфры', ua: 'Можливо вводитит тільки цифри' };
                if (alert) doNotification(inf.en, inf.ru, inf.ua, 'info');
                turnAlert(false);
                window.setTimeout(e => turnAlert(true), 3000);
                return;
            }   
        }
    });
}
