import GoogleAuthButton from "../components/login/GoogleAuthButton";
import UserProfile from "../components/user/UserProfile";
import { useAppSelector } from "../hooks";

export default function Profile() {
  const loggedIn = useAppSelector((state) => state.user.loggedIn);

  return (
    <>
      {loggedIn ? (
        <div>
          <UserProfile />
        </div>
      ) : (
        <div>
          <GoogleAuthButton />
        </div>
      )}
    </>
  );
}
