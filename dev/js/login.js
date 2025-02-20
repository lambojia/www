
import { verifyToken, setCookie, getCookie, cleanUp, GOOGLE_TOKEN_NAME, GOOGLE_CLIENT_ID, GOOGLE_LOGIN_URI, } from './helper.js';

window.onload = function () {
    
    const urlParams = new URLSearchParams(window.location.search);

    const cookie = getCookie(GOOGLE_TOKEN_NAME);

    const uuid = urlParams.get('uuid');

    let token;

    if (uuid) {
        token = uuid;
    } else if(cookie) {
        token = cookie;
    } else {
        console.error("Token not found");
        initSignInButton();
        return;
    }

    //verifies token with the backend and shows user info onload
    verifyToken(token)
    .then(data => {

        //write token to cookie
        setCookie(GOOGLE_TOKEN_NAME, token, 1);

        //goto dashboard view
        window.location.replace('/dashboard.html');

    })
    .catch(error => {
        
        //remove app tokens
        cleanUp();
        
    });
};

function initSignInButton() {

    google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        login_uri: GOOGLE_LOGIN_URI,
        auto_prompt: false,
        ux_mode: 'redirect'
    });

    google.accounts.id.renderButton(
        document.querySelector(".signin"),{width: 400}
    );
}
