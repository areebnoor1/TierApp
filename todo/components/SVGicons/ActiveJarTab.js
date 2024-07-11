import * as React from "react"
import Svg, { Defs, Path, G, Mask, Use } from "react-native-svg"
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={40}
    height={41}
    {...props}
  >
    <Defs>
      <Path id="a" d="M0 0h18.667v25.778H0z" />
      <Path id="c" d="M0 0h15.778v3.333H0z" />
    </Defs>
    <G fill="none" fillRule="evenodd">
      <Path fill="#FFF" d="M0 0h40v41H0z" />
      <Path
        fill="#333"
        d="M20.745 25.7a2.836 2.836 0 0 0 1.434-.928 3.74 3.74 0 0 0 .821-1.76.558.558 0 0 1 .646-.448.55.55 0 0 1 .457.633 4.842 4.842 0 0 1-1.066 2.28 3.936 3.936 0 0 1-1.996 1.281.558.558 0 0 1-.688-.384.548.548 0 0 1 .392-.674"
      />
      <G transform="matrix(-1 0 0 1 29.667 9.222)">
        <Mask id="b" fill="#fff">
          <Use xlinkHref="#a" />
        </Mask>
        <Path
          fill="#000"
          d="M16.5.001c-.089.011-.18.017-.272.017H2.439c-.095 0-.188-.006-.28-.018a4.012 4.012 0 0 1-.877 1.501l-.002.002A4.805 4.805 0 0 0 0 4.773v16.085c0 2.713 2.212 4.92 4.931 4.92h8.805c2.719 0 4.93-2.207 4.93-4.92V4.778a4.805 4.805 0 0 0-1.286-3.277 4.013 4.013 0 0 1-.88-1.5Z"
          mask="url(#b)"
        />
      </G>
      <G transform="matrix(-1 0 0 1 28.333 5)">
        <Mask id="d" fill="#fff">
          <Use xlinkHref="#c" />
        </Mask>
        <Path
          fill="#000"
          d="M15.778 2.252a1.075 1.075 0 0 1-1.063 1.081H1.063A1.075 1.075 0 0 1 0 2.253V1.08C0 .485.477 0 1.063 0h13.652c.586 0 1.063.485 1.063 1.08v1.172Z"
          mask="url(#d)"
        />
      </G>
    </G>
  </Svg>
)
export default SvgComponent
