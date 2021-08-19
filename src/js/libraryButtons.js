import { hidePagination, showPageMyLibrary} from './showPage'
import { getRefs } from './refs';
import { tooggleClassCurrent} from './classWork';
import { doLocalization } from './localization';

export const onWatchedButtonClick = e => {
    e.preventDefault;
    showPageMyLibrary('watched');
    const ref = getRefs()
    hidePagination(ref);
    doLocalization();
    tooggleClassCurrent(ref.watchedBtn, ref.queueBtn);
}
export const onQueueButtonClick = e => {
    e.preventDefault;
    const ref = getRefs()
    showPageMyLibrary('queue');
    hidePagination(ref);
    tooggleClassCurrent(ref.queueBtn, ref.watchedBtn);
    doLocalization();
}