import { Component } from 'react';
import ApiService from '../../services/api-service';
// import Loader from '../loader';
import './person-details.css';

export default class PersonDetails extends Component {

  api = new ApiService();

  state = {
    person: null,
  }

  componentDidMount() {
    this.updatePerson();
  }

  componentDidUpdate(prevProps) {
    if (this.props.personId !== prevProps.personId) {
      this.updatePerson()
    }
  }

  updatePerson() {
    const { personId } = this.props;
    if(!personId) {
      return;
    }

    this.api.getPerson(personId)
      .then((person) => {
        this.setState({ person })
      })
  }
  
  render() {

    if (!this.state.person) {
      return <span>Select a person fromo list</span>
    }

    const { id, name, gender,
            birthYear, eyeColor } = this.state.person;
      console.log(id, gender, birthYear)
    return (
      <div className="person-details card">
        <img className="person-image"
          src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`} 
          alt="character"/>

        <div className="card-body">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Gender</span>
              <span>{gender}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Birth year</span>
              <span>{birthYear}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Eye Color</span>
              <span>{eyeColor}</span>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

// export default PersonDetails;