import { verifyToken, getCookie, cleanUp, GOOGLE_TOKEN_NAME, API_ENDPOINT_CONSENT, } from './helper.js';

// we set up Klaro with the config
klaro.setup(kConfig);

window.onload = function () {

    let token = getCookie(GOOGLE_TOKEN_NAME);

    if(!token) {
        cleanUp();
        return;
    }

    //verifies token with the backend and shows user info onload
    verifyToken(token)
    .then(data => {

        //display user profile
        showProfile(data);
        
        //set consent
        SetConsent(data.consent);

    })
    .catch(error => {
        cleanUp();
    });

};

function SetConsent(consent) {

    if (!consent) {
        //show klaro non-modal when no consent is available
        klaro.show(undefined, false);
    } else {

        for( let app in consent ) {
            klaro.getManager().updateConsent(app,  consent[app]);
        }

        klaro.getManager().saveAndApplyConsents();
    }

    //set watcher for saving consent to backend
    klaro.getManager(kConfig).watch({
        update: function(obj, name, data) {
          if (name === 'saveConsents') {
            UpdateConsent(data.consents);
          }
        }
    });

}

function UpdateConsent(consent) {

  const token = getCookie(GOOGLE_TOKEN_NAME);

  if (!token) {
      console.error("Token not found");
      return;
  }

  fetch(API_ENDPOINT_CONSENT, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({token: token , consent: consent})
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch((error) => {
      console.error('Error:', error);
  });

}

function showProfile(user) {

    // Update UI with user's info
    //document.getElementById('profile-picture').src = user.picture; // Display profile picture
    document.getElementById('user-name').innerText = `Hello, ${user.name}!`; // Display user name
}

window.SignOut = cleanUp;

