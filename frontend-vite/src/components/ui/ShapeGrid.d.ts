import type { CSSProperties, FC } from "react";

declare const ShapeGrid: FC<{
  lineColor?: string;
  hoverColor?: string;
  speed?: number;
  direction?: "right" | "left" | "up" | "down" | "diagonal" | "none";
  fade?: number;
  cellSize?: number;
  calendar?: boolean;
  className?: string;
  style?: CSSProperties;
}>;

export default ShapeGrid;
