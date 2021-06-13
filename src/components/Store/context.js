import React from "react"

const StoreContext = React.createContext(null)

export const withStore = Component => props =>
  (
    <StoreContext.Consumer>
      {users => <Component {...props} store={users} />}
    </StoreContext.Consumer>
  )

export default StoreContext
