import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";

const Stack = createNativeStackNavigator();
const HomeStackNavigator = (): JSX.Element => {
  return (
  <Stack.Navigator initialRouteName="Home">
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="MovieDetail" component= />
  </Stack.Navigator>;
  );
}

export default HomeStackNavigator;