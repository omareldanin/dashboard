import "./ChatContact.scss";
import { NavLink } from "react-router-dom";
const ChatContact = (props) => {
  return (
    <NavLink to={`/chat/${props.id}`} className="chatContact">
      <div className="contactImage">
        <img src={props.image} alt="contact-image" />
      </div>
      <div className="contactInfo">
        <p className="name">{props.name}</p>
        <p className="lastMessage">last message</p>
      </div>
    </NavLink>
  );
};
export default ChatContact;
