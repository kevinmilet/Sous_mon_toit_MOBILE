import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import moment from 'moment';
import 'moment/locale/fr';
import colors from '../../utils/styles/colors';

const CalendarItem = (appointments) => {

    const aptmt = appointments.appointments;
    const date = moment(aptmt.scheduled_at).format('DD/MM/YYYY à HH:mm');
    const navigation = useNavigation();
    
    return(
        <TouchableOpacity onPress={() => navigation.navigate('appointmentDetails', { aptmtId: aptmt.id })}>
            <View style={styles.content_container}>
                <View style={styles.header_container}>
                    <Text style={styles.date_text}>{date}</Text>
                    <Text style={styles.type_text}>{aptmt.appointment_type}</Text>
                </View>
                <View style={styles.description_container}>
                    <Text style={styles.description_text}>{aptmt.customerFirstname} {aptmt.customerLastname}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    content_container: {
        flex: 1,
        margin: 10,
        padding: 10,
        backgroundColor: colors.backgroundPrimary,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
        },
    header_container: {
        flexDirection: 'column',
    },
    description_container: {
        marginTop: 5
    },
    date_text: {
        textAlign: 'left',
        fontSize: 18,
        color: colors.primaryBtn,
        fontWeight: 'bold'
    },
    type_text: {
        textAlign: 'left',
        fontSize: 16,
        color: colors.primary,
        fontWeight: 'bold'
    },
    description_text: {
        color: colors.primary,
        fontSize: 16,
        marginVertical: 3
    }
})

export default CalendarItem;
