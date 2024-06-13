// /**
//  * Spotify API services
//  */
// import apiClient from '../axios';
// import { getRefreshToken } from '../axios';
// import { joinArtists, formatDuration, formatNumber, getYear, getAlbumLength, getImageUrl } from '../index';
// import axios from 'axios';
// const clientId = '1f42356ed83f46cc9ffd35c525fc8541'; // your clientId
// const redirectUrl = 'http://localhost:3000';        // your redirect URL - must be localhost URL and/or HTTPS

// const authorizationEndpoint = "https://accounts.spotify.com/authorize";
// const tokenEndpoint = "https://accounts.spotify.com/api/token";
// const scope = 'user-read-private user-read-email';

// // Data structure that manages the current active token, caching it in localStorage
// const currentToken = {
//   get access_token() { return localStorage.getItem('access_token') || null; },
//   get refresh_token() { return localStorage.getItem('refresh_token') || null; },
//   get expires_in() { return localStorage.getItem('refresh_in') || null },
//   get expires() { return localStorage.getItem('expires') || null },

//   save: function (response) {
//     const { access_token, refresh_token, expires_in } = response;
//     localStorage.setItem('access_token', access_token);
//     localStorage.setItem('refresh_token', refresh_token);
//     localStorage.setItem('expires_in', expires_in);

//     const now = new Date();
//     const expiry = new Date(now.getTime() + (expires_in * 1000));
//     localStorage.setItem('expires', expiry);
//   }
// };

// // On page load, try to fetch auth code from current browser search URL
// const args = new URLSearchParams(window.location.search);
// const code = args.get('code');

// // If we find a code, we're in a callback, do a token exchange
// if (code) {
//   const token = await getToken(code);
//   currentToken.save(token);

//   // Remove code from URL so we can refresh correctly.
//   const url = new URL(window.location.href);
//   url.searchParams.delete("code");

//   const updatedUrl = url.search ? url.href : url.href.replace('?', '');
//   window.history.replaceState({}, document.title, updatedUrl);
// }

// // If we have a token, we're logged in, so fetch user data and render logged in template
// if (currentToken.access_token) {
//   const userData = await getUserData();
//   renderTemplate("main", "logged-in-template", userData);
//   renderTemplate("oauth", "oauth-template", currentToken);
// }

// // Otherwise we're not logged in, so render the login template
// if (!currentToken.access_token) {
//   renderTemplate("main", "login");
// }

// async function redirectToSpotifyAuthorize() {
//   const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//   const randomValues = crypto.getRandomValues(new Uint8Array(64));
//   const randomString = randomValues.reduce((acc, x) => acc + possible[x % possible.length], "");

//   const code_verifier = randomString;
//   const data = new TextEncoder().encode(code_verifier);
//   const hashed = await crypto.subtle.digest('SHA-256', data);

//   const code_challenge_base64 = btoa(String.fromCharCode(...new Uint8Array(hashed)))
//     .replace(/=/g, '')
//     .replace(/\+/g, '-')
//     .replace(/\//g, '_');

//   window.localStorage.setItem('code_verifier', code_verifier);

//   const authUrl = new URL(authorizationEndpoint)
//   const params = {
//     response_type: 'code',
//     client_id: clientId,
//     scope: scope,
//     code_challenge_method: 'S256',
//     code_challenge: code_challenge_base64,
//     redirect_uri: redirectUrl,
//   };

//   authUrl.search = new URLSearchParams(params).toString();
//   window.location.href = authUrl.toString(); // Redirect the user to the authorization server for login
// }

// // Soptify API Calls
// async function getToken(code) {
//   const code_verifier = localStorage.getItem('code_verifier');

//   const response = await fetch(tokenEndpoint, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded',
//     },
//     body: new URLSearchParams({
//       client_id: clientId,
//       grant_type: 'authorization_code',
//       code: code,
//       redirect_uri: redirectUrl,
//       code_verifier: code_verifier,
//     }),
//   });

//   return await response.json();
// }

// async function refreshToken() {
//   const response = await fetch(tokenEndpoint, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded'
//     },
//     body: new URLSearchParams({
//       client_id: clientId,
//       grant_type: 'refresh_token',
//       refresh_token: currentToken.refresh_token
//     }),
//   });

//   return await response.json();
// }

