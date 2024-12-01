import React from 'react';
import { Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

interface HomeScreenProps{
    navigation: any
}

const HomeScreen = (props: HomeScreenProps) => {
    const navigateToEarnings = () => props.navigation.navigate('Earnings');

  
    return (
      <SafeAreaView >
        <Button mode="contained" onPress={navigateToEarnings}>
          Go to Earnings
        </Button>
      </SafeAreaView>
    );
  };

export default HomeScreen;