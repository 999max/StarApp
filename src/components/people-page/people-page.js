import { Component } from "react";
import ErrorNotifier from "../error-notifier";
import ItemList from "../item-list";
import PersonDetails from "../person-details/";

export default class PeoplePage extends Component {

  state = {
    selectedPerson: 3,
    hasError: false,
  }

  componentDidCatch(error, info) {
    // debugger;
    this.setState({
      hasError: true
    })
  }

  onPersonSelected = (id) => {
      this.setState({
        selectedPerson: id,
      })
    }

  render() {
    if (this.state.hasError) {
      return <ErrorNotifier />
    }

    return (
      <div className="row mb2">
      <div className="col-md-6">
        <ItemList onItemSelected={this.onPersonSelected}/>
      </div>
      <div className="col-md-6">
      <PersonDetails personId={this.state.selectedPerson}/>
      </div>
    </div>
    )
  }
}