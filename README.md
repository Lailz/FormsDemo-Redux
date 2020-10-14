# RJSDemo8 - Forms

[Slides](https://docs.google.com/presentation/d/1VNDFN2oIkKLUpKRZ7hkiRjyJTv3d7-Lp6eZJPZn2P5E/edit?usp=sharing)

#### Setup

1. Clone [backend](https://github.com/JoinCODED/RJSDemo8-Forms-Backend) and run the server

2. Virtual Env Setup

   ```shell
   python3 -m venv demo
   ```

#### Binding a form to state

1. Add the form in `ControlledForm.js`

   ```jsx
   <form>
     <div className="input-group mb-3">
       <div className="input-group-prepend">
         <span className="btn btn-outline-info ">Alias*</span>
       </div>
       <input type="text" className="form-control" name="alias" />
     </div>
     <div className="input-group mb-3">
       <div className="input-group-prepend">
         <span className="btn btn-outline-info">Description*</span>
       </div>
       <input type="text" className="form-control" name="description" />
     </div>
     <div className="input-group mb-3">
       <div className="input-group-prepend">
         <span className="btn btn-outline-info">E-Mail*</span>
       </div>
       <input type="email" className="form-control" name="email" />
     </div>
     <div className="text-center">
       <input className="btn btn-info" type="submit" />
     </div>
   </form>
   ```

2. Bind the form inputs to state.
   Things to explain:

   - State keys have to match backend
   - What is `event`? How does it work?

   ```javascript
   const ControlledForm = () => {
     const [person, setPerson] = useState({
           alias: "",
           description: "",
           email: ""
       });


       const handleChange = event => setPerson({...person, [event.target.name]: event.target.value });

       ...

       <input
         type="text"
         className="form-control"
         name="description"
         onChange={handleChange}
       />

   ```

#### Submission

1. Show what happens now when we submit (page refreshes, data gets add as query in address bar).

2. Add an `onSubmit` and prevent default

   ```jsx
   ...
   const handleSubmit = event => {
     event.preventDefault();
     alert("SUBMIT")
   }
   ...
     <form onSubmit={handleSubmit}>
   ...
   ```

3. We need to DO something when we submit. In `actions/people.js` create the form action to be dispatched

   ```javascript
   import { ADD_PERSON } from "./actionTypes";
   import axios from "axios";

   export const submitPerson = (person) => async (dispatch) => {
     try {
       const res = await axios.post("http://127.0.0.1:8000/alias/", person);
       dispatch({
         type: ADD_PERSON,
         payload: "LOL",
       });
     } catch (error) {
       console.error("Person did not submit!");
       console.error(error);
     }
   };
   ```

4. Connect it to the submit handler.

```javascript
import { connect } from "react-redux";
import { submitPerson } from "./redux/actions";
...
    handleSubmit = (e) => {
      e.preventDefault();
      props.submitPerson(person);
    }
...
const mapDispatchToProps = dispatch => {
  return {
    submitPerson: person => dispatch(submitPerson(person))
  };
};

...
```

5. Show and tell:

   - Show `ADD_PERSON` action in redux tools
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
           type: ADD_PERSON,
         });
       } catch (error) {
   ...
   ```

   to

   ```javascript
   ...
   export const submitPerson = person => {
     return async dispatch => {
       try {
         const res = await axios.post("http://127.0.0.1:8000/alias/", person);
         const newPerson = res.data;
         dispatch({
           type: ADD_PERSON,
           payload: newPerson
         });
       } catch (error) {
   ...
   ```

2. Handle the payload in the `reducers/people.js`:
   Explain why we use the spread instead of `concat`.

   ```javascript
   ...
       case ADD_PERSON:
         return {
           ...state,
           people: [action.payload, ...state.people]
         };
   ...
   ```

#### Clear the form on successful post

1. Two-way bind forms inputs to state:
   In Dev Tools, show how changing the STATE now changes the form.

   ```javascript
   ...
   <input
     type="text"
     className="form-control"
     name="description"
     value={person.description} // This part
     onChange={handleChange}
   />
   ...
   ```

2. Write a `resetForm` method:

   ```javascript
   ...
     const resetForm = () => setPerson({ alias: "", description: "", email: "" });
   ...
   ```

3. Pass it to the ACTION to reset on success:

   `ControlledForm.js`

   ```js
   ...
   const handleSubmit = e => {
       e.preventDefault();
       props.submitPerson(person, resetForm);
     };
   ...
   const mapDispatchToProps = dispatch => {
     return {
       submitPerson: (person, reset) => dispatch(submitPerson(person, reset))
     };
   };
   ...
   ```

   `actions/people.js`

   ```js
   export const submitPerson = (person, reset) => {
     return async dispatch => {
       try {
         const res = await axios.post("http://127.0.0.1:8000/alias/", person);
         const newPerson = res.data;
         dispatch({
           type: ADD_PERSON,
           payload: newPerson
         });
         reset();
       }
       ...
     }
   }
   ```

#### Handling Errors

1. Show `errors.response.data` in `reducers/people.js`:

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

   ```js
   export const FETCH_PEOPLE = "FETCH_PEOPLE";
   export const ADD_PERSON = "ADD_PERSON";
   export const SET_ERRORS = "SET_ERRORS";
   ```

   `reducers/errors.js`

   ```js
   import { SET_ERRORS } from "../actions/actionTypes";

   const initialState = {};

   export default (state = initialState, action) => {
     switch (action.type) {
       case SET_ERRORS:
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
     peopleState: peopleReducer,
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
           type: SET_ERRORS,
           payload: error.response.data
         });
       }
   ...
   ```

5. Bring errors into `ControlledForm.js`:

   ```js
   ...
     const errors = props.errors;
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
           type: ADD_PERSON,
           payload: person
         });
         dispatch({
           type: SET_ERRORS,
           payload: {}
         });
         reset();
       }
   ...
   ```
