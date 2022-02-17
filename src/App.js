import React from "react"
import { Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import { useSelector, useDispatch } from "react-redux";
import { authSliceActions } from "./store/authSlice";
import { uiSliceActions } from "./store/uiSlice";
function App() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("userData"));
  const lang = localStorage.getItem("lang");
  if (user) {
    dispatch(authSliceActions.addUserData({ ...user }));
    dispatch(authSliceActions.login());
  }
  if (lang) {
    dispatch(uiSliceActions.setLang(lang));
  }
  const isLogged = useSelector((state) => state.auth.isLoggedin);
  const dir = useSelector((state) => state.ui.pageDir);
  return (
    <div dir={dir} className={dir}>
      <Routes>
        <Route
          path="/Auth"
          element={isLogged ? <HomePage /> : <AuthPage />}
        ></Route>
        <Route
          path="/*"
          element={isLogged ? <HomePage /> : <AuthPage />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
