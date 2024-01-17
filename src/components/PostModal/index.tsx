import { Box, Button, Grid, Modal } from "@mui/material";
import { DefectCategory, DefectType, defectCategoryMapping } from "../../types";
import { getColorForDefectType } from "../../utils/colorOutput";
import { formatDefectType } from "../../utils/defectTypeTextFromat";
import React from "react";
import { BASE_URL } from "../../constants/baseUrl";
import { useDispatch } from "react-redux";
import { addSingleDefect } from "../../redux/actions";

type PostModalProps = {
  setOpen: (open: boolean) => void;
};

export const PostModal: React.FC<PostModalProps> = ({ setOpen }) => {
  const dispatch = useDispatch<any>();

  const halfIndex = Math.ceil(defectCategoryMapping.HumanError.length / 2);

  const [selectedDefectType, setSelectedDefectType] =
    React.useState<DefectType | null>(null);

  const [selectedDefectCategory, setSelectedDefectCategory] =
    React.useState<DefectCategory | null>(null);

  const handleSelectDefect = (
    defectType: DefectType,
    DefectCategory: DefectCategory
  ) => {
    setSelectedDefectType(defectType);
    setSelectedDefectCategory(DefectCategory);
  };

  const isSelectedDefect = (
    defectType: DefectType,
    defectCategory: DefectCategory
  ) => {
    return (
      selectedDefectType === defectType &&
      selectedDefectCategory === defectCategory
    );
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        type: selectedDefectType,
        category: selectedDefectCategory,
        date: new Date().toISOString().slice(0, 10),
      };
      console.log("Request Payload: ", payload);

      const response = await fetch(`${BASE_URL}/addDefect`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      console.log("Raw Response: ", response);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error(`Expected JSON, but received ${contentType}`);
      }

      const data = await response.json();
      if (!data) {
        throw new Error(`No data received`);
      }

      const { type, category, date } = data.defect;

      dispatch(addSingleDefect(type, date, category));

      
    } catch (error) {
      console.error("Error in handleSubmit: ", error);
    }
  };

  return (
    <Modal
      open={true}
      onClose={() => {
        setOpen(false);
      }}
    >
      <Box sx={style.container}>
        <Box sx={style.dateButtonContainer}>
          <Button variant="contained" sx={style.dateButton}>
            <p style={{ fontSize: "22px" }}>January 15, 2024</p>
          </Button>
        </Box>

        <Grid
          container
          spacing={0}
          style={{
            display: "flex",
            justifyContent: "center",
            height: "100%",
          }}
        >
          {[0, 1].map((col) => (
            <Grid item xs={2} key={col}>
              <Grid container justifyContent="center">
                {defectCategoryMapping.HumanError.slice(
                  col * halfIndex,
                  (col + 1) * halfIndex
                ).map((defectType, rowIndex) => (
                  <Grid item xs={12} key={`human-${rowIndex}`}>
                    <Box
                      sx={{
                        ...style.innerBox,
                        backgroundColor: getColorForDefectType(defectType),
                        ...(isSelectedDefect(
                          defectType,
                          DefectCategory.HumanError
                        ) && style.selectedItem),
                      }}
                      onClick={() => {
                        handleSelectDefect(
                          defectType,
                          DefectCategory.HumanError
                        );
                      }}
                    >
                      {formatDefectType(defectType)}
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          ))}

          {/* MachineError - One Column */}
          <Grid item xs={2}>
            <Grid container justifyContent="center">
              {defectCategoryMapping.MachineError.map(
                (defectType, rowIndex) => (
                  <Grid item xs={12} key={`machine-${rowIndex}`}>
                    <Box
                      sx={{
                        ...style.innerBox,
                        backgroundColor: getColorForDefectType(defectType),
                        ...(isSelectedDefect(
                          defectType,
                          DefectCategory.MachineError
                        ) && style.selectedItem),
                      }}
                      onClick={() => {
                        handleSelectDefect(
                          defectType,
                          DefectCategory.MachineError
                        );
                      }}
                    >
                      {formatDefectType(defectType)}
                    </Box>
                  </Grid>
                )
              )}
            </Grid>
          </Grid>

          {/* ManufacturerError - One Column */}
          <Grid item xs={2}>
            <Grid container justifyContent="center">
              {defectCategoryMapping.ManufacturerError.map(
                (defectType, rowIndex) => (
                  <Grid item xs={12} key={`manufacturer-${rowIndex}`}>
                    <Box
                      sx={{
                        ...style.innerBox,
                        backgroundColor: getColorForDefectType(defectType),
                        ...(isSelectedDefect(
                          defectType,
                          DefectCategory.ManufacturerError
                        ) && style.selectedItem),
                      }}
                      onClick={() => {
                        handleSelectDefect(
                          defectType,
                          DefectCategory.ManufacturerError
                        );
                      }}
                    >
                      {formatDefectType(defectType)}
                    </Box>
                  </Grid>
                )
              )}
            </Grid>
          </Grid>
          <Box sx={style.buttonsContainer}>
            <Button
              variant="contained"
              color="primary"
              sx={{
                borderRadius: "30px",
                marginRight: "10px",
              }}
              onClick={() => {
                setOpen(false);
                handleSubmit();
              }}
            >
              Submit
            </Button>
          </Box>
        </Grid>
      </Box>
    </Modal>
  );
};

const style = {
  container: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    p: 2,
    borderRadius: "20px",
    height: "90vh",
    width: "55vw",
    boxShadow: 24,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  selectedItem: {
    // overlay color
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  innerBox: {
    borderRadius: "10px",
    marginTop: "20px",
    height: "75px",
    width: "125px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },
  buttonsContainer: {
    position: "absolute",
    bottom: "1%",
    right: "0",
    padding: "10px",
  },

  flexContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  flexCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  dateButton: {
    backgroundColor: "#F2F2F2",
    padding: "6px 12px",
    color: "black",
    height: "50px",
    width: "32.5%",
    borderRadius: "25px",
    paddingLeft: "15px",
    marginRight: "3%",
    // no shadow
    boxShadow: "none",
  },
  dateButtonContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "10px",
  },
};
