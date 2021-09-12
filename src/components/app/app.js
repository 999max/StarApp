import { Component } from "react";
import Header from "../header";
import RandomPlanet from "../random-planet";
import ErrorButton from "../error-button";
import ErrorNotifier from "../error-notifier";

import "./app.css";
import PeoplePage from "../people-page/people-page";


export default class App extends Component {

  state = {
    hasError: false,
  }
  
  componentDidCatch() {
    console.log("componentDidCatch()");
    this.setState({ hasError: true });
  }

  render () {

    if (this.state.hasError) {
      return <ErrorNotifier />
    }

    return (
		<div>
			<Header />
			<RandomPlanet />
      <ErrorButton />
      <PeoplePage />
      <PeoplePage />
      <PeoplePage />
		</div>
    )
  }
	
}
