import time
import spotipy
from spotipy.oauth2 import SpotifyOAuth
from flask import Flask, request, redirect, url_for, session, jsonify
from requests import  post
import requests
from dotenv import load_dotenv 
import os
import base64
import json
from flask_cors import CORS
load_dotenv()

app = Flask(__name__)
CORS(app)
app.secret_key = os.urandom(64)

app.config['SESSION_COOKIE_NAME'] = 'spotify_auth_cookie'
app.config['SECRET_KEY'] = os.getenv('APP_SECRET_KEY')

TOKEN_INFO = 'token_info'
CLIENT_ID = '1f42356ed83f46cc9ffd35c525fc8541'
CLIENT_SECRET = os.getenv('CLIENT_SECRET')
REDIRECT_URI = 'http://127.0.0.1:3001'

sp_oauth = SpotifyOAuth(client_id=CLIENT_ID,
                        client_secret=CLIENT_SECRET,
                        redirect_uri=REDIRECT_URI,
                        scope='user-read-private user-read-email user-library-read')

AUTH_URL = 'https://accounts.spotify.com/authorize'
TOKEN_URL = 'https://accounts.spotify.com/api/token'
SCOPE = 'user-read-private user-read-email streaming user-read-playback-state user-modify-playback-state'

@app.route('/')
def login():
    auth_url = create_spotify_oauth().get_authorize_url()
    return redirect(auth_url)

@app.route('/redirect')
def redirect_page():
    # clear the session
    session.clear()
    # get the authorization code from the request parameters
    code = request.args.get('code')
    # exchange the authorization code for an access token and refresh token
    token_info = create_spotify_oauth().get_access_token(code)
    # save the token info in the session
    session[TOKEN_INFO] = token_info
    # redirect the user to the save_discover_weekly route
    return redirect(url_for('dashboard',_external=True))

    
@app.route('/player')



@app.route('/callback')
def callback():
    session.clear()
    code = request.args.get('code')
    token_info = create_spotify_oauth().get_access_token(code)
    session[TOKEN_INFO] = token_info
    return redirect(url_for('dashboard', external=True))

@app.route('/dashboard')
def dashboard():
    try: 
        # get the token info from the session
        token_info = get_token()
    except:
        # if the token info is not found, redirect the user to the login route
        print('User not logged in')
        return redirect("/")
    
    sp = spotipy.Spotify(auth=token_info['access_token'])

    # get the user's playlists
    current_playlists =  sp.current_user_playlists()['items']
    discover_weekly_playlist_id = None
    saved_weekly_playlist_id = None

    # find the Discover Weekly and Saved Weekly playlists
    for playlist in current_playlists:
        if(playlist['name'] == 'Discover Weekly'):
            discover_weekly_playlist_id = playlist['id']
        if(playlist['name'] == 'Saved Weekly'):
            saved_weekly_playlist_id = playlist['id']
    
    # if the Discover Weekly playlist is not found, return an error message
    if not discover_weekly_playlist_id:
        return 'Discover Weekly not found.'
    
    # get the tracks from the Discover Weekly playlist
    discover_weekly_playlist = sp.playlist_items(discover_weekly_playlist_id)
    song_uris = []
    for song in discover_weekly_playlist['items']:
        song_uri= song['track']['uri']
        song_uris.append(song_uri)
    
    # add the tracks to the Saved Weekly playlist
    sp.user_playlist_add_tracks("YOUR_USER_ID", saved_weekly_playlist_id, song_uris, None)

    # return a success message
    return ('Discover Weekly songs added successfully')

# function to get the token info from the session
@app.route('/token')
def get_token():
    token_info = session.get(TOKEN_INFO, None)
    if not token_info:
        # if the token info is not found, redirect the user to the login route
        redirect(url_for('login', _external=False))
    
    # check if the token is expired and refresh it if necessary
    now = int(time.time())

    is_expired = token_info['expires_at'] - now < 60
    if(is_expired):
        spotify_oauth = create_spotify_oauth()
        token_info = spotify_oauth.refresh_access_token(token_info['refresh_token'])

    return token_info
def token():
    auth_string = CLIENT_ID + ':' + CLIENT_SECRET
    auth_bytes = auth_string.encode('utf-8')
    auth_base64 = str(base64.b64encode(auth_bytes), 'utf-8')

    url = "https://accounts.spotify.com/api/token"
    headers = {
        "Authorization": "Basic " + auth_base64,
        "Content-Type": "application/x-www-form-urlencoded",
    }
    data = {"grant_type": "client_credentials"}
    result = post(url, headers=headers, data=data)
    json_result = json.loads(result.content)
    token = json_result['access_token']
    return token

def get_auth_header(token):
    return{"Authorization": "Bearer " + token}



def create_spotify_oauth():
    return SpotifyOAuth(
        client_id = '1f42356ed83f46cc9ffd35c525fc8541',
        client_secret = '487ec052888b4917b00665fc65b8df9f',
        redirect_uri = url_for('redirect_page', _external=True),
        scope=SCOPE
    )

@app.route('/refresh')
def refresh():
    refresh_token = session.get('refresh_token')
    response = requests.post(TOKEN_URL, data={
        'grant_type': 'refresh_token',
        'refresh_token': refresh_token,
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET
    })
    response_data = response.json()
    session['access_token'] = response_data['access_token']
    session['expires_in'] = response_data['expires_in']
    return jsonify(response_data)



if __name__ == '__main__':
    app.run(port=3001, debug=True)

    




    