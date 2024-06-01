import React, { useEffect, useState } from 'react';
import { Container, InputGroup, FormControl, Button, Row, Card } from 'react-bootstrap';
import './Search.css'

  
const client_id = '1f42356ed83f46cc9ffd35c525fc8541';
const client_secret = '487ec052888b4917b00665fc65b8df9f';
const refresh_token = 'AQD9WdU3Z8f0q2g9gqOQyZf6uGqXp7ZnYz8f0x0x7b1k'

const accessToken = new URLSearchParams(window.location.search).get('acccessToken');
function Search({token, chooseTrack}) {
  const [accessToken, setAccessToken] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [albums, setAlbums] = useState([])

  useEffect(() => {
    var authParams = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body:'grant_type=client_credentials&client_id=' + client_id + '&client_secret=' + client_secret
    }
    fetch('https://accounts.spotify.com/api/token', authParams)
    .then(result => result.json())
    .then(data => setAccessToken(data.access_token))
    }, [])

 
  async function search() {
    console.log("searching for " + searchInput);
    

  var searchParams = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + accessToken
    }
  }
    const artistID = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist', searchParams)
    .then(response => response.json())
    .then(data => {return data.artists.items[0].id})

    console.log('artistID: ' + artistID)    

    
//get request using artistID to get all the albums from that artist
  var returnedAlbums = await fetch('https://api.spotify.com/v1/artists/' + artistID + '/albums' + '?include_groups=album&market=GB&limit=50', searchParams)
  .then(response => response.json())
  .then(data => {
    console.log(data)
    setAlbums(data.items)
  })

//display the albums
}
console.log(albums)
  return (
    <div  className='App'>
    <div className=" search">

      <Container  className='search-container'>
        <InputGroup className="mb-3" size='lg'>
          <FormControl
        type='input'
          placeholder="Search for songs"
          aria-label="Search"
          onKeyDown={event=> {
            if (event.key === 'Enter') {
             search()
            }
          }}
          aria-describedby="basic-addon2"
          onChange={event => setSearchInput(event.target.value)}
          /> 
          <Button  className='search-button' onClick={search} variant="btn-outline-secondary" type="submit"  id="button-addon2">
            search
          </Button>
        </InputGroup>
        </Container>
        <Container className='search-results'>
          <div className="search-results-container">
          <Row  className='mx-2 row2 row-cols-4'>
            {albums.map((album, i) => {
              return(
              <Card key={i} onClick={() => chooseTrack(album)}>
                  <Card.Img src={album.images[0].url} />
                <Card.Body>
                  <Card.Title>{album.name}</Card.Title>
                </Card.Body>
              </Card>
            )})}
            </Row>
            </div>
            </Container>              
          </div>
        </div>
      );
    }

    

            

export default Search;