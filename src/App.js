import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import './App.scss';
import Dashboard from "./pages/Dashboard";
import AddList from "./components/addList";

function App() {
  return (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Dashboard} />
            <Route path="/list" exact component={AddList} />
        </Switch>
    </BrowserRouter>
  );
}

export default App;
