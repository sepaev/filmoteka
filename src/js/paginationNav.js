export const onPaginationNavClick = e => {
    if (e.target.nodeName === "A") {
        console.log('Кликаем по '+e.target.textContent);
    }
}