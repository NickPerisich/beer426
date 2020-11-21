import React, {useState, useEffect, useCallback, useRef} from 'react';
import Container from 'react-bootstrap/Container';
import CardColumns from 'react-bootstrap/CardColumns';
import Card from 'react-bootstrap/Card';
import SelectSearch from 'react-select-search';
import Button from 'react-bootstrap/Button';
import debounce from 'lodash.debounce';

function ProfilePage(props) {
  const [options, setOptions] = useState([]);
  const [dbQuery, setDbQuery] = useState('');
  const [selectedBeer, setSelectedBeer] = useState();
  const [likedBeers, setLikedBeers] = useState([]);

  useEffect(() => {
    fetch('https://data.opendatasoft.com/api/records/1.0/search/?dataset=open-beer-database%40public-us&sort=ibu&rows=8&facet=style_name&facet=cat_name&facet=name_breweries&facet=country&q=' + dbQuery)
    .then(res => res.json())
    .then(res => {
      setOptions(res.records.map(document => {
        return {name: document.fields.name + " by " + document.fields.name_breweries, value: document.fields.id, fields: document.fields}
      }));
    });
  }, [dbQuery])

  // useEffect(() => {
  //   console.log("first");
  //   fetch('/api/likes', {
  //     method: 'POST',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       username: props.username
  //     })
  //   }).then(items => items.json()).then(items => {
  //     console.log(items);
  //   });
  // }, [])

  useEffect(() => {
    fetch('/api/updatelikes', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: props.username,
        likedBeers: likedBeers
      })
    });
  }, [likedBeers])

	const debouncedSave = useCallback(debounce(nextValue => setDbQuery(nextValue), 500), []);

  function valueRenderer(valueProps, snapshot, className) {
    if (snapshot.search) {
      debouncedSave(snapshot.search);
    }
    return (
        <input {...valueProps} className={className} />
    );
  }

  function selectedValueChange(value) {
    setSelectedBeer(options.filter(beer => beer.value === value)[0]['fields']);
  }

  function addToLikes() {
    setLikedBeers(oldArray => [...oldArray, selectedBeer]);
    setSelectedBeer();
  }

  function removeFromLikes(event) {
    setLikedBeers(likedBeers.filter(beer => event.target.value !== beer.id));
  }

  function buttonDisabler() {
    return likedBeers.filter(beer => beer.id === selectedBeer.id).length > 0;
  }

  return (
    <Container fluid className='padding'>
      <Card bg="light" className="search-desc">
        <Container fluid className='mb-3'>
          <div class="search-desc"><h5>Search for styles of beer, breweries near you, or whatever else you want to know about beer!</h5></div>
          <SelectSearch search fuse={false} options={options} renderValue={valueRenderer} onChange={selectedValueChange} placeholder="Find your beer..." />
        </Container>
      </Card>
        <CardColumns>
          {selectedBeer && <Card bg="light">
            <Card.Body>
              <Card.Title>{selectedBeer.name}</Card.Title>
              <Card.Subtitle>{selectedBeer.style_name}</Card.Subtitle>
              <Card.Text>
                <ul>
                  {selectedBeer.name_breweries && <li>{"Brewed by " + selectedBeer.name_breweries}</li>}
                  {(selectedBeer.city && selectedBeer.state && selectedBeer.country) && <li>{"Brewed in " + selectedBeer.city + ", " + selectedBeer.state + ", " + selectedBeer.country}</li>}
                  {selectedBeer.abv > 0 && <li>{"ABV: " + Math.round(selectedBeer.abv * 10) / 10}</li>}
                  {selectedBeer.ibu > 0 && <li>{"IBU: " + selectedBeer.ibu}</li>}
                  {selectedBeer.srm > 0 && <li>{"SRM: " + selectedBeer.srm}</li>}
                  {selectedBeer.website && <li><a href={selectedBeer.website}>{selectedBeer.website}</a></li>}
                  {selectedBeer.descript && <li>{"Description: " + selectedBeer.descript}</li>}
                </ul>
              </Card.Text>
              <Button variant="success" onClick={addToLikes} disabled={buttonDisabler()}>Like</Button>
            </Card.Body>
          </Card>}
          {likedBeers.map(beer => {
            return (
              <Card bg="light">
                <Card.Body>
                  <Card.Title>{beer.name}</Card.Title>
                  <Card.Subtitle>{beer.style_name}</Card.Subtitle>
                  <Card.Text>
                    <ul>
                      {beer.name_breweries && <li>{"Brewed by " + beer.name_breweries}</li>}
                      {(beer.city && beer.state && beer.country) && <li>{"Brewed in " + beer.city + ", " + beer.state + ", " + beer.country}</li>}
                      {beer.abv > 0 && <li>{"ABV: " + Math.round(beer.abv * 10) / 10}</li>}
                      {beer.ibu > 0 && <li>{"IBU: " + beer.ibu}</li>}
                      {beer.srm > 0 && <li>{"SRM: " + beer.srm}</li>}
                      {beer.website && <li><a href={beer.website}>{beer.website}</a></li>}
                      {beer.descript && <li>{"Description: " + beer.descript}</li>}
                    </ul>
                  </Card.Text>
                  <Button variant="danger" value={beer.id} onClick={removeFromLikes}>Unlike</Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
    </Container>
  );
}

export default ProfilePage;