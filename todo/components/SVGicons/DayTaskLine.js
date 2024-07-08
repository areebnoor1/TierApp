import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={197}
    height={1}
    fill="none"
    {...props}
  >
    <Path stroke="#001C66" d="M0 .5h197" />
  </Svg>
)
export default SvgComponent
