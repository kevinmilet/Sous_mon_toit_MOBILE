import { useNavigation } from '@react-navigation/native';
import React , {useEffect, useState} from 'react';
import { StyleSheet, Text, TouchableOpacity, View , Image} from 'react-native';
import { getEstateCover} from '../../API/ApiEstates';
import { COVER_ESTATE_BASE_URL } from '@env';
import colors from '../../utils/styles/colors';

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
                <View style={styles.content_image}>
                    <Image source={{ uri: COVER_ESTATE_BASE_URL + pictureCover.name }} style={{height:100, width:100}}/>
                </View>
                <View style={styles.content_text}>
                    <Text style={{fontSize:15 , color: colors.primaryBtn, marginBottom:10}}>{estate.title}</Text>
                    <Text style={{color:"white"}}>Reference : <Text style={{color:"black"}}>{estate.reference}</Text></Text>
                    <Text style={{color:"white"}}>Ville : <Text style={{color:"black"}}>{estate.city}</Text></Text>
                    <Text style={{fontSize:15, textAlign:"right"}}><Text style={{fontWeight: 'bold', color:"black"}}>{estate.price}€</Text></Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        margin: 10,
        padding: 10,
        backgroundColor: colors.secondaryBtn,
        borderRadius: 20
    },
    content_container: {
        flex: 1,
        margin: 5,
        flexDirection:'row',
    },
    content_image: {

    },
    content_text: {
        paddingHorizontal:10,
        flex:1
    }
})

export default EstateCard