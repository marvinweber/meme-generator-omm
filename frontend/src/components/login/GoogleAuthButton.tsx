import React from "react";
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLogout,
} from "react-google-login";
import { apiClient } from "../..";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { login, logout } from "../../store/slices/userSlice";

const CLIENT_ID: string = process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID || "";

const GoogleAuthButton: React.FC<{ text?: string }> = ({ text }) => {
  const loggedIn = useAppSelector((state) => state.user.loggedIn);
  const dispatch = useAppDispatch();

  /**
   * Success handler for sucessful google oauth login.
   * Will set login state and makes initial login request to backend.
   *
   * @param response
   */
  const responseGoogleSuccess = async (response: GoogleLoginResponse) => {
    const idToken = response.tokenObj.id_token;

    // verify successfull authentication on the backend
    const loginResult = await apiClient.get("/auth/me", {
      headers: { Authorization: `Bearer ${idToken}` },
    });
    if (loginResult.data.success) {
      dispatch(
        login({
          _id: loginResult.data.user._id,
          loginType: "GOOGLE_OAUTH",
          email: response.profileObj.email,
          name: response.profileObj.name,
          imageUrl: response.profileObj.imageUrl,
          token: idToken,
        })
      );
    }
  };

  /** Error handler for Google OAuth Login. */
  const responseGoogleError = (error: any) => {
    console.error(error);
  };

  /** Google OAuth Logout */
  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <>
      {loggedIn ? (
        <GoogleLogout
          clientId={CLIENT_ID}
          buttonText={"Logout"}
          onLogoutSuccess={logoutHandler}
        ></GoogleLogout>
      ) : (
        <GoogleLogin
          clientId={CLIENT_ID}
          buttonText={text}
          //@ts-ignore
          onSuccess={responseGoogleSuccess}
          onFailure={responseGoogleError}
          isSignedIn={true}
          cookiePolicy={"single_host_origin"}
        />
      )}
    </>
  );
};

GoogleAuthButton.defaultProps = {
  text: "Sign in with Google",
};

export default GoogleAuthButton;
