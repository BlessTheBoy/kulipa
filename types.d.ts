import type { NativeStackScreenProps } from "@react-navigation/native-stack";

type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
};

type SplashScreenProps = NativeStackScreenProps<RootStackParamList, "Splash">;
type OnboardingScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Onboarding"
>;
