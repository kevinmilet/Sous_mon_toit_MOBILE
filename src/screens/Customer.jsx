import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import CustomerDetail from '../components/Customer/CustomerDetail';
import CustomerList from '../components/Customer/CustomerList';

const Stack =  createNativeStackNavigator();
const Customer = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="customerList" options={{
                    headerShown: false,
                }}>
            {()=><CustomerList/>}
        </Stack.Screen>
            <Stack.Screen name="customerDetail" options={{
                    headerShown: false,
                }}>
                    {(props) => <CustomerDetail {...props} />}
                
            </Stack.Screen>
        </Stack.Navigator>
    );
};

export default Customer;
