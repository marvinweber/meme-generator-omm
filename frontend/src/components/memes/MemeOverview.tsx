import { useEffect, useState } from "react";
import { apiClient } from "../..";
import { apiMemeToMemeModel, MemeModel } from "../../lib/memeModel";
import Meme from "./meme/Meme";
import VisibilitySensor from "react-visibility-sensor";
import Icon from "@mdi/react";
import { mdiCloseOctagonOutline } from "@mdi/js";
import OverviewSortingAndFilters from "./overview/SortingAndFilters";
import SortingFilterModel, {
  getDefaultSortingFilterModel,
  sortingFilterModelToAxiosReqParams,
} from "../../lib/sortingFilterModel";

const MEMES_PER_PAGE = process.env.REACT_APP_OVERVIEW_PER_PAGE;

const MemeOverview = () => {
  const [memes, setMemes] = useState<MemeModel[]>([]);
  const [requestedPage, setRequestedPage] = useState(1);
  const [lastLoadedPage, setLastLoadedPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [endReached, setEndReached] = useState(false);

  const [sortingFilterModel, setSortingFilterModel] =
    useState<SortingFilterModel>(getDefaultSortingFilterModel());
  const [sortingFilterCtr, setSortingFilterCtr] = useState(0);

  useEffect(() => {
    // avoid multiple concurrent requests and further requests if the end
    // has been reached
    if (loading || endReached) {
      return;
    }
    // avoid loading the same page multiple times; also don't allow loading
    // older pages again
    if (requestedPage <= lastLoadedPage) {
      return;
    }

    const page = requestedPage;
    setLoading(true);
    const params = {
      perPage: MEMES_PER_PAGE,
      p: page,
      ...sortingFilterModelToAxiosReqParams(sortingFilterModel),
    };

    apiClient.get("/memes", { params }).then((res) => {
      if (res.data.success) {
        if (res.data.memes.length > 0) {
          const feMemeModels: MemeModel[] = res.data.memes.map((m: any) =>
            apiMemeToMemeModel(m)
          );
          const newMemes = [...memes];
          newMemes.push(...feMemeModels);
          setMemes(newMemes);
          setLastLoadedPage(page);
        } else {
          setEndReached(true);
        }
        // avoid visibility sensor triggered before memes are rendered
        setTimeout(() => setLoading(false), 100);
      }
    });
  }, [requestedPage, sortingFilterCtr]);

  useEffect(() => {
    // trigger reload by setting page and ensure page is loaded again
    setLastLoadedPage(0);
    setEndReached(false);
    setMemes([]);

    // if only one page has been loaded: use counter to trigger reloading memes
    if (requestedPage === 1) {
      setSortingFilterCtr(sortingFilterCtr + 1);
    } else {
      setRequestedPage(1);
    }
  }, [sortingFilterModel]);

  const onScrolledToEndChanged = (visible: boolean) => {
    // trigger loading next page if user scrolled to bottom of overwiew and
    // neither all memes have already been loading nor a request is currently
    // progressing
    if (visible && !endReached && !loading) {
      setRequestedPage(requestedPage + 1);
    }
  };

  return (
    <div>
      <div className="flex flex-col-reverse lg:flex-row">
        <div className="basis-2/3 pb-10 px-2">
          {memes.map((m) => (
            <div key={m._id}>
              <Meme meme={m} />
              <hr className="my-8" />
            </div>
          ))}
          <div className="text-center">
            {/* Detect "scrolled to bottom" not during loading or if no memes
                are loaded yet (initially)! */}
            {!loading && memes.length > 0 && !endReached ? (
              <VisibilitySensor
                partialVisibility={true}
                onChange={onScrolledToEndChanged}
              >
                <div>Loading more items...</div>
              </VisibilitySensor>
            ) : (
              <></>
            )}
            {endReached ? (
              <div className="flex justify-center">
                <Icon path={mdiCloseOctagonOutline} size={1} className="mr-2" />
                <span>You have reached the end!</span>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="basis-1/3 px-2">
          <OverviewSortingAndFilters
            model={sortingFilterModel}
            setModel={setSortingFilterModel}
          />
        </div>
      </div>
    </div>
  );
};

export default MemeOverview;
