import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={269}
    height={1}
    fill="none"
    {...props}
  >
    <Path stroke="#000" d="M0 .5h269" />
  </Svg>
)
export default SvgComponent
