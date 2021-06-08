import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <PrivateRoute exact path="/">
            <Home />
          </PrivateRoute>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/profile">
            <Profile />
          </Route>
        </Switch>
      </BrowserRouter>  
    </div>
  );
}

export default App;
