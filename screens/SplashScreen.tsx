import { View, StyleSheet, Image, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { colors } from "../styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SplashScreenProps } from "../types";
import {
  useFonts,
  // Kanit_100Thin,
  // Kanit_100Thin_Italic,
  // Kanit_200ExtraLight,
  // Kanit_200ExtraLight_Italic,
  Kanit_300Light,
  // Kanit_300Light_Italic,
  Kanit_400Regular,
  // Kanit_400Regular_Italic,
  Kanit_500Medium,
  // Kanit_500Medium_Italic,
  Kanit_600SemiBold,
  // Kanit_600SemiBold_Italic,
  // Kanit_700Bold,
  // Kanit_700Bold_Italic,
  // Kanit_800ExtraBold,
  // Kanit_800ExtraBold_Italic,
  // Kanit_900Black,
  // Kanit_900Black_Italic,
} from "@expo-google-fonts/kanit";
import {
  // useFonts,
  // JosefinSans_100Thin,
  // JosefinSans_200ExtraLight,
  JosefinSans_300Light,
  // JosefinSans_400Regular,
  JosefinSans_500Medium,
  // JosefinSans_600SemiBold,
  // JosefinSans_700Bold,
  // JosefinSans_100Thin_Italic,
  // JosefinSans_200ExtraLight_Italic,
  // JosefinSans_300Light_Italic,
  // JosefinSans_400Regular_Italic,
  // JosefinSans_500Medium_Italic,
  // JosefinSans_600SemiBold_Italic,
  // JosefinSans_700Bold_Italic,
} from "@expo-google-fonts/josefin-sans";
import useAuth from "../hooks/useAuth";
import { Text } from "react-native";
import { Animated } from "react-native";

export const { width, height } = Dimensions.get("window");

export default function SplashScreen(props: SplashScreenProps) {
  const { user } = useAuth();
  const [width] = useState(new Animated.Value(0));
  let [fontsLoaded] = useFonts({
    // Kanit_100Thin,
    // Kanit_100Thin_Italic,
    // Kanit_200ExtraLight,
    // Kanit_200ExtraLight_Italic,
    Kanit_300Light,
    // Kanit_300Light_Italic,
    Kanit_400Regular,
    // Kanit_400Regular_Italic,
    Kanit_500Medium,
    // Kanit_500Medium_Italic,
    Kanit_600SemiBold,
    // Kanit_600SemiBold_Italic,
    // Kanit_700Bold,
    // Kanit_700Bold_Italic,
    // Kanit_800ExtraBold,
    // Kanit_800ExtraBold_Italic,
    // Kanit_900Black,
    // Kanit_900Black_Italic,
    // JosefinSans_100Thin,
    // JosefinSans_200ExtraLight,
    JosefinSans_300Light,
    // JosefinSans_400Regular,
    JosefinSans_500Medium,
    // JosefinSans_600SemiBold,
    // JosefinSans_700Bold,
    // JosefinSans_100Thin_Italic,
    // JosefinSans_200ExtraLight_Italic,
    // JosefinSans_300Light_Italic,
    // JosefinSans_400Regular_Italic,
    // JosefinSans_500Medium_Italic,
    // JosefinSans_600SemiBold_Italic,
    // JosefinSans_700Bold_Italic,
  });
  const [isAppFirstLaunched, setIsAppFirstLaunched] = useState<boolean | null>(
    null
  );
  const [isAppFirstLaunchedChecked, setIsAppFirstLaunchedChecked] =
    useState<boolean>(false);

  useEffect(() => {
    const checkIsAppFirstLaunch = async () => {
      try {
        const firstLaunch = await AsyncStorage.getItem("isAppFirstLaunched");

        if (firstLaunch == null) {
          setIsAppFirstLaunched(true);
          await AsyncStorage.setItem("isAppFirstLaunched", "false");
        } else {
          setIsAppFirstLaunched(false);
        }
      } catch (e) {
        // saving error
        alert("Error checking is app first launched");
      } finally {
        setIsAppFirstLaunchedChecked(true);
      }
    };
    checkIsAppFirstLaunch();
  }, []);

  const animateTextIntoView = () => {
    setTimeout(() => {
      Animated.timing(width, {
        toValue: 130,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }, 1000);
  };

  useEffect(() => {
    if (!isAppFirstLaunchedChecked || !fontsLoaded) return;

    setTimeout(() => {
      if (isAppFirstLaunched) {
        setIsAppFirstLaunched(false);
        props.navigation.navigate("Onboarding");
      } else {
        if (user) {
          props.navigation.navigate("Home");
        } else {
          props.navigation.navigate("Login");
        }
      }
    }, 2000);
  }, [isAppFirstLaunchedChecked, fontsLoaded]);

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 10,
        }}
      >
        <Image
          source={require("../assets/images/logo.png")}
          style={styles.logo}
        />
        <Animated.Image
          style={{
            height: 50,
            width: 128,
            resizeMode: "cover",
            maxWidth: width,
          }}
          onLayout={(event) => {
            animateTextIntoView();
          }}
          source={require("../assets/images/kulipa.png")}
        />
      </View>
      <StatusBar style="light" translucent />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.brandBlue,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 55,
    height: 61,
  },
});
