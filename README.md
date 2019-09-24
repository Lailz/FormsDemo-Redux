# RJSDemo8 - Forms

[Slides](https://docs.google.com/presentation/d/1VNDFN2oIkKLUpKRZ7hkiRjyJTv3d7-Lp6eZJPZn2P5E/edit?usp=sharing)

#### Setup

- Virtual Env Setup
```shell
python3 -m venv demo
```
1. Clone [backend](https://github.com/lailalelouch/RJS) and run the server

#### Binding a form to state

1. Add the form in `ControlledForm.js`

```jsx
render() {
  return (
    <form>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text">Alias*</span>
        </div>
        <input
          type="text"
          className="form-control"
          name="alias"
        />
      </div>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text">Description*</span>
        </div>
        <input
          type="text"
          className="form-control"
          name="description"
        />
      </div>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text">E-Mail*</span>
        </div>
        <input
          type="email"
          className="form-control"
          name="email"
        />
      </div>
      <input className="btn btn-outline-dark" type="submit" />
    </form>
  );
}
```

2. Bind the form inputs to state.
   Things to explain:
   _ State keys have to match backend
   _ What is `e`? How does it work?

```javascript
class ControlledForm extends Component {
    state = {
        alias: "",
        description: "",
        email: ""
    }

    handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

    ...

    <input
      type="text"
      className="form-control"
      name="description"
      onChange={this.handleChange}
    />

```

#### Submission

1. Show what happens now when we submit (page refreshes, data gets add as query in address bar).

2. Add an `onSubmit` and prevent default

```javascript
...
handleSubmit = e => {
  e.preventDefault();
  alert("SUBMIT")
}
...
  <form onSubmit={event=>this.handleSubmit(event)}>
...
```

3. We need to DO something when we submit. In `actions/people.js` create the form action to be dispatched

```javascript
import * as actionTypes from "./actionTypes";
import axios from "axios";

export const submitPerson = data => {
  return async dispatch => {
    try {
      const res = await axios.post("http://127.0.0.1:8000/alias/", data);
      dispatch({
        type: actionTypes.SUBMIT_PERSON,
        payload: "LOL"
      });
    } catch (error) {
      console.error("Person did not submit!");
      console.error(error);
    }
  };
};
```

4. Connect it to the submit handler.

```javascript
import { connect } from "react-redux";
import * as actionCreators from "./store/actions/index";
...
    handleSubmit = (e) => {
      e.preventDefault();
      this.props.submitPerson(this.state);
    }
...
const mapDispatchToProps = dispatch => {
  return {
    submitPerson: data => dispatch(actionCreators.submitPerson(data))
  };
};

...
```

5. Show and tell:

- Show `SUBMIT_PERSON` action in redux tools
- Show error log for missing data
- Show new person in list on refresh
- Discuss missing pieces:
  - Person should show up without refresh
  - Form should be cleared after success
  - User should be told when there are errors and what they are.

#### Handle successful `POST`

1. In `actions/people.js`, use the person returned from the backend as the payload:

From

```javascript
...
    try {
      const res = await axios.post("http://127.0.0.1:8000/alias/", data);
      console.log(res.data); // LOG DATA
      dispatch({
        type: actionTypes.SUBMIT_PERSON,
      });
    } catch (error) {
...
```

to


```javascript
...
export const submitPerson = data => {
  return async dispatch => {
    try {
      const res = await axios.post("http://127.0.0.1:8000/alias/", data);
      const person = res.data;
      dispatch({
        type: actionTypes.SUBMIT_PERSON,
        payload: person
      });
    } catch (error) {
...
```

2. Handle the payload in the `reducers/people.js`:
   Explain why we use the spread instead of `concat`.

```javascript
...
    case actionTypes.SUBMIT_PERSON:
      return {
        ...state,
         people: [action.payload, ...state.people]
      };
...
```

#### Clear the form on successful post

1. Two-way bind forms inputs to state:
   Show how changing the STATE now changes the form.

```javascript
...
<input
  type="text"
  className="form-control"
  name="description"
  value={this.state.description} // This part
  onChange={this.handleChange}
/>
...
```

2. Write a `resetForm` method:

```js
...
  resetForm = () => this.setState({ alias: "", description: "", email: "" });
...
```

3. Pass it to the ACTION to reset on success:

`ControlledForm.js`

```js
...
 handleSubmit = e => {
    e.preventDefault();
    this.props.submitPerson(this.state, this.resetForm);
  };
...
const mapDispatchToProps = dispatch => {
  return {
    submitPerson: (data, reset) => dispatch(actionCreators.submitPerson(data, reset))
  };
};
...
```

`actions/people.js`

```js
export const submitPerson = (data, reset) => {
  return async dispatch => {
    try {
      const res = await axios.post("http://127.0.0.1:8000/alias/", data);
      const person = res.data;
      dispatch({
        type: actionTypes.SUBMIT_PERSON,
        payload: person
      });
      reset();
    }
    ...
  }
}
```

#### Handling Errors

1. Show `errors.resonse.data` in `reducers/people.js`:

```js
...
    } catch (error) {
      console.error("Person did not submit!");
      console.error(error.response.data);
    }
...

```

2. There are many ways we can use this error object. ONE way is with bootstrap:

```js
<input
  type="text"
  className="form-control is-invalid" // <--- very important
  name="alias"
  value={this.state.alias}
  onChange={this.handleChange}
/>
<div className="invalid-feedback">
  this input is invalid
</div>
```

3. Create an error object and use it to conditionally change the class and message:

```js
...
  render() {
    const errors = {
      alias: ["the alias is wrong"],
      description: ["the description is wrong"],
      email: ["the email is wrong"]
    };
    ...
    <input
      type="text"
      className={`form-control ${errors.alias && "is-invalid"}`}
      name="alias"
      value={this.state.alias}
      onChange={this.handleChange}
    />
    <div className="invalid-feedback">{errors.alias}</div>
    ...
```

4. Connect the submission errors to redux (show state in dev tools):
   `actionTypes.js`

```js
export const FETCH_PEOPLE = "FETCH_PEOPLE";
export const SUBMIT_PERSON = "SUBMIT_PERSON";
export const SET_ERRORS = "SET_ERRORS";
```

`reducers/errors.js`

```js
import * as actionTypes from "../actions/actionTypes";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ERRORS:
      return action.payload;
    default:
      return state;
  }
};
```

`src/index.js`

```js
...
import peopleReducer from "./store/reducers/people";
import errorReducer from "./store/reducers/errors";

const rootReducer = combineReducers({
  rootPeople: peopleReducer,
  errors: errorReducer
});
...
```

`actions/people.js`

```js
...
    } catch (error) {
      console.error("Person did not submit!");
      dispatch({
        type: actionTypes.SET_ERRORS,
        payload: error.response.data
      });
    }
...
```

5. Bring errors into `ControlledForm.js`:

```js
...
  const errors = this.props.errors;
  ...
  const mapStateToProps = state => {
    return {
      errors: state.errors
    };
  };
...
```

6. Reset the errors on success:

`actions/people.js`

```js
...
    try {
      const res = await axios.post("http://127.0.0.1:8000/alias/", data);
      const person = res.data;
      dispatch({
        type: actionTypes.SUBMIT_PERSON,
        payload: person
      });
      dispatch({
        type: actionTypes.SET_ERRORS,
        payload: {}
      });
      reset();
    }
...
```
