'use strict';

const BASE_URL = new URL("http://exam-2023-1-api.std-900.ist.mospolytech.ru/api/routes?api_key=b972478d-9fb3-4651-9efc-4e96ffc84c43");

/*const xhr = new XMLHttpRequest()
xhr.open('GET', BASE_URL)

xhr.responseType = 'json'

xhr.onload = () => {
    console.log(xhr.response)
}

xhr.send()*/
// Функция для получения данных
function getData() {
    var xhr = new XMLHttpRequest();
   
    // Запрос GET к серверу
    xhr.open('GET', BASE_URL, true);
   
    // Обработка ответа от сервера
    xhr.onload = function() {
       if (xhr.status === 200) {
         // Парсинг JSON-объекта
         var data = JSON.parse(xhr.responseText);
   
         // Вывод информации на страницу
         displayData(data);
       } else {
         console.error('Ошибка:', xhr.status);
       }
    };
   
    // Обработка ошибок
    xhr.onerror = function() {
       console.error('Ошибка при запросе данных');
    };
   
    // Отправка запроса
    xhr.send();
   }
   
   // Функция для вывода информации на страницу
   function displayData(data) {
    var table = '<table><tr><th>Название</th><th>Описание</th><th>Основной объект</th></tr><tr></tr>';
   
    // Цикл по каждому элементу данных
    for (var i = 0; i < data.length; i++) {
      table += '<tr>';
      //table += '<td>' + data[i].id + '</td>';
      table += '<td>' + data[i].name + '</td>';
      table += '<td>' + data[i].description + '</td>';
      //table += '<td>' + data[i].created_at + '</td>';
      table += '<td>' + data[i].mainObject + '</td>';
      table += '<td>' + '<button name = "select"> Выбрать </button>'  + '</td>'
      table += '</tr>';
    }
   
    table += '</table>';
   
    // Вставка таблицы на страницу
    document.getElementById('table-container').innerHTML = table;
   }
   
   // Вызов функции для получения данных
   getData();