import React from "react";
import { ThreeCategoryButtons } from "../CategoryButtons";
import { DateAndUnits } from "../DateAndUnits";
import { Box } from "@mui/material";

type HeaderProps = {
  defectCount: number;
  isMobile: boolean;
};

export const Header: React.FC<HeaderProps> = ({ defectCount, isMobile }) => {
  return (
    <Box sx={isMobile ? style.isMobileHeader : style.header}>
      {isMobile ? (
        <>
          <DateAndUnits isMobile={isMobile} defectCount={defectCount} />
          <ThreeCategoryButtons isMobile={isMobile} />
        </>
      ) : (
        <>
          <ThreeCategoryButtons isMobile={isMobile} />
          <DateAndUnits isMobile={isMobile} defectCount={defectCount} />
        </>
      )}
    </Box>
  );
};

const style = {
  header: {
    display: "flex",
    paddingRight: "15px",
    paddingLeft: "10px",
    paddingTop: "10px", 
    paddingBottom: "5px",
  },
  isMobileHeader: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingRight: "15px",
    paddingLeft: "15px",
  },
};
