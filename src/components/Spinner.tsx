import React, {CSSProperties} from "react";

interface IProps {
  size?: "small" | "medium" | "large";
  style?: CSSProperties;
}

export default function Spinner({size = "medium", style}: IProps) {
  const sizeMap = {
    small: 0.15,
    medium: 0.4,
    large: 0.8,
  };

  return (
    <div className='loader' style={{transform: `scale(${sizeMap[size]})`, ...style}}>
      Loading...
    </div>
  );
}
