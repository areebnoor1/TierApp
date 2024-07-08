import * as React from "react";
import Svg, { Defs, Path, G, Mask, Polygon, Use } from "react-native-svg";
import { View } from "react-native";
import LottieView from "lottie-react-native";

const SvgComponent = (props) => (
  <View style={{ position: "relative", width: 71, height: 113 }}>
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={71}
      height={113}
      style={{ position: "absolute", zIndex: 1 }}
      {...props}
    >
      <Defs>
        <Polygon id="path-05lsy-q7hz-1" points="0 0 71 0 71 101 0 101" />
        <Polygon id="path-05lsy-q7hz-3" points="0 0 60 0 60 12 0 12" />
        <Mask id="mask" x="0" y="0" width="71" height="113">
          <Polygon
            points="8.56403161 172 54.8160807 172.088375 58.015399 172.088375 61.4435323 183.571202 67.2620765 190.875649 67.2620765 258.619405 61.4435323 268.447249 48.7013805 272 14.1366925 272 4.86997313 267.273081 -1.14491749e-13 258.619405 -3.41865425e-13 195.467444 3 186.633976 7.22345121 181.151895"
            transform="translate(0, -171.4992)" // Adjust the transform to fit the viewBox
            fill="white"
          />
        </Mask>
      </Defs>
      <G fill="none" fillRule="evenodd">
        <G transform="translate(0, 12)">
          <Mask id="mask-05lsy-q7hz-2" fill="white">
            <Use xlinkHref="#path-05lsy-q7hz-1" />
          </Mask>
          <Path
            d="M66.0429107,9.30794755 C63.6685409,6.75316915 62.3057386,3.4698644 62.1688314,0.00696876533 C61.9050774,0.0601056009 61.631263,0.0891421231 61.3514708,0.0891421231 L58.1416611,0.0891421231 C58.2997094,4.53419812 60.0420318,8.75262407 63.0878153,12.0309926 C65.5939893,14.72805 66.9739961,18.2369685 66.9739961,21.9122663 L66.9739961,82.0875549 C66.9739961,90.3048907 60.2604417,96.9909855 52.0069368,96.9909855 L18.9930632,96.9909855 C10.7405789,96.9909855 4.02600392,90.3048907 4.02600392,82.0875549 L4.02600392,21.8942636 C4.02600392,18.2299997 5.40003286,14.7270337 7.8901687,12.0381066 L7.9041656,12.0230076 C10.9388683,8.74463902 12.6730258,4.52911673 12.8271375,0.0891421231 L9.64852916,0.0891421231 C9.35765609,0.0891421231 9.07378148,0.058218227 8.80098775,0 C8.67020422,3.46173418 7.3123592,6.74823294 4.94804965,9.30083361 L4.93492756,9.3159326 C1.75238261,12.7526954 0,17.2196739 0,21.8942636 L0,82.0875549 C0,92.5158767 8.52017496,101.000058 18.9930632,101.000058 L52.0069368,101.000058 C62.479825,101.000058 71,92.5158767 71,82.0875549 L71,21.9122663 C71,17.2247553 69.2395983,12.7486303 66.0429107,9.30794755"
            id="Fill-1"
            fill="#000000"
            fillRule="nonzero"
            mask="url(#mask-05lsy-q7hz-2)"
          />
        </G>
        <G transform="translate(5, 0)">
          <Mask id="mask-05lsy-q7hz-4" fill="white">
            <Use xlinkHref="#path-05lsy-q7hz-3" />
          </Mask>
          <Path
            d="M60,3.89100073 L60,8.10888655 C60,9.98441056 58.6153655,11.5534534 56.7780676,11.9201035 C56.5132332,11.9716769 56.2382973,12 55.9573591,12 L4.04264093,12 C3.75057644,12 3.46553907,11.9698451 3.19162797,11.9133398 C1.3704339,11.5359804 0,9.97370133 0,8.10888655 L0,3.89100073 C0,1.74605508 1.81416696,-0.000112728716 4.04264093,-0.000112728716 L55.9573591,-0.000112728716 C58.1868578,-0.000112728716 60,1.74605508 60,3.89100073"
            id="Fill-4"
            fill="#000000"
            fillRule="nonzero"
            mask="url(#mask-05lsy-q7hz-4)"
          />
        </G>
      </G>
    </Svg>
    <View
      style={{
        width: 71,
        height: 113,
        position: "absolute",
        zIndex: 0,
        overflow: "hidden",
      }}
    >
      <LottieView
        source={require("../../assets/HoursJarAnimation")}
        progress={props.progress}
        style={{
          width: 71,
          height: 108,
          marginTop: 12,
        }}
      />
      <Svg
        width="68.2620765px"
        height="101.000826px"
        viewBox="0 0 68.2620765 101.000826"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        <G
          id="Page-1"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <G
            id="Hours-Jar"
            transform="translate(0.5, -171.4992)"
            fill="#9D6AF0"
            stroke="#979797"
          >
            <Polygon
              id="Path"
              points="8.56403161 172 54.8160807 172.088375 58.015399 172.088375 61.4435323 183.571202 67.2620765 190.875649 67.2620765 258.619405 61.4435323 268.447249 48.7013805 272 14.1366925 272 4.86997313 267.273081 0 258.619405 0 195.467444 3 186.633976 7.22345121 181.151895"
              transform="translate(0, 171.4992)"
            />
          </G>
        </G>
      </Svg>
    </View>
  </View>
);

export default SvgComponent;
