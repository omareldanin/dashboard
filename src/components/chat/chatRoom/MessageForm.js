import "./MessageForm.scss";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/analytics";
import { useRef } from "react";
import useTranslate from "../../../hooks/useTranslate";

const MessageForm = (props) => {
  const message = useRef();
  const { t } = useTranslate();
  const firestore = firebase.firestore();
  const messagesRef = firestore.collection(`chatUsers/${props.id}/messages`);
  const sendMessageHandler = (e) => {
    e.preventDefault();
    const enterMessage = message.current.value;
    if (enterMessage.trim() !== "") {
      messagesRef.add({
        text: enterMessage,
        date: firebase.firestore.FieldValue.serverTimestamp(),
        sender: "admin",
      });
    }
    message.current.value = "";
  };
  return (
    <div className="chatform" onSubmit={sendMessageHandler}>
      <form>
        <input
          type="text"
          placeholder={t("chatPlaceHolder")}
          className="message"
          ref={message}
        />
        <button type="submit">
          {t("chatsButton")}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-send-fill"
            viewBox="0 0 16 16"
          >
            <path
              fill="evenodd"
              d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89.471-1.178-1.178.471L5.93 9.363l.338.215a.5.5 0 0 1 .154.154l.215.338 7.494-7.494Z"
            />
          </svg>
        </button>
      </form>
    </div>
  );
};
export default MessageForm;
