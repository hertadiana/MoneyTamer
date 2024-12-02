import React from 'react';
import { Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

interface HomeScreenProps{
    navigation: any
}

const HomeScreen = (props: HomeScreenProps) => {
    const navigateToEarnings = () => props.navigation.navigate("Earnings");
    const navigateToActualAmount = () => props.navigation.navigate("ActualAmount");
    const navigateToBudget = () => props.navigation.navigate("Budget");
    const navigateToMonthlyChecks = () => props.navigation.navigate("MonthlyChecks");
    const navigateToRegretted = () => props.navigation.navigate("Regretted");

  
    return (
      <SafeAreaView >
        <Button onPress={navigateToEarnings}>
          Go to Earnings
        </Button>
        <Button onPress={navigateToActualAmount}>
          Go to Actual Amount
        </Button>
        <Button onPress={navigateToBudget}>
          Go to Budget
        </Button>
        <Button onPress={navigateToMonthlyChecks}>
          Go to Monthly Checks
        </Button>
        <Button onPress={navigateToRegretted}>
          Go to Regretted
        </Button>
      </SafeAreaView>
      
    );
  };

export default HomeScreen