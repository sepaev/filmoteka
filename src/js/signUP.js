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
 
//Функция для регистрации пользователя //

document.getElementsById("submit").onclick = function () {
    let name = document.getElementsById("name").value;
    let password = document.getElementsById("password").value;
    let password_2 = document.getElementsById("password_2").value;
    let email = document.getElementsById("email").value;
    if (name == "") {
           alert("Введите ваше имя");
       }
       else if (password == "") {
           alert("Введите пароль");
       }
       else if (password_2 == "") {
           alert("Повторите пароль");
       }
       else if (password != password_2) {
           alert("Введенные пароли не совпадают");
       }
       else if (password.length < 6) {
           alert("Пароль должен быть не меньше 6 символов");
       }
       else if (email == "") {
           alert("Введите ваш email");
       }
       else {
           alert("ok");
       }
  
 }

