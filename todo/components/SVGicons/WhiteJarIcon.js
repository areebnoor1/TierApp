import * as React from "react";
import Svg, { Defs, Path, G, Mask, Use } from "react-native-svg";
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={71}
    height={113}
    {...props}
  >
    <Defs>
      <Path id="a" d="M0 0h71v101H0z" />
      <Path id="c" d="M0 0h60v12H0z" />
    </Defs>
    <G fill="none" fillRule="evenodd">
      <G transform="translate(0 12)">
        <Mask id="b" fill="#fff">
          <Use xlinkHref="#a" />
        </Mask>
        <Path
          fill="#000"
          d="M66.043 9.308A14.467 14.467 0 0 1 62.169.007a4.14 4.14 0 0 1-.818.082h-3.21a18.466 18.466 0 0 0 4.947 11.942 14.473 14.473 0 0 1 3.886 9.881v60.176c0 8.217-6.714 14.903-14.967 14.903H18.993c-8.252 0-14.967-6.686-14.967-14.903V21.894a14.47 14.47 0 0 1 3.864-9.856l.014-.015A18.468 18.468 0 0 0 12.827.089H9.65C9.358.09 9.074.06 8.8 0a14.462 14.462 0 0 1-3.853 9.3l-.013.016A18.462 18.462 0 0 0 0 21.894v60.194C0 92.516 8.52 101 18.993 101h33.014C62.48 101 71 92.516 71 82.088V21.912c0-4.687-1.76-9.163-4.957-12.604"
          mask="url(#b)"
        />
      </G>
      <G transform="translate(5)">
        <Mask id="d" fill="#fff">
          <Use xlinkHref="#c" />
        </Mask>
        <Path
          fill="#000"
          d="M60 3.891v4.218c0 1.875-1.385 3.444-3.222 3.811-.265.052-.54.08-.82.08H4.042c-.292 0-.577-.03-.851-.087C1.37 11.536 0 9.973 0 8.11V3.89C0 1.746 1.814 0 4.043 0h51.914C58.187 0 60 1.746 60 3.89"
          mask="url(#d)"
        />
      </G>
    </G>
  </Svg>
);
export default SvgComponent;
