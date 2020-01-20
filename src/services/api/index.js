import { DEFAULT_ERROR } from 'src/constants/error';
import axios from 'axios';

/**
 * Calls api and checks if response status is OK.
 * @param {string} url The api endpoint.
 * @param {object} options The request options.
 * @param {string} failMessage The message that will be thrown is response status is not OK.
 * @throws error if response status is not OK.
 */
async function callApiAndCheckResponse(url, options, failMessage = DEFAULT_ERROR) {
  const defaultOptions = {
    baseURL: 'https://flowrspot-api.herokuapp.com/api/v1/',
    headers: {
      Accept: 'application/json'
    },
    timeout: 5000
  };
  const fetchOptions = { ...defaultOptions, ...options };
  const response = await axios(url, fetchOptions);
  if (response.status !== 200) {
    throw failMessage;
  } else {
    return response.data;
  }
}

function getFlowers(page) {
  const url = `flowers?page=${page}`;
  const options = {
    method: 'GET'
  };
  return callApiAndCheckResponse(url, options);
}

function searchFlowers(searchInput, cancelToken) {
  const url = `flowers/search?query=${searchInput}`;
  const options = {
    method: 'GET',
    cancelToken
  };
  return callApiAndCheckResponse(url, options);
}

export default {
  getFlowers,
  searchFlowers
};