// async function getUserData() {
//   const response = await fetch("https://api.spotify.com/v1/me", {
//     method: 'GET',
//     headers: { 'Authorization': 'Bearer ' + currentToken.access_token },
//   });

//   return await response.json();
// }

// // Click handlers
// export async function loginWithSpotifyClick() {
//   await redirectToSpotifyAuthorize();
// }

// async function logoutClick() {
//   localStorage.clear();
//   window.location.href = redirectUrl;
// }

// async function refreshTokenClick() {
//   const token = await refreshToken();
//   currentToken.save(token);
//   renderTemplate("oauth", "oauth-template", currentToken);
// }

// // HTML Template Rendering with basic data binding - demoware only.
// function renderTemplate(targetId, templateId, data = null) {
//   const template = document.getElementById(templateId);
//   const clone = template.content.cloneNode(true);

//   const elements = clone.querySelectorAll("*");
//   elements.forEach(ele => {
//     const bindingAttrs = [...ele.attributes].filter(a => a.name.startsWith("data-bind"));

//     bindingAttrs.forEach(attr => {
//       const target = attr.name.replace(/data-bind-/, "").replace(/data-bind/, "");
//       const targetType = target.startsWith("onclick") ? "HANDLER" : "PROPERTY";
//       const targetProp = target === "" ? "innerHTML" : target;

//       const prefix = targetType === "PROPERTY" ? "data." : "";
//       const expression = prefix + attr.value.replace(/;\n\r\n/g, "");

//       // Maybe use a framework with more validation here ;)
//       try {
//         ele[targetProp] = targetType === "PROPERTY" ? eval(expression) : () => { eval(expression) };
//         ele.removeAttribute(attr.name);
//       } catch (ex) {
//         console.error(`Error binding ${expression} to ${targetProp}`, ex);
//       }
//     });
//   });

//   const target = document.getElementById(targetId);
//   target.innerHTML = "";
//   target.appendChild(clone);
// }
// // Utility function to handle response
// const handleResponse = async (request) => {
//   try {
//     const response = await request;
//     return response.data;
//   } catch (error) {
//     console.error('API call error:', error);
//     throw error;
//   }
// };

// const apiSpotify = axios.create({
//   baseURL: "https://api.spotify.com/v1/",
// });

// export const setClientToken = (access_token) => {
//   apiSpotify.interceptors.request.use(async function (config) {
//     config.headers.Authorization = "Bearer " + access_token;
//     return config;
//   });
// };


// // /**
// //  * Store tokens in local storage
// //  *
// //  * @param {String} access_token An access token that can be provided in subsequent calls to Spotify Web API services.
// //  * @param {String} refresh_token A token that can be sent to retrieve new access token
// //  * @param {Number} expires_at Expiry timestamp for the access token
// //  */
// // export const setToken = (access_token, refresh_token, expires_at) => {
// // 	try {
// // 	  const token = JSON.stringify({ access_token, refresh_token, expires_at });
// // 	  localStorage.setItem('token', token);
// // 	} catch (error) {
// // 	  console.error('Error storing token:', error);
// // 	}
// //   };
  
// // Get the current user’s top tracks
// export const setToken = (access_token, refresh_token, expires_at) => {
//   try {
//     const token = JSON.stringify({ access_token, refresh_token, expires_at });
//     localStorage.setItem('token', token);
//     return token;
//   } catch (error) {
//     console.error(error);
//     return error;
//   }
// };

// export const getTopTracks = async (options = {}) => {
//   const response = await handleResponse(apiClient.get('/me/top/tracks', { params: options }));
//   return {
//     ...response,
//     items: response.items.map(item => ({
//       album: {
//         id: item.album.id,
//         name: item.album.name,
//         image_url: getImageUrl(item.album.images),
//       },
//       artists: joinArtists(item.artists),
//       duration: formatDuration(item.duration_ms),
//       id: item.id,
//       name: item.name,
//       player_uri: item.uri,
//       release_date: item.album.release_date,
//     })),
//   };
// };

// // Get the current user’s top artists
// export const getTopArtists = async (options = {}) => {
//   const response = await handleResponse(apiClient.get('/me/top/artists', { params: options }));
//   return {
//     ...response,
//     items: response.items.map(item => ({
//       followers: formatNumber(item.followers.total),
//       genres: item.genres,
//       id: item.id,
//       image_url: getImageUrl(item.images),
//       name: item.name,
//       player_uri: item.uri,
//     })),
//   };
// };

