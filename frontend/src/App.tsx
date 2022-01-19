import { NavLink, Outlet } from "react-router-dom";
import GoogleAuthButton from "./components/login/GoogleAuthButton";
import { useAppSelector } from "./hooks";

function App() {
  const loggedIn = useAppSelector((state) => state.user.loggedIn);

  return (
    <div className="App w-full md:w-10/12 lg:w-8/12 m-auto p-1" id="main">
      <div className="flex justify-between items-center flex-col sm:flex-row">
        <h1 className="text-3xl">Meme Generator</h1>
        <div className="flex justify-between items-center text-center h-12">
          <NavLink
            className={({ isActive }) =>
              isActive ? "underline" : "hover:underline"
            }
            to="/"
          >
            Meme Overview
          </NavLink>
          {loggedIn ? (
            <>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "underline ml-4" : "hover:underline ml-4"
                }
                to="/meme-editor"
              >
                Meme Editor
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "underline ml-4" : "hover:underline ml-4"
                }
                to="/profile"
              >
                Profile
              </NavLink>
            </>
          ) : (
            <div className="ml-4">
              <GoogleAuthButton text="Sign In" />
            </div>
          )}
        </div>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
