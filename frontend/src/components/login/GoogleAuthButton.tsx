import React from "react";
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLogout,
} from "react-google-login";
import { apiClient } from "../..";

const CLIENT_ID: string = process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID || '';

type GoogleAuthButtonState = {
  isLoggedIn: boolean;
  userInfo: {
    name: string;
    email: string;
  };
};

class GoogleAuthButton extends React.Component<
  {},
  GoogleAuthButtonState
> {
  state: GoogleAuthButtonState = {
    isLoggedIn: false,
    userInfo: {
      name: "",
      email: "",
    },
  };

  /**
   * Success handler for sucessful google oauth login.
   * Will set login state and makes initial login request to backend.
   * 
   * @param response 
   */
  responseGoogleSuccess = (response: GoogleLoginResponse) => {
    console.log(response);
    let userInfo = {
      name: response.profileObj.name,
      email: response.profileObj.email,
    };
    this.setState({ userInfo, isLoggedIn: true });

    // set axios default values and make login request to backend
    const idToken = response.tokenObj.id_token;
    apiClient.defaults.headers.common["Authentication-Type"] = "google_oauth";
    apiClient.defaults.headers.common["Authentication-Token"] = idToken;
    apiClient.get('/auth/oauth/login');
  };

  /** Error handler for Google OAuth Login. */
  responseGoogleError = (error: any) => {
    console.error(error);
  };

  /** Google OAuth Logout */
  logout = () => {
    let userInfo = {
      name: "",
      email: "",
    };
    this.setState({ userInfo, isLoggedIn: false });

    apiClient.defaults.headers.common["AUTHENTICATION-TYPE"] = false;
    apiClient.defaults.headers.common["AUTHENTICATION-TOKEN"] = false;
  };

  render() {
    return (
      <div className="row mt-5">
        <div className="col-md-12">
          {this.state.isLoggedIn ? (
            <div>
              <h1>Welcome, {this.state.userInfo.name}</h1>

              <GoogleLogout
                clientId={CLIENT_ID}
                buttonText={"Logout"}
                onLogoutSuccess={this.logout}
              ></GoogleLogout>
            </div>
          ) : (
            <GoogleLogin
              clientId={CLIENT_ID}
              buttonText="Sign In with Google"
              //@ts-ignore
              onSuccess={this.responseGoogleSuccess}
              onFailure={this.responseGoogleError}
              isSignedIn={true}
              cookiePolicy={"single_host_origin"}
            />
          )}
        </div>
      </div>
    );
  }
}
export default GoogleAuthButton;
