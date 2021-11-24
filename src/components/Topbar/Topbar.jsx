import moment from 'moment';
import 'moment/locale/fr';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { AVATAR_BASE_URL, getStaffPicture } from '../../API/ApiStaff';

const Topbar = () => {

    let day = moment().format('dddd');
    let date = moment().format('DD MMMM YYYY');

    const [staffData, setStaffData] = useState({});

    useEffect(() => {
        getStaffPicture('2').then(
            response => {
                setStaffData(response.data)
            }).catch(error => {
                console.log(error)
            }
        )
    }, [])
    
    return(
    <View style={styles.topbar_container}>
        <View style={styles.content_container}>
            <View style={styles.profile_container}>
                <Image source={{uri: AVATAR_BASE_URL + staffData.avatar}}
                    style={styles.profile_img}/>
                <Text style={styles.name}>{staffData.firstname + ' ' + staffData.lastname}</Text>
            </View>
            <View style={styles.date_container}>
                <Text style={styles.date}>{day}</Text>
                <Text style={styles.date}>{date}</Text>
            </View>
        </View>
    </View>
    )
};

const styles = StyleSheet.create({
    topbar_container: {
        backgroundColor: '#454552',
        minHeight: 180,
        flexDirection: 'row'
    },
    content_container: {
        flex: 1,
        margin: 5,
    },
    profile_container: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    date_container: {
        
        
    },
    profile_img: {
        width: 65,
        height: 65,
        borderRadius: 20,
        margin: 12,
        backgroundColor: 'gray'
    },
    date: {
        color: '#FFF',
        textTransform: 'capitalize',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'right',
        marginRight: 10
    },
    name: {
        color: '#FFF',
        textTransform: 'capitalize',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'right',
        marginTop: 25,
        marginRight: 10
    }
})

export default Topbar;
