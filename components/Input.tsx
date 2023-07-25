import {
  View,
  Text,
  ViewProps,
  StyleProp,
  TextStyle,
  TextInput,
  TextInputProps,
  ViewStyle,
} from "react-native";
import React, { useState } from "react";
import { colors } from "../styles";
import { Feather } from "@expo/vector-icons";

interface InputProps extends TextInputProps {
  isPassword?: boolean;
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  error?: string;
}

export default function Input({
  label,
  style,
  labelStyle,
  inputStyle,
  isPassword,
  error,
  ...props
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View style={[{ position: "relative" }, style]}>
      {label && (
        <Text
          style={[
            {
              fontFamily: "Kanit_400Regular",
              color: colors.black,
              fontSize: 18,
              marginBottom: 14,
            },
            labelStyle,
          ]}
        >
          {label}
        </Text>
      )}
      <TextInput
        style={[
          {
            borderColor: error ? "red" : colors.grey,
            borderWidth: 1,
            borderRadius: 8,
            padding: 16,
            fontSize: 16,
            fontFamily: "JosefinSans_500Medium",
            color: "black",
          },
          inputStyle,
        ]}
        {...(isPassword
          ? {
              autoCapitalize: "none",
              autoCorrect: false,
              secureTextEntry: !showPassword,
              textContentType: "password",
            }
          : {})}
        {...props}
      />
      {isPassword && (
        <Feather
          style={{
            position: "absolute",
            bottom: error ? 41 : 18,
            right: 16,
          }}
          name={showPassword ? "eye" : "eye-off"}
          size={24}
          color="#292D32"
          onPress={() => setShowPassword(!showPassword)}
        />
      )}
      {error && (
        <Text
          style={{
            color: "red",
            marginTop: 4,
          }}
        >
          {error}
        </Text>
      )}
    </View>
  );
}
