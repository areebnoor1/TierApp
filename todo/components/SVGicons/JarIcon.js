// Updated JarIcon component
import * as React from "react";
import Svg, { Path } from "react-native-svg";

const JarIcon = ({ isActive, ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    style={{
      enableBackground: "new 0 0 64 64",
    }}
    viewBox="0 0 64 64"
    {...props}
  >
    <Path
      d="M32 9.416c9.147 0 14.763-2.015 14.763-3.459C46.763 4.514 41.147 2.5 32 2.5S17.237 4.514 17.237 5.957c0 1.444 5.616 3.46 14.763 3.46zM50.125 23.876c-.524-2.772-1.558-3.91-2.654-5.115-.406-.445-.825-.906-1.226-1.455-.778-1.065-.546-2.646-.32-4.173l.054-.38c-2.806 1.517-8.507 2.322-13.98 2.322-5.471 0-11.173-.805-13.979-2.323l.055.384c.225 1.526.458 3.105-.32 4.17-.4.55-.82 1.01-1.226 1.456-1.096 1.204-2.131 2.342-2.655 5.114-1.625 8.59-2.218 28.91 1.265 33.049 2.482 2.95 6.196 4.737 16.852 4.563 10.721.174 14.387-1.613 16.87-4.563 3.484-4.142 2.89-24.46 1.264-33.049z"
      fill={isActive ? "#CCCCCC" : "#000000"} // Adjust fill color or opacity based on isActive state
    />
    <Path
      d="M32 14.075c9.147 0 14.763-2.013 14.763-3.458V7.591C44.377 9.434 38.046 10.416 32 10.416s-12.377-.982-14.763-2.825v3.026c0 1.445 5.616 3.458 14.763 3.458z"
      fill={isActive ? "#CCCCCC" : "#000000"} // Adjust fill color or opacity based on isActive state
    />
  </Svg>
);

export default JarIcon;
