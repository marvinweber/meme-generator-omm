import { useAppSelector } from "../hooks";
import MemeEditorComponent from "../components/memes/Editor";

export default function MemeEditor() {
  const user = useAppSelector((state) => state.user);

  return (
    <>
      {user.loggedIn ? (
        <MemeEditorComponent />
      ) : (
        <div>Please login to use the Meme Editor!</div>
      )}
    </>
  );
}
