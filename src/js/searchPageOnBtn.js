import * as basicLightbox       from 'basiclightbox';
import { getRefs }              from './refs';
import { showPageHome }         from './showPage'
import { doLocalization, doNotification }       from './localization'

let alert = true;
const turnAlert = (bool) => alert = bool;

const refs = getRefs();
const instanceParameters = {
    onClose: () => {
        turnAlert(true);
        document.onkeypress = null;
        refs.buttonGoToPage.removeEventListener('click', goToPage);
    }
};

const instance = basicLightbox.create(refs.containerGoToPage, instanceParameters);

refs.searchPage.addEventListener('click', openSearchModal);

function goToPage() {
    const last = parseInt(refs.lastButton.textContent);
    const target = parseInt(refs.inputGoToPage.value);
    const inf = { en: 'Input number less then '+last, ru: 'Введите число меньше '+last, ua: 'Введіть число меньше за '+last };
    refs.inputGoToPage.value = '';
    if (target > last) {
        doNotification(inf.en, inf.ru, inf.ua, 'failure');
        refs.inputGoToPage.focus();

        return;
    };

    showPageHome(target);
    instance.close();
}

function openSearchModal(event) {
    event.preventDefault();
    instance.show(() => {
        doLocalization();
        refs.inputGoToPage.focus();
        refs.buttonGoToPage.addEventListener('click', goToPage);
        document.onkeydown = (e) => {
            const key = e.keyCode;
            console.log(key);
            if (key === 13 && refs.inputGoToPage.value==='') {
                instance.close();
                return;
            }
            if (key === 13) { // enter
                goToPage();
                return;
            }
            if (key === 27) { // esc
                instance.close();
                return;
            }
            if (key < 48 || key > 57) { // все что не цыфры
                if (key >= 16 && key <= 20) return
                if (key >= 33 && key <= 36) return
                if (key >= 96 && key <= 105) return
                if (key === 8 || key === 9 || key === 46 || key === 144) return;
                const inf = { en: 'Digits only', ru: 'Допускаются только цыфры', ua: 'Можливо вводити тільки цифри' };
                if (alert) doNotification(inf.en, inf.ru, inf.ua, 'info');
                turnAlert(false);
                window.setTimeout(e => turnAlert(true), 3000);
                return;
            }   
        }
    });
}
