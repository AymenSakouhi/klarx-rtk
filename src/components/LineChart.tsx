import React from "react";
import { RootState } from "../app/store";
import { useSelector } from "react-redux";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

function LineChart() {
  const exchanges = useSelector((state: RootState) => state.exchanges.value);
  const reverseExchanges = useSelector(
    (state: RootState) => state.reverseExchanges.value
  );

  const data = {
    labels: ["Day 0", "Day -1", "Day -2", "Day -3", "Day -4", "Day -6", "Day -7", "Day -8", "Day -9", "Day -10", "Day -11", "Day -12", "Day -13"],
    datasets: [
      {
        label: "1st Chart",
        data: exchanges.map(rate => rate),
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)"
      },
      {
        label: "2nd Chart",
        data: reverseExchanges.map(rate => rate),
        fill: false,
        borderColor: "#742774"
      }
    ]
  };
  
  return <Line data={data}/>;
}

export default LineChart;