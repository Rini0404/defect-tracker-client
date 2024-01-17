/* eslint-disable import/no-anonymous-default-export */
import Box from "@mui/material/Box";
import "./App.css";
import { useFetchDefects } from "./hooks/fetchAllDefects";
import { BASE_URL } from "./constants/baseUrl";
import LoadingOverlay from "./components/Loading";
import { Header } from "./components/Header";
import { countDefects } from "./utils/counter";
import { DefectColumn } from "./components/DefectCol";
import store from "./redux/store";
import { Provider } from "react-redux";
import { Button } from "@mui/material";
import React from "react";
import { PostModal } from "./components/PostModal";

function App() {
  
  const [ openPostModal, setOpenPostModal ] = React.useState(false);
  
  const { defects, loading, error } = useFetchDefects(
    `${BASE_URL}/getAllDefects`
  );

  if (loading) return <LoadingOverlay open={loading} title="Loading Defects" />;

  if (error) return <div>Error: {error}</div>;

  const defectCounts = countDefects(defects ?? {});


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
          position: "relative",
        }}
      >
        <div className="App__header">
          <Header defectCount={defectCounts.total} />
        </div>

        <div className="App__left-pannel">
          <DefectColumn />
        </div>

        <Button
          variant="contained"
          sx={{
            position: "absolute",
            bottom: "10px",
            right: "10px",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "20px",
          }}
          onClick={() => setOpenPostModal(true)}
        >
          Add Defect
        </Button>
      
      </Box>


          {
            openPostModal && (
              <PostModal setOpen={setOpenPostModal} />
            )
          }

    </div>
  );
}

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
);
