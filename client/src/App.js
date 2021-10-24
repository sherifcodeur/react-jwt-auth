import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Register from './components/Register'
import Login from './components/Login'

function App() {
  return (
    <Router>
    <div className="App">
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />


        


      </Switch>
    </div>
    </Router>
  );
}

export default App;
