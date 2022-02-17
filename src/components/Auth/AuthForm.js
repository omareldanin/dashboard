import "./authForm.scss";
import Signin from "./Singin";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col } from "react-bootstrap";
import loginImage from "../../Images/login.svg";
const AuthForm = () => {
  return (
    <Row className="login">
      <Col md="8" className="image">
        <img src={loginImage} alt="loginImage" />
      </Col>
      <Col md="4" className="sign-in">
        <div className="header">
          <h4>Welcome to Dashboard</h4>
          <p>please Sign in to your acount</p>
        </div>
        <Signin />
      </Col>
    </Row>
  );
};
export default AuthForm;
