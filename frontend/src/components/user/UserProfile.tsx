import { useAppSelector } from "../../hooks";
import GoogleAuthButton from "../login/GoogleAuthButton";

export default function UserProfile() {
  const user = useAppSelector((state) => state.user.user);

  return (
    <div className="flex justify-between">
      <div>
        <h2 className="text-xl">Hello {user.name}</h2>
        <p>{user.email}</p>
        {/* Logout Button */}
        <GoogleAuthButton />
      </div>
      <img
        className="w-24 h-24 rounded-xl"
        src={user.imageUrl}
        alt="User Profile"
      />
    </div>
  );
}
