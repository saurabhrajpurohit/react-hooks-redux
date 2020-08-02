//react core import
import React from 'react';

//Components import
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//Internal imports
import Header from './component/Utils/header';
import Movies from './component/Movies';
import UserList from './component/UserList';

function App() {
  return (
    <div>
      <Header />
      <Router>
        <Switch>
          <Route path="/" exact={true}>
            <Movies />
          </Route>
          <Route path="/userlist">
            <UserList />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
