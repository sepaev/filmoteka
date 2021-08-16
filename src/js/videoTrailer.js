import { getRefs } from './refs'
import * as basicLightbox from 'basiclightbox';
import { consts } from "./consts";
import axios from 'axios';
import { loadEscListner } from './escClose';
import Notiflix from "notiflix";


const refs = getRefs();
const { API_KEY, API_URL } = consts;
axios.defaults.baseURL = `${API_URL}`;


refs.galleryItems.addEventListener('click', e => { 
// console.log(e.target.className);

    if (e.target.className !== 'film-overlay__text' && e.target.className !== 'film-overlay__img') {
        return 
    }
    else {
        e.preventDefault;
    //   console.log('2222');
      const targetCardId = (e.target.parentNode.parentNode.parentNode.parentNode.parentNode.dataset.id || e.target.parentNode.parentNode.parentNode.parentNode.dataset.id);
      // console.dir(e.target.parentNode.parentNode.parentNode.parentNode);
      // alert(e.target.parentNode.parentNode.parentNode.parentNode);

    //   console.log(targetCardId);
      openModalVideoTrailer(targetCardId);
        

    
  }
});


function openModalVideoTrailer(id) {
  
    const url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=${consts.LANGUAGE}`;
  console.log(id)
  Notiflix.Loading.pulse();
      fetch(url)
        .then(response => response.json())
        .then(data => {

          const id = data.results[0].key;
          
          const instance = basicLightbox.create(`
    <iframe width="75%" height="75%" src='https://www.youtube.com/embed/${id}'frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  `);
          instance.show();
          let newRef;
          window.setTimeout(e => {
            Notiflix.Loading.remove();
            // newRef = document.querySelector('.basicLightbox__placeholder');
            // const iframeNodeValue = newRef.children[0].attributes[2]
            // console.dir(iframeNodeValue);
          }
            , 2000);
          modalCloseTrailer(instance);
          console.dir(instance);
        })
        .catch(() => {
          const instance = basicLightbox.create(`
      <iframe width="75%" height="75%" src='http://www.youtube.com/embed/zwBpUdZ0lrQ' frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        `);
  
          instance.show();
          modalCloseTrailer(instance);
          window.setTimeout(e => {
            Notiflix.Loading.remove();
            Notiflix.Notify.failure('404 Not Found this trailer');
          }, 1500);
        });
    }

    function modalCloseTrailer(instance) {
        
        loadEscListner(instance);

        const closeBtn = document.querySelector('.basicLightbox--iframe');
        closeBtn.insertAdjacentHTML(
          'afterbegin',
          `<button
            type="button"
            class="modal-trailer__close-btn"
            data-action="close-lightbox"
            >&#x2715</button>
        `,
        );
       
        const modalCloseBtn = document.querySelector(
          '[data-action="close-lightbox"]',
        );
      modalCloseBtn.addEventListener('click', () =>instance.close()
        
        )
    }