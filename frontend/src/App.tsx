import { NavLink, Outlet } from "react-router-dom";

function App() {
  return (
    <div className="App w-full md:w-10/12 lg:w-8/12 m-auto" id="main">
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
          |
          <NavLink
            className={({ isActive }) =>
              isActive ? "underline" : "hover:underline"
            }
            to="/meme-editor"
          >
            Meme Editor
          </NavLink>
          |
          <NavLink
            className={({ isActive }) =>
              isActive ? "underline" : "hover:underline"
            }
            to="/profile"
          >
            Profile
          </NavLink>
        </div>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
