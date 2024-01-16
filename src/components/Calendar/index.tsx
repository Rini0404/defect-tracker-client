import React from "react";
import { Box, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { palette } from "../../theme";
const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

type CelendarProps = {
  date: Date;
  side: "left" | "right";
  selectedDates: any[];
  onSelectDay: (date: Date) => void;
  onChangeMonth: (direction: "left" | "right") => void;
};

const SimpleCalendar: React.FC<CelendarProps> = ({
  date,
  side,
  onSelectDay,
  onChangeMonth,
  selectedDates,
}) => {
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const daysInMonth = getDaysInMonth(date.getFullYear(), date.getMonth());
  const firstDayOfMonth = new Date(
    date.getFullYear(),
    date.getMonth(),
    1
  ).getDay();

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

    calendarDays.push(
      <Box
        key={i}
        sx={{
          ...styles.day,
          ...(dayIsInRange && styles.inRangeDay),
          ...(dayIsFirstSelected && styles.firstSelectedDay),
          ...(dayIsLastSelected && styles.lastSelectedDay),
          ...(dayIsSingleSelected && styles.singleSelectedDay),
        }}
        onClick={() => handleDayClick(i)}
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
    <Box sx={styles.calendar}>


      <Box sx={styles.header}>
        {side === "left" && (
          <ArrowBackIcon
            fontSize="medium"
            onClick={() => onChangeMonth("left")}
            style={{
              float: "left",
            }}
          />
        )}
        <Typography variant="h6" component="span" 
          style={{
            fontWeight: "bold",
          }}
        >
          {`${date.toLocaleString("default", {
            month: "long",
          })} ${date.getFullYear()}`}
        </Typography>
        {side === "right" && (
          <ArrowForwardIcon
            fontSize="medium"
            onClick={() => onChangeMonth("right")}
            style={{
              float: "right",
            }}
          />
        )}
      </Box>
      <Box sx={styles.weekDays}>
        {daysOfWeek.map((day, index) => (
          <Box key={index} sx={styles.day}>
            {day}
          </Box>
        ))}
      </Box>
      <Box sx={styles.days}>{calendarDays}</Box>
    </Box>
  );
};

const styles = {
  dateRangeBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '10px',
  },
  dateBox: {
    padding: '5px',
    border: '1px solid black',
    borderRadius: '5px',
    margin: '5px',
  },
  calendar: {
    display: "flex",
    flexDirection: "column",
    padding: "10px",
    margin: "5px",
    width: "40%",
    // backgroundColor: "pink",
    boxSizing: "border-box",
    height: "350px", // Set a fixed height
    overflow: "hidden", // Hide overflow
  },
  header: {
    textAlign: "center",
    marginBottom: "10px",
  },
  weekDays: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around", // Adjust space between week days
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
  day: {
    flex: "0 0 14.28%", // Set fixed width (100% / 7 days)
    textAlign: "center",
    padding: "10px",
    cursor: "pointer",
    boxSizing: "border-box", // Ensures padding is included in width
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
