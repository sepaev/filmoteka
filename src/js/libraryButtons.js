import { moviesForWatched, moviesForQueue } from './testObjForLocalStor';
import { showPageMyLibrary} from './showPage'

export const onWatchedButtonClick = e => {
    showPageMyLibrary('watched');
}
export const onQueueButtonClick = e => {
    showPageMyLibrary('queue');
}