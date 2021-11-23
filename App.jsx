import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView,StyleSheet, Text, View } from 'react-native';
import NavigationMain from './src/navigation/NavigationMain';
import Customer from './src/screens/Customer'

export default function App() {
  return (
  <SafeAreaView style={{flex: 1}}>
    
    <NavigationMain />
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
