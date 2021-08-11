import { showPageHome } from './showPage'
let prevVal = '';

export const onSearchBoxChange = e => {
    if (e.key === 'Enter') {
        showPageHome(1);
    }
    let value = prevVal > e.target.value ? '' : e.target.value;
    prevVal = value;
    e.target.value = value;
}
export const onSearchBoxFocus = e => {
    console.log('Фокус searchBox');
    console.log(e);
}