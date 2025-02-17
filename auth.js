window.addEventListener('DOMContentLoaded', () => {
    const idToken = getCookie('google_token');

    if (idToken) {
        console.log(decodeJWT(idToken));
        console.log(JSON.parse(decodeJWT(idToken)));
        verifyToken(idToken);
    } else {
        console.log("No token found on page load.");
        // ... (Display login button, etc.)
    }
});

function decodeJWT(token) {
    const base64Url = token.split('.')[1]; // Get the payload part of the JWT token
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Replace URL-safe characters
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

function verifyToken(idToken) {
    fetch('http://localhost:3000/callback', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token: idToken })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        if (data.success) {
            setCookie('google_token', idToken, 30); // Set cookie for 30 days
            console.log(data);
            //window.location.href = "/your-protected-page";
        } else {
            deleteCookie('google_token');
            console.error("Login Error:", data.message);
        }
    })
    .catch((error) => {
        deleteCookie('google_token');
        console.error('Error:', error);
    });
}

function onSignIn(response) {
    const idToken = response.credential;

    if (idToken) {
        verifyToken(idToken);
    } else {
        console.error("No ID token received.");
    }
}

// Helper functions for cookie manipulation
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/"; // path=/ makes the cookie available across the entire site
}

function getCookie(name) {
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

function deleteCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}