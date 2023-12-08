import {useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import viteLogo from "/blog.svg";
import { logoutUser} from "../../redux/slices/authSlice";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const nav = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    setIsMobileMenuOpen(false);
    nav("/");
  };

  return (
    <header className="bg-gray-800 p-4">
      <nav className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <img src={viteLogo} alt="logo" className="w-12" />
          <Link to="/" className="text-2xl text-white ml-2">
            Blog
          </Link>
        </div>
        <div className="hidden md:flex">
          {user ? (
            <ul className="flex space-x-4 items-center">
              {user.isAdmin ? (
                <>
                  <li>
                    <Link
                      to="/admin/dashboard"
                      className="text-white hover:text-gray-300 flex items-center"
                    >
                      <span className="material-symbols-outlined me-2">
                        admin_panel_settings
                      </span>
                      Admin Dashboard
                    </Link>
                  </li>
                  <li className="flex items-center space-x-3">
                    {user.profilePhoto && (
                      <img
                        src={user.profilePhoto.url}
                        alt="ss"
                        className="w-8 h-8 rounded-full"
                      />
                    )}
                    <Link
                      to={`/profile/${user._id}`}
                      className="text-white hover:text-gray-300"
                    >
                      {user?.user}
                    </Link>
                  </li>
                </>
              ) : (
                <li className="flex items-center space-x-3">
                  {user.profilePhoto && (
                    <img
                      src={user.profilePhoto.url}
                      alt="ss"
                      className="w-8 h-8 rounded-full"
                    />
                  )}
                  <Link
                    to={`/profile/${user._id}`}
                    className="text-white hover:text-gray-300"
                  >
                    {user.user}
                  </Link>
                </li>
              )}
              <li className="flex items-center">
                <button
                  className="text-white hover:text-gray-300"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </ul>
          ) : (
            <ul className="flex space-x-4">
              <li>
                <Link
                  to="/post"
                  className="text-white hover:text-gray-300 flex items-center"
                >
                  <span className="material-symbols-outlined me-2">
                    article
                  </span>
                  Posts
                </Link>
              </li>
              <li>
                <Link
                  to="/auth/register"
                  className="text-white hover:text-gray-300 flex items-center"
                >
                  <span className="material-symbols-outlined me-2">
                    person_add
                  </span>
                  Register
                </Link>
              </li>
              <li>
                <Link
                  to="/auth/login"
                  className="text-white hover:text-gray-300 flex items-center"
                >
                  <span className="material-symbols-outlined me-2">login</span>
                  Login
                </Link>
              </li>
            </ul>
          )}
        </div>
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="focus:outline-none text-white"
          >
            <span className="material-symbols-outlined text-2xl">
              {isMobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </nav>
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <ul className="flex flex-col space-y-4 mt-2 my-3">
            {user ? (
              <>
                <li>
                  {user.profilePhoto && (
                    <img
                      src={user.profilePhoto.url}
                      alt="ss"
                      className="w-8 h-8 rounded-full"
                    />
                  )}
                  <Link
                    to={
                      user.isAdmin ? "/admin/dashboard" : `/profile/${user._id}`
                    }
                    className="text-white hover:text-gray-300 flex items-center"
                    onClick={toggleMobileMenu}
                  >
                    {user.user}
                  </Link>
                </li>
                <li>
                  <button
                    className="text-white hover:text-gray-300"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <div>
                <li>
                  <Link
                    to="/post"
                    className="text-white hover:text-gray-300 flex items-center"
                    onClick={toggleMobileMenu}
                  >
                    <span className="material-symbols-outlined me-2">
                      article
                    </span>
                    Posts
                  </Link>
                </li>
                <li>
                  <Link
                    to="/auth/register"
                    className="text-white hover:text-gray-300 flex items-center"
                    onClick={toggleMobileMenu}
                  >
                    <span className="material-symbols-outlined me-2">
                      person_add
                    </span>
                    Register
                  </Link>
                </li>
                <li>
                  <Link
                    to="/auth/login"
                    className="text-white hover:text-gray-300 flex items-center"
                    onClick={toggleMobileMenu}
                  >
                    <span className="material-symbols-outlined me-2">
                      login
                    </span>
                    Login
                  </Link>
                </li>
              </div>
            )}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
