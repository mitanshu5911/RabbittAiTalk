import { Bar, Pie, Line } from "react-chartjs-2";
import {
 Chart as ChartJS,
 CategoryScale,
 LinearScale,
 BarElement,
 ArcElement,
 LineElement,
 PointElement,
 Tooltip,
 Legend
} from "chart.js";

import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
 CategoryScale,
 LinearScale,
 BarElement,
 ArcElement,
 LineElement,
 PointElement,
 Tooltip,
 Legend,
 ChartDataLabels
);

export default function ChartView({ chart }) {

 if (!chart) return null;

 const data = {
  labels: chart.labels,
  datasets: [
   {
    label: chart.title,
    data: chart.values,
    backgroundColor: [
     "#22c55e",
     "#3b82f6",
     "#f59e0b",
     "#ef4444",
     "#a855f7"
    ]
   }
  ]
 };

 const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins:{
   legend:{display:true},
   datalabels:{
    color:"white",
    formatter:(value)=>value
   }
  }
 };

 const ChartComponent =
  chart.type === "pie" ? Pie :
  chart.type === "line" ? Line :
  Bar;

 return (
  <div className="w-full flex justify-center">
   <div className="w-md h-112">
    <ChartComponent data={data} options={options}/>
   </div>
  </div>
 );
}