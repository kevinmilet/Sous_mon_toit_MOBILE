import React from 'react';
import { SafeAreaView, StyleSheet, Text, View,ActivityIndicator} from 'react-native';
import CustomerList from '../components/Customer/CustomerList';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomerDetail from '../components/Customer/CustomerDetail';
// import { Button, StyleSheet, TextInput, View, FlatList, Text, ActivityIndicator } from 'react-native';
// import loader from '../../../assets/icons/loader.svg';
const Stack =  createNativeStackNavigator();
const Customer = () => {
    return (
       <Stack.Navigator>
           <Stack.Screen name="customerList" options={{
                    headerShown: false,
                }}>
               {()=><CustomerList/>}
           </Stack.Screen>
           <Stack.Screen name="customerDetail">
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