// // Get information about the current user
// export const getCurrentUser = async () => {
//   const response = await handleResponse(apiClient.get('/me'));
//   return {
//     country: response.country,
//     display_name: response.display_name,
//     id: response.id,
//     image: getImageUrl(response.images),
//     is_premium: response.product === 'premium',
//   };
// };

// // Get the current user's discover weekly
// export const getDiscoverWeekly = async () => {
//   const response = await handleResponse(apiClient.get('/search', {
//     params: {
//       q: 'discover weekly',
//       type: 'playlist',
//       market: 'from_token'
//     },
//   }));
//   const result = response.playlists.items.find(item => item.owner.id === 'spotify');
//   return result ? {
//     description: result.description,
//     id: result.id,
//     image_url: getImageUrl(result.images),
//     name: result.name,
//     owner: result.owner.display_name,
//     player_uri: result.uri,
//     tracks: result.tracks,
//     total_tracks: result.tracks.total,
//   } : null;
// };

// // Get a list of the current user's playlists.
// export const getUserPlaylists = async (options = {}) => {
//   const response = await handleResponse(apiClient.get('/me/playlists', { params: options }));
//   return {
//     ...response,
//     items: response.items.map(item => ({
//       description: item.description,
//       id: item.id,
//       image_url: getImageUrl(item.images),
//       name: item.name,
//       owner_name: item.owner.display_name,
//       player_uri: item.uri,
//       tracks: item.tracks,
//     })),
//   };
// };

// // Get a specific playlist
// export const getPlaylist = async (playlistId, options = {}) => {
//   const response = await handleResponse(apiClient.get(`/playlists/${playlistId}`, { params: options }));
//   return {
//     description: response.description,
//     followers: formatNumber(response.followers.total),
//     id: response.id,
//     image_url: getImageUrl(response.images),
//     name: response.name,
//     owner: response.owner.display_name,
//     player_uri: response.uri,
//     total_tracks: response.tracks.total,
//   };
// };

// // Get the tracks from a specific playlist
// export const getPlaylistTracks = async (playlistId, options = {}) => {
//   const response = await handleResponse(apiClient.get(`/playlists/${playlistId}/tracks`, { params: options }));
//   return {
//     ...response,
//     items: response.items.map(item => ({
//       album_name: item.track.album.name,
//       artists: joinArtists(item.track.artists),
//       duration: formatDuration(item.track.duration_ms),
//       id: item.track.id,
//       image_url: getImageUrl(item.track.album.images),
//       name: item.track.name,
//       player_uri: item.track.uri,
//       release_date: item.track.album.release_date,
//     })),
//   };
// };

// // Get an album from the Spotify catalog.
// export const getAlbum = async (albumId, options = {}) => {
//   const response = await handleResponse(apiClient.get(`/albums/${albumId}`, { params: { ...options, market: 'from_token' } }));
//   return {
//     artists: joinArtists(response.artists),
//     genres: response.genres,
//     id: response.id,
//     image_url: getImageUrl(response.images),
//     name: response.name,
//     player_uri: response.uri,
//     release_date: response.release_date,
//     release_year: getYear(response.release_date),
//     total_length: getAlbumLength(response.tracks.items),
//     total_tracks: response.tracks.total,
//     tracks: response.tracks.items.map(item => ({
//       artists: joinArtists(item.artists),
//       duration: formatDuration(item.duration_ms),
//       id: item.id,
//       name: item.name,
//       player_uri: item.uri,
//     })),
//   };
// };

// // Get an artist from the Spotify catalog
// export const getArtist = async (artist_id) => {
//   const response = await handleResponse(apiClient.get(`/artists/${artist_id}`));
//   return {
//     followers: formatNumber(response.followers.total),
//     genres: response.genres,
//     id: response.id,
//     image_url: getImageUrl(response.images),
//     name: response.name,
//     player_uri: response.uri,
//   };
// };

// // Get a list of top tracks of an artist from the Spotify catalog, for a specific country
// export const getArtistTopTracks = async (artist_id) => {
//   const response = await handleResponse(apiClient.get(`/artists/${artist_id}/top-tracks`, { params: { market: 'from_token' } }));
//   return response.tracks.map(track => ({
//     album_name: track.album.name,
//     artists: joinArtists(track.artists),
//     duration: formatDuration(track.duration_ms),
//     id: track.id,
//     image_url: getImageUrl(track.album.images),
//     name: track.name,
//     player_uri: track.uri,
//   }));
// };

