import * as basicLightbox from 'basiclightbox';


export const onDevLinkClick = (e, refs) => {
        const instance = basicLightbox.create(refs.modalDevs);
        // instance.show();
        instance.show(() => console.log('lightbox developers now visible'));
        console.log('Кликаем по фильмам');
        console.dir(e.target);

}