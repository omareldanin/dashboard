import "./signin.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { useRef, Fragment } from "react";
import { Form, Button } from "react-bootstrap";
import useHttp from "../../hooks/useHttp";
import LoadingSpinner from "../UI/LoadingSpiner";
import { useDispatch } from "react-redux";
import { authSliceActions } from "../../store/authSlice";
const Signin = () => {
  const navgate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, error, sendRequest: login } = useHttp();
  const { sendRequest: getUserData } = useHttp();
  const email = useRef();
  const password = useRef();
  var user;
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = email.current.value;
    const enteredPassword = password.current.value;

    const ResposeDate = (data) => {
      getUserData(
        {
          url: "https://react-app-54403-default-rtdb.firebaseio.com/users.json",
        },
        (res) => {
          for (const userid in res) {
            if (res[userid].id === data.localId) {
              user = {
                id: res[userid].id,
                token: data.idToken,
                fname: res[userid].firstName,
                lname: res[userid].lastName,
                isAdmin: res[userid].admin,
                image: res[userid].imageUrl,
              };
            }
          }
          dispatch(authSliceActions.addUserData({ ...user }));
          dispatch(authSliceActions.login());
          navgate("/");
        }
      );
    };
    login(
      {
        url: "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDHjHRTMOXchI0aM3qnsbQN5M_NnZ38VPk",
        method: "POST",
        body: {
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        },
        headers: {
          "Content-Type": "application/json",
        },
      },
      ResposeDate
    );
  };

  return (
    <Fragment>
      {isLoading && <LoadingSpinner />}
      <Form className="form" onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter email" ref={email} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" ref={password} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Remember Me" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Sign in
        </Button>
        {error ? <p>{error}</p> : ""}
      </Form>
    </Fragment>
  );
};

export default Signin;