// // Get Spotify catalog information about artists similar to a given artist
// export const getArtistRelatedArtists = async (artist_id) => {
//   const response = await handleResponse(apiClient.get(`/artists/${artist_id}/related-artists`));
//   return response.artists.map(item => ({
//     followers: formatNumber(item.followers.total),
//     genres: item.genres,
//     id: item.id,
//     image_url: getImageUrl(item.images),
//     name: item.name,
//     player_uri: item.uri,
//   }));
// };

// // Get Spotify catalog information about an artist’s albums
// export const getArtistAlbums = async (artist_id, options = {}) => {
//   const response = await handleResponse(apiClient.get(`/artists/${artist_id}/albums`, { params: { ...options, market: 'from_token' } }));
//   return {
//     ...response,
//     items: response.items.map(item => ({
//       artists: joinArtists(item.artists),
//       id: item.id,
//       image_url: getImageUrl(item.images),
//       name: item.name,
//       player_uri: item.uri,
//       release_date: getYear(item.release_date),
//       total_tracks: item.total_tracks,
//     })),
//   };
// };

// // Get a list of Spotify featured playlists
// export const getFeaturedPlaylists = async (options = {}) => {
//   const response = await handleResponse(apiClient.get('/browse/featured-playlists', {
//     params: {
//       ...options,
//       country: 'from_token',
//       timestamp: new Date().toISOString(),
//     },
//   }));
//   return response.playlists.items.map(item => ({
//     description: item.description,
//     id: item.id,
//     image_url: getImageUrl(item.images),
//     name: item.name,
//     owner: item.owner.display_name,
//     player_uri: item.uri,
//     total_tracks: item.tracks.total,
//   }));
// };

// // Get a list of new album releases featured in Spotify
// export const getNewReleases = async (options = {}) => {
//   const response = await handleResponse(apiClient.get('/browse/new-releases', {
//     params: {
//       ...options,
//       country: 'from_token',
//       timestamp: new Date().toISOString(),
//     },
//   }));
//   return response.albums.items.map(item => ({
//     artists: joinArtists(item.artists),
//     id: item.id,
//     image_url: getImageUrl(item.images),
//     name: item.name,
//     player_uri: item.uri,
//     release_date: getYear(item.release_date),
//     total_tracks: item.total_tracks,
//   }));
// };

// // Get a list of categories used to tag items in Spotify
// export const getCategories = async (options = {}) => {
//   const response = await handleResponse(apiClient.get('/browse/categories', { params: { ...options, country: 'from_token' } }));
//   return response.categories.items.map(item => ({
//     id: item.id,
//     image_url: item.icons[0].url,
//     name: item.name,
//   }));
// };

// // Create recommendations based on seed artists and tracks
// export const getRecommendations = async (artists, tracks) => {
//   if (!artists.length && !tracks.length) return [];
//   const response = await handleResponse(apiClient.get('/recommendations', {
//     params: {
//       market: 'from_token',
//       seed_artists: artists.slice(0, 3).map(item => item.id).join(','),
//       seed_tracks: tracks.slice(0, 2).map(item => item.id).join(','),
//     },
//   }));
//   return response.tracks.map(track => ({
//     album_name: track.album.name,
//     artists: joinArtists(track.artists),
//     duration: formatDuration(track.duration_ms),
//     id: track.id,
//     image_url: getImageUrl(track.album.images),
//     name: track.name,
//     player_uri: track.uri,
//   }));
// };

// // Get a single category used to tag items in Spotify
// export const getCategory = async (categoryId) => {
//   const response = await handleResponse(apiClient.get(`/browse/categories/${categoryId}`, { params: { country: 'from_token' } }));
//   return response;
// };

// // Get a list of Spotify playlists tagged with a particular category
// export const getCategoryPlaylists = async (categoryId, options = {}) => {
//   const response = await handleResponse(apiClient.get(`/browse/categories/${categoryId}/playlists`, { params: { ...options, country: 'from_token' } }));
//   return response.playlists.items.map(item => ({
//     description: item.description,
//     id: item.id,
//     image_url: getImageUrl(item.images),
//     name: item.name,
//     owner: item.owner.display_name,
//     player_uri: item.uri,
//   }));
// };

