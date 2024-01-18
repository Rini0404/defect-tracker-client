import { Box, Button, Grid, Modal } from "@mui/material";
import { DefectCategory, DefectType, defectCategoryMapping } from "../../types";
import { getColorForDefectType } from "../../utils/colorOutput";
import {
  formatDefectType,
  newLineFormater,
} from "../../utils/defectTypeTextFromat";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../constants/baseUrl";
import { useDispatch } from "react-redux";
import { addSingleDefect } from "../../redux/actions";
import SimpleCalendar from "../Calendar";

type PostModalProps = {
  setOpen: (open: boolean) => void;
};

export const PostModal: React.FC<PostModalProps> = ({ setOpen }) => {
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

  const [openDateModal, setOpenDateModal] = useState<boolean>(false);

  const [selectedDates, setSelectedDates] = React.useState<(Date | null)[]>([]);

  const [currentDate, setCurrentDate] = React.useState(new Date());

  const onSelectDay = (selectedDate: Date) => {
    setSelectedDates([selectedDate]); 
  };

  const handleMonthChange = (direction: "left" | "right") => {
    if (direction === "left") {
      setCurrentDate(
        new Date(currentDate.setMonth(currentDate.getMonth() - 1))
      );
    } else {
      setCurrentDate(
        new Date(currentDate.setMonth(currentDate.getMonth() + 1))
      );
    }
  };

  const handleSubmit = async () => {
    if (!selectedDefectType) {
      alert("Please select a defect type");
      return;
    }

    if (!selectedDates[0]) {
      alert("Please select a date");
      return;
    }

    // convert selectedDates to "YYYY-MM-DD" format, the dates are an array of one
    const selectedDate = selectedDates[0]?.toISOString().slice(0, 10);

    try {
      const payload = {
        type: selectedDefectType,
        category: selectedDefectCategory,
        date: selectedDate,
      };

      console.log("payload: ", payload);

      const response = await fetch(`${BASE_URL}/addDefect`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

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

  const allDefects = [
    ...defectCategoryMapping.HumanError,
    ...defectCategoryMapping.MachineError,
    ...defectCategoryMapping.ManufacturerError,
  ];

  const getCategoryForDefectType = (
    defectType: DefectType
  ): DefectCategory | null => {
    if (defectCategoryMapping.HumanError.includes(defectType)) {
      return DefectCategory.HumanError;
    } else if (defectCategoryMapping.MachineError.includes(defectType)) {
      return DefectCategory.MachineError;
    } else if (defectCategoryMapping.ManufacturerError.includes(defectType)) {
      return DefectCategory.ManufacturerError;
    }
    return null;
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
          <Button
            variant="contained"
            sx={style.dateButton}
            onClick={() => {
              setOpenDateModal(true);
            }}
          >
            <p style={{ fontSize: "22px" }}>
              {
                // date in jan 15, 2021 format
                selectedDates[0]
                  ? selectedDates[0].toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })
                  : "Select Date"
              }
            </p>
          </Button>
        </Box>

        {isMobile ? (
          <Grid
            container
            spacing={0}
            style={{
              display: "flex",
              // justifyContent: "center",
              height: "100%",
            }}
          >
            {allDefects.map((defectType, index) => (
              <Grid item xs={3} key={index}>
                <Grid container justifyContent="center">
                  <Grid item xs={10}>
                    <Box
                      sx={{
                        borderRadius: "10px",
                        marginTop: "0px",
                        height: "80px",
                        width: "75px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "pointer",
                        fontSize: "14px",
                        textAlign: "center",
                        backgroundColor: getColorForDefectType(defectType),
                        ...(getCategoryForDefectType(defectType) !== null &&
                          isSelectedDefect(
                            defectType,
                            getCategoryForDefectType(
                              defectType
                            ) as DefectCategory
                          ) &&
                          style.selectedItem),
                      }}
                      onClick={() => {
                        const defectCategory =
                          getCategoryForDefectType(defectType);
                        if (defectCategory) {
                          handleSelectDefect(defectType, defectCategory);
                        }
                      }}
                    >
                      {newLineFormater(defectType)}
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            ))}

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
        ) : (
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
        )}

        {openDateModal && (
          <Modal
            open={true}
            onClose={() => {
              setOpenDateModal(false);
            }}
          >
            <Box sx={style.calendarContainer}>
              <SimpleCalendar
                closeModal={() => setOpenDateModal(false)}
                selectedDates={selectedDates}
                side="center"
                date={currentDate}
                onSelectDay={onSelectDay}
                onChangeMonth={handleMonthChange}
              />
            </Box>
          </Modal>
        )}
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
    height: { xs: "85vh", md: "90vh" }, // adjust height based on screen size
    width: { xs: "88vw", md: "55vw" }, // adjust width based on screen size
    boxShadow: 24,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  selectedItem: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  innerBox: {
    borderRadius: "10px",
    marginTop: "20px",
    height: "75px",
    width: "125px",
    fontSize: "14px",
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
    height: { xs: "75px", md: "50px" },
    width: "300px",
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
  calendarContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "transparent",
    borderRadius: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};
