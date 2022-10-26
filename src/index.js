import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';


const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
const DEBOUNCE_DELAY = 300;

// Слушатель событий для ввода
//Используем debounce для предотвращения болтливого события

input.addEventListener(
    'input',
    debounce(e => {
        const trimmedValue = input.value.trim();
           cleanHtml();   
      if (trimmedValue !== '') {
          fetchCountries(trimmedValue).then(foundData => {      
  
          if (foundData.length > 10) {
            Notiflix.Notify.info(
              'Too many matches found. Please enter a more specific name.'
            );
          } else if (foundData.length === 0) {
            Notiflix.Notify.failure('Oops, there is no country with that name');
          } else if (foundData.length >= 2 && foundData.length <= 10) {
           
            renderCountryList(foundData);
          } else if (foundData.length === 1) {
      
            renderOneCountry(foundData);
          }
        });
      }
    }, DEBOUNCE_DELAY)
  );

//Функция для создания разметки, если количество возвращаемых объектов меньше 10, но больше или равно 2

  function renderCountryList(countries) {
    const markup = countries
      .map(country => {
        return `<li>
        <img src="${country.flags.svg}" alt="Flag of ${
          country.name.official
        }" width="30" hight="20">
           <b>${country.name.official}</p>
                  </li>`;
      })
      .join('');
    countryList.innerHTML = markup;
  }