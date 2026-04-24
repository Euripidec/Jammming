// src/util/Spotify.js
const clientId = 'eff18589394c444eb1ae830f08e612da';
const redirectUri = 'http://127.0.0.1:5173'; // 🔁 Vite port, not 3000

let accessToken;

function generateRandomString(length = 128) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
  let str = '';
  for (let i = 0; i < length; i++) {
    str += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return str;
}

async function sha256(plain) {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const base64 = btoa(String.fromCharCode(...hashArray));
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

const Spotify = {
  async getAccessToken() {
    // Check if the access token is already set.
    if (accessToken) return accessToken;

    // Use URLSearchParams to check if the browser URL contains a valid authorization code. Also check for any error response.
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const error = urlParams.get("error");

    // If error is found in the URL (e.g., user denied access), log it and return.
    if (error) {
      console.error("Error during authentication:", error);
      return;
    }

    // If code is present in the URL, retrieve the stored code_verifier from localStorage. Then make a POST request to Spotify’s /api/token endpoint to exchange the code and verifier for an access token.
    if (code) {
      const retreivedCodeVerifier = localStorage.getItem("code_verifier");
      const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          code: code,
          redirect_uri: redirectUri,
          client_id: clientId,
          code_verifier: retreivedCodeVerifier,
        })
      });

      const jsonResponse = await response.json();
      accessToken = jsonResponse.access_token;
      console.log("Access token in code:", accessToken);
      localStorage.setItem("access_token", accessToken);

      // Store the token expiry time in localStorage.
      const expiresIn = jsonResponse.expires_in;
      const now = new Date();
      const expiry = new Date(now.getTime() + (expiresIn * 1000));
      localStorage.setItem('token_expiry', expiry);
      console.log("Token expiry in code:", localStorage.getItem("token_expiry"));

      // Ensure that the token is automatically cleared from memory and localStorage when it expires, using setTimeout().
      setTimeout(() => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("token_expiry");
        accessToken = "";
        console.log("Access token expired and removed.");
      }, expiresIn * 1000);

      window.history.pushState({}, null, "/");
      return accessToken;
    }

    // If no token or code is present, begin the PKCE login process.
    // First, generate a secure codeVerifier and a hashed codeChallenge.
    const codeVerifier = generateRandomString(128);
    const codeChallenge = await sha256(codeVerifier);
    localStorage.setItem("code_verifier", codeVerifier);

    // Construct the Spotify authorization URL using the code_challenge_method=S256 and the generated codeChallenge.
    const redirect =
      `https://accounts.spotify.com/authorize?` +
      `client_id=${clientId}` +
      `&response_type=code` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&scope=playlist-modify-public%20playlist-modify-private` +
      `&code_challenge_method=S256` +
      `&code_challenge=${codeChallenge}`;

    // Redirect the user to Spotify’s authorization page.
    window.location = redirect;
  },


  async search(term) {
    accessToken = await Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((response) => response.json())
      .then((jsonResponse) => {
        if (!jsonResponse) {
          console.error("Response error");
        }
        return jsonResponse.tracks.items.map((t) => ({
          id: t.id,
          name: t.name,
          artist: t.artists[0].name,
          album: t.album.name,
          uri: t.uri,
        }));
      });
  },

  async savePlaylist(name, trackUris) {
    if (!name || !trackUris) return;
    const aToken = await Spotify.getAccessToken();
    const headers = { 
      Authorization: `Bearer ${aToken}`,
      "Content-Type": "application/json"
    };

    const playlistResponse = await fetch(`https://api.spotify.com/v1/me/playlists`, {
      headers,
      method: "POST",
      body: JSON.stringify({ name: name }),
    });

    const playlistData = await playlistResponse.json();
    const playlistId = playlistData.id;

    return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      headers,
      method: "POST",
      body: JSON.stringify({ uris: trackUris }),
    });

       const tracksData = await tracksResponse.json();
    console.log('Tracks response:', tracksData); // 👈 add this

  },

  async savePlaylist(name, trackUris) {
    console.log('Saving playlist:', name);
    console.log('Track URIs:', trackUris); // 👈 check this
    if (!name || !trackUris) return;
  }
};

export { Spotify };