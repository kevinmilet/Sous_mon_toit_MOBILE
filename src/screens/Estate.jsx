import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import EstateDetail from '../components/Estate/EstateDetail';
import EstateList from '../components/Estate/EstateList';

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