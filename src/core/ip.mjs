
export async function getIP() {
  const response = await fetch('https://jsonip.com/');
  const data = await response.json();
  return data.ip;
}
