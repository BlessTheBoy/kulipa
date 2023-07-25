import { View, Text } from "react-native";
import React, { useState } from "react";
import { HomeScreenProps } from "../types";
import Button from "../components/Button";
import useAuth from "../hooks/useAuth";

export default function HomeScreen(props: HomeScreenProps) {
  const { user, logOut } = useAuth();
  const [submissionError, setSubmissionError] = useState("");

  const logOutHandler = async () => {
    logOut()
      .then(() => props.navigation.navigate("Login"))
      .catch((e) => setSubmissionError(e.message));
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 16,
      }}
    >
      <Text>Welcome home {user?.name}</Text>
      {submissionError && <Text>{submissionError}</Text>}
      <Button
        label="Sign Out"
        onPress={() => logOutHandler()}
        style={{ width: "100%" }}
      />
    </View>
  );
}
