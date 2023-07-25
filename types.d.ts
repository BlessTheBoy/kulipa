import type { NativeStackScreenProps } from "@react-navigation/native-stack";

type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  SignUp: undefined;
  Login: undefined;
  Home: undefined;
};

type SplashScreenProps = NativeStackScreenProps<RootStackParamList, "Splash">;
type OnboardingScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Onboarding"
>;
type SignUpScreenProps = NativeStackScreenProps<RootStackParamList, "SignUp">;
type LoginScreenProps = NativeStackScreenProps<RootStackParamList, "Login">;
type HomeScreenProps = NativeStackScreenProps<RootStackParamList, "Home">;
