import { mdiContentCopy } from "@mdi/js";
import Icon from "@mdi/react";
import { useAppSelector } from "../../hooks";
import GoogleAuthButton from "../login/GoogleAuthButton";
import Expandable from "../util/Expandable";

export default function UserProfile() {
  const user = useAppSelector((state) => state.user.user);
  const apiDocsUrl = `${process.env.REACT_APP_API_URL}/api-docs`;

  const copyTokenToClipboard = () => {
    navigator.clipboard.writeText(user.token || "Token not found!").then(() => {
      alert("Token copied to clipboard!");
    });
  };

  return (
    <div className="flex flex-col">
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

      <hr className="my-5" />
      <Expandable
        heading="API"
        content={
          <div className="flex flex-col">
            <h4 className="text-xl">
              The API Docs are available here:{" "}
              <a
                className="text-yellow-800 hover:underline"
                href={apiDocsUrl}
                target="_blank"
              >
                {apiDocsUrl}
              </a>
            </h4>
            <p className="my-4">
              You can use your current valid JWT token (obtained via Google
              OAuth) for authentification with the API.
              <br />
              Note: you should not send this token to anyone, it is meant to be
              exclusivley used by you!
            </p>
            <textarea className="border-2 rounded-md p-2 h-36" readOnly>
              {user.token}
            </textarea>
            <button
              onClick={copyTokenToClipboard}
              className="border-2 rounded-md p-2 mt-2 hover:bg-green-900 hover:text-white"
            >
              <div className="flex justify-center">
                <Icon path={mdiContentCopy} size={1} className="mr-2" />
                Copy Token to Clipboard
              </div>
            </button>
          </div>
        }
      />
    </div>
  );
}
