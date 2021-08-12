import * as basicLightbox from 'basiclightbox';
import { getRefs } from './refs';
import { loadEscListner } from './escClose';
import {renderMovie} from './renderGallery';
import {fetchGetMovieById} from './getContent';

const refs = getRefs();
const instance = basicLightbox.create(refs.modalFilm);


export const onFilmClick = (e) => {
    const targetCard = e.target.parentNode.parentNode.parentNode;
    console.dir(e.target);
    
    if (e.target.nodeName !== 'IMG') {
        return;
      }
      const targetCardId = targetCard.dataset.id;
      console.log(targetCardId)
//     instance.show(() => {
//       fetchGetMovieById(targetCardId).then(data => renderMovie(data)) 
//    })
   

    if (targetCard.className === "film") { // проверка на клик (нужно тестить. может нужно менять)
        // 1 тут получить id фильма
        instance.show(() => {
            fetchGetMovieById(targetCardId).then(data => renderMovie(data))
            //refs.modalCard.innerHTML = 'id ' + targetCardId;
        
        });// 2 открывает модалку фильма         
        // обработка клика по esc   
        loadEscListner(instance);

        // 3 после открытия реализовать функционал подгрузки innerHTML в модалку по id
        // 3.1 сначала методом find искать по id  совпаления в localStorage
        // 3.2 если не найдено - искать в API через функцию getContentById
        // обработка клика по modal film close button
            refs.modalFilmCloseBtn.addEventListener('click', e => {
            e.preventDefault;
            onFilmCloseClick(); //from "./js/footerDevelopers"  клик кнопке закрытия модалки
        });
    }
}

const onFilmCloseClick = () => {
    instance.close();
}

