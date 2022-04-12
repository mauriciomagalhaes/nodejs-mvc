import  {BrowserRoute as Router, Switch, Route} from 'react-router-dom';
/* Pages */
import Login from './components/pages/auth/Login';
import Register from './components/pages/auth/Register';
import Home from './components/pages/home';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/register'>
          <Register />
        </Route>        
        <Route path='/'>
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}
export default App;
