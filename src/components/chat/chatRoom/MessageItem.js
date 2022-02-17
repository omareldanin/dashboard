import "./MessageItem.scss";
const MessageItem = (props) => {
  return (
    <div className="msg">
      <p className={props.className}>{props.message}</p>
    </div>
  );
};
export default MessageItem;
