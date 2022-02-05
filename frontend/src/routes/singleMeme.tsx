import { useParams } from "react-router-dom";
import MemeSingleView from "../components/memes/MemeSingleView";

type SingleMemeParams = {
  memeId: string;
};

export default function SingleMeme() {
  const { memeId } = useParams<SingleMemeParams>();
  return memeId ? <MemeSingleView memeId={memeId} /> : <p>Error</p>;
}
