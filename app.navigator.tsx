import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import EarningsScreen from "./structure/screens/EarningsScreen";
import HomeScreen from "./structure/screens/HomeScreen";
console.log("EarningsScreen:", EarningsScreen);



const {Navigator, Screen} = createStackNavigator();

const AppNavigator = () => (
    <NavigationContainer>
        <Navigator initialRouteName="Home" >
            <Screen name="Home" component={HomeScreen}></Screen>
            <Screen name="Earnings" component={EarningsScreen}></Screen>
            </Navigator>
    </NavigationContainer>
)
export default AppNavigator;