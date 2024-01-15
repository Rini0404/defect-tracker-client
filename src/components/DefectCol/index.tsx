import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { DefectType, defectCategoryMapping, DefectCategory } from "../../types";
import { palette } from "../../theme";

const getColorForDefectType = (defectType: DefectType) => {
  for (const [category, types] of Object.entries(defectCategoryMapping)) {
    if (types.includes(defectType)) {
      switch (category) {
        case DefectCategory.HumanError:
          return palette.pastel.red
        case DefectCategory.MachineError:
          return palette.pastel.orange
        case DefectCategory.ManufacturerError:
          return palette.pastel.purple
        default:
          return "none";
      }
    }
  }
  return "none";
};

const formatDefectType = (defectType: string) => {
  // Split the string at each uppercase letter and join with a space
  return defectType.replace(/([A-Z])/g, " $1").trim();
};

export const DefectColumn: React.FC = () => {
  return (
    <TableContainer component={Paper} 
    className="DefectColumn">
      <Table aria-label="defect table">
        <TableHead>
          <TableRow
            style={{
              backgroundColor: palette.greys.light,
              color: "black",
              fontWeight: "bold",
            }}
          >
            <TableCell>Defect Type</TableCell>
            <TableCell align="right">Quantity</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.values(DefectType).map((defectType, index) => (
            <TableRow
              key={index}
              style={{ backgroundColor: getColorForDefectType(defectType) }}
            >
              <TableCell component="th" scope="row">
                {formatDefectType(defectType)}
              </TableCell>
              <TableCell align="right">0</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
