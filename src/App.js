import React, {useState, useEffect} from 'react';
import {
  Route,
  Switch,
  // Prompt,
  useHistory,
  // useParams,
  // Redirect
} from 'react-router-dom';

import Nav from './Nav';
import Home from './Home';
import Jokes from './Jokes';
import Login from './Login';

import './App.css';

function NoMatch() {
  return (
    <div>
      <h2>This URL does not exist!</h2>
    </div>
  );
}

function App({apiFacade, match}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const emptyItem = {id: '', title: 'No data', info: ''};
  const [items, setItems] = useState([emptyItem]);

  let history = useHistory();

  const login = (username, password) => {
    console.log(username, password);
    apiFacade
      .login(username, password)
      .then(data => {
        setIsLoggedIn(apiFacade.loggedIn);
        setUsername(username);
        getItems();
        console.log(items);
        history.push('/jokes');
      })
      .catch(err => {
        console.log('Ups login:' + err);
        // history.push("/");
      });
    history.push('/home');
  };

  const logout = () => {
    apiFacade.logout();
    setIsLoggedIn(apiFacade.loggedIn);
    setUsername('');
    history.push('/');
  };

  // Get all items from back-end when rendering
  useEffect(() => {
    // getItems();
  }, [apiFacade]);

  // Get all items from back-end
  const getItems = categories => {
    console.log('getItems:', categories);
    apiFacade
      .getItems(categories)
      .then(data => {
        data = data.filter(function(element) {
          return element !== null;
        });
        console.log(data);
        setItems(data);
      })
      .catch(err => console.log('Ups refreshitems:' + err));
  };

  return (
    <div>
      <Nav loginMsg={isLoggedIn ? 'Logout' : 'Login'} isLoggedIn={isLoggedIn} username={username} />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/jokes" exact>
          <Jokes items={items} getItems={getItems} />
        </Route>
        <Route path="/login-out">
          <Login isLoggedIn={isLoggedIn} login={login} logout={logout} />
        </Route>
        <Route>
          <NoMatch />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
