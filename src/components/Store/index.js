class Store {
  constructor() {
    this.authUser = JSON.parse(localStorage.getItem("authUser")) || null
    const ls = localStorage.getItem("users")
    this.usersList = JSON.parse(ls) || []
  }

  addUser = ({ email, password, name, dob }) => {
    return new Promise((resolve, reject) => {
      if (!(email || name || password || dob)) {
        reject("Invalid values")
      }
      const existingEmails = this.usersList.filter(user => user.email === email)
      if (existingEmails.length) {
        reject("Email exists")
      }

      this.usersList.push({ email, name, password, dob })
      localStorage.setItem("users", JSON.stringify(this.usersList))
      resolve({ email, password, name, dob })
    })
  }

  authenticateUser = ({ email, password }) => {
    return new Promise((resolve, reject) => {
      const emails = this.usersList.filter(user => user.email === email)
      const filterUser = emails.filter(user => user.password === password)

      if (filterUser.length) {
        this.authUser = filterUser[0]
        localStorage.setItem("authUser", JSON.stringify(this.authUser))
        resolve(filterUser[0])
      } else {
        reject("User not found")
      }
    })
  }

  logout = () => {
    return new Promise((resolve, reject) => {
      this.authUser = null
      localStorage.removeItem("authUser")
      resolve("User logged out")
    })
  }
}

export default Store
