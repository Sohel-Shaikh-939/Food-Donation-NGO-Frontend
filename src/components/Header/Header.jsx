import { useState } from "react";
import { User, LogIn, LogOut, X, Menu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../Logo";
import { useDispatch, useSelector } from "react-redux";
import store from "../../store/store";
import { homeSliceAction } from "../../routes/Home/homeSlice";


const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const { authenticated } = useSelector((store) => store.Home);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("token");
    dispatch(homeSliceAction.setRepaint());
    dispatch(homeSliceAction.setAuthenticated(false));
    setIsLoggedIn(!isLoggedIn);
    navigate("/");
  };

  const handleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const close = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="flex items-center justify-between py-4 px-6 md:px-12 lg:px-20 border-b border-gray-100 sticky top-0 bg-white shadow-sm z-50 ">
      <div className="relative flex items-center space-x-2">
        <Logo className={"h-6 w-6 scale-150"} />
        <span className="text-xl font-bold text-gray-800">Food4All</span>
      </div>

      <div className="hidden md:flex items-center space-x-8 text-gray-600 font-medium">
        <Link to="/" className="hover:text-green-600 transition duration-150">
          Home
        </Link>
        <Link
          to="/donate"
          className="hover:text-green-600 transition duration-150"
        >
          Donate
        </Link>
        <Link
          to="/claim"
          className="hover:text-green-600 transition duration-150"
        >
          Claim
        </Link>
        <Link
          to="/pendingclaim"
          className="hover:text-green-600 transition duration-150"
        >
          My Claims
        </Link>
        <Link
          to="/donationlist"
          className="hover:text-green-600 transition duration-150"
        >
          My Donations
        </Link>
        <Link
          to="/about"
          className="hover:text-green-600 transition duration-150"
        >
          About
        </Link>
        <Link
          to="/contact"
          className="hover:text-green-600 transition duration-150"
        >
          Contact
        </Link>
      </div>

      {authenticated ? (
        <div className="flex items-center space-x-3">
          <Link to="/profile">
            <div
              className="rounded-full bg-green-100 p-2 border-2 border-green-600 cursor-pointer transition duration-200 hover:bg-green-200"
              title="View Profile"
            >
              <User className="h-5 w-5 text-green-700" />
            </div>
          </Link>

          <button
            onClick={handleLogOut}
            className="flex items-center bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-full shadow-md transition duration-300 text-sm"
          >
            <LogOut className="size-4 mr-1" />
            Logout
          </button>
        </div>
      ) : (
        <Link
          to="/login"
          className="flex items-center bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-full shadow-md transition duration-300 "
        >
          <LogIn className="size-5 mr-1 " />
          Login
        </Link>
      )}


      <button className="md:hidden ">
        {isMenuOpen ? (
          <X onClick={handleMenu}></X>
        ) : (
          <Menu onClick={handleMenu}></Menu>
        )}
      </button>

      <div
        className={`${!isMenuOpen && "hidden"} absolute transition-all duration-700 bg-white w-full left-0 right-0 ${
          isMenuOpen ? "top-[100%]" : "-top-[100%] -z-50 opacity-0"
        }  flex flex-col gap-1 py-4 text-gray-600 font-medium md:hidden text-center`}
      >
        <Link
          to="/"
          className="hover:text-green-600 transition duration-150 "
          onClick={close}
        >
          Home
        </Link>
        <Link
          to="/donate"
          className="hover:text-green-600 transition duration-150"
          onClick={close}
        >
          Donate
        </Link>
        <Link
          to="/claim"
          className="hover:text-green-600 transition duration-150"
          onClick={close}
        >
          Claim
        </Link>
        <Link
          to="/about"
          className="hover:text-green-600 transition duration-150"
          onClick={close}
        >
          About
        </Link>
        <Link
          to="/contact"
          className="hover:text-green-600 transition duration-150"
          onClick={close}
        >
          Contact
        </Link>
      </div>
    </nav>
  );
};

export default Header;
