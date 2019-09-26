import React, { Component } from "react";
import { connect } from "react-redux";

class PersonCard extends Component {
  render() {
    const person = this.props.person;
    return (
      <div className="col-12 col-md-3">
        <div className="card">
          <div className="card-body">
            <h3 className="card-title">{person.alias}</h3>
            <p className="text-muted">{person.email}</p>
            <p className="card-text">{person.description}</p>
          </div>
        </div>
      </div>
    );
  }
}

class PeopleList extends Component {
  render() {
    const cards = this.props.people.map(person => (
      <PersonCard key={person.alias} person={person} />
    ));
    return <div className="row my-5">{cards}</div>;
  }
}

const mapStateToProps = state => {
  return {
    people: state.rootPeople.people
  };
};

export default connect(mapStateToProps)(PeopleList);
