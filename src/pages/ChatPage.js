import Chat from "../components/chat/Chat";
import AvailableChats from "../components/chat/AvailableChats";
import ChatRoom from "../components/chat/chatRoom/ChatRoom";
import { Route, Routes } from "react-router-dom";
const ChatPage = () => {
  return (
    <Chat>
      <AvailableChats />
      <Routes>
        <Route path="/:id" element={<ChatRoom />} />
      </Routes>
    </Chat>
  );
};
export default ChatPage;
