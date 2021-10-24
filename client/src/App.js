import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
    <div className="App">
      <Switch>
        <Route  path="/register" component={Register} />


        


      </Switch>
    </div>
    </Router>
  );
}

export default App;
