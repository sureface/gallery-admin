import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import './App.scss';
import Dashboard from "./pages/Dashboard";
import AddList from "./components/addList";
import EditAlbum from "./components/editAlbum";

function App() {
  return (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Dashboard} />
            <Route path="/list" exact component={AddList} />
            <Route path="/edit/:id" exact component={EditAlbum} />
        </Switch>
    </BrowserRouter>
  );
}

export default App;
