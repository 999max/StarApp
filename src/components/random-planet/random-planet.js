import React, { Component } from "react";
import ApiService from "../../services/api-service"
import Loader from "../loader/";
import ErrorNotifier from "../error-notifier";

import "./random-planet.css";

export default class RandomPlanet extends Component {

  api = new ApiService()
  

  state = {
    planet: {},
    loading: true,
    error: false
  }
  
  constructor() {
    super()
    this.updatePlanet()
  }


  onError = (err) => {
    this.setState({
      error: true,
      loading: false
    })
  }

  onPlanetLoaded = (planet) => {
    this.setState({
      planet, 
      loading: false
    })
  }

  updatePlanet() {
    const id = 1000 //Math.floor(Math.random() * 25) + 1
    this.api.getPlanet(id).then(this.onPlanetLoaded)
      .catch(this.onError)
  }
  
  render () {
    const { planet, loading, error } = this.state
    const loader = loading ? <Loader /> : null
    const content = !loading && !error ? <PlanetView planet={planet} /> : null
    const err = error ? <ErrorNotifier /> : null

    return(
      <div className="random-planet jumbotron rounded">
        {loader}
        {content}
        {err}
      </div>
    )
  }
}

const PlanetView = ({ planet }) => {

  const {id, planetName, population, 
         rotationPeriod, diameter } = planet

  return (
    <React.Fragment>
      <img className="planet-image"
            src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} />
        <div>
          <h4>{planetName}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Population</span>
              <span>{population}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Rotation Period</span>
              <span>{rotationPeriod}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Diameter</span>
              <span>{diameter}</span>
            </li>
          </ul>
        </div>
    </React.Fragment>
  )
}