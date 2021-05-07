import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />


        <Switch>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
