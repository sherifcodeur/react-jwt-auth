import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Register from './components/Register'
import Login from './components/Login'
import PrivateRoute from "./routes/PrivateRoute";
import Private from "./components/Private";

function App() {
  return (
    <Router>
    <div className="App">
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />

        <PrivateRoute exact path="/private" component={Private} />


        


      </Switch>
    </div>
    </Router>
  );
}

export default App;
