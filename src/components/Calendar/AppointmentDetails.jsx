import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Topbar from '../Topbar/Topbar';

const AppointmentDetails = () => {
    return(

        <View>
            <Topbar/>
            <Text style={styles.text}>Détails RDV</Text>
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

export default AppointmentDetails;
