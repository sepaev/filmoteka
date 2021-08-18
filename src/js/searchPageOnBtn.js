import { getRefs } from "./refs";
import * as basicLightbox from 'basiclightbox';
import { showPageHome } from './showPage'

const refs = getRefs();
const modalParameters = {
    onClose: () => {
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
        document.onkeypress = (e) => {
            if (e.keyCode === 13 && refs.inputScs.value) {
                const pageNumber = parseInt(refs.inputScs.value);
                showPageHome(pageNumber)
                refs.inputScs.value = '';
                instance.close();
            } 
        }
        refs.buttonScs.addEventListener('click', onModalBtnClick)
    });
}
