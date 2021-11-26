import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import CalendarItem from './CalendarItem';
import { getTodayStaffAptmts } from '../../API/ApiApointements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Topbar from '../Topbar/Topbar';

const Calendar = () => {

    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        if (appointments.length == 0) {
            AsyncStorage.getItem('@auth:userId', (error, result) => {
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

        <View>
            <Topbar/>
            <FlatList
                data={appointments}
                renderItem={({item}) => <CalendarItem appointments={item}/>}
                keyExtractor={item => item.id}
            />
        </View>
        :
        <View>
            <Topbar/>
            <Text style={styles.text}>Pas de rendez-vous</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    text: {
        justifyContent: 'center',
        marginTop: 20,
        textAlign: 'center'
    }
})

export default Calendar;
