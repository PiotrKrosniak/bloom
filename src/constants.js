export const API = process.env.REACT_APP_API_URL;
export const AUTH_TOKEN = process.env.REACT_APP_ACCESS_AUTH_TOKEN;
export const BEARER = "Bearer";
export const SERVER_URL = getServerURL(API);
export const products = [1,2,3];

console.log("API_URL", API);

function getServerURL(url) {
  const urlObject = new URL(url);
  return `${urlObject.protocol}//${urlObject.hostname}${urlObject.port ? `:${urlObject.port}` : ''}`;
}

// Function to inject the strapi-stripe script
export function injectScript() {
  const script = document.createElement('script');
  script.src = `${SERVER_URL}/plugins/strapi-stripe/static/stripe.js`;
  script.async = true;
  document.head.appendChild(script);
}

