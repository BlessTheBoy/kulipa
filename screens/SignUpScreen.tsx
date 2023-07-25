import {
  View,
  Text,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SignUpScreenProps } from "../types";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../styles";
import Input from "../components/Input";
import Checkbox from "expo-checkbox";
import Button from "../components/Button";
import * as Linking from "expo-linking";
import useAuth from "../hooks/useAuth";
import { AxiosError } from "axios";

export default function SignUpScreen(props: SignUpScreenProps) {
  const { register, loading } = useAuth();
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);
  const [submissionError, setSubmissionError] = useState("");

  const submitForm = async () => {
    register(email, password, name, phone)
      .then(() => {
        props.navigation.navigate("Home");
      })
      .catch((e: AxiosError) => {
        setSubmissionError(
          ((e.response?.data as any).message as string) ?? e.message
        );
      });
  };

  useEffect(() => {
    setSubmissionError("");
  }, [email, password, name, phone]);

  useEffect(() => {
    setEmailError("");
  }, [email]);

  useEffect(() => {
    setPasswordError("");
  }, [password]);

  useEffect(() => {
    setNameError("");
  }, [name]);

  useEffect(() => {
    setPhoneError("");
  }, [phone]);

  useEffect(() => {
    return () => {
      setEmail("");
      setPassword("");
      setName("");
      setPhone("");
      setIsAgreed(false);
    };
  }, []);

  const validateEmail = () => {
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (email.match(regex)) {
      return true;
    } else {
      if (email) {
        setEmailError("Invalid email");
      } else {
        setEmailError("Email is required");
      }
      return false;
    }
  };

  const validatePhone = () => {
    let regex = /^(?:\+|0)/;

    if (phone.match(regex)) {
      return true;
    } else {
      if (phone) {
        setPhoneError("Invalid phone number");
      } else {
        setPhoneError("Phone number is required");
      }
      return false;
    }
  };

  const validatePassword = () => {
    if (password) {
      return true;
    } else {
      setPasswordError("Password is required");
      return false;
    }
  };
  const validateName = () => {
    if (name) {
      return true;
    } else {
      setNameError("Name is required");
      return false;
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <SafeAreaView
        style={{
          flex: 1,
          paddingTop: 20,
        }}
      >
        <View
          style={{
            paddingHorizontal: 16,
          }}
        >
          <Pressable onPress={() => props.navigation.goBack()}>
            <AntDesign name="arrowleft" size={26} color="#292D32" />
          </Pressable>
        </View>
        <ScrollView
          style={{
            paddingHorizontal: 16,
          }}
        >
          <View>
            <View
              style={{
                marginTop: 14,
                flexDirection: "row",
                alignItems: "flex-end",
                gap: 8,
              }}
            >
              <Text
                style={{
                  color: colors.black,
                  fontFamily: "Kanit_600SemiBold",
                  fontSize: 30,
                }}
              >
                Welcome to Kulipa
              </Text>
              <Text
                style={{
                  fontSize: 30,
                  paddingBottom: 7,
                }}
              >
                👋
              </Text>
            </View>
            <Text
              style={{
                fontSize: 24,
                fontFamily: "Kanit_300Light",
                color: colors.grey,
              }}
            >
              Let’s get you started.
            </Text>
          </View>
          <KeyboardAvoidingView
            // behavior={Platform.OS === "ios" ? "padding" : "height"}
            behavior="padding"
            style={{
              gap: 26,
              paddingTop: 32,
            }}
          >
            <Input
              label="Name"
              autoComplete="name"
              enablesReturnKeyAutomatically={true}
              inputMode="text"
              returnKeyType="next"
              value={name}
              onChangeText={setName}
              onBlur={() => validateName()}
              error={nameError}
            />
            <Input
              label="Phone number"
              autoComplete="tel"
              enablesReturnKeyAutomatically={true}
              inputMode="tel"
              returnKeyType="next"
              value={phone}
              onChangeText={setPhone}
              onBlur={() => validatePhone()}
              error={phoneError}
            />
            <Input
              label="Email"
              autoComplete="email"
              enablesReturnKeyAutomatically={true}
              inputMode="email"
              returnKeyType="next"
              value={email}
              onChangeText={setEmail}
              onBlur={() => validateEmail()}
              error={emailError}
            />
            <Input
              label="Password"
              autoComplete="password-new"
              enablesReturnKeyAutomatically={true}
              inputMode="text"
              returnKeyType="done"
              value={password}
              onChangeText={setPassword}
              isPassword
              onBlur={() => validatePassword()}
              error={passwordError}
            />
          </KeyboardAvoidingView>
          <View
            style={{
              paddingTop: 20,
              paddingBottom: 40,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 8,
              }}
            >
              <Checkbox
                // style={styles.checkbox}
                value={isAgreed}
                onValueChange={setIsAgreed}
                color={isAgreed ? colors.brandBlue : undefined}
              />
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "baseline",
                }}
              >
                <Text
                  style={{
                    color: colors.black,
                    fontFamily: "JosefinSans_300Light",
                    fontSize: 14,
                  }}
                >
                  I agree to Kulipa{" "}
                </Text>
                <Pressable
                  onPress={(e) =>
                    Linking.openURL("https://www.linkedin.com/company/kulipa/")
                  }
                >
                  <Text
                    style={{
                      color: colors.black,
                      fontFamily: "JosefinSans_300Light",
                      fontSize: 14,
                      textDecorationLine: "underline",
                      textDecorationColor: colors.black,
                    }}
                  >
                    Terms of Service & Privacy Notice
                  </Text>
                </Pressable>
              </View>
            </View>
            <View
              style={{
                marginVertical: 40,
              }}
            >
              {submissionError && (
                <Text
                  style={{
                    color: "red",
                    marginBottom: 4,
                  }}
                >
                  {submissionError}
                </Text>
              )}
              <Button
                label="Sign Up"
                disabled={
                  !(name && phone && email && password && isAgreed) ||
                  !!submissionError
                }
                onPress={() => submitForm()}
                loading={loading}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "baseline",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: colors.grey,
                  fontFamily: "Kanit_400Regular",
                  fontSize: 20,
                }}
              >
                Already have an account?{" "}
              </Text>
              <Pressable onPress={() => props.navigation.navigate("Login")}>
                <Text
                  style={{
                    color: colors.brandBlue,
                    textDecorationLine: "underline",
                    textDecorationColor: colors.brandBlue,
                    fontSize: 20,
                    fontFamily: "Kanit_500Medium",
                  }}
                >
                  Log in
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      <StatusBar style="dark" translucent />
    </View>
  );
}
