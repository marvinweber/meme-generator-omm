import { useEffect, useState } from "react";
import { apiClient } from "../..";
import { apiMemeToMemeModel, MemeModel } from "../../lib/memeModel";
import Meme from "./meme/Meme";

const MemeOverview = () => {
  const [memes, setMemes] = useState<MemeModel[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    apiClient.get("/memes").then((res) => {
      console.log(res);
      if (res.data.success) {
        const feMemeModels = res.data.memes.map((m: any) =>
          apiMemeToMemeModel(m)
        );
        setMemes(feMemeModels);
        console.log(feMemeModels);
      }
    });
  }, [page]);

  return (
    <div>
      <div className="flex flex-row">
        <div className="basis-2/3">
          {memes.map((m) => (
            <>
              <Meme meme={m} key={m.id} />
              <hr className="my-8" />
            </>
          ))}
        </div>
        <div className="basis-1/3 my-8">
          <header className="grid place-content-center mb-8 py-6 bg-slate-400">
            <p>Filter</p>
          </header>

          <header className="grid place-content-center mb-8 py-6 bg-slate-400">
            <p>Sort</p>
          </header>

          <header className="grid place-content-center mb-8 py-6 bg-slate-400">
            <p>Search</p>
          </header>
        </div>
      </div>
    </div>
  );
};

export default MemeOverview;
