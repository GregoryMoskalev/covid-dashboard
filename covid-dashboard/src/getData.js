import '@babel/polyfill';

export async function getData(url) {
  let data;
  try {
   const response = await fetch(url);
   data = await response.json();
  } 
  catch (error) {
    return error;
  }
  return data;
}