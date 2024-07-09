import * as React from "react"
import Svg, { Defs, Path, G, Mask, Use } from "react-native-svg"
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={20}
    height={31.395}
    {...props}
  >
    <Defs>
      <Path id="a" d="M0 0h20v28.14H0z" />
      <Path id="c" d="M0 0h16.512v3.256H0z" />
    </Defs>
    <G fill="none" fillRule="evenodd">
      <G transform="translate(0 3.256)">
        <Mask id="b" fill="#fff">
          <Use xlinkHref="#a" />
        </Mask>
        <Path
          fill="#000"
          d="M18.604 2.593A4.008 4.008 0 0 1 17.512.002a1.178 1.178 0 0 1-.23.023h-.904a5.116 5.116 0 0 0 1.393 3.327 4.008 4.008 0 0 1 1.095 2.753V22.87c0 2.29-1.891 4.153-4.216 4.153h-9.3c-2.324 0-4.216-1.863-4.216-4.153V6.1c0-1.021.387-1.997 1.089-2.746l.004-.004A5.116 5.116 0 0 0 3.613.025h-.895c-.082 0-.162-.009-.239-.025a4.007 4.007 0 0 1-1.085 2.591l-.004.005A5.113 5.113 0 0 0 0 6.1v16.77c0 2.906 2.4 5.27 5.35 5.27h9.3c2.95 0 5.35-2.364 5.35-5.27V6.105a5.114 5.114 0 0 0-1.396-3.512"
          mask="url(#b)"
        />
      </G>
      <G transform="translate(1.628)">
        <Mask id="d" fill="#fff">
          <Use xlinkHref="#c" />
        </Mask>
        <Path
          fill="#000"
          d="M16.512 1.056V2.2c0 .509-.381.935-.887 1.034a1.198 1.198 0 0 1-.226.022H1.113c-.08 0-.16-.008-.235-.024C.378 3.13 0 2.706 0 2.2V1.056C0 .474.5 0 1.113 0h14.286c.614 0 1.113.474 1.113 1.056"
          mask="url(#d)"
        />
      </G>
    </G>
  </Svg>
)
export default SvgComponent
