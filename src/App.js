import React from "react"
import Store from "./components/Store"
import StoreContext from "./components/Store/context"
import Routes from "./routes"

function App() {
  return (
    <StoreContext.Provider value={new Store()}>
      <Routes />
    </StoreContext.Provider>
  )
}

export default App
