import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import MovieDetail from "../screens/MovieDetail";

const Stack = createNativeStackNavigator();
const HomeStackNavigation = (): JSX.Element => {
  return (
  <Stack.Navigator initialRouteName="Home">
    <Stack.Screen name="Home Screen" component={Home} />
    <Stack.Screen name="MovieDetail" component={MovieDetail} />
  </Stack.Navigator>
  );
};

export default HomeStackNavigation;