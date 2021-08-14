import { moviesForWatched, moviesForQueue } from './testObjForLocalStor';
import { hidePagination, showPageMyLibrary} from './showPage'
import { getRefs } from './refs';

export const onWatchedButtonClick = e => {
    showPageMyLibrary('watched');
    hidePagination(getRefs());
}
export const onQueueButtonClick = e => {
    showPageMyLibrary('queue');
    hidePagination(getRefs());
}