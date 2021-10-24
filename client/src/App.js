import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Register from './components/Register'

function App() {
  return (
    <Router>
    <div className="App">
      <Switch>
        <Route exact path="/register" component={Register} />


        


      </Switch>
    </div>
    </Router>
  );
}

export default App;
