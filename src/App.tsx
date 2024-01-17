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
import React, { useEffect, useState } from "react";
import { PostModal } from "./components/PostModal";
import { MainPieChart } from "./components/MainPieChart";

function App() {
  const [width, setWidth] = useState<number>(window.innerWidth);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= 768;

  const [openPostModal, setOpenPostModal] = React.useState(false);

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
        sx={isMobile ? style.isMobileContainer : style.container}
      >
        <Box sx={{ paddingTop: "10px" }}>
          <Header isMobile={isMobile} defectCount={defectCounts.total} />
        </Box>
        <Box
          sx={
            isMobile
              ? style.isMobileDefectCountAnPichartContainer
              : style.defectCountAnPichartContainer
          }
        >
          {isMobile ? (
            <>
              <MainPieChart />
              <DefectColumn isMobile={isMobile} />
            </>
          ) : (
            <>
              <DefectColumn isMobile={isMobile} />
              <MainPieChart />
            </>
          )}
        </Box>
      </Box>
      <Button
        variant="contained"
        sx={isMobile ? style.isMobileButton : style.button}
        onClick={() => setOpenPostModal(true)}
      >
        Add Defect
      </Button>
      {openPostModal && <PostModal setOpen={setOpenPostModal} />}
    </div>
  );
}

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
);

const style = {
  button: {
    position: "absolute",
    bottom: "10px",
    right: "10px",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "20px",
  },
  isMobileButton: {
    position: "absolute",
    bottom: "10px",
    right: "10px",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "20px",
    width: "100px",
  },
  defectCountAnPichartContainer: {
    display: "flex",
    flexDirection: "row",
  },
  isMobileDefectCountAnPichartContainer: {
    display: "flex",
    flexDirection: "column",
  },
  container: {
    width: "95vw",
    height: "95vh",
    bgcolor: "white",
    borderRadius: "10px",
    overflow: "auto",
    position: "relative",
  },
  isMobileContainer: {
    width: "100vw",
    height: "100vh",
    bgcolor: "white",
    borderRadius: "10px",
    overflow: "auto",
    position: "relative",
  },
};
