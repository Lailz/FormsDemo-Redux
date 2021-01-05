# RJSDemo8 - Forms

[Slides](https://docs.google.com/presentation/d/1VNDFN2oIkKLUpKRZ7hkiRjyJTv3d7-Lp6eZJPZn2P5E/edit?usp=sharing)

1. Explain the code

### Create Form

To create our form we need 3 fields, `alias`, `email` and `description`.

1. So let's set our `form` tags and inside it add our `input` tags

   ```jsx
   <form>
     <input />
     <input />
     <input />
   </form>
   ```

2. Now to make styling easier, I will use Bootstrap. I've prepared the following form:

   ```jsx
   <form>
     <div className="input-group mb-3">
       <div className="input-group-prepend">
         <span className="btn btn-outline-info ">Alias*</span>
       </div>
       <input className="form-control" />
     </div>
     <div className="input-group mb-3">
       <div className="input-group-prepend">
         <span className="btn btn-outline-info">Description*</span>
       </div>
       <input className="form-control" />
     </div>
     <div className="input-group mb-3">
       <div className="input-group-prepend">
         <span className="btn btn-outline-info">E-Mail*</span>
       </div>
       <input className="form-control" />
     </div>
   </form>
   ```

3. Now we need to set the type of each input field to prevent the user from writing strings in the price field for example. To do that, we will use the attribute `type`. `name` and `description` are supposed to be of type `text` and `email` is of type `email`.

   ```jsx
   <form>
     <div className="input-group mb-3">
       <div className="input-group-prepend">
         <span className="btn btn-outline-info ">Alias*</span>
       </div>
       <input type="text" className="form-control" />
     </div>
     <div className="input-group mb-3">
       <div className="input-group-prepend">
         <span className="btn btn-outline-info">Description*</span>
       </div>
       <input type="text" className="form-control" />
     </div>
     <div className="input-group mb-3">
       <div className="input-group-prepend">
         <span className="btn btn-outline-info">E-Mail*</span>
       </div>
       <input type="email" className="form-control" />
     </div>
     <div className="text-center">
       <input className="btn btn-info" type="submit" />
     </div>
   </form>
   ```

4. Our form is ready!

5. So now we need to capture the user's input and save it. So we will create an object state that has a property for every field.

   ```javascript
   const [person, setPerson] = useState({
     alias: "",
     description: "",
     email: "",
   });
   ```

6. Create a function that will handle the change in the `alias` input field. Basically we will de-structure our `person` object and overwrite the `alias` field:

   ```javascript
   const handleChange = (event) => {
     setPerson({ ...person, alias: event.target.value });
   };
   ```

7. Pass the function to the `alias`'s input field:

   ```jsx
   <input type="text" className="form-control" onChange={handleChange} />
   ```

8. But are we gonna do this for all our input fields? There is an easier way, first we will give a `name` attribute to every `input` tag. Take care that the name must be the same as the key in the `person` state:

   ```jsx
   <input
     type="text"
     className="form-control"
     name="alias"
     onChange={handleChange}
   />
   ```

9. In `handleChange`, instead of adding an if-condition that checks the name of the input field, we will make our key dynamic:

   ```javascript
   const handleChange = (event) => {
     setPerson({ ...person, [event.target.name]: event.target.value });
   };
   ```

10. So now whenever the user types in anything in any field, it's being saved into our component's state.

11. Let's add a `Create` button. Place it at the end of the form, it MUST be inside the `form` tag.

    ```jsx
      <div className="text-center">
        <input className="btn btn-info" type="submit" />
      </div>
    </form>
    ```

12. Now let's create our function that will pass this object to `cookies`. For now let's just console.log it:

    ```javascript
    const handleSubmit = () => {
      console.log(cookie);
    };
    ```

13. We will use a new event called `onSubmit`. `onSubmit` can be triggered when we click on our button, or when we even just press on the enter key!

14. The `onSubmit` method is added to the `form` tag.

    ```jsx
    <form onSubmit={handleSubmit}>
    ```

15. Let's try submitting it. Oops, the page is being refreshed. That's because `onSubmit`'s default behavior is refreshing the page. We can easily prevent that by using the `preventDefault` method:

    ```javascript
    const handleSubmit = (event) => {
      event.preventDefault();
      console.log(cookie);
    };
    ```

16. Let's try again. Yaay it's working!

#### Submission

Now to create a new person, we need a method that will add this person to our `people` state in our store.

1. In `actions.js`, let's create our action. I've already prepared the action type.

   ```javascript
   // ACTION TYPES
   const ADD_PERSON = "ADD_PERSON";
   ```

2. Then let's create our action. To create a new person, we will pass the new person's information to the reducer. Let's add a console log to make sure our connection so far is correct.

   ```javascript
   export const addPerson = (newPerson) => {
     console.log(
       "🚀 ~ file: actions.js ~ line 6 ~ addPerson ~ newPerson",
       newPerson
     );
   };
   ```

3. Let's dispatch our action in the `ControlledForm` component. Start by importing `useDispatch` and `addPerson` action. We've already prepared the `dispatch` function.

   ```javascript
   import { useDispatch } from "react-redux";

   // Redux Actions
   import { addPerson } from "../store/actions";
   ```

4. In `handleSubmit`, call `dispatch` and pass it `addPerson`.

   ```javascript
   const handleSubmit = (event) => {
     event.preventDefault();
     dispatch(addPerson(person));
   };
   ```

   Let's try creating a person. Yes! Our person is appearing in the console, so our connection is correct! Let's move on to our reducer.

5. In your `reducer` file, we've already created a case for `ADD_PERSON`.

   ```javascript
    case "ADD_PERSON":
      return {
        ...state,
      };
   ```

6. Since `people` is a state we can't use `push` to add the new cookie to it, that's why we will spread our `state.people` into a new array and add to it the new cookie that was passed from the action.

   ```javascript
   switch (action.type) {
    case "CREATE_COOKIE":
      return {
        ...state,
        people: [...state.people, action.payload.newPerson],
      };
   ```

   Let's try it out. Yes! It's working.

7. But now, we want our modal to close automatically after creating a cookie. We can easily call `closeModal` in `handleSubmit`

   ```javascript
   const handleSubmit = (event) => {
     event.preventDefault();
     dispatch(createCookie(cookie));
     closeModal();
   };
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

3. Call it after the dispatch in `handleSubmit` in `ControlledForm.js`

   ```js
   const handleSubmit = (event) => {
     event.preventDefault();
     dispatch(createCookie(cookie));
     resetForm();
   };
   ```

## STOP HERE

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
