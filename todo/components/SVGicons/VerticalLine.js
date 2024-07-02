import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={277}
    height={1}
    fill="none"
    {...props}
  >
    <Path stroke="#D9D9D9" d="M0 .5h277" />
  </Svg>
)
export default SvgComponent
