import React from "react";
import logo from "./logo.svg";
import Box from "@mui/material/Box";
import "./App.css";
import { useFetchDefects } from "./hooks/fetchAllDefects";
import { BASE_URL } from "./constants/baseUrl";
import LoadingOverlay from "./components/Loading";
import { Header } from "./components/Header";
import { countDefects } from "./utils/counter";
import { DefectColumn } from "./components/DefectCol";

function App() {
  const { defects, loading, error } = useFetchDefects(
    `${BASE_URL}getAllDefects`
  );

  if (loading) return <LoadingOverlay open={loading} title="Loading Defects" />;
  if (error) return <div>Error: {error}</div>;

  const defectCounts = countDefects(defects ?? {});

  console.log("defectCounts.total: ", defectCounts);

  return (
    <div className="App">
      <Box
      className="App__container"
        sx={{
          width: "95vw",
          height: "95vh",
          bgcolor: "white",
          borderRadius: "10px",
          overflow: "auto",
        }}
      >
        <div className="App__header">
          <Header defectCount={defectCounts.total} />
        </div>

        <div className="App__left-pannel">
          <DefectColumn />
        </div>


      </Box>
    </div>
  );
}

export default App;
