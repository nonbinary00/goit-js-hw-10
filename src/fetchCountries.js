const BASIC_URL = `https://restcountries.com/v3.1/name`;
const FILTER_RESPONSE = `fields=name,capital,population,flags,languages`;

export const fetchCountries = name => {
    return fetch(
      `https://restcountries.com/v3.1/name/${BASIC_URL}?${FILTER_RESPONSE}`
    )
        .then(response => {
        if (!response.ok) {
          if (response.status === 404) {
            return [];
          }
          throw new Error(response.status);
        }
        return response.json();
      })
      .catch(error => {
        console.error(error);
      });
  };