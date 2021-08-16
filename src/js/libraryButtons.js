import { hidePagination, showPageMyLibrary} from './showPage'
import { getRefs } from './refs';
import { doLocalisation } from './localization';

export const onWatchedButtonClick = e => {
    showPageMyLibrary('watched');
    hidePagination(getRefs());
    doLocalisation();
}
export const onQueueButtonClick = e => {
    showPageMyLibrary('queue');
    hidePagination(getRefs());
    doLocalisation();
}