import axios from "axios"
import React, { useState } from "react"
import { useEffect } from "react"
import { Button, Card, Nav, Navbar } from "react-bootstrap"
import { useHistory } from "react-router-dom"
import { withStore } from "../../components/Store/context"
import logo from "../../logo.svg"
import "./styles.scss"

const Home = ({ store }) => {
  const history = useHistory()
  const [moviesList, setmoviesList] = useState([])

  useEffect(() => {
    store.authUser === null && history.replace("/login")
  }, [history, store])

  useEffect(() => {
    axios
      .get(
        "https://raw.githubusercontent.com/erik-sytnyk/movies-list/master/db.json"
      )
      .then(res => setmoviesList(res.data?.movies))
  }, [])

  return (
    <div className="home">
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand>
          <img
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
        </Navbar.Brand>
        <Navbar.Brand>My Movies</Navbar.Brand>
        <Nav className="ml-auto">
          <Button
            variant="outline-light"
            onClick={() => store.logout().then(() => history.push("/login"))}
          >
            Logout
          </Button>
        </Nav>
      </Navbar>

      <div className="d-flex flex-row flex-wrap justify-content-around">
        {moviesList.map(movie => (
          <Card
            style={{ width: "16rem", margin: "3rem 0rem 0rem" }}
            key={movie.id}
          >
            <Card.Img
              variant="top"
              src={movie.posterUrl}
              alt="Movie Image"
              style={{ height: "14rem" }}
            />
            <Card.Body className="d-flex flex-column justify-content-between">
              <Card.Title>{movie.title}</Card.Title>
              <Card.Text>{movie.plot}</Card.Text>
              <Button
                onClick={() => history.push("/details", movie)}
                variant="primary"
              >
                View Details
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default withStore(Home)
