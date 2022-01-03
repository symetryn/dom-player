import React from "react";

interface color {
  r: number;
  g: number;
  b: number;
  a: number;
}

interface Props {
  resolution: number;
  color: color;
}

const Pixel: React.FC<Props> = ({ color, resolution, ...props }) => {
  return (
    <div
      {...props}
      style={{
        height: resolution,
        width: resolution,
        backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
      }}
    ></div>
  );
};

export default React.memo(
  Pixel,
  (prev, next) => prev.color.a == next.color.a && prev.color.r == next.color.r
);
