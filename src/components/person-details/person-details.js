import React, { Component } from 'react';
import ApiService from '../../services/api-service';
import ErrorButton from '../error-button';
import Loader from '../loader';
import './person-details.css';

export default class PersonDetails extends Component {

  api = new ApiService();

  state = {
    person: null,
    loading: true,
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
    this.setState({
      loading: true
    })
    
    const { personId } = this.props;
    if(!personId) {
      return;
    }

    this.api.getPerson(personId)
      .then((person) => {
        this.setState({ 
          person,
          loading: false
        })
      })
  }
  
  render() {

    const { person, loading } = this.state;

    const loader = loading ? <Loader /> : null;
    const content = !loading ? <PersonView person={person} /> : null

    return (
      <div className="person-details card">
        {loader}
        {content}
      </div>
    )
  }
}

const PersonView = ({ person }) => {

    const { id, name, gender, birthYear, eyeColor } = person
    return (
      <React.Fragment>
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
          <ErrorButton />
        </div>
      </React.Fragment>
    )
}
