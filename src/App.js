import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import NotebookRoute from "./NotebookRoute";
import Notebook from "./pages/Notebook";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <PrivateRoute exact path="/">
            <NavBar />
            <Home />
          </PrivateRoute>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <PrivateRoute exact path="/profile">
            <NavBar />
            <Profile />
          </PrivateRoute>
          <NotebookRoute path="/notebook/:id">
            <NavBar />
            <Notebook />
          </NotebookRoute>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
