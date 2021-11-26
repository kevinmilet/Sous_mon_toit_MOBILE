import { AVATAR_BASE_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import 'moment/locale/fr';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { getCurrentUser } from '../../API/ApiStaff';

const Topbar = () => {

    let day = moment().format('dddd');
    let date = moment().format('DD MMMM YYYY');

    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        if (!currentUser) {
            AsyncStorage.getItem('@auth:userId', (error, result) => {
                try {
                    getCurrentUser(result).then(
                        response => {
                            setCurrentUser(response.data);
                        }).catch(error => {
                            console.log(error.message)
                        })
                } catch {
                    console.log(error.message)
                } 
            });
        }
    }, [currentUser])

    return (
        currentUser ? (
        <View style={styles.topbar_container}>
            <View style={styles.content_container}>
                <View style={styles.profile_container}>
                    <Image source={{uri: AVATAR_BASE_URL + currentUser.avatar}}
                        style={styles.profile_img}/>
                    <Text style={styles.name}>{currentUser.firstname + ' ' + currentUser.lastname}</Text>
                </View>
                <View style={styles.date_container}>
                    <Text style={styles.date}>{day}</Text>
                    <Text style={styles.date}>{date}</Text>
                </View>
            </View>
        </View>)
        :
        null
    )
};

const styles = StyleSheet.create({
    topbar_container: {
        backgroundColor: '#E85A70',
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
        borderRadius: 50,
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
