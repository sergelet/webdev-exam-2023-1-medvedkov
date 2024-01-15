'use strict';

const baseURL = "http://exam-2023-1-api.std-900.ist.mospolytech.ru/api/routes";
const api_key = "26a75d98-76bf-48a8-9acd-e75e991c56cb";
const url = new URL(baseURL);
url.searchParams.append('api_key', api_key);

const paging = {
   currentPage: 1,
   itemsPerPage: 9,
   totalPages: 0,
};

async function fetchData() {
   try {
      const response = await fetch(url);
      if (response.ok) {
         const data = await response.json();
         displayData(data);
      } else {
         throw new Error(`HTTP error! status: ${response.status}`);
      }
   } catch (error) {
      console.error('Error fetching data:', error);
   }
}

function displayData(data) {
   const tableBody = document.querySelector('#path tbody');
   tableBody.innerHTML = '';

   paging.totalPages = Math.ceil(data.length / paging.itemsPerPage);
   
   const startIndex = (paging.currentPage - 1) * paging.itemsPerPage;
   const endIndex = startIndex + paging.itemsPerPage;
   const pageData = data.slice(startIndex, endIndex);
   
   for (let item of pageData) {
      const row = tableBody.insertRow();
      
      row.insertCell().textContent = item.name;
      row.insertCell().textContent = item.description;
      
      const mainObjectList = document.createElement('ul');
      mainObjectList.innerHTML = `<li>${item.mainObject}</li>`;
      row.insertCell().appendChild(mainObjectList);
      
      const selectButton = document.createElement('button');
      selectButton.textContent = 'Выбрать';
      row.insertCell().appendChild(selectButton);
   }
}

function previousPage() {
    if (paging.currentPage > 1) {
       paging.currentPage--;
       fetchData();
    }
}

function nextPage() {
   if (paging.currentPage < paging.totalPages) {
      paging.currentPage++;
      fetchData();
   }
}

document.addEventListener('DOMContentLoaded', fetchData);
