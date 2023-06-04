import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const ArabChart = ({ datas }) => {
  const araValue = datas.araValues.filter((value) => value !== "");
  const arbValue = datas.arbValues.filter((value) => value !== "");
  araValue.unshift(datas.closingPrice);
  arbValue.unshift(datas.closingPrice);
  const data = {
    labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    datasets: [
      {
        label: "Harga Penutup",
        fill: "false",
        data: [datas.closingPrice],
        borderColor: "rgb(108, 117, 125)",
        backgroundColor: "rgba(108, 117, 125, 0.5)",
        borderWidth: 1,
      },
      {
        label: "Harga ARA",
        fill: "false",
        data: araValue,
        borderColor: "rgb(25, 135, 84)",
        backgroundColor: "rgba(25, 135, 84, 0.5)",
        borderWidth: 1,
      },
      {
        label: "Harga ARB",
        fill: "false",
        data: arbValue,
        borderColor: "rgb(220, 53, 69)",
        backgroundColor: "rgba(220, 53, 69, 0.5)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    interaction: {
      intersect: false,
    },
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "ARA ARB Chart",
      },
    },
  };

  return (
    <div className="w-100 mb-2">
      <Line data={data} options={options} />
    </div>
  );
};
