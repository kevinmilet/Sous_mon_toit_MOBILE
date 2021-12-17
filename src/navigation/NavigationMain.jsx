import { MaterialCommunityIcons, EvilIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React, { useContext } from "react";
import Customer from "../screens/Customer";
import Estate from "../screens/Estate";
import Home from '../screens/Home';
import colors from '../utils/styles/colors';
import LogContext from '../API/Context/LogContext';
import SignIn from '../components/connexion/SignIn';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ParametersView from "../screens/ParametersView";


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


const NavigationMain = () => {
    const { setTokenIsValid, tokenIsValid } = useContext(LogContext)
    return (
        <NavigationContainer>
            {tokenIsValid ? (
                <Tab.Navigator>
                    <Tab.Screen name="home" options={{
                        headerShown: false,
                        tabBarLabel: 'Home',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="home" color={colors.secondary} size={24} />
                        ),
                    }} >
                
                    {()=><Home/>}
                    
                    </Tab.Screen>
                    <Tab.Screen name="customer" options={{
                        headerShown: false,
                        tabBarLabel: 'Clients',
                        tabBarIcon: ({ color, size }) => (
                            <EvilIcons name="user" size={30} color={colors.secondary} />
                        ),
                    }}>

                        {() => <Customer />}

                    </Tab.Screen>
                    <Tab.Screen name="estate" options={{
                        headerShown: false,
                        tabBarLabel: 'Biens',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="office-building" size={24} color={colors.secondary} />
                        ),
                    }} >

                        {() => <Estate />}

                    </Tab.Screen>
                    
                    {/*<Tab.Screen name="contract" options={{*/}
                    {/*    headerShown: false,*/}
                    {/*    tabBarLabel: 'Contrats',*/}
                    {/*    tabBarIcon: ({ color, size }) => (*/}
                    {/*        <MaterialCommunityIcons name="file-document-outline" size={24} color={colors.secondary} />*/}
                    {/*    ),*/}
                    {/*}} >*/}
                    
                    {/*    {()=><Contract/>}                    */}
                    {/*    */}
                    {/*</Tab.Screen>*/}

                    <Tab.Screen name="parameters" options={{
                        headerShown: false,
                        tabBarLabel: 'Paramètres',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="cog-outline" size={24} color={colors.secondary} />
                        ),
                    }} >
                        {()=><ParametersView/>}
                    </Tab.Screen>
                </Tab.Navigator>
            )
            :
            (
                <Stack.Navigator>
                    <Stack.Screen name="login" options={{
                        headerShown: false
                    }} >
                        {()=><SignIn/>}
                    </Stack.Screen>
                </Stack.Navigator>
            )
            }
        </NavigationContainer>
    )
}

export default NavigationMain