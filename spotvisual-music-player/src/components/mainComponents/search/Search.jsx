import React, { useEffect, useState } from 'react';
import { Container, InputGroup, FormControl, Button, Row, Card } from 'react-bootstrap';
import './Search.css';
import debounce from 'lodash.debounce';
const Search = ({ token, chooseTrack }) => {
  const [accessToken, setAccessToken] = useState(token || '');
  const [searchInput, setSearchInput] = useState('');
  const [albums, setAlbums] = useState([]);
  const [error, setError] = useState(null);

  // Fetch token if not provided
  useEffect(() => {
    let isMounted = true;

    async function fetchToken() {
      try {
        const authParams = new URLSearchParams({
          grant_type: 'client_credentials',
          client_id: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
          client_secret: process.env.REACT_APP_SPOTIFY_CLIENT_SECRET
        });

        const response = await fetch('https://accounts.spotify.com/api/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: authParams.toString()
        });

        if (!response.ok) {
          throw new Error('Failed to fetch access token');
        }

        const data = await response.json();
        if (isMounted) {
          setAccessToken(data.access_token);
        }
      } catch (err) {
        setError(err.message);
      }
    }

    if (!token) {
      fetchToken();
    }

    return () => {
      isMounted = false;
    };
  }, [token]);

  // Debounce the search function
  const debouncedSearch = useCallback(
    debounce(async (query) => {
      if (!query) return;

      try {
        const searchParams = new URLSearchParams({
          q: query,
          type: 'artist'
        });

        const response = await fetch(`https://api.spotify.com/v1/search?${searchParams.toString()}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to search for artist');
        }

        const data = await response.json();
        const artistID = data.artists.items[0]?.id;

        if (!artistID) {
          setAlbums([]);
          return;
        }

        const albumsResponse = await fetch(`https://api.spotify.com/v1/artists/${artistID}/albums?include_groups=album&market=GB&limit=50`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          }
        });

        if (!albumsResponse.ok) {
          throw new Error('Failed to fetch albums');
        }

        const albumsData = await albumsResponse.json();
        setAlbums(albumsData.items);
      } catch (err) {
        setError(err.message);
      }
    }, 500), // Adjust debounce time as needed
    [accessToken]
  );

  // Handle search input changes
  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
    setError(null); // Clear any previous errors
    debouncedSearch(event.target.value);
  };

  return (
    <div className="search">
      <Container className="search-container">
        <InputGroup className="mb-3" size="lg">
          <FormControl
            type="input"
            placeholder="Search for songs"
            aria-label="Search"
            onKeyDown={event => {
              if (event.key === 'Enter') {
                debouncedSearch(searchInput);
              }
            }}
            aria-describedby="basic-addon2"
            onChange={handleSearchInputChange}
          />
          <Button className="search-button" onClick={() => debouncedSearch(searchInput)} variant="outline-secondary" type="submit" id="button-addon2">
            Search
          </Button>
        </InputGroup>
        {error && <Alert variant="danger">{error}</Alert>}
      </Container>
      <Container className="search-results">
        <Row className="mx-2 row2 row-cols-4">
          {albums.map((album, i) => (
            <Card key={i} onClick={() => chooseTrack(album)}>
              <Card.Img src={album.images[0]?.url} alt={album.name} />
              <Card.Body>
                <Card.Title>{album.name}</Card.Title>
              </Card.Body>
            </Card>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Search;