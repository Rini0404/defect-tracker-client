import React, { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { palette } from "../../theme";
import { daysOfWeek } from "../../constants/days";

type CelendarProps = {
  date: Date;
  side: "left" | "right" | "center";
  selectedDates: any[];
  onSelectDay: (date: Date) => void;
  onChangeMonth: (direction: "left" | "right") => void;
  closeModal?: () => void;
};

const SimpleCalendar: React.FC<CelendarProps> = ({
  date,
  side,
  onSelectDay,
  onChangeMonth,
  selectedDates,
  closeModal,
}) => {
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

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const daysInMonth = getDaysInMonth(date.getFullYear(), date.getMonth());
  const firstDayOfMonth = new Date(
    date.getFullYear(),
    date.getMonth(),
    1
  ).getDay();
  
  const isFutureDay = (day: number) => {
    const today = new Date();
    const dayToCheck = new Date(date.getFullYear(), date.getMonth(), day);
    return dayToCheck > today;
  };

  
  // Generate days
  const calendarDays = [];

  const totalDays = firstDayOfMonth + daysInMonth;

  const extraDays = 7 - (totalDays % 7);

  const isDayInRange = (day: number) => {
    if (selectedDates.length === 2) {
      const [start, end] = selectedDates.sort(
        (a, b) => a.getTime() - b.getTime()
      );
      const currentDay = new Date(date.getFullYear(), date.getMonth(), day);
      return currentDay >= start && currentDay <= end;
    }
    return false;
  };

  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(<Box key={`empty-${i}`} sx={styles.day} />);
  }

  const isFirstSelectedDay = (day: number) => {
    if (selectedDates.length > 0) {
      const firstDay = selectedDates[0];
      return (
        firstDay.getDate() === day &&
        firstDay.getMonth() === date.getMonth() &&
        firstDay.getFullYear() === date.getFullYear()
      );
    }
    return false;
  };

  const isLastSelectedDay = (day: number) => {
    if (selectedDates.length > 1) {
      const lastDay = selectedDates[1];
      return (
        lastDay.getDate() === day &&
        lastDay.getMonth() === date.getMonth() &&
        lastDay.getFullYear() === date.getFullYear()
      );
    }
    return false;
  };

  const isSingleSelectedDay = (day: number) => {
    if (selectedDates.length === 1) {
      const selectedDay = selectedDates[0];
      return (
        selectedDay.getDate() === day &&
        selectedDay.getMonth() === date.getMonth() &&
        selectedDay.getFullYear() === date.getFullYear()
      );
    }
    return false;
  };

  // Generate days with selection logic
  for (let i = 1; i <= daysInMonth; i++) {
    const dayIsInRange = isDayInRange(i);
    const dayIsFirstSelected = isFirstSelectedDay(i);
    const dayIsLastSelected = isLastSelectedDay(i);
    const dayIsSingleSelected = isSingleSelectedDay(i);
    const dayIsFuture = isFutureDay(i);


    calendarDays.push(
      <Box
        key={i}
        sx={{
          ...styles.day,
          ...(dayIsInRange && styles.inRangeDay),
          ...(dayIsFirstSelected && styles.firstSelectedDay),
          ...(dayIsLastSelected && styles.lastSelectedDay),
          ...(dayIsSingleSelected && styles.singleSelectedDay),
          ...(dayIsFuture && styles.futureDay), // Apply futureDay style if it's a future day
        }}
        onClick={!dayIsFuture ? () => handleDayClick(i) : undefined} // Disable onClick for future days
        >
        {i}
      </Box>
    );
  }

  if (extraDays < 7) {
    for (let i = 0; i < extraDays; i++) {
      calendarDays.push(<Box key={`extra-${i}`} sx={styles.day} />);
    }
  }
  const handleDayClick = (day: any) => {
    const selectedDate = new Date(date.getFullYear(), date.getMonth(), day);
    onSelectDay(selectedDate);
  };

  return (
    <Box
      sx={{
        ...styles.calendar,
        ...(isMobile && stylesIsMobile.mainContainer),
        ...(side === "center" &&
          !isMobile && {
            backgroundColor: "white",
            width: "65%",
            height: "380px",
            borderRadius: "10px",
          }),
          ...(side === "center" &&
          isMobile && {
            justifyContent: "center",
            width: "100%",
            height: "375px",
            backgroundColor: "white",
            borderRadius: "10px",
            marginBottom: "10px",
          }),
      }}
    >
      <Box
        sx={{
          ...styles.header,
          ...(isMobile && styles.headerIsMobile),
          ...(side === "center" && {
            paddingTop: "8px",
            paddingBottom: "8px",
          }),
        }}
      >
        <Box sx={styles.iconWrapper}>
          {side === "left" && (
            <ArrowBackIcon
              fontSize="medium"
              onClick={() => onChangeMonth("left")}
              style={{
                float: "left",
              }}
            />
          )}
          {side === "center" && (
            <ArrowBackIcon
              fontSize="medium"
              onClick={() => onChangeMonth("left")}
              style={{
                float: "left",
                paddingLeft: "10px",
              }}
            />
          )}
        </Box>
        <Typography
          variant="h6"
          component="span"
          style={{
            fontWeight: "bold",
          }}
        >
          {`${date.toLocaleString("default", {
            month: "long",
          })} ${date.getFullYear()}`}
        </Typography>
        <Box sx={styles.iconWrapper}>
          {side === "right" && (
            <ArrowForwardIcon
              fontSize="medium"
              onClick={() => onChangeMonth("right")}
              style={{
                float: "right",
              }}
            />
          )}
          {side === "center" && (
            <ArrowForwardIcon
              fontSize="medium"
              onClick={() => onChangeMonth("right")}
              style={{
                float: "right",
                paddingRight: "10px",
              }}
            />
          )}
        </Box>
      </Box>
      <Box sx={styles.weekDays}>
        {daysOfWeek.map((day, index) => (
          <Box key={index} sx={ isMobile ? styles.isMobileDay : styles.day}>
            {day}
          </Box>
        ))}
      </Box>
      <Box sx={
        isMobile ? styles.isMobileDays : styles.days
      }>{calendarDays}</Box>

      {side === "center" && (
        <Box sx={styles.okButton}>
          <Button
            style={{
              borderRadius: "20px",
              width: "75px",
            }}
            variant="contained"
            onClick={() => closeModal && closeModal()}
          >
            OK
          </Button>
        </Box>
      )}
    </Box>
  );
};

