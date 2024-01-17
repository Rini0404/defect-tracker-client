
import { Box, Typography } from "@mui/material";
import { PieChart, Pie, Cell } from "recharts";

const data = [
  { name: "Type A", value: 400 },
  { name: "Type B", value: 300 },
  { name: "Type C", value: 300 },
  { name: "Type D", value: 200 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];


export const MainPieChart: React.FC = () => {

  return (
    <Box 
    sx={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "90vh",
    }}
  >
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: "bold" }}>
        Defects by Type
      </Typography>

      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
      </PieChart>
    </Box>
  </Box>
  )
}