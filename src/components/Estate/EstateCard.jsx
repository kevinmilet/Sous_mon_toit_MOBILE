import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';

const EstateCard = (props) => {

    const { estate } = props;
    const navigation = useNavigation();

    return (

        <TouchableOpacity style={styles.main_container} onPress={() => navigation.navigate('estateDetail')} >
            <View style={styles.content_container}>
                <View >
                    <Text>{estate.title}</Text>
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