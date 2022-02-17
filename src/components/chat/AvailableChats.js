import "./AvailableChats.scss";
import ChatContact from "./ChatContact";
import { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/analytics";
import useTranslate from "../../hooks/useTranslate";
const AvailableChats = () => {
  const [contacts, setConatcts] = useState([]);
  const { t } = useTranslate();
  firebase.initializeApp({
    apiKey: "AIzaSyBs4gJxpbB4DV2FRtHvwBYeRxRPkpuDeig",
    authDomain: "visitegypt-65e4b.firebaseapp.com",
    projectId: "visitegypt-65e4b",
    storageBucket: "visitegypt-65e4b.appspot.com",
    messagingSenderId: "879201673288",
    appId: "1:879201673288:web:3526ac4781d1946ce9f87d",
    measurementId: "G-781235VTGK",
  });
  useEffect(() => {
    const firestore = firebase.firestore();
    const users = firestore.collection("chatUsers").onSnapshot((snapshot) => {
      setConatcts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
  }, []);
  return (
    <div className="chats">
      <h5>{t("chatsHeader")}</h5>
      {contacts.map((user) => (
        <ChatContact
          id={user.id}
          key={user.id}
          name={user.fname + " " + user.lname}
          image={user.image}
        />
      ))}
    </div>
  );
};
export default AvailableChats;
