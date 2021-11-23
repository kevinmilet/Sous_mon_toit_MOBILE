import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const CalendarItem = (appointments) => {

    const apptmt = appointments.appointments;

    const date = apptmt.date;
    const dateArray = date.substr(0, 10).split('-');
    const hourArray = date.substr(11, 19).split(':');
    const formatDate = dateArray[2] + '/' + dateArray[1] + '/' +dateArray[0];
    const formatHour = hourArray[0] + 'h' + hourArray[1];
    
    return(
        <View style={styles.content_container}>
            <View style={styles.header_container}>
                <Text style={styles.date_text}>{formatDate} à {formatHour}</Text>
                <Text style={styles.type_text}>{apptmt.type}</Text>
            </View>
            <View style={styles.description_container}>
                <Text style={styles.description_text}>{apptmt.customer}</Text>
                <Text style={styles.description_text}>{apptmt.estate_address}</Text>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    content_container: {
        flex: 1,
        margin: 10,
        padding: 10,
        backgroundColor: '#4EA1D5',
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
        color: '#FFF',
        fontWeight: 'bold'
    },
    type_text: {
        textAlign: 'right',
        fontSize: 16,
        color: '#FFF',
        fontWeight: 'bold'
    },
    description_text: {
        color: '#454552',
        fontSize: 14,
        marginVertical: 3
    }
})

export default CalendarItem;
