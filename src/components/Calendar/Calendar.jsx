import React, {useEffect, useState, useCallback } from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CalendarItem from './CalendarItem';
import {getTodayStaffAptmts} from '../../API/ApiApointements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Topbar from '../Topbar/Topbar';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import colors from '../../utils/styles/colors'
import {useFocusEffect, useIsFocused, useNavigation} from "@react-navigation/native";

const Calendar = () => {

    const [appointments, setAppointments] = useState([]);
    const navigation = useNavigation();
    const isFocused = useIsFocused();

    useEffect(() => {
        getAppointments()
    }, [])

    useFocusEffect(useCallback(() => {
        getAppointments()
        }, []))

    const getAppointments = () => {
        if (appointments.length === 0) {
            AsyncStorage.getItem('@auth_userId', (error, result) => {
                try {
                    getTodayStaffAptmts(result).then(
                        response => {
                            if (response.status === 200) {
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
    }

    // const renderItem = ({ item }) => (
    //     <CalendarItem title={item.sheduled_at} />
    // );

    return(
        appointments.length !== 0 ?
        <>
            <View style={{flex: 1}}>
                <Topbar />
                <View style={styles.button_container}>
                    <TouchableOpacity onPress={() => navigation.navigate('addAppointment', null)}>
                        <MaterialCommunityIcons name="calendar-plus" color={colors.primaryBtn} size={36} />
                        {/*<Text>Ajouter un rendez-vous</Text>*/}
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={appointments}
                    renderItem={({ item }) => <CalendarItem appointments={item} />}
                    keyExtractor={(item) => item.id} />
            </View>
        </>
        :
        <>
            <View>
                <Topbar />
                <Text style={styles.text}>Pas de rendez-vous</Text>
            </View>
            <View style={styles.button_container}>
                <TouchableOpacity onPress={() => navigation.navigate('addAppointment', null)}>
                    <MaterialCommunityIcons name="calendar-plus" color={colors.primaryBtn} size={32}/>
                </TouchableOpacity>
            </View>
        </>
    )
};

const styles = StyleSheet.create({
    text: {
        justifyContent: 'center',
        marginVertical: 30,
        textAlign: 'center',
        fontSize: 22,
        fontWeight: 'bold'
    },
    button_container: {
        margin: 10,
        flexDirection: 'row',
        justifyContent: 'center'
    }
})

export default Calendar;
