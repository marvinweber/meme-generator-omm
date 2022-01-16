import { useParams } from "react-router-dom";

export default function SingleMeme() {
  return (
    <div>
      You'll see single memes here (requested id: {useParams().memeId})
    </div>
  );
}
