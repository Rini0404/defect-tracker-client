import React from "react";
import logo from "./logo.svg";
import Box from "@mui/material/Box";
import "./App.css";
import { useFetchDefects } from "./hooks/fetchAllDefects";
import { BASE_URL } from "./constants/baseUrl";
import LoadingOverlay from "./components/Loading";

function App() {
  const { defects, loading, error } = useFetchDefects(
    `${BASE_URL}getAllDefects`
  );

  if (loading) return <LoadingOverlay open={loading} title="Loading Defects" />;
  if (error) return <div>Error: {error}</div>;

  console.log("DEFECTS: ", defects);

  return (
    <div
    className="App"
    >
      <Box
        sx={{
          width: "95vw",
          height: "95vh",
          bgcolor: "white",
          borderRadius: "10px",
          overflow: "auto",
        }}
      >
        {/* Your Box content here */}
      </Box>
    </div>
  );
}

export default App;
