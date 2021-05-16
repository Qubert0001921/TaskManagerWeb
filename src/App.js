import React from 'react';
import Todo from './components/pages/Todo';
import Login from './components/pages/Login';
import Menu from './components/Menu/Menu';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
function App() {
      return (
      <Router>
        <Switch>
          <Route path="/" exact component={Todo} />
          <Route path="/login" component={Login} />
        </Switch>
      </Router>);
}

export default App;
