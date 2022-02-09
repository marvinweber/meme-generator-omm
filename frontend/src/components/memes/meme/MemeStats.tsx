import React, { useEffect, useState } from "react";
import { MemeModel } from "../../../lib/memeModel";
import {
  Chart as ChartJS,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { apiClient } from "../../..";
import Icon from "@mdi/react";
import { mdiChartBox, mdiRefreshCircle } from "@mdi/js";

ChartJS.register(
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const MemeStats: React.FC<{
  meme: MemeModel;
}> = ({ meme }) => {
  const [chartLoaded, setChartLoaded] = useState(false);
  const [cummulated, setCummulated] = useState(false);
  const [chartData, setChartData] = useState<any>({});
  const [chartOptions, setChartOptions] = useState<any>({});

  // hook to update chart when mode (cumulative / per day) is changed or meme
  // prop is updated/ changed
  useEffect(() => {
    reloadChart();
  }, [meme, cummulated]);

  const reloadChart = async () => {
    const res = await apiClient.get(`/memes/${meme._id}/stats`);
    if (!res.data.success) {
      return;
    }

    setChartData({
      labels: res.data.labelsFormatted,
      datasets: [
        {
          label: cummulated ? "Total Views Amount" : "Views per Day",
          data: cummulated ? res.data.viewsCummulated : res.data.views,
          borderColor: "rgb(8, 66, 208)",
          backgroundColor: "rgba(8, 66, 208, 0.5)",
          yAxisID: "y1",
        },
        {
          label: cummulated ? "Total Likes Amount" : "Likes per Day",
          data: cummulated ? res.data.likesCummulated : res.data.likes,
          borderColor: "rgb(255, 0, 0)",
          backgroundColor: "rgba(255, 0, 0, 0.5)",
          yAxisID: "y2",
        },
        {
          label: cummulated ? "Total Comments Amount" : "Comments per Day",
          data: cummulated ? res.data.commentsCummulated : res.data.comments,
          borderColor: "rgb(18, 69, 37)",
          backgroundColor: "rgba(18, 69, 37, 0.5)",
          yAxisID: "y2",
        },
      ],
    });
    setChartOptions({
      responsive: true,
      plugins: {
        title: {
          text: cummulated
            ? "Total Views, Likes, and Comments"
            : "Views, Likes, and Comments per Day",
          display: true,
        },
      },
      scales: {
        y1: {
          type: "linear",
          display: true,
          position: "left",
          min: 0,
          ticks: {
            stepSize: 1,
          },
          title: {
            display: true,
            text: "Views",
          },
        },
        y2: {
          type: "linear",
          display: true,
          position: "right",
          min: 0,
          ticks: {
            stepSize: 1,
          },
          title: {
            display: true,
            text: "Likes and Comments",
          },
        },
      },
    });
    setChartLoaded(true);
  };

  return chartLoaded ? (
    <div className="flex flex-col">
      <Line options={chartOptions} data={chartData} />
      <div className="flex mt-3">
        <button
          onClick={() => setCummulated(!cummulated)}
          className="flex-grow p-2 rounded-md border-2 hover:bg-slate-600 hover:text-white"
        >
          <div className="flex justify-center">
            <Icon path={mdiChartBox} size={1} className="mr-2" />
            <span>Mode: {cummulated ? "Total Amount" : "Per Day"}</span>
          </div>
        </button>
        <button
          onClick={() => reloadChart()}
          className="flex-grow p-2 rounded-md border-2 hover:bg-slate-600 hover:text-white"
        >
          <div className="flex justify-center">
            <Icon path={mdiRefreshCircle} size={1} className="mr-2" />
            Reload
          </div>
        </button>
      </div>
    </div>
  ) : (
    <p>Loading...</p>
  );
};
export default MemeStats;
