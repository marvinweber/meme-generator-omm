import { useAppSelector } from "../hooks";
import MemeEditorPage from "../components/memes/EditorPage";

export default function MemeEditor() {
  const user = useAppSelector((state) => state.user);

  return (
    <>
      {user.loggedIn ? (
        <MemeEditorPage />
      ) : (
        <div>Please login to use the Meme Editor!</div>
      )}
    </>
  );
}