// // Get a list of the albums saved in the current Spotify user's library
// export const getUsersSavedAlbums = async (options = {}) => {
//   const response = await handleResponse(apiClient.get('/me/albums', { params: { ...options, market: 'from_token' } }));
//   return response.items.map(item => ({
//     artists: joinArtists(item.album.artists),
//     genres: item.album.genres,
//     id: item.album.id,
//     image_url: getImageUrl(item.album.images),
//     name: item.album.name,
//     player_uri: item.album.uri,
//     release_date: getYear(item.album.release_date),
//     total_tracks: item.album.tracks.total,
//     total_length: getAlbumLength(item.album.tracks.items),
//   }));
// };

// // Get the current user's followed artists
// export const getFollowedArtists = async () => {
//   const response = await handleResponse(apiClient.get('/me/following', { params: { type: 'artist' } }));
//   return response.artists.items.map(item => ({
//     followers: formatNumber(item.followers.total),
//     genres: item.genres,
//     id: item.id,
//     image_url: getImageUrl(item.images),
//     name: item.name,
//     player_uri: item.uri,
//   }));
// };

// // Get current user's saved tracks
// export const getMySavedTracks = async (options = {}) => {
//   const response = await handleResponse(apiClient.get('/me/tracks', { params: { ...options, market: 'from_token' } }));
//   return response.items.map(item => ({
//     album_name: item.track.album.name,
//     artists: joinArtists(item.track.artists),
//     duration: formatDuration(item.track.duration_ms),
//     id: item.track.id,
//     image_url: getImageUrl(item.track.album.images),
//     name: item.track.name,
//     player_uri: item.track.uri,
//   }));
// };

// // Get recently played tracks
// export const getRecentlyPlayed = async (options = {}) => {
//   const response = await handleResponse(apiClient.get('/me/player/recently-played', { params: options }));
//   return response.items.map(item => ({
//     album_name: item.track.album.name,
//     artists: joinArtists(item.track.artists),
//     duration: formatDuration(item.track.duration_ms),
//     id: item.track.id,
//     image_url: getImageUrl(item.track.album.images),
//     name: item.track.name,
//     player_uri: item.track.uri,
//   }));
// };

// // Get Spotify catalog information about artists, albums, tracks or playlists that match a keyword string
// export const searchAll = async (query, options = {}) => {
//   const response = await handleResponse(apiClient.get('/search', {
//     params: {
//       q: query,
//       type: 'album,artist,track',
//       market: 'from_token',
//       ...options,
//     },
//   }));
//   return {
//     albums: response.albums.items.map(item => ({
//       artists: joinArtists(item.artists),
//       id: item.id,
//       image_url: getImageUrl(item.images),
//       name: item.name,
//       player_uri: item.uri,
//       release_date: getYear(item.release_date),
//       total_tracks: item.total_tracks,
//     })),
//     artists: response.artists.items.map(item => ({
//       followers: formatNumber(item.followers.total),
//       genres: item.genres,
//       id: item.id,
//       image_url: getImageUrl(item.images),
//       name: item.name,
//       player_uri: item.uri,
//     })),
//     tracks: response.tracks.items.map(item => ({
//       album_name: item.album.name,
//       artists: joinArtists(item.artists),
//       duration: formatDuration(item.duration_ms),
//       id: item.id,
//       image_url: getImageUrl(item.album.images),
//       name: item.name,
//       player_uri: item.uri,
//       release_date: item.album.release_date,
//     })),
//   };
// };

// // Get albums from the Spotify catalog according to a query.
// export const searchAlbums = async (query, options = {}) => {
//   const response = await handleResponse(apiClient.get('/search', {
//     params: {
//       q: query,
//       type: 'album',
//       market: 'from_token',
//       ...options,
//     },
//   }));
//   return response.albums.items.map(item => ({
//     artists: joinArtists(item.artists),
//     id: item.id,
//     image_url: getImageUrl(item.images),
//     name: item.name,
//     player_uri: item.uri,
//     release_date: getYear(item.release_date),
//     total_tracks: item.total_tracks,
//   }));
// };

