import React from 'react';
import AppointmentDetails from '../components/Calendar/AppointmentDetails';
import Calendar from '../components/Calendar/Calendar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const Home = () => {
    return(
        // <View >
        //     <Topbar/>
        //     <Calendar/>
        // </View>
        <Stack.Navigator>
            <Stack.Screen name="calendar" options={{
                headerShown: false,
            }}>
                {() => <Calendar />}
            </Stack.Screen>
            <Stack.Screen name="appointmentDetails">
                {(props) => <AppointmentDetails {...props} />}
            </Stack.Screen>
        </Stack.Navigator>
    )
};

export default Home;
