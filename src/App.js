import './App.css';
import {Homepage, SignIn} from './pages'
import { Route, Switch } from 'react-router-dom';
import { Router } from 'react-router';
import { PrivateRoute } from './components'
import './services/index'
const createHistory = require('history').createBrowserHistory;
const history = createHistory({ forceRefresh: true });

const App = () => {
  return (
      <Router history={history}>
        <Switch>
          <Route exact path={'/auth'} component={() =>  <SignIn /> } />
          <PrivateRoute path={'/'} component={() => <Homepage />}/>
        </Switch>
      </Router>

  );
}

export default App;
