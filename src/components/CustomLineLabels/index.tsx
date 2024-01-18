export const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  outerRadius,
  fill,
  name,
  value,
}: {
  cx: number;
  cy: number;
  midAngle: number;
  outerRadius: number;
  fill: string;
  name: string;
  value: number;
}) => {
  const RADIAN = Math.PI / 180;
  const adjustedAngle = midAngle; // Adjust this based on your chart's orientation

  // Calculate new radius for dot placement
  let newRadius = outerRadius * .82 ; // Slightly outside the pie chart
  if (adjustedAngle > 80 && adjustedAngle < 100) {
    newRadius += 20; // Push dots further for top slices
  } else if (adjustedAngle > 260 && adjustedAngle < 280) {
    newRadius += 20; // Push dots further for bottom slices
  }

  // Calculate new position using polar coordinates
  const ex = cx + newRadius * Math.cos(-RADIAN * adjustedAngle);
  const ey = cy + newRadius * Math.sin(-RADIAN * adjustedAngle);

  const lineLength = 250;
  const textOffset = 20;
  const lineEndX = Math.cos(-RADIAN * adjustedAngle) >= 0 ? cx + lineLength : cx - lineLength;
  const textX = Math.cos(-RADIAN * adjustedAngle) >= 0 ? lineEndX + textOffset : lineEndX - textOffset;
  const textAnchor = Math.cos(-RADIAN * adjustedAngle) >= 0 ? "start" : "end";

  return (
    <g>
      <circle cx={ex} cy={ey} r={5} fill="white" />
      <path d={`M${ex},${ey} L${lineEndX},${ey}`} stroke="blue" fill="none" />
      <text
        x={textX}
        y={ey}
        textAnchor={textAnchor}
        fontSize={12}
        dominantBaseline="central"
      >
        <tspan style={{ fontWeight: "bold" }}>{`${name}: `}</tspan>
        <tspan>{`${value}%`}</tspan>
      </text>
    </g>
  );
};
