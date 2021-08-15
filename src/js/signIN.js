//Функция открытия модалки, закрытия модалки по клику на крестик или в любой точки экрана //

let btns = document.querySelectorAll("*[data-modal-btn]")

for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener('click', function () {
        let name = btns[i].getAttribute('data-modal-btn');
        let modal = document.querySelector("[data-modal-window='" + name + "']");
        modal.style.display = "block";
        let close = modal.querySelector(".modal__regist-closebtn");
        close.addEventListener('click', function() {
            modal.style.display = "none";
        })
  })
}

window.onclick = function (e) {
    if (e.target.hasAttribute('data-modal-window')) {
        let modals = document.querySelectorAll("*[data-modal-window]");
        for (let i = 0; i < modals.length; i++) {
            modals[i].style.display = "none"
        }
    }
    
}
