// Components
import ControlledForm from "./components/ControlledForm";
import PeopleList from "./components/PeopleList";

const App = () => (
  <div className="container">
    <div className="jumbotron mt-3 text-center">
      <div className="row align-center mb-2">
        <div className="col-4">
          <h3 className="text">Tell us about yourself:</h3>
        </div>
      </div>
      <ControlledForm />
    </div>
    <PeopleList />
  </div>
);

export default App;
