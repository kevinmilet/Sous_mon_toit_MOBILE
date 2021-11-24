import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet } from 'react-native';
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
                {()=><CustomerDetail/>}
            </Stack.Screen>
        </Stack.Navigator>
    );
};

const styles =  StyleSheet.create({
    mainContainer: {
        flex: 1,
        marginTop: 50
    },
    textinput: {
        marginLeft: 5, 
        marginRight: 5, 
        height: 50, 
        borderColor: '#000000', 
        borderWidth: 1, 
        paddingLeft: 5
    },
    loading_container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default Customer;
