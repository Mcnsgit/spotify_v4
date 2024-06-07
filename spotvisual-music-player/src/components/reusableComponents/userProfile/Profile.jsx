// // Because this is a literal single page application
// // we detect a callback from Spotify by checking for the hash fragment
// import { RedirectToAuthCodeFlow, getAccessToken } from "../../utils/useAuth";

// const client_id = '1f42356ed83f46cc9ffd35c525fc8541';
// const params = new URLSearchParams(window.location.search);
// const code = params.get("code");

// if (!code) {
//     RedirectToAuthCodeFlow(client_id);
// } else {
//     const access_token =getAccessToken(client_id, code);
//     const profile = await fetchProfile(access_token);
//     populateUI(profile);
// }

// async function fetchProfile(code) {
//     // get user profile
//     const response = await fetch("https://api.spotify.com/v1/me", {
//         method: "GET", headers: { Authorization: `Bearer ${code}` }
//     });
//     async function result() {
//     const profile = await response.json();
//     return profile;}
//     return await result.json();
// }


// function UserProfileCard({ profile }) {
//     return (
//         <div className="card">
//             <h5 className="card-title">{profile.display_name}</h5>
//             <img className="card-img-top" src={profile.images[0].url} alt="avatar" />
//             <div className="card-body">
//                 <p className="card-text">
//                     <span className="card-text">ID: </span>
//                     <span className="card-text">{profile.id}</span>
//                 </p>
//                 <p className="card-text">
//                     <span className="card-text">Email: </span>
//                     <span className="card-text">{profile.email}</span>
//                 </p>
//                 <p className="card-text">
//                     <span className="card-text">URI: </span>
//                     <a className="card-text" href={profile.external_urls.spotify}>{profile.uri}</a>
//                 </p>
//                 <p className="card-text">
//                     <span className="card-text">URL: </span>
//                     <a className="card-text" href={profile.href}>{profile.href}</a>
//                 </p>
//                 <p className="card-text">
//                     <span className="card-text">Image URL: </span>
//                     <span className="card-text">{profile.images[0].url}</span>
//                 </p>
//             </div>
//         </div>
//     );
// }

// export default function Profile({ UserProfileCard }) {
//     return (
//         <>
//         <div className="card">
//             <h5 className="card-title">{UserProfileCard.display_name}</h5>
//             <img className="card-img-top" src={UserProfileCard.images[0].url} alt="avatar" />
//             <div className="card-body">
//                 <p className="card-text">
//                     <span className="card-text">ID: </span>
//                     <span className="card-text">{profile.id}</span>
//                 </p>
//                 <p className="card-text">
//                     <span className="card-text">Email: </span>
//                     <span className="card-text">{profile.email}</span>
//                 </p>
//                 <p className="card-text">
//                     <span className="card-text">URI: </span>
//                     <a className="card-text" href={profile.external_urls.spotify}>{profile.uri}</a>
//                 </p>
//                 <p className="card-text">
//                     <span className="card-text">URL: </span>
//                     <a className="card-text" href={profile.href}>{profile.href}</a>
//                 </p>
//                 <p className="card-text">
//                     <span className="card-text">Image URL: </span>
//                     <span className="card-text">{profile.images[0].url}</span>
//                 </p>
//             </div>
//         </div>
//         </>
//     );
// }


