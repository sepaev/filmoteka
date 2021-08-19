function ajax(url, method, functionName, dataArray) {
    let xhttp = new XMLHttpRequest();
    xhttp.open(method, url, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(requestData(dataArray));

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            functionName(this.response);
        }

    }

}

function requestData (dataArr) {
    let out = '';
    for (let key in dataArr) {
        out += `${key}=${dataArr[key]}&`;
    }
    // console.log(out);
    return out;
}

document.querySelector('#submit').onclick = function (event) {
    event.preventDefault();
    let name = document.querySelector('#name').value;
    let password = document.querySelector('#password').value;
    let password_2 = document.querySelector('#password_2').value;
    let email = document.querySelector('#email').value;
    let sex = document.querySelectorAll('.sex');
    for (let i = 0; index < sex.length; i++) {
        if (sex[i].checked) {
            sex = sex[i].value;
            break;
        }
        
    }
    let data = {
        "name": name,
        "password": password.value,
        "password_2": password_2,
        "email": email,
        "sex": sex,
    }
    ajax('https://api.themoviedb.org/3/', 'POST', login, data);

    function login(result) {
        // console.log(result);
        if (result == 2) {
            alert('Заполните поля');
        }
        else if (result == 1) {
            alert('Вы успешно зарегистрировались');
        }
        else {
            alert('Ошибка, повторите позже!');
        }
    }
}