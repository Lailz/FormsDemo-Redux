import { addPerson } from "../store/actions";
import { useDispatch } from "react-redux";
import { useState } from "react";

const ControlledForm = () => {
  const dispatch = useDispatch();
  const [person, setPerson] = useState({
    alias: "",
    description: "",
    email: "",
  });

  const handleChange = (event) =>
    setPerson({ ...person, [event.target.name]: event.target.value });

  const resetForm = () =>
    setPerson({
      alias: "",
      description: "",
      email: "",
    });

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addPerson(person));
    resetForm();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="btn btn-outline-info ">Alias*</span>
        </div>
        <input
          required
          className="form-control"
          type="text"
          name="alias"
          value={person.alias}
          onChange={handleChange}
        />
      </div>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="btn btn-outline-info">Description*</span>
        </div>
        <input
          className="form-control"
          type="text"
          name="description"
          value={person.description}
          onChange={handleChange}
        />
      </div>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="btn btn-outline-info">E-Mail*</span>
        </div>
        <input
          className="form-control"
          type="email"
          name="email"
          value={person.email}
          onChange={handleChange}
        />
      </div>
      <div className="text-center">
        <input className="btn btn-info" type="submit" />
      </div>
    </form>
  );
};

export default ControlledForm;
