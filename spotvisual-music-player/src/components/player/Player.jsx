import { useState, useEffect } from "react"

import Progress from "./progress/Progress.jsx"
import WebPlayback from "./playback.jsx"
import PlayerControls from "../playerControls/PlayerControls.jsx"
import SongDetails from "./songDetails/SongDetails.jsx"

export default function Player() {
  const [accessToken, setAccessToken] = useState('')
  const [play, setPlay] = useState(false)
  const [trackUri, setTrackUri] = useState('')

  useEffect(() => setAccessToken(localStorage.getItem('access_token')), [])
  useEffect(() => {
    if (!accessToken) return
    const script = document.createElement("script")
    script.src = "https://sdk.scdn.co/spotify-player.js"
    script.async = true
    document.body.appendChild(script)
  }, [accessToken])
  

  useEffect(() => {
    if (trackUri) {
      setPlay(true)
    }
  }, [trackUri])


  const onPlay = (uri) => setTrackUri(uri)

  const onStop = () => setTrackUri('')

  const onReady = () => setPlay(true)

  const onEnded = () => setPlay(false)

  const onError = () => setPlay(false)

  const onConnect = () => setPlay(true)

  const onDisconnect = () => setPlay(false)

  const onMount = () => setPlay(true)

  const onUnmount = () => setPlay(false)

  const onTogglePlay = () => setPlay(!play)

  const onSetVolume = (volume) => setPlay(true)

  const onSeek = (position) => setPlay(true)

  const onSeeked = (position) => setPlay(true)

  const onPlaybackError = () => setPlay(false)

  const onPlaybackReady = () => setPlay(true)

  const onPlaybackStart = () => setPlay(true)


  useEffect(() => setPlay(true), [trackUri])



  if (!accessToken) return null
  return (
    <div className="player">
      <WebPlayback
        token={accessToken}
        onPlay={onPlay}
        onStop={onStop}
        onReady={onReady}
        onEnded={onEnded}
        onError={onError}
        onConnect={onConnect}
        onDisconnect={onDisconnect}
        onMount={onMount}
        onUnmount={onUnmount}
        onTogglePlay={onTogglePlay}
        onSetVolume={onSetVolume}
        onSeek={onSeek}
        onSeeked={onSeeked}
        onPlaybackError={onPlaybackError}
        onPlaybackReady={onPlaybackReady}
        onPlaybackStart={onPlaybackStart}
      />
    <PlayerControls
      volume={0.7}
      setVolume={onSetVolume}
      next={onPlaybackReady}
      prev={onPlaybackReady}
      onVolumeChange={onSetVolume}
      onToggleMute={onPlaybackReady}
      isPlaying={play}
      toggleIsPlaying={onTogglePlay}
      shuffle={false}
      toggleShuffle={onPlaybackReady}
      repeat={false}
      toggleRepeat={onPlaybackReady}
    >
      <Progress value={0} onChange={onPlaybackReady} />
    </PlayerControls>
    <div className="player__content">
      <div className="player__cover">
        <SongDetails 
          song={{ title: 'No song', artist: 'No artist' }}
          Visualizer={null}
          source={null}
          analyser={null}
          currentSongIndex={0}
        />
      </div>
      </div>
    </div>
  )
}