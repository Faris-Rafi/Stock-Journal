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
    labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
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

export const AvgChart = ({ avgDetail }) => {
  let totalValue = 0;
  let totalLot = 0;
  let totalTransaction = 0;
  let totalAvg = 0;
  let datas = [];

  avgDetail.detail.map((detail) => {
    

    if (detail.action_type != "b") {
      totalValue -= parseInt(detail.price * detail.lot);
      totalLot -= parseInt(detail.lot);
      totalTransaction -= parseInt(detail.price * (detail.lot * 100));
    } else {
      totalValue += parseInt(detail.price * detail.lot);
      totalLot += parseInt(detail.lot);
      totalTransaction += parseInt(detail.price * (detail.lot * 100));
    }

    totalAvg = totalValue / totalLot;

    if (totalLot == 0) {
      totalAvg = 0;
    }

    const decimal = Math.max(
      0,
      Math.min(2, (totalAvg.toString().split(".")[1] || "").length)
    );

    datas.push({ avg: totalAvg.toFixed(decimal) });
  });

  const data = {
    labels: datas.map((_, index) => index + 1),
    datasets: [
      {
        label: "Total AVG",
        fill: "false",
        data: datas.map((item) => item.avg),
        borderColor: "rgba(0, 123, 255)",
        backgroundColor: "rgba(0, 123, 255, 0.5)",
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
        text: "AVG Chart",
      },
    },
  };

  return (
    <div className="w-100 mb-2">
      <Line data={data} options={options} />
    </div>
  );
};
