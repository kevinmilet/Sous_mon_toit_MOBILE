import React, { useState, useEffect } from "react";
import { FontAwesome5 } from '@expo/vector-icons';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
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
                    <View style={styles.content_container}>
                        <View>
                            <Text style={styles.header}>Détails du Rendez-vous</Text>
                        </View>
                        <View>
                            <Text style={styles.date}>{moment(aptmtData.scheduled_at).format(dateFormat)}</Text>
                            <Text style={styles.type}>{aptmtData.appointment_type}</Text>
                            <View>
                                <Text style={styles.title}>Nom du client / Contact</Text>
                                <Text style={styles.text}>{aptmtData.customerFirstname} {aptmtData.customerLastname}</Text>
                            </View>
                            <View>
                                <Text style={styles.title}>Adresse du bien</Text>
                                <Text>{aptmtData.address} {aptmtData.zipcode} {aptmtData.city}</Text>
                            </View>
                            <View>
                                <Text style={styles.title}>Notes</Text>
                                { aptmtData.notes !== null ?
                                    <Text style={styles.text}>{aptmtData.notes}</Text>
                                :
                                <Text style={styles.text}>Pas de notes</Text>
                                }
                            </View>
                        </View>
                        <View style={styles.button_container}>
                            <TouchableOpacity>
                                <FontAwesome5 name="edit" color={colors.secondaryBtn} size={24} />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <FontAwesome5 name="trash-alt" color={colors.secondaryBtn} size={24} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </>
    )
};

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor: colors.backgroundSecondary,
    },
    content_container: {
        borderRadius: 10,
        backgroundColor: colors.backgroundPrimary,
        margin: 10,
        padding: 5
    },
    button_container: {
        flexDirection: "row",
        justifyContent: 'space-evenly',
        marginTop:25,
        marginBottom: 15
    },
    header: {
        justifyContent: 'center',
        marginVertical: 10,
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.primary
    },
    date: {
        justifyContent: 'center',
        marginTop: 5,
        marginBottom: 22,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.primaryBtn
    },
    type: {
        justifyContent: 'center',
        marginBottom: 20,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.secondaryBtn
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 3,
        color: colors.primary
    },
    text: {
        fontSize: 16,
        color: colors.primary
    }
})

export default AppointmentDetails;
