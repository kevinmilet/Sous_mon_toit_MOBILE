import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import moment from 'moment';
import 'moment/locale/fr';
import colors from '../../utils/styles/colors';

const CalendarItem = (appointments) => {

    const aptmt = appointments.appointments;
    const date = moment(aptmt.scheduled_at).format('D/MM/YYYY à HH:mm');
    const navigation = useNavigation();
    
    return(
        <TouchableOpacity onPress={() => navigation.navigate('appointmentDetails', { aptmtId: (aptmt.id).toString() })}>
            <View style={styles.content_container}>
                <View style={styles.header_container}>
                    <Text style={styles.date_text}>{date}</Text>
                    <Text style={styles.type_text}>{aptmt.appointment_type}</Text>
                </View>
                <View style={styles.description_container}>
                    <Text style={styles.description_text}>{aptmt.customerFirstname} {aptmt.customerLastname}</Text>
                    <Text style={styles.description_text}>{aptmt.address} {aptmt.zipcode} {aptmt.city}</Text>
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
        backgroundColor: colors.secondaryBtn,
        borderRadius: 20
        },
    header_container: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    description_container: {
        marginTop: 5
    },
    date_text: {
        textAlign: 'left',
        fontSize: 16,
        color: colors.backgroundPrimary,
        fontWeight: 'bold'
    },
    type_text: {
        textAlign: 'right',
        fontSize: 16,
        color: colors.backgroundPrimary,
        fontWeight: 'bold'
    },
    description_text: {
        color: colors.primary,
        fontSize: 14,
        marginVertical: 3
    }
})

export default CalendarItem;
