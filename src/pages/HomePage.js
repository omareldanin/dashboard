import Layout from "../components/Layout/Layout";
import { Route, Routes } from "react-router-dom";
import ChatPage from "./ChatPage";
import Home from "./Home";
import Companies from "./Companies";
const HomePage = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat/*" element={<ChatPage />} />
        <Route path="/companies/*" element={<Companies />} />
      </Routes>
    </Layout>
  );
};
export default HomePage;
