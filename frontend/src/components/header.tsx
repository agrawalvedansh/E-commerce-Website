import {
  FaSearch,
  FaShoppingBag,
  FaSignInAlt,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { User } from "../types/types";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import toast from "react-hot-toast";



interface PropsType{
  user: User | null,
}

const Header = ({user}:PropsType) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const logoutHandler = async ()=> {
    try {
      await signOut(auth);
      toast.success("Sign Out Successful!");
      setIsOpen(false);
      navigate("/");
    } catch (error) {
      toast.error("Sign Out Failed!")
    }
  }
  return (
    <nav className="header">
      <Link to={"/"} onClick={() => setIsOpen(false)}>Home</Link>
      <Link to={"/search"} onClick={() => setIsOpen(false)}>
        <FaSearch />
      </Link>
      <Link to={"/cart"} onClick={() => setIsOpen(false)}>
        <FaShoppingBag />
      </Link>

      {user?._id ?
        (<>
            <button onClick={() => setIsOpen((prev) => !prev)}>
              <FaUser />
            </button>
            <dialog open={isOpen}>
              <div>
                {user.role === "admin" && (<Link to={"/admin/dashboard"}>Admin</Link>)}
                <Link to={"/orders"}>Orders</Link>
                <button  onClick={logoutHandler}>
                  <FaSignOutAlt />
                </button>
              </div>
            </dialog>
        </>)
        :
        (<Link to={"/login"}> <FaSignInAlt /> </Link>)
      }
    </nav>

  )
}

export default Header