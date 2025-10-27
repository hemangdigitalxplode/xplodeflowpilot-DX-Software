import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", Efficiency: 80, Punctuality: 90, Productivity: 75 },
  { month: "Feb", Efficiency: 85, Punctuality: 88, Productivity: 78 },
  { month: "Mar", Efficiency: 78, Punctuality: 92, Productivity: 80 },
  { month: "Apr", Efficiency: 82, Punctuality: 85, Productivity: 77 },
  { month: "May", Efficiency: 88, Punctuality: 90, Productivity: 85 },
  { month: "Jun", Efficiency: 90, Punctuality: 87, Productivity: 83 },
  { month: "Jul", Efficiency: 84, Punctuality: 89, Productivity: 80 },
  { month: "Aug", Efficiency: 86, Punctuality: 91, Productivity: 82 },
  { month: "Sep", Efficiency: 89, Punctuality: 88, Productivity: 85 },
  { month: "Oct", Efficiency: 87, Punctuality: 90, Productivity: 84 },
  { month: "Nov", Efficiency: 85, Punctuality: 92, Productivity: 83 },
  { month: "Dec", Efficiency: 90, Punctuality: 94, Productivity: 88 },
];

const colors = {
  Efficiency: "#4e79a7",
  Punctuality: "#f28e2b",
  Productivity: "#e15759",
};

const EfficiencyBarChart = () => {
  return (
    <div style={{ width: "100%", height: 500, padding: "20px", borderRadius: "12px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}>Monthly Performance (75%)</h2>
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>

     
         <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
          <XAxis dataKey="month" tick={{ fill: "#555", fontSize: 14 }} />
          <YAxis tick={{ fill: "#555", fontSize: 14 }} unit="%" />
          <Tooltip
            contentStyle={{ backgroundColor: "#fff", borderRadius: "8px", border: "1px solid #ccc" }}
            formatter={(value) => `${value}%`}
          />
          <Legend verticalAlign="top" height={36} />
        <Bar dataKey="Efficiency" fill="#8884d8" />
        <Bar dataKey="Punctuality" fill="#82ca9d" />
        <Bar dataKey="Productivity" fill="#ffc658" />
      </BarChart>
    </ResponsiveContainer>
    </div>
  );
};

export default EfficiencyBarChart;
