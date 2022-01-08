import React from "react";
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import './App.scss';
import Dashboard from "./pages/Dashboard";
import AddList from "./components/addList";
import EditAlbum from "./components/editAlbum";
import Login from "./pages/Login";

function App() {

    function PrivateRoute ({ children, ...rest}) {
        return(
            <Route {...rest} render={() => {
                return localStorage.getItem("TOKEN-DONE-BY-ADMIN")
                ? children
                    : <Redirect to="/" />
            }}/>
        )
    }

  return (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Login} />
            <PrivateRoute>
                <Route path="/dashboard" exact component={Dashboard} />
                <Route path="/list" exact component={AddList} />
                <Route path="/edit/:id" exact component={EditAlbum} />
            </PrivateRoute>
        </Switch>
    </BrowserRouter>
  );
}

export default App;
