import { Outlet } from "react-router-dom";
import Header from "../sections/Header";
import NavMenu from "../sections/NavMenu";

export default function Layout() {
  return (
    <>
      <Header />
      <NavMenu />
      <Outlet />
    </>
  );
}
