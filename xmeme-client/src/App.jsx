import MemeForm from "./components/MemeForm.jsx";
import Home from "./components/Home.jsx";
import Layout from "./components/Layout.jsx";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

function App() {
  return (
    <Layout>
      <Router>
        <Switch>
          <Route path="/new" component={MemeForm} />
          <Route path="/" component={Home} />
          <Redirect from="*" to="/" />
        </Switch>
      </Router>
    </Layout>
  );
}

export default App;
