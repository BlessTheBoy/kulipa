import React, {
  createContext,
  ReactNode,
  useState,
  useContext,
  useEffect,
} from "react";
import SplashScreen from "../components/SplashScreen";
import axios, { AxiosError } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Network from "expo-network";

export type User = {
  id: string;
  name: string;
  email: string;
  role: "USER";
  verified: boolean;
  avatarUrl: null | string;
};

type authContextValue = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  register: (
    email: string,
    password: string,
    name: string,
    phone: string
  ) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  logOut: () => Promise<void>;
  loading: boolean;
};

const AuthContext = createContext<authContextValue>({
  user: null,
  setUser: () => {},
  register: (...args) => new Promise((resolve) => resolve()),
  signIn: (...args) => {
    console.log("initial sign in");
    return new Promise((resolve) => resolve());
  },
  logOut: () => new Promise((resolve) => resolve()),
  loading: false,
});
AuthContext.displayName = "AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loading, setLoading] = useState(false);

  // const auth = getAuth();
  // const currentUser = auth.currentUser;

  useEffect(() => {
    const autoLogin = async () => {
      console.log("running auto login");
      const token = await AsyncStorage.getItem("USER_ACCESS_TOKEN");
      if (token) {
        console.log("token found");
        const { isInternetReachable, isConnected, type } =
          await Network.getNetworkStateAsync();
        console.log("network: ", isInternetReachable, isConnected, type);

        if (isInternetReachable) {
          console.log("isConnected");
          try {
            axios.get("/auth/profile").then((value) => {
              // {
              //   "verified": false,
              //   "name": "example user",
              //   "id": "64bfb0c3bf7d8a8d4cb2e8fc",
              //   "email": "user1@example.com",
              //   "role": "USER",
              //   "avatarUrl": null,
              //   "user": [
              //     {
              //       "id": "64bfb0c3bf7d8a8d4cb2e8fc",
              //       "email": "user1@example.com",
              //       "name": "example user",
              //       "phone": "+234 1234567",
              //       "accountEmail": "user1@example.com",
              //       "token": null,
              //       "createdAt": "2023-07-25T11:23:47.919Z",
              //       "updatedAt": "2023-07-25T11:23:47.919Z",
              //       "avatarUrl": null
              //     }
              //   ],
              //   "vendor": []
              // }
              console.log("profile verified");
              const data = value.data;
              setUser({
                id: data.id,
                name: data.name,
                email: data.email,
                role: data.role,
                verified: data.verified,
                avatarUrl: data.avatarUrl,
              });
              AsyncStorage.setItem(
                "USER_DATA",
                JSON.stringify({
                  id: data.id,
                  name: data.name,
                  email: data.email,
                  role: data.role,
                  verified: data.verified,
                  avatarUrl: data.avatarUrl,
                })
              );
            });
          } catch (e: any) {
            console.log("request failed, back to login");
            // redirect to login
            await AsyncStorage.removeItem("USER_ACCESS_TOKEN");
            await AsyncStorage.removeItem("USER_DATA");
          }
        } else {
          console.log("not connected, fetch from storage");
          // fetch from async storage
          const user = await AsyncStorage.getItem("USER_DATA");
          if (user) {
            const userData: User = JSON.parse(user);
            setUser(userData);
          }
        }
      } else {
        console.log("no token found");
      }

      setLoadingInitial(false);
    };

    autoLogin();
  }, []);

  const register = async (
    email: string,
    password: string,
    name: string,
    phone: string
  ) => {
    setLoading(true);
    return axios
      .post("/auth/register", {
        email,
        password,
        name,
        phone,
      })
      .then((value) => {
        // {
        //   "name": "example user",
        //   "phone": "+234 1234567",
        //   "email": "user1@example.com",
        //   "id": "64bfb0c3bf7d8a8d4cb2e8fc",
        //   "createdAt": "2023-07-25T11:23:47.919Z",
        //   "updatedAt": "2023-07-25T11:23:47.919Z",
        //   "account": {
        //     "email": "user1@example.com",
        //     "verified": false
        //   },
        //   "accountEmail": "user1@example.com",
        //   "avatarUrl": null
        // }
        return signIn(email, password);
      })
      .finally(() => setLoading(false));
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    return axios
      .post("/auth/login", {
        email,
        password,
      })
      .then((value) => {
        // {
        //   "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIxQGV4YW1wbGUuY29tIiwic3ViIjoiNjRiZmIwYzNiZjdkOGE4ZDRjYjJlOGZjIiwibmFtZSI6ImV4YW1wbGUgdXNlciIsInJvbGUiOiJVU0VSIiwidmVyaWZpZWQiOmZhbHNlLCJhdmF0YXJVcmwiOm51bGwsImlhdCI6MTY5MDI4NDM4NiwiZXhwIjoxNjkwMzcwNzg2fQ._M0E0Sz2UVI4MTNu-olTl2JQjidUI7HqDsRoELwa8xA",
        //   "name": "example user",
        //   "email": "user1@example.com",
        //   "id": "64bfb0c3bf7d8a8d4cb2e8fc",
        //   "role": "USER",
        //   "verified": false,
        //   "avatarUrl": null
        // }
        const data: User & { access_token: string } = value.data;
        setUser({
          id: data.id,
          name: data.name,
          email: data.email,
          role: data.role,
          verified: data.verified,
          avatarUrl: data.avatarUrl,
        });
        AsyncStorage.setItem("USER_ACCESS_TOKEN", data.access_token);
        AsyncStorage.setItem(
          "USER_DATA",
          JSON.stringify({
            id: data.id,
            name: data.name,
            email: data.email,
            role: data.role,
            verified: data.verified,
            avatarUrl: data.avatarUrl,
          })
        );
      })
      .finally(() => setLoading(false));
  };

  const logOut = async () => {
    setUser(null);
    await AsyncStorage.removeItem("USER_ACCESS_TOKEN");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        register,
        signIn,
        logOut,
        loading,
      }}
    >
      {loadingInitial ? <SplashScreen /> : children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
}
