import {
  View,
  Text,
  GestureResponderEvent,
  NativeSyntheticEvent,
  NativeScrollEvent,
  FlatList,
  Pressable,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import React, { useState, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../styles";
import { OnboardingScreenProps } from "../types";
import { width } from "./SplashScreen";

type SlideItem = {
  id: number;
  image: any;
  title: string;
  description: string;
};
const slides: SlideItem[] = [
  {
    id: 1,
    image: require("../assets/images/onboarding1.png"),
    title: "Access variety of services from a single app.",
    description: "Lorem ipsum dolor sit umen lorem ipsum dolor.",
  },
  {
    id: 2,
    image: require("../assets/images/onboarding2.png"),
    title: "Monitor & verify transactions as a business owner.",
    description: "Lorem ipsum dolor sit umen lorem ipsum dolor.",
  },
  {
    id: 3,
    image: require("../assets/images/onboarding3.png"),
    title: "Book appointments and pay for your needs easily.",
    description: "Lorem ipsum dolor sit umen lorem ipsum dolor.",
  },
];

const Slide = ({ item }: { item: SlideItem }) => {
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 16,
        // backgroundColor: "red",
        paddingTop: 32,
        width,
      }}
    >
      <Text
        style={{
          color: colors.black,
          fontFamily: "Kanit_600SemiBold",
          fontSize: 28,
          lineHeight: 38,
          letterSpacing: -1,
          marginBottom: 4,
        }}
      >
        Access variety of{" "}
        <Text style={{ color: colors.brandBlue }}>services</Text> from a single
        app.
      </Text>
      <Text
        style={{
          fontFamily: "JosefinSans_300Light",
          fontSize: 22,
        }}
      >
        Lorem ipsum dolor sit umen lorem ipsum dolor.
      </Text>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          source={item.image}
          style={{
            width: width - 32,
            // height: width - 44,
            resizeMode: "contain",
          }}
        />
      </View>
    </View>
  );
};

export default function OnboardingScreen(props: OnboardingScreenProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const slideRef = useRef<FlatList<SlideItem>>(null);

  const updateCurrentSlideIndex = (
    e: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const goNextSlide = (e: GestureResponderEvent) => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex !== slides.length) {
      const offset = nextSlideIndex * width;
      slideRef.current?.scrollToOffset({ offset });
      setCurrentSlideIndex(nextSlideIndex);
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
          paddingTop: 60,
          paddingBottom: 60,
          flex: 1,
        }}
      >
        <View style={{ flexDirection: "row", gap: 5, paddingHorizontal: 16 }}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                {
                  width: 13,
                  height: 6,
                  borderRadius: 4,
                  backgroundColor: colors.grey,
                },
                currentSlideIndex === index && {
                  backgroundColor: colors.black,
                  width: 28,
                },
              ]}
            ></View>
          ))}
        </View>
        <FlatList
          ref={slideRef}
          pagingEnabled
          onMomentumScrollEnd={updateCurrentSlideIndex}
          data={slides}
          // contentContainerStyle={{ flex: 1 }}
          style={{ flex: 1 }}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => <Slide item={item} />}
        />

        <View
          style={{
            flexDirection: "row",
            gap: 16,
            alignItems: "center",
            // paddingTop: 101,
            paddingHorizontal: 16,
          }}
        >
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Log in</Text>
          </Pressable>
          <Pressable
            style={[styles.button, { backgroundColor: colors.brandBlue }]}
          >
            <Text style={[styles.buttonText, { color: "white" }]}>
              Create Account
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
      <StatusBar style="dark" translucent />
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    paddingVertical: 14,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E3E1E1",
    borderTopLeftRadius: 8,
    borderBottomRightRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  buttonText: {
    fontFamily: "Kanit_400Regular",
    color: colors.black,
    fontSize: 20,
  },
});
