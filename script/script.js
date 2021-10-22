'use strict';

const form = document.querySelector('#form');
const formInput = document.querySelector('#form_url');

var tt;
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var request = new XMLHttpRequest();

function loadComplete(evt) {
    tt = JSON.parse(request.responseText);
    console.log(tt.video);
    return tt;
} 

function loadData() {
    request.open('POST', 'https://t3hverm.ru');
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = loadComplete;
    var data = JSON.stringify({"url": formInput.value});
    request.send(data);
}

//ФУНКЦИЯ ОБРАБАТЫВАЕТ НАЖАТИЕ КНОПКИ
form.addEventListener('submit', (event) => {
    event.preventDefault();

    loadData();

    cross_download(url - то, что должны получить в loadData(), 'file')
});

//ФУНКЦИЯ ЗАБИРАЕТ ССЫЛКУ, ЧТО ПОЛУЧИЛИ НА СЕРВЕРЕ  И СКАЧИВВЕТ ФАЙЛ НА КОМПЬЮТЕР ПОЛЬЗОАТЕЛЮ
function cross_download(url, fileName) {
    var req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.responseType = "blob";
    var __fileName = fileName;
    req.onload = function (event) {
        var blob = req.response;
        var contentType = req.getResponseHeader("content-type");
        if (window.navigator.msSaveOrOpenBlob) {
            // Internet Explorer
            window.navigator.msSaveOrOpenBlob(new Blob([blob], {type: contentType}), fileName);
        } else {
            var link = document.createElement('a');
            document.body.appendChild(link);
            link.download = __fileName;
            link.href = window.URL.createObjectURL(blob);
            link.click();
            document.body.removeChild(link); //remove the link when done
        }
    };
    req.send();
}

function get_file_url(url) {
	var link_url = document.createElement("a");
	link_url.download = url.substring((url.lastIndexOf("/") + 1), url.length);
	link_url.href = url;
	document.body.appendChild(link_url);
	link_url.click();
	document.body.removeChild(link_url);
	// delete link_url;
}
