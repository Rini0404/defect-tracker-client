import React from "react";
import { Box, Button } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Modal from "@mui/material/Modal";
import { CustomDateRangePicker } from "../CustomDatePicker";
import { useSelector } from "react-redux";

type DateAndUnitsProps = {
  defectCount: number;
};

export const DateAndUnits: React.FC<DateAndUnitsProps> = ({ defectCount }) => {
  const [openModal, setOpenModal] = React.useState(false);

  const { dateRange } = useSelector((state: any) => state.defects);

  const { endDate } = dateRange;

  const endDateObj = new Date(endDate);

  const endDateLocal =
    endDateObj instanceof Date && !isNaN(endDateObj.getTime())
      ? endDateObj.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "Invalid Date";

  return (
    <div className="Header__button-container">
      <Button
        variant="contained"
        startIcon={<CalendarMonthIcon />}
        sx={{
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
        }}
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

      <div className="container__units">
        <h4 className="container__units-text">Defective Units</h4>
        <p className="container__units-number">You have {defectCount}</p>
      </div>

      {openModal && (
        <Modal
          open={openModal}
          onClose={() => setOpenModal(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <CustomDateRangePicker setOpenModal={setOpenModal} />
          </Box>
        </Modal>
      )}
    </div>
  );
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  p: 2,
  borderRadius: "20px",
};
