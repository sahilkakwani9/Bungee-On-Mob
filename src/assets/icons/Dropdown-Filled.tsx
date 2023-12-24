import * as React from "react";
import Svg, { SvgProps, G, Path } from "react-native-svg";
const DropDown = (props: SvgProps) => (
  <Svg fill={props.color} viewBox="-6.5 0 32 32" {...props}>
    <G id="SVGRepo_bgCarrier" strokeWidth={0} />
    <G
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <G id="SVGRepo_iconCarrier">
      <Path d="M18.813 11.406l-7.906 9.906c-0.75 0.906-1.906 0.906-2.625 0l-7.906-9.906c-0.75-0.938-0.375-1.656 0.781-1.656h16.875c1.188 0 1.531 0.719 0.781 1.656z" />
    </G>
  </Svg>
);
export default DropDown;
