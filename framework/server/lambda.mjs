// lambda.js
import ipModule from './core/ip.js';
export async function handler() {
  const ip = await ipModule.getIP();
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
    },
    body: JSON.stringify({ msg: "Your IP is " + ip }),
  };
};
