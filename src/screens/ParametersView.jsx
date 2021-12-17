import React from 'react';
import Parameters from "../components/Parameters/Parameters";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const ParametersView = () => {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen name="parameters_view" options={{
                headerShown: false,
            }}>
                {() => <Parameters />}
            </Stack.Screen>
        </Stack.Navigator>
    );
};

export default ParametersView;