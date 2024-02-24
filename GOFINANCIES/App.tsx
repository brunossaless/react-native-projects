import "intl";
import "intl/locale-data/jsonp/pt-BR";

import React from "react";
import { StatusBar } from "react-native";
import { ThemeProvider } from "styled-components";
import theme from "./src/global/styles/theme";
import AppLoading from "expo-app-loading";

import { Routes } from "./src/routes";

import { SignIn } from "./src/screens/SignIn";

import { AuthProvider, useAuth } from "./src/hooks/auth";

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { CategorySelect } from "./src/screens/CategorySelect";

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  const { userStorageLoading } = useAuth();

  if (!fontsLoaded || userStorageLoading) {
    return <AppLoading />;
  } else {
    return (
      <ThemeProvider theme={theme}>
        {/* deixar statusbar branca */}
        <StatusBar barStyle="light-content" />

        {/* SignIn vai para o children la no auth */}
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </ThemeProvider>
    );
  }
}
