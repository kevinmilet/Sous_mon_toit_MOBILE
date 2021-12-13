import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet,TouchableOpacity } from 'react-native';
import CalendarItem from './CalendarItem';
import { getTodayStaffAptmts } from '../../API/ApiApointements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Topbar from '../Topbar/Topbar';
import { FontAwesome5 } from '@expo/vector-icons';
import colors from '../../utils/styles/colors'

// const DATA = [
//     {
//         id: '1',
//         date: '2021-11-23 10:30:00',
//         staff_id: '1',
//         estate_address: '2 rue de la poupée qui tousse 80000 Amiens',
//         customer: 'Jean Aymare',
//         type: 'Visite',
//         note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
//     },
//     {
//         id: '2',
//         date: '2021-11-23 11:30:00',
//         staff_id: '1',
//         estate_address: '2 rue de la poupée qui tousse 80000 Amiens',
//         customer: 'Jean Aymare',
//         type: 'Première visite',
//         note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
//     },
//     {
//         id: '3',
//         date: '2021-11-23 14:00:00',
//         staff_id: '1',
//         estate_address: '2 rue de la poupée qui tousse 80000 Amiens',
//         customer: 'Jean Aymare',
//         type: 'Visite',
//         note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
//     },
// ];

const Calendar = () => {

    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        if (appointments.length == 0) {
            AsyncStorage.getItem('@auth_userId', (error, result) => {
                try {
                    getTodayStaffAptmts(result).then(
                        response => {
                            if (response.status == 200) {
                                setAppointments(response.data);
                            } else {
                                console.log('Pas de rendez-vous aujourd\'hui ');
                            }
                        }).catch(error => {
                            console.log(error.message)
                        })
                } catch {
                    console.log(error.message)
                }
            });
        }
    }, [])

    const renderItem = ({ item }) => (
        <CalendarItem title={item.sheduled_at} />
    );

    return(
        appointments.length != 0 ?
        <>
            <View>
                <Topbar />
                <FlatList
                    data={appointments}
                    renderItem={({ item }) => <CalendarItem appointments={item} />}
                    keyExtractor={item => item.id} />
            </View>
            <View style={styles.button_container}>
                <TouchableOpacity>
                    <FontAwesome5 name="calendar-plus" color={colors.primaryBtn} size={36} />
                </TouchableOpacity>
            </View>
        </>
        : null
    )
};

const styles = StyleSheet.create({
    text: {
        justifyContent: 'center',
        marginTop: 20,
        textAlign: 'center'
    },
    button_container: {
        margin: 10,
        flexDirection: 'row',
        justifyContent: 'center'
    }
})

export default Calendar;
