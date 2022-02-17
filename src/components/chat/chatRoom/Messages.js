import "./Messages.scss";
import MessageItem from "./MessageItem";
import firebase from "firebase/compat/app";
import { useEffect, useState, useRef } from "react";
import "firebase/compat/firestore";
import "firebase/analytics";
const Messages = (props) => {
  const dummy = useRef();
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const firestore = firebase.firestore();
    const messagesRef = firestore
      .collection(`chatUsers/${props.id}/messages`)
      .orderBy("date")
      .limit(100)
      .onSnapshot((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(data);
        dummy.current.scrollIntoView({ behavior: "smooth" });
      });
    return messagesRef;
  }, [props.id]);
  return (
    <div className="messages">
      {messages &&
        messages.map((msg) => (
          <MessageItem message={msg.text} className={msg.sender} key={msg.id} />
        ))}
      <span ref={dummy}></span>
    </div>
  );
};
export default Messages;
