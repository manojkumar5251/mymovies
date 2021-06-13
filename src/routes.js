import React, { useEffect } from "react"
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom"
import { withStore } from "./components/Store/context"

import Details from "./pages/Details"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"

const Routes = ({ store }) => {
  useEffect(() => {
    console.log(store, "manoj")
  }, [store])

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/details" component={Details} />
        <Route exact path="/" component={Home} />

        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  )
}

export default withStore(Routes)
