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
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";

function App() {
  return (
    <Router>
    <div className="App">
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/forgot-password" component={ForgotPassword} />
        <Route exact path="/password-reset/:resetToken" component={ResetPassword} />

        <PrivateRoute exact path="/private" component={Private} />


        


      </Switch>
    </div>
    </Router>
  );
}

export default App;
