import {
  View,
  Text,
  Pressable,
  PressableProps,
  StyleProp,
  TextStyle,
  ViewStyle,
} from "react-native";
import React from "react";
import { colors } from "../styles";
import LoadingSpinner from "../vectors/LoadingSpinner";

interface ButtonProps extends PressableProps {
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  label?: string;
  loading?: boolean;
}
export default function Button({
  style,
  textStyle,
  disabled,
  label,
  loading,
  ...props
}: ButtonProps) {
  return (
    <Pressable
      style={[
        {
          backgroundColor: disabled || loading ? "#2a5ff1c5" : colors.brandBlue,
          flexDirection: "row",
          gap: 6,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 8,
          height: 62,
        },
        style,
      ]}
      {...props}
      disabled={loading || disabled}
    >
      <Text
        style={[
          {
            fontSize: 24,
            fontFamily: "Kanit_500Medium",
            color: "white",
          },
          textStyle,
        ]}
      >
        {label}
      </Text>
      {loading && <LoadingSpinner />}
    </Pressable>
  );
}
