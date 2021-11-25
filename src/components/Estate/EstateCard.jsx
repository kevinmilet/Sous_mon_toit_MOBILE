import { useNavigation } from '@react-navigation/native';
import React , {useEffect, useState} from 'react';
import { StyleSheet, Text, TouchableOpacity, View , Image} from 'react-native';
import { getEstateCover} from '../../API/ApiEstates';
import { COVER_ESTATE_BASE_URL } from '@env';

const EstateCard = (props) => {

    const { estate } = props;
    const [pictureCover, setPictureCover] = useState({})
    const navigation = useNavigation();

    useEffect(() => {
        //Image de couverture du bien
        getEstateCover(estate.id)
            .then(res => {
                setPictureCover(res.data[0])
            }).catch(error => {
                console.log(error.message)
            })
    }, [estate])

    return (

        <TouchableOpacity style={styles.main_container} onPress={() => navigation.navigate('estateDetail', { estateId: estate.id })} >
            <View style={styles.content_container}>
                <View >
                    <Text>{estate.title}</Text>
                    <Image source={{ uri: COVER_ESTATE_BASE_URL + pictureCover.name }} style={{height:100, width:100}}/>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    main_container: {
        height: 190,
        flexDirection: 'row'
    },
    content_container: {
        flex: 1,
        margin: 5
    },
})

export default EstateCard