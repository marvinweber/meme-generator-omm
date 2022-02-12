import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../..";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { login } from "../../store/slices/userSlice";
import TabbedContainer from "../util/TabbedContainer";

const EmailPasswordLogin: React.FC<{}> = () => {
  const loggedIn = useAppSelector((state) => state.user.loggedIn);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  // State for form Values
  const [loginMail, setLoginMail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerMail, setRegisterMail] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerPassword2, setRegisterPassword2] = useState("");

  const [msg, setMsg] = useState<{ type: string; msg: string }>();

  // hook to redirect to start page if user is already logged in
  useEffect(() => {
    if (loggedIn) {
      navigate("/");
    }
  }, [loggedIn]);

  /** Send register request to backend. */
  const onRegister = async () => {
    try {
      const response = await apiClient.post("/auth/register", {
        name: registerName,
        email: registerMail,
        password: registerPassword,
      });
      if (response.data.success) {
        setMsg({ type: "success", msg: "Registration done, please log in!" });
      }
    } catch {
      setMsg({ type: "error", msg: "Registration was not successfull!" });
    }
  };

  /** Authenticate with the Backend an dispatch user store, if successful. */
  const onLogin = async () => {
    try {
      const response = await apiClient.post("/auth/login", {
        email: loginMail,
        password: loginPassword,
      });
      if (response.data.success) {
        dispatch(
          login({
            _id: response.data.user._id,
            loginType: "OMM_EMAIL_PASSWORD",
            email: response.data.user.email,
            name: response.data.user.name,
            imageUrl: response.data.user.profilePicUrl,
            token: response.data.jwt,
          })
        );
      }
    } catch {
      setMsg({ type: "error", msg: "Login was not successful!" });
    }
  };

  return loggedIn ? (
    <div>You are already logged in!</div>
  ) : (
    <div className="flex justify-around">
      <div className="w-full md:w-1/2">
        {/* LOGIN / REGISTER TABS */}
        <TabbedContainer
          titles={["Login", "Register"]}
          contents={[
            // LOGIN
            <div className="flex flex-col">
              <span className="text-sm">E-Mail</span>
              <input
                type="text"
                placeholder="E-Mail"
                className="p-2 border rounded-lg"
                value={loginMail}
                onChange={(e) => setLoginMail(e.target.value)}
              />

              <span className="text-sm mt-3">Password</span>
              <input
                type="password"
                placeholder="Password"
                className="p-2 border rounded-lg"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />

              <button
                className="mt-5 p-2 border rounded-lg cursor-pointer
                           border-green-900 text-green-900
                           hover:bg-green-800 hover:text-white
                           disabled:hover:bg-white disabled:hover:text-green-900 disabled:cursor-not-allowed"
                disabled={!loginMail || !loginPassword}
                onClick={onLogin}
              >
                Login
              </button>
            </div>,

            // REGISTER
            <div className="flex flex-col">
              <span className="text-sm">Name</span>
              <input
                type="text"
                placeholder="Name"
                className="p-2 border rounded-lg"
                value={registerName}
                onChange={(e) => setRegisterName(e.target.value)}
              />

              <span className="text-sm mt-3">E-Mail</span>
              <input
                type="text"
                placeholder="E-Mail"
                className="p-2 border rounded-lg"
                value={registerMail}
                onChange={(e) => setRegisterMail(e.target.value)}
              />

              <span className="text-sm mt-3">Password</span>
              <input
                type="password"
                placeholder="Password"
                className="p-2 border rounded-lg"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
              />

              <span className="text-sm mt-3">Repeat Password</span>
              <input
                type="password"
                placeholder="Repeat Password"
                className="p-2 border rounded-lg"
                value={registerPassword2}
                onChange={(e) => setRegisterPassword2(e.target.value)}
              />

              <button
                className="mt-5 p-2 border rounded-lg cursor-pointer
                           border-green-900 text-green-900
                           hover:bg-green-800 hover:text-white
                           disabled:hover:bg-white disabled:hover:text-green-900 disabled:cursor-not-allowed"
                disabled={
                  !registerMail ||
                  !registerPassword ||
                  !registerName ||
                  registerPassword !== registerPassword2
                }
                onClick={onRegister}
              >
                Register
              </button>
            </div>,
          ]}
        />

        {/* ERROR / SUCCESS MESSAGE */}
        {msg ? (
          <div
            className={`border-2 rounded-md p-2 mt-5 text-center text-white ${
              msg.type === "error"
                ? "border-red-900 bg-red-700"
                : "border-green-900 bg-green-800"
            }`}
          >
            {msg?.msg}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default EmailPasswordLogin;
