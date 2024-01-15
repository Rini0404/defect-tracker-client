import { Button } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

type DateAndUnitsProps = {
  defectCount: number;
};

export const DateAndUnits: React.FC<DateAndUnitsProps> = ({ defectCount }) => {
  console.log("defectCount", defectCount);
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
          marginRight: "10px",
          // no shadow 
          boxShadow: "none",
        }}
        // on hover 
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = "#E5E5E5";
        }}
      >
        <p style={{ fontSize: "12px" }}>
          {new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>
      </Button>

      <div className="container__units">
        <h4 className="container__units-text">Defective Units</h4>
        <p className="container__units-number">You have {defectCount}</p>
      </div>

      
    </div>
  );
};
