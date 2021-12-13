import React from 'react';
import AppointmentDetails from '../components/Calendar/AppointmentDetails';
import Calendar from '../components/Calendar/Calendar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddAppointment from "../components/Calendar/AddAppointment";

const Stack = createNativeStackNavigator();

const Home = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen name="calendar" options={{
                headerShown: false,
            }}>
            {() => <Calendar />}
            </Stack.Screen>
            <Stack.Screen name="appointmentDetails" options={{
                    headerShown: false,
                }}>
                {(appointments) => <AppointmentDetails {...appointments} />}
            </Stack.Screen>
            <Stack.Screen name="addAppointment" options={{
                headerShown: false,
                }}>
                {() => <AddAppointment/>}
            </Stack.Screen>
        </Stack.Navigator>
    )
};

export default Home;
