import React from "react";
import { ThreeCategoryButtons } from "../CategoryButtons";
import { DateAndUnits } from "../DateAndUnits";

type HeaderProps = {
  defectCount: number
};



export const Header: React.FC<HeaderProps> = ({
  defectCount,
}) => {
  return (
    <div className="Header">
      <ThreeCategoryButtons />
      <DateAndUnits defectCount={defectCount} />
    </div>
  );
};