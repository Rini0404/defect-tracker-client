import React from "react";

const defectCategoriesArray = ["Human Error", "Machine Error", "MFG Error"];

export const ThreeCategoryButtons: React.FC = () => {
  return (
    <div className="ThreeCategoryButtons">
      {defectCategoriesArray.map((category) => (
        <div key={category} className="ThreeCategoryButtons__button">
          <p className="ThreeCategoryButtons__button__text">{category}</p>
        </div>
      ))}
    </div>
  );
};
