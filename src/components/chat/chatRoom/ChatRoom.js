import "./ChatRoom.scss";
import { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/analytics";
import { useParams } from "react-router-dom";
import Messages from "./Messages";
import MessageForm from "./MessageForm";
const ChatRoom = () => {
  const param = useParams();
  const [contact, setConatct] = useState([]);
  const firestore = firebase.firestore();
  useEffect(() => {
    const users = firestore
      .collection("chatUsers")
      .where("id", "==", param.id)
      .onSnapshot((snapshot) => {
        setConatct(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      });
  }, [param.id]);

  return (
    <div className="chatroom">
      <div className="contactInfo">
        <div className="image">
          <img src={contact[0] && contact[0].image} alt="userImage" />
        </div>
        <div className="name">
          <h6>{contact[0] && contact[0].fname}</h6>
        </div>
      </div>
      <Messages id={param.id} />
      <MessageForm id={param.id} />
    </div>
  );
};
export default ChatRoom;
