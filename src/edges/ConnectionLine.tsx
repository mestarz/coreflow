import { useConnection, getBezierPath } from '@xyflow/react';

type ConnectionLineProps = {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
};

export function ConnectionLine({ fromX, fromY, toX, toY }: ConnectionLineProps) {
  const { fromHandle } = useConnection();
  const strokeColor = fromHandle?.id || 'red';
  
  return (
    <g>
      <path
        fill="none"
        stroke={strokeColor}
        strokeWidth={1.5}
        className="animated"
        d={`M${fromX},${fromY} C ${fromX} ${toY} ${fromX} ${toY} ${toX},${toY}`}
      />
      <circle
        cx={toX}
        cy={toY}
        fill="#fff"
        r={3}
        stroke={strokeColor}
        strokeWidth={1.5}
      />
    </g>
  );
};
