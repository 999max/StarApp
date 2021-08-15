import { Component } from "react";
import Loader from "../loader/";
import ApiService from "../../services/api-service";
import "./item-list.css";


export default class ItemList extends Component {
  
  api = new ApiService()

  state = {
    peopleList: null,
  }

  componentDidMount() {
    this.api.getAllPeople()
      .then((peopleList) => {
        this.setState({
          peopleList
        })
      })
  }

  renderItems(arr) {
    return arr.map(({id, name}) => {
      return (
        <li className="list-group-item"
            key={id}
            onClick={() => this.props.onItemSelected(id)}>
          { name }
        </li>
      )
    })
  }

  render () {

    const { peopleList } = this.state;

    if (!peopleList) {
      return <Loader />
    }
    
    const items = this.renderItems(peopleList)

    return (
      <ul className="item-list list-group">
        {items}
      </ul>
    )
  }
}
