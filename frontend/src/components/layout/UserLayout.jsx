import { Link } from "react-router-dom";
import Header from "./Header";
import { useAuth } from "../../context/AuthContext";

function UserLayout({ children }) {
  const { user } = useAuth();

  return (
    <>
      <div className="">
        <Header navigate={"/account"} user={user?.username} />
        <main>{children}</main>
      </div>
    </>
  );
}

export default UserLayout;
