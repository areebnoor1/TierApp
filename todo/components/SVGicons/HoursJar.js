import * as React from "react";
import Svg, { G, Path, Text, TSpan } from "react-native-svg";
import {
  StyleSheet,
  View,
  Pressable,
  Image,
  Modal,
  TouchableOpacity,
} from "react-native";
import LottieView from 'lottie-react-native';

const HoursJar = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={90}
    height={143.814}
    {...props}
  >
    <G fill="none" fillRule="evenodd">
      <Path
        fill="#000"
        d="M83.797 28.474a19.007 19.007 0 0 1-4.24-7.129c-.431.054-.87.082-1.316.082H11.759c-.458 0-.908-.03-1.35-.087a18.999 18.999 0 0 1-4.227 7.132l-.009.01C2.193 32.727 0 38.246 0 44.02v76.42c0 12.888 10.666 23.374 23.775 23.374h42.45c13.11 0 23.775-10.486 23.775-23.374V44.043c0-5.79-2.203-11.32-6.203-15.57M82.577 10.659c0 2.686-2.085 4.894-4.725 5.098a4.642 4.642 0 0 1-.4.016h-65.83a5.05 5.05 0 0 1-.443-.02c-2.62-.223-4.684-2.422-4.684-5.094V5.115C6.495 2.295 8.794 0 11.62 0h65.83c2.826 0 5.126 2.295 5.126 5.115v5.544Z"
      />



      <View styles={{

      }}>
        <LottieView
          source={require('../../assets/hours.json')}

          progress={props.progress}

          style={{
            width: 120,
            marginLeft: -15,
            height: 100,

            // borderRadius: 30,
            //  position: 'relative',
            //backgroundColor: 'rgba(0, 255, 0, 0.1)' ,
             opacity: 0.5,
            marginTop: 35,

            //flex: 1,
            //aspectRatio: 0.25,
            //resizeMode: 'contain',
          }}
        ></LottieView>
      </View>



      <Text
        fill="#FFF"
        fontFamily="AppleSDGothicNeo-Regular, Apple SD Gothic Neo"
        fontSize={18}
        textAnchor="middle"
      >
        <TSpan x="45" y="80.335">
          {"Hours"}
        </TSpan>
      </Text>
    </G>
  </Svg>
);

export default HoursJar;
