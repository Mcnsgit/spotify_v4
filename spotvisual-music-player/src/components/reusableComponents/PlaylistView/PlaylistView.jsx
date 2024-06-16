// src/components/reusableComponents/Playlists/Playlists.jsx
import React, { useEffect, useReducer } from "react";
import axios from "axios";
import styled from "styled-components";
import PropTypes from "prop-types";

const initialState = {
  playlists: [],
  selectedPlaylistId: null,
};

const playlistReducer = (state, action) => {
  switch (action.type) {
    case "SET_PLAYLISTS":
      return { ...state, playlists: action.playlists };
    case "SET_PLAYLIST_ID":
      return { ...state, selectedPlaylistId: action.selectedPlaylistId };
    default:
      return state;
  }
};

export default function Playlists({ token, onPlaylistSelect }) {
  const [state, dispatch] = useReducer(playlistReducer, initialState);
  const { playlists } = state;

  useEffect(() => {
    const getPlaylistData = async () => {
      try {
        const response = await axios.get("https://api.spotify.com/v1/me/playlists", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const { items } = response.data;
        const playlists = items.map(({ name, id }) => ({ name, id }));
        dispatch({ type: "SET_PLAYLISTS", playlists });
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    };
    if (token) {
      getPlaylistData();
    }
  }, [token]);

  const changeCurrentPlaylist = (selectedPlaylistId) => {
    dispatch({ type: "SET_PLAYLIST_ID", selectedPlaylistId });
    if (onPlaylistSelect) {
      onPlaylistSelect(selectedPlaylistId);
    }
  };

  return (
    <Container>
      <ul>
        {playlists.map(({ name, id }) => (
          <li key={id} onClick={() => changeCurrentPlaylist(id)}>
            {name}
          </li>
        ))}
      </ul>
    </Container>
  );
}

Playlists.propTypes = {
  token: PropTypes.string.isRequired,
  onPlaylistSelect: PropTypes.func,
};

const Container = styled.div`
  height: 100%;
  overflow: hidden;

  ul {
    list-style-type: none;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    height: 52vh;
    max-height: 100%;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.7rem;
      &-thumb {
        background-color: rgba(255, 255, 255, 0.2);
      }
    }
    li {
      display: flex;
      gap: 1rem;
      cursor: pointer;
      transition: 0.3s ease-in-out;
      &:hover {
        color: white;
      }
    }
  }
`;
