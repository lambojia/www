
const API_ENDPOINT = 'http://localhost:3000';

export const GOOGLE_TOKEN_NAME = 'google_token';

export const KLARO_TOKEN_NAME = 'klaro_token';

export const GOOGLE_CLIENT_ID = '540754736098-ahrealgn91kaajougd6nb38u8bphnlg8.apps.googleusercontent.com';

export const GOOGLE_LOGIN_URI = `${API_ENDPOINT}/callback`;

export const API_ENDPOINT_VERIFY = `${API_ENDPOINT}/verify`;

export const API_ENDPOINT_CONSENT = `${API_ENDPOINT}/consent`;

export function verifyToken(token) {  // No callback parameter

  return fetch(API_ENDPOINT_VERIFY, { // Return the fetch Promise
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ token: token })
  })
    .then(response => {
        if (!response.ok) { // Check for HTTP errors (non-2xx status codes)
            throw new Error(`HTTP error! status: ${response.status}`); // Throw an error to be caught by .catch
        }
        return response.json(); // Parse JSON only if the response is ok
    })
    .then(data => {
      if (data.success) {
        return data.message; // Resolve the Promise with the message
      } else {
        return Promise.reject(data); // Reject the Promise with the error data
      }
    })
    .catch(error => {
      return Promise.reject(error); // Reject the promise to be caught by the caller
    });
}

export function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) === 0) {
            return c.substring(nameEQ.length, c.length);
        }
    }
    return null;
}

export function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/"; // path=/ makes the cookie available across the entire site
}

export function cleanUp() {

    deleteCookie(KLARO_TOKEN_NAME);
    deleteCookie(GOOGLE_TOKEN_NAME);

    //reload to login 
    window.location.replace(basePath());
}

export function deleteCookie(name) {

    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

}

export function basePath() {
    
    const fullUrl = window.location.href;
    const baseUrl = fullUrl.substring(0, fullUrl.lastIndexOf("/") + 1);

    return baseUrl;
}