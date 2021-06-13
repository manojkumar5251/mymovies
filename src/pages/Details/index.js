import React, { useEffect, useState } from "react"
import { Button, Card, Carousel, Nav, Navbar } from "react-bootstrap"
import { useHistory } from "react-router-dom"
import { withStore } from "../../components/Store/context"
import logo from "../../logo.svg"

import "./index.scss"

const Details = ({ location, store }) => {
  const history = useHistory()

  useEffect(() => {
    store.authUser === null && history.replace("/login")
  }, [history, store])

  useEffect(() => {
    if (location.state === undefined) {
      history.replace("/")
    }
  }, [history, location.state])

  const [index, setIndex] = useState(0)

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex)
  }

  return (
    <div className="details">
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

      <Carousel activeIndex={index} onSelect={handleSelect} interval={2000}>
        <Carousel.Item>
          <img
            style={{ height: "100vh" }}
            className="d-block w-100"
            src={location.state.posterUrl}
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            style={{ height: "100vh" }}
            className="d-block w-100"
            src={location.state.posterUrl}
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            style={{ height: "100vh" }}
            className="d-block w-100"
            src={location.state.posterUrl}
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
      <Card className="container my-4 p-4">
        <div className="title">{location.state.title}</div>
        <ul>
          <li>{location.state.year}</li>
          <li>
            {location.state.genres.map(
              (value, i) =>
                value + (i === location.state.genres.length - 1 ? "" : " / ")
            )}
          </li>
          <li>{location.state.runtime} mins</li>
        </ul>
        <div className="title">Director</div>
        <div className="data">{location.state.director}</div>
        <div className="title">Actors</div>
        <div className="data">{location.state.actors}</div>
        <div className="title">Plot</div>
        <div className="data" style={{ marginBottom: "2rem" }}>
          {location.state.plot}
        </div>
      </Card>
    </div>
  )
}

export default withStore(Details)
