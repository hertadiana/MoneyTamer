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
import EditActualAmountScreen from "../screens/edit_screens/EditActualAmount.tsx";
import EditBudget from "../screens/edit_screens/EditBudget.tsx";
import EditEarning from "../screens/edit_screens/EditEarning";
import EditMonthlyCheck from "../screens/edit_screens/EditMonthlyCheck.tsx";
import EditRegrettedPurchase from "../screens/edit_screens/EditRegrettedPurchase.tsx";
console.log("ActualAmount:", ActualAmountScreen);




const Stack = createStackNavigator<RootStackParamList>();
const AppNavigator = () => (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" >
            <Stack.Screen name="Home" component={HomeScreen}></Stack.Screen>
            <Stack.Screen name="Earnings" component={EarningsScreen}></Stack.Screen>
            <Stack.Screen name="EditEarning" component={EditEarning} />
            <Stack.Screen name="ActualAmount" component={ActualAmountScreen}></Stack.Screen>
            <Stack.Screen name="EditActualAmount" component={EditActualAmountScreen} />
            <Stack.Screen name="Budget" component={BudgetScreen}></Stack.Screen>
            <Stack.Screen name="EditBudget" component={EditBudget} />
            <Stack.Screen name="MonthlyChecks" component={MonthlyChecksScreen}></Stack.Screen>
            <Stack.Screen name="EditMonthlyCheck" component={EditMonthlyCheck} />
            <Stack.Screen name="Regretted" component={RegrettedPurchasesScreen}></Stack.Screen>
            <Stack.Screen name="EditRegrettedPurchase" component={EditRegrettedPurchase} />


            </Stack.Navigator>
    </NavigationContainer>
)
export default AppNavigator;