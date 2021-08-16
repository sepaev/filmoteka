import { hidePagination, showPageMyLibrary} from './showPage'
import { getRefs } from './refs';
import { tooggleClassCurrent} from './classWork';
import { doLocalisation } from './localization';

export const onWatchedButtonClick = e => {
    showPageMyLibrary('watched');
    const ref = getRefs()
    hidePagination(ref);
    doLocalisation();
    tooggleClassCurrent(ref.watchedBtn, ref.queueBtn);
}
export const onQueueButtonClick = e => {
    const ref = getRefs()
    showPageMyLibrary('queue');
    hidePagination(ref);
    tooggleClassCurrent(ref.queueBtn, ref.watchedBtn);
    doLocalisation();
}