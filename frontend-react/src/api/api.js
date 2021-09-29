import axios from 'axios';

const fastcomet = 'https://tleafservices.com/api/sm';

const localurl = 'http://127.0.0.1:5000';

const azure = 'https://smdemo-flask-api.azurewebsites.net';

export const getLatestTweets = () => axios.get(`${azure}/fetch-latest`);
export const getHistoricTweets = (days) =>
  axios.get(`${azure}/data?days=${days}`);
export const login = (data) => axios.post(`${azure}/login`, data);
export const getKeywords = () => axios.get(`${azure}/update-search-keywords`);
export const updateKeywords = (data) =>
  axios.post(`${azure}/update-search-keywords`, data);
