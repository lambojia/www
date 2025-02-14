
function onSignIn(response) { // Correct parameter: response, not googleUser
  console.log("Response:", response); // Log the response for inspection
  const idToken = response.credential; // Access credential directly

  if (idToken) {  // Check if token exists
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
        
         localStorage.setItem('google_token', response.credential); // Or data.token if your server returns it

        //window.location.href = "/your-protected-page";
      } else {
        console.error("Login Error:", data.message);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  } else {
    console.error("No ID token received.");
  }
}

window.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('google_token') || sessionStorage.getItem('google_token'); // Check both
    
    console.log(token);

    if (token) {
        // Send the token to the server for verification
        fetch('YOUR_LOGIN_URI', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded' // Or 'application/json'
            },
            body: 'credential=' + token
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // User is still logged in. Update UI, etc.
                console.log("Token verified on page load.");
                // ... (Update UI, display user info, etc.) ...
            } else {
                // Token is invalid or expired. Clear it and redirect to login.
                console.error("Token invalid on page load:", data.message);
                localStorage.removeItem('google_token');
                sessionStorage.removeItem('google_token');
                window.location.href = "/login"; // Or other action
            }
        }).catch(error => {
            console.error("Error verifying token on page load:", error);
            localStorage.removeItem('google_token');
            sessionStorage.removeItem('google_token');
            window.location.href = "/login"; // Or other action
        });
    } else {
      // No token found, user is not logged in.
      console.log("No token found on page load.");
      // ... (Display login button, etc.)
    }
});