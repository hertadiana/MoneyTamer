import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import ActualAmountScreen from "../screens/ActualAmountScreen";
import BudgetScreen from "../screens/BudgetScreen";
import EarningsScreen from "../screens/EarningsScreen";
import HomeScreen from "../screens/HomeScreen";
import MonthlyChecksScreen from "../screens/MonthlyChecksScreen";
import RegrettedPurchasesScreen from "../screens/RegrettedPurchasesScreen";
console.log("ActualAmount:", ActualAmountScreen);




const {Navigator, Screen} = createStackNavigator();
const AppNavigator = () => (
    <NavigationContainer>
        <Navigator initialRouteName="Home" >
            <Screen name="Home" component={HomeScreen}></Screen>
            <Screen name="Earnings" component={EarningsScreen}></Screen>
            <Screen name="ActualAmount" component={ActualAmountScreen}></Screen>
            <Screen name="Budget" component={BudgetScreen}></Screen>
            <Screen name="MonthlyChecks" component={MonthlyChecksScreen}></Screen>
            <Screen name="Regretted" component={RegrettedPurchasesScreen}></Screen>

            </Navigator>
    </NavigationContainer>
)
export default AppNavigator;