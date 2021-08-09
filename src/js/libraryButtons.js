import { moviesForWatched, moviesForQueue } from './testObjForLocalStor';

export const onWatchedButtonClick = e => {
    console.log('on Watched Button Click');
    console.log(e);
    const string = JSON.stringify(moviesForWatched)
    localStorage.setItem('watched', string)
    alert('B localStorage с ключем "watched" добавлена строка '+string)
}
export const onQueueButtonClick = e => {
    console.log('on Queue Button Click');
    console.log(e);
    const string = JSON.stringify(moviesForQueue)
    localStorage.setItem('queue', string)
    alert('B localStorage с ключем "queue" добавлена строка '+string)
}