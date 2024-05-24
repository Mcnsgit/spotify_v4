import React, { useEffect, useState } from 'react';
import { Container, InputGroup, FormControl, Button, Row, Card } from 'react-bootstrap';

const accessToken = new URLSearchParams(window.location.search).get('acccessToken');
function Search() {
  const [accessToken, setAccessToken] = useState('')
  const [searchInput, setSearchInput] = useState('')

  const [albums, setAlbums] = useState([])

  useEffect(() => {
    setAccessToken(accessToken)
  }, [accessToken])

  //Search
async function handleSearch() {
  console.log("searching for " + searchInput)

  var searchParams = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + accessToken
    }
  }
  //Get requestusing search to get the artistID
  var artistID= await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist', searchParams ) 
  .then(response => response.json())
  .then(data => { return data.artists.items[0].id })

  console.log("ArtistID: " + artistID)
//get request using artistID to get all the albums from that artist
  var returnedAlbums = await fetch('https://api.spotify.com/v1/artists/' + artistID + '/albums' + '?include_groups=album&market=GB&limit=50', searchParams)
  .then(result => result.json())
  .then(data => {
    console.log(data);
    setAlbums(data.items)
  })

//display the albums
}
console.log(albums)
  return (
    <div>
    <div className="App">
      <Container>
        <InputGroup className="mb-3" size='lg'>
          <FormControl
        type='input'
          placeholder="Search for songs"
          aria-label="Search"
          onKeyDown={event=> {
            if (event.key === 'Enter') {
              handleSearch()
            }
          }}
          aria-describedby="basic-addon2"
          onChange={event => setSearchInput(event.target.value)}
          /> 
          <Button onClick={() => handleSearch()} variant="outline-secondary" id="button-addon2">
            search
          </Button>
        </InputGroup>
        </Container>
        <Container> 
          <Row className='mx-2 row row-cols-4'>
            {albums.map((album, i) => {
              console.log(album);
              return (
                <Card>
                  <Card.Img src={album.images[0].url} />
                  <Card.Body>
                    <Card.Title>{album.name}</Card.Title>
                  </Card.Body>
                </Card>
              )
            })}
            </Row>


      </Container>
    </div>
    </div>
  );
}

export default Search;