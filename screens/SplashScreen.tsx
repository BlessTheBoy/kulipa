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
  // Kanit_300Light,
  // Kanit_300Light_Italic,
  Kanit_400Regular,
  // Kanit_400Regular_Italic,
  // Kanit_500Medium,
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
  JosefinSans_100Thin,
  JosefinSans_200ExtraLight,
  JosefinSans_300Light,
  JosefinSans_400Regular,
  JosefinSans_500Medium,
  JosefinSans_600SemiBold,
  JosefinSans_700Bold,
  JosefinSans_100Thin_Italic,
  JosefinSans_200ExtraLight_Italic,
  JosefinSans_300Light_Italic,
  JosefinSans_400Regular_Italic,
  JosefinSans_500Medium_Italic,
  JosefinSans_600SemiBold_Italic,
  JosefinSans_700Bold_Italic,
} from "@expo-google-fonts/josefin-sans";

export const { width, height } = Dimensions.get("window");

export default function SplashScreen(props: SplashScreenProps) {
  let [fontsLoaded] = useFonts({
    // Kanit_100Thin,
    // Kanit_100Thin_Italic,
    // Kanit_200ExtraLight,
    // Kanit_200ExtraLight_Italic,
    // Kanit_300Light,
    // Kanit_300Light_Italic,
    Kanit_400Regular,
    // Kanit_400Regular_Italic,
    // Kanit_500Medium,
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
    // JosefinSans_500Medium,
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
  // const { user } = useAuth();

  useEffect(() => {
    const checkIsAppFirstLaunch = async () => {
      try {
        const firstLaunch = await AsyncStorage.getItem("isAppFirstLaunched");

        if (firstLaunch == null) {
          setIsAppFirstLaunched(true);
          // TODO: uncomment the code under to make onboarding show only on first open.
          // await AsyncStorage.setItem("isAppFirstLaunched", "false");
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

  useEffect(() => {
    if (isAppFirstLaunched == null && !fontsLoaded) return;

    setTimeout(() => {
      // if (isAppFirstLaunched) {
      if (true) {
        setIsAppFirstLaunched(false);
        props.navigation.navigate("Onboarding");
      } else {
        // if (user) {
        //   // go to home page
        // } else {
        //   // go to login page
        //   // navigationRef.navigate("Auth", {
        //   //   screen: "Login",
        //   // });
        // }
      }
    }, 2000);
  }, [isAppFirstLaunchedChecked, isAppFirstLaunched, fontsLoaded]);

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/logo.png")}
        style={styles.logo}
      />
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
