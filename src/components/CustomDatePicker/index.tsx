import * as React from "react";
import Box from "@mui/material/Box";
import { TreeView } from "@mui/x-tree-view/TreeView";
import { Button } from "@mui/material";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import { grey } from "@mui/material/colors";
import SimpleCalendar from "../Calendar";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useDispatch } from "react-redux";
import { setDateRange, updateDefectsByDate } from "../../redux/actions";
const color = grey[500];

const predefinedRanges = {
  Today: [new Date(), new Date()],
  Yesterday: (() => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    return [yesterday, yesterday];
  })(),
  "Last 7 days": (() => {
    const today = new Date();
    const lastWeek = new Date(today);
    lastWeek.setDate(lastWeek.getDate() - 7);
    return [lastWeek, today];
  })(),
  "Last 30 days": (() => {
    const today = new Date();
    const lastMonth = new Date(today);
    lastMonth.setDate(lastMonth.getDate() - 30);
    return [lastMonth, today];
  })(),
  "Last 90 days": (() => {
    const today = new Date();
    const lastMonth = new Date(today);
    lastMonth.setDate(lastMonth.getDate() - 90);
    return [lastMonth, today];
  })(),
  "Last 365 days": (() => {
    const today = new Date();
    const lastMonth = new Date(today);
    lastMonth.setDate(lastMonth.getDate() - 365);
    return [lastMonth, today];
  })(),
  "Last Month": (() => {
    const today = new Date();
    const lastMonth = new Date(today);
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    return [lastMonth, today];
  })(),
  "Last 12 Months": (() => {
    const today = new Date();
    const lastMonth = new Date(today);
    lastMonth.setMonth(lastMonth.getMonth() - 12);
    return [lastMonth, today];
  })(),
};

type CustomProps = {
  setOpenModal: (opened: boolean) => void;
};

export const CustomDateRangePicker: React.FC<CustomProps> = ({
  setOpenModal,
}) => {
  const dispatch = useDispatch<any>();

  const [dateRange, setDateRanges] = React.useState<(Date | null)[]>([
    null,
    null,
  ]);
  const [selectedRange, setSelectedRange] = React.useState("");

  const handleRangeChange = (event: { target: { value: any } }) => {
    const range = event.target.value;
    setSelectedRange(range);
    setDateRanges(
      predefinedRanges[
        range as keyof typeof predefinedRanges
      ] as (Date | null)[]
    );
  };

  const [selectedDates, setSelectedDates] = React.useState<(Date | null)[]>([]);
  const [currentDate, setCurrentDate] = React.useState(new Date());

  const onSelectDay = (selectedDate: Date) => {
    if (selectedDates.length === 2) {
      setSelectedDates([selectedDate]); // Start new selection if 2 dates are already selected
    } else if (
      selectedDates.length === 1 &&
      selectedDates[0] &&
      selectedDate > selectedDates[0]
    ) {
      setSelectedDates([...selectedDates, selectedDate]); // Add second date for range
    } else {
      setSelectedDates([selectedDate]); // Single date selection or start of a new range
    }
  };

  const handleChangeMonth = (side: string, step: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + (side === "left" ? -step : step));
    setCurrentDate(newDate);
  };

  const previousMonthDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() - 1,
    1
  );

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const updateDateSelection = () => {
    const startDay = selectedDates[0];
    const endDay = selectedDates[1];

    if (!startDay || !endDay) {
      return;
    }

    dispatch(
      setDateRange(startDay?.toString() ?? null, endDay?.toString() ?? null)
    );
    dispatch(updateDefectsByDate())
  };

  return (
    <Box sx={styles.container}>
      <Box sx={styles.calendarAndTreeContainer}>
        <Box sx={styles.tree}>
          <TreeView aria-label="customized" multiSelect>
            {Object.keys(predefinedRanges).map((range) => (
              <TreeItem
                nodeId={range}
                label={range}
                style={{
                  paddingTop: "15%",
                  textAlign: "left",
                }}
              />
            ))}
          </TreeView>
        </Box>
        <Box sx={styles.calendarContainer}>
          {/* New container for stacking date range and calendars */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Box sx={styles.dateRangeBox}>
              {selectedDates[0] && !selectedDates[1] && (
                <Box sx={styles.fakeDateBox}> {"  "}</Box>
              )}
              {!selectedDates[0] && !selectedDates[1] && (
                <Box sx={styles.fakeDateBox}> {"  "}</Box>
              )}
              {selectedDates[0] && selectedDates[1] && (
                <>
                  <Box sx={styles.dateBox}>{formatDate(selectedDates[0])}</Box>
                  <ArrowForwardIcon
                    fontSize="small"
                    style={{
                      margin: "0 15px",
                    }}
                  />
                  <Box sx={styles.dateBox}>{formatDate(selectedDates[1])}</Box>
                </>
              )}
            </Box>

            {/* Calendars Display */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <SimpleCalendar
                selectedDates={selectedDates}
                date={previousMonthDate}
                side="left"
                onSelectDay={onSelectDay}
                onChangeMonth={() => handleChangeMonth("left", 1)}
              />
              <SimpleCalendar
                selectedDates={selectedDates}
                date={currentDate}
                side="right"
                onSelectDay={onSelectDay}
                onChangeMonth={() => handleChangeMonth("right", 1)}
              />
            </Box>
          </Box>
        </Box>
      </Box>

      <Box sx={styles.buttonContainer}>
        <Button
          variant="contained"
          style={{
            ...styles.button,
            backgroundColor: color,
            color: "black",
          }}
          onClick={() => {
            setSelectedDates([]);
            setDateRanges([null, null]);
            setOpenModal(false);
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            updateDateSelection();
            setOpenModal(false);
          }}
          variant="contained"
          color="primary"
          style={styles.button}
        >
          Apply
        </Button>
      </Box>
    </Box>
  );
};

const styles = {
  dateRangeBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "10px",
  },
  dateBox: {
    padding: "10px",
    border: "1px solid lightgrey",
    borderRadius: "5px",
    margin: "5px",
    width: "350px",
  },
  fakeDateBox: {
    padding: "10px",
    borderRadius: "5px",
    width: "350px",
    height: "29px",
  },
  container: {
    display: "flex",
    width: "70vw",
    height: "70vh",
  },
  tree: {
    height: "85%",
    backgroundColor: "white",
    width: "18%",
    borderRight: "0.5px solid gray",
    borderBottom: "0.5px solid gray",
  },
  calendarContainer: {
    height: "85%",
    width: "100%",
    borderBottom: "0.5px solid gray",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  },
  calendarAndTreeContainer: {
    display: "flex",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: "10px",
    position: "absolute",
    bottom: "3%",
    right: "1%",
    width: "100%",
  },
  button: {
    marginRight: "1%",
    width: "10%",
  },
};
