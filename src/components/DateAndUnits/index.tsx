import React from "react";
import { Box, Button, Divider } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Modal from "@mui/material/Modal";
import { CustomDateRangePicker } from "../CustomDatePicker";
import { useSelector } from "react-redux";
import { palette } from "../../theme";
import { parseAsLocalDate } from "../../utils/dateFormatter";

type DateAndUnitsProps = {
  defectCount: number;
  isMobile: boolean;
};

export const DateAndUnits: React.FC<DateAndUnitsProps> = ({
  defectCount,
  isMobile,
}) => {
  const [openModal, setOpenModal] = React.useState(false);

  const { dateRange } = useSelector((state: any) => state.defects);

  const { endDate } = dateRange;

  const endDateObj = parseAsLocalDate(endDate);
  
  const endDateLocal = 
    endDateObj instanceof Date && !isNaN(endDateObj.getTime())
      ? endDateObj.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "Invalid Date";
  
  return (
    <Box
      sx={
        isMobile
          ? style.isMobileDateAndUnitsContainer
          : style.dateAndUnitsContainer
      }
    >
      <Button
        variant="contained"
        startIcon={<CalendarMonthIcon />}
        sx={isMobile ? style.isMobileButton : style.button}
        // on hover
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = "#E5E5E5";
        }}
        onClick={(e) => {
          setOpenModal(true);
        }}
      >
        <p style={{ fontSize: "12px" }}>
          {/* endate to local  */}
          {endDateLocal}
        </p>
      </Button>

      <Box sx={isMobile ? style.isMobileUnitsContainer : style.unitsContainer}>
        <h4 className="container__units-text">Defective Units</h4>
        <p className="container__units-number">You have {defectCount}</p>
      </Box>

      <Divider
        orientation="vertical"
        flexItem
        sx={{
          backgroundColor: palette.blues.light,
          width: "5px",
          height: "60px",
          marginLeft: "1%",
          borderRadius: "50px",
        }}
      />

      {openModal && (
        <Modal
          open={openModal}
          onClose={() => setOpenModal(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style.modalBox}>
            <CustomDateRangePicker
              isMobile={isMobile}
              setOpenModal={setOpenModal}
            />
          </Box>
        </Modal>
      )}
    </Box>
  );
};

const style = {
  unitsContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    marginRight: "0%",
  },
  isMobileUnitsContainer: {
    display: "flex",
    flexDirection: "column",
    textAlign: "right",
    alignItems: "flex-end",
    // not the best fix but will do for now.
    marginRight: "-25%",
  },
  button: {
    backgroundColor: "#F2F2F2",
    padding: "6px 12px",
    color: "black",
    height: "40px",
    width: "auto",
    borderRadius: "20px",
    paddingLeft: "15px",
    marginRight: "3%",
    // no shadow
    boxShadow: "none",
  },
  isMobileButton: {
    backgroundColor: "#F2F2F2",
    color: "black",
    height: "45px",
    borderRadius: "20px",
    boxShadow: "none",
    marginLeft: "3%",
  },
  isMobileDateAndUnitsContainer: {
    display: "flex",
    alignItems: "center",
    flexGrowth: "1",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: "pink",
  },
  dateAndUnitsContainer: {
    display: "flex",
    alignItems: "center",
    flexGrowth: "1",
    justifyContent: "flex-end",
    width: "100%",
    height: "100%",
  },
  modalBox: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    p: 2,
    borderRadius: "20px",
  },
};