const stylesIsMobile = {
  mainContainer: {
    justifyContent: "center",
    width: "95%",
    height: "300px",
    backgroundColor: "white",
    borderRadius: "10px",
    marginBottom: "10px",
  },
};

const styles = {
  futureDay: {
    color: 'grey',
    cursor: 'not-allowed',
  },
  headerIsMobile: {
    justifyContent: "space-between",
  },
  iconWrapper: {
    flex: "0 0 auto", // Ensure icons do not stretch
  },
  monthText: {
    flex: "1 0 auto", // Allow text to take available space
    textAlign: "center", // Center text
  },
  centerStyle: {
    backgroundColor: "white",
    width: "65%",
    height: "350px",
    borderRadius: "10px",
  },
  dateRangeBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "10px",
  },
  okButton: {
    display: "flex",
    justifyContent: "flex-end",
    bottom: "0",
    right: "0",
    marginRight: "20px",
    marginBottom: "20px",
  },
  dateBox: {
    padding: "5px",
    border: "1px solid black",
    borderRadius: "5px",
    margin: "5px",
  },
  calendar: {
    display: "flex",
    flexDirection: "column",
    padding: "5px",
    width: "43%",
    boxSizing: "border-box",
    height: "350px", // Set a fixed height
    overflow: "hidden", // Hide overflow
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "10px",
  },
  weekDays: {
    display: "flex",
    flexDirection: "row",
  },
  dayHeader: {
    flex: "0 0 14.28%", // Set fixed width (100% / 7 days)
    textAlign: "center",
    fontWeight: "bold",
  },
  days: {
    display: "flex",
    flexWrap: "wrap",
  },
  isMobileDays: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
  },
  day: {
    flex: "0 0 14.28%", // Set fixed width (100% / 7 days)
    textAlign: "center",
    padding: "10px",
    cursor: "pointer",
    boxSizing: "border-box", // Ensures padding is included in width
  },
  isMobileDay: {
    flex: "0 0 0%", // Set fixed width (100% / 7 days)
    textAlign: "center",
    padding: "8px",
    cursor: "pointer",
    boxSizing: "border-box", // Ensures padding is included in width
    width: "100%",
  },
  inRangeDay: {
    backgroundColor: palette.blues.extraLight,
  },
  firstSelectedDay: {
    backgroundColor: palette.blues.light,
    color: "white",
    // border top left radius
    borderTopLeftRadius: "10px",
    // border bottom left radius
    borderBottomLeftRadius: "10px",
  },
  lastSelectedDay: {
    "&.MuiBox-root": {
      // Increase specificity
      backgroundColor: palette.blues.light,
      color: "white",
      borderTopRightRadius: "10px",
      borderBottomRightRadius: "10px",
    },
  },
  singleSelectedDay: {
    backgroundColor: palette.blues.light,
    color: "white",
    borderRadius: "20px",
  },
};

export default SimpleCalendar;
