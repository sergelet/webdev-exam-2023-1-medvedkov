'use strict';
const url = new URL("http://exam-2023-1-api.std-900.ist.mospolytech.ru/api/routes?api_key=26a75d98-76bf-48a8-9acd-e75e991c56cb");
const pang = {
   page: 1,
   obj_on_page: 9,
   counter: 0,
};

function getData() {
   var xhr = new XMLHttpRequest();
   
   // Запрос GET к серверу
   xhr.open('GET', url, true);
   
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
   var table = document.getElementById('path');
   var tbody = table.getElementsByTagName('tbody')[0];
   
   // Очистка таблицы от старых данных
   while (tbody.firstChild) {
      tbody.removeChild(tbody.firstChild);
   }
   
   clear(tbody); //Очистка

   pang.counter = Math.ceil(data.length / pang.obj_on_page);
   var start = (pang.page - 1) * pang.obj_on_page;
   var end = start + pang.obj_on_page;
   var displayedData = data.slice(start, end);

   // Цикл по каждому элементу данных
   for (var i = 0; i < displayedData.length; i++) {
      var obj = displayedData[i];
      var row = tbody.insertRow();

      var elem1 = row.insertCell();
      elem1.innerHTML = obj.name;
      
      var elem2 = row.insertCell();
      elem2.innerHTML = obj.description;
      
      var elem3 = row.insertCell();
      var elem4 = row.insertCell();
      
      var mainObject = obj.mainObject;
      var mainObjectCell = document.createElement('ul');
      var list = document.createElement('list');
      list.textContent = mainObject;
      mainObjectCell.appendChild(list);      
      elem3.appendChild(mainObjectCell);
      
      var btn = document.createElement('button');
      btn.textContent = 'Выбрать';
      elem4.appendChild(btn);
   }
      
}

//Функции для пагинации

function clear(body){
   body.innerHTML = '';
}

function getBackPage() {
    if (pang.page > 1) {
       pang.page--;
       getData();
    }
 }
 

function getNextPage() {
   if (pang.page < pang.counter) {
      pang.page++;
      getData();
   }
}

// Вызов функции для получения данных
window.onload = () => {
   getData();
};