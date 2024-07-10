import * as React from "react"
import Svg, { Defs, Path, G, Use, Mask } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: filter */
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={20}
    height={31.556}
    {...props}
  >
    <Defs>
      <Path
        id="a"
        d="M5.92 30.387c-2.62 0-4.751-2.193-4.751-4.888V9.944a4.86 4.86 0 0 1 1.234-3.251l.004-.004c.623-.695.966-1.6.966-2.547V3.79c0-.286.226-.518.504-.518h12.34c.278 0 .504.232.504.518v.347c0 .95.345 1.857.972 2.554.8.889 1.24 2.046 1.24 3.257V25.5c0 2.695-2.131 4.888-4.752 4.888h-8.26Z"
      />
      <Path id="c" d="M0 0h20v28.444H0z" />
      <Path id="e" d="M0 0h16.444v3.111H0z" />
    </Defs>
    <G fill="none" fillRule="evenodd">
      <Use xlinkHref="#a" fill="#000" />
      <Use xlinkHref="#a" fill="#000" filter="url(#b)" />
      <Use xlinkHref="#a" stroke="#FFF" strokeWidth={2} />
      <G transform="translate(0 3.111)">
        <Mask id="d" fill="#fff">
          <Use xlinkHref="#c" />
        </Mask>
        <Path
          fill="#000"
          d="M18.604 2.621A4.074 4.074 0 0 1 17.512.002a1.166 1.166 0 0 1-.23.023h-.904a5.2 5.2 0 0 0 1.393 3.363 4.076 4.076 0 0 1 1.095 2.783v16.947c0 2.314-1.891 4.197-4.216 4.197h-9.3c-2.324 0-4.216-1.883-4.216-4.197V6.166c0-1.032.387-2.018 1.089-2.776l.004-.004A5.2 5.2 0 0 0 3.613.026h-.895c-.082 0-.162-.01-.239-.026-.037.975-.42 1.9-1.085 2.62l-.004.004A5.199 5.199 0 0 0 0 6.166v16.952c0 2.937 2.4 5.326 5.35 5.326h9.3c2.95 0 5.35-2.389 5.35-5.326V6.171a5.2 5.2 0 0 0-1.396-3.55"
          mask="url(#d)"
        />
      </G>
      <G transform="matrix(-1 0 0 1 18.222 0)">
        <Mask id="f" fill="#fff">
          <Use xlinkHref="#e" />
        </Mask>
        <Path
          fill="#000"
          d="M16.444 1.009v1.093c0 .487-.379.893-.883.988-.072.014-.148.021-.225.021H1.108c-.08 0-.158-.008-.233-.022C.375 2.99 0 2.586 0 2.102V1.01C0 .453.497 0 1.108 0h14.228c.612 0 1.108.453 1.108 1.009"
          mask="url(#f)"
        />
      </G>
    </G>
  </Svg>
)
export default SvgComponent
