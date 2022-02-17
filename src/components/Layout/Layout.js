import { Fragment } from "react/cjs/react.production.min";
import MainNavbar from "./MainNavBar";
import Sidebar from "./Sidebar";
import "./Layout.scss";
const Layout = (props) => {
  return (
    <Fragment>
      <MainNavbar />
      <Sidebar />
      <main>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
