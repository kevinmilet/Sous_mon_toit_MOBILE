import { FontAwesome5 } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from "react";
import Contract from "../screens/Contract";
import Customer from "../screens/Customer";
import Estate from "../screens/Estate";
import Home from '../screens/Home';
import colors from '../utils/styles/colors';


const Tab = createBottomTabNavigator();


const NavigationMain = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="home" options={{
                    headerShown: false,
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="home" color={colors.secondary} size={24} />
                    ),
                }} >
                
                    {()=><Home/>}
                    
                </Tab.Screen>
                <Tab.Screen name="customer" ame="home" options={{
                    headerShown: false,
                    tabBarLabel: 'Clients',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="user" size={24} color={colors.secondary} />
                    ),
                }}>

                {()=><Customer/>}

                </Tab.Screen>
                <Tab.Screen name="estate" options={{
                    headerShown: false,
                    tabBarLabel: 'Biens',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="building" size={24} color={colors.secondary} />
                    ),
                }} >
                
                    {()=><Estate/>}
                    
                </Tab.Screen>
                <Tab.Screen name="contract" options={{
                    headerShown: false,
                    tabBarLabel: 'Contrats',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="file-contract" size={24} color={colors.secondary} />
                    ),
                }} >
                
                    {()=><Contract/>}
                    
                </Tab.Screen>
            </Tab.Navigator>
        </NavigationContainer>
        
    )
}

export default NavigationMain