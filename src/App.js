import React from "react";

// Components
import ControlledForm from "./ControlledForm";
import PeopleList from "./PeopleList";

function App() {
  return (
    <div className="container">
      <div className="jumbotron mt-3 text-center">
        <div className="row align-center mb-2">
          <div className="col-4"></div>
          <div className="col-4">
            <h3 className="text">Tell us about yourself:</h3>
          </div>
          <div className="col-4"></div>
        </div>
        <ControlledForm />
      </div>
      <PeopleList />
    </div>
  );
}

export default App;
