import React, { useEffect, useState } from "react"
import { Alert, Button, Card, Form } from "react-bootstrap"
import { Link, useHistory } from "react-router-dom"
import { withStore } from "../../components/Store/context"

import "./index.scss"

const Signup = ({ store }) => {
  const history = useHistory()
  const [name, setname] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [dob, setdob] = useState("")
  const [validate, setvalidate] = useState(false)
  const [show, setshow] = useState("")

  useEffect(() => {
    store.authUser !== null && history.replace("/")
  }, [history, store])

  const handleSubmit = () => {
    setvalidate(true)

    store
      .addUser({ name, email, password, dob })
      .then(res => {
        res.email && history.push("/")
      })
      .catch(() => {})
  }

  return (
    <div className="signup d-flex align-items-center justify-content-center">
      {show !== "" && (
        <Alert
          variant="danger"
          style={{ position: "absolute", top: "2rem" }}
          onClose={() => setshow("")}
          dismissible
        >
          <Alert.Heading>{show}</Alert.Heading>
        </Alert>
      )}
      <Card className="container">
        <Form className="d-flex flex-column" validated={validate}>
          <h1 className="align-self-center">My Movies</h1>

          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter Name"
              onChange={e => setname(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a Name.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="Enter Email"
              onChange={e => setemail(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid Email.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="Password"
              onChange={e => setpassword(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a Password.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label>Birthday</Form.Label>
            <Form.Control
              required
              type="date"
              placeholder="Birthday"
              onChange={e => setdob(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a Birthday.
            </Form.Control.Feedback>
          </Form.Group>

          <div className="d-flex flex-row justify-content-between">
            <div className="d-flex align-items-center">
              Dont have an account ?
              <Link to="/login" style={{ marginLeft: 10, fontWeight: "700" }}>
                Login
              </Link>
            </div>

            <Button variant="primary" onClick={handleSubmit}>
              Signup
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  )
}

export default withStore(Signup)
