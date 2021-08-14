import { showPageHome } from './showPage'

export const onSearchBoxChange = e => {
    if (e.key === 'Backspace') e.target.value = '';
    if (e.key === 'Enter') {
        showPageHome(1);
    }
 }
export const onSearchBoxFocus = e => {
    console.log('Фокус searchBox');
    console.log(e);
}