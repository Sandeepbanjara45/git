import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./github.css";

import React, { useState } from 'react';
import "./App.css"

const App = () => {
  const [input, setInput] = useState('');
  const [userData, setUserData] = useState(null);

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const urlApi = `https://api.github.com/users/${input}`;
      const response = await fetch(urlApi);
      const data = await response.json();
      console.log(data);
      
      setUserData(data);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  return (
    <>
    <form onSubmit={onSubmit}>          
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Enter GitHub username"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">
              Fetch Data
            </button>
          
          {userData && (
            <Card style={{ width: '18rem' }} className='cimg'>
      <Card.Img variant="top" src={userData.avatar_url} />
      <Card.Body>
        <Card.Title>Name: {userData.name}</Card.Title>
        <Card.Text>
          Welcome to my Github Account. 
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush li">
        <ListGroup.Item className='b'>Following: {userData.following}</ListGroup.Item>
        <ListGroup.Item className='b'>Follower: {userData.followers}</ListGroup.Item>
        <ListGroup.Item className='b'>Repos: {userData.public_repos}</ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <Card.Link href={`https://github.com/${userData.login}`}>Github</Card.Link>
        <Card.Link href={userData.blog}>LinkedIn</Card.Link>
      </Card.Body>
    </Card>

            )}
    </form>
    </>
  );
};

export default App;
