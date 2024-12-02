import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { RootStackParamList } from "../data/types.ts";
import ActualAmountScreen from "../screens/ActualAmountScreen";
import BudgetScreen from "../screens/BudgetScreen";
import EarningsScreen from "../screens/EarningsScreen";
import HomeScreen from "../screens/HomeScreen";
import MonthlyChecksScreen from "../screens/MonthlyChecksScreen";
import RegrettedPurchasesScreen from "../screens/RegrettedPurchasesScreen";
import EditEarning from "../screens/edit_screens/EditEarning";

console.log("ActualAmount:", ActualAmountScreen);




const Stack = createStackNavigator<RootStackParamList>();
const AppNavigator = () => (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" >
            <Stack.Screen name="Home" component={HomeScreen}></Stack.Screen>
            <Stack.Screen name="Earnings" component={EarningsScreen}></Stack.Screen>
            <Stack.Screen name="EditEarning" component={EditEarning} />
            <Stack.Screen name="ActualAmount" component={ActualAmountScreen}></Stack.Screen>
            <Stack.Screen name="Budget" component={BudgetScreen}></Stack.Screen>
            <Stack.Screen name="MonthlyChecks" component={MonthlyChecksScreen}></Stack.Screen>
            <Stack.Screen name="Regretted" component={RegrettedPurchasesScreen}></Stack.Screen>

            </Stack.Navigator>
    </NavigationContainer>
)
export default AppNavigator;