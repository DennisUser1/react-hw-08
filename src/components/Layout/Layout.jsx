import { Outlet } from "react-router-dom";
import AppBar from "../AppBar/AppBar";

const Layout = () => {
  return (
    <div>
      <AppBar />
      <main className="main">
          <Outlet />
      </main>
    </div>
  );
};

export default Layout;
