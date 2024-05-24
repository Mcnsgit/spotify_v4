
import React, { useEffect, useState } from 'react';
import querystring from 'querystring';
import { Buffer } from 'buffer';
import {AiOutlinePauseCircle} from 'react-icons/ai';
import {BiErrorCircle} from 'react-icons/bi'
import {HiOutlineStatusOffline} from 'react-icons/hi'
import './styles/styles.css'

//Setting up the Spotify API and Endpoints
const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing';
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const client_id = '1f42356ed83f46cc9ffd35c525fc8541';
const client_secret = '487ec052888b4917b00665fc65b8df9f';
const refresh_token = 'AQDORkPSf8As_vWHcu8myV9HemOVRbRu4mWW_zpeiqLuKYcKjjIeH151B36q6GOU0opcKeWOobY1K9SKWQ7vWGd-5om78uVxSlv479C4y_3sqXN05SJPND1eOkVEUEOuKgM'


//Function to generate an access token using the refresh token everytime the website is opened or refreshed
export const getAccessToken = async () => {
  const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');

  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: querystring.stringify({
      grant_type: 'refresh_token',
      refresh_token: refresh_token,
    }),
  });

  if (response.status > 400) {
    throw new Error('Unable to Fetch Access Token');
  }

  return await response.json();
};

const getNowPlaying = async () => {
  try {
    const { access_token } = await getAccessToken();

    const response = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (response.status > 400) {
      throw new Error('Unable to Fetch Song');
    } else if (response.status === 204) {
      throw new Error('Currently Not Playing');
    }
    //Extracting the required data from the response into seperate variables
    const song = await response.json();
    const albumImageUrl = song.item.album.images[0].url;
    const artist = song.item.artists.map((artist) => artist.name).join(', ');
    const isPlaying = song.is_playing;
    const songUrl = song.item.external_urls.spotify;
    const title = song.item.name;
    const timePlayed = song.progress_ms;
    const timeTotal = song.item.duration_ms;
    const artistUrl = song.item.album.artists[0].external_urls.spotify;

    //Returning the song details
    return {
      albumImageUrl,
      artist,
      isPlaying,
      songUrl,
      title,
      timePlayed,
      timeTotal,
      artistUrl
    };
  } catch (error) {
    console.error('Error fetching currently playing song: ', error);
    return error.message.toString();
  }
};

//Main function to process the data and render the widget
const NowPlaying = () => {

  //Hold information about the currently playing song
  const [nowPlaying, setNowPlaying] = useState(null);

  useEffect(() => {
    const fetchNowPlaying = async () => {
      const data = await getNowPlaying();
      setNowPlaying(data)
    };

    //The spotify API does not support web sockets, so inorder to keep updating the currently playing song and time elapsed - we call the API every second
    setInterval(() => {
      fetchNowPlaying();
    }, 1000);

  }, []);

  //Setting default values for the listener's current state and the duration of the song played
  let playerState = ''
  let secondsPlayed = 0, minutesPlayed = 0, secondsTotal = 0, minutesTotal = 0;
  let albumImageUrl = './images/albumCover.png'
  let title = ''
  let artist = ''

  if (nowPlaying && nowPlaying.title) {
    playerState = nowPlaying.isPlaying ? 'PLAY' : 'PAUSE';
    secondsPlayed = Math.floor(nowPlaying.timePlayed / 1000);
    minutesPlayed = Math.floor(secondsPlayed / 60);
    secondsPlayed %= 60;
    secondsTotal = Math.floor(nowPlaying.timeTotal / 1000);
    minutesTotal = Math.floor(secondsTotal / 60);
    secondsTotal %= 60;
    albumImageUrl = nowPlaying.albumImageUrl;
    title = nowPlaying.title;
    artist = nowPlaying.artist;
  } else if (nowPlaying === 'Currently Not Playing') {
    playerState = 'OFFLINE';
    title = 'User is';
    artist = 'currently Offline';
  } else {
    title = 'Failed to';
    artist = 'fetch song';
  }

  return (
    <a style={{ textDecoration: 'none', color: 'black' }} href={playerState === 'PLAY' || playerState === 'PAUSE' ? nowPlaying.songUrl : ''}>
      <div className='nowPlayingCard'>
        <div className='nowPlayingImage'>
          {playerState === 'PLAY' || playerState === 'PAUSE' ? <a href={nowPlaying.songUrl}><img src={albumImageUrl} alt='Album' /></a> : <img src={albumImageUrl} alt='Album' />}
        </div>
        <div id='nowPlayingDetails'>
          <div className={`nowPlayingTitle ${title.length > 15 ? 'marquee-content' : ''}`}>
            {playerState === 'PLAY' || playerState === 'PAUSE' ? <a href={nowPlaying.songUrl}>{title}</a> : title}
          </div>
          <div className='nowPlayingArtist'>
            {playerState === 'PLAY' || playerState === 'PAUSE' ? <a href={nowPlaying.artistUrl}>{artist}</a> : artist}
          </div>
          <div className='nowPlayingTime'>{pad(minutesPlayed)}:{pad(secondsPlayed)} / {pad(minutesTotal)}:{pad(secondsTotal)}</div>
        </div>
        <div className='nowPlayingState'>
          {playerState === 'PLAY' ? <img alt='soundbar' src='./images/soundbar.gif' title='Now Listening' /> : playerState === 'PAUSE' ? <AiOutlinePauseCircle size={40} /> : playerState === 'OFFLINE' ? <HiOutlineStatusOffline size={40} /> : <BiErrorCircle size={40} />}
        </div>
      </div>
    </a>
  );
};

export default NowPlaying;