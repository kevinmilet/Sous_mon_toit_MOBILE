import { SafeAreaView, StyleSheet, Text, View, ActivityIndicator, Image } from 'react-native';
import EstateList from '../components/Estate/EstateList';
import EstateDetail from '../components/Estate/EstateDetail';
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const Estate = () => {

    return (
        <Stack.Navigator>
            <Stack.Screen name="estateList" options={{
                headerShown: false,
            }}>
                {() => <EstateList />}
            </Stack.Screen>
            <Stack.Screen name="estateDetail">
                {() => <EstateDetail />}
            </Stack.Screen>
        </Stack.Navigator>
    )
}

export default Estate