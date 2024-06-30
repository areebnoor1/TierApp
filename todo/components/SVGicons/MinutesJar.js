import * as React from "react";
import Svg, {
  Defs,
  RadialGradient,
  Stop,
  G,
  Path,
  Text,
  TSpan,
} from "react-native-svg";
const SvgComponent = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={97} height={155} {...props}>
    <Defs>
      <RadialGradient
        id="a"
        cx="74.681%"
        cy="28.317%"
        r="164.07%"
        fx="74.681%"
        fy="28.317%"
        gradientTransform="matrix(-.0899 .73182 -.99993 -.06632 1.097 -.245)"
      >
        <Stop offset="0%" stopColor="#380933" />
        <Stop offset="100%" />
      </RadialGradient>
      <RadialGradient
        id="b"
        cx="56.746%"
        cy="-36.412%"
        r="139.574%"
        fx="56.746%"
        fy="-36.412%"
        gradientTransform="matrix(-.10567 .86032 -.17834 -.50976 .563 -1.038)"
      >
        <Stop offset="0%" stopColor="#380933" />
        <Stop offset="0%" stopColor="#350930" />
        <Stop offset="100%" />
      </RadialGradient>
    </Defs>
    <G fill="none" fillRule="evenodd">
      <Path
        fill="url(#a)"
        d="M90.314 30.688a20.486 20.486 0 0 1-4.57-7.682c-.464.057-.937.087-1.418.087H12.674c-.494 0-.98-.031-1.456-.093a20.476 20.476 0 0 1-4.555 7.687l-.01.01C2.364 35.274 0 41.222 0 47.445v82.363C0 143.698 11.495 155 25.624 155h45.752C85.505 155 97 143.698 97 129.807V47.47c0-6.242-2.374-12.2-6.686-16.78"
      />
      <Path
        fill="url(#b)"
        d="M89 11.488c0 2.895-2.247 5.275-5.093 5.494a5.003 5.003 0 0 1-.432.018h-70.95c-.16 0-.32-.007-.477-.02C9.224 16.737 7 14.367 7 11.487V5.512C7 2.474 9.478 0 12.525 0h70.95C86.521 0 89 2.474 89 5.512v5.976Z"
      />
      <Text fill="#FFF" fontFamily="Helvetica" fontSize={21}>
        <TSpan x={11.235} y={86}>
          {"Minutes"}
        </TSpan>
      </Text>
      <Path
        fill="#000"
        d="M90.314 30.688a20.486 20.486 0 0 1-4.57-7.682c-.464.057-.937.087-1.418.087H12.674c-.494 0-.98-.031-1.456-.093a20.476 20.476 0 0 1-4.555 7.687l-.01.01C2.364 35.274 0 41.222 0 47.445v82.363C0 143.698 11.495 155 25.624 155h45.752C85.505 155 97 143.698 97 129.807V47.47c0-6.242-2.374-12.2-6.686-16.78M89 11.488c0 2.895-2.247 5.275-5.093 5.494a5.003 5.003 0 0 1-.432.018h-70.95c-.16 0-.32-.007-.477-.02C9.224 16.737 7 14.367 7 11.487V5.512C7 2.474 9.478 0 12.525 0h70.95C86.521 0 89 2.474 89 5.512v5.976Z"
      />
      <Text fill="#FFF" fontFamily="Helvetica" fontSize={21}>
        <TSpan x={11.235} y={86}>
          {"Minutes"}
        </TSpan>
      </Text>
      <Text fill="#FFF" fontFamily="Helvetica" fontSize={21}>
        <TSpan x={11.235} y={86}>
          {"Minutes"}
        </TSpan>
      </Text>
      <Text fill="#FFF" fontFamily="Helvetica" fontSize={21}>
        <TSpan x={11.235} y={86}>
          {"Minutes"}
        </TSpan>
      </Text>
    </G>
  </Svg>
);
export default SvgComponent;
