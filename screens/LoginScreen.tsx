import {
  View,
  Text,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState, useEffect } from "react";
import { LoginScreenProps } from "../types";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../styles";
import Input from "../components/Input";
import Button from "../components/Button";
import { StatusBar } from "expo-status-bar";
import { AntDesign } from "@expo/vector-icons";
import useAuth from "../hooks/useAuth";
import { AxiosError } from "axios";

export default function LoginScreen(props: LoginScreenProps) {
  const { signIn, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [submissionError, setSubmissionError] = useState("koeljioie9");

  const submitForm = async () => {
    signIn(email, password)
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
  }, [email, password]);

  useEffect(() => {
    setEmailError("");
  }, [email]);

  useEffect(() => {
    setPasswordError("");
  }, [password]);

  useEffect(() => {
    return () => {
      setEmail("");
      setPassword("");
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

  const validatePassword = () => {
    if (password) {
      return true;
    } else {
      setPasswordError("Password is required");
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
          <Pressable onPress={() => props.navigation.navigate("SignUp")}>
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
                Log in
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
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{
              gap: 26,
              paddingTop: 32,
            }}
          >
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
              label="Log in"
              disabled={!!emailError || !!passwordError || !!submissionError}
              onPress={() => submitForm()}
              loading={loading}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
      <StatusBar style="dark" translucent />
    </View>
  );
}
