import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Label } from "recharts";
import { Box } from "@mui/material";
import {
  DefectCategory,
  DefectJsonTypesForChart,
  DefectType,
  defectCategoryMapping,
} from "../../types";
import { renderCustomizedLabel } from "../CustomLineLabels";
import Logo from "../../imgs/logo.png";

const COLOR_SHADES: { [key: string]: string[] } = {
  MachineError: [
    "#FFA500",
    "#E59400",
    "#CC8400",
    "#B27300",
    "#996300",
    "#7F5200",
  ], // Shades of orange
  HumanError: [
    "#FF0000",
    "#E60000",
    "#CC0000",
    "#B30000",
    "#990000",
    "#800000",
    "#660000",
    "#4D0000",
    "#330000",
    "#1A0000",
    "#1A0000",
  ], // Shades of red
  ManufacturerError: [
    "#800080",
    "#730073",
    "#660066",
    "#590059",
    "#4C004C",
    "#3F003F",
  ], // Shades of purple
};

export const MainPieChart: React.FC<{ defects: DefectJsonTypesForChart }> = ({
  defects,
}) => {
  const [chartSize, setChartSize] = useState({ width: 300, height: 300 });
  const [radius, setRadius] = useState(250);

  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    function handleResize() {
      // Adjust size based on the window width
      if (window.innerWidth < 768) {
        setIsMobile(true);
        // Example breakpoint for mobile devices
        setChartSize({ width: 600, height: 400 }); // Smaller size for mobile
        setRadius(150);
      } else {
        setIsMobile(false);
        setChartSize({ width: 1000, height: 600 }); // Larger size for desktop
        setRadius(250);
      }
    }

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial size adjustment

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  let totalDefects = 0;
  Object.values(defects).forEach((category) => {
    Object.values(category).forEach((defectArray) => {
      totalDefects += defectArray.length;
    });
  });

  const data: any = [];

  Object.entries(defects).forEach(([categoryKey, defectTypes]) => {
    const category = categoryKey as DefectCategory;
    defectCategoryMapping[category].forEach((defectTypeKey) => {
      const defectType = defectTypeKey as DefectType;
      const count = defectTypes[defectType]?.length || 0;
      const percentage = parseFloat(((count / totalDefects) * 100).toFixed(2));
      if (percentage > 0) {
        data.push({
          name: defectType,
          value: percentage,
          category,
        });
      }
    });
  });

  const colorUsageCount: { [key: string]: number } = {};

  Object.keys(COLOR_SHADES).forEach((category) => {
    colorUsageCount[category] = 0;
  });

  const getFillColor = (category: string | number, count: number) => {
    const colorIndex = count % COLOR_SHADES[category].length;
    return COLOR_SHADES[category][colorIndex];
  };

  // Generate legend items
  const legendItems = data.map((entry: { category: string | number }) => {
    const fillColor = getFillColor(
      entry.category,
      colorUsageCount[entry.category]
    );
    colorUsageCount[entry.category] += 1;
    return { ...entry, fillColor };
  });

  Object.keys(COLOR_SHADES).forEach((category) => {
    colorUsageCount[category] = 0;
  });

  if (data.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          width: "100vw",
        }}
      >
        <Box sx={{ fontSize: 30 }}>No Defects</Box>
      </Box>
    );
  }

  const CustomCenteredLabel = ({ viewBox }: any) => {
    const { cx, cy } = viewBox;
  
    return (
      <foreignObject x={cx - 50} y={cy - 50} width={100} height={100}>
        <div style={{ borderRadius: '50%', overflow: 'hidden', width: '100%', height: '100%' }}>
          <img src={Logo} alt="Logo" style={{ width: '100%', height: '100%' }} />
        </div>
      </foreignObject>
    );
  };
  
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        marginTop: "3.5%",
      }}
    >
      {isMobile && (
        <Box
          sx={{
            width: "90%",
            padding: 2,
          }}
        >
          {legendItems.map(
            (
              item: {
                fillColor: any;
                name:
                  | string
                  | number
                  | boolean
                  | React.ReactElement<
                      any,
                      string | React.JSXElementConstructor<any>
                    >
                  | Iterable<React.ReactNode>
                  | React.ReactPortal
                  | null
                  | undefined;
                value: any;
              },
              index: React.Key | null | undefined
            ) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  margin: "5px",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Box
                    sx={{
                      width: 20,
                      height: 20,
                      backgroundColor: item.fillColor,
                      marginRight: 1,
                    }}
                  ></Box>
                  <Box>{item.name}</Box>
                </Box>
                <Box>{`${item.value}%`}</Box>
              </Box>
            )
          )}
        </Box>
      )}
      <PieChart width={chartSize.width} height={chartSize.height}>
        <Pie
          dataKey="value"
          isAnimationActive={false}
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={radius}
          innerRadius={40}
          labelLine={false}
          label={isMobile ? false : renderCustomizedLabel}
        >
          {data.map((entry: { category: any }, index: any) => {
            const category = entry.category;
            colorUsageCount[category] = colorUsageCount[category] || 0;
            const fillColor =
              COLOR_SHADES[category][
                colorUsageCount[category] % COLOR_SHADES[category].length
              ];
            colorUsageCount[category] += 1;

            return <Cell key={`cell-${index}`} fill={fillColor} />;
          })}
          <Label content={<CustomCenteredLabel />} position="center" />
        </Pie>
        <Tooltip />
      </PieChart>
    </Box>
  );
};

export default MainPieChart;
