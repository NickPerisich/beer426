import React, {useState, useEffect, useCallback, useRef} from 'react';
import Container from 'react-bootstrap/Container';
import CardColumns from 'react-bootstrap/CardColumns';
import Card from 'react-bootstrap/Card';
import SelectSearch from 'react-select-search';
import Button from 'react-bootstrap/Button';
import debounce from 'lodash.debounce';
import { useHistory } from "react-router-dom";

function ProfilePage(props) {
  const [options, setOptions] = useState([]);
  const [dbQuery, setDbQuery] = useState('');
  const [selectedBeer, setSelectedBeer] = useState();
  const [likedBeers, setLikedBeers] = useState([]);
  const [reccomendedBeer, setReccomendedBeer] = useState();
  let first = useRef(true);
  let history = useHistory();

  useEffect(() => {
    fetch('https://data.opendatasoft.com/api/records/1.0/search/?dataset=open-beer-database%40public-us&sort=ibu&rows=8&q=' + dbQuery)
    .then(res => res.json())
    .then(res => {
      setOptions(res.records.map(document => {
        return {name: document.fields.name + " by " + document.fields.name_breweries, value: document.fields.id, fields: document.fields}
      }));
    });
  }, [dbQuery])

  useEffect(() => {
    if (first.current){
      fetch('/api/likes', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: props.username
        })
      })
      .then(res => res.json())
      .then(res => {
        first.current = false;
        if (Object.keys(res).length === 0) {
          setLikedBeers([])
        }
        else {
          setLikedBeers(res)
        }
      });
    }
    else {
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
    }
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

  function addRecToLikes() {
    setLikedBeers(oldArray => [...oldArray, reccomendedBeer]);
    setReccomendedBeer();
  }

  function removeRec() {
    setReccomendedBeer();
  }

  function removeFromLikes(event) {
    setLikedBeers(likedBeers.filter(beer => event.target.value !== beer.id));
  }

  function buttonDisabler() {
    return likedBeers.filter(beer => beer.id === selectedBeer.id).length > 0;
  }

  function recButtonDisabler() {
    return !(likedBeers.length > 0);
  }

  function getReccomendation() {
    let category = likedBeers.map(beer => beer.cat_id)[Math.floor(Math.random() * likedBeers.length)];
    let exclusions = '';
    likedBeers.forEach(beer => {
      exclusions = exclusions + '&exclude.id=' + beer.id;
    });
    fetch('https://data.opendatasoft.com/api/records/1.0/search/?dataset=open-beer-database%40public-us&sort=ibu&rows=1' + exclusions + '&refine.cat_id=' + category)
    .then(res => res.json())
    .then(res => {
      setReccomendedBeer(res.records[0].fields);
    })
  }

  function deleteAccount() {
    fetch('/api/deleteuser', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: props.username
      })
    });
    props.logout();
    history.push("/");
  }

  return (
    <Container fluid className='padding'>
      <Button size="sm" variant="danger" onClick={deleteAccount}>Delete Account for {props.username}</Button>
      <Card bg="light" className="search-desc">
        <Container fluid className='mb-3'>
          <div class="search-desc"><h5>Search for your favorite beers!</h5></div>
          <SelectSearch search fuse={false} options={options} renderValue={valueRenderer} onChange={selectedValueChange} placeholder="Find your beer..." />
        </Container>
      </Card>
        <CardColumns>
          <Card bg="light">
            <Card.Body>
              <Card.Title>Generate reccomendations!</Card.Title>
              <Card.Subtitle className="mb-1">Based on your previously like beers</Card.Subtitle>
              <Button variant="success" onClick={getReccomendation} disabled={recButtonDisabler()}>Generate</Button>
            </Card.Body>
          </Card>
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
          {reccomendedBeer && <Card bg="light">
            <Card.Body>
              <Card.Title>Reccomendation: {reccomendedBeer.name}</Card.Title>
              <Card.Subtitle>{reccomendedBeer.style_name}</Card.Subtitle>
              <Card.Text>
                <ul>
                  {reccomendedBeer.name_breweries && <li>{"Brewed by " + reccomendedBeer.name_breweries}</li>}
                  {(reccomendedBeer.city && reccomendedBeer.state && reccomendedBeer.country) && <li>{"Brewed in " + reccomendedBeer.city + ", " + reccomendedBeer.state + ", " + reccomendedBeer.country}</li>}
                  {reccomendedBeer.abv > 0 && <li>{"ABV: " + Math.round(reccomendedBeer.abv * 10) / 10}</li>}
                  {reccomendedBeer.ibu > 0 && <li>{"IBU: " + reccomendedBeer.ibu}</li>}
                  {reccomendedBeer.srm > 0 && <li>{"SRM: " + reccomendedBeer.srm}</li>}
                  {reccomendedBeer.website && <li><a href={reccomendedBeer.website}>{reccomendedBeer.website}</a></li>}
                  {reccomendedBeer.descript && <li>{"Description: " + reccomendedBeer.descript}</li>}
                </ul>
              </Card.Text>
              <Button className="mr-1" variant="success" onClick={addRecToLikes}>Keep</Button>
              <Button variant="danger" onClick={removeRec}>Discard</Button>
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