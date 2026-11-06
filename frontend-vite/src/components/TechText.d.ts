import type { CSSProperties, FC } from "react";

declare const TechText: FC<{
  text: string;
  fontSize?: number;
  letterSpacing?: number;
  align?: "left" | "center" | "right";
  accentColor?: string;
  sweepIndex?: number;
  sweepCount?: number;
  className?: string;
  style?: CSSProperties;
}>;

export default TechText;