// // Get artists from the Spotify catalog according to a query.
// export const searchArtists = async (query, options = {}) => {
//   const response = await handleResponse(apiClient.get('/search', {
//     params: {
//       q: query,
//       type: 'artist',
//       market: 'from_token',
//       ...options,
//     },
//   }));
//   return response.artists.items.map(item => ({
//     followers: formatNumber(item.followers.total),
//     genres: item.genres,
//     id: item.id,
//     image_url: getImageUrl(item.images),
//     name: item.name,
//     player_uri: item.uri,
//   }));
// };

// // Get tracks from the Spotify catalog according to a query.
// export const searchTracks = async (query, options = {}) => {
//   const response = await handleResponse(apiClient.get('/search', {
//     params: {
//       q: query,
//       type: 'track',
//       market: 'from_token',
//       ...options,
//     },
//   }));
//   return response.tracks.items.map(item => ({
//     album_name: item.album.name,
//     artists: joinArtists(item.artists),
//     duration: formatDuration(item.duration_ms),
//     id: item.id,
//     image_url: getImageUrl(item.album.images),
//     name: item.name,
//     player_uri: item.uri,
//     release_date: item.album.release_date,
//   }));
// };

// // Play a track on the user's active device
// export const play = async (device_id, options = {}) => {
//   const response = await handleResponse(apiClient.put(`/me/player/play?device_id=${device_id}`, options));
//   return response;
// };

// // Pause playback on the user’s account.
// export const pause = async (device_id) => {
//   const response = await handleResponse(apiClient.put('/me/player/pause', device_id));
//   return response;
// };

// // Skips to next track in the user’s queue.
// export const skipToNext = async (device_id) => {
//   const response = await handleResponse(apiClient.post('/me/player/next', device_id));
//   return response;
// };

// // Skips to previous track in the user’s queue.
// export const skipToPrevious = async (device_id) => {
//   const response = await handleResponse(apiClient.post('/me/player/previous', device_id));
//   return response;
// };

// // Set the repeat mode for the user’s playback.
// export const setRepeat = async (device_id, state) => {
//   return await handleResponse(apiClient.put(`/me/player/repeat?device_id=${device_id}&state=${state}`));
// };

// // Toggle shuffle on or off for user’s playback.
// export const setShuffle = async (device_id, state) => {
//   return await handleResponse(apiClient.put(`/me/player/shuffle?device_id=${device_id}&state=${state}`));
// };

// // Get information about the user’s current playback state, including track, track progress, and active device.
// export const getCurrentPlaybackState = async () => {
//   return await handleResponse(apiClient.get('/me/player', { params: { market: 'from_token' } }));
// };

// // Get all user info
// export const getUserInfo = async () => {
//   const endpoints = [
//     getCurrentUser(),
//     getTopTracks(),
//     getTopArtists({ limit: 18 }),
//     getUserPlaylists(),
//     getDiscoverWeekly(),
//     getUsersSavedAlbums(),
//     getFollowedArtists(),
//   ];
//   return await Promise.all(endpoints);
// };

// // Get playlist details
// export const getPlaylistDetails = async (playlistId) => {
//   const endpoints = [
//     getPlaylist(playlistId),
//     getPlaylistTracks(playlistId),
//   ];
//   return await Promise.all(endpoints);
// };

// // Get artist details
// export const getArtistDetails = async (artistId) => {
//   const endpoints = [
//     getArtist(artistId),
//     getArtistTopTracks(artistId),
//     getArtistRelatedArtists(artistId),
//     getArtistAlbums(artistId),
//   ];
//   return await Promise.all(endpoints);
// };

// // Get artists discography
// export const getArtistDiscography = async (artistId) => {
//   const endpoints = [
//     getArtistAlbums(artistId, { include_groups: 'album' }),
//     getArtistAlbums(artistId, { include_groups: 'compilation' }),
//     getArtistAlbums(artistId, { include_groups: 'single' }),
//   ];
//   return await Promise.all(endpoints);
// };

// // Get recommendations and new releases
// export const getDiscoverNewMusic = async (topArtist, topTracks) => {
//   const endpoints = [
//     getRecommendations(topArtist, topTracks),
//     getNewReleases(),
//     getFeaturedPlaylists(),
//     getCategories(),
//   ];
//   return await Promise.all(endpoints);
// };

// // Get category details
// export const getCategoryDetails = async (categoryId, options = {}) => {
//   const endpoints = [
//     getCategory(categoryId),
//     getCategoryPlaylists(categoryId, options),
//   ];
//   return await Promise.all(endpoints);
// };
