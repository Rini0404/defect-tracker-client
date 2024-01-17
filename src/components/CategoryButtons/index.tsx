import { Box, Button, Typography } from "@mui/material";
import React from "react";

const defectCategoriesArray = ["Human Error", "Machine Error", "MFG Error"];

export const ThreeCategoryButtons: React.FC<{ isMobile: boolean }> = ({
  isMobile,
}) => {

  // lowercase but first letter uppercase in each word
  const formatCategory = (category: string) => {
    return category
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
      .join(" ");
  };

  const formattedDefectCategoriesArray = defectCategoriesArray.map(
    (category) => formatCategory(category)
  );


  return (
    <Box
      sx={
        isMobile
          ? style.isMobileThreeCategoryButtons
          : style.threeCategoryButtons
      }
    >
      {formattedDefectCategoriesArray.map((category) => (
        <Button
          key={category}
          sx={isMobile ? style.isMobileButton : style.button}
          className="ThreeCategoryButtons__button"
        >
          <Typography 
            sx={isMobile ? style.isMobileButtonText : style.buttonText}
          >{category}</Typography>
        </Button>
      ))}
    </Box>
  );
};

const style = {
  threeCategoryButtons: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: "12px",
    fontWeight: "bold",
  },
  isMobileButtonText: {
    color: "white",
    fontSize: "12px",
    fontWeight: "bold",
  },
  isMobileThreeCategoryButtons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px",
  },
  button: {
    backgroundColor: "white",
    borderRadius: "20px",
    marginRight: "5px",
    width: "125px",
    height: "35px",
  },
  isMobileButton: {
    backgroundColor: "white",
    borderRadius: "20px",
    margin: "5px",
    padding: "5px",
    width: "125px",
    height: "40px",
  },
};
