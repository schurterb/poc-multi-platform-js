import tools from './tools.mjs';

export default async function getIP() {
  // const response = await axios.get('https://jsonip.com/');
  const response = await tools.axios.get('http://ip-api.com/json');
  console.log(response.data);
  return response.data.query;
}
