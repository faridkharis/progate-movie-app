import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MovieDetail from "../screens/MovieDetail";
import Favorite from "../screens/Favorite";

const Stack = createNativeStackNavigator();
const FavoriteStackNavigation = (): JSX.Element => {
  return (
  <Stack.Navigator initialRouteName="Favorite">
    <Stack.Screen name="Favorite Screen" component={Favorite} options={{headerShown: false}} />
    <Stack.Screen name="MovieDetail" component={MovieDetail} options={{headerTransparent: true, headerTitle: '', headerTintColor: '#fff'}} />
  </Stack.Navigator>
  );
};

export default FavoriteStackNavigation;