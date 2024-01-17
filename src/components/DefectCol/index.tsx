import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  DefectType,
  DefectCategory,
  DefectTypeData,
} from "../../types";
import { palette } from "../../theme";
import { useSelector } from "react-redux";
import { getColorForDefectType } from "../../utils/colorOutput";
import { formatDefectType } from "../../utils/defectTypeTextFromat";


export const DefectColumn: React.FC = () => {

  const { organizedDefects } = useSelector((state: any) => state.defects);

  if (!organizedDefects) return null;

  // Function to count defects
  const countDefects = (defectType: DefectType) => {
    let count = 0;
    for (const category of Object.keys(organizedDefects) as DefectCategory[]) {
      const categoryData: DefectTypeData | undefined = organizedDefects[category];
      if (categoryData) {
        const defectsArray = categoryData[defectType];
        if (defectsArray) {
          count += defectsArray.length;
        }
      }
    }
    return count;
  };

  return (
    <TableContainer className="DefectColumn">
      <Table aria-label="defect table">
        <TableHead>
          <TableRow
            style={{
              backgroundColor: palette.greys.light,
              color: "black",
              fontWeight: "bold",
            }}
          >
            <TableCell
              style={{
                color: "black",
                fontWeight: "bold",
              }}
            >
              Defect Type
            </TableCell>
            <TableCell
              style={{
                color: "black",
                fontWeight: "bold",
              }}
              align="right"
            >
              Quantity
            </TableCell>
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
              <TableCell align="right">{countDefects(defectType)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
