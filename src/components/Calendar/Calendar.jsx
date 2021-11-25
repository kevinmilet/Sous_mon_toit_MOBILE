import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import CalendarItem from './CalendarItem';
import { getTodayStaffAptmts } from '../../API/ApiApointements';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
                                console.log('Pas de rendez-vous aujourd\'hui');
                            }
                        }).catch(error => {
                            console.log(error)
                        })
                } catch {
                    console.log(error)
                } 
            });
        }
    }, [appointments])

    const renderItem = ({ item }) => (
        <CalendarItem title={item.sheduled_at} />
    );

    return(
        appointments.length != 0 ?
        <View>
            <FlatList
                data={appointments}
                renderItem={({item}) => <CalendarItem appointments={item}/>}
                keyExtractor={item => item.id}
            />
        </View>
        : 
        <View>
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
