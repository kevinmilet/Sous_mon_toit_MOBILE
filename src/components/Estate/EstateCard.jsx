import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View , Image} from 'react-native';
import { COVER_ESTATE_BASE_URL } from '@env';
import colors from '../../utils/styles/colors';

const EstateCard = (props) => {

    const { estate } = props;
    const navigation = useNavigation();
    const formatPrice = (price) => {

        let priceFormated = Math.round(price);
        priceFormated = new Intl.NumberFormat().format( priceFormated )
        return priceFormated;
    };

    return (

        <TouchableOpacity style={styles.main_container} onPress={() => navigation.navigate('estateDetail', { estateId: estate.id_estate })} >
            <View style={styles.content_container}>
                <View style={styles.content_image}>
                    <Image source={{ uri: COVER_ESTATE_BASE_URL + estate.name }} style={{height:100, width:100 , borderRadius: 10}}/>
                </View>
                <View style={styles.content_text}>
                    <Text style={{fontSize:15 ,fontWeight: 'bold', color: colors.primaryBtn, marginBottom:10}}>{estate.title}</Text>
                    <Text style={{color:"black",fontWeight: 'bold'}}>Reference : <Text style={{color:"white"}}>{estate.reference}</Text></Text>
                    <Text style={{color:"black",fontWeight: 'bold'}}>Ville : <Text style={{color:"white"}}>{estate.city}</Text></Text>
                    <Text style={{fontSize:20, textAlign:"right"}}><Text style={{fontWeight: 'bold', color:"white"}}>{formatPrice(estate.price)}€</Text></Text>
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