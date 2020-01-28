import axios from 'axios';
const CancelToken = axios.CancelToken;

const defaultOptions = {
  baseURL: 'https://flowrspot-api.herokuapp.com/api/v1/',
  headers: {
    Accept: 'application/json'
  },
  validateStatus(status) {
    return status === 200; // Accept only status code 200
  },
  timeout: 5000
};

/**
 * Calls api and checks if response status is OK.
 * setTimeout needed for android to cancel request, if you don't have internet connection or the IP address or
 * domain name that you're requesting not there,in this case axios timeout will not work.
 * @param {string} url The api endpoint.
 * @param {object} options The request options.
 * @param {string} failMessage The message that will be thrown is response status is not OK.
 * @throws error if response status is not OK.
 */
async function callApiAndCheckResponse({ url, options }) {
  let source = CancelToken.source();
  setTimeout(() => {
    source.cancel();
  }, 6000);
  const fetchOptions = { ...defaultOptions, cancelToken: source.token, ...options };
  const response = await axios(url, fetchOptions);
  return response.data;
}

/**
 * Calls api
 * @param url The api endpoint
 * @param options
 * @returns {Promise<AxiosResponse<any>>}
 */
async function callApi({ url, options }) {
  const fetchOptions = { ...defaultOptions, ...options };
  const response = await axios(url, fetchOptions);
  return response;
}

export default {
  callApiAndCheckResponse,
  callApi
};

export { default as userRequests } from 'src/services/api/user';
export { default as flowerRequests } from 'src/services/api/flowers';
