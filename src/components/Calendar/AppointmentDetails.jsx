import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import Topbar from '../Topbar/Topbar';
import {showAptmt} from '../../API/ApiApointements';
import moment from 'moment';
import 'moment/locale/fr';
import colors from '../../utils/styles/colors'

const AppointmentDetails = ({ route }) => {

    const {aptmtId} = route.params;
    const dateFormat = 'D/MM/YYYY à HH:mm';

    const [aptmtData, setAptmtData] = useState ({
        scheduled_at: '',
        address: '',
        zipcode: '',
        city: '',
        appointment_type: '',
        customerFirstname: '',
        customerLastname: '',
        notes: '',
        id: null,
        id_staff: null,
        id_customer: null
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        showAptmt(aptmtId)
            .then(
                response => {
                    console.log(response.data)
                    setAptmtData(response.data)
                }
            ).catch (error => {
                console.log(error.message)
            });
    }, [aptmtId])

    return(
            <>
                <View>
                    <Topbar />
                </View>
                <ScrollView style={styles.main_container}>
                    <View>
                        <Text style={styles.text}>Détails du Rendez-vous</Text>
                    </View>
                    <Text>{moment(aptmtData.scheduled_at).format(dateFormat)}</Text>
                    <Text>{aptmtData.address} {aptmtData.zipcode} {aptmtData.city}</Text>
                    <Text>{aptmtData.appointment_type}</Text>
                    <Text>{aptmtData.customerFirstname} {aptmtData.customerLastname}</Text>
                    <Text>Notes: {aptmtData.notes}</Text>
                </ScrollView>
            </>
    )
};

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor: colors.primary,
    },
    text: {
        justifyContent: 'center',
        marginTop: 20,
        textAlign: 'center'
    }
})

export default AppointmentDetails;
