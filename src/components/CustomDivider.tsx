import { Divider } from "react-native-paper";
import { StyleProp, ViewStyle } from "react-native/types";

export type CustomDividerProps = {
  style: StyleProp<ViewStyle>;
  bold?: boolean;
};

export const CustomDivider = ({
  style = {},
  bold = false,
}: CustomDividerProps) => <Divider style={style} bold={bold} />;
