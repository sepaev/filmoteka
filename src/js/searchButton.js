import {showPageHome} from './showPage'

export const onSearchButtonClick = e => {
    e.preventDefault;       
    showPageHome(1);
}