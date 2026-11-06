import type { CSSProperties, FC } from "react";

declare const ShapeGrid: FC<{
  lineColor?: string;
  hoverColor?: string;
  speed?: number;
  fade?: number;
  className?: string;
  style?: CSSProperties;
}>;

export default ShapeGrid;
