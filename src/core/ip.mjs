// import axios from 'axios';
import axios from 'https://unpkg.com/axios/dist/axios.min.js';

export default async function getIP() {
  // const response = await axios.get('https://jsonip.com/');
  const response = await axios.get('http://ip-api.com/json');
  console.log(response.data);
  return response.data.query;
}
