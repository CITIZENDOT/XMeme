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
          <Route path="/new">
            <MemeForm />
          </Route>
          <Route path="/">
            <Home />
          </Route>
          <Route path="/:id">
            <h1>Meme</h1>
          </Route>
          <Redirect from="*" to="/admin/index" />
        </Switch>
      </Router>
    </Layout>
  );
}

export default App;
